"use client";
import Link from "next/link";
import Image from "next/image";
import { Urbanist } from 'next/font/google';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
});

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  return (
<nav
  className="fixed left-0 right-0 z-50 flex items-center justify-between px-[6vw] py-5 bg-[#f7f4ef] border-b border-[#0d0d0d]/5"
  style={{
    top: "calc(env(safe-area-inset-top) * -1)",
    paddingTop: "calc(env(safe-area-inset-top) + 1.25rem)",
  }}
>
        {/* Logo py-1.5*/}
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
              className="h-7 md:h-8 lg:h-9 w-auto"
            />
            <p
              className={`${urbanist.className} scale-x-110 py-2 flex items-center gap-0.5 md:gap-1 font-medium md:tracking-wide tracking-wider text-xl lg:text-2xl 2xl:text-3xl bg-linear-to-r from-purple-950 via-purple-900 to-blue-900 bg-clip-text text-transparent transition-colors duration-300`}
            >
              Ofashi
            </p>
          </Link>
        </div>

      <ul className="hidden md:flex items-center gap-8 list-none">
        <li>
          <a
            href="#services"
            className="text-sm font-medium text-[#6b6560] hover:text-[#0d0d0d] transition-colors"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#work"
            className="text-sm font-medium text-[#6b6560] hover:text-[#0d0d0d] transition-colors"
          >
            Work
          </a>
        </li>
        <li>
          <a
            href="#pricing"
            className="text-sm font-medium text-[#6b6560] hover:text-[#0d0d0d] transition-colors"
          >
            Pricing
          </a>
        </li>
        <li>
          <button
            onClick={onOpenModal}
            className="bg-purple-800 text-[#f7f4ef] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-purple-900 transition-all hover:-translate-y-0.5 hover:cursor-pointer"
          >
            Book a Call
          </button>
        </li>
      </ul>

      {/* Mobile CTA */}
      <button
        onClick={onOpenModal}
        className="md:hidden bg-purple-800 text-[#f7f4ef] px-4 py-2 rounded-full text-sm font-medium hover:cursor-pointer"
      >
        Book a Call
      </button>
    </nav>
  );
}
