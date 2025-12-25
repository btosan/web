"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneCallIcon, Mail, MapPin, MessageCircle, X } from "lucide-react";
import GoogleEnquiryForm from "./GoogleEnquiryForm";

export default function ContactSection() {
  const [open, setOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/2348080548263?text=Hi%21%20I%27m%20interested%20in%20building%20a%20custom%20website%20or%20web%20application%20and%20would%20like%20to%20discuss%20my%20project.",
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    type: "quote" as "quote" | "consultation",
  });

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

        {/* Right: Both Forms */}
        <div className="space-y-12">
          {/* WhatsApp Quick Form */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">
            <h3 className="text-3xl font-bold text-center mb-8 text-purple-100">
              Request a Quote or Consultation
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* ... all inputs unchanged ... */}

              <div className="md:col-span-2 flex justify-center gap-10 my-4">
                {/* ... radio buttons unchanged ... */}
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

          {/* Google Enquiry Form */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">
            <GoogleEnquiryForm />
          </div>
        </div>
      </div>

      {/* Shared Modal for future use if needed */}
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
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-purple-100 mb-6">
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
                  href="tel:+2348038168949"
                  className="relative border border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-black font-semibold py-4 rounded-xl transition-all text-center block overflow-hidden group"
                >
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                    Call Us
                  </span>

                  <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    +234 803 816 8949
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
    </section>
  );
}