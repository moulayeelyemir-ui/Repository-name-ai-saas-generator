import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

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

export async function POST(req: Request) {
  try {
    const user = await getUserFromCookie()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { plan } = body

    if (!plan) {
      return NextResponse.json(
        { error: "Plan is required." },
        { status: 400 }
      )
    }

    if (!["Free", "Pro"].includes(plan)) {
      return NextResponse.json(
        { error: "Invalid plan." },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        plan,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        plan: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    const newToken = jwt.sign(
      {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    )

    const response = NextResponse.json(
      {
        message: `Plan updated to ${updatedUser.plan}.`,
        user: updatedUser,
      },
      { status: 200 }
    )

    response.cookies.set("auth_token", newToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error("UPGRADE_PLAN_ERROR:", error)
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    )
  }
}