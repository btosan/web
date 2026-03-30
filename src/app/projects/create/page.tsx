import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { getProjectCategories } from "@/lib/actions/projectCategories";
import ProjectForm from "@/components/forms/projects/ProjectForm";

export default async function NewProjectPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/projects/create");
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  const categories = await getProjectCategories();

  return (
    <div>
      <ProjectForm mode="create" categories={categories} />
    </div>
  );
}