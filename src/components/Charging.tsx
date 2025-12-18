"use client";

import { motion } from "framer-motion";
import { BatteryCharging, Home, Zap } from "lucide-react";

const benefits = [
  {
    icon: <Home className="w-10 h-10 text-yellow-500" />,
    title: "Charge at Home or Office",
    description:
      "Plug into a regular 13A wall socket or install a fast charger. Wake up to a full battery every morning.",
  },
  {
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
    title: "Fast Charging Options",
    description:
      "Get up to 80% charge in under an hour at partner charging stations nationwide.",
  },
  {
    icon: <BatteryCharging className="w-10 h-10 text-yellow-500" />,
    title: "Powered by Solar",
    description:
      "Combine BYD with solar to drive emission-free, fuel-free, and worry-free across Nigeria.",
  },
];

export default function ChargingSection() {
  return (
    <section className="bg-black text-gray-100 py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-yellow-500 uppercase"
        >
          Charging Made Easy
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 mt-4 text-base md:text-lg max-w-3xl mx-auto"
        >
          With BYD’s versatile charging options, you’re always powered — at home,
          at work, or on the go.
        </motion.p>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {benefits.map((b, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-3xl border border-gray-800 p-8 flex flex-col items-center text-center hover:border-yellow-500 transition-all"
            >
              <div className="mb-5">{b.icon}</div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                {b.title}
              </h3>
              <p className="text-gray-400 text-base">{b.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <button className="bg-yellow-500 text-black font-semibold text-lg px-10 py-4 rounded-2xl hover:bg-yellow-400 transition-all">
            Learn About Home Charging
          </button>
        </motion.div>
      </div>
    </section>
  );
}
