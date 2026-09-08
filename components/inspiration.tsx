"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Waves, Snowflake, Building, Heart, Users } from "lucide-react"
import { NativeSlider } from "@/components/ui/native-slider"

const CATEGORIES = [
  { name: "Family Friendly", icon: Users, color: "bg-blue-100 text-blue-500", active: true },
  { name: "Honeymoon", icon: Heart, color: "bg-pink-100 text-pink-500", active: false },
  { name: "Water Vacations", icon: Waves, color: "bg-teal-100 text-teal-500", active: false },
  { name: "Snowy Getaways", icon: Snowflake, color: "bg-sky-100 text-sky-500", active: false },
  { name: "Cultural Tours", icon: Building, color: "bg-purple-100 text-purple-500", active: false },
]

const PLACES = [
  { id: "p1", name: "San Francisco", width: "min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(50%-12px)]", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop" },
  { id: "p2", name: "Dubai", width: "min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(25%-18px)]", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop" },
  { id: "p3", name: "Miami", width: "min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(25%-18px)]", image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=800&auto=format&fit=crop" },
  { id: "p4", name: "Orlando", width: "min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(25%-18px)]", image: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=800&auto=format&fit=crop" },
  { id: "p5", name: "Cancún", width: "min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(25%-18px)]", image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=800&auto=format&fit=crop" },
  { id: "p6", name: "Goa, India", width: "min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(50%-12px)]", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop" },
]

export function Inspiration() {
  return (
    <section className="py-10 bg-background">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="sm:text-center text-left mb-10">
          <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2 block">Get Inspired</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Inspiration For Your Next Trip</h2>
        </div>

        {/* Categories */}
        <NativeSlider itemCount={CATEGORIES.length} className="gap-6 md:gap-8 pb-6 mb-8 -mx-4 px-4 lg:mx-0 lg:px-0 md:justify-center">
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center gap-3 cursor-pointer group snap-center shrink-0 min-w-[80px]">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${cat.active ? 'bg-primary text-white shadow-primary/20' : cat.color}`}>
                <cat.icon className="h-7 w-7" />
              </div>
              <span className={`text-sm font-semibold ${cat.active ? 'text-primary border-b-2 border-primary pb-1' : 'text-muted-foreground group-hover:text-foreground'}`}>
                {cat.name}
              </span>
            </div>
          ))}
        </NativeSlider>

        {/* Bento Grid to Slider */}
        <NativeSlider itemCount={PLACES.length} className="gap-4 md:gap-6 pb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
          {PLACES.map((place) => (
            <Link key={place.id} href={`/destinations/${place.id}`} className={`group block relative rounded-2xl overflow-hidden snap-center shrink-0 h-[250px] md:h-[300px] ${place.width}`}>
              <Image
                src={place.image}
                alt={place.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white mb-1">{place.name}</h3>
                <p className="text-secondary font-semibold text-sm flex items-center gap-1 group-hover:underline">
                  Get prices <ArrowRight className="h-3 w-3" />
                </p>
              </div>
            </Link>
          ))}
        </NativeSlider>
      </div>
    </section>
  )
}
