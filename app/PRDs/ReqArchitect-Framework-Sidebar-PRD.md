# Product Requirements Document: ReqArchitect Framework-Centric Sidebar & Dashboard System

## 1. Document Overview

**Product**: ReqArchitect Platform  
**Feature**: Framework-Centric Sidebar Navigation & Dashboard System  
**Version**: 2.0  
**Last Updated**: 2025-01-27  
**Author**: Product Team  
**Status**: Ready for Implementation

---

## 2. Executive Summary

### 2.1 Purpose
Design and implement a framework-centric navigation and dashboard system where every major capability domain (Parent) displays a comprehensive dashboard, and each navigation item (Child) represents an actual industry framework, standard, or methodology. This shifts from generic capability hierarchies to concrete, selectable frameworks that users can activate based on their needs.

### 2.2 Key Innovation
**Framework-First Approach**: Instead of showing generic capabilities like "Risk Management Effectiveness," users select specific frameworks like "ISO 27001," "NIST CSF," or "COBIT 2019." Each framework becomes a Child item with its own structure (Grandchildren = framework components).

### 2.3 Design Philosophy
- **Parent Sections** = Major capability domains (e.g., Risk Management, Customer Management)
- **Parent Dashboard** = Comprehensive overview with cards, charts, tables, modals (reusing admin-dashboard design)
- **Children** = Actual frameworks/standards/methodologies users select during onboarding
- **Grandchildren** = Framework-specific components/modules/controls
- **Great Grandchildren** = Detailed sub-components when applicable

### 2.4 Goals
- Enable users to work with actual industry frameworks rather than abstract capabilities
- Provide framework-specific dashboards showing maturity, compliance, and gaps
- Support multi-framework selection with intelligent overlap detection
- Deliver role-based dashboard views optimized for different personas
- Create a marketplace-like experience for framework discovery and activation

### 2.5 Success Metrics
- Framework activation rate: >70% of users activate 2+ frameworks within first week
- Dashboard engagement: >60% of users interact with framework dashboards weekly
- Cross-framework insights usage: >40% of users view overlap/gap analysis
- Framework completion: Average 35%+ completion across activated frameworks
- Time to first assessment: <30 minutes from framework activation

---

## 3. Technical Foundation

### 3.1 Technology Stack
- **UI Framework**: React 18+ with TypeScript
- **Component Library**: Shadcn UI (using Radix UI primitives)
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query (TanStack Query v5)
- **Charts**: Recharts or Chart.js
- **Tables**: TanStack Table v8
- **Icons**: Lucide React
- **Routing**: React Router v6 or Next.js App Router
- **Dashboard Layout**: Admin Dashboard Shadcn template

### 3.2 Base Components to Extend
```typescript
// Shadcn UI components
import { 
  Sidebar, SidebarContent, SidebarGroup, SidebarMenu, 
  SidebarMenuItem, SidebarMenuButton, SidebarMenuSub 
} from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
```

---

## 4. Data Models

### 4.1 Framework Schema

```typescript
interface Framework {
  id: string;
  name: string;
  shortName: string;
  category: FrameworkCategory;
  type: FrameworkType;
  version?: string;
  description: string;
  icon?: LucideIcon;
  vendor?: string; // e.g., "ISO", "NIST", "TOGAF"
  
  // Metadata
  industryFocus?: Industry[];
  applicability: Applicability;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedSetupTime: string; // e.g., "2-4 weeks"
  requiredRoles: string[];
  
  // Structure
  components: FrameworkComponent[];
  relationships: FrameworkRelationship[];
  
  // Status
  isActive: boolean;
  activatedAt?: Date;
  completionPercentage: number;
  maturityLevel?: 1 | 2 | 3 | 4 | 5;
  lastAssessmentDate?: Date;
  
  // Configuration
  configuration: FrameworkConfiguration;
  customizations?: CustomizationConfig;
}

type FrameworkCategory = 
  | 'strategy'
  | 'enterprise-architecture'
  | 'risk-security-compliance'
  | 'customer-management'
  | 'financial-management'
  | 'business-management'
  | 'it-management'
  | 'industry-specific'
  | 'sustainability'
  | 'innovation';

type FrameworkType =
  | 'methodology'
  | 'standard'
  | 'regulation'
  | 'best-practice'
  | 'reference-model'
  | 'maturity-model';

interface FrameworkComponent {
  id: string;
  name: string;
  description: string;
  level: 'grandchild' | 'great-grandchild';
  parentId?: string; // For great-grandchildren
  order: number;
  
  // Component details
  type: ComponentType;
  requirements?: Requirement[];
  controls?: Control[];
  processes?: Process[];
  artifacts?: Artifact[];
  
  // Status
  status: 'not-started' | 'in-progress' | 'completed' | 'not-applicable';
  completionPercentage: number;
  assignedTo?: string[];
  dueDate?: Date;
  
  // Evidence & Assessment
  evidence?: Evidence[];
  assessments?: Assessment[];
  gaps?: Gap[];
  risks?: Risk[];
}

type ComponentType = 
  | 'domain'
  | 'capability'
  | 'process'
  | 'control'
  | 'principle'
  | 'practice'
  | 'objective'
  | 'requirement';

interface FrameworkRelationship {
  targetFrameworkId: string;
  relationshipType: 'complements' | 'conflicts' | 'overlaps' | 'requires' | 'supersedes';
  description: string;
  overlapPercentage?: number;
  mappedComponents?: ComponentMapping[];
}

interface ComponentMapping {
  sourceComponentId: string;
  targetComponentId: string;
  mappingType: 'equivalent' | 'partial' | 'related';
  confidence: number; // 0-1
}
```

### 4.2 Dashboard Configuration Schema

```typescript
interface DashboardConfig {
  parentId: string; // e.g., 'risk-security-assurance'
  layout: DashboardLayout;
  widgets: DashboardWidget[];
  tabs: DashboardTab[];
  filters: DashboardFilter[];
  preferences: DashboardPreferences;
}

interface DashboardLayout {
  type: 'grid' | 'flex';
  columns: 1 | 2 | 3 | 4;
  gaps: 'sm' | 'md' | 'lg';
  responsive: ResponsiveConfig;
}

interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  position: GridPosition;
  size: WidgetSize;
  dataSource: DataSourceConfig;
  visualization: VisualizationConfig;
  filters?: WidgetFilter[];
  actions?: WidgetAction[];
}

type WidgetType = 
  | 'stat-card'
  | 'chart'
  | 'table'
  | 'list'
  | 'gauge'
  | 'heatmap'
  | 'timeline'
  | 'kanban'
  | 'activity-feed';

interface DashboardTab {
  id: string;
  label: string;
  icon?: LucideIcon;
  content: TabContent;
  badge?: BadgeConfig;
  order: number;
}

interface TabContent {
  type: 'overview' | 'frameworks' | 'assessments' | 'reports' | 'analytics' | 'custom';
  widgets: string[]; // Widget IDs to display
  layout?: DashboardLayout;
}
```

### 4.3 User Framework Selection Schema

```typescript
interface UserFrameworkProfile {
  userId: string;
  organizationId: string;
  
  // Onboarding selections
  selectedFrameworks: FrameworkSelection[];
  primaryGoals: TransformationGoal[];
  industryFocus: Industry;
  organizationSize: OrganizationSize;
  currentMaturity: MaturityProfile;
  
  // Framework management
  activeFrameworks: string[]; // Framework IDs
  archivedFrameworks: string[];
  pinnedFrameworks: string[];
  
  // Dashboard preferences
  defaultDashboardView: string; // Dashboard ID
  customDashboards: CustomDashboard[];
  dashboardPreferences: Record<string, DashboardPreferences>;
  
  // Progress tracking
  overallProgress: ProgressMetrics;
  frameworkProgress: Record<string, FrameworkProgress>;
  milestones: Milestone[];
  
  // Insights
  recommendations: Recommendation[];
  gaps: Gap[];
  risks: Risk[];
  opportunities: Opportunity[];
}

interface FrameworkSelection {
  frameworkId: string;
  reason: SelectionReason;
  priority: 'critical' | 'high' | 'medium' | 'low';
  targetCompletionDate?: Date;
  sponsor?: string;
  budget?: number;
}

type SelectionReason = 
  | 'regulatory-requirement'
  | 'industry-standard'
  | 'customer-requirement'
  | 'competitive-advantage'
  | 'risk-mitigation'
  | 'operational-efficiency'
  | 'strategic-initiative';

interface TransformationGoal {
  id: string;
  name: string;
  category: string;
  targetDate?: Date;
  metrics: Metric[];
}

interface FrameworkProgress {
  frameworkId: string;
  completionPercentage: number;
  componentsCompleted: number;
  componentsTotal: number;
  maturityLevel: number;
  lastUpdated: Date;
  
  // Detailed progress
  componentProgress: Record<string, ComponentProgress>;
  milestones: Milestone[];
  blockers: Blocker[];
  
  // Quality metrics
  evidenceQuality: number; // 0-100
  assessmentCoverage: number; // 0-100
  documentationCompleteness: number; // 0-100
}
```

