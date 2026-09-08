"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send } from "lucide-react"
import { useLanguage } from "@/components/i18n/LanguageProvider"

export function Footer() {
  const { t, isRTL } = useLanguage()
  
  return (
    <footer className="bg-[#0a192f] text-white pt-20 pb-8">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & About Column */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="mb-6 bg-white p-3 w-fit rounded-lg shadow-sm">
              <Image src="/logo.png" alt="FlightsTravels Logo" width={200} height={50} />
            </div>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
            
            <div className="flex gap-3 mb-8">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff6000] hover:text-white transition-all">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff6000] hover:text-white transition-all">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff6000] hover:text-white transition-all">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff6000] hover:text-white transition-all">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>

           
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-6 text-white">{t.footer.quickLinks}</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><Link href="/flights" className="hover:text-[#ff6000] transition-colors flex items-center gap-2"><span className="text-[#ff6000]">•</span> Search Flights</Link></li>
              <li><Link href="/holidays" className="hover:text-[#ff6000] transition-colors flex items-center gap-2"><span className="text-[#ff6000]">•</span> Holiday Packages</Link></li>
              <li><Link href="/cruises" className="hover:text-[#ff6000] transition-colors flex items-center gap-2"><span className="text-[#ff6000]">•</span> {t.footer.browseCruises}</Link></li>
              <li><Link href="/destinations" className="hover:text-[#ff6000] transition-colors flex items-center gap-2"><span className="text-[#ff6000]">•</span> {t.footer.destinations}</Link></li>
              <li><Link href="/deals" className="hover:text-[#ff6000] transition-colors flex items-center gap-2"><span className="text-[#ff6000]">•</span> {t.footer.specialDeals}</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold mb-6 text-white">Legal & Support</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><Link href="/trip-planner" className="hover:text-[#ff6000] transition-colors flex items-center gap-2"><span className="text-[#ff6000]">•</span> {t.footer.tripPlanner}</Link></li>
              <li><Link href="/blog" className="hover:text-[#ff6000] transition-colors flex items-center gap-2"><span className="text-[#ff6000]">•</span> {t.footer.travelBlog}</Link></li>
              <li><Link href="/privacy" className="hover:text-[#ff6000] transition-colors flex items-center gap-2"><span className="text-[#ff6000]">•</span> {t.footer.privacyPolicy}</Link></li>
              <li><Link href="/terms" className="hover:text-[#ff6000] transition-colors flex items-center gap-2"><span className="text-[#ff6000]">•</span> {t.footer.termsOfService}</Link></li>
              <li><Link href="/faq" className="hover:text-[#ff6000] transition-colors flex items-center gap-2"><span className="text-[#ff6000]">•</span> FAQ & Help</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold mb-6 text-white">{t.footer.contactUs}</h4>
            <ul className="space-y-5 text-gray-400 text-sm">
              <li className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-[#ff6000]" />
                </div>
                <span className="mt-2">{t.footer.addressValue}</span>
              </li>
              <li className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-[#ff6000]" />
                </div>
                <span className="font-semibold text-white">{t.footer.phoneValue}</span>
              </li>
              <li className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-[#ff6000]" />
                </div>
                <span>{t.footer.emailValue}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-white/10 pt-8 pb-4 flex flex-wrap justify-center items-center gap-6 opacity-80">
          <Image src="https://www.flightstravel.co.uk/assets/ficon/atol-protected.png" alt="ATOL Protected" width={120} height={50} className="object-contain" />
          <Image src="https://www.flightstravel.co.uk/assets/ficon/trustpilot-logo.png" alt="Trustpilot" width={120} height={50} className="object-contain" />
          <Image src="https://www.flightstravel.co.uk/assets/ficon/protected_payments.jpg" alt="Protected Payments" width={120} height={50} className="object-contain rounded" />
          <Image src="https://www.flightstravel.co.uk/assets/ficon/sage-pay-01.png" alt="Sage Pay" width={100} height={50} className="object-contain bg-white rounded p-1" />
        </div>

        {/* Bottom Copyright & Payments Strip */}
        <div className={`border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-gray-400 text-sm ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-2">
            <p>© 2025 FlightsTravels. {t.footer.allRightsReserved}.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-semibold text-white mr-2">Secure Payments:</span>
            <div className="flex gap-3">
              <Image src="https://www.flightstravel.co.uk/assets/img/payment-icons/visa-electron-curved-32px.png" alt="Visa" width={32} height={20} />
              <Image src="https://www.flightstravel.co.uk/assets/img/payment-icons/mastercard-curved-32px.png" alt="Mastercard" width={32} height={20} />
              <Image src="https://www.flightstravel.co.uk/assets/img/payment-icons/american-express-curved-32px.png" alt="Amex" width={32} height={20} />
              <Image src="https://www.flightstravel.co.uk/assets/img/payment-icons/discover-curved-32px.png" alt="Discover" width={32} height={20} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
