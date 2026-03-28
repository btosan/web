import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { getPackageCategoryById } from "@/lib/actions/packageCategories";
import PackageCategoryForm from "@/components/forms/packages/PackageCategoryForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPackageCategoryPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/admin/package-categories");
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  const { id } = await params;
  const category = await getPackageCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="py-8 md:py-16 lg:py-24">
      <PackageCategoryForm mode="edit" category={category} />
    </div>
  );
}