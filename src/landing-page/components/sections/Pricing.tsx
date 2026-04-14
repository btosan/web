"use client";

import { useMemo, useState } from "react";
import SectionLabel from "@/landing-page/components/ui/SectionLabel";
import { pricingPlans, type PricingCategory } from "@/landing-page/data";

interface PricingProps {
  onOpenModal: () => void;
}

const CATEGORIES: PricingCategory[] = ["Web Development", "Web Design"];

export default function Pricing({ onOpenModal }: PricingProps) {
  const [active, setActive] =
    useState<PricingCategory>("Web Development");

  const filtered = useMemo(
    () => pricingPlans.filter((plan) => plan.category === active),
    [active]
  );

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

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-[#0d0d0d]/6 rounded-full p-1 gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:cursor-pointer ${
                active === cat
                  ? "bg-[#0d0d0d] text-[#f7f4ef] shadow-sm"
                  : "bg-purple-50/10 text-black hover:text-[#0d0d0d] hover:bg-purple-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto">
        <div
          className={`grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${
            filtered.length === 3 ? "lg:justify-center" : ""
          }`}
        >
          {filtered.map((plan) => (
            <div
              key={`${plan.category}-${plan.tier}`}
              className={`relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                plan.featured
                  ? "bg-[#0d0d0d] text-[#f7f4ef] border-purple-600 shadow-xl shadow-purple-600/10"
                  : "bg-[#f7f4ef] border-[#0d0d0d]/10 hover:shadow-lg hover:border-[#0d0d0d]/20"
              }`}
            >
              {/* Featured badge */}
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              )}

              {/* Tier */}
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1 text-purple-700">
                  {plan.category}
                </p>
                <h3
                  className={`font-display text-xl font-extrabold tracking-tight ${
                    plan.featured
                      ? "text-[#f7f4ef]"
                      : "text-[#0d0d0d]"
                  }`}
                >
                  {plan.tier}
                </h3>
                <p
                  className={`text-sm font-light mt-1.5 leading-snug ${
                    plan.featured
                      ? "text-[#f7f4ef]/50"
                      : "text-[#6b6560]"
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
                    plan.featured
                      ? "text-[#f7f4ef]/40"
                      : "text-[#6b6560]"
                  }`}
                >
                  {plan.per}
                </span>
              </div>

              {/* Timeline */}
              <div
                className={`inline-flex items-center gap-1.5 text-xs font-medium mb-6 ${
                  plan.featured
                    ? "text-[#f7f4ef]/50"
                    : "text-[#6b6560]"
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
                      plan.featured
                        ? "border-white/8"
                        : "border-[#0d0d0d]/8"
                    }`}
                  >
                    <span className="w-4 h-4 mt-0.5 rounded-full bg-[#22a362]/15 text-[#22a362] flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span
                      className={
                        plan.featured
                          ? "text-[#f7f4ef]/80"
                          : "text-[#0d0d0d]"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex flex-col gap-2 mt-auto">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className={`w-full py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                    plan.featured
                      ? "bg-purple-600 text-white hover:bg-purple-400 shadow-lg shadow-purple-600/30"
                      : "bg-[#0d0d0d] text-[#f7f4ef] hover:bg-purple-600"
                  }`}
                >
                  {plan.price === "Custom"
                    ? "Get a Quote"
                    : "Start Project"}
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
      </div>

      {/* Bottom note */}
      <p className="text-center text-sm text-[#6b6560] font-light mt-10">
        All prices are starting from. Final quote depends on project scope.{" "}
        <button
          type="button"
          onClick={onOpenModal}
          className="text-purple-600 font-medium underline underline-offset-2 hover:no-underline"
        >
          Book a free discovery call
        </button>{" "}
        to get your exact price.
      </p>
    </section>
  );
}