import ContactSection from '@/components/Contact'
import React, { Suspense } from 'react'

function ContactPage() {
  return (
    <Suspense fallback={
      <div className="bg-black text-gray-100 py-20 px-6 md:px-12 lg:px-24 min-h-screen">
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-800 rounded w-96 mx-auto mb-8"></div>
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="h-64 bg-gray-800 rounded-2xl"></div>
              <div className="h-96 bg-gray-800 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <ContactSection />
    </Suspense>
  )
}

export default ContactPage