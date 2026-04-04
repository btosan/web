import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { toProjectCard } from "@/components/projects/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectHighlightCarousel from "@/components/ProjectHighlightCarousel";
import RichTextDisplay from "@/components/editorOld/RichTextDisplay";
import { getPublicProjectBySlug } from "@/lib/actions/projects";
import { getRelatedProjects } from "@/lib/actions/projects";

function buildGallery(project: Awaited<ReturnType<typeof getPublicProjectBySlug>>) {
  if (!project) return [];

  const images = [project.imageUrl, ...(project.imageUrls || [])].filter(
    Boolean
  ) as string[];

  return [...new Set(images)];
}

function buildHighlights(
  project: NonNullable<Awaited<ReturnType<typeof getPublicProjectBySlug>>>
) {
  const gallery = buildGallery(project);

  return gallery.map((img, index) => ({
    id: `${project.id}-highlight-${index}`,
    type: "image" as const,
    url: img,
    alt: `${project.title} highlight ${index + 1}`,
    title: `${project.title} ${index + 1}`,
    description: `${project.title} project highlight ${index + 1}`,
  }));
}

function buildFeatures(
  project: Awaited<ReturnType<typeof getPublicProjectBySlug>>
) {
  if (!project) return [];

  const tags = project.tags?.map((tag) => tag.tagName).filter(Boolean) || [];

  const technologies =
    Array.isArray((project as any).technologies)
      ? (project as any).technologies
          .map((tech: any) =>
            typeof tech === "string"
              ? tech
              : tech?.name || tech?.title || tech?.techName
          )
          .filter(Boolean)
      : Array.isArray((project as any).techStack)
        ? (project as any).techStack.filter(Boolean)
        : [];

  return [...new Set([...tags, ...technologies])];
}

