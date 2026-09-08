import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { NativeSlider } from "@/components/ui/native-slider"

const destinations = [
  {
    name: "Dubai",
    cruises: 42,
    image: "https://api.flightstravel.co.uk/uploads/galleryImage/1604006106963_dubai.jpg",
  },
  {
    name: "Maldives",
    cruises: 38,
    image: "https://api.flightstravel.co.uk/uploads/galleryImage/1604006947389_maldives_honeymoon.jpg",
  },
  {
    name: "Miami",
    cruises: 25,
    image: "https://api.flightstravel.co.uk/uploads/galleryImage/1604006175675_miami.jpg",
  },
  {
    name: "Cancun",
    cruises: 18,
    image: "https://api.flightstravel.co.uk/uploads/galleryImage/1604006212394_cancun.jpg",
  },
]

export function Destinations() {
  return (
    <section className="bg-background">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="text-left mb-12">
          <span className="text-secondary font-medium text-sm tracking-wider uppercase">Explore Egypt</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">Popular Destinations</h2>
        </div>

        <NativeSlider itemCount={destinations.length} className="gap-4 md:gap-6 pb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
          {destinations.map((destination, index) => (
            <Link
              key={index}
              href={`/cruises?destination=${destination.name.toLowerCase()}`}
              className="min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(25%-18px)] snap-center shrink-0 group relative aspect-4/5 rounded-2xl overflow-hidden"
            >
              <Image
                src={destination.image || "/hero.png"}
                alt={destination.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-white">{destination.name}</h3>
                    <p className="text-white/80 text-sm">{destination.cruises} Cruises</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-secondary transition-colors">
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </NativeSlider>
      </div>
    </section>
  )
}
