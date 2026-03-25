"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectType,
  Project,
  ProjectCategory,
  ProjectTag,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CldUploadWidget } from "next-cloudinary";

import { createProject, updateProject } from "@/lib/actions/projects";
import { projectSchema, ProjectFormValues } from "@/lib/validators/project";
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

interface ProjectWithRelations extends Project {
  category?: ProjectCategory | null;
  tags?: ProjectTag[];
}

interface Props {
  mode: "create" | "edit";
  project?: ProjectWithRelations;
  categories?: ProjectCategory[];
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

export default function ProjectForm({ mode, project, categories = [] }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = mode === "edit";

  const [isLoading, setIsLoading] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [gallery, setGallery] = useState<string[]>(project?.imageUrls || []);
  const [tagsInput, setTagsInput] = useState(
    project?.tags?.map((tag) => tag.tagName).join(", ") || ""
  );

  const defaultValues = useMemo<ProjectFormValues>(
    () => ({
      title: project?.title || "",
      slug: project?.slug || "",
      imageUrl: project?.imageUrl || "",
      imageCredit: project?.imageCredit || "",
      imageUrls: project?.imageUrls || [],
      imageCreditUrls: project?.imageCreditUrls || [],
      shortDescription: project?.shortDescription || "",
      description: project?.description || "",
      featured: project?.featured ?? false,
      type: project?.type || ProjectType.FULLSTACK,
      categoryName: project?.category?.catName || "",
      tagNames: project?.tags?.map((tag) => tag.tagName).filter(Boolean) || [],
      projectUrl: project?.projectUrl || "",
    }),
    [project]
  );

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  useEffect(() => {
  if (!project) return;

  form.reset({
    title: project.title || "",
    slug: project.slug || "",
    imageUrl: project.imageUrl || "",
    imageCredit: project.imageCredit || "",
    imageUrls: project.imageUrls || [],
    imageCreditUrls: project.imageCreditUrls || [],
    shortDescription: project.shortDescription || "",
    description: project.description || "",
    featured: project.featured ?? false,
    type: project.type || ProjectType.FULLSTACK,
    categoryName: project.category?.catName || "",
    tagNames: project.tags?.map((tag) => tag.tagName).filter(Boolean) || [],
    projectUrl: project.projectUrl || "",
  });

  setGallery(project.imageUrls || []);
  setTagsInput(project.tags?.map((tag) => tag.tagName).join(", ") || "");
}, [project, form]);

  const titleValue = form.watch("title");

  useEffect(() => {
    if (!slugManuallyEdited) {
      form.setValue("slug", generateSlug(titleValue || ""), {
        shouldValidate: true,
      });
    }
  }, [titleValue, slugManuallyEdited, form]);

  useEffect(() => {
    form.setValue("imageUrls", gallery, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [gallery, form]);

  async function onSubmit(values: ProjectFormValues) {
    setIsLoading(true);

    try {
      const payload = {
        ...values,
        imageUrls: gallery,
        imageCreditUrls: values.imageCreditUrls || [],
        tagNames: parseTags(tagsInput),
        slug: values.slug?.trim() || undefined,
        categoryName: values.categoryName?.trim() || undefined,
        imageCredit: values.imageCredit?.trim() || undefined,
        shortDescription: values.shortDescription?.trim() || undefined,
        projectUrl: values.projectUrl?.trim() || undefined,
      };

      if (isEdit && project) {
        await updateProject(project.id, payload);

        toast({
          title: "Project updated",
          description: `${payload.title} was updated successfully.`,
        });
      } else {
        await createProject(payload);

        toast({
          title: "Project created",
          description: `${payload.title} was created successfully.`,
        });
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      toast({
        title: isEdit ? "Failed to update project" : "Failed to create project",
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
          {isEdit ? "Edit project" : "Create project"}
        </h1>

        <p className="text-sm md:text-base text-gray-400">
          Fill in the project information below.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">
                Basic information
              </h2>
              <p className="text-sm text-gray-400">
                Add the essential details for this project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Project title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="E.g. Portfolio CMS"
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
                    <FormLabel className="text-sm text-purple-100">
                      Slug
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="portfolio-cms"
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
                    <FormLabel className="text-sm text-purple-100">
                      Category
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          list="project-categories"
                          placeholder="Select or type a category"
                          className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                        />

                        <datalist id="project-categories">
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
                name="projectUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Project URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="https://example.com"
                        className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-purple-100">
                    Project type
                  </FormLabel>
                  <FormControl>
                    <select
                      value={field.value}
                      onChange={field.onChange}
                      className="h-11 w-full rounded-md border border-gray-800 bg-gray-950 px-3 text-white outline-none focus:border-gray-700"
                    >
                      {Object.values(ProjectType).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />
          </section>

          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">
                Description
              </h2>
              <p className="text-sm text-gray-400">
                Add a short summary and a more detailed project description.
              </p>
            </div>

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-purple-100">
                    Short description
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={4}
                      placeholder="Brief summary of the project"
                      className="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

<FormField
  control={form.control}
  name="description"
  render={({ field }) => {
    const editorContent = field.value || "";

    return (
      <FormItem>
        <FormLabel className="text-sm text-purple-100">
          Full description
        </FormLabel>
        <FormControl>
          <TiptapEditor
            key={`${project?.id ?? "new-project"}-${editorContent.length}`}
            content={editorContent}
            onChange={(value) =>
              form.setValue("description", value, {
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
                  placeholder="Next.js, Prisma, PostgreSQL"
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
                    Mark as featured project
                  </label>
                </FormItem>
              )}
            />
          </section>

          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">
                Main image
              </h2>
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
              <img
                src={form.watch("imageUrl")}
                alt="Project cover"
                className="w-40 h-40 object-cover rounded-xl border border-gray-800"
              />
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

          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">
                Gallery images
              </h2>
            </div>

            {gallery.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((url, index) => (
                  <div
                    key={`${url}-${index}`}
                    className="relative rounded-xl overflow-hidden border border-gray-800 bg-gray-950"
                  >
                    <img
                      src={url}
                      alt="Project gallery"
                      className="h-36 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setGallery((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="absolute top-2 right-2 rounded-md bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <CldUploadWidget
              uploadPreset="ofashiprofiles"
              onSuccess={(result: any) => {
                const url = result?.info?.secure_url;
                if (!url) return;

                setGallery((prev) => [...prev, url]);
              }}
            >
              {({ open }) => (
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={() => open()}
                  className="hover:cursor-pointer text-gray-300"
                >
                  Add gallery image
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
            {isEdit ? "Update project" : "Create project"}
          </AppButton>
        </form>
      </Form>
    </motion.div>
  );
}