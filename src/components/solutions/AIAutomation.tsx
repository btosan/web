"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
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

const services: ServiceCard[] = [
  {
    title: "Automated Lead Management",
    description:
      "AI systems to automatically track, qualify, and assign leads to the right team members, ensuring no opportunity is missed.",
    href: "/contact",
    icon: <Briefcase size={38} className="text-purple-400" />,
  },
  {
    title: "Customer Communication Automation",
    description:
      "Automate emails, notifications, follow-ups, and chat interactions using AI for faster, more personalized customer engagement.",
    href: "/contact",
    icon: <Rocket size={38} className="text-purple-400" />,
  },
  {
    title: "Data Processing & Reporting",
    description:
      "Automatically gather, clean, and analyze data, delivering structured insights and dashboards without manual effort.",
    href: "/contact",
    icon: <Building2 size={38} className="text-purple-400" />,
  },
  {
    title: "Internal Workflow Automation",
    description:
      "Streamline repetitive internal tasks like approvals, document routing, and scheduling, improving productivity with AI-driven workflows.",
    href: "/contact",
    icon: <User size={38} className="text-purple-400" />,
  },
  {
    title: "Smart Scheduling & Notifications",
    description:
      "Automate reminders, task assignments, and calendar events intelligently to optimize team efficiency.",
    href: "/contact",
    icon: <Home size={38} className="text-purple-400" />,
  },
  {
    title: "AI-Powered Task Management",
    description:
      "Monitor, prioritize, and execute tasks automatically based on AI-driven rules, historical patterns, and user behavior.",
    href: "/contact",
    icon: <Rocket size={38} className="text-purple-400" />,
  },
];

