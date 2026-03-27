"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post, Category, Tag, Type } from "@prisma/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

import { createPost, updatePost } from "@/lib/actions/posts";
import { postSchema, PostFormValues } from "@/lib/validators/post";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { AppButton } from "@/components/ui/AppButton";
import TiptapEditor from "@/components/editorOld/TiptapEditor";

interface PostWithRelations extends Post {
  category?: Category | null;
  tags?: Tag[];
}

type PostEditorType = PostFormValues["type"];

interface Props {
  mode: "create" | "edit";
  post?: PostWithRelations;
  categories?: Category[];
  initialType?: PostEditorType;
}

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

function parseTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getSafePostType(
  value: Type | null | undefined,
  fallback: PostEditorType
): PostEditorType {
  if (value === Type.BLOG || value === Type.GUIDE || value === Type.RESOURCES) {
    return value;
  }

  return fallback;
}

function isString(value: string | null): value is string {
  return value !== null;
}

export default function PostForm({
  mode,
  post,
  categories = [],
  initialType = Type.BLOG,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = mode === "edit";

  const [isLoading, setIsLoading] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [tagsInput, setTagsInput] = useState(
    post?.tags?.map((tag) => tag.tagName).filter(isString).join(", ") || ""
  );

  const defaultValues = useMemo<PostFormValues>(
    () => ({
      title: post?.title || "",
      slug: post?.slug || "",
      type: getSafePostType(post?.type, initialType),
      imageUrl: post?.imageUrl || "",
      imageCredit: post?.imageCredit || "",
      openingParagraph: post?.openingParagraph || "",
      tableOfContents: post?.tableOfContents || "",
      content: post?.content || "",
      published: post?.published ?? false,
      featured: post?.featured ?? false,
      categoryName: post?.category?.catName || "",
      tagNames: post?.tags?.map((tag) => tag.tagName).filter(isString) || [],
    }),
    [post, initialType]
  );

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!post) return;

    form.reset({
      title: post.title || "",
      slug: post.slug || "",
      type: getSafePostType(post.type, initialType),
      imageUrl: post.imageUrl || "",
      imageCredit: post.imageCredit || "",
      openingParagraph: post.openingParagraph || "",
      tableOfContents: post.tableOfContents || "",
      content: post.content || "",
      published: post.published ?? false,
      featured: post.featured ?? false,
      categoryName: post.category?.catName || "",
      tagNames: post.tags?.map((tag) => tag.tagName).filter(isString) || [],
    });

    setTagsInput(post.tags?.map((tag) => tag.tagName).filter(isString).join(", ") || "");
  }, [post, form, initialType]);

  const titleValue = form.watch("title");

  useEffect(() => {
    if (!slugManuallyEdited) {
      form.setValue("slug", generateSlug(titleValue || ""), {
        shouldValidate: true,
      });
    }
  }, [titleValue, slugManuallyEdited, form]);

  async function onSubmit(values: PostFormValues) {
    setIsLoading(true);

    try {
      const payload = {
        ...values,
        tagNames: parseTags(tagsInput),
        slug: values.slug?.trim() || undefined,
        categoryName: values.categoryName?.trim() || undefined,
        imageUrl: values.imageUrl?.trim() || undefined,
        imageCredit: values.imageCredit?.trim() || undefined,
        openingParagraph: values.openingParagraph?.trim() || undefined,
        tableOfContents: values.tableOfContents?.trim() || undefined,
      };

      if (isEdit && post) {
        await updatePost(post.id, payload);

        toast({
          title: "Post updated",
          description: `${payload.title} was updated successfully.`,
        });
      } else {
        await createPost(payload);

        toast({
          title: "Post created",
          description: `${payload.title} was created successfully.`,
        });
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (error) {
      toast({
        title: isEdit ? "Failed to update post" : "Failed to create post",
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
      className="w-full max-w-5xl mx-auto rounded-2xl border border-gray-800 bg-black p-6 md:p-8 lg:p-10 shadow-sm shadow-gray-900 space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-purple-100">
          {isEdit ? "Edit post" : "Create post"}
        </h1>

        <p className="text-sm md:text-base text-gray-400">
          Fill in the post information below.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">
                Basic information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="E.g. How to Build a Blog in Next.js"
                        className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">Slug</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="how-to-build-a-blog-in-nextjs"
                        onChange={(e) => {
                          setSlugManuallyEdited(true);
                          field.onChange(e);
                        }}
                        className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">Category</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          list="post-categories"
                          placeholder="Select or type a category"
                          className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                        />
                        <datalist id="post-categories">
                          {categories.map((category) => (
                            <option key={category.id} value={category.catName} />
                          ))}
                        </datalist>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">Post type</FormLabel>
                    <FormControl>
                      <select
                        value={field.value}
                        onChange={field.onChange}
                        className="h-11 w-full rounded-md border border-gray-800 bg-gray-950 px-3 text-white outline-none focus:border-gray-700"
                      >
                        <option value={Type.BLOG}>BLOG</option>
                        <option value={Type.GUIDE}>GUIDE</option>
                        <option value={Type.RESOURCES}>RESOURCES</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">Content</h2>
            </div>

            <FormField
              control={form.control}
              name="openingParagraph"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-purple-100">
                    Opening paragraph
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={4}
                      placeholder="Short intro for the article"
                      className="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tableOfContents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-purple-100">
                    Table of contents
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={4}
                      placeholder="Optional table of contents text"
                      className="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                const editorContent = field.value || "";

                return (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Full content
                    </FormLabel>
                    <FormControl>
                      <TiptapEditor
                        key={`${post?.id ?? "new-post"}-${editorContent.length}`}
                        content={editorContent}
                        onChange={(value) =>
                          form.setValue("content", value, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          })
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                );
              }}
            />
          </section>

          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">
                Tags and settings
              </h2>
            </div>

            <FormItem>
              <FormLabel className="text-sm text-purple-100">Tags</FormLabel>
              <FormControl>
                <Input
                  value={tagsInput}
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    setTagsInput(rawValue);

                    form.setValue("tagNames", parseTags(rawValue), {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  placeholder="Next.js, Prisma, Tailwind"
                  className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400">
                {form.formState.errors.tagNames?.message}
              </FormMessage>
            </FormItem>

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem>
                  <label className="inline-flex items-center gap-3 text-sm text-gray-100">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-700 bg-gray-900"
                    />
                    Mark as featured post
                  </label>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem>
                  <label className="inline-flex items-center gap-3 text-sm text-gray-100">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-700 bg-gray-900"
                    />
                    Publish this post
                  </label>
                </FormItem>
              )}
            />
          </section>

          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">Main image</h2>
            </div>

            <FormField
              control={form.control}
              name="imageCredit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-purple-100">
                    Image credit
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Photographer / source"
                      className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {form.watch("imageUrl") ? (
              <div className="relative w-40 h-40">
                <Image
                  src={form.watch("imageUrl")}
                  alt="Post cover"
                  fill
                  className="object-cover rounded-xl border border-gray-800"
                />
              </div>
            ) : null}

            <CldUploadWidget
              uploadPreset="ofashiprofiles"
              onSuccess={(result: any) => {
                const url = result?.info?.secure_url;
                if (!url) return;

                form.setValue("imageUrl", url, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            >
              {({ open }) => (
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={() => open()}
                  className="hover:cursor-pointer text-gray-300"
                >
                  Upload main image
                </AppButton>
              )}
            </CldUploadWidget>
          </section>

          <AppButton
            type="submit"
            size="full"
            variant="glow"
            className="hover:cursor-pointer"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isEdit ? "Update post" : "Create post"}
          </AppButton>
        </form>
      </Form>
    </motion.div>
  );
}