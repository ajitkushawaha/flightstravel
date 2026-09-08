"use client"

import * as React from "react"
import { SlidersHorizontal, ArrowDownUp, Plane, MapPin } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FlightFilters } from "@/components/flight-filters"
import { Switch } from "@/components/ui/switch"

export function MobileFlightFilters() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 pb-safe">
        <div className="flex items-center justify-between px-2 py-2">
          
          {/* Main Filters Button (Opens Sheet) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center w-1/5 py-1 text-gray-600 hover:text-[#2cb1e8] relative">
                <div className="relative">
                  <SlidersHorizontal className="w-5 h-5 mb-1" />
                  <span className="absolute -top-1.5 -right-2 bg-[#2cb1e8] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                </div>
                <span className="text-[10px] font-medium">Filters</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] p-0 flex flex-col rounded-t-2xl">
              <SheetHeader className="px-5 py-4 border-b border-gray-100 shrink-0">
                <SheetTitle className="text-left text-lg font-bold text-gray-800">Filter & Sort</SheetTitle>
              </SheetHeader>
              {/* Reuse the existing FlightFilters component, but we'll let it scroll inside the sheet */}
              <div className="flex-1 overflow-y-auto px-5 py-2 custom-scrollbar">
                <FlightFilters className="border-none shadow-none p-0 lg:p-0" />
              </div>
              {/* Apply Button for Mobile */}
              <div className="p-4 border-t border-gray-100 bg-white shrink-0 pb-safe">
                <button 
                  onClick={() => setOpen(false)}
                  className="w-full bg-[#ff7b3a] text-white font-bold py-3 rounded-lg text-[15px]"
                >
                  Apply Filters
                </button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Cheapest Button */}
          <button className="flex flex-col items-center justify-center w-1/5 py-1 text-gray-600 hover:text-[#2cb1e8]">
            <ArrowDownUp className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Cheapest</span>
          </button>

          {/* Airlines Button */}
          <button className="flex flex-col items-center justify-center w-1/5 py-1 text-gray-600 hover:text-[#2cb1e8]">
            <Plane className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Airlines</span>
          </button>

          {/* Nearby Airport Button */}
          <button className="flex flex-col items-center justify-center w-1/5 py-1 text-gray-600 hover:text-[#2cb1e8]">
            <div className="relative">
              <MapPin className="w-5 h-5 mb-1" />
              <span className="absolute -top-1.5 -right-2 bg-[#2cb1e8] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">2</span>
            </div>
            <span className="text-[10px] font-medium">Nearby</span>
          </button>

          {/* Non-Stop Toggle */}
          <div className="flex flex-col items-center justify-center w-1/5 py-1 text-[#2cb1e8]">
            <div className="mb-1 h-5 flex items-center">
               <Switch defaultChecked className="data-[state=checked]:bg-[#2cb1e8] scale-75 origin-center" />
            </div>
            <span className="text-[10px] font-medium">Non-Stop</span>
          </div>

        </div>
      </div>
    </>
  )
}
