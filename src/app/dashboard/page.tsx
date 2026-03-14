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

function MiniChart() {
  return (
    <svg
      viewBox="0 0 300 120"
      className="h-40 w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 90 C40 80, 45 40, 75 55 C105 70, 110 95, 140 75 C170 55, 180 35, 205 50 C230 65, 245 95, 290 30"
        stroke="currentColor"
        strokeWidth="3"
        className="text-white"
      />
      <circle cx="10" cy="90" r="4" className="fill-white" />
      <circle cx="75" cy="55" r="4" className="fill-white" />
      <circle cx="140" cy="75" r="4" className="fill-white" />
      <circle cx="205" cy="50" r="4" className="fill-white" />
      <circle cx="290" cy="30" r="4" className="fill-white" />
    </svg>
  )
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
        take: 5,
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

  const recentCount = dbUser.designs.length
  const thisMonthRevenue = dbUser.plan === "Pro" ? "$29" : "$0"
  const completionRate =
    dbUser.plan === "Pro"
      ? "Unlimited access"
      : `${remaining ?? 0} generations left`

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">
      {/* Top header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-zinc-400">
            Welcome back, {dbUser.firstName} {dbUser.lastName}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
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

      {/* Search / user bar */}
      <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-xl">
            <div className="flex h-12 items-center rounded-2xl border border-white/10 bg-zinc-900 px-4">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-zinc-400">Current account</p>
              <p className="font-semibold">
                {dbUser.firstName} {dbUser.lastName}
              </p>
              <p className="text-sm text-zinc-500">{dbUser.email}</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-black">
              {dbUser.firstName.charAt(0)}
              {dbUser.lastName.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-zinc-400">Plan</p>
          <p className="mt-3 text-3xl font-bold">{dbUser.plan}</p>
          <p className="mt-2 text-sm text-zinc-500">Current subscription tier</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-zinc-400">Total generations</p>
          <p className="mt-3 text-3xl font-bold">{totalGenerations}</p>
          <p className="mt-2 text-sm text-zinc-500">All AI generations created</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-zinc-400">Remaining</p>
          <p className="mt-3 text-3xl font-bold">
            {remaining === null ? "Unlimited" : remaining}
          </p>
          <p className="mt-2 text-sm text-zinc-500">{completionRate}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-zinc-400">Member since</p>
          <p className="mt-3 text-3xl font-bold">
            {new Date(dbUser.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-2 text-sm text-zinc-500">Account creation date</p>
        </div>
      </div>

      {/* Main sections */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Left */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Analytics</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Overview of your platform activity
                </p>
              </div>

              <div className="rounded-xl bg-zinc-900 px-3 py-2 text-sm text-zinc-400">
                Last 30 days
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-zinc-900 p-4">
              <MiniChart />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-400">Recent count</p>
                <p className="mt-2 text-2xl font-bold">{recentCount}</p>
              </div>

              <div className="rounded-2xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-400">Current plan</p>
                <p className="mt-2 text-2xl font-bold">{dbUser.plan}</p>
              </div>

              <div className="rounded-2xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-400">Value</p>
                <p className="mt-2 text-2xl font-bold">{thisMonthRevenue}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Account</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Basic information about your account
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-400">Full name</p>
                <p className="mt-2 text-lg font-semibold">
                  {dbUser.firstName} {dbUser.lastName}
                </p>
              </div>

              <div className="rounded-2xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-400">Email</p>
                <p className="mt-2 break-all text-lg font-semibold">
                  {dbUser.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Recent generations</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Your latest AI prompts and outputs
            </p>

            {dbUser.designs.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-zinc-900 p-6 text-zinc-500">
                No generations yet.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {dbUser.designs.map((design) => (
                  <div
                    key={design.id}
                    className="rounded-2xl bg-zinc-900 p-4"
                  >
                    <p className="line-clamp-2 font-medium">{design.prompt}</p>
                    <p className="mt-2 text-sm text-zinc-500">
                      {new Date(design.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Quick actions</h2>

            <div className="mt-5 grid gap-3">
              <a
                href="/dashboard/generate"
                className="rounded-2xl bg-white px-4 py-4 text-center text-sm font-medium text-black"
              >
                Generate a new design
              </a>

              <a
                href="/dashboard/pricing"
                className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4 text-center text-sm font-medium text-white"
              >
                Manage pricing plan
              </a>

              <a
                href="/dashboard/profile"
                className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4 text-center text-sm font-medium text-white"
              >
                Edit profile
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 text-black">
            <h2 className="text-xl font-semibold">Pro upgrade</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Unlock unlimited generations, premium access, and future advanced
              AI features.
            </p>

            <a
              href="/dashboard/pricing"
              className="mt-5 inline-flex rounded-2xl bg-black px-4 py-3 text-sm font-medium text-white"
            >
              Upgrade now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}