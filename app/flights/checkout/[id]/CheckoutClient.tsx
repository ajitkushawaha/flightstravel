"use client"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Check, Loader2, Luggage, Plane, User, Lock, X, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface CheckoutClientProps {
  flight: any
  passengersCount: number
}

export function CheckoutClient({ flight, passengersCount }: CheckoutClientProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [bundle, setBundle] = useState("Basic")
  const [addBaggage, setAddBaggage] = useState(false)
  const [totalFare, setTotalFare] = useState(flight.price * passengersCount)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [passengersList, setPassengersList] = useState([
    { title: "Mr", firstName: "", lastName: "", dob: "" }
  ])
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  // Pre-fill from session
  useEffect(() => {
    if (session?.user?.email) setEmail(session.user.email)
    if (session?.user?.name) {
      const parts = session.user.name.split(" ")
      setPassengersList(prev => {
        const newList = [...prev]
        newList[0].firstName = parts[0]
        if (parts.length > 1) newList[0].lastName = parts.slice(1).join(" ")
        return newList
      })
    }
  }, [session])

  useEffect(() => {
    let newTotal = flight.price
    if (bundle === "Essential") newTotal += 82.11
    if (bundle === "Pro") newTotal += 109.48
    if (addBaggage) newTotal += 89.99
    
    setTotalFare(Number((newTotal * passengersCount).toFixed(2)))
  }, [bundle, addBaggage, flight.price, passengersCount])

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

    const isPassengerFormsValid = passengersList.every(p => p.firstName && p.lastName && p.dob)

    if (!isPassengerFormsValid || !email || !phone || !acceptedTerms) {
      toast.error("Missing Information", {
        description: "Please fill out all required fields and accept the terms.",
      })
      return
    }

    setIsSubmitting(true)

    const allNames = passengersList.map(p => `${p.firstName} ${p.lastName}`).join(", ")

    try {
      // 1. Create booking (reusing existing API but we mock itemId)
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: "FLIGHT",
          itemId: flight.id,
          itemName: `Flight: ${flight.segments[0].departureCode} to ${flight.segments[flight.segments.length - 1].arrivalCode}`,
          // @ts-ignore
          userId: session?.user?.id,
          name: allNames,
          email,
          phone,
          guests: passengersCount.toString(),
          date: flight.segments[0].departureDate,
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
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "FlightsTravel",
        description: `Flight Booking`,
        order_id: orderData.order.id,
        modal: {
          ondismiss: function () {
            setIsSubmitting(false)
          },
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
              description: `Your flight is booked! Confirmation code: ${verifyData.confirmationCode}`,
            })
            router.push("/my-bookings")
          } else {
            toast.error("Payment Verification Failed", {
              description: verifyData.error || "Please contact support.",
            })
          }
        },
        prefill: {
          name: `${passengersList[0].firstName} ${passengersList[0].lastName}`,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#ff6000",
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()
    } catch (error: any) {
      console.error("Booking error:", error)
      toast.error("Operation Failed", {
        description: error.message || "Something went wrong.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full mt-8">
    
      {/* LEFT COLUMN: Forms & Bundles */}
      <div className="flex-1 space-y-6">
           {/* Price Guarantee Banner */}
            <div className="bg-[#28a745] text-white p-3 rounded-t-lg flex items-center gap-3 font-medium">
              <ShieldCheck className="w-5 h-5 fill-white text-[#28a745]" />
              <span className="font-bold uppercase tracking-wider text-[13px]">Price Guarantee</span>
              <span className="text-[13px]">Cheapest price you can't get anywhere else</span>
            </div>

            {/* Selected Flight Card */}
            <>
              {/* Desktop Layout */}
              <div className="hidden md:flex bg-white border-x border-b border-gray-200 shadow-sm rounded-b-lg overflow-hidden flex-col w-full -mt-6 p-6">
                <div className="flex flex-col md:flex-row items-center w-full">
                  
                  {/* Airline Logo */}
                  <div className="w-32 shrink-0 flex flex-col items-center justify-center border-r border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={flight.logo} alt={flight.airline} className="h-10 object-contain mb-2" />
                    <span className="text-[13px] font-bold text-gray-800 text-center leading-tight">{flight.airline}</span>
                    <span className="text-[11px] text-gray-500 mt-1">Economy</span>
                  </div>

                  {/* Segments */}
                  <div className="flex-1 px-8">
                    {flight.segments.map((seg: any, idx: number) => (
                      <div key={idx} className="flex flex-col md:flex-row items-center w-full justify-between">
                        
                        <div className="flex flex-col text-center md:text-left w-32 shrink-0">
                          <span className="text-[28px] font-bold text-[#00102a] leading-none mb-1">{seg.departureTime}</span>
                          <span className="text-[13px] text-gray-500 mb-4">{seg.departureDate}</span>
                          <span className="text-[13px] font-bold text-gray-700">{seg.departureCode}</span>
                          <span className="text-[11px] text-gray-400">Airport Name</span> {/* Placeholder for full name */}
                        </div>

                        <div className="flex-1 px-4 flex flex-col relative w-full items-center justify-center -mt-8">
                          <div className="text-[11px] text-[#2cb1e8] font-medium mb-2 flex items-center justify-center uppercase tracking-widest">
                            {seg.stops} <span className="text-gray-300 mx-2">|</span> <span className="text-gray-400 font-normal lowercase">{seg.duration}</span>
                          </div>
                          <div className="relative flex items-center w-full">
                            <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                            <Plane className="w-4 h-4 text-[#2cb1e8] absolute left-1/2 -translate-x-1/2 bg-white px-1 -mr-1" />
                            <div className="w-2 h-2 rounded-full border-2 border-[#2cb1e8] bg-white absolute right-0"></div>
                          </div>
                        </div>

                        <div className="flex flex-col text-center md:text-right w-32 shrink-0">
                          <span className="text-[28px] font-bold text-[#00102a] leading-none mb-1">{seg.arrivalTime}</span>
                          <span className="text-[13px] text-gray-500 mb-4">{seg.arrivalDate}</span>
                          <span className="text-[13px] font-bold text-gray-700">{seg.arrivalCode}</span>
                          <span className="text-[11px] text-gray-400">Airport Name</span> {/* Placeholder for full name */}
                        </div>
                        
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Native Vertical Timeline (Matches Screenshot) */}
              <div className="flex md:hidden flex-col w-full bg-white rounded-2xl border border-gray-100 p-5 mb-4 shadow-sm relative z-10">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900">{flight.segments[0].departureCode} <span className="text-gray-400 mx-1 font-normal">→</span> {flight.segments[flight.segments.length-1].arrivalCode}</span>
                    <span className="text-[13px] text-gray-500 mt-1">{flight.segments[0].departureDate} • {flight.segments.length === 1 ? 'Non Stop' : `${flight.segments.length - 1} Stop`}</span>
                  </div>
                </div>

                {/* Airline info */}
                <div className="flex items-center gap-3 mb-6">
                  <img src={flight.logo} alt={flight.airline} className="h-5 object-contain" />
                  <span className="text-[15px] font-bold text-gray-800">{flight.airline} • {flight.id.toUpperCase()}</span>
                </div>

                {/* Timeline */}
                <div className="relative pl-[5px]">
                  {flight.segments.map((seg: any, idx: number) => (
                    <div key={idx} className="relative flex flex-col w-full mb-0">
                      
                      {/* Departure Node */}
                      <div className="flex w-full relative z-10">
                        <div className="absolute left-[-4.5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white z-20"></div>
                        <div className="flex flex-col ml-7 w-full">
                          <span className="text-[15px] font-bold text-gray-900">{seg.departureTime}</span>
                          <span className="text-[13px] text-gray-600 mt-0.5">{seg.departureCode} • {seg.departureDate}</span>
                        </div>
                      </div>

                      {/* Line & Duration */}
                      <div className="flex w-full relative border-l-2 border-gray-200 py-5">
                        <div className="flex flex-col pl-7 w-full">
                          <span className="text-[13px] text-gray-500 font-medium">Duration {seg.duration}</span>
                        </div>
                      </div>

                      {/* Arrival Node */}
                      <div className="flex w-full relative z-10">
                        <div className="absolute left-[-4.5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-800 ring-4 ring-white z-20"></div>
                        <div className="flex flex-col ml-7 w-full pb-3">
                          <span className="text-[15px] font-bold text-gray-900">{seg.arrivalTime}</span>
                          <span className="text-[13px] text-gray-600 mt-0.5">{seg.arrivalCode} • {seg.arrivalDate}</span>
                        </div>
                      </div>

                      {/* Layover if not last segment */}
                      {idx < flight.segments.length - 1 && (
                        <div className="flex w-full relative border-l-2 border-gray-200 border-dashed pb-6 pt-3">
                          <div className="ml-7 bg-[#fff8e1] rounded-lg p-3.5 w-full flex items-start gap-3 border border-[#ffecb3]">
                            <Plane className="w-4 h-4 text-gray-700 mt-0.5 shrink-0" />
                            <span className="text-[13px] font-medium text-gray-800 leading-tight">
                              Change of plane & Layover at {seg.arrivalCode}
                            </span>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </div>
            </>

            {/* ATOL Banner */}
            <div className="bg-[#f0f8ff] border border-[#d6eaff] rounded-lg p-3 flex items-center gap-3">
              <div className="bg-[#2cb1e8] rounded-full p-1">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="text-[13px] font-medium text-[#2cb1e8]">Your flight is 100% financially protected with ATOL.</span>
            </div>
        {/* Contact Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-[15px] text-[#002f5e] mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#2cb1e8]" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-gray-800">Email *</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 rounded p-2.5 mt-1.5 text-sm outline-none focus:border-[#2cb1e8] transition-colors" placeholder="Enter email" />
              <p className="text-[11px] text-gray-500 mt-2">Your booking confirmation will be sent to this email address.</p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-800">Contact Number *</label>
              <div className="flex mt-1.5">
                <select className="border border-gray-300 border-r-0 rounded-l p-2.5 text-sm bg-white w-[100px] outline-none focus:border-[#2cb1e8]">
                  <option>🇬🇧 +44</option>
                  <option>🇺🇸 +1</option>
                  <option>🇮🇳 +91</option>
                </select>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-gray-300 rounded-r p-2.5 text-sm outline-none focus:border-[#2cb1e8] transition-colors" placeholder="Enter number" />
              </div>
              <p className="text-[11px] text-gray-500 mt-2 leading-tight">We'll use this number to contact you about changes to your itinerary.</p>
            </div>
          </div>
           <div className="flex justify-between items-start mt-6 mb-6">
            <div>
              <h3 className="font-bold text-[15px] text-[#002f5e] mb-1 flex items-center gap-2">
                <User className="w-5 h-5 text-[#2cb1e8]" />
                Passengers Details
              </h3>
              <p className="text-[11px] text-gray-500 ml-7">(Please enter all details as shown on the passport)</p>
            </div>
            {passengersList.length < passengersCount && (
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs border-[#2cb1e8] text-[#2cb1e8] hover:bg-[#e6f5ff]"
                onClick={() => setPassengersList([...passengersList, { title: "Mr", firstName: "", lastName: "", dob: "" }])}
              >
                + Add Passenger
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            {passengersList.map((passenger, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5">
                <h4 className="font-bold text-[13px] text-gray-800 mb-4">{index === 0 ? "Lead Passenger" : `Passenger ${index + 1}`}</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-800">Title *</label>
                    <select 
                      value={passenger.title}
                      onChange={(e) => {
                        const newList = [...passengersList]
                        newList[index].title = e.target.value
                        setPassengersList(newList)
                      }}
                      className="w-full border border-gray-300 rounded p-2.5 mt-1.5 text-sm bg-white outline-none focus:border-[#2cb1e8]"
                    >
                      <option>Mr</option>
                      <option>Mrs</option>
                      <option>Ms</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-800">First Name *</label>
                    <input 
                      type="text" 
                      value={passenger.firstName} 
                      onChange={(e) => {
                        const newList = [...passengersList]
                        newList[index].firstName = e.target.value
                        setPassengersList(newList)
                      }}
                      className="w-full border border-gray-300 rounded p-2.5 mt-1.5 text-sm outline-none focus:border-[#2cb1e8] transition-colors" 
                      placeholder="Enter first name" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-800">Last Name *</label>
                    <input 
                      type="text" 
                      value={passenger.lastName} 
                      onChange={(e) => {
                        const newList = [...passengersList]
                        newList[index].lastName = e.target.value
                        setPassengersList(newList)
                      }}
                      className="w-full border border-gray-300 rounded p-2.5 mt-1.5 text-sm outline-none focus:border-[#2cb1e8] transition-colors" 
                      placeholder="Enter last name" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-800">Date of Birth *</label>
                    <input 
                      type="date" 
                      value={passenger.dob} 
                      onChange={(e) => {
                        const newList = [...passengersList]
                        newList[index].dob = e.target.value
                        setPassengersList(newList)
                      }}
                      className="w-full border border-gray-300 rounded p-2.5 mt-1.5 text-sm text-gray-500 outline-none focus:border-[#2cb1e8] transition-colors" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bundles */}
        <div className="bg-white rounded-lg md:border border-gray-200 p-0 md:p-6 shadow-sm mb-20 md:mb-0">
          
          {/* Desktop Bundles */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-bold text-[15px] text-[#002f5e] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#002f5e] fill-[#002f5e]" />
                Choose Bundle Pack
              </h3>
              <span className="text-[11px] font-medium text-[#2cb1e8] bg-[#e6f5ff] px-2 py-1 rounded-sm">
                ✨ More comfort. Better value.
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Basic */}
              <div className={`border rounded-lg p-5 flex flex-col justify-between bg-white relative transition-all ${bundle === 'Basic' ? 'border-[#2cb1e8] border-2 shadow-md' : 'border-gray-200'}`}>
                {bundle === 'Basic' && (
                  <div className="absolute top-3 right-3 bg-[#2cb1e8] rounded-full p-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-[15px] text-gray-800">Basic</h3>
                  <p className="text-xl font-bold mt-1 text-[#002f5e]">£0.00</p>
                  <ul className="mt-4 space-y-2 text-xs text-gray-500">
                    <li className="flex gap-2 items-center"><X className="w-3.5 h-3.5 text-red-500 shrink-0" /> Non-refundable</li>
                    <li className="flex gap-2 items-center"><X className="w-3.5 h-3.5 text-red-500 shrink-0" /> Tax non-refundable</li>
                    <li className="flex gap-2 items-center"><X className="w-3.5 h-3.5 text-red-500 shrink-0" /> Non-changeable</li>
                  </ul>
                </div>
                <Button 
                  variant={bundle === 'Basic' ? 'default' : 'outline'} 
                  className={`w-full mt-6 rounded-full text-[13px] font-bold ${bundle === 'Basic' ? 'bg-[#1a365d] hover:bg-[#1a365d]/90 text-white' : 'border-gray-300 text-gray-700'}`}
                  onClick={() => setBundle('Basic')}
                >
                  {bundle === 'Basic' ? 'Selected' : 'Select'}
                </Button>
              </div>

              {/* Essential */}
              <div className={`border rounded-lg p-5 flex flex-col justify-between relative bg-white transition-all ${bundle === 'Essential' ? 'border-[#2cb1e8] border-2 shadow-md' : 'border-gray-200'}`}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#28a745] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  MOST POPULAR
                </div>
                {bundle === 'Essential' && (
                  <div className="absolute top-3 right-3 bg-[#2cb1e8] rounded-full p-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-[15px] text-gray-800 mt-1">Essential</h3>
                  <p className="text-xl font-bold mt-1 text-[#002f5e]">£82.11</p>
                  <ul className="mt-4 space-y-2 text-xs text-gray-500">
                    <li className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-[#28a745] shrink-0" /> Flexible</li>
                    <li className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-[#28a745] shrink-0" /> Changeable</li>
                    <li className="flex gap-2 items-center"><X className="w-3.5 h-3.5 text-red-500 shrink-0" /> Non-refundable</li>
                  </ul>
                </div>
                <Button 
                  className={`w-full mt-6 rounded-full text-[13px] font-bold ${bundle === 'Essential' ? 'bg-[#1a365d] hover:bg-[#1a365d]/90 text-white' : 'bg-[#28a745] text-white hover:bg-[#218838]'}`}
                  onClick={() => setBundle('Essential')}
                >
                  {bundle === 'Essential' ? 'Selected' : 'Select'}
                </Button>
              </div>

              {/* Pro */}
              <div className={`border rounded-lg p-5 flex flex-col justify-between bg-white relative transition-all ${bundle === 'Pro' ? 'border-[#2cb1e8] border-2 shadow-md' : 'border-gray-200'}`}>
                {bundle === 'Pro' && (
                  <div className="absolute top-3 right-3 bg-[#2cb1e8] rounded-full p-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-[15px] text-gray-800">Pro</h3>
                  <p className="text-xl font-bold mt-1 text-[#002f5e]">£109.48</p>
                  <ul className="mt-4 space-y-2 text-xs text-gray-500">
                    <li className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-[#28a745] shrink-0" /> Flexible</li>
                    <li className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-[#28a745] shrink-0" /> Partial refundable</li>
                    <li className="flex gap-2 items-center"><Check className="w-3.5 h-3.5 text-[#28a745] shrink-0" /> VIP Support</li>
                  </ul>
                </div>
                <Button 
                  variant={bundle === 'Pro' ? 'default' : 'outline'} 
                  className={`w-full mt-6 rounded-full text-[13px] font-bold ${bundle === 'Pro' ? 'bg-[#1a365d] hover:bg-[#1a365d]/90 text-white' : 'border-gray-300 text-gray-700'}`}
                  onClick={() => setBundle('Pro')}
                >
                  {bundle === 'Pro' ? 'Selected' : 'Select'}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Bundles (Native App Style - Matches Screenshot) */}
          <div className="block md:hidden border border-gray-100 rounded-2xl p-5 shadow-sm bg-white mt-6">
            <h3 className="font-bold text-[18px] text-gray-900 mb-5">Select a fare option</h3>
            
            <div className="space-y-4">
              {/* Basic Bundle Card */}
              <div 
                className={`border rounded-xl p-4 cursor-pointer transition-all ${bundle === 'Basic' ? 'border-[#2cb1e8] bg-[#f0f9ff]/50' : 'border-gray-200 bg-white'}`}
                onClick={() => setBundle('Basic')}
              >
                <div className="flex justify-between items-start mb-5">
                  <span className="font-bold text-[15px] text-gray-900">Basic Value</span>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end leading-none">
                      <span className="font-bold text-[15px] text-gray-900">£0.00 <span className="text-[11px] text-gray-500 font-normal">/ adult</span></span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${bundle === 'Basic' ? 'border-[#2cb1e8]' : 'border-gray-300'}`}>
                      {bundle === 'Basic' && <div className="w-2.5 h-2.5 bg-[#2cb1e8] rounded-full"></div>}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-[13px] text-gray-700 font-medium">
                  <div className="grid grid-cols-[16px_120px_1fr] items-center gap-2">
                    <div className="bg-[#ffecb3] w-4 h-4 rounded-full flex items-center justify-center"><div className="w-1.5 h-[1.5px] bg-[#d99723]"></div></div>
                    <span>Seat</span>
                    <span>Chargeable</span>
                  </div>
                  <div className="grid grid-cols-[16px_120px_1fr] items-center gap-2">
                    <div className="bg-[#ffecb3] w-4 h-4 rounded-full flex items-center justify-center"><div className="w-1.5 h-[1.5px] bg-[#d99723]"></div></div>
                    <span>Meal</span>
                    <span>Chargeable</span>
                  </div>
                  <div className="grid grid-cols-[16px_120px_1fr] items-center gap-2">
                    <div className="bg-[#ffecb3] w-4 h-4 rounded-full flex items-center justify-center"><div className="w-1.5 h-[1.5px] bg-[#d99723]"></div></div>
                    <span>Change Fee</span>
                    <span>£30 onwards</span>
                  </div>
                  <div className="grid grid-cols-[16px_120px_1fr] items-center gap-2">
                    <div className="bg-[#ffecb3] w-4 h-4 rounded-full flex items-center justify-center"><div className="w-1.5 h-[1.5px] bg-[#d99723]"></div></div>
                    <span>Cancellation Fee</span>
                    <span>£45 onwards</span>
                  </div>
                  <div className="grid grid-cols-[16px_120px_1fr] items-center gap-2">
                    <div className="bg-[#ffecb3] w-4 h-4 rounded-full flex items-center justify-center"><div className="w-1.5 h-[1.5px] bg-[#d99723]"></div></div>
                    <span>Check-in baggage</span>
                    <span>15 kg / 1 piece(s)</span>
                  </div>
                </div>
              </div>

              {/* Essential Bundle Card */}
              <div 
                className={`border rounded-xl p-4 cursor-pointer transition-all ${bundle === 'Essential' ? 'border-[#2cb1e8] bg-[#f0f9ff]/50' : 'border-gray-200 bg-white'}`}
                onClick={() => setBundle('Essential')}
              >
                <div className="flex justify-between items-start mb-5">
                  <span className="font-bold text-[15px] text-gray-900">Essential Flex</span>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end leading-none">
                      <span className="font-bold text-[15px] text-gray-900">£82.11 <span className="text-[11px] text-gray-500 font-normal">/ adult</span></span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${bundle === 'Essential' ? 'border-[#2cb1e8]' : 'border-gray-300'}`}>
                      {bundle === 'Essential' && <div className="w-2.5 h-2.5 bg-[#2cb1e8] rounded-full"></div>}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-[13px] text-gray-700 font-medium">
                  <div className="grid grid-cols-[16px_120px_1fr] items-center gap-2">
                    <div className="bg-[#e2f5e8] w-4 h-4 rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5 text-[#1e8b42]" /></div>
                    <span>Seat</span>
                    <span className="text-[#1e8b42]">Included</span>
                  </div>
                  <div className="grid grid-cols-[16px_120px_1fr] items-center gap-2">
                    <div className="bg-[#e2f5e8] w-4 h-4 rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5 text-[#1e8b42]" /></div>
                    <span>Meal</span>
                    <span className="text-[#1e8b42]">Included</span>
                  </div>
                  <div className="grid grid-cols-[16px_120px_1fr] items-center gap-2">
                    <div className="bg-[#e2f5e8] w-4 h-4 rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5 text-[#1e8b42]" /></div>
                    <span>Change Fee</span>
                    <span className="text-[#1e8b42]">Free</span>
                  </div>
                  <div className="grid grid-cols-[16px_120px_1fr] items-center gap-2">
                    <div className="bg-[#ffecb3] w-4 h-4 rounded-full flex items-center justify-center"><div className="w-1.5 h-[1.5px] bg-[#d99723]"></div></div>
                    <span>Cancellation Fee</span>
                    <span>£15 onwards</span>
                  </div>
                  <div className="grid grid-cols-[16px_120px_1fr] items-center gap-2">
                    <div className="bg-[#ffecb3] w-4 h-4 rounded-full flex items-center justify-center"><div className="w-1.5 h-[1.5px] bg-[#d99723]"></div></div>
                    <span>Check-in baggage</span>
                    <span>20 kg / 1 piece(s)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="border border-gray-200 rounded p-4 flex justify-between items-center cursor-pointer bg-white">
          <span className="font-bold text-sm text-gray-800">Please read this Important Information</span>
          <span className="text-gray-400">▼</span>
        </div>

        {/* T&C */}
        <label className="flex items-start gap-3 mt-4">
          <input type="checkbox" checked={acceptedTerms} onChange={e => setAcceptedTerms(e.target.checked)} className="mt-1 w-4 h-4" />
          <span className="text-sm text-gray-700 leading-tight">
            I accept that the information I provided is accurate and that I have read and agree to the important information outlined above, Terms & Conditions and Privacy Policy.
          </span>
        </label>
      </div>

      {/* RIGHT COLUMN: Sidebar */}
      <aside className="w-full lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-28 h-max">
        
        {/* Fare Summary */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-white text-[#002f5e] font-bold p-4 flex items-center gap-3 border-b border-gray-100">
            <div className="bg-[#e6f5ff] p-1.5 rounded-md">
              <Plane className="w-5 h-5 text-[#2cb1e8]" />
            </div>
            <span className="text-[17px]">Fare Summary</span>
          </div>
          <div className="p-5 space-y-5 bg-[#fafbfc]">
            <div className="flex justify-between items-start text-sm">
              <div className="space-y-1">
                <p className="font-bold text-gray-800 text-[13px]">Fare for {passengersCount} Adult(s)</p>
                <p className="text-[11px] text-gray-500">{passengersCount}x Adult (Ticket, Fuel, Fees and Tax)</p>
              </div>
              <p className="font-bold text-gray-800 text-[13px]">£{(flight.price * passengersCount).toFixed(2)}</p>
            </div>
            {bundle !== 'Basic' && (
              <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                <p className="text-gray-600 font-medium text-[13px]">{bundle} Bundle</p>
                <p className="text-gray-800 font-bold text-[13px]">£{((bundle === 'Essential' ? 82.11 : 109.48) * passengersCount).toFixed(2)}</p>
              </div>
            )}
            {addBaggage && (
              <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                <p className="text-gray-600 font-medium text-[13px]">Check-in Baggage</p>
                <p className="text-gray-800 font-bold text-[13px]">£{(89.99 * passengersCount).toFixed(2)}</p>
              </div>
            )}
            <div className="border-t border-gray-200 pt-4 flex justify-between items-end mt-2">
              <p className="text-[15px] font-bold text-gray-800">Total Fare</p>
              <p className="text-2xl font-bold text-gray-900 leading-none">£{totalFare.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Add Baggage Box */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-[#f2faf5] border-b border-gray-100 p-3 flex items-center gap-3">
            <div className="bg-[#28a745] rounded-full p-1.5">
              <Luggage className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-[13px] text-gray-800">Add your check-in baggage</h3>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-center mb-5 bg-[#f5f7fa] p-4 rounded-lg border border-gray-100">
              <Luggage className="w-10 h-10 text-[#2cb1e8] mr-4 opacity-50" />
              <div className="text-center">
                <p className="text-[11px] text-gray-600 leading-tight">Upto 60kg, 2 bags, 1pc each</p>
                <p className="text-[11px] text-gray-600 leading-tight">(Up to 23kg per bag)</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#28a745] font-bold text-lg">+£89.99</span>
              <Button 
                size="sm" 
                className={`text-[11px] font-bold h-9 rounded-full px-5 ${addBaggage ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#2cb1e8] hover:bg-[#209dd4] text-white'}`}
                onClick={() => setAddBaggage(!addBaggage)}
              >
                {addBaggage ? "REMOVE BAGGAGE" : "ADD BAGGAGE FOR ALL"}
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Continue Button */}
        <Button 
          className="hidden md:flex w-full bg-[#ff6000] hover:bg-[#e05500] text-white font-bold h-14 text-[16px] shadow-md rounded-lg items-center justify-center gap-3 transition-colors mt-6"
          onClick={handleCheckout}
          disabled={isSubmitting}
        >
          {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><Plane className="w-5 h-5 -rotate-45" /> Continue Booking <span className="text-xl leading-none">→</span></>}
        </Button>
        
        {/* Mobile Sticky Continue Button (Matches Screenshot) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <Button 
            className="w-full bg-[#003b95] hover:bg-[#002f7a] text-white font-bold text-[16px] h-[52px] rounded-full flex items-center justify-center gap-2"
            onClick={handleCheckout}
            disabled={isSubmitting}
          >
            {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : "Proceed to book"}
          </Button>
        </div>

      </aside>
    </div>
  )
}
