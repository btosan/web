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

    comments: (post.comments || []).map((comment: any) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      user: comment.user
        ? {
            id: comment.user.id,
            name: comment.user.name,
            firstName: comment.user.firstName,
            lastName: comment.user.lastName,
            username: comment.user.username,
            image: comment.user.image,
          }
        : null,
    })),

    counts: {
      comments: post._count?.comments || 0,
      likes: post._count?.likes || 0,
    },
  };
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
      return NextResponse.json(
        { error: 'Post not found' },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    return NextResponse.json(transformPost(post), { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}