### 4.4 Dashboard Widget Data Models

```typescript
interface StatCardData {
  label: string;
  value: string | number;
  change?: number; // Percentage change
  trend?: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
  color?: string;
  subtitle?: string;
}

interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'radar' | 'heatmap' | 'gauge';
  data: any[]; // Chart-specific data structure
  config: ChartConfig;
}

interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
  sorting?: SortConfig;
  filtering?: FilterConfig;
  grouping?: GroupConfig;
  pagination?: PaginationConfig;
}

interface TableColumn {
  id: string;
  header: string;
  accessorKey: string;
  cell?: CellRenderer;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

interface FrameworkTableRow {
  id: string;
  frameworkName: string;
  status: 'active' | 'inactive' | 'in-setup';
  completion: number;
  maturity: number;
  lastUpdated: Date;
  assignedTo: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  actions: Action[];
}
```

---

## 5. Sidebar Navigation Structure

### 5.1 Complete Framework Hierarchy

```typescript
// Sidebar structure definition
const navigationStructure: NavigationStructure = {
  platformCore: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      children: [
        { id: 'overview', label: 'Overview', path: '/dashboard/overview' },
        { id: 'workspace', label: 'My Workspace', path: '/dashboard/workspace' },
        { id: 'activity', label: 'Recent Activity', path: '/dashboard/activity' },
        { id: 'insights', label: 'Insights & Recommendations', path: '/dashboard/insights' }
      ]
    },
    {
      id: 'strategy',
      label: 'Strategy & Goals',
      icon: Target,
      dashboardPath: '/strategy/dashboard',
      children: [
        {
          id: 'bmc',
          label: 'Business Model Canvas',
          framework: {
            id: 'business-model-canvas',
            vendor: 'Strategyzer',
            type: 'methodology'
          },
          children: [ /* BMC components */ ]
        },
        {
          id: 'lean-canvas',
          label: 'Lean Canvas',
          framework: {
            id: 'lean-canvas',
            vendor: 'Ash Maurya',
            type: 'methodology'
          },
          children: [ /* Lean Canvas components */ ]
        },
        {
          id: 'okr',
          label: 'OKRs',
          framework: {
            id: 'objectives-key-results',
            vendor: 'John Doerr',
            type: 'methodology'
          },
          children: [ /* OKR structure */ ]
        }
      ]
    }
  ],
  
  capabilities: [
    {
      id: 'enterprise-architecture',
      label: 'Enterprise Architecture',
      icon: Building2,
      dashboardPath: '/ea/dashboard',
      children: [
        {
          id: 'togaf',
          label: 'TOGAF',
          framework: {
            id: 'togaf-10',
            vendor: 'The Open Group',
            type: 'methodology',
            version: '10'
          },
          children: [
            { id: 'architecture-vision', label: 'Architecture Vision' },
            { id: 'business-architecture', label: 'Business Architecture' },
            { id: 'information-systems', label: 'Information Systems Architecture',
              children: [
                { id: 'data-architecture', label: 'Data Architecture' },
                { id: 'application-architecture', label: 'Application Architecture' }
              ]
            },
            { id: 'technology-architecture', label: 'Technology Architecture' },
            { id: 'opportunities-solutions', label: 'Opportunities & Solutions' },
            { id: 'migration-planning', label: 'Migration Planning' },
            { id: 'implementation-governance', label: 'Implementation Governance' }
          ]
        },
        {
          id: 'archimate',
          label: 'ArchiMate 3.2',
          framework: {
            id: 'archimate-32',
            vendor: 'The Open Group',
            type: 'standard',
            version: '3.2'
          },
          children: [
            { id: 'strategy-layer', label: 'Strategy Layer' },
            { id: 'business-layer', label: 'Business Layer' },
            { id: 'application-layer', label: 'Application Layer' },
            { id: 'technology-layer', label: 'Technology Layer' },
            { id: 'physical-layer', label: 'Physical Layer' },
            { id: 'implementation-migration', label: 'Implementation & Migration' }
          ]
        },
        {
          id: 'zachman',
          label: 'Zachman Framework',
          framework: {
            id: 'zachman-framework',
            vendor: 'John Zachman',
            type: 'reference-model'
          },
          children: [
            { id: 'contextual', label: "Contextual (Planner's View)" },
            { id: 'conceptual', label: "Conceptual (Owner's View)" },
            { id: 'logical', label: "Logical (Designer's View)" },
            { id: 'physical', label: "Physical (Builder's View)" },
            { id: 'detailed', label: "Detailed (Subcontractor's View)" }
          ]
        }
      ]
    },
    {
      id: 'risk-security-assurance',
      label: 'Risk, Security & Assurance',
      icon: Shield,
      dashboardPath: '/risk/dashboard',
      children: [
        // Risk Management Frameworks
        {
          id: 'iso-31000',
          label: 'ISO 31000:2018',
          framework: {
            id: 'iso-31000-2018',
            vendor: 'ISO',
            type: 'standard',
            version: '2018'
          },
          children: [
            { id: 'risk-assessment', label: 'Risk Assessment' },
            { id: 'risk-treatment', label: 'Risk Treatment' },
            { id: 'risk-monitoring', label: 'Risk Monitoring & Review' },
            { id: 'risk-communication', label: 'Risk Communication' }
          ]
        },
        {
          id: 'coso-erm',
          label: 'COSO ERM Framework',
          framework: {
            id: 'coso-erm-2017',
            vendor: 'COSO',
            type: 'methodology',
            version: '2017'
          },
          children: [
            { id: 'governance-culture', label: 'Governance & Culture' },
            { id: 'strategy-objective', label: 'Strategy & Objective-Setting' },
            { id: 'performance', label: 'Performance' },
            { id: 'review-revision', label: 'Review & Revision' },
            { id: 'information-communication', label: 'Information, Communication & Reporting' }
          ]
        },
        {
          id: 'nist-rmf',
          label: 'NIST Risk Management Framework',
          framework: {
            id: 'nist-rmf-rev2',
            vendor: 'NIST',
            type: 'methodology',
            version: 'Rev 2'
          },
          children: [
            { id: 'prepare', label: 'Prepare' },
            { id: 'categorize', label: 'Categorize' },
            { id: 'select', label: 'Select' },
            { id: 'implement', label: 'Implement' },
            { id: 'assess', label: 'Assess' },
            { id: 'authorize', label: 'Authorize' },
            { id: 'monitor', label: 'Monitor' }
          ]
        },
        
        // Security Frameworks
        {
          id: 'iso-27001',
          label: 'ISO/IEC 27001:2022',
          framework: {
            id: 'iso-27001-2022',
            vendor: 'ISO',
            type: 'standard',
            version: '2022'
          },
          children: [
            { id: 'context-organization', label: 'Context of Organization' },
            { id: 'leadership', label: 'Leadership' },
            { id: 'planning', label: 'Planning' },
            { id: 'support', label: 'Support' },
            { id: 'operation', label: 'Operation' },
            { id: 'performance-evaluation', label: 'Performance Evaluation' },
            { id: 'improvement', label: 'Improvement' },
            { id: 'annex-a', label: 'Annex A Controls',
              children: [
                { id: 'organizational-controls', label: 'Organizational Controls' },
                { id: 'people-controls', label: 'People Controls' },
                { id: 'physical-controls', label: 'Physical Controls' },
                { id: 'technological-controls', label: 'Technological Controls' }
              ]
            }
          ]
        },
        {
          id: 'nist-csf',
          label: 'NIST Cybersecurity Framework',
          framework: {
            id: 'nist-csf-20',
            vendor: 'NIST',
            type: 'methodology',
            version: '2.0'
          },
          children: [
            { id: 'govern', label: 'Govern' },
            { id: 'identify', label: 'Identify' },
            { id: 'protect', label: 'Protect' },
            { id: 'detect', label: 'Detect' },
            { id: 'respond', label: 'Respond' },
            { id: 'recover', label: 'Recover' }
          ]
        },
        {
          id: 'cis-controls',
          label: 'CIS Controls v8',
          framework: {
            id: 'cis-controls-v8',
            vendor: 'CIS',
            type: 'best-practice',
            version: '8'
          },
          children: [
            { id: 'ig1', label: 'Implementation Group 1 (Basic)' },
            { id: 'ig2', label: 'Implementation Group 2 (Foundational)' },
            { id: 'ig3', label: 'Implementation Group 3 (Organizational)' }
          ]
        },
        {
          id: 'pci-dss',
          label: 'PCI DSS 4.0',
          framework: {
            id: 'pci-dss-40',
            vendor: 'PCI SSC',
            type: 'standard',
            version: '4.0'
          },
          children: [
            { id: 'secure-network', label: 'Build & Maintain Secure Network' },
            { id: 'protect-data', label: 'Protect Account Data' },
            { id: 'vulnerability-mgmt', label: 'Maintain Vulnerability Management' },
            { id: 'access-controls', label: 'Implement Strong Access Controls' },
            { id: 'monitor-test', label: 'Monitor & Test Networks' },
            { id: 'security-policy', label: 'Maintain Information Security Policy' }
          ]
        },
        {
          id: 'soc2',
          label: 'SOC 2 Type II',
          framework: {
            id: 'soc2-type2',
            vendor: 'AICPA',
            type: 'standard'
          },
          children: [
            { id: 'security', label: 'Security' },
            { id: 'availability', label: 'Availability' },
            { id: 'processing-integrity', label: 'Processing Integrity' },
            { id: 'confidentiality', label: 'Confidentiality' },
            { id: 'privacy', label: 'Privacy' }
          ]
        },
        
        // Compliance Frameworks
        {
          id: 'gdpr',
          label: 'GDPR Compliance',
          framework: {
            id: 'gdpr-eu',
            vendor: 'EU',
            type: 'regulation'
          },
          children: [
            { id: 'lawfulness', label: 'Lawfulness, Fairness & Transparency' },
            { id: 'purpose-limitation', label: 'Purpose Limitation' },
            { id: 'data-minimization', label: 'Data Minimization' },
            { id: 'accuracy', label: 'Accuracy' },
            { id: 'storage-limitation', label: 'Storage Limitation' },
            { id: 'integrity-confidentiality', label: 'Integrity & Confidentiality' },
            { id: 'accountability', label: 'Accountability' }
          ]
        },
        {
          id: 'hipaa',
          label: 'HIPAA Security Rule',
          framework: {
            id: 'hipaa-security',
            vendor: 'HHS',
            type: 'regulation'
          },
          children: [
            { id: 'administrative', label: 'Administrative Safeguards' },
            { id: 'physical', label: 'Physical Safeguards' },
            { id: 'technical', label: 'Technical Safeguards' }
          ]
        },
        
        // Governance
        {
          id: 'cobit-2019',
          label: 'COBIT 2019',
          framework: {
            id: 'cobit-2019',
            vendor: 'ISACA',
            type: 'methodology',
            version: '2019'
          },
          children: [
            { id: 'governance-system', label: 'Governance System' },
            { id: 'governance-objectives', label: 'Governance & Management Objectives' },
            { id: 'design-factors', label: 'Design Factors' },
            { id: 'performance-mgmt', label: 'Performance Management' }
          ]
        }
      ]
    },
    {
      id: 'customer-management',
      label: 'Customer Management',
      icon: Users,
      dashboardPath: '/customer/dashboard',
      children: [
        {
          id: 'cx-framework',
          label: 'Customer Experience Framework',
          framework: {
            id: 'cx-framework',
            type: 'methodology'
          },
          children: [
            { id: 'journey-mapping', label: 'Customer Journey Mapping' },
            { id: 'touchpoint-analysis', label: 'Touchpoint Analysis' },
            { id: 'experience-design', label: 'Experience Design' },
            { id: 'cx-measurement', label: 'CX Measurement' }
          ]
        },
        {
          id: 'nps',
          label: 'Net Promoter System',
          framework: {
            id: 'nps-system',
            vendor: 'Bain & Company',
            type: 'methodology'
          },
          children: [
            { id: 'promoters', label: 'Promoters Strategy' },
            { id: 'passives', label: 'Passives Engagement' },
            { id: 'detractors', label: 'Detractors Management' },
            { id: 'score-tracking', label: 'Score Tracking' }
          ]
        },
        {
          id: 'jtbd',
          label: 'Jobs-to-be-Done',
          framework: {
            id: 'jtbd-framework',
            vendor: 'Clayton Christensen',
            type: 'methodology'
          },
          children: [
            { id: 'job-identification', label: 'Job Identification' },
            { id: 'job-mapping', label: 'Job Mapping' },
            { id: 'outcome-innovation', label: 'Outcome-Driven Innovation' }
          ]
        }
      ]
    },
    {
      id: 'financial-management',
      label: 'Financial Management',
      icon: DollarSign,
      dashboardPath: '/finance/dashboard',
      children: [
        {
          id: 'ifrs',
          label: 'IFRS',
          framework: {
            id: 'ifrs-standards',
            vendor: 'IFRS Foundation',
            type: 'standard'
          },
          children: [
            { id: 'financial-statements', label: 'Financial Statements' },
            { id: 'revenue-recognition', label: 'Revenue Recognition (IFRS 15)' },
            { id: 'leases', label: 'Leases (IFRS 16)' },
            { id: 'financial-instruments', label: 'Financial Instruments (IFRS 9)' }
          ]
        },
        {
          id: 'us-gaap',
          label: 'US GAAP',
          framework: {
            id: 'us-gaap',
            vendor: 'FASB',
            type: 'standard'
          },
          children: [
            { id: 'accounting-principles', label: 'Accounting Principles' },
            { id: 'financial-reporting', label: 'Financial Reporting' },
            { id: 'revenue-asc606', label: 'Revenue Recognition (ASC 606)' }
          ]
        },
        {
          id: 'o2c',
          label: 'Order-to-Cash',
          framework: {
            id: 'order-to-cash',
            type: 'best-practice'
          },
          children: [
            { id: 'order-management', label: 'Order Management' },
            { id: 'credit-management', label: 'Credit Management' },
            { id: 'fulfillment', label: 'Fulfillment' },
            { id: 'billing', label: 'Billing & Invoicing' },
            { id: 'collections', label: 'Collections' },
            { id: 'cash-application', label: 'Cash Application' }
          ]
        },
        {
          id: 'p2p',
          label: 'Procure-to-Pay',
          framework: {
            id: 'procure-to-pay',
            type: 'best-practice'
          },
          children: [
            { id: 'requisition', label: 'Requisition' },
            { id: 'purchase-orders', label: 'Purchase Orders' },
            { id: 'receiving', label: 'Receiving' },
            { id: 'invoice-processing', label: 'Invoice Processing' },
            { id: 'payment', label: 'Payment' }
          ]
        },
        {
          id: 'coso-ic',
          label: 'COSO Internal Control',
          framework: {
            id: 'coso-ic-2013',
            vendor: 'COSO',
            type: 'methodology',
            version: '2013'
          },
          children: [
            { id: 'control-environment', label: 'Control Environment' },
            { id: 'risk-assessment', label: 'Risk Assessment' },
            { id: 'control-activities', label: 'Control Activities' },
            { id: 'information-communication', label: 'Information & Communication' },
            { id: 'monitoring', label: 'Monitoring Activities' }
          ]
        }
      ]
    },
    {
      id: 'business-management',
      label: 'Business Management',
      icon: Briefcase,
      dashboardPath: '/business/dashboard',
      children: [
        {
          id: 'bpmn',
          label: 'BPMN 2.0',
          framework: {
            id: 'bpmn-20',
            vendor: 'OMG',
            type: 'standard',
            version: '2.0'
          },
          children: [
            { id: 'flow-objects', label: 'Flow Objects' },
            { id: 'connecting-objects', label: 'Connecting Objects' },
            { id: 'swimlanes', label: 'Swimlanes' },
            { id: 'artifacts', label: 'Artifacts' }
          ]
        },
        {
          id: 'six-sigma',
          label: 'Six Sigma / DMAIC',
          framework: {
            id: 'six-sigma-dmaic',
            vendor: 'Motorola',
            type: 'methodology'
          },
          children: [
            { id: 'define', label: 'Define' },
            { id: 'measure', label: 'Measure' },
            { id: 'analyze', label: 'Analyze' },
            { id: 'improve', label: 'Improve' },
            { id: 'control', label: 'Control' }
          ]
        },
        {
          id: 'lean',
          label: 'Lean Management',
          framework: {
            id: 'lean-management',
            vendor: 'Toyota',
            type: 'methodology'
          },
          children: [
            { id: 'value-stream', label: 'Value Stream Mapping' },
            { id: '5s', label: '5S Methodology' },
            { id: 'kaizen', label: 'Kaizen' },
            { id: 'kanban', label: 'Kanban' },
            { id: 'waste-elimination', label: 'Waste Elimination' }
          ]
        },
        {
          id: 'iso-9001',
          label: 'ISO 9001:2015',
          framework: {
            id: 'iso-9001-2015',
            vendor: 'ISO',
            type: 'standard',
            version: '2015'
          },
          children: [
            { id: 'context', label: 'Context of Organization' },
            { id: 'leadership', label: 'Leadership' },
            { id: 'planning', label: 'Planning' },
            { id: 'support', label: 'Support' },
            { id: 'operation', label: 'Operation' },
            { id: 'evaluation', label: 'Performance Evaluation' },
            { id: 'improvement', label: 'Improvement' }
          ]
        },
        {
          id: 'pmbok',
          label: 'PMBOK 7th Edition',
          framework: {
            id: 'pmbok-7',
            vendor: 'PMI',
            type: 'standard',
            version: '7'
          },
          children: [
            { id: 'stakeholders', label: 'Stakeholders' },
            { id: 'team', label: 'Team' },
            { id: 'development-approach', label: 'Development Approach' },
            { id: 'planning', label: 'Planning' },
            { id: 'project-work', label: 'Project Work' },
            { id: 'delivery', label: 'Delivery' },
            { id: 'measurement', label: 'Measurement' },
            { id: 'uncertainty', label: 'Uncertainty' }
          ]
        },
        {
          id: 'safe',
          label: 'SAFe',
          framework: {
            id: 'safe-60',
            vendor: 'Scaled Agile',
            type: 'methodology',
            version: '6.0'
          },
          children: [
            { id: 'essential', label: 'Essential SAFe' },
            { id: 'large-solution', label: 'Large Solution SAFe' },
            { id: 'portfolio', label: 'Portfolio SAFe' },
            { id: 'full', label: 'Full SAFe' }
          ]
        },
        {
          id: 'scrum',
          label: 'Scrum',
          framework: {
            id: 'scrum-2020',
            vendor: 'Scrum.org',
            type: 'methodology',
            version: '2020'
          },
          children: [
            { id: 'product-backlog', label: 'Product Backlog' },
            { id: 'sprint-planning', label: 'Sprint Planning' },
            { id: 'daily-scrum', label: 'Daily Scrum' },
            { id: 'sprint-review', label: 'Sprint Review' },
            { id: 'sprint-retrospective', label: 'Sprint Retrospective' }
          ]
        }
      ]
    },
    {
      id: 'it-management',
      label: 'Information & Technology',
      icon: Server,
      dashboardPath: '/it/dashboard',
      children: [
        {
          id: 'itil4',
          label: 'ITIL 4',
          framework: {
            id: 'itil-4',
            vendor: 'Axelos',
            type: 'best-practice',
            version: '4'
          },
          children: [
            { id: 'service-value-system', label: 'Service Value System' },
            { id: 'service-value-chain', label: 'Service Value Chain' },
            { id: 'practices', label: 'Practices',
              children: [
                { id: 'general-practices', label: 'General Management Practices' },
                { id: 'service-practices', label: 'Service Management Practices' },
                { id: 'technical-practices', label: 'Technical Management Practices' }
              ]
            }
          ]
        },
        {
          id: 'aws-waf',
          label: 'AWS Well-Architected',
          framework: {
            id: 'aws-waf',
            vendor: 'AWS',
            type: 'best-practice'
          },
          children: [
            { id: 'operational-excellence', label: 'Operational Excellence' },
            { id: 'security', label: 'Security' },
            { id: 'reliability', label: 'Reliability' },
            { id: 'performance', label: 'Performance Efficiency' },
            { id: 'cost-optimization', label: 'Cost Optimization' },
            { id: 'sustainability', label: 'Sustainability' }
          ]
        },
        {
          id: 'azure-caf',
          label: 'Azure Cloud Adoption',
          framework: {
            id: 'azure-caf',
            vendor: 'Microsoft',
            type: 'methodology'
          },
          children: [
            { id: 'strategy', label: 'Strategy' },
            { id: 'plan', label: 'Plan' },
            { id: 'ready', label: 'Ready' },
            { id: 'adopt', label: 'Adopt' },
            { id: 'govern', label: 'Govern' },
            { id: 'manage', label: 'Manage' }
          ]
        },
        {
          id: 'dama-dmbok',
          label: 'DAMA-DMBOK 2.0',
          framework: {
            id: 'dama-dmbok-2',
            vendor: 'DAMA',
            type: 'standard',
            version: '2.0'
          },
          children: [
            { id: 'data-governance', label: 'Data Governance' },
            { id: 'data-architecture', label: 'Data Architecture' },
            { id: 'data-modeling', label: 'Data Modeling & Design' },
            { id: 'data-storage', label: 'Data Storage & Operations' },
            { id: 'data-security', label: 'Data Security' },
            { id: 'data-integration', label: 'Data Integration & Interoperability' },
            { id: 'master-data', label: 'Reference & Master Data' },
            { id: 'data-warehousing', label: 'Data Warehousing & BI' },
            { id: 'metadata', label: 'Metadata' },
            { id: 'data-quality', label: 'Data Quality' }
          ]
        },
        {
          id: '12-factor',
          label: '12-Factor App',
          framework: {
            id: '12-factor-app',
            vendor: 'Heroku',
            type: 'best-practice'
          },
          children: [
            { id: 'codebase', label: 'Codebase' },
            { id: 'dependencies', label: 'Dependencies' },
            { id: 'config', label: 'Config' },
            { id: 'backing-services', label: 'Backing Services' },
            { id: 'build-release-run', label: 'Build, Release, Run' },
            { id: 'processes', label: 'Processes' },
            { id: 'port-binding', label: 'Port Binding' },
            { id: 'concurrency', label: 'Concurrency' },
            { id: 'disposability', label: 'Disposability' },
            { id: 'dev-prod-parity', label: 'Dev/Prod Parity' },
            { id: 'logs', label: 'Logs' },
            { id: 'admin-processes', label: 'Admin Processes' }
          ]
        }
      ]
    }
  ],
  
  industrySpecific: [
    {
      id: 'financial-services',
      label: 'Financial Services',
      icon: Landmark,
      dashboardPath: '/industry/finserv/dashboard',
      children: [
        {
          id: 'bian',
          label: 'BIAN',
          framework: {
            id: 'bian',
            vendor: 'BIAN',
            type: 'reference-model'
          }
        },
        {
          id: 'basel',
          label: 'Basel III/IV',
          framework: {
            id: 'basel-3-4',
            vendor: 'BIS',
            type: 'regulation'
          }
        }
      ]
    },
    {
      id: 'healthcare',
      label: 'Healthcare',
      icon: Heart,
      dashboardPath: '/industry/healthcare/dashboard',
      children: [
        {
          id: 'hl7-fhir',
          label: 'HL7 FHIR',
          framework: {
            id: 'hl7-fhir',
            vendor: 'HL7',
            type: 'standard'
          }
        },
        {
          id: 'himss-emram',
          label: 'HIMSS EMRAM',
          framework: {
            id: 'himss-emram',
            vendor: 'HIMSS',
            type: 'maturity-model'
          }
        }
      ]
    },
    {
      id: 'manufacturing',
      label: 'Manufacturing',
      icon: Factory,
      dashboardPath: '/industry/manufacturing/dashboard',
      children: [
        {
          id: 'isa-95',
          label: 'ISA-95',
          framework: {
            id: 'isa-95',
            vendor: 'ISA',
            type: 'standard'
          }
        },
        {
          id: 'scor',
          label: 'SCOR',
          framework: {
            id: 'scor-model',
            vendor: 'ASCM',
            type: 'reference-model'
          }
        }
      ]
    }
  ],
  
  crossCutting: [
    {
      id: 'technology-portfolio',
      label: 'Technology Portfolio',
      icon: Layers,
      dashboardPath: '/portfolio/dashboard',
      children: [
        { id: 'applications', label: 'Application Inventory' },
        { id: 'infrastructure', label: 'Infrastructure Inventory' },
        { id: 'integrations', label: 'Integration Architecture' },
        { id: 'tech-radar', label: 'Technology Radar' }
      ]
    },
    {
      id: 'cost-finops',
      label: 'Cost & FinOps',
      icon: Calculator,
      dashboardPath: '/cost/dashboard',
      children: [
        {
          id: 'finops',
          label: 'FinOps Framework',
          framework: {
            id: 'finops-framework',
            vendor: 'FinOps Foundation',
            type: 'methodology'
          },
          children: [
            { id: 'inform', label: 'Inform' },
            { id: 'optimize', label: 'Optimize' },
            { id: 'operate', label: 'Operate' }
          ]
        },
        { id: 'software-spend', label: 'Software Spend Analysis' },
        { id: 'infrastructure-costs', label: 'Infrastructure Costs' },
        { id: 'optimization', label: 'Cost Optimization' }
      ]
    },
    {
      id: 'sustainability',
      label: 'Sustainability & ESG',
      icon: Leaf,
      dashboardPath: '/esg/dashboard',
      children: [
        {
          id: 'gri',
          label: 'GRI Standards',
          framework: {
            id: 'gri-standards',
            vendor: 'GRI',
            type: 'standard'
          }
        },
        {
          id: 'sasb',
          label: 'SASB Standards',
          framework: {
            id: 'sasb-standards',
            vendor: 'SASB',
            type: 'standard'
          }
        },
        {
          id: 'tcfd',
          label: 'TCFD',
          framework: {
            id: 'tcfd',
            vendor: 'TCFD',
            type: 'best-practice'
          }
        }
      ]
    }
  ],
  
  administration: [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      dashboardPath: '/settings/dashboard',
      children: [
        { id: 'organization', label: 'Organization Profile' },
        { id: 'users', label: 'User Management' },
        { id: 'roles', label: 'Roles & Permissions' },
        { id: 'marketplace', label: 'Framework Marketplace' },
        { id: 'integrations', label: 'API & Integrations' },
        { id: 'preferences', label: 'Preferences' }
      ]
    },
    {
      id: 'help',
      label: 'Help & Learning',
      icon: HelpCircle,
      dashboardPath: '/help/dashboard',
      children: [
        { id: 'getting-started', label: 'Getting Started' },
        { id: 'documentation', label: 'Framework Documentation' },
        { id: 'videos', label: 'Video Library' },
        { id: 'certifications', label: 'Certification Paths' },
        { id: 'community', label: 'Community Forum' },
        { id: 'support', label: 'Support Tickets' }
      ]
    }
  ]
}
```

