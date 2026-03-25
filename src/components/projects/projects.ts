import {
  Project as DbProject,
  ProjectCategory,
  ProjectTag,
  ProjectType,
} from "@prisma/client";

export type ProjectCardType =
  | "full-stack"
  | "frontend"
  | "ai"
  | "website"
  | "automation";

export type Project = {
  id: string;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  liveUrl?: string;
  isNew?: boolean;
  type: ProjectCardType;
  category?: string;
  tags?: string[];
};

export type ProjectWithRelations = DbProject & {
  category?: ProjectCategory | null;
  tags?: ProjectTag[];
};

export function mapProjectType(type?: ProjectType | null): ProjectCardType {
  switch (type) {
    case "FRONTEND":
      return "frontend";
    case "AI":
      return "ai";
    case "AUTOMATION":
      return "automation";
    case "FULLSTACK":
      return "full-stack";
    case "BACKEND":
    case "MOBILE":
    case "WEB3":
    case "OTHER":
    default:
      return "website";
  }
}

export function toProjectCard(project: ProjectWithRelations): Project {
  const createdAt = new Date(project.createdAt).getTime();
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  return {
    id: project.id,
    title: project.title,
    slug: project.slug || project.id,
    image: project.imageUrl || project.imageUrls?.[0] || "/placeholder.png",
    excerpt: project.shortDescription || project.description || "",
    liveUrl: project.projectUrl || undefined,
    isNew: createdAt >= sevenDaysAgo,
    type: mapProjectType(project.type),
    category: project.category?.catName || undefined,
    tags: project.tags?.map((tag) => tag.tagName) || [],
  };
}