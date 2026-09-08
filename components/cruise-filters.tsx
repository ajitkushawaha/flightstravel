"use client"

import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Star } from "lucide-react"

export function CruiseFilters() {
  return (
    <aside className="w-full lg:w-72 shrink-0 bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6 lg:sticky lg:top-28 h-max max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button className="text-sm font-medium text-gray-400 hover:text-gray-600 underline">
          Clear All
        </button>
      </div>

      {/* Price */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Price per person</h3>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">£100</span>
          <span className="text-sm text-gray-600">£5000+</span>
        </div>
        <Slider 
          defaultValue={[100, 5000]} 
          min={0} 
          max={6000} 
          step={50} 
          className="w-full **:[[role=slider]]:border-rose-500 **:[[role=slider]]:border-2 **:[[role=slider]]:w-5 **:[[role=slider]]:h-5 **:data-[slot=slider-range]:bg-rose-500" 
        />
      </div>

      {/* Cruise Line */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Cruise Line</h3>
        <div className="flex flex-col gap-3">
          {['Norwegian Cruise Line', 'Carnival', 'Royal Caribbean', 'Princess Cruises', 'Celebrity Cruises'].map(line => (
            <label key={line} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox id={line} className="border-gray-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">{line}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Duration</h3>
        <div className="flex flex-col gap-3">
          {['1-4 Nights', '5-8 Nights', '9-14 Nights', '15+ Nights'].map(duration => (
            <label key={duration} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox id={duration} className="border-gray-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">{duration}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags / Theme */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Cruise Theme</h3>
          <button className="text-sm font-medium text-gray-400 hover:text-gray-600 underline">Select All</button>
        </div>
        <div className="flex flex-col gap-3">
          {['Luxury', 'Romantic', 'Family', 'Adventure', 'Adults Only'].map(theme => (
            <label key={theme} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox id={theme} className="border-gray-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">{theme}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-gray-800">Ship Rating</h3>
        <div className="flex flex-col gap-3">
          {[5, 4, 3].map(stars => (
            <label key={stars} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox id={`star-${stars}`} className="border-gray-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500" />
              <div className="flex items-center gap-1 group-hover:text-gray-900">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

    </aside>
  )
}
