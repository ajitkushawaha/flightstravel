import { NextResponse } from "next/server"
import crypto from "crypto"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = body

    if (!razorpay_order_id || !razorpay_payment_id || !bookingId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Verify signature if we have a real secret
    const secret = (process.env.RAZORPAY_SECRET_KEY || process.env.RAZORPAY_KEY_SECRET)?.trim()

    if (secret && razorpay_signature) {
      const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex")

      if (generated_signature !== razorpay_signature) {
        return NextResponse.json(
          { success: false, error: "Invalid signature" },
          { status: 400 }
        )
      }
    } else {
      console.warn("Skipping Razorpay signature verification due to missing secret or signature")
    }

    // Generate a random confirmation code
    const confirmationCode = "CONF-" + Math.random().toString(36).substring(2, 10).toUpperCase()

    // Update booking status in the database
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "confirmed",
        paymentStatus: "paid",
        transactionId: razorpay_payment_id,
        paymentMethod: "RAZORPAY",
        confirmationCode: confirmationCode,
      },
    })

    return NextResponse.json({ 
      success: true, 
      confirmationCode: booking.confirmationCode,
      booking
    })
    
  } catch (error: any) {
    console.error("Razorpay verification error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to verify payment" },
      { status: 500 }
    )
  }
}
