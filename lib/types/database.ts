/**
 * Database types for enterprise workflow system
 * These types mirror the Supabase schema defined in supabase/schema.sql
 */

// ============================================
// ENUMS
// ============================================
export type OrganizationRole = 'owner' | 'admin' | 'member'
export type WorkflowPermissionRole = 'viewer' | 'editor' | 'admin'
export type WorkflowType = 'archimate' | 'bpmn' | 'erd' | 'flowchart' | 'custom'
export type ActivityAction =
  | 'created'
  | 'updated'
  | 'deleted'
  | 'shared'
  | 'commented'
  | 'exported'
  | 'duplicated'
  | 'archived'
  | 'restored'
export type AnalyticsEventType =
  | 'view'
  | 'edit'
  | 'export'
  | 'share'
  | 'comment'
  | 'delete'
  | 'duplicate'

// ============================================
// DATABASE TABLES
// ============================================

export interface Organization {
  id: string
  name: string
  slug: string
  settings: Record<string, any>
  created_at: string
  updated_at: string
}

export interface OrganizationMember {
  id: string
  organization_id: string
  user_id: string
  role: OrganizationRole
  created_at: string
}

export interface Workspace {
  id: string
  organization_id: string
  name: string
  description: string | null
  settings: Record<string, any>
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface Workflow {
  id: string
  workspace_id: string
  name: string
  description: string | null
  type: WorkflowType
  data: WorkflowData
  thumbnail: string | null
  is_template: boolean
  is_archived: boolean
  created_by: string | null
  created_at: string
  updated_at: string
  last_edited_by: string | null
}

// Workflow data structure (nodes and edges)
export interface WorkflowData {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  viewport?: {
    x: number
    y: number
    zoom: number
  }
}

export interface WorkflowNode {
  id: string
  type: string
  position: {
    x: number
    y: number
  }
  data: Record<string, any>
  metadata?: Record<string, any>
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
  type?: string
  label?: string
  data?: Record<string, any>
}

export interface WorkflowVersion {
  id: string
  workflow_id: string
  version_number: number
  data: WorkflowData
  commit_message: string | null
  created_by: string | null
  created_at: string
}

export interface WorkflowPermission {
  id: string
  workflow_id: string
  user_id: string
  role: WorkflowPermissionRole
  created_at: string
}

export interface WorkflowSession {
  id: string
  workflow_id: string
  user_id: string
  cursor_position: {
    x?: number
    y?: number
    nodeId?: string
  } | null
  viewport: {
    x: number
    y: number
    zoom: number
  } | null
  last_seen_at: string
  created_at: string
}

export interface WorkflowActivity {
  id: string
  workflow_id: string
  user_id: string | null
  action: ActivityAction
  details: Record<string, any> | null
  created_at: string
}

export interface WorkflowComment {
  id: string
  workflow_id: string
  user_id: string
  parent_id: string | null
  content: string
  position: {
    x?: number
    y?: number
    nodeId?: string
  } | null
  resolved: boolean
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  organization_id: string
  name: string
  color: string | null
  created_at: string
}

export interface WorkflowTag {
  workflow_id: string
  tag_id: string
  created_at: string
}

export interface WorkflowAnalyticsEvent {
  id: string
  workflow_id: string | null
  user_id: string | null
  organization_id: string
  event_type: AnalyticsEventType
  event_data: Record<string, any> | null
  session_id: string | null
  created_at: string
}

export interface Webhook {
  id: string
  organization_id: string
  url: string
  events: string[]
  secret: string
  is_active: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface WebhookDelivery {
  id: string
  webhook_id: string
  event_type: string
  payload: Record<string, any>
  response_status: number | null
  response_body: string | null
  delivered_at: string | null
  created_at: string
}

export interface Plugin {
  id: string
  name: string
  version: string
  author: string | null
  description: string | null
  manifest: Record<string, any>
  is_official: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface OrganizationPlugin {
  id: string
  organization_id: string
  plugin_id: string
  config: Record<string, any>
  is_enabled: boolean
  installed_at: string
}

// ============================================
// JOINED/COMPUTED TYPES
// ============================================

// Workflow with related data
export interface WorkflowWithRelations extends Workflow {
  workspace?: Workspace
  creator?: {
    id: string
    email: string
    name?: string
  }
  permissions?: WorkflowPermission[]
  tags?: Tag[]
  active_sessions?: WorkflowSession[]
  latest_version?: WorkflowVersion
}

// Organization with member count
export interface OrganizationWithStats extends Organization {
  member_count?: number
  workspace_count?: number
  workflow_count?: number
}

// User with organizations
export interface UserWithOrganizations {
  id: string
  email: string
  name?: string
  organizations: Array<{
    organization: Organization
    role: OrganizationRole
  }>
}

// ============================================
// API TYPES
// ============================================

// Request/Response types for API routes
export interface CreateWorkflowRequest {
  workspace_id: string
  name: string
  description?: string
  type: WorkflowType
  data?: WorkflowData
  is_template?: boolean
}

export interface UpdateWorkflowRequest {
  name?: string
  description?: string
  data?: WorkflowData
  thumbnail?: string
  is_archived?: boolean
}

export interface CreateWorkspaceRequest {
  organization_id: string
  name: string
  description?: string
  settings?: Record<string, any>
}

export interface ShareWorkflowRequest {
  user_id: string
  role: WorkflowPermissionRole
}

export interface CreateCommentRequest {
  content: string
  parent_id?: string
  position?: {
    x?: number
    y?: number
    nodeId?: string
  }
}

export interface CreateVersionRequest {
  commit_message?: string
}

// ============================================
// HELPER TYPES
// ============================================

// Pagination
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  has_next: boolean
  has_prev: boolean
}

// API Response
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
}

// Filter and sort options
export interface WorkflowFilters {
  workspace_id?: string
  type?: WorkflowType
  is_template?: boolean
  is_archived?: boolean
  created_by?: string
  search?: string
  tags?: string[]
}

export interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}
