"use client"

import { User, LogOut, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserProfileCardProps {
  username: string
  accountNumber: string
  version: string
  lastLogin?: string
}

export default function UserProfileCard({
  username,
  accountNumber,
  version,
  lastLogin = "2025-03-14 03:45",
}: UserProfileCardProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <Card className="p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-all">
      <div className="relative">
        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <span className="text-white text-3xl font-bold">{username}</span>
        </div>
        <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
          <span className="text-white text-xs">在线</span>
        </div>
      </div>

      <div className="text-xl font-medium mb-2">{username}</div>

      <div className="text-gray-500 mb-2 flex items-center justify-center">
        <User className="h-4 w-4 mr-1 text-gray-400" />
        <span>{accountNumber}</span>
      </div>

      <div className="text-sm text-gray-600 mb-4 px-4 py-1 bg-gray-100 rounded-full">{version}</div>

      <div className="text-blue-500 font-medium">您好，欢迎登录『YY·智云』商家桌面版</div>

      <div className="mt-4 text-xs text-gray-400">上次登录: {lastLogin}</div>

      <div className="mt-6 flex space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <User className="mr-2 h-4 w-4" />
              账号管理
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            <DropdownMenuItem className="cursor-pointer">
              <UserPlus className="mr-2 h-4 w-4" />
              <span>切换账号</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  )
}
