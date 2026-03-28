"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireUserEmail(): Promise<string> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    throw new Error("You must be logged in.");
  }

  return email;
}

/////////////////////////////////////////////////
// TOGGLE LIKE
/////////////////////////////////////////////////

export async function toggleLike(postSlug: string) {
  const userEmail = await requireUserEmail();

  const existing = await db.like.findFirst({
    where: {
      userEmail,
      postSlug,
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
          connect: { email: userEmail },
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
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return { liked: false };
  }

  const like = await db.like.findFirst({
    where: {
      userEmail,
      postSlug,
    },
    select: { id: true },
  });

  return { liked: !!like };
}