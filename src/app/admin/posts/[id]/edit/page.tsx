import { notFound } from "next/navigation";
import PostForm from "@/components/forms/posts/PostForm";
import DeletePostButton from "@/components/forms/posts/DeletePostButton";
import { getPostById } from "@/lib/actions/posts";
import { getCategories } from "@/lib/actions/categories";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;

  const [post, categories] = await Promise.all([
    getPostById(id),
    getCategories(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 md:px-10 lg:px-14">
      <div className="mx-auto max-w-5xl space-y-6">
        <PostForm mode="edit" post={post} categories={categories} />

        <div className="flex justify-end">
          <DeletePostButton id={post.id} />
        </div>
      </div>
    </main>
  );
}