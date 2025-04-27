"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import AppHeader from "@/components/app-header"
import AppBackgroundLayout from "@/components/app-background-layout"

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const sidebarItems = [
    { label: "营业报表", href: "/reports" },
    { label: "每天销售报表", href: "/reports/daily-sales" },
    { label: "年度总收入", href: "/reports/annual-revenue" },
    { label: "门店利润报表", href: "/reports/store-profit" },
    { label: "门店收支报表", href: "/reports/store-balance" },
    { label: "销售分析", href: "/reports/sales-analysis" },
    { label: "商品销量排名", href: "/reports/product-ranking" },
    { label: "分时段订单数", href: "/reports/time-orders" },
    { label: "公司营收报表", href: "/reports/company-revenue" },
    { label: "会员充值报表", href: "/reports/member-recharge" },
    { label: "会员消费明细", href: "/reports/member-consumption" },
    { label: "商品类别销售", href: "/reports/category-sales" },
    { label: "收银员报表", href: "/reports/cashier" },
    { label: "特殊工号工单明细报表", href: "/reports/special-staff" },
    { label: "特殊工号工单汇总报表", href: "/reports/special-summary" },
    { label: "服务项目销售业绩销量统计报表", href: "/reports/service-performance" },
    { label: "服务工号表", href: "/reports/service-staff" },
    { label: "KTV消费报表", href: "/reports/ktv" },
    { label: "包厢预定报表", href: "/reports/room-reservation" },
    { label: "服务工号报表（精简版）", href: "/reports/service-staff-simple" },
    { label: "商品上下架", href: "/reports/product-listing" },
    { label: "订单详情", href: "/reports/order-details" },
    { label: "功能报表", href: "/reports/feature" },
    { label: "会员分析", href: "/reports/member-analysis" },
    { label: "充值消费表", href: "/reports/recharge-consumption" },
    { label: "工人业绩", href: "/reports/worker-performance" },
    { label: "提成报表", href: "/reports/commission" },
    { label: "备用金报表", href: "/reports/petty-cash" },
    { label: "充值统计", href: "/reports/recharge-statistics" },
    { label: "员工账号", href: "/reports/employee-accounts" },
  ]

  const isActive = (path: string) => {
    if (path === "/reports" && pathname === "/reports") {
      return true
    }
    return pathname.startsWith(path) && path !== "/reports"
  }

  return (
    <AppBackgroundLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <AppHeader activeNav="reports" />

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-48 border-r border-gray-200 bg-white">
            <div className="p-4 font-medium text-gray-700">报表</div>
            <nav className="space-y-0.5 overflow-y-auto max-h-[calc(100vh-11rem)]">
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
          <main className="flex-1 bg-[#f5f5f5] overflow-auto">{children}</main>
        </div>
      </div>
    </AppBackgroundLayout>
  )
}
