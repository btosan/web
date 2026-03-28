"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PackageCategory } from "@prisma/client";

import {
  createPackageCategory,
  updatePackageCategory,
} from "@/lib/actions/packageCategories";
import { useToast } from "@/hooks/use-toast";
import { AppButton } from "@/components/ui/AppButton";
import { Input } from "@/components/ui/input";

interface Props {
  mode: "create" | "edit";
  category?: PackageCategory;
}

export default function PackageCategoryForm({ mode, category }: Props) {
  const isEdit = mode === "edit";
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState(category?.name ?? "");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEdit && category) {
        await updatePackageCategory(category.id, { name });

        toast({
          title: "Category updated",
          description: `${name} was updated successfully.`,
        });
      } else {
        await createPackageCategory({ name });

        toast({
          title: "Category created",
          description: `${name} was created successfully.`,
        });
      }

      router.push("/admin/package-categories");
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
      className="mx-auto w-full max-w-3xl space-y-8 rounded-2xl border border-gray-800 bg-black p-6 shadow-sm shadow-gray-900 md:p-8 lg:p-10"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-purple-100 md:text-3xl">
          {isEdit ? "Edit package category" : "Create package category"}
        </h1>

        <p className="text-sm text-gray-400 md:text-base">
          Manage package categories without changing your package form design.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-purple-100">Category name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g. Web Development"
            className="h-11 border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
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