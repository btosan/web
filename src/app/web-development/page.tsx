"use client";

import { useState, useEffect } from "react";
import Navbar from "@/landing-page/components/sections/Navbar";
import Hero from "@/landing-page/components/sections/Hero";
import LogosBar from "@/landing-page/components/sections/LogosBar";
import Services from "@/landing-page/components/sections/Services";
import WhyOfashi from "@/landing-page/components/sections/WhyOfashi";
import Process from "@/landing-page/components/sections/Process";
import Portfolio from "@/landing-page/components/sections/Portfolio";
import Testimonials from "@/landing-page/components/sections/Testimonials";
import Pricing from "@/landing-page/components/sections/Pricing";
import CtaSection from "@/landing-page/components/sections/CtaSection";
import Footer from "@/landing-page/components/sections/Footer";
import LeadModal from "@/landing-page/components/ui/LeadModal";

export default function WebDevelopmentPage() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".lp-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lp-wrapper">
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <main>  
        <Hero onOpenModal={() => setModalOpen(true)} />
        <LogosBar />
        <Services />
        <WhyOfashi />
        <Process />
        <Portfolio />
        <Testimonials />
        <Pricing onOpenModal={() => setModalOpen(true)} />
        <CtaSection onOpenModal={() => setModalOpen(true)} />
      </main>
      {/* <Footer /> */}
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
