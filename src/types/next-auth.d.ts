import { DefaultSession } from "next-auth";
import { Role, UserStatus } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: Role;
    status: UserStatus;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified?: Date | string | null;
    lastSeenAt?: Date | string | null;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      status: UserStatus;
      username?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      bio?: string | null;
      createdAt?: Date | string;
      updatedAt?: Date | string;
      emailVerified?: Date | string | null;
      lastSeenAt?: Date | string | null;
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
    status?: UserStatus;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified?: Date | string | null;
    lastSeenAt?: Date | string | null;
  }
}