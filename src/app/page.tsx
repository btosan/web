// app/page.tsx
import type { Metadata } from "next";
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
    "Ofashi | AI-Powered Web Development, Automation & Custom Apps in Nigeria",

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
    </div>
  );
}