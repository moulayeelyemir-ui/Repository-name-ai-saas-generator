"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.")
        setLoading(false)
        return
      }

      setMessage("Compte créé avec succès.")
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
    } catch (err) {
      setError("Erreur de connexion au serveur.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="hidden lg:flex flex-col justify-between border-r border-white/10 bg-zinc-900 p-10">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight">
              YourBrand
            </Link>
          </div>

          <div className="max-w-xl">
            <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              New generation platform
            </span>

            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              Create your account and start building faster
            </h1>

            <p className="mt-4 text-base leading-7 text-zinc-400">
              Join thousands of users using our platform to launch products,
              manage workflows, and scale their business with confidence.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-medium text-white">Fast setup</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Get started in minutes with a clean onboarding experience.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-medium text-white">Secure by default</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Your account and data are protected with modern best practices.
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-zinc-500">
            © 2026 YourBrand. All rights reserved.
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur md:p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold">Create an account</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Enter your details below to get started
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="Moulaye"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm outline-none placeholder:text-zinc-500 focus:border-white/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Ely"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm outline-none placeholder:text-zinc-500 focus:border-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm outline-none placeholder:text-zinc-500 focus:border-white/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm outline-none placeholder:text-zinc-500 focus:border-white/20"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              {message && (
                <p className="text-sm text-green-400">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-xl bg-white text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}