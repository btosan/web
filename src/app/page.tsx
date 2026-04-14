// app/page.tsx
import type { Metadata } from "next";
import Link from 'next/link';
import { ChevronRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
// import WhyWebPresenceSection from "@/components/WhyWebPresence";
import TestimonialsSection from "@/components/Testimonials";
// import FeaturedPackages from "@/components/FeaturedPackages";
// import PortfolioSection from "@/components/PortfolioSection";
import WhyChooseUsSection from "@/components/WhyChooseUs";
import BannerSection from "@/components/BannerSection";
import EnquirySection from "@/components/EnquirySection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import PostGridSection from "@/components/posts/PostGridSection";
import { getFeaturedPosts, getLatestPosts } from "@/lib/actions/posts";

export const metadata: Metadata = {
  title:
    "Ofashi | AI-Powered Web Development, Custom Apps, AI Automation & Integrations",

  description:
    "Ofashi builds AI-powered full-stack applications and custom websites that drive real business growth. We combine modern web development, smart automation, and exceptional UI/UX to create fast, scalable, and conversion-focused digital solutions for businesses in Nigeria and beyond.",

  keywords:
    "AI web development Nigeria, custom web applications Nigeria, AI automation services, AI integration, website design Nigeria, business process automation, Next.js developers, React developers, Django developers, FastAPI developers, AI integration services, Ofashi",

  icons: {
    icon: "/favicon.ico",
  },
};


export default async function page() {
  const [featuredPosts, latestPosts] = await Promise.all([
    getFeaturedPosts(3),
    getLatestPosts(3),
  ]);

  return (
    <div className="bg-black">
      <HeroSection />  
      <BannerSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />

      {/* 🔥 BLOG SECTION (NEW) */}
      <section className="px-6 py-20 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-7xl space-y-16">
          <PostGridSection
            title="Insights & Articles"
            description="Explore ideas, guides, and practical strategies to grow your business with modern technology."
            href="/blog"
            linkLabel="View all posts"
            posts={featuredPosts}
          />

          <PostGridSection
            title="Latest from our blog"
            posts={latestPosts}
          />
        </div>
      </section>

      <TestimonialsSection />
      <EnquirySection /> 
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
          href="/about"
          className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
        >
          {/* subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
  
          {/* glow effect */}
          <div className="absolute right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />
  
          <span className="relative z-10 flex items-center gap-2">
            About Us
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
    </div>
  );
}