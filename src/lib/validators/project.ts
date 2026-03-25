import * as z from "zod";
import { ProjectType } from "@prisma/client";

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Project title is required")
    .min(3, "Project title must be at least 3 characters"),

  slug: z.string().optional(),

  imageUrl: z.string().optional(),
  imageCredit: z.string().optional(),

  imageUrls: z.array(z.string()).optional(),
  imageCreditUrls: z.array(z.string()).optional(),

  shortDescription: z
    .string()
    .max(300, "Short description cannot exceed 300 characters")
    .optional(),

  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description is too short"),

  featured: z.boolean().default(false),

  type: z.nativeEnum(ProjectType).default(ProjectType.FULLSTACK),

  categoryName: z.string().optional(),
  tagNames: z.array(z.string()).default([]),

  projectUrl: z.string().optional(),
});

export type ProjectFormValues = z.input<typeof projectSchema>;