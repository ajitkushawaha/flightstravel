"use client"

import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export function FlightFilters({ className }: { className?: string }) {
  return (
    <aside className={cn("w-full lg:w-72 shrink-0 bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6 lg:sticky lg:top-28 h-max max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar", className)}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button className="text-sm font-medium text-gray-400 hover:text-gray-600 underline">
          Clear All
        </button>
      </div>

      {/* Stops */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Stops</h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <Checkbox id="direct" className="border-gray-300 data-[state=checked]:bg-[#2cb1e8] data-[state=checked]:border-[#2cb1e8]" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">Direct</span>
            </div>
            <span className="text-xs font-bold text-gray-600">£547</span>
          </label>
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <Checkbox id="1stop" className="border-gray-300 data-[state=checked]:bg-[#2cb1e8] data-[state=checked]:border-[#2cb1e8]" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">1 Stop</span>
            </div>
            <span className="text-xs font-bold text-gray-600">£0</span>
          </label>
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Price</h3>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">£547</span>
          <span className="text-sm text-gray-600">£569</span>
        </div>
        <Slider 
          defaultValue={[547, 569]} 
          min={0} 
          max={1000} 
          step={1} 
          className="w-full **:[[role=slider]]:border-[#2cb1e8] **:[[role=slider]]:border-2 **:[[role=slider]]:w-5 **:[[role=slider]]:h-5 **:data-[slot=slider-range]:bg-[#2cb1e8]" 
        />
      </div>

      {/* Outbound Departure */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Outbound Departure</h3>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">00:00</span>
          <span className="text-sm text-gray-600">23:59</span>
        </div>
        <Slider 
          defaultValue={[0, 1439]} 
          min={0} 
          max={1439} 
          step={1} 
          className="w-full [&_[role=slider]]:border-[#2cb1e8] [&_[role=slider]]:border-2 [&_[role=slider]]:w-5 [&_[role=slider]]:h-5 [&_[data-slot=slider-range]]:bg-[#2cb1e8]" 
        />
      </div>

      {/* Inbound Departure */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Inbound Departure</h3>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">00:00</span>
          <span className="text-sm text-gray-600">23:59</span>
        </div>
        <Slider 
          defaultValue={[0, 1439]} 
          min={0} 
          max={1439} 
          step={1} 
          className="w-full [&_[role=slider]]:border-[#2cb1e8] [&_[role=slider]]:border-2 [&_[role=slider]]:w-5 [&_[role=slider]]:h-5 [&_[data-slot=slider-range]]:bg-[#2cb1e8]" 
        />
      </div>

      {/* Connection Length */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Connection Length</h3>
          <button className="text-sm font-medium text-gray-400 hover:text-gray-600 underline">
            Clear All
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {['Short Connection (0 - 2 hours)', 'Relaxed Connection (2 - 4 hours)', 'Long Connection (4 - 8 hours)', 'Longer Connection (8+ hours)'].map(label => (
            <label key={label} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox id={label} className="border-gray-300 data-[state=checked]:bg-[#2cb1e8] data-[state=checked]:border-[#2cb1e8]" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cabins */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Cabins</h3>
        <div className="flex flex-col gap-3">
          {['Economy', 'Business', 'Premium Economy', 'First'].map((label, i) => (
            <label key={label} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox id={label} defaultChecked={i === 0} className="border-gray-300 data-[state=checked]:bg-[#2cb1e8] data-[state=checked]:border-[#2cb1e8]" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Airlines */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Airlines</h3>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-gray-400 hover:text-gray-600 underline">Select All</button>
            <button className="text-sm font-medium text-gray-400 hover:text-gray-600 underline">Clear All</button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <Checkbox id="airline1" className="border-gray-300 data-[state=checked]:bg-[#2cb1e8] data-[state=checked]:border-[#2cb1e8]" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">Etihad Airways</span>
            </div>
            <span className="text-xs font-bold text-gray-600">£547</span>
          </label>
        </div>
      </div>

    </aside>
  )
}
