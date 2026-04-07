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

function buildCloudinaryUrl(gallery: {
  publicId?: string | null;
  format?: string | null;
  version?: string | null;
}) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!cloudName || !gallery?.publicId || !gallery?.format || !gallery?.version) {
    return null;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/v${gallery.version}/${gallery.publicId}.${gallery.format}`;
}

function buildProjectDetails(project: any) {
  const details = [];

  if (project.type) {
    details.push({
      id: `${project.id}-type`,
      detail: `Project type: ${project.type}`,
    });
  }

  if (project.category?.catName) {
    details.push({
      id: `${project.id}-category`,
      detail: `Category: ${project.category.catName}`,
    });
  }

  if (project.tags?.length) {
    details.push({
      id: `${project.id}-tags`,
      detail: `Technologies used: ${project.tags
        .map((tag: any) => tag.tagName)
        .filter(Boolean)
        .join(', ')}`,
    });
  }

  if (project.caseStudies?.length) {
    details.push({
      id: `${project.id}-case-studies`,
      detail: `${project.caseStudies.length} related case stud${
        project.caseStudies.length > 1 ? 'ies' : 'y'
      } available`,
    });
  }

  if (project.projectUrl) {
    details.push({
      id: `${project.id}-website`,
      detail: `Live project link available`,
    });
  }

  if (project.featured) {
    details.push({
      id: `${project.id}-featured`,
      detail: `Featured project`,
    });
  }

  return details;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const projects = await db.project.findMany({
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      include: {
        category: true,
        tags: true,
        galleries: true,
        caseStudies: {
          where: { published: true },
          include: {
            category: true,
            tags: true,
          },
        },
      },
      take: Number.isNaN(limit) ? 12 : limit,
    });

    const transformedProjects = projects.map((project) => ({
      ...project,
      galleries: (project.galleries || []).map((gallery) => ({
        ...gallery,
        url: buildCloudinaryUrl(gallery),
      })),
      projectDetails: buildProjectDetails(project),
    }));

    return NextResponse.json(transformedProjects, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching public projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}