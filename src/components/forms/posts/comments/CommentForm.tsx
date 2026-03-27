"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createComment } from "@/lib/actions/comments";
import { useToast } from "@/hooks/use-toast";
import { AppButton } from "@/components/ui/AppButton";

interface Props {
  postSlug: string;
  parentId?: string | null;
  onSuccess?: () => void;
}

export default function CommentForm({ postSlug, parentId, onSuccess }: Props) {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!content.trim()) {
      toast({
        title: "Comment cannot be empty",
        description: "Please write something before posting.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        await createComment({
          postSlug,
          content,
        });

        setContent("");
        onSuccess?.();
        router.refresh();

        toast({
          title: "Comment added",
          description: "Your comment was posted successfully.",
        });
      } catch (error) {
        toast({
          title: "Failed to post comment",
          description:
            error instanceof Error ? error.message : "Something went wrong.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        placeholder={parentId ? "Write a reply..." : "Write a comment..."}
        className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white outline-none focus:border-gray-700"
      />

      <AppButton
        type="submit"
        disabled={isPending}
        className="hover:cursor-pointer"
      >
        {isPending ? "Posting..." : parentId ? "Reply" : "Post comment"}
      </AppButton>
    </form>
  );
}