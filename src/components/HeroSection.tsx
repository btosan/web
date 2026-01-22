"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/2348080548263?text=Hi%21%20I%27m%20interested%20in%20building%20a%20custom%20website%20or%20web%20application%20and%20would%20like%20to%20discuss%20my%20project.",
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  return (
    <section className="relative lg:min-h-screen h-full flex items-center justify-center overflow-hidden bg-black">
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
            text-start 
            md:text-center 
            lg:text-start 
            lg:max-w-4xl 
            lg:mx-0 
            lg:ml-0 
            lg:mr-auto
            mt-8
            py-12
            md:py-16
            lg:py-0
            md:mt-24
            md:mb-16
            lg:mb-0
            mb-12
            lg:mt-0
          "
        >
          {/* Headline */}
          <h1 className="
            text-4xl 
            md:text-6xl 
            lg:text-7xl 
            xl:text-8xl 
            font-semibold
            
            text-white 
            mb-8
            ">
              <span className="tracking-widest text-purple-100 font-bold">
                 AI-Powered
              </span>
            
            <br />
            <span className="tracking-normal inline-block font-bold  ">
            Digital Solutions
            </span>
        </h1>

          {/* Subtext */}
          <p className="
            text-base 
            md:text-lg
            lg:text-xl
            xl:text-2xl 
            text-white/90
            hover:text-[#F0F8FF] 
            mx-auto 
            mb-12 
            leading-relaxed 
            lg:mx-0 

            lg:max-w-2xl
            xl:max-w-3xl
            xl:w-[80%]
          ">
            We build high-performance websites and custom apps with exceptional UI/UX, AI integration, and automation for measurable business impact.
          
          </p>

          {/* Primary CTA Button — Now opens the modal */}
          <button
            onClick={() => setOpen(true)}
            className="
              inline-flex 
              items-center 
              justify-center 
              px-12 
              py-5 
              lg:px-12 
              xl:px-14
              lg:py-5
              xl:py-6 
              border-2
              lg:border-4
              border-white/80 
              border-l-purple-500/40
              border-r-6
              border-r-purple-500/40
              border-l-6
              text-white 
              hover:text-[#e0f4fa]
              text-lg 
              md:text-xl 
              lg:text-2xl 
              xl:text-3xl 
              font-semibold 

              md:bg-linear-to-r bg-linear-to-br
            hover:from-indigo-700/85 hover:via-purple-800/85 hover:to-purple-500/85
              hover:border-0
              transition 
              shadow-2xl
              mx-auto 
              lg:mx-0 uppercase hover:cursor-pointer
            "
          >
            Let’s Work Together
          </button>

          {/* Secondary CTA Text */}
          {/* <p className="
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
           <a href="https://wa.me/2348080548263" className="no-underline hover:underline hover:underline-offset-8  text-purple-100/90">Call or WhatsApp</a>
          </p> */}
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