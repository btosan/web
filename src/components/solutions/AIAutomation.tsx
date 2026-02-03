"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Building2,
  Rocket,
  User,
  Home,
} from "lucide-react";

import OurProcess from "../OurProcess";
import TechStack from "../TechStack";
import GoogleEnquiryLight from "../GoogleEnquiryLight";

type ServiceCard = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

type CarouselCard = {
  title: string;
  content: string;
  image: string;
};

// === Services for AI Automation ===
const services: ServiceCard[] = [
  {
    title: "Automated Lead Management",
    description:
      "AI systems to automatically track, qualify, and assign leads to the right team members, ensuring no opportunity is missed.",
    href: "/contact",
    icon: <Briefcase size={42} className="text-purple-400" />,
  },
  {
    title: "Customer Communication Automation",
    description:
      "Automate emails, notifications, follow-ups, and chat interactions using AI for faster, more personalized customer engagement.",
    href: "/contact",
    icon: <Rocket size={42} className="text-purple-400" />,
  },
  {
    title: "Data Processing & Reporting",
    description:
      "Automatically gather, clean, and analyze data, delivering structured insights and dashboards without manual effort.",
    href: "/contact",
    icon: <Building2 size={42} className="text-purple-400" />,
  },
  {
    title: "Internal Workflow Automation",
    description:
      "Streamline repetitive internal tasks like approvals, document routing, and scheduling, improving productivity with AI-driven workflows.",
    href: "/contact",
    icon: <User size={42} className="text-purple-400" />,
  },
  {
    title: "Smart Scheduling & Notifications",
    description:
      "Automate reminders, task assignments, and calendar events intelligently to optimize team efficiency.",
    href: "/contact",
    icon: <Home size={42} className="text-purple-400" />,
  },
  {
    title: "AI-Powered Task Management",
    description:
      "Monitor, prioritize, and execute tasks automatically based on AI-driven rules, historical patterns, and user behavior.",
    href: "/contact",
    icon: <Rocket size={42} className="text-purple-400" />,
  },
];

// === Carousel for AI Automation ===
const carouselData: CarouselCard[] = [
  {
    title: "Automated Lead Flow",
    content:
      "AI-driven lead management that sorts, qualifies, and assigns leads automatically for maximum conversion.",
    image: "/assets/automation/auto1.jpg",
  },
  {
    title: "Smart Customer Interactions",
    content:
      "Automated messaging and chat interactions tailored to each user for faster, personalized engagement.",
    image: "/assets/automation/auto2.jpg",
  },
  {
    title: "Intelligent Data Processing",
    content:
      "Automatically gather, clean, and analyze data to produce actionable insights and dashboards.",
    image: "/assets/automation/auto3.jpg",
  },
  {
    title: "Workflow Optimization",
    content:
      "Streamline internal processes, approvals, and task assignments with AI-powered automation.",
    image: "/assets/automation/auto4.jpg",
  },
  {
    title: "Task & Notification Automation",
    content:
      "AI manages task scheduling, reminders, and notifications intelligently to optimize team efficiency.",
    image: "/assets/automation/auto5.jpg",
  },
  {
    title: "End-to-End AI Automation",
    content:
      "Complete automation solutions for repetitive processes, freeing teams to focus on high-value work.",
    image: "/assets/automation/auto6.jpg",
  },
];

