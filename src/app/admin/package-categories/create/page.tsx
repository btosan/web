import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import PackageCategoryForm from "@/components/forms/packages/PackageCategoryForm";

export default async function NewPackageCategoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/admin/package-categories/create");
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  return (
    <div className="py-8 md:py-16 lg:py-24">
      <PackageCategoryForm mode="create" />
    </div>
  );
}