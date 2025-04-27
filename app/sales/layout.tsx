"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import AppHeader from "@/components/app-header"
import AppBackgroundLayout from "@/components/app-background-layout"

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const sidebarItems = [
    { label: "订单列表", href: "/sales" },
    { label: "账单列表", href: "/sales/bills" },
    { label: "在线预定", href: "/sales/online-reservation" },
    { label: "支付流水", href: "/sales/payment-flow" },
    { label: "预定列表", href: "/sales/reservation-list" },
  ]

  const isActive = (path: string) => {
    if (path === "/sales" && pathname === "/sales") {
      return true
    }
    return pathname.startsWith(path) && path !== "/sales"
  }

  return (
    <AppBackgroundLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <AppHeader activeNav="sales" />

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-48 border-r border-gray-200 bg-white">
            <div className="p-4 font-medium text-gray-700">销售</div>
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
          <main className="flex-1 bg-[#f5f5f5]">
            {/* Sub Navigation */}
            <div className="bg-white border-b">
              <div className="flex">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`px-4 py-2 text-sm ${
                      isActive(item.href)
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {children}
          </main>
        </div>
      </div>
    </AppBackgroundLayout>
  )
}
