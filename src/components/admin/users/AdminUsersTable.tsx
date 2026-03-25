"use client";

import { useMemo, useState } from "react";
import { Role, UserStatus } from "@prisma/client";
import UpdateUserRoleSelect from "@/components/admin/users/UpdateUserRoleSelect";
import DeleteUserButton from "@/components/admin/users/DeleteUserButton";

type AdminUser = {
  id: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  email: string;
  image: string | null;
  role: Role;
  status: UserStatus;
  lastSeenAt: Date | null;
  isOnline: boolean;
  createdAt: Date;
  _count: {
    posts: number;
    sessions: number;
  };
};

interface Props {
  users: AdminUser[];
}

export default function AdminUsersTable({ users }: Props) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | Role>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | UserStatus>("ALL");
  const [presenceFilter, setPresenceFilter] = useState<
    "ALL" | "ONLINE" | "OFFLINE"
  >("ALL");

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();

    return users.filter((user) => {
      const displayName =
        user.name ||
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.username ||
        "";

      const matchesSearch =
        !q ||
        displayName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        (user.username || "").toLowerCase().includes(q);

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "ALL" || user.status === statusFilter;
      const matchesPresence =
        presenceFilter === "ALL" ||
        (presenceFilter === "ONLINE" && user.isOnline) ||
        (presenceFilter === "OFFLINE" && !user.isOnline);

      return matchesSearch && matchesRole && matchesStatus && matchesPresence;
    });
  }, [users, search, roleFilter, statusFilter, presenceFilter]);

  return (
    <div className="space-y-6">
      {/* FILTERS */}
      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-800 bg-gray-950 p-4 md:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm text-gray-400">Search</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-md border border-gray-800 bg-black px-3 text-white"
            placeholder="Search..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">Role</label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="h-11 w-full rounded-md border border-gray-800 bg-black px-3 text-white"
          >
            <option value="ALL">All Roles</option>
            {Object.values(Role).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Account Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="h-11 w-full rounded-md border border-gray-800 bg-black px-3 text-white"
          >
            <option value="ALL">All</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Presence
          </label>
          <select
            value={presenceFilter}
            onChange={(e) => setPresenceFilter(e.target.value as any)}
            className="h-11 w-full rounded-md border border-gray-800 bg-black px-3 text-white"
          >
            <option value="ALL">All</option>
            <option value="ONLINE">Online</option>
            <option value="OFFLINE">Offline</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
        <div className="grid grid-cols-12 border-b border-gray-800 px-4 py-3 text-xs text-gray-400">
          <div className="col-span-4">User</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Presence</div>
          <div className="col-span-2 text-center">Role</div>
          <div className="col-span-1 text-center">Posts</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-800">
          {filteredUsers.map((user) => {
            const displayName =
              user.name ||
              [user.firstName, user.lastName].filter(Boolean).join(" ") ||
              user.username ||
              "Unnamed";

            return (
              <div
                key={user.id}
                className="grid grid-cols-12 items-center px-4 py-4"
              >
                <div className="col-span-4">
                  <p className="text-white">{displayName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                {/* ACCOUNT STATUS */}
                <div className="col-span-2 flex justify-center">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      user.status === "ACTIVE"
                        ? "bg-blue-900/40 text-blue-300"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>

                {/* ONLINE STATUS */}
                <div className="col-span-2 flex justify-center">
                  <span
                    className={`flex items-center gap-2 px-3 py-1 text-xs rounded-full ${
                      user.isOnline
                        ? "bg-green-900/40 text-green-300"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        user.isOnline ? "bg-green-400" : "bg-gray-500"
                      }`}
                    />
                    {user.isOnline ? "Online" : "Offline"}
                  </span>
                </div>

                <div className="col-span-2 flex justify-center">
                  <UpdateUserRoleSelect
                    userId={user.id}
                    currentRole={user.role}
                  />
                </div>

                <div className="col-span-1 text-center">
                  {user._count.posts}
                </div>

                <div className="col-span-1 flex justify-end">
                  <DeleteUserButton
                    userId={user.id}
                    userEmail={user.email}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}