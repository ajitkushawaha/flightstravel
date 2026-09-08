"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Users, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getFeaturedCruises } from "@/lib/data/cruises"
import { NativeSlider } from "@/components/ui/native-slider"

export function FeaturedCruises() {
  const cruises = getFeaturedCruises(3);

  return (
    <section className="py-10 bg-background">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-secondary font-medium text-sm tracking-wider uppercase">Featured Cruises</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">Most Popular Journeys</h2>
          </div>
          <Link href="/cruises">
            <Button variant="outline" className="group bg-transparent">
              View All Cruises
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <NativeSlider itemCount={cruises.length} className="gap-4 md:gap-8 pb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
          {cruises.map((cruise) => (
            <Link key={cruise.id} href={`/cruises/${cruise.id}`} className="group min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(33.333%-22px)] snap-center shrink-0">
              <article className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border h-full">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={cruise.image || "/hero.png"}
                    alt={cruise.nameEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {cruise.tags?.[0] && (
                    <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">{cruise.tags[0]}</Badge>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    {cruise.routeEn}
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {cruise.nameEn}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {cruise.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      2-4 guests
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-medium text-foreground">{cruise.rating}</span>
                      <span className="text-muted-foreground text-sm">({cruise.reviews})</span>
                    </div>
                    <div className="text-right">
                      {cruise.originalPrice && (
                        <span className="text-muted-foreground line-through text-sm">£{cruise.originalPrice}</span>
                      )}
                      <div className="text-xl font-bold text-primary">
                        £{cruise.price}
                        <span className="text-sm font-normal text-muted-foreground">/person</span>
                      </div>
                    </div>
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

