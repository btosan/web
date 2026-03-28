import PackageForm from "@/components/forms/packages/PackageForm";
import { getPackageCategories } from "@/lib/actions/packages";

export default async function NewPackagePage() {
  const categories = await getPackageCategories();

  return (
    <main className="min-h-screen bg-black px-6 py-10 md:px-10">
      <PackageForm mode="create" categories={categories} />
    </main>
  );
}