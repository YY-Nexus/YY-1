"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import AppHeader from "@/components/app-header"
import AppBackgroundLayout from "@/components/app-background-layout"

export default function WarehouseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const sidebarItems = [
    { label: "仓库管理", href: "/warehouse" },
    { label: "出货仓管理", href: "/warehouse/outbound" },
    { label: "供应商管理", href: "/warehouse/suppliers" },
    { label: "采购进货", href: "/warehouse/purchase" },
    { label: "采购退货", href: "/warehouse/returns" },
    { label: "库存调拨", href: "/warehouse/transfer" },
    { label: "报损单", href: "/warehouse/damage" },
    { label: "领用单", href: "/warehouse/requisition" },
    { label: "库存盘点", href: "/warehouse/inventory" },
    { label: "实时库存", href: "/warehouse/real-time" },
    { label: "客存管理", href: "/warehouse/customer-storage" },
    { label: "库存不足是否出货", href: "/warehouse/stock-rules" },
  ]

  const isActive = (path: string) => {
    if (path === "/warehouse" && pathname === "/warehouse") {
      return true
    }
    return pathname.startsWith(path) && path !== "/warehouse"
  }

  return (
    <AppBackgroundLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <AppHeader activeNav="warehouse" />

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-48 border-r border-gray-200 bg-white">
            <div className="p-4 font-medium text-gray-700">仓库</div>
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
