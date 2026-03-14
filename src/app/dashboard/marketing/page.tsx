import DashboardPageHeader from "@/components/dashboard-page-header"

export default function MarketingPage() {
  const items = [
    "Product Hunt Launch Strategy",
    "Twitter / X Content Plan",
    "Reddit Growth Posts",
    "SEO Article Ideas",
    "Email Campaign Structure",
    "Referral Program Setup",
  ]

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">
      <DashboardPageHeader
        title="Marketing"
        description="Organize your launch and growth strategy in one place."
        primaryLabel="Back to Dashboard"
        primaryHref="/dashboard"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h2 className="text-lg font-semibold">{item}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              A practical marketing block to help grow your SaaS and reach more users.
            </p>
            <button className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black">
              Open plan
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}