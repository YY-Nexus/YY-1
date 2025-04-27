"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import AppHeader from "@/components/app-header"
import AppBackgroundLayout from "@/components/app-background-layout"

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const sidebarItems = [
    { label: "员工列表", href: "/employees" },
    { label: "艺人列表", href: "/employees/artists" },
  ]

  const isActive = (path: string) => {
    if (path === "/employees" && pathname === "/employees") {
      return true
    }
    return pathname.startsWith(path) && path !== "/employees"
  }

  return (
    <AppBackgroundLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <AppHeader activeNav="employees" />

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-48 border-r border-gray-200 bg-white">
            <div className="p-4 font-medium text-gray-700">员工</div>
            <nav className="space-y-0.5">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`block px-4 py-2 text-sm ${
                    isActive(item.href) ? "bg-blue-50 text-blue-500" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-[#f5f5f5]">{children}</main>
        </div>
      </div>
    </AppBackgroundLayout>
  )
}
