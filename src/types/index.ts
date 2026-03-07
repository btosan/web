// types/index.ts

import type { Prisma } from "@prisma/client";

// ────────────────────────────────────────────────
// Re-export Prisma generated models & enums
// ────────────────────────────────────────────────

export type {
  Account,
  Session,
  User,
  VerificationToken,
  Post,
  Category,
  Comment,
  Like,
  Tag,
  CaseStudy,
  CaseStudyTag,
  CaseStudyCategory,
  Project,
  Gallery,
  ProjectTag,
  ProjectCategory,
  Role,
  Type,
  ProjectType,
} from "@prisma/client";

// ────────────────────────────────────────────────
// Prisma Input Helpers
// ────────────────────────────────────────────────

export type UserCreateInput = Prisma.UserCreateInput;
export type UserUpdateInput = Prisma.UserUpdateInput;

export type PostCreateInput = Prisma.PostCreateInput;
export type PostUpdateInput = Prisma.PostUpdateInput;

export type ProjectCreateInput = Prisma.ProjectCreateInput;
export type ProjectUpdateInput = Prisma.ProjectUpdateInput;

export type CaseStudyCreateInput = Prisma.CaseStudyCreateInput;
export type CaseStudyUpdateInput = Prisma.CaseStudyUpdateInput;


// ────────────────────────────────────────────────
// USER HELPERS
// ────────────────────────────────────────────────

export type UserWithPosts =
  Prisma.UserGetPayload<{
    include: { posts: true };
  }>;

export type UserWithCaseStudies =
  Prisma.UserGetPayload<{
    include: { caseStudies: true };
  }>;

export type UserProfile =
  Prisma.UserGetPayload<{
    select: {
      id: true;
      name: true;
      username: true;
      image: true;
      bio: true;
      role: true;
    };
  }>;

// ────────────────────────────────────────────────
// POST HELPERS
// ────────────────────────────────────────────────

export type PostWithAuthor =
  Prisma.PostGetPayload<{
    include: { author: true };
  }>;

export type PostWithRelations =
  Prisma.PostGetPayload<{
    include: {
      author: true;
      category: true;
      tags: true;
      comments: true;
      likes: true;
    };
  }>;

export type PostCard =
  Prisma.PostGetPayload<{
    select: {
      id: true;
      title: true;
      slug: true;
      imageUrl: true;
      openingParagraph: true;
      createdAt: true;
      views: true;
      author: {
        select: {
          name: true;
          image: true;
        };
      };
    };
  }>;

// ────────────────────────────────────────────────
// COMMENT HELPERS
// ────────────────────────────────────────────────

export type CommentWithUser =
  Prisma.CommentGetPayload<{
    include: { user: true };
  }>;

// ────────────────────────────────────────────────
// CASE STUDY HELPERS
// ────────────────────────────────────────────────

export type CaseStudyWithAuthor =
  Prisma.CaseStudyGetPayload<{
    include: { author: true };
  }>;

export type CaseStudyWithRelations =
  Prisma.CaseStudyGetPayload<{
    include: {
      author: true;
      gallery: true;
      tags: true;
      category: true;
      project: true;
    };
  }>;

export type FeaturedCaseStudy =
  Prisma.CaseStudyGetPayload<{
    where: { featured: true };
    include: {
      gallery: true;
      tags: true;
      category: true;
    };
  }>;

// ────────────────────────────────────────────────
// PROJECT HELPERS
// ────────────────────────────────────────────────

export type ProjectEssential = Pick<
  Prisma.ProjectGetPayload<{}>,
  | "id"
  | "title"
  | "slug"
  | "imageUrl"
  | "shortDescription"
  | "featured"
  | "createdAt"
  | "updatedAt"
>;

export type ProjectWithGallery =
  Prisma.ProjectGetPayload<{
    include: { galleries: true };
  }>;

export type ProjectWithCaseStudies =
  Prisma.ProjectGetPayload<{
    include: {
      caseStudies: true;
    };
  }>;

export type ProjectFull =
  Prisma.ProjectGetPayload<{
    include: {
      galleries: true;
      tags: true;
      category: true;
      caseStudies: true;
    };
  }>;

// ────────────────────────────────────────────────
// GALLERY HELPERS
// ────────────────────────────────────────────────

export type GalleryWithProject =
  Prisma.GalleryGetPayload<{
    include: { project: true };
  }>;

export type GalleryWithCaseStudy =
  Prisma.GalleryGetPayload<{
    include: { caseStudy: true };
  }>;

// ────────────────────────────────────────────────
// CATEGORY HELPERS
// ────────────────────────────────────────────────

export type CategoryWithPosts =
  Prisma.CategoryGetPayload<{
    include: { posts: true };
  }>;

export type CaseStudyCategoryWithStudies =
  Prisma.CaseStudyCategoryGetPayload<{
    include: { caseStudies: true };
  }>;

export type ProjectCategoryWithProjects =
  Prisma.ProjectCategoryGetPayload<{
    include: { projects: true };
  }>;

// ────────────────────────────────────────────────
// TAG HELPERS
// ────────────────────────────────────────────────

export type TagWithPosts =
  Prisma.TagGetPayload<{
    include: { posts: true };
  }>;

export type CaseStudyTagWithStudies =
  Prisma.CaseStudyTagGetPayload<{
    include: { caseStudies: true };
  }>;

export type ProjectTagWithProjects =
  Prisma.ProjectTagGetPayload<{
    include: { projects: true };
  }>;

// ────────────────────────────────────────────────
// UTILITY TYPES
// ────────────────────────────────────────────────

export type PartialBy<T, K extends keyof T> =
  Omit<T, K> & Partial<Pick<T, K>>;

export type CreateWithoutAutoFields<T> = Omit<
  T,
  "id" | "createdAt" | "updatedAt"
>;