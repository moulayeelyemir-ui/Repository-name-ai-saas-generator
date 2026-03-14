import PanzeMenu from "@/components/panze-menu"
import DashboardTopbar from "@/components/dashboard-topbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="flex min-h-screen">
        <PanzeMenu />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopbar />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </main>
  )
}