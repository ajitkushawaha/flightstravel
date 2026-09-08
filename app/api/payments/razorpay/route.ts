import { NextResponse } from "next/server"
import Razorpay from "razorpay"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { amount, bookingId, currency = "INR" } = body

    if (!amount || !bookingId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Initialize razorpay
    // We use a dummy key for testing if the env vars are missing
    const razorpay = new Razorpay({
      key_id: (process.env.RAZORPAY_KEY_ID || "rzp_test_dummy").trim(),
      key_secret: (process.env.RAZORPAY_SECRET_KEY || process.env.RAZORPAY_KEY_SECRET || "dummy_secret").trim(),
    })

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise for INR)
      currency,
      receipt: `receipt_${bookingId}`,
      payment_capture: 1
    }

    // Since we are likely using a dummy key locally, Razorpay SDK will throw an error.
    // Let's wrap this in a mock response if we don't have real keys.
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === "rzp_test_dummy") {
      console.warn("Using mock Razorpay order because keys are missing")
      return NextResponse.json({
        success: true,
        order: {
          id: `order_mock_${Date.now()}`,
          amount: options.amount,
          currency: options.currency,
          receipt: options.receipt
        }
      })
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({ success: true, order })
  } catch (error: any) {
    console.error("Razorpay order creation error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 500 }
    )
  }
}
