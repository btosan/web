import Link from "next/link";
import ProjectsCarousel from "./ProjectsCarousel";
import { getFeaturedPublicProjects } from "@/lib/actions/projects";
import { toProjectCard } from "./projects";

export default async function ProjectsSection() {
  const dbProjects = await getFeaturedPublicProjects();
  const projects = dbProjects
    .filter((project) => !!project.slug)
    .map(toProjectCard);

  if (!projects.length) {
    return null;
  }

  return (
    <section className="py-12 px-6 md:px-16 lg:px-12 xl:px-16 2xl:px-20 bg-black">
      <h2 className="flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-semibold text-purple-100 mb-9 lg:mb-12 leading-tight">
        Featured Projects
      </h2>

      <ProjectsCarousel projects={projects} />

      <div className="w-full mx-auto flex items-center justify-center pt-4 md:pt-8">
        <Link
          href="/projects"
          className="uppercase hover:underline hover:underline-offset-8 hover:text-purple-300"
        >
          See all projects
        </Link>
      </div>
    </section>
  );
}