---

## 6. Dashboard Design Specifications

### 6.1 Universal Dashboard Layout

Every Parent section uses a consistent dashboard layout with these components:

```typescript
interface ParentDashboard {
  header: DashboardHeader;
  statsRow: StatCard[];
  quickActions: QuickAction[];
  tabs: DashboardTab[];
  mainContent: DashboardContent;
  sidebar?: DashboardSidebar;
}

interface DashboardHeader {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
  actions: HeaderAction[];
  filters?: FilterGroup[];
}

interface StatCard {
  id: string;
  label: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
    period: string;
  };
  icon: LucideIcon;
  color: string;
  href?: string;
}

interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  action: ActionType;
  variant?: 'default' | 'primary' | 'secondary';
  requiresPermission?: string;
}

type ActionType = 
  | 'add-framework'
  | 'run-assessment'
  | 'generate-report'
  | 'export-data'
  | 'import-data'
  | 'configure-settings';
```

### 6.2 Framework Dashboard Tabs

Each framework dashboard includes these standard tabs:

```typescript
const standardTabs: DashboardTab[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
    content: {
      type: 'overview',
      widgets: [
        'completion-progress',
        'maturity-gauge',
        'recent-activity',
        'upcoming-milestones',
        'team-assignments',
        'gap-summary'
      ]
    }
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    icon: BookOpen,
    content: {
      type: 'frameworks',
      widgets: [
        'framework-comparison-table',
        'framework-status-chart',
        'framework-relationships',
        'activation-timeline'
      ]
    }
  },
  {
    id: 'assessments',
    label: 'Assessments',
    icon: ClipboardCheck,
    content: {
      type: 'assessments',
      widgets: [
        'assessment-history',
        'maturity-heatmap',
        'gap-analysis-chart',
        'assessment-schedule'
      ]
    }
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    content: {
      type: 'reports',
      widgets: [
        'report-library',
        'scheduled-reports',
        'report-templates'
      ]
    }
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    content: {
      type: 'analytics',
      widgets: [
        'trend-analysis',
        'comparative-analytics',
        'predictive-insights',
        'benchmark-comparison'
      ]
    }
  }
]
```

