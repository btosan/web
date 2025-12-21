"use client";

import { motion } from "framer-motion";
import { Code2, Bot, Zap, Shield, Palette, Rocket } from "lucide-react";

export default function WhyChooseUsSection() {
  const reasons = [
    {
      icon: <Code2 className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "Hand-Coded, Not Templated",
      description: "Every line of code is custom-written for your project—no generic builders or drag-and-drop limitations.",
    },
    {
      icon: <Bot className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "AI-Ready from Day One",
      description: "Seamless integration of chatbots, content generators, or any custom AI service you need.",
    },
    {
      icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "Lightning-Fast Performance",
      description: "Server-side rendering with Next.js and optimized FastAPI backends for instant load times.",
    },
    {
      icon: <Palette className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "Modern, Pixel-Perfect Design",
      description: "Beautiful, responsive UI built with React/Next.js—tailored exactly to your brand.",
    },
    {
      icon: <Rocket className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "Built to Scale & Grow",
      description: "From startup MVP to enterprise app—clean architecture that grows with your business.",
    },
    {
      icon: <Shield className="w-8 h-8 md:w-10 md:h-10 text-purple-50 shrink-0" />,
      title: "Secure & Future-Proof",
      description: "Best practices in security, CI/CD, and modern tools ensure long-term reliability.",
    },
  ];

  return (
    <section className="relative bg-black text-gray-100 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-purple-100 uppercase">
            Why Choose Us
          </h2>
          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
            We build with the same cutting-edge tools as top startups—delivering premium quality without the agency markup.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-950/50 border border-gray-800 hover:border-purple-50/30 transition"
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-100 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA at bottom of section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://wa.me/2348038168949"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-linear-to-r from-blue-100 via-purple-100 to-purple-200 text-black hover:bg-linear-to-r hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-600
                transition-all duration-300 hover:text-white text-xl font-bold rounded-full hover:bg-[#d2eff7] shadow-2xl"
          >
            Start Your Project Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}