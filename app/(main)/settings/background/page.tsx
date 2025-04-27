"use client"

import { useBackground } from "@/contexts/background-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Check } from "lucide-react"

export default function BackgroundSettingsPage() {
  const { background, setBackground } = useBackground()

  const backgrounds = [
    {
      id: "cityscape",
      name: "城市天际线",
      description: "现代化城市天际线与科技元素的融合",
      image: "/bg-cityscape.png",
    },
    {
      id: "tech-globe",
      name: "科技球体",
      description: "数字化全球网络连接与数据流",
      image: "/bg-tech-globe.png",
    },
    {
      id: "digital-earth",
      name: "数字地球",
      description: "全球化数字网络与城市连接",
      image: "/bg-digital-earth.png",
    },
  ]

  const handleBackgroundChange = (bgId: string) => {
    setBackground(bgId as any)
    // 可以添加一个临时的视觉反馈
    const feedbackElement = document.getElementById("feedback-message")
    if (feedbackElement) {
      feedbackElement.textContent = `背景已更改为 ${backgrounds.find((bg) => bg.id === bgId)?.name}`
      feedbackElement.classList.remove("opacity-0")
      setTimeout(() => {
        feedbackElement.classList.add("opacity-0")
      }, 2000)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium text-gray-800 mb-6">背景设置</h1>
      <p className="text-gray-600 mb-6">选择您喜欢的背景图案，将应用于整个系统。</p>

      <div
        id="feedback-message"
        className="mb-4 p-2 bg-green-100 text-green-800 rounded transition-opacity duration-500 opacity-0"
      ></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {backgrounds.map((bg) => (
          <Card key={bg.id} className={`overflow-hidden ${background === bg.id ? "ring-2 ring-blue-500" : ""}`}>
            <div className="relative h-40">
              <Image src={bg.image || "/placeholder.svg"} alt={bg.name} fill className="object-cover" />
              {background === bg.id && (
                <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle>{bg.name}</CardTitle>
              <CardDescription>{bg.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleBackgroundChange(bg.id)}
                variant={background === bg.id ? "default" : "outline"}
                className="w-full"
              >
                {background === bg.id ? "当前使用中" : "选择此背景"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
