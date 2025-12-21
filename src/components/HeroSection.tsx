"use client";

import { motion } from "framer-motion";

const HeroSection = () => {
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
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
              <span className="tracking-widest">
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
            Hand-coded, AI-ready websites that load fast, scale effortlessly, and convert.
          </p>

          {/* Primary CTA Button */}
          <motion.a
            href="https://wa.me/2348038168949" // Updated with your real number
            target="_blank"
            rel="noopener noreferrer"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let’s Build Your Project
          </motion.a>

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
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;