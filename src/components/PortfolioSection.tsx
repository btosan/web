// src/components/PortfolioSection.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const AUTOPLAY_DELAY = 5000;

interface Project {
  title: string;
  shortDescription: string;
  fullDescription: string;
  tech: string;
  image: string;
  liveUrl: string;
  detailUrl: string;
}

const ProjectCard = ({ project, index, onUserInteract }: { project: Project; index: number; onUserInteract?: () => void }) => {
  const [isActive, setIsActive] = useState(false);

  const handleInteraction = () => {
    setIsActive(!isActive);
    onUserInteract?.();
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden bg-gray-950/60 border border-gray-600/90 hover:border-gray-500/70 transition-all duration-500 shadow-lg shadow-gray-600"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={handleInteraction}
    >
      {/* Image */}
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className={`object-cover transition-transform duration-700 ${
            isActive ? "scale-110" : "scale-100"
          }`}
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 relative">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {project.title}
        </h3>

        <p className="text-gray-300 mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        <p
          className={`absolute left-6 md:left-8 right-6 md:right-8 text-gray-400 text-sm md:text-base leading-relaxed transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-0"
          } pointer-events-none`}
        >
          {project.fullDescription}
        </p>

        <p
          className={`text-sm text-blue-100 mb-8 ${
            isActive ? "mt-32 pt-4" : "mt-0"
          }`}
        >
          {project.tech}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-purple-100/20 text-purple-50 border border-purple-50/40 rounded-full hover:bg-purple-50/30 hover:border-purple-50 transition font-medium"
          >
            <ExternalLink size={18} />
            View Live Site
          </a>

          <a
            href={project.detailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-white/90 hover:text-white border border-gray-700 rounded-full hover:border-purple-50/60 transition font-medium group/link"
          >
            Project Details
            <ArrowRight
              size={18}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </a>
        </div>
      </div>

      <div
        className={`absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.div>
  );
};

export default function PortfolioSection() {
  const swiperRef = useRef<any>(null);

  const stopAutoplay = () => {
    swiperRef.current?.autoplay?.stop();
  };

  const projects: Project[] = [
    {
      title: "E-Commerce Platform",
      shortDescription:
        "Full-stack Next.js + FastAPI web app with Paystack integration",
      fullDescription:
        "A complete online store with inventory management, secure payments via Paystack, user authentication, order tracking, and admin dashboard. Optimized for speed and conversions.",
      tech: "Next.js, FastAPI, React, Tailwind, PostgreSQL",
      image: "/assets/byd/song-plus-3qv.jpg",
      liveUrl: "https://example-ecommerce.com",
      detailUrl: "https://besttosan.com/projects/ecommerce",
    },
    {
      title: "Business Dashboard",
      shortDescription:
        "Custom analytics dashboard with real-time data and AI insights",
      fullDescription:
        "Enterprise-grade dashboard with live data feeds, interactive charts, AI-powered predictions, role-based access, export features, and automated reporting.",
      tech: "Django, React, Chart.js, PostgreSQL",
      image: "/assets/byd/song-plus-back.jpg",
      liveUrl: "https://dashboard.example.com",
      detailUrl: "https://besttosan.com/projects/dashboard",
    },
    {
      title: "Corporate Website",
      shortDescription:
        "Modern responsive site with CMS and SEO optimization",
      fullDescription:
        "Professional multi-page corporate site with headless CMS for easy content management, advanced SEO, contact forms, blog, and lightning-fast performance.",
      tech: "Next.js, Tailwind, Sanity/Strapi CMS",
      image: "/assets/byd/song-plus-bonnet.jpg",
      liveUrl: "https://corporate.example.com",
      detailUrl: "https://besttosan.com/projects/corporate",
    },
    {
      title: "SaaS Landing Page",
      shortDescription:
        "High-conversion landing page with animations and forms",
      fullDescription:
        "Marketing-focused landing page built for lead capture with smooth animations, WhatsApp integration, testimonials, pricing tables, and A/B testing support.",
      tech: "Next.js, Framer Motion, Node.js",
      image: "/assets/byd/song-plus-dashboard.jpg",
      liveUrl: "https://saas.example.com",
      detailUrl: "https://besttosan.com/projects/saas-landing",
    },
    {
      title: "AI-Powered Tool",
      shortDescription:
        "Web app integrating custom AI models for content generation",
      fullDescription:
        "Intelligent platform that generates high-quality blog posts, social media content, emails, and product descriptions using custom-trained AI models.",
      tech: "FastAPI, React, OpenAI API, Redis",
      image: "/assets/byd/songplus.jpg",
      liveUrl: "https://ai-tool.example.com",
      detailUrl: "https://besttosan.com/projects/ai-tool",
    },
    {
      title: "Mobile-First Site",
      shortDescription:
        "Lightning-fast progressive web app for local business",
      fullDescription:
        "PWA that works offline, sends push notifications, installs on home screen, and delivers native-app-like experience on mobile with instant loading.",
      tech: "Next.js, PWA, Tailwind",
      image: "/assets/byd/song-plus-others.jpg",
      liveUrl: "https://mobile.example.com",
      detailUrl: "https://besttosan.com/projects/mobile-pwa",
    },
  ];

  return (
    <section className="relative bg-black py-20 md:py-28 overflow-hidden">
      <div className="mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-purple-100 uppercase mb-6">
            Selected Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real custom solutions built for clients — hand-coded and scalable.
          </p>
        </motion.div>

        {/* MOBILE SLIDER */}
        <div className="md:hidden">
          <div className="text-center text-purple-300/70 text-sm mb-4">
            Swipe to explore →
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            autoplay={{
              delay: AUTOPLAY_DELAY,
              disableOnInteraction: false,
            }}
            pagination={{ type: "progressbar" }}
            spaceBetween={16}
            slidesPerView={1.05}
            loop
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <ProjectCard
                  project={project}
                  index={index}
                  onUserInteract={stopAutoplay}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Progress bar styling */}
      <style jsx>{`
        :global(.swiper-pagination-progressbar) {
          background: rgba(255, 255, 255, 0.1);
          height: 4px;
          border-radius: 4px;
        }
        :global(.swiper-pagination-progressbar-fill) {
          background: #a855f7; /* purple-500 */
        }
      `}</style>

      <style jsx global>{`
        .swiper {
          --swiper-theme-color: rgba(216, 180, 254, 0.7); /* purple-300/70 */
        }

        .swiper-pagination-progressbar {
          background: rgba(255, 255, 255, 0.12);
          height: 4px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}