### 6.3 Framework Comparison Table Component

```typescript
interface FrameworkTableConfig {
  columns: FrameworkTableColumn[];
  grouping?: {
    enabled: boolean;
    groupBy: 'status' | 'category' | 'priority' | 'department';
  };
  sorting: {
    enabled: boolean;
    defaultSort: { column: string; direction: 'asc' | 'desc' };
  };
  filtering: {
    enabled: boolean;
    filters: TableFilter[];
  };
  actions: RowAction[];
}

interface FrameworkTableColumn {
  id: string;
  header: string;
  accessorKey: string;
  cell?: (value: any, row: FrameworkTableRow) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
}

interface FrameworkTableRow {
  id: string;
  frameworkName: string;
  frameworkIcon: LucideIcon;
  vendor: string;
  status: FrameworkStatus;
  completion: number;
  maturity: number;
  lastUpdated: Date;
  assignedTo: User[];
  riskLevel: RiskLevel;
  gapCount: number;
  nextMilestone?: Milestone;
  actions: RowAction[];
}

type FrameworkStatus = 
  | 'active'
  | 'in-setup'
  | 'inactive'
  | 'archived';

type RiskLevel = 
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';

interface RowAction {
  id: string;
  label: string;
  icon: LucideIcon;
  action: (row: FrameworkTableRow) => void;
  variant?: 'default' | 'destructive';
  requiresPermission?: string;
}
```

