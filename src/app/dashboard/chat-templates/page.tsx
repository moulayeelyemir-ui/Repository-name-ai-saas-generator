import DashboardPageHeader from "@/components/dashboard-page-header"

export default function ChatTemplatesPage() {
  const templates = [
    "Customer Support Assistant",
    "Sales Qualification Bot",
    "Product Onboarding Chat",
    "FAQ Assistant",
    "AI Writing Helper",
    "Lead Capture Chat Flow",
  ]

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">
      <DashboardPageHeader
        title="Chat Templates"
        description="Prebuilt conversation flows and chat use cases for AI products."
        primaryLabel="Create New"
        primaryHref="/dashboard/generate"
        secondaryLabel="Back to Dashboard"
        secondaryHref="/dashboard"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h2 className="text-lg font-semibold">{item}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              A reusable chat template to speed up the creation of AI-driven user experiences.
            </p>
            <button className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black">
              Open template
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}