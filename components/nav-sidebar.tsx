"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, AlertTriangle, BarChart3, BookOpen, Gauge, Plane } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Sensors", href: "/sensors", icon: Activity },
  { name: "Predictions", href: "/predictions", icon: Gauge },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  { name: "Runbooks", href: "/runbooks", icon: BookOpen },
  { name: "Aircraft", href: "/aircraft", icon: Plane },
]

export function NavSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Plane className="h-6 w-6 text-sidebar-primary" />
        <span className="ml-3 text-lg font-semibold text-sidebar-foreground">AeroPredict</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-sidebar-accent p-3">
          <p className="text-xs font-medium text-sidebar-accent-foreground">System Status</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-sidebar-foreground">All Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  )
}
