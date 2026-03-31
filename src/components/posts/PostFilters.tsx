"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Category } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { AppButton } from "@/components/ui/AppButton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  categories: Category[];
}

export default function PostFilters({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [tag, setTag] = useState(searchParams.get("tag") ?? "");

  function applyFilters() {
    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (category.trim()) params.set("category", category.trim());
    if (tag.trim()) params.set("tag", tag.trim());

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  function clearFilters() {
    setSearch("");
    setCategory("");
    setTag("");
    router.push(pathname);
  }

  return (
    <div className="mb-10 rounded-2xl border border-gray-800 bg-gray-950 p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="h-11 border-gray-800 bg-gray-900 text-white placeholder:text-gray-500 focus-visible:ring-0 focus:border-purple-500/50"
        />

        <Select
          value={category || "all"}
          onValueChange={(value) => setCategory(value === "all" ? "" : value)}
        >
          <SelectTrigger className="h-11 w-full border-gray-800 bg-gray-900 text-white">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>

          <SelectContent className="border-gray-800 bg-gray-900 text-white">
            <SelectItem value="all">All categories</SelectItem>

            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.catName}>
                {cat.catName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Filter by tag"
          className="h-11 border-gray-800 bg-gray-900 text-white placeholder:text-gray-500 focus-visible:ring-0 focus:border-purple-500/50"
        />
      </div>

      <div className="mt-4 flex gap-3">
        <AppButton
          type="button"
          onClick={applyFilters}
          className="hover:cursor-pointer bg-purple-600/50"
        >
          Apply filters
        </AppButton>

        <AppButton
          type="button"
          onClick={clearFilters}
          className="
            hover:cursor-pointer 
            text-gray-300 
            bg-transparent
            focus:outline-none 
            focus:ring-0 
            focus-visible:ring-0
            focus:border-purple-500
            border border-purple-500/50
          "
        >
          Clear
        </AppButton>
      </div>
    </div>
  );
}