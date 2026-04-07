import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}