export default function AIAutomationSection() {
  const [showForm, setShowForm] = useState(false);
  const [index, setIndex] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const prev = () =>
    setIndex((i) => (i === 0 ? carouselData.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === carouselData.length - 1 ? 0 : i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) next();
    if (distance < -minSwipeDistance) prev();
  };

  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* ================= HERO ================= */}
      <div className="relative isolate">
        <Image
          src="/assets/automation/automation-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 lg:bg-black/50 bg-black/80 -z-10" />
        <div className="relative z-10 mx-auto w-full px-6 md:px-16 lg:px-12 xl:px-16 2xl:px-20 py-24 grid md:grid-cols-2 gap-16 items-center-safe">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Systems That Work Automatically
            </h1>
            <p className="mt-6 text-gray-200 text-lg">
              Automate lead management, customer communication, data processing, and internal workflows with intelligent, time-saving systems.
            </p>
          </div>

          {!showForm ? (
            <div
              onClick={() => setShowForm(true)}
              className="
                bg-linear-to-tl from-gray-800/40 via-gray-900/40 to-gray-950/40
                p-12 md:p-16 rounded-3xl shadow-2xl border-2 border-gray-400/90
                cursor-pointer transition-all duration-300 dhadow-sm shadow-gray-400
                hover:scale-[1.02] hover:shadow-purple-500/20
                text-center text-white flex flex-col justify-center
                min-h-105
              "
            >
              <h2 className="text-3xl md:text-4xl font-bold">Start Your Automation Project</h2>
              <p className="mt-4 text-purple-100 text-lg max-w-md mx-auto">
                Tell us about your idea and get a professional estimate within 24 hours.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 bg-white text-purple-900 px-6 py-3 rounded-xl font-semibold mx-auto">
                Let’s Build Your System <ArrowRight size={20} />
              </div>
            </div>
          ) : (
            <div className="relative animate-fadeIn">
              <button
                onClick={() => setShowForm(false)}
                className="absolute -top-4 -right-4 bg-white text-red-500 font-bold hover:cursor-pointer w-9 h-9 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition"
              >
                ✕
              </button>
              <GoogleEnquiryLight />
            </div>
          )}
        </div>
      </div>

      {/* ================= SERVICES GRID ================= */}
      <div className="bg-gray-900 text-purple-50 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Our AI Automation Services</h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Intelligent systems that automate tasks, communication, and workflows for efficiency and speed.
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 mt-16">
            {services.map((service) => (
              <div
                key={service.title}
                className="group relative bg-linear-to-tl from-gray-900/10 via-gray-950 to-black p-8 md:p-10 rounded-2xl border border-gray-600 hover:border-gray-500 transition-all duration-300 shadow-sm shadow-gray-400/90 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-700/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                <p className="text-gray-400 mt-4 leading-relaxed">{service.description}</p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 mt-6 uppercase text-gray-300 group-hover:text-purple-200 transition"
                >
                  Get started <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= CAROUSEL ================= */}
      <div className="py-20 px-4 md:px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl uppercase lg:tracking-wider font-bold">
            Types of AI Automation We Build
          </h2>
          <p className="mt-4 text-gray-200">
            From lead management to internal workflows — all automated intelligently.
          </p>

          <div className="relative mt-16">
            <div className="hidden lg:flex justify-center items-center gap-16 mt-16 mb-4">
              <button
                onClick={prev}
                className="flex items-center gap-3 hover:text-gray-300 hover:cursor-pointer text-purple-100 transition"
              >
                <ChevronLeft size={40} strokeWidth={1.5} />
                <span className="text-lg tracking-wide">Previous</span>
              </button>

              <button
                onClick={next}
                className="flex items-center gap-3 text-purple-200 hover:text-white hover:cursor-pointer transition"
              >
                <span className="text-lg tracking-wide">Next</span>
                <ChevronRight size={40} strokeWidth={1.5} />
              </button>
            </div>

            <div
              className="grid md:grid-cols-2 gap-10 items-center bg-gray-900 rounded-2xl md:p-8 p-0"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Image
                src={carouselData[index].image}
                alt="AI automation features"
                className="rounded-t-xl object-cover w-full h-56 md:h-96"
                width={100}
                height={100}
              />
              <div className="text-left px-6 md:px-0">
                <h3 className="md:text-2xl lg:text-3xl text-xl font-semibold">
                  {carouselData[index].title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg lg:text-xl mt-4">
                  {carouselData[index].content}
                </p>
                <div className="py-4 md:mb-0 my-4">
                  <Link
                    href="/contact"
                    className="flex items-center gap-1 uppercase hover:text-purple-200"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:hidden flex justify-center items-center gap-4 my-4">
              <button
                onClick={prev}
                className="flex items-center gap-3 text-gray-300 hover:cursor-pointer hover:text-purple-300 transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="text-xs">swipe</span>
              <button
                onClick={next}
                className="flex items-center gap-3 text-purple-300 hover:text-white hover:cursor-pointer transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <OurProcess />
      <TechStack />
    </section>
  );
}
