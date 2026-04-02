import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
// prefix
interface PackageCardProps {
  pkg: {
    id: string;
    name: string;
    slug: string;
    shortDescription?: string | null;
    timeline?: string | null;
    featured?: boolean;
    popular?: boolean;
    ctaText: string;
    price: string;
    features: { id: string; label: string; highlight?: boolean }[];
    category?: string | null;
  };
}

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <article className="relative rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-white/20">
      {pkg.popular ? (
        <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200">
          <Sparkles className="h-3.5 w-3.5" />
          Most Popular
        </div>
      ) : null}

      <div className="space-y-4">
        <div>
          {pkg.category ? (
            <p className="text-xs uppercase tracking-[0.2em] text-purple-300/80">
              {pkg.category}
            </p>
          ) : null}

          <h3 className="mt-2 text-2xl font-semibold text-purple-100">
            {pkg.name}
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            {pkg.shortDescription}
          </p>
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="text-2xl font-semibold text-purple-300">{pkg.price}</p>
          {pkg.timeline ? (
            <p className="mt-1 text-sm text-gray-500">Timeline: {pkg.timeline}</p>
          ) : null}
        </div>

        <ul className="space-y-3 pt-2">
          {pkg.features.map((feature) => (
            <li
              key={feature.id}
              className="flex items-start gap-3 text-sm text-gray-300"
            >
              <Check className="mt-0.5 h-4 w-4 text-purple-300" />
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>

        <div className="pt-4">
          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-purple-700/60 px-4 text-sm font-medium text-white transition hover:bg-purple-600/60"
          >
            View Package
          </Link>
        </div>
      </div>
    </article>
  );
}