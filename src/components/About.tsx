"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="bg-black text-white min-h-screen py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* === Header === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold uppercase mb-4 tracking-wide">
            About Exulted Eagles Nigeria Limited
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Pioneering sustainable mobility and renewable energy in Nigeria —
            driving progress with BYD electric vehicles, solar power, and
            intelligent energy solutions built for Africa’s future.
          </p>
        </motion.div>

        {/* === Mission Section === */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400 uppercase">
              Our Mission
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              To transform Nigeria’s transportation and energy landscape by
              delivering cutting-edge electric vehicles and renewable energy
              solutions, fostering a sustainable, prosperous future for all.
            </p>
            <p className="mt-6 text-gray-400">
              We are not just selling cars — we are driving a national shift
              toward cleaner, smarter, and more affordable mobility powered by
              the world’s most advanced EV technology: <strong>BYD</strong>.
            </p>
          </div>

          <div className="relative w-full h-[350px] md:h-[420px] rounded-3xl overflow-hidden">
            <Image
              src="/assets/byd/songplus.jpg"
              alt="BYD Song Plus Nigeria"
              fill
              className="object-cover rounded-3xl opacity-90"
            />
          </div>
        </motion.div>

        {/* === Company Overview === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 uppercase">
            Who We Are
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            <strong>Exulted Eagles Nigeria Limited</strong> is a pioneering
            technology and mobility company specializing in the sale and
            distribution of <strong>BYD electric vehicles</strong> in Nigeria.
            Through our brand <strong>eVehicles NG</strong>, we make electric
            mobility accessible, reliable, and aspirational for Nigerians.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Headquartered in <strong>Port Harcourt</strong> with offices in{" "}
            <strong>Lagos</strong> and <strong>Abuja</strong>, we operate a
            growing network of service partners, delivery hubs, and solar
            charging solutions across the nation. Our partnership ecosystem
            ensures customers enjoy seamless sales, delivery, financing, and
            maintenance support.
          </p>
        </motion.div>

        {/* === Why Choose Us === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#0a0a0a] rounded-3xl p-10 md:p-16 mb-24 border border-gray-800"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase text-yellow-400">
            Why Nigerians Choose eVehicles NG
          </h2>
          <ul className="space-y-6 text-gray-300 text-lg leading-relaxed list-disc pl-6">
            <li>
              <strong>Official BYD Distributor</strong> — We source directly from
              BYD’s global supply network, ensuring authentic models, verified
              warranties, and zero compromise on quality.
            </li>
            <li>
              <strong>Local Support & After-Sales Care</strong> — Certified BYD
              technicians and spare parts available through authorized Nigerian
              service partners.
            </li>
            <li>
              <strong>Energy Independence</strong> — We integrate EV ownership
              with home or commercial solar charging, reducing reliance on
              petrol and grid electricity.
            </li>
            <li>
              <strong>Transparent Pricing</strong> — All prices are in Nigerian
              Naira with flexible payment and financing options.
            </li>
            <li>
              <strong>Nationwide Delivery</strong> — Whether in Lagos, Abuja,
              Port Harcourt, or anywhere in Nigeria, we deliver your new BYD
              directly to your doorstep.
            </li>
            <li>
              <strong>Proven Technology</strong> — BYD’s Blade Battery is one of
              the safest and most durable in the world, delivering superior
              performance even in Nigeria’s hot climate.
            </li>
          </ul>
        </motion.div>

        {/* === Partners & Dealership Network === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 uppercase mb-8 text-center">
            Our Partners & Dealership Network
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto text-center mb-10">
            eVehicles NG operates a trusted network of authorized partners across
            Nigeria — connecting customers with certified BYD dealerships,
            service centers, and renewable energy providers to ensure the best
            ownership experience possible.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="border border-gray-800 rounded-3xl p-8 bg-[#0a0a0a] hover:bg-gray-900 transition">
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                Authorized Dealership Partners
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                eVehicles NG operates an expanding network of authorized BYD
                dealerships in <strong>Lagos</strong>, <strong>Abuja</strong>,
                and <strong>Port Harcourt</strong>, delivering certified sales
                and expert consultation to customers nationwide under our
                official dealership program.
              </p>
            </div>

            <div className="border border-gray-800 rounded-3xl p-8 bg-[#0a0a0a] hover:bg-gray-900 transition">
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                Service & Maintenance
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Our certified BYD service centers across key Nigerian cities
                provide complete after-sales support — including diagnostics,
                battery management, software updates, and genuine BYD spare
                parts — ensuring every vehicle performs at global standards.
              </p>
            </div>

            <div className="border border-gray-800 rounded-3xl p-8 bg-[#0a0a0a] hover:bg-gray-900 transition">
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                Financial & Charging Solutions
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Through our partnerships with banks, fintechs, and solar energy
                providers, customers enjoy flexible financing options and access
                to home or commercial BYD charging installations across Nigeria.
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-8 text-center max-w-3xl mx-auto">
            <em>
              Interested in becoming a partner or dealership representative for
              BYD in Nigeria?{" "}
            </em>
            <Link
              href="/#enquiry"
              className="text-yellow-400 underline hover:text-yellow-300 font-medium"
            >
              Contact our Business Development team
            </Link>
            .
          </p>
        </motion.div>

        {/* === Vision Section === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 uppercase mb-6">
            Our Vision
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            To make electric mobility mainstream in Nigeria — where every family
            and business can drive a cleaner, smarter, and more affordable
            vehicle powered by renewable energy.
          </p>
        </motion.div>

        {/* === Call to Action === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-400 text-lg mb-6">
            Explore our lineup of BYD electric vehicles available in Nigeria.
          </p>
          <Link
            href="/models/song-plus"
            className="bg-yellow-500 text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-yellow-400 transition-all inline-block"
          >
            View BYD Song Plus
          </Link>
          <Link
            href="/models/seagull"
            className="ml-4 bg-transparent border-2 border-yellow-500 text-yellow-500 px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all inline-block"
          >
            View BYD Seagull
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