### 6.4 Standard Widget Specifications

#### 6.4.1 Completion Progress Widget
```typescript
interface CompletionProgressWidget {
  type: 'completion-progress';
  data: {
    overall: number;
    byFramework: FrameworkProgress[];
    byCategory: CategoryProgress[];
  };
  visualization: 'ring-chart' | 'bar-chart' | 'progress-bars';
  config: {
    showTrend: boolean;
    showTargetDate: boolean;
    showComparison: boolean;
  };
}
```

#### 6.4.2 Maturity Gauge Widget
```typescript
interface MaturityGaugeWidget {
  type: 'maturity-gauge';
  data: {
    currentLevel: 1 | 2 | 3 | 4 | 5;
    targetLevel: 1 | 2 | 3 | 4 | 5;
    byDomain: DomainMaturity[];
  };
  visualization: 'gauge' | 'radar-chart' | 'stepped-progress';
  config: {
    showIndustryBenchmark: boolean;
    showPeerComparison: boolean;
  };
}
```

#### 6.4.3 Gap Analysis Chart Widget
```typescript
interface GapAnalysisWidget {
  type: 'gap-analysis';
  data: {
    gaps: Gap[];
    byPriority: GapsByPriority;
    byFramework: GapsByFramework;
    trend: GapTrend[];
  };
  visualization: 'heatmap' | 'bubble-chart' | 'sankey';
  config: {
    groupBy: 'priority' | 'framework' | 'category';
    showRemediation: boolean;
  };
}

interface Gap {
  id: string;
  frameworkId: string;
  componentId: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'identified' | 'in-progress' | 'resolved' | 'accepted';
  assignedTo?: string;
  dueDate?: Date;
  remediationPlan?: string;
}
```

#### 6.4.4 Framework Relationship Visualization
```typescript
interface FrameworkRelationshipWidget {
  type: 'framework-relationships';
  data: {
    frameworks: Framework[];
    relationships: FrameworkRelationship[];
  };
  visualization: 'network-graph' | 'sankey' | 'chord-diagram';
  config: {
    showOverlapPercentage: boolean;
    highlightConflicts: boolean;
    filterByRelationType: RelationshipType[];
  };
}
```

### 6.5 Drawer Modal Specifications

#### 6.5.1 Add Framework Drawer
```typescript
interface AddFrameworkDrawer {
  type: 'drawer';
  size: 'lg'; // 600px width
  steps: DrawerStep[];
  
  steps: [
    {
      id: 'search-browse',
      title: 'Find Framework',
      content: {
        searchBar: true;
        categories: FrameworkCategory[];
        recommendations: Framework[];
        popularFrameworks: Framework[];
      }
    },
    {
      id: 'framework-details',
      title: 'Framework Details',
      content: {
        overview: FrameworkOverview;
        components: FrameworkComponent[];
        requirements: FrameworkRequirements;
        estimatedEffort: string;
      }
    },
    {
      id: 'configuration',
      title: 'Configuration',
      content: {
        scope: ScopeSelection;
        team: TeamAssignment;
        timeline: TimelineSetup;
        integrations: IntegrationConfig;
      }
    },
    {
      id: 'review-activate',
      title: 'Review & Activate',
      content: {
        summary: ConfigurationSummary;
        checklist: ActivationChecklist;
        actions: ['activate', 'save-draft', 'cancel'];
      }
    }
  ]
}
```

#### 6.5.2 Assessment Wizard Drawer
```typescript
interface AssessmentWizardDrawer {
  type: 'drawer';
  size: 'xl'; // 800px width
  steps: [
    {
      id: 'select-framework',
      title: 'Select Framework',
      content: {
        frameworkSelector: true;
        assessmentType: 'initial' | 'periodic' | 'targeted';
      }
    },
    {
      id: 'assessment-questions',
      title: 'Assessment',
      content: {
        questionGroups: QuestionGroup[];
        progressIndicator: true;
        saveProgress: true;
      }
    },
    {
      id: 'evidence-upload',
      title: 'Upload Evidence',
      content: {
        fileUpload: true;
        documentLinks: true;
        notes: true;
      }
    },
    {
      id: 'results',
      title: 'Results',
      content: {
        maturityScore: MaturityScore;
        gaps: Gap[];
        recommendations: Recommendation[];
        reportGeneration: true;
      }
    }
  ]
}
```

