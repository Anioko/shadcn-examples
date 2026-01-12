-- ============================================
-- ENTERPRISE WORKFLOW EDITOR - DATABASE SCHEMA
-- ============================================
-- This schema supports Tier 3 enterprise features:
-- - Multi-tenant organizations and workspaces
-- - Workflow persistence and versioning
-- - User permissions and roles
-- - Real-time collaboration tracking
-- - Activity feeds and audit logs
-- - Analytics and usage tracking

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ORGANIZATIONS
-- ============================================
-- Top-level tenant isolation
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization members with roles
CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- Index for faster lookups
CREATE INDEX idx_org_members_org ON organization_members(organization_id);
CREATE INDEX idx_org_members_user ON organization_members(user_id);

-- ============================================
-- WORKSPACES
-- ============================================
-- Sub-organization level for project grouping
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  settings JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_workspaces_org ON workspaces(organization_id);

-- ============================================
-- WORKFLOWS
-- ============================================
-- Main workflow storage
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'archimate', 'bpmn', 'erd', etc.
  data JSONB NOT NULL DEFAULT '{"nodes": [], "edges": []}',
  thumbnail TEXT, -- URL or base64 encoded image
  is_template BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_edited_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_workflows_workspace ON workflows(workspace_id);
CREATE INDEX idx_workflows_type ON workflows(type);
CREATE INDEX idx_workflows_archived ON workflows(is_archived) WHERE is_archived = FALSE;

-- ============================================
-- WORKFLOW VERSIONS
-- ============================================
-- Version history for workflows
CREATE TABLE workflow_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  data JSONB NOT NULL,
  commit_message TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workflow_id, version_number)
);

CREATE INDEX idx_versions_workflow ON workflow_versions(workflow_id, version_number DESC);

-- Auto-increment version numbers
CREATE OR REPLACE FUNCTION increment_version_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.version_number := COALESCE(
    (SELECT MAX(version_number) FROM workflow_versions WHERE workflow_id = NEW.workflow_id),
    0
  ) + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_version_number
  BEFORE INSERT ON workflow_versions
  FOR EACH ROW
  EXECUTE FUNCTION increment_version_number();

-- ============================================
-- WORKFLOW PERMISSIONS
-- ============================================
-- Fine-grained access control
CREATE TABLE workflow_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('viewer', 'editor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workflow_id, user_id)
);

CREATE INDEX idx_workflow_permissions_workflow ON workflow_permissions(workflow_id);
CREATE INDEX idx_workflow_permissions_user ON workflow_permissions(user_id);

-- ============================================
-- REAL-TIME COLLABORATION
-- ============================================
-- Track active users in workflows
CREATE TABLE workflow_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cursor_position JSONB, -- {x, y, nodeId, etc.}
  viewport JSONB, -- {x, y, zoom}
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clean up old sessions (older than 5 minutes)
CREATE INDEX idx_sessions_workflow ON workflow_sessions(workflow_id);
CREATE INDEX idx_sessions_last_seen ON workflow_sessions(last_seen_at);

-- ============================================
-- ACTIVITY FEED
-- ============================================
-- Audit log and activity tracking
CREATE TABLE workflow_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- 'created', 'updated', 'deleted', 'shared', 'commented', etc.
  details JSONB, -- Additional context about the action
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activities_workflow ON workflow_activities(workflow_id, created_at DESC);
CREATE INDEX idx_activities_user ON workflow_activities(user_id, created_at DESC);

-- ============================================
-- COMMENTS
-- ============================================
-- Workflow comments and discussions
CREATE TABLE workflow_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES workflow_comments(id) ON DELETE CASCADE, -- For threading
  content TEXT NOT NULL,
  position JSONB, -- {x, y, nodeId} for positioned comments
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comments_workflow ON workflow_comments(workflow_id, created_at DESC);
CREATE INDEX idx_comments_parent ON workflow_comments(parent_id);

-- ============================================
-- TAGS
-- ============================================
-- Workflow tagging system
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT, -- Hex color code
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, name)
);

CREATE TABLE workflow_tags (
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (workflow_id, tag_id)
);

-- ============================================
-- ANALYTICS
-- ============================================
-- Usage tracking and analytics
CREATE TABLE workflow_analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'view', 'edit', 'export', 'share', etc.
  event_data JSONB, -- Additional event metadata
  session_id TEXT, -- Browser session identifier
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_workflow ON workflow_analytics_events(workflow_id, created_at DESC);
CREATE INDEX idx_analytics_org ON workflow_analytics_events(organization_id, created_at DESC);
CREATE INDEX idx_analytics_type ON workflow_analytics_events(event_type, created_at DESC);

