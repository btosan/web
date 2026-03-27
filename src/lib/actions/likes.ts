"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("You must be logged in.");
  }

  return session.user;
}

/////////////////////////////////////////////////
// TOGGLE LIKE
/////////////////////////////////////////////////

export async function toggleLike(postSlug: string) {
  const user = await requireUser();

  // ✅ find existing like using postSlug (NOT postId)
  const existing = await db.like.findFirst({
    where: {
      userEmail: user.email,
      postSlug: postSlug,
    },
    select: { id: true },
  });

  if (existing) {
    await db.like.delete({
      where: { id: existing.id },
    });
  } else {
await db.like.create({
  data: {
    post: {
      connect: { slug: postSlug },
    },
    user: {
      connect: { email: user.email },
    },
  },
});
  }

  revalidatePath(`/blog/${postSlug}`);
  revalidatePath(`/posts/${postSlug}`);

  return { success: true };
}

/////////////////////////////////////////////////
// GET LIKE STATUS
/////////////////////////////////////////////////

export async function getLikeStatus(postSlug: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { liked: false };
  }

  const like = await db.like.findFirst({
    where: {
      userEmail: session.user.email,
      postSlug: postSlug, // ✅ CORRECT FIELD
    },
    select: { id: true },
  });

  return { liked: !!like };
}