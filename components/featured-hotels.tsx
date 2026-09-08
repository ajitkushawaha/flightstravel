import Image from "next/image"
import Link from "next/link"
import { MapPin, Heart, ArrowRight, Bed, Car, Wifi, Utensils } from "lucide-react"
import { getFeaturedHotels } from "@/lib/data/hotels"
import { NativeSlider } from "@/components/ui/native-slider"

const iconMap: Record<string, any> = {
  "Bed": Bed,
  "Car": Car,
  "Wifi": Wifi,
  "Utensils": Utensils
}

export function FeaturedHotels() {
  const featuredHotels = getFeaturedHotels(4);

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-3xl font-serif text-[#0b172a] font-bold mb-2">
            Featured Hotels
          </h2>
          <p className="text-gray-500 text-sm">
            Hand-picked accommodations for the best experience
          </p>
        </div>
        <Link href="/hotels/all" className="text-[#ff6000] font-bold text-sm hover:underline flex items-center gap-1 mt-4 md:mt-0">
          View all hotels <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <NativeSlider itemCount={featuredHotels.length} className="gap-4 md:gap-6 pb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
        {featuredHotels.map((hotel, index) => (
          <div key={hotel.id} className="min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(25%-18px)] snap-center shrink-0 bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
            
            {/* Image Container */}
            <div className="relative h-[220px] w-full">
              <Image 
                src={hotel.image} 
                alt={hotel.title}
                fill
                className="object-cover"
              />
              
              {/* Badges */}
              {index === 0 && (
                <div className="absolute top-4 left-4 bg-[#ff6000] text-white text-[10px] font-black uppercase px-2 py-1 rounded">
                  Featured
                </div>
              )}
              
              <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors text-gray-400 hover:text-red-500">
                <Heart className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-md flex items-center gap-1 shadow-md">
                <span className="text-[#ffb700] text-xs">★</span>
                <span className="font-bold text-xs text-gray-800">{hotel.rating}</span>
                <span className="text-[10px] text-gray-400">({hotel.reviews} reviews)</span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col grow">
              <h3 className="font-bold text-[#0b172a] text-[17px] mb-1 line-clamp-1">{hotel.title}</h3>
              <div className="flex items-center gap-1 text-gray-500 mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#ff6000]" />
                <span className="text-xs">{hotel.location}</span>
              </div>

              {/* Icons */}
              <div className="flex gap-2 mb-6">
                {hotel.icons.map((iconStr: string, i: number) => {
                  const Icon = iconMap[iconStr] || Bed;
                  return (
                    <div key={i} className="w-8 h-8 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                      <Icon className="w-4 h-4" />
                    </div>
                  )
                })}
              </div>

              {/* Price & Button */}
              <div className="mt-auto border-t border-gray-100 pt-4 flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">From</p>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-[#ff6000] leading-none">£{hotel.price}</span>
                    <span className="text-xs text-gray-400 mb-0.5">/night</span>
                  </div>
                  {hotel.originalPrice && (
                    <p className="text-xs text-gray-400 line-through mt-0.5">£{hotel.originalPrice}</p>
                  )}
                  {!hotel.originalPrice && (
                    <p className="text-xs text-transparent mt-0.5">£0</p> // Spacer for alignment
                  )}
                </div>
                
                <Link href={`/hotels/${hotel.id}`}>
                  <button className="bg-[#ff6000] hover:bg-[#e65600] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors shadow-md">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>

          </div>
        ))}
      </NativeSlider>
    </section>
  )
}
