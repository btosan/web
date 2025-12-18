"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is eVehicles NG?",
    answer:
      "eVehicles NG is Nigeria’s trusted destination for premium electric vehicles (EVs), specializing in BYD cars such as the Song Plus and Seagull. We provide verified vehicles, nationwide delivery, and full after-sales support — all powered by the latest EV technology."
  },
  {
    question: "Why choose BYD electric vehicles?",
    answer:
      "BYD is the world’s leading electric vehicle manufacturer and the global pioneer of the Blade Battery. BYD cars deliver exceptional range, safety, and value. Every BYD EV sold by eVehicles NG is built for Nigerian roads and supported by local service and warranty."
  },
  {
    question: "Are electric vehicles suitable for Nigeria?",
    answer:
      "Yes. EVs are ideal for Nigeria’s growing energy and mobility needs. With the rising cost of petrol and improved access to solar and inverter systems, EVs offer far lower running costs. BYD’s advanced Blade Battery ensures excellent reliability even in hot climates."
  },
  {
    question: "How do I charge an electric vehicle?",
    answer:
      "You can charge your EV using a regular household outlet (slow charge) or a wall-mounted home charger (fast charge). eVehicles NG also partners with EV charging providers to help customers install safe, certified home or office chargers."
  },
  {
    question: "What is the driving range of BYD vehicles?",
    answer:
      "The 2026 BYD Song Plus EV delivers up to 605 km (CLTC) per charge, while the BYD Seagull offers up to 405 km. Both cars are efficient, easy to maintain, and ideal for everyday commuting or inter-state travel."
  },
  {
    question: "What about maintenance and spare parts?",
    answer:
      "EVs have far fewer moving parts than petrol vehicles — meaning much lower maintenance costs. eVehicles NG offers authorized service, diagnostics, and access to original BYD parts and accessories across major Nigerian cities."
  },
  {
    question: "Can I still drive in areas without charging stations?",
    answer:
      "Yes. BYD’s long-range batteries are designed for flexibility. Many owners charge at home overnight, while eVehicles NG’s service partners provide mobile and roadside assistance options if needed."
  },
  {
    question: "Do you provide financing or installment plans?",
    answer:
      "Yes. We work with select Nigerian banks and financing partners to offer flexible installment options, making it easier for you to own your BYD EV. Contact our sales team to learn more."
  },
  {
    question: "How can I place an order or make an enquiry?",
    answer:
      "You can request a quote directly on our website or contact us via WhatsApp or phone. Visit the model page of the BYD Song Plus or Seagull and click 'Enquire Now' or 'WhatsApp Sales' — we’ll respond instantly."
  },
  {
    question: "Where is eVehicles NG located?",
    answer:
      "Our head office and primary delivery center are located in Port Harcourt, Nigeria, with service and logistics partners in Abuja and Lagos. Nationwide delivery and inspection are available."
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-20 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-12 lg:text-start text-center uppercase tracking-wide"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-gray-800 rounded-2xl overflow-hidden bg-[#0a0a0a] hover:border-gray-600 transition-all"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="text-lg md:text-xl font-semibold tracking-wide">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180 text-yellow-400" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-5 text-gray-300 text-base md:text-lg leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <motion.a
            href="https://wa.me/2348063887516?text=Hi!%20I%27m%20interested%20in%20a%20BYD%20electric%20vehicle%20from%20eVehicles%20NG"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-yellow-500 text-black font-bold px-10 py-4 rounded-full text-lg uppercase tracking-widest hover:bg-yellow-400 transition-all"
          >
            Chat With Sales
          </motion.a>
        </div>
      </div>
    </section>
  );
}
