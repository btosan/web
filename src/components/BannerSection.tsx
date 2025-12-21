"use client";

import { motion } from "framer-motion";

export default function BannerSection() {
  return (
    <section className="relative bg-linear-to-b from-black via-gray-950 to-black py-16 md:py-20 border-b border-t border-gray-700/80">
      <div className="max-w-7xl mx-auto px-6 md:text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Expanded Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-purple-100 mb-6">
            Modern Websites
          </h2>

          {/* Full Expanded Description */}
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto md:w-[90%] xl:w-[60%] ">
            Built with FastAPI, Django, Node.js, React & Next.js — the exact stack top startups use for speed and scalability.  
          </p>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto mt-4 md:w-[90%] xl:w-[60%]">  
            100% custom, no templates. Lightning-fast performance. AI integrations ready. Delivered in days.
          </p>

          {/* Subtle CTA */}
      <a
        href="https://wa.me/2348038168949"
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-8 inline-flex items-center justify-center px-8 py-3 rounded-full
          text-lg font-medium text-white
          bg-[linear-gradient(90deg,#dbeafe,#4c1d95,#6b21a8,#a855f7,#c084fc,#4169e1,#4b0082)]
          bg-size-[300%_300%]
          animate-gradient-wave
          transition-all duration-300
          hover:scale-[1.03]
        "
      >
        See How We Build Yours →
      </a>


        </motion.div>
      </div>
      
    </section>
  );
}