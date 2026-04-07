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

    const post = await db.post.findFirst({
      where: {
        slug,
        published: true,
        NOT: { type: 'CASE_STUDIES' },
      },
      include: {
        author: true,
        category: true,
        tags: true,
        comments: {
          include: { user: true },
          orderBy: { createdAt: 'desc' },
        },
        _count: { select: { comments: true, likes: true } },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { 
        status: 404,
        headers: corsHeaders 
      });
    }

    return NextResponse.json(post, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' }, 
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}