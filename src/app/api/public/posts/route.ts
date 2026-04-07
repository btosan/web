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
    const limit = parseInt(searchParams.get('limit') || '12');
    const type = searchParams.get('type');

    const where: any = {
      published: true,
      NOT: { type: 'CASE_STUDIES' },
    };

    if (type) where.type = type;

    const posts = await db.post.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      take: limit || undefined,
      include: {
        author: true,
        category: true,
        tags: true,
        _count: { select: { comments: true, likes: true } },
      },
    });

    return NextResponse.json(posts, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching public posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}