"use client"

import { useState } from "react"
import { MapPin, PlaneTakeoff, Compass, Search } from "lucide-react"

const destinations = ["Kyoto, Japan", "Bali, Indonesia", "Paris, France", "Hawaii, USA", "Rome, Italy"]
const departures = ["Mumbai, India", "Toronto, Canada", "Rome, Italy", "Istanbul, Turkey", "Cairo, Egypt", "Paris, France", "Beijing, China"]
const types = ["Adventure", "Historical/Cultural", "Beach", "Relaxation", "Romantic"]

export function TravelHeroBanner() {
  const [destination, setDestination] = useState("")
  const [departure, setDeparture] = useState("")
  const [type, setType] = useState("")

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0f2e]">
      
      {/* Animated background gradient blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#1a3a8f]/40 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#7c3aed]/30 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#0891b2]/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container max-w-[1200px] mx-auto px-4 flex flex-col items-center text-center">

        {/* Big TRAVEL title */}
        <div className="overflow-hidden mb-2">
          <h1
            className="text-[clamp(72px,18vw,200px)] font-black leading-none tracking-tight select-none"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #a8c4ff 40%, #7c9ef8 70%, #4a6cf7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
            }}
          >
            TRAVEL
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-white/70 text-lg md:text-xl font-light mb-12 tracking-wide">
          Travel where your heart takes you!
        </p>

        {/* Search Form */}
        <div className="w-full max-w-4xl">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
            <div className="flex flex-col md:flex-row items-stretch gap-2">
              
              {/* Where to */}
              <div className="flex-1 flex items-center gap-3 bg-white/10 hover:bg-white/15 transition-colors rounded-xl px-4 py-3.5 border border-white/10">
                <MapPin className="w-5 h-5 text-[#7c9ef8] shrink-0" />
                <div className="flex flex-col flex-1 min-w-0">
                  <label className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-0.5">Where to?</label>
                  <select
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="bg-transparent text-white text-sm font-medium outline-none cursor-pointer appearance-none w-full"
                  >
                    <option value="" disabled className="text-gray-900">Select destination</option>
                    {destinations.map(d => <option key={d} value={d} className="text-gray-900">{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Departure */}
              <div className="flex-1 flex items-center gap-3 bg-white/10 hover:bg-white/15 transition-colors rounded-xl px-4 py-3.5 border border-white/10">
                <PlaneTakeoff className="w-5 h-5 text-[#7c9ef8] shrink-0" />
                <div className="flex flex-col flex-1 min-w-0">
                  <label className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-0.5">Departure</label>
                  <select
                    value={departure}
                    onChange={e => setDeparture(e.target.value)}
                    className="bg-transparent text-white text-sm font-medium outline-none cursor-pointer appearance-none w-full"
                  >
                    <option value="" disabled className="text-gray-900">Select departure</option>
                    {departures.map(d => <option key={d} value={d} className="text-gray-900">{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Type */}
              <div className="flex-1 flex items-center gap-3 bg-white/10 hover:bg-white/15 transition-colors rounded-xl px-4 py-3.5 border border-white/10">
                <Compass className="w-5 h-5 text-[#7c9ef8] shrink-0" />
                <div className="flex flex-col flex-1 min-w-0">
                  <label className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-0.5">Travel Type</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="bg-transparent text-white text-sm font-medium outline-none cursor-pointer appearance-none w-full"
                  >
                    <option value="" disabled className="text-gray-900">Select type</option>
                    {types.map(t => <option key={t} value={t} className="text-gray-900">{t}</option>)}
                  </select>
                </div>
              </div>

              {/* CTA Button */}
              <button className="flex items-center justify-center gap-2 bg-[#4a6cf7] hover:bg-[#3a5ce7] active:scale-95 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#4a6cf7]/30 whitespace-nowrap group">
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                FIND NOW
              </button>

            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-8 mt-12">
          {[
            { label: "Destinations", value: "150+" },
            { label: "Happy Travelers", value: "2M+" },
            { label: "Top Rated", value: "4.9 ★" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-white font-black text-2xl md:text-3xl">{stat.value}</p>
              <p className="text-white/50 text-xs font-medium mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom wave mask */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path d="M0 80L60 66.7C120 53 240 27 360 20C480 13 600 27 720 33.3C840 40 960 40 1080 36.7C1200 33 1320 27 1380 23.3L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#fafbfc"/>
        </svg>
      </div>

    </section>
  )
}
