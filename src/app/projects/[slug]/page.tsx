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

  // If your action/schema later includes a dedicated technologies field/relation,
  // add it here. For now this safely supports common shapes without breaking UI.
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

  // 1. Category
  if (project.category?.catName) {
    specs.push({
      label: "Category",
      value: project.category.catName,
    });
  }

  // 2. Type
  if (project.type) {
    specs.push({
      label: "Type",
      value: project.type.replace(/_/g, " "),
    });
  }

  // 3. Tags count
  const features = buildFeatures(project);
  if (features.length) {
    specs.push({
      label: "Tags",
      value: `${features.length}`,
    });
  }

  // 4. Date (always safe)
  if (project.createdAt) {
    specs.push({
      label: "Year",
      value: new Date(project.createdAt).getFullYear().toString(),
    });
  }

  // 5. Fallback: has live project
  if (specs.length < 4 && project.projectUrl) {
    specs.push({
      label: "Live",
      value: "Available",
    });
  }

  // 6. Fallback: images count
  if (specs.length < 4 && project.imageUrls?.length) {
    specs.push({
      label: "Gallery",
      value: `${project.imageUrls.length}`,
    });
  }

  // 7. Final fallback (guarantee 4)
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

  const relatedDb = await getRelatedProjects(
    project.id,
    project.categoryId
  );

const relatedProjects = relatedDb
  .filter((p) => !!p.slug)
  .map(toProjectCard);

  if (!project || !project.slug) {
    return notFound();
  }

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
    <main className="min-h-screen bg-white flex flex-col">
      <section className="relative w-full bg-linear-to-tr from-gray-100 via-white to-gray-50 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center py-10 md:py-20 px-4 md:px-10 gap-12 md:gap-16">
          <div className="flex-1 flex flex-col items-center justify-center lg:-mt-12">
            <h1 className="text-xl md:text-2xl lg:text-4xl uppercase font-bold text-black mb-6 pt-6 text-center">
              {project.title}
            </h1>

            <div className="relative w-85 h-50 md:w-120 md:h-75 lg:w-140 lg:h-90 rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-200">
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
            <span className="inline-block uppercase tracking-wider text-sm font-bold text-gray-500 mb-1">
              Overview
            </span>

            <p className="text-gray-700 text-lg md:text-xl mb-4 max-w-xl">
              {project.shortDescription || "A modern digital product built for performance and scale."}
            </p>

            {specs.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 max-w-lg">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-2 flex flex-col items-center"
                  >
                    <span className="text-xs text-gray-500">{spec.label}</span>
                    <span className="font-semibold text-black text-sm text-center">
                      {spec.value} 
                    </span>
                    
                  </div>
                ))}
              </div>
            )}

            <div className="w-full mx-auto flex flex-col items-center justify-center sm:flex-row gap-4 flex-wrap">
              <Link
                href={`/?type=project&slug=${project.slug}#enquiry`}
                className="inline-block px-8 py-3 font-bold hover:text-white text-black bg-transparent border-2 border-gray-800/70 hover:bg-black hover:border-black transition-all text-lg uppercase tracking-wide"
              >
                Enquire Now
              </Link>

              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 font-bold text-white  bg-purple-800 hover:bg-purple-700 border-2 border-purple-800 hover:border-purple-700  transition-all text-lg uppercase tracking-wide"
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
        <section className="w-full bg-white py-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
              Description
            </h2>

            <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
              <RichTextDisplay content={project.description} />
            </div>
          </div>
        </section>
      )}

      {gallery.length > 1 && (
        <section className="w-full bg-gray-50 py-10">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold text-black mb-6 text-center">
              Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img, i) => (
                <div
                  key={`${img}-${i}`}
                  className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm"
                >
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
        <section className="w-full bg-white py-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
              Tags
            </h2>

            <ul className="grid gap-4 md:grid-cols-2">
              {features.map((feat, i) => (
                <li
                  key={`${feat}-${i}`}
                  className="flex items-start gap-3 bg-gray-50 rounded-lg border border-gray-200 p-4"
                >
                  <span className="inline-block mt-1 h-3 w-3 rounded-full bg-purple-600 shrink-0"></span>
                  <span className="text-gray-800 text-base">{feat}</span>
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

      <section className="py-12 sm:py-16 bg-black border-t border-b border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your Project
          </h2>
          <div>
            <Link
              href={`/?type=project&slug=${project.slug}#enquiry`}
              className="inline-block px-6 sm:px-8 py-3 font-bold text-white bg-purple-600 hover:bg-purple-500 border-2 border-purple-600 hover:border-purple-500 transition-all text-base sm:text-lg uppercase tracking-wide"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}