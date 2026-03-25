import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { getProjectCategoryById } from "@/lib/actions/projectCategories";
import ProjectCategoryForm from "@/components/forms/projects/ProjectCategoryForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectCategoryPage({ params }: Props) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/api/auth/signin?callbackUrl=/admin/project-categories/${id}/edit`);
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  const category = await getProjectCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <ProjectCategoryForm mode="edit" category={category} />
    </div>
  );
}