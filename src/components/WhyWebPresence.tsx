"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";
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
  { icon: BarChart2, name: "Track & Improve Performance", title: "Data-Driven Decisions", description: "Know what works and what doesn’t. Track visitors, leads, and conversions to improve results over time.", cta: "Get Started" },
  { icon: Clock, name: "Always Open", title: "24/7 Availability", description: "Your website works for you day and night — answering questions, capturing leads, and selling even when you’re offline.", cta: "Get Started" },
  { icon: MapPin, name: "Reach Beyond Your Location", title: "Expand Your Market", description: "A website lets customers find you from anywhere — beyond walk-ins, referrals, or local boundaries.", cta: "Get Started" },
  { icon: Settings, name: "Built for Your Business", title: "Custom Functionality", description: "From booking systems to dashboards and portals, custom web apps automate work and save time.", cta: "Get Started" },
  { icon: Rocket, name: "Ready to Scale", title: "Growth Without Limits", description: "Start small and grow big. Your website and web app can evolve as your business expands.", cta: "Get Started" },
];

export default function WhyWebPresenceSection() {
  return (
    <section className="relative w-full bg-black text-gray-100 py-20 overflow-hidden">

      {/* VISUAL INTRO */}
      <div className="relative w-full h-[260px] md:h-[340px] lg:h-[420px] mb-16 px-6 md:px-12 lg:px-16">
        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          <Image
            src="/assets/web/web-presence.jpg"
            alt="Modern business website on multiple devices"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute bottom-6 left-0 right-0">
            <span className="text-purple-300/70 flex items-center justify-center uppercase tracking-widest text-xs md:text-sm font-medium">
              Websites • Web Apps • Growth
            </span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="text-center mb-14 px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-100 mb-4">
          Why Your Business Needs a Website
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg">
          A professional web presence helps customers find you, trust you, and
          choose you — even while you sleep.
        </p>
      </div>

      {/* CARDS SLIDER */}
      <div className="px-6 md:px-12 lg:px-16">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {benefits.map((benefit, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="
                  relative h-full bg-gray-800/50 border lg:border-2 border-white/30
                  rounded-3xl p-8 flex flex-col justify-between
                  hover:border-purple-300/40 transition-all duration-300
                "
              >
                {/* ICON */}
                <div className="absolute top-0 left-6 w-14 h-14 bg-black/10 flex items-center justify-center shadow-xl border border-white/10 rounded-xl">
                  {React.createElement(benefit.icon, { className: "w-7 h-7 text-purple-100" })}
                </div>

                {/* CONTENT */}
                <div className="pt-10">
                  <span className="text-purple-200/90 uppercase text-xs tracking-widest font-medium">
                    {benefit.name}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-semibold text-purple-100 mt-3 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* CTA */}
                <motion.a
                  href="https://wa.me/2348038168949"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  className="
                    mt-8 inline-flex items-center justify-center
                    px-8 md:px-8 py-3 rounded-full font-semibold text-sm md:text-base
                    text-purple-50 hover:text-white
                    bg-linear-to-r
                    border border-purple-100/80
                    hover:from-purple-900 hover:via-purple-600 hover:to-indigo-700 hover:border-0
                    transition-all duration-300 w-fit
                  "
                >
                  {benefit.cta}
                </motion.a>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

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
