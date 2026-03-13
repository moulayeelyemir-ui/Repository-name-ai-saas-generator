import { NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (error) {
    console.error("STRIPE_WEBHOOK_SIGNATURE_ERROR:", error)
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    )
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      const plan = session.metadata?.plan ?? "Pro"

      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { plan },
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("STRIPE_WEBHOOK_ERROR:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}