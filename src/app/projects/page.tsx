// app/projects/page.tsx
import React from 'react'
import PortfolioSection from '@/components/PortfolioSection'
import Image from 'next/image'
import Link from 'next/link'

// Demo project data – replace with real DB/data fetch
const projects = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    image: '/assets/byd/song-plus-3qv.jpg',
    description: 'Full-stack Next.js + FastAPI online store with Paystack integration.',
    slug: 'ecommerce-platform'
  },
  {
    id: '2',
    name: 'Business Dashboard',
    image: '/assets/byd/song-plus-back.jpg',
    description: 'Custom analytics dashboard with real-time data and AI insights.',
    slug: 'business-dashboard'
  },
  {
    id: '3',
    name: 'Corporate Website',
    image: '/assets/byd/song-plus-bonnet.jpg',
    description: 'Modern responsive site with advanced SEO and content management.',
    slug: 'corporate-website'
  },
  {
    id: '4',
    name: 'SaaS Landing Page',
    image: '/assets/byd/song-plus-dashboard.jpg',
    description: 'High-conversion landing page with animations and lead forms.',
    slug: 'saas-landing-page'
  },
  {
    id: '5',
    name: 'AI-Powered Tool',
    image: '/assets/byd/songplus.jpg',
    description: 'Web app integrating custom AI models for content generation.',
    slug: 'ai-powered-tool'
  },
  {
    id: '6',
    name: 'Mobile-First Site',
    image: '/assets/byd/song-plus-others.jpg',
    description: 'Lightning-fast progressive web app for local business.',
    slug: 'mobile-first-site'
  },
];

export default function ProjectsPage() {
  return (
    <div className="">
      <PortfolioSection />
      {/* Projects Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-12 pt-4 lg:pt-8">
            Explore Our Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-white rounded-xl shadow-xl border border-gray-200/60 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={project.id === '1' || project.id === '2' || project.id === '3'}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-gray-700 text-base mb-4">{project.description}</p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-block px-6 py-3 font-semibold hover:text-white text-black bg-transparent border-2 border-gray-800/70 hover:bg-black hover:border-black transition-all text-lg uppercase tracking-wide"
                  >
                    Learn More
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