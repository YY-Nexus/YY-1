"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, RefreshCw, User, Palette } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import NextImage from "next/image"
import AppBackgroundLayout from "@/components/app-background-layout"
import { useBackground } from "@/contexts/background-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ForgotPasswordPage() {
  const { background, setBackground } = useBackground()
  const [step, setStep] = useState(1)
  const [verificationCode, setVerificationCode] = useState("")
  const [generatedCode, setGeneratedCode] = useState(() => generateRandomCode())
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    verification: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

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

    if (step === 1) {
      if (!formData.username || !formData.phone) {
        setError("请输入账号和手机号")
        return
      }

      if (formData.verification !== generatedCode) {
        setError("验证码错误")
        refreshVerificationCode()
        return
      }

      setStep(2)
    } else {
      if (!formData.newPassword || !formData.confirmPassword) {
        setError("请输入新密码")
        return
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError("两次输入的密码不一致")
        return
      }

      // TODO: Implement actual password reset logic
      console.log("Password reset attempt:", formData)
    }
  }

  return (
    <AppBackgroundLayout className="flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        {/* Background Switcher */}
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white bg-gray-800/40">
                <Palette className="h-4 w-4" />
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

        {/* Header */}
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
            找回密码
          </h1>
          <p className="text-gray-400 text-sm">请完成身份验证以重置您的密码</p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-2xl border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
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
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="请输入手机号"
                    className="pl-10 bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
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
            ) : (
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="请输入新密码"
                  className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
                <Input
                  type="password"
                  placeholder="请确认新密码"
                  className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            )}

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <Button
              type="submit"
              className={cn(
                "w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                "text-white font-medium py-2 px-4 rounded-md transition-all duration-200",
              )}
            >
              {step === 1 ? "下一步" : "重置密码"}
            </Button>
          </form>
        </div>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link href="/login" className="inline-flex items-center text-gray-400 hover:text-gray-300 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回登录
          </Link>
        </div>
      </div>
    </AppBackgroundLayout>
  )
}
