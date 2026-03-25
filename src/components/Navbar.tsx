"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CldImage } from 'next-cloudinary';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Urbanist } from 'next/font/google';
import {
  Globe, ShieldCheck, TrendingUp, Smartphone, Sparkles, Cpu,
  BookOpen, HelpCircle, FileText, Lightbulb,
  Menu, X, ChevronDown, CircleUser, LogOut, User, LayoutDashboard
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession, signOut } from "next-auth/react";

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
});

const solutions = [
  {
    icon: Globe,
    name: "High-Performance & Search-Optimized",
    title: "Custom Websites",
    description: "Custom-built websites designed for speed, SEO visibility, and seamless user experience — turning your online presence into a powerful business asset.",
    href: "/services/custom-websites",
  },
  {
    icon: Smartphone,
    name: "Scalable Platforms & Dashboards",
    title: "Full-Stack Apps",
    description: "Robust web and mobile applications built with modern technologies — from customer portals to complete business systems.",
    href: "/services/full-stack-apps",
  },
  {
    icon: Cpu,
    name: "Smart Features & Intelligence",
    title: "AI Integration",
    description: "We embed AI into your products and platforms — chatbots, recommendation systems, data insights, and intelligent user experiences.",
    href: "/services/ai-integration",
  },
  {
    icon: Sparkles,
    name: "Systems That Work Automatically",
    title: "AI Automation",
    description: "Automate lead management, customer communication, data processing, and internal workflows with intelligent, time-saving systems.",
    href: "/services/ai-automation",
  },
  {
    icon: ShieldCheck,
    name: "Intuitive, Conversion-Focused Experiences",
    title: "UI/UX Design",
    description: "Exceptional interface and user experience design that improves usability, builds trust, and turns visitors into engaged customers.",
    href: "/services/ui-ux-design",
  },
  {
    icon: TrendingUp,
    name: "Visibility, Positioning & Growth",
    title: "Digital Strategy",
    description: "Strategic branding, digital presence, and performance-driven marketing systems that attract the right audience and drive measurable business growth.",
    href: "/services/digital-branding-marketing",
  },
];

