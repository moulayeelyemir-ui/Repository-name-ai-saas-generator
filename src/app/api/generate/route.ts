import { NextResponse } from "next/server"
import OpenAI from "openai"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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

function mockDesign(prompt: string) {
  return `
<div class="min-h-screen bg-white p-10">
  <section class="mx-auto max-w-6xl">
    <div class="mb-10 text-center">
      <h1 class="text-4xl font-bold text-gray-900">Pricing Plans</h1>
      <p class="mt-3 text-gray-600">Mock result for: ${prompt}</p>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <div class="rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h2 class="text-2xl font-semibold">Free</h2>
        <p class="mt-2 text-4xl font-bold">$0</p>
        <ul class="mt-6 space-y-2 text-gray-600">
          <li>1 project</li>
          <li>Email support</li>
          <li>Basic features</li>
        </ul>
      </div>

      <div class="rounded-2xl border-2 border-black p-8 shadow-md">
        <h2 class="text-2xl font-semibold">Pro</h2>
        <p class="mt-2 text-4xl font-bold">$29</p>
        <ul class="mt-6 space-y-2 text-gray-600">
          <li>10 projects</li>
          <li>Priority support</li>
          <li>Advanced analytics</li>
        </ul>
      </div>

      <div class="rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h2 class="text-2xl font-semibold">Enterprise</h2>
        <p class="mt-2 text-4xl font-bold">$99</p>
        <ul class="mt-6 space-y-2 text-gray-600">
          <li>Unlimited projects</li>
          <li>Dedicated support</li>
          <li>Custom integrations</li>
        </ul>
      </div>
    </div>
  </section>
</div>
`
}

export async function POST(req: Request) {
  try {
    const user = await getUserFromCookie()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        plan: true,
      },
    })

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const generationsCount = await prisma.design.count({
      where: {
        userId: user.id,
      },
    })

    const freeLimit = 10
    const isFreePlan = dbUser.plan === "Free"

    if (isFreePlan && generationsCount >= freeLimit) {
      return NextResponse.json(
        {
          error: "Free plan limit reached. Upgrade to Pro for unlimited generations.",
        },
        { status: 403 }
      )
    }

    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt required" },
        { status: 400 }
      )
    }

    let result = ""
    let source = "mock"

    if (!process.env.OPENAI_API_KEY) {
      result = mockDesign(prompt)
      source = "mock-no-key"
    } else {
      try {
        const response = await openai.responses.create({
          model: "gpt-5-nano",
          input: `Generate only clean modern Tailwind CSS UI code for: ${prompt}`,
        })

        result =
          response.output_text && response.output_text.trim().length > 0
            ? response.output_text
            : mockDesign(prompt)

        source = "openai"
      } catch (error) {
        console.error("OPENAI_FALLBACK:", error)
        result = mockDesign(prompt)
        source = "mock-fallback"
      }
    }

    await prisma.design.create({
      data: {
        prompt,
        result,
        source,
        userId: user.id,
      },
    })

    return NextResponse.json({
      result,
      source,
      usage: {
        current: generationsCount + 1,
        limit: isFreePlan ? freeLimit : null,
        plan: dbUser.plan,
      },
    })
  } catch (error) {
    console.error("GENERATE_ERROR:", error)
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    )
  }
}