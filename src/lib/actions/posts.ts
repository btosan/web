"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Role, Type } from "@prisma/client";

/////////////////////////////////////////////////
// 🔐 AUTH GUARDS
/////////////////////////////////////////////////

async function requireAdminOrAuthor() {
  const session = await getServerSession(authOptions);

  if (!session?.user) throw new Error("Not authenticated");
  if (
    session.user.role !== Role.ADMIN &&
    session.user.role !== Role.AUTHOR
  ) {
    throw new Error("Not authorized");
  }

  return session.user;
}

async function requirePostAccess(postId: string) {
  const user = await requireAdminOrAuthor();

  const post = await db.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      authorEmail: true,
      slug: true,
    },
  });

  if (!post) throw new Error("Post not found");

  if (user.role === Role.ADMIN) {
    return { user, post };
  }

  if (!user.email || post.authorEmail !== user.email) {
    throw new Error("Not authorized");
  }

  return { user, post };
}

/////////////////////////////////////////////////
// 🧠 HELPERS
/////////////////////////////////////////////////

function normalizeSlug(slug?: string) {
  if (!slug) return undefined;
  const trimmed = slug.trim();
  return trimmed.length ? trimmed : undefined;
}

function cleanString(value?: string | null) {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function cleanStringArray(values?: string[]) {
  if (!values?.length) return [];
  return [...new Set(values.map((v) => v.trim()).filter(Boolean))];
}

async function ensureUniqueSlug(
  slug: string | undefined,
  ignorePostId?: string
) {
  if (!slug) return;

  const existing = await db.post.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existing && existing.id !== ignorePostId) {
    throw new Error("Slug already exists. Please choose another.");
  }
}

/////////////////////////////////////////////////
// 🟢 CREATE POST
/////////////////////////////////////////////////

