import { Facebook, Instagram, Youtube, X } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 px-6 md:px-16 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        {/* === CONTACT === */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-3">Contact</h3>
          <p>Lagos, Port Harcourt, Abuja, and other major cities across Nigeria</p>
          <p>
            <a
              href="tel:+2348063887516"
              className="hover:text-yellow-500 transition-all"
            >
              +234 806 388 7516
            </a>
          </p>
          <p>
            <a
              href="mailto:evehiclesng@gmail.com"
              className="hover:text-yellow-500 transition-all"
            >
              evehiclesng@gmail.com
            </a>
          </p>
        </div>

        {/* === EXPLORE === */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-3">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-yellow-500 transition-all">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/models" className="hover:text-yellow-500 transition-all">
                Models
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-yellow-500 transition-all">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-500 transition-all">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* === SOCIAL MEDIA === */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-yellow-500 transition-all"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-yellow-500 transition-all"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-yellow-500 transition-all"
            >
              <Youtube size={20} />
            </a>
            <a
              href="#"
              aria-label="X (formerly Twitter)"
              className="hover:text-yellow-500 transition-all"
            >
              <X size={20} />
            </a>
          </div>
        </div>

        {/* === NEWSLETTER === */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-3">Newsletter</h3>
          <p className="text-sm mb-3">
            Join our EV community for updates & offers.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="bg-zinc-900 px-3 py-2 rounded-l-xl w-full focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-black px-4 py-2 rounded-r-xl font-semibold hover:bg-yellow-400 transition-all"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* === COPYRIGHT === */}
      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} eVehicles Nigeria — Authorized BYD Distributor.
      </div>
    </footer>
  );
}
