"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  PackageAddon,
  PackageCategory,
  PackageFeature,
  ServicePackage,
} from "@prisma/client";

import { createPackage, updatePackage } from "@/lib/actions/packages";
import {
  servicePackageSchema,
  ServicePackageFormValues,
} from "@/lib/validators/package";
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

interface ServicePackageWithRelations extends ServicePackage {
  category?: PackageCategory | null;
  features?: PackageFeature[];
  addons?: PackageAddon[];
}

interface Props {
  mode: "create" | "edit";
  packageItem?: ServicePackageWithRelations;
  categories?: PackageCategory[];
}

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

export default function PackageForm({
  mode,
  packageItem,
  categories = [],
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = mode === "edit";

  const [isLoading, setIsLoading] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const defaultValues = useMemo<ServicePackageFormValues>(
    () => ({
      name: packageItem?.name || "",
      slug: packageItem?.slug || "",
      shortDescription: packageItem?.shortDescription || "",
      description: packageItem?.description || "",
      longDescription: packageItem?.longDescription || "",

      startingPrice: packageItem?.startingPrice
        ? Number(packageItem.startingPrice)
        : null,
      currency: packageItem?.currency || "NGN",
      priceLabel: packageItem?.priceLabel || "Starting from",
      priceSuffix: packageItem?.priceSuffix || "/project",

      timeline: packageItem?.timeline || "",
      deliveryModel: packageItem?.deliveryModel || "",

      popular: packageItem?.popular ?? false,
      featured: packageItem?.featured ?? false,
      published: packageItem?.published ?? false,
      contactOnly: packageItem?.contactOnly ?? true,

      sortOrder: packageItem?.sortOrder ?? 0,

      ctaText: packageItem?.ctaText || "Contact Us",
      ctaHref: packageItem?.ctaHref || "",

      seoTitle: packageItem?.seoTitle || "",
      seoDescription: packageItem?.seoDescription || "",

      categoryName: packageItem?.category?.name || "",

      features:
        packageItem?.features?.map((feature, index) => ({
          label: feature.label || "",
          details: feature.details || "",
          included: feature.included ?? true,
          highlight: feature.highlight ?? false,
          sortOrder: feature.sortOrder ?? index,
        })) || [],

      addons:
        packageItem?.addons?.map((addon, index) => ({
          name: addon.name || "",
          description: addon.description || "",
          price: addon.price ? Number(addon.price) : null,
          priceLabel: addon.priceLabel || "",
          sortOrder: addon.sortOrder ?? index,
        })) || [],
    }),
    [packageItem]
  );

  const form = useForm<ServicePackageFormValues>({
    resolver: zodResolver(servicePackageSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!packageItem) return;
    form.reset(defaultValues);
  }, [packageItem, defaultValues, form]);

  const titleValue = form.watch("name");

  useEffect(() => {
    if (!slugManuallyEdited) {
      form.setValue("slug", generateSlug(titleValue || ""), {
        shouldValidate: true,
      });
    }
  }, [titleValue, slugManuallyEdited, form]);

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const {
    fields: addonFields,
    append: appendAddon,
    remove: removeAddon,
  } = useFieldArray({
    control: form.control,
    name: "addons",
  });

  async function onSubmit(values: ServicePackageFormValues) {
    setIsLoading(true);

    try {
      const payload = {
        ...values,
        slug: values.slug?.trim() || undefined,
        categoryName: values.categoryName?.trim() || undefined,
        shortDescription: values.shortDescription?.trim() || undefined,
        longDescription: values.longDescription?.trim() || undefined,
        timeline: values.timeline?.trim() || undefined,
        deliveryModel: values.deliveryModel?.trim() || undefined,
        ctaText: values.ctaText?.trim() || undefined,
        ctaHref: values.ctaHref?.trim() || undefined,
        seoTitle: values.seoTitle?.trim() || undefined,
        seoDescription: values.seoDescription?.trim() || undefined,
        priceLabel: values.priceLabel?.trim() || undefined,
        priceSuffix: values.priceSuffix?.trim() || undefined,
        currency: values.currency?.trim() || "NGN",
        features: values.features.map((feature, index) => ({
          ...feature,
          sortOrder: feature.sortOrder ?? index,
        })),
        addons: values.addons.map((addon, index) => ({
          ...addon,
          sortOrder: addon.sortOrder ?? index,
        })),
      };

      if (isEdit && packageItem) {
        await updatePackage(packageItem.id, payload);

        toast({
          title: "Package updated",
          description: `${payload.name} was updated successfully.`,
        });
      } else {
        await createPackage(payload);

        toast({
          title: "Package created",
          description: `${payload.name} was created successfully.`,
        });
      }

      router.push("/admin/packages");
      router.refresh();
    } catch (error) {
      toast({
        title: isEdit ? "Failed to update package" : "Failed to create package",
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
      className="mx-auto w-full max-w-5xl space-y-8 rounded-2xl border border-gray-800 bg-black p-6 shadow-sm shadow-gray-900 md:p-8 lg:p-10"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-purple-100 md:text-3xl">
          {isEdit ? "Edit package" : "Create package"}
        </h1>

        <p className="text-sm text-gray-400 md:text-base">
          Fill in the package information below.
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
                Add the core details for this package.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Package name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="E.g. Growth Website"
                        className="h-11 border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
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
                        placeholder="growth-website"
                        onChange={(e) => {
                          setSlugManuallyEdited(true);
                          field.onChange(e);
                        }}
                        className="h-11 border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <FormLabel className="text-sm text-purple-100">
                        Category
                      </FormLabel>

                      <Link
                        href="/admin/package-categories"
                        className="text-xs font-medium text-purple-300 transition hover:text-purple-200"
                      >
                        Manage categories
                      </Link>
                    </div>

                    <FormControl>
                      <div>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          list="package-categories"
                          placeholder="Select or type a category"
                          className="h-11 border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                        />

                        <datalist id="package-categories">
                          {categories.map((category) => (
                            <option key={category.id} value={category.name} />
                          ))}
                        </datalist>
                      </div>
                    </FormControl>

                    <p className="text-xs text-gray-500">
                      Choose from existing package categories or type a new one
                      to connect it on save.
                    </p>

                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sortOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Sort order
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={field.value ?? 0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-11 border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">Pricing</h2>
              <p className="text-sm text-gray-400">
                Set the package pricing and positioning.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="startingPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Starting price
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="450000"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                        className="h-11 border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Currency
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="NGN"
                        className="h-11 border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="priceLabel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Price label
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Starting from"
                        className="h-11 border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priceSuffix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Price suffix
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="/project"
                        className="h-11 border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Timeline
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="2 - 4 weeks"
                        className="h-11 border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Delivery model
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Fixed scope"
                        className="h-11 border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700/30"
                      />
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
                Description
              </h2>
              <p className="text-sm text-gray-400">
                Add a summary and full package content.
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
                      placeholder="Brief summary of the package"
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
                      Main description
                    </FormLabel>
                    <FormControl>
                      <TiptapEditor
                        key={`${packageItem?.id ?? "new-package"}-${editorContent.length}-desc`}
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

            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => {
                const editorContent = field.value || "";

                return (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      Long description
                    </FormLabel>
                    <FormControl>
                      <TiptapEditor
                        key={`${packageItem?.id ?? "new-package"}-${editorContent.length}-long`}
                        content={editorContent}
                        onChange={(value) =>
                          form.setValue("longDescription", value, {
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
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-50">Features</h2>
                <p className="text-sm text-gray-400">
                  Add package features shown on cards and detail pages.
                </p>
              </div>

              <AppButton
                type="button"
                variant="outline"
                onClick={() =>
                  appendFeature({
                    label: "",
                    details: "",
                    included: true,
                    highlight: false,
                    sortOrder: featureFields.length,
                  })
                }
                className="text-gray-300"
              >
                Add feature
              </AppButton>
            </div>

            <div className="space-y-4">
              {featureFields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-4 rounded-xl border border-gray-800 bg-gray-950 p-4"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`features.${index}.label`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-purple-100">
                            Label
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Responsive pages"
                              className="h-11 border-gray-800 bg-black text-white placeholder:text-gray-500"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`features.${index}.sortOrder`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-purple-100">
                            Sort order
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value ?? index}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              className="h-11 border-gray-800 bg-black text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`features.${index}.details`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-purple-100">
                          Details
                        </FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            value={field.value ?? ""}
                            rows={3}
                            placeholder="Explain this feature"
                            className="w-full rounded-md border border-gray-800 bg-black px-3 py-3 text-white placeholder:text-gray-500 outline-none"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-wrap items-center gap-6">
                    <FormField
                      control={form.control}
                      name={`features.${index}.included`}
                      render={({ field }) => (
                        <FormItem>
                          <label className="inline-flex items-center gap-3 text-sm text-gray-100">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="h-4 w-4 rounded border-gray-700 bg-gray-900"
                            />
                            Included
                          </label>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`features.${index}.highlight`}
                      render={({ field }) => (
                        <FormItem>
                          <label className="inline-flex items-center gap-3 text-sm text-gray-100">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="h-4 w-4 rounded border-gray-700 bg-gray-900"
                            />
                            Highlight feature
                          </label>
                        </FormItem>
                      )}
                    />
                  </div>

                  <AppButton
                    type="button"
                    variant="outline"
                    onClick={() => removeFeature(index)}
                    className="border-red-500/30 text-red-300"
                  >
                    Remove feature
                  </AppButton>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-50">Add-ons</h2>
                <p className="text-sm text-gray-400">
                  Add optional extras for this package.
                </p>
              </div>

              <AppButton
                type="button"
                variant="outline"
                onClick={() =>
                  appendAddon({
                    name: "",
                    description: "",
                    price: null,
                    priceLabel: "",
                    sortOrder: addonFields.length,
                  })
                }
                className="text-gray-300"
              >
                Add add-on
              </AppButton>
            </div>

            <div className="space-y-4">
              {addonFields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-4 rounded-xl border border-gray-800 bg-gray-950 p-4"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`addons.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-purple-100">
                            Add-on name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Monthly maintenance"
                              className="h-11 border-gray-800 bg-black text-white placeholder:text-gray-500"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`addons.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-purple-100">
                            Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value ? Number(e.target.value) : null
                                )
                              }
                              placeholder="150000"
                              className="h-11 border-gray-800 bg-black text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`addons.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-purple-100">
                          Description
                        </FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            value={field.value ?? ""}
                            rows={3}
                            placeholder="Describe this add-on"
                            className="w-full rounded-md border border-gray-800 bg-black px-3 py-3 text-white placeholder:text-gray-500 outline-none"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`addons.${index}.priceLabel`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-purple-100">
                            Price label
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? ""}
                              placeholder="Optional"
                              className="h-11 border-gray-800 bg-black text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`addons.${index}.sortOrder`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-purple-100">
                            Sort order
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value ?? index}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              className="h-11 border-gray-800 bg-black text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <AppButton
                    type="button"
                    variant="outline"
                    onClick={() => removeAddon(index)}
                    className="border-red-500/30 text-red-300"
                  >
                    Remove add-on
                  </AppButton>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-50">
                CTA and SEO
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="ctaText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      CTA text
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Contact Us"
                        className="h-11 border-gray-800 bg-gray-950 text-white"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ctaHref"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      CTA href
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="/contact?package=growth-website"
                        className="h-11 border-gray-800 bg-gray-950 text-white"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="seoTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      SEO title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Growth Website Package | Agency Name"
                        className="h-11 border-gray-800 bg-gray-950 text-white"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seoDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-purple-100">
                      SEO description
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="A premium website package for growing businesses."
                        className="h-11 border-gray-800 bg-gray-950 text-white"
                      />
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
                Package settings
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="popular"
                render={({ field }) => (
                  <FormItem>
                    <label className="inline-flex items-center gap-3 text-sm text-gray-100">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-700 bg-gray-900"
                      />
                      Mark as most popular
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
                      Mark as featured
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
                      Publish package
                    </label>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactOnly"
                render={({ field }) => (
                  <FormItem>
                    <label className="inline-flex items-center gap-3 text-sm text-gray-100">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-700 bg-gray-900"
                      />
                      Contact-only package
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
            {isEdit ? "Update package" : "Create package"}
          </AppButton>
        </form>
      </Form>
    </motion.div>
  );
}