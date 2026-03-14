import DashboardPageHeader from "@/components/dashboard-page-header"

export default function UseCasesTemplatesPage() {
  const templates = [
    {
      title: "SaaS Landing Page",
      description:
        "Generate a modern SaaS homepage with hero, features, testimonials and pricing.",
    },
    {
      title: "Startup Homepage",
      description:
        "Create a clean startup website to present your product and value proposition.",
    },
    {
      title: "Pricing Page",
      description:
        "Build a full pricing section with Free, Pro and Enterprise plans.",
    },
    {
      title: "Portfolio Website",
      description:
        "Generate a personal portfolio with projects, skills and contact section.",
    },
    {
      title: "Admin Dashboard",
      description:
        "Create an analytics dashboard with sidebar, cards and activity feed.",
    },
    {
      title: "E-commerce Homepage",
      description:
        "Generate a storefront page with hero banner, categories and product cards.",
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">
      <DashboardPageHeader
        title="Use Cases Templates"
        description="Ready-made template ideas for common product use cases."
        primaryLabel="Go to Generator"
        primaryHref="/dashboard/generate"
        secondaryLabel="Back to Dashboard"
        secondaryHref="/dashboard"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {item.description}
            </p>
            <button className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black">
              Use template
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}