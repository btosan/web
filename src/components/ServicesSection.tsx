"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  Sparkles,
  Cpu,
  BarChart2,
  Clock,
  MapPin,
  Settings,
  Rocket,
} from "lucide-react";

const benefits = [
  { icon: Globe, name: "Reach More Customers", title: "24/7 Online Visibility", description: "Be found on Google when people search for your products or services — 24/7 visibility.", cta: "Get Started" },
  { icon: ShieldCheck, name: "Build Trust & Credibility", title: "Professional & Reliable", description: "A professional website makes your business look established and reliable — no more Facebook-only doubts.", cta: "Get Started" },
  { icon: TrendingUp, name: "Grow Sales & Leads", title: "Convert Visitors", description: "Turn visitors into paying customers with clear calls-to-action, forms, and WhatsApp integration.", cta: "Get Started" },
  { icon: Smartphone, name: "Mobile-Friendly & Fast", title: "Perfect on Phones", description: "Look perfect on phones and load instantly — most Nigerians browse on mobile.", cta: "Get Started" },
  { icon: Sparkles, name: "Stand Out from Competitors", title: "Custom Design", description: "Custom design, not templates — impress clients and win more business.", cta: "Get Started" },
  { icon: Cpu, name: "Secure & AI-Ready", title: "Future-Proof", description: "Built with modern tools like Next.js and FastAPI — secure, scalable, and AI-ready.", cta: "Get Started" },
];

export default function ServicesSection() {
  const [open, setOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/2348080548263?text=Hi%21%20I%27m%20interested%20in%20building%20a%20custom%20website%20or%20web%20application%20and%20would%20like%20to%20discuss%20my%20project.",
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  return (
    <section className="relative w-full bg-black text-gray-100 py-20 overflow-hidden">

      {/* HEADER */}
      <div className="text-center mb-14 px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-100 mb-4">
          Services & Solutions
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg">
          We help businesses create inspiring AI & digital solutions.
        </p>
      </div>

      {/* CARDS SLIDER */}
      <div className="px-0 md:px-12 lg:px-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-12 lg:gap-8 xl:gap-12 gap-12">
          {benefits.map((benefit, index) => (
            <div key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="
                  relative h-full lg:hover:bg-purple-950/5 hover:bg-purple-950/10 border lg:border-2 hover:border-purple-300/30 lg:border-white/5
                  rounded-xs p-8 flex flex-col justify-between hover:cursor-pointer lg:bg-purple-950/80 bg-purple-950/10
                  border-purple-900/5 transition-all duration-300 shadow-xs shadow-purple-600/30
                "
              >
                {/* ICON */}
                <div className="absolute top-0 lg:top-4 left-6 lg:w-16 lg:h-16 w-12 h-12 md:w-14 md:h-14 bg-purple-950/80 flex items-center justify-center shadow-xl border border-white/10 rounded-full">
                  {React.createElement(benefit.icon, { className: "lg:w-12 lg:h-12 md:w-10 md:h-10 w-9 h-9 text-purple-100" })}
                </div>

                {/* CONTENT */}
                <div className="pt-10">
                  <span className="text-purple-50/90 uppercase text-xs tracking-widest font-medium">
                    {benefit.name}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-semibold text-purple-100 mt-3 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* CTA — now opens the modal instead of direct WhatsApp */}
                <motion.button
                  onClick={() => setOpen(true)}
                  whileHover={{ scale: 1.03 }}
                  className="
                    mt-8 inline-flex items-center justify-center
                    px-8 md:px-8 py-3 rounded-xs font-semibold text-sm md:text-base
                    hover:text-purple-50 text-white hover:cursor-pointer
                    bg-linear-to-bl hover:from-transparent hover:via-transparent hover:to-transparent
                    hover:border hover:border-purple-100/80
                    from-purple-900 via-purple-600 to-indigo-700 border-0
                    transition-all duration-300 w-fit
                  "
                >
                  {benefit.cta}
                </motion.button>
              </motion.div>
            </div>
          ))}
      </div>

      {/* Shared Modal — same as used in other sections */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-purple-100 mb-6">
                How would you like to continue?
              </h3>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl transition-all"
                >
                  Continue on WhatsApp
                </button>

                <a
                  href="/contact-form"
                  onClick={() => setOpen(false)}
                  className="border border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-black font-semibold py-4 rounded-xl transition-all text-center block"
                >
                  Use Email Form
                </a>

                <a
                  href="tel:+2348038168949"
                  className="relative border border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-black font-semibold py-8 rounded-xl transition-all text-center block overflow-hidden group"
                >
                  {/* Default: "Call Us" */}
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                    Call Us
                  </span>

                  {/* Hover: Phone number slides up */}
                  <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    +234 803 816 8949
                  </span>
                </a>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 text-sm mt-2 hover:text-gray-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        :global(.swiper-pagination) {
          position: relative;
          margin-top: 14px;
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