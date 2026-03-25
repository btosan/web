import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { getCaseStudyBySlug } from "@/lib/actions/caseStudies";
import { getCaseStudyCategories } from "@/lib/actions/caseStudyCategories";
import { getProjects } from "@/lib/actions/projects";
import CaseStudyForm from "@/components/forms/case-studies/CaseStudyForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditCaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/api/auth/signin?callbackUrl=/case-studies/${slug}/edit`);
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  const [caseStudy, categories, projects] = await Promise.all([
    getCaseStudyBySlug(slug),
    getCaseStudyCategories(),
    getProjects(),
  ]);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div>
      <CaseStudyForm
        mode="edit"
        caseStudy={caseStudy}
        categories={categories}
        projects={projects}
      />
    </div>
  );
}