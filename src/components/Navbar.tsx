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
    router.push("/?type=test_drive#enquiry");
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
            <Image
              src="/logo/evlogo.png"
              alt="eVehicles ng Logo"
              width={100}
              height={100}
              className="h-28 w-full md:h-28 lg:h-32 lg:-mt-8 -mt-4"
              priority
            />
          </Link>
        </div>

        {/* === DESKTOP MENU === */}
        <ul className="hidden md:flex items-center space-x-10 text-sm font-medium">
          <li>
            <Link href="/about" className="hover:text-yellow-500 transition tracking-widest">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/models" className="hover:text-yellow-500 transition tracking-widest">
              Models
            </Link>
          </li>
          <li>
            <Link href="/faqs" className="hover:text-yellow-500 transition tracking-widest">
              FAQs
            </Link>
          </li>
        </ul>

        {/* === DESKTOP BUTTONS === */}
        <div className="hidden md:flex items-center lg:space-x-12 space-x-5">
          <Link href='/contact' className="text-base lg:text-lg px-6 py-2 lg:px-8 border border-yellow-500 text-yellow-500 font-semibold rounded-2xl hover:cursor-pointer hover:bg-yellow-500 hover:text-black transition-all">
            Contact
          </Link>
          <button
            onClick={handleExploreNow}
            className="text-base lg:text-lg px-6 py-2 lg:px-8 bg-yellow-500 text-black font-bold rounded-2xl hover:cursor-pointer hover:bg-yellow-400 transition-all"
          >
            Explore Now
          </button>
        </div>

        {/* === MOBILE TOGGLE === */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-yellow-500 focus:outline-none"
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
                  <Image
                    src="/logo/evlogo.png"
                    alt="eVehicles ng Logo"
                    fill
                    sizes="192px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 text-yellow-500"
              >
                <X size={30} />
              </button>
            </div>

            {/* Links */}
            <ul className="text-gray-100 text-lg space-y-8 text-center">
              <li>
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="hover:text-yellow-500 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/models"
                  onClick={() => setOpen(false)}
                  className="hover:text-yellow-500 transition"
                >
                  Models
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  onClick={() => setOpen(false)}
                  className="hover:text-yellow-500 transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>

            {/* Mobile Buttons */}
            <div className="flex flex-col items-center space-y-6 mt-6 w-3/4">
              <Link href='/contact' className="w-full px-6 py-3 border border-yellow-500 text-yellow-500 text-base font-semibold rounded-full hover:bg-yellow-500 hover:text-black transition">
                Contact
              </Link>
              <button
                onClick={handleExploreNow}
                className="w-full px-6 py-3 bg-yellow-500 text-black text-base font-bold rounded-full hover:bg-yellow-400 transition"
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
