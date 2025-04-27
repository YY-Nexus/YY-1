"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User, RefreshCw, Palette } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import NextImage from "next/image"
import AppBackgroundLayout from "@/components/app-background-layout"
import { useBackground } from "@/contexts/background-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LoginPage() {
  const router = useRouter()
  const { background, setBackground } = useBackground()
  const [showPassword, setShowPassword] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [generatedCode, setGeneratedCode] = useState(() => generateRandomCode())
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verification: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function generateRandomCode() {
    return Math.floor(1000 + Math.random() * 9000).toString()
  }

  function refreshVerificationCode() {
    setGeneratedCode(generateRandomCode())
    setVerificationCode("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.username || !formData.password) {
      setError("请输入账号和密码")
      setLoading(false)
      return
    }

    if (formData.verification !== generatedCode) {
      setError("验证码错误")
      refreshVerificationCode()
      setLoading(false)
      return
    }

    // Check for admin credentials
    if (formData.username === "admin" && formData.password === "My151001") {
      // Simulate API call delay
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("user", JSON.stringify({ username: "admin", role: "admin" }))
        router.push("/dashboard")
      }, 1000)
    } else {
      setError("账号或密码错误")
      setLoading(false)
    }
  }

  return (
    <AppBackgroundLayout className="flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] relative">
        {/* Background Switcher */}
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white bg-gray-800/40">
                <Palette className="h-4 w-4" />
                <span className="sr-only">Change background</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setBackground("cityscape")}
                className={background === "cityscape" ? "bg-blue-50 text-blue-600" : ""}
              >
                城市天际线
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setBackground("tech-globe")}
                className={background === "tech-globe" ? "bg-blue-50 text-blue-600" : ""}
              >
                科技球体
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setBackground("digital-earth")}
                className={background === "digital-earth" ? "bg-blue-50 text-blue-600" : ""}
              >
                数字地球
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-[100px] h-[40px] flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center transform translate-y-[1px] translate-x-[1px]">
                <NextImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/YY.jpg-DEjRypM6lVKqnT3Jkz5VKfqSuFn4wD.jpeg"
                  alt="YANYUZHINENG Logo Shadow"
                  width={93}
                  height={33}
                  className="object-contain rounded-lg opacity-60 blur-[1px]"
                  style={{ filter: "brightness(0.3) blur(1px)" }}
                />
              </div>
              <NextImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/YY.jpg-DEjRypM6lVKqnT3Jkz5VKfqSuFn4wD.jpeg"
                alt="YANYUZHINENG Logo"
                width={93}
                height={33}
                className="object-contain rounded-lg relative z-10"
                style={{
                  filter: "drop-shadow(0 0 3px rgba(59, 130, 246, 0.5))",
                }}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
            言语·云管理数据中心
          </h1>
          <p className="text-gray-400 text-sm">技术支持方：YanYu (HeNan) AI Technology Co., Ltd.</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-2xl border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="请输入账号"
                  className="pl-10 bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
                  className="pl-10 pr-10 bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="flex space-x-4">
                <Input
                  type="text"
                  placeholder="请输入验证码"
                  className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
                  value={formData.verification}
                  onChange={(e) => setFormData({ ...formData, verification: e.target.value })}
                  maxLength={4}
                />
                <div className="relative min-w-[120px] h-10 bg-gray-700 rounded flex items-center justify-center">
                  <div className="text-lg font-mono text-white tracking-wider select-none">{generatedCode}</div>
                  <button
                    type="button"
                    onClick={refreshVerificationCode}
                    className="absolute -right-10 top-2 text-gray-400 hover:text-gray-300"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                  记住密码
                </label>
              </div>
              <Link href="/login/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                忘记密码？
              </Link>
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                "text-white font-medium py-2 px-4 rounded-md transition-all duration-200",
              )}
              disabled={loading}
            >
              {loading ? "登录中..." : "登录"}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>登录即表示您已同意</p>
          <div className="space-x-2">
            <Link href="#" className="text-blue-400 hover:text-blue-300">
              服务条款
            </Link>
            <span>和</span>
            <Link href="#" className="text-blue-400 hover:text-blue-300">
              隐私政策
            </Link>
          </div>
        </div>
      </div>
    </AppBackgroundLayout>
  )
}
