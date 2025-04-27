import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { BackgroundProvider } from "@/contexts/background-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "智慧商家桌面版",
  description: "Smart Business Desktop Version",
    generator: 'v0.dev'
}

// 确保 BackgroundProvider 正确包裹应用

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <BackgroundProvider>{children}</BackgroundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
