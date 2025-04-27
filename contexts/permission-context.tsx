"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type UserPermissions, type ResourceType, ActionType } from "@/lib/auth/permission-types"
import { hasPermission, getAccessibleResources, getAvailableActions } from "@/lib/auth/permission-utils"

// 权限上下文类型
interface PermissionContextType {
  userPermissions: UserPermissions | null
  setUserPermissions: (permissions: UserPermissions | null) => void
  hasPermission: (resource: ResourceType, action: ActionType, conditions?: Record<string, any>) => boolean
  getAccessibleResources: (action?: ActionType) => ResourceType[]
  getAvailableActions: (resource: ResourceType) => ActionType[]
  isLoading: boolean
}

// 创建权限上下文
const PermissionContext = createContext<PermissionContextType | undefined>(undefined)

// 权限提供者属性
interface PermissionProviderProps {
  children: ReactNode
  initialPermissions?: UserPermissions | null
}

// 权限提供者组件
export function PermissionProvider({ children, initialPermissions = null }: PermissionProviderProps) {
  const [userPermissions, setUserPermissions] = useState<UserPermissions | null>(initialPermissions)
  const [isLoading, setIsLoading] = useState(true)

  // 从存储或API加载权限
  useEffect(() => {
    const loadPermissions = async () => {
      try {
        // 如果已有初始权限，则不需要加载
        if (initialPermissions) {
          setUserPermissions(initialPermissions)
          setIsLoading(false)
          return
        }

        // 从本地存储加载权限
        const storedPermissions = localStorage.getItem("userPermissions")
        if (storedPermissions) {
          setUserPermissions(JSON.parse(storedPermissions))
        }

        // 这里可以添加从API加载权限的逻辑
        // const response = await fetch('/api/permissions');
        // const data = await response.json();
        // setUserPermissions(data);
      } catch (error) {
        console.error("Failed to load permissions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPermissions()
  }, [initialPermissions])

  // 保存权限到存储
  useEffect(() => {
    if (userPermissions) {
      localStorage.setItem("userPermissions", JSON.stringify(userPermissions))
    } else {
      localStorage.removeItem("userPermissions")
    }
  }, [userPermissions])

  // 检查权限
  const checkPermission = (resource: ResourceType, action: ActionType, conditions?: Record<string, any>) => {
    return hasPermission(userPermissions, resource, action, conditions)
  }

  // 获取可访问资源
  const getAccessibleResourcesForUser = (action: ActionType = ActionType.VIEW) => {
    return getAccessibleResources(userPermissions, action)
  }

  // 获取可用操作
  const getAvailableActionsForUser = (resource: ResourceType) => {
    return getAvailableActions(userPermissions, resource)
  }

  const value = {
    userPermissions,
    setUserPermissions,
    hasPermission: checkPermission,
    getAccessibleResources: getAccessibleResourcesForUser,
    getAvailableActions: getAvailableActionsForUser,
    isLoading,
  }

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>
}

// 使用权限的钩子
export function usePermissions() {
  const context = useContext(PermissionContext)
  if (context === undefined) {
    throw new Error("usePermissions must be used within a PermissionProvider")
  }
  return context
}
