import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { getCaseStudyCategoryById } from "@/lib/actions/caseStudyCategories";
import CaseStudyCategoryForm from "@/components/forms/case-studies/CaseStudyCategoryForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCaseStudyCategoryPage({ params }: Props) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/api/auth/signin?callbackUrl=/admin/case-study-categories/${id}/edit`);
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  const category = await getCaseStudyCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <CaseStudyCategoryForm mode="edit" category={category} />
    </div>
  );
}