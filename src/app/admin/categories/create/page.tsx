import CategoryForm from "@/components/forms/posts/CategoryForm";

export default function CreateCategoryPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 md:px-10 lg:px-14">
      <CategoryForm mode="create" />
    </main>
  );
}