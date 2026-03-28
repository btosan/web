import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { getPublicPackageBySlug } from "@/lib/actions/packages";
import { formatPackagePrice } from "@/components/packages/packages";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = await getPublicPackageBySlug(slug);

  if (!pkg || !pkg.published) {
    notFound();
  }

  const price = formatPackagePrice(pkg);

  return (
    <main className="min-h-screen bg-black">
      <section className="px-6 py-14 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <Link
              href="/packages"
              className="text-sm text-purple-300 transition hover:text-purple-200"
            >
              ← Back to packages
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-purple-300/80">
                {pkg.category?.name || "Service Package"}
              </p>

              <h1 className="mt-3 text-4xl font-semibold leading-tight text-purple-100 md:text-5xl">
                {pkg.name}
              </h1>

              {pkg.shortDescription ? (
                <p className="mt-5 max-w-3xl text-base leading-7 text-gray-400">
                  {pkg.shortDescription}
                </p>
              ) : null}

              <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-950 p-6">
                <h2 className="text-lg font-semibold text-white">Overview</h2>

                <div className="prose prose-invert mt-4 max-w-none prose-p:text-gray-300">
                  <div dangerouslySetInnerHTML={{ __html: pkg.description }} />
                </div>
              </div>

              {pkg.longDescription ? (
                <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-950 p-6">
                  <h2 className="text-lg font-semibold text-white">
                    What’s included
                  </h2>

                  <div className="prose prose-invert mt-4 max-w-none prose-p:text-gray-300">
                    <div
                      dangerouslySetInnerHTML={{ __html: pkg.longDescription }}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="h-fit rounded-2xl border border-white/10 bg-zinc-950 p-6">
              <p className="text-3xl font-semibold text-white">{price}</p>

              {pkg.timeline ? (
                <p className="mt-2 text-sm text-gray-400">
                  Timeline: {pkg.timeline}
                </p>
              ) : null}

              {pkg.deliveryModel ? (
                <p className="mt-1 text-sm text-gray-400">
                  Engagement: {pkg.deliveryModel}
                </p>
              ) : null}

              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-purple-200">
                  Features
                </h3>

                <ul className="mt-4 space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature.id}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-purple-300" />
                      <div>
                        <p>{feature.label}</p>
                        {feature.details ? (
                          <p className="mt-1 text-xs text-gray-500">
                            {feature.details}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {pkg.addons.length > 0 ? (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-purple-200">
                    Optional add-ons
                  </h3>

                  <div className="mt-4 space-y-3">
                    {pkg.addons.map((addon) => (
                      <div
                        key={addon.id}
                        className="rounded-xl border border-white/10 bg-black/30 p-4"
                      >
                        <p className="text-sm font-medium text-white">
                          {addon.name}
                        </p>

                        {addon.description ? (
                          <p className="mt-1 text-sm text-gray-400">
                            {addon.description}
                          </p>
                        ) : null}

                        {addon.price || addon.priceLabel ? (
                          <p className="mt-2 text-xs text-purple-200">
                            {addon.price
                              ? `From ₦${Number(addon.price).toLocaleString("en-NG")}`
                              : addon.priceLabel}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <Link
                href={pkg.ctaHref || `/contact?package=${pkg.slug}`}
                className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-xl bg-purple-600 px-4 text-sm font-medium text-white transition hover:bg-purple-500"
              >
                {pkg.ctaText || "Contact Us"}
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}