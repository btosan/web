"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CostSavingsCalculator() {
  const [fuelCost, setFuelCost] = useState("");
  const [savings, setSavings] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const value = parseFloat(fuelCost.replace(/,/g, ""));
    if (!isNaN(value)) {
      // Average saving = 80% (since electricity ≈ 20% of fuel cost)
      setSavings(Math.round(value * 0.8));
    } else {
      setSavings(0);
    }
  }, [fuelCost]);

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(num);

  const handleBookTestDrive = () => {
    router.push("/?type=test_drive#enquiry");
  };

  return (
    <section className="bg-gray-950 text-gray-100 py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-yellow-500 uppercase"
        >
          How Much Can You Save?
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 mt-4 text-base md:text-lg"
        >
          Compare your monthly fuel cost vs electric charging cost. Discover how
          much you save when driving a BYD EV.
        </motion.p>

        {/* Input Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <label
            htmlFor="fuelCost"
            className="block text-gray-300 mb-2 text-lg font-medium"
          >
            How much do you currently spend on fuel monthly?
          </label>
          <input
            type="text"
            id="fuelCost"
            value={fuelCost}
            onChange={(e) => setFuelCost(e.target.value)}
            placeholder="e.g. 150,000"
            className="w-full md:w-1/2 mx-auto text-center py-3 px-4 text-lg rounded-xl bg-gray-900 border border-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </motion.div>

        {/* Result */}
        {savings > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <p className="text-gray-300 text-lg mb-2">
              You could save approximately:
            </p>
            <h3 className="text-4xl md:text-5xl font-bold text-yellow-500">
              {formatCurrency(savings)} / month
            </h3>
            <p className="text-gray-400 mt-3">
              That’s money back in your pocket — every single month.
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <button
            onClick={handleBookTestDrive}
            className="bg-yellow-500 text-black font-semibold text-lg px-10 py-4 rounded-2xl hover:cursor-pointer hover:bg-yellow-400 transition-all"
          >
            Book a Test Drive
          </button>
        </motion.div>
      </div>
    </section>
  );
}
