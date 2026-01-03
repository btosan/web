"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Urbanist } from 'next/font/google';

const urbanist = Urbanist({
  subsets: ['latin'],         // Add more if needed (e.g., 'latin-ext')
  weight: ['500', '700'],     // Medium and Bold
  // Optional: Use a CSS variable for Tailwind integration
  // variable: '--font-urbanist',
  display: 'swap',            // Better fallback during loading
});


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleExploreNow = () => {
    setOpen(false);
    router.push("/?type=project#enquiry");
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-90 text-gray-100 border-b border-gray-800">
      <div className="mx-auto px-6 md:px-16 py-2 flex items-center justify-between">
        {/* === LOGO (Responsive, Sharp, No Height Impact) === */}
        <div className="flex items-center justify-center ">
          <Link
            href={"/"}
            className="flex items-center justify-center gap-4 md:gap-5 lg:gap-6 w-full relative h-9 md:h-12 lg:h-14 "
          >
            
            <Image 
              src="/logo/ofashi-icon.png" 
              alt=""
              width={100}
              height={100}
              className="h-7 md:h-8 lg:h-9 xl:h-10 w-auto" 
            />
            <p className = {` ${urbanist.className} scale-x-125 w-full py-2 mx-auto flex items-center justify-center gap-0.5 md:gap-1 font-medium md:tracking-wide tracking-widest text-2xl md:text-3xl xl:text-4xl bg-linear-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent transition-colors duration-300`} >
              Ofashi
              {/* ${urbanist.className} */}
            </p>
          </Link>
        </div>

        {/* === DESKTOP MENU === */}
        <ul className="hidden lg:flex items-center xl:space-x-10 lg:space-x-8 text-sm font-medium uppercase">
          <li>
            <Link href="/services" className="hover:text-purple-100 transition tracking-widest">
              Services
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-purple-100 transition tracking-widest">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-purple-100 transition tracking-widest">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/faqs" className="hover:text-purple-100 transition tracking-widest">
              FAQs
            </Link>
          </li>
        </ul>

        {/* === DESKTOP BUTTONS === */}
        <div className="hidden lg:flex items-center lg:space-x-8 xl:space-x-12 space-x-5">

          {/* <button
            onClick={handleExploreNow}
            className="text-base lg:text-lg lg:px-6 lg:py-2 xl:px-8 bg-linear-to-r from-purple-200 via-purple-100 to-purple-50 text-black font-bold rounded-2xl hover:cursor-pointer hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-500 hover:text-white transition-all"
          >
            Enquiry
          </button> */}

            <Link href='/contact' className="text-base lg:text-lg lg:px-10 lg:py-2 xl:px-12 bg-linear-to-r from-purple-200 via-purple-100 to-purple-50 text-black font-bold rounded-2xl hover:cursor-pointer hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-500 hover:text-white transition-all">
            Contact
          </Link>
        </div>

        {/* === MOBILE TOGGLE === */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-purple-100 focus:outline-none"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* === MOBILE MENU === */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-black bg-opacity-95 flex flex-col justify-start items-center space-y-8 z-40"
          >
            {/* Logo + Close */}
            <div className="w-full flex items-center justify-between px-6 pt-2">
              <Image 
                src="/logo/ofashi-icon.png" 
                alt=""
                width={100}
                height={100}
                className="h-6 md:h-8 lg:h-10 w-auto absolute top-6 left-6"
                />

              <div className="flex justify-center w-full">
                <div className="relative w-48 h-32">
                  <p className={`${urbanist.className} w-full mt-6 mx-auto flex items-center justify-center gap-2 font-medium tracking-wider text-xl md:text-2xl lg:text-3xl leading-tight md:tracking-widest bg-linear-to-l from-blue-100 via-purple-200 to-purple-400 bg-clip-text text-transparent transition-colors duration-300`}>
                    Ofashi
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 text-purple-100"
              >
                <X size={30} />
              </button>
            </div>

            {/* Links */}
            <ul className="text-gray-100 text-lg space-y-8 text-center uppercase">
              <li>
                <Link
                  href="/services"
                  onClick={handleCloseMenu}
                  className="hover:text-purple-100 transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  onClick={handleCloseMenu}
                  className="hover:text-purple-100 transition"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={handleCloseMenu}
                  className="hover:text-purple-100 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  onClick={handleCloseMenu}
                  className="hover:text-purple-100 transition"
                >
                  FAQs
                </Link>
              </li>
            </ul>

            {/* Mobile Buttons */}
            <div className="flex flex-col items-center space-y-6 mt-6 w-3/4 uppercase">

              {/* <button
                onClick={handleExploreNow}
                className="w-full uppercase px-6 py-3 bg-linear-to-r from-purple-300 via-purple-200 to-purple-100 text-black text-base font-bold rounded-full hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-500 hover:text-white hover:cursor-pointer transition"
              >
                Enquiry
              </button> */}

              <Link href='/contact' onClick={handleCloseMenu} 
                className="w-full uppercase px-6 py-3 bg-linear-to-r from-purple-300 via-purple-200 to-purple-100 text-black text-base font-bold rounded-full text-center hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-500 hover:text-white hover:cursor-pointer transition"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}