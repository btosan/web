"use client";

import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// ✅ shared autoplay timing (same as testimonials)
const AUTOPLAY_DELAY = 5000;

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "₦70,000",
      features: [
        "Custom site (up to 5 pages)",
        "Fully responsive design",
        "Hand-coded admin panel for easy content updates",
        "1-month free support",
        ".com.ng domain + 1 year hosting included",
      ],
      highlighted: true,
    },
    {
      name: "Growth",
      price: "₦100,000",
      features: [
        "Web app (up to 10 pages)",
        "User login & authentication",
        "API integration",
        "Basic AI feature (e.g., chatbot)",
        "2-week delivery",
        "Domain not included – we can help register",
      ],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "₦150,000",
      features: [
        "Unlimited pages",
        "Advanced AI automation",
        "Stripe/Paystack/Flutterwave integration",
        "CI/CD pipeline",
        "1-month support",
        "Domain guide provided",
      ],
      highlighted: false,
    },
    {
      name: "Enterprise",
      price: "Quote-based",
      features: [
        "Fully custom specifications",
        "Docker & advanced deployment",
        "24/7 monitoring",
        "Priority support",
        "Personalized domain advice",
      ],
      highlighted: false,
    },
  ];

  const PricingCard = ({ plan, index }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className={`
        relative rounded-2xl p-8 border transition-all h-full
        ${
          plan.highlighted
            ? "border-purple-100 bg-gray-950/70 shadow-2xl shadow-purple-100/20"
            : "border-gray-700/70 bg-gray-950/40 hover:border-gray-700"
        }
      `}
    >
      {plan.highlighted && (
        <div className="absolute md:-top-4 top-0 left-1/2 -translate-x-1/2 bg-purple-100 text-black md:px-6 px-4 py-2 md:rounded-full rounded-lg md:text-sm text-xs font-bold">
          Most Popular
        </div>
      )}

      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {plan.name}
      </h3>

      <p className="text-4xl md:text-5xl text-purple-100 mb-8">
        {plan.price}
      </p>

      <ul className="space-y-4 mb-10">
        {plan.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-purple-100 shrink-0 mt-0.5" />
            <span className="text-gray-300 text-sm md:text-base">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="https://wa.me/2348038168949"
        target="_blank"
        rel="noopener noreferrer"
        className={`
          block text-center py-4 rounded-full font-semibold transition-all duration-300
          ${
            plan.highlighted
              ? "bg-linear-to-r from-blue-100 via-purple-100 to-purple-200 text-black hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-600 hover:text-white"
              : "border border-purple-100/50 text-purple-100 hover:bg-linear-to-l hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-600 hover:text-white"
          }
        `}
      >
        {plan.price === "Quote-based" ? "Get Quote" : "Get Started"}
      </a>
    </motion.div>
  );

  return (
    <section id="pricing" className="relative bg-black py-20 md:py-28 border-t border-gray-700 lg:border-gray-600 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-purple-100 uppercase mb-6">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Every plan comes with{" "}
            <span className="text-purple-50 font-medium">
              FREE business email setup
            </span>
            ,{" "}
            <span className="text-purple-50 font-medium">
              automated contact forms
            </span>
            , and{" "}
            <span className="text-purple-50 font-medium">
              smart lead notifications
            </span>{" "}
            — so you start getting leads immediately.
          </p>
        </motion.div>

        {/* ✅ MOBILE SWIPE HINT */}
        <div className="flex items-center justify-center gap-3 mb-4 md:hidden text-purple-100/70 text-sm">
          <ChevronLeft className="w-4 h-4" />
          <span>Swipe to compare plans</span>
          <ChevronRight className="w-4 h-4" />
        </div>

        {/* ✅ MOBILE SLIDER */}
        <div className="md:hidden">
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
            slidesPerView={1.05}
          >
            {plans.map((plan, index) => (
              <SwiperSlide key={index}>
                <PricingCard plan={plan} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ✅ DESKTOP / TABLET GRID (UNCHANGED) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
