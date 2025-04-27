"use client"

import type React from "react"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile/mobile-layout"
import { MobileChartCarousel, MobileLineChart, MobileBarChart, MobilePieChart } from "@/components/mobile/mobile-charts"
import { MobileDataLoader } from "@/components/mobile/mobile-data-loader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BarChart3, LineChart, TrendingUp, Users, ShoppingCart, Bell, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MobileDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

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

  const pieData = [
    { name: "饮品", value: 400, color: "#0088FE" },
    { name: "食品", value: 300, color: "#00C49F" },
    { name: "服务", value: 300, color: "#FFBB28" },
    { name: "其他", value: 200, color: "#FF8042" },
  ]

  // Example data for activity feed
  const activities = [
    {
      id: "act-1",
      title: "新订单",
      description: "收到来自张三的新订单",
      time: "10分钟前",
      icon: ShoppingCart,
      iconColor: "text-blue-500",
    },
    {
      id: "act-2",
      title: "库存预警",
      description: '商品"饮品套餐A"库存不足',
      time: "30分钟前",
      icon: Bell,
      iconColor: "text-yellow-500",
    },
    {
      id: "act-3",
      title: "新会员注册",
      description: "李四成为新会员",
      time: "1小时前",
      icon: Users,
      iconColor: "text-green-500",
    },
    {
      id: "act-4",
      title: "促销活动",
      description: "周末促销活动即将开始",
      time: "2小时前",
      icon: Calendar,
      iconColor: "text-purple-500",
    },
  ]

  // Mock function to fetch data
  const fetchActivities = async (page: number, limit: number) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return a subset of activities based on page and limit
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    // For demo purposes, generate more activities for pagination
    const allActivities = [
      ...activities,
      ...Array.from({ length: 20 }, (_, i) => ({
        id: `act-${i + 5}`,
        title: `活动 ${i + 5}`,
        description: `这是活动 ${i + 5} 的描述`,
        time: `${i + 3}小时前`,
        icon: [ShoppingCart, Bell, Users, Calendar][i % 4],
        iconColor: ["text-blue-500", "text-yellow-500", "text-green-500", "text-purple-500"][i % 4],
      })),
    ]

    return allActivities.slice(startIndex, endIndex)
  }

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold">数据看板</h1>
          <p className="text-sm text-muted-foreground">查看您的业务概览</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="今日销售额"
            value="¥8,942"
            trend="up"
            trendValue="12.5%"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatCard
            title="今日订单数"
            value="72"
            trend="up"
            trendValue="8.2%"
            icon={<ShoppingCart className="h-4 w-4" />}
          />
          <StatCard title="活跃会员" value="1,245" trend="up" trendValue="3.1%" icon={<Users className="h-4 w-4" />} />
          <StatCard
            title="平均客单价"
            value="¥124.2"
            trend="down"
            trendValue="2.3%"
            icon={<BarChart3 className="h-4 w-4" />}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="text-xs">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
              概览
            </TabsTrigger>
            <TabsTrigger value="sales" className="text-xs">
              <LineChart className="h-3.5 w-3.5 mr-1.5" />
              销售
            </TabsTrigger>
            <TabsTrigger value="customers" className="text-xs">
              <Users className="h-3.5 w-3.5 mr-1.5" />
              客户
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <MobileChartCarousel>
              <MobileLineChart
                data={multiLineData}
                title="销售趋势"
                description="销售额、订单数和客户数趋势对比"
                lines={[
                  { dataKey: "sales", stroke: "#3b82f6", name: "销售额" },
                  { dataKey: "orders", stroke: "#10b981", name: "订单数" },
                  { dataKey: "customers", stroke: "#f59e0b", name: "客户数" },
                ]}
              />
              <MobileBarChart data={salesData} title="月度销售额" description="各月销售额对比" />
              <MobilePieChart data={pieData} title="销售额分布" description="各类别销售额占比" />
            </MobileChartCarousel>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">近期活动</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <MobileDataLoader
                  fetchData={fetchActivities}
                  renderItem={(activity, index) => (
                    <div className="flex items-start p-3 border-b last:border-b-0">
                      <div className={cn("rounded-full p-2 mr-3", activity.iconColor, "bg-opacity-10")}>
                        <activity.icon className={cn("h-4 w-4", activity.iconColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{activity.title}</h4>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{activity.description}</p>
                      </div>
                    </div>
                  )}
                  keyExtractor={(item) => item.id}
                  initialLimit={5}
                  loadMoreLimit={5}
                  emptyMessage="暂无活动"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="mt-4 space-y-4">
            <MobileLineChart data={salesData} title="销售趋势" description="月度销售额趋势" height={250} fullWidth />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">热门商品</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "饮品套餐A", sales: 128, amount: "¥8,704" },
                    { name: "食品套餐B", sales: 96, amount: "¥8,448" },
                    { name: "服务项目C", sales: 64, amount: "¥6,400" },
                    { name: "饮品套餐D", sales: 48, amount: "¥3,264" },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                          <span className="font-medium text-primary text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{product.name}</div>
                          <div className="text-xs text-muted-foreground">销量: {product.sales}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{product.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="mt-4 space-y-4">
            <MobilePieChart
              data={[
                { name: "普通会员", value: 2450, color: "#3b82f6" },
                { name: "银卡会员", value: 850, color: "#10b981" },
                { name: "金卡会员", value: 420, color: "#f59e0b" },
                { name: "钻石会员", value: 122, color: "#6366f1" },
              ]}
              title="会员分布"
              description="各等级会员数量分布"
              height={250}
              fullWidth
            />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">活跃会员</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "张三", level: "钻石会员", spending: "¥12,450", avatar: "ZS" },
                    { name: "李四", level: "金卡会员", spending: "¥8,320", avatar: "LS" },
                    { name: "王五", level: "银卡会员", spending: "¥5,680", avatar: "WW" },
                    { name: "赵六", level: "普通会员", spending: "¥2,340", avatar: "ZL" },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.level}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{member.spending}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  )
}

interface StatCardProps {
  title: string
  value: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  icon?: React.ReactNode
}

function StatCard({ title, value, trend, trendValue, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">{title}</span>
          {icon && <div className="rounded-md bg-primary/10 p-1.5">{icon}</div>}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">{value}</span>
          {trend && trendValue && (
            <Badge
              variant={trend === "up" ? "success" : trend === "down" ? "destructive" : "secondary"}
              className="text-xs"
            >
              {trend === "up" ? "↑" : "↓"} {trendValue}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
