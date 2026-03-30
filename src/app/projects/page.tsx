
import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { authOptions } from "@/lib/auth";

import { getPublicProjects } from "@/lib/actions/projects";
import { toProjectCard } from "@/components/projects/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default async function ProjectsPage() {

  const dbProjects = await getPublicProjects();

  const projects = dbProjects
    .filter((project) => !!project.slug)
    .map(toProjectCard);

  return (
    <main className="min-h-screen bg-black">
      <section className="px-6 py-14 md:px-12 lg:px-16 xl:px-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-purple-100 leading-tight">
              Projects
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-400">
              A selection of real projects built with modern tools, scalable
              architecture, and polished user experience.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-gray-950 px-6 py-14 text-center">
              <h2 className="text-xl font-semibold text-white">
                No projects available yet
              </h2>
              <p className="mt-2 text-gray-400">
                Public projects will appear here once they are added.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}