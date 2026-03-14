import DashboardPageHeader from "@/components/dashboard-page-header"

export default function BlogsPage() {
  const posts = [
    {
      title: "How AI speeds up frontend prototyping",
      date: "March 2026",
    },
    {
      title: "Best prompts for generating SaaS interfaces",
      date: "March 2026",
    },
    {
      title: "How to turn AI-generated UI into real products",
      date: "March 2026",
    },
    {
      title: "Why AI tools can help startups launch faster",
      date: "March 2026",
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">
      <DashboardPageHeader
        title="Blogs"
        description="Articles, product notes and useful content for builders."
        primaryLabel="Back to Dashboard"
        primaryHref="/dashboard"
      />

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-sm text-zinc-500">{post.date}</p>
            <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Explore ideas, workflows and strategies to build better AI-powered products.
            </p>
            <button className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black">
              Read article
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}