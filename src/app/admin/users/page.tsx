import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { getAllUsers, getUsersAdminSummary } from "@/lib/actions/users";
import AdminUsersTable from "@/components/admin/users/AdminUsersTable";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/admin/users");
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  const [summary, users] = await Promise.all([
    getUsersAdminSummary(),
    getAllUsers(),
  ]);

  return (
    <section className="min-h-screen bg-black px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-purple-100 md:text-3xl">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-400 md:text-base">
            Manage registered users, roles, and account access.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">Registered Users</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {summary.registeredUsers}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">Online Users</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {summary.activeUsers}
            </p>
          </div>
        </div>

        <AdminUsersTable users={users} />
      </div>
    </section>
  );
}