"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CaseStudy,
  CaseStudyCategory,
  CaseStudyTag,
  Project,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CldUploadWidget } from "next-cloudinary";

import {
  createCaseStudy,
  updateCaseStudy,
} from "@/lib/actions/caseStudies";
import { useToast } from "@/hooks/use-toast";
import { AppButton } from "@/components/ui/AppButton";
import { Input } from "@/components/ui/input";
import TiptapEditor from "@/components/editorOld/TiptapEditor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  caseStudySchema,
  CaseStudyFormValues,
} from "@/lib/validators/caseStudy";

interface CaseStudyWithRelations extends CaseStudy {
  category?: CaseStudyCategory | null;
  tags?: CaseStudyTag[];
  project?: Project | null;
}

interface Props {
  mode: "create" | "edit";
  caseStudy?: CaseStudyWithRelations;
  categories?: CaseStudyCategory[];
  projects?: Project[];
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

function parseKeyMetrics(value: string) {
  const lines = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const metrics: Record<string, string> = {};

  for (const line of lines) {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) continue;
    metrics[key.trim()] = rest.join(":").trim();
  }

  return Object.keys(metrics).length ? metrics : null;
}

function stringifyKeyMetrics(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  return Object.entries(value as Record<string, unknown>)
    .map(([key, val]) => `${key}: ${String(val ?? "")}`)
    .join("\n");
}

