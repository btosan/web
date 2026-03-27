import { getPublicPosts } from "@/lib/actions/posts";
import { getCategories } from "@/lib/actions/categories";
import PostCard from "@/components/posts/PostCard";
import PostFilters from "@/components/posts/PostFilters";
import { Type } from "@prisma/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Read our guides on development, design, strategy, and digital growth.",
};

interface Props {
  searchParams: Promise<{
    search?: string;
    category?: string;
    tag?: string;
  }>;
}

export default async function GuidePage({ searchParams }: Props) {
  const params = await searchParams;

  const [posts, categories] = await Promise.all([
    getPublicPosts({
      type: Type.GUIDE,
      search: params.search,
      categoryName: params.category,
      tagName: params.tag,
    }),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-black px-6 py-14 md:px-12 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold text-purple-50 md:text-5xl lg:text-6xl">
            Guides
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Thoughts, lessons, ideas, and articles across design, development,
            and digital growth.
          </p>
        </div>

        <PostFilters categories={categories} />

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-950 px-6 py-16 text-center text-gray-400">
            No guides found.
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