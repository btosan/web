"use client";

import { useState } from "react";
import Link from 'next/link';
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

type FAQItem = {
  q: string;
  a: string;
};

const faqs: FAQItem[] = [
  {
    q: "How much does a project usually cost?",
    a: "Pricing depends on the scope, features, and complexity of the project. After understanding your requirements, we provide a clear quote with defined deliverables, timelines, and cost breakdown so you know exactly what to expect before work begins.",
  },
  {
    q: "Do you require upfront payment before starting?",
    a: "Yes. We usually begin with an initial deposit before work starts. This secures your project slot, covers the planning phase, and allows us to begin strategy, design, or development with proper focus.",
  },
  {
    q: "Can I pay in installments?",
    a: "Yes. Most projects are structured in 2 or 3 installments depending on the size and duration of the work. A common structure is an initial deposit, a second payment at a key milestone, and the final balance before launch or delivery.",
  },
  {
    q: "Do you offer flexible payment plans for larger projects?",
    a: "For larger builds, we can structure milestone-based payments that align with the project phases. This keeps the process transparent and manageable while ensuring progress stays clear for both sides.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines vary depending on what is being built. A focused website may take a few weeks, while a larger platform, AI system, or multi-phase product may take longer. Before starting, we provide a realistic timeline and keep you updated throughout the project.",
  },
  {
    q: "Do you build mobile apps too, or only websites?",
    a: "Yes, we also build mobile-focused solutions. Depending on your goals, this may include responsive web apps, progressive web apps, or full mobile app experiences. We help you choose the most practical option based on your product, users, and budget.",
  },
  {
    q: "Can you build both the website and the backend system for my business?",
    a: "Yes. We build complete solutions, including frontends, backends, dashboards, APIs, integrations, and admin systems. If your project needs more than a marketing website, we can design and develop the full digital product.",
  },
  {
    q: "Can you redesign or improve an existing website or app?",
    a: "Yes. We can improve existing products through redesign, performance optimization, feature upgrades, UX improvements, or a full rebuild if the current system is limiting growth.",
  },
  {
    q: "Will my website or app work properly on mobile devices?",
    a: "Yes. Everything we build is designed to work well across modern screen sizes, including desktop, tablet, and mobile. Responsive usability is part of the process, not an afterthought.",
  },
  {
    q: "Do you provide content, branding, or copywriting too?",
    a: "We can guide messaging, structure, and content direction as part of the project. For some projects, we also support branding, content refinement, and strategic copy so the final product feels more complete and conversion-focused.",
  },
  {
    q: "Can you help with AI features like chatbots, automations, or smart recommendations?",
    a: "Yes. We build AI-powered solutions such as chatbots, workflow automations, recommendation systems, intelligent dashboards, and other custom AI integrations based on your business needs.",
  },
  {
    q: "Do you handle domain, hosting, deployment, and launch?",
    a: "Yes. We can help with the technical side of launch, including deployment, hosting guidance, domain connection, and production setup so the final handoff is smooth and professional.",
  },
  {
    q: "Will I be able to manage the website or platform after launch?",
    a: "Yes. We aim to build solutions that are practical to manage. Depending on the project, we can also provide guidance, documentation, or admin tools so you can update and manage important parts confidently.",
  },
  {
    q: "Do you offer support after the project is completed?",
    a: "Yes. We can continue supporting your product after launch with updates, improvements, maintenance, and additional development as your business grows.",
  },
  {
    q: "What do you need from me before we begin?",
    a: "We usually need a clear idea of your goals, what you want to build, your timeline, and any references or requirements you already have. From there, we refine the scope, recommend the best approach, and move into planning.",
  },
  {
    q: "How do we get started?",
    a: "The process usually starts with a conversation about your project, goals, and priorities. Once the scope is clear, we prepare the proposal, agree on milestones, and begin with the first payment and kickoff phase.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-black py-20 text-white md:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-purple-100 md:text-xs">
              FAQs
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-purple-100 md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
            Clear answers to the questions clients usually ask before starting a
            website, app, AI, design, or digital growth project.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.q}
                className="group relative overflow-hidden rounded-3xl border border-gray-700/70 bg-linear-to-tl from-gray-900/20 via-gray-950 to-black shadow-sm shadow-gray-900/40 transition-all duration-300 hover:border-purple-300/30 hover:shadow-lg hover:shadow-purple-950/20"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="relative z-10 flex w-full items-start justify-between gap-4 px-6 py-5 text-left md:px-7 md:py-6"
                  aria-expanded={isOpen}
                >
                  <span className="pr-2 text-base font-semibold leading-7 text-white md:text-lg">
                    {item.q}
                  </span>

                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <ChevronDown
                      className={`h-5 w-5 text-purple-100 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="relative z-10 border-t border-white/10 px-6 pb-6 pt-4 md:px-7 md:pb-7">
                        <p className="max-w-4xl text-sm leading-8 text-gray-300 md:text-base">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-8 md:mt-16 lg:mt-24">
        <Link
          href="/services"
          className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
        >
          {/* subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          {/* glow effect */}
          <div className="absolute right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

          <span className="relative z-10 flex items-center gap-2">
            See Services & Solutions
            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7" />
          </span>
        </Link>
      
        <Link
          href="/packages"
          className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
        >
          {/* subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          {/* glow effect */}
          <div className="absolute right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

          <span className="relative z-10 flex items-center gap-2">
            See Our Packages
            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7" />
          </span>
        </Link> 
      <Link
        href="/contact"
        className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
      >
        {/* subtle top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        {/* glow effect */}
        <div className="absolute right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

        <span className="relative z-10 flex items-center gap-2">
          Contact Us
          <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7" />
        </span>
      </Link>
      </div>
    </section>
  );
}