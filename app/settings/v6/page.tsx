"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppHeader from "@/components/app-header"
import AppBackgroundLayout from "@/components/app-background-layout"

export default function SettingsPageV6() {
  const [activeTab, setActiveTab] = useState("营业设置")

  const businessSettings = [
    "微信/支付宝端支付方式配置",
    "app支付方式配置",
    "app会员支付是否开启密码验证",
    "app任务自动提取",
    "扫描信息源二维码设置",
    "微信端推送设置",
    "林熙人担保人是否需要密码验证",
    "app历史任务权限是否细分到账号",
    "结账是否进行员工验证",
    "包厢账业额预警设置",
    "经理打折是否删除不打折商品",
    "会员刷卡是否允许手动输入卡号",
    "计时开房是否支持跨时段",
    "取消开房时限设置",
    "团购套餐券是否显示权销券",
    "全场赠席设置",
    "会员到店预警设置",
    "智慧客房风机电量消息提醒",
    "会员折扣是否仅会员支付时生效",
    "智停营业时间设置",
    "酒水服务费是否参与账单经理打折",
    "每次开房可使用券总量",
    "支付时优惠券是否打折",
    "自助大厅支付形式设置",
    "微信在线预定类型",
    "手机短信类型模板设置",
    "经理买单是否需要密码验证",
    "能单低消部分是否参与经理打折",
    "商品赠送是否需要密码验证",
    "经理打折是否需要密码验证",
    "微信扫码是否默认办理会员卡",
    "app下单默认导购员设置",
    "APP刷卡业务操作登录是否需要密码验证",
  ]

  const documentSettings = [
    "智能单据相关设置的详细设置",
    "文件审批流程与权限设置及流程",
    "单据审核流程规范与评估",
    "智能单据相关规范与审核设置",
    "过往单据相关规范与评估规范",
  ]

  const storageSettings = [
    "寄存时间和费用基本设置",
    "过期物品自动处理设置",
    "app提醒时间和通知设置",
    "寄存物品的到期通知规则设置",
    "收费规则与时间设置规则设置",
    "重要文件特殊储存评估规范",
    "两侧寄存单号设置",
  ]

  const songSystemSettings = [
    "点歌规范与审核",
    "歌曲播放ui设置规范",
    "歌曲播放评价设置",
    "歌曲播放的规则设置",
    "vbox-播放规则评判设置",
    "点歌权限设置",
    "歌曲置于单人包房的认领评估设置",
    "歌曲规则评审评估",
    "歌曲规则评审规则设置",
  ]

  const warehouseSettings = ["商品库存不足设置规范", "库存预警设置规范"]

  const printDocumentSettings = [
    "商品出单打印设置",
    "库房单据自动打印",
    "费单打印设置及功能评估规范",
    "取消单据及服务记账核对单重新调用",
    "打印单据重复自动打印",
    "开票单号设置",
    "交接单据规范及规范",
    "临时单门店评估",
    "软单规范评估设置",
    "员工班次打印规则设置",
    "打印单据自动打印",
    "打印记录重复规范",
    "账单打印的规则及后续流程评估规范",
    "商品库存单据及后台统计规范",
    "账单打印规则及后台数据规则",
    "账单打印规则及后台规范",
  ]

  const artistSettings = [
    "艺人基础信息设置",
    "艺人排班设置",
    "艺人基础信息及个性设置",
    "艺人基础信息评估排班下移",
    "基础信息及合作主动评分",
    "台费规范设置",
    "艺人上钟规范设置",
  ]

  const systemSettings = ["活动管理设置", "系统参数", "管理参数"]

  const settingsMap = {
    营业设置: businessSettings,
    单据设置: documentSettings,
    寄存设置: storageSettings,
    点歌系统设置: songSystemSettings,
    仓库设置: warehouseSettings,
    打印单据设置: printDocumentSettings,
    艺人设置: artistSettings,
    系统设置: systemSettings,
  }

  return (
    <AppBackgroundLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <AppHeader activeNav="settings" />

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 border-r border-gray-200 bg-white">
            <div className="p-4 font-medium text-gray-700">设置</div>
            <nav className="space-y-1">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  className={`block px-4 py-2 text-sm ${item === "门店设置" ? "bg-gray-100 border-l-2 border-blue-500" : ""}`}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Link href="#" className="text-blue-500 hover:underline flex items-center">
                  门店设置
                  <ChevronRight className="h-3 w-3 mx-1" />
                </Link>
              </div>
            </div>

            {/* Horizontal Navigation Tabs */}
            <Tabs defaultValue="营业设置" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-8 mb-6">
                <TabsTrigger value="营业设置">营业设置</TabsTrigger>
                <TabsTrigger value="单据设置">单据设置</TabsTrigger>
                <TabsTrigger value="寄存设置">寄存设置</TabsTrigger>
                <TabsTrigger value="点歌系统设置">点歌系统设置</TabsTrigger>
                <TabsTrigger value="仓库设置">仓库设置</TabsTrigger>
                <TabsTrigger value="打印单据设置">打印单据设置</TabsTrigger>
                <TabsTrigger value="艺人设置">艺人设置</TabsTrigger>
                <TabsTrigger value="系统设置">系统设置</TabsTrigger>
              </TabsList>

              {Object.keys(settingsMap).map((tabKey) => (
                <TabsContent key={tabKey} value={tabKey}>
                  <h1 className="text-2xl font-medium text-gray-800 mb-6">{tabKey}</h1>
                  <div className="grid grid-cols-3 gap-4">
                    {settingsMap[tabKey].map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-md p-4 flex items-center justify-center h-16 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors"
                      >
                        <span className="text-sm text-center text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </main>
        </div>
      </div>
    </AppBackgroundLayout>
  )
}

const sidebarItems = [
  "设置",
  "门店设置",
  "门店列表",
  "打印机设置",
  "轮播歌曲设置",
  "vod在线设置",
  "寄存设置",
  "抹零设置",
  "走马灯设置",
  "收银机设置",
  "影片管理",
  "退款退货设置",
  "商品赠送审批设置",
  "缺歌反馈",
  "包厢类型设置",
  "欢迎词设置",
  "报修审批设置",
  "主题菜单歌曲设置",
  "电视屏广告位设置",
  "平板点歌app设置",
  "自定义曲库管理",
  "点歌屏广告位设置",
  "门牌机自定义设置",
  "包厢赠送比例设置",
  "客遗酒水回收入库审批设置",
  "业绩系数设置",
  "背景设置",
]
