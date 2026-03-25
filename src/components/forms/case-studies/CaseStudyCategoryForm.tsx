"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CaseStudyCategory } from "@prisma/client";

import {
  createCaseStudyCategory,
  updateCaseStudyCategory,
} from "@/lib/actions/caseStudyCategories";
import { useToast } from "@/hooks/use-toast";
import { AppButton } from "@/components/ui/AppButton";
import { Input } from "@/components/ui/input";

interface Props {
  mode: "create" | "edit";
  category?: CaseStudyCategory;
}

export default function CaseStudyCategoryForm({ mode, category }: Props) {
  const isEdit = mode === "edit";
  const router = useRouter();
  const { toast } = useToast();

  const [catName, setCatName] = useState(category?.catName ?? "");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEdit && category) {
        await updateCaseStudyCategory(category.id, { catName });

        toast({
          title: "Category updated",
          description: `${catName} was updated successfully.`,
        });
      } else {
        await createCaseStudyCategory({ catName });

        toast({
          title: "Category created",
          description: `${catName} was created successfully.`,
        });
      }

      router.push("/admin/case-study-categories");
      router.refresh();
    } catch (error) {
      toast({
        title: isEdit
          ? "Failed to update category"
          : "Failed to create category",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-3xl mx-auto rounded-2xl border border-gray-800 bg-black p-6 md:p-8 lg:p-10 shadow-sm shadow-gray-900 space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-purple-100">
          {isEdit ? "Edit case study category" : "Create case study category"}
        </h1>

        <p className="text-sm md:text-base text-gray-400">
          Manage case study categories without changing your design system.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-purple-100">Category name</label>
          <Input
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            placeholder="E.g. SaaS Growth"
            className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
          />
        </div>

        <AppButton
          type="submit"
          size="full"
          variant="glow"
          className="hover:cursor-pointer"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isEdit ? "Update category" : "Create category"}
        </AppButton>
      </form>
    </motion.div>
  );
}