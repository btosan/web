import Link from "next/link";
import { ChevronLeftIcon } from 'lucide-react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { getAllCaseStudyCategoriesForAdmin } from "@/lib/actions/caseStudyCategories";

export default async function AdminCaseStudyCategoriesPage() {
  const session = await getServerSession(authOptions);
  
    if (!session?.user) {
      redirect("/api/auth/signin?callbackUrl=/admin/case-studies");
    }
  
    if (session.user.role !== Role.ADMIN) {
      redirect("/");
    }

  const categories = await getAllCaseStudyCategoriesForAdmin();

  return (
    <main className="min-h-screen bg-black px-6 py-10 md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link href='/admin' className='flex items-center justify-start text-xs lg:text-sm text-gray-400 py-3'>
          <ChevronLeftIcon className="w-4 h-4 lg:w-5 lg:h-5"/>
          <span>Back To Admin Dashboard</span>
        </Link>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-purple-50">
              Case Study Categories
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Manage categories used by case studies.
            </p>
          </div>

          <Link
            href="/admin/case-study-categories/create"
            className="inline-flex items-center justify-center rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-purple-400 hover:bg-black hover:text-white"
          >
            Create category
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8 text-gray-400">
            No case study categories created yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
            <div className="grid grid-cols-12 border-b border-gray-800 bg-gray-900 px-5 py-4 text-sm font-medium text-gray-300">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Case Studies</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>

            <div className="divide-y divide-gray-800">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="grid grid-cols-12 items-center px-5 py-4 text-sm"
                >
                  <div className="col-span-6 text-gray-50">
                    {category.catName}
                  </div>

                  <div className="col-span-3 text-gray-400">
                    {category._count.caseStudies}
                  </div>

                  <div className="col-span-3 flex justify-end">
                    <Link
                      href={`/admin/case-study-categories/${category.id}/edit`}
                      className="text-purple-300 transition hover:text-purple-200"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}