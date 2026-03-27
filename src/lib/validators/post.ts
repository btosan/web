import { z } from "zod";
import { Type } from "@prisma/client";

const postTypeSchema = z.enum([Type.BLOG, Type.RESOURCES, Type.GUIDE]);

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional().or(z.literal("")),
  type: postTypeSchema,
  imageUrl: z.string().optional().or(z.literal("")),
  imageCredit: z.string().optional().or(z.literal("")),
  openingParagraph: z.string().optional().or(z.literal("")),
  tableOfContents: z.string().optional().or(z.literal("")),
  content: z.string().min(1, "Content is required"),
  published: z.boolean(),
  featured: z.boolean(),
  categoryName: z.string().optional().or(z.literal("")),
  tagNames: z.array(z.string()).default([]),
});

export type PostFormValues = z.input<typeof postSchema>;