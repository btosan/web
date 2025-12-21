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
import EnquiryForm from "@/components/Enquiry";
import BannerSection from "@/components/BannerSection";

export const metadata: Metadata = {
  title: "Best Tosan | BT WebTech | Custom Web Development & Website Design Nigeria",
  description:
    "Expert custom web development, website design, e-commerce apps, and AI integration in Nigeria. Hand-coded with FastAPI, Django, React & Next.js — fast, scalable, AI-ready solutions delivered in days.",
  keywords:
    "custom web development Nigeria, website design Lagos, e-commerce app Nigeria, AI integration Nigeria, Next.js developer, FastAPI developer, React developer, Django developer, BT WebTech, Best Tosan",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function page() {
  return (
    <div className="bg-gray-950">
      <HeroSection />  
      <BannerSection />                  
      <WhyWebPresenceSection />          
      <TestimonialsSection />           
      <FeaturedPackages />              
      <PortfolioSection />               
      <WhyChooseUsSection />             
      <PricingSection />                
      <DomainHostingNote />              
      <FinalCTASection />                
      <EnquiryForm />                   
    </div>
  );
}