import React from "react";

export default function OurProcess() {
  const processSteps = [
    {
      step: "01",
      title: "Strategy",
      desc: "Research, planning, and product direction aligned with your business goals and growth priorities.",
    },
    {
      step: "02",
      title: "Design",
      desc: "UI/UX crafted for clarity, usability, trust, and stronger conversion across every touchpoint.",
    },
    {
      step: "03",
      title: "Development",
      desc: "Modern, scalable implementation built for performance, maintainability, and long-term reliability.",
    },
    {
      step: "04",
      title: "Launch & Scale",
      desc: "Deployment, optimization, iteration, and ongoing support designed to help your product grow.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-20 text-white md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-purple-100 md:text-xs">
              Our Process
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-purple-100 md:text-4xl lg:text-5xl">
            How We Build High-Impact Digital Products
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
            Every project follows a proven framework that combines strategy,
            design, and engineering to deliver scalable digital solutions.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="group relative overflow-hidden rounded-3xl border border-gray-700/70 bg-linear-to-tl from-gray-900/20 via-gray-950 to-black p-8 shadow-sm shadow-gray-900/40 transition-all duration-300 hover:border-purple-300/30 hover:bg-purple-950/20 hover:shadow-lg hover:shadow-purple-950/20"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-6 text-4xl font-bold tracking-tight text-purple-100/60 md:text-5xl">
                  {item.step}
                </div>

                <h3 className="mb-3 text-2xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>

                <p className="text-base leading-8 text-gray-300">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}