import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getHotelById } from "@/lib/data/hotels"
import Image from "next/image"
import { MapPin, Star, Bed, Wifi, Car, Tv, Bath, CheckCircle2, ChevronRight, Info, Users } from "lucide-react"
import Link from "next/link"
import { HotelGallery } from "@/components/hotel-gallery"

// Helper function to map amenity strings to icons
const getIcon = (name: string) => {
  const lowercase = name.toLowerCase()
  if (lowercase.includes('wifi')) return <Wifi className="w-5 h-5" />
  if (lowercase.includes('pool')) return <Bath className="w-5 h-5" /> // using bath as a stand-in for pool
  if (lowercase.includes('gym') || lowercase.includes('fitness')) return <CheckCircle2 className="w-5 h-5" />
  if (lowercase.includes('spa')) return <CheckCircle2 className="w-5 h-5" />
  if (lowercase.includes('parking') || lowercase.includes('car')) return <Car className="w-5 h-5" />
  if (lowercase.includes('tv')) return <Tv className="w-5 h-5" />
  if (lowercase.includes('room service') || lowercase.includes('restaurant') || lowercase.includes('breakfast')) return <CheckCircle2 className="w-5 h-5" />
  return <CheckCircle2 className="w-5 h-5" />
}

export default async function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const hotel = getHotelById(id)

  if (!hotel) {
    return (
      <main className="min-h-screen bg-[#fafbfc]">
        <Header />
        <div className="pt-20 md:pt-24 container max-w-[1200px] mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Hotel not found</h1>
          <p className="text-muted-foreground">The hotel you are looking for does not exist or has been removed.</p>
        </div>
        <Footer />
      </main>
    )
  }

  // Mock Photo Gallery since we only have 1 image per hotel in data
  const gallery = [
    hotel.image,
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542314831-c6a4d14ce8a1?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop"
  ]

  return (
    <main className="min-h-screen bg-[#fafbfc] font-sans">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-24 pb-4 container max-w-[1200px] mx-auto px-4">
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/hotels/search" className="hover:text-primary transition-colors">Hotels</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{hotel.title}</span>
        </div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
          <div>
            <div className="flex gap-1 mb-2">
              {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#ff6000] text-[#ff6000]" />
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{hotel.title}</h1>
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <MapPin className="h-4 w-4" />
              <span>{hotel.location}</span>
              <span className="text-[#1a73e8] cursor-pointer hover:underline text-sm ml-2">View on map</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-right">
                <div className="font-bold text-gray-900">Exceptional</div>
                <div className="text-xs text-gray-500">{hotel.reviews} reviews</div>
              </div>
              <div className="bg-[#002f5e] text-white font-bold text-xl px-3 py-2 rounded-lg flex items-center justify-center">
                {hotel.rating}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Main Details) */}
          <div className="flex-1 space-y-10">
            
            {/* Image Slider */}
            <HotelGallery images={gallery} />
            
            {/* About Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Experience unparalleled luxury at {hotel.title}, perfectly situated in the heart of {hotel.location.split(',')[0]}. 
                  This premium property offers stunning views, world-class amenities, and impeccable service tailored to meet the needs of both leisure and business travelers.
                </p>
                <p>
                  Guests can indulge in fine dining at our award-winning on-site restaurants, relax in the state-of-the-art spa, or take a dip in the infinity pool. Every room is designed with elegance and comfort in mind, featuring premium bedding, smart controls, and panoramic windows.
                </p>
              </div>
            </section>

            {/* Popular Amenities */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700 font-medium bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-[#ff6000]">{getIcon(amenity)}</div>
                    {amenity}
                  </div>
                ))}
              </div>
            </section>

            {/* Mock Room Selection */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose your room</h2>
              
              <div className="space-y-6">
                {/* Room Option 1 */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                  <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0">
                    <Image src={gallery[1]} alt="Deluxe Room" fill className="object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Deluxe King Room</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 2 Guests</span>
                        <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> 1 Extra-large double bed</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        <li className="flex items-center gap-2 text-green-600 font-medium"><CheckCircle2 className="w-4 h-4" /> Free cancellation before 23 Apr</li>
                        <li className="flex items-center gap-2 text-green-600 font-medium"><CheckCircle2 className="w-4 h-4" /> No prepayment needed</li>
                      </ul>
                    </div>
                    <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-2">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">£{hotel.price}</div>
                        <div className="text-xs text-gray-500">Includes taxes and fees</div>
                      </div>
                      <Link href={`/hotels/checkout/${hotel.id}`}>
                        <button className="bg-white border-2 border-[#1a73e8] text-[#1a73e8] hover:bg-blue-50 px-6 py-2 rounded-lg font-bold transition-colors">
                          Select Room
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Room Option 2 */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                  <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0">
                    <Image src={gallery[2]} alt="Executive Suite" fill className="object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Executive Suite with City View</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 3 Guests</span>
                        <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> 1 Extra-large bed + 1 Sofa bed</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        <li className="flex items-center gap-2 text-green-600 font-medium"><CheckCircle2 className="w-4 h-4" /> Breakfast included</li>
                        <li className="flex items-center gap-2 text-green-600 font-medium"><CheckCircle2 className="w-4 h-4" /> Free cancellation</li>
                      </ul>
                    </div>
                    <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-2">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">£{hotel.price + 150}</div>
                        <div className="text-xs text-gray-500">Includes taxes and fees</div>
                      </div>
                      <Link href={`/hotels/checkout/${hotel.id}`}>
                        <button className="bg-white border-2 border-[#1a73e8] text-[#1a73e8] hover:bg-blue-50 px-6 py-2 rounded-lg font-bold transition-colors">
                          Select Room
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </section>

          </div>

          {/* Right Column (Sticky Booking Sidebar) */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 lg:sticky lg:top-28">
              
              <div className="flex justify-between items-end mb-6">
                <div>
                  {hotel.originalPrice && (
                    <div className="text-sm text-gray-500 line-through mb-1">£{hotel.originalPrice}</div>
                  )}
                  <div className="text-3xl font-bold text-[#ff6000]">£{hotel.price}</div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                  Great Value
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100 flex gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <span className="font-bold block mb-1">High Demand</span>
                  Properties in {hotel.location.split(',')[0]} are booking fast for your selected dates.
                </div>
              </div>

              <Link href={`/hotels/checkout/${hotel.id}`}>
                <button className="w-full bg-[#1a73e8] hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-md transition-transform hover:scale-[1.02] active:scale-95 mb-4">
                  Reserve Now
                </button>
              </Link>
              
              <div className="text-center text-sm text-gray-500 font-medium">
                You won't be charged yet
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  )
}

