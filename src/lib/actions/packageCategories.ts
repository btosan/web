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

async function ensureUniqueCategoryName(name: string, ignoreId?: string) {
  const existing = await db.packageCategory.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
    select: { id: true, name: true },
  });

  if (existing && existing.id !== ignoreId) {
    throw new Error("Package category already exists.");
  }
}

export async function createPackageCategory(data: { name: string }) {
  await requireAdmin();

  const name = cleanCategoryName(data.name);

  if (!name) {
    throw new Error("Category name is required.");
  }

  await ensureUniqueCategoryName(name);

  const category = await db.packageCategory.create({
    data: { name },
  });

  revalidatePath("/admin/package-categories");
  revalidatePath("/admin/package-categories/create");
  revalidatePath("/admin/packages/new");
  revalidatePath("/admin/packages");
  revalidatePath("/packages");

  return category;
}

export async function updatePackageCategory(
  id: string,
  data: { name: string }
) {
  await requireAdmin();

  const existing = await db.packageCategory.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new Error("Package category not found.");
  }

  const name = cleanCategoryName(data.name);

  if (!name) {
    throw new Error("Category name is required.");
  }

  await ensureUniqueCategoryName(name, id);

  const category = await db.packageCategory.update({
    where: { id },
    data: { name },
  });

  revalidatePath("/admin/package-categories");
  revalidatePath(`/admin/package-categories/${id}/edit`);
  revalidatePath("/admin/packages/new");
  revalidatePath("/admin/packages");
  revalidatePath("/packages");

  return category;
}

export async function deletePackageCategory(id: string) {
  await requireAdmin();

  const existing = await db.packageCategory.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          packages: true,
        },
      },
    },
  });

  if (!existing) {
    throw new Error("Package category not found.");
  }

  if (existing._count.packages > 0) {
    throw new Error(
      "Cannot delete this category because it is already assigned to package(s)."
    );
  }

  await db.packageCategory.delete({
    where: { id },
  });

  revalidatePath("/admin/package-categories");
  revalidatePath("/admin/packages/new");
  revalidatePath("/admin/packages");
  revalidatePath("/packages");

  return { success: true };
}

export async function getPackageCategories() {
  return db.packageCategory.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getPackageCategoryById(id: string) {
  await requireAdmin();

  return db.packageCategory.findUnique({
    where: { id },
  });
}

export async function getAllPackageCategoriesForAdmin() {
  await requireAdmin();

  return db.packageCategory.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          packages: true,
        },
      },
    },
  });
}