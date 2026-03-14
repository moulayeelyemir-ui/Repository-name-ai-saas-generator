import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

type TokenPayload = {
  id: string
  firstName: string
  lastName: string
  email: string
}

export default async function DashboardTopbar() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  let user: TokenPayload | null = null

  if (token) {
    try {
      user = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as TokenPayload
    } catch {
      user = null
    }
  }

  let dbUser: {
    firstName: string
    lastName: string
    email: string
    plan: string
  } | null = null

  if (user) {
    dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        plan: true,
      },
    })
  }

  return (
    <header className="border-b border-white/10 bg-zinc-950 px-6 py-4 text-white">
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
              {dbUser
                ? `${dbUser.firstName} ${dbUser.lastName}`
                : "Guest User"}
            </p>
            <p className="text-sm text-zinc-500">
              {dbUser ? `${dbUser.email} • ${dbUser.plan}` : "No active session"}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-black">
            {dbUser
              ? `${dbUser.firstName.charAt(0)}${dbUser.lastName.charAt(0)}`
              : "GU"}
          </div>
        </div>
      </div>
    </header>
  )
}