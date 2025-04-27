"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function BillsPage() {
  const [startDate, setStartDate] = useState("2025-03-13")
  const [endDate, setEndDate] = useState("2025-03-13")
  const [totalAmount, setTotalAmount] = useState("0.00")

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-6">账单制作</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">时间:</span>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1"
                />
                <span className="text-sm text-gray-500">-</span>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="flex-1" />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">门店:</span>
                <Select defaultValue="yyltd">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="YYltd" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yyltd">YYltd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">支付类型:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="请选择支付类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="cash">现金</SelectItem>
                    <SelectItem value="wechat">微信</SelectItem>
                    <SelectItem value="alipay">支付宝</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">账单实收金额大于:</span>
                <Input type="number" className="flex-1" />
                <span className="text-sm text-gray-500">元</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">账单实收金额小于:</span>
                <Input type="number" className="flex-1" />
                <span className="text-sm text-gray-500">元</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">账单实收金额小计:</span>
              <span className="text-sm">{totalAmount}</span>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline">只保留开房套餐</Button>
              <Button variant="outline">批量删除</Button>
              <Button>查询</Button>
            </div>
          </div>
        </div>

        <div className="border-t">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">
                  <Checkbox />
                </th>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">行号</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">包厢区域</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">消费包厢</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">账单号</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">实收金额</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">开房时间</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td colSpan={8} className="py-8 text-gray-500">
                  没有找到匹配的记录
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
