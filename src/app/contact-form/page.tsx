import ContactSection from '@/components/Contact'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen flex items-center justify-center text-gray-400">Loading contact page...</div>}>
      <ContactSection />
    </Suspense>
  )
}

export default page