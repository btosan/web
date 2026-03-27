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
  const existing = await db.category.findFirst({
    where: {
      catName: {
        equals: catName,
        mode: "insensitive",
      },
    },
    select: { id: true, catName: true },
  });

  if (existing && existing.id !== ignoreId) {
    throw new Error("Post category already exists.");
  }
}

export async function createCategory(data: { catName: string }) {
  await requireAdmin();

  const catName = cleanCategoryName(data.catName);

  if (!catName) {
    throw new Error("Category name is required.");
  }

  await ensureUniqueCategoryName(catName);

  const category = await db.category.create({
    data: { catName },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/categories/create");
  revalidatePath("/admin/posts/create");
  revalidatePath("/blog");
  revalidatePath("/guides");
  revalidatePath("/resources");

  return category;
}

export async function updateCategory(id: string, data: { catName: string }) {
  await requireAdmin();

  const existing = await db.category.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new Error("Post category not found.");
  }

  const catName = cleanCategoryName(data.catName);

  if (!catName) {
    throw new Error("Category name is required.");
  }

  await ensureUniqueCategoryName(catName, id);

  const category = await db.category.update({
    where: { id },
    data: { catName },
  });

  revalidatePath("/admin/categories");
  revalidatePath(`/admin/categories/${id}/edit`);
  revalidatePath("/admin/posts/create");
  revalidatePath("/blog");
  revalidatePath("/guides");
  revalidatePath("/resources");

  return category;
}

export async function deleteCategory(id: string) {
  await requireAdmin();

  const existing = await db.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  if (!existing) {
    throw new Error("Post category not found.");
  }

  if (existing._count.posts > 0) {
    throw new Error(
      "Cannot delete this category because it is already assigned to post(s)."
    );
  }

  await db.category.delete({
    where: { id },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/posts/create");
  revalidatePath("/blog");
  revalidatePath("/guides");
  revalidatePath("/resources");

  return { success: true };
}

export async function getCategories() {
  return db.category.findMany({
    orderBy: { catName: "asc" },
  });
}

export async function getCategoryById(id: string) {
  await requireAdmin();

  return db.category.findUnique({
    where: { id },
  });
}

export async function getAllCategoriesForAdmin() {
  await requireAdmin();

  return db.category.findMany({
    orderBy: { catName: "asc" },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });
}