"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePackage } from "@/lib/actions/packages";
import { useToast } from "@/hooks/use-toast";

interface Props {
  packageId: string;
  packageName: string;
}

export default function DeletePackageButton({
  packageId,
  packageName,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${packageName}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsDeleting(true);

    startTransition(async () => {
      try {
        await deletePackage(packageId);

        toast({
          title: "Package deleted",
          description: `"${packageName}" was deleted successfully.`,
        });

        router.push("/admin/packages");
        router.refresh();
      } catch (error) {
        toast({
          title: "Delete failed",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong while deleting the package.",
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