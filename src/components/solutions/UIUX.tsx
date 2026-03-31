"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  User,
  Rocket,
  Home,
  Briefcase,
  Building2,
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
    title: "User Research & Testing",
    description:
      "Conduct in-depth research to understand your audience, identify pain points, and validate design decisions with real users.",
    href: "/contact",
    icon: <User size={38} className="text-purple-400" />,
  },
  {
    title: "Wireframes & Prototyping",
    description:
      "Create interactive wireframes and prototypes to visualize workflows, test usability, and align stakeholders before development.",
    href: "/contact",
    icon: <Rocket size={38} className="text-purple-400" />,
  },
  {
    title: "UI Design & Visual Systems",
    description:
      "Design polished, on-brand interfaces with consistent visual language, typography, and iconography that engage and delight users.",
    href: "/contact",
    icon: <Briefcase size={38} className="text-purple-400" />,
  },
  {
    title: "UX Strategy & Information Architecture",
    description:
      "Develop user flows, navigation systems, and content hierarchy to ensure intuitive, conversion-focused experiences.",
    href: "/contact",
    icon: <Building2 size={38} className="text-purple-400" />,
  },
  {
    title: "Conversion Optimization",
    description:
      "Design interfaces that guide users to take action, increasing engagement, leads, and sales through tested UX patterns.",
    href: "/contact",
    icon: <Home size={38} className="text-purple-400" />,
  },
  {
    title: "Responsive & Mobile-First Design",
    description:
      "Craft interfaces that work seamlessly across devices, ensuring consistent experience on desktop, tablet, and mobile screens.",
    href: "/contact",
    icon: <User size={38} className="text-purple-400" />,
  },
];

const carouselData: CarouselCard[] = [
  {
    title: "Intuitive User Flows",
    content:
      "Design workflows that make complex processes simple and guide users naturally to conversion points.",
    image: "/assets/uiux/uiux1.jpg",
  },
  {
    title: "Engaging Interfaces",
    content:
      "Polished visual designs that build trust, reinforce brand identity, and encourage interaction.",
    image: "/assets/uiux/uiux2.jpg",
  },
  {
    title: "Conversion-Focused Layouts",
    content:
      "Layouts optimized for action, strategically placing elements to drive clicks, sign-ups, and purchases.",
    image: "/assets/uiux/uiux3.jpg",
  },
  {
    title: "Mobile & Desktop Ready",
    content:
      "Responsive designs that adapt seamlessly across devices while maintaining usability and aesthetics.",
    image: "/assets/uiux/uiux4.jpg",
  },
  {
    title: "Rapid Prototyping",
    content:
      "Test ideas quickly with interactive prototypes to validate concepts and reduce design iteration cycles.",
    image: "/assets/uiux/uiux5.jpg",
  },
  {
    title: "Data-Driven Design Decisions",
    content:
      "Use analytics and user testing insights to continuously improve UI/UX and drive measurable results.",
    image: "/assets/uiux/uiux6.jpg",
  },
];

export default function UIUXSection() {
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
          src="/assets/uiux/uiux-hero.jpg"
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
                UI/UX Design
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl xl:text-6xl">
              Intuitive, Conversion-Focused Experiences
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-200 md:text-lg xl:text-xl">
              Exceptional interface and user experience design that improves
              usability, builds trust, and turns visitors into engaged
              customers.
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
                  Start Your Design Project
                </p>
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  Let’s design a better user experience
                </h2>
                <p className="mt-5 max-w-md text-base leading-8 text-purple-100 md:text-lg">
                  Tell us about your project and get a professional design
                  estimate within 24 hours.
                </p>
              </div>

              <div className="mt-10 inline-flex items-center gap-3 self-start rounded-xl bg-white px-4 py-3 font-semibold text-purple-900 transition-transform duration-300 group-hover:translate-x-1 md:px-6">
                Design Your Experience
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
              Our UI/UX Design Services
            </h2>
            <p className="mt-4 text-gray-300">
              User-focused design solutions that enhance usability, engagement,
              and conversion.
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
              UI/UX Experiences We Craft
            </h2>
            <p className="mt-4 text-gray-200">
              From wireframes to high-fidelity interfaces, we design
              experiences that convert.
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
                  alt="UI/UX designs"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-center px-6 py-8 md:px-10 lg:px-12">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-purple-100/80">
                  Experience Type
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