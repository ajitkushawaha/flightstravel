"use client"

import { useState, Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FlightDeals } from "@/components/flight-deals"
import { Inspiration } from "@/components/inspiration"
import { WhyChooseUs } from "@/components/why-choose-us"
import { HotDeals } from "@/components/hot-deals"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

import { HotelCategories } from "@/components/hotel-categories"
import { FeaturedHotels } from "@/components/featured-hotels"
import { FeaturedCruises } from "@/components/featured-cruises"
import { Destinations } from "@/components/destinations"

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  
  const [activeTab, setActiveTab] = useState(tabParam || "flights")

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.replace(`/?tab=${tab}`, { scroll: false })
  }

  return (
    <div className={`theme-${activeTab} transition-colors duration-500`}>
      <Header />
      <HeroSection activeTab={activeTab} setActiveTab={handleTabChange} />

      {activeTab === "flights" && (
        <>
          <FlightDeals />
          <Inspiration />
          <WhyChooseUs />
          <HotDeals />
          <Testimonials />
        </>
      )}

      {activeTab === "hotels" && (
        <div className="container max-w-[1200px] mx-auto px-4 py-16 space-y-20 ">
          <HotelCategories />
          <FeaturedHotels />
        </div>
      )}

      {activeTab === "cruises" && (
        <div className="container max-w-[1200px] mx-auto px-4 bg-background space-y-20">
          <FeaturedCruises />
          <Destinations/>
        </div>
      )}

      <Newsletter />
      <Footer />
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="min-h-screen bg-[#002f5e]"></div>}>
        <HomeContent />
      </Suspense>
    </main>
  )
}
