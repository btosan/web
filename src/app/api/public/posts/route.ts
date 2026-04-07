import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Type } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as Type | null;
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '0');
    const categoryName = searchParams.get('category');
    const tagName = searchParams.get('tag');

    const where: any = {
      published: true,
      NOT: { type: Type.CASE_STUDIES },
    };

    if (type) where.type = type;
    if (featured) where.featured = true;
    if (categoryName) where.catName = categoryName;
    if (tagName) {
      where.tags = { some: { tagName } };
    }

    const posts = await db.post.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      take: limit || undefined,
      include: {
        author: true,
        category: true,
        tags: true,
        _count: {
          select: { comments: true, likes: true },
        },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching public posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}