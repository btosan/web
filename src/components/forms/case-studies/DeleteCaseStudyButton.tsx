'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { deleteCaseStudy } from '@/lib/actions/caseStudies';

interface DeleteCaseStudyButtonProps {
  caseStudyId: string;
  caseStudyTitle: string;
}

export default function DeleteCaseStudyButton({
  caseStudyId,
  caseStudyTitle,
}: DeleteCaseStudyButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = () => {
    if (!confirm(`Are you sure you want to permanently delete "${caseStudyTitle}"? This action cannot be undone.`)) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteCaseStudy(caseStudyId);

        if (result?.success) {
          toast({
            title: "Case study deleted",
            description: `"${caseStudyTitle}" has been successfully deleted.`,
          });
          router.refresh();   // Refresh the admin list
        } else {
        toast({
          variant: "destructive",
          title: "Delete failed",
          description: "Something went wrong while deleting.",
        });
      }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to delete case study.",
        });
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center justify-center rounded-md border border-red-900/50 px-3 py-2 text-sm font-medium text-red-400 hover:border-red-600 hover:text-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}