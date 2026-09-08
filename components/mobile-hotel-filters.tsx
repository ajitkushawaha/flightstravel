"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HotelFilters } from "./hotel-filters"

export function MobileHotelFilters() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="w-full bg-[#1a365d] hover:bg-[#1a365d]/90 text-white font-bold h-[52px] rounded-full flex items-center justify-center gap-2 text-[16px]">
            <Filter className="w-5 h-5" />
            Sort & Filter
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl px-0 pb-0 flex flex-col pt-0 gap-0">
          <SheetHeader className="p-5 border-b border-gray-100 flex-row items-center justify-between space-y-0 sticky top-0 bg-white z-10 rounded-t-3xl">
            <SheetTitle className="text-xl font-bold text-[#002f5e]">Sort & Filter</SheetTitle>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full h-8 w-8 text-gray-500">
              <X className="h-5 w-5" />
            </Button>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-gray-50">
            <HotelFilters className="w-full flex flex-col gap-6" />
          </div>

          <div className="p-4 bg-white border-t border-gray-200 grid grid-cols-2 gap-3 sticky bottom-0 z-10">
            <Button variant="outline" className="h-[48px] rounded-xl font-bold border-gray-300 text-gray-700" onClick={() => setOpen(false)}>
              Clear All
            </Button>
            <Button className="h-[48px] rounded-xl font-bold bg-[#ff6000] hover:bg-[#e05500] text-white" onClick={() => setOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
