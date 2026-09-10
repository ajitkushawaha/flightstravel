"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Plane, Hotel, Ship, MapPin, ArrowRight, Star, ChevronLeft, ChevronRight,
  Menu, X, User, Quote, Send, CheckCircle, Heart, Clock, Shield, Headphones,
  Globe, Compass, Package, Palmtree, Mountain, Waves, CalendarDays, Search,
  Users, ArrowLeftRight
} from "lucide-react"
import { WanderluxSearchWidget } from "@/components/wanderlux-search-widget"
import Globe3DDemo from "@/components/3d-globe-demo"

/* ─────────────────────── COUNTER HOOK ─────────────────────── */
function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnView) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startOnView, started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return { count, ref }
}

/* ─────────────────────── SCROLL ANIMATION HOOK ─────────────────────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

/* ─────────────────────── DATA ─────────────────────── */
const destinations = [
  { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", services: "Flights • Hotels • Cruises" },
  { name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", services: "Flights • Hotels" },
  { name: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", services: "Flights • Hotels • Cruises" },
  { name: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80", services: "Flights • Hotels • Cruises" },
  { name: "Paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", services: "Flights • Hotels" },
  { name: "London", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80", services: "Flights • Hotels" },
]

const travelJourney = [
  {
    label: "Step 01",
    title: "Choose Your Experience",
    description: "Start with the kind of escape you are dreaming of, from a city break to a voyage at sea.",
    detail: "Flights, stays, cruises and guided escapes",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=85",
  },
  {
    label: "Step 02",
    title: "Pick a Destination",
    description: "Explore places that fit your travel mood, dates and budget before shaping the details.",
    detail: "Curated routes across the world",
    icon: MapPin,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=85",
  },
  {
    label: "Step 03",
    title: "Tailor Your Journey",
    description: "Bring together your stay, transfers and favourite experiences in one considered itinerary.",
    detail: "Hotels, activities and transfers your way",
    icon: CalendarDays,
    image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1400&q=85",
  },
  {
    label: "Step 04",
    title: "Book With Confidence",
    description: "Review every part of the plan in one place, then make your booking with clarity.",
    detail: "Clear details and secure booking",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=1400&q=85",
  },
  {
    label: "Step 05",
    title: "Travel, Then Remember",
    description: "Leave the planning behind and enjoy the journey, with the little moments becoming the story.",
    detail: "A trip made for lasting memories",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=85",
  },
]

const experienceScrollPerCard = 72

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount
}

function mapRange(inMin: number, inMax: number, outMin: number, outMax: number, value: number) {
  if (inMin === inMax) return outMax
  return lerp(outMin, outMax, (value - inMin) / (inMax - inMin))
}

const holidayPackages = [
  {
    title: "Paradise Found in Bali",
    desc: "Discover the perfect blend of natural beauty, spiritual serenity, and luxury in Bali. From the tranquil beaches of Nusa Dua to the vibrant nightlife of Seminyak",
    date: "April 15-22, 2025",
    location: "Bali",
    price: "3,200",
    tags: ["Surfing", "Yoga retreats", "Cultural tours"],
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80",
  },
  {
    title: "Romance in the Aegean",
    desc: "Step into a postcard-perfect paradise on the Greek island of Santorini. Renowned for its breathtaking sunsets, charming villages, and crystal-clear waters",
    date: "Juin 01-15, 2025",
    location: "Santorini",
    price: "4,500",
    tags: ["Wine tasting", "Cruises", "Exploring beaches"],
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=700&q=80",
  },
  {
    title: "Timeless Beauty in Kyoto",
    desc: "Immerse yourself in the cultural heart of Japan with a visit to Kyoto. Known for its historic temples, exquisite gardens, and vibrant traditions",
    date: "March 02-17, 2025",
    location: "Kyoto",
    price: "6,100",
    tags: ["Cherry blossom", "Temple tours", "Market explore"],
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&q=80",
  },
]

const travelStories = [
  { title: "Dubai in 5 Days", excerpt: "The ultimate guide to exploring Dubai's wonders...", category: "DESTINATIONS", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80" },
  { title: "Best Luxury Cruises 2025", excerpt: "Discover the most breathtaking cruise routes...", category: "CRUISES", image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=500&q=80" },
  { title: "Top Hotels in Bali", excerpt: "From cliffside infinity pools to jungle retreats...", category: "HOTELS", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80" },
  { title: "Weekend Getaways from London", excerpt: "Quick escapes for when you need a break...", category: "FLIGHTS", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80" },
]

const reviews = [
  { name: "Jane and John", location: "World Travelers, USA", text: "Our honeymoon in Santorini was like a dream. Flights Travel handled every detail, from a private yacht cruise to a romantic dinner with a view of the Aegean. We can't wait to book our next trip with them!", avatarImg: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=100&q=80" },
  { name: "David S", location: "Explorer", text: "Exploring the Maasai Mara was the highlight of my year. The lodges and guided game drives made me feel comfortable while witnessing the raw beauty of Africa. Exceeded all expectations.", avatarImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" },
  { name: "Emily Chen", location: "Birmingham, UK", text: "The holiday package to Maldives was incredible value. Everything was arranged perfectly. Their 24/7 support is genuinely helpful.", avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
]

const categoryTags = ["FLIGHTS", "HOTELS", "CRUISES", "DESTINATIONS", "TIPS"]

/* ─────────────────────── EXPLORE TABS DATA ─────────────────────── */
const exploreTabs = [
  {
    id: "flights",
    label: "Flights",
    icon: Plane,
    color: "#1a73e8",
    heading: "Fly Anywhere",
    sub: "Domestic • International",
    desc: "Search from 500+ airlines worldwide. Find the best deals on direct and connecting flights to your dream destination.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=700&q=80",
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: Hotel,
    color: "#059669",
    heading: "Luxury Stays",
    sub: "Hotels • Resorts • Villas",
    desc: "From boutique hideaways to 5-star luxury resorts. Compare prices and book your perfect accommodation.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80",
  },
  {
    id: "cruises",
    label: "Cruises",
    icon: Ship,
    color: "#0891b2",
    heading: "Sail the World",
    sub: "River • Ocean • Expedition",
    desc: "Discover breathtaking cruise itineraries across the Mediterranean, Caribbean, and beyond.",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=700&q=80",
  },
  {
    id: "packages",
    label: "Packages",
    icon: Package,
    color: "#d97706",
    heading: "Holiday Packages",
    sub: "All-inclusive • Tailored",
    desc: "Complete holiday packages with flights, hotels, transfers, and activities — all in one booking.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&q=80",
  },
]

/* ═══════════════════════ MAIN PAGE COMPONENT ═══════════════════════ */
export default function TestHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeExploreTab, setActiveExploreTab] = useState<string | null>(null)
  const experienceJourneyRef = useRef<HTMLElement>(null)
  const destinationCarouselRef = useRef<HTMLDivElement>(null)
  const blogCarouselRef = useRef<HTMLDivElement>(null)
  const [experienceProgress, setExperienceProgress] = useState(0)
  const [experienceReducedMotion, setExperienceReducedMotion] = useState(false)

  /* Scroll listener for header transparency */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotionPreference = () => setExperienceReducedMotion(media.matches)
    updateMotionPreference()
    media.addEventListener("change", updateMotionPreference)
    return () => media.removeEventListener("change", updateMotionPreference)
  }, [])

  /* Turn scroll distance into layered card progress. */
  useEffect(() => {
    let frame = 0

    const updateExperienceProgress = () => {
      const section = experienceJourneyRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const scrollableHeight = Math.max(1, rect.height - window.innerHeight)
      setExperienceProgress(clamp(-rect.top / scrollableHeight))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateExperienceProgress)
    }

    updateExperienceProgress()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const activeExperienceStep = useMemo(
    () => Math.min(travelJourney.length - 1, Math.round(experienceProgress * (travelJourney.length - 1))),
    [experienceProgress]
  )
  const activeExperienceFloat = experienceProgress * (travelJourney.length - 1)

  /* Stats */
  const stat1 = useCountUp(50, 2000)
  const stat2 = useCountUp(100, 2000)
  const stat3 = useCountUp(24, 1500)
  const stat4 = useCountUp(10, 1500)

  /* Scroll reveals */
  const servicesReveal = useScrollReveal()
  const exploreReveal = useScrollReveal()
  const destReveal = useScrollReveal()
  const packageReveal = useScrollReveal()
  const statsReveal = useScrollReveal()
  const storiesReveal = useScrollReveal()
  const reviewsReveal = useScrollReveal()

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#1a1a1a] overflow-x-clip">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          {/* Logo Container with White Cutout */}
          <div className="relative bg-white h-24 flex items-center pl-8 pr-12 md:pr-16 rounded-br-[40px]">
            <Link href="/test-homepage" className="flex items-center gap-2 relative z-10">
              <Image
                src="/logo.png"
                alt="FlightsTravels"
                width={180}
                height={45}
                className="w-auto h-auto"
              />
            </Link>
            {/* Top-Right Curve (Connecting to Hero Top Edge) */}
            <svg className="absolute -right-10 top-2 w-10 h-10 fill-white" viewBox="0 0 40 40">
              <path d="M0 0 H40 C17.9086 0 0 17.9086 0 40 V0 Z" />
            </svg>
            {/* Bottom-Left Curve (Connecting to Hero Left Edge) */}
            <svg className="absolute left-2 -bottom-10 w-10 h-10 fill-white" viewBox="0 0 40 40">
              <path d="M0 0 H40 C17.9086 0 0 17.9086 0 40 V0 Z" />
            </svg>
          </div>

          <nav className="hidden lg:flex items-center gap-2 mr-auto ml-12">
            {[
              { label: "Home", href: "/test-homepage" },
              { label: "About us", href: "#" },
              { label: "Destinations", href: "#destinations" },
              { label: "Offers", href: "#" },
              { label: "Testimonials", href: "#" },
              { label: "Blog", href: "#" },
            ].map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${i === 0 ? "bg-white/20 text-white" : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right — Generic CTA */}
          <div className="flex items-center gap-3 pr-8">
            <button className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-semibold text-[#1a1a2e]">
              🇬🇧 EN
            </button>
            <Link
              href="#"
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-[#ff6b00] to-[#ff8c38] text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Contact us
            </Link>
            <button
              className="lg:hidden w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white animate-tabIn">
            <nav className="flex flex-col gap-4 px-2">
              {["Home", "Flights", "Hotels", "Cruises", "Destinations", "Packages"].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm font-semibold text-gray-700 hover:text-[#1a73e8]">
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ═══════════════════ 1. HERO SECTION — WANDERLUX STYLE ═══════════════════ */}
      <section id="overview" className="relative pt-24 overflow-hidden flex flex-col justify-center bg-white" style={{ minHeight: "100vh" }}>
        {/* Full Bleed Background Image */}
        <div className="absolute top-2 bottom-2 left-2 right-2 rounded-2xl md:rounded-4xl overflow-hidden">
          <Image
            src="/hero-coastal.png"
            alt="Mediterranean coastal town"
            fill
            className="object-cover"
            style={{ animation: "kenBurns 20s ease-in-out infinite alternate" }}
            priority
          />
          {/* Subtle dark gradient overlay to make white text pop */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1200px] w-full mx-auto px-4 lg:px-6 pt-4 md:pt-8 pb-4 md:pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8">
            {/* Left — Heading */}
            <div className="w-full md:w-[65%] shrink-0">
              <h1
                className="font-serif text-5xl md:text-5xl lg:text-[4.5rem] font-bold text-white leading-[1.1] mb-2 md:mb-4 tracking-tight"
                style={{
                  opacity: heroLoaded ? 1 : 0,
                  transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
                  transition: "all 1s ease 0.3s",
                }}
              >
                Discover Your<br />
                Dream Destination.
              </h1>
            </div>


          </div>
        </div>

        {/* ───── SEARCH FORM ───── */}
        <div
          className="relative z-30 w-full max-w-[1200px] mx-auto px-4 lg:px-6 mt-10 md:mt-20 pb-4 md:pb-8"
          style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(40px)",
            transition: "all 1s ease 0.9s",
          }}
        >
          <WanderluxSearchWidget />
        </div>
      </section>

      {/* ═══════════════════ 2. GATEWAY / ABOUT US (EDITORIAL) ═══════════════════ */}
      <section id="explore" className="min-h-[85vh] flex flex-col justify-center py-12 md:py-16 bg-white overflow-hidden">
        <div className="max-w-[1200px] w-full mx-auto px-4 md:px-8">

          {/* Top Row: Title & Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-10 lg:mb-12">
            <div className="lg:col-span-4 flex items-start pt-2">
              <div
                ref={exploreReveal.ref}
                className="flex items-center gap-4"
                style={{
                  opacity: exploreReveal.isVisible ? 1 : 0,
                  transform: exploreReveal.isVisible ? "translateX(0)" : "translateX(-30px)",
                  transition: "all 0.8s ease",
                }}
              >
                <div className="w-12 h-px bg-gray-400"></div>
                <span className="text-gray-500 font-bold text-xs tracking-[0.2em] uppercase">Your gateway to the world</span>
              </div>
            </div>

            <div className="lg:col-span-8">
              <h2
                className="font-serif text-xl leading-[1.3] text-[#0a192f] font-medium"
                style={{
                  opacity: exploreReveal.isVisible ? 1 : 0,
                  transform: exploreReveal.isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.8s ease 200ms",
                }}
              >
                <ScrollRevealText text="At Flights Travel, we turn your travel dreams into reality. Specializing in luxury escapes, cultural immersions, and adventure-filled getaways, we craft personalized journeys tailored to your unique preferences." />
              </h2>
            </div>
          </div>

          {/* Bottom Row: Stats & Images */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">

            {/* Left: Stats & Desc */}
            <div
              className="lg:col-span-5 flex flex-col justify-end"
              style={{
                opacity: exploreReveal.isVisible ? 1 : 0,
                transform: exploreReveal.isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s ease 400ms",
              }}
            >
              <div className="grid grid-cols-3 gap-3 mb-8 lg:mb-10">
                <div>
                  <div className="text-3xl  font-bold text-[#0a192f] mb-1 lg:mb-2 tracking-tight">98%</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 font-medium">Customer satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0a192f] mb-1 lg:mb-2 tracking-tight">+100</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 font-medium">Popular destinations</div>
                </div>
                <div>
                  <div className="text-3xl  font-bold text-[#0a192f] mb-1 lg:mb-2 tracking-tight">+260</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 font-medium">Experienced guides</div>
                </div>
              </div>
              <p className="text-xs sm:text-xl text-[#0a192f] leading-relaxed max-w-sm mb-6 lg:mb-8 font-medium">
                <ScrollRevealText text="Founded by passionate explorers, Flights Travel specializes in curating luxury vacations, adventure-packed getaways, and cultural immersions tailored to your unique preferences. From the hidden gems of remote islands to the vibrant streets of iconic cities, we ensure every detail is handled with precision and care." />
              </p>
            </div>

            {/* Right: 3D Image Collage */}
            <div
              className="lg:col-span-7 relative w-full h-[350px] sm:h-[400px] lg:h-[450px] flex justify-center lg:justify-end pr-4 lg:pr-12"
              style={{
                opacity: exploreReveal.isVisible ? 1 : 0,
                transform: exploreReveal.isVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                transition: "all 1s cubic-bezier(0.23, 1, 0.32, 1) 500ms",
              }}
            >
              <Hover3D className="w-[85%] sm:w-[70%] lg:w-[380px] h-full z-10">
                <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-lg">
                  <Image
                    src="/coupal.png"
                    alt="Couple exploring"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </Hover3D>

              {/* Offset small image */}
              <Hover3D className="absolute -right-2 md:-right-6 top-8 w-[180px] sm:w-[220px] h-[140px] sm:h-40 z-20 hidden sm:block shadow-2xl rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80"
                  alt="Bali Gates"
                  fill
                  className="object-cover"
                />
              </Hover3D>

              {/* Action Button */}
              <button className="absolute -bottom-5 sm:-bottom-4 lg:bottom-4 right-4 sm:-right-2 lg:-right-8 z-30 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#ff6000] hover:bg-[#e05500] text-white font-semibold text-xs sm:text-sm rounded-full shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                Learn more <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════ 2.5. LIVE SOCIAL PROOF / FOMO GLOBE ═══════════════════ */}
      <section id="community" className="py-20 md:py-28 bg-[#0a192f] text-white overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <div className="w-full lg:w-5/12">
            <span className="text-[#ff6b00] font-medium text-sm tracking-[0.2em] uppercase mb-4 block">Global Community</span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-[50px] font-bold mb-6 leading-[1.1]">Join 10,000+ Travelers Worldwide</h2>
            <p className="text-blue-100/70 mb-10 max-w-md leading-relaxed">
              Our explorers are constantly discovering new horizons. Rotate the globe and hover over avatars to see real-time booking trends and where the world is traveling right now.
            </p>
            <div className="flex gap-5 items-center">
              <div className="flex -space-x-4">
                <img className="w-12 h-12 rounded-full border-[3px] border-[#0a192f] object-cover" src="https://assets.aceternity.com/avatars/1.webp" alt="avatar" />
                <img className="w-12 h-12 rounded-full border-[3px] border-[#0a192f] object-cover" src="https://assets.aceternity.com/avatars/2.webp" alt="avatar" />
                <img className="w-12 h-12 rounded-full border-[3px] border-[#0a192f] object-cover" src="https://assets.aceternity.com/avatars/3.webp" alt="avatar" />
                <div className="w-12 h-12 rounded-full border-[3px] border-[#0a192f] bg-[#ff6000] flex items-center justify-center text-xs font-bold text-white shadow-lg z-10">+9k</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex text-[#ff6000] mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-medium text-blue-100/60">4.9/5 from 2,000+ reviews</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12 h-[450px]  relative">
            <div className="absolute inset-0 bg-linear-to-r from-[#0a192f] via-transparent to-transparent z-10 pointer-events-none hidden lg:block" style={{ width: '100px' }}></div>
            <Globe3DDemo />
          </div>
        </div>
      </section>

      {/* ═══════════════════ 3. POPULAR DESTINATIONS ═══════════════════ */}
      <section id="destinations" className="min-h-screen flex flex-col justify-center py-16 md:py-24 bg-[#f8f9fc] text-[#1a1a1a] overflow-hidden">
        <div
          ref={destReveal.ref}
          className="max-w-[1200px] mx-auto px-4 w-full"
          style={{
            opacity: destReveal.isVisible ? 1 : 0,
            transform: destReveal.isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease",
          }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start text-left md:text-center">
            <div className="flex items-center gap-4 pt-3 text-left">
              <div className="h-px w-12 bg-gray-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Destinations</span>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a] md:text-3xl">Where Will Your Journey Take You?</h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">Explore top destinations with flights, hotels, and cruises — all in one place.</p>
            </div>
            <div className="hidden md:block" />
          </div>
        </div>

        <div className="relative mx-auto mt-12 w-full max-w-[1200px] px-4">
          <button
            type="button"
            aria-label="Previous destination"
            onClick={() => destinationCarouselRef.current?.scrollBy({ left: -380, behavior: "smooth" })}
            className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#ff7a50] bg-white text-[#ff7a50] transition-colors hover:bg-[#ff7a50] hover:text-white md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div ref={destinationCarouselRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {destinations.slice(0, 6).map((destination) => (
              <article key={destination.name} className="group min-w-[calc(100vw-2rem)] snap-center overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-2 sm:min-w-[calc(50%-0.625rem)] lg:min-w-[calc(33.333%-0.875rem)]">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 via-transparent to-transparent" />
                </div>
                <div className="px-6 pb-6 pt-5">
                  <h3 className="font-serif text-2xl font-semibold text-[#1a1a1a]">{destination.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">Discover flights, stays and experiences made for your next escape.</p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-xs font-medium text-gray-400">{destination.services}</span>
                    <button className="shrink-0 rounded-full bg-[#ff7a50] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#e06640]">
                      Explore trip
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next destination"
            onClick={() => destinationCarouselRef.current?.scrollBy({ left: 380, behavior: "smooth" })}
            className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#ff7a50] bg-white text-[#ff7a50] transition-colors hover:bg-[#ff7a50] hover:text-white md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* ═══════════════════ 4. TRAVEL EXPERIENCES — SCROLL STORY ═══════════════════ */}
      <section
        id="experiences"
        ref={experienceJourneyRef}
        className="relative bg-[linear-gradient(180deg,#ffffff_0%,#fff8f3_52%,#ffffff_100%)]"
        style={{ height: `calc(100vh + ${(travelJourney.length - 1) * experienceScrollPerCard}vh)` }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden px-4 py-4 sm:px-6 md:px-14">
          <div className="pointer-events-none absolute right-0 top-16 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 left-0 h-72 w-72 rounded-full bg-orange-200/25 blur-3xl" />
          <div className="relative z-10 mx-auto mt-2 grid w-full max-w-[1440px] grid-cols-1 gap-6 md:mt-4 md:grid-cols-3 md:items-start">
            <div className="flex items-center gap-4 pt-3">
              <div className="h-px w-12 bg-gray-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Experiences</span>
            </div>
            <div className="text-left md:text-center">
              <h2 className="font-serif text-2xl font-semibold text-slate-950 md:text-3xl">Travel Experiences</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 md:text-base">Choose how you want to experience the world.</p>
            </div>
            <div className="hidden md:block" />
          </div>
          <div className="relative z-10 mx-auto mt-4 grid min-h-0 w-full max-w-[1440px] flex-1 [perspective:1000px]">

            {travelJourney.map((experience, index) => {
              const isActive = activeExperienceStep === index
              const Icon = experience.icon
              const enterProgress = index === 0 ? 1 : clamp(activeExperienceFloat - (index - 1))
              const stackProgress = clamp(activeExperienceFloat - index)
              const settledY = 0
              const stackedScale = mapRange(0, travelJourney.length - 2, 0.82, 0.96, index)
              const scale = experienceReducedMotion ? 1 : lerp(1, stackedScale, stackProgress)
              const rotationX = experienceReducedMotion ? 0 : lerp(0, -20, stackProgress)
              const translateY = experienceReducedMotion
                ? `${settledY}px`
                : `${(1 - enterProgress) * 100}vh`

              return (
                <article
                  key={experience.title}
                  aria-hidden={!isActive}
                  className="scroll-mt-24 overflow-y-auto rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-[0_22px_64px_rgba(15,23,42,0.1)] [grid-area:1/1/2/2] lg:overflow-y-hidden md:rounded-[2rem] md:p-6 md:shadow-[0_28px_90px_rgba(15,23,42,0.12)]"
                  style={{
                    zIndex: index + 1,
                    opacity: experienceReducedMotion || index === 0 ? 1 : clamp(enterProgress * 1.4),
                    transform: `translate3d(0, ${translateY}, 0) rotateX(${rotationX}deg) scale(${scale})`,
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d",
                    transition: experienceReducedMotion ? "none" : "box-shadow 220ms ease",
                    height: `calc(100% - ${settledY}px)`,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="grid h-full min-h-0 gap-3 md:grid-cols-[1.1fr_1.15fr] md:gap-4">
                    <div className="relative min-h-0 overflow-hidden rounded-[1.25rem] md:order-2 md:rounded-[1.5rem]">
                    <Image src={experience.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" priority={index === 0} />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a192f] via-[#0a192f]/20 to-transparent md:bg-linear-to-r md:from-[#0a192f]/25 md:to-transparent" />
                    </div>

                    <div className="relative z-10 flex min-h-0 flex-col justify-end rounded-[1.25rem] bg-[linear-gradient(135deg,#fff1e8_0%,#fff8f3_100%)] px-5 pb-14 pt-28 md:order-1 md:rounded-[1.5rem] md:px-10 md:pb-20 md:pt-32 lg:px-16">
                    <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-white text-[#ff6b00] shadow-sm md:h-12 md:w-12">
                      <Icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-[#ff6b00] uppercase">{experience.label}</p>
                    <h3 className="mt-3 max-w-lg font-serif text-3xl font-bold leading-tight text-slate-950 md:text-5xl">{experience.title}</h3>
                    <p className="mt-4 max-w-md text-sm leading-6 text-slate-700 md:text-base md:leading-7">{experience.description}</p>
                    <p className="mt-6 border-l-2 border-[#ff6b00] pl-3 text-xs font-semibold text-slate-700 md:text-sm">{experience.detail}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 5. HOLIDAY PACKAGES ═══════════════════ */}
      <section id="packages" className="py-20 md:py-28 bg-[#f8f9fc]">
        <div
          ref={packageReveal.ref}
          className="max-w-[1200px] mx-auto px-4"
          style={{
            opacity: packageReveal.isVisible ? 1 : 0,
            transform: packageReveal.isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease",
          }}
        >
          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-12 md:items-center mb-12 gap-6">
            <div className="flex items-center gap-4 w-full md:col-span-3">
              <div className="w-12 h-px bg-gray-400"></div>
              <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase">Your gateway to the world</span>
            </div>
            <div className="w-full md:col-span-6 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] whitespace-nowrap">
                Top Picks for Your Next Adventure.
              </h2>
            </div>
            {/* Nav arrows */}
            <div className="hidden md:flex gap-3 w-full md:col-span-3 justify-end">
              <button className="w-10 h-10 rounded-full border border-[#ff7a50] flex items-center justify-center hover:bg-[#ff7a50] group transition-all duration-200">
                <ChevronLeft className="h-5 w-5 text-[#ff7a50] group-hover:text-white" />
              </button>
              <button className="w-10 h-10 rounded-full border border-[#ff7a50] flex items-center justify-center hover:bg-[#ff7a50] group transition-all duration-200 bg-[#ff7a50]">
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {holidayPackages.map((pkg, i) => (
              <div
                key={pkg.title}
                className="group relative  cursor-pointer hover:-translate-y-2"
                style={{
                  opacity: packageReveal.isVisible ? 1 : 0,
                  transform: packageReveal.isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${i * 120}ms`,
                }}
              >

                {/* Image area — inset on all 4 sides so all corners are rounded */}
                <div className="p-2">
                  <div className="relative h-80 rounded-3xl transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent h-1/2" />

                    {/* Top Right Corner Cutout */}
                    <div className="absolute top-0 right-0 z-20 bg-[#f8f9fc] w-[52px] h-[52px] rounded-bl-3xl flex items-start justify-end p-1.5">
                      {/* Left inverted corner */}
                      <div className="absolute top-0 -left-5 w-5 h-5 bg-transparent rounded-tr-[1.25rem] shadow-[10px_-10px_0_10px_#f8f9fc]"></div>
                      {/* Bottom inverted corner */}
                      <div className="absolute right-0 -bottom-5 w-5 h-5 bg-transparent rounded-tr-[1.25rem] shadow-[10px_-10px_0_10px_#f8f9fc]"></div>

                      <button
                        className="relative z-10 w-full h-full bg-[#ff7a50] rounded-[14px] flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200 pointer-events-auto"
                      >
                        <ArrowRight className="h-[18px] w-[18px] text-white -rotate-45" strokeWidth={2.5} />
                      </button>
                    </div>

                    {/* Tag pills — top left */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 pr-14">
                      {pkg.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-medium px-3 py-1.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Text content */}
                <div className="px-3 pt-4 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-[#1a1a1a] text-xl leading-snug">{pkg.title}</h4>
                    <span className="text-[#ff7a50] font-medium text-xl whitespace-nowrap">{pkg.price}$</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5">{pkg.desc}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[11px] text-gray-400">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5 text-[#ff7a50]" />
                        <span>{pkg.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-[#ff7a50]" />
                        <span>{pkg.location}</span>
                      </div>
                    </div>
                    <Link href="#overview" className="bg-[#ff7a50] text-white text-[12px] font-medium px-4 py-2 rounded-full hover:bg-[#e06640] transition-colors flex items-center gap-1">
                      Book now <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 6. SPECIAL OFFERS ═══════════════════ */}
      <section id="offers" className="py-20 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between mb-12 gap-6 items-start">
            <div className="flex items-center gap-4 w-full md:w-1/3 pt-3">
              <div className="w-12 h-px bg-gray-400"></div>
              <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase">Special Offers</span>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-3 max-w-xl text-left md:text-center md:mx-auto lg:ml-0">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] leading-tight">
                Unmissable Deals for Your Next Adventure
              </h2>
              <p className="text-gray-500 text-sm">
                Discover exclusive travel packages designed to make your dream vacation more affordable.
              </p>
            </div>
            <div className="hidden md:block w-1/3"></div>
          </div>

          {/* Big Banner */}
          <div className="relative w-full h-[380px] md:h-[400px] bg-[#fbf5f3] rounded-3xl overflow-hidden mb-6 flex flex-col justify-between p-8 md:p-12">

            {/* Collage Image - absolute positioned at bottom */}
            <div className="absolute bottom-0 right-0 left-0 md:left-auto md:w-[90%] h-[80%] md:h-[80%] z-10">
              <div className="relative z-20 max-w-md">
                <h3 className="text-2xl  font-bold text-[#1a1a1a] leading-[1.1] mb-8">
                  Save <span className="text-[#ff7a50]">20%</span> on Europe / USA
                  <br />Tours.
                </h3>
                <Link href="#overview" className="bg-[#ff7a50] text-white text-[13px] font-medium px-6 py-3 rounded-full hover:bg-[#e06640] transition-colors flex items-center gap-2 w-fit">
                  Book now <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <Image
                src="/world_collage.png"
                alt="World Landmarks Collage"
                fill
                className="object-contain object-bottom md:object-center-bottom  opacity-90"
              />
            </div>
          </div>

          {/* Bottom Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">


            {/* Card 1: Safari (Spans 2 cols) */}
            <div className="md:col-span-2 relative bg-linear-to-tr from-[#ff7140] to-[#ff9868] rounded-3xl overflow-hidden h-80 p-8 flex items-center shadow-sm">
              {/* Background abstract overlay (optional) */}
              <div className="absolute inset-0 bg-white/5" />


              {/* Text content on right */}
              <div className="relative z-10 mr-auto w-[55%] md:w-1/2 flex flex-col gap-2 items-start pl-4 md:pl-0">
                {/* <span className="text-white/90 text-xs font-medium tracking-wide">Jun 15 - July 29, 2025</span> */}
                <h3 className="text-white font-bold text-2xl md:text-3xl leading-snug mb-1">Luxury Safari in Kenya</h3>
                <p className="text-white font-medium mb-5 text-sm">Buy 1 Get 1 50% Off</p>
                <Link href="#overview" className="bg-white text-[#ff7a50] text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 w-fit shadow-lg">
                  Book now <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Image absolute on left/center */}
              <div className="absolute bottom-0 right-[-10%] md:right-0 w-[70%] md:w-[60%] h-[95%]">
                <Image
                  src="/booking-girl.png"
                  alt="Traveler with luggage"
                  fill
                  className="object-contain object-bottom-left drop-shadow-2xl"
                />
              </div>
            </div>
            {/* Card 2: Cruise (Spans 1 col) */}
            <div className="relative rounded-3xl overflow-hidden h-80 p-6 flex flex-col justify-between group shadow-sm">
              <Image src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80" alt="Cruise" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-linear-to-b from-[#003875]/70 via-transparent to-black/60" />

              <div className="relative z-10 text-white">
                <span className="text-white/80 text-[10px] font-medium tracking-wide mb-1 block">Mai 07 - Jun 18, 2025</span>
                <h3 className="font-semibold text-[22px] leading-tight pr-4">Caribbean Cruise Getaway</h3>
              </div>

              <div className="relative z-10 text-white pb-1 pr-14">
                <p className="font-medium text-sm text-white/90">Up to 25% Off</p>
              </div>

              {/* Squircle arrow bottom-right */}
              <div className="absolute bottom-0 right-0 z-20 bg-white w-[52px] h-[52px] rounded-tl-3xl flex items-end justify-start p-1.5">
                <div className="absolute bottom-0 -left-5 w-5 h-5 bg-transparent rounded-br-[1.25rem] shadow-[10px_10px_0_10px_white]"></div>
                <div className="absolute right-0 -top-5 w-5 h-5 bg-transparent rounded-br-[1.25rem] shadow-[10px_10px_0_10px_white]"></div>
                <button className="w-full h-full bg-[#ff7a50] rounded-[14px] flex items-center justify-center shadow-sm scale-105 transition-transform duration-200 pointer-events-auto">
                  <ArrowRight className="h-[18px] w-[18px] text-white -rotate-45" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Card 3: Maldives (Spans 1 col) */}
            <div className="relative rounded-3xl overflow-hidden h-80 p-6 flex flex-col justify-between group shadow-sm">
              <Image src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80" alt="Maldives" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-linear-to-b from-[#103045]/70 via-transparent to-black/70" />

              <div className="relative z-10 text-white">
                <span className="text-white/80 text-[10px] font-medium tracking-wide mb-1 block">Feb 02 - Mars 01, 2025</span>
                <h3 className="font-semibold text-[22px] leading-tight pr-4">Maldives: Romantic Escape</h3>
              </div>

              <div className="relative z-10 text-white pb-1 pr-14">
                <p className="font-medium text-[13px] leading-snug text-white/90">Save 20% on All-Inclusive Honeymoon Packages</p>
              </div>

              {/* Squircle arrow bottom-right */}
              <div className="absolute bottom-0 right-0 z-20 bg-white w-[52px] h-[52px] rounded-tl-3xl flex items-end justify-start p-1.5">
                <div className="absolute bottom-0 -left-5 w-5 h-5 bg-transparent rounded-br-[1.25rem] shadow-[10px_10px_0_10px_white]"></div>
                <div className="absolute right-0 -top-5 w-5 h-5 bg-transparent rounded-br-[1.25rem] shadow-[10px_10px_0_10px_white]"></div>
                <button className="w-full h-full bg-[#ff7a50] rounded-[14px] flex items-center justify-center shadow-sm scale-105 transition-transform duration-200 pointer-events-auto">
                  <ArrowRight className="h-[18px] w-[18px] text-white -rotate-45" strokeWidth={2.5} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════ 7. WHY FLIGHTS TRAVEL — Stats ═══════════════════ */}
      <section id="why-us" className="py-20 md:py-28 bg-[#f5f4f2]">
        <div
          ref={statsReveal.ref}
          className="max-w-[1200px] mx-auto px-4"
          style={{
            opacity: statsReveal.isVisible ? 1 : 0,
            transform: statsReveal.isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease",
          }}
        >
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start text-left md:text-center">
            <div className="flex items-center gap-4 pt-3 text-left">
              <div className="h-px w-12 bg-gray-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Why Flights Travel</span>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#0a192f] md:text-3xl">
                Travel Made <span className="bg-linear-to-r from-[#ff6b00] to-[#ff8c38] bg-clip-text text-transparent">Simple.</span>
              </h2>
              <p className="mx-auto mt-2 max-w-md text-gray-500">Everything you need for the perfect journey, all in one platform.</p>
            </div>
            <div className="hidden md:block" />
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {[
              { ref: stat1.ref, count: stat1.count, suffix: "K+", label: "Happy Travelers", icon: Heart },
              { ref: stat2.ref, count: stat2.count, suffix: "+", label: "Destinations", icon: MapPin },
              { ref: stat3.ref, count: stat3.count, suffix: "/7", label: "Travel Support", icon: Headphones },
              { ref: stat4.ref, count: stat4.count, suffix: "+", label: "Years Experience", icon: Shield },
            ].map((stat, i) => (
              <div key={stat.label} ref={stat.ref} className="text-center">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto">
                  <stat.icon className="h-7 w-7 text-[#ff6b00]" />
                </div>
                <div className="text-2xl font-bold text-[#0a192f] mb-2">
                  {stat.count}{stat.suffix}
                </div>
                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Best Price Guarantee", desc: "We match any competitor's price. Find it cheaper elsewhere? We'll refund the difference.", icon: Shield, color: "#1a73e8" },
              { title: "Flexible Booking", desc: "Plans change. We get it. Free cancellation and easy rebooking on most reservations.", icon: Clock, color: "#059669" },
              { title: "24/7 Expert Support", desc: "Our travel experts are here around the clock. Call, chat, or email — anytime.", icon: Headphones, color: "#0891b2" },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-500 group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${benefit.color}15` }}
                >
                  <benefit.icon className="h-6 w-6" style={{ color: benefit.color }} />
                </div>
                <h4 className="font-bold text-[#0a192f] text-lg mb-2">{benefit.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════════════════ 8. TRAVEL STORIES / BLOG ═══════════════════ */}
      <section id="blog" className="py-20 md:py-28 bg-white">
        <div
          ref={storiesReveal.ref}
          className="max-w-[1200px] mx-auto px-4"
          style={{
            opacity: storiesReveal.isVisible ? 1 : 0,
            transform: storiesReveal.isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease",
          }}
        >
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start text-left md:text-center">
            <div className="flex items-center gap-4 pt-3 text-left">
              <div className="h-px w-12 bg-gray-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Blog</span>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#0a192f] md:text-3xl">Get Inspired Before You Go</h2>
            </div>
            <div className="hidden md:block" />
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categoryTags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-gray-100 text-gray-500 text-xs font-bold tracking-wider rounded-full hover:bg-[#0a192f] hover:text-white transition-all duration-300 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Previous story"
              onClick={() => blogCarouselRef.current?.scrollBy({ left: -380, behavior: "smooth" })}
              className="absolute -left-5 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#ff7a50] bg-white text-[#ff7a50] shadow-sm transition-colors hover:bg-[#ff7a50] hover:text-white md:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div ref={blogCarouselRef} className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {travelStories.slice(0, 3).map((story, i) => (
              <div
                key={story.title}
                className="group min-w-[calc(100vw-2rem)] snap-center cursor-pointer sm:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-1rem)]"
                style={{
                  opacity: storiesReveal.isVisible ? 1 : 0,
                  transform: storiesReveal.isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${i * 100}ms`,
                }}
              >
                <div className="relative h-60 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#0a192f]">
                    {story.category}
                  </div>
                </div>
                <h4 className="font-bold text-[#0a192f] text-lg mb-2 group-hover:text-[#1a73e8] transition-colors">{story.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{story.excerpt}</p>
              </div>
            ))}
            </div>
            <button
              type="button"
              aria-label="Next story"
              onClick={() => blogCarouselRef.current?.scrollBy({ left: 380, behavior: "smooth" })}
              className="absolute -right-5 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#ff7a50] bg-white text-[#ff7a50] shadow-sm transition-colors hover:bg-[#ff7a50] hover:text-white md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 9. CUSTOMER REVIEWS ═══════════════════ */}
      {/* ═══════════════════ 9. CUSTOMER REVIEWS ═══════════════════ */}
      <section id="reviews" className="py-20 md:py-28 bg-[#f4f8fb]">
        <div
          ref={reviewsReveal.ref}
          className="max-w-[1200px] mx-auto px-4"
          style={{
            opacity: reviewsReveal.isVisible ? 1 : 0,
            transform: reviewsReveal.isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease",
          }}
        >
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between mb-12 gap-6 items-start">
            <div className="flex items-center gap-4 w-full md:w-1/4 pt-3">
              <div className="w-12 h-px bg-gray-400"></div>
              <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase">Testimonials</span>
            </div>

            <div className="w-full md:w-2/4 flex flex-col gap-3 text-left">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] leading-tight">
                Real Journeys, Real Memories
              </h2>
              <p className="text-gray-500 text-sm max-w-sm">
                Our travelers share their incredible experiences and unforgettable adventures.
              </p>
            </div>

            {/* Trustpilot Placeholder */}
            <div className="w-full md:w-1/4 flex justify-end">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-5 w-5 fill-[#00b67a] text-[#00b67a]" />
                  <span className="font-bold text-lg text-[#1a1a1a]">Trustpilot</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-7 h-7 bg-[#00b67a] flex items-center justify-center">
                      <Star className="h-4 w-4 fill-white text-white" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80" alt="Happy friends on vacation" fill className="object-cover" />
            </div>

            {/* Right Slider */}
            <div className="lg:col-span-7 flex flex-col h-full justify-center">
              {/* Slider Header */}
              <div className="flex justify-between items-center mb-6 px-2">
                <span className="font-semibold text-lg text-[#1a1a1a]">(1/120) Reviews</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('review-slider');
                      if (el) el.scrollBy({ left: -400, behavior: 'smooth' });
                    }}
                    className="w-10 h-10 rounded-full border border-[#ff7a50] flex items-center justify-center hover:bg-[#ff7a50] group transition-all duration-200"
                  >
                    <ChevronLeft className="h-5 w-5 text-[#ff7a50] group-hover:text-white" />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('review-slider');
                      if (el) el.scrollBy({ left: 400, behavior: 'smooth' });
                    }}
                    className="w-10 h-10 rounded-full border border-[#ff7a50] flex items-center justify-center hover:bg-[#ff7a50] group transition-all duration-200 bg-[#ff7a50]"
                  >
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Slider Cards */}
              <div id="review-slider" className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {reviews.map((r, i) => (
                  <div key={i} className="w-[85vw] sm:w-[calc(50%-12px)] flex-none bg-white rounded-3xl p-8 snap-start shadow-sm flex flex-col justify-between h-[300px]">
                    <div>
                      <Quote className="h-8 w-8 text-[#ff7a50] mb-5 transform rotate-180" fill="currentColor" />
                      <p className="text-gray-600 text-[13px] leading-relaxed line-clamp-4">{r.text}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image src={r.avatarImg} alt={r.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-[#1a1a1a] text-sm">{r.name}</div>
                        <div className="text-gray-400 text-xs">{r.location}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* ═══════════════════ 7. CINEMATIC BANNER ═══════════════════ */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden mx-4 md:mx-8 rounded-3xl">
        <Image
          src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=80"
          alt="Tropical paradise"
          fill
          className="object-cover"
          style={{ animation: "kenBurns 12s ease-in-out infinite alternate" }}
        />
        <div className="absolute inset-0 bg-black/40 rounded-3xl" />
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <h2 className="font-semibold text-3xl md:text-5xl text-white mb-5 leading-tight">
            Your Adventure Awaits – Let’s Make It Unforgettable
          </h2>
          <p className="text-white/70 mb-10 text-sm md:text-base max-w-lg mx-auto">
            From serene getaways to thrilling escapades, we’ll craft a journey that’s uniquely yours. The world is calling – will you answer?
          </p>
          <Link
            href="#destinations"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#ff7a50] text-white font-semibold rounded-full hover:bg-[#e06640] transition-all duration-300 text-sm"
          >
            Explore Destinations <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════ 10. NEWSLETTER + FOOTER (COMBINED ORANGE) ═══════════════════ */}
      <footer className="bg-[#ff7a50] text-white mx-4 md:mx-8 my-8 rounded-3xl overflow-hidden">
        {/* Top: Newsletter Row */}
        <div className="max-w-[1200px] mx-auto px-8 md:px-14 pt-14 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            {/* Left: Heading + Subtext */}
            <div className="max-w-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                Stay Inspired – Your Next Adventure Awaits!
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Join our travel community and be the first to know about exclusive deals, destination guides, and insider tips.
              </p>
            </div>

            {/* Right: Email Form */}
            <NewsletterInlineForm />
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 py-6 border-t border-white/20">
            {[
              { label: "Home", href: "/test-homepage" },
              { label: "About us", href: "#" },
              { label: "Destinations", href: "#destinations" },
              { label: "Offers", href: "#" },
              { label: "Testimonials", href: "#reviews" },
              { label: "Blog", href: "#blog" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white/80 text-sm font-medium hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Giant Brand Name */}
        <div className="px-6 md:px-10 overflow-hidden">
          <div className="text-[clamp(80px,14vw,200px)] font-black leading-none text-white/95 tracking-tight select-none" style={{ lineHeight: 0.85 }}>
            FlightsTravel
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1200px] mx-auto px-8 md:px-14 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-xs">© Flights Travel 2025 All Rights Reserved</p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              { icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.83 1.55V6.79a4.85 4.85 0 01-1.06-.1z", label: "TikTok" },
              { icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", label: "Instagram" },
              { icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.857L1.497 2.25H8.54l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z", label: "X" },
              { icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", label: "Facebook" },
            ].map((s) => (
              <button key={s.label} className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                  <path d={s.icon} />
                </svg>
              </button>
            ))}
          </div>

          <div className="flex gap-5 text-white/70 text-xs">
            <Link href="#" className="hover:text-white transition-colors">Terms &amp; conditions</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy policy</Link>
          </div>
        </div>
      </footer>

      {/* ═══════════════════ CSS ANIMATIONS ═══════════════════ */}
      <style jsx global>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-20px); opacity: 0.8; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(6px); opacity: 1; }
        }
        @keyframes dashMove {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -28; }
        }
        }
      `}</style>
      <StickyBottomNav />
    </main>
  )
}


/* ─────────────────────── NEWSLETTER INLINE FORM (used inside orange footer) ─────────────────────── */
function NewsletterInlineForm() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail("") }
  }

  if (subscribed) {
    return (
      <div className="flex items-center gap-2 text-white bg-white/20 px-6 py-4 rounded-full">
        <CheckCircle className="h-5 w-5" />
        <span className="font-medium text-sm">You're subscribed!</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex bg-white rounded-full overflow-hidden shadow-lg w-full max-w-md">
      <input
        type="email"
        placeholder="Enter your email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-6 py-4 text-gray-700 text-sm placeholder:text-gray-400 focus:outline-none bg-transparent"
      />
      <button
        type="submit"
        className="bg-[#ff7a50] text-white font-semibold px-6 py-4 text-sm flex items-center gap-1.5 hover:bg-[#e06640] transition-colors rounded-full m-1"
      >
        Subscribe <ChevronRight className="h-4 w-4" />
      </button>
    </form>
  )
}


/* ─────────────────────── STICKY BOTTOM NAV (DYNAMIC ISLAND STYLE) ─────────────────────── */
function StickyBottomNav() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("Overview")
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // 1. Scroll Progress Logic
    const onScroll = () => {
      const scrollTop = window.scrollY
      setIsVisible(scrollTop > 200)
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)

      // Auto-close menu on scroll
      if (isExpanded) setIsExpanded(false)
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // 2. Active Section Logic (Intersection Observer)
    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            const id = entry.target.id
            const formatted = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            setActiveSection(formatted)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((sec) => observer.observe(sec))

    return () => {
      window.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [isExpanded])

  const circumference = 53.407
  const dashoffset = circumference - scrollProgress * circumference

  const menuItems = [
    { id: "overview", label: "Overview", icon: Globe },
    { id: "explore", label: "Plan Trip", icon: Compass },
    { id: "destinations", label: "Destinations", icon: MapPin },
    { id: "experiences", label: "Experiences", icon: Star },
    { id: "packages", label: "Packages", icon: Package },
    { id: "offers", label: "Offers", icon: ArrowRight },
    { id: "why-us", label: "Why Us", icon: Shield },
  ]

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setIsExpanded(false)
    }
  }

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col overflow-hidden border border-white/10 bg-neutral-950/95 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] ring-1 ring-neutral-800 ring-offset-2 ring-inset ring-offset-neutral-900 backdrop-blur-3xl rounded-[2.5rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-24 opacity-0 pointer-events-none'} ${isExpanded ? 'w-[90vw] sm:w-[380px] p-4' : 'w-max p-1'}`}>

      {/* Expanded Menu View */}
      <div className={`flex flex-col gap-2 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isExpanded ? 'opacity-100 max-h-[400px] mb-3' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="flex items-center justify-between px-3 py-1 mb-1">
          <span className="text-white/90 font-semibold text-sm tracking-wide">Quick Navigation</span>
          <button onClick={() => setIsExpanded(false)} className="text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {menuItems.map(item => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 hover:bg-white/15 transition-all text-left text-white/70 hover:text-white group">
              <div className="bg-white/10 p-1.5 rounded-xl group-hover:bg-[#ff6000] group-hover:text-white transition-colors">
                <item.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Compact Default View */}
      <div className={`flex items-center justify-between gap-2 transition-all duration-500 ${isExpanded ? 'pt-3 border-t border-white/10' : ''}`}>

        {/* Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="group relative flex items-center justify-center gap-2 rounded-full px-4 py-2 text-left transition-colors text-neutral-400 hover:bg-white/10 hover:text-neutral-200"
        >
          {isExpanded ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span className="max-w-36 truncate text-xs font-medium text-neutral-100 hidden sm:block">{isExpanded ? 'Close' : 'Menu'}</span>
        </button>

        {/* Separator */}
        <div className="relative h-8 w-3 shrink-0 self-center hidden sm:block" aria-hidden="true">
          <svg className="pointer-events-none absolute bottom-0 block z-20 left-1/2 top-0 h-full -translate-x-1/2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true" style={{ width: "3px" }}>
            <defs>
              <pattern id="v-dots-1" width="4" height="6" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="3" r="1" className="fill-neutral-700"></circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#v-dots-1)"></rect>
          </svg>
        </div>

        {/* Scroll Progress Tracker */}
        <div className="flex min-w-0 items-center gap-2 px-1">
          <div className="relative h-6 w-6 shrink-0" role="progressbar">
            <svg className="h-6 w-6 -rotate-90 text-neutral-600/70" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"></circle>
            </svg>
            <svg className="pointer-events-none absolute inset-0 h-6 w-6 -rotate-90 text-[#ff6000]" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashoffset}></circle>
            </svg>
          </div>
          <div className="min-w-0 flex-1 hidden sm:block">
            <div className="overflow-hidden">
              <p className="truncate text-xs font-medium text-neutral-100 whitespace-nowrap animate-fade-in" key={activeSection}>{activeSection}</p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="relative h-8 w-3 shrink-0 self-center hidden sm:block" aria-hidden="true">
          <svg className="pointer-events-none absolute bottom-0 block z-20 left-1/2 top-0 h-full -translate-x-1/2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true" style={{ width: "3px" }}>
            <defs>
              <pattern id="v-dots-2" width="4" height="6" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="3" r="1" className="fill-neutral-700"></circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#v-dots-2)"></rect>
          </svg>
        </div>

        {/* Book Now Button */}
        <button type="button" onClick={() => scrollToSection("overview")} className="group relative flex flex-col items-center justify-center gap-0 rounded-full px-5 py-2.5 transition-all bg-[#ff6000] hover:bg-[#e05500] hover:scale-105 shadow-md sm:ml-1">
          <span className="text-xs font-bold text-white tracking-wide">Book Now</span>
        </button>

      </div>
    </div>
  )
}

/* ─────────────────────── HOVER 3D EFFECT ─────────────────────── */
function Hover3D({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    // Calculate rotation: center is 0, edges max out at ~15 deg
    const x = (e.clientX - left - width / 2) / 25
    const y = -(e.clientY - top - height / 2) / 25

    setStyle({
      transform: `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out"
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out"
    })
  }

  return (
    <div className={`relative group ${className}`} style={{ perspective: "1000px" }}>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full relative z-10"
        style={{ ...style, transformStyle: "preserve-3d" }}
      >
        {children}
        {/* Soft 3D Shadow under the card */}
        <div
          className="absolute inset-0 bg-transparent group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] transition-shadow duration-500 rounded-3xl -z-10"
          style={{ transform: "translateZ(-30px)" }}
        ></div>
      </div>
    </div>
  )
}

/* ─────────────────────── SCROLL REVEAL TEXT EFFECT ─────────────────────── */
function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const { top } = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const start = windowHeight * 0.85
      const end = windowHeight * 0.40
      let p = (start - top) / (start - end)

      p = Math.max(0, Math.min(1, p))
      setProgress(p)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const words = text.split(" ")

  return (
    <span ref={containerRef}>
      {words.map((word, i) => {
        const threshold = i / words.length
        const isActive = progress > threshold
        return (
          <span
            key={i}
            className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-20'}`}
          >
            {word}{" "}
          </span>
        )
      })}
    </span>
  )
}
