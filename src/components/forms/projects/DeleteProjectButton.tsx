"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProject } from "@/lib/actions/projects";
import { useToast } from "@/hooks/use-toast";
import { AppButton } from "@/components/ui/AppButton";

interface Props {
  id: string;
}

export default function DeleteProjectButton({ id }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this project?");

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteProject(id);

        toast({
          title: "Project deleted",
          description: "The project has been removed successfully.",
        });

        router.push("/admin/projects");
        router.refresh();
      } catch (error) {
        toast({
          title: "Failed to delete project",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong while deleting the project.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <AppButton
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-600 text-white hover:bg-red-700 hover:cursor-pointer"
    >
      {isPending ? "Deleting..." : "Delete project"}
    </AppButton>
  );
}