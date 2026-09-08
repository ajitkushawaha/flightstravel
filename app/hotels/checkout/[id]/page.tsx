import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HotelCheckoutClient } from "./HotelCheckoutClient"
import { getHotelById } from "@/lib/data/hotels"

export default async function HotelCheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const resolvedSearchParams = await searchParams
  
  const guests = parseInt((resolvedSearchParams.guests as string) || "2", 10)
  
  // Default to today and tomorrow if dates are missing
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const checkIn = (resolvedSearchParams.checkIn as string) || today.toISOString().split('T')[0]
  const checkOut = (resolvedSearchParams.checkOut as string) || tomorrow.toISOString().split('T')[0]
  
  const hotel = getHotelById(id)

  if (!hotel) {
    return (
      <main className="min-h-screen bg-[#f5f7fa] flex flex-col items-center justify-center font-sans">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Hotel Not Found</h1>
          <p className="text-gray-600">The hotel you are trying to book could not be found.</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa] font-sans">
      <Header />
      <div className="container max-w-[1200px] mx-auto px-4 py-8 pt-24 pb-24">
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
          <p className="text-gray-600">Please review your booking details and enter your information below.</p>
        </div>

        <HotelCheckoutClient 
          hotel={hotel} 
          guests={guests} 
          checkIn={checkIn} 
          checkOut={checkOut} 
        />
        
      </div>
      <Footer />
    </main>
  )
}
