import { z } from "zod";

export const packageFeatureSchema = z.object({
  label: z.string().min(1, "Feature label is required"),
  details: z.string().nullable().optional(),
  included: z.boolean().default(true),
  highlight: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export const packageAddonSchema = z.object({
  name: z.string().min(1, "Addon name is required"),
  description: z.string().nullable().optional(),
  price: z.coerce.number().min(0).nullable().optional(),
  priceLabel: z.string().nullable().optional(),
  sortOrder: z.number().int().default(0),
});

export const servicePackageSchema = z.object({
  name: z.string().min(2, "Package name is required"),
  slug: z.string().min(2, "Slug is required"),

  shortDescription: z.string().max(300).nullable().optional(),
  description: z.string().min(20, "Description is required"),
  longDescription: z.string().nullable().optional(),

  startingPrice: z.coerce.number().min(0).nullable().optional(),
  currency: z.string().default("NGN"),
  priceLabel: z.string().nullable().optional(),
  priceSuffix: z.string().nullable().optional(),

  timeline: z.string().nullable().optional(),
  deliveryModel: z.string().nullable().optional(),

  popular: z.boolean().default(false),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  contactOnly: z.boolean().default(true),

  sortOrder: z.coerce.number().int().default(0),

  ctaText: z.string().nullable().optional(),
  ctaHref: z.string().nullable().optional(),

  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().max(160).nullable().optional(),

  categoryName: z.string().nullable().optional(),

  features: z.array(packageFeatureSchema).default([]),
  addons: z.array(packageAddonSchema).default([]),
});

export type ServicePackageFormInput = z.input<typeof servicePackageSchema>;
export type ServicePackageFormValues = z.output<typeof servicePackageSchema>;