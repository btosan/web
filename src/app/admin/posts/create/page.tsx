import PostForm from "@/components/forms/posts/PostForm";
import { getCategories } from "@/lib/actions/categories";

export default async function CreatePostPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-black px-6 py-10 md:px-10 lg:px-14">
      <PostForm mode="create" categories={categories} />
    </main>
  );
}