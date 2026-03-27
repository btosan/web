"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleLike } from "@/lib/actions/likes";
import { AppButton } from "@/components/ui/AppButton";
import { useToast } from "@/hooks/use-toast";

interface Props {
  postSlug: string;
  initialLiked: boolean;
  initialCount: number;
}

export default function LikeButton({
  postSlug,
  initialLiked,
  initialCount,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const { toast } = useToast();
  const router = useRouter(); // ✅ added

  function handleLike() {
    const nextLiked = !liked;

    // optimistic UI
    setLiked(nextLiked);
    setCount((prev) => (nextLiked ? prev + 1 : prev - 1));

    startTransition(async () => {
      try {
        await toggleLike(postSlug);

        router.refresh(); // ✅ critical fix
      } catch (error) {
        // rollback on error
        setLiked(liked);
        setCount(initialCount);

        toast({
          title: "Failed to update like",
          description:
            error instanceof Error ? error.message : "Something went wrong.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <AppButton
      type="button"
      variant={liked ? "glow" : "outline"}
      onClick={handleLike}
      disabled={isPending}
      className="hover:cursor-pointer text-purple-50"
    >
      {liked ? "Unlike" : "Like"} ({count})
    </AppButton>
  );
}