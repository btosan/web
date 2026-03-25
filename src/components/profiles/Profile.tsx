"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Edit,
  Mail,
  ShieldCheck,
  Calendar,
  Briefcase,
  BookOpen,
  LayoutDashboard,
  AtSign,
  UserRound,
  CheckCircle2,
  Clock3,
  UserCog,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";

type AppRole = "USER" | "AUTHOR" | "ADMIN";

export default function Profile() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [userData, setUserData] = useState(session?.user ?? null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (searchParams.get("updated") === "true") {
      router.replace("/profile", { scroll: false });

      const forceRefresh = async () => {
        setIsRefreshing(true);

        try {
          await updateSession();

          const fresh = await fetch("/api/auth/session", {
            cache: "no-store",
          }).then((r) => r.json());

          if (fresh?.user) {
            setUserData(fresh.user);
            toast.success("Profile updated!", { duration: 4000 });
          } else {
            toast.error("Failed to refresh profile data");
          }
        } catch (err) {
          console.error("Refresh failed:", err);
          toast.error("Could not refresh profile");
        } finally {
          setIsRefreshing(false);
        }
      };

      forceRefresh();
    }
  }, [searchParams, updateSession, router]);

  useEffect(() => {
    if (session?.user) {
      setUserData(session.user);
    }
  }, [session]);

  const user = userData;
  const role = ((user?.role as AppRole) || "USER") as AppRole;

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.name || "User";

  const shortName = user?.firstName || user?.name || "User";

  const initials = (
    user?.firstName?.[0] ||
    user?.name?.[0] ||
    user?.email?.[0] ||
    "U"
  ).toUpperCase();

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  const emailVerifiedText = user && "emailVerified" in user && user.emailVerified
    ? "Verified"
    : "Not verified";

  const roleConfig = useMemo(() => {
    switch (role) {
      case "ADMIN":
        return {
          hubHref: "/admin",
          hubLabel: "Open Admin Panel",
          hubIcon: LayoutDashboard,
          description: "Manage users, roles, and platform activity.",
        };
      case "AUTHOR":
        return {
          hubHref: "/author",
          hubLabel: "Open Author Panel",
          hubIcon: Briefcase,
          description: "Manage your writing, publishing, and author content.",
        };
      default:
        return null;
    }
  }, [role]);

  const RoleHubIcon = roleConfig?.hubIcon;

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/signin" });
    } catch {
      toast.error("Sign out failed");
    }
  };

  if (status === "loading" || isRefreshing || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-purple-500" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto min-h-screen max-w-5xl px-4 py-12 sm:px-6 md:py-16"
    >
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-100 md:text-4xl">
          {shortName}&apos;s Profile
        </h1>
        <p className="mt-3 text-gray-400">
          View your account details, role access, and personal information.
        </p>
      </div>

      <Card className="overflow-hidden border border-gray-800 bg-gray-950 shadow-2xl">
        <CardHeader className="border-b border-gray-800 pb-8">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-purple-600/40 shadow-xl shadow-purple-950/30 md:h-40 md:w-40">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={displayName}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-900/70 to-gray-900 text-5xl font-bold text-purple-300">
                  {initials}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <CardTitle className="text-3xl text-gray-100 md:text-4xl">
                {displayName}
              </CardTitle>

              {user.username && (
                <p className="flex items-center justify-center gap-1 text-base text-gray-400">
                  <AtSign size={18} className="text-purple-400" />
                  {user.username}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Badge className="border border-purple-600/40 bg-purple-950/30 px-4 py-2 text-sm text-purple-300">
                  <ShieldCheck size={16} className="mr-2" />
                  {role}
                </Badge>

                {"emailVerified" in user && (
                  <Badge
                    variant="outline"
                    className={`px-4 py-2 text-sm ${
                      user.emailVerified
                        ? "border-emerald-600/40 bg-emerald-950/20 text-emerald-300"
                        : "border-amber-600/40 bg-amber-950/20 text-amber-300"
                    }`}
                  >
                    <CheckCircle2 size={16} className="mr-2" />
                    {emailVerifiedText}
                  </Badge>
                )}

                {"status" in user && user.status && (
                  <Badge
                    variant="outline"
                    className={`px-4 py-2 text-sm ${
                      user.status === "ACTIVE"
                        ? "border-blue-600/40 bg-blue-950/20 text-blue-300"
                        : "border-gray-600/40 bg-gray-900/40 text-gray-300"
                    }`}
                  >
                    <UserCog size={16} className="mr-2" />
                    {String(user.status)}
                  </Badge>
                )}
              </div>

              {memberSince && (
                <p className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} className="text-purple-400" />
                  Member since {memberSince}
                </p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-10 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border border-gray-800 bg-black/40">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-gray-100">
                  <Mail size={18} className="text-purple-400" />
                  Contact
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Your primary account information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-300">
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="break-all">{user.email || "—"}</p>
                </div>

                {user.username && (
                  <div>
                    <p className="text-gray-500">Username</p>
                    <p>@{user.username}</p>
                  </div>
                )}

                {user.name && (
                  <div>
                    <p className="text-gray-500">Display Name</p>
                    <p>{user.name}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border border-gray-800 bg-black/40">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-gray-100">
                  <Clock3 size={18} className="text-purple-400" />
                  Account Overview
                </CardTitle>
                <CardDescription className="text-gray-500">
                  General details tied to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-300">
                <div>
                  <p className="text-gray-500">Role</p>
                  <p>{role}</p>
                </div>

                {"status" in user && user.status && (
                  <div>
                    <p className="text-gray-500">Account Status</p>
                    <p>{String(user.status)}</p>
                  </div>
                )}

                {user.createdAt && (
                  <div>
                    <p className="text-gray-500">Joined</p>
                    <p>{new Date(user.createdAt).toLocaleString()}</p>
                  </div>
                )}

                {"updatedAt" in user && user.updatedAt && (
                  <div>
                    <p className="text-gray-500">Last Updated</p>
                    <p>{new Date(user.updatedAt).toLocaleString()}</p>
                  </div>
                )}

                {"lastSeenAt" in user && (
                  <div>
                    <p className="text-gray-500">Last Seen</p>
                    <p>
                      {user.lastSeenAt
                        ? new Date(user.lastSeenAt).toLocaleString()
                        : "—"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {(user.firstName || user.lastName || user.bio) && (
            <Card className="border border-gray-800 bg-black/40">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-gray-100">
                  <UserRound size={18} className="text-purple-400" />
                  About You
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Public-facing and profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                {(user.firstName || user.lastName) && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-500">First Name</p>
                      <p>{user.firstName || "—"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Name</p>
                      <p>{user.lastName || "—"}</p>
                    </div>
                  </div>
                )}

                {user.bio && (
                  <div>
                    <p className="mb-2 text-sm text-gray-500">Bio</p>
                    <p className="whitespace-pre-line leading-relaxed">
                      {user.bio}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {roleConfig && RoleHubIcon && (
            <Card className="border border-purple-700/30 bg-purple-950/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-purple-200">
                  <Sparkles size={18} className="text-purple-400" />
                  Role Access
                </CardTitle>
                <CardDescription className="text-purple-300/70">
                  Tools available for your current account role.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">{roleConfig.description}</p>

                <Button
                  asChild
                  className="h-12 bg-purple-700 text-white hover:bg-purple-800"
                >
                  <Link href={roleConfig.hubHref}>
                    <RoleHubIcon className="mr-2 h-5 w-5" />
                    {roleConfig.hubLabel}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {role === "AUTHOR" && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border border-gray-800 bg-black/40">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-gray-100">
                    <BookOpen size={18} className="text-purple-400" />
                    Writing & Publishing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href="/learn/blog"
                    className="text-sm text-purple-400 hover:text-purple-300 hover:underline"
                  >
                    View blog content
                  </Link>
                </CardContent>
              </Card>

              <Card className="border border-gray-800 bg-black/40">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-gray-100">
                    <Briefcase size={18} className="text-purple-400" />
                    Projects & Case Studies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href="/projects"
                    className="text-sm text-purple-400 hover:text-purple-300 hover:underline"
                  >
                    View projects and case studies
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}

          {role === "ADMIN" && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border border-gray-800 bg-black/40">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-gray-100">
                    <LayoutDashboard size={18} className="text-purple-400" />
                    Admin Workspace
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href="/admin/users"
                    className="text-sm text-purple-400 hover:text-purple-300 hover:underline"
                  >
                    Manage users and account access
                  </Link>
                </CardContent>
              </Card>

              <Card className="border border-gray-800 bg-black/40">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-gray-100">
                    <Briefcase size={18} className="text-purple-400" />
                    Content & Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href="/admin"
                    className="text-sm text-purple-400 hover:text-purple-300 hover:underline"
                  >
                    Open admin area
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}

          {role === "USER" && (
            <Card className="border border-gray-800 bg-black/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-100">
                  My Account
                </CardTitle>
                <CardDescription className="text-gray-500">
                  General account actions and personal profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-300">
                Keep your profile details up to date so your information stays
                accurate across the platform.
              </CardContent>
            </Card>
          )}

          <Separator className="my-2 border border-gray-800" />

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="h-14 w-full border-0 bg-purple-700 text-lg text-white hover:bg-purple-900 sm:max-w-sm"
            >
              <Link href="/profile/edit">
                <Edit className="mr-3 h-5 w-5" />
                Edit Profile
              </Link>
            </Button>

            <Button
              className="h-14 w-full border border-gray-500 bg-black text-lg text-gray-100 hover:border-gray-100 hover:text-gray-50 sm:max-w-sm"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}