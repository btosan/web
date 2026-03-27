import { getPublicPosts } from "@/lib/actions/posts";
import { getCategories } from "@/lib/actions/categories";
import PostFilters from "@/components/posts/PostFilters";
import { Type } from "@prisma/client";
import PostCard from "@/components/posts/PostCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read blog posts on development, design, strategy, and digital growth.",
};

interface PostGridSectionProps {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  posts: any[];
}

export function PostGridSection({
  title,
  description,
  href,
  linkLabel,
  posts,
}: PostGridSectionProps) {
  if (!posts.length) return null;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-purple-50 md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 max-w-2xl text-gray-400">{description}</p>
          ) : null}
        </div>

        {href && linkLabel ? (
          <Link
            href={href}
            className="text-sm text-purple-300 transition hover:text-purple-200"
          >
            {linkLabel}
          </Link>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    tag?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  const [posts, categories] = await Promise.all([
    getPublicPosts({
      type: Type.BLOG,
      search: params.search,
      categoryName: params.category,
      tagName: params.tag,
    }),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-black px-6 py-8 md:py-12 lg:py-14 md:px-12 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold text-purple-50 md:text-5xl lg:text-6xl">
            Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Thoughts, lessons, ideas, and articles across design, development,
            and digital growth.
          </p>
        </div>

        <PostFilters categories={categories} />

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-950 px-6 py-16 text-center text-gray-400">
            No blog posts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}