"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    model: "",
    type: "test_drive" as "test_drive" | "quote",
  });

  // Auto-detect ?type=test_drive or ?type=quote from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type");
    if (typeParam === "test_drive" || typeParam === "quote") {
      setFormData((prev) => ({ ...prev, type: typeParam as any }));
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, type: e.target.value as "test_drive" | "quote" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const actionText =
      formData.type === "test_drive" ? "book a test drive" : "request a quote";

    const message = `Hi, I'm ${formData.name} from ${formData.city}.\nI'm interested in the BYD ${formData.model} — I'd like to ${actionText}.\nMy phone: ${formData.phone}\nEmail: ${formData.email || "Not provided"}`;

    const whatsappUrl = `https://wa.me/2348099549798?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/2348099549798", "_blank");
  };

  return (
    <section
      id="contact"
      className="bg-black text-gray-100 py-20 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* Left: Contact Info */}
        <div className="space-y-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500">
              Contact eVehicles NG
            </h2>
            <p className="text-gray-400 text-lg">
              Visit our showroom, call us, or message directly on WhatsApp.
              We're here to help you go electric.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8 bg-gray-900 p-8 rounded-2xl border border-gray-800"
          >
            {/* Physical Address */}
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-yellow-500 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-xl mb-2">Visit Our Showroom</h3>
                <p className="text-gray-300 leading-relaxed">
                  46, NTA Rd, Mgbuoba,<br />
                  Port Harcourt, Rivers State, Nigeria
                </p>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-yellow-500 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-xl mb-2">Call Us</h3>
                <div className="space-y-2 text-gray-300">
                  <p>Sales: <a href="tel:+2348063887516" className="text-yellow-400 hover:underline">08063887516</a></p>
                  <p>Support: <a href="tel:+2348039136120" className="text-yellow-400 hover:underline">08039136120</a></p>
                  <p>Showroom: <a href="tel:+2348099549798" className="text-yellow-400 hover:underline">08099549798</a></p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-yellow-500 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-xl mb-2">Email Us</h3>
                <a
                  href="mailto:evehiclesng@gmail.com"
                  className="text-yellow-400 hover:underline text-lg"
                >
                  evehiclesng@gmail.com
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg"
            >
              <MessageCircle className="w-7 h-7" />
              Chat on WhatsApp
            </motion.button>
          </motion.div>
        </div>

        {/* Right: Enquiry Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-yellow-500">
            Request a Quote or Test Drive
          </h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-yellow-500 outline-none transition"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-yellow-500 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-yellow-500 outline-none"
            />
            <input
              type="text"
              name="city"
              placeholder="City *"
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
              className="md:col-span-2 w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:border-yellow-500 outline-none"
            >
              <option value="">Select BYD Model *</option>
              <option value="Song Plus">2026 BYD Song Plus</option>
              <option value="Seagull">BYD Seagull</option>
              <option value="Seal">BYD Seal</option>
              <option value="Tang">BYD Tang</option>
              <option value="Other">Other BYD Models</option>
            </select>

            <div className="md:col-span-2 flex justify-center gap-10 my-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="test_drive"
                  checked={formData.type === "test_drive"}
                  onChange={handleRadioChange}
                  className="w-5 h-5 text-yellow-500 focus:ring-yellow-500"
                />
                <span className="text-lg">Book Test Drive</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="quote"
                  checked={formData.type === "quote"}
                  onChange={handleRadioChange}
                  className="w-5 h-5 text-yellow-500 focus:ring-yellow-500"
                />
                <span className="text-lg">Request Quote</span>
              </label>
            </div>

            <div className="md:col-span-2 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xl uppercase rounded-2xl px-12 py-5 transition-all shadow-lg"
              >
                Send via WhatsApp
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}