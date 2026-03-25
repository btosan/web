"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) throw new Error("Not authenticated");
  if (session.user.role !== Role.ADMIN)
    throw new Error("Not authorized");

  return session.user;
}

function clean(value?: string | null) {
  return value?.trim() || undefined;
}

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

async function ensureUniqueSlug(slug: string, ignoreId?: string) {
  const existing = await db.caseStudy.findUnique({
    where: { slug },
  });

  if (existing && existing.id !== ignoreId) {
    throw new Error("Slug already exists.");
  }
}

async function connectTags(tagNames: string[] = []) {
  return tagNames.map((tag) => ({
    where: { tagName: tag },
    create: { tagName: tag },
  }));
}

export async function createCaseStudy(data: {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  clientName?: string;
  industry?: string;
  projectTimeline?: string;
  teamSize?: string;
  testimonial?: string;
  testimonialAuthor?: string;
  imageUrl?: string;
  imageCredit?: string;
  published?: boolean;
  featured?: boolean;
  categoryName?: string;
  tagNames?: string[];
  projectId?: string;
  keyMetrics?: any;
}) {
  await requireAdmin();

  const slug = data.slug
    ? generateSlug(data.slug)
    : generateSlug(data.title);

  await ensureUniqueSlug(slug);

  const category = data.categoryName
    ? await db.caseStudyCategory.findFirst({
        where: { catName: data.categoryName },
      })
    : null;

  const caseStudy = await db.caseStudy.create({
    data: {
      title: data.title,
      slug,
      excerpt: clean(data.excerpt),
      content: clean(data.content),
      challenge: clean(data.challenge),
      solution: clean(data.solution),
      results: clean(data.results),
      clientName: clean(data.clientName),
      industry: clean(data.industry),
      projectTimeline: clean(data.projectTimeline),
      teamSize: clean(data.teamSize),
      testimonial: clean(data.testimonial),
      testimonialAuthor: clean(data.testimonialAuthor),
      imageUrl: clean(data.imageUrl),
      imageCredit: clean(data.imageCredit),
      published: data.published ?? false,
      featured: data.featured ?? false,
      keyMetrics: data.keyMetrics ?? null,
      projectId: data.projectId || null,

      ...(category && { catName: category.catName }),

      tags: {
        connectOrCreate: await connectTags(data.tagNames),
      },
    },
  });

  revalidatePath("/case-studies");

  return caseStudy;
}

export async function createCaseStudy(data: {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  clientName?: string;
  industry?: string;
  projectTimeline?: string;
  teamSize?: string;
  testimonial?: string;
  testimonialAuthor?: string;
  imageUrl?: string;
  imageCredit?: string;
  published?: boolean;
  featured?: boolean;
  categoryName?: string;
  tagNames?: string[];
  projectId?: string;
  keyMetrics?: any;
}) {
  await requireAdmin();

  const slug = data.slug
    ? generateSlug(data.slug)
    : generateSlug(data.title);

  await ensureUniqueSlug(slug);

  const category = data.categoryName
    ? await db.caseStudyCategory.findFirst({
        where: { catName: data.categoryName },
      })
    : null;

  const caseStudy = await db.caseStudy.create({
    data: {
      title: data.title,
      slug,
      excerpt: clean(data.excerpt),
      content: clean(data.content),
      challenge: clean(data.challenge),
      solution: clean(data.solution),
      results: clean(data.results),
      clientName: clean(data.clientName),
      industry: clean(data.industry),
      projectTimeline: clean(data.projectTimeline),
      teamSize: clean(data.teamSize),
      testimonial: clean(data.testimonial),
      testimonialAuthor: clean(data.testimonialAuthor),
      imageUrl: clean(data.imageUrl),
      imageCredit: clean(data.imageCredit),
      published: data.published ?? false,
      featured: data.featured ?? false,
      keyMetrics: data.keyMetrics ?? null,
      projectId: data.projectId || null,

      ...(category && { catName: category.catName }),

      tags: {
        connectOrCreate: await connectTags(data.tagNames),
      },
    },
  });

  revalidatePath("/case-studies");

  return caseStudy;
}

export async function deleteCaseStudy(id: string) {
  await requireAdmin();

  const existing = await db.caseStudy.findUnique({
    where: { id },
  });

  if (!existing) throw new Error("Case study not found");

  await db.caseStudy.delete({
    where: { id },
  });

  revalidatePath("/case-studies");

  return { success: true };
}

export async function getPublicCaseStudies() {
  return db.caseStudy.findMany({
    where: {
      published: true,
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    include: {
      category: true,
      tags: true,
      project: true,
    },
  });
}

export async function getPublicCaseStudyBySlug(slug: string) {
  return db.caseStudy.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: true,
      project: true,
    },
  });
}

export async function getCaseStudyBySlug(slug: string) {
  await requireAdmin();

  return db.caseStudy.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: true,
      project: true,
    },
  });
}

export async function getCaseStudyById(id: string) {
  await requireAdmin();

  return db.caseStudy.findUnique({
    where: { id },
    include: {
      category: true,
      tags: true,
      project: true,
    },
  });
}