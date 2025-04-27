"use client"

import { User } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function OnlineReservationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#333333] text-white py-2 px-6">
        <div className="flex items-center justify-between">
          <nav className="flex items-center space-x-8">
            <Link href="/sales" className="text-blue-400 hover:text-blue-300 text-sm">
              销售
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white text-sm">
              商品
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white text-sm">
              仓库
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white text-sm">
              报表
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white text-sm">
              员工
            </Link>
            <Link href="/settings/v6" className="text-gray-300 hover:text-white text-sm">
              设置
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white text-sm">
              能单
            </Link>
          </nav>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </header>

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
                  item.label === "在线预定" ? "bg-blue-50 text-blue-500" : "text-gray-600 hover:bg-gray-50"
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
              <Link href="/sales" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                订单列表
              </Link>
              <Link href="/sales/bills" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                账单列表
              </Link>
              <Link
                href="/sales/online-reservation"
                className="px-4 py-2 text-sm text-blue-500 border-b-2 border-blue-500"
              >
                在线预定
              </Link>
              <Link href="/sales/payment-flow" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                支付流水
              </Link>
              <Link href="/sales/reservation-list" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                预定列表
              </Link>
            </div>
          </div>

          <div className="p-4">
            <div className="bg-white rounded shadow">
              {/* Filters Section */}
              <div className="p-4">
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="col-span-2 flex items-center space-x-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap">预定时间:</span>
                    <Input type="datetime-local" className="flex-1" defaultValue="2025-03-14 08:00" />
                    <span className="text-sm text-gray-500">-</span>
                    <Input type="datetime-local" className="flex-1" defaultValue="2025-03-15 08:00" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap">消费门店:</span>
                    <Select defaultValue="yyltd">
                      <SelectTrigger>
                        <SelectValue placeholder="YYltd" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yyltd">YYltd</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap">预定套餐:</span>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="全部" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部</SelectItem>
                        <SelectItem value="standard">标准套餐</SelectItem>
                        <SelectItem value="premium">高级套餐</SelectItem>
                        <SelectItem value="vip">VIP套餐</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap">客户姓名:</span>
                    <Input placeholder="请输入客户姓名" className="flex-1" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap">联系电话:</span>
                    <Input placeholder="请输入联系电话" className="flex-1" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap">预定状态:</span>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="全部" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部</SelectItem>
                        <SelectItem value="pending">待确认</SelectItem>
                        <SelectItem value="confirmed">已确认</SelectItem>
                        <SelectItem value="completed">已完成</SelectItem>
                        <SelectItem value="cancelled">已取消</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap">预定单号:</span>
                    <Input placeholder="请输入预定单号" className="flex-1" />
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="px-4 py-3 bg-gray-50 border-t border-b">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">预定总数: </span>
                    <span className="text-sm ml-1">0</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">预付金额: </span>
                    <span className="text-sm ml-1">0.00</span>
                  </div>
                </div>
              </div>

              {/* Table Section */}
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm text-gray-500">
                      <th className="text-left py-2 font-normal">预定单号</th>
                      <th className="text-left py-2 font-normal">客户姓名</th>
                      <th className="text-left py-2 font-normal">联系电话</th>
                      <th className="text-left py-2 font-normal">预定门店</th>
                      <th className="text-left py-2 font-normal">预定套餐</th>
                      <th className="text-left py-2 font-normal">预定时间</th>
                      <th className="text-left py-2 font-normal">到店时间</th>
                      <th className="text-right py-2 font-normal">预付金额</th>
                      <th className="text-left py-2 font-normal">预定状态</th>
                      <th className="text-left py-2 font-normal">预定来源</th>
                      <th className="text-left py-2 font-normal">备注</th>
                      <th className="text-left py-2 font-normal">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center text-sm text-gray-500">
                      <td colSpan={12} className="py-8">
                        没有找到匹配的记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end p-4 border-t">
                <Button variant="outline" className="mr-2">
                  导出
                </Button>
                <Button className="bg-[#0099ff] hover:bg-[#0088ee]">查询</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const sidebarItems = [
  { label: "订单列表", href: "/sales" },
  { label: "账单列表", href: "/sales/bills" },
  { label: "在线预定", href: "/sales/online-reservation" },
  { label: "支付流水", href: "/sales/payment-flow" },
  { label: "预定列表", href: "/sales/reservation-list" },
]
