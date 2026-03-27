import Link from "next/link";
import Image from "next/image";
import { Type } from "@prisma/client";

type PostCardProps = {
  post: {
    id: string;
    title: string;
    slug: string | null;
    type: Type | null;
    imageUrl: string | null;
    openingParagraph: string | null;
    createdAt: Date;
    category?: {
      catName: string;
    } | null;
    _count: {
      comments: number;
      likes: number;
    };
  };
};

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

export default function PostCard({ post }: PostCardProps) {
  if (!post.slug) return null;

  return (
    <Link
      href={getPostHref(post.type, post.slug)}
      className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 transition hover:border-purple-400"
    >
      <div className="relative h-56 w-full overflow-hidden bg-gray-900">
        <Image
          src={post.imageUrl || "/placeholder.png"}
          alt={post.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full border border-purple-400 bg-purple-950/30 px-3 py-1 text-purple-100">
            {post.type}
          </span>

          {post.category?.catName ? (
            <span className="text-gray-400">{post.category.catName}</span>
          ) : null}

          <span className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="line-clamp-2 text-xl font-semibold text-gray-50 group-hover:text-purple-100">
          {post.title}
        </h3>

        {post.openingParagraph ? (
          <p className="line-clamp-3 text-sm leading-6 text-gray-400">
            {post.openingParagraph}
          </p>
        ) : null}

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{post._count.comments} comments</span>
          <span>{post._count.likes} likes</span>
        </div>
      </div>
    </Link>
  );
}