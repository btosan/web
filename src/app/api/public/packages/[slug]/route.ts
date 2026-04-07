import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

function transformPackage(pkg: any) {
  return {
    id: pkg.id,
    name: pkg.name,
    slug: pkg.slug,

    shortDescription: pkg.shortDescription,
    description: pkg.description,
    longDescription: pkg.longDescription,

    startingPrice: pkg.startingPrice,
    currency: pkg.currency,
    priceLabel: pkg.priceLabel,
    priceSuffix: pkg.priceSuffix,

    timeline: pkg.timeline,
    deliveryModel: pkg.deliveryModel,

    popular: pkg.popular,
    featured: pkg.featured,
    published: pkg.published,
    contactOnly: pkg.contactOnly,
    sortOrder: pkg.sortOrder,

    ctaText: pkg.ctaText,
    ctaHref: pkg.ctaHref,

    seoTitle: pkg.seoTitle,
    seoDescription: pkg.seoDescription,

    createdAt: pkg.createdAt,
    updatedAt: pkg.updatedAt,

    category: pkg.category
      ? {
          id: pkg.category.id,
          name: pkg.category.name,
        }
      : null,

    features: (pkg.features || []).map((feature: any) => ({
      id: feature.id,
      label: feature.label,
      details: feature.details,
      included: feature.included,
      highlight: feature.highlight,
      sortOrder: feature.sortOrder,
    })),

    addons: (pkg.addons || []).map((addon: any) => ({
      id: addon.id,
      name: addon.name,
      description: addon.description,
      price: addon.price,
      priceLabel: addon.priceLabel,
      sortOrder: addon.sortOrder,
    })),
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const pkg = await db.servicePackage.findUnique({
      where: { slug },
      include: {
        category: true,
        features: { orderBy: { sortOrder: 'asc' } },
        addons: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!pkg || !pkg.published) {
      return NextResponse.json(
        { error: 'Package not found' },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    return NextResponse.json(transformPackage(pkg), {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error fetching package by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch package' },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}