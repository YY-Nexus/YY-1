"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import AppHeader from "@/components/app-header"
import AppBackgroundLayout from "@/components/app-background-layout"

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const sidebarItems = [
    { label: "商品管理", href: "/products" },
    { label: "商品新餐列表", href: "/products/new-menu" },
    { label: "开房餐餐名称", href: "/products/room-service-names" },
    { label: "开房餐餐价格", href: "/products/room-service-prices" },
    { label: "计时开房列表", href: "/products/hourly-room-list" },
    { label: "不满一小时按小时算", href: "/products/minimum-hour" },
    { label: "商品配送", href: "/products/delivery" },
    { label: "开房小吃", href: "/products/room-snacks" },
    { label: "价格策略", href: "/products/pricing-strategy" },
    { label: "积分兑换", href: "/products/points-exchange" },
    { label: "自助大厅商品营业型设置", href: "/products/self-service-settings" },
    { label: "商品免单规则设置", href: "/products/free-rules" },
    { label: "花雪厅", href: "/products/snow-hall" },
    { label: "自助下单必点商品设置", href: "/products/required-items" },
  ]

  const isActive = (path: string) => {
    if (path === "/products" && pathname === "/products") {
      return true
    }
    return pathname.startsWith(path) && path !== "/products"
  }

  return (
    <AppBackgroundLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <AppHeader activeNav="products" />

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-48 border-r border-gray-200 bg-white">
            <div className="p-4 font-medium text-gray-700">商品</div>
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
