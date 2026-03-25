import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import ProjectCategoryForm from "@/components/forms/projects/ProjectCategoryForm";

export default async function NewProjectCategoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/admin/project-categories/create");
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  return (
    <div className="md:py-16 lg:py-24 py-8">
      <ProjectCategoryForm mode="create" />
    </div>
  );
}