#### 6.5.3 Framework Configuration Drawer
```typescript
interface ConfigureFrameworkDrawer {
  type: 'drawer';
  size: 'lg';
  tabs: [
    {
      id: 'general',
      label: 'General',
      fields: [
        { id: 'name', type: 'text', label: 'Framework Name' },
        { id: 'description', type: 'textarea', label: 'Description' },
        { id: 'priority', type: 'select', label: 'Priority' },
        { id: 'targetDate', type: 'date', label: 'Target Completion' }
      ]
    },
    {
      id: 'scope',
      label: 'Scope',
      fields: [
        { id: 'departments', type: 'multi-select', label: 'Departments' },
        { id: 'locations', type: 'multi-select', label: 'Locations' },
        { id: 'components', type: 'checklist', label: 'Components to Include' }
      ]
    },
    {
      id: 'team',
      label: 'Team',
      fields: [
        { id: 'owner', type: 'user-select', label: 'Framework Owner' },
        { id: 'team', type: 'user-multi-select', label: 'Team Members' },
        { id: 'reviewers', type: 'user-multi-select', label: 'Reviewers' }
      ]
    },
    {
      id: 'notifications',
      label: 'Notifications',
      fields: [
        { id: 'milestones', type: 'toggle', label: 'Milestone Notifications' },
        { id: 'gaps', type: 'toggle', label: 'Gap Alerts' },
        { id: 'assessments', type: 'toggle', label: 'Assessment Reminders' }
      ]
    }
  ]
}
```

### 6.6 Table Group Specifications

Tables support grouping and expandable rows:

```typescript
interface TableGroupConfig {
  enabled: boolean;
  groupBy: GroupByOption;
  expandable: boolean;
  showGroupSummary: boolean;
  defaultExpanded?: boolean;
}

type GroupByOption = 
  | 'status'
  | 'category'
  | 'priority'
  | 'department'
  | 'risk-level'
  | 'maturity-level';

interface GroupedTableRow {
  groupHeader: {
    label: string;
    count: number;
    summary?: GroupSummary;
    isExpanded: boolean;
  };
  rows: FrameworkTableRow[];
}

interface GroupSummary {
  avgCompletion: number;
  avgMaturity: number;
  totalGaps: number;
  highRiskCount: number;
}
```

---

## 7. Feature Requirements

### 7.1 Framework Discovery & Selection

**FR-7.1.1: Framework Marketplace**
- Browse all available frameworks by category
- Search frameworks by name, vendor, or keywords
- Filter by industry, difficulty, type, applicability
- View framework details: description, components, requirements, effort estimate
- See recommended frameworks based on user profile and goals
- Compare up to 3 frameworks side-by-side

**FR-7.1.2: Framework Activation Flow**
```typescript
// Multi-step framework activation
interface ActivationFlow {
  steps: [
    'discovery',      // Browse/search frameworks
    'details',        // View framework details
    'configuration',  // Configure scope, team, timeline
    'review',         // Review configuration
    'activate'        // Activate framework
  ];
  
  canSaveDraft: boolean;  // Save partial configuration
  requiresApproval: boolean;  // Some orgs may require approval
  notifyTeam: boolean;  // Notify assigned team members
}
```

**FR-7.1.3: Bulk Framework Activation**
- Select multiple related frameworks at once
- Auto-detect and configure relationships
- Bulk assign teams and timelines
- Generate combined implementation roadmap

### 7.2 Framework Management

**FR-7.2.1: Framework Status Management**
```typescript
type FrameworkLifecycle = 
  | 'draft'           // Configured but not activated
  | 'active'          // Currently in use
  | 'on-hold'         // Temporarily paused
  | 'completed'       // Fully implemented
  | 'archived'        // Historical record
  | 'deprecated';     // No longer relevant

// State transitions
const allowedTransitions: Record<FrameworkLifecycle, FrameworkLifecycle[]> = {
  'draft': ['active', 'archived'],
  'active': ['on-hold', 'completed', 'archived'],
  'on-hold': ['active', 'archived'],
  'completed': ['active', 'archived'],  // Can reactivate if needed
  'archived': ['active'],  // Can restore
  'deprecated': []  // Terminal state
}
```

**FR-7.2.2: Framework Configuration**
- Configure which components to include/exclude
- Set component-level owners and due dates
- Define custom maturity levels and criteria
- Map to existing processes and controls
- Configure integrations with external tools

**FR-7.2.3: Framework Relationships**
- Automatically detect overlapping requirements
- Show conflict warnings (e.g., contradictory controls)
- Suggest consolidation opportunities
- Map equivalent controls across frameworks
- Generate compliance coverage matrix

### 7.3 Assessment & Maturity Tracking

**FR-7.3.1: Assessment Types**
```typescript
type AssessmentType = 
  | 'initial'         // First assessment
  | 'periodic'        // Scheduled reassessment
  | 'targeted'        // Specific component/control
  | 'self'            // Self-assessment
  | 'audited'         // External audit
  | 'continuous';     // Automated monitoring

interface AssessmentConfig {
  frameworkId: string;
  type: AssessmentType;
  scope: AssessmentScope;
  schedule?: AssessmentSchedule;
  methodology: AssessmentMethodology;
  evidenceRequirements: EvidenceRequirement[];
}

interface AssessmentScope {
  components: string[];  // Which components to assess
  departments?: string[];
  locations?: string[];
  systems?: string[];
}
```

**FR-7.3.2: Maturity Scoring**
```typescript
interface MaturityScore {
  overall: 1 | 2 | 3 | 4 | 5;
  byComponent: Record<string, number>;
  byCategory: Record<string, number>;
  
  // Maturity level definitions (configurable per framework)
  levels: {
    1: { label: 'Initial/Ad-hoc', description: string };
    2: { label: 'Repeatable', description: string };
    3: { label: 'Defined', description: string };
    4: { label: 'Managed', description: string };
    5: { label: 'Optimizing', description: string };
  };
  
  // Scoring methodology
  methodology: 'average' | 'weighted' | 'min' | 'custom';
  weights?: Record<string, number>;
}
```

**FR-7.3.3: Gap Identification & Tracking**
```typescript
interface Gap {
  id: string;
  frameworkId: string;
  componentId: string;
  
  // Gap details
  type: 'missing-control' | 'partial-implementation' | 'documentation-gap' | 'process-gap';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  
  // Remediation
  status: 'identified' | 'planned' | 'in-progress' | 'resolved' | 'accepted';
  remediationPlan?: RemediationPlan;
  assignedTo?: string;
  dueDate?: Date;
  estimatedEffort?: string;
  
  // Evidence
  evidence?: Evidence[];
  verificationMethod?: string;
  
  // History
  identifiedDate: Date;
  resolvedDate?: Date;
  history: GapHistoryEntry[];
}

interface RemediationPlan {
  description: string;
  steps: RemediationStep[];
  resources: Resource[];
  milestones: Milestone[];
  cost?: number;
  riskOfNotAddressing?: string;
}
```

### 7.4 Cross-Framework Intelligence

**FR-7.4.1: Overlap Detection**
```typescript
interface OverlapAnalysis {
  frameworkIds: string[];
  
  // Component-level overlaps
  overlaps: ComponentOverlap[];
  overlapPercentage: number;
  
  // Efficiency opportunities
  sharedControls: SharedControl[];
  consolidationOpportunities: ConsolidationOpportunity[];
  
  // Conflict detection
  conflicts: FrameworkConflict[];
}

interface ComponentOverlap {
  framework1: { id: string; componentId: string };
  framework2: { id: string; componentId: string };
  overlapType: 'equivalent' | 'partial' | 'complementary';
  similarity: number; // 0-1
  recommendation: string;
}

interface SharedControl {
  controlId: string;
  frameworks: string[];
  description: string;
  implementationStatus: Record<string, ControlStatus>;
  canConsolidate: boolean;
}

interface FrameworkConflict {
  framework1Id: string;
  framework2Id: string;
  conflictType: 'contradictory-requirement' | 'incompatible-process' | 'competing-priority';
  description: string;
  severity: 'low' | 'medium' | 'high';
  resolutionOptions: string[];
}
```

