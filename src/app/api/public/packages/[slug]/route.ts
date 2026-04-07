import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',        // For development. Change to 'https://ttsoft.tosanx.com' in production for security
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
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

    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { 
        status: 404,
        headers: corsHeaders 
      });
    }

    return NextResponse.json(pkg, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching package by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch package' },
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}