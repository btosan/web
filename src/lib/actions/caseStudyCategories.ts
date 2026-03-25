"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { authOptions } from "@/lib/auth";

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

function cleanCategoryName(value: string) {
  return value.trim();
}

async function ensureUniqueCategoryName(catName: string, ignoreId?: string) {
  const existing = await db.caseStudyCategory.findFirst({
    where: {
      catName: {
        equals: catName,
        mode: "insensitive",
      },
    },
    select: { id: true, catName: true },
  });

  if (existing && existing.id !== ignoreId) {
    throw new Error("Case study category already exists.");
  }
}

export async function createCaseStudyCategory(data: { catName: string }) {
  await requireAdmin();

  const catName = cleanCategoryName(data.catName);

  if (!catName) {
    throw new Error("Category name is required.");
  }

  await ensureUniqueCategoryName(catName);

  const category = await db.caseStudyCategory.create({
    data: { catName },
  });

  revalidatePath("/admin/case-study-categories");
  revalidatePath("/admin/case-study-categories/create");
  revalidatePath("/case-studies/create");
  revalidatePath("/case-studies");

  return category;
}

export async function updateCaseStudyCategory(
  id: string,
  data: { catName: string }
) {
  await requireAdmin();

  const existing = await db.caseStudyCategory.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new Error("Case study category not found.");
  }

  const catName = cleanCategoryName(data.catName);

  if (!catName) {
    throw new Error("Category name is required.");
  }

  await ensureUniqueCategoryName(catName, id);

  const category = await db.caseStudyCategory.update({
    where: { id },
    data: { catName },
  });

  revalidatePath("/admin/case-study-categories");
  revalidatePath(`/admin/case-study-categories/${id}/edit`);
  revalidatePath("/case-studies/create");
  revalidatePath("/case-studies");

  return category;
}

export async function deleteCaseStudyCategory(id: string) {
  await requireAdmin();

  const existing = await db.caseStudyCategory.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          caseStudies: true,
        },
      },
    },
  });

  if (!existing) {
    throw new Error("Case study category not found.");
  }

  if (existing._count.caseStudies > 0) {
    throw new Error(
      "Cannot delete this category because it is already assigned to one or more case studies."
    );
  }

  await db.caseStudyCategory.delete({
    where: { id },
  });

  revalidatePath("/admin/case-study-categories");
  revalidatePath("/case-studies/create");
  revalidatePath("/case-studies");

  return { success: true };
}

export async function getCaseStudyCategories() {
  return db.caseStudyCategory.findMany({
    orderBy: { catName: "asc" },
  });
}

export async function getCaseStudyCategoryById(id: string) {
  await requireAdmin();

  return db.caseStudyCategory.findUnique({
    where: { id },
  });
}

export async function getAllCaseStudyCategoriesForAdmin() {
  await requireAdmin();

  return db.caseStudyCategory.findMany({
    orderBy: { catName: "asc" },
    include: {
      _count: {
        select: {
          caseStudies: true,
        },
      },
    },
  });
}