"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo Container with White Cutout */}
        <div className="relative bg-white h-24 flex items-center pl-8 pr-12 md:pr-16 rounded-br-[40px]">
          <Link href="/" className="flex items-center gap-2 relative z-10">
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
            { label: "Home", href: "/" },
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
  )
}