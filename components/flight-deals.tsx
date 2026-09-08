"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NativeSlider } from "@/components/ui/native-slider"
import { getFeaturedFlights } from "@/lib/data/flights"

export function FlightDeals() {
  const flightDeals = getFeaturedFlights(4);

  return (
    <section className="py-16  bg-background">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2 block">Limited Time Offers</span>
            <h2 className="text-3xl font-bold text-foreground">Today's Hot Deals</h2>
            <p className="text-muted-foreground mt-1">Save your money with our best offers.</p>
          </div>
          <Link href="/flights/search">
            <Button variant="link" className="text-primary font-semibold hover:no-underline group">
              View All Deals
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <NativeSlider itemCount={flightDeals.length} className="gap-4 md:gap-6 pb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
          {flightDeals.map((deal) => (
            <Link key={deal.id} href={`/flights/checkout/${deal.id}`} className="min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(25%-18px)] snap-center shrink-0 group block">
              <article className="relative h-64 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                <Image
                  src={deal.image}
                  alt={deal.destination}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {deal.destination}
                    </h3>
                    <p className="bg-white text-black font-bold text-[13px] px-3 py-1 rounded-full inline-block mt-1">
                      {deal.discount}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </NativeSlider>
      </div>
    </section>
  )
}

