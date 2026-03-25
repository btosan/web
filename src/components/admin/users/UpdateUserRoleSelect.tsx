"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import { updateUserRole } from "@/lib/actions/users";
import { useToast } from "@/hooks/use-toast";

interface Props {
  userId: string;
  currentRole: Role;
}

export default function UpdateUserRoleSelect({
  userId,
  currentRole,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState<Role>(currentRole);
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={role}
      disabled={isPending}
      onChange={(e) => {
        const nextRole = e.target.value as Role;
        setRole(nextRole);

        startTransition(async () => {
          try {
            await updateUserRole(userId, nextRole);

            toast({
              title: "Role updated",
              description: `User role changed to ${nextRole}.`,
            });

            router.refresh();
          } catch (error) {
            setRole(currentRole);
            toast({
              title: "Failed to update role",
              description:
                error instanceof Error
                  ? error.message
                  : "Something went wrong.",
              variant: "destructive",
            });
          }
        });
      }}
      className="h-10 rounded-md border border-gray-700 bg-gray-950 px-3 text-sm text-white outline-none focus:border-purple-400 disabled:opacity-60"
    >
      {Object.values(Role).map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}