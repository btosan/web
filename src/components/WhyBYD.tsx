"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Fuel, BatteryCharging, Globe2, Compass, Wrench } from "lucide-react";

export default function WhyBYDSection() {
  const benefits = [
    {
      icon: <Fuel className="w-7 h-7 md:w-8 md:h-8 text-yellow-400 shrink-0" />,
      title: "Save up to ₦180,000 Monthly",
      description:
        "No more petrol or oil changes — spend your savings on what matters most.",
    },
    {
      icon: (
        <BatteryCharging className="w-7 h-7 md:w-8 md:h-8 text-yellow-400 shrink-0" />
      ),
      title: "Charge at Home or Solar",
      description:
        "Enjoy the freedom of charging anywhere — skip fuel queues and scarcity.",
    },
    {
      icon: <Globe2 className="w-7 h-7 md:w-8 md:h-8 text-yellow-400 shrink-0" />,
      title: "Eco-Friendly Driving",
      description: "Zero emissions for cleaner air and a greener Nigeria.",
    },
    {
      icon: <Compass className="w-7 h-7 md:w-8 md:h-8 text-yellow-400 shrink-0" />,
      title: "Built for Nigerian Roads",
      description:
        "Strong suspension and high ground clearance built for local terrains.",
    },
    {
      icon: <Wrench className="w-7 h-7 md:w-8 md:h-8 text-yellow-400 shrink-0" />,
      title: "Low Maintenance",
      description:
        "Fewer moving parts, less servicing — electric simplicity at its best.",
    },
  ];

  return (
    <section
      id="why-byd"
      className="relative bg-black text-gray-100 py-14 sm:py-16 md:py-20 px-5 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* === LEFT SIDE: TEXT CONTENT === */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="z-10 order-1"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-200 uppercase mb-5 sm:mb-6">
            Why Nigerians Are Switching to BYD
          </h2>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
            Discover how BYD’s electric vehicles are transforming mobility across
            Nigeria — saving money, protecting the environment, and delivering
            performance you can trust.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3 sm:space-x-4"
              >
                <div>{item.icon}</div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-100 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-snug">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* === RIGHT SIDE: IMAGE === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full h-[260px] sm:h-[350px] md:h-[420px] lg:h-[480px] rounded-2xl border-t-8 border-b-8 border-yellow-500 overflow-hidden order-2"
        >
          <Image
            src="/assets/why-byd.png"
            alt="BYD electric car driving through Lagos city"
            fill
            className="object-cover rounded-2xl opacity-90"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
