"use client";

import { motion } from "framer-motion";

export default function BannerSection() {
  const bullets = [
    "50+ projects delivered",
    "Clear communication from start to launch",
    "Predictable timelines, no surprises",
    "Delivered in days or weeks, not months",
    "Reliable, modern tech stack",
    "Affordable packages for growing businesses",
    "Built for long-term partnerships",
    "Ongoing support included",
  ];

  return (
    <section className="relative bg-linear-to-b from-black via-gray-950 to-black py-16 md:py-20 border-b border-t border-gray-700/80">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Headline (still centered for authority) */}
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-purple-100 mb-12 text-center md:text-left">
            Trusted by growing businesses
          </h2>

          {/* Grid layout for bullets */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6  mx-auto">
            {bullets.map((text, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="mt-2 md:h-3 md:w-3 h-2 w-2 rounded-full bg-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
                <p className="text-sm md:text-xl text-gray-200 leading-relaxed">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
