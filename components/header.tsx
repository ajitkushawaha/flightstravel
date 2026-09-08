"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, ChevronDown, Settings, CreditCard, LogOut, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { useSession, signIn, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, isRTL } = useLanguage()
  const { data: session, status } = useSession()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className={`flex items-center justify-between h-20 ${isRTL ? 'flex-row-reverse' : ''}`}>
          
          {/* Logo */}
          <Link href="/" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Using a placeholder text for logo to match Flights.Travel styling */}
            <div className="flex items-center">
             
              <Image src="/logo.png" alt="Logo" width={200} height={50} />
            </div>
          </Link>

         

          {/* Right Section (Trustpilot + Actions) */}
          <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            
            {/* Trustpilot Badge */}
            <div className="hidden xl:flex flex-col items-center">
              <div className="flex items-center gap-1">
                <span className="text-green-500 font-bold text-xl">★</span>
                <span className="font-bold text-lg tracking-tight">Trustpilot</span>
                <div className="flex gap-0.5 ml-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-5 h-5 bg-green-500 flex items-center justify-center">
                      <span className="text-white text-sm">★</span>
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-gray-500 mt-0.5">4.8/5 (12k+ reviews)</span>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {/* Account Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 overflow-hidden">
                    {status === "authenticated" && session?.user?.image ? (
                      <Image 
                        src={session.user.image} 
                        alt={session.user.name || "User"} 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {status === "authenticated" ? (
                    <>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {session?.user?.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/my-bookings" className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>My Bookings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/settings" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => signOut()} 
                        className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuLabel>Welcome</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signIn()} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Log in / Sign up</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            
              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white">
            <nav className="flex flex-col gap-4 px-2">
              <Link href="/" className="text-sm font-bold text-blue-500">Home</Link>
              <Link href="/flights" className="text-sm font-semibold text-gray-700">Flights</Link>
              <Link href="/hotels" className="text-sm font-semibold text-gray-700">Hotels</Link>
              <Link href="/cruises" className="text-sm font-semibold text-gray-700">Cruises</Link>
              <Link href="/holidays" className="text-sm font-semibold text-gray-700">Holidays</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
