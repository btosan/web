"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Prisma, Role } from "@prisma/client";

/////////////////////////////////////////////////
// 🔐 ADMIN GUARD
/////////////////////////////////////////////////

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) throw new Error("Not authenticated");
  if (session.user.role !== Role.ADMIN) {
    throw new Error("Not authorized");
  }

  return session.user;
}

/////////////////////////////////////////////////
// 🧠 HELPERS
/////////////////////////////////////////////////

function normalizeSlug(slug?: string) {
  if (!slug) return undefined;
  const trimmed = slug.trim();
  return trimmed.length ? trimmed : undefined;
}

function cleanString(value?: string | null) {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function toDecimal(value?: number | null) {
  if (value == null || Number.isNaN(value)) return null;
  return new Prisma.Decimal(value);
}

async function ensureUniqueSlug(slug: string | undefined, ignorePackageId?: string) {
  if (!slug) return;

  const existing = await db.servicePackage.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existing && existing.id !== ignorePackageId) {
    throw new Error("Slug already exists. Please choose another.");
  }
}

/////////////////////////////////////////////////
// 🟢 CREATE PACKAGE
/////////////////////////////////////////////////

export async function createPackage(data: {
  name: string;
  slug?: string;
  shortDescription?: string | null;
  description: string;
  longDescription?: string | null;

  startingPrice?: number | null;
  currency?: string;
  priceLabel?: string | null;
  priceSuffix?: string | null;

  timeline?: string | null;
  deliveryModel?: string | null;

  popular?: boolean;
  featured?: boolean;
  published?: boolean;
  contactOnly?: boolean;

  sortOrder?: number;

  ctaText?: string | null;
  ctaHref?: string | null;

  seoTitle?: string | null;
  seoDescription?: string | null;

  categoryName?: string | null;

  features?: {
    label: string;
    details?: string | null;
    included?: boolean;
    highlight?: boolean;
    sortOrder?: number;
  }[];

  addons?: {
    name: string;
    description?: string | null;
    price?: number | null;
    priceLabel?: string | null;
    sortOrder?: number;
  }[];
}) {
  await requireAdmin();

  const slug = normalizeSlug(data.slug);
  await ensureUniqueSlug(slug);

  const categoryName = cleanString(data.categoryName);

  const created = await db.servicePackage.create({
    data: {
      name: data.name.trim(),
      slug: slug!,
      shortDescription: cleanString(data.shortDescription),
      description: data.description.trim(),
      longDescription: cleanString(data.longDescription),

      startingPrice: toDecimal(data.startingPrice),
      currency: data.currency?.trim() || "NGN",
      priceLabel: cleanString(data.priceLabel) || "Starting from",
      priceSuffix: cleanString(data.priceSuffix) || "/project",

      timeline: cleanString(data.timeline),
      deliveryModel: cleanString(data.deliveryModel),

      popular: data.popular ?? false,
      featured: data.featured ?? false,
      published: data.published ?? false,
      contactOnly: data.contactOnly ?? true,

      sortOrder: data.sortOrder ?? 0,

      ctaText: cleanString(data.ctaText) || "Contact Us",
      ctaHref: cleanString(data.ctaHref),

      seoTitle: cleanString(data.seoTitle),
      seoDescription: cleanString(data.seoDescription),

      category: categoryName
        ? {
            connectOrCreate: {
              where: { name: categoryName },
              create: { name: categoryName },
            },
          }
        : undefined,

      features: data.features?.length
        ? {
            create: data.features.map((feature, index) => ({
              label: feature.label.trim(),
              details: cleanString(feature.details),
              included: feature.included ?? true,
              highlight: feature.highlight ?? false,
              sortOrder: feature.sortOrder ?? index,
            })),
          }
        : undefined,

      addons: data.addons?.length
        ? {
            create: data.addons.map((addon, index) => ({
              name: addon.name.trim(),
              description: cleanString(addon.description),
              price: toDecimal(addon.price),
              priceLabel: cleanString(addon.priceLabel),
              sortOrder: addon.sortOrder ?? index,
            })),
          }
        : undefined,
    },
    include: {
      category: true,
      features: {
        orderBy: { sortOrder: "asc" },
      },
      addons: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/packages");

  if (created.slug) {
    revalidatePath(`/packages/${created.slug}`);
  }

  return created;
}

/////////////////////////////////////////////////
// 🟡 UPDATE PACKAGE
/////////////////////////////////////////////////

export async function updatePackage(
  id: string,
  data: {
    name?: string;
    slug?: string;
    shortDescription?: string | null;
    description?: string;
    longDescription?: string | null;

    startingPrice?: number | null;
    currency?: string;
    priceLabel?: string | null;
    priceSuffix?: string | null;

    timeline?: string | null;
    deliveryModel?: string | null;

    popular?: boolean;
    featured?: boolean;
    published?: boolean;
    contactOnly?: boolean;

    sortOrder?: number;

    ctaText?: string | null;
    ctaHref?: string | null;

    seoTitle?: string | null;
    seoDescription?: string | null;

    categoryName?: string | null;

    features?: {
      label: string;
      details?: string | null;
      included?: boolean;
      highlight?: boolean;
      sortOrder?: number;
    }[];

    addons?: {
      name: string;
      description?: string | null;
      price?: number | null;
      priceLabel?: string | null;
      sortOrder?: number;
    }[];
  }
) {
  await requireAdmin();

  const existingPackage = await db.servicePackage.findUnique({
    where: { id },
    select: { id: true, slug: true },
  });

  if (!existingPackage) {
    throw new Error("Package not found");
  }

  const slug = normalizeSlug(data.slug);

  if (slug) {
    await ensureUniqueSlug(slug, id);
  }

  const categoryName =
    data.categoryName !== undefined ? cleanString(data.categoryName) : undefined;

  const updated = await db.$transaction(async (tx) => {
    if (data.features !== undefined) {
      await tx.packageFeature.deleteMany({
        where: { packageId: id },
      });
    }

    if (data.addons !== undefined) {
      await tx.packageAddon.deleteMany({
        where: { packageId: id },
      });
    }

    return tx.servicePackage.update({
      where: { id },
      data: {
        name: data.name?.trim(),
        slug,
        shortDescription:
          data.shortDescription !== undefined
            ? cleanString(data.shortDescription)
            : undefined,
        description: data.description?.trim(),
        longDescription:
          data.longDescription !== undefined
            ? cleanString(data.longDescription)
            : undefined,

        startingPrice:
          data.startingPrice !== undefined
            ? toDecimal(data.startingPrice)
            : undefined,
        currency: data.currency?.trim(),
        priceLabel:
          data.priceLabel !== undefined
            ? cleanString(data.priceLabel)
            : undefined,
        priceSuffix:
          data.priceSuffix !== undefined
            ? cleanString(data.priceSuffix)
            : undefined,

        timeline:
          data.timeline !== undefined ? cleanString(data.timeline) : undefined,
        deliveryModel:
          data.deliveryModel !== undefined
            ? cleanString(data.deliveryModel)
            : undefined,

        popular: data.popular,
        featured: data.featured,
        published: data.published,
        contactOnly: data.contactOnly,

        sortOrder: data.sortOrder,

        ctaText:
          data.ctaText !== undefined ? cleanString(data.ctaText) : undefined,
        ctaHref:
          data.ctaHref !== undefined ? cleanString(data.ctaHref) : undefined,

        seoTitle:
          data.seoTitle !== undefined ? cleanString(data.seoTitle) : undefined,
        seoDescription:
          data.seoDescription !== undefined
            ? cleanString(data.seoDescription)
            : undefined,

        category:
          categoryName !== undefined
            ? categoryName
              ? {
                  connectOrCreate: {
                    where: { name: categoryName },
                    create: { name: categoryName },
                  },
                }
              : {
                  disconnect: true,
                }
            : undefined,

        features:
          data.features !== undefined
            ? {
                create: data.features.map((feature, index) => ({
                  label: feature.label.trim(),
                  details: cleanString(feature.details),
                  included: feature.included ?? true,
                  highlight: feature.highlight ?? false,
                  sortOrder: feature.sortOrder ?? index,
                })),
              }
            : undefined,

        addons:
          data.addons !== undefined
            ? {
                create: data.addons.map((addon, index) => ({
                  name: addon.name.trim(),
                  description: cleanString(addon.description),
                  price: toDecimal(addon.price),
                  priceLabel: cleanString(addon.priceLabel),
                  sortOrder: addon.sortOrder ?? index,
                })),
              }
            : undefined,
      },
      include: {
        category: true,
        features: {
          orderBy: { sortOrder: "asc" },
        },
        addons: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });
  });

  revalidatePath("/admin/packages");
  revalidatePath(`/admin/packages/${id}`);
  revalidatePath("/packages");

  if (existingPackage.slug && existingPackage.slug !== updated.slug) {
    revalidatePath(`/packages/${existingPackage.slug}`);
  }

  if (updated.slug) {
    revalidatePath(`/packages/${updated.slug}`);
  }

  return updated;
}

/////////////////////////////////////////////////
// 🔴 DELETE PACKAGE
/////////////////////////////////////////////////

export async function deletePackage(id: string) {
  await requireAdmin();

  const existingPackage = await db.servicePackage.findUnique({
    where: { id },
    select: { slug: true },
  });

  if (!existingPackage) {
    throw new Error("Package not found");
  }

  await db.servicePackage.delete({
    where: { id },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/packages");

  if (existingPackage.slug) {
    revalidatePath(`/packages/${existingPackage.slug}`);
  }

  return { success: true };
}

/////////////////////////////////////////////////
// 🔵 ADMIN: GET ALL PACKAGES
/////////////////////////////////////////////////

export async function getAllPackages() {
  await requireAdmin();

  return db.servicePackage.findMany({
    orderBy: [{ sortOrder: "asc" }, { popular: "desc" }, { createdAt: "desc" }],
    include: {
      category: true,
      features: {
        orderBy: { sortOrder: "asc" },
      },
      addons: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

/////////////////////////////////////////////////
// 🌍 PUBLIC: GET PACKAGES
/////////////////////////////////////////////////

export async function getPublicPackages() {
  return db.servicePackage.findMany({
    where: {
      published: true,
    },
    orderBy: [{ sortOrder: "asc" }, { popular: "desc" }, { createdAt: "desc" }],
    include: {
      category: true,
      features: {
        orderBy: { sortOrder: "asc" },
      },
      addons: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

/////////////////////////////////////////////////
// 🌍 PUBLIC: GET PACKAGE BY SLUG
/////////////////////////////////////////////////

export async function getPublicPackageBySlug(slug: string) {
  return db.servicePackage.findUnique({
    where: { slug },
    include: {
      category: true,
      features: {
        orderBy: { sortOrder: "asc" },
      },
      addons: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

/////////////////////////////////////////////////
// 🔎 ADMIN: GET PACKAGE BY ID
/////////////////////////////////////////////////

export async function getPackageById(id: string) {
  await requireAdmin();

  return db.servicePackage.findUnique({
    where: { id },
    include: {
      category: true,
      features: {
        orderBy: { sortOrder: "asc" },
      },
      addons: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

/////////////////////////////////////////////////
// 🔎 ADMIN: GET PACKAGE BY SLUG
/////////////////////////////////////////////////

export async function getPackageBySlug(slug: string) {
  await requireAdmin();

  return db.servicePackage.findUnique({
    where: { slug },
    include: {
      category: true,
      features: {
        orderBy: { sortOrder: "asc" },
      },
      addons: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

/////////////////////////////////////////////////
// 📚 PACKAGE CATEGORIES delete
/////////////////////////////////////////////////

export async function getPackageCategories() {
  await requireAdmin();

  return db.packageCategory.findMany({
    orderBy: { name: "asc" },
  });
}