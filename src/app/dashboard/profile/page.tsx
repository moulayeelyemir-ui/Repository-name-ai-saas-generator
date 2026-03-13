"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type UserProfile = {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  updatedAt: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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
          setError(data.error || "Erreur lors du chargement du profil.")
          return
        }

        setUser(data.user)
        setFirstName(data.user.firstName)
        setLastName(data.user.lastName)
        setEmail(data.user.email)
      } catch {
        setError("Erreur de connexion au serveur.")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setMessage("")
    setError("")

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Erreur lors de la mise à jour.")
        return
      }

      setUser(data.user)
      setMessage("Profil mis à jour avec succès.")
    } catch {
      setError("Erreur de connexion au serveur.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 p-8 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            Chargement du profil...
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="mt-2 text-zinc-400">
              Manage your personal information
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
          >
            Back to dashboard
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">User info</h2>

            <div className="mt-6 space-y-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800 text-2xl font-bold">
                {firstName?.charAt(0)}
                {lastName?.charAt(0)}
              </div>

              <div>
                <p className="text-sm text-zinc-400">Email</p>
                <p className="mt-1 break-all text-lg font-semibold">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-400">Created at</p>
                <p className="mt-1 text-lg font-semibold">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-400">Updated at</p>
                <p className="mt-1 text-lg font-semibold">
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold">Update profile</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Change your first name, last name and email
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    First name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm outline-none focus:border-white/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm outline-none focus:border-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm outline-none focus:border-white/20"
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}
              {message && <p className="text-sm text-green-400">{message}</p>}

              <button
                type="submit"
                disabled={saving}
                className="h-11 rounded-xl bg-white px-6 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}