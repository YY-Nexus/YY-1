"use client"

import Image from "next/image"
import { ChevronRight, User } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white py-2 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3401741878062_.pic.jpg-NDpGjFLxuoYowkdXvIYbQh23PEyL59.jpeg"
              alt="YANYUZHINENG Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <div className="text-sm font-bold">『YY·智云』商家桌面版</div>
            <div className="text-xs text-gray-300">技术支持方：YanYu (HeNan) AI Technology Co., Ltd.</div>
          </div>
        </div>

        <nav className="flex items-center space-x-6 ml-16">
          <Link href="#" className="text-sm hover:text-blue-300">
            销售
          </Link>
          <Link href="#" className="text-sm hover:text-blue-300">
            商品
          </Link>
          <Link href="#" className="text-sm hover:text-blue-300">
            合作
          </Link>
          <Link href="#" className="text-sm hover:text-blue-300">
            报表
          </Link>
          <Link href="#" className="text-sm hover:text-blue-300">
            员工
          </Link>
          <Link href="/settings" className="text-sm text-blue-400 hover:text-blue-300">
            设置
          </Link>
          <Link href="#" className="text-sm hover:text-blue-300">
            能单
          </Link>
        </nav>

        <div className="flex items-center">
          <div className="flex items-center bg-gray-700 rounded-full px-2 py-1">
            <User className="h-4 w-4 mr-1" />
            <span className="text-xs">13800138000</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Rest of the settings page content */}
        {/* ... (previous settings page content) ... */}
      </div>
    </div>
  )
}
