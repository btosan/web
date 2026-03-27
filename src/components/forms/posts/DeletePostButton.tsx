"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/lib/actions/posts";
import { useToast } from "@/hooks/use-toast";
import { AppButton } from "@/components/ui/AppButton";

interface Props {
  id: string;
}

export default function DeletePostButton({ id }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this post?");

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deletePost(id);

        toast({
          title: "Post deleted",
          description: "The post has been removed successfully.",
        });

        router.push("/admin/posts");
        router.refresh();
      } catch (error) {
        toast({
          title: "Failed to delete post",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong while deleting the post.",
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
      {isPending ? "Deleting..." : "Delete post"}
    </AppButton>
  );
}