"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function CollaborationPage() {
  const [activeTab, setActiveTab] = useState("collaboration")
  const [showMobilePreview, setShowMobilePreview] = useState(false)

  // Example data for charts
  const salesData = [
    { name: "1月", value: 4000 },
    { name: "2月", value: 3000 },
    { name: "3月", value: 5000 },
    { name: "4月", value: 2780 },
    { name: "5月", value: 1890 },
    { name: "6月", value: 2390 },
    { name: "7月", value: 3490 },
    { name: "8月", value: 4000 },
    { name: "9月", value: 2780 },
    { name: "10月", value: 1890 },
    { name: "11月", value: 2390 },
    { name: "12月", value: 3490 },
  ]

  const multiLineData = [
    { name: "1月", sales: 4000, orders: 2400, customers: 2400 },
    { name: "2月", sales: 3000, orders: 1398, customers: 2210 },
    { name: "3月", sales: 5000, orders: 3800, customers: 2290 },
    { name: "4月", sales: 2780, orders: 3908, customers: 2000 },
    { name: "5月", sales: 1890, orders: 4800, customers: 2181 },
    { name: "6月", sales: 2390, orders: 3800, customers: 2500 },
    { name: "7月", sales: 3490, orders: 4300, customers: 2100 },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">协作与分析中心</h1>

      <Tabs defaultValue="collaboration" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="collaboration">团队协作</TabsTrigger>
          <TabsTrigger value="analytics">数据分析</TabsTrigger>
          <TabsTrigger value="reports">报表中心</TabsTrigger>
        </TabsList>

        <TabsContent value="collaboration">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>团队任务看板</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-muted/50">
                    <h3 className="font-medium">产品发布准备</h3>
                    <p className="text-sm text-muted-foreground">负责人: 张三 | 截止日期: 2023-12-15</p>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md bg-muted/50">
                    <h3 className="font-medium">市场营销策略</h3>
                    <p className="text-sm text-muted-foreground">负责人: 李四 | 截止日期: 2023-12-20</p>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md bg-muted/50">
                    <h3 className="font-medium">客户反馈分析</h3>
                    <p className="text-sm text-muted-foreground">负责人: 王五 | 截止日期: 2023-12-10</p>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>团队消息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      ZS
                    </div>
                    <div>
                      <p className="font-medium">张三</p>
                      <p className="text-sm text-muted-foreground">已完成产品原型设计，请查看并提供反馈</p>
                      <p className="text-xs text-muted-foreground">今天 09:45</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      LS
                    </div>
                    <div>
                      <p className="font-medium">李四</p>
                      <p className="text-sm text-muted-foreground">营销材料已上传到共享文件夹</p>
                      <p className="text-xs text-muted-foreground">今天 11:20</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      WW
                    </div>
                    <div>
                      <p className="font-medium">王五</p>
                      <p className="text-sm text-muted-foreground">客户反馈报告初稿已完成，请审阅</p>
                      <p className="text-xs text-muted-foreground">昨天 16:30</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>月度销售趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name="销售额" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>业务指标对比</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={multiLineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#8884d8" name="销售额" />
                      <Line type="monotone" dataKey="orders" stroke="#82ca9d" name="订单数" />
                      <Line type="monotone" dataKey="customers" stroke="#ffc658" name="客户数" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>可用报表</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 cursor-pointer">
                    <div>
                      <h3 className="font-medium">月度销售报表</h3>
                      <p className="text-sm text-muted-foreground">最近更新: 2023-12-01</p>
                    </div>
                    <Button variant="outline">下载</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 cursor-pointer">
                    <div>
                      <h3 className="font-medium">季度业绩分析</h3>
                      <p className="text-sm text-muted-foreground">最近更新: 2023-11-15</p>
                    </div>
                    <Button variant="outline">下载</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 cursor-pointer">
                    <div>
                      <h3 className="font-medium">客户满意度调查</h3>
                      <p className="text-sm text-muted-foreground">最近更新: 2023-11-30</p>
                    </div>
                    <Button variant="outline">下载</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 cursor-pointer">
                    <div>
                      <h3 className="font-medium">产品性能分析</h3>
                      <p className="text-sm text-muted-foreground">最近更新: 2023-11-20</p>
                    </div>
                    <Button variant="outline">下载</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
