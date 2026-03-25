import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { getProjectBySlug } from "@/lib/actions/projects";
import { getProjectCategories } from "@/lib/actions/projectCategories";
import ProjectForm from "@/components/forms/projects/ProjectForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { slug } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/api/auth/signin?callbackUrl=/projects/${slug}/edit`);
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  const [project, categories] = await Promise.all([
    getProjectBySlug(slug),
    getProjectCategories(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <ProjectForm mode="edit" project={project} categories={categories} />
    </div>
  );
}