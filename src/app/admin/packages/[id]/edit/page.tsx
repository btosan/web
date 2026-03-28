import { notFound } from "next/navigation";
import PackageForm from "@/components/forms/packages/PackageForm";
import { getPackageById, getPackageCategories } from "@/lib/actions/packages";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPackagePage({ params }: Props) {
  const { id } = await params;

  const [packageItem, categories] = await Promise.all([
    getPackageById(id),
    getPackageCategories(),
  ]);

  if (!packageItem) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 md:px-10">
      <PackageForm
        mode="edit"
        packageItem={packageItem}
        categories={categories}
      />
    </main>
  );
}