"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WarehousePage() {
  const warehouses = [
    { store: "YYltd", name: "厨收仓", source: "否" },
    { store: "YYltd", name: "厨房仓", source: "否" },
    { store: "YYltd", name: "水吧仓", source: "是" },
    { store: "YYltd", name: "总仓", source: "否" },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">门店:</span>
            <Select defaultValue="yyltd">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="YYltd" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yyltd">YYltd</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="secondary">查询</Button>
          <Button>新增仓库</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 font-medium text-sm text-gray-500">门店</th>
              <th className="text-left py-4 px-6 font-medium text-sm text-gray-500">名称</th>
              <th className="text-left py-4 px-6 font-medium text-sm text-gray-500">存取源仓库</th>
              <th className="text-left py-4 px-6 font-medium text-sm text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-4 px-6 text-sm">{warehouse.store}</td>
                <td className="py-4 px-6 text-sm">{warehouse.name}</td>
                <td className="py-4 px-6 text-sm">{warehouse.source}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3 text-sm text-blue-500">
                    <button className="hover:text-blue-600">修改</button>
                    <button className="hover:text-blue-600">删除</button>
                    <button className="hover:text-blue-600">查看商品类型设置</button>
                    <button className="hover:text-blue-600">查看商品单位设置</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 text-sm text-gray-500 border-t">显示第 1 到第 1 条记录，总共 4 条记录</div>
      </div>
    </div>
  )
}
