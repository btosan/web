// "use server";

// import { db } from "@/lib/db";
// import { revalidatePath } from "next/cache";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { Prisma, Role } from "@prisma/client";

// /////////////////////////////////////////////////
// // 🔐 AUTH GUARDS
// /////////////////////////////////////////////////

// async function requireAdminOrAuthor() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user) throw new Error("Not authenticated");
//   if (
//     session.user.role !== Role.ADMIN &&
//     session.user.role !== Role.AUTHOR
//   ) {
//     throw new Error("Not authorized");
//   }

//   return session.user;
// }

// async function requireCaseStudyAccess(caseStudyId: string) {
//   const user = await requireAdminOrAuthor();

//   const caseStudy = await db.caseStudy.findUnique({
//     where: { id: caseStudyId },
//     select: {
//       id: true,
//       authorEmail: true,
//       slug: true,
//     },
//   });

//   if (!caseStudy) throw new Error("Case study not found");

//   if (user.role === Role.ADMIN) {
//     return { user, caseStudy };
//   }

//   if (!user.email || caseStudy.authorEmail !== user.email) {
//     throw new Error("Not authorized");
//   }

//   return { user, caseStudy };
// }

// /////////////////////////////////////////////////
// // 🧠 HELPERS
// /////////////////////////////////////////////////

// function normalizeSlug(slug?: string) {
//   if (!slug) return undefined;
//   const trimmed = slug.trim();
//   return trimmed.length ? trimmed : undefined;
// }

// function cleanString(value?: string | null) {
//   if (value == null) return null;
//   const trimmed = value.trim();
//   return trimmed.length ? trimmed : null;
// }

// function cleanStringArray(values?: string[]) {
//   if (!values?.length) return [];
//   return [...new Set(values.map((v) => v.trim()).filter(Boolean))];
// }

// async function ensureUniqueSlug(
//   slug: string | undefined,
//   ignoreCaseStudyId?: string
// ) {
//   if (!slug) return;

//   const existing = await db.caseStudy.findUnique({
//     where: { slug },
//     select: { id: true },
//   });

//   if (existing && existing.id !== ignoreCaseStudyId) {
//     throw new Error("Slug already exists. Please choose another.");
//   }
// }

// /////////////////////////////////////////////////
// // 🟢 CREATE CASE STUDY
// /////////////////////////////////////////////////

// export async function createCaseStudy(data: {
//   title: string;
//   slug?: string;
//   clientName?: string;
//   industry?: string;
//   projectTimeline?: string;
//   teamSize?: number;
//   challenge?: string;
//   solution?: string;
//   results?: string;
//   keyMetrics?: Record<string, string | number | boolean>;
//   testimonial?: string;
//   testimonialAuthor?: string;
//   imageUrl?: string;
//   imageCredit?: string;
//   publicId?: string;
//   content: string;
//   excerpt?: string;
//   published?: boolean;
//   featured?: boolean;
//   categoryName?: string;
//   tagNames?: string[];
//   projectId?: string;
//   authorEmail?: string;
// }) {
//   const user = await requireAdminOrAuthor();

//   const slug = normalizeSlug(data.slug);
//   await ensureUniqueSlug(slug);

//   const categoryName = cleanString(data.categoryName);
//   const tagNames = cleanStringArray(data.tagNames);

//   const authorEmail =
//     user.role === Role.ADMIN
//       ? cleanString(data.authorEmail) ?? user.email ?? null
//       : user.email ?? null;

//   if (!authorEmail) {
//     throw new Error("Author email is required");
//   }

//   const author = await db.user.findUnique({
//     where: { email: authorEmail },
//     select: { email: true },
//   });

//   if (!author) {
//     throw new Error("Author not found");
//   }

//   if (data.projectId) {
//     const project = await db.project.findUnique({
//       where: { id: data.projectId },
//       select: { id: true },
//     });

//     if (!project) {
//       throw new Error("Selected project does not exist");
//     }
//   }

