"use client";

import { useState } from "react";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  PhoneCallIcon,
  Mail,
  MapPin,
  MessageCircle,
  ChevronRight
} from "lucide-react";
import GoogleEnquiryForm from "./GoogleEnquiryForm";

export default function ContactSection() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    type: "quote" as "quote" | "consultation",
  });

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/2349123631219?text=Hi%21%20I%27m%20interested%20in%20building%20a%20custom%20website%20or%20web%20application%20and%20would%20like%20to%20discuss%20my%20project.",
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, type: e.target.value as "quote" | "consultation" });
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

    const whatsappUrl = `https://wa.me/2349123631219?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/2349123631219", "_blank");
  };

  return (
    <section
      id="contact"
      className="bg-black text-gray-50 py-10 md:py-12 lg:py-16 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-4xl mb-14 md:mb-16">
          <p className="text-sm md:text-base uppercase tracking-[0.25em] text-gray-500 mb-4">
            Get In Touch
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-purple-100">
            Contact Us
          </h2>

          <div className="w-20 h-px bg-gray-700 mb-6" />

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl">
            Talk to us about custom websites, web apps, and AI automation. We
            help businesses build scalable digital solutions with clarity,
            speed, and long-term value.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Contact Info Card */}
            <div className="bg-gray-950/70 border border-gray-800 rounded-3xl p-8 md:p-10">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                  Contact Information
                </p>
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-100">
                  Let’s Start the Conversation
                </h3>
              </div>

              <div className="space-y-8">
                {/* Offices */}
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <MapPin className="w-6 h-6 text-purple-100 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-3 text-gray-100">
                      Our Offices
                    </h4>
                    <div className="text-gray-200 leading-relaxed space-y-5">
                      <p>
                        1, Oyeolorun Street,
                        <br />
                        Elesekan Bus Stop,
                        <br />
                        Bogije, Ibeju-Lekki,
                        <br />
                        Lagos, Nigeria
                      </p>

                      <p>
                        1, Animashaun Street,
                        <br />
                        Cele Bus Stop,
                        <br />
                        Epe, Lagos, Nigeria
                      </p>

                      <p>
                        Shop 18 & 19, Uwaka Plaza,
                        <br />
                        Near Umuseti Townhall,
                        <br />
                        Kwale, Delta State, Nigeria
                      </p>

                      <p className="pt-1 text-gray-400">
                        Serving clients nationwide & remotely
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-800" />

                {/* Phone Numbers */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Phone className="w-6 h-6 text-purple-100 shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xl mb-2 text-gray-100">
                        Call Us
                      </h4>
                      <a
                        href="tel:+2348038168949"
                        className="text-purple-50 hover:underline text-lg"
                      >
                        +234 803 816 8949
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <PhoneCallIcon className="w-6 h-6 text-purple-100 shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xl mb-2 text-gray-100">
                        Alternative Line
                      </h4>
                      <a
                        href="tel:+2349123631219"
                        className="text-purple-50 hover:underline text-lg"
                      >
                        +234 912 363 1219
                      </a>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-800" />

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Mail className="w-6 h-6 text-purple-100 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2 text-gray-100">
                      Email Us
                    </h4>
                    <a
                      href="mailto:ofashi.com@gmail.com"
                      className="text-purple-50 hover:underline text-lg break-all"
                    >
                      ofashi.com@gmail.com
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={openWhatsApp}
                    className="w-full sm:w-fit bg-green-600/50 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Chat on WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Support Note */}
            <div className="border border-gray-800 rounded-3xl p-6 md:p-8 bg-[#050505]">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                Availability
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Whether you need a project quote, technical consultation, or a
                strategic discussion around your digital product, our team is
                available to guide you from idea to execution.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* WhatsApp Form */}
            <div className="bg-gray-950/90 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-500/50">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                  Quick Enquiry
                </p>
                <h3 className="text-2xl md:text-3xl font-medium text-purple-100 mb-3">
                  Request a Quote or Consultation
                </h3>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
                  Share a few details about your project and send your enquiry
                  directly via WhatsApp for a faster response.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-xl bg-black border border-gray-600 text-gray-50 placeholder-gray-300 focus:border-gray-400 outline-none transition"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-xl bg-black border border-gray-600 text-gray-50 placeholder-gray-300 focus:border-gray-400 outline-none transition"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-black border border-gray-600 text-gray-50 placeholder-gray-300 focus:border-gray-400 outline-none transition"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-xl bg-black border border-gray-600 text-gray-50 placeholder-gray-300 focus:border-gray-400 outline-none transition"
                />

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="md:col-span-2 w-full p-4 rounded-xl bg-black border border-gray-600 text-gray-50 focus:border-gray-400 outline-none transition"
                >
                  <option value="">Select Project Type *</option>
                  <option value="Custom Website">Custom Website</option>
                  <option value="Web App">Web Application</option>
                  <option value="E-commerce">E-Commerce Platform</option>
                  <option value="AI">AI Automtion / Integration</option>
                  <option value="Other">Other</option>
                </select>

                <div className="md:col-span-2 pt-2">
                  <p className="text-sm uppercase tracking-[0.14em] text-gray-500 mb-4">
                    Enquiry Type
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="quote"
                        checked={formData.type === "quote"}
                        onChange={handleRadioChange}
                        className="w-5 h-5 text-purple-200 focus:ring-purple-500"
                      />
                      <span className="text-base text-gray-200">
                        Request Quote
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="consultation"
                        checked={formData.type === "consultation"}
                        onChange={handleRadioChange}
                        className="w-5 h-5 text-purple-200 focus:ring-purple-500"
                      />
                      <span className="text-base text-gray-200">
                        Request Consultation
                      </span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="bg-purple-100 hover:bg-purple-50 text-black font-bold md:text-lg text-base uppercase rounded-2xl w-full sm:w-auto px-8 md:px-10 lg:px-12 py-4 transition-all shadow-lg hover:cursor-pointer"
                  >
                    Send via WhatsApp
                  </button>
                </div>
              </form>
            </div>

            {/* Google Form Card */}
            <div className="bg-gray-950/70 py-8 md:py-0 md:p-10 rounded-3xl shadow-xl md:border md:border-gray-700">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                  Detailed Enquiry
                </p>
                <h3 className="text-2xl md:text-3xl font-medium text-gray-100 mb-3">
                  Prefer a More Detailed Form?
                </h3>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                  Complete the enquiry form below for a more structured project
                  submission.
                </p>
              </div>

              <GoogleEnquiryForm />
            </div>
          </div>
        </div>
      </div>

      {/* Shared Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-gray-900 rounded-3xl p-6 md:p-8 w-full max-w-2xl border border-gray-600 max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition text-xl"
                aria-label="Close modal"
              >
                ✕
              </button>

              <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                Choose a Contact Option
              </p>

              <h3 className="text-2xl md:text-3xl font-bold text-purple-100 mb-6">
                How would you like to continue?
              </h3>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl transition-all"
                >
                  Continue on WhatsApp
                </button>

                <a
                  href="/contact-form"
                  onClick={() => setOpen(false)}
                  className="border border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-black font-semibold py-4 rounded-xl transition-all text-center block"
                >
                  Use Email Form
                </a>

                <a
                  href="tel:+2349123631219"
                  className="relative border border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-black font-semibold py-4 rounded-xl transition-all text-center block overflow-hidden group"
                >
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                    Call Us
                  </span>

                  <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    +234 912 363 1219
                  </span>
                </a>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 text-sm mt-2 hover:text-gray-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        <div className="mt-8 md:mt-16 lg:mt-24">
          <Link
            href="/services"
            className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
          >
            {/* subtle top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
  
            {/* glow effect */}
            <div className="absolute right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />
  
            <span className="relative z-10 flex items-center gap-2">
              See Services & Solutions
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7" />
            </span>
          </Link>
        
          <Link
            href="/packages"
            className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
          >
            {/* subtle top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
  
            {/* glow effect */}
            <div className="absolute right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />
  
            <span className="relative z-10 flex items-center gap-2">
              See Our Packages
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7" />
            </span>
          </Link> 
        <Link
          href="/about"
          className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
        >
          {/* subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
  
          {/* glow effect */}
          <div className="absolute right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />
  
          <span className="relative z-10 flex items-center gap-2">
            About Us
            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7" />
          </span>
        </Link>
        </div>
    </section>
  );
}