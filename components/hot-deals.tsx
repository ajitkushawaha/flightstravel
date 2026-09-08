import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NativeSlider } from "@/components/ui/native-slider"

export function HotDeals() {
  return (
    <section className="py-12 bg-white">
      <div className="container max-w-[1200px] mx-auto px-4 flex flex-col gap-16">
        
        {/* Cruise Hot Deals */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
            <div>
              <p className="text-blue-500 text-xs font-bold tracking-wider uppercase mb-1">Featured Cruise Deals</p>
              <h2 className="text-3xl font-bold text-[#002f5e]">Cruise Hot Deals</h2>
              <p className="text-gray-500 text-sm mt-1">Explore the world on a luxury cruise and create unforgettable memories.</p>
            </div>
            <Link href="/cruises" className="text-blue-600 font-semibold flex items-center hover:underline mt-4 md:mt-0">
              View All Cruises <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <NativeSlider itemCount={4} className="gap-4 md:gap-6 pb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
            {[
              { title: "Norwegian Fjords Explorer", desc: "7 Nights • Norway, Denmark", price: "$899" },
              { title: "Mediterranean Escape", desc: "7 Nights • Italy, Greece, Spain", price: "$1,099" },
              { title: "Majestic Princess from Southampton", desc: "7 Nights • France, Belgium, Spain", price: "$1,074" },
              { title: "Zepundem from Vancouver", desc: "7 Nights • Alaska", price: "$1,199" },
            ].map((cruise, i) => (
              <div key={i} className="min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(25%-18px)] snap-center shrink-0 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="relative h-48 w-full bg-gray-100">
                  <Image src="/hero.png" alt={cruise.title} fill className="object-cover" />
                  <button className="absolute top-3 right-3 bg-white/80 backdrop-blur rounded-full p-1.5 hover:bg-white text-gray-500 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-[#002f5e] text-lg leading-tight mb-1">{cruise.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{cruise.desc}</p>
                  <div className="mt-auto">
                    <p className="text-gray-500 text-sm mb-3">From <span className="font-bold text-blue-600 text-lg">{cruise.price}</span></p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10">
                      View Details <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </NativeSlider>
        </div>

        {/* Holiday Offers */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
            <div>
              <p className="text-blue-500 text-xs font-bold tracking-wider uppercase mb-1">Popular Holiday Packages</p>
              <h2 className="text-3xl font-bold text-[#002f5e]">Holiday Offers and Promotions</h2>
            </div>
            <Link href="/holidays" className="text-blue-600 font-semibold flex items-center hover:underline mt-4 md:mt-0">
              View All Holidays <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <NativeSlider itemCount={4} className="gap-4 md:gap-6 pb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
            {[
              { title: "Family Holiday", discount: "Get up to 50% OFF" },
              { title: "All Inclusive Resorts", discount: "Get up to 40% OFF" },
              { title: "Honeymoon", discount: "Get up to 30% OFF" },
              { title: "Luxury Holidays", discount: "Get up to 40% OFF" },
            ].map((holiday, i) => (
              <div key={i} className="min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(25%-18px)] snap-center shrink-0 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full bg-gray-100">
                  <Image src="/hero.png" alt={holiday.title} fill className="object-cover" />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#002f5e] text-lg leading-tight mb-1">{holiday.title}</h3>
                    <p className="text-blue-600 font-bold text-sm">{holiday.discount}</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors shrink-0">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </NativeSlider>
        </div>

        {/* Airline Deals */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
            <div>
              <p className="text-blue-500 text-xs font-bold tracking-wider uppercase mb-1">Top Airline Deals</p>
              <h2 className="text-3xl font-bold text-[#002f5e]">Exclusive Deals From Top Airlines</h2>
            </div>
            <Link href="/flights" className="text-blue-600 font-semibold flex items-center hover:underline mt-4 md:mt-0">
              View All Airlines <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <NativeSlider itemCount={3} className="gap-4 md:gap-6 pb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
            {[
              { airline: "Finnair", routes: [
                { from: "Helsinki", to: "Delhi", price: "$614" },
                { from: "Helsinki", to: "Tokyo", price: "$850" },
                { from: "Helsinki", to: "New York", price: "$520" },
              ]},
              { airline: "Emirates", routes: [
                { from: "Dubai", to: "London", price: "$750" },
                { from: "Dubai", to: "Sydney", price: "$1,200" },
                { from: "Dubai", to: "Paris", price: "$800" },
              ]},
              { airline: "British Airways", routes: [
                { from: "Heathrow", to: "New York", price: "$590" },
                { from: "Manchester", to: "Dubai", price: "$700" },
                { from: "Heathrow", to: "Toronto", price: "$830" },
              ]},
            ].map((deal, i) => (
              <div key={i} className="min-w-[85vw] sm:min-w-[45vw] lg:min-w-[calc(33.333%-16px)] snap-center shrink-0 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-32 w-full bg-blue-50 flex items-center justify-center overflow-hidden">
                  <Image src="/hero.png" alt={deal.airline} fill className="object-cover opacity-80" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#002f5e] text-lg mb-4">{deal.airline}</h3>
                  <div className="space-y-3">
                    {deal.routes.map((route, j) => (
                      <div key={j} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{route.from} to {route.to}</span>
                        <span className="font-bold text-blue-600">{route.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </NativeSlider>
        </div>

        {/* Promo Banner */}
        <div className="relative rounded-xl overflow-hidden bg-[#008c95] flex flex-col md:flex-row items-center justify-between p-6 ">
          {/* Background image overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-60 pointer-events-none hidden md:block">
             <Image src="/hero.png" alt="Beach" fill className="object-cover mask-gradient-left" />
          </div>
          
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
              <Plane className="w-6 h-6 text-[#008c95]" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold mb-1">Save Up to 70%</h3>
              <p className="text-white/90 text-sm max-w-2xl">
                Sign up now to unlock our secret deals and save up to 70% by getting access to our special offers for flights.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-6 md:mt-0 shrink-0">
            <Button className="bg-white text-[#008c95] hover:bg-gray-100 font-bold px-6 h-12 rounded-lg">
              Sign Up Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
