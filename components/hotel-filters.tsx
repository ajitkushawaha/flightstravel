"use client"

import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Star } from "lucide-react"

export function HotelFilters({ className }: { className?: string }) {
  return (
    <div className={className || "w-full lg:w-72 shrink-0 bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6 lg:sticky lg:top-28 h-max max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar"}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button className="text-sm font-medium text-gray-400 hover:text-gray-600 underline">
          Clear All
        </button>
      </div>

      {/* Price */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Price per night</h3>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">£50</span>
          <span className="text-sm text-gray-600">£1000+</span>
        </div>
        <Slider 
          defaultValue={[50, 1000]} 
          min={0} 
          max={1500} 
          step={10} 
          className="w-full [&_[role=slider]]:border-[#ff6000] [&_[role=slider]]:border-2 [&_[role=slider]]:w-5 [&_[role=slider]]:h-5 [&_[data-slot=slider-range]]:bg-[#ff6000]" 
        />
      </div>

      {/* Star Rating */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Star Rating</h3>
        <div className="flex flex-col gap-3">
          {[5, 4, 3, 2, 1].map(stars => (
            <label key={stars} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox id={`star-${stars}`} className="border-gray-300 data-[state=checked]:bg-[#ff6000] data-[state=checked]:border-[#ff6000]" />
              <div className="flex items-center gap-1 group-hover:text-gray-900">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#ff6000] text-[#ff6000]" />
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Property Type</h3>
        <div className="flex flex-col gap-3">
          {['Hotels', 'Resorts', 'Apartments', 'Villas', 'Guest Houses'].map(type => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox id={type} className="border-gray-300 data-[state=checked]:bg-[#ff6000] data-[state=checked]:border-[#ff6000]" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Popular Amenities</h3>
          <button className="text-sm font-medium text-gray-400 hover:text-gray-600 underline">Select All</button>
        </div>
        <div className="flex flex-col gap-3">
          {['Free WiFi', 'Swimming Pool', 'Spa & Wellness', 'Fitness Centre', 'Restaurant', 'Room Service', 'Parking'].map(amenity => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox id={amenity} className="border-gray-300 data-[state=checked]:bg-[#ff6000] data-[state=checked]:border-[#ff6000]" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Distance from Center */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-gray-800">Distance from Center</h3>
        <div className="flex flex-col gap-3">
          {['Less than 1 km', '1 to 3 km', '3 to 5 km', '5+ km'].map(dist => (
            <label key={dist} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox id={dist} className="border-gray-300 data-[state=checked]:bg-[#ff6000] data-[state=checked]:border-[#ff6000]" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">{dist}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  )
}
