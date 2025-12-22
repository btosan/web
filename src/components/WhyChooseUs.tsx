"use client";

import { motion } from "framer-motion";
import { Code2, Bot, Zap, Shield, Palette, Rocket } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
// h-96
const AUTOPLAY_DELAY = 4500;

export default function WhyChooseUsSection() {
  const reasons = [
    {
      icon: <Code2 className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "100% Custom-Built Solutions",
      description:
        "Every project is hand-coded from the ground up. We do not use WordPress, page builders, or drag-and-drop tools, giving you full control, better performance, and no limitations as your business grows.",
    },
    {
      icon: <Rocket className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "Designed to Scale With Your Business",
      description:
        "Our websites and web apps are built like real software, not brochure sites. From MVPs to complex systems, your product is designed to grow without needing a rebuild.",
    },
    {
      icon: <Bot className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "AI Automation That Solves Real Problems",
      description:
        "We integrate AI where it actually adds value, including chatbots, workflow automation, smart content systems, and custom AI tools that save time and reduce costs.",
    },
    {
      icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "Modern Technology & Tools",
      description:
        "We use FastAPI, Django, React, and Next.js because they are faster, more secure, and more scalable than CMS platforms like WordPress. No fragile plugins, no constant theme updates, and no sites breaking when plugins stop working.",
    },
    {
      icon: <Shield className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "Fast, Secure, and Production-Ready",
      description:
        "Security and performance are built in from day one. No bloated plugins, no patchwork fixes, and no hidden vulnerabilities caused by third-party extensions.",
    },
    {
      icon: <Palette className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "Design That Supports Business Goals",
      description:
        "Our designs are not just visually appealing. Every layout and interaction is crafted to improve clarity, usability, conversions, and customer trust.",
    },
    {
      icon: <Code2 className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "Clean Architecture, Not Quick Fixes",
      description:
        "We write clean, maintainable code that is easy to extend and improve over time, avoiding the technical debt common with template-based solutions.",
    },
    {
      icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "Clear Process and Predictable Delivery",
      description:
        "You work directly with engineers, not middlemen. Clear communication, realistic timelines, and professional delivery from start to launch.",
    },
    {
      icon: <Rocket className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "Long-Term Technical Partnership",
      description:
        "We do not disappear after launch. We support, improve, and evolve your product as your business grows, acting as a long-term technical partner.",
    },
  ];

  return (
    <section className="relative bg-black text-gray-100 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-purple-100 uppercase">
            Why Choose Us
          </h2>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            If your business needs more than a basic website, BT WebTech builds
            custom web solutions designed for performance, scalability, and real growth.
          </p>
        </motion.div>

        {/* MOBILE SLIDER */}
        <div className="md:hidden">
          <div className="text-center text-purple-300/70 text-sm mb-4">
            Swipe to explore →
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: AUTOPLAY_DELAY,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1.05}
            loop
          >
            {reasons.map((reason, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-gray-950/50 border border-gray-800 h-96 md:h-full"
                >
                  <div className="mb-4">{reason.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-950/50 border border-gray-800 hover:border-purple-50/30 transition"
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-100 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://wa.me/2348038168949"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center lg:px-12 md:px-10 px-8 lg:py-5 md:py-4 py-3 bg-linear-to-r from-blue-100 via-purple-100 to-purple-200 text-black hover:bg-linear-to-r hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-600 transition-all duration-300 hover:text-white lg:text-2xl md:text-xl text-lg font-bold rounded-full shadow-2xl"
          >
            Start Your Project Today
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        :global(.swiper-pagination) {
          position: relative;
          margin-top: 18px;
          margin-bottom: 24px;
          text-align: center;
        }
        :global(.swiper-pagination-bullet) {
          background-color: #9333ea;
          opacity: 0.4;
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        :global(.swiper-pagination-bullet-active) {
          background-color: #9333ea;
          opacity: 0.6;
          transform: scale(1.25);
        }
      `}</style>
    </section>
  );
}