-- ============================================
-- WEBHOOKS
-- ============================================
-- Webhook configurations for integrations
CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  events TEXT[] NOT NULL, -- Array of event types to listen for
  secret TEXT NOT NULL, -- For signature verification
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webhook delivery logs
CREATE TABLE webhook_deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  webhook_id UUID NOT NULL REFERENCES webhooks(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  response_status INTEGER,
  response_body TEXT,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_webhook_deliveries_webhook ON webhook_deliveries(webhook_id, created_at DESC);

-- ============================================
-- PLUGINS
-- ============================================
-- Plugin registry and configurations
CREATE TABLE plugins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  version TEXT NOT NULL,
  author TEXT,
  description TEXT,
  manifest JSONB NOT NULL, -- Plugin metadata and configuration
  is_official BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization plugin installations
CREATE TABLE organization_plugins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  plugin_id UUID NOT NULL REFERENCES plugins(id) ON DELETE CASCADE,
  config JSONB DEFAULT '{}',
  is_enabled BOOLEAN DEFAULT TRUE,
  installed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, plugin_id)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_plugins ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - Organizations
-- ============================================
-- Users can view organizations they are members of
CREATE POLICY "Users can view their organizations"
  ON organizations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM organization_members
      WHERE organization_members.organization_id = organizations.id
      AND organization_members.user_id = auth.uid()
    )
  );

-- Only owners/admins can update organizations
CREATE POLICY "Admins can update organizations"
  ON organizations FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM organization_members
      WHERE organization_members.organization_id = organizations.id
      AND organization_members.user_id = auth.uid()
      AND organization_members.role IN ('owner', 'admin')
    )
  );

-- ============================================
-- RLS POLICIES - Workspaces
-- ============================================
-- Users can view workspaces in their organizations
CREATE POLICY "Users can view organization workspaces"
  ON workspaces FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM organization_members
      WHERE organization_members.organization_id = workspaces.organization_id
      AND organization_members.user_id = auth.uid()
    )
  );

-- Members can create workspaces in their organizations
CREATE POLICY "Members can create workspaces"
  ON workspaces FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM organization_members
      WHERE organization_members.organization_id = workspaces.organization_id
      AND organization_members.user_id = auth.uid()
    )
  );

-- ============================================
-- RLS POLICIES - Workflows
-- ============================================
-- Users can view workflows they have access to
CREATE POLICY "Users can view accessible workflows"
  ON workflows FOR SELECT
  USING (
    -- User is organization member
    EXISTS (
      SELECT 1 FROM workspaces w
      JOIN organization_members om ON om.organization_id = w.organization_id
      WHERE w.id = workflows.workspace_id
      AND om.user_id = auth.uid()
    )
    OR
    -- User has explicit permission
    EXISTS (
      SELECT 1 FROM workflow_permissions
      WHERE workflow_permissions.workflow_id = workflows.id
      AND workflow_permissions.user_id = auth.uid()
    )
  );

-- Users can update workflows they have editor/admin access to
CREATE POLICY "Editors can update workflows"
  ON workflows FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM workflow_permissions
      WHERE workflow_permissions.workflow_id = workflows.id
      AND workflow_permissions.user_id = auth.uid()
      AND workflow_permissions.role IN ('editor', 'admin')
    )
    OR
    EXISTS (
      SELECT 1 FROM workspaces w
      JOIN organization_members om ON om.organization_id = w.organization_id
      WHERE w.id = workflows.workspace_id
      AND om.user_id = auth.uid()
      AND om.role IN ('owner', 'admin')
    )
  );

-- ============================================
-- FUNCTIONS
-- ============================================
-- Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to relevant tables
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workspaces_updated_at
  BEFORE UPDATE ON workspaces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at
  BEFORE UPDATE ON workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create activity log when workflow is updated
CREATE OR REPLACE FUNCTION log_workflow_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO workflow_activities (workflow_id, user_id, action, details)
  VALUES (
    NEW.id,
    auth.uid(),
    TG_OP,
    jsonb_build_object(
      'name', NEW.name,
      'type', NEW.type
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_workflow_changes
  AFTER INSERT OR UPDATE ON workflows
  FOR EACH ROW EXECUTE FUNCTION log_workflow_activity();

-- ============================================
-- SAMPLE DATA (Optional - for development)
-- ============================================
-- Uncomment to insert sample data

-- INSERT INTO organizations (name, slug) VALUES
--   ('Acme Corporation', 'acme'),
--   ('Tech Startup Inc', 'techstartup');

-- ============================================
-- SETUP INSTRUCTIONS
-- ============================================
-- 1. Create a Supabase project at https://supabase.com
-- 2. Go to SQL Editor in your Supabase dashboard
-- 3. Copy and paste this entire schema
-- 4. Click "Run" to execute
-- 5. Add your Supabase URL and keys to .env.local
-- 6. Start building enterprise features!
