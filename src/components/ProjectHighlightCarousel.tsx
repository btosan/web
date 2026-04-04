// src/components/ProjectHighlightCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface Highlight {
  id: string;
  type: "image";
  url: string;
  alt: string;
  title: string;
  description: string;
}

interface ProjectHighlightCarouselProps {
  highlights: Highlight[];
}

export default function ProjectHighlightCarousel({
  highlights,
}: ProjectHighlightCarouselProps) {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-14 md:py-18">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-purple-700/10 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-indigo-700/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-purple-100/80 md:text-xs">
              Showcase
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Project Highlights
          </h2>

          <p className="mt-4 text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-7">
            A curated look at key visuals from this project, presented in a
            cleaner, darker, more premium experience.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="project-highlight-swiper pb-14"
        >
          {highlights.map((highlight) => (
            <SwiperSlide key={highlight.id}>
              <div className="group relative overflow-hidden rounded-3xl border border-gray-700/60 bg-linear-to-b from-gray-900/80 via-gray-950 to-black shadow-xl shadow-black/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-500/70 hover:shadow-2xl hover:shadow-black/40">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent z-10" />
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100 pointer-events-none" />

                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={highlight.url}
                    alt={highlight.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                </div>

                <div className="relative p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3 tracking-tight">
                    {highlight.title}
                  </h3>
                  <p className="text-sm md:text-base leading-7 text-gray-300">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
          .project-highlight-swiper .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.28);
            opacity: 1;
            width: 10px;
            height: 10px;
            transition: all 0.25s ease;
          }

          .project-highlight-swiper .swiper-pagination-bullet-active {
            background: #a855f7;
            transform: scale(1.15);
          }
        `}</style>
      </div>
    </section>
  );
}