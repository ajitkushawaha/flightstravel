"use client"

import { useState } from "react"
import { Search, MapPin, Calendar as CalendarIcon, Users, ChevronDown, Plane, Building2, Ship, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

export function WanderluxSearchWidget() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("flights")

  // Flights State
  const [tripType, setTripType] = useState("roundTrip")
  const [from, setFrom] = useState("DEL")
  const [to, setTo] = useState("JFK")
  const [departure, setDeparture] = useState<Date | undefined>(new Date(2025, 3, 24))
  const [returnDate, setReturnDate] = useState<Date | undefined>(new Date(2025, 4, 1))
  const [passengers, setPassengers] = useState("1")
  const [travelClass, setTravelClass] = useState("Economy")
  const [isFromOpen, setIsFromOpen] = useState(false)
  const [isToOpen, setIsToOpen] = useState(false)
  const [isTravelersOpen, setIsTravelersOpen] = useState(false)

  // Hotels State
  const [hotelDest, setHotelDest] = useState("Any Destination")
  const [hotelCheckIn, setHotelCheckIn] = useState<Date | undefined>(new Date(2025, 3, 24))
  const [hotelCheckOut, setHotelCheckOut] = useState<Date | undefined>(new Date(2025, 4, 1))
  const [hotelGuests, setHotelGuests] = useState("2")
  const [isHotelDestOpen, setIsHotelDestOpen] = useState(false)
  const [isHotelGuestsOpen, setIsHotelGuestsOpen] = useState(false)

  const [cruiseDest, setCruiseDest] = useState("Any Destination")
  const [cruiseDate, setCruiseDate] = useState<Date | undefined>(new Date(2025, 5, 1))
  const [cruisePassengers, setCruisePassengers] = useState("2")
  const [isCruiseDestOpen, setIsCruiseDestOpen] = useState(false)
  const [isCruiseDateOpen, setIsCruiseDateOpen] = useState(false)
  const [isCruisePassengersOpen, setIsCruisePassengersOpen] = useState(false)

  const handleFlightSearch = () => {
    const params = new URLSearchParams({
      from, to,
      departure: departure ? format(departure, "yyyy-MM-dd") : "",
      return: returnDate ? format(returnDate, "yyyy-MM-dd") : "",
      passengers, class: travelClass, tripType
    })
    router.push(`/flights/search?${params.toString()}`)
  }

  const handleHotelSearch = () => {
    const params = new URLSearchParams({
      dest: hotelDest,
      checkIn: hotelCheckIn ? format(hotelCheckIn, "yyyy-MM-dd") : "",
      checkOut: hotelCheckOut ? format(hotelCheckOut, "yyyy-MM-dd") : "",
      guests: hotelGuests
    })
    router.push(`/hotels/search?${params.toString()}`)
  }

  const handleCruiseSearch = () => {
    const params = new URLSearchParams({
      dest: cruiseDest,
      date: cruiseDate ? format(cruiseDate, "yyyy-MM-dd") : "",
      passengers: cruisePassengers
    })
    router.push(`/cruises/search?${params.toString()}`)
  }

  // Theme colors for buttons to match real homepage
  const getButtonColor = () => {
    if (activeTab === "flights") return "bg-[#ff6000] hover:bg-[#ff6000]/90 shadow-md shadow-orange-500/20"
    if (activeTab === "hotels") return "bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-500/20"
    return "bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-500/20"
  }
  
  const getIconColor = () => {
    if (activeTab === "flights") return "text-[#ff6000]"
    if (activeTab === "hotels") return "text-amber-500"
    return "text-rose-500"
  }

  return (
    <div className="relative w-full drop-shadow-xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col gap-0">
        
        {/* ───── TOP TAB (Cutout Shape) ───── */}
        <div className="relative w-full md:w-[50%] md:bg-white/90 md:backdrop-blur-md md:rounded-t-3xl px-2 md:px-8 py-2 md:py-5 flex md:flex-row md:items-center z-10">
          <TabsList className="flex w-full md:w-fit gap-2 md:gap-0 bg-transparent md:bg-white/50 p-0 md:p-1 rounded-none md:rounded-full h-auto shadow-none md:shadow-sm overflow-x-auto hide-scrollbar">
            <TabsTrigger 
              value="flights" 
              className="flex-1 md:flex-none flex flex-col md:flex-row items-center justify-center gap-1 md:gap-1.5 px-2 md:px-4 py-2 md:py-2 bg-white/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none rounded-xl md:rounded-full text-[12px] md:text-sm font-bold md:font-medium data-[state=active]:bg-[#ff6000] data-[state=active]:text-white shadow-sm md:shadow-none data-[state=active]:shadow-md transition-all border border-white/40 md:border-transparent"
            >
              <Plane className="w-4 h-4 md:w-4 md:h-4" /> Flights
            </TabsTrigger>
            <TabsTrigger 
              value="hotels" 
              className="flex-1 md:flex-none flex flex-col md:flex-row items-center justify-center gap-1 md:gap-1.5 px-2 md:px-4 py-2 md:py-2 bg-white/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none rounded-xl md:rounded-full text-[12px] md:text-sm font-bold md:font-medium data-[state=active]:bg-amber-500 data-[state=active]:text-white shadow-sm md:shadow-none data-[state=active]:shadow-md transition-all border border-white/40 md:border-transparent"
            >
              <Building2 className="w-4 h-4 md:w-4 md:h-4" /> Hotels
            </TabsTrigger>
            <TabsTrigger 
              value="cruises" 
              className="flex-1 md:flex-none flex flex-col md:flex-row items-center justify-center gap-1 md:gap-1.5 px-2 md:px-4 py-2 md:py-2 bg-white/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none rounded-xl md:rounded-full text-[12px] md:text-sm font-bold md:font-medium data-[state=active]:bg-rose-500 data-[state=active]:text-white shadow-sm md:shadow-none data-[state=active]:shadow-md transition-all border border-white/40 md:border-transparent"
            >
              <Ship className="w-4 h-4 md:w-4 md:h-4" /> Cruises
            </TabsTrigger>
          </TabsList>

          {/* Smooth Inner Curve connecting to the bottom body */}
          <div 
            className="hidden md:block absolute -right-6 bottom-0 w-6 h-6 bg-white/80 backdrop-blur-md pointer-events-none"
            style={{ WebkitMaskImage: 'radial-gradient(circle at 100% 0%, transparent 24px, black 24.5px)' }}
          />
        </div>

        {/* ───── BOTTOM BODY ───── */}
        <div className="relative w-full bg-white/90 backdrop-blur-md rounded-b-3xl rounded-tl-3xl rounded-tr-3xl md:rounded-tl-none p-6  z-0">

        {/* ───────────────── FLIGHTS TAB ───────────────── */}
        <TabsContent value="flights" className="mt-0 outline-none">
          <div className="flex flex-col gap-4 md:gap-6">
            
            {/* Trip Type Selector */}
            <div className="flex md:absolute md:-top-[68px] md:right-2 z-20 justify-start md:justify-end w-full md:w-auto">
              <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3 sm:gap-4 bg-white md:bg-white/80 backdrop-blur-md px-4 py-3 md:py-2 rounded-xl md:rounded-full pointer-events-auto border border-gray-200 md:border-white/30 shadow-sm w-full md:w-auto">
                <label className="flex items-center gap-1.5 cursor-pointer text-[13px] font-bold text-gray-800 md:text-black/50 md:drop-shadow-md whitespace-nowrap">
                  <input type="radio" name="tripType" value="roundTrip" checked={tripType === "roundTrip"} onChange={(e) => setTripType(e.target.value)} className="w-4 h-4 accent-[#ff6000]" />
                  Round Trip
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-[13px] font-semibold text-gray-600 md:text-black/50 hover:text-gray-900 md:hover:text-white transition-colors md:drop-shadow-md whitespace-nowrap">
                  <input type="radio" name="tripType" value="oneWay" checked={tripType === "oneWay"} onChange={(e) => setTripType(e.target.value)} className="w-4 h-4 accent-[#ff6000]" />
                  One Way
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-[13px] font-semibold text-gray-600 md:text-black/50 hover:text-gray-900 md:hover:text-white transition-colors md:drop-shadow-md whitespace-nowrap">
                  <input type="radio" name="tripType" value="multiCity" checked={tripType === "multiCity"} onChange={(e) => setTripType(e.target.value)} className="w-4 h-4 accent-[#ff6000]" />
                  Multi-City
                </label>
              </div>
            </div>

            {/* Input Fields Row */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 items-end gap-3 w-full">
              
              {/* From */}
              <div className="flex flex-col gap-1.5 w-full col-span-1">
                <label className="text-xs sm:text-sm font-semibold text-gray-800 ml-1">From</label>
                <Popover open={isFromOpen} onOpenChange={setIsFromOpen}>
                  <PopoverTrigger asChild>
                    <div className="w-full bg-white border border-gray-200 rounded-2xl md:rounded-full px-3 sm:px-4 py-2.5 sm:py-3 hover:border-[#ff6000]/40 transition-colors cursor-pointer flex items-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                      <MapPin className={`h-4 w-4 mr-1.5 sm:mr-2 shrink-0 ${getIconColor()}`} />
                      <span className="font-bold text-[13px] sm:text-[14px] text-gray-800 uppercase truncate flex-1 text-left">{from}</span>
                      <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 hidden sm:block" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-2" align="start">
                    <div className="text-sm font-bold text-gray-800 mb-2 px-2 pt-1">Select Origin City</div>
                    <div className="flex flex-col gap-1">
                      {["DEL - New Delhi", "BOM - Mumbai", "BLR - Bangalore", "LHR - London", "JFK - New York", "DXB - Dubai"].map(city => (
                        <Button key={city} variant="ghost" className="justify-start font-medium" onClick={() => { setFrom(city.split(" ")[0]); setIsFromOpen(false); }}>
                          <MapPin className="mr-2 h-4 w-4" /> {city}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* To */}
              <div className="flex flex-col gap-1.5 w-full col-span-1">
                <label className="text-xs sm:text-sm font-semibold text-gray-800 ml-1">To</label>
                <Popover open={isToOpen} onOpenChange={setIsToOpen}>
                  <PopoverTrigger asChild>
                    <div className="w-full bg-white border border-gray-200 rounded-2xl md:rounded-full px-3 sm:px-4 py-2.5 sm:py-3 hover:border-[#ff6000]/40 transition-colors cursor-pointer flex items-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                      <MapPin className={`h-4 w-4 mr-1.5 sm:mr-2 shrink-0 ${getIconColor()}`} />
                      <span className="font-bold text-[13px] sm:text-[14px] text-gray-800 uppercase truncate flex-1 text-left">{to}</span>
                      <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 hidden sm:block" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-2" align="start">
                    <div className="text-sm font-bold text-gray-800 mb-2 px-2 pt-1">Select Destination</div>
                    <div className="flex flex-col gap-1">
                      {["LHR - London", "JFK - New York", "DXB - Dubai", "SYD - Sydney", "SIN - Singapore", "DEL - New Delhi"].map(city => (
                        <Button key={city} variant="ghost" className="justify-start font-medium" onClick={() => { setTo(city.split(" ")[0]); setIsToOpen(false); }}>
                          <MapPin className="mr-2 h-4 w-4" /> {city}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Departure */}
              <div className={`flex flex-col gap-1.5 w-full col-span-1 ${tripType === 'oneWay' ? 'lg:col-span-2' : ''}`}>
                <label className="text-xs sm:text-sm font-semibold text-gray-800 ml-1">Departure</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="w-full bg-white border border-gray-200 rounded-2xl md:rounded-full px-3 sm:px-4 py-2.5 sm:py-3 hover:border-[#ff6000]/40 transition-colors cursor-pointer flex items-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                      <CalendarIcon className={`h-4 w-4 mr-1.5 sm:mr-2 shrink-0 ${getIconColor()}`} />
                      <span className="font-bold text-[13px] sm:text-[14px] text-gray-800 truncate flex-1 text-left">{departure ? format(departure, "dd MMM") : "Select"}</span>
                      <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 hidden sm:block" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4" align="start">
                    <Calendar mode="single" selected={departure} onSelect={setDeparture} disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} className="rounded-md border shadow-sm" />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Return */}
              {tripType !== 'oneWay' && (
                <div className="flex flex-col gap-1.5 w-full col-span-1">
                  <label className="text-xs sm:text-sm font-semibold text-gray-800 ml-1">Return</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="w-full bg-white border border-gray-200 rounded-2xl md:rounded-full px-3 sm:px-4 py-2.5 sm:py-3 hover:border-[#ff6000]/40 transition-colors cursor-pointer flex items-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                        <CalendarIcon className={`h-4 w-4 mr-1.5 sm:mr-2 shrink-0 ${getIconColor()}`} />
                        <span className="font-bold text-[13px] sm:text-[14px] text-gray-800 truncate flex-1 text-left">{returnDate ? format(returnDate, "dd MMM") : "Select"}</span>
                        <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 hidden sm:block" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4" align="start">
                      <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0)) || (!!departure && date < departure)} className="rounded-md border shadow-sm" />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {/* Travelers */}
              <div className={`flex flex-col gap-1.5 w-full ${tripType === 'oneWay' ? 'col-span-1 lg:col-span-1' : 'col-span-2 md:col-span-1 lg:col-span-1'}`}>
                <label className="text-xs sm:text-sm font-semibold text-gray-800 ml-1">Passengers</label>
                <Popover open={isTravelersOpen} onOpenChange={setIsTravelersOpen}>
                  <PopoverTrigger asChild>
                    <div className="w-full bg-white border border-gray-200 rounded-full px-4 py-3 hover:border-[#ff6000]/40 transition-colors cursor-pointer flex items-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                      <Users className={`h-4 w-4 mr-2 shrink-0 ${getIconColor()}`} />
                      <span className="font-bold text-[14px] text-gray-800 truncate flex-1 text-left">{passengers} Pax, {travelClass.split(" ")[0]}</span>
                      <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-4" align="start">
                    <div className="text-sm font-bold text-gray-800 mb-4">Travelers & Cabin Class</div>
                    <div className="flex flex-col gap-5">
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-2">Passengers</label>
                        <div className="grid grid-cols-4 gap-2">
                          {["1", "2", "3", "4+"].map(num => (
                            <Button key={num} variant={passengers === num.replace("+", "") ? "default" : "outline"} className={`h-10 ${passengers === num.replace("+", "") ? "bg-[#ff6000] text-white hover:bg-[#ff6000]/90" : ""}`} onClick={() => setPassengers(num.replace("+", ""))}>{num}</Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-2">Cabin Class</label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Economy", "Premium", "Business", "First"].map(cls => (
                            <Button key={cls} variant={travelClass.includes(cls) ? "default" : "outline"} className={`h-10 text-xs ${travelClass.includes(cls) ? "bg-[#ff6000] text-white hover:bg-[#ff6000]/90" : ""}`} onClick={() => { setTravelClass(cls === "Premium" ? "Premium Economy" : cls === "First" ? "First Class" : cls); setIsTravelersOpen(false); }}>{cls}</Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Search Button */}
              <div className="w-full col-span-2 md:col-span-1 lg:col-span-1">
                <Button onClick={handleFlightSearch} className={`w-full rounded-full h-[46px] text-white text-[15px] font-bold tracking-wide transition-colors ${getButtonColor()}`}>
                  <Search className="h-4 w-4 mr-1.5" /> SEARCH
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ───────────────── HOTELS TAB ───────────────── */}
        <TabsContent value="hotels" className="mt-0 outline-none">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 items-end gap-3 w-full">
            
            {/* Destination */}
            <div className="flex flex-col gap-1.5 w-full col-span-2 lg:col-span-1">
              <label className="text-xs sm:text-sm font-semibold text-gray-800 ml-1">Where to?</label>
              <Popover open={isHotelDestOpen} onOpenChange={setIsHotelDestOpen}>
                <PopoverTrigger asChild>
                  <div className="w-full bg-white border border-gray-200 rounded-2xl md:rounded-full px-3 sm:px-4 py-2.5 sm:py-3 hover:border-amber-500/40 transition-colors cursor-pointer flex items-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                    <MapPin className={`h-4 w-4 mr-1.5 sm:mr-2 shrink-0 ${getIconColor()}`} />
                    <span className="font-bold text-[13px] sm:text-[14px] text-gray-800 uppercase truncate flex-1 text-left">{hotelDest}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 hidden sm:block" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-2" align="start">
                  <div className="text-sm font-bold text-gray-800 mb-2 px-2 pt-1">Select Destination</div>
                  <div className="flex flex-col gap-1">
                    {["Any Destination", "London", "Paris", "New York", "Dubai"].map(city => (
                      <Button key={city} variant="ghost" className="justify-start font-medium" onClick={() => { setHotelDest(city); setIsHotelDestOpen(false); }}>
                        <MapPin className="mr-2 h-4 w-4" /> {city}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Check In */}
            <div className="flex flex-col gap-1.5 w-full col-span-1">
              <label className="text-xs sm:text-sm font-semibold text-gray-800 ml-1">Check In</label>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="w-full bg-white border border-gray-200 rounded-2xl md:rounded-full px-3 sm:px-4 py-2.5 sm:py-3 hover:border-amber-500/40 transition-colors cursor-pointer flex items-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                    <CalendarIcon className={`h-4 w-4 mr-1.5 sm:mr-2 shrink-0 ${getIconColor()}`} />
                    <span className="font-bold text-[13px] sm:text-[14px] text-gray-800 truncate flex-1 text-left">{hotelCheckIn ? format(hotelCheckIn, "dd MMM") : "Select"}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 hidden sm:block" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                  <Calendar mode="single" selected={hotelCheckIn} onSelect={setHotelCheckIn} disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} className="rounded-md border shadow-sm" />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check Out */}
            <div className="flex flex-col gap-1.5 w-full col-span-1">
              <label className="text-xs sm:text-sm font-semibold text-gray-800 ml-1">Check Out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="w-full bg-white border border-gray-200 rounded-2xl md:rounded-full px-3 sm:px-4 py-2.5 sm:py-3 hover:border-amber-500/40 transition-colors cursor-pointer flex items-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                    <CalendarIcon className={`h-4 w-4 mr-1.5 sm:mr-2 shrink-0 ${getIconColor()}`} />
                    <span className="font-bold text-[13px] sm:text-[14px] text-gray-800 truncate flex-1 text-left">{hotelCheckOut ? format(hotelCheckOut, "dd MMM") : "Select"}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 hidden sm:block" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                  <Calendar mode="single" selected={hotelCheckOut} onSelect={setHotelCheckOut} disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0)) || (!!hotelCheckIn && date < hotelCheckIn)} className="rounded-md border shadow-sm" />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-1.5 w-full col-span-2 md:col-span-1 lg:col-span-1">
              <label className="text-xs sm:text-sm font-semibold text-gray-800 ml-1">Guests</label>
              <Popover open={isHotelGuestsOpen} onOpenChange={setIsHotelGuestsOpen}>
                <PopoverTrigger asChild>
                  <div className="w-full bg-white border border-gray-200 rounded-full px-4 py-3 hover:border-amber-500/40 transition-colors cursor-pointer flex items-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                    <Users className={`h-4 w-4 mr-2 shrink-0 ${getIconColor()}`} />
                    <span className="font-bold text-[14px] text-gray-800 truncate flex-1 text-left">{hotelGuests} Guests, 1 Rm</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-4" align="start">
                  <div className="text-sm font-bold text-gray-800 mb-4">Guests</div>
                  <div className="grid grid-cols-4 gap-2">
                    {["1", "2", "3", "4+"].map(num => (
                      <Button key={num} variant={hotelGuests === num.replace("+", "") ? "default" : "outline"} className={`h-10 ${hotelGuests === num.replace("+", "") ? "bg-amber-500 text-white hover:bg-amber-600" : ""}`} onClick={() => setHotelGuests(num.replace("+", ""))}>{num}</Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            <div className="w-full col-span-2 md:col-span-1 lg:col-span-1">
              <Button onClick={handleHotelSearch} className={`w-full rounded-full h-[46px] text-white text-[15px] font-bold tracking-wide transition-colors ${getButtonColor()}`}>
                <Search className="h-4 w-4 mr-1.5" /> SEARCH
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ───────────────── CRUISES TAB ───────────────── */}
        <TabsContent value="cruises" className="mt-0 outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end gap-3 w-full">
            
            {/* Destination */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-semibold text-gray-800 ml-1">Going to</label>
              <Popover open={isCruiseDestOpen} onOpenChange={setIsCruiseDestOpen}>
                <PopoverTrigger asChild>
                  <div className="w-full bg-white border border-gray-200 rounded-full px-4 py-3 hover:border-rose-500/40 transition-colors cursor-pointer flex items-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                    <MapPin className={`h-4 w-4 mr-2 ${getIconColor()}`} />
                    <span className="font-bold text-[14px] text-gray-800 uppercase truncate flex-1 text-left">{cruiseDest}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-2" align="start">
                  <div className="text-sm font-bold text-gray-800 mb-2 px-2 pt-1">Select Destination</div>
                  <div className="flex flex-col gap-1">
                    {["Any Destination", "Alaskan Glacier", "Mediterranean Explorer", "Caribbean Paradise", "Norwegian Fjords"].map(city => (
                      <Button key={city} variant="ghost" className="justify-start font-medium" onClick={() => { setCruiseDest(city); setIsCruiseDestOpen(false); }}>
                        <MapPin className="mr-2 h-4 w-4" /> {city}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-semibold text-gray-800 ml-1">When</label>
              <Popover open={isCruiseDateOpen} onOpenChange={setIsCruiseDateOpen}>
                <PopoverTrigger asChild>
                  <div className="w-full bg-white border border-gray-200 rounded-full px-4 py-3 hover:border-rose-500/40 transition-colors cursor-pointer flex items-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                    <CalendarIcon className={`h-4 w-4 mr-2 ${getIconColor()}`} />
                    <span className="font-bold text-[14px] text-gray-800 truncate flex-1 text-left">{cruiseDate ? format(cruiseDate, "dd MMM yyyy") : "Select"}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                  <Calendar mode="single" selected={cruiseDate} onSelect={(date) => { setCruiseDate(date); if (date) setIsCruiseDateOpen(false); }} disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} className="rounded-md border shadow-sm" />
                </PopoverContent>
              </Popover>
            </div>

            {/* Passengers */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-semibold text-gray-800 ml-1">Passengers</label>
              <Popover open={isCruisePassengersOpen} onOpenChange={setIsCruisePassengersOpen}>
                <PopoverTrigger asChild>
                  <div className="w-full bg-white border border-gray-200 rounded-full px-4 py-3 hover:border-rose-500/40 transition-colors cursor-pointer flex items-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                    <Users className={`h-4 w-4 mr-2 ${getIconColor()}`} />
                    <span className="font-bold text-[14px] text-gray-800 truncate flex-1 text-left">{cruisePassengers} Pax, 1 Cabin</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-4" align="start">
                  <div className="text-sm font-bold text-gray-800 mb-4">Passengers</div>
                  <div className="grid grid-cols-4 gap-2">
                    {["1", "2", "3", "4+"].map(num => (
                      <Button key={num} variant={cruisePassengers === num.replace("+", "") ? "default" : "outline"} className={`h-10 ${cruisePassengers === num.replace("+", "") ? "bg-rose-500 text-white hover:bg-rose-600" : ""}`} onClick={() => setCruisePassengers(num.replace("+", ""))}>{num}</Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            <div className="w-full">
              <Button onClick={handleCruiseSearch} className={`w-full rounded-full h-[46px] text-white text-[15px] font-bold tracking-wide transition-colors ${getButtonColor()}`}>
                <Search className="h-4 w-4 mr-1.5" /> SEARCH
              </Button>
            </div>
          </div>
        </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
