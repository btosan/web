"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/2349123631219?text=Hi%21%20I%27m%20interested%20in%20building%20a%20custom%20website%20or%20web%20or%20mobile%20application%20and%20would%20like%20to%20discuss%20my%20project.",
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  return (
    <section className="relative lg:min-h-screen min-h-[90vh] flex items-center overflow-hidden bg-black">
      {/* Desktop Video */}
      <div className="hidden md:block absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/assets/web/ofashi-desktop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Mobile Video */}
      <div className="md:hidden absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/assets/web/ofashi-desktop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-1 " />
      {/* <div className="absolute inset-0 z-2 bg-linear-to-r from-black/20 via-black/15 to-transparent lg:block hidden" />
      <div className="absolute inset-0 z-2 bg-linear-to-b from-black/10 via-black/5 to-black/15 lg:hidden" /> */}

      {/* Decorative glow */}
      <div className="absolute lg:top-1/4 top-2 left-[-10%] z-2 h-36 w-36 lg:h-72 lg:w-72 rounded-full bg-purple-600/30 lg:bg-purple-700/40 blur-2xl lg:blur-3xl " />
      <div className="absolute bottom-0 right-[-8%] z-2 lg:h-70 h-36 w-36 lg:w-70 rounded-full bg-indigo-600/80 lg:bg-indigo-700/60 blur-3xl" />

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl w-full px-6 md:px-12 lg:px-12 xl:px-16 2xl:px-20">
          <div className="max-w-4xl text-start lg:ml-0 lg:mr-auto pt-12 pb-18 md:pt-36 md:pb-24 lg:py-24">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm md:text-base uppercase tracking-[0.28em] text-gray-300/70 mb-5"
            >
              Ofashi Technology
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl font-semibold text-purple-200 mb-8 leading-[0.95]"
            >
              <span className="tracking-[0.18em] text-white block uppercase">
                AI-Powered
              </span>
              <span className="tracking-normal inline-block mt-2">
                Digital Solutions
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0.92 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="w-20 h-px bg-white/20 mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-white/95 hover:text-[#F0F8FF] leading-relaxed max-w-2xl xl:max-w-3xl mb-10"
            >
              We design high-performance websites and custom applications that
              integrate AI and intelligent automation with exceptional UI/UX to
              drive measurable business growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5"
            >
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center px-10 py-6 md:px-12 md:py-7 lg:px-14 lg:py-8 text-white text-base md:text-lg lg:text-xl font-semibold uppercase tracking-[0.14em] bg-linear-to-r from-indigo-900/5 via-purple-800/5 to-purple-600/5 border-2 lg:border-4 border-purple-200 border-l-transparent border-r-transparent hover:border-transparent hover:from-indigo-700/90 hover:via-purple-800/90 hover:to-purple-500/90 hover:text-[#f7fbff] rounded-md transition-all duration-300 shadow-2xl hover:cursor-pointer"
              >
                Let’s Work Together
              </button>

              <div className="text-xs md:text-sm text-gray-400/75 leading-relaxed max-w-sm">
                Trusted for custom websites, web apps, mobile apps, and AI-powered
                business automation.
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="bg-gray-900 rounded-3xl p-6 md:p-8 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition text-lg"
                aria-label="Close modal"
              >
                ✕
              </button>

              <p className="text-sm uppercase tracking-[0.22em] text-gray-500 mb-3">
                Get Started
              </p>

              <h3 className="text-2xl md:text-3xl font-semibold text-purple-100 mb-4">
                How would you like to continue?
              </h3>

              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                Choose the communication channel that fits your workflow. Start
                a quick conversation on WhatsApp or send a more structured
                enquiry through our contact form.
              </p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="w-full text-left bg-green-500 hover:bg-green-400 text-black font-semibold py-5 px-6 rounded-2xl transition-all hover:cursor-pointer"
                >
                  <span className="block text-lg">Continue on WhatsApp</span>
                  <span className="block text-sm opacity-80 mt-1">
                    Best for fast discussions and immediate follow-up.
                  </span>
                </button>

                <Link
                  href="/contact-form"
                  onClick={() => setOpen(false)}
                  className="w-full border border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-black font-semibold py-5 px-6 rounded-2xl transition-all block"
                >
                  <span className="block text-lg">Use Email Form</span>
                  <span className="block text-sm opacity-80 mt-1">
                    Best for detailed project briefs and structured enquiries.
                  </span>
                </Link>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 text-sm mt-2 hover:text-gray-200 transition"
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