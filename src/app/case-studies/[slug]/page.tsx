import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { getPublicCaseStudyBySlug } from "@/lib/actions/caseStudies";
import RichTextDisplay from "@/components/editorOld/RichTextDisplay";

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const caseStudy = await getPublicCaseStudyBySlug(slug);

  if (!caseStudy) return notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* HERO label="Team"*/}
      <section className="py-12 px-4 md:px-10 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
          {caseStudy.title}
        </h1>

        <p className="text-gray-600 mb-6 max-w-2xl">
          {caseStudy.excerpt}
        </p>

        <div className="relative w-full h-87.5 rounded-xl overflow-hidden border border-gray-200">
          <Image
            src={caseStudy.imageUrl || "/placeholder.png"}
            alt={caseStudy.title}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* META */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {caseStudy.clientName && (
          <Spec label="Client" value={caseStudy.clientName} />
        )}
        {caseStudy.industry && (
          <Spec label="Industry" value={caseStudy.industry} />
        )}
        {caseStudy.projectTimeline && (
          <Spec label="Timeline" value={caseStudy.projectTimeline} />
        )}
        {caseStudy.teamSize && (
          <Spec label="Team" value={caseStudy.teamSize.toString()} />
        )}
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-4 md:px-10 py-10 space-y-10">
        {caseStudy.challenge && (
          <Section title="Challenge" content={caseStudy.challenge} />
        )}

        {caseStudy.solution && (
          <Section title="Solution" content={caseStudy.solution} />
        )}

        {caseStudy.results && (
          <Section title="Results" content={caseStudy.results} />
        )}

        {caseStudy.content && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <RichTextDisplay content={caseStudy.content} />
          </div>
        )}

        {caseStudy.testimonial && (
          <blockquote className="border-l-4 border-purple-500 pl-4 text-gray-700 italic">
            “{caseStudy.testimonial}”
            {caseStudy.testimonialAuthor && (
              <span className="block mt-2 text-sm text-gray-500">
                — {caseStudy.testimonialAuthor}
              </span>
            )}
          </blockquote>
        )}

        {caseStudy.project && (
          <div className="mt-10">
            <Link
              href={`/projects/${caseStudy.project.slug}`}
              className="text-purple-600 font-semibold hover:underline"
            >
              View Related Project →
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-semibold text-black">{value}</div>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
}