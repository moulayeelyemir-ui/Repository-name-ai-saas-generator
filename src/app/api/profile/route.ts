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

export async function GET() {
  try {
    const userFromToken = await getUserFromCookie()

    if (!userFromToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userFromToken.id },
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

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error("PROFILE_GET_ERROR:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const userFromToken = await getUserFromCookie()

    if (!userFromToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, email } = body

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: userFromToken.id,
        },
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé." },
        { status: 409 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: userFromToken.id },
      data: {
        firstName,
        lastName,
        email,
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
        message: "Profil mis à jour avec succès.",
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
    console.error("PROFILE_UPDATE_ERROR:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}