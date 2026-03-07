import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: Role;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    bio?: string | null;
    createdAt?: Date | string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      username?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      bio?: string | null;
      createdAt?: Date | string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: Role;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    bio?: string | null;
    createdAt?: Date | string;
  }
}