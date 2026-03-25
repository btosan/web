"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";

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
  const existing = await db.projectCategory.findFirst({
    where: {
      catName: {
        equals: catName,
        mode: "insensitive",
      },
    },
    select: { id: true, catName: true },
  });

  if (existing && existing.id !== ignoreId) {
    throw new Error("Project category already exists.");
  }
}

export async function createProjectCategory(data: { catName: string }) {
  await requireAdmin();

  const catName = cleanCategoryName(data.catName);

  if (!catName) {
    throw new Error("Category name is required.");
  }

  await ensureUniqueCategoryName(catName);

  const category = await db.projectCategory.create({
    data: { catName },
  });

  revalidatePath("/admin/project-categories");
  revalidatePath("/admin/project-categories/create");
  revalidatePath("/projects/create");
  revalidatePath("/projects");

  return category;
}

export async function updateProjectCategory(
  id: string,
  data: { catName: string }
) {
  await requireAdmin();

  const existing = await db.projectCategory.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new Error("Project category not found.");
  }

  const catName = cleanCategoryName(data.catName);

  if (!catName) {
    throw new Error("Category name is required.");
  }

  await ensureUniqueCategoryName(catName, id);

  const category = await db.projectCategory.update({
    where: { id },
    data: { catName },
  });

  revalidatePath("/admin/project-categories");
  revalidatePath(`/admin/project-categories/${id}/edit`);
  revalidatePath("/projects/create");
  revalidatePath("/projects");

  return category;
}

export async function deleteProjectCategory(id: string) {
  await requireAdmin();

  const existing = await db.projectCategory.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          projects: true,
        },
      },
    },
  });

  if (!existing) {
    throw new Error("Project category not found.");
  }

  if (existing._count.projects > 0) {
    throw new Error(
      "Cannot delete this category because it is already assigned to project(s)."
    );
  }

  await db.projectCategory.delete({
    where: { id },
  });

  revalidatePath("/admin/project-categories");
  revalidatePath("/projects/create");
  revalidatePath("/projects");

  return { success: true };
}

export async function getProjectCategories() {
  return db.projectCategory.findMany({
    orderBy: { catName: "asc" },
  });
}

export async function getProjectCategoryById(id: string) {
  await requireAdmin();

  return db.projectCategory.findUnique({
    where: { id },
  });
}

export async function getAllProjectCategoriesForAdmin() {
  await requireAdmin();

  return db.projectCategory.findMany({
    orderBy: { catName: "asc" },
    include: {
      _count: {
        select: {
          projects: true,
        },
      },
    },
  });
}