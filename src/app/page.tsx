
import ChargingSection from "@/components/Charging"
import CostSavingsCalculator from "@/components/CostCalculator"
import EnquiryForm from "@/components/Enquiry"
import HeroSection from "@/components/Hero"
import MeetBYDFamily from "@/components/MeetBYDFamily"
import TestimonialsSection from "@/components/Testimonials"
import WarrantyAfterSales from "@/components/Warranty"
import WhyBYDSection from "@/components/WhyBYD"


function page() {
  return (
    <div className='bg-gray-950'>
      <HeroSection />
      <WhyBYDSection />
      <MeetBYDFamily />
      <CostSavingsCalculator />
      <TestimonialsSection />
      <ChargingSection />
      <WarrantyAfterSales />
      <EnquiryForm />
    </div>
  )
}

export default page