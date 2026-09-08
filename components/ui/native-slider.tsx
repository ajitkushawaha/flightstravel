"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NativeSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  itemCount?: number;
}

export function NativeSlider({ children, className, itemCount, ...props }: NativeSliderProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isScrollable, setIsScrollable] = React.useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      
      // Add a small 5px tolerance for rounding errors on high DPI screens
      const rightScrollable = Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5;
      setCanScrollRight(rightScrollable);
      
      // If scrollWidth <= clientWidth, it's not scrollable at all
      setIsScrollable(scrollWidth > clientWidth + 5);
      
      // Calculate active index for dots based on scroll percentage
      if (itemCount && itemCount > 1) {
         const maxScroll = scrollWidth - clientWidth;
         if (maxScroll > 0) {
           const scrollPercent = scrollLeft / maxScroll;
           const index = Math.round(scrollPercent * (itemCount - 1));
           setActiveIndex(index);
         }
      }
    }
  };

  React.useEffect(() => {
    // Initial check and timeout to handle font/image loading delays
    checkScroll();
    const timeout = setTimeout(checkScroll, 100);
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", checkScroll);
    }
  }, [itemCount]);

  const scrollBy = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // scroll by one client width roughly
      const clientWidth = scrollRef.current.clientWidth;
      const scrollAmount = clientWidth * 0.8; // scroll 80% of width
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group w-full">
      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className={`flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${className}`}
        {...props}
      >
        {children}
      </div>

      {/* Desktop Arrows */}
      {isScrollable && (
        <div className="hidden md:block">
          {canScrollLeft && (
            <button 
              onClick={() => scrollBy('left')}
              className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 pr-0.5" />
            </button>
          )}
          {canScrollRight && (
            <button 
              onClick={() => scrollBy('right')}
              className="absolute top-1/2 -right-5 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 pl-0.5" />
            </button>
          )}
        </div>
      )}

      {/* Desktop Dots */}
      {itemCount && itemCount > 1 && isScrollable && (
        <div className="hidden md:flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: itemCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (scrollRef.current) {
                  const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
                  const targetScroll = (maxScroll / (itemCount - 1)) * i;
                  scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? 'bg-blue-600 w-4' : 'bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
