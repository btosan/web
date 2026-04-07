import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',        // Change to your titisoft domain in production
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

    const project = await db.project.findUnique({
      where: { slug },
      include: {
        category: true,
        tags: true,
        galleries: true,
        caseStudies: {
          where: { published: true },
          include: { category: true, tags: true },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { 
        status: 404,
        headers: corsHeaders 
      });
    }

    return NextResponse.json(project, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' }, 
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}