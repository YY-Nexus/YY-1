"use client"

import type React from "react"

import AppBackgroundLayout from "@/components/app-background-layout"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppBackgroundLayout>{children}</AppBackgroundLayout>
}
