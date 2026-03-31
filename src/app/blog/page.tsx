import { getPublicPosts } from "@/lib/actions/posts";
import { getCategories } from "@/lib/actions/categories";
import PostFilters from "@/components/posts/PostFilters";
import { Type } from "@prisma/client";
import PostCard from "@/components/posts/PostCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
      <div className="mt-8 md:mt-16 lg:mt-24">
        <Link
          href="/services"
          className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
        >
          {/* subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          {/* glow effect */}
          <div className="absolute right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

          <span className="relative z-10 flex items-center gap-2">
            See Services & Solutions
            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7" />
          </span>
        </Link>
      
        <Link
          href="/packages"
          className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
        >
          {/* subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          {/* glow effect */}
          <div className="absolute right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

          <span className="relative z-10 flex items-center gap-2">
            See Our Packages
            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7" />
          </span>
        </Link> 
      <Link
        href="/contact"
        className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
      >
        {/* subtle top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        {/* glow effect */}
        <div className="absolute right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

        <span className="relative z-10 flex items-center gap-2">
          Contact Us
          <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7" />
        </span>
      </Link>
      </div>
    </main>
  );
}