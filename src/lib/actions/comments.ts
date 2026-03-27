"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

/////////////////////////////////////////////////
// AUTH
/////////////////////////////////////////////////

async function requireUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("You must be logged in.");
  }

  // Explicit non-null assertion after the check
  return {
    ...session.user,
    email: session.user.email!,   // TypeScript now knows it's string
  };
}

/////////////////////////////////////////////////
// CREATE COMMENT
/////////////////////////////////////////////////

export async function createComment({
  postSlug,
  content,
}: {
  postSlug: string;
  content: string;
}) {
  const user = await requireUser();

  const cleanContent = content.trim();

  if (!cleanContent) {
    throw new Error("Comment cannot be empty.");
  }

  const post = await db.post.findUnique({
    where: { slug: postSlug },
    select: { slug: true, published: true },
  });

  if (!post || !post.published) {
    throw new Error("Post not found.");
  }

  const comment = await db.comment.create({
    data: {
      content: cleanContent,
      post: {
        connect: { slug: postSlug },
      },
      user: {
        connect: { email: user.email },   // now safe
      },
    },
    include: {
      user: true,
    },
  });

  revalidatePath(`/blog/${postSlug}`);
  revalidatePath(`/posts/${postSlug}`);

  return comment;
}

/////////////////////////////////////////////////
// UPDATE COMMENT
/////////////////////////////////////////////////

export async function updateComment(id: string, content: string) {
  const user = await requireUser();

  const existing = await db.comment.findUnique({
    where: { id },
    select: {
      id: true,
      userEmail: true,
      postSlug: true,
    },
  });

  if (!existing) {
    throw new Error("Comment not found.");
  }

  if (existing.userEmail !== user.email) {
    throw new Error("Not authorized.");
  }

  const cleanContent = content.trim();

  if (!cleanContent) {
    throw new Error("Comment cannot be empty.");
  }

  const updated = await db.comment.update({
    where: { id },
    data: { content: cleanContent },
    include: {
      user: true,
    },
  });

  if (existing.postSlug) {
    revalidatePath(`/blog/${existing.postSlug}`);
    revalidatePath(`/posts/${existing.postSlug}`);
  }

  return updated;
}

/////////////////////////////////////////////////
// DELETE COMMENT
/////////////////////////////////////////////////

export async function deleteComment(id: string) {
  const user = await requireUser();

  const existing = await db.comment.findUnique({
    where: { id },
    select: {
      id: true,
      userEmail: true,
      postSlug: true,
    },
  });

  if (!existing) {
    throw new Error("Comment not found.");
  }

  if (existing.userEmail !== user.email) {
    throw new Error("Not authorized.");
  }

  await db.comment.delete({
    where: { id },
  });

  if (existing.postSlug) {
    revalidatePath(`/blog/${existing.postSlug}`);
    revalidatePath(`/posts/${existing.postSlug}`);
  }

  return { success: true };
}

/////////////////////////////////////////////////
// GET COMMENTS
/////////////////////////////////////////////////

export async function getCommentsByPostSlug(postSlug: string) {
  return db.comment.findMany({
    where: {
      postSlug,
    },
    include: {
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });
}