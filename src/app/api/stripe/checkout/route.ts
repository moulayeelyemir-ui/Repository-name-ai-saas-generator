import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

type TokenPayload = {
  id: string
  firstName: string
  lastName: string
  email: string
}

async function getUserFromCookie(): Promise<TokenPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  if (!token) return null

  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload
  } catch {
    return null
  }
}

export async function POST() {
  try {
    const user = await getUserFromCookie()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        plan: true,
      },
    })

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (dbUser.plan === "Pro") {
      return NextResponse.json(
        { error: "You are already on Pro." },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: dbUser.email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_PRO_MONTHLY as string,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/pricing?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/pricing?canceled=1`,
      metadata: {
        userId: dbUser.id,
        plan: "Pro",
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("STRIPE_CHECKOUT_ERROR:", error)
    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 }
    )
  }
}