import type { Project } from "@/components/projects/projects";
import ProjectsCarousel from "@/components/projects/ProjectsCarousel";

interface Props {
  projects: Project[];
}

export default function PortfolioSection({ projects }: Props) {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Selected Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Real products built for performance, growth, and modern user experience.
          </p>
        </div>

        {projects.length > 0 ? (
          <ProjectsCarousel projects={projects} />
        ) : (
          <div className="rounded-xl border border-white/10 bg-gray-950 px-6 py-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              Projects coming soon
            </h3>
            <p className="text-gray-400">
              No public projects are available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}