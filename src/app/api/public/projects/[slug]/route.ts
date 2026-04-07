import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}