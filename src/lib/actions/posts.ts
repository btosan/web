"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Prisma, Role, Type } from "@prisma/client";

/////////////////////////////////////////////////
// TYPES
/////////////////////////////////////////////////

type CreatePostInput = {
  title: string;
  slug?: string | null;
  type?: Type;
  imageUrl?: string | null;
  imageCredit?: string | null;
  publicId?: string | null;
  openingParagraph?: string | null;
  tableOfContents?: string | null;
  content: string;
  published?: boolean;
  featured?: boolean;
  categoryName?: string | null;
  tagNames?: string[];
  authorEmail?: string | null;
};

type UpdatePostInput = {
  title?: string;
  slug?: string | null;
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
};

type PublicPostsOptions = {
  type?: Type;
  categoryName?: string;
  tagName?: string;
  featured?: boolean;
  limit?: number;
  search?: string;
};

/////////////////////////////////////////////////
// AUTH GUARDS
/////////////////////////////////////////////////

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  if (session.user.role !== Role.ADMIN) {
    throw new Error("Not authorized");
  }

  return session.user;
}

async function requireAdminOrAuthor() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

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
      slug: true,
      authorEmail: true,
      published: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (user.role === Role.ADMIN) {
    return { user, post };
  }

  if (!user.email || post.authorEmail !== user.email) {
    throw new Error("Not authorized");
  }

  return { user, post };
}

/////////////////////////////////////////////////
// HELPERS
/////////////////////////////////////////////////

function cleanString(value?: string | null) {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function cleanRequiredString(value: string, fieldName: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`${fieldName} is required.`);
  }
  return trimmed;
}

function cleanStringArray(values?: string[]) {
  if (!values?.length) return [];
  return [...new Set(values.map((v) => v.trim()).filter(Boolean))];
}

function normalizeCreateSlug(value?: string | null) {
  return cleanString(value);
}

function normalizeUpdateSlug(value?: string | null) {
  if (value === undefined) return undefined;
  return cleanString(value);
}

function assertSupportedPostType(type?: Type) {
  const resolved = type ?? Type.BLOG;

  if (resolved === Type.CASE_STUDIES) {
    throw new Error(
      "CASE_STUDIES is managed in the dedicated CaseStudy model, not Post."
    );
  }

  return resolved;
}