//   const caseStudy = await db.caseStudy.create({
//     data: {
//       title: data.title.trim(),
//       slug,
//       clientName: cleanString(data.clientName),
//       industry: cleanString(data.industry),
//       projectTimeline: cleanString(data.projectTimeline),
//       teamSize: data.teamSize ?? null,
//       challenge: cleanString(data.challenge),
//       solution: cleanString(data.solution),
//       results: cleanString(data.results),
//       keyMetrics: data.keyMetrics ?? Prisma.JsonNull,
//       testimonial: cleanString(data.testimonial),
//       testimonialAuthor: cleanString(data.testimonialAuthor),
//       imageUrl: cleanString(data.imageUrl),
//       imageCredit: cleanString(data.imageCredit),
//       publicId: cleanString(data.publicId),
//       content: data.content.trim(),
//       excerpt: cleanString(data.excerpt),
//       published: data.published ?? false,
//       featured: data.featured ?? false,
//       authorEmail,
//       projectId: cleanString(data.projectId),
//       category: categoryName
//         ? {
//             connectOrCreate: {
//               where: { catName: categoryName },
//               create: { catName: categoryName },
//             },
//           }
//         : undefined,
//       tags: tagNames.length
//         ? {
//             connectOrCreate: tagNames.map((tagName) => ({
//               where: { tagName },
//               create: { tagName },
//             })),
//           }
//         : undefined,
//     },
//     include: {
//       author: true,
//       category: true,
//       tags: true,
//       gallery: true,
//       project: true,
//     },
//   });

//   revalidatePath("/admin/case-studies");
//   revalidatePath("/case-studies");

//   if (caseStudy.slug) {
//     revalidatePath(`/case-studies/${caseStudy.slug}`);
//   }

//   return caseStudy;
// }

// /////////////////////////////////////////////////
// // 🟡 UPDATE CASE STUDY
// /////////////////////////////////////////////////

// export async function updateCaseStudy(
//   id: string,
//   data: {
//     title?: string;
//     slug?: string;
//     clientName?: string | null;
//     industry?: string | null;
//     projectTimeline?: string | null;
//     teamSize?: number | null;
//     challenge?: string | null;
//     solution?: string | null;
//     results?: string | null;
//     keyMetrics?: Record<string, string | number | boolean> | null;
//     testimonial?: string | null;
//     testimonialAuthor?: string | null;
//     imageUrl?: string | null;
//     imageCredit?: string | null;
//     publicId?: string | null;
//     content?: string;
//     excerpt?: string | null;
//     published?: boolean;
//     featured?: boolean;
//     categoryName?: string | null;
//     tagNames?: string[];
//     projectId?: string | null;
//     authorEmail?: string | null;
//   }
// ) {
//   const { user, caseStudy: existingCaseStudy } =
//     await requireCaseStudyAccess(id);

//   const slug = normalizeSlug(data.slug);

//   if (slug) {
//     await ensureUniqueSlug(slug, id);
//   }

//   const categoryName =
//     data.categoryName !== undefined ? cleanString(data.categoryName) : undefined;

//   const tagNames = data.tagNames !== undefined ? cleanStringArray(data.tagNames) : undefined;

//   if (data.projectId !== undefined && data.projectId) {
//     const project = await db.project.findUnique({
//       where: { id: data.projectId },
//       select: { id: true },
//     });

//     if (!project) {
//       throw new Error("Selected project does not exist");
//     }
//   }

//   let nextAuthorEmail: string | undefined;

//   if (data.authorEmail !== undefined) {
//     if (user.role !== Role.ADMIN) {
//       throw new Error("Only admin can change case study author");
//     }

//     const cleanedAuthorEmail = cleanString(data.authorEmail);

//     if (!cleanedAuthorEmail) {
//       nextAuthorEmail = undefined;
//     } else {
//       const author = await db.user.findUnique({
//         where: { email: cleanedAuthorEmail },
//         select: { email: true },
//       });

//       if (!author) {
//         throw new Error("Author not found");
//       }

//       nextAuthorEmail = cleanedAuthorEmail;
//     }
//   }

