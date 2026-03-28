"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  Sparkles,
  Cpu,
  LucideIcon,
} from "lucide-react";



/* ---------------- TYPES ---------------- */
type Solution = {
  icon: LucideIcon;
  name: string;
  title: string;
  description: string;
  cta: string;
};

/* ---------------- FEATURED SOLUTION ---------------- */
const featuredSolution = {
  icon: Smartphone,
  name: "Main Solution",
  title: "Full-Stack Applications",
  description:
    "We architect robust, high-performance applications that power real business operations — from customer-facing platforms to internal systems, dashboards, portals, and intelligent digital products built for scale across web and device-based experiences.",
  cta: "Start Your Project",
};

/* ---------------- DATA ---------------- */
const solutions: Solution[] = [
  {
    icon: Globe,
    name: "High-Performance & Search-Optimized",
    title: "Professional Websites",
    description:
      "Custom-built websites designed for speed, SEO visibility, and seamless user experience — turning your online presence into a powerful business asset.",
    cta: "Get Started",
  },
  {
    icon: Cpu,
    name: "Smart Features & Intelligence",
    title: "AI Integration",
    description:
      "We embed AI into your products and platforms — chatbots, recommendation systems, data insights, and intelligent user experiences.",
    cta: "Get Started",
  },
  {
    icon: Sparkles,
    name: "Systems That Work Automatically",
    title: "AI Automation",
    description:
      "Automate lead management, customer communication, data processing, and internal workflows with intelligent, time-saving systems.",
    cta: "Get Started",
  },
  {
    icon: ShieldCheck,
    name: "Intuitive, Conversion-Focused Experiences",
    title: "UI/UX Design",
    description:
      "Exceptional interface and user experience design that improves usability, builds trust, and turns visitors into engaged customers.",
    cta: "Get Started",
  },
  {
    icon: TrendingUp,
    name: "Visibility, Positioning & Growth",
    title: "Digital Strategy",
    description:
      "Strategic branding, digital presence, and performance-driven marketing systems that attract the right audience and drive measurable business growth.",
    cta: "Get Started",
  },
  {
    icon: Smartphone,
    name: "iOS & Android Applications",
    title: "Mobile App Development",
    description:
      "High-performance mobile applications designed for seamless user experiences across iOS and Android — built to scale, engage users, and extend your digital product beyond the web.",
    cta: "Get Started",
  },
];

/* ---------------- COMPONENT ---------------- */
export default function ServicesSection() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef(null);

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/2349123631219?text=Hi%21%20I%27m%20interested%20in%20building%20a%20custom%20website%20or%20web%20application%20and%20would%20like%20to%20discuss%20my%20project.",
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-gray-100 py-24 md:py-28 lg:py-32 border-t border-gray-700/20 overflow-hidden"
    >
      <div className="absolute lg:top-0 top-2 left-[-10%] z-2 h-36 w-36 lg:h-72 lg:w-72 rounded-full bg-purple-600/30 lg:bg-purple-700/40 blur-2xl lg:blur-3xl " />
      <div className="absolute bottom-0 right-[-8%] z-2 lg:h-70 h-36 w-36 lg:w-70 rounded-full bg-indigo-600/80 lg:bg-indigo-700/60 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* ===== HEADER ===== */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <p className="text-sm uppercase tracking-[0.25em] text-gray-500 mb-4">
            Solutions
          </p>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-purple-300 mb-6 leading-tight">
            Our Services
          </h2>

          <div className="w-16 h-px bg-gray-700 mx-auto mb-6" />

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            We design and build high-performance digital solutions powered by
            modern engineering, AI capabilities, and exceptional user
            experience.
          </p>
        </div>

        {/* ===== FEATURED SERVICE ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-12"
        >
          <div className="group relative overflow-hidden rounded-3xl border border-purple-300/20 bg-linear-to-br from-purple-900/20 via-black to-black p-8 md:p-12 lg:p-14 transition-all duration-500 hover:border-purple-200/40">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-transparent to-transparent opacity-60 pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="mb-6 w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-300/20">
                  {React.createElement(featuredSolution.icon, {
                    className: "w-8 h-8 text-purple-100",
                  })}
                </div>

                <p className="text-sm uppercase tracking-[0.22em] text-gray-400 mb-3">
                  {featuredSolution.name}
                </p>

                <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-purple-100 mb-6 leading-tight">
                  {featuredSolution.title}
                </h3>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl">
                  {featuredSolution.description}
                </p>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center px-8 md:px-10 py-4 rounded-md font-semibold text-sm md:text-base text-white bg-linear-to-br from-purple-700 to-indigo-700 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-xl hover:cursor-pointer"
                >
                  {featuredSolution.cta}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== GRID ===== */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-10">
          {solutions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card solution={s} setOpen={setOpen} />
            </motion.div>
          ))}
        </div>

        {/* ===== CLOSING CTA ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-24 text-center max-w-3xl mx-auto"
        >
          <p className="text-gray-400 text-lg mb-4">
            Not sure which solution is right for your business?
          </p>

          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-100 mb-6 leading-tight">
            Let’s discuss your goals and map out the right digital solution.
          </h3>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8">
            Whether you need a high-performance website, a full-stack platform,
            AI integration, or a broader digital strategy, we can help define
            the most effective path forward.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center px-10 py-4 bg-linear-to-br from-purple-700 to-indigo-700 text-white font-semibold rounded-md hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-xl hover:cursor-pointer"
          >
            Book a Consultation
          </button>
        </motion.div>
      </div>

      {/* ===== MODAL ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-gray-900 rounded-3xl p-6 md:p-8 w-full max-w-2xl border border-gray-700 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                aria-label="Close modal"
              >
                ✕
              </button>

              <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                Get Started
              </p>

              <h3 className="text-2xl md:text-3xl font-semibold text-purple-100 mb-4">
                How would you like to continue?
              </h3>

              <p className="text-gray-400 mb-8 text-base leading-relaxed">
                Choose your preferred method to begin your project discussion.
                Start a quick conversation on WhatsApp or send a more detailed
                brief through our contact form.
              </p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="bg-green-500 hover:bg-green-400 text-black font-semibold py-5 rounded-2xl transition"
                >
                  Continue on WhatsApp
                </button>

                <a
                  href="/contact-form"
                  className="border border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-black font-semibold py-5 rounded-2xl text-center transition"
                >
                  Use Email Form
                </a>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 text-sm hover:text-gray-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ===== CARD ===== */
function Card({
  solution,
  setOpen,
}: {
  solution: Solution;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="group relative h-full flex flex-col justify-between rounded-3xl border border-gray-800 bg-gray-950/60 p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:border-purple-100/40 hover:bg-gray-950/80">
      {/* glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition rounded-3xl bg-linear-to-br from-purple-500/5 via-transparent to-transparent pointer-events-none" />

      {/* icon */}
      <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-xl bg-purple-500/10 border border-purple-400/20 transition-transform duration-300 group-hover:scale-110">
        {React.createElement(solution.icon, {
          className: "w-7 h-7 text-purple-100",
        })}
      </div>

      {/* content */}
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
          {solution.name}
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-purple-100 mb-4">
          {solution.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed">
          {solution.description}
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={() => setOpen(true)}
        className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-xs font-semibold text-sm md:text-base hover:text-purple-50 text-white bg-linear-to-bl hover:bg-linear-to-br hover:border-0 hover:border-purple-100/80 from-purple-900 via-purple-600 to-indigo-700 transition-all duration-300 w-fit hover:cursor-pointer"
      >
        {solution.cta}
      </button>
    </div>
  );
}