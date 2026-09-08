import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Plane, Clock, Briefcase, Luggage, ShieldCheck } from "lucide-react"
import { CheckoutClient } from "./CheckoutClient"
import { getFlightById } from "@/lib/data/flights"

export default async function FlightCheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const resolvedSearchParams = await searchParams
  const passengersCount = parseInt((resolvedSearchParams.passengers as string) || "1", 10)
  
  const flight = getFlightById(id)

  if (!flight) {
    return (
      <main className="min-h-screen bg-[#f5f7fa] flex flex-col items-center justify-center">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Flight Not Found</h1>
          <p className="text-gray-600">The flight you are trying to book could not be found.</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      <Header />
      <div className="container max-w-[1200px] mx-auto px-4 pt-24">
        
        {/* Desktop Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span className="hover:underline cursor-pointer">Home</span>
          <span>/</span>
          <span className="hover:underline cursor-pointer">Flights</span>
          <span>/</span>
          <span className="font-bold text-gray-800">Review Booking</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left) */}
          <div className="flex-1 space-y-6 ">
            <CheckoutClient flight={flight} passengersCount={passengersCount} />
            
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
