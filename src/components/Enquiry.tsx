"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    package: "",
    type: "start_project", // start_project | request_quote
  });

  // Auto-handle ?type=start_project or ?type=quote start my
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type");
    if (typeParam === "start_project" || typeParam === "quote") {
      setFormData((prev) => ({ ...prev, type: typeParam }));
      document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = `Hi, my name is ${formData.name}. I run ${formData.business}. 
I'm interested in the ${formData.package} package and would like to ${
      formData.type === "start_project"
        ? "start my website/web app project"
        : "request a detailed quote"
    }.
You can reach me on ${formData.phone}.`;

    const url = `https://wa.me/2348038168949?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="enquiry"
      className="bg-black text-gray-100 py-20 px-6 md:px-16 lg:px-24 border-t border-gray-700 lg:border-gray-600"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-6 text-purple-100"
        >
          Ready to Launch Your Custom Web App?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Tell us a bit about your business and the package you want.  
          We’ll reply with next steps, timelines, and deliverables.
        </motion.p>

        {/* Form */}
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
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-100 outline-none"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-100 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address (optional)"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-100 outline-none"
          />

          <input
            type="text"
            name="business"
            placeholder="Business Name"
            value={formData.business}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-100 outline-none"
          />

          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:border-purple-100 outline-none md:col-span-2"
          >
            <option value="">Select Package</option>
            <option value="Starter">Starter Website Package</option>
            <option value="Growth">Growth Web App Package</option>
            <option value="Pro">Pro Automation Package</option>
            <option value="Enterprise">Enterprise Custom Solution</option>
          </select>

          {/* Radio buttons */}
          <div className="md:col-span-2 flex justify-center gap-8 mt-4">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="radio"
                name="type"
                value="start_project"
                checked={formData.type === "start_project"}
                onChange={handleChange}
              />
              Start My Project
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="radio"
                name="type"
                value="quote"
                checked={formData.type === "quote"}
                onChange={handleChange}
              />
              Request Detailed Quote
            </label>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="
                bg-linear-to-r
                from-purple-50 via-purple-100 to-indigo-100
                text-black md:text-xl text-lg font-semibold md:uppercase
                rounded-2xl md:px-12 px-6 py-4
                hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-600
                hover:text-white transition-all hover:cursor-pointer
              "
            >
              Continue on WhatsApp
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
}
