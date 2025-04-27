import {
  type UserRole,
  type ResourceType,
  ActionType,
  type Permission,
  type UserPermissions,
  DEFAULT_ROLE_PERMISSIONS,
} from "./permission-types"

/**
 * 检查用户是否有权限执行特定操作
 */
export function hasPermission(
  userPermissions: UserPermissions | null,
  resource: ResourceType,
  action: ActionType,
  conditions?: Record<string, any>,
): boolean {
  if (!userPermissions) return false

  // 检查用户特定权限
  const hasSpecificPermission = userPermissions.permissions.some((permission) => {
    if (permission.resource !== resource || permission.action !== action) {
      return false
    }

    // 如果有条件，检查条件是否满足
    if (conditions && permission.conditions) {
      return Object.entries(conditions).every(([key, value]) => {
        const permissionValue = permission.conditions?.[key]

        // 如果权限条件是数组，检查值是否在数组中
        if (Array.isArray(permissionValue)) {
          return permissionValue.includes(value)
        }

        // 否则直接比较值
        return permissionValue === value
      })
    }

    return true
  })

  if (hasSpecificPermission) return true

  // 检查角色默认权限
  const rolePermissions = DEFAULT_ROLE_PERMISSIONS[userPermissions.role] || []
  return rolePermissions.some((permission) => permission.resource === resource && permission.action === action)
}

/**
 * 获取用户可访问的资源列表
 */
export function getAccessibleResources(
  userPermissions: UserPermissions | null,
  action: ActionType = ActionType.VIEW,
): ResourceType[] {
  if (!userPermissions) return []

  const resources = new Set<ResourceType>()

  // 添加用户特定权限
  userPermissions.permissions.forEach((permission) => {
    if (permission.action === action) {
      resources.add(permission.resource)
    }
  })

  // 添加角色默认权限
  const rolePermissions = DEFAULT_ROLE_PERMISSIONS[userPermissions.role] || []
  rolePermissions.forEach((permission) => {
    if (permission.action === action) {
      resources.add(permission.resource)
    }
  })

  return Array.from(resources)
}

/**
 * 获取用户对特定资源的可用操作
 */
export function getAvailableActions(userPermissions: UserPermissions | null, resource: ResourceType): ActionType[] {
  if (!userPermissions) return []

  const actions = new Set<ActionType>()

  // 添加用户特定权限
  userPermissions.permissions.forEach((permission) => {
    if (permission.resource === resource) {
      actions.add(permission.action)
    }
  })

  // 添加角色默认权限
  const rolePermissions = DEFAULT_ROLE_PERMISSIONS[userPermissions.role] || []
  rolePermissions.forEach((permission) => {
    if (permission.resource === resource) {
      actions.add(permission.action)
    }
  })

  return Array.from(actions)
}

/**
 * 创建用户权限对象
 */
export function createUserPermissions(
  userId: string,
  role: UserRole,
  additionalPermissions: Permission[] = [],
): UserPermissions {
  return {
    userId,
    role,
    permissions: additionalPermissions,
  }
}

/**
 * 合并权限
 */
export function mergePermissions(basePermissions: Permission[], additionalPermissions: Permission[]): Permission[] {
  const mergedPermissions = [...basePermissions]

  additionalPermissions.forEach((newPermission) => {
    const existingIndex = mergedPermissions.findIndex(
      (p) => p.resource === newPermission.resource && p.action === newPermission.action,
    )

    if (existingIndex >= 0) {
      // 更新现有权限
      mergedPermissions[existingIndex] = {
        ...mergedPermissions[existingIndex],
        conditions: {
          ...mergedPermissions[existingIndex].conditions,
          ...newPermission.conditions,
        },
      }
    } else {
      // 添加新权限
      mergedPermissions.push(newPermission)
    }
  })

  return mergedPermissions
}