export async function createPost(data: {
  title: string;
  slug?: string;
  type?: Type;
  imageUrl?: string;
  imageCredit?: string;
  publicId?: string;
  openingParagraph?: string;
  tableOfContents?: string;
  content: string;
  published?: boolean;
  featured?: boolean;
  categoryName?: string;
  tagNames?: string[];
  authorEmail?: string;
}) {
  const user = await requireAdminOrAuthor();

  const slug = normalizeSlug(data.slug);
  await ensureUniqueSlug(slug);

  const categoryName = cleanString(data.categoryName);
  const tagNames = cleanStringArray(data.tagNames);

  const authorEmail =
    user.role === Role.ADMIN
      ? cleanString(data.authorEmail) ?? user.email ?? null
      : user.email ?? null;

  if (!authorEmail) {
    throw new Error("Author email is required");
  }

  const author = await db.user.findUnique({
    where: { email: authorEmail },
    select: { email: true, role: true },
  });

  if (!author) {
    throw new Error("Author not found");
  }

  if (
    user.role !== Role.ADMIN &&
    author.email !== user.email
  ) {
    throw new Error("Not authorized");
  }

  const post = await db.post.create({
    data: {
      title: data.title.trim(),
      slug,
      type: data.type ?? Type.BLOG,
      imageUrl: cleanString(data.imageUrl),
      imageCredit: cleanString(data.imageCredit),
      publicId: cleanString(data.publicId),
      openingParagraph: cleanString(data.openingParagraph),
      tableOfContents: cleanString(data.tableOfContents),
      content: data.content.trim(),
      published: data.published ?? false,
      featured: data.featured ?? false,
      authorEmail,
      category: categoryName
        ? {
            connectOrCreate: {
              where: { catName: categoryName },
              create: { catName: categoryName },
            },
          }
        : undefined,
      tags: tagNames.length
        ? {
            connectOrCreate: tagNames.map((tagName) => ({
              where: { tagName },
              create: { tagName },
            })),
          }
        : undefined,
    },
    include: {
      author: true,
      category: true,
      tags: true,
      comments: true,
      likes: true,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/posts");
  revalidatePath("/blog");

  if (post.slug) {
    revalidatePath(`/posts/${post.slug}`);
    revalidatePath(`/blog/${post.slug}`);
  }

  return post;
}

/////////////////////////////////////////////////
// 🟡 UPDATE POST
/////////////////////////////////////////////////

export async function updatePost(
  id: string,
  data: {
    title?: string;
    slug?: string;
    type?: Type;
    imageUrl?: string | null;
    imageCredit?: string | null;
    publicId?: string | null;
    openingParagraph?: string | null;
    tableOfContents?: string | null;
    content?: string;
    published?: boolean;
    featured?: boolean;
    categoryName?: string | null;
    tagNames?: string[];
    authorEmail?: string | null;
  }
) {
  const { user, post: existingPost } = await requirePostAccess(id);

  const slug = normalizeSlug(data.slug);

  if (slug) {
    await ensureUniqueSlug(slug, id);
  }

  const categoryName =
    data.categoryName !== undefined ? cleanString(data.categoryName) : undefined;

  const tagNames = data.tagNames !== undefined ? cleanStringArray(data.tagNames) : undefined;

  let nextAuthorEmail: string | undefined;

  if (data.authorEmail !== undefined) {
    if (user.role !== Role.ADMIN) {
      throw new Error("Only admin can change post author");
    }

    const cleanedAuthorEmail = cleanString(data.authorEmail);

    if (!cleanedAuthorEmail) {
      nextAuthorEmail = undefined;
    } else {
      const author = await db.user.findUnique({
        where: { email: cleanedAuthorEmail },
        select: { email: true },
      });

      if (!author) {
        throw new Error("Author not found");
      }

      nextAuthorEmail = cleanedAuthorEmail;
    }
  }

  const post = await db.$transaction(async (tx) => {
    const updated = await tx.post.update({
      where: { id },
      data: {
        title: data.title?.trim(),
        slug,
        type: data.type,
        imageUrl:
          data.imageUrl !== undefined ? cleanString(data.imageUrl) : undefined,
        imageCredit:
          data.imageCredit !== undefined
            ? cleanString(data.imageCredit)
            : undefined,
        publicId:
          data.publicId !== undefined ? cleanString(data.publicId) : undefined,
        openingParagraph:
          data.openingParagraph !== undefined
            ? cleanString(data.openingParagraph)
            : undefined,
        tableOfContents:
          data.tableOfContents !== undefined
            ? cleanString(data.tableOfContents)
            : undefined,
        content: data.content?.trim(),
        published: data.published,
        featured: data.featured,
        authorEmail: nextAuthorEmail,
        category:
          categoryName !== undefined
            ? categoryName
              ? {
                  connectOrCreate: {
                    where: { catName: categoryName },
                    create: { catName: categoryName },
                  },
                }
              : {
                  disconnect: true,
                }
            : undefined,
        tags:
          tagNames !== undefined
            ? {
                set: [],
                connectOrCreate: tagNames.map((tagName) => ({
                  where: { tagName },
                  create: { tagName },
                })),
              }
            : undefined,
      },
      include: {
        author: true,
        category: true,
        tags: true,
        comments: true,
        likes: true,
      },
    });

    return updated;
  });

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}`);
  revalidatePath("/posts");
  revalidatePath("/blog");

  if (existingPost.slug && existingPost.slug !== post.slug) {
    revalidatePath(`/posts/${existingPost.slug}`);
    revalidatePath(`/blog/${existingPost.slug}`);
  }

  if (post.slug) {
    revalidatePath(`/posts/${post.slug}`);
    revalidatePath(`/blog/${post.slug}`);
  }

  return post;
}

/////////////////////////////////////////////////
// 🔴 DELETE POST
/////////////////////////////////////////////////

export async function deletePost(id: string) {
  const { post } = await requirePostAccess(id);

  await db.post.delete({
    where: { id },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/posts");
  revalidatePath("/blog");

  if (post.slug) {
    revalidatePath(`/posts/${post.slug}`);
    revalidatePath(`/blog/${post.slug}`);
  }

  return { success: true };
}

/////////////////////////////////////////////////
// 🔵 ADMIN: GET ALL POSTS
/////////////////////////////////////////////////

export async function getAllPosts() {
  const user = await requireAdminOrAuthor();

  if (user.role === Role.ADMIN) {
    return db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        category: true,
        tags: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  }

  return db.post.findMany({
    where: { authorEmail: user.email ?? undefined },
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      category: true,
      tags: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
}

/////////////////////////////////////////////////
// 🌍 PUBLIC: GET PUBLISHED POSTS
/////////////////////////////////////////////////

export async function getPublicPosts() {
  return db.post.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    include: {
      author: true,
      category: true,
      tags: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
}

/////////////////////////////////////////////////
// 🌍 PUBLIC: GET POST BY SLUG
/////////////////////////////////////////////////

export async function getPublicPostBySlug(slug: string) {
  return db.post.findFirst({
    where: {
      slug,
      published: true,
    },
    include: {
      author: true,
      category: true,
      tags: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: { createdAt: "desc" },
      },
      likes: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
}

/////////////////////////////////////////////////
// 🔎 AUTHOR/ADMIN: GET POST BY ID
/////////////////////////////////////////////////

export async function getPostById(id: string) {
  const { post } = await requirePostAccess(id);

  return db.post.findUnique({
    where: { id: post.id },
    include: {
      author: true,
      category: true,
      tags: true,
      comments: {
        include: {
          user: true,
        },
      },
      likes: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
}