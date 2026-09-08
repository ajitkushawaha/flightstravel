"use client"

import { Plane, Building2, Map, MapPin, Calendar, Users, Search, Shield, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HotelHero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center pt-24 pb-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('/hero.png')`, // Using hero.png as a placeholder for the London skyline
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      <div className="relative z-20 container max-w-[1200px] mx-auto px-4 flex flex-col items-center mt-10">
        
        {/* Pill Toggles */}
        <div className="flex items-center gap-4 mb-12">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition backdrop-blur-sm">
            <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-transparent"></div>
            </div>
            <Plane className="w-4 h-4" /> Flights
          </button>
          
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#ff6000] text-white font-semibold text-sm bg-black/20 hover:bg-black/40 transition backdrop-blur-sm">
            <div className="w-4 h-4 rounded-full border border-[#ff6000] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#ff6000]"></div>
            </div>
            <Building2 className="w-4 h-4 text-[#ff6000]" /> Hotels
          </button>

          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition backdrop-blur-sm">
            <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-transparent"></div>
            </div>
            <Map className="w-4 h-4" /> Cruises
          </button>
        </div>

        {/* Hero Title */}
        <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-12 drop-shadow-lg">
          Curated hotels. Best rates. Instant confirmation.
        </h1>

        {/* Search Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-[16px] shadow-2xl flex flex-col md:flex-row items-center gap-2 w-full max-w-5xl">
          
          {/* Destination */}
          <div className="flex-[1.5] w-full border-b md:border-b-0 md:border-r border-gray-200 px-4 py-2 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#ff6000]" />
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Destination</span>
                <input type="text" placeholder="Search Destination" className="text-[15px] font-bold text-gray-800 placeholder:font-normal placeholder:text-gray-400 outline-none w-full" />
              </div>
            </div>
          </div>

          {/* Check In */}
          <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-gray-200 px-4 py-2 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#ff6000]" />
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Check-In</span>
                <span className="text-[15px] font-medium text-gray-500">Check-in</span>
              </div>
            </div>
          </div>

          {/* Check Out */}
          <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-gray-200 px-4 py-2 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#ff6000]" />
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Check-Out</span>
                <span className="text-[15px] font-medium text-gray-500">Check-out</span>
              </div>
            </div>
          </div>

          {/* Guests */}
          <div className="flex-[1.2] w-full px-4 py-2 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-[#ff6000]" />
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Guests</span>
                <span className="text-[15px] font-bold text-gray-800">1 Rooms, 1 Adults</span>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto shrink-0 px-2 mt-2 md:mt-0">
            <Button className="w-full md:w-[140px] h-[56px] bg-[#ff6000] hover:bg-[#e65600] text-white text-[16px] font-bold rounded-[12px] shadow-lg">
              <Search className="h-[18px] w-[18px] mr-2" /> Search
            </Button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col md:flex-row gap-4 mt-16">
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 border border-white/10 w-64">
            <div className="w-10 h-10 rounded-full bg-[#ff6000]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#ff6000]" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Secure Booking</p>
              <p className="text-gray-300 text-xs">SSL encrypted</p>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 border border-white/10 w-64">
            <div className="w-10 h-10 rounded-full bg-[#ff6000]/20 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-[#ff6000]" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">24/7 Support</p>
              <p className="text-gray-300 text-xs">Always available</p>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 border border-white/10 w-64">
            <div className="w-10 h-10 rounded-full bg-[#ff6000]/20 flex items-center justify-center">
              <span className="text-[#ff6000] font-bold text-lg">%</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Best Price</p>
              <p className="text-gray-300 text-xs">Guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
