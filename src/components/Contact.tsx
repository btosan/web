"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, PhoneCallIcon, Mail, MapPin, MessageCircle } from "lucide-react";
import GoogleEnquiryForm from "./GoogleEnquiryForm";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    type: "quote" as "quote" | "consultation",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type");
    if (typeParam === "quote" || typeParam === "consultation") {
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
    setFormData({ ...formData, type: e.target.value as any });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const actionText =
      formData.type === "consultation"
        ? "book a consultation"
        : "request a project quote";

    const message = `Hi, I'm ${formData.name} from ${formData.city}.
I'm interested in ${formData.service} and would like to ${actionText}.
Phone: ${formData.phone}
Email: ${formData.email || "Not provided"}`;

    const whatsappUrl = `https://wa.me/2348080548263?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/2348080548263", "_blank");
  };

  return (
    <section
      id="contact"
      className="bg-black text-gray-100 py-20 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* Left: Contact Info */}
        <div className="space-y-10">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-purple-100">
              Contact BT WebTech
            </h2>
            <p className="text-gray-400 text-lg">
              Talk to us about custom websites, web apps, and AI automation.
              We help businesses build scalable digital solutions.
            </p>
          </div>

          <div className="space-y-8 bg-gray-900 p-8 rounded-2xl border border-gray-800">
            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-purple-100 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-xl mb-2">Our Office</h3>
                <p className="text-gray-300 leading-relaxed">
                  1, Oyeolorun Street,<br /> Elesekan Bus Stop, <br /> Bogije, Ibeju-Lekki,<br />
                  Lagos, Nigeria<br /> <br />
                  Serving clients nationwide & remotely
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-purple-100 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-xl mb-2">Call Us</h3>
                <p className="text-gray-300">
                  <a
                    href="tel:+2348038168949"
                    className="text-purple-50 hover:underline"
                  >
                    +234 803 816 8949
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <PhoneCallIcon className="w-6 h-6 text-purple-100 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-xl mb-2">Call Us</h3>
                <p className="text-gray-300">
                  <a
                    href="tel:+2349123631219"
                    className="text-purple-50 hover:underline"
                  >
                    +234 912 363 1219
                  </a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-purple-100 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-xl mb-2">Email Us</h3>
                <a
                  href="mailto:webtech.bt@gmail.com"
                  className="text-purple-50 hover:underline text-lg"
                >
                  webtech.bt@gmail.com
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <button
              onClick={openWhatsApp}
              className="w-fit bg-green-600 hover:bg-green-700 text-white font-bold py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg"
            >
              <MessageCircle className="w-7 h-7" />
              Chat on WhatsApp
            </button>
          </div>
        </div>

        {/* Right: Both Forms — WhatsApp form on top, Google form below */}
        <div className="space-y-12">
          {/* Original WhatsApp Quick Form */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">
            <h3 className="text-3xl font-bold text-center mb-8 text-purple-100">
              Request a Quote or Consultation
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-100 outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-100 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-100 outline-none"
              />

              <input
                type="text"
                name="city"
                placeholder="City *"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-100 outline-none"
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="md:col-span-2 w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:border-purple-100 outline-none"
              >
                <option value="">Select Service *</option>
                <option value="Professional Website">Professional Website</option>
                <option value="Custom Web App">Custom Web Application</option>
                <option value="AI Automation">AI Automation & Integration</option>
                <option value="E-commerce Platform">E-commerce Platform</option>
                <option value="Other">Other / Not Sure</option>
              </select>

              <div className="md:col-span-2 flex justify-center gap-10 my-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="consultation"
                    checked={formData.type === "consultation"}
                    onChange={handleRadioChange}
                    className="w-5 h-5 text-purple-100 focus:ring-purple-100"
                  />
                  <span className="text-lg">Book Consultation</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="quote"
                    checked={formData.type === "quote"}
                    onChange={handleRadioChange}
                    className="w-5 h-5 text-purple-100 focus:ring-purple-100"
                  />
                  <span className="text-lg">Request Quote</span>
                </label>
              </div>

              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="bg-purple-100 hover:bg-purple-50 text-black font-bold md:text-xl text-lg uppercase rounded-2xl lg:px-12 md:px-10 px-6 lg:py-5 md:py-4 py-3 transition-all shadow-lg"
                >
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </div>

          {/* Google Enquiry Form — Added below */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">
            <GoogleEnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}