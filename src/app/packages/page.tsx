import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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
        <Link
          href="/services"
          className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 mt-8 md:mt-16 lg:mt-24 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
        >
          {/* subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          {/* glow effect */}
          <div className="absolute right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

          <span className="relative z-10 flex items-center gap-2">
            See Services & Solutions
            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7" />
          </span>
        </Link>
      </section>
    </main>
  );
}