import Image from "next/image"
import { NativeSlider } from "@/components/ui/native-slider"

const categories = [
  {
    title: "Apart hotel",
    image: "/hero.png", // using placeholder images
  },
  {
    title: "Spa",
    image: "/hero.png",
  },
  {
    title: "Resort",
    image: "/hero.png",
  },
  {
    title: "Apartment",
    image: "/hero.png",
  },
  {
    title: "Family friendly",
    image: "/hero.png",
  }
]

export function HotelCategories() {
  return (
    <section className="">
      <h2 className="text-3xl font-serif text-[#0b172a] font-bold mb-8">
        Discover your new favourite stay
      </h2>
      
      <NativeSlider itemCount={categories.length} className="gap-4 md:gap-6 pb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="min-w-[85vw] sm:min-w-[45vw] md:min-w-[calc(33.333%-16px)] lg:min-w-[calc(20%-20px)] snap-center shrink-0 group relative h-[320px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
          >
            <Image 
              src={category.image} 
              alt={category.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <h3 className="absolute bottom-6 left-6 text-white font-bold text-lg">
              {category.title}
            </h3>
          </div>
        ))}
      </NativeSlider>
    </section>
  )
}
