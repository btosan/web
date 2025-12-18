"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MeetBYDFamily() {
  const router = useRouter();

  const handleBookTestDrive = (model: string) => {
    router.push(`/?type=test_drive&model=${model}#enquiry`);
  };

  const handleViewModels = () => {
    router.push("/models");
  };

  const models = [
    {
      name: "BYD Song Plus",
      focus: "main",
      description:
        "Premium electric SUV — comfort, performance, and luxury built for Nigerian roads.",
      specs: "Range: 520km | Fast Charge: 45min | Power: 238hp | Units Available: 4",
      price: "₦64,900,000",
      image: "/assets/byd/song-plus-front.jpg",
      cta: "Book Test Drive",
    },
    {
      name: "BYD Seagull",
      focus: "secondary",
      description:
        "Compact and efficient city EV — perfect for urban professionals and fleet use.",
      specs: "Range: 405km | Fast Charge: 40min | Units Available: 2",
      price: "₦34,900,000",
      image: "/assets/byd/seagull-2025.jpg",
      cta: "Reserve Now",
    },
  ];

  return (
    <section
      id="featured-models"
      className="relative bg-black text-gray-100 py-16 md:py-24 px-6 md:px-16"
    >
      {/* Heading */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-yellow-400 uppercase mb-4"
        >
          Featured BYD Models
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
        >
          Experience the future of driving today. Limited stock available — reserve yours before it’s gone.
        </motion.p>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {models.map((model, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative rounded-2xl overflow-hidden border transition-all ${
              model.focus === "main"
                ? "border-yellow-500 bg-gray-900 shadow-xl"
                : "border-gray-800 bg-gray-900/80 hover:border-yellow-500"
            }`}
          >
            <div className="relative w-full h-64 md:h-80">
              <Image
                src={model.image}
                alt={model.name}
                fill
                className="object-cover"
                priority={model.focus === "main"}
              />
              {model.focus === "main" && (
                <div className="absolute top-4 left-4 bg-yellow-500/30 text-black/50 font-semibold px-4 py-1 rounded-full text-sm">
                  Main Focus
                </div>
              )}
            </div>

            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-yellow-500 mb-2">
                {model.name}
              </h3>
              <p className="text-gray-300 mb-2">{model.description}</p>
              <p className="text-gray-400 text-sm mb-4">{model.specs}</p>
              <p className="text-gray-100 font-semibold text-lg mb-6">
                {model.price}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleBookTestDrive(model.name)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    model.focus === "main"
                      ? "bg-yellow-500 text-black hover:bg-yellow-400"
                      : "border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                  }`}
                >
                  {model.cta}
                </button>

                {model.focus === "main" && (
                  <button
                    onClick={handleViewModels}
                    className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:border-yellow-500 hover:text-yellow-400 transition-all"
                  >
                    View All Models
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Small footer line */}
      <div className="text-center mt-12">
        <button
          onClick={handleViewModels}
          className="text-yellow-400 underline hover:text-yellow-300 transition-all"
        >
          Explore More BYD Models →
        </button>
      </div>
    </section>
  );
}
