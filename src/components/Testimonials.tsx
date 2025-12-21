"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// ✅ SHARED AUTOPLAY TIMING (use same value across all sliders)
const AUTOPLAY_DELAY = 5000;

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Chinedu Okeke",
      role: "CEO, Lagos Fashion Hub",
      project: "Custom E-Commerce Platform with Paystack",
      quote:
        "Our online sales went from zero to over ₦2.5M in the first month. The site is fast, beautiful on mobile, and the Paystack integration works perfectly. Truly hand-coded quality!",
      rating: 5,
      avatar: "/assets/byd/song-plus-3qv.jpg",
    },
    {
      name: "Aisha Mohammed",
      role: "Founder, Abuja Real Estate Pro",
      project: "Professional Corporate Website",
      quote:
        "I finally have a website I'm proud to share. Clients now call directly from the site instead of just WhatsApp. The content writing bonus made everything sound professional from day one.",
      rating: 5,
      avatar: "/assets/byd/song-plus-back.jpg",
    },
    {
      name: "Tunde Adebayo",
      role: "Owner, TechMart Nigeria",
      project: "Web App with AI Chatbot",
      quote:
        "The AI chatbot answers customer questions 24/7 — we've cut support time in half and increased conversions. Delivered faster than promised and better than expected.",
      rating: 5,
      avatar: "/assets/byd/song-plus-dashboard.jpg",
    },
    {
      name: "Funmi Ogunleye",
      role: "Manager, Ibadan Pharmacy Chain",
      project: "Online Store with Real-Time Inventory",
      quote:
        "Customers can now order medicine online and pick up in-store. Stock updates automatically — no more overselling. Professional work that has grown our business significantly.",
      rating: 5,
      avatar: "/assets/byd/songplus.jpg",
    },
  ];

  return (
    <section className="relative bg-black py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-purple-100 uppercase mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real Nigerian businesses sharing real results from custom websites and
            web apps.
          </p>
        </motion.div>

        {/* ✅ MOBILE SWIPE HINT */}
        <div className="flex items-center justify-center gap-3 mb-4 md:hidden text-purple-100/70 text-sm">
          <ChevronLeft className="w-4 h-4" />
          <span>Swipe to see more</span>
          <ChevronRight className="w-4 h-4" />
        </div>

        {/* Testimonials Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: AUTOPLAY_DELAY,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-full rounded-2xl bg-gray-950/60 border border-gray-800 p-8 hover:border-purple-100/40 transition-all duration-500"
              >
                {/* Star Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-purple-100 text-purple-100"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl text-gray-200 italic mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-100/50">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      priority={index < 2}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-purple-100/80 mt-1">
                      {testimonial.project}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-6 md:mt-16"
        >
          <a
            href="https://wa.me/2348038168949"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center md:px-10 px-8 md:py-4 py-3 bg-linear-to-r from-blue-100 via-purple-100 to-purple-200 text-black hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-600 transition-all duration-300 hover:text-white md:text-xl text-lg font-bold rounded-full shadow-2xl"
          >
            Be Our Next Success Story
          </a>
        </motion.div>
      </div>

      {/* Pagination styling */}
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
