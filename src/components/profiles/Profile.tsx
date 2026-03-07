// app/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
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
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state — this is what we render from
  const [userData, setUserData] = useState(session?.user || null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin');
    }
  }, [status, router]);

  // When coming back from edit (via ?updated=true) → force full refresh
  useEffect(() => {
    if (searchParams.get('updated') === 'true') {
      // Clean URL
      router.replace('/profile', { scroll: false });

      const forceRefresh = async () => {
        setIsRefreshing(true);
        try {
          // 1. Tell NextAuth to re-fetch session
          await updateSession();

          // 2. Manually fetch the absolute latest session data
          const fresh = await fetch('/api/auth/session', { cache: 'no-store' }).then(r => r.json());

          if (fresh?.user) {
            setUserData(fresh.user);
            toast.success('Profile updated!', { duration: 4000 });
          } else {
            toast.error('Failed to refresh profile data');
          }
        } catch (err) {
          console.error('Refresh failed:', err);
          toast.error('Could not refresh profile');
        } finally {
          setIsRefreshing(false);
        }
      };

      forceRefresh();
    }
  }, [searchParams, updateSession, router]);

  // Keep local state in sync if session changes for other reasons
  useEffect(() => {
    if (session?.user && JSON.stringify(session.user) !== JSON.stringify(userData)) {
      setUserData(session.user);
    }
  }, [session, userData]);

  if (status === 'loading' || isRefreshing || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const user = userData;

  // Use firstName + lastName preferentially
  const displayName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.name || 'User';

  const fName = user.firstName || user.name || 'User';

  const role = (user.role || 'USER') as 'USER' | 'AUTHOR' | 'ADMIN';

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/signin' });
    } catch (err) {
      toast.error('Sign out failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-4xl mx-auto py-12 md:py-16 px-4 sm:px-6"
    >
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-100">{fName}'s Profile</h1>
        <p className="mt-3 text-gray-400">Manage how you appear on Ofashi</p>
      </div>

      <Card className="bg-gray-950 border border-gray-800 shadow-2xl">
        <CardHeader className="text-center pb-6 border-b border-gray-800">
          <div className="flex flex-col items-center gap-5">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-600/40 shadow-xl shadow-purple-950/30">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={displayName}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-purple-900/70 to-gray-900 flex items-center justify-center text-purple-300 text-5xl font-bold">
                  {(user.firstName?.[0] || user.name?.[0] || '?').toUpperCase()}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <CardTitle className="text-3xl md:text-4xl text-gray-100">{displayName}</CardTitle>

              {user.username && (
                <p className="text-gray-400 flex items-center justify-center gap-0.5 text-base">
                  <AtSign size={18} className="text-purple-400" />
                  {user.username}
                </p>
              )}

              <div className="flex items-center justify-center gap-3 mt-3">
                <Badge
                  variant="outline"
                  className="px-5 py-2 text-base font-medium border-purple-600/50 text-purple-300 bg-purple-950/30"
                >
                  <ShieldCheck size={18} className="mr-2" />
                  {role}
                </Badge>
              </div>

              <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                <Calendar size={16} className="text-purple-400" />
                Member since{' '}
                {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-10 space-y-10">
          {/* Bio - now uses latest data */}
          {user.bio && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-3">
                <UserRound size={22} className="text-purple-400" />
                About
              </h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                {user.bio}
              </p>
            </div>
          )}

          {/* Email */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-3">
              <Mail size={22} className="text-purple-400" />
              Email
            </h3>
            <p className="text-gray-300 text-lg">{user.email}</p>
          </div>


          {/* Role-specific sections */}
          {role === 'ADMIN' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-purple-300 flex items-center gap-3">
                <LayoutDashboard size={24} />
                Admin Controls
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link href="/admin/dashboard">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-lg border-purple-600/40 hover:bg-purple-950/50 h-14"
                  >
                    Admin Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {['ADMIN', 'AUTHOR'].includes(role) && (
            <>
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-purple-300 flex items-center gap-3">
                  <Briefcase size={24} />
                  Your Projects & Case Studies
                </h3>
                <div className="text-gray-300 text-lg">
                  <p className="italic mb-4">
                    You have contributed to several projects. View and manage them below.
                  </p>
                  <Link
                    href="/projects"
                    className="text-purple-400 hover:text-purple-300 hover:underline text-lg inline-flex items-center gap-2"
                  >
                    View all your projects →
                  </Link>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-purple-300 flex items-center gap-3">
                  <BookOpen size={24} />
                  Your Blog Posts
                </h3>
                <div className="text-gray-300 text-lg">
                  <p className="italic mb-4">
                    You have published articles and insights. Manage your content here.
                  </p>
                  <Link
                    href="/learn/blog"
                    className="text-purple-400 hover:text-purple-300 hover:underline text-lg inline-flex items-center gap-2"
                  >
                    View your blog posts →
                  </Link>
                </div>
              </div>
            </>
          )}

          <Separator className="border border-gray-800 my-12" />

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/profile/edit?updated=true" className="flex-1 max-w-sm">
              <Button className="w-full bg-purple-700 hover:bg-purple-900 text-white text-lg h-14 hover:cursor-pointer border-0">
                <Edit className="mr-3 h-5 w-5" />
                Edit Profile
              </Button>
            </Link>

            <Button
              className="flex-1 max-w-sm text-gray-100 bg-black border border-gray-500 hover:border-gray-100 hover:text-gray-50 text-lg h-14 hover:cursor-pointer"
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