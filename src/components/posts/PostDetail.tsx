import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  getPublicPostBySlug,
  getRelatedPostsByCategory,
  incrementPostViewsBySlug,
} from "@/lib/actions/posts";
import { getCommentsByPostSlug } from "@/lib/actions/comments";
import { getLikeStatus } from "@/lib/actions/likes";

import CommentForm from "@/components/forms/posts/comments/CommentForm";
import CommentList from "@/components/forms/posts/comments/CommentList";
import LikeButton from "@/components/forms/posts/LikeButton";
import ViewTracker from "@/components/posts/ViewTracker";
import RichTextDisplay from "@/components/editorOld/RichTextDisplay";
import PostDetailEnhancements from "@/components/posts/PostDetailEnhancements";

function getPostHref(type: string, slug: string | null | undefined) {
  const safeSlug = slug ?? "";

  switch (type) {
    case "GUIDE":
      return `/guides/${safeSlug}`;
    case "RESOURCES":
      return `/resources/${safeSlug}`;
    default:
      return `/blog/${safeSlug}`;
  }
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getReadingTime(content: string) {
  const plainText = stripHtml(content);
  const wordCount = plainText ? plainText.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

export default async function PostDetail({ slug }: { slug: string }) {
  let post = await getPublicPostBySlug(slug);

  if (!post) {
    notFound();
  }

  await incrementPostViewsBySlug(slug);

  post = await getPublicPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const resolvedSlug = post.slug ?? slug;

  const [comments, relatedPosts, likeStatus] = await Promise.all([
    getCommentsByPostSlug(resolvedSlug),
    getRelatedPostsByCategory(post.id, post.category?.catName, 3),
    getLikeStatus(resolvedSlug),
  ]);

  const postHref = getPostHref(post.type, post.slug);
  const readingTime = getReadingTime(post.content || "");

  return (
    <main className="min-h-screen bg-black px-6 py-14 md:px-12 lg:px-16 xl:px-20">
      <PostDetailEnhancements
        title={post.title}
        urlPath={postHref}
        tableOfContents={post.tableOfContents || ""}
      />

      <div className="mx-auto max-w-7xl">
        <ViewTracker slug={resolvedSlug} />

        <header className="mb-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-purple-800/40 bg-purple-950/30 px-3 py-1 text-purple-200">
              {post.type}
            </span>

            {post.category?.catName && (
              <span className="text-gray-400">{post.category.catName}</span>
            )}

            <span className="text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>

            <span className="text-gray-600">•</span>

            <span className="text-gray-400">{readingTime}</span>
          </div>

          <h1 className="mt-4 text-4xl font-semibold leading-tight text-purple-50 md:text-5xl">
            {post.title}
          </h1>

          {post.openingParagraph && (
            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-400">
              {post.openingParagraph}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-400">
            <span>{post._count.comments} comments</span>
            <span>{post._count.likes} likes</span>
            <span>{post.views} views</span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8">
            {post.imageUrl && (
              <div className="mb-10 overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
                <Image
                  src={post.imageUrl || "/placeholder.png"}
                  alt={post.title}
                  width={1400}
                  height={780}
                  className="h-[260px] w-full object-cover md:h-[360px] lg:h-[420px]"
                  priority
                />
              </div>
            )}

            <div
              className="
                prose prose-invert max-w-none
                prose-headings:text-purple-50
                prose-p:text-gray-300
                prose-p:leading-8
                prose-li:text-gray-300
                prose-strong:text-white
                prose-a:text-purple-300
                prose-code:text-purple-200
                prose-pre:border prose-pre:border-gray-800
                prose-pre:bg-gray-950
                prose-blockquote:border-purple-800/40
                prose-blockquote:text-gray-300
              "
            >
              <RichTextDisplay content={post.content} />
            </div>

            {post.tags.length > 0 && (
              <section className="mt-12">
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full border border-gray-800 bg-gray-900 px-3 py-1 text-sm text-gray-300"
                    >
                      #{tag.tagName}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-10">
              <LikeButton
                postSlug={resolvedSlug}
                initialLiked={likeStatus.liked}
                initialCount={post._count.likes}
              />
            </section>

            <section
              id="comments"
              className="mt-20 space-y-6 border-t border-gray-800 pt-10"
            >
              <h2 className="text-2xl font-semibold text-purple-50">Comments</h2>
              <CommentForm postSlug={resolvedSlug} />
              <CommentList comments={comments} postSlug={resolvedSlug} />
            </section>
          </article>

          <aside className="self-start space-y-6 lg:sticky lg:top-24 lg:col-span-4">
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
              <h2 className="mb-4 text-lg font-semibold text-purple-100">
                Post info
              </h2>

              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-3">
                  <span className="text-gray-500">Type</span>
                  <span className="text-right text-gray-200">{post.type}</span>
                </div>

                <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-3">
                  <span className="text-gray-500">Category</span>
                  <span className="text-right text-gray-200">
                    {post.category?.catName || "—"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-3">
                  <span className="text-gray-500">Published</span>
                  <span className="text-right text-gray-200">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-3">
                  <span className="text-gray-500">Reading time</span>
                  <span className="text-right text-gray-200">{readingTime}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-500">Views</span>
                  <span className="text-right text-gray-200">{post.views}</span>
                </div>
              </div>
            </div>

            {post.tableOfContents && (
              <section className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
                <h2 className="mb-4 text-lg font-semibold text-purple-100">
                  Table of contents
                </h2>

                <div className="whitespace-pre-line text-sm leading-7 text-gray-300">
                  {post.tableOfContents}
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
              <h2 className="mb-4 text-lg font-semibold text-purple-100">
                Quick actions
              </h2>

              <div className="space-y-3 text-sm text-gray-300">
                <Link
                  href={postHref}
                  className="block rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 transition hover:border-purple-500 hover:text-white"
                >
                  Refresh article
                </Link>

                <a
                  href="#comments"
                  className="block rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 transition hover:border-purple-500 hover:text-white"
                >
                  Join the discussion
                </a>
              </div>
            </section>
          </aside>
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-20 border-t border-gray-800 pt-10">
            <h2 className="mb-8 text-2xl font-semibold text-purple-50">
              Related posts
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={getPostHref(related.type, related.slug)}
                  className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 transition hover:-translate-y-1 hover:border-purple-500"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-900">
                    <img
                      src={related.imageUrl || "/placeholder.png"}
                      alt={related.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-3 p-5">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="rounded-full border border-purple-800/40 bg-purple-950/30 px-3 py-1 text-purple-200">
                        {related.type}
                      </span>

                      {related.category?.catName ? (
                        <span className="text-gray-400">
                          {related.category.catName}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="line-clamp-2 text-lg font-semibold text-gray-50 group-hover:text-purple-100">
                      {related.title}
                    </h3>

                    {related.openingParagraph ? (
                      <p className="line-clamp-3 text-sm leading-6 text-gray-400">
                        {related.openingParagraph}
                      </p>
                    ) : null}

                    <div className="flex items-center gap-4 pt-1 text-xs text-gray-500">
                      <span>{related._count.comments} comments</span>
                      <span>{related._count.likes} likes</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}