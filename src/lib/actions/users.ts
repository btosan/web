"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role, UserStatus } from "@prisma/client";

/////////////////////////////////////////////////////
// 🔐 ADMIN GUARD
/////////////////////////////////////////////////////

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== Role.ADMIN) {
    redirect("/profile");
  }

  return session.user;
}

/////////////////////////////////////////////////////
// 🧠 HELPERS
/////////////////////////////////////////////////////

function ensureValidRole(role: string): Role {
  if (!Object.values(Role).includes(role as Role)) {
    throw new Error("Invalid role.");
  }

  return role as Role;
}

function ensureValidUserStatus(status: string): UserStatus {
  if (!Object.values(UserStatus).includes(status as UserStatus)) {
    throw new Error("Invalid user status.");
  }

  return status as UserStatus;
}

function getOnlineThreshold() {
  // A user is considered online if we received a heartbeat
  // within the last 2 minutes.
  return new Date(Date.now() - 2 * 60 * 1000);
}

/////////////////////////////////////////////////////
// 👤 USER PRESENCE / HEARTBEAT
/////////////////////////////////////////////////////

/**
 * Called from the client while an authenticated user is on the site.
 * Updates lastSeenAt so admin can tell who is online.
 */
export async function updateMyPresence() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return;
  }

  await db.user.update({
    where: { id: session.user.id },
    data: {
      lastSeenAt: new Date(),
    },
  });
}

/////////////////////////////////////////////////////
// DELETE USER (HARDENED FOR YOUR CURRENT SCHEMA)
/////////////////////////////////////////////////////

export async function deleteUser(userId: string) {
  const sessionUser = await requireAdmin();

  // ❌ Prevent deleting yourself
  if (sessionUser.id === userId) {
    throw new Error("You cannot delete your own account.");
  }

  const userToDelete = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  if (!userToDelete) {
    throw new Error("User not found.");
  }

  // ❌ Prevent deleting last ADMIN
  if (userToDelete.role === Role.ADMIN) {
    const adminCount = await db.user.count({
      where: { role: Role.ADMIN },
    });

    if (adminCount <= 1) {
      throw new Error("Cannot delete the last admin.");
    }
  }

  await db.$transaction(async (tx) => {
    // Detach relations that reference User.email
    await tx.post.updateMany({
      where: { authorEmail: userToDelete.email },
      data: { authorEmail: null },
    });

    await tx.caseStudy.updateMany({
      where: { authorEmail: userToDelete.email },
      data: { authorEmail: null },
    });

    await tx.comment.updateMany({
      where: { userEmail: userToDelete.email },
      data: { userEmail: null },
    });

    await tx.like.updateMany({
      where: { userEmail: userToDelete.email },
      data: { userEmail: null },
    });

    // Explicit cleanup
    await tx.account.deleteMany({
      where: { userId: userToDelete.id },
    });

    await tx.session.deleteMany({
      where: { userId: userToDelete.id },
    });

    await tx.user.delete({
      where: { id: userToDelete.id },
    });
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin");
}

/////////////////////////////////////////////////////
// UPDATE USER ROLE (HARDENED)
/////////////////////////////////////////////////////

export async function updateUserRole(userId: string, newRole: string) {
  const sessionUser = await requireAdmin();
  const role = ensureValidRole(newRole);

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  // ❌ Prevent changing your own role
  if (sessionUser.id === userId) {
    throw new Error("You cannot change your own role.");
  }

  // ❌ Prevent demoting last ADMIN
  if (user.role === Role.ADMIN && role !== Role.ADMIN) {
    const adminCount = await db.user.count({
      where: { role: Role.ADMIN },
    });

    if (adminCount <= 1) {
      throw new Error("Cannot demote the last admin.");
    }
  }

  await db.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin");
}

/////////////////////////////////////////////////////
// UPDATE USER ACCOUNT STATUS
/////////////////////////////////////////////////////

/**
 * Account status is different from online presence.
 * ACTIVE / INACTIVE is a database-controlled account state.
 */
export async function updateUserStatus(userId: string, newStatus: string) {
  const sessionUser = await requireAdmin();
  const status = ensureValidUserStatus(newStatus);

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      status: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  // ❌ Prevent deactivating yourself
  if (sessionUser.id === userId && status === UserStatus.INACTIVE) {
    throw new Error("You cannot deactivate your own account.");
  }

  // ❌ Prevent deactivating last ADMIN
  if (user.role === Role.ADMIN && status === UserStatus.INACTIVE) {
    const activeAdminCount = await db.user.count({
      where: {
        role: Role.ADMIN,
        status: UserStatus.ACTIVE,
      },
    });

    if (activeAdminCount <= 1) {
      throw new Error("Cannot deactivate the last active admin.");
    }
  }

  await db.user.update({
    where: { id: userId },
    data: { status },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin");
}

/////////////////////////////////////////////////////
// ADMIN: GET ALL USERS
/////////////////////////////////////////////////////

export async function getAllUsers() {
  await requireAdmin();

  const onlineThreshold = getOnlineThreshold();

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      image: true,
      role: true,
      status: true,
      lastSeenAt: true,
      bio: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          posts: true,
          comments: true,
          likes: true,
          caseStudies: true,
          accounts: true,
          sessions: true,
        },
      },
    },
  });

  return users.map((user) => ({
    ...user,
    isOnline: !!user.lastSeenAt && user.lastSeenAt >= onlineThreshold,
  }));
}

/////////////////////////////////////////////////////
// ADMIN: GET USER BY ID
/////////////////////////////////////////////////////

export async function getUserById(userId: string) {
  await requireAdmin();

  const onlineThreshold = getOnlineThreshold();

  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
      },
      caseStudies: {
        orderBy: { createdAt: "desc" },
      },
      comments: {
        orderBy: { createdAt: "desc" },
      },
      likes: true,
      accounts: true,
      sessions: true,
    },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    isOnline: !!user.lastSeenAt && user.lastSeenAt >= onlineThreshold,
  };
}

/////////////////////////////////////////////////////
// ADMIN: GET USERS SUMMARY
/////////////////////////////////////////////////////

export async function getUsersAdminSummary() {
  await requireAdmin();

  const onlineThreshold = getOnlineThreshold();

  const [registeredUsers, onlineUsers] = await Promise.all([
    db.user.count(),
    db.user.count({
      where: {
        lastSeenAt: {
          gte: onlineThreshold,
        },
      },
    }),
  ]);

  return {
    registeredUsers,
    activeUsers: onlineUsers,
  };
}