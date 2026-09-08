"use client"

import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CruiseFilters } from "@/components/cruise-filters"
import { MobileCruiseFilters } from "@/components/mobile-cruise-filters"
import { useSearchParams } from "next/navigation"
import { Calendar as CalendarIcon, MapPin, Users, Star, Ship } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cruises } from "@/lib/data/cruises"

function CruiseSearchContent() {
  const searchParams = useSearchParams()
  const dest = searchParams.get('dest') || "Any Destination"
  const date = searchParams.get('date') || "2025-06-01"
  const passengers = searchParams.get('passengers') || "2"

  // Basic mock filtering based on destination (if it's not "Any Destination")
  let displayCruises = cruises
  if (dest !== "Any Destination") {
    // Check against routeEn for partial matches
    displayCruises = cruises.filter(c => c.routeEn.toLowerCase().includes(dest.toLowerCase()))
    if (displayCruises.length === 0) {
      displayCruises = cruises // fallback if no exact match
    }
  }

  // Format month (e.g. 2025-06-01 -> Jun 2025)
  const displayDate = new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-20">
      
      {/* Dark Header Strip */}
      <div className="bg-[#002f5e] text-white py-6 shadow-md">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="h-6 w-6 text-rose-500" />
                {dest}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-blue-200">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{displayDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>{passengers} Passengers, 1 Cabin</span>
                </div>
              </div>
            </div>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 rounded-lg font-bold text-sm transition-colors">
              Modify Search
            </button>
          </div>
        </div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar: Filters */}
          <div className="hidden lg:block">
            <CruiseFilters />
          </div>

          <MobileCruiseFilters />

          {/* Right Content: Cruise Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {displayCruises.length} {displayCruises.length === 1 ? 'Cruise' : 'Cruises'} found
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium">Sort by:</span>
                <select className="border border-gray-200 rounded-lg p-2 font-bold text-gray-800 bg-white outline-none hover:border-gray-300">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Ship Rating</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {displayCruises.map(cruise => (
                <div key={cruise.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row group">
                  
                  {/* Cruise Image */}
                  <div className="relative w-full md:w-[320px] h-60 md:h-auto shrink-0">
                    <Image 
                      src={cruise.image} 
                      alt={cruise.nameEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded shadow text-xs font-bold text-gray-800 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      {cruise.rating}
                    </div>
                  </div>

                  {/* Cruise Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex gap-1 mb-1">
                            {Array.from({ length: Math.floor(cruise.rating) }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                            ))}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-rose-500 transition-colors">{cruise.nameEn}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <Ship className="w-4 h-4" />
                            {cruise.routeEn} • <span className="text-[#1a73e8] font-medium cursor-pointer hover:underline">View Itinerary</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center justify-center bg-[#002f5e] text-white font-bold px-2.5 py-1.5 rounded text-lg">
                            {cruise.rating}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 font-medium">{cruise.reviews} reviews</div>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                          {cruise.duration}
                        </div>
                        {cruise.tags.map((tag, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded border border-rose-100">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-6 pt-5 border-t border-gray-100">
                      <div>
                        <div className="text-green-600 font-bold text-sm flex items-center gap-1 mb-1">
                          ✓ All meals included
                        </div>
                        <div className="text-xs text-gray-500">Flexible cancellation available</div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="text-xs text-gray-500 font-medium line-through">£{cruise.originalPrice}</span>
                        <div className="text-2xl font-bold text-rose-500 leading-none">£{cruise.price}</div>
                        <span className="text-[11px] text-gray-500 mt-1">per person</span>
                        <Link href={`/cruises/${cruise.id}`}>
                          <button className="mt-3 bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default function CruiseSearchPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />
      <Suspense fallback={<div className="min-h-screen bg-[#fafbfc] pt-24 text-center">Loading cruises...</div>}>
        <CruiseSearchContent />
      </Suspense>
      <Footer />
    </main>
  )
}
