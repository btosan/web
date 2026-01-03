// app/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import WhyWebPresenceSection from "@/components/WhyWebPresence";
import TestimonialsSection from "@/components/Testimonials";
import FeaturedPackages from "@/components/FeaturedPackages";
import PortfolioSection from "@/components/PortfolioSection";
import WhyChooseUsSection from "@/components/WhyChooseUs";
import PricingSection from "@/components/PricingSection";
import DomainHostingNote from "@/components/DomainHostingNote";
import FinalCTASection from "@/components/FinalCTA";
// import EnquiryForm from "@/components/Enquiry";
import BannerSection from "@/components/BannerSection";
import EnquirySection from "@/components/EnquirySection";

export const metadata: Metadata = {
  title: " Ofashi | Custom Web Development & Website Design Nigeria | AI Automation | AI Integrations ",
  description:
    "Expert custom web development, website design, e-commerce apps, and AI integration in Nigeria. Hand-coded with FastAPI, Django, React & Next.js — fast, scalable, AI-ready solutions delivered in days.",
  keywords:
    "custom web development Nigeria, website design Lagos, e-commerce app Nigeria, AI integration Nigeria, Next.js developer, FastAPI developer, React developer, Django developer, Ofashi, Ofashi design",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function page() {
  return (
    <div className="bg-gray-950">
      <HeroSection />  
      <BannerSection />
      <WhyChooseUsSection /> 
      <PortfolioSection />
      <TestimonialsSection />
      <FeaturedPackages />
      <PricingSection />
      <WhyWebPresenceSection /> 
      {/* <FinalCTASection />  */}
      {/* <DomainHostingNote />                          */}
      <EnquirySection />                   
    </div>
  );
}