export default function CaseStudyForm({
  mode,
  caseStudy,
  categories = [],
  projects = [],
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = mode === "edit";

  const [isLoading, setIsLoading] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [tagsInput, setTagsInput] = useState(
    caseStudy?.tags?.map((tag) => tag.tagName).join(", ") || ""
  );
  const [keyMetricsInput, setKeyMetricsInput] = useState(
    stringifyKeyMetrics(caseStudy?.keyMetrics)
  );

const defaultValues = useMemo<CaseStudyFormValues>(
  () => ({
    title: caseStudy?.title || "",
    slug: caseStudy?.slug || "",
    excerpt: caseStudy?.excerpt || "",
    content: caseStudy?.content || "",
    challenge: caseStudy?.challenge || "",
    solution: caseStudy?.solution || "",
    results: caseStudy?.results || "",
    clientName: caseStudy?.clientName || "",
    industry: caseStudy?.industry || "",
    projectTimeline: caseStudy?.projectTimeline || "",
    teamSize: caseStudy?.teamSize != null ? String(caseStudy.teamSize) : "",
    testimonial: caseStudy?.testimonial || "",
    testimonialAuthor: caseStudy?.testimonialAuthor || "",
    imageUrl: caseStudy?.imageUrl || "",
    imageCredit: caseStudy?.imageCredit || "",
    published: caseStudy?.published ?? false,
    featured: caseStudy?.featured ?? false,
    categoryName: caseStudy?.category?.catName || caseStudy?.catName || "",
    tagNames: caseStudy?.tags?.map((tag) => tag.tagName) || [],
    projectId: caseStudy?.projectId || "",
    keyMetrics: caseStudy?.keyMetrics ?? null,
  }),
  [caseStudy]
);

  const form = useForm<CaseStudyFormValues>({
    resolver: zodResolver(caseStudySchema),
    defaultValues,
  });

  const titleValue = form.watch("title");

  useEffect(() => {
    if (!slugManuallyEdited) {
      form.setValue("slug", generateSlug(titleValue || ""), {
        shouldValidate: true,
      });
    }
  }, [titleValue, slugManuallyEdited, form]);

  useEffect(() => {
    if (!caseStudy) return;

    form.reset({
      title: caseStudy.title || "",
      slug: caseStudy.slug || "",
      excerpt: caseStudy.excerpt || "",
      content: caseStudy.content || "",
      challenge: caseStudy.challenge || "",
      solution: caseStudy.solution || "",
      results: caseStudy.results || "",
      clientName: caseStudy.clientName || "",
      industry: caseStudy.industry || "",
      projectTimeline: caseStudy.projectTimeline || "",
      teamSize: caseStudy.teamSize != null ? String(caseStudy.teamSize) : "",
      testimonial: caseStudy.testimonial || "",
      testimonialAuthor: caseStudy.testimonialAuthor || "",
      imageUrl: caseStudy.imageUrl || "",
      imageCredit: caseStudy.imageCredit || "",
      published: caseStudy.published ?? false,
      featured: caseStudy.featured ?? false,
      categoryName: caseStudy.category?.catName || caseStudy.catName || "",
      tagNames: caseStudy.tags?.map((tag) => tag.tagName) || [],
      projectId: caseStudy.projectId || "",
      keyMetrics: caseStudy.keyMetrics ?? null,
    });

    setTagsInput(caseStudy.tags?.map((tag) => tag.tagName).join(", ") || "");
    setKeyMetricsInput(stringifyKeyMetrics(caseStudy.keyMetrics));
  }, [caseStudy, form]);

  async function onSubmit(values: CaseStudyFormValues) {
    setIsLoading(true);

    try {
      const payload = {
        ...values,
        slug: values.slug?.trim() || undefined,
        excerpt: values.excerpt?.trim() || undefined,
        content: values.content?.trim() || undefined,
        challenge: values.challenge?.trim() || undefined,
        solution: values.solution?.trim() || undefined,
        results: values.results?.trim() || undefined,
        clientName: values.clientName?.trim() || undefined,
        industry: values.industry?.trim() || undefined,
        projectTimeline: values.projectTimeline?.trim() || undefined,
        teamSize: values.teamSize?.trim() || undefined,
        testimonial: values.testimonial?.trim() || undefined,
        testimonialAuthor: values.testimonialAuthor?.trim() || undefined,
        imageUrl: values.imageUrl?.trim() || undefined,
        imageCredit: values.imageCredit?.trim() || undefined,
        categoryName: values.categoryName?.trim() || undefined,
        projectId: values.projectId?.trim() || undefined,
        tagNames: parseTags(tagsInput),
        keyMetrics: parseKeyMetrics(keyMetricsInput),
      };

      if (isEdit && caseStudy) {
        await updateCaseStudy(caseStudy.id, payload);
        toast({
          title: "Case study updated",
          description: `${payload.title} was updated successfully.`,
        });
      } else {
        await createCaseStudy(payload);
        toast({
          title: "Case study created",
          description: `${payload.title} was created successfully.`,
        });
      }

      router.push("/admin/case-studies");
      router.refresh();
    } catch (error) {
      toast({
        title: isEdit
          ? "Failed to update case study"
          : "Failed to create case study",
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
          {isEdit ? "Edit case study" : "Create case study"}
        </h1>
        <p className="text-sm md:text-base text-gray-400">
          Fill in the case study information below.
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
                    <FormLabel className="text-sm text-purple-100">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="E.g. SaaS Platform Growth Case Study"
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
                        placeholder="saas-platform-growth-case-study"
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
                      <select
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        className="h-11 w-full rounded-md border border-gray-800 bg-gray-950 px-3 text-white outline-none focus:border-gray-700"
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.catName}>
                            {category.catName}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Related project
                    </FormLabel>
                    <FormControl>
                      <select
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        className="h-11 w-full rounded-md border border-gray-800 bg-gray-950 px-3 text-white outline-none focus:border-gray-700"
                      >
                        <option value="">No linked project</option>
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.title}
                          </option>
                        ))}
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
              <h2 className="text-lg font-semibold text-gray-50">
                Summary and content
              </h2>
            </div>

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-purple-100">
                    Excerpt
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={4}
                      placeholder="Short summary of the case study"
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-purple-100">
                    Full content
                  </FormLabel>
                  <FormControl>
                    <TiptapEditor
                      key={`${caseStudy?.id ?? "new-case-study"}-${(field.value || "").length}`}
                      content={field.value || ""}
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
              )}
            />
          </section>

          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">
                Case study details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Client name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Client name"
                        className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Industry
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="E.g. Fintech"
                        className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectTimeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Project timeline
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="E.g. 8 weeks"
                        className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Team size
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="E.g. 4 people"
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
              name="challenge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-purple-100">
                    Challenge
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={4}
                      placeholder="Describe the challenge"
                      className="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-purple-100">
                    Solution
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={4}
                      placeholder="Describe the solution"
                      className="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="results"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-purple-100">
                    Results
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={4}
                      placeholder="Describe the results"
                      className="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />
          </section>

          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">
                Tags, testimonial and metrics
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
                  placeholder="SEO, Conversion, Growth"
                  className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400">
                {form.formState.errors.tagNames?.message}
              </FormMessage>
            </FormItem>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="testimonialAuthor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Testimonial author
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Who gave the testimonial"
                        className="h-11 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

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
            </div>

            <FormField
              control={form.control}
              name="testimonial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-purple-100">
                    Testimonial
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={4}
                      placeholder="Client testimonial"
                      className="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="text-sm text-purple-100">
                Key metrics
              </FormLabel>
              <FormControl>
                <textarea
                  value={keyMetricsInput}
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    setKeyMetricsInput(rawValue);
                    form.setValue("keyMetrics", parseKeyMetrics(rawValue), {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  rows={5}
                  placeholder={`Revenue Growth: 142%\nConversion Increase: 38%\nBounce Rate Reduction: 24%`}
                  className="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-700"
                />
              </FormControl>
            </FormItem>
          </section>

          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">
                Image and publishing
              </h2>
            </div>

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-purple-100">
                    Image URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="https://..."
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
                alt="Case study cover"
                className="w-40 h-40 object-cover rounded-xl border border-gray-800"
              />
            ) : null}

            <CldUploadWidget
              uploadPreset="tosanxprofiles"
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
                  Upload image
                </AppButton>
              )}
            </CldUploadWidget>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
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
                      Published
                    </label>
                  </FormItem>
                )}
              />

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
                      Featured
                    </label>
                  </FormItem>
                )}
              />
            </div>
          </section>

          <AppButton
            type="submit"
            size="full"
            variant="glow"
            className="hover:cursor-pointer"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isEdit ? "Update case study" : "Create case study"}
          </AppButton>
        </form>
      </Form>
    </motion.div>
  );
}