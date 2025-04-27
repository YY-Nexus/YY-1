"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ClipboardList,
  Wallet,
  Warehouse,
  LineChart,
  Users,
  Settings,
  FileText,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  UserCheck,
  Calendar,
  Clock,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import TopNav from "@/components/navigation/top-nav"
import { StatCard } from "@/components/dashboard/stat-card"
import { ChartCard } from "@/components/dashboard/chart-card"
import { SimpleBarChart } from "@/components/dashboard/simple-bar-chart"
import { SimpleLineChart } from "@/components/dashboard/simple-line-chart"
import { SimpleDonutChart } from "@/components/dashboard/simple-donut-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SessionSummary } from "@/components/session-summary"

export default function Dashboard() {
  const router = useRouter()
  const [showSummary, setShowSummary] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  // 模拟销售数据
  const salesData = [
    { label: "周一", value: 4200 },
    { label: "周二", value: 5800 },
    { label: "周三", value: 5100 },
    { label: "周四", value: 6500 },
    { label: "周五", value: 7800 },
    { label: "周六", value: 8900 },
    { label: "周日", value: 7200 },
  ]

  // 模拟订单数据
  const orderData = [
    { label: "周一", value: 32 },
    { label: "周二", value: 45 },
    { label: "周三", value: 39 },
    { label: "周四", value: 52 },
    { label: "周五", value: 61 },
    { label: "周六", value: 72 },
    { label: "周日", value: 56 },
  ]

  // 模拟商品类别数据
  const categoryData = [
    { label: "饮品", value: 42, color: "#3b82f6" },
    { label: "食品", value: 28, color: "#10b981" },
    { label: "服务", value: 18, color: "#f59e0b" },
    { label: "其他", value: 12, color: "#6366f1" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <TopNav />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Session Summary */}
          {showSummary && (
            <SessionSummary
              title="登录成功"
              description="欢迎回到言语·云管理数据中心"
              summaryItems={[
                {
                  label: "上次登录",
                  value: "2025-03-15 08:45",
                  icon: <Clock className="h-4 w-4 text-muted-foreground" />,
                },
                {
                  label: "今日销售额",
                  value: "¥8,942",
                  icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
                },
                {
                  label: "待处理订单",
                  value: "12",
                  icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
                },
              ]}
              nextSteps={[
                { label: "查看待处理订单", href: "/sales", primary: true },
                { label: "查看销售报表", href: "/reports" },
                { label: "库存管理", href: "/warehouse" },
              ]}
              onClose={() => setShowSummary(false)}
            />
          )}

          {/* Dashboard Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">数据看板</h1>
            <p className="text-gray-500">欢迎回来，查看您的业务概览</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4 h-auto">
              <TabsTrigger value="overview" className="py-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>概览</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="sales" className="py-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>销售分析</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="py-2">
                <div className="flex items-center gap-2">
                  <Warehouse className="h-4 w-4" />
                  <span>库存管理</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="customers" className="py-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>客户管理</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="今日销售额"
                  value="¥8,942"
                  trend="up"
                  trendValue="12.5%"
                  description="较昨日"
                  icon={DollarSign}
                />
                <StatCard
                  title="今日订单数"
                  value="72"
                  trend="up"
                  trendValue="8.2%"
                  description="较昨日"
                  icon={ShoppingCart}
                />
                <StatCard
                  title="活跃会员"
                  value="1,245"
                  trend="up"
                  trendValue="3.1%"
                  description="较上周"
                  icon={UserCheck}
                />
                <StatCard
                  title="平均客单价"
                  value="¥124.2"
                  trend="down"
                  trendValue="2.3%"
                  description="较上周"
                  icon={TrendingUp}
                />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="本周销售趋势" description="按日统计">
                  <SimpleLineChart data={salesData} height={250} />
                </ChartCard>
                <ChartCard title="本周订单数量" description="按日统计">
                  <SimpleBarChart data={orderData} height={250} />
                </ChartCard>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ChartCard title="商品类别分布" description="按销售额占比">
                  <SimpleDonutChart data={categoryData} />
                </ChartCard>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">近期活动</CardTitle>
                    <CardDescription>最近的业务活动和通知</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { icon: Calendar, title: "周末促销活动", time: "明天开始", description: "所有饮品8折优惠" },
                        { icon: Users, title: "新会员注册", time: "今天 14:30", description: "本周新增32名会员" },
                        {
                          icon: ShoppingCart,
                          title: "大额订单",
                          time: "今天 12:15",
                          description: "包厢3的订单金额超过¥2,000",
                        },
                        {
                          icon: Clock,
                          title: "库存预警",
                          time: "今天 10:00",
                          description: "3种商品库存不足，请及时补货",
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="rounded-full bg-primary/10 p-2 mr-3">
                            <item.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium text-sm">{item.title}</p>
                              <span className="text-xs text-muted-foreground ml-2">{item.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="mt-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-medium mb-4">销售分析</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartCard title="销售额趋势" description="近30天">
                    <SimpleLineChart
                      data={[
                        { label: "3/1", value: 4500 },
                        { label: "3/5", value: 5200 },
                        { label: "3/10", value: 4800 },
                        { label: "3/15", value: 6300 },
                        { label: "3/20", value: 7100 },
                        { label: "3/25", value: 6800 },
                        { label: "3/30", value: 7500 },
                      ]}
                      height={250}
                    />
                  </ChartCard>
                  <ChartCard title="销售渠道分布" description="本月">
                    <SimpleDonutChart
                      data={[
                        { label: "线下门店", value: 58, color: "#3b82f6" },
                        { label: "线上商城", value: 32, color: "#10b981" },
                        { label: "第三方平台", value: 10, color: "#f59e0b" },
                      ]}
                    />
                  </ChartCard>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="mt-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-medium mb-4">库存管理</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <StatCard title="库存总量" value="1,245" description="SKU数量" icon={Warehouse} />
                  <StatCard title="库存预警" value="8" trend="up" trendValue="3" description="较上周" icon={Clock} />
                  <StatCard
                    title="库存周转率"
                    value="4.2"
                    trend="up"
                    trendValue="0.3"
                    description="较上月"
                    icon={TrendingUp}
                  />
                </div>
                <ChartCard title="库存状态分布" description="按商品类别">
                  <SimpleBarChart
                    data={[
                      { label: "饮品", value: 320 },
                      { label: "食品", value: 450 },
                      { label: "服务", value: 180 },
                      { label: "其他", value: 295 },
                    ]}
                    height={250}
                  />
                </ChartCard>
              </div>
            </TabsContent>

            <TabsContent value="customers" className="mt-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-medium mb-4">客户管理</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <StatCard
                    title="会员总数"
                    value="3,842"
                    trend="up"
                    trendValue="124"
                    description="本月新增"
                    icon={Users}
                  />
                  <StatCard title="活跃会员" value="1,245" description="近30天" icon={UserCheck} />
                  <StatCard title="会员消费" value="¥245,680" description="本月总额" icon={DollarSign} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartCard title="会员等级分布" description="按消费等级">
                    <SimpleDonutChart
                      data={[
                        { label: "普通会员", value: 2450, color: "#3b82f6" },
                        { label: "银卡会员", value: 850, color: "#10b981" },
                        { label: "金卡会员", value: 420, color: "#f59e0b" },
                        { label: "钻石会员", value: 122, color: "#6366f1" },
                      ]}
                    />
                  </ChartCard>
                  <ChartCard title="会员增长趋势" description="近6个月">
                    <SimpleLineChart
                      data={[
                        { label: "10月", value: 3200 },
                        { label: "11月", value: 3350 },
                        { label: "12月", value: 3480 },
                        { label: "1月", value: 3550 },
                        { label: "2月", value: 3680 },
                        { label: "3月", value: 3842 },
                      ]}
                      height={250}
                    />
                  </ChartCard>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Access Menu */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-medium mb-4">快速访问</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                    {item.icon}
                  </div>
                  <span className="text-sm text-gray-600">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const menuItems = [
  {
    label: "销售",
    icon: <ClipboardList className="w-6 h-6 text-white" />,
    href: "/sales",
  },
  {
    label: "商品",
    icon: <Wallet className="w-6 h-6 text-white" />,
    href: "/products",
  },
  {
    label: "仓库",
    icon: <Warehouse className="w-6 h-6 text-white" />,
    href: "/warehouse",
  },
  {
    label: "报表",
    icon: <LineChart className="w-6 h-6 text-white" />,
    href: "/reports",
  },
  {
    label: "员工",
    icon: <Users className="w-6 h-6 text-white" />,
    href: "/employees",
  },
  {
    label: "设置",
    icon: <Settings className="w-6 h-6 text-white" />,
    href: "/settings/v6",
  },
  {
    label: "账单",
    icon: <FileText className="w-6 h-6 text-white" />,
    href: "/bills",
  },
]