**FR-7.4.2: Compliance Coverage Matrix**
```typescript
interface ComplianceCoverageMatrix {
  requirements: ComplianceRequirement[];
  frameworks: Framework[];
  
  // Matrix showing which frameworks cover which requirements
  coverage: Record<string, Record<string, CoverageStatus>>;
  
  // Analysis
  fullyCovered: string[];  // Requirement IDs
  partiallyCovered: string[];
  notCovered: string[];
  
  // Recommendations
  recommendations: CoverageRecommendation[];
}

type CoverageStatus = 
  | 'full'      // Requirement fully covered
  | 'partial'   // Partially covered
  | 'none'      // Not covered
  | 'excess';   // Over-covered (opportunity to simplify)

interface ComplianceRequirement {
  id: string;
  source: 'regulation' | 'contract' | 'policy' | 'standard';
  description: string;
  mandatory: boolean;
  dueDate?: Date;
}
```

**FR-7.4.3: Framework Recommendation Engine**
```typescript
interface RecommendationEngine {
  // Analyze current state
  analyzeProfile(profile: UserFrameworkProfile): FrameworkRecommendation[];
  
  // Recommend based on goals
  recommendForGoals(goals: TransformationGoal[]): FrameworkRecommendation[];
  
  // Suggest complementary frameworks
  suggestComplementary(activeFrameworks: string[]): FrameworkRecommendation[];
  
  // Identify redundancies
  identifyRedundancies(activeFrameworks: string[]): RedundancyAnalysis;
}

interface FrameworkRecommendation {
  frameworkId: string;
  reason: RecommendationReason;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedBenefit: string;
  estimatedEffort: string;
  prerequisites?: string[];
  alternatives?: string[];
}

type RecommendationReason = 
  | 'fills-gap'
  | 'industry-standard'
  | 'regulatory-requirement'
  | 'complements-existing'
  | 'peer-benchmark'
  | 'goal-alignment';
```

### 7.5 Reporting & Analytics

**FR-7.5.1: Standard Report Types**
```typescript
type ReportType = 
  | 'framework-status'       // Current status across all frameworks
  | 'maturity-assessment'    // Maturity levels and trends
  | 'gap-analysis'           // Identified gaps and remediation status
  | 'compliance-summary'     // Compliance posture
  | 'executive-summary'      // High-level overview for leadership
  | 'audit-report'           // Detailed audit trail
  | 'benchmark-comparison'   // Compare to industry benchmarks
  | 'roi-analysis'          // Return on investment
  | 'roadmap';              // Implementation roadmap

interface ReportConfig {
  type: ReportType;
  frameworkIds?: string[];  // Specific frameworks or all
  dateRange?: DateRange;
  includeCharts: boolean;
  includeRawData: boolean;
  format: 'pdf' | 'excel' | 'html' | 'json';
  schedule?: ReportSchedule;
}
```

**FR-7.5.2: Dashboard Analytics**
```typescript
interface AnalyticsWidget {
  // Trend analysis
  completionTrend: TimeSeries;
  maturityTrend: TimeSeries;
  gapTrend: TimeSeries;
  
  // Comparative analysis
  frameworkComparison: ComparisonChart;
  departmentComparison: ComparisonChart;
  periodComparison: ComparisonChart;
  
  // Predictive insights
  completionForecast: Forecast;
  riskProjection: RiskProjection;
  effortEstimate: EffortEstimate;
  
  // Benchmarking
  industryBenchmark: BenchmarkData;
  peerComparison: PeerComparisonData;
}

interface Forecast {
  metric: string;
  currentValue: number;
  projectedValue: number;
  projectionDate: Date;
  confidence: number; // 0-1
  factors: ForecastFactor[];
}
```

**FR-7.5.3: Export & Integration**
- Export all framework data (JSON, CSV, Excel)
- Generate PDF reports with custom branding
- API access to all framework data
- Webhook notifications for key events
- Integration with GRC tools (Archer, ServiceNow GRC, etc.)
- Integration with audit management tools

### 7.6 Collaboration & Workflow

**FR-7.6.1: Team Collaboration**
```typescript
interface CollaborationFeatures {
  // Assignments
  assignFrameworkOwner(frameworkId: string, userId: string): void;
  assignComponentOwner(componentId: string, userId: string): void;
  assignGapRemediation(gapId: string, userId: string): void;
  
  // Comments & Discussion
  addComment(targetId: string, comment: Comment): void;
  mentionUser(userId: string): void;
  tagDiscussion(tags: string[]): void;
  
  // Activity feed
  getActivityFeed(filters: ActivityFilter): Activity[];
  
  // Notifications
  notifyOnMilestone(milestoneId: string): void;
  notifyOnGap(gapId: string): void;
  notifyOnAssessment(assessmentId: string): void;
}

interface Comment {
  id: string;
  userId: string;
  targetType: 'framework' | 'component' | 'gap' | 'assessment';
  targetId: string;
  content: string;
  mentions: string[];
  attachments?: File[];
  createdAt: Date;
}
```

**FR-7.6.2: Approval Workflows**
```typescript
interface ApprovalWorkflow {
  trigger: WorkflowTrigger;
  approvers: Approver[];
  stages: ApprovalStage[];
  notifications: NotificationConfig;
}

type WorkflowTrigger = 
  | 'framework-activation'
  | 'assessment-completion'
  | 'gap-acceptance'
  | 'high-risk-finding';

interface ApprovalStage {
  id: string;
  name: string;
  approvers: string[];  // User IDs
  type: 'any' | 'all' | 'majority';
  timeoutDays?: number;
  escalationTo?: string;
}
```

---

## 8. Implementation Phases

### Phase 1: Foundation & Core Dashboard (Week 1-3)
- [ ] Set up framework data models and database schema
- [ ] Implement base dashboard layout component
- [ ] Create reusable widget components (cards, charts, tables)
- [ ] Build sidebar navigation with framework hierarchy
- [ ] Implement basic framework CRUD operations
- [ ] Create framework marketplace UI

### Phase 2: Framework Management (Week 4-6)
- [ ] Build framework activation flow (multi-step drawer)
- [ ] Implement framework configuration
- [ ] Create framework relationship detection
- [ ] Build overlap analysis engine
- [ ] Implement framework status management
- [ ] Add bulk operations

### Phase 3: Assessment System (Week 7-9)
- [ ] Create assessment wizard
- [ ] Implement maturity scoring engine
- [ ] Build gap identification and tracking
- [ ] Create evidence upload and management
- [ ] Implement assessment scheduling
- [ ] Add assessment history and versioning

### Phase 4: Dashboard & Visualization (Week 10-12)
- [ ] Implement all standard widgets
- [ ] Create chart components (Recharts integration)
- [ ] Build table with grouping and filtering
- [ ] Implement drawer modals for all actions
- [ ] Create customizable dashboard layouts
- [ ] Add export functionality

### Phase 5: Intelligence & Analytics (Week 13-15)
- [ ] Build cross-framework overlap detection
- [ ] Implement compliance coverage matrix
- [ ] Create framework recommendation engine
- [ ] Add predictive analytics
- [ ] Implement benchmark comparisons
- [ ] Build industry-specific insights

### Phase 6: Collaboration & Reporting (Week 16-18)
- [ ] Implement team assignments and notifications
- [ ] Add commenting and mentions
- [ ] Create activity feed
- [ ] Build approval workflows
- [ ] Implement report generation
- [ ] Add scheduled reporting

### Phase 7: Polish & Optimization (Week 19-20)
- [ ] Performance optimization (virtualization, lazy loading)
- [ ] Accessibility audit and fixes
- [ ] Responsive design refinement
- [ ] Error handling and edge cases
- [ ] User onboarding flow
- [ ] Documentation

### Phase 8: Testing & Launch (Week 21-22)
- [ ] Comprehensive testing (unit, integration, E2E)
- [ ] User acceptance testing
- [ ] Performance benchmarking
- [ ] Security audit
- [ ] Production deployment
- [ ] Post-launch monitoring

---

## 9. API Requirements

### 9.1 Framework Endpoints

```typescript
// GET /api/frameworks
interface GetFrameworksRequest {
  category?: FrameworkCategory;
  type?: FrameworkType;
  industry?: Industry;
  search?: string;
  limit?: number;
  offset?: number;
}

interface GetFrameworksResponse {
  frameworks: Framework[];
  total: number;
  facets: {
    categories: { value: string; count: number }[];
    types: { value: string; count: number }[];
    vendors: { value: string; count: number }[];
  };
}

// GET /api/frameworks/:id
interface GetFrameworkResponse {
  framework: Framework;
  relationships: FrameworkRelationship[];
  statistics: FrameworkStatistics;
}

// POST /api/frameworks/activate
interface ActivateFrameworkRequest {
  frameworkId: string;
  configuration: FrameworkConfiguration;
  team: TeamAssignment;
  timeline: Timeline;
}

// PUT /api/frameworks/:id/status
interface UpdateFrameworkStatusRequest {
  status: FrameworkLifecycle;
  reason?: string;
}

// GET /api/frameworks/:id/progress
interface GetFrameworkProgressResponse {
  progress: FrameworkProgress;
  timeline: Milestone[];
  blockers: Blocker[];
}
```

