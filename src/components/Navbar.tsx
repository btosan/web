"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

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
            className="flex items-center justify-center w-full relative h-10 md:h-12 lg:h-14 "
          >
            <p className="w-full py-2 mx-auto flex items-center justify-center gap-2 font-semibold tracking-wider text-xl md:text-2xl lg:text-3xl leading-tight md:tracking-widest bg-linear-to-l from-blue-100 via-purple-100 to-purple-300 bg-clip-text text-transparent transition-colors duration-300">
              <span className="">BT</span>
              <span className="uppercase">WebTech</span>
            </p>
          </Link>
        </div>

        {/* === DESKTOP MENU === */}
        <ul className="hidden md:flex items-center space-x-10 text-sm font-medium">
          <li>
            <Link href="/about" className="hover:text-purple-100 transition tracking-widest">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-purple-100 transition tracking-widest">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/faqs" className="hover:text-purple-100 transition tracking-widest">
              FAQs
            </Link>
          </li>
        </ul>

        {/* === DESKTOP BUTTONS === */}
        <div className="hidden md:flex items-center lg:space-x-12 space-x-5">
          <Link href='/contact' className="text-base lg:text-lg px-6 py-2 lg:px-8 border border-purple-100 text-purple-100 font-semibold rounded-2xl hover:cursor-pointer hover:bg-linear-to-r from-purple-200 via-purple-100 to-purple-50 hover:text-black transition-all">
            Contact
          </Link>
          <button
            onClick={handleExploreNow}
            className="text-base lg:text-lg px-6 py-2 lg:px-8 bg-linear-to-r from-purple-200 via-purple-100 to-purple-50 text-black font-bold rounded-2xl hover:cursor-pointer hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-500 hover:text-white transition-all"
          >
            Explore Now
          </button>
        </div>

        {/* === MOBILE TOGGLE === */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-purple-100 focus:outline-none"
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
              <div className="flex justify-center w-full">
                <div className="relative w-48 h-32">
                  <p className="w-full mt-6 mx-auto flex items-center justify-center gap-2 font-semibold tracking-wider text-xl md:text-2xl lg:text-3xl leading-tight md:tracking-widest bg-linear-to-l from-blue-100 via-purple-100 to-purple-300 bg-clip-text text-transparent transition-colors duration-300">
                    <span className="">BT</span>
                    <span className="uppercase">WebTech</span>
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
            <ul className="text-gray-100 text-lg space-y-8 text-center">
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
                  href="/projects"
                  onClick={handleCloseMenu}
                  className="hover:text-purple-100 transition"
                >
                  Projects
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
              <Link href='/contact' onClick={handleCloseMenu} className="w-full px-6 py-3 border border-purple-600/60 text-purple-100 text-center text-base font-semibold rounded-full bg-purple-800/80 hover:bg-linear-to-r hover:from-purple-100 hover:via-purple-100 hover:to-indigo-200 hover:text-black transition">
                Contact
              </Link>
              <button
                onClick={handleExploreNow}
                className="w-full uppercase px-6 py-3 bg-linear-to-r from-purple-300 via-purple-200 to-purple-100 text-black text-base font-bold rounded-full hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-500 hover:text-white hover:cursor-pointer transition"
              >
                Explore Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}