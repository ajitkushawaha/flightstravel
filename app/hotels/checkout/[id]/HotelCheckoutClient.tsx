"use client"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Check, Loader2, Bed, User, Lock, X, ShieldCheck, Coffee, Car } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface HotelCheckoutClientProps {
  hotel: any
  guests: number
  checkIn: string
  checkOut: string
}

export function HotelCheckoutClient({ hotel, guests, checkIn, checkOut }: HotelCheckoutClientProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Calculate nights
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))) : 1

  const [addBreakfast, setAddBreakfast] = useState(false)
  const [addTransfer, setAddTransfer] = useState(false)
  
  const baseTotal = hotel.price * nights
  const [totalFare, setTotalFare] = useState(baseTotal)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State (Primary Guest Only)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  // Pre-fill from session
  useEffect(() => {
    if (session?.user?.email) setEmail(session.user.email)
    if (session?.user?.name) {
      const parts = session.user.name.split(" ")
      setFirstName(parts[0] || "")
      if (parts.length > 1) setLastName(parts.slice(1).join(" "))
    }
  }, [session])

  useEffect(() => {
    let newTotal = baseTotal
    if (addBreakfast) newTotal += 25 * guests * nights
    if (addTransfer) newTotal += 50
    setTotalFare(Number(newTotal.toFixed(2)))
  }, [addBreakfast, addTransfer, baseTotal, guests, nights])

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleCheckout = async () => {
    if (status !== "authenticated") {
      toast.error("Authentication Required", {
        description: "Please sign in to complete your booking.",
      })
      signIn("google")
      return
    }

    if (!firstName || !lastName || !email || !phone || !acceptedTerms) {
      toast.error("Missing Information", {
        description: "Please fill out all required fields and accept the terms.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // 1. Create booking
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: "HOTEL",
          itemId: hotel.id,
          itemName: `Hotel: ${hotel.title}`,
          // @ts-ignore
          userId: session?.user?.id,
          name: `${firstName} ${lastName}`,
          email,
          phone,
          date: checkInDate.toISOString(),
          guests: guests,
          totalAmount: totalFare,
        }),
      })

      const bookingData = await res.json()
      if (!bookingData.success) throw new Error(bookingData.error || "Booking failed")
      
      const bookingId = bookingData.data.id

      // 2. Create Razorpay Order
      const orderRes = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalFare,
          bookingId: bookingId,
          currency: "INR",
        }),
      })

      const orderData = await orderRes.json()
      if (!orderData.success) throw new Error(orderData.error || "Payment initialization failed")

      // 3. Open Razorpay Checkout
      const resScript = await loadRazorpay()
      if (!resScript) {
        toast.error("Razorpay SDK failed to load. Are you online?")
        setIsSubmitting(false)
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "iCruiseEgypt Hotels",
        description: `Booking for ${hotel.title}`,
        order_id: orderData.order.id,
        modal: {
          ondismiss: function() {
            setIsSubmitting(false)
          }
        },
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: bookingId,
            }),
          })

          const verifyData = await verifyRes.json()
          if (verifyData.success) {
            toast.success("Payment Successful!", {
              description: `Your booking is confirmed. Code: ${verifyData.confirmationCode}`,
            })
            router.push("/my-bookings")
          } else {
            toast.error("Payment Verification Failed")
            setIsSubmitting(false)
          }
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#1a73e8",
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()
      
    } catch (error: any) {
      toast.error("Checkout Error", {
        description: error.message || "Something went wrong during checkout.",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      
      {/* Left Column - Forms & Options */}
      <div className="flex-1 space-y-8">
        
        {/* Hotel Summary Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-32 relative rounded-xl overflow-hidden shrink-0">
            <img src={hotel.image} alt={hotel.title} className="object-cover w-full h-full" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{hotel.title}</h2>
            <div className="text-gray-600 mb-2">{hotel.location}</div>
            <div className="flex items-center gap-4 text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded-lg w-fit">
              <span>{nights} Night{nights > 1 ? 's' : ''}</span>
              <span className="w-1 h-1 rounded-full bg-gray-400"></span>
              <span>{guests} Guest{guests > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Primary Guest Details */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1a73e8] flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Primary Guest Details</h2>
              <p className="text-sm text-gray-500">The booking confirmation will be sent to these details.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1a73e8] focus:border-[#1a73e8] transition-all outline-none"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1a73e8] focus:border-[#1a73e8] transition-all outline-none"
                placeholder="Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1a73e8] focus:border-[#1a73e8] transition-all outline-none"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1a73e8] focus:border-[#1a73e8] transition-all outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        </div>

        {/* Hotel Add-ons */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Enhance Your Stay</h2>
          
          <div className="space-y-4">
            <div 
              onClick={() => setAddBreakfast(!addBreakfast)}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                addBreakfast ? "border-[#1a73e8] bg-blue-50/50" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                  addBreakfast ? "bg-[#1a73e8] text-white" : "border-2 border-gray-300"
                }`}>
                  {addBreakfast && <Check className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-amber-600" />
                    Daily Breakfast Included
                  </div>
                  <div className="text-sm text-gray-500">Start your day right with our premium buffet.</div>
                </div>
              </div>
              <div className="font-bold text-gray-900 text-right shrink-0">
                + £25<span className="text-xs text-gray-500 font-normal block">/guest/night</span>
              </div>
            </div>

            <div 
              onClick={() => setAddTransfer(!addTransfer)}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                addTransfer ? "border-[#1a73e8] bg-blue-50/50" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                  addTransfer ? "bg-[#1a73e8] text-white" : "border-2 border-gray-300"
                }`}>
                  {addTransfer && <Check className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <Car className="w-4 h-4 text-blue-600" />
                    Airport Transfer
                  </div>
                  <div className="text-sm text-gray-500">Private luxury car pickup from the airport.</div>
                </div>
              </div>
              <div className="font-bold text-gray-900 text-right shrink-0">
                + £50<span className="text-xs text-gray-500 font-normal block">One-time</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Right Column - Sticky Sidebar */}
      <div className="w-full lg:w-[380px] shrink-0">
        <div className="bg-white rounded-2xl border border-gray-200  overflow-hidden sticky top-24">
          
          <div className="bg-[#002f5e] p-6 text-white">
            <h3 className="font-bold text-xl mb-1">Fare Summary</h3>
            <p className="text-blue-200 text-sm">For {guests} Guest{guests > 1 ? 's' : ''}, {nights} Night{nights > 1 ? 's' : ''}</p>
          </div>

          <div className="p-6">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-gray-700">
                <span>Room Rate (£{hotel.price} x {nights})</span>
                <span className="font-medium">£{baseTotal.toFixed(2)}</span>
              </div>
              
              {addBreakfast && (
                <div className="flex justify-between items-center text-gray-700">
                  <span>Breakfast Add-on</span>
                  <span className="font-medium text-[#1a73e8]">+ £{(25 * guests * nights).toFixed(2)}</span>
                </div>
              )}

              {addTransfer && (
                <div className="flex justify-between items-center text-gray-700">
                  <span>Airport Transfer</span>
                  <span className="font-medium text-[#1a73e8]">+ £50.00</span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-end mb-1">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="text-3xl font-bold text-[#ff6000]">£{totalFare.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 text-right">Includes taxes and fees</p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-6 flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div className="text-sm text-green-900">
                <span className="font-bold block mb-1">Secure Booking</span>
                Your information is protected by 256-bit SSL encryption.
              </div>
            </div>

            <label className="flex gap-3 items-start cursor-pointer mb-6 group">
              <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                acceptedTerms ? "bg-[#1a73e8] border-[#1a73e8]" : "border-gray-300 group-hover:border-[#1a73e8]"
              }`}>
                {acceptedTerms && <Check className="w-3 h-3 text-white" />}
              </div>
              <input type="checkbox" className="hidden" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
              <span className="text-sm text-gray-600 leading-snug">
                I agree to the <a href="#" className="text-[#1a73e8] hover:underline">Terms & Conditions</a> and <a href="#" className="text-[#1a73e8] hover:underline">Privacy Policy</a>.
              </span>
            </label>

            <Button 
              onClick={handleCheckout} 
              disabled={isSubmitting}
              className="w-full bg-[#1a73e8] hover:bg-blue-700 text-white font-bold text-lg py-6 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:scale-100 h-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Complete Booking
                </>
              )}
            </Button>

          </div>
        </div>
      </div>
    </div>
  )
}
