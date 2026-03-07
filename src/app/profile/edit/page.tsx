// app/profile/edit/page.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import EditProfile from '@/components/profiles/EditProfile';

export const dynamic = 'force-dynamic';   // Important for fresh session check

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/signin');
  }

  // Optional: you can pass minimal user data if the component needs it
  // (but most of the time EditProfile uses useSession() anyway)
  return <EditProfile />;
}