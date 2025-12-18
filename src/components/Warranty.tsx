"use client";

import { ShieldCheck, Wrench, MapPin, SunMedium } from "lucide-react";

export default function WarrantyAfterSales() {
  const items = [
    {
      icon: <ShieldCheck className="text-yellow-500 w-8 h-8" />,
      title: "8-Year Battery Warranty",
      text: "Enjoy peace of mind with BYD’s industry-leading 8-year or 500,000km battery warranty — your EV’s power guaranteed.",
    },
    {
      icon: <Wrench className="text-yellow-500 w-8 h-8" />,
      title: "Certified After-Sales Support",
      text: "Our trained technicians provide maintenance and software updates to keep your BYD running like new.",
    },
    {
      icon: <MapPin className="text-yellow-500 w-8 h-8" />,
      title: "Nationwide Service Centers",
      text: "We’ve got you covered — service partners available in Lagos, Abuja, and Port Harcourt with quick turnaround times.",
    },
    {
      icon: <SunMedium className="text-yellow-500 w-8 h-8" />,
      title: "Home & Solar Charging Setup",
      text: "Free consultation for installing home or solar charging stations for stress-free daily driving.",
    },
  ];

  return (
    <section className="w-full bg-black text-gray-100 py-20 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Drive Electric with <span className="text-yellow-500">Confidence</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center hover:border-yellow-500 transition"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