function buildSpecs(project: Awaited<ReturnType<typeof getPublicProjectBySlug>>) {
  if (!project) return [];

  const specs = [];

  if (project.category?.catName) {
    specs.push({
      label: "Category",
      value: project.category.catName,
    });
  }

  if (project.type) {
    specs.push({
      label: "Type",
      value: project.type.replace(/_/g, " "),
    });
  }

  const features = buildFeatures(project);
  if (features.length) {
    specs.push({
      label: "Tags",
      value: `${features.length}`,
    });
  }

  if (project.createdAt) {
    specs.push({
      label: "Year",
      value: new Date(project.createdAt).getFullYear().toString(),
    });
  }

  if (specs.length < 4 && project.projectUrl) {
    specs.push({
      label: "Live",
      value: "Available",
    });
  }

  if (specs.length < 4 && project.imageUrls?.length) {
    specs.push({
      label: "Gallery",
      value: `${project.imageUrls.length}`,
    });
  }

  while (specs.length < 4) {
    specs.push({
      label: "Status",
      value: "Completed",
    });
  }

  return specs.slice(0, 4);
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, session] = await Promise.all([
    getPublicProjectBySlug(slug),
    getServerSession(authOptions),
  ]);

  if (!project || !project.slug) {
    return notFound();
  }

  const relatedDb = await getRelatedProjects(
    project.id,
    project.catName
  );

  const relatedProjects = relatedDb
    .filter((p) => !!p.slug)
    .map(toProjectCard);

  const gallery = buildGallery(project);
  const highlights = buildHighlights(project);
  const features = buildFeatures(project);
  const specs = buildSpecs(project);

  const heroImage = gallery[0] || "/placeholder.png";
  const tagline =
    project.category?.catName ||
    project.type?.toLowerCase().replace(/_/g, " ") ||
    "Digital Product";

  const isAdmin = session?.user?.role === Role.ADMIN;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <section className="relative w-full overflow-hidden border-b border-gray-800 bg-linear-to-br from-gray-950 via-black to-gray-950">
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/50 to-black pointer-events-none" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-purple-700/10 blur-3xl pointer-events-none" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-700/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center py-12 md:py-20 px-4 md:px-10 gap-12 md:gap-16">
          <div className="flex-1 flex flex-col items-center justify-center lg:-mt-8">
            <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="text-[11px] md:text-xs font-medium uppercase tracking-[0.22em] text-purple-100/80">
                {tagline}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold text-white mb-6 pt-2 text-center tracking-tight">
              {project.title}
            </h1>

            <div className="relative w-85 h-50 md:w-120 md:h-75 lg:w-140 lg:h-90 rounded-3xl overflow-hidden border border-gray-700/60 bg-gray-900/40 shadow-2xl shadow-black/40 backdrop-blur-sm">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent z-10" />
              <Image
                src={heroImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 600px"
                priority
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6 justify-center lg:pt-8">
            <span className="inline-block uppercase tracking-[0.22em] text-xs md:text-sm font-bold text-purple-200/70 mb-1">
              Overview
            </span>

            <p className="text-gray-300 text-lg md:text-xl leading-8 mb-2 max-w-xl">
              {project.shortDescription ||
                "A modern digital product built for performance and scale."}
            </p>

            {specs.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4 max-w-2xl">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="group relative rounded-2xl border border-gray-700/60 bg-gray-900/40 px-4 py-4 flex flex-col items-center backdrop-blur-sm shadow-lg shadow-black/20"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-gray-400 text-center">
                      {spec.label}
                    </span>
                    <span className="mt-2 font-semibold text-white text-sm md:text-base text-center">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="w-full mx-auto flex flex-col items-center justify-center sm:flex-row gap-4 flex-wrap">
              <Link
                href={`/?type=project&slug=${project.slug}#enquiry`}
                className="inline-block px-8 py-3 font-bold text-white bg-transparent border-2 border-gray-600 hover:bg-white hover:text-black hover:border-white transition-all text-lg uppercase tracking-wide"
              >
                Enquire Now
              </Link>

              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 font-bold text-white bg-purple-800 hover:bg-purple-700 border-2 border-purple-800 hover:border-purple-700 transition-all text-lg uppercase tracking-wide shadow-lg shadow-purple-900/20"
                >
                  Visit Project
                </a>
              ) : (
                <a
                  href={`https://wa.me/2348038168949?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(project.title)}%20project`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 rounded-full font-bold text-white bg-green-600 hover:bg-green-700 shadow border-2 border-green-700 transition-all text-lg uppercase tracking-wide"
                >
                  WhatsApp Sales
                </a>
              )}

              {isAdmin && (
                <Link
                  href={`/projects/${project.slug}/edit`}
                  className="inline-block px-8 py-3 rounded-full font-bold text-white bg-green-700 hover:bg-green-800 shadow border-2 border-green-800 transition-all text-lg uppercase tracking-wide"
                >
                  Edit Project
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {highlights.length > 0 && (
        <ProjectHighlightCarousel highlights={highlights} />
      )}

      {project.description && (
        <section className="w-full bg-black py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 text-center">
              Project Description
            </h2>

            <div className="relative rounded-3xl border border-gray-700/60 bg-gray-950/70 p-5 md:p-8 shadow-2xl shadow-black/30 backdrop-blur-sm">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-purple-700/10 blur-3xl pointer-events-none" />
              <div className="relative text-gray-300 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white [&_p]:text-gray-300 [&_li]:text-gray-300 [&_strong]:text-white [&_a]:text-purple-300 [&_blockquote]:border-l-purple-700 [&_blockquote]:text-gray-300">
                <RichTextDisplay content={project.description} />
              </div>
            </div>
          </div>
        </section>
      )}

      {gallery.length > 1 && (
        <section className="w-full bg-gray-950 py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold text-white mb-8 text-center">
              Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img, i) => (
                <div
                  key={`${img}-${i}`}
                  className="group relative aspect-video rounded-2xl overflow-hidden border border-gray-700/60 bg-gray-900/40 shadow-lg shadow-black/30"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent z-10" />
                  <Image
                    src={img}
                    alt={`${project.title} photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover hover:object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {features.length > 0 && (
        <section className="w-full bg-black py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              Tags
            </h2>

            <ul className="grid gap-4 md:grid-cols-2">
              {features.map((feat, i) => (
                <li
                  key={`${feat}-${i}`}
                  className="relative flex items-start gap-3 rounded-2xl border border-gray-700/60 bg-gray-900/40 p-4 shadow-lg shadow-black/20 backdrop-blur-sm"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                  <span className="inline-block mt-1 h-3 w-3 rounded-full bg-purple-700 shrink-0"></span>
                  <span className="text-gray-300 text-base">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {relatedProjects.length > 0 && (
        <section className="w-full bg-black py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-100 mb-8 text-center">
              Related Projects
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative py-12 sm:py-16 bg-gray-950 border-t border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your Project
          </h2>
          <div>
            <Link
              href={`/?type=project&slug=${project.slug}#enquiry`}
              className="inline-block px-6 sm:px-8 py-3 font-bold text-white bg-purple-800 hover:bg-purple-700 border-2 border-purple-800 hover:border-purple-700 transition-all text-base sm:text-lg uppercase tracking-wide shadow-lg shadow-purple-900/20"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}