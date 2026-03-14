import DashboardPageHeader from "@/components/dashboard-page-header"

export default function MenusPage() {
  const menuTypes = [
    "Sidebar Navigation",
    "Top Navigation",
    "Dropdown Menu",
    "Mobile Menu",
    "Profile Menu",
    "Settings Menu",
  ]

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">
      <DashboardPageHeader
        title="Menus"
        description="Navigation ideas and menu structures for modern web products."
        primaryLabel="Back to Dashboard"
        primaryHref="/dashboard"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {menuTypes.map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h2 className="text-lg font-semibold">{item}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              A reusable menu pattern to improve product navigation and user experience.
            </p>
            <button className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black">
              View structure
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}