import Link from "next/link";
import { getAuthorDashboardData } from "@/lib/actions/author";

export default async function AuthorDashboardPage() {
  const { user, summary, posts, caseStudies } = await getAuthorDashboardData();

  return (
    <main className="min-h-screen bg-black px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-purple-100 md:text-3xl">
            Author Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-400 md:text-base">
            Welcome back{user.name ? `, ${user.name}` : ""}. Manage your posts and case studies.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">Posts</p>
            <p className="mt-2 text-3xl font-bold text-white">{summary.totalPosts}</p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">Published Posts</p>
            <p className="mt-2 text-3xl font-bold text-white">{summary.publishedPosts}</p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">Case Studies</p>
            <p className="mt-2 text-3xl font-bold text-white">{summary.totalCaseStudies}</p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">Published Case Studies</p>
            <p className="mt-2 text-3xl font-bold text-white">{summary.publishedCaseStudies}</p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">Total Views</p>
            <p className="mt-2 text-3xl font-bold text-white">{summary.totalViews}</p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/posts/create"
            className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-purple-700"
          >
            Create Post
          </Link>

          <Link
            href="/case-studies/create"
            className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-purple-700"
          >
            Create Case Study
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <section className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
            <div className="border-b border-gray-800 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Recent Posts</h2>
            </div>

            <div className="divide-y divide-gray-800">
              {posts.length === 0 ? (
                <div className="px-6 py-8 text-sm text-gray-400">
                  No posts yet.
                </div>
              ) : (
                posts.slice(0, 6).map((post) => (
                  <div key={post.id} className="flex items-center justify-between gap-4 px-6 py-4">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{post.title}</p>
                      <p className="text-xs text-gray-500">{post.slug || "No slug"}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          post.published
                            ? "bg-green-900/40 text-green-300"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>

                      {post.slug && (
                        <Link
                          href={`/posts/${post.slug}/edit`}
                          className="text-sm text-purple-300 hover:text-purple-200"
                        >
                          Edit
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
            <div className="border-b border-gray-800 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Recent Case Studies</h2>
            </div>

            <div className="divide-y divide-gray-800">
              {caseStudies.length === 0 ? (
                <div className="px-6 py-8 text-sm text-gray-400">
                  No case studies yet.
                </div>
              ) : (
                caseStudies.slice(0, 6).map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 px-6 py-4">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.slug || "No slug"}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          item.published
                            ? "bg-green-900/40 text-green-300"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {item.published ? "Published" : "Draft"}
                      </span>

                      {item.slug && (
                        <Link
                          href={`/case-studies/${item.slug}/edit`}
                          className="text-sm text-purple-300 hover:text-purple-200"
                        >
                          Edit
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}