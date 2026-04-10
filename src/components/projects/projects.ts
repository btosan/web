import {
  Project as DbProject,
  ProjectCategory,
  ProjectTag,
  ProjectType,
} from "@prisma/client";

// UI-friendly display types (what your ProjectCard expects)
export type ProjectCardType =
  | "full-stack"
  | "frontend"
  | "ai"
  | "automation"
  | "backend"
  | "mobile"
  | "web3"
  | "website";

// Mapping from Prisma enum → nice display string for the card
const projectTypeMap: Record<ProjectType, ProjectCardType> = {
  FULLSTACK: "full-stack",
  FRONTEND: "frontend",
  AI: "ai",
  AUTOMATION: "automation",
  BACKEND: "backend",
  MOBILE: "mobile",
  WEB3: "web3",
  OTHER: "website",
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  liveUrl?: string;
  isNew?: boolean;
  type: ProjectCardType;           // This stays the same for your components
  category?: string;
  tags?: string[];
};

export type ProjectWithRelations = DbProject & {
  category?: ProjectCategory | null;
  tags?: ProjectTag[];
};

// Clean & safe mapping (handles undefined, null, and any future enum values)
export function mapProjectType(type?: ProjectType | null): ProjectCardType {
  if (!type) return "website";
  return projectTypeMap[type] ?? "website";
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