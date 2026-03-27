import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/actions/categories";
import CategoryForm from "@/components/forms/posts/CategoryForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 md:px-10 lg:px-14">
      <CategoryForm mode="edit" category={category} />
    </main>
  );
}