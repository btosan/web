"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="bg-black text-white min-h-screen py-10 md:py-12 lg:py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* === Hero / Header === */}
        <div className="mb-24 md:mb-32">
          <div className="max-w-4xl mx-auto text-start md:text-center">
            <p className="text-sm md:text-base uppercase tracking-[0.25em] text-gray-500 mb-4">
              About Ofashi
            </p>

            <h1 className="text-3xl md:text-5xl lg:text-6xl text-gray-300 font-medium uppercase mb-6 tracking-wide leading-tight">
              About Us
            </h1>

            <div className="w-20 h-px bg-gray-700 mx-0 md:mx-auto mb-8" />

            <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Pioneering bespoke web and mobile application development, as well
              as AI-driven automation in Nigeria, delivering scalable, secure,
              and high-performance digital solutions for businesses and
              organizations worldwide.
            </p>
          </div>
        </div>

        {/* === Mission Section === */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch mb-24 md:mb-32">
          <div className="border border-gray-800 lg:border-gray-700 rounded-3xl p-8 md:p-10 bg-[#050505] flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
              Our Purpose
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-gray-300 uppercase">
              Our Mission
            </h2>

            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                We empower Nigerian businesses with world-class custom web and
                mobile solutions, from stunning websites to scalable e-commerce
                apps and AI-driven automation, helping them grow in the digital
                age.
              </p>

              <p className="text-gray-400 text-lg leading-relaxed">
                We are not just building applications; we create
                high-performance, future-ready digital experiences using the
                latest tools such as <strong>FastAPI</strong>,{" "}
                <strong>Django</strong>, <strong>React</strong>, and{" "}
                <strong>Next.js</strong>.
              </p>

              <p className="text-gray-400 text-lg leading-relaxed">
                Backed by an agile, professional, and highly competent team with
                over 30 years of combined experience, every solution we deliver
                is innovative, reliable, and crafted for results.
              </p>
            </div>
          </div>

          <div className="relative min-h-105 md:min-h-130 rounded-3xl overflow-hidden border border-gray-800 lg:border-gray-700">
            <Image
              src="/assets/people/ofashi-about.jpg"
              alt="Ofashi Custom Web App"
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
          </div>
        </div>

        {/* === Company Overview === */}
        <div className="mb-24 md:mb-32">
          <div className="max-w-5xl">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
              Company Overview
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 uppercase mb-8">
              Who We Are
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 border border-gray-800 lg:border-gray-700 rounded-3xl p-8 md:p-10 bg-[#050505]">
              <p className="text-gray-300 text-lg leading-relaxed">
                <strong>Ofashi</strong> is a forward-thinking digital solutions
                company headquartered in Nigeria, delivering bespoke web
                platforms, intelligent systems, and full-stack applications for
                businesses and organizations across local and international
                markets. Established eleven years ago with a core focus on
                crafting high-quality websites, the company has evolved into a
                comprehensive application development agency—engineering robust,
                scalable solutions that seamlessly extend across web and
                device-based experiences.
              </p>
            </div>

            <div className="lg:col-span-5 border border-gray-800 lg:border-gray-700 rounded-3xl p-8 md:p-10 bg-[#050505]">
              <p className="text-gray-300 text-lg leading-relaxed">
                Our approach is rooted in precision, performance, and
                innovation. We design and build hand-coded systems, advanced
                e-commerce infrastructures, and AI-powered automation tools
                tailored to the unique needs of each client. Every solution is
                architected from the ground up—eliminating reliance on templates
                and ensuring maximum flexibility, security, and long-term
                scalability.
              </p>
            </div>

            <div className="lg:col-span-12 border border-gray-800 lg:border-gray-700 rounded-3xl p-8 md:p-10 bg-[#050505]">
              <p className="text-gray-400 text-lg leading-relaxed max-w-4xl">
                With a strong foundation in full-stack development, user
                experience design, and artificial intelligence, Ofashi delivers
                enterprise-grade digital products that meet global standards.
                From ambitious startups to established organizations, we enable
                businesses to scale efficiently, operate intelligently, and
                compete confidently in an increasingly technology-driven world.
              </p>
            </div>
          </div>
        </div>

        {/* === Why Choose Us === */}
        <div className="mb-24 md:mb-32 border border-gray-800 lg:border-gray-700 rounded-3xl p-8 md:p-12 lg:p-16 bg-black">
          <div className="max-w-3xl mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
              Our Advantage
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold uppercase text-gray-300 mb-4">
              Why Nigerian Businesses Choose Ofashi
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              We combine tailored engineering, modern technologies, and a deep
              understanding of business needs to deliver digital products built
              for performance, growth, and long-term value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "100% Custom Development",
                text: "Every line of code is hand-written for your exact needs — no drag-and-drop or generic templates.",
              },
              {
                title: "AI Integration Expertise",
                text: "Seamless chatbots, automation, and intelligent features to boost your business efficiency.",
              },
              {
                title: "E-Commerce & Web Apps",
                text: "Fully functional online stores and dashboards with Paystack, Flutterwave, and real-time capabilities.",
              },
              {
                title: "Lightning-Fast Delivery",
                text: "Professional websites in days, not months — built with Next.js for instant loading.",
              },
              {
                title: "Scalable & Secure",
                text: "Future-proof solutions using FastAPI, Django, React, and Next.js — safe for growth.",
              },
              {
                title: "Nigerian-Focused Support",
                text: "Local team, fast communication, and ongoing support tailored to your market.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-800 lg:border-gray-700 p-6 bg-[#0a0a0a]"
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* === Partners & Network === */}
        <div className="mb-24 md:mb-32">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
              Network & Commitment
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-300 uppercase mb-6">
              Our Network & Commitment
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              Ofashi works with modern frameworks, proven platforms, and local
              businesses to deliver high-performance web solutions across
              Nigeria and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-800 lg:border-gray-700 rounded-3xl p-8 bg-[#0a0a0a] hover:bg-gray-900 transition">
              <h3 className="text-xl font-semibold mb-4 text-purple-100">
                Tools & Technology
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                We build with a modern, battle-tested stack: Next.js, FastAPI,
                Django, React, and Tailwind, ensuring every project is fast,
                secure, scalable, and future-ready.
              </p>
            </div>

            <div className="border border-gray-800 lg:border-gray-700 rounded-3xl p-8 bg-[#0a0a0a] hover:bg-gray-900 transition">
              <h3 className="text-xl font-semibold mb-4 text-purple-100">
                Client Success
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                From startups to enterprises, we design and develop websites
                and web applications that drive measurable growth, engagement,
                and real ROI.
              </p>
            </div>

            <div className="border border-gray-800 lg:border-gray-700 rounded-3xl p-8 bg-[#0a0a0a] hover:bg-gray-900 transition">
              <h3 className="text-xl font-semibold mb-4 text-purple-100">
                Ongoing Support
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                We provide continuous maintenance, performance optimization,
                updates, and AI enhancements — keeping your digital presence
                competitive long after launch.
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-8 text-center max-w-3xl mx-auto">
            <em>Ready to build your custom web solution? </em>
            <Link
              href="/contact"
              className="text-purple-100 underline hover:text-purple-300 font-medium"
            >
              Contact Ofashi today
            </Link>
            .
          </p>
        </div>

        {/* === Vision Section === */}
        <div className="mb-24 md:mb-28">
          <div className="border border-gray-800 lg:border-gray-700 rounded-3xl p-8 md:p-12 bg-[#050505] text-center max-w-5xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
              Long-Term Direction
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-purple-200 uppercase mb-6">
              Our Vision
            </h2>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              To make world-class digital experiences accessible to every
              Nigerian business — powering growth through custom web
              development, e-commerce, and AI innovation.
            </p>
          </div>
        </div>

        {/* === Call to Action === */}
        <div className="text-center border-t border-gray-800 pt-12">
          <p className="text-gray-400 text-lg mb-8">
            Explore our custom web development and AI solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/packages"
              className="bg-purple-800/80 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-purple-500 transition-all inline-block"
            >
              View Our Packages
            </Link>

            <Link
              href="/projects"
              className="bg-transparent border border-purple-300/90 text-purple-100 px-10 py-4 font-bold uppercase tracking-widest hover:bg-purple-800/80 hover:border-purple-400 hover:text-white transition-all inline-block"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}