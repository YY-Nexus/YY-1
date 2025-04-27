"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, Home, BarChart3, ShoppingCart, Settings, User, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import AppLogo from "@/components/app-logo"

interface MobileLayoutProps {
  children: React.ReactNode
  showNav?: boolean
  showBottomNav?: boolean
}

export function MobileLayout({ children, showNav = true, showBottomNav = true }: MobileLayoutProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "首页", href: "/dashboard", icon: Home },
    { label: "销售", href: "/sales", icon: BarChart3 },
    { label: "商品", href: "/products", icon: ShoppingCart },
    { label: "设置", href: "/settings/v6", icon: Settings },
  ]

  const bottomNavItems = [
    { label: "首页", href: "/dashboard", icon: Home },
    { label: "销售", href: "/sales", icon: BarChart3 },
    { label: "商品", href: "/products", icon: ShoppingCart },
    { label: "我的", href: "/profile", icon: User },
  ]

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true
    }
    if (path !== "/dashboard" && pathname?.startsWith(path)) {
      return true
    }
    return false
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {showNav && (
        <header
          className={cn(
            "sticky top-0 z-40 w-full transition-all duration-200",
            isScrolled ? "bg-background/95 backdrop-blur-sm border-b" : "bg-transparent",
          )}
        >
          <div className="container flex h-14 items-center">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">打开菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80vw] max-w-[300px] p-0">
                <div className="flex flex-col h-full">
                  <div className="border-b p-4 flex items-center">
                    <AppLogo size="sm" className="mr-2" />
                    <div>
                      <div className="font-bold text-sm">言语·云管理</div>
                      <div className="text-xs text-muted-foreground">数据中心</div>
                    </div>
                  </div>
                  <nav className="flex-1 overflow-auto p-2">
                    {navItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                          isActive(item.href)
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="border-t p-4">
                    <div className="text-xs text-muted-foreground">版本 1.0.0</div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <AppLogo size="sm" />
              <span className="font-medium text-sm">言语·云管理</span>
            </div>

            <div className="flex items-center ml-auto gap-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">搜索</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">通知</span>
              </Button>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 container py-4">{children}</main>

      {showBottomNav && (
        <div className="sticky bottom-0 z-40 w-full border-t bg-background/95 backdrop-blur-sm">
          <nav className="container flex h-16 items-center justify-around">
            {bottomNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-xs",
                  isActive(item.href) ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
