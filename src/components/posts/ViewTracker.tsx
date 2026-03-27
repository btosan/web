"use client";

import { useEffect } from "react";
import { incrementPostViewsBySlug } from "@/lib/actions/posts";

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    incrementPostViewsBySlug(slug).catch(() => {});
  }, [slug]);

  return null;
}