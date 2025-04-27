"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import TopNav from "@/components/navigation/top-nav"
import AppBackgroundLayout from "@/components/app-background-layout"
import {
  AdvancedLineChart,
  HeatMapChart,
  ScatterPlotChart,
  AdvancedPieChart,
  StackedAreaChart,
  DrillDownChart,
} from "@/components/charts/advanced-charts"
import { DashboardCustomizer } from "@/components/personalization/dashboard-customizer"
import { SavedFiltersManager } from "@/components/personalization/saved-filters"
import { ReportExporter } from "@/components/personalization/report-exporter"
import { GuidedWorkflow } from "@/components/workflow/guided-workflow"
import { TaskManager } from "@/components/workflow/task-manager"
import { ProcessAutomation } from "@/components/workflow/process-automation"
import { Settings, BarChart3, Sliders, Filter, Download, Workflow, CheckSquare, Zap } from "lucide-react"

export default function AdvancedDashboardPage() {
  const [activeTab, setActiveTab] = useState("visualization")
  const [showDashboardCustomizer, setShowDashboardCustomizer] = useState(false)
  const [showSavedFilters, setShowSavedFilters] = useState(false)
  const [showReportExporter, setShowReportExporter] = useState(false)
  const [showGuidedWorkflow, setShowGuidedWorkflow] = useState(false)

  // 示例数据
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

  const scatterData = [
    { x: 100, y: 2, z: 200, name: "低消费低频次" },
    { x: 120, y: 10, z: 260, name: "低消费高频次" },
    { x: 300, y: 2, z: 400, name: "中消费低频次" },
    { x: 320, y: 15, z: 500, name: "中消费高频次" },
    { x: 700, y: 1, z: 800, name: "高消费低频次" },
    { x: 720, y: 8, z: 1000, name: "高消费高频次" },
  ]

  const stackedAreaData = [
    { name: "1月", 饮品: 400, 食品: 300, 服务: 300 },
    { name: "2月", 饮品: 500, 食品: 400, 服务: 200 },
    { name: "3月", 饮品: 600, 食品: 500, 服务: 300 },
    { name: "4月", 饮品: 700, 食品: 600, 服务: 400 },
    { name: "5月", 饮品: 800, 食品: 700, 服务: 500 },
    { name: "6月", 饮品: 900, 食品: 800, 服务: 600 },
  ]

  // 热力图数据 - 一周内每小时的订单数量
  const heatMapData = Array(7)
    .fill(0)
    .map(() =>
      Array(24)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100)),
    )

  // 数据钻取示例数据
  const drillDownData = [
    {
      name: "2023年",
      value: 12000,
      yearlyData: [
        {
          name: "Q1",
          value: 3000,
          quarterlyData: [
            {
              name: "1月",
              value: 1000,
              monthlyData: [
                { name: "1日", value: 50 },
                { name: "2日", value: 60 },
                { name: "3日", value: 70 },
                // ... 更多日期
              ],
            },
            {
              name: "2月",
              value: 1200,
              monthlyData: [
                { name: "1日", value: 40 },
                { name: "2日", value: 50 },
                { name: "3日", value: 60 },
                // ... 更多日期
              ],
            },
            {
              name: "3月",
              value: 800,
              monthlyData: [
                { name: "1日", value: 30 },
                { name: "2日", value: 40 },
                { name: "3日", value: 50 },
                // ... 更多日期
              ],
            },
          ],
        },
        {
          name: "Q2",
          value: 4000,
          quarterlyData: [
            { name: "4月", value: 1300 },
            { name: "5月", value: 1400 },
            { name: "6月", value: 1300 },
          ],
        },
        {
          name: "Q3",
          value: 2000,
          quarterlyData: [
            { name: "7月", value: 600 },
            { name: "8月", value: 700 },
            { name: "9月", value: 700 },
          ],
        },
        {
          name: "Q4",
          value: 3000,
          quarterlyData: [
            { name: "10月", value: 900 },
            { name: "11月", value: 1000 },
            { name: "12月", value: 1100 },
          ],
        },
      ],
    },
    {
      name: "2024年",
      value: 15000,
      yearlyData: [
        { name: "Q1", value: 4000 },
        { name: "Q2", value: 5000 },
        { name: "Q3", value: 3000 },
        { name: "Q4", value: 3000 },
      ],
    },
  ]

  // 引导式工作流示例步骤
  const workflowSteps = [
    {
      id: "step-1",
      title: "基本信息",
      description: "填写订单的基本信息",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">客户名称</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="输入客户名称" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">联系电话</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="输入联系电话" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">订单类型</label>
            <select className="w-full p-2 border rounded-md">
              <option value="">请选择订单类型</option>
              <option value="standard">标准订单</option>
              <option value="express">加急订单</option>
              <option value="special">特殊订单</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: "step-2",
      title: "商品选择",
      description: "选择订单中包含的商品",
      content: (
        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">商品列表</div>
              <Button size="sm">添加商品</Button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">商品名称</th>
                  <th className="text-left py-2">单价</th>
                  <th className="text-left py-2">数量</th>
                  <th className="text-left py-2">小计</th>
                  <th className="text-left py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">饮品套餐A</td>
                  <td className="py-2">¥68.00</td>
                  <td className="py-2">2</td>
                  <td className="py-2">¥136.00</td>
                  <td className="py-2">
                    <Button variant="ghost" size="sm">
                      删除
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-2">食品套餐B</td>
                  <td className="py-2">¥88.00</td>
                  <td className="py-2">1</td>
                  <td className="py-2">¥88.00</td>
                  <td className="py-2">
                    <Button variant="ghost" size="sm">
                      删除
                    </Button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t">
                  <td colSpan={3} className="py-2 text-right font-medium">
                    总计:
                  </td>
                  <td className="py-2 font-medium">¥224.00</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: "step-3",
      title: "支付信息",
      description: "选择支付方式并确认金额",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">支付方式</label>
            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                <div className="text-center">微信支付</div>
              </div>
              <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                <div className="text-center">支付宝</div>
              </div>
              <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                <div className="text-center">银行卡</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">订单金额</label>
              <input type="text" className="w-full p-2 border rounded-md" value="¥224.00" disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">优惠金额</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="输入优惠金额" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">备注</label>
            <textarea className="w-full p-2 border rounded-md" placeholder="输入订单备注" rows={3}></textarea>
          </div>
        </div>
      ),
    },
    {
      id: "step-4",
      title: "确认提交",
      description: "确认订单信息并提交",
      content: (
        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">订单摘要</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">客户名称:</span>
                <span>张三</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">联系电话:</span>
                <span>13800138000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">订单类型:</span>
                <span>标准订单</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">商品数量:</span>
                <span>2种，共3件</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">订单金额:</span>
                <span>¥224.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">优惠金额:</span>
                <span>¥20.00</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>实付金额:</span>
                <span>¥204.00</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="confirm" className="rounded" />
            <label htmlFor="confirm">我已确认订单信息无误</label>
          </div>
        </div>
      ),
    },
  ]

  return (
    <AppBackgroundLayout>
      <div className="flex flex-col min-h-screen">
        <TopNav />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">高级功能演示</h1>
                <p className="text-gray-500">展示数据可视化、个性化设置和业务流程优化功能</p>
              </div>
              <div className="flex gap-2">
                <Dialog open={showDashboardCustomizer} onOpenChange={setShowDashboardCustomizer}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Settings className="mr-2 h-4 w-4" />
                      自定义仪表盘
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DashboardCustomizer
                      onSave={() => setShowDashboardCustomizer(false)}
                      onCancel={() => setShowDashboardCustomizer(false)}
                    />
                  </DialogContent>
                </Dialog>

                <Dialog open={showSavedFilters} onOpenChange={setShowSavedFilters}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      已保存筛选
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <SavedFiltersManager
                      onApply={() => setShowSavedFilters(false)}
                      onClose={() => setShowSavedFilters(false)}
                    />
                  </DialogContent>
                </Dialog>

                <Dialog open={showReportExporter} onOpenChange={setShowReportExporter}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      导出报表
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <ReportExporter
                      onExport={() => setShowReportExporter(false)}
                      onClose={() => setShowReportExporter(false)}
                    />
                  </DialogContent>
                </Dialog>

                <Dialog open={showGuidedWorkflow} onOpenChange={setShowGuidedWorkflow}>
                  <DialogTrigger asChild>
                    <Button>
                      <Workflow className="mr-2 h-4 w-4" />
                      创建订单
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <GuidedWorkflow
                      title="创建新订单"
                      description="按照步骤完成订单创建"
                      steps={workflowSteps}
                      onComplete={() => setShowGuidedWorkflow(false)}
                      onCancel={() => setShowGuidedWorkflow(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="visualization">
                  <div className="flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>数据可视化</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="personalization">
                  <div className="flex items-center">
                    <Sliders className="mr-2 h-4 w-4" />
                    <span>个性化设置</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="workflow">
                  <div className="flex items-center">
                    <Workflow className="mr-2 h-4 w-4" />
                    <span>业务流程优化</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="visualization" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AdvancedLineChart
                    data={multiLineData}
                    title="多维度销售趋势"
                    description="销售额、订单数和客户数趋势对比"
                    lines={[
                      { dataKey: "sales", stroke: "#3b82f6", name: "销售额" },
                      { dataKey: "orders", stroke: "#10b981", name: "订单数" },
                      { dataKey: "customers", stroke: "#f59e0b", name: "客户数" },
                    ]}
                    xAxisDataKey="name"
                  />

                  <StackedAreaChart
                    data={stackedAreaData}
                    title="商品类别销售趋势"
                    description="各类别销售额堆叠展示"
                    areas={[
                      { dataKey: "饮品", stroke: "#3b82f6", fill: "#3b82f6", name: "饮品" },
                      { dataKey: "食品", stroke: "#10b981", fill: "#10b981", name: "食品" },
                      { dataKey: "服务", stroke: "#f59e0b", fill: "#f59e0b", name: "服务" },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <HeatMapChart data={heatMapData} title="订单热力图" description="一周内各时段订单数量分布" />

                  <ScatterPlotChart data={scatterData} title="客户消费分析" description="消费金额与频次关系分析" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AdvancedPieChart data={pieData} title="销售额分布" description="各类别销售额占比" />

                  <DrillDownChart
                    data={drillDownData}
                    title="销售额多维度分析"
                    description="点击柱形可查看更详细数据"
                  />
                </div>
              </TabsContent>

              <TabsContent value="personalization" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>个性化设置功能</CardTitle>
                      <CardDescription>自定义您的仪表盘、保存筛选条件和导出个性化报表</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">自定义仪表盘</CardTitle>
                            <CardDescription>根据您的需求自定义仪表盘布局和内容</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-col items-center text-center">
                              <Settings className="h-16 w-16 text-muted-foreground mb-4" />
                              <p className="text-sm text-muted-foreground mb-4">
                                自定义您的仪表盘布局、小部件和显示选项
                              </p>
                              <Button onClick={() => setShowDashboardCustomizer(true)}>自定义仪表盘</Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">保存筛选条件</CardTitle>
                            <CardDescription>保存常用筛选条件以便快速应用</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-col items-center text-center">
                              <Filter className="h-16 w-16 text-muted-foreground mb-4" />
                              <p className="text-sm text-muted-foreground mb-4">保存和管理您的筛选条件，提高工作效率</p>
                              <Button onClick={() => setShowSavedFilters(true)}>管理筛选条件</Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">个性化报表</CardTitle>
                            <CardDescription>创建和导出个性化报表</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-col items-center text-center">
                              <Download className="h-16 w-16 text-muted-foreground mb-4" />
                              <p className="text-sm text-muted-foreground mb-4">自定义报表内容和格式，按需导出数据</p>
                              <Button onClick={() => setShowReportExporter(true)}>导出报表</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="workflow" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>业务流程优化功能</CardTitle>
                      <CardDescription>引导式操作界面、任务管理和业务流程自动化</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">引导式操作</CardTitle>
                            <CardDescription>通过步骤引导完成复杂业务流程</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-col items-center text-center">
                              <Workflow className="h-16 w-16 text-muted-foreground mb-4" />
                              <p className="text-sm text-muted-foreground mb-4">通过分步引导，简化复杂业务流程操作</p>
                              <Button onClick={() => setShowGuidedWorkflow(true)}>创建订单</Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">任务管理</CardTitle>
                            <CardDescription>管理和跟踪团队任务</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-col items-center text-center">
                              <CheckSquare className="h-16 w-16 text-muted-foreground mb-4" />
                              <p className="text-sm text-muted-foreground mb-4">
                                创建、分配和跟踪任务，提高团队协作效率
                              </p>
                              <Button onClick={() => setActiveTab("task-manager")}>查看任务</Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">流程自动化</CardTitle>
                            <CardDescription>自动化重复性任务，提高工作效率</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-col items-center text-center">
                              <Zap className="h-16 w-16 text-muted-foreground mb-4" />
                              <p className="text-sm text-muted-foreground mb-4">创建自动化流程，减少重复性工作</p>
                              <Button onClick={() => setActiveTab("process-automation")}>管理自动化</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="task-manager" className="mt-6">
                <TaskManager />
              </TabsContent>

              <TabsContent value="process-automation" className="mt-6">
                <ProcessAutomation />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </AppBackgroundLayout>
  )
}
