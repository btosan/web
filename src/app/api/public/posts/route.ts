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

function transformPost(post: any) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    type: post.type,
    imageUrl: post.imageUrl,
    imageCredit: post.imageCredit,
    openingParagraph: post.openingParagraph,
    tableOfContents: post.tableOfContents,
    content: post.content,
    featured: post.featured,
    published: post.published,
    views: post.views,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,

    author: post.author
      ? {
          id: post.author.id,
          name: post.author.name,
          firstName: post.author.firstName,
          lastName: post.author.lastName,
          username: post.author.username,
          image: post.author.image,
          bio: post.author.bio,
          email: post.author.email,
        }
      : null,

    category: post.category
      ? {
          id: post.category.id,
          catName: post.category.catName,
        }
      : null,

    tags: (post.tags || []).map((tag: any) => ({
      id: tag.id,
      tagName: tag.tagName,
    })),

    counts: {
      comments: post._count?.comments || 0,
      likes: post._count?.likes || 0,
    },
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const type = searchParams.get('type');

    const where: any = {
      published: true,
      NOT: { type: 'CASE_STUDIES' },
    };

    if (type && type !== 'CASE_STUDIES') {
      where.type = type;
    }

    const posts = await db.post.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      take: Number.isNaN(limit) ? 12 : limit,
      include: {
        author: true,
        category: true,
        tags: true,
        _count: { select: { comments: true, likes: true } },
      },
    });

    const transformedPosts = posts.map(transformPost);

    return NextResponse.json(transformedPosts, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching public posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}