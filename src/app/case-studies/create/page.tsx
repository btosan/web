import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { getCaseStudyCategories } from "@/lib/actions/caseStudyCategories";
import { getProjects } from "@/lib/actions/projects";
import CaseStudyForm from "@/components/forms/case-studies/CaseStudyForm";

export default async function NewCaseStudyPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/case-studies/create");
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  const [categories, projects] = await Promise.all([
    getCaseStudyCategories(),
    getProjects(),
  ]);

  return (
    <div>
      <CaseStudyForm
        mode="create"
        categories={categories}
        projects={projects}
      />
    </div>
  );
}