const insightsItems = [
  {
    icon: BookOpen,
    name: "Latest Articles & Trends",
    title: "Blog",
    description: "In-depth articles, industry trends, tech insights, and practical tips to help you grow your business in the digital age.",
    href: "/learn/blog",
  },
  {
    icon: HelpCircle,
    name: "Quick Answers to Common Questions",
    title: "FAQs",
    description: "Clear, concise answers to the most frequently asked questions about our services, process, pricing, and timelines.",
    href: "/learn/faqs",
  },
  {
    icon: FileText,
    name: "Real Results & Success Stories",
    title: "Case Studies",
    description: "Detailed breakdowns of projects we’ve delivered — challenges, solutions, technologies used, and measurable outcomes.",
    href: "/learn/case-studies",
  },
  {
    icon: Lightbulb,
    name: "Practical Tools & In-depth Guides",
    title: "Guides & Resources",
    description: "Step-by-step guides, checklists, templates, and free resources to help you make better decisions and move faster.",
    href: "/learn/guides",
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);

  const [showProfilePanel, setShowProfilePanel] = useState(false)

  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const router = useRouter();

  const handleCloseMenu = () => {
    setOpen(false);
    setServicesOpen(false);
    setInsightsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-90 text-gray-100 border-b lg:border-gray-800 border-gray-800/5">
      <div className="mx-auto px-6 md:px-16 lg:px-12 xl:px-16 2xl:px-20 py-3 lg:py-5 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 md:gap-4 2xl:gap-6 lg:gap-4 w-full relative h-9 md:h-12 lg:h-14"
          >
            <Image
              src="/logo/ofashi-icon.png"
              alt=""
              width={100}
              height={100}
              className="h-7 md:h-8 lg:h-9 w-auto shadow-2xl shadow-white"
            />
            <p
              className={`${urbanist.className} scale-x-110 py-2 flex items-center gap-0.5 md:gap-1 font-medium md:tracking-wide tracking-wider text-xl lg:text-2xl 2xl:text-3xl bg-linear-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent transition-colors duration-300`}
            >
              Ofashi
            </p>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex items-center xl:space-x-10 lg:space-x-8 text-lg lg:text-base 2xl:text-xl font-medium">
          <li
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <div className="flex items-center justify-center gap-1 hover:text-purple-200 transition tracking-wider hover:underline hover:underline-offset-12 decoration-2 decoration-purple-300 cursor-pointer">
              SERVICES
              <ChevronDown className={`w-6 h-6 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </div>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-screen max-w-none"
                >
                  <div className="bg-gray-950 border-b-2 border-t-2 border-gray-700/80 shadow-xl shadow-gray-800">
                    <div className="max-w-6xl mx-auto py-12 px-8 xl:px-12 md:pl-32">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-32">
                        {solutions.map((solution, idx) => (
                          <Link
                            key={idx}
                            href={solution.href}
                            onClick={handleCloseMenu}
                            className="group flex flex-col px-8 py-6 rounded-xl border border-purple-900/50 bg-purple-900/5 hover:bg-purple-950/50 hover:border-purple-500/40 transition-all duration-300"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-9 h-9 rounded-lg bg-purple-900/60 flex items-center justify-center text-purple-200 group-hover:text-purple-100 transition-colors">
                                {React.createElement(solution.icon, { size: 24 })}
                              </div>
                              <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-200 transition-colors">
                                {solution.title}
                              </h3>
                            </div>
                            <p className="text-gray-300 text-sm lg:text-base leading-relaxed line-clamp-3">
                              {solution.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li>
            <Link
              href="/projects"
              className="uppercase hover:text-purple-200 transition tracking-wider hover:underline hover:underline-offset-12 decoration-2 decoration-purple-300"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="uppercase hover:text-purple-200 transition tracking-wider hover:underline hover:underline-offset-12 decoration-2 decoration-purple-300"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className="uppercase hover:text-purple-200 transition tracking-wider hover:underline hover:underline-offset-12 decoration-2 decoration-purple-300"
            >
              Pricing
            </Link>
          </li>

          <li
            className="relative"
            onMouseEnter={() => setInsightsOpen(true)}
            onMouseLeave={() => setInsightsOpen(false)}
          >
            <div className="flex items-center justify-center gap-1 hover:text-purple-200 transition tracking-wider hover:underline hover:underline-offset-12 decoration-2 decoration-purple-300 cursor-pointer uppercase">
              LEARN
              <ChevronDown className={`w-6 h-6 transition-transform ${insightsOpen ? 'rotate-180' : ''}`} />
            </div>

            <AnimatePresence>
              {insightsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-0 right-0 -translate-x-1/2 top-full mt-4 w-screen"
                >
                  <div className="bg-gray-950 border-b-2 border-t-2 border-gray-700/80 shadow-xl shadow-gray-800">
                    <div className="2xl:max-w-6xl md:max-w-7xl mx-auto py-12 px-8 2xl:px-32 md:pr-56">
                      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8 place-items-center">
                        {insightsItems.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={handleCloseMenu}
                            className="group flex flex-col px-8 py-6 rounded-xl border border-purple-900/50 bg-purple-900/5 hover:bg-purple-950/50 hover:border-purple-500/40 transition-all duration-300"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-9 h-9 rounded-lg bg-purple-900/60 flex items-center justify-center text-purple-200 group-hover:text-purple-100 transition-colors">
                                {React.createElement(item.icon, { size: 24 })}
                              </div>
                              <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-200 transition-colors">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-gray-300 text-sm lg:text-base leading-relaxed line-clamp-3">
                              {item.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* DESKTOP RIGHT SIDE — Contact + Auth */}
        <div className="hidden lg:flex items-center lg:space-x-8 2xl:space-x-12 space-x-5">
          <Link
            href="/contact"
            className="tracking-wider uppercase text-lg lg:text-base 2xl:text-xl lg:px-6 lg:py-2 xl:py-3 xl:px-10 bg-linear-to-bl hover:from-purple-200 hover:via-purple-100 hover:to-purple-50 hover:text-black font-medium hover:cursor-pointer from-indigo-700 via-purple-800 to-purple-500 text-white transition-all"
          >
            Contact
          </Link>

          {isAuthenticated && user ? (
            <div className="relative group">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-purple-600/50 shadow-md shadow-purple-950/30 cursor-pointer">
                  {user.image ? (
                      <CldImage
                        src={user.image}
                        alt={user.name || "User"}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-full"
                      />
                  ) : (
                    <div className="w-full h-full bg-purple-900/70 flex items-center justify-center text-purple-200 font-semibold text-lg uppercase">
                      {user.name?.[0] || "?"}
                    </div>
                  )}
                </div>
              </div>

              {/* Hover panel — styled close to Header.jsx but in purple theme */}
              <div
                className="
                  absolute -right-4 top-full mt-1 w-64
                  bg-gray-950 border border-purple-800/60 rounded-xl
                  shadow-2xl shadow-purple-950/50
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto
                "
              >
                <div className="px-5 py-4 border-b border-purple-800/40">
                  <p className="font-medium text-purple-100 truncate">
                    {user.name || user.email || "Account"}
                  </p>
                  {user.email && (
                    <p className="text-sm text-purple-300/80 truncate mt-0.5">{user.email}</p>
                  )}
                </div>

                <div className="py-1.5 divide-y divide-purple-800/30">
                  <Link
                    href="/profile"
                    className="block px-5 py-2.5 text-sm text-purple-200 hover:bg-purple-950/70 hover:text-purple-100 transition-colors"
                    onClick={handleCloseMenu}
                  >
                    Profile
                  </Link>

                  <Link
                    href="/dashboard"
                    className="block px-5 py-2.5 text-sm text-purple-200 hover:bg-purple-950/70 hover:text-purple-100 transition-colors"
                    onClick={handleCloseMenu}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => signOut({ callbackUrl: "/signin" })}
                    className="w-full text-left px-5 py-2.5 text-sm text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>

                {/* Arrow */}
                <div className="absolute right-5 -top-1.5 w-3 h-3 bg-gray-950 border-l border-t border-purple-800/60 rotate-45" />
              </div>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/signin"
                  className="flex items-center gap-2 text-purple-200 hover:text-purple-100 transition-colors"
                >
                  <CircleUser size={28} strokeWidth={1.7} />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={12}
                className="bg-purple-700 text-white text-sm font-medium px-4 py-2.5 rounded-md border-none shadow-lg"
              >
                Login or Register
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-purple-100 focus:outline-none"
        >
          {open ? <X className="h-8 md:h-10 w-auto text-purple-300" /> : <Menu className="h-8 md:h-10 w-auto" />}
          <span className="sr-only">open or close menu</span>
        </button>
      </div>

      {/* MOBILE MENU — your original structure preserved */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-linear-to-b from-black via-gray-900 to-gray-800 bg-opacity-95 flex flex-col justify-start items-center space-y-8 z-40 h-full overflow-y-auto"
          >
            {/* Logo + close */}
            <div className="w-full flex items-center justify-between px-6 pt-2 relative">
              <Image
                src="/logo/ofashi-icon.png"
                alt=""
                width={100}
                height={100}
                className="h-7 md:h-8 lg:h-9 w-auto absolute top-6 left-6"
              />

              <div className="flex justify-center w-full">
                <div className="relative w-48 h-32">
                  <p
                    className={`${urbanist.className} w-full mt-6 mx-auto flex items-center justify-center gap-2 font-semibold tracking-wider text-xl md:text-2xl leading-tight md:tracking-wider bg-linear-to-l from-white via-purple-50 to-purple-100 bg-clip-text text-transparent transition-colors duration-300`}
                  >
                    Ofashi
                  </p>
                </div>
              </div>

              <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-purple-100">
                <X className="h-8 md:h-10 w-auto text-purple-300" />
              </button>
            </div>

            {/* Links with accordions — original logic */}
            <ul className="flex flex-col items-center justify-center text-gray-100 text-lg space-y-8 mx-auto w-full px-6">
              <li className="w-full">
                <button
                  className="w-full mx-auto flex items-center justify-center gap-1 hover:text-purple-100 transition"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  SERVICES
                  <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4 space-y-3 text-center text-lg text-purple-100"
                    >
                      {solutions.map((solution, idx) => (
                        <li key={idx} className="py-1.5">
                          <Link
                            href={solution.href}
                            onClick={handleCloseMenu}
                            className="hover:text-purple-200 transition underline underline-offset-8 decoration-purple-400/60"
                          >
                            {solution.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <Link href="/projects" onClick={handleCloseMenu} className="hover:text-purple-100 transition uppercase">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={handleCloseMenu} className="hover:text-purple-100 transition uppercase">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" onClick={handleCloseMenu} className="hover:text-purple-100 transition uppercase">
                  Pricing
                </Link>
              </li>

              <li className="w-full">
                <button
                  className="w-full mx-auto flex items-center justify-center gap-1 hover:text-purple-100 transition uppercase"
                  onClick={() => setInsightsOpen(!insightsOpen)}
                >
                  LEARN
                  <ChevronDown className={`w-5 h-5 transition-transform ${insightsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {insightsOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4 space-y-3 text-center text-lg text-purple-100"
                    >
                      {insightsItems.map((item, idx) => (
                        <li key={idx} className="py-1.5">
                          <Link
                            href={item.href}
                            onClick={handleCloseMenu}
                            className="hover:text-purple-200 transition underline underline-offset-8 decoration-purple-400/60"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            </ul>

            {/* Buttons + Auth in mobile */}
            <div className="flex flex-col items-center space-y-6 mt-8 w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/4 uppercase">
              <Link
                href="/contact"
                onClick={handleCloseMenu}
                className="w-full uppercase px-6 py-3.5 bg-linear-to-tr from-indigo-700 via-purple-800 to-purple-500 hover:from-purple-300 hover:via-purple-200 hover:to-purple-100 hover:text-black text-base font-bold text-center text-white hover:cursor-pointer transition shadow-md"
              >
                Contact
              </Link>

              {isAuthenticated && user ? (
                <div className="relative w-full pt-6 border-t border-purple-700/40">
                  {/* Trigger - avatar + name */}
                  <button
                    type="button"
                    onClick={() => setShowProfilePanel(!showProfilePanel)}
                    className="flex items-center justify-center gap-4 w-full text-left hover:opacity-90 transition-opacity focus:outline-none"
                  >
                    <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-purple-600/60 shadow-lg shrink-0">
                      {user.image ? (
                        <CldImage
                          src={user.image}
                          alt={user.name || "User"}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-purple-900/70 flex items-center justify-center text-purple-100 font-bold text-2xl uppercase">
                          {user.name?.[0] || "?"}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-purple-50 truncate">
                        {user.name || "User"}
                      </p>
                      {user.email && (
                        <p className="text-sm text-purple-300/90 truncate">{user.email}</p>
                      )}
                    </div>
                  </button>

                  {/* Profile Panel - appears as overlay-style at bottom */}
                  {showProfilePanel && (
                    <>
                      {/* Backdrop - click outside to close */}
                      <div
                        className="fixed inset-0 z-30 bg-black/30"
                        onClick={() => setShowProfilePanel(false)}
                      />

                      {/* Panel itself */}
                      <div
                        className="
                          absolute left-6 right-6 bottom-16 z-40
                          bg-gray-950 rounded-xl border border-purple-800/50
                          shadow-2xl shadow-purple-950/60
                          overflow-hidden
                        "
                      >
                        {/* Close X button */}
                        <button
                          onClick={() => setShowProfilePanel(false)}
                          className="absolute top-3 right-3 text-purple-300 hover:text-purple-100 p-1.5 rounded-full hover:bg-purple-900/40 transition"
                        >
                          <X size={20} />
                        </button>

                        <div className="px-5 pt-5 pb-2 border-b border-purple-800/40">
                          <p className="font-medium text-purple-50 truncate text-lg">
                            {user.name || user.email || "Account"}
                          </p>
                        </div>

                        <div className="py-2 divide-y divide-purple-800/30 text-sm">
                          <Link
                            href={user.role === "ADMIN" ? "/admin/profile" : "/profile"}
                            className="block px-5 py-3.5 text-purple-200 hover:bg-purple-950/60 hover:text-purple-100 transition-colors"
                            onClick={() => {
                              setShowProfilePanel(false);
                              handleCloseMenu();
                            }}
                          >
                            Profile
                          </Link>

                          <Link
                            href={user.role === "ADMIN" ? "/admin/monitoring" : "/dashboard"}
                            className="block px-5 py-3.5 text-purple-200 hover:bg-purple-950/60 hover:text-purple-100 transition-colors"
                            onClick={() => {
                              setShowProfilePanel(false);
                              handleCloseMenu();
                            }}
                          >
                            Dashboard / Monitoring
                          </Link>

                          {user.role === "ADMIN" && (
                            <Link
                              href="/admin"
                              className="block px-5 py-3.5 text-purple-200 hover:bg-purple-950/60 hover:text-purple-100 transition-colors"
                              onClick={() => {
                                setShowProfilePanel(false);
                                handleCloseMenu();
                              }}
                            >
                              Admin Panel
                            </Link>
                          )}

                          <button
                            onClick={() => {
                              signOut({ callbackUrl: "/signin" });
                              setShowProfilePanel(false);
                              handleCloseMenu();
                            }}
                            className="w-full text-left px-5 py-3.5 text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>

                        {/* Tiny arrow pointing up to avatar area */}
                        <div className="absolute left-10 -top-2 w-4 h-4 bg-gray-950 border-l border-t border-purple-800/50 rotate-45" />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/signin"
                  onClick={handleCloseMenu}
                  className="w-full uppercase px-6 py-3.5 bg-purple-900/50 hover:bg-purple-800/70 text-purple-200 hover:text-purple-100 font-medium transition flex items-center justify-center gap-3 border border-purple-700/50 mt-4"
                >
                  <CircleUser size={24} />
                  Login / Register
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}