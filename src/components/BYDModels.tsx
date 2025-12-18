'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BGImage from '../../public/assets/ev/evsbg.webp';

interface ModelCard {
  name: string;
  description: string;
  price: string;
  image: string;
}

const FeatureCard = ({ title }: { title: string }) => (
  <div className="bg-white/30 p-4 rounded-lg border border-white/20 hover:bg-black/20 transition duration-300 w-[80%] mx-auto md:w-full">
    <p className="text-white lg:[text-shadow:0_1px_1px_black] [text-shadow:0_0.5px_0.5px_black] tracking-wider text-center font-medium text-sm md:text-lg">{title}</p>
  </div>
);

const BYDModels = () => {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const models: ModelCard[] = [
    {
      name: "BYD SEAL",
      description: "Luxury electric sedan with exceptional range",
      price: "From ₦42,000,000",
      image: "/assets/ev/byd-seal.jpg"
    },
    {
      name: "BYD ATTO 3",
      description: "Versatile electric SUV for the modern family",
      price: "From ₦39,000,000",
      image: "/assets/ev/byd-atto3.jpg"
    },
    {
      name: "BYD DOLPHIN",
      description: "Compact urban EV with smart features",
      price: "From ₦35,000,000",
      image: "/assets/ev/byd-dolphin.jpg"
    }
  ];

  // Preload the background image
  React.useEffect(() => {
    const img = document.createElement('img');
    img.src = BGImage.src;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen py-20 overflow-hidden -mb-8">
      {/* Background Image with Gradient */}
      <div className="absolute inset-0">
        <Image
          src={BGImage}
          alt="BYD Showroom"
          fill
          priority
          quality={75}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover object-center transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        {/* Fallback background */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isImageLoaded ? 'opacity-0' : 'opacity-100'
        }`} />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col justify-between min-h-[calc(100vh-10rem)]">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Discover Our <span className="text-orange">Electric Range</span>
          </h2>
          <p className="text-gray-50 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
            Experience the perfect blend of luxury, performance, and sustainability 
            with BYD&apos;s innovative electric vehicle lineup.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-auto mb-6 lg:mb-8">
          {[
            "Advanced Battery Tech",
            "Premium Build Quality",
            "Smart Connectivity",
            "5-Star Safety Rating"
          ].map((feature, index) => (
            <FeatureCard key={index} title={feature} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center my-8">
          <Link 
            href="/contact"
            className="inline-block bg-orange/80 hover:bg-orange/60 text-white lg:[text-shadow:0_1.5px_1.5px_orange] [text-shadow:0_0.7px_0.7px_orange] 
            px-8 py-4 text-lg md:text-xl lg:text-2xl font-semibold transition-colors duration-300
            shadow-lg hover:shadow-orange/80"
          >
            Schedule a Test Drive
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BYDModels;