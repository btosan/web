import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import VehicleHighlightCarousel from '@/components/VehicleHighlightCarousel'

// Demo model data – replace with real DB/data fetch abuja 234
const models = [
  {
    id: '1',
    name: 'BYD SEAL',
    image: '/assets/ev/byd9.png',
    gallery: [
      '/assets/ev/byd9.png',
      '/assets/ev/models/byd-seal1.jpg',
      '/assets/ev/models/byd-seal2.jpg',
      '/assets/ev/models/byd-seal3.jpg'
    ],
    description: 'Luxury electric sedan with exceptional range.',
    tagline: 'Sporty design and performance',
    specs: [
      { label: "Range", value: "570km (CLTC)" },
      { label: "0-100km/h", value: "3.8s" },
      { label: "Battery", value: "82.5kWh Blade Battery" },
      { label: "Power", value: "390kW" }
    ],
    features: [
      "Advanced driver-assist and safety systems",
      "Panoramic sunroof and premium interior",
      "Ultra-fast charging capability",
      "12.8'' rotating touchscreen display"
    ],
    slug: 'seal'
  },
  {
    id: '2',
    name: 'BYD ATTO 3',
    image: '/assets/ev/byd-atto3.jpg',
    gallery: [
      '/assets/ev/byd-atto3.jpg',
      '/assets/ev/models/byd-atto3.jpg',
      '/assets/ev/models/byd-atto31.jpg',
      '/assets/ev/models/byd-atto32.jpg',
      '/assets/ev/models/byd-atto33.jpg'
    ],
    description: 'Versatile compact SUV for urban adventures.',
    tagline: 'Empowering Urban Mobility',
    specs: [
      { label: "Range", value: "420km (WLTP)" },
      { label: "Battery", value: "60.48kWh" },
      { label: "Seats", value: "5" }
    ],
    features: [
      "Spacious ergonomic cabin",
      "360° surround camera",
      "Voice-controlled infotainment",
      "Wireless phone charging"
    ],
    slug: 'atto-3'
  },
  {
    id: '3',
    name: 'BYD DOLPHIN',
    image: '/assets/ev/byd7.png',
    gallery: [
      '/assets/ev/byd-dolphin.jpg',
      '/assets/ev/models/byd-dolphin.jpg',
      '/assets/ev/models/byd-dolphin2.jpg',
      '/assets/ev/models/byd-dolphin3.jpg',
      '/assets/ev/models/byd-dolphin4.jpg'
    ],
    description: 'Smart hatchback for sustainable city living.',
    tagline: 'Agile. Efficient. Fun.',
    specs: [
      { label: "Range", value: "427km (CLTC)" },
      { label: "Battery", value: "44.9kWh" },
      { label: "Seats", value: "5" }
    ],
    features: [
      "Compact with surprising space",
      "Eco-friendly interior materials",
      "Advanced parking assist",
      "Smart digital cluster"
    ],
    slug: 'dolphin'
  },
  {
    id: '4',
    name: 'BYD HAN',
    image: '/assets/ev/byd8.png',
    gallery: [
      '/assets/ev/byd8.png',
      '/assets/ev/models/byd-han.jpg',
      '/assets/ev/models/byd-han2.jpg',
      '/assets/ev/models/byd-han3.jpg',
      '/assets/ev/models/byd-han4.jpg'
    ],
    description: 'Premium executive sedan with cutting-edge technology.',
    tagline: 'Executive Elegance, Electrified',
    specs: [
      { label: "Range", value: "605km (CLTC)" },
      { label: "0-100km/h", value: "3.9s" },
      { label: "Battery", value: "85.4kWh" }
    ],
    features: [
      "Flagship-level comfort",
      "Nappa leather seats",
      "Full suite of safety features",
      "Smart connectivity"
    ],
    slug: 'han'
  },
  {
    id: '5',
    name: 'BYD TANG',
    image: '/assets/ev/byd11.png',
    gallery: [
      '/assets/ev/models/byd-tang.jpg',
      '/assets/ev/models/byd-tang1.jpg',
      '/assets/ev/models/byd-tang2.jpg',
      '/assets/ev/models/byd-tang4.jpg',
      '/assets/ev/models/byd-tang5.jpg',
      '/assets/ev/models/byd-tang3.jpg'
    ],
    description: 'Revolutionary 7-seat all-wheel-drive electric SUV blending style and performance.',
    tagline: 'Power and Space, Electrified',
    specs: [
      { label: "Range", value: "530km (WLTP)" },
      { label: "0-100km/h", value: "4.9s" },
      { label: "Battery", value: "108.8kWh Blade Battery" },
      { label: "Seats", value: "7" }
    ],
    features: [
      "Spacious 7-seat configuration",
      "Advanced all-wheel-drive system",
      "High-efficiency heat pump",
      "Intelligent driver-assist suite"
    ],
    slug: 'tang'
  },
  {
    id: '6',
    name: 'BYD SEALION',
    image: '/assets/ev/byd-sealion-7.png',
    gallery: [
      '/assets/ev/models/byd-sealion.jpg',
      '/assets/ev/models/byd-sealion1.jpg',
      '/assets/ev/models/byd-sealion3.jpg',
      '/assets/ev/models/byd-sealion5.jpg',
      '/assets/ev/models/byd-sealion4.jpg'
    ],
    description: 'Premium electric SUV with ocean-inspired design and cutting-edge technology.',
    tagline: 'Dynamic Ocean Aesthetics',
    specs: [
      { label: "Range", value: "570km (WLTP)" },
      { label: "0-100km/h", value: "4.5s" },
      { label: "Battery", value: "82.5kWh Blade Battery" },
      { label: "Seats", value: "5" }
    ],
    features: [
      "15.6-inch rotating touchscreen",
      "Panoramic sunroof with electric shade",
      "Advanced safety and driver-assist systems",
      "Premium Dynaudio sound system"
    ],
    slug: 'sealion'
  },
  {
    id: '7',
    name: 'BYD ATTO 2',
    image: '/assets/ev/atto-2-kv-pc.jpg',
    gallery: [
      '/assets/ev/models/byd-atto2.jpg',
      '/assets/ev/models/byd-atto21.jpg',
      '/assets/ev/models/byd-atto22.jpg',
      '/assets/ev/models/byd-atto23.jpg',
      '/assets/ev/models/byd-atto24.jpg'
    ],
    description: 'Compact electric SUV perfect for families and urban commuters.',
    tagline: 'Small Size, Big Impact',
    specs: [
      { label: "Range", value: "405km (WLTP)" },
      { label: "Battery", value: "49.9kWh" },
      { label: "Seats", value: "5" },
      { label: "0-100km/h", value: "7.3s" }
    ],
    features: [
      "Compact yet spacious interior",
      "360-degree camera system",
      "Smart connectivity with BYD app",
      "Eco-friendly materials"
    ],
    slug: 'atto-2'
  },
  {
    id: '8',
    name: 'BYD Seal U',
    image: '/assets/ev/byd seal u.jpg',
    gallery: [
      '/assets/ev/models/byd-sealu.jpg',
      '/assets/ev/models/byd-sealu1.jpg',
      '/assets/ev/models/byd-sealu2.jpg',
      '/assets/ev/models/byd-sealu3.jpg'
    ],
    description: 'Family-friendly electric SUV with advanced safety and comfort.',
    tagline: 'Comfort Meets Efficiency',
    specs: [
      { label: "Range", value: "500km (WLTP)" },
      { label: "0-100km/h", value: "7.9s" },
      { label: "Battery", value: "71.8kWh Blade Battery" },
      { label: "Seats", value: "5" }
    ],
    features: [
      "Spacious family-oriented interior",
      "Advanced Level 2 ADAS",
      "Panoramic glass roof",
      "Smart infotainment with OTA updates"
    ],
    slug: 'seal-u'
  },
  {
    id: "9",
    name: "BYD Seal U DM-i",
    image: "/assets/ev/byd-seal-dmi.png",
    gallery: [
      "/assets/ev/models/Seal-u-dmi1.jpg",
      "/assets/ev/models/Seal-u-dmi2.jpg",
      "/assets/ev/models/Seal-u-dmi3.jpg",
      "/assets/ev/models/Seal-u-dmi4.jpg"
    ],
    description: "Plug-in hybrid SUV blending family-friendly comfort with electrified efficiency.",
    tagline: "Hybrid Power, Family Comfort",
    specs: [
      { label: "Electric Range", value: "80km (WLTP)" },
      { label: "Total Range", value: "1000km (WLTP)" },
      { label: "0-100km/h", value: "8.5s" },
      { label: "Battery", value: "18.3kWh Blade Battery" },
      { label: "Engine", value: "1.5L DM-i Hybrid" },
      { label: "Seats", value: "5" }
    ],
    features: [
      "DM-i hybrid system for ultra-low fuel consumption",
      "Spacious interior with premium materials",
      "Advanced Level 2+ ADAS with adaptive cruise",
      "Panoramic glass roof with electric shade",
      "15.6-inch rotating touchscreen with OTA updates"
    ],
    slug: "seal-u-dmi"
  },
  {
    id: "10",
    name: "BYD Song Plus 2026",
    image: "/assets/byd/song-plus-front.jpg",
    gallery: [
      "/assets/byd/songplus.jpg",
      "/assets/byd/song-plus-back.jpg",
      "/assets/byd/song-plus-3qv.jpg",
      "/assets/byd/song-plus-back2.jpg",
      "/assets/byd/song-plus-front.jpg",
      "/assets/byd/song-plus-dashboard.jpg",
      "/assets/byd/song-plus-bonnet.jpg",
      "/assets/byd/song-plus-interior.jpg",
      "/assets/byd/song-plus-handle.jpg",
      "/assets/byd/song-plus-others.jpg",
      "/assets/byd/song-plus-rear-mirror.jpg",
      "/assets/byd/song-plus-steering.jpg",
      "/assets/byd/song-plus-3qviewback.jpg"
    ],
    description: "The 2026 BYD Song Plus blends modern SUV styling with advanced electrified powertrains—offering family-friendly space, BYD’s Blade Battery technology and intelligent connectivity for Nigeria’s roads. Available now for immediate delivery nationwide.",
    tagline: "Modern SUV, Electric Power",
    specs: [
      { label: "Electric Range (EV)", value: "Up to 605 km (CLTC) / ~500 km (WLTP)" },
      { label: "0-100 km/h", value: "≈ 9.6 s (EV version)" },
      { label: "Battery Options", value: "71.8 kWh or 87.04 kWh Blade LFP" },
      { label: "Motor", value: "Front Permanent-Magnet Synchronous Motor (150-160 kW)" },
      { label: "Seats", value: "5" },
      { label: "Price", value: "₦64,900,000" }
    ],
    features: [
      "e-Platform 3.0 architecture underpinning EV variant",
      "Dragon Face 3.0 design aesthetic with ‘Heart of Ocean’ centre console layout",
      "BYD Blade Battery safety and longevity (LFP chemistry)",
      "Large 15.6-inch rotating touchscreen with BYD Intelligent Cockpit System",
      "Panoramic sunroof, dual-zone climate control, and premium interior finishes",
      "Vehicle-to-Load (V2L) functionality for powering external devices",
      "Available for immediate delivery — limited units in Nigeria"
    ],
    slug: "song-plus"
  },
  {
    id: "11",
    name: "BYD SEAGULL",
    image: "/assets/new/byd-seagull.jpg",
    gallery: [
      "/assets/new/byd-seagull-full-front-view.avif",
      "/assets/new/byd-seagull-full-rear-view.avif",
      "/assets/new/byd-seagull-side-view.avif",
      "/assets/new/byd-seagull-dashboard-view.avif",
      "/assets/new/byd-seagull-airbags-view.avif",
      "/assets/new/byd-seagull-wheel.avif"
    ],
    description:
      "Compact, intelligent, and ultra-efficient — the BYD Seagull is your perfect city EV, combining affordability, agility, and BYD’s trusted Blade Battery technology. Ideal for Nigerian roads and urban lifestyles. Available now in limited units.",
    tagline: "Bold. Electric. Intelligent.",
    specs: [
      { label: "Electric Range", value: "Up to 405km (CLTC)" },
      { label: "Fast Charging", value: "30%–80% in 30 minutes" },
      { label: "Battery", value: "30.08 kWh or 38.88 kWh Blade Battery" },
      { label: "Motor", value: "55 kW Permanent Magnet Synchronous Motor" },
      { label: "Seats", value: "4" },
      { label: "Price", value: "₦34,900,000" }
    ],
    features: [
      "Ultra-Safe Blade Battery technology for maximum protection",
      "Compact yet spacious — perfect for urban mobility",
      "Ocean Aesthetics design with futuristic LED light signatures",
      "10.1-inch touchscreen and smart connectivity features",
      "Fast charging (30–80% in 30 minutes)",
      "Affordable entry-level EV for Nigeria’s growing electric market",
      "Available for immediate delivery — only 2 units left"
    ],
    slug: "seagull"
  },
  {
    id: "12",
    name: "Voyah Dreamer (2025 Model)",
    image: "/assets/new/voyah.jpg",
    gallery: [
      "/assets/new/voyah-dream.jpg",
      "/assets/new/voyah-side.jpg",
      "/assets/new/voyah-side2.jpg",
      "/assets/new/voyah-main.jpg",
      "/assets/new/voyah2.jpg",
      "/assets/new/voyah3.jpg",
      "/assets/new/voyah33.jpg",
      "/assets/new/voyah-interior.jpg"
    ],
    description: "A luxury extended-range electric SUV that combines a powerful electric drive with a gasoline range extender for long-distance travel.",
    tagline: "Unlimited Range, Ultimate Luxury",
    specs: [
      { label: "Electric Range", value: "Up to 650km on full-time charge" },
      { label: "Total Range", value: "Up to 1200km (CLTC)" },
      { label: "0-100km/h", value: "4.8s" },
      { label: "Battery", value: "39 kWh NMC battery" },
      { label: "Engine", value: "1.5L Turbo Range Extender" },
      { label: "Seats", value: "6" },
      { label: "Comfort/Convenience", value: "luxury seats, massager, fridge" },
      { label: "Autonomous Driving", value: "Enables the car to drive itself without human input" },
      { label: "Security", value: "All round cameras" },
      { label: "Price", value: "₦150 million" }
    ],
    features: [
      "Extended Range Electric Vehicle (EREV) technology",
      "Air suspension and CDC electromagnetic vibration damping",
      "Large panoramic sunroof with adjustable transparency",
      "Three-screen intelligent cockpit with a 60-inch AR-HUD",
      "Advanced driver assistance systems (ADAS)"
    ],
    slug: "voyah"
  },
  {
    id: '13',
    name: 'e-KEKE',
    image: '/assets/keke/3q-cover2.png',
    gallery: [
      '/assets/keke/blue-keke.jpg',
      '/assets/keke/keketuktuk.jpg',
      '/assets/keke/side.jpg',
      '/assets/keke/side3.jpg',
      '/assets/keke/white-keke.jpg'
    ],
    description: 'Eco-friendly electric tricycle for sustainable urban mobility and commercial use.',
    tagline: 'Green Today, Thriving Tomorrow',
    specs: [
      { label: "Range", value: "120km on full charge" },
      { label: "Max Speed", value: "45km/h" },
      { label: "Battery", value: "4kWh" },
      { label: "Capacity", value: "6-7 passengers or cargo" },
      { label: "Back Seat", value: "can take passengers face to face" }
    ],
    features: [
      "Compact design for easy navigation",
      "Low-maintenance electric drivetrain",
      "Ideal for last-mile delivery",
      "Weather-resistant cabin"
    ],
    slug: 'keke'
  }
];