### 9.2 Dashboard Endpoints

```typescript
// GET /api/dashboards/:parentId
interface GetDashboardRequest {
  parentId: string;
  dateRange?: DateRange;
  filters?: DashboardFilter[];
}

interface GetDashboardResponse {
  config: DashboardConfig;
  data: {
    stats: StatCardData[];
    widgets: Record<string, WidgetData>;
    frameworks: FrameworkTableRow[];
  };
}

// GET /api/dashboards/:parentId/widgets/:widgetId
interface GetWidgetDataRequest {
  widgetId: string;
  params?: WidgetParams;
}

interface GetWidgetDataResponse {
  data: any;  // Widget-specific data structure
  lastUpdated: Date;
}

// POST /api/dashboards/custom
interface CreateCustomDashboardRequest {
  name: string;
  layout: DashboardLayout;
  widgets: DashboardWidget[];
  filters: DashboardFilter[];
}
```

### 9.3 Assessment Endpoints

```typescript
// POST /api/assessments
interface CreateAssessmentRequest {
  frameworkId: string;
  type: AssessmentType;
  scope: AssessmentScope;
  config: AssessmentConfig;
}

// GET /api/assessments/:id/questions
interface GetAssessmentQuestionsResponse {
  questions: AssessmentQuestion[];
  progress: AssessmentProgress;
}

// POST /api/assessments/:id/responses
interface SubmitAssessmentResponsesRequest {
  responses: AssessmentResponse[];
  evidence?: Evidence[];
}

// GET /api/assessments/:id/results
interface GetAssessmentResultsResponse {
  maturityScore: MaturityScore;
  gaps: Gap[];
  recommendations: Recommendation[];
  report: AssessmentReport;
}

// GET /api/assessments/schedule
interface GetAssessmentScheduleResponse {
  upcoming: ScheduledAssessment[];
  overdue: ScheduledAssessment[];
  completed: AssessmentSummary[];
}
```

### 9.4 Analytics Endpoints

```typescript
// GET /api/analytics/overlap
interface GetOverlapAnalysisRequest {
  frameworkIds: string[];
}

interface GetOverlapAnalysisResponse {
  analysis: OverlapAnalysis;
  visualizations: {
    networkGraph: NetworkGraphData;
    matrix: MatrixData;
  };
}

// GET /api/analytics/coverage
interface GetCoveragematrixResponse {
  matrix: ComplianceCoverageMatrix;
  gaps: string[];
  redundancies: string[];
}

// GET /api/analytics/trends
interface GetTrendsRequest {
  metric: string;
  frameworkIds?: string[];
  dateRange: DateRange;
  granularity: 'day' | 'week' | 'month';
}

interface GetTrendsResponse {
  data: TimeSeries;
  forecast?: Forecast;
}

// GET /api/analytics/recommendations
interface GetRecommendationsResponse {
  recommendations: FrameworkRecommendation[];
  reasoning: Record<string, RecommendationReasoning>;
}
```

### 9.5 Reporting Endpoints

```typescript
// POST /api/reports/generate
interface GenerateReportRequest {
  type: ReportType;
  config: ReportConfig;
  recipients?: string[];
}

interface GenerateReportResponse {
  reportId: string;
  status: 'generating' | 'ready' | 'failed';
  downloadUrl?: string;
  estimatedTime?: number;
}

// GET /api/reports/:id
interface GetReportResponse {
  report: Report;
  downloadUrl: string;
  expiresAt: Date;
}

// POST /api/reports/schedule
interface ScheduleReportRequest {
  config: ReportConfig;
  schedule: ReportSchedule;
  recipients: string[];
}
```

---

## 10. Testing Requirements

### 10.1 Unit Tests

```typescript
describe('Framework Management', () => {
  describe('Framework Activation', () => {
    it('activates framework with valid configuration', () => {})
    it('validates required configuration fields', () => {})
    it('detects relationships with existing frameworks', () => {})
    it('prevents duplicate framework activation', () => {})
  })
  
  describe('Framework Progress', () => {
    it('calculates completion percentage correctly', () => {})
    it('updates maturity level based on assessments', () => {})
    it('tracks component-level progress', () => {})
  })
  
  describe('Overlap Detection', () => {
    it('identifies equivalent components across frameworks', () => {})
    it('calculates overlap percentage', () => {})
    it('detects framework conflicts', () => {})
  })
})

describe('Dashboard Components', () => {
  describe('Framework Table', () => {
    it('renders frameworks with correct data', () => {})
    it('supports grouping by status', () => {})
    it('filters frameworks by category', () => {})
    it('sorts by completion percentage', () => {})
  })
  
  describe('Widgets', () => {
    it('renders completion progress widget', () => {})
    it('renders maturity gauge widget', () => {})
    it('renders gap analysis chart', () => {})
    it('updates widget data on filter change', () => {})
  })
})
```

### 10.2 Integration Tests

```typescript
describe('Framework Workflow', () => {
  it('completes full framework activation flow', async () => {
    // 1. Browse frameworks
    // 2. View framework details
    // 3. Configure framework
    // 4. Activate framework
    // 5. Verify dashboard updates
  })
  
  it('performs assessment and generates gaps', async () => {
    // 1. Start assessment
    // 2. Answer questions
    // 3. Upload evidence
    // 4. Complete assessment
    // 5. Verify maturity score
    // 6. Verify gaps created
  })
  
  it('generates and exports report', async () => {
    // 1. Configure report
    // 2. Generate report
    // 3. Download report
    // 4. Verify report content
  })
})
```

### 10.3 E2E Tests

```typescript
describe('User Journeys', () => {
  it('new user activates first framework', () => {
    // Onboarding through first framework activation
  })
  
  it('user conducts maturity assessment', () => {
    // Complete assessment workflow
  })
  
  it('user views cross-framework analytics', () => {
    // Navigate to analytics, interact with visualizations
  })
  
  it('user generates compliance report', () => {
    // Configure and generate report
  })
})
```

### 10.4 Performance Tests

```typescript
describe('Performance', () => {
  it('loads dashboard with 50+ frameworks < 2s', () => {})
  it('renders table with 500+ rows < 1s', () => {})
  it('calculates overlap analysis < 3s', () => {})
  it('generates report < 5s', () => {})
})
```

---

## 11. Success Criteria

### 11.1 Functional Completeness
- [ ] All framework CRUD operations working
- [ ] Framework marketplace functional
- [ ] Dashboard displays all widgets correctly
- [ ] Assessment wizard complete and functional
- [ ] Gap tracking operational
- [ ] Cross-framework analytics working
- [ ] Report generation functional
- [ ] All drawer modals implemented

### 11.2 Performance Benchmarks
- [ ] Dashboard load time < 2s
- [ ] Framework table render < 1s with 500+ rows
- [ ] Widget updates < 500ms
- [ ] Search results < 300ms
- [ ] Overlap analysis < 3s
- [ ] Report generation < 5s

### 11.3 Quality Gates
- [ ] 85%+ code coverage
- [ ] Zero critical accessibility violations
- [ ] All E2E critical paths passing
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness working (≥768px)
- [ ] Security audit passed

### 11.4 User Acceptance
- [ ] Framework activation rate ≥70%
- [ ] Dashboard engagement ≥60% weekly
- [ ] Assessment completion rate ≥40%
- [ ] Average 4+ star user rating
- [ ] Support ticket volume < 5% of users

---

## 12. Documentation Requirements

### 12.1 Developer Documentation
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Component library documentation (Storybook)
- [ ] Data model documentation
- [ ] Integration guide
- [ ] Deployment guide
- [ ] Contributing guidelines

### 12.2 User Documentation
- [ ] Framework activation guide
- [ ] Assessment methodology guide
- [ ] Dashboard customization guide
- [ ] Reporting guide
- [ ] Framework comparison guide
- [ ] Best practices guide

### 12.3 Framework Documentation
- [ ] Each framework includes:
  - [ ] Overview and purpose
  - [ ] Component descriptions
  - [ ] Assessment methodology
  - [ ] Maturity level definitions
  - [ ] Evidence requirements
  - [ ] Templates and examples

---

## 13. Appendices

### Appendix A: Framework Catalog
See separate document: `framework-catalog.json`

### Appendix B: Widget Specifications
See separate document: `widget-specifications.md`

### Appendix C: Design Mockups
Link to Figma: [Dashboard Designs]

### Appendix D: User Research
Link to research: [User Research Findings]

---

## Sign-off

**Product Owner**: ___________________  
**Engineering Lead**: ___________________  
**Design Lead**: ___________________  
**Date**: ___________________

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0 | 2025-01-27 | Product Team | Framework-centric redesign |
| 1.0 | 2025-01-27 | Product Team | Initial capability-based design |
