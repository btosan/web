"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  Cpu,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ChevronRight
} from "lucide-react";

export default function ServicesPage() {
  const [open, setOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/2349123631219?text=Hi%21%20I%27m%20interested%20in%20building%20a%20custom%20website%20or%20web%20application%20and%20would%20like%20to%20discuss%20my%20project.",
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  const services = [
    {
      icon: Globe,
      eyebrow: "Performance, Visibility & Conversion",
      title: "Custom Websites",
      description:
        "Fast-loading, high-performance custom websites built to strengthen credibility, improve visibility, and turn visitors into qualified leads.",
      href: "/services/custom-websites",
    },
    {
      icon: Smartphone,
      eyebrow: "Platforms, APIs & Scalable Systems",
      title: "Full-Stack Apps",
      description:
        "Robust full-stack applications designed for modern businesses — from customer portals and dashboards to complete digital platforms.",
      href: "/services/full-stack-apps",
    },
    {
      icon: Sparkles,
      eyebrow: "Automation, Efficiency & Workflows",
      title: "AI Automation",
      description:
        "Intelligent systems that automate communication, lead handling, internal workflows, scheduling, and repetitive operational tasks.",
      href: "/services/ai-automation",
    },
    {
      icon: Cpu,
      eyebrow: "Smart Features & Product Intelligence",
      title: "AI Integration",
      description:
        "AI-powered product features such as chatbots, recommendations, predictive insights, and intelligent user experiences.",
      href: "/services/ai-integration",
    },
    {
      icon: ShieldCheck,
      eyebrow: "Usability, Trust & Experience Design",
      title: "UI/UX Design",
      description:
        "Conversion-focused interfaces and user experiences that improve usability, build trust, and create smoother customer journeys.",
      href: "/services/ui-ux-design",
    },
    {
      icon: TrendingUp,
      eyebrow: "Brand Positioning & Growth Systems",
      title: "Digital Branding & Marketing",
      description:
        "Strategy-driven branding, digital presence, and marketing systems designed to attract the right audience and drive measurable growth.",
      href: "/services/digital-branding-marketing",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-purple-100 md:text-xs">
              Services & Solutions
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-purple-100 text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Digital solutions built for growth
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-8 text-gray-300 sm:text-base md:text-lg lg:text-xl">
            We help businesses build modern websites, scalable applications,
            intelligent AI systems, polished user experiences, and growth-driven
            digital brands.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link
                  href={service.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-700/70 bg-linear-to-tl from-gray-900/20 via-gray-950 to-black p-8 shadow-sm shadow-gray-900/40 transition-all duration-300 hover:border-purple-300/30 hover:bg-purple-950/20 hover:shadow-lg hover:shadow-purple-950/30 md:p-9"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-purple-950/40">
                      <Icon className="h-7 w-7 text-purple-100" />
                    </div>

                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-purple-200/75">
                      {service.eyebrow}
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                      {service.title}
                    </h2>

                    <p className="mt-4 flex-1 leading-8 text-gray-400">
                      {service.description}
                    </p>

                    <div className="mt-8 inline-flex items-center gap-2 uppercase text-gray-300 transition group-hover:text-purple-200">
                      <span>Explore service</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative overflow-hidden rounded-3xl border border-gray-700/70 bg-linear-to-tl from-gray-800/40 via-gray-900/40 to-gray-950/40 p-8 text-center shadow-sm shadow-gray-900/40 md:p-10 lg:p-12">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-700/10 blur-3xl" />

            <p className="text-xs font-medium uppercase tracking-[0.22em] text-purple-100/80">
              Start Your Project
            </p>

            <h3 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Let’s build the right solution for your business
            </h3>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-purple-100 md:text-lg">
              Tell us what you need and we’ll help you choose the right path —
              whether it is a custom website, full-stack platform, AI solution,
              or growth-focused digital system.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-base font-semibold text-purple-900 transition-all duration-300 hover:translate-y-[-1px]"
            >
              Start Your Project
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-700 bg-gray-900 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-gray-400 transition hover:text-white"
              >
                ✕
              </button>

              <h3 className="mb-6 text-2xl font-bold text-purple-100">
                How would you like to continue?
              </h3>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="rounded-xl bg-green-500 py-4 font-semibold text-black transition-all hover:bg-green-400"
                >
                  Continue on WhatsApp
                </button>

                <a
                  href="/contact-form"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl border border-purple-100 py-4 text-center font-semibold text-purple-100 transition-all hover:bg-purple-100 hover:text-black"
                >
                  Use Email Form
                </a>

                <a
                  href="tel:+2349123631219"
                  className="group relative block overflow-hidden rounded-xl border border-purple-100 py-4 text-center font-semibold text-purple-100 transition-all hover:bg-purple-100 hover:text-black"
                >
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                    Call Us
                  </span>
                  <span className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-300 group-hover:translate-y-0">
                    +234 912 363 1219
                  </span>
                </a>

                <button
                  onClick={() => setOpen(false)}
                  className="mt-2 text-sm text-gray-400 hover:text-gray-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
          <Link
              href="/packages"
              className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
            >
              {/* subtle top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
      
              {/* glow effect */}
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />
      
              <span className="relative z-10 flex items-center gap-2">
                See Our Packages
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7" />
              </span>
            </Link>
    </section>
  );
}