import { z } from "zod";
import { Type } from "@prisma/client";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional().or(z.literal("")),
  type: z.nativeEnum(Type).refine((value) => value !== Type.CASE_STUDIES, {
    message: "Case studies should use the dedicated case study flow.",
  }),
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

export type PostFormValues = z.infer<typeof postSchema>;