"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ProjectType, Role } from "@prisma/client";

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

function cleanStringArray(values?: string[]) {
  if (!values?.length) return [];
  return [...new Set(values.map((v) => v.trim()).filter(Boolean))];
}

async function ensureUniqueSlug(
  slug: string | undefined,
  ignoreProjectId?: string
) {
  if (!slug) return;

  const existing = await db.project.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existing && existing.id !== ignoreProjectId) {
    throw new Error("Slug already exists. Please choose another.");
  }
}

/////////////////////////////////////////////////
// 🟢 CREATE PROJECT
/////////////////////////////////////////////////

export async function createProject(data: {
  title: string;
  slug?: string;
  imageUrl?: string;
  imageCredit?: string;
  imageUrls?: string[];
  imageCreditUrls?: string[];
  shortDescription?: string;
  description: string;
  featured?: boolean;
  type?: ProjectType;
  categoryName?: string;
  tagNames?: string[];
  projectUrl?: string;
}) {
  await requireAdmin();

  const slug = normalizeSlug(data.slug);
  await ensureUniqueSlug(slug);

  const categoryName = cleanString(data.categoryName);
  const tagNames = cleanStringArray(data.tagNames);

  const project = await db.project.create({
    data: {
      title: data.title.trim(),
      slug,
      imageUrl: cleanString(data.imageUrl),
      imageCredit: cleanString(data.imageCredit),
      imageUrls: cleanStringArray(data.imageUrls),
      imageCreditUrls: cleanStringArray(data.imageCreditUrls),
      shortDescription: cleanString(data.shortDescription),
      description: data.description.trim(),
      featured: data.featured ?? false,
      type: data.type ?? ProjectType.FULLSTACK,
      projectUrl: cleanString(data.projectUrl),
      category: categoryName
        ? {
            connect: { catName: categoryName },
          }
        : undefined,
      tags: tagNames.length
        ? {
            connectOrCreate: tagNames.map((tagName) => ({
              where: { tagName },
              create: { tagName },
            })),
          }
        : undefined,
    },
    include: {
      category: true,
      tags: true,
      galleries: true,
      caseStudies: true,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");

  if (project.slug) {
    revalidatePath(`/projects/${project.slug}`);
  }

  return project;
}

/////////////////////////////////////////////////
// 🟡 UPDATE PROJECT
/////////////////////////////////////////////////

export async function updateProject(
  id: string,
  data: {
    title?: string;
    slug?: string;
    imageUrl?: string | null;
    imageCredit?: string | null;
    imageUrls?: string[];
    imageCreditUrls?: string[];
    shortDescription?: string | null;
    description?: string;
    featured?: boolean;
    type?: ProjectType;
    categoryName?: string | null;
    tagNames?: string[];
    projectUrl?: string | null;
  }
) {
  await requireAdmin();

  const existingProject = await db.project.findUnique({
    where: { id },
    select: { id: true, slug: true },
  });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  const slug = normalizeSlug(data.slug);

  if (slug) {
    await ensureUniqueSlug(slug, id);
  }

  const categoryName =
    data.categoryName !== undefined ? cleanString(data.categoryName) : undefined;

  const tagNames = data.tagNames !== undefined ? cleanStringArray(data.tagNames) : undefined;

  const project = await db.$transaction(async (tx) => {
    const updated = await tx.project.update({
      where: { id },
      data: {
        title: data.title?.trim(),
        slug,
        imageUrl:
          data.imageUrl !== undefined ? cleanString(data.imageUrl) : undefined,
        imageCredit:
          data.imageCredit !== undefined
            ? cleanString(data.imageCredit)
            : undefined,
        imageUrls:
          data.imageUrls !== undefined
            ? cleanStringArray(data.imageUrls)
            : undefined,
        imageCreditUrls:
          data.imageCreditUrls !== undefined
            ? cleanStringArray(data.imageCreditUrls)
            : undefined,
        shortDescription:
          data.shortDescription !== undefined
            ? cleanString(data.shortDescription)
            : undefined,
        description: data.description?.trim(),
        featured: data.featured,
        type: data.type,
        projectUrl:
          data.projectUrl !== undefined
            ? cleanString(data.projectUrl)
            : undefined,
        category:
          categoryName !== undefined
            ? categoryName
              ? {
                  connect: { catName: categoryName },
                }
              : {
                  disconnect: true,
                }
            : undefined,
        tags:
          tagNames !== undefined
            ? {
                set: [],
                connectOrCreate: tagNames.map((tagName) => ({
                  where: { tagName },
                  create: { tagName },
                })),
              }
            : undefined,
      },
      include: {
        category: true,
        tags: true,
        galleries: true,
        caseStudies: true,
      },
    });

    return updated;
  });

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  revalidatePath("/projects");

  if (existingProject.slug && existingProject.slug !== project.slug) {
    revalidatePath(`/projects/${existingProject.slug}`);
  }

  if (project.slug) {
    revalidatePath(`/projects/${project.slug}`);
  }

  return project;
}

/////////////////////////////////////////////////
// 🔴 DELETE PROJECT
/////////////////////////////////////////////////

export async function deleteProject(id: string) {
  await requireAdmin();

  const project = await db.project.findUnique({
    where: { id },
    select: { slug: true },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  await db.project.delete({
    where: { id },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");

  if (project.slug) {
    revalidatePath(`/projects/${project.slug}`);
  }

  return { success: true };
}

/////////////////////////////////////////////////
// 🔵 ADMIN: GET ALL PROJECTS
/////////////////////////////////////////////////

export async function getAllProjects() {
  await requireAdmin();

  return db.project.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    include: {
      category: true,
      tags: true,
      galleries: true,
      caseStudies: true,
    },
  });
}

/////////////////////////////////////////////////
// 🌍 PUBLIC: GET PROJECTS
/////////////////////////////////////////////////

export async function getPublicProjects() {
  return db.project.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    include: {
      category: true,
      tags: true,
      galleries: true,
      caseStudies: true,
    },
  });
}

/////////////////////////////////////////////////
// 🌍 PUBLIC: GET PROJECT BY SLUG
/////////////////////////////////////////////////

export async function getPublicProjectBySlug(slug: string) {
  return db.project.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: true,
      galleries: true,
      caseStudies: {
        where: { published: true },
        include: {
          category: true,
          tags: true,
        },
      },
    },
  });
}

