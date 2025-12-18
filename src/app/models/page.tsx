import React from 'react'
import BYDModels from '@/components/BYDModels'
import Image from 'next/image'
import Link from 'next/link'

// Demo model data – replace with real DB/data fetch
const models = [
  {
    id: '1',
    name: 'BYD SEAGULL',
    image: '/assets/new/byd-seagull.jpg',
    description: 'Agile and stylish all-electric hatchback perfect for urban explorers.',
    slug: 'seagull'
  },
  {
    id: '2',
    name: 'BYD SONG PLUS',
    image: '/assets/new/byd-song-plus-white.png',
    description: 'Sophisticated SUV offering impressive performance and efficient hybrid mastery',
    slug: 'song-plus'
  },
  {
    id: '3',
    name: 'DONGFENG VOYAH',
    image: '/assets/new/voyah-dream.jpg',
    description: 'Premium electric vehicle combining luxury, cutting-edge technology, and impressive performance.',
    slug: 'voyah'
  },
  {
    id: '4',
    name: 'BYD SEAL',
    image: '/assets/ev/byd9.png',
    description: 'Luxury electric sedan with exceptional range.',
    slug: 'seal'
  },
  {
    id: '5',
    name: 'BYD ATTO 3',
    image: '/assets/ev/byd-atto3.jpg',
    description: 'Versatile compact SUV for urban adventures.',
    slug: 'atto-3'
  },
  {
    id: '6',
    name: 'BYD DOLPHIN',
    image: '/assets/ev/byd7.png',
    description: 'Smart hatchback for sustainable city living.',
    slug: 'dolphin'
  },
  {
    id: '7',
    name: 'BYD HAN',
    image: '/assets/ev/byd8.png',
    description: 'Premium executive sedan with cutting-edge technology.',
    slug: 'han'
  },
  {
    id: '8',
    name: 'BYD TANG',
    image: '/assets/ev/byd11.png',
    description: 'Revolutionary 7-seat all-wheel-drive electric SUV blending style and performance.',
    slug: 'tang'
  },
  {
    id: '9',
    name: 'BYD SEALION',
    image: '/assets/ev/byd-sealion-7.png',
    description: 'Premium electric SUV with ocean-inspired design and cutting-edge technology.',
    slug: 'sealion'
  },
  {
    id: '10',
    name: 'BYD ATTO 2',
    image: '/assets/ev/atto-2-kv-pc.jpg',
    description: 'Compact electric SUV perfect for families and urban commuters.',
    slug: 'atto-2'
  },
  {
    id: '11',
    name: 'BYD Seal U',
    image: '/assets/ev/byd seal u.jpg',
    description: 'Family-friendly electric SUV with advanced safety and comfort.',
    slug: 'seal-u'
  },
  {
    id: '12',
    name: 'e-KEKE',
    image: '/assets/keke/3q-cover2.png',
    description: 'Eco-friendly electric tricycle for sustainable urban mobility and commercial use.',
    slug: 'keke'
  }
];

export default function page() {
  return (
    <div className="">
      <BYDModels />
      {/* Models Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-12 pt-4 lg:pt-8">
            Explore Our Electric Models
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <div
                key={model.id}
                className="group relative bg-white rounded-xl shadow-xl border border-gray-200/60 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={model.id === '1' || model.id === '2' || model.id === '3'}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{model.name}</h3>
                  <p className="text-gray-700 text-base mb-4">{model.description}</p>
                  <Link
                    href={model.name === 'e-KEKE' ? 'https://www.keketuktuk.com' : `/models/${model.slug}`}
                    className="inline-block px-6 py-3 font-semibold hover:text-white text-black bg-transparent border-2 border-gray-800/70 hover:bg-black hover:border-black transition-all text-lg uppercase tracking-wide"
                  >
                    {model.name === 'e-KEKE' ? 'Electric Keke' : 'Learn More'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