// Function to generate highlight cards for a specific vehicle
function generateVehicleHighlights(model: typeof models[0]) {
  const highlights = model.features.map((feature, index) => ({
    id: `${model.id}-${index}`,
    type: 'image' as const,
    url: model.gallery[index % model.gallery.length] || model.image,
    alt: `${model.name} Highlight ${index + 1}`,
    title: feature.split(' ').slice(0, 3).join(' '), // Use first 3 words of feature as title
    description: `Experience the ${feature.toLowerCase()} of the ${model.name}, enhancing your drive with cutting-edge technology and comfort.`,
  }));

  // Ensure at least 3 highlights, fill with generic ones if needed
  while (highlights.length < 3) {
    const index = highlights.length;
    highlights.push({
      id: `${model.id}-generic-${index}`,
      type: 'image' as const,
      url: model.gallery[index % model.gallery.length] || model.image,
      alt: `${model.name} Highlight ${index + 1}`,
      title: `${model.name} Excellence`,
      description: `Discover the ${model.name}'s ${model.tagline.toLowerCase()}, designed for superior performance and style.`,
    });
  }

  return highlights;
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = models.find(m => m.slug === slug);
  if (!model) return notFound();

  const highlights = generateVehicleHighlights(model);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full bg-linear-to-tr from-gray-100 via-white to-gray-50 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center py-10 md:py-20 px-4 md:px-10 gap-12 md:gap-16">
          {/* Image */}
          <div className="flex-1 flex flex-col items-center justify-center lg:-mt-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold text-black mb-6 text-center">
              {model.name}
            </h1>
            <div className="relative w-[340px] h-[200px] md:w-[480px] md:h-[300px] lg:w-[560px] lg:h-[360px] rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-200">
              <Image
                src={model.image}
                alt={model.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 600px"
                priority
              />
            </div>
          </div>
          {/* Details */}
          <div className="flex-1 flex flex-col gap-6 justify-center lg:pt-8">
            <span className="inline-block uppercase tracking-wider text-sm font-bold text-gray-500 mb-1">
              {model.tagline}
            </span>
            <p className="text-gray-700 text-lg md:text-xl mb-4 max-w-xl">
              {model.description}
            </p>
            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 max-w-md">
              {model.specs?.map(spec => (
                <div
                  key={spec.label}
                  className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-2 flex flex-col items-center"
                >
                  <span className="text-xs text-gray-500">{spec.label}</span>
                  <span className="font-semibold text-black text-sm">{spec.value}</span>
                </div>
              ))}
            </div>
            {/* CTAs */}
            <div className="w-full mx-auto flex flex-col items-center justify-center sm:flex-row gap-4">
              <Link
                href={`/?type=test_drive&model=${model.slug}#enquiry`}
                className="inline-block px-8 py-3 rounded-full font-bold hover:text-white hover:bg-orange/70 shadow bg-black text-gray-50 border-2 hover:border-orange-400/70 border-black transition-all text-lg uppercase tracking-wide"
              >
                Enquire Now
              </Link>
              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/2348063887516?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(model.name)}%20available%20in%20Nigeria`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-full font-bold text-white bg-green-600 hover:bg-green-700 shadow border-2 border-green-700 transition-all text-lg uppercase tracking-wide"
              >
                WhatsApp Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Highlight Section */}
      <VehicleHighlightCarousel highlights={highlights} />

      {/* Gallery Section */}
      {model.gallery && model.gallery.length > 1 && (
        <section className="w-full bg-gray-50 py-10">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold text-black mb-6 text-center">
              Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {model.gallery.map((img, i) => (
                <div key={img} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                  <Image
                    src={img}
                    alt={`${model.name} photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover hover:object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {model.features && (
        <section className="w-full bg-white py-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
              Features
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {model.features.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-gray-50 rounded-lg border border-gray-200 p-4"
                >
                  <span className="inline-block mt-1 h-3 w-3 rounded-full bg-orange flex-shrink-0"></span>
                  <span className="text-gray-800 text-base">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16 bg-black border-t border-b border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Book a Test Drive
          </h2>
          <div>
            <Link
              href={`/?type=test_drive&model=${model.slug}#enquiry`}
              className="inline-block px-6 sm:px-8 py-3 rounded-full font-bold text-white bg-orange/70 hover:bg-orange border-2 border-orange/70 hover:border-orange transition-all text-base sm:text-lg uppercase tracking-wide"
            >
              Book Test Drive
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
