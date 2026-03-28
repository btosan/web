export function formatPackagePrice(pkg: {
  startingPrice: unknown;
  currency: string;
  priceLabel?: string | null;
  priceSuffix?: string | null;
}) {
  if (!pkg.startingPrice) {
    return pkg.priceLabel || "Custom quote";
  }

  const amount = Number(pkg.startingPrice).toLocaleString("en-NG");

  const currencySymbol =
    pkg.currency === "NGN"
      ? "₦"
      : pkg.currency === "USD"
      ? "$"
      : `${pkg.currency} `;

  return `${pkg.priceLabel || "Starting from"} ${currencySymbol}${amount}${
    pkg.priceSuffix ? ` ${pkg.priceSuffix}` : ""
  }`;
}

export function toPackageCard(pkg: any) {
  return {
    id: pkg.id,
    name: pkg.name,
    slug: pkg.slug,
    shortDescription: pkg.shortDescription,
    timeline: pkg.timeline,
    featured: pkg.featured,
    popular: pkg.popular,
    ctaText: pkg.ctaText || "Contact Us",
    price: formatPackagePrice(pkg),
    features: pkg.features?.slice(0, 5) || [],
    category: pkg.category?.name || null,
  };
}