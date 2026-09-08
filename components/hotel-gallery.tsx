"use client"

import { useState } from "react"
import Image from "next/image"

interface HotelGalleryProps {
  images: string[]
}

export function HotelGallery({ images }: HotelGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-sm">
        <Image 
          src={images[currentIndex]} 
          alt={`Gallery image ${currentIndex + 1}`} 
          fill 
          className="object-cover transition-opacity duration-300" 
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
        {images.map((img, index) => (
          <div 
            key={index} 
            onClick={() => setCurrentIndex(index)}
            className={`relative w-24 h-24 md:w-32 md:h-24 shrink-0 rounded-xl overflow-hidden cursor-pointer snap-start transition-all ${
              currentIndex === index ? "ring-2 ring-primary ring-offset-2 opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image 
              src={img} 
              alt={`Thumbnail ${index + 1}`} 
              fill 
              className="object-cover" 
            />
          </div>
        ))}
      </div>
    </div>
  )
}