//   const caseStudy = await db.caseStudy.update({
//     where: { id },
//     data: {
//       title: data.title?.trim(),
//       slug,
//       clientName:
//         data.clientName !== undefined ? cleanString(data.clientName) : undefined,
//       industry:
//         data.industry !== undefined ? cleanString(data.industry) : undefined,
//       projectTimeline:
//         data.projectTimeline !== undefined
//           ? cleanString(data.projectTimeline)
//           : undefined,
//       teamSize: data.teamSize === undefined ? undefined : data.teamSize,
//       challenge:
//         data.challenge !== undefined ? cleanString(data.challenge) : undefined,
//       solution:
//         data.solution !== undefined ? cleanString(data.solution) : undefined,
//       results:
//         data.results !== undefined ? cleanString(data.results) : undefined,
//       keyMetrics:
//         data.keyMetrics !== undefined
//           ? data.keyMetrics ?? Prisma.JsonNull
//           : undefined,
//       testimonial:
//         data.testimonial !== undefined
//           ? cleanString(data.testimonial)
//           : undefined,
//       testimonialAuthor:
//         data.testimonialAuthor !== undefined
//           ? cleanString(data.testimonialAuthor)
//           : undefined,
//       imageUrl:
//         data.imageUrl !== undefined ? cleanString(data.imageUrl) : undefined,
//       imageCredit:
//         data.imageCredit !== undefined
//           ? cleanString(data.imageCredit)
//           : undefined,
//       publicId:
//         data.publicId !== undefined ? cleanString(data.publicId) : undefined,
//       content: data.content?.trim(),
//       excerpt:
//         data.excerpt !== undefined ? cleanString(data.excerpt) : undefined,
//       published: data.published,
//       featured: data.featured,
//       authorEmail: nextAuthorEmail,
//       projectId:
//         data.projectId !== undefined ? cleanString(data.projectId) : undefined,
//       category:
//         categoryName !== undefined
//           ? categoryName
//             ? {
//                 connectOrCreate: {
//                   where: { catName: categoryName },
//                   create: { catName: categoryName },
//                 },
//               }
//             : {
//                 disconnect: true,
//               }
//           : undefined,
//       tags:
//         tagNames !== undefined
//           ? {
//               set: [],
//               connectOrCreate: tagNames.map((tagName) => ({
//                 where: { tagName },
//                 create: { tagName },
//               })),
//             }
//           : undefined,
//     },
//     include: {
//       author: true,
//       category: true,
//       tags: true,
//       gallery: true,
//       project: true,
//     },
//   });

//   revalidatePath("/admin/case-studies");
//   revalidatePath(`/admin/case-studies/${id}`);
//   revalidatePath("/case-studies");

//   if (
//     existingCaseStudy.slug &&
//     existingCaseStudy.slug !== caseStudy.slug
//   ) {
//     revalidatePath(`/case-studies/${existingCaseStudy.slug}`);
//   }

//   if (caseStudy.slug) {
//     revalidatePath(`/case-studies/${caseStudy.slug}`);
//   }

//   return caseStudy;
// }

// /////////////////////////////////////////////////
// // 🔴 DELETE CASE STUDY
// /////////////////////////////////////////////////

// export async function deleteCaseStudy(id: string) {
//   const { caseStudy } = await requireCaseStudyAccess(id);

//   await db.caseStudy.delete({
//     where: { id },
//   });

//   revalidatePath("/admin/case-studies");
//   revalidatePath("/case-studies");

//   if (caseStudy.slug) {
//     revalidatePath(`/case-studies/${caseStudy.slug}`);
//   }

//   return { success: true };
// }

// /////////////////////////////////////////////////
// // 🔵 ADMIN/AUTHOR: GET ALL CASE STUDIES
// /////////////////////////////////////////////////

// export async function getAllCaseStudies() {
//   const user = await requireAdminOrAuthor();

//   if (user.role === Role.ADMIN) {
//     return db.caseStudy.findMany({
//       orderBy: { createdAt: "desc" },
//       include: {
//         author: true,
//         category: true,
//         tags: true,
//         gallery: true,
//         project: true,
//       },
//     });
//   }

//   return db.caseStudy.findMany({
//     where: { authorEmail: user.email ?? undefined },
//     orderBy: { createdAt: "desc" },
//     include: {
//       author: true,
//       category: true,
//       tags: true,
//       gallery: true,
//       project: true,
//     },
//   });
// }

// /////////////////////////////////////////////////
// // 🌍 PUBLIC: GET PUBLISHED CASE STUDIES
// /////////////////////////////////////////////////

// export async function getPublicCaseStudies() {
//   return db.caseStudy.findMany({
//     where: { published: true },
//     orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
//     include: {
//       author: true,
//       category: true,
//       tags: true,
//       gallery: true,
//       project: true,
//     },
//   });
// }

// /////////////////////////////////////////////////
// // 🌍 PUBLIC: GET CASE STUDY BY SLUG
// /////////////////////////////////////////////////

// export async function getPublicCaseStudyBySlug(slug: string) {
//   return db.caseStudy.findFirst({
//     where: {
//       slug,
//       published: true,
//     },
//     include: {
//       author: true,
//       category: true,
//       tags: true,
//       gallery: true,
//       project: true,
//     },
//   });
// }

// /////////////////////////////////////////////////
// // 🔎 AUTHOR/ADMIN: GET CASE STUDY BY ID
// /////////////////////////////////////////////////

// export async function getCaseStudyById(id: string) {
//   const { caseStudy } = await requireCaseStudyAccess(id);

//   return db.caseStudy.findUnique({
//     where: { id: caseStudy.id },
//     include: {
//       author: true,
//       category: true,
//       tags: true,
//       gallery: true,
//       project: true,
//     },
//   });
// }