"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type UserData = {
  id: string
  firstName: string
  lastName: string
  email: string
  plan: string
}

export default function PricingPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [upgrading, setUpgrading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.error || "Erreur lors du chargement.")
          return
        }

        setUser(data.user)
      } catch {
        setError("Erreur de connexion au serveur.")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  async function handleUpgrade() {
    setUpgrading(true)
    setError("")
    setMessage("")
  
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        credentials: "include",
      })
  
      const data = await res.json()
  
      if (!res.ok) {
        setError(data.error || "Checkout failed.")
        return
      }
  
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setError("Erreur de connexion au serveur.")
    } finally {
      setUpgrading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 p-8 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            Loading pricing...
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Pricing</h1>
            <p className="mt-2 text-zinc-400">
              Choose the best plan for your AI SaaS usage
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
          >
            Back to dashboard
          </Link>
        
        </div>

        {error && <p className="text-red-400">{error}</p>}
        {message && <p className="text-green-400">{message}</p>}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm text-zinc-400">Current plan</p>
            <h2 className="mt-2 text-3xl font-bold">{user?.plan}</h2>

            <ul className="mt-6 space-y-3 text-zinc-300">
              <li>• Up to 10 AI generations</li>
              <li>• Basic dashboard</li>
              <li>• Profile management</li>
              <li>• Generation history</li>
            </ul>
          </div>

          <div className="rounded-3xl border-2 border-white bg-zinc-900 p-8">
            <p className="text-sm text-zinc-400">Recommended</p>
            <h2 className="mt-2 text-3xl font-bold">Pro</h2>
            <p className="mt-2 text-zinc-400">$29/month</p>

            <ul className="mt-6 space-y-3 text-zinc-300">
              <li>• Unlimited AI generations</li>
              <li>• Priority access</li>
              <li>• Full design history</li>
              <li>• Future premium features</li>
            </ul>

            {user?.plan === "Pro" ? (
              <button
                disabled
                className="mt-8 w-full rounded-xl bg-white px-4 py-3 font-medium text-black opacity-60"
              >
                Current Plan
              </button>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={upgrading}
                className="mt-8 w-full rounded-xl bg-white px-4 py-3 font-medium text-black disabled:opacity-50"
              >
                {upgrading ? "Upgrading..." : "Upgrade to Pro"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}