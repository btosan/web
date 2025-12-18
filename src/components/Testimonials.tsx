"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Chinoye A.",
    location: "Lagos",
    image: "/assets/people/igbo-lady.png",
    quote:
      "I drive from Lekki to Ikeja daily — my BYD Dolphin saves me over ₦100,000 monthly on fuel. Smooth, silent, and stylish! eVehicles NG made the whole process effortless.",
  },
  {
    name: "Kemi A.",
    location: "Abuja",
    image: "/assets/people/yoruba-lady.png",
    quote:
      "The Atto 3 is a dream. I charge at home overnight and never worry about queues or petrol prices again. eVehicles NG guided me from test drive to delivery seamlessly.",
  },
  {
    name: "Tunde O.",
    location: "Port Harcourt",
    image: "/assets/people/yoruba-man.png",
    quote:
      "Maintenance is almost zero — just tires and washing. I’ll never go back to petrol again. eVehicles NG’s after-sales team checks in regularly — that’s real service!",
  },
  {
    name: "Stanley U.",
    location: "Enugu",
    image: "/assets/people/igbo-man.png",
    quote:
      "My BYD Tang is the best decision I’ve made for my family. Spacious, powerful, and eco-friendly. eVehicles NG handled everything, including home charging setup.",
  },
];


export default function TestimonialsSection() {
  return (
    <section className="bg-gray-900 text-gray-100 py-20 px-6 md:px-16 xl:px-12">
      <div className="max-w-6xl lg:max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-gray-300 uppercase"
        >
          Real Owners. Real Stories.
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 mt-4 text-base md:text-lg"
        >
          Trusted by everyday Nigerians who’ve already made the switch to BYD.
        </motion.p>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 border border-gray-700 rounded-3xl p-6 shadow-lg flex flex-col items-center text-center hover:scale-[1.02] transition-transform"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-5 border-2 border-yellow-500">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-gray-300 italic mb-6">“{t.quote}”</p>
              <h4 className="text-yellow-400 font-semibold text-lg">
                {t.name}
              </h4>
              <p className="text-gray-500 text-sm">{t.location}</p>
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
            Join the BYD Family
          </button>
        </motion.div>
      </div>
    </section>
  );
}
