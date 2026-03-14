"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  User,
  Layers3,
  MessagesSquare,
  Sparkles,
  Mic2,
  BookText,
  CreditCard,
  Megaphone,
  MenuSquare,
} from "lucide-react"

const items = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Personal", href: "/dashboard/profile", icon: User },
  {
    label: "Use Cases Templates",
    href: "/dashboard/use-cases-templates",
    icon: Layers3,
  },
  {
    label: "Chat Templates",
    href: "/dashboard/chat-templates",
    icon: MessagesSquare,
  },
  { label: "AI Features", href: "/dashboard/generate", icon: Sparkles },
  { label: "AI Voices", href: "/dashboard/ai-voices", icon: Mic2 },
  { label: "Blogs", href: "/dashboard/blogs", icon: BookText },
  { label: "Subscriptions", href: "/dashboard/pricing", icon: CreditCard },
  { label: "Marketing", href: "/dashboard/marketing", icon: Megaphone },
  { label: "Menus", href: "/dashboard/menus", icon: MenuSquare },
]

export default function PanzeMenu() {
  const pathname = usePathname()

  return (
    <aside className="h-screen w-[260px] shrink-0 overflow-y-auto border-r border-zinc-200 bg-white p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-black">AI SaaS</h1>
        <p className="text-xs text-zinc-500">generator</p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}