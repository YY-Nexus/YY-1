"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function ProductsPage() {
  const [sections, setSections] = useState([
    { id: "list", label: "商品列表", order: 0 },
    { id: "type", label: "商品类型", order: 1 },
    { id: "flavor", label: "商品口味", order: 2 },
  ])

  const moveSection = (index: number, direction: "up" | "down") => {
    const newSections = [...sections]
    if (direction === "up" && index > 0) {
      ;[newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]]
    } else if (direction === "down" && index < sections.length - 1) {
      ;[newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]]
    }
    setSections(newSections)
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-lg font-medium text-gray-900">商品管理</h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {sections.map((section, index) => (
          <Card key={section.id} className="relative group">
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col space-y-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => moveSection(index, "up")}
                disabled={index === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => moveSection(index, "down")}
                disabled={index === sections.length - 1}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              className="w-full h-full py-8 text-lg font-medium hover:bg-gray-50"
              onClick={() => {
                /* Handle section click */
              }}
            >
              {section.label}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
