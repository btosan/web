"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { authOptions } from "@/lib/auth";

async function requireAuthor() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/api/auth/signin?callbackUrl=/author");
  }

  if (session.user.role !== Role.AUTHOR && session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  return session.user;
}

export async function getAuthorDashboardData() {
  const user = await requireAuthor();

  const [posts, caseStudies] = await Promise.all([
    db.post.findMany({
      where: { authorEmail: user.email },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        featured: true,
        createdAt: true,
        views: true,
      },
    }),
    db.caseStudy.findMany({
      where: { authorEmail: user.email },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        featured: true,
        createdAt: true,
        views: true,
      },
    }),
  ]);

  return {
    user,
    summary: {
      totalPosts: posts.length,
      publishedPosts: posts.filter((post) => post.published).length,
      totalCaseStudies: caseStudies.length,
      publishedCaseStudies: caseStudies.filter((item) => item.published).length,
      totalViews:
        posts.reduce((sum, post) => sum + (post.views || 0), 0) +
        caseStudies.reduce((sum, item) => sum + (item.views || 0), 0),
    },
    posts,
    caseStudies,
  };
}