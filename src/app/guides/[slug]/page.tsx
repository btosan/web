import type { Metadata } from "next";
import PostDetail from "@/components/posts/PostDetail";
import { getPublicPostBySlug } from "@/lib/actions/posts";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

function getCanonicalPath(type: string, slug: string) {
  switch (type) {
    case "GUIDE":
      return `/guides/${slug}`;
    case "RESOURCES":
      return `/resources/${slug}`;
    default:
      return `/blog/${slug}`;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.openingParagraph || post.title,
    alternates: {
      canonical: getCanonicalPath(post.type, slug),
    },
    openGraph: {
      title: post.title,
      description: post.openingParagraph || post.title,
      images: post.imageUrl ? [post.imageUrl] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.openingParagraph || post.title,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <PostDetail slug={slug} />;
}