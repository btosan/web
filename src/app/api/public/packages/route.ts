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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '0');

    const packages = await db.servicePackage.findMany({
      where: { published: true },
      orderBy: [
        { sortOrder: 'asc' },
        { popular: 'desc' },
        { createdAt: 'desc' },
      ],
      include: {
        category: true,
        features: { orderBy: { sortOrder: 'asc' } },
        addons: { orderBy: { sortOrder: 'asc' } },
      },
      take: limit || undefined,
    });

    return NextResponse.json(packages, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching public packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}