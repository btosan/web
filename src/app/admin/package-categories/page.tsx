import Link from "next/link";
import { ChevronLeftIcon } from 'lucide-react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { getAllPackageCategoriesForAdmin } from "@/lib/actions/packageCategories";
import DeletePackageCategoryButton from "@/components/forms/packages/DeletePackageCategoryButton";

export default async function PackageCategoriesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/admin/package-categories");
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  const categories = await getAllPackageCategoriesForAdmin();

  return (
    <section className="min-h-screen bg-black px-4 py-8 md:px-8 md:py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Link href='/admin' className='flex items-center justify-start text-xs lg:text-sm text-gray-400 py-3'>
          <ChevronLeftIcon className="w-4 h-4 lg:w-5 lg:h-5"/>
          <span>Back To Admin Dashboard</span>
        </Link>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-purple-100 md:text-3xl">
              Package Categories
            </h1>
            <p className="mt-2 text-sm text-gray-400 md:text-base">
              Manage categories available in the package form.
            </p>
          </div>

          <Link
            href="/admin/package-categories/create"
            className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
          >
            New Category
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8 text-center">
            <h2 className="text-lg font-semibold text-white">
              No categories yet
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Create your first package category to start organizing packages.
            </p>

            <div className="mt-6">
              <Link
                href="/admin/package-categories/create"
                className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
              >
                Create Category
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
            <div className="grid grid-cols-12 border-b border-gray-800 bg-gray-900/60 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400 md:px-6">
              <div className="col-span-6">Category</div>
              <div className="col-span-3 text-center">Packages</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>

            <div className="divide-y divide-gray-800">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="grid grid-cols-12 items-center px-4 py-4 md:px-6"
                >
                  <div className="col-span-6">
                    <p className="font-medium text-white">{category.name}</p>
                  </div>

                  <div className="col-span-3 text-center">
                    <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-gray-900 px-3 py-1 text-sm text-gray-300 ring-1 ring-gray-800">
                      {category._count.packages}
                    </span>
                  </div>

                  <div className="col-span-3 flex justify-end gap-2">
                    <Link
                      href={`/admin/package-categories/${category.id}/edit`}
                      className="inline-flex items-center justify-center rounded-md border border-gray-700 px-3 py-2 text-sm font-medium text-gray-200 transition hover:border-purple-400 hover:text-white"
                    >
                      Edit
                    </Link>

                    <DeletePackageCategoryButton
                      categoryId={category.id}
                      categoryName={category.name}
                      disabled={category._count.packages > 0}
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