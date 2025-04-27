"use client"

import { useMemo } from "react"

import { useEffect } from "react"

import { useCallback } from "react"

import { useState } from "react"

import React from "react"

/**
 * 数据虚拟化工具 - 用于高效处理大量数据
 */

// 虚拟化列表配置
export interface VirtualizationConfig {
  itemHeight: number // 每个项目的高度
  overscan?: number // 额外渲染的项目数量
  scrollingDelay?: number // 滚动延迟（毫秒）
  initialIndex?: number // 初始滚动位置
}

// 虚拟化列表状态
export interface VirtualizationState {
  startIndex: number // 开始渲染的索引
  endIndex: number // 结束渲染的索引
  visibleItems: any[] // 可见的项目
  scrollTo: (index: number) => void // 滚动到指定索引
  totalHeight: number // 列表总高度
  containerRef: React.RefObject<HTMLDivElement> // 容器引用
}

// 创建虚拟化列表
export function createVirtualization<T>(items: T[], config: VirtualizationConfig): VirtualizationState {
  const { itemHeight, overscan = 5, scrollingDelay = 100, initialIndex = 0 } = config

  // 创建容器引用
  const containerRef = React.createRef<HTMLDivElement>()

  // 计算可见区域
  const [visibleRange, setVisibleRange] = useState({
    startIndex: Math.max(0, initialIndex - overscan),
    endIndex: initialIndex + overscan,
  })

  // 滚动到指定索引
  const scrollTo = useCallback(
    (index: number) => {
      if (containerRef.current) {
        containerRef.current.scrollTop = index * itemHeight
      }
    },
    [containerRef, itemHeight],
  )

  // 处理滚动事件
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const { scrollTop, clientHeight } = containerRef.current
    const startIndex = Math.floor(scrollTop / itemHeight)
    const endIndex = Math.min(items.length - 1, Math.floor((scrollTop + clientHeight) / itemHeight) + overscan)

    setVisibleRange({
      startIndex: Math.max(0, startIndex - overscan),
      endIndex: Math.min(items.length - 1, endIndex + overscan),
    })
  }, [containerRef, itemHeight, items.length, overscan])

  // 添加滚动事件监听
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 使用节流函数优化滚动性能
    let timeoutId: NodeJS.Timeout | null = null
    const handleScrollThrottled = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, scrollingDelay)
    }

    container.addEventListener("scroll", handleScrollThrottled)
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      container.removeEventListener("scroll", handleScrollThrottled)
    }
  }, [containerRef, handleScroll, scrollingDelay])

  // 初始滚动位置
  useEffect(() => {
    if (initialIndex > 0) {
      scrollTo(initialIndex)
    }
  }, [initialIndex, scrollTo])

  // 计算可见项目
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1).map((item, index) => ({
      item,
      index: visibleRange.startIndex + index,
      style: {
        position: "absolute",
        top: (visibleRange.startIndex + index) * itemHeight,
        height: itemHeight,
        left: 0,
        right: 0,
      },
    }))
  }, [items, visibleRange, itemHeight])

  return {
    startIndex: visibleRange.startIndex,
    endIndex: visibleRange.endIndex,
    visibleItems,
    scrollTo,
    totalHeight: items.length * itemHeight,
    containerRef,
  }
}

// 数据分块处理
export function chunkData<T>(data: T[], chunkSize: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize))
  }
  return chunks
}

// 数据分页处理
export function paginateData<T>(data: T[], page: number, pageSize: number): { data: T[]; totalPages: number } {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = data.slice(startIndex, endIndex)
  const totalPages = Math.ceil(data.length / pageSize)
  return { data: paginatedData, totalPages }
}
