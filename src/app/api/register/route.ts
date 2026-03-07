import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import * as z from "zod";

const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),

  name: z
    .string()
    .max(100, "Name cannot exceed 100 characters")
    .optional()
    .transform((val) => (val?.trim() || null)),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .optional()
    .transform((val) => (val?.trim() || null)),

  firstName: z
    .string()
    .max(50, "First name too long")
    .optional()
    .transform((val) => (val?.trim() || null)),

  lastName: z
    .string()
    .max(50, "Last name too long")
    .optional()
    .transform((val) => (val?.trim() || null)),

  bio: z
    .string()
    .max(500, "Bio cannot exceed 500 characters")
    .optional()
    .transform((val) => (val?.trim() || null)),

  image: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val?.trim() || null)),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      password,
      name,
      username,
      firstName,
      lastName,
      bio,
      image,
    } = registerSchema.parse(body);

    const normalizedEmail = email.toLowerCase().trim();

    // Check existing email
    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email already exists" },
        { status: 409 }
      );
    }

    // Check username if provided
    if (username) {
      const existingUsername = await db.user.findUnique({
        where: { username },
      });

      if (existingUsername) {
        return NextResponse.json(
          { message: "Username already taken" },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await db.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name,
        username,
        firstName,
        lastName,
        bio,
        image,
      },
    });

    const { password: removedPassword, ...safeUser } = newUser;

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: safeUser.id,
          email: safeUser.email,
          name: safeUser.name,
          username: safeUser.username,
          firstName: safeUser.firstName,
          lastName: safeUser.lastName,
          bio: safeUser.bio,
          image: safeUser.image,
          role: safeUser.role,
          createdAt: safeUser.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];

      return NextResponse.json(
        { message: firstIssue.message },
        { status: 400 }
      );
    }

    console.error("[REGISTER_ERROR]", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}