"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, ChevronRight, LogOut, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AppLogo from "@/components/app-logo"
import BackgroundSwitcher from "@/components/background-switcher"

interface AppHeaderProps {
  activeNav?: string
}

export default function AppHeader({ activeNav }: AppHeaderProps) {
  const router = useRouter()
  const [username, setUsername] = useState("admin")

  useEffect(() => {
    // Get user info from localStorage
    const userStr = localStorage.getItem("user")
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setUsername(user.username)
      } catch (e) {
        console.error("Failed to parse user data")
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <header className="bg-gray-800/80 backdrop-blur-sm text-white py-2 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/dashboard" className="flex items-center group">
          <div className="mr-2">
            <AppLogo size="sm" />
          </div>
          <div>
            <div className="text-sm font-bold">言语·云管理数据中心</div>
            <div className="text-xs text-gray-300">技术支持方：YanYu (HeNan) AI Technology Co., Ltd.</div>
          </div>
        </Link>
      </div>

      <nav className="flex items-center space-x-6 ml-16">
        <Link
          href="/sales"
          className={`text-sm ${activeNav === "sales" ? "text-blue-400" : "text-gray-300 hover:text-blue-300"}`}
        >
          销售
        </Link>
        <Link
          href="/products"
          className={`text-sm ${activeNav === "products" ? "text-blue-400" : "text-gray-300 hover:text-blue-300"}`}
        >
          商品
        </Link>
        <Link
          href="/warehouse"
          className={`text-sm ${activeNav === "warehouse" ? "text-blue-400" : "text-gray-300 hover:text-blue-300"}`}
        >
          仓库
        </Link>
        <Link
          href="/reports"
          className={`text-sm ${activeNav === "reports" ? "text-blue-400" : "text-gray-300 hover:text-blue-300"}`}
        >
          报表
        </Link>
        <Link
          href="/employees"
          className={`text-sm ${activeNav === "employees" ? "text-blue-400" : "text-gray-300 hover:text-blue-300"}`}
        >
          员工
        </Link>
        <Link
          href="/settings/v6"
          className={`text-sm ${activeNav === "settings" ? "text-blue-400" : "text-gray-300 hover:text-blue-300"}`}
        >
          设置
        </Link>
        <Link
          href="/bills"
          className={`text-sm ${activeNav === "bills" ? "text-blue-400" : "text-gray-300 hover:text-blue-300"}`}
        >
          账单
        </Link>
      </nav>

      <div className="flex items-center space-x-2">
        <BackgroundSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center bg-gray-700 rounded-full px-3 py-1.5 hover:bg-gray-600 transition-colors cursor-pointer">
              <User className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium">{username}</span>
              <ChevronRight className="h-3 w-3 ml-1" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5 text-sm font-medium">YY</div>
            <div className="px-2 py-1 text-xs text-muted-foreground">{username}</div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <UserPlus className="mr-2 h-4 w-4" />
              <span>切换账号</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
