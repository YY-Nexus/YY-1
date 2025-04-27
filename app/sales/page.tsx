"use client"

import { useState } from "react"
import { Info, ShoppingCart, DollarSign, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { SessionSummary } from "@/components/session-summary"
import TopNav from "@/components/navigation/top-nav"

export default function SalesPage() {
  const [showOrderSummary, setShowOrderSummary] = useState(true)

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Session Summary - Order Completed Example */}
          {showOrderSummary && (
            <SessionSummary
              title="订单处理完成"
              description="订单 #ORD-2025031501 已成功处理"
              summaryItems={[
                {
                  label: "订单金额",
                  value: "¥1,245.00",
                  icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
                },
                {
                  label: "商品数量",
                  value: "8件",
                  icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
                },
                {
                  label: "支付方式",
                  value: "微信支付",
                  icon: <FileText className="h-4 w-4 text-muted-foreground" />,
                },
              ]}
              nextSteps={[
                { label: "查看订单详情", href: "#", primary: true },
                { label: "打印订单", href: "#" },
                { label: "返回订单列表", href: "/sales" },
              ]}
              onClose={() => setShowOrderSummary(false)}
            />
          )}

          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow">
            {/* Filters Section */}
            <div className="p-4 border-b">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-2 flex items-center space-x-2">
                  <span className="text-sm text-gray-500 whitespace-nowrap">时间:</span>
                  <Input type="datetime-local" className="flex-1" defaultValue="2025-03-14 08:00" />
                  <span className="text-sm text-gray-500">-</span>
                  <Input type="datetime-local" className="flex-1" defaultValue="2025-03-15 08:00" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 whitespace-nowrap">消费门店:</span>
                  <Select defaultValue="yyltd">
                    <SelectTrigger>
                      <SelectValue placeholder="YY-智云" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yyltd">YYltd</SelectItem>
                      <SelectItem value="other">其他门店</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 whitespace-nowrap">区域:</span>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="全部" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 whitespace-nowrap">订单类型:</span>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="全部" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 whitespace-nowrap">支付状态:</span>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="全部" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部</SelectItem>
                      <SelectItem value="cash">现金</SelectItem>
                      <SelectItem value="unionpay">银联</SelectItem>
                      <SelectItem value="wechat">微信</SelectItem>
                      <SelectItem value="alipay">支付宝</SelectItem>
                      <SelectItem value="visa">VISA</SelectItem>
                      <SelectItem value="later">后买单</SelectItem>
                      <SelectItem value="credit">挂账</SelectItem>
                      <SelectItem value="member-general">会员通用账户</SelectItem>
                      <SelectItem value="member-gift">会员赠送账户</SelectItem>
                      <SelectItem value="custom1">自定义1</SelectItem>
                      <SelectItem value="custom2">自定义2</SelectItem>
                      <SelectItem value="custom3">自定义3</SelectItem>
                      <SelectItem value="custom4">自定义4</SelectItem>
                      <SelectItem value="custom5">自定义5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 whitespace-nowrap">订单编号:</span>
                  <Input placeholder="请输入订单号" />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 whitespace-nowrap">导购员工:</span>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="全部" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center space-x-8">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">消费金额: </span>
                  <span className="text-sm">0.00 元</span>
                  <Info className="h-4 w-4 text-gray-400 ml-1" />
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">实收金额: </span>
                  <span className="text-sm">0.00 元</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">退款金额: </span>
                  <span className="text-sm">0.00 元</span>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-gray-500">
                    <th className="text-left py-2">订单序号</th>
                    <th className="text-left py-2">消费门店</th>
                    <th className="text-left py-2">包厢号</th>
                    <th className="text-left py-2">区域</th>
                    <th className="text-left py-2">订单编号</th>
                    <th className="text-right py-2">消费金额</th>
                    <th className="text-right py-2">实收金额</th>
                    <th className="text-right py-2">退款金额</th>
                    <th className="text-left py-2">下单时间</th>
                    <th className="text-left py-2">订单类型</th>
                    <th className="text-left py-2">支付类型</th>
                    <th className="text-left py-2">支付状态</th>
                    <th className="text-left py-2">订单来源</th>
                    <th className="text-left py-2">导购员工</th>
                    <th className="text-left py-2">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center text-sm text-gray-500">
                    <td colSpan={15} className="py-8">
                      没有找到匹配的记录
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
