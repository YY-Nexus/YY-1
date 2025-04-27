/**
 * 权限类型定义
 */

// 用户角色
export enum UserRole {
  ADMIN = "admin", // 管理员
  MANAGER = "manager", // 经理
  STAFF = "staff", // 员工
  VIEWER = "viewer", // 查看者
  GUEST = "guest", // 访客
}

// 资源类型
export enum ResourceType {
  DASHBOARD = "dashboard", // 仪表盘
  SALES = "sales", // 销售
  PRODUCTS = "products", // 产品
  INVENTORY = "inventory", // 库存
  CUSTOMERS = "customers", // 客户
  REPORTS = "reports", // 报表
  SETTINGS = "settings", // 设置
  USERS = "users", // 用户
}

// 操作类型
export enum ActionType {
  VIEW = "view", // 查看
  CREATE = "create", // 创建
  UPDATE = "update", // 更新
  DELETE = "delete", // 删除
  EXPORT = "export", // 导出
  IMPORT = "import", // 导入
  APPROVE = "approve", // 审批
  ASSIGN = "assign", // 分配
  SHARE = "share", // 分享
}

// 权限定义
export interface Permission {
  resource: ResourceType
  action: ActionType
  conditions?: {
    [key: string]: any
  }
}

// 用户权限
export interface UserPermissions {
  userId: string
  role: UserRole
  permissions: Permission[]
}

// 默认角色权限映射
export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    // 管理员拥有所有权限
    ...Object.values(ResourceType).flatMap((resource) =>
      Object.values(ActionType).map((action) => ({
        resource,
        action,
      })),
    ),
  ],
  [UserRole.MANAGER]: [
    // 经理拥有大部分权限，但不能管理用户和设置
    ...Object.values(ResourceType)
      .filter((resource) => resource !== ResourceType.USERS && resource !== ResourceType.SETTINGS)
      .flatMap((resource) =>
        Object.values(ActionType).map((action) => ({
          resource,
          action,
        })),
      ),
    // 经理可以查看设置
    {
      resource: ResourceType.SETTINGS,
      action: ActionType.VIEW,
    },
    // 经理可以查看用户
    {
      resource: ResourceType.USERS,
      action: ActionType.VIEW,
    },
  ],
  [UserRole.STAFF]: [
    // 员工拥有基本操作权限
    ...Object.values(ResourceType)
      .filter((resource) => resource !== ResourceType.USERS && resource !== ResourceType.SETTINGS)
      .flatMap((resource) =>
        [ActionType.VIEW, ActionType.CREATE, ActionType.UPDATE].map((action) => ({
          resource,
          action,
        })),
      ),
    // 员工可以导出报表
    {
      resource: ResourceType.REPORTS,
      action: ActionType.EXPORT,
    },
  ],
  [UserRole.VIEWER]: [
    // 查看者只有查看权限
    ...Object.values(ResourceType)
      .filter((resource) => resource !== ResourceType.USERS && resource !== ResourceType.SETTINGS)
      .map((resource) => ({
        resource,
        action: ActionType.VIEW,
      })),
    // 查看者可以导出报表
    {
      resource: ResourceType.REPORTS,
      action: ActionType.EXPORT,
    },
  ],
  [UserRole.GUEST]: [
    // 访客只能查看仪表盘和报表
    {
      resource: ResourceType.DASHBOARD,
      action: ActionType.VIEW,
    },
    {
      resource: ResourceType.REPORTS,
      action: ActionType.VIEW,
    },
  ],
}
