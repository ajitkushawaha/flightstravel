"use client"

import { useState } from "react"
import { Search, MapPin, Calendar as CalendarIcon, Users, ChevronDown, Shield, Headphones, Lock, Plane, Building2, Ship, Map, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

interface HeroSectionProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function HeroSection({ activeTab, setActiveTab }: HeroSectionProps) {
  const router = useRouter()
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
      from,
      to,
      departure: departure ? format(departure, "yyyy-MM-dd") : "",
      return: returnDate ? format(returnDate, "yyyy-MM-dd") : "",
      passengers,
      class: travelClass,
      tripType
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

  // Dynamic Theme Colors
  const themeStyles = {
    flights: {
      overlay: "from-[#002f5e]/90 via-[#002f5e]/50 to-[#002f5e]/20",
      button: "bg-[#ff6000] hover:bg-[#ff6000]/90 shadow-[0_4px_14px_rgba(255,96,0,0.35)]",
      tabBorder: "data-[state=active]:after:bg-[#1a73e8]",
      tabText: "data-[state=active]:text-[#1a73e8]",
      valPropIconBg: "bg-blue-200",
      valPropIcon: "text-[#002f5e]",
      valPropText: "text-[#002f5e]"
    },
    hotels: {
      overlay: "from-yellow-900/95 via-yellow-800/80 to-yellow-900/40",
      button: "bg-amber-500 hover:bg-amber-600 shadow-[0_4px_14px_rgba(245,158,11,0.35)]",
      tabBorder: "data-[state=active]:after:bg-yellow-500",
      tabText: "data-[state=active]:text-yellow-600",
      valPropIconBg: "bg-yellow-100",
      valPropIcon: "text-amber-600",
      valPropText: "text-yellow-700"
    },
    cruises: {
      overlay: "from-cyan-900/95 via-cyan-800/80 to-cyan-900/40",
      button: "bg-rose-500 hover:bg-rose-600 shadow-[0_4px_14px_rgba(244,63,94,0.35)]",
      tabBorder: "data-[state=active]:after:bg-cyan-600",
      tabText: "data-[state=active]:text-cyan-600",
      valPropIconBg: "bg-cyan-100",
      valPropIcon: "text-cyan-700",
      valPropText: "text-cyan-800"
    }
  }

  const currentTheme = themeStyles[activeTab as keyof typeof themeStyles]

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center pt-24 pb-8 md:pb-32 bg-[#002f5e] transition-colors duration-700">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-80 transition-all duration-500"
        style={{
          backgroundImage: `url('/hero.png')`,
        }}
      >
        {/* Dark overlay for contrast on the left side */}
        <div className={`absolute inset-0 bg-linear-to-r ${currentTheme.overlay} transition-colors duration-700`} />
      </div>

      {/* SVG Curve at the bottom to match design */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full overflow-hidden leading-none flex flex-col">
        {/* The Curve Shape */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[120px]">
          <path d="M0,0V120H1200V0C1000,100,500,100,0,0Z" className="fill-blue-50"></path>
        </svg>
        {/* Solid White Block to lift the curve higher. 
            Decrease the height here to push the curve DOWN! */}
        <div className="w-full h-[260px] sm:h-[160px] md:h-[150px] bg-blue-50 -mt-[40px] md:-mt-[60px]"></div>
      </div>

      <div className="relative max-w-[1200px] z-20 container mx-auto px-4 flex flex-col items-center">

        {/* Hero Text */}
        <div className="hidden md:block w-full text-left pl-4 transition-all duration-300">
          <p className="text-white text-md font-medium mb-2">
            {activeTab === "flights" && "Your Next Adventure Awaits"}
            {activeTab === "hotels" && "Find Your Perfect Stay"}
            {activeTab === "cruises" && "Sail The Seven Seas"}
          </p>
          <h1 className="font-sans text-3xl md:text-4xl  font-bold text-white leading-[1.1] mb-6">
            {activeTab === "flights" && (
              <>Search to unlock the <br /><span className="text-blue-400">Cheapest Deals</span></>
            )}
            {activeTab === "hotels" && (
              <>Curated hotels. Best rates.<br /><span className="text-orange-400">Instant confirmation.</span></>
            )}
            {activeTab === "cruises" && (
              <>Unforgettable journeys.<br /><span className="text-blue-400">Across the waters.</span></>
            )}
          </h1>
          <p className="text-white/90 text-md max-w-2xl mb-8">
            Flights, Hotels, Cruises, and Holiday Packages — all in one place. <br />
            Better deals. Bigger dreams.
          </p>
        </div>

        {/* Search Widget */}
        <div className="w-full z-30 relative mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative flex flex-col gap-0">

            {/* Folder Tab Shape (Desktop) / Cards (Mobile) */}
            <TabsList className="relative flex w-full md:w-fit bg-transparent md:bg-white md:rounded-tl-[24px] md:rounded-tr-[24px] overflow-visible border-none p-0 h-auto md:h-[64px] z-30 shadow-none justify-between md:justify-start gap-2 md:gap-0 mb-4 md:mb-0">

              {/* Reliable SVG Curve for the right side */}
              <svg
                className="hidden md:block absolute -bottom-[1px] -right-[24px] w-[24px] h-[24px] z-10 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0V24H24C10.7452 24 0 13.2548 0 0Z" fill="white" />
              </svg>

              <TabsTrigger
                value="flights"
                className={`relative flex-1 md:flex-none flex-col md:flex-row px-2 py-3 md:py-0 sm:px-8 h-auto md:h-full rounded-[16px] md:rounded-none md:rounded-tl-[24px] bg-white/20 md:bg-white font-bold text-[13px] md:text-[15px] text-white md:text-gray-500 shadow-sm md:shadow-none data-[state=active]:shadow-md md:data-[state=active]:shadow-none data-[state=active]:bg-white border-none focus:ring-0 after:content-[''] md:data-[state=active]:after:absolute md:data-[state=active]:after:bottom-[10px] md:data-[state=active]:after:left-1/2 md:data-[state=active]:after:-translate-x-1/2 md:data-[state=active]:after:h-[3px] md:data-[state=active]:after:w-[60%] md:data-[state=active]:after:rounded-full ${currentTheme.tabText} ${currentTheme.tabBorder} transition-all`}
              >
                <Plane className="w-[20px] h-[20px] md:w-[18px] md:h-[18px] md:mr-2 mb-1 md:mb-0" />
                <span>Flights</span>
              </TabsTrigger>

              <TabsTrigger
                value="hotels"
                className={`relative flex-1 md:flex-none flex-col md:flex-row px-2 py-3 md:py-0 sm:px-8 h-auto md:h-full rounded-[16px] md:rounded-none bg-white/20 md:bg-white font-bold text-[13px] md:text-[15px] text-white md:text-gray-500 shadow-sm md:shadow-none data-[state=active]:shadow-md md:data-[state=active]:shadow-none data-[state=active]:bg-white border-none focus:ring-0 after:content-[''] md:data-[state=active]:after:absolute md:data-[state=active]:after:bottom-[10px] md:data-[state=active]:after:left-1/2 md:data-[state=active]:after:-translate-x-1/2 md:data-[state=active]:after:h-[3px] md:data-[state=active]:after:w-[60%] md:data-[state=active]:after:rounded-full ${currentTheme.tabText} ${currentTheme.tabBorder} transition-all`}
              >
                <Building2 className="w-[20px] h-[20px] md:w-[18px] md:h-[18px] md:mr-2 mb-1 md:mb-0" />
                <span>Hotels</span>
              </TabsTrigger>

              <TabsTrigger
                value="cruises"
                className={`relative flex-1 md:flex-none flex-col md:flex-row px-2 py-3 md:py-0 sm:px-8 h-auto md:h-full rounded-[16px] md:rounded-none md:rounded-tr-[24px] bg-white/20 md:bg-white font-bold text-[13px] md:text-[15px] text-white md:text-gray-500 shadow-sm md:shadow-none data-[state=active]:shadow-md md:data-[state=active]:shadow-none data-[state=active]:bg-white border-none focus:ring-0 after:content-[''] md:data-[state=active]:after:absolute md:data-[state=active]:after:bottom-[10px] md:data-[state=active]:after:left-1/2 md:data-[state=active]:after:-translate-x-1/2 md:data-[state=active]:after:h-[3px] md:data-[state=active]:after:w-[60%] md:data-[state=active]:after:rounded-full ${currentTheme.tabText} ${currentTheme.tabBorder} transition-all`}
              >
                <Map className="w-[20px] h-[20px] md:w-[18px] md:h-[18px] md:mr-2 mb-1 md:mb-0" />
                <span>Cruises</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flights" className="mt-0 relative z-20 border-none outline-none">
              {/* Main White Container */}
              <div className="bg-white p-4 sm:p-5 sm:pt-6 rounded-[24px] md:rounded-tl-none shadow-[0_16px_40px_-15px_rgba(0,0,0,0.2)] flex flex-col w-full">

                {/* Trip Type Selector */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-4 px-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[13px] sm:text-[14px] font-bold text-gray-800 whitespace-nowrap">
                    <input type="radio" name="tripType" value="roundTrip" checked={tripType === "roundTrip"} onChange={(e) => setTripType(e.target.value)} className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] accent-[#1a73e8]" />
                    Round Trip
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[13px] sm:text-[14px] font-semibold text-gray-500 hover:text-gray-800 transition-colors whitespace-nowrap">
                    <input type="radio" name="tripType" value="oneWay" checked={tripType === "oneWay"} onChange={(e) => setTripType(e.target.value)} className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] accent-[#1a73e8]" />
                    One Way
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[13px] sm:text-[14px] font-semibold text-gray-500 hover:text-gray-800 transition-colors whitespace-nowrap">
                    <input type="radio" name="tripType" value="multiCity" checked={tripType === "multiCity"} onChange={(e) => setTripType(e.target.value)} className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] accent-[#1a73e8]" />
                    Multi-City
                  </label>
                </div>

                {/* Input Fields Row */}
                <div className="flex flex-col lg:flex-row items-center gap-3 w-full">
                  <div className="flex flex-col sm:flex-row w-full gap-3 lg:flex-[2]">
                    {/* From Popover */}
                    <Popover open={isFromOpen} onOpenChange={setIsFromOpen}>
                      <PopoverTrigger asChild>
                        <div className="flex-1 w-full relative border border-gray-200 rounded-[14px] p-2 sm:p-3 hover:border-blue-300 transition-colors cursor-pointer h-[72px] flex flex-col justify-center shadow-sm">
                          <p className="text-[11px] sm:text-[13px] text-gray-400 font-medium mb-0.5">From</p>
                          <div className="flex items-center gap-1 sm:gap-2 text-gray-800">
                            <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                            <span className="font-bold text-[13px] sm:text-[15px] uppercase truncate">{from}</span>
                          </div>
                          <ArrowRight className="absolute -right-[22px] sm:-right-[26px] z-10 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-300 bg-white rounded-full border border-gray-100 shadow-sm p-0.5" />
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

                    {/* To Popover */}
                    <Popover open={isToOpen} onOpenChange={setIsToOpen}>
                      <PopoverTrigger asChild>
                        <div className="flex-1 w-full border border-gray-200 rounded-[14px] p-2 sm:p-3 hover:border-blue-300 transition-colors cursor-pointer h-[72px] flex flex-col justify-center shadow-sm">
                          <p className="text-[11px] sm:text-[13px] text-gray-400 font-medium mb-0.5">To</p>
                          <div className="flex items-center gap-1 sm:gap-2 text-gray-800">
                            <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                            <span className="font-bold text-[13px] sm:text-[15px] uppercase truncate">{to}</span>
                          </div>
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

                  {/* Dates Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex-[1.7] w-full border border-gray-200 rounded-[14px] hover:border-blue-300 transition-colors cursor-pointer h-[72px] flex items-center shadow-sm overflow-hidden">
                        <div className="flex-1 h-full p-3 border-r border-gray-100 flex flex-col justify-center">
                          <p className="text-[13px] text-gray-400 font-medium mb-0.5">Departure</p>
                          <div className="flex items-center gap-2 text-gray-800">
                            <CalendarIcon className="h-4 w-4 text-gray-500 shrink-0" />
                            <span className="font-bold text-[15px]">{departure ? format(departure, "dd MMM yyyy") : "Select date"}</span>
                          </div>
                        </div>
                        <div className="flex-1 h-full p-3 flex flex-col justify-center" style={{ opacity: tripType === 'oneWay' ? 0.5 : 1 }}>
                          <p className="text-[13px] text-gray-400 font-medium mb-0.5">Return</p>
                          <div className="flex items-center gap-2 text-gray-800">
                            <CalendarIcon className="h-4 w-4 text-gray-500 shrink-0" />
                            <span className="font-bold text-[15px]">{tripType === 'oneWay' ? 'N/A' : returnDate ? format(returnDate, "dd MMM yyyy") : "Select date"}</span>
                          </div>
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4" align="start">
                      <div className="text-sm font-bold text-gray-800 mb-4">Select Dates</div>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-1">Departure Date</label>
                          <Calendar
                            mode="single"
                            selected={departure}
                            onSelect={(date) => { setDeparture(date); /* Optional: auto-focus return date here */ }}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            className="rounded-md border shadow-sm"
                          />
                        </div>
                        <div style={{ opacity: tripType === 'oneWay' ? 0.5 : 1 }}>
                          <label className="text-xs font-bold text-gray-500 block mb-1">Return Date</label>
                          <Calendar
                            mode="single"
                            selected={returnDate}
                            onSelect={setReturnDate}
                            disabled={(date) =>
                              tripType === "oneWay" ||
                              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                              (!!departure && date < departure)
                            }
                            className="rounded-md border shadow-sm"
                          />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  {/* Travelers Popover */}
                  <Popover open={isTravelersOpen} onOpenChange={setIsTravelersOpen}>
                    <PopoverTrigger asChild>
                      <div className="flex-[1.1] w-full border border-gray-200 rounded-[14px] p-3 hover:border-blue-300 transition-colors cursor-pointer h-[72px] flex flex-col justify-center relative pr-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-[2px]">
                          <Users className="h-[18px] w-[18px] text-gray-500 shrink-0" />
                          <span className="font-bold text-[15px] text-gray-800 leading-none">{passengers} Traveller(s)</span>
                        </div>
                        <div className="pl-[26px]">
                          <span className="text-[13px] text-[#1a73e8] font-bold leading-none">{travelClass}</span>
                        </div>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-4" align="start">
                      <div className="text-sm font-bold text-gray-800 mb-4">Travelers & Cabin Class</div>
                      <div className="flex flex-col gap-5">
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-2">Passengers</label>
                          <div className="grid grid-cols-4 gap-2">
                            {["1", "2", "3", "4+"].map(num => (
                              <Button
                                key={num}
                                variant={passengers === num.replace("+", "") ? "default" : "outline"}
                                className={`h-10 ${passengers === num.replace("+", "") ? "bg-[#1a73e8]" : ""}`}
                                onClick={() => setPassengers(num.replace("+", ""))}
                              >
                                {num}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-2">Cabin Class</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["Economy", "Premium", "Business", "First"].map(cls => (
                              <Button
                                key={cls}
                                variant={travelClass.includes(cls) ? "default" : "outline"}
                                className={`h-10 text-xs ${travelClass.includes(cls) ? "bg-[#1a73e8]" : ""}`}
                                onClick={() => { setTravelClass(cls === "Premium" ? "Premium Economy" : cls === "First" ? "First Class" : cls); setIsTravelersOpen(false); }}
                              >
                                {cls}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  {/* Search Button */}
                  <div className="w-full md:w-auto shrink-0">
                    <Button onClick={handleFlightSearch} className={`w-full md:w-[160px] h-[72px] text-white text-[16px] font-bold rounded-[14px] tracking-wide transition-colors ${currentTheme.button}`}>
                      <ArrowRight className="h-[18px] w-[18px] mr-1.5" /> SEARCH
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hotels" className="mt-0 relative z-20 border-none outline-none">
              <div className="bg-white p-4 sm:p-5 rounded-[24px] md:rounded-tl-none shadow-[0_16px_40px_-15px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row items-center gap-3 w-full">

                {/* Destination Popover */}
                <Popover open={isHotelDestOpen} onOpenChange={setIsHotelDestOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex-[2] w-full border border-gray-200 rounded-[14px] p-3 hover:border-blue-300 transition-colors cursor-pointer h-[72px] flex flex-col justify-center shadow-sm">
                      <p className="text-[13px] text-gray-400 font-medium mb-0.5">Where to?</p>
                      <div className="flex items-center gap-2 text-gray-800">
                        <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                        <span className="font-bold text-[15px]">{hotelDest}</span>
                      </div>
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

                {/* Check In / Out Popover */}
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex-[1.7] w-full border border-gray-200 rounded-[14px] hover:border-blue-300 transition-colors cursor-pointer h-[72px] flex items-center shadow-sm overflow-hidden">
                      <div className="flex-1 h-full p-3 border-r border-gray-100 flex flex-col justify-center">
                        <p className="text-[13px] text-gray-400 font-medium mb-0.5">Check in</p>
                        <div className="flex items-center gap-2 text-gray-800">
                          <CalendarIcon className="h-4 w-4 text-gray-500 shrink-0" />
                          <span className="font-bold text-[15px]">{hotelCheckIn ? format(hotelCheckIn, "dd MMM yyyy") : "Select date"}</span>
                        </div>
                      </div>
                      <div className="flex-1 h-full p-3 flex flex-col justify-center">
                        <p className="text-[13px] text-gray-400 font-medium mb-0.5">Check out</p>
                        <div className="flex items-center gap-2 text-gray-800">
                          <CalendarIcon className="h-4 w-4 text-gray-500 shrink-0" />
                          <span className="font-bold text-[15px]">{hotelCheckOut ? format(hotelCheckOut, "dd MMM yyyy") : "Select date"}</span>
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4" align="start">
                    <div className="text-sm font-bold text-gray-800 mb-4">Select Dates</div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Check In</label>
                        <Calendar
                          mode="single"
                          selected={hotelCheckIn}
                          onSelect={setHotelCheckIn}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          className="rounded-md border shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Check Out</label>
                        <Calendar
                          mode="single"
                          selected={hotelCheckOut}
                          onSelect={setHotelCheckOut}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                            (!!hotelCheckIn && date < hotelCheckIn)
                          }
                          className="rounded-md border shadow-sm"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Guests Popover */}
                <Popover open={isHotelGuestsOpen} onOpenChange={setIsHotelGuestsOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex-[1.1] w-full border border-gray-200 rounded-[14px] p-3 hover:border-blue-300 transition-colors cursor-pointer h-[72px] flex flex-col justify-center relative pr-8 shadow-sm">
                      <div className="flex items-center gap-2 mb-[2px]">
                        <Users className="h-[18px] w-[18px] text-gray-500 shrink-0" />
                        <span className="font-bold text-[15px] text-gray-800 leading-none">{hotelGuests} Guests</span>
                      </div>
                      <p className="text-[13px] text-[#1a73e8] font-bold pl-[26px] leading-none">1 Room</p>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-4" align="start">
                    <div className="text-sm font-bold text-gray-800 mb-4">Guests</div>
                    <div className="grid grid-cols-4 gap-2">
                      {["1", "2", "3", "4+"].map(num => (
                        <Button
                          key={num}
                          variant={hotelGuests === num.replace("+", "") ? "default" : "outline"}
                          className={`h-10 ${hotelGuests === num.replace("+", "") ? "bg-[#1a73e8]" : ""}`}
                          onClick={() => setHotelGuests(num.replace("+", ""))}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Search Button */}
                <div className="w-full md:w-auto shrink-0">
                  <Button onClick={handleHotelSearch} className={`w-full md:w-[160px] h-[72px] text-white text-[16px] font-bold rounded-[14px] tracking-wide transition-colors ${currentTheme.button}`}>
                    <ArrowRight className="h-[18px] w-[18px] mr-1.5" /> SEARCH
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cruises" className="mt-0 relative z-20 border-none outline-none">
              <div className="bg-white p-4 sm:p-5 rounded-[24px] md:rounded-tl-none shadow-[0_16px_40px_-15px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row items-center gap-3 w-full">

                {/* Destination Popover */}
                <Popover open={isCruiseDestOpen} onOpenChange={setIsCruiseDestOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex-[1.5] w-full border border-gray-200 rounded-[14px] p-3 hover:border-blue-300 transition-colors cursor-pointer h-[72px] flex flex-col justify-center shadow-sm">
                      <p className="text-[13px] text-gray-400 font-medium mb-0.5">Going to</p>
                      <div className="flex items-center gap-2 text-gray-800">
                        <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                        <span className="font-bold text-[15px]">{cruiseDest}</span>
                      </div>
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

                {/* Date Popover */}
                <Popover open={isCruiseDateOpen} onOpenChange={setIsCruiseDateOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex-[1] w-full border border-gray-200 rounded-[14px] p-3 hover:border-blue-300 transition-colors cursor-pointer h-[72px] flex flex-col justify-center shadow-sm">
                      <p className="text-[13px] text-gray-400 font-medium mb-0.5">When</p>
                      <div className="flex items-center gap-2 text-gray-800">
                        <CalendarIcon className="h-4 w-4 text-gray-500 shrink-0" />
                        <span className="font-bold text-[15px]">{cruiseDate ? format(cruiseDate, "dd MMM yyyy") : "Select date"}</span>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4" align="start">
                    <div className="text-sm font-bold text-gray-800 mb-4">Select Date</div>
                    <div>
                      <Calendar
                        mode="single"
                        selected={cruiseDate}
                        onSelect={(date) => {
                          setCruiseDate(date);
                          if (date) setIsCruiseDateOpen(false);
                        }}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        className="rounded-md border shadow-sm"
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Passengers Popover */}
                <Popover open={isCruisePassengersOpen} onOpenChange={setIsCruisePassengersOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex-[1] w-full border border-gray-200 rounded-[14px] p-3 hover:border-blue-300 transition-colors cursor-pointer h-[72px] flex flex-col justify-center relative pr-8 shadow-sm">
                      <div className="flex items-center gap-2 mb-[2px]">
                        <Users className="h-[18px] w-[18px] text-gray-500 shrink-0" />
                        <span className="font-bold text-[15px] text-gray-800 leading-none">{cruisePassengers} Passengers</span>
                      </div>
                      <p className="text-[13px] text-[#1a73e8] font-bold pl-[26px] leading-none">1 Cabin</p>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-4" align="start">
                    <div className="text-sm font-bold text-gray-800 mb-4">Passengers</div>
                    <div className="grid grid-cols-4 gap-2">
                      {["1", "2", "3", "4+"].map(num => (
                        <Button
                          key={num}
                          variant={cruisePassengers === num.replace("+", "") ? "default" : "outline"}
                          className={`h-10 ${cruisePassengers === num.replace("+", "") ? "bg-[#1a73e8]" : ""}`}
                          onClick={() => setCruisePassengers(num.replace("+", ""))}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Search Button */}
                <div className="w-full md:w-auto shrink-0">
                  <Button onClick={handleCruiseSearch} className={`w-full md:w-[160px] h-[72px] text-white text-[16px] font-bold rounded-[14px] tracking-wide transition-colors ${currentTheme.button}`}>
                    <ArrowRight className="h-[18px] w-[18px] mr-1.5" /> SEARCH
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>


      </div>

      {/* Value Proposition Bar */}
      <div className="w-full max-w-6xl mt-8 md:mt-12 relative md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-10 z-20 px-4 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row justify-between items-center bg-transparent gap-6 md:gap-0 pt-6">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full shrink-0 ${currentTheme.valPropIconBg}`}>
              <Shield className={`h-6 w-6 ${currentTheme.valPropIcon}`} />
            </div>
            <div>
              <p className={`font-bold text-sm ${currentTheme.valPropText}`}>No Fees, No Hidden Charges</p>
              <p className="text-xs text-gray-500 font-medium">Best Price Guaranteed</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full shrink-0 ${currentTheme.valPropIconBg}`}>
              <Shield className={`h-6 w-6 ${currentTheme.valPropIcon}`} />
            </div>
            <div>
              <p className={`font-bold text-sm ${currentTheme.valPropText}`}>Lowest Prices Guaranteed</p>
              <p className="text-xs text-gray-500 font-medium">Get the best deals always</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full shrink-0 ${currentTheme.valPropIconBg}`}>
              <Shield className={`h-6 w-6 ${currentTheme.valPropIcon}`} />
            </div>
            <div>
              <p className={`font-bold text-sm ${currentTheme.valPropText}`}>100% Financial Protection</p>
              <p className="text-xs text-gray-500 font-medium">Your money is safe</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full shrink-0 ${currentTheme.valPropIconBg}`}>
              <Headphones className={`h-6 w-6 ${currentTheme.valPropIcon}`} />
            </div>
            <div>
              <p className={`font-bold text-sm ${currentTheme.valPropText}`}>24/7 Customer Support</p>
              <p className="text-xs text-gray-500 font-medium">We're here to help</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}