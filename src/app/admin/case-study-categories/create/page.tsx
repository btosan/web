import CaseStudyCategoryForm from "@/components/forms/case-studies/CaseStudyCategoryForm";

export default function CreateCategoryPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 md:px-10 lg:px-14">
      <CaseStudyCategoryForm mode="create" />
    </main>
  );
}