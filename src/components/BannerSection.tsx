"use client";

import { motion } from "framer-motion";

export default function BannerSection() {
  const bullets = [
    { title: "100+", subtitle: "Projects Successfully Delivered" },
    { title: "Predictable", subtitle: "Timelines With No Surprises" },
    { title: "Reliable", subtitle: "Modern Technology Stack" },
    { title: "Trusted", subtitle: "Long-Term Client Support" },
  ];

  return (
    <section className="relative overflow-hidden border-y border-gray-700/40 bg-linear-to-b from-black via-gray-950 to-black py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="sr-only">Why Our Clients Choose Us</h2>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {bullets.map((item, idx) => (
              <li
                key={idx}
                className="group relative rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-300/20 hover:bg-white/[0.04]"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.35)]" />

                  <div>
                    <h3 className="text-2xl md:text-3xl lg:text-[2rem] font-semibold tracking-tight text-purple-100 leading-none">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-[15px] text-gray-300 leading-6">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}