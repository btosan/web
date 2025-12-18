"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    model: "",
    type: "test_drive",
  });

  // 👇 Automatically set form type & scroll when ?type=test_drive or ?type=quote is in the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type");
    if (typeParam === "test_drive" || typeParam === "quote") {
      setFormData((prev) => ({ ...prev, type: typeParam }));
      document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = `Hi, I'm ${formData.name} from ${formData.city}. I'm interested in the BYD ${formData.model} — I'd like to ${
      formData.type === "test_drive" ? "book a test drive" : "request a quote"
    }. My number is ${formData.phone}.`;

    const url = `https://wa.me/2348099549798?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="enquiry"
      className="bg-black text-gray-100 py-20 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-6 text-yellow-500"
        >
          Get Started — Request a Quote or Test Drive
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Fill in your details below, and an eVehicles NG team member will reach out to
          schedule your BYD test drive or send a personalized quote.
        </motion.p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 p-8 rounded-2xl shadow-lg"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-yellow-500 outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-yellow-500 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address (optional)"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-yellow-500 outline-none"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-yellow-500 outline-none"
          />
          <select
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:border-yellow-500 outline-none md:col-span-2"
          >
            <option value="">Select BYD Model</option>
            <option value="Song Plus">2026 BYD Song Plus</option>
            <option value="Seagull">BYD Seagull</option>
            {/* <option value="Seal">BYD Seal</option>
            <option value="Tang">BYD Tang</option> */}
          </select>

          <div className="md:col-span-2 flex justify-center gap-6 mt-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="type"
                value="test_drive"
                checked={formData.type === "test_drive"}
                onChange={handleChange}
              />
              Book Test Drive
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="type"
                value="quote"
                checked={formData.type === "quote"}
                onChange={handleChange}
              />
              Request Quote
            </label>
          </div>

          <div className="md:col-span-2 flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-yellow-500 text-black text-xl font-semibold uppercase rounded-2xl px-10 py-4 hover:cursor-pointer hover:bg-yellow-400 transition-all"
            >
              Submit
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
}
