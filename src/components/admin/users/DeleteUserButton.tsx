"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/lib/actions/users";
import { useToast } from "@/hooks/use-toast";

interface Props {
  userId: string;
  userEmail: string;
}

export default function DeleteUserButton({
  userId,
  userEmail,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${userEmail}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsDeleting(true);

    startTransition(async () => {
      try {
        await deleteUser(userId);

        toast({
          title: "User deleted",
          description: `"${userEmail}" was deleted successfully.`,
        });

        router.refresh();
      } catch (error) {
        toast({
          title: "Delete failed",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong while deleting the user.",
          variant: "destructive",
        });
      } finally {
        setIsDeleting(false);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending || isDeleting}
      className="inline-flex items-center justify-center rounded-md border border-red-500/40 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting || isPending ? "Deleting..." : "Delete"}
    </button>
  );
}