import Link from "next/link";
import { ChevronLeftIcon } from 'lucide-react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { getAllPackages } from "@/lib/actions/packages";
import { formatPackagePrice } from "@/components/packages/packages";
import { AppButton } from "@/components/ui/AppButton";
import DeletePackageButton from "@/components/forms/packages/DeletePackageButton";

export default async function AdminPackagesPage() {
  const session = await getServerSession(authOptions);
  
    if (!session?.user) {
      redirect("/api/auth/signin?callbackUrl=/admin/package-categories");
    }
  
    if (session.user.role !== Role.ADMIN) {
      redirect("/");
    }
    
  const packages = await getAllPackages();

  return (
    <main className="min-h-screen bg-black px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <Link href='/admin' className='flex items-center justify-start text-xs lg:text-sm text-gray-400 py-3'>
          <ChevronLeftIcon className="w-4 h-4 lg:w-5 lg:h-5"/>
          <span>Back To Admin Dashboard</span>
        </Link>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-purple-100">
              Packages
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Manage your service packages and pricing.
            </p>
          </div>

          <Link href="/admin/packages/new">
            <AppButton variant="glow">Create package</AppButton>
          </Link>
        </div>

        {packages.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-gray-950 px-6 py-14 text-center">
            <h2 className="text-xl font-semibold text-white">
              No packages yet
            </h2>
            <p className="mt-2 text-gray-400">
              Create your first package to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
            <div className="grid grid-cols-12 border-b border-white/10 px-5 py-4 text-xs uppercase tracking-wide text-gray-500">
              <div className="col-span-4">Package</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="grid grid-cols-12 items-center border-b border-white/5 px-5 py-4 text-sm last:border-b-0"
              >
                <div className="col-span-4">
                  <p className="font-medium text-white">{pkg.name}</p>
                  <p className="mt-1 text-xs text-gray-500">{pkg.slug}</p>
                </div>

                <div className="col-span-2 text-gray-300">
                  {formatPackagePrice(pkg)}
                </div>

                <div className="col-span-2 text-gray-400">
                  {pkg.category?.name || "—"}
                </div>

                <div className="col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {pkg.published ? (
                      <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-1 text-xs text-green-300">
                        Published
                      </span>
                    ) : (
                      <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 text-xs text-yellow-300">
                        Draft
                      </span>
                    )}

                    {pkg.popular ? (
                      <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-1 text-xs text-purple-300">
                        Popular
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="col-span-2 flex justify-end gap-2">
                  <Link
                    href={`/admin/packages/${pkg.id}/edit`}
                    className="inline-flex items-center justify-center rounded-md border border-gray-700 px-3 py-2 text-sm font-medium text-gray-200 transition hover:border-purple-400 hover:text-white"
                  >
                    Edit
                  </Link>

                  <DeletePackageButton
                    packageId={pkg.id}
                    packageName={pkg.name}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}