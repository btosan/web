"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/2348038168949?text=Hi%21%20I%27m%20interested%20in%20building%20a%20custom%20website%20or%20web%20application%20and%20would%20like%20to%20discuss%20my%20project.",
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Full-screen Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      >
        <source src="/assets/web/besttosan_video_from_singularity.mp4" type="video/mp4" />
      </video>

      <div className="container relative z-10 mx-auto px-6">
        <div
          className="
            max-w-7xl 
            mx-auto 
            text-center 
            md:text-center 
            lg:text-left 
            lg:max-w-4xl 
            lg:mx-0 
            lg:ml-0 
            lg:mr-auto
            -mt-32
            md:-mt-4
            lg:mt-0
          "
        >
          {/* Headline */}
          <h1 className="
            text-5xl 
            md:text-7xl 
            lg:text-8xl 
            xl:text-9xl 
            font-semibold
            
            text-white 
            mb-8
            ">
              <span className="tracking-widest text-purple-100">
                 Custom 
              </span>
            
            <br />
            <span className="tracking-normal inline-block  ">
            Web Apps
            </span>
        </h1>

          {/* Subtext */}
          <p className="
            text-lg 
            md:text-xl
            lg:text-2xl 
            text-white/90
            hover:text-[#F0F8FF] 
            mx-auto 
            mb-12 
            leading-relaxed 
            lg:mx-0 

            lg:max-w-2xl
            xl:max-w-3xl
            xl:w-[78%]
          ">
            We build professional websites and bespoke web apps that are hand-coded, AI-ready, fast, scalable, and built to convert.
          </p>

          {/* Primary CTA Button — Now opens the modal */}
          <button
            onClick={() => setOpen(true)}
            className="
              inline-flex 
              items-center 
              justify-center 
              px-8 
              py-4 
              lg:px-10 
              lg:py-5
              xl:py-6 
              border
              border-[#e0f4fa]/70 
              border-r-purple-500/50
              border-r-8
              border-l-indigo-500/50
              border-l-8
              text-white 
              hover:text-[#e0f4fa]
              text-lg 
              md:text-xl 
              lg:text-2xl 
              xl:text-3xl 
              font-semibold 
              rounded-full 
              hover:bg-linear-to-r
            hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-500
              hover:border-0
              transition 
              shadow-2xl
              mx-auto 
              lg:mx-0
            "
          >
            Let’s Build Your Project
          </button>

          {/* Secondary CTA Text */}
          <p className="
            md:mt-8 
            mt-4
            text-xs
            lg:text-lg 
            text-indigo-100/70 
            hover:text-[#e0f4fa] 
            transition-colors
            mx-auto 
            lg:mx-0
          ">
           <a href="https://wa.me/2348038168949" className="no-underline hover:underline hover:underline-offset-8  text-purple-100/90">Call or WhatsApp</a>
          </p>
        </div>
      </div>

      {/* Exact same modal from EnquirySection */}
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
              {/* Close Button */}
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

                <Link
                  href="/contact-form"
                  onClick={() => setOpen(false)}
                  className="border border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-black font-semibold py-4 rounded-xl transition-all text-center block"
                >
                  Use Email Form
                </Link>

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