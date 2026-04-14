"use client";

import { useState } from "react";
import SectionLabel from "@/landing-page/components/ui/SectionLabel";
import { pricingPlans, type PricingCategory } from "@/landing-page/data";

interface PricingProps {
  onOpenModal: () => void;
}

const CATEGORIES: PricingCategory[] = ["Web Development", "Web Design"];

export default function Pricing({ onOpenModal }: PricingProps) {
  const [active, setActive] = useState<PricingCategory>("Web Development");

  const filtered = pricingPlans.filter((p) => p.category === active);

  return (
    <section id="pricing" className="py-24 px-[6vw] bg-[#ede9e0]">
      {/* Header */}
      <div className="text-center mb-12">
        <SectionLabel text="Transparent Pricing" center />
        <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold tracking-tight leading-[1.1]">
          Simple, Fixed-Price Packages
        </h2>
        <p className="text-[#6b6560] font-light mt-4 max-w-md mx-auto">
          No hidden fees. No surprise invoices. Choose the package that fits
          your stage — all starting prices, custom quotes available.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-[#0d0d0d]/6 rounded-full p-1 gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                active === cat
                  ? "bg-[#0d0d0d] text-[#f7f4ef] shadow-sm"
                  : "text-[#6b6560] hover:text-[#0d0d0d]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div
        key={active}
        className={`grid gap-4 ${
          filtered.length <= 3
            ? "grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        }`}
      >
        {filtered.map((plan) => (
          <div
            key={plan.tier}
            className={`reveal relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 flex flex-col ${
              plan.featured
                ? "bg-[#0d0d0d] text-[#f7f4ef] border-[#9333ea] shadow-xl shadow-[#9333ea]/10"
                : "bg-[#f7f4ef] border-[#0d0d0d]/10 hover:shadow-lg hover:border-[#0d0d0d]/20"
            }`}
          >
            {/* Popular badge */}
            {plan.featured && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#9333ea] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                Most Popular
              </span>
            )}

            {/* Tier & category */}
            <div className="mb-5">
              <p
                className={`text-[10px] font-bold uppercase tracking-[0.12em] mb-1 ${
                  plan.featured ? "text-[#9333ea]" : "text-[#9333ea]"
                }`}
              >
                {plan.category}
              </p>
              <h3
                className={`font-display text-xl font-extrabold tracking-tight ${
                  plan.featured ? "text-[#f7f4ef]" : "text-[#0d0d0d]"
                }`}
              >
                {plan.tier}
              </h3>
              <p
                className={`text-sm font-light mt-1.5 leading-snug ${
                  plan.featured ? "text-[#f7f4ef]/50" : "text-[#6b6560]"
                }`}
              >
                {plan.desc}
              </p>
            </div>

            {/* Price */}
            <div className="mb-1">
              <span className="font-display text-3xl font-extrabold tracking-tight">
                {plan.price}
              </span>
              <span
                className={`text-sm font-normal ml-1 ${
                  plan.featured ? "text-[#f7f4ef]/40" : "text-[#6b6560]"
                }`}
              >
                {plan.per}
              </span>
            </div>

            {/* Timeline */}
            <div
              className={`inline-flex items-center gap-1.5 text-xs font-medium mb-6 ${
                plan.featured ? "text-[#f7f4ef]/50" : "text-[#6b6560]"
              }`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="flex-shrink-0"
              >
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M6 3.5V6l1.5 1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              {plan.timeline}
            </div>

            {/* Features */}
            <ul className="space-y-0 mb-8 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className={`flex items-start gap-3 text-sm py-2.5 border-b ${
                    plan.featured ? "border-white/8" : "border-[#0d0d0d]/8"
                  }`}
                >
                  <span className="w-4 h-4 mt-0.5 rounded-full bg-[#22a362]/15 text-[#22a362] flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span
                    className={
                      plan.featured ? "text-[#f7f4ef]/80" : "text-[#0d0d0d]"
                    }
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col gap-2 mt-auto">
              <button
                onClick={onOpenModal}
                className={`w-full py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                  plan.featured
                    ? "bg-[#9333ea] text-white hover:bg-[#a855f7] shadow-lg shadow-[#9333ea]/30"
                    : "bg-[#0d0d0d] text-[#f7f4ef] hover:bg-[#9333ea]"
                }`}
              >
                {plan.price === "Custom" ? "Get a Quote" : "Start Project"}
              </button>
              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-2.5 rounded-full font-medium text-xs text-center transition-all ${
                  plan.featured
                    ? "text-[#f7f4ef]/50 hover:text-[#f7f4ef]"
                    : "text-[#6b6560] hover:text-[#0d0d0d]"
                }`}
              >
                View full details →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center text-sm text-[#6b6560] font-light mt-10">
        All prices are starting from. Final quote depends on project scope.{" "}
        <button
          onClick={onOpenModal}
          className="text-[#9333ea] font-medium underline underline-offset-2 hover:no-underline"
        >
          Book a free discovery call
        </button>{" "}
        to get your exact price.
      </p>
    </section>
  );
}
