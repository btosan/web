import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

function getDefaultRoleRedirect(role?: string | null) {
  if (role === "ADMIN") return "/admin";
  if (role === "AUTHOR") return "/author";
  return "/profile";
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      if (token.id) {
        const dbUser = await db.user.findUnique({
          where: { id: token.id as string },
        });

        if (dbUser) {
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.image = dbUser.image;
          token.role = dbUser.role;
          token.status = dbUser.status;
          token.username = dbUser.username;
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
          token.bio = dbUser.bio;
          token.createdAt = dbUser.createdAt;
          token.updatedAt = dbUser.updatedAt;
          token.emailVerified = dbUser.emailVerified;
          token.lastSeenAt = dbUser.lastSeenAt;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string | null;
        session.user.email = token.email as string | null;
        session.user.image = token.image as string | null;
        session.user.role = token.role as any;
        session.user.status = token.status as any;
        session.user.username = token.username as string | null;
        session.user.firstName = token.firstName as string | null;
        session.user.lastName = token.lastName as string | null;
        session.user.bio = token.bio as string | null;
        session.user.createdAt = token.createdAt as Date | string;
        session.user.updatedAt = token.updatedAt as Date | string;
        session.user.emailVerified = token.emailVerified as Date | string | null;
        session.user.lastSeenAt = token.lastSeenAt as Date | string | null;
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      // Relative internal paths
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      // Same-origin absolute URLs
      try {
        const parsed = new URL(url);

        if (parsed.origin === baseUrl) {
          return url;
        }
      } catch {
        // ignore malformed URLs
      }

      // Fallback to central role redirect page
      return `${baseUrl}/auth/redirect`;
    },
  },

  debug: process.env.NODE_ENV === "development",
};

export default authOptions;