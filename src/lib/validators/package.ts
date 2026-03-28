import { z } from "zod";

export const packageFeatureSchema = z.object({
  label: z.string().min(1, "Feature label is required"),
  details: z.string().optional().nullable(),
  included: z.boolean().default(true),
  highlight: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export const packageAddonSchema = z.object({
  name: z.string().min(1, "Addon name is required"),
  description: z.string().optional().nullable(),
  price: z.coerce.number().min(0).optional().nullable(),
  priceLabel: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export const servicePackageSchema = z.object({
  name: z.string().min(2, "Package name is required"),
  slug: z.string().min(2, "Slug is required"),

  shortDescription: z.string().max(300).optional().nullable(),
  description: z.string().min(20, "Description is required"),
  longDescription: z.string().optional().nullable(),

  startingPrice: z.coerce.number().min(0).optional().nullable(),
  currency: z.string().default("NGN"),
  priceLabel: z.string().optional().nullable(),
  priceSuffix: z.string().optional().nullable(),

  timeline: z.string().optional().nullable(),
  deliveryModel: z.string().optional().nullable(),

  popular: z.boolean().default(false),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  contactOnly: z.boolean().default(true),

  sortOrder: z.coerce.number().int().default(0),

  ctaText: z.string().optional().nullable(),
  ctaHref: z.string().optional().nullable(),

  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().max(160).optional().nullable(),

  categoryName: z.string().optional().nullable(),

  features: z.array(packageFeatureSchema).default([]),
  addons: z.array(packageAddonSchema).default([]),
});

export type ServicePackageFormValues = z.infer<typeof servicePackageSchema>;