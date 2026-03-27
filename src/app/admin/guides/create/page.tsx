import PostForm from "@/components/forms/posts/PostForm";
import { getCategories } from "@/lib/actions/categories";
import { Type } from "@prisma/client";

export default async function CreateGuidePage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-black px-6 py-10 md:px-10 lg:px-14">
      <PostForm
        mode="create"
        categories={categories}
        initialType={Type.GUIDE}
      />
    </main>
  );
}