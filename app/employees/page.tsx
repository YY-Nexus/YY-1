"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Upload, Search, FileDown } from "lucide-react"

export default function EmployeesPage() {
  return (
    <div className="p-4">
      <Tabs defaultValue="employee-list">
        <TabsList className="mb-4">
          <TabsTrigger value="warehouse">仓库管理</TabsTrigger>
          <TabsTrigger value="bill-details">能单明细报表</TabsTrigger>
          <TabsTrigger value="employee-list">员工列表</TabsTrigger>
        </TabsList>

        <TabsContent value="employee-list" className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">服务门店:</span>
                <Select defaultValue="yyltd">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="YYltd" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yyltd">YYltd</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">职位:</span>
                <Input placeholder="输入职位" className="flex-1" />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">姓名:</span>
                <Input placeholder="请输入姓名" className="flex-1" />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">状态:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="启用" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="active">启用</SelectItem>
                    <SelectItem value="inactive">停用</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">组别:</span>
                <Input placeholder="请选择组别" className="flex-1" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="space-x-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  员工资料模板下载
                </Button>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  员工资料模板导入
                </Button>
              </div>
              <div className="space-x-2">
                <Button variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  导出
                </Button>
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  查询
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 font-medium text-sm text-gray-500">服务门店</th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-gray-500">组别</th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-gray-500">姓名</th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-gray-500">工号</th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-gray-500">手机号</th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-gray-500">职位</th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-gray-500">状态</th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td colSpan={8} className="py-8 text-gray-500">
                    暂无数据
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="warehouse">
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">仓库管理内容</div>
        </TabsContent>

        <TabsContent value="bill-details">
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">能单明细报表内容</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
