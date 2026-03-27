import Link from "next/link";
import { getAllPosts } from "@/lib/actions/posts";
import { AppButton } from "@/components/ui/AppButton";
import { Type } from "@prisma/client";

function getTypeHref(type: string) {
  switch (type) {
    case "GUIDE":
      return "/admin/guides/create";
    case "RESOURCES":
      return "/admin/resources/create";
    default:
      return "/admin/blog/create";
  }
}

function getPostHref(type: Type | null, slug: string) {
  switch (type) {
    case Type.GUIDE:
      return `/guides/${slug}`;
    case Type.RESOURCES:
      return `/resources/${slug}`;
    default:
      return `/blog/${slug}`;
  }
}

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-black px-6 py-10 md:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-purple-50">Posts</h1>
            <p className="mt-2 text-sm text-gray-400">
              Manage blog posts, guides, and resources.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin/blog/create">
              <AppButton className="hover:cursor-pointer">New blog</AppButton>
            </Link>
            <Link href="/admin/guides/create">
              <AppButton
                variant="outline"
                className="hover:cursor-pointer text-gray-200"
              >
                New guide
              </AppButton>
            </Link>
            <Link href="/admin/resources/create">
              <AppButton
                variant="outline"
                className="hover:cursor-pointer text-gray-200"
              >
                New resource
              </AppButton>
            </Link>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8 text-gray-400">
            No posts found.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
            <div className="grid grid-cols-12 border-b border-gray-800 bg-gray-900 px-5 py-4 text-sm font-medium text-gray-300">
              <div className="col-span-4">Title</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Featured</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="divide-y divide-gray-800">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="grid grid-cols-12 items-center px-5 py-4 text-sm"
                >
                  <div className="col-span-4">
                    {post.slug ? (
                      <Link
                        href={getPostHref(post.type, post.slug)}
                        className="font-medium text-gray-50 transition hover:text-purple-300"
                      >
                        {post.title}
                      </Link>
                    ) : (
                      <p className="font-medium text-gray-50">{post.title}</p>
                    )}

                    {post.slug ? (
                      <p className="mt-1 text-xs text-gray-500">{post.slug}</p>
                    ) : null}
                  </div>

                  <div className="col-span-2 text-purple-200">{post.type}</div>

                  <div className="col-span-2 text-gray-400">
                    {post.category?.catName || "—"}
                  </div>

                  <div className="col-span-1 text-gray-400">
                    {post.published ? "Published" : "Draft"}
                  </div>

                  <div className="col-span-1 text-gray-400">
                    {post.featured ? "Yes" : "No"}
                  </div>

                  <div className="col-span-2 flex justify-end gap-4">
                    {post.slug ? (
                      <Link
                        href={getPostHref(post.type, post.slug)}
                        className="text-gray-300 transition hover:text-white"
                      >
                        View
                      </Link>
                    ) : null}

                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-purple-300 transition hover:text-purple-200"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}