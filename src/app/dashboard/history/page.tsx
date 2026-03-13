import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

type TokenPayload = {
  id: string
  firstName: string
  lastName: string
  email: string
}

export default async function HistoryPage() {
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

  const designs = await prisma.design.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Design History</h1>
            <p className="mt-2 text-zinc-400">
              All your AI generations in one place
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/generate"
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
            >
              New Generation
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white"
            >
              Back to dashboard
            </Link>
          </div>
        </div>

        {designs.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-zinc-400">No generations yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {designs.map((design) => (
              <div
                key={design.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">Prompt</h2>
                    <p className="mt-1 text-zinc-300">{design.prompt}</p>
                  </div>

                  <div className="text-right text-sm text-zinc-400">
                    <p>{new Date(design.createdAt).toLocaleString()}</p>
                    <p className="mt-1">Source: {design.source}</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-zinc-900 p-4">
                  <div
                    className="overflow-auto"
                    dangerouslySetInnerHTML={{ __html: design.result }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}