
'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'
import Autoplay from 'embla-carousel-autoplay'
import type { EmblaOptionsType } from 'embla-carousel'

interface Highlight {
  id: string
  type: 'image'
  url: string
  alt: string
  title: string
  description: string
}

interface VehicleHighlightCarouselProps {
  highlights: Highlight[]
}

export default function VehicleHighlightCarousel({ highlights }: VehicleHighlightCarouselProps) {
  const options: EmblaOptionsType = {
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  }

  return (
    <section className="w-full bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold text-black mb-8 text-center">
          Vehicle Highlight
        </h2>
        <Carousel
          className="w-full"
          opts={options}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true, stopOnFocusIn: true })]}
        >
          <CarouselContent className="-ml-4">
            {highlights.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                  <div className="relative w-full h-48">
                    <Image
                      src={item.url}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-sm flex-grow">{item.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6 space-x-4">
           <CarouselPrevious
                       className={cn(
                         "relative inset-auto h-10 w-10 rounded-full border border-white/30 bg-black/20",
                         "hover:bg-black/70 hover:border-gray-200 transition-all data-[disabled]:opacity-50"
                       )}
                     >
                       <ChevronLeftIcon className="h-8 w-8 text-white" strokeWidth={2} />
                     </CarouselPrevious>
            <CarouselNext
                        className={cn(
                          "relative inset-auto h-10 w-10 rounded-full border border-white/30 bg-black/20",
                          "hover:bg-black/70 hover:border-gray-200 transition-all data-[disabled]:opacity-50"
                        )}
                      >
                        <ChevronRightIcon className="h-8 w-8 text-white" strokeWidth={2} />
                      </CarouselNext>
          </div>
        </Carousel>
      </div>
    </section>
  )
}
