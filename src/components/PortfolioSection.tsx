// src/components/PortfolioSection.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, ChevronDown } from "lucide-react";

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
      className="group relative rounded-2xl overflow-hidden border lg:border-2 border-purple-900/5 shadow-xs shadow-purple-600/30 transition-all duration-500 px-2 bg-purple-950/10 lg:bg-purple-950/80 hover:border-purple-300/30"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={handleInteraction}
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className={`object-cover transition-transform duration-700 ${isActive ? "scale-110" : "scale-100"}`}
        />
      </div>

      <div className="px-0 py-6 md:px-4 md:py-8 relative">
        <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3 leading-tight">
          {project.title}
        </h3>

        <p className="text-gray-300 mb-4 line-clamp-2 text-sm lg:text-sm">
          {project.shortDescription}
        </p>

        <span className={`flex items-center justify-end ${isActive ? "opacity-0 -mt-5" : "opacity-100"} md:hidden animate-bounce text-purple-500`}>
          <ChevronDown className="w-4 h-4" />
        </span>

        <p
          className={`absolute left-0 md:left-4 right-0 md:right-4 text-gray-400 text-sm lg:text-sm leading-relaxed transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"} pointer-events-none`}
        >
          {project.fullDescription}
        </p>

        <p className={`text-xs md:text-sm text-blue-100 mb-8 ${isActive ? "mt-32 pt-4" : "mt-0"}`}>
          {project.tech}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 px-5 py-2.5 md:py-3 text-base text-white bg-linear-to-bl from-purple-900 via-purple-600 to-indigo-700 hover:border-0 transition-all duration-300"
          >
            <ExternalLink size={18} />
            View Site
          </a>

          <a
            href={project.detailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 px-5 py-2.5 md:py-3 text-base text-white/90 border border-gray-700 hover:border-purple-50/60 transition group/link"
          >
            Project Details
            <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function PortfolioSection() {
  const swiperRef = useRef<any>(null);
  const stopAutoplay = () => swiperRef.current?.autoplay?.stop();

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
    <section className="relative bg-black py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden">
      <div className="mx-auto px-6 md:px-16 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-purple-100 mb-6 leading-tight">
            Featured Projects
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Real custom solutions built for clients — hand-coded and scalable.
          </p>
        </motion.div>

        {/* MOBILE SLIDER */}
        <div className="md:hidden">
          <div className="text-center text-purple-300/70 text-sm mb-4">Swipe to explore →</div>
          <Swiper
            modules={[Autoplay, Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
            pagination={{ type: "progressbar", progressbarFillClass: "!bg-purple-300", }}
            
            spaceBetween={16}
            slidesPerView={1.05}
            loop
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <ProjectCard project={project} index={index} onUserInteract={stopAutoplay} />
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

      <div className="w-full mx-auto flex items-center justify-center pt-8 md:pt-10">
        <Link href='/projects' className="hover:underline hover:underline-offset-8 hover:text-purple-300">
          See all projects
        </Link>
      </div>
    </section>
  );
}
