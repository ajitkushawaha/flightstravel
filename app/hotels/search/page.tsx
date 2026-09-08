"use client"

import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HotelFilters } from "@/components/hotel-filters"
import { useSearchParams } from "next/navigation"
import { Calendar as CalendarIcon, MapPin, Users, Star, Bed, Wifi, Car, Tv, Bath } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { hotels } from "@/lib/data/hotels"

function HotelSearchContent() {
  const searchParams = useSearchParams()
  const dest = searchParams.get('dest') || "Any Destination"
  const checkIn = searchParams.get('checkIn') || "24 Apr 2025"
  const checkOut = searchParams.get('checkOut') || "1 May 2025"
  const guests = searchParams.get('guests') || "2"

  // Basic mock filtering based on destination (if it's not "Any Destination")
  let displayHotels = hotels
  if (dest !== "Any Destination") {
    displayHotels = hotels.filter(h => h.location.toLowerCase().includes(dest.toLowerCase()))
    if (displayHotels.length === 0) {
      displayHotels = hotels // fallback if no exact match
    }
  }

  // Icons map
  const getIcon = (name: string) => {
    switch(name) {
      case "Bed": return <Bed className="w-4 h-4" />
      case "Wifi": return <Wifi className="w-4 h-4" />
      case "Car": return <Car className="w-4 h-4" />
      case "Tv": return <Tv className="w-4 h-4" />
      case "Bath": return <Bath className="w-4 h-4" />
      default: return <Bed className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-20">
      
      {/* Dark Header Strip */}
      <div className="bg-[#002f5e] text-white py-6 shadow-md">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="h-6 w-6 text-orange-400" />
                {dest}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-blue-200">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{checkIn} - {checkOut}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>{guests} Guests, 1 Room</span>
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
          <HotelFilters />

          {/* Right Content: Hotel Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {displayHotels.length} {displayHotels.length === 1 ? 'Property' : 'Properties'} found
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium">Sort by:</span>
                <select className="border border-gray-200 rounded-lg p-2 font-bold text-gray-800 bg-white outline-none hover:border-gray-300">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Guest Rating</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {displayHotels.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row group">
                  
                  {/* Hotel Image */}
                  <div className="relative w-full md:w-[320px] h-60 md:h-auto shrink-0">
                    <Image 
                      src={hotel.image} 
                      alt={hotel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded shadow text-xs font-bold text-gray-800 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      {hotel.rating}
                    </div>
                  </div>

                  {/* Hotel Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex gap-1 mb-1">
                            {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#ff6000] text-[#ff6000]" />
                            ))}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1a73e8] transition-colors">{hotel.title}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <MapPin className="w-4 h-4" />
                            {hotel.location} • <span className="text-[#1a73e8] font-medium cursor-pointer hover:underline">Show on map</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center justify-center bg-[#002f5e] text-white font-bold px-2.5 py-1.5 rounded text-lg">
                            {hotel.rating}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 font-medium">{hotel.reviews} reviews</div>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-5">
                        {hotel.icons.slice(0, 3).map((icon, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded">
                            {getIcon(icon)}
                            {icon}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-6 pt-5 border-t border-gray-100">
                      <div>
                        <div className="text-green-600 font-bold text-sm flex items-center gap-1 mb-1">
                          ✓ Free cancellation
                        </div>
                        <div className="text-xs text-gray-500">No prepayment needed – pay at the property</div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="text-xs text-gray-500 font-medium line-through">£{hotel.originalPrice}</span>
                        <div className="text-2xl font-bold text-[#ff6000] leading-none">£{hotel.price}</div>
                        <span className="text-[11px] text-gray-500 mt-1">Includes taxes and fees</span>
                        <Link href={`/hotels/${hotel.id}`}>
                          <button className="mt-3 bg-[#1a73e8] hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors">
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

export default function HotelSearchPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />
      <Suspense fallback={<div className="min-h-screen bg-[#fafbfc] pt-24 text-center">Loading hotels...</div>}>
        <HotelSearchContent />
      </Suspense>
      <Footer />
    </main>
  )
}
