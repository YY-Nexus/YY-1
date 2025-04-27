"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronDown, Search } from "lucide-react"

export default function ReportsPage() {
  const [startDate, setStartDate] = useState("2025-03-14")
  const [endDate, setEndDate] = useState("2025-03-15")

  return (
    <div className="p-4">
      <Tabs defaultValue="sales-report">
        <TabsList className="mb-4">
          <TabsTrigger value="sales-report">营业报表</TabsTrigger>
          <TabsTrigger value="custom-report">自定义报表</TabsTrigger>
        </TabsList>

        <TabsContent value="sales-report" className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="col-span-2 flex items-center space-x-2">
                <span className="text-sm text-gray-500">时间:</span>
                <div className="relative flex-1">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="pl-8"
                  />
                  <CalendarIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <span className="text-sm text-gray-500">至</span>
                <div className="relative flex-1">
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="pl-8" />
                  <CalendarIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">选择门店:</span>
                <Select defaultValue="yyltd">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="YYltd" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yyltd">YYltd</SelectItem>
                    <SelectItem value="all">全部</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">营业区域:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="全部" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="a">A区</SelectItem>
                    <SelectItem value="b">B区</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">统计维度:</span>
                <Select defaultValue="daily">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="按天统计" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">按天统计</SelectItem>
                    <SelectItem value="weekly">按周统计</SelectItem>
                    <SelectItem value="monthly">按月统计</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">收银人员:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="全部" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">收款方式:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="全部" />
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
                <span className="text-sm text-gray-500">付款状态:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="全部" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="paid">已付款</SelectItem>
                    <SelectItem value="unpaid">未付款</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">重置</Button>
              <Button>
                <Search className="mr-2 h-4 w-4" />
                查询
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium text-sm">数据明细</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-500">日期</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">门店</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">区域</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">订单数</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">订单金额</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">折扣金额</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">支付金额</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">退款笔数</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">退款金额</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">收银员</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">现金</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">微信</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">支付宝</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">银联</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center py-8">
                    <td colSpan={14} className="py-8 text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="custom-report">
          <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-gray-500 mb-4">您可以根据需要创建自定义报表</div>
            <Button>创建自定义报表</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
