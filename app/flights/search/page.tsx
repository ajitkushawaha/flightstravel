import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Plane, ArrowRight, ArrowLeft, Clock, Briefcase, Luggage } from "lucide-react"
import Link from "next/link"
import { FlightFilters } from "@/components/flight-filters"
import { MobileFlightFilters } from "@/components/mobile-flight-filters"
import { getAllFlights } from "@/lib/data/flights"

export default async function FlightSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const from = params.from as string || "DEL"
  const to = params.to as string || "LHR"
  const departure = params.departure as string || "2025-04-24"
  const passengers = params.passengers as string || "1"

  const tripType = params.tripType as string || "roundTrip"

  const flights = getAllFlights()

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      {/* Desktop Header */}
      <div className="hidden md:block pt-24 pb-12 bg-[#002f5e] text-white">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="flex items-center gap-4 text-2xl font-bold mb-2">
            <span>{from}</span>
            <ArrowRight className="h-6 w-6 text-blue-400" />
            <span>{to}</span>
          </div>
          <p className="text-gray-300">
            {new Date(departure).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} | {passengers} Passenger(s)
          </p>
        </div>
      </div>

      {/* Mobile App Header (Matches Screenshot) */}
      <div className="md:hidden pt-20 mt-2 bg-gray-50/95 backdrop-blur-md sticky top-0 z-30">
        <div className="px-4 flex items-center mb-3">
          <Link href="/">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div className="flex-1 bg-white ml-3 rounded-full shadow-sm border border-gray-200 py-1.5 px-4 flex flex-col items-center justify-center">
            <div className="flex items-center text-[13px] font-bold text-gray-900">
              {from} <ArrowRight className="w-3 h-3 mx-1 text-gray-400" /> {to}
            </div>
            <div className="text-[11px] text-gray-500 truncate max-w-[200px]">
              {new Date(departure).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} • {passengers} Traveller{Number(passengers) > 1 ? 's' : ''} • Economy
            </div>
          </div>
        </div>
        
      
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 py-0 md:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (Hidden on Mobile) */}
          <div className="hidden lg:block">
            <FlightFilters />
          </div>

          {/* Flight Results */}
          <div className="flex-1 space-y-4">
            <h2 className="text-xs text-right md:text-xl sm:font-bold mb-2">{flights.length} flights found</h2>
            
            {flights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-2xl md:rounded border border-gray-100 md:border-[#5bc0de] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
                {/* Mobile Full-Card Click Layer */}
                <Link href={`/flights/checkout/${flight.id}?passengers=${passengers}`} className="absolute inset-0 z-10 md:hidden" />
                
                <div className="flex flex-col md:flex-row w-full relative z-20 md:z-auto pointer-events-none md:pointer-events-auto">
                  
                  {/* Left Side: Airline & Segments */}
                  <div className="flex-1 flex flex-col md:flex-row p-4 md:p-0">
                    
                    {/* Airline Logo & Name (Mobile: Top Left, Desktop: Left Col) */}
                    <div className="w-full md:w-32 shrink-0 flex flex-row md:flex-col items-center md:justify-center md:p-4 border-b md:border-b-0 md:border-r border-gray-100 md:border-dashed mb-4 md:mb-0 pb-3 md:pb-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={flight.logo} alt={flight.airline} className="h-6 md:h-10 object-contain mr-2 md:mr-0 md:mb-2" />
                      <span className="text-sm font-medium text-gray-800 text-center">{flight.airline}</span>
                      <span className="hidden md:block text-[11px] text-gray-500 mt-0.5">Economy</span>
                    </div>

                    {/* Segments Column */}
                    <div className="flex-1 flex flex-col md:p-4 pr-0">
                      {flight.segments.map((seg, idx) => (
                        <div key={idx} className="flex flex-col w-full relative">
                          
                          {/* Desktop Segment View */}
                          <div className="hidden md:flex flex-row items-center w-full py-2">
                            {/* Departure Info */}
                            <div className="flex flex-col items-start w-24 shrink-0">
                              <span className="text-[26px] font-bold text-gray-900 leading-tight">{seg.departureTime}</span>
                              <span className="text-xs text-gray-600 font-medium">{seg.departureDate}</span>
                            </div>

                            {/* Timeline Graphic */}
                            <div className="flex-1 px-4 flex flex-col relative w-full items-center justify-center">
                              <div className="text-[11px] text-gray-400 font-medium mb-1 flex items-center justify-center">
                                {seg.stops} <span className="mx-1.5">|</span> <Clock className="w-3 h-3 mr-1" /> {seg.duration}
                              </div>
                              <div className="relative flex items-center w-full h-[30px] justify-between">
                                {/* Dep Plane */}
                                <div className="flex flex-col items-center absolute -left-2 top-0">
                                  <Plane className="w-5 h-5 text-[#2cb1e8] transform -rotate-12" />
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#2cb1e8] mt-1 relative z-10 border-2 border-white"></div>
                                  <span className="text-sm font-bold text-gray-800 mt-1">{seg.departureCode}</span>
                                </div>
                                {/* Line */}
                                <div className="w-full h-0.5 bg-gray-200 absolute top-1/2 -translate-y-1/2 left-0 z-0">
                                  {seg.stops !== 'DIRECT' && (
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
                                  )}
                                </div>
                                {/* Arr Plane */}
                                <div className="flex flex-col items-center absolute -right-2 top-0">
                                  <Plane className="w-5 h-5 text-[#2cb1e8] transform rotate-45" />
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#2cb1e8] mt-1 relative z-10 border-2 border-white"></div>
                                  <span className="text-sm font-bold text-gray-800 mt-1">{seg.arrivalCode}</span>
                                </div>
                              </div>
                            </div>

                            {/* Arrival Info */}
                            <div className="flex flex-col items-end w-24 shrink-0 text-right">
                              <span className="text-[26px] font-bold text-gray-900 leading-tight">{seg.arrivalTime}</span>
                              <span className="text-xs text-gray-600 font-medium">{seg.arrivalDate}</span>
                            </div>

                            {/* Baggage Icons */}
                            <div className="w-16 shrink-0 flex flex-col items-center gap-2 border-l border-gray-100 pl-4 ml-4">
                              <Briefcase className="w-5 h-5 text-[#2cb1e8]" />
                              <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
                                <Luggage className="w-3 h-3 text-gray-500" />
                              </div>
                            </div>
                          </div>

                          {/* Mobile Segment View (Native App Style - Matches Screenshot exactly) */}
                          <div className="flex md:hidden flex-col w-full px-4 pt-3 pb-2">
                          

                            {/* Timeline Middle */}
                            <div className="flex items-center justify-between w-full mb-4">
                              <div className="flex flex-col items-start w-20">
                                <span className="text-[17px] font-bold text-gray-900 leading-tight">{seg.departureTime}</span>
                                <span className="text-[11px] text-gray-500 mt-0.5">{seg.departureCode}</span>
                              </div>
                              
                              <div className="flex-1 flex flex-col items-center px-2">
                                <div className="flex items-center w-full gap-2">
                                  <div className="h-px bg-gray-300 flex-1"></div>
                                  <span className="text-[13px] font-semibold text-gray-800">{seg.duration}</span>
                                  <div className="h-px bg-gray-300 flex-1"></div>
                                </div>
                                <span className="text-[11px] text-gray-500 mt-1">{seg.stops === 'DIRECT' ? 'Non Stop' : seg.stops}</span>
                              </div>

                              <div className="flex flex-col items-end w-20 text-right">
                                <span className="text-[17px] font-bold text-gray-900 leading-tight">{seg.arrivalTime}</span>
                                <span className="text-[11px] text-gray-500 mt-0.5">{seg.arrivalCode}</span>
                              </div>
                            </div>
                          </div>

                          {idx < flight.segments.length - 1 && (
                            <div className="w-full h-px border-b border-gray-200 border-dashed my-2 md:my-4 hidden md:block"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Action Block (Mobile: Bottom, Desktop: Right Col) */}
                  <div className="w-full md:w-56 flex flex-row md:flex-col items-center md:justify-center border-t md:border-t-0 md:border-l border-gray-100 p-0 md:p-6 shrink-0 relative bg-white justify-between md:justify-start">
                    
                    {/* Desktop Content */}
                    <div className="hidden md:flex flex-col items-center w-full">
                      <p className="text-[15px] font-bold text-gray-800 mb-1">Per Person</p>
                      <p className="text-3xl font-bold text-gray-800 mb-1">£ {flight.price}</p>
                      <p className="text-[11px] text-gray-400 mb-4">Including All Taxes</p>
                      
                      <div className="w-full mb-3">
                        <Link href={`/flights/checkout/${flight.id}?passengers=${passengers}`}>
                          <button className="w-full bg-[#ff7b3a] hover:bg-[#ff7b3a]/90 text-white font-bold py-3 text-[15px] rounded-sm tracking-wide transition-colors">
                            SELECT
                          </button>
                        </Link>
                      </div>

                      <p className="text-[13px] font-medium text-red-600 mb-2">{flight.seatsLeft} Seats Left</p>
                      <a href="#" className="text-[13px] text-[#2cb1e8] hover:underline decoration-1 underline-offset-2">Flight Details</a>
                    </div>

                    {/* Mobile Content (Native App Style - Matches Screenshot exactly) */}
                    <div className="flex md:hidden items-center justify-between w-full px-4 py-3 bg-gray-50/50">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[15px]">🏆</span>
                        <span className="text-[13px] font-medium text-[#d99723]">Get Gold worth £10</span>
                      </div>
                      <span className="text-xl font-bold text-gray-900">£{flight.price}</span>
                    </div>

                  </div>
                </div>

                {/* Footer Message (Round Trip only) */}
                {tripType === "roundTrip" && (
                  <div className="w-full px-4 py-3 text-center border-t border-gray-100 bg-white flex flex-col items-center">
                    <p className="text-green-600 font-bold text-sm mb-1 uppercase tracking-wide">Same Day Free Cancellation</p>
                    <p className="text-[12px] font-bold text-gray-800">This fare includes 25 KG checked-in luggage plus 7-8 kg hand baggage per person.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <MobileFlightFilters />
      <Footer />
    </main>
  )
}