// export async function getPublicProjectBySlug(slug: string) {
//   return db.project.findFirst({
//     where: { slug },
//     include: {
//       category: true,
//       tags: true,
//       galleries: true,
//       caseStudies: {
//         where: { published: true },
//         include: {
//           category: true,
//           tags: true,
//         },
//       },
//     },
//   });
// }

/////////////////////////////////////////////////
// 🔎 ADMIN: GET PROJECT BY ID & SLUG
/////////////////////////////////////////////////

export async function getProjectById(id: string) {
  await requireAdmin();

  return db.project.findUnique({
    where: { id },
    include: {
      category: true,
      tags: true,
      galleries: true,
      caseStudies: true,
    },
  });
}

export async function getProjectBySlug(slug: string) {
  await requireAdmin();

  return db.project.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: true,
      galleries: true,
      caseStudies: true,
    },
  });
}

export async function getFeaturedPublicProjects() {
  return db.project.findMany({
    where: {
      featured: true,
    },
    orderBy: [{ createdAt: "desc" }],
    include: {
      category: true,
      tags: true,
      galleries: true,
      caseStudies: true,
    },
  });
}

export async function getRelatedProjects(
  projectId: string,
  catName?: string | null
) {
  // First try: same category
  const related = await db.project.findMany({
    where: {
      id: { not: projectId },
      ...(catName ? { catName } : {}),
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      tags: true,
    },
  });

  // Fallback if less than 4
  if (related.length < 4) {
    const fallback = await db.project.findMany({
      where: {
        id: {
          notIn: [projectId, ...related.map((p) => p.id)],
        },
      },
      take: 4 - related.length,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return [...related, ...fallback];
  }

  return related;
}

/////////////////////////////////////////////////
// PROJECTS FOR CASE STUDY FORM (used in create/edit)
/////////////////////////////////////////////////

export async function getProjects() {
  // No admin check needed for form dropdown (anyone editing can see projects)
  return db.project.findMany({
    orderBy: { title: "asc" }, 
    select: {
      id: true,
      title: true,
      slug: true,
      type: true,
      createdAt: true,
      updatedAt: true,
      imageUrl: true,
      imageCredit: true,
      description: true,  
      projectUrl: true,
      featured: true,
      catName: true,
      imageUrls: true,
      imageCreditUrls: true,
      shortDescription: true,
    },
  });
}

