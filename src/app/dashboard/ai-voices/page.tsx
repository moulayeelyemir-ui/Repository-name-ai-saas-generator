import DashboardPageHeader from "@/components/dashboard-page-header"

export default function AIVoicesPage() {
  const voices = [
    { name: "Professional", tone: "Clear, formal and reliable communication." },
    { name: "Friendly", tone: "Warm, simple and approachable style." },
    { name: "Startup", tone: "Dynamic, modern and product-focused." },
    { name: "Creative", tone: "Expressive, imaginative and engaging." },
    { name: "Minimal", tone: "Short, direct and clean messaging." },
    { name: "Confident", tone: "Bold, persuasive and conversion-oriented." },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">
      <DashboardPageHeader
        title="AI Voices"
        description="Select the tone and communication style for your generated content."
        primaryLabel="Try in Generator"
        primaryHref="/dashboard/generate"
        secondaryLabel="Back to Dashboard"
        secondaryHref="/dashboard"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {voices.map((voice) => (
          <div
            key={voice.name}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h2 className="text-xl font-semibold">{voice.name}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {voice.tone}
            </p>
            <button className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black">
              Select voice
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}