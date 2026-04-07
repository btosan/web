import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',           // Change to your titisoft domain in production for better security, e.g. 'https://ttsoft.tosanx.com'
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '0');

    let projects;

    if (featuredOnly) {
      projects = await db.project.findMany({
        where: {
          featured: true,
          slug: { not: null },
        },
        orderBy: [{ createdAt: 'desc' }],
        include: {
          category: true,
          tags: true,
          galleries: true,
          caseStudies: true,
        },
        take: limit || undefined,
      });
    } else {
      projects = await db.project.findMany({
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
        include: {
          category: true,
          tags: true,
          galleries: true,
          caseStudies: true,
        },
        take: limit || undefined,
      });
    }

    return NextResponse.json(projects, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching public projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      status: 500,
      headers: corsHeaders
    );
  }
}