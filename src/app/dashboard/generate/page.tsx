"use client"

import { useState } from "react"

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [usageInfo, setUsageInfo] = useState<{
    current: number
    limit: number | null
    plan: string
  } | null>(null)

  async function handleGenerate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError("")
    setResult("")

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Generation failed.")
        return
      }

      setResult(data.result)

      if (data.usage) {
        setUsageInfo(data.usage)
      }
    } catch {
      setError("Erreur de connexion au serveur.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">AI Design Generator</h1>
            <p className="mt-2 text-zinc-400">
              Generate UI with AI from a simple prompt
            </p>
          </div>

          {usageInfo && (
            <div className="rounded-2xl bg-zinc-900 px-4 py-3 text-sm">
              <p className="font-medium">Plan: {usageInfo.plan}</p>
              <p className="text-zinc-400">
                Usage: {usageInfo.current}
                {usageInfo.limit ? ` / ${usageInfo.limit}` : " / Unlimited"}
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleGenerate} className="mt-6 space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the UI you want..."
            className="min-h-[160px] w-full rounded-xl bg-zinc-900 p-4 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-white px-6 py-2 text-black disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-400">{error}</p>}

        {result && (
          <div className="mt-6 rounded-xl bg-zinc-900 p-4 overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        )}
      </div>
    </main>
  )
}