import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { NativeSlider } from "@/components/ui/native-slider"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "London, UK",
    avatar: "/hero.png",
    rating: 5,
    text: "An absolutely magical experience! The Nile cruise exceeded all expectations. The temples, the service, everything was perfect.",
  },
  {
    name: "Ahmed Hassan",
    location: "Dubai, UAE",
    avatar: "/deck.png",
    rating: 5,
    text: "Finally, a platform that makes booking Egyptian cruises easy. The trip planner feature helped us create the perfect itinerary.",
  },
  {
    name: "Maria Garcia",
    location: "Madrid, Spain",
    avatar: "/cabin.png",
    rating: 5,
    text: "The Red Sea cruise was breathtaking. Crystal clear waters, amazing diving spots. Will definitely book again through iCruiseEgypt!",
  },
  {
    name: "James Wilson",
    location: "Sydney, Australia",
    avatar: "/hero.png",
    rating: 5,
    text: "Top-tier service from start to finish. The food was incredible, and waking up to the Nile every morning is an experience I will never forget.",
  },
  {
    name: "Elena Rossi",
    location: "Rome, Italy",
    avatar: "/deck.png",
    rating: 4,
    text: "Very well organized trip! We loved exploring Luxor and Aswan. The guides were extremely knowledgeable and friendly.",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-bold text-xs tracking-wider uppercase">Testimonials</span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#002f5e] mt-2">What Our Travelers Say</h2>
        </div>

        <NativeSlider itemCount={testimonials.length} className="gap-4 md:gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-[85vw] sm:w-[45vw] md:w-[calc(33.333%-16px)] shrink-0 snap-center bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow rounded-2xl p-8 relative flex flex-col h-full">
              <Quote className="absolute top-6 right-6 h-12 w-12 text-blue-50" />

              <div className="flex items-center gap-1 mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed relative z-10 flex-1">"{testimonial.text}"</p>

              <div className="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-gray-100">
                <Image
                  src={testimonial.avatar || "/hero.png"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover w-12 h-12 ring-2 ring-gray-100"
                />
                <div>
                  <div className="font-bold text-[#002f5e]">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </NativeSlider>
      </div>
    </section>
  )
}
