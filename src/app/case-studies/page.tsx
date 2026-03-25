import Link from "next/link";
import { getPublicCaseStudies } from "@/lib/actions/caseStudies";

export default async function CaseStudiesPage() {
  const caseStudies = await getPublicCaseStudies();

  return (
    <main className="min-h-screen bg-black px-6 py-14 md:px-12 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-purple-100">
            Case Studies
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Real-world results, strategies, and solutions delivered across industries.
          </p>
        </div>

        {caseStudies.length === 0 ? (
          <div className="text-center text-gray-400">
            No case studies available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {caseStudies.map((cs) => (
              <Link
                key={cs.id}
                href={`/case-studies/${cs.slug}`}
                className="group rounded-xl overflow-hidden border border-gray-800 bg-gray-950 hover:border-purple-500 transition"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={cs.imageUrl || "/placeholder.png"}
                    alt={cs.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-white">
                    {cs.title}
                  </h3>

                  <p className="text-sm text-gray-400 line-clamp-3">
                    {cs.excerpt}
                  </p>

                  <div className="text-xs text-purple-300">
                    {cs.category?.catName}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}