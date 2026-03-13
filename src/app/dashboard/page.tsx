import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

type TokenPayload = {
  id: string
  firstName: string
  lastName: string
  email: string
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  if (!token) {
    redirect("/login")
  }

  let user: TokenPayload

  try {
    user = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload
  } catch {
    redirect("/login")
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      plan: true,
      createdAt: true,
      designs: {
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      },
    },
  })

  if (!dbUser) {
    redirect("/login")
  }

  const totalGenerations = await prisma.design.count({
    where: {
      userId: user.id,
    },
  })

  const freeLimit = 10
  const remaining =
    dbUser.plan === "Free" ? Math.max(freeLimit - totalGenerations, 0) : null

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-2 text-zinc-400">
              Welcome back, {dbUser.firstName}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/dashboard/generate"
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
            >
              AI Generator
            </a>

            <a
              href="/dashboard/history"
              className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white"
            >
              History
            </a>

            <a
              href="/dashboard/profile"
              className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white"
            >
              Profile
            </a>
            <a
  href="/dashboard/pricing"
  className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white"
>
  Pricing
            </a>

            <form action="/api/logout" method="POST">
              <button
                type="submit"
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-400">Plan</p>
            <p className="mt-2 text-2xl font-bold">{dbUser.plan}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-400">Total generations</p>
            <p className="mt-2 text-2xl font-bold">{totalGenerations}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-400">Remaining</p>
            <p className="mt-2 text-2xl font-bold">
              {remaining === null ? "Unlimited" : remaining}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-400">Member since</p>
            <p className="mt-2 text-2xl font-bold">
              {new Date(dbUser.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Account</h2>
            <div className="mt-4 space-y-3 text-zinc-300">
              <p>
                <span className="text-zinc-500">Name:</span> {dbUser.firstName}{" "}
                {dbUser.lastName}
              </p>
              <p>
                <span className="text-zinc-500">Email:</span> {dbUser.email}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Recent generations</h2>

            {dbUser.designs.length === 0 ? (
              <p className="mt-4 text-zinc-400">No generations yet.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {dbUser.designs.map((design) => (
                  <div
                    key={design.id}
                    className="rounded-2xl bg-zinc-900 p-4"
                  >
                    <p className="line-clamp-2 text-sm text-zinc-300">
                      {design.prompt}
                    </p>
                    <p className="mt-2 text-xs text-zinc-500">
                      {new Date(design.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}