const carouselData: CarouselCard[] = [
  {
    title: "Automated Lead Flow",
    content:
      "AI-driven lead management that sorts, qualifies, and assigns leads automatically for maximum conversion.",
    image: "/assets/services-type/automatedmgt.png",
  },
  {
    title: "Smart Customer Interactions",
    content:
      "Automated messaging and chat interactions tailored to each user for faster, personalized engagement.",
    image: "/assets/services-type/smart-customer.png",
  },
  {
    title: "Intelligent Data Processing",
    content:
      "Automatically gather, clean, and analyze data to produce actionable insights and dashboards.",
    image: "/assets/services-type/data-processing.png",
  },
  {
    title: "Workflow Optimization",
    content:
      "Streamline internal processes, approvals, and task assignments with AI-powered automation.",
    image: "/assets/services-type/workflow.png",
  },
  {
    title: "Task & Notification Automation",
    content:
      "AI manages task scheduling, reminders, and notifications intelligently to optimize team efficiency.",
    image: "/assets/services-type/notification.png",
  },
  {
    title: "End-to-End AI Automation",
    content:
      "Complete automation solutions for repetitive processes, freeing teams to focus on high-value work.",
    image: "/assets/services-type/automation.png",
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
      {/* HERO */}
      <div className="relative isolate overflow-hidden">
        <Image
          src="/assets/services-type/workflow.png"
          alt=""
          fill
          priority
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/90 -z-10" />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/55 to-black -z-10" />

        <div className="relative z-10 mx-auto grid w-full items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-16 lg:gap-16 lg:px-12 xl:px-16 2xl:px-20 2xl:py-28">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-purple-100 md:text-xs">
                AI Automation
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl xl:text-6xl">
              Systems That Work Automatically
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-200 md:text-lg xl:text-xl">
              Automate lead management, customer communication, data
              processing, and internal workflows with intelligent, time-saving
              systems.
            </p>
          </div>

          {!showForm ? (
            <div
              onClick={() => setShowForm(true)}
              className="group relative flex min-h-90 cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-gray-600/80 bg-linear-to-tl from-gray-800/40 via-gray-900/40 to-gray-950/40 p-8 text-white shadow-sm shadow-gray-700/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-gray-500/40 md:p-9 lg:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-700/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-purple-100/80">
                  Start Your Automation Project
                </p>
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  Let’s build a smarter system
                </h2>
                <p className="mt-5 max-w-md text-base leading-8 text-purple-100 md:text-lg">
                  Tell us about your workflow and get a professional estimate
                  within 24 hours.
                </p>
              </div>

              <div className="mt-10 inline-flex items-center gap-3 self-start rounded-xl bg-white px-4 py-3 font-semibold text-purple-900 transition-transform duration-300 group-hover:translate-x-1 md:px-6">
                Let’s Build Your System
                <ChevronRight size={20} />
              </div>
            </div>
          ) : (
            <div className="relative animate-fadeIn rounded-3xl border border-gray-700/70 bg-gray-950/80 p-2 shadow-xl shadow-black/30 backdrop-blur-sm">
              <button
                onClick={() => setShowForm(false)}
                className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white font-bold text-red-500 shadow-md transition hover:scale-110"
              >
                ✕
              </button>
              <GoogleEnquiryLight />
            </div>
          )}
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="bg-black px-6 py-24 text-purple-50">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Our AI Automation Services
            </h2>
            <p className="mt-4 text-gray-300">
              Intelligent systems that automate tasks, communication, and
              workflows for efficiency, speed, and consistency.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
            {services.map((service) => (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border border-gray-600/80 bg-linear-to-tl from-gray-900/20 via-gray-950 to-black p-8 shadow-sm shadow-gray-400/40 transition-all duration-300 hover:border-gray-500 hover:shadow-md hover:shadow-gray-500/30 md:p-10"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-purple-950/40">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-semibold tracking-tight">
                  {service.title}
                </h3>

                <p className="mt-4 max-w-xl leading-8 text-gray-400">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="mt-7 inline-flex items-center gap-2 uppercase text-gray-300 transition group-hover:text-purple-200"
                >
                  Get started
                  <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="bg-gray-950 px-4 py-20 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl lg:tracking-wide">
              Types of AI Automation We Build
            </h2>
            <p className="mt-4 text-gray-200">
              From lead management to internal workflows — all automated
              intelligently.
            </p>
          </div>

          <div className="relative mt-16">
            <div className="mb-6 hidden items-center justify-center gap-16 lg:flex xl:gap-24">
              <button
                onClick={prev}
                className="flex items-center gap-3 text-purple-100 transition hover:cursor-pointer hover:text-gray-300"
              >
                <ArrowLeft className="h-5 w-5 md:h-7 md:w-7" strokeWidth={1.5} />
              </button>

              <button
                onClick={next}
                className="flex items-center gap-3 text-purple-200 transition hover:cursor-pointer hover:text-white"
              >
                <ArrowRight className="h-5 w-5 md:h-7 md:w-7" strokeWidth={1.5} />
              </button>
            </div>

            <div
              className="grid items-stretch gap-0 overflow-hidden rounded-3xl border border-gray-700/70 bg-linear-to-br from-gray-950 via-indigo-950 to-purple-950 shadow-lg shadow-gray-900/40 md:grid-cols-2"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative min-h-70 md:min-h-115">
                <Image
                  src={carouselData[index].image}
                  alt="AI automation features"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-center px-6 py-8 md:px-10 lg:px-12">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-purple-100/80">
                  Automation Type
                </p>
                <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                  {carouselData[index].title}
                </h3>
                <p className="mt-5 text-base leading-8 text-gray-300 md:text-lg lg:text-xl">
                  {carouselData[index].content}
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 uppercase transition hover:text-purple-200"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="my-5 flex items-center justify-center gap-4 lg:hidden">
              <button
                onClick={prev}
                className="flex items-center gap-3 text-gray-300 transition hover:cursor-pointer hover:text-purple-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <span className="text-xs text-gray-400">swipe</span>
              <button
                onClick={next}
                className="flex items-center gap-3 text-purple-300 transition hover:text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <OurProcess />
      <TechStack />
      <Link
        href="/services"
        className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-700/10 py-6 text-base uppercase text-purple-100 transition-all duration-300 hover:border-purple-300/30 hover:text-purple-300 md:py-8 md:text-lg lg:py-12 lg:text-xl"
      >
        {/* subtle top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        {/* glow effect */}
        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-700/10 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

        <span className="relative z-10 flex items-center gap-2">
          All Services & Solutions
          <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7" />
        </span>
      </Link>
    </section>
  );
}