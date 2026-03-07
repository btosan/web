import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {

  try {

    const adminCount = await db.user.count({
      where: { role: 'ADMIN' },
    })

    if (adminCount > 0) {
      return NextResponse.json(
        { message: 'Admin accounts already exist.' },
        { status: 403 }
      )
    }

    const body = await req.json()

    const {
      email,
      password,
      firstName,
      lastName,
      image
    } = body

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const fullName = `${firstName} ${lastName}`

    const newAdmin = await db.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        firstName,
        lastName,
        name: fullName,
        image: image || null,
        role: 'ADMIN',
      },
    })

    return NextResponse.json(
      {
        message: 'Admin created successfully',
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
          firstName: newAdmin.firstName,
          lastName: newAdmin.lastName,
          name: newAdmin.name,
          role: newAdmin.role,
        },
      },
      { status: 201 }
    )

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }

}