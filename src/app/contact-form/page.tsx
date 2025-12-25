import ContactSection from '@/components/Contact'
import React, { Suspense } from 'react'

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="bg-black min-h-screen py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-800 rounded w-96 mx-auto mb-8"></div>
              <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div className="h-64 bg-gray-800 rounded-2xl"></div>
                </div>
                <div className="space-y-12">
                  <div className="h-96 bg-gray-800 rounded-2xl"></div>
                  <div className="h-96 bg-gray-800 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <ContactSection />
    </Suspense>
  )
}