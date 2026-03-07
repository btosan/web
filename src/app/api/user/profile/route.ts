// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  name: z.string().min(1).max(100).optional(),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/).optional(),
  bio: z.string().max(500).optional(),
  image: z.string().url().nullable().optional(),
});

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const data = updateProfileSchema.parse(body);

    // Prevent username conflicts
    if (data.username) {
      const existing = await db.user.findFirst({
        where: { username: data.username, id: { not: session.user.id } },
      });
      if (existing) {
        return NextResponse.json({ message: 'Username already taken' }, { status: 400 });
      }
    }

    const updated = await db.user.update({
      where: { id: session.user.id },
      data,
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        username: true,
        bio: true,
        image: true,
        email: true,
        role: true,
      },
    });

    revalidatePath('/profile');
    revalidatePath('/profile/edit');

    return NextResponse.json({ message: 'Profile updated', user: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}