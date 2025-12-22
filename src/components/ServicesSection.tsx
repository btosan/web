"use client";

import { motion } from "framer-motion";
import { Code, Globe, ShoppingCart, Bot, Zap, Smartphone, Lock, Rocket } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <Code className="w-12 h-12 text-purple-100" />,
      title: "Custom Web Development",
      description:
        "Custom web applications built from scratch using modern technologies, delivering scalable, reliable, and fast solutions for your business.",
    },
    {
      icon: <Globe className="w-12 h-12 text-purple-100" />,
      title: "Professional Website Design",
      description:
        "Responsive, branded websites designed to impress and convert, optimized for desktop and mobile.",
    },

    // E-Commerce & AI
    {
      icon: <ShoppingCart className="w-12 h-12 text-purple-100" />,
      title: "E-Commerce Solutions",
      description:
        "High-performance online stores with smooth checkout, inventory management, and integrated payment solutions.",
    },
    {
      icon: <Bot className="w-12 h-12 text-purple-100" />,
      title: "AI Automation & Integration",
      description:
        "Intelligent features such as chatbots, predictive analytics, content generators, and custom AI workflows.",
    },

    // Performance & Security
    {
      icon: <Zap className="w-12 h-12 text-purple-100" />,
      title: "Lightning-Fast Performance",
      description:
        "Optimized backends and server-side rendering for instant load times and superior user experience.",
    },
    {
      icon: <Lock className="w-12 h-12 text-purple-100" />,
      title: "Secure & Scalable Architecture",
      description:
        "Built with best practices in security, authentication, and cloud-ready infrastructure to scale with your business.",
    },

    // Delivery & Support
    {
      icon: <Smartphone className="w-12 h-12 text-purple-100" />,
      title: "Mobile-First & PWA",
      description:
        "Fully responsive designs that feel native on any device, including offline-capable Progressive Web Apps.",
    },
    {
      icon: <Rocket className="w-12 h-12 text-purple-100" />,
      title: "Fast Delivery & Ongoing Support",
      description:
        "Projects delivered in days or weeks with continuous support, updates, and long-term partnership.",
    },
  ];

  return (
    <section className="relative bg-black py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-purple-100 uppercase mb-6 tracking-wide">
            Our Services & Solutions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From stunning websites to AI-powered web apps, we deliver the tools and solutions your business needs to grow and succeed online.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-2xl bg-gray-800/70 border border-gray-700/80 lg:border-gray-700 hover:border-purple-100/50 transition-all duration-500 shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 group"
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-gray-900/80 rounded-2xl group-hover:bg-purple-100/10 transition">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">{service.title}</h3>
              <p className="text-gray-400 text-left leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a
            href="https://wa.me/2348038168949"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center lg:px-12 md:px-10 px-8 lg:py-5 md:py-4 py-3 bg-linear-to-r from-purple-200 via-purple-100 to-purple-50 text-black hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-600 transition-all duration-300 hover:text-white lg:text-2xl md:text-xl text-lg font-bold rounded-full shadow-2xl"
          >
            Start Your Project Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}
