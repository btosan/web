import { getPublicPackages } from "@/lib/actions/packages";
import { toPackageCard } from "@/components/packages/packages";
import PackageCard from "@/components/packages/PackageCard";

export default async function PackagesPage() {
  const dbPackages = await getPublicPackages();
  const packages = dbPackages.map(toPackageCard);

  return (
    <main className="min-h-screen bg-black">
      <section className="px-6 py-14 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-semibold leading-tight text-purple-100 md:text-5xl lg:text-6xl">
              Packages
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 md:text-base">
              Flexible service packages for websites, mobile apps, AI systems,
              automation, and digital growth.
            </p>
          </div>

          {packages.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-gray-950 px-6 py-14 text-center">
              <h2 className="text-xl font-semibold text-white">
                No packages available yet
              </h2>
              <p className="mt-2 text-gray-400">
                Public packages will appear here once they are added.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}