async function ensureUniqueSlug(
  slug: string | null | undefined,
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

async function ensureExistingCategory(categoryName: string | null) {
  if (!categoryName) return null;

  const category = await db.category.findUnique({
    where: { catName: categoryName },
    select: { catName: true },
  });

  if (!category) {
    throw new Error("Selected category does not exist.");
  }

  return category.catName;
}


async function ensureValidAuthorEmail(
  actor: { email?: string | null; role: Role },
  authorEmail?: string | null
) {
  const cleanedAuthorEmail =
    actor.role === Role.ADMIN
      ? cleanString(authorEmail) ?? actor.email ?? null
      : actor.email ?? null;

  if (!cleanedAuthorEmail) {
    throw new Error("Author email is required.");
  }

  const author = await db.user.findUnique({
    where: { email: cleanedAuthorEmail },
    select: { email: true },
  });

  if (!author) {
    throw new Error("Author not found.");
  }

  return author.email;
}

function revalidatePostPaths(slug?: string | null) {
  revalidatePath("/admin/posts");
  revalidatePath("/posts");
  revalidatePath("/blog");
  revalidatePath("/guides");
  revalidatePath("/resources");

  if (slug) {
    revalidatePath(`/posts/${slug}`);
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/guides/${slug}`);
    revalidatePath(`/resources/${slug}`);
  }
}

/////////////////////////////////////////////////
// CREATE POST
/////////////////////////////////////////////////

export async function createPost(data: CreatePostInput) {
  const user = await requireAdminOrAuthor();

  const title = cleanRequiredString(data.title, "Title");
  const content = cleanRequiredString(data.content, "Content");
  const slug = normalizeCreateSlug(data.slug);
  const type = assertSupportedPostType(data.type);
  const categoryName = await ensureExistingCategory(cleanString(data.categoryName));
  const tagNames = cleanStringArray(data.tagNames);
  const authorEmail = await ensureValidAuthorEmail(user, data.authorEmail);

  await ensureUniqueSlug(slug);

  if (data.published && !slug) {
    throw new Error("Published posts must have a slug.");
  }

  const post = await db.post.create({
    data: {
      title,
      slug,
      type,
      imageUrl: cleanString(data.imageUrl),
      imageCredit: cleanString(data.imageCredit),
      publicId: cleanString(data.publicId),
      openingParagraph: cleanString(data.openingParagraph),
      tableOfContents: cleanString(data.tableOfContents),
      content,
      published: data.published ?? false,
      featured: data.featured ?? false,

      author: {
        connect: { email: authorEmail },
      },

      category: categoryName
        ? {
            connect: { catName: categoryName },
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
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });

  revalidatePostPaths(post.slug);

  return post;
}

/////////////////////////////////////////////////
// UPDATE POST
/////////////////////////////////////////////////

export async function updatePost(id: string, data: UpdatePostInput) {
  const { user, post: existingPost } = await requirePostAccess(id);

  const nextSlug = normalizeUpdateSlug(data.slug);

  if (nextSlug !== undefined) {
    await ensureUniqueSlug(nextSlug, id);
  }

  const nextType =
    data.type !== undefined ? assertSupportedPostType(data.type) : undefined;

  const categoryName =
    data.categoryName !== undefined
      ? await ensureExistingCategory(cleanString(data.categoryName))
      : undefined;

  const tagNames = cleanStringArray(data.tagNames);

  let nextAuthorEmail: string | undefined;

  if (data.authorEmail !== undefined) {
    if (user.role !== Role.ADMIN) {
      throw new Error("Only admin can change post author.");
    }

    const cleaned = cleanString(data.authorEmail);

    if (!cleaned) {
      throw new Error("Author email cannot be empty.");
    }

    const author = await db.user.findUnique({
      where: { email: cleaned },
      select: { email: true },
    });

    if (!author) {
      throw new Error("Author not found.");
    }

    nextAuthorEmail = author.email;
  }

  const willBePublished =
    data.published !== undefined ? data.published : existingPost.published;

  const resolvedSlug =
    nextSlug !== undefined ? nextSlug : existingPost.slug;

  if (willBePublished && !resolvedSlug) {
    throw new Error("Published posts must have a slug.");
  }

  if (
    data.slug !== undefined &&
    !resolvedSlug &&
    (existingPost._count.comments > 0 || existingPost._count.likes > 0)
  ) {
    throw new Error(
      "You cannot remove the slug from a post that already has comments or likes."
    );
  }

  const post = await db.$transaction(async (tx) => {
    const updated = await tx.post.update({
      where: { id },
      data: {
        title:
          data.title !== undefined
            ? cleanRequiredString(data.title, "Title")
            : undefined,
        slug: nextSlug !== undefined ? nextSlug : undefined,
        type: nextType,
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
        content:
          data.content !== undefined
            ? cleanRequiredString(data.content, "Content")
            : undefined,
        published: data.published,
        featured: data.featured,

        author:
          nextAuthorEmail !== undefined
            ? { connect: { email: nextAuthorEmail } }
            : undefined,

        category:
          categoryName !== undefined
            ? categoryName
              ? { connect: { catName: categoryName } }
              : { disconnect: true }
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
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    const slugChanged =
      data.slug !== undefined && existingPost.slug !== updated.slug;

    if (slugChanged && existingPost.slug) {
      await tx.comment.updateMany({
        where: { postSlug: existingPost.slug },
        data: { postSlug: updated.slug },
      });

      await tx.like.updateMany({
        where: { postSlug: existingPost.slug },
        data: { postSlug: updated.slug },
      });
    }

    return updated;
  });

  revalidatePostPaths(existingPost.slug);
  revalidatePostPaths(post.slug);
  revalidatePath(`/admin/posts/${id}`);
  revalidatePath(`/admin/posts/${id}/edit`);

  return post;
}

/////////////////////////////////////////////////
// DELETE POST
/////////////////////////////////////////////////

export async function deletePost(id: string) {
  const { post } = await requirePostAccess(id);

  await db.post.delete({
    where: { id },
  });

  revalidatePostPaths(post.slug);
  revalidatePath(`/admin/posts/${id}`);
  revalidatePath(`/admin/posts/${id}/edit`);

  return { success: true };
}

/////////////////////////////////////////////////
// ADMIN/AUTHOR: GET ALL POSTS
/////////////////////////////////////////////////

export async function getAllPosts() {
  const user = await requireAdminOrAuthor();

  if (user.role === Role.ADMIN) {
    return db.post.findMany({
      where: {
        NOT: {
          type: Type.CASE_STUDIES,
        },
      },
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
    where: {
      authorEmail: user.email ?? undefined,
      NOT: {
        type: Type.CASE_STUDIES,
      },
    },
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
// PUBLIC: GET POSTS
/////////////////////////////////////////////////

export async function getPublicPosts(options: PublicPostsOptions = {}) {
  const search = options.search?.trim();

  const where: Prisma.PostWhereInput = {
    published: true,
    NOT: {
      type: Type.CASE_STUDIES,
    },
    ...(options.type ? { type: options.type } : {}),
    ...(options.categoryName ? { catName: options.categoryName } : {}),
    ...(options.featured !== undefined ? { featured: options.featured } : {}),
    ...(options.tagName
      ? {
          tags: {
            some: {
              tagName: options.tagName,
            },
          },
        }
      : {}),
    ...(search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              openingParagraph: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
  };

  return db.post.findMany({
    where,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: options.limit,
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

export async function getPublicBlogPosts(limit?: number) {
  return getPublicPosts({
    type: Type.BLOG,
    limit,
  });
}

export async function getPublicGuidePosts(limit?: number) {
  return getPublicPosts({
    type: Type.GUIDE,
    limit,
  });
}

export async function getPublicResourcePosts(limit?: number) {
  return getPublicPosts({
    type: Type.RESOURCES,
    limit,
  });
}

export async function getFeaturedPosts(limit = 6) {
  return getPublicPosts({
    featured: true,
    limit,
  });
}

/////////////////////////////////////////////////
// PUBLIC: GET POST BY SLUG
/////////////////////////////////////////////////

export async function getPublicPostBySlug(slug: string) {
  return db.post.findFirst({
    where: {
      slug,
      published: true,
      NOT: {
        type: Type.CASE_STUDIES,
      },
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
// ADMIN/AUTHOR: GET POST BY ID / SLUG
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

export async function getPostBySlug(slug: string) {
  const user = await requireAdminOrAuthor();

  const post = await db.post.findUnique({
    where: { slug },
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

  if (!post) {
    return null;
  }

  if (post.type === Type.CASE_STUDIES) {
    throw new Error("This slug belongs to the case study flow, not the post flow.");
  }

  if (user.role === Role.ADMIN) {
    return post;
  }

  if (!user.email || post.authorEmail !== user.email) {
    throw new Error("Not authorized");
  }

  return post;
}

/////////////////////////////////////////////////
// PUBLIC HELPERS FOR DETAIL / LISTING PAGES
/////////////////////////////////////////////////

export async function incrementPostViewsBySlug(slug: string) {
  const post = await db.post.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  await db.post.update({
    where: { id: post.id },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  return { success: true };
}

export async function getRelatedPostsByCategory(
  postId: string,
  categoryName?: string | null,
  limit = 3
) {
  if (!categoryName) return [];

  return db.post.findMany({
    where: {
      id: { not: postId },
      published: true,
      catName: categoryName,
      NOT: {
        type: Type.CASE_STUDIES,
      },
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: limit,
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

export async function getTrendingPosts(limit = 6) {
  return db.post.findMany({
    where: {
      published: true,
      NOT: {
        type: Type.CASE_STUDIES,
      },
    },
    orderBy: [
      { views: "desc" },
      { likes: { _count: "desc" } },
      { createdAt: "desc" },
    ],
    take: limit,
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

export async function getLatestPosts(limit = 6) {
  return db.post.findMany({
    where: {
      published: true,
      NOT: {
        type: Type.CASE_STUDIES,
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
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