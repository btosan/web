"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative lg:min-h-screen h-full flex items-center justify-center overflow-hidden bg-black">

      {/* Desktop-only video – hidden on mobile */}
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

      {/* Mobile-only video – hidden on desktop */}
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
          <source src="/assets/web/ofashi-mobile.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content – button now links directly to /contact */}
      <div className="relative z-10 w-full">
        <div className="mx-auto w-full px-6 md:px-16 lg:px-12 xl:px-16 2xl:px-20">
          <div className="w-full text-start md:text-center lg:text-start lg:ml-0 lg:mr-auto mt-8 py-12 md:py-16 lg:py-0 md:mt-24 md:mb-16 lg:mb-0 mb-12 lg:mt-0">

            <h1 className="text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold text-white mb-8">
              <span className="tracking-widest text-purple-100">AI-Powered</span>
              <br />
              <span className="tracking-normal inline-block">Digital Solutions</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl xl:text-xl text-white/90 hover:text-[#F0F8FF] mx-auto mb-10 leading-relaxed lg:mx-0 lg:max-w-2xl xl:max-w-3xl xl:w-[90%]">
              We design high-performance websites and custom applications that integrate AI and intelligent automation with great UI/UX to drive measurable growth.
            </p>

            {/* Changed: direct Link instead of button + modal */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-12 py-5 lg:px-12 xl:px-14 lg:py-4 xl:py-5 border-2 lg:border-4 border-white/80 border-l-purple-500/40 border-r-6 border-r-purple-500/40 border-l-6 text-white hover:text-[#e0f4fa] text-lg md:text-xl lg:text-2xl font-semibold md:bg-linear-to-r bg-linear-to-br hover:from-indigo-700/85 hover:via-purple-800/85 hover:to-purple-500/85 hover:border-0 transition shadow-2xl mx-auto lg:mx-0 uppercase hover:cursor-pointer"
            >
              Let’s Work Together
            </Link>

          </div>
        </div>
      </div>

      {/* No more modal / AnimatePresence */}

    </section>
  );
}