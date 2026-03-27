import PostCard from "@/components/posts/PostCard";
import Link from "next/link";

interface Props {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  posts: any[];
}

export default function PostGridSection({
  title,
  description,
  href,
  linkLabel,
  posts,
}: Props) {
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