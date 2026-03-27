import * as z from "zod";

export const caseStudySchema = z.object({
  title: z.string().min(1, "Title is required").min(3, "Title is too short"),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  results: z.string().optional(),
  clientName: z.string().optional(),
  industry: z.string().optional(),
  projectTimeline: z.string().optional(),
  teamSize: z.string().optional(),
  testimonial: z.string().optional(),
  testimonialAuthor: z.string().optional(),
  imageUrl: z.string().optional(),
  imageCredit: z.string().optional(),
  publicId: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  categoryName: z.string().optional(),
  tagNames: z.array(z.string()).default([]),
  projectId: z.string().optional(),
  keyMetrics: z.any().optional(),
});

export type CaseStudyFormValues = z.infer<typeof caseStudySchema>;