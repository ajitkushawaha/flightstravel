"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  button: string;
  src: string;
  tag?: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  cardSize?: string;
}

const Slide = ({ slide, index, current, handleSlideClick, cardSize = "70vmin" }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title, tag } = slide;

  return (
    <div className="perspective-[1400px] transform-3d">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 mx-[3vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: cardSize,
          height: cardSize,
          transform:
            current === index
              ? "scale(1.12) rotateX(0deg) translateZ(40px)"
              : "scale(0.78) rotateX(10deg) translateZ(-30px)",
          transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1), filter 900ms cubic-bezier(0.16, 1, 0.3, 1)",
          transformOrigin: "center center",
          zIndex: current === index ? 20 : 10,
          filter: current === index ? "none" : "brightness(0.45) blur(1px)",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 25), calc(var(--y) / 25), 0)"
                : "none",
            transition: "transform 0.15s ease-out",
            boxShadow:
              current === index
                ? "0 40px 80px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[130%] h-[130%] object-cover"
            style={{
              opacity: 1,
              transform: current === index ? "scale(1)" : "scale(1.08)",
              transition: "transform 0.7s ease",
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          {/* Gradient overlay - heavier on inactive */}
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{
              background:
                current === index
                  ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)"
                  : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 100%)",
            }}
          />
          {/* Tag */}
          {tag && (
            <div className="absolute top-5 left-5 bg-[#ff6000]/90 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase">
              {tag}
            </div>
          )}
        </div>

        <article
          className={`relative p-[4vmin] flex flex-col items-center justify-end h-full pb-10 transition-opacity duration-500 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif mb-4 drop-shadow-lg">
            {title}
          </h2>
          <button className="mt-2 px-6 py-2.5 w-fit mx-auto text-sm text-white bg-white/20 backdrop-blur-sm border border-white/40 h-11 flex justify-center items-center rounded-full hover:bg-[#ff6000] hover:border-[#ff6000] transition-all duration-300 font-medium shadow-lg">
            {button}
          </button>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({ type, title, handleClick }: CarouselControlProps) => {
  return (
    <button
      className={`w-12 h-12 flex items-center mx-2 justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-[#ff6000] hover:border-[#ff6000] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-white w-5 h-5" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
  cardSize?: string;
}

export default function Carousel({ slides, cardSize = "70vmin" }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 6 seconds — no hover pause
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1 === slides.length ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePreviousClick = () => {
    setCurrent((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrent((prev) => (prev + 1 === slides.length ? 0 : prev + 1));
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) setCurrent(index);
  };

  const id = useId();

  return (
    <div
      className="relative mx-auto flex flex-col items-center w-full"
      aria-labelledby={`carousel-heading-${id}`}
    >
      {/* Slides track */}
      <div className="relative w-full flex justify-center" style={{ height: cardSize }}>
        {/* Left arrow — vertically centered, left edge of section */}
        <button
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-[#ff6000] hover:border-[#ff6000] hover:text-white transition-all duration-200 shadow-lg rotate-180"
          title="Previous"
          onClick={handlePreviousClick}
        >
          <IconArrowNarrowRight className="text-gray-700 hover:text-white w-5 h-5" />
        </button>

        <ul
          className="absolute flex"
          style={{
            transform: `translateX(-${current * (100 / slides.length)}%)`,
            transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "transform",
            left: `calc(50% - ${cardSize} / 2)`,
          }}
        >
          {slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
              cardSize={cardSize}
            />
          ))}
        </ul>

        {/* Right arrow — vertically centered, right edge of section */}
        <button
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-[#ff6000] hover:border-[#ff6000] hover:text-white transition-all duration-200 shadow-lg"
          title="Next"
          onClick={handleNextClick}
        >
          <IconArrowNarrowRight className="text-gray-700 w-5 h-5" />
        </button>
      </div>

      {/* Dot indicators — below carousel */}
      <div className="flex justify-center gap-2 mt-16">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-[#ff6000]" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
