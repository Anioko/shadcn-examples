"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { 
  User, 
  Mail, 
  Shield, 
  Settings,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Download,
  UserPlus,
  Crown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Trash,
  Key,
  Eye,
  Globe,
  Database,
  Zap
} from "lucide-react"

interface UserAccount {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  department: string
  permissions: string[]
  mfaEnabled: boolean
  createdAt: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  type: 'system' | 'custom'
  createdAt: string
  updatedAt: string
}

interface AuditLogEntry {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  details: string
  ipAddress: string
  userAgent: string
  status: 'success' | 'failure' | 'warning'
}

export function UserManagement() {
  const users: UserAccount[] = [
    {
      id: "user-1",
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      role: "Administrator",
      status: 'active',
      lastLogin: "2025-10-15T14:30:00Z",
      department: "Engineering",
      permissions: ["admin:all", "user:manage", "system:config"],
      mfaEnabled: true,
      createdAt: "2024-01-15T09:00:00Z"
    },
    {
      id: "user-2",
      name: "Michael Rodriguez",
      email: "michael.rodriguez@company.com",
      role: "Project Manager",
      status: 'active',
      lastLogin: "2025-10-15T11:45:00Z",
      department: "Product",
      permissions: ["project:manage", "user:view", "report:create"],
      mfaEnabled: true,
      createdAt: "2024-02-20T10:30:00Z"
    },
    {
      id: "user-3",
      name: "Emily Watson",
      email: "emily.watson@company.com",
      role: "Business Analyst",
      status: 'pending',
      lastLogin: "Never",
      department: "Business",
      permissions: ["project:view", "report:view"],
      mfaEnabled: false,
      createdAt: "2025-10-14T16:00:00Z"
    },
    {
      id: "user-4",
      name: "James Thompson",
      email: "james.thompson@company.com",
      role: "Developer",
      status: 'inactive',
      lastLogin: "2025-09-28T08:15:00Z",
      department: "Engineering",
      permissions: ["project:view", "code:edit"],
      mfaEnabled: false,
      createdAt: "2024-06-10T14:20:00Z"
    }
  ]

  const getStatusColor = (status: UserAccount['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50'
      case 'inactive': return 'text-red-600 bg-red-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: UserAccount['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'inactive': return <XCircle className="h-4 w-4 text-red-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes('admin')) return <Crown className="h-4 w-4 text-purple-600" />
    if (role.toLowerCase().includes('manager')) return <Shield className="h-4 w-4 text-blue-600" />
    return <User className="h-4 w-4 text-gray-600" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">User Management</h2>
          <p className="text-sm text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          {["All", "Active", "Inactive", "Pending"].map((filter) => (
            <Button key={filter} variant="outline" size="sm">
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.mfaEnabled).length}</p>
                <p className="text-sm text-muted-foreground">MFA Enabled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'pending').length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{user.name}</h3>
                      {getRoleIcon(user.role)}
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                      {user.mfaEnabled && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                          MFA
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </span>
                      <span>{user.department}</span>
                      <span>
                        Last login: {user.lastLogin === "Never" ? "Never" : new Date(user.lastLogin).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(user.status)}
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(user.status)}`}
                    >
                      {user.status.toUpperCase()}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Permissions Preview */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Permissions: </span>
                    <span className="font-medium">{user.permissions.length} assigned</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Key className="h-4 w-4 mr-1" />
                      Permissions
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Activity
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function RoleBasedAccess() {
  const roles: Role[] = [
    {
      id: "role-1",
      name: "Administrator",
      description: "Full system access with all administrative privileges",
      permissions: [
        "admin:all", "user:manage", "system:config", "audit:view", 
        "report:manage", "integration:manage", "security:manage"
      ],
      userCount: 3,
      type: 'system',
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2025-10-01T10:00:00Z"
    },
    {
      id: "role-2",
      name: "Project Manager",
      description: "Manage projects, teams, and view reports",
      permissions: [
        "project:manage", "team:manage", "report:create", 
        "user:view", "dashboard:view"
      ],
      userCount: 8,
      type: 'system',
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2025-09-15T14:30:00Z"
    },
    {
      id: "role-3",
      name: "Business Analyst",
      description: "Analyze requirements and create reports",
      permissions: [
        "project:view", "report:create", "dashboard:view", 
        "requirements:manage", "analysis:create"
      ],
      userCount: 12,
      type: 'custom',
      createdAt: "2024-03-15T09:00:00Z",
      updatedAt: "2025-10-10T16:20:00Z"
    },
    {
      id: "role-4",
      name: "Developer",
      description: "Code repository access and deployment permissions",
      permissions: [
        "code:edit", "repository:access", "deployment:execute", 
        "project:view", "documentation:edit"
      ],
      userCount: 15,
      type: 'system',
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2025-08-20T11:45:00Z"
    }
  ]

  const getRoleTypeColor = (type: Role['type']) => {
    return type === 'system' ? 'text-blue-600 bg-blue-50' : 'text-green-600 bg-green-50'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Role-Based Access Control</h2>
          <p className="text-sm text-muted-foreground">
            Manage roles and permissions for secure access control
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{roles.filter(r => r.type === 'system').length}</p>
                <p className="text-sm text-muted-foreground">System Roles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{roles.filter(r => r.type === 'custom').length}</p>
                <p className="text-sm text-muted-foreground">Custom Roles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {roles.map((role) => (
          <Card key={role.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getRoleTypeColor(role.type)}`}
                  >
                    {role.type.toUpperCase()}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium">{role.userCount}</div>
                  <div className="text-muted-foreground">Users Assigned</div>
                </div>
                <div>
                  <div className="font-medium">{role.permissions.length}</div>
                  <div className="text-muted-foreground">Permissions</div>
                </div>
                <div>
                  <div className="font-medium">{new Date(role.updatedAt).toLocaleDateString()}</div>
                  <div className="text-muted-foreground">Last Updated</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Permissions ({role.permissions.length})</div>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.slice(0, 5).map((permission, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                  {role.permissions.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{role.permissions.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <Key className="h-4 w-4 mr-1" />
                  Manage Permissions
                </Button>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-1" />
                  View Users
                </Button>
                {role.type === 'custom' && (
                  <Button variant="outline" size="sm">
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function AuditLogs() {
  const auditLogs: AuditLogEntry[] = [
    {
      id: "log-1",
      timestamp: "2025-10-15T14:30:25Z",
      user: "sarah.chen@company.com",
      action: "User Created",
      resource: "User Management",
      details: "Created new user account for emily.watson@company.com",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: 'success'
    },
    {
      id: "log-2",
      timestamp: "2025-10-15T14:25:12Z",
      user: "michael.rodriguez@company.com",
      action: "Permission Modified",
      resource: "Role Management",
      details: "Updated permissions for Business Analyst role",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (macOS; Intel Mac OS X 10_15_7)",
      status: 'success'
    },
    {
      id: "log-3",
      timestamp: "2025-10-15T13:45:33Z",
      user: "james.thompson@company.com",
      action: "Login Failed",
      resource: "Authentication",
      details: "Failed login attempt - invalid password",
      ipAddress: "192.168.1.110",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: 'failure'
    },
    {
      id: "log-4",
      timestamp: "2025-10-15T13:20:18Z",
      user: "sarah.chen@company.com",
      action: "System Configuration",
      resource: "System Settings",
      details: "Updated security policy settings",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: 'success'
    },
    {
      id: "log-5",
      timestamp: "2025-10-15T12:55:44Z",
      user: "emily.watson@company.com",
      action: "Resource Access",
      resource: "Project Dashboard",
      details: "Accessed sensitive project data without proper permissions",
      ipAddress: "192.168.1.115",
      userAgent: "Mozilla/5.0 (macOS; Intel Mac OS X 10_15_7)",
      status: 'warning'
    }
  ]

  const getStatusColor = (status: AuditLogEntry['status']) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50'
      case 'failure': return 'text-red-600 bg-red-50'
      case 'warning': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: AuditLogEntry['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failure': return <XCircle className="h-4 w-4 text-red-600" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Audit Logs</h2>
          <p className="text-sm text-muted-foreground">
            Track all system activities and security events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{auditLogs.filter(l => l.status === 'success').length}</p>
                <p className="text-sm text-muted-foreground">Successful</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{auditLogs.filter(l => l.status === 'failure').length}</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{auditLogs.filter(l => l.status === 'warning').length}</p>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        {auditLogs.map((log) => (
          <Card key={log.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(log.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{log.action}</h3>
                      <Badge variant="outline" className="text-xs">
                        {log.resource}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusColor(log.status)} mb-1`}
                  >
                    {log.status.toUpperCase()}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t text-xs text-muted-foreground grid grid-cols-3 gap-4">
                <div>
                  <span className="font-medium">User: </span>
                  {log.user}
                </div>
                <div>
                  <span className="font-medium">IP: </span>
                  {log.ipAddress}
                </div>
                <div>
                  <span className="font-medium">Browser: </span>
                  {log.userAgent.split(' ')[0]}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function SystemConfiguration() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">System Configuration</h2>
          <p className="text-sm text-muted-foreground">
            Configure system settings, security policies, and operational parameters
          </p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Require MFA</div>
                <div className="text-sm text-muted-foreground">
                  Enforce multi-factor authentication for all users
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Session Timeout</div>
                <div className="text-sm text-muted-foreground">
                  Automatic logout after inactivity
                </div>
              </div>
              <Input className="w-20" defaultValue="30" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Password Policy</div>
                <div className="text-sm text-muted-foreground">
                  Enforce strong password requirements
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data & Storage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Data Retention</div>
                <div className="text-sm text-muted-foreground">
                  Automatically archive old data
                </div>
              </div>
              <Input className="w-20" defaultValue="365" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Backup Frequency</div>
                <div className="text-sm text-muted-foreground">
                  Automated backup schedule
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Encryption</div>
                <div className="text-sm text-muted-foreground">
                  Encrypt data at rest and in transit
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Network & Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">IP Whitelist</div>
                <div className="text-sm text-muted-foreground">
                  Restrict access to approved IP ranges
                </div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Rate Limiting</div>
                <div className="text-sm text-muted-foreground">
                  Prevent API abuse and DoS attacks
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">CORS Policy</div>
                <div className="text-sm text-muted-foreground">
                  Configure cross-origin requests
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Caching</div>
                <div className="text-sm text-muted-foreground">
                  Enable response caching for better performance
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">CDN</div>
                <div className="text-sm text-muted-foreground">
                  Content delivery network acceleration
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Auto-scaling</div>
                <div className="text-sm text-muted-foreground">
                  Automatically scale resources based on load
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function IntegrationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Settings</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Configure third-party integrations and API connections</p>
      </CardContent>
    </Card>
  )
}