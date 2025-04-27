"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import AppHeader from "@/components/app-header"
import AppBackgroundLayout from "@/components/app-background-layout"

export default function BillsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const sidebarItems = [
    { label: "账单制作", href: "/bills" },
    { label: "账单查看", href: "/bills/view" },
    { label: "账单打印机设置", href: "/bills/printer-settings" },
  ]

  const isActive = (path: string) => {
    if (path === "/bills" && pathname === "/bills") {
      return true
    }
    return pathname.startsWith(path) && path !== "/bills"
  }

  return (
    <AppBackgroundLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <AppHeader activeNav="bills" />

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-48 border-r border-gray-200 bg-white">
            <div className="p-4 font-medium text-gray-700">账单</div>
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
