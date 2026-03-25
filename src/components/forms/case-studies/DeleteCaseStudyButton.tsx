import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { getPublicCaseStudies } from "@/lib/actions/caseStudies";
import DeleteCaseStudyButton from "@/components/forms/case-studies/DeleteCaseStudyButton";

export default async function CaseStudiesAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/admin/case-studies");
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  const caseStudies = await getPublicCaseStudies();

  return (
    <section className="min-h-screen bg-black px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-purple-100 md:text-3xl">
              Case Studies
            </h1>
            <p className="mt-2 text-sm text-gray-400 md:text-base">
              Manage all case studies.
            </p>
          </div>

          <Link
            href="/case-studies/create"
            className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
          >
            New Case Study
          </Link>
        </div>

        {/* Empty State */}
        {caseStudies.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8 text-center">
            <h2 className="text-lg font-semibold text-white">
              No case studies yet
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Create your first case study to get started.
            </p>

            <div className="mt-6">
              <Link
                href="/case-studies/create"
                className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
              >
                Create Case Study
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
            {/* Table Header */}
            <div className="grid grid-cols-12 border-b border-gray-800 bg-gray-900/60 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400 md:px-6">
              <div className="col-span-5">Title</div>
              <div className="col-span-2 text-center">Category</div>
              <div className="col-span-2 text-center">Published</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-800">
              {caseStudies.map((cs) => (
                <div
                  key={cs.id}
                  className="grid grid-cols-12 items-center px-4 py-4 md:px-6"
                >
                  {/* Title */}
                  <div className="col-span-5">
                    <p className="font-medium text-white">{cs.title}</p>
                    <p className="text-xs text-gray-500">{cs.slug}</p>
                  </div>

                  {/* Category */}
                  <div className="col-span-2 text-center">
                    <span className="text-sm text-gray-300">
                      {cs.category?.catName || "-"}
                    </span>
                  </div>

                  {/* Published */}
                  <div className="col-span-2 text-center">
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium ${
                        cs.published
                          ? "bg-green-900/40 text-green-300"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {cs.published ? "Yes" : "No"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-3 flex justify-end gap-2">
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="inline-flex items-center justify-center rounded-md border border-gray-700 px-3 py-2 text-sm font-medium text-gray-200 transition hover:border-white/20 hover:text-white"
                    >
                      View
                    </Link>

                    <Link
                      href={`/case-studies/${cs.slug}/edit`}
                      className="inline-flex items-center justify-center rounded-md border border-gray-700 px-3 py-2 text-sm font-medium text-gray-200 transition hover:border-purple-400 hover:text-white"
                    >
                      Edit
                    </Link>

                    <DeleteCaseStudyButton
                      caseStudyId={cs.id}
                      caseStudyTitle={cs.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}