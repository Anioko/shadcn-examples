"use client";

import * as React from "react";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  Database,
  HelpCircle,
  LayoutDashboard,
  Settings,
  Shield,
  Target,
  ChevronRight,
  Layers,
  Briefcase,
  UserCog,
  Calculator,
  Users,
  Brain,
  Code,
  Webhook
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarGroupLabel,
  SidebarGroup,
  useSidebar
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

// Type definitions from Framework-Centric PRD
type NavigationItem = {
  id: string;
  label: string;
  icon?: React.ElementType;
  url?: string;
  children?: NavigationItem[];
};

// Framework-centric navigation data - ALL parents and children have dashboards
const navigationData: NavigationItem[] = [
  // Platform Core
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
    children: [
      { id: "overview", label: "Overview", url: "/dashboard/overview/dashboard" },
      { id: "workspace", label: "My Workspace", url: "/dashboard/workspace/dashboard" },
      { id: "activity", label: "Recent Activity", url: "/dashboard/activity/dashboard" }
    ]
  },
  {
    id: "strategy",
    label: "Strategy & Goals",
    icon: Target,
    url: "/strategy/dashboard",
    children: [
      {
        id: "bmc",
        label: "Business Model Canvas",
        icon: Briefcase,
        url: "/frameworks/business-model-canvas/dashboard",
        children: [
          { id: "canvas", label: "Canvas", url: "/canvases/business-model-canvas" },
          { id: "key-partners", label: "Key Partners", url: "/frameworks/business-model-canvas/key-partners" },
          { id: "key-activities", label: "Key Activities", url: "/frameworks/business-model-canvas/key-activities" },
          { id: "key-resources", label: "Key Resources", url: "/frameworks/business-model-canvas/key-resources" },
          { id: "value-propositions", label: "Value Propositions", url: "/frameworks/business-model-canvas/value-propositions" },
          { id: "customer-relationships", label: "Customer Relationships", url: "/frameworks/business-model-canvas/customer-relationships" },
          { id: "channels", label: "Channels", url: "/frameworks/business-model-canvas/channels" },
          { id: "customer-segments", label: "Customer Segments", url: "/frameworks/business-model-canvas/customer-segments" },
          { id: "cost-structure", label: "Cost Structure", url: "/frameworks/business-model-canvas/cost-structure" },
          { id: "revenue-streams", label: "Revenue Streams", url: "/frameworks/business-model-canvas/revenue-streams" }
        ]
      },
      {
        id: "lean-canvas",
        label: "Lean Canvas",
        url: "/frameworks/lean-canvas/dashboard",
        children: [
          { id: "canvas", label: "Canvas", url: "/canvases/lean-canvas" },
          { id: "problems", label: "Problems", url: "/frameworks/lean-canvas/problems" },
          { id: "solutions", label: "Solutions", url: "/frameworks/lean-canvas/solutions" },
          { id: "key-metrics", label: "Key Metrics", url: "/frameworks/lean-canvas/key-metrics" },
          { id: "unique-value-propositions", label: "Unique Value Propositions", url: "/frameworks/lean-canvas/unique-value-propositions" },
          { id: "unfair-advantages", label: "Unfair Advantages", url: "/frameworks/lean-canvas/unfair-advantages" },
          { id: "channels", label: "Channels", url: "/frameworks/lean-canvas/channels" },
          { id: "customer-segments", label: "Customer Segments", url: "/frameworks/lean-canvas/customer-segments" },
          { id: "cost-structure", label: "Cost Structure", url: "/frameworks/lean-canvas/cost-structure" },
          { id: "revenue-streams", label: "Revenue Streams", url: "/frameworks/lean-canvas/revenue-streams" }
        ]
      },
      {
        id: "value-proposition-canvas",
        label: "Value Proposition Canvas",
        url: "/canvases/value-proposition-canvas"
      },
      {
        id: "empathy-map",
        label: "Empathy Map",
        url: "/canvases/empathy-map"
      },
      {
        id: "product-vision-board",
        label: "Product Vision Board",
        url: "/canvases/product-vision-board"
      },
      {
        id: "okr",
        label: "OKRs",
        url: "/frameworks/okr/dashboard",
        children: [
          { id: "canvas", label: "Canvas", url: "/canvases/okr" },
          { id: "objectives", label: "Objectives", url: "/frameworks/okr/objectives" },
          { id: "key-results", label: "Key Results", url: "/frameworks/okr/key-results" },
          { id: "initiatives", label: "Initiatives", url: "/frameworks/okr/initiatives" }
        ]
      },
      {
        id: "porters-five-forces",
        label: "Porter's Five Forces",
        url: "/strategy/porters-five-forces/dashboard",
        children: [
          { id: "threat-new-entrants", label: "Threat of New Entrants", url: "/strategy/porters-five-forces/threat-new-entrants" },
          { id: "supplier-power", label: "Bargaining Power of Suppliers", url: "/strategy/porters-five-forces/supplier-power" },
          { id: "buyer-power", label: "Bargaining Power of Buyers", url: "/strategy/porters-five-forces/buyer-power" },
          { id: "threat-substitutes", label: "Threat of Substitutes", url: "/strategy/porters-five-forces/threat-substitutes" },
          { id: "competitive-rivalry", label: "Competitive Rivalry", url: "/strategy/porters-five-forces/competitive-rivalry" }
        ]
      },
      {
        id: "swot",
        label: "SWOT Analysis",
        url: "/strategy/swot/dashboard",
        children: [
          { id: "strengths", label: "Strengths", url: "/strategy/swot/strengths" },
          { id: "weaknesses", label: "Weaknesses", url: "/strategy/swot/weaknesses" },
          { id: "opportunities", label: "Opportunities", url: "/strategy/swot/opportunities" },
          { id: "threats", label: "Threats", url: "/strategy/swot/threats" }
        ]
      },
      {
        id: "pestle",
        label: "PESTLE Analysis",
        url: "/strategy/pestle/dashboard",
        children: [
          { id: "political", label: "Political", url: "/strategy/pestle/political" },
          { id: "economic", label: "Economic", url: "/strategy/pestle/economic" },
          { id: "social", label: "Social", url: "/strategy/pestle/social" },
          { id: "technological", label: "Technological", url: "/strategy/pestle/technological" },
          { id: "legal", label: "Legal", url: "/strategy/pestle/legal" },
          { id: "environmental", label: "Environmental", url: "/strategy/pestle/environmental" }
        ]
      },
      {
        id: "balanced-scorecard",
        label: "Balanced Scorecard",
        url: "/strategy/balanced-scorecard/dashboard",
        children: [
          { id: "financial", label: "Financial Perspective", url: "/strategy/balanced-scorecard/financial" },
          { id: "customer", label: "Customer Perspective", url: "/strategy/balanced-scorecard/customer" },
          { id: "internal-process", label: "Internal Process Perspective", url: "/strategy/balanced-scorecard/internal-process" },
          { id: "learning-growth", label: "Learning & Growth Perspective", url: "/strategy/balanced-scorecard/learning-growth" }
        ]
      },
      {
        id: "ansoff-matrix",
        label: "Ansoff Matrix",
        url: "/strategy/ansoff/dashboard",
        children: [
          { id: "market-penetration", label: "Market Penetration", url: "/strategy/ansoff/market-penetration" },
          { id: "market-development", label: "Market Development", url: "/strategy/ansoff/market-development" },
          { id: "product-development", label: "Product Development", url: "/strategy/ansoff/product-development" },
          { id: "diversification", label: "Diversification", url: "/strategy/ansoff/diversification" }
        ]
      },
      {
        id: "blue-ocean",
        label: "Blue Ocean Strategy",
        url: "/strategy/blue-ocean/dashboard",
        children: [
          { id: "eliminate", label: "Eliminate", url: "/strategy/blue-ocean/eliminate" },
          { id: "reduce", label: "Reduce", url: "/strategy/blue-ocean/reduce" },
          { id: "raise", label: "Raise", url: "/strategy/blue-ocean/raise" },
          { id: "create", label: "Create", url: "/strategy/blue-ocean/create" }
        ]
      },
      {
        id: "mckinsey-7s",
        label: "McKinsey 7S Framework",
        url: "/strategy/mckinsey-7s/dashboard",
        children: [
          { id: "strategy", label: "Strategy", url: "/strategy/mckinsey-7s/strategy" },
          { id: "structure", label: "Structure", url: "/strategy/mckinsey-7s/structure" },
          { id: "systems", label: "Systems", url: "/strategy/mckinsey-7s/systems" },
          { id: "shared-values", label: "Shared Values", url: "/strategy/mckinsey-7s/shared-values" },
          { id: "style", label: "Style", url: "/strategy/mckinsey-7s/style" },
          { id: "staff", label: "Staff", url: "/strategy/mckinsey-7s/staff" },
          { id: "skills", label: "Skills", url: "/strategy/mckinsey-7s/skills" }
        ]
      },
      {
        id: "wardley-mapping",
        label: "Wardley Mapping",
        url: "/strategy/wardley-mapping/dashboard",
        children: [
          { id: "value-chain", label: "Value Chain", url: "/strategy/wardley-mapping/value-chain" },
          { id: "evolution", label: "Evolution Stages", url: "/strategy/wardley-mapping/evolution" },
          { id: "components", label: "Components", url: "/strategy/wardley-mapping/components" },
          { id: "strategic-play", label: "Strategic Play", url: "/strategy/wardley-mapping/strategic-play" }
        ]
      }
    ]
  },

  // Enterprise Architecture
  {
    id: "enterprise-architecture",
    label: "Enterprise Architecture",
    icon: Building2,
    url: "/ea/dashboard",
    children: [
      {
        id: "togaf",
        label: "TOGAF 10",
        icon: Layers,
        url: "/frameworks/togaf/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/togaf/kanban" },
          { id: "architecture-vision", label: "Phase A: Architecture Vision", url: "/frameworks/togaf/architecture-vision" },
          { id: "business-architecture", label: "Phase B: Business Architecture", url: "/frameworks/togaf/business-architecture" },
          { id: "information-systems", label: "Phase C: Information Systems", url: "/frameworks/togaf/information-systems" },
          { id: "technology-architecture", label: "Phase D: Technology Architecture", url: "/frameworks/togaf/technology-architecture" },
          { id: "opportunities-solutions", label: "Phase E: Opportunities & Solutions", url: "/frameworks/togaf/opportunities-solutions" },
          { id: "migration-planning", label: "Phase F: Migration Planning", url: "/frameworks/togaf/migration-planning" },
          { id: "implementation-governance", label: "Phase G: Implementation Governance", url: "/frameworks/togaf/implementation-governance" },
          { id: "change-management", label: "Phase H: Architecture Change Management", url: "/frameworks/togaf/change-management" }
        ]
      },
      {
        id: "archimate",
        label: "ArchiMate 3.2",
        url: "/frameworks/archimate/dashboard",
        children: [
          { id: "strategy-layer", label: "Strategy Layer", url: "/frameworks/archimate/strategy-layer" },
          { id: "business-layer", label: "Business Layer", url: "/frameworks/archimate/business-layer" },
          { id: "application-layer", label: "Application Layer", url: "/frameworks/archimate/application-layer" },
          { id: "technology-layer", label: "Technology Layer", url: "/frameworks/archimate/technology-layer" },
          { id: "physical-layer", label: "Physical Layer", url: "/frameworks/archimate/physical-layer" },
          { id: "implementation-migration", label: "Implementation & Migration", url: "/frameworks/archimate/implementation-migration" }
        ]
      },
      {
        id: "zachman",
        label: "Zachman Framework",
        url: "/frameworks/zachman/dashboard",
        children: [
          { id: "contextual", label: "Contextual (Planner's View)", url: "/frameworks/zachman/contextual" },
          { id: "conceptual", label: "Conceptual (Owner's View)", url: "/frameworks/zachman/conceptual" },
          { id: "logical", label: "Logical (Designer's View)", url: "/frameworks/zachman/logical" },
          { id: "physical", label: "Physical (Builder's View)", url: "/frameworks/zachman/physical" },
          { id: "detailed", label: "Detailed (Subcontractor's View)", url: "/frameworks/zachman/detailed" }
        ]
      },
      {
        id: "capability-model",
        label: "Capability Model",
        url: "/frameworks/capability-model/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/frameworks/capability-model/capability-map" },
          { id: "workflow", label: "Workflow Designer", url: "/frameworks/capability-model/workflow" }
        ]
      },
      {
        id: "application-capability-model",
        label: "Application Capability Model",
        url: "/frameworks/application-capability-model/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/frameworks/application-capability-model/capability-map" },
          { id: "workflow", label: "Workflow Designer", url: "/frameworks/application-capability-model/workflow" }
        ]
      },
      {
        id: "genai",
        label: "IBM Gen AI Capability Model",
        url: "/frameworks/genai/capability-map",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/frameworks/genai/capability-map" },
        ]
      },
      {
        id: "pcf",
        label: "Process Classification Framework (PCF)",
        url: "/frameworks/pcf/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/frameworks/pcf/capability-map" },
          { id: "operating-processes", label: "Operating Processes", url: "/frameworks/pcf/operating-processes" },
          { id: "management-processes", label: "Management & Support Processes", url: "/frameworks/pcf/management-processes" }
        ]
      },
      {
        id: "feaf",
        label: "Federal Enterprise Architecture (FEAF)",
        url: "/frameworks/feaf/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/frameworks/feaf/capability-map" },
          { id: "prm", label: "Performance Reference Model", url: "/frameworks/feaf/prm" },
          { id: "brm", label: "Business Reference Model", url: "/frameworks/feaf/brm" },
          { id: "srm", label: "Service Component Reference Model", url: "/frameworks/feaf/srm" },
          { id: "drm", label: "Data Reference Model", url: "/frameworks/feaf/drm" },
          { id: "trm", label: "Technical Reference Model", url: "/frameworks/feaf/trm" }
        ]
      }
    ]
  },

  // Risk, Security & Assurance
  {
    id: "risk-security",
    label: "Risk, Security & Assurance",
    icon: Shield,
    url: "/risk/dashboard",
    children: [
      // Security Frameworks
      {
        id: "iso-27001",
        label: "ISO/IEC 27001:2022",
        icon: Shield,
        url: "/frameworks/iso-27001/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/frameworks/iso-27001/capability-map" },
          { id: "context-organization", label: "Context of Organization", url: "/frameworks/iso-27001/context-organization" },
          { id: "leadership", label: "Leadership", url: "/frameworks/iso-27001/leadership" },
          { id: "planning", label: "Planning", url: "/frameworks/iso-27001/planning" },
          { id: "support", label: "Support", url: "/frameworks/iso-27001/support" },
          { id: "operation", label: "Operation", url: "/frameworks/iso-27001/operation" },
          { id: "performance-evaluation", label: "Performance Evaluation", url: "/frameworks/iso-27001/performance-evaluation" },
          { id: "improvement", label: "Improvement", url: "/frameworks/iso-27001/improvement" },
          { id: "organizational-controls", label: "Organizational Controls", url: "/frameworks/iso-27001/organizational-controls" },
          { id: "people-controls", label: "People Controls", url: "/frameworks/iso-27001/people-controls" },
          { id: "physical-controls", label: "Physical Controls", url: "/frameworks/iso-27001/physical-controls" },
          { id: "technological-controls", label: "Technological Controls", url: "/frameworks/iso-27001/technological-controls" }
        ]
      },
      {
        id: "nist-csf",
        label: "NIST Cybersecurity Framework",
        url: "/frameworks/nist-csf/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/frameworks/nist-csf/capability-map" },
          { id: "govern", label: "Govern", url: "/frameworks/nist-csf/govern" },
          { id: "identify", label: "Identify", url: "/frameworks/nist-csf/identify" },
          { id: "protect", label: "Protect", url: "/frameworks/nist-csf/protect" },
          { id: "detect", label: "Detect", url: "/frameworks/nist-csf/detect" },
          { id: "respond", label: "Respond", url: "/frameworks/nist-csf/respond" },
          { id: "recover", label: "Recover", url: "/frameworks/nist-csf/recover" }
        ]
      },
      {
        id: "cis-controls",
        label: "CIS Controls v8",
        url: "/frameworks/cis-controls/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/frameworks/cis-controls/capability-map" },
          { id: "ig1", label: "Implementation Group 1 (Basic)", url: "/frameworks/cis-controls/ig1" },
          { id: "ig2", label: "Implementation Group 2 (Foundational)", url: "/frameworks/cis-controls/ig2" },
          { id: "ig3", label: "Implementation Group 3 (Organizational)", url: "/frameworks/cis-controls/ig3" }
        ]
      },
      {
        id: "soc2",
        label: "SOC 2 Type II",
        url: "/frameworks/soc2/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/frameworks/soc2/capability-map" },
          { id: "security", label: "Security", url: "/frameworks/soc2/security" },
          { id: "availability", label: "Availability", url: "/frameworks/soc2/availability" },
          { id: "processing-integrity", label: "Processing Integrity", url: "/frameworks/soc2/processing-integrity" },
          { id: "confidentiality", label: "Confidentiality", url: "/frameworks/soc2/confidentiality" },
          { id: "privacy", label: "Privacy", url: "/frameworks/soc2/privacy" }
        ]
      },
      {
        id: "cobit-2019",
        label: "COBIT 2019",
        url: "/frameworks/cobit-2019/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/frameworks/cobit-2019/capability-map" },
          { id: "governance-system", label: "Governance System", url: "/frameworks/cobit-2019/governance-system" },
          { id: "governance-objectives", label: "Governance & Management Objectives", url: "/frameworks/cobit-2019/governance-objectives" },
          { id: "design-factors", label: "Design Factors", url: "/frameworks/cobit-2019/design-factors" },
          { id: "performance-mgmt", label: "Performance Management", url: "/frameworks/cobit-2019/performance-mgmt" }
        ]
      },
      {
        id: "gdpr",
        label: "GDPR Compliance",
        url: "/frameworks/gdpr/dashboard",
        children: [
          { id: "lawfulness", label: "Lawfulness, Fairness & Transparency", url: "/frameworks/gdpr/lawfulness" },
          { id: "purpose-limitation", label: "Purpose Limitation", url: "/frameworks/gdpr/purpose-limitation" },
          { id: "data-minimization", label: "Data Minimization", url: "/frameworks/gdpr/data-minimization" },
          { id: "accuracy", label: "Accuracy", url: "/frameworks/gdpr/accuracy" },
          { id: "storage-limitation", label: "Storage Limitation", url: "/frameworks/gdpr/storage-limitation" },
          { id: "integrity-confidentiality", label: "Integrity & Confidentiality", url: "/frameworks/gdpr/integrity-confidentiality" },
          { id: "accountability", label: "Accountability", url: "/frameworks/gdpr/accountability" }
        ]
      },
      {
        id: "pci-dss",
        label: "PCI DSS 4.0",
        url: "/frameworks/pci-dss/dashboard",
        children: [
          { id: "secure-network", label: "Build & Maintain Secure Network", url: "/frameworks/pci-dss/secure-network" },
          { id: "protect-data", label: "Protect Account Data", url: "/frameworks/pci-dss/protect-data" },
          { id: "vulnerability-mgmt", label: "Maintain Vulnerability Management", url: "/frameworks/pci-dss/vulnerability-mgmt" },
          { id: "access-controls", label: "Implement Strong Access Controls", url: "/frameworks/pci-dss/access-controls" },
          { id: "monitor-test", label: "Monitor & Test Networks", url: "/frameworks/pci-dss/monitor-test" },
          { id: "security-policy", label: "Maintain Information Security Policy", url: "/frameworks/pci-dss/security-policy" }
        ]
      },
      {
        id: "sabsa",
        label: "SABSA Security Architecture",
        url: "/frameworks/sabsa/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/sabsa/kanban" },
          { id: "capability-map", label: "Capability Map", url: "/frameworks/sabsa/capability-map" },
          { id: "contextual", label: "Contextual Layer", url: "/frameworks/sabsa/contextual" },
          { id: "conceptual", label: "Conceptual Layer", url: "/frameworks/sabsa/conceptual" },
          { id: "logical", label: "Logical Layer", url: "/frameworks/sabsa/logical" },
          { id: "physical", label: "Physical Layer", url: "/frameworks/sabsa/physical" },
          { id: "component", label: "Component Layer", url: "/frameworks/sabsa/component" },
          { id: "operational", label: "Operational Layer", url: "/frameworks/sabsa/operational" }
        ]
      },
      {
        id: "coso",
        label: "COSO Framework",
        url: "/risk/coso/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/risk/coso/capability-map" },
          { id: "control-environment", label: "Control Environment", url: "/risk/coso/control-environment" },
          { id: "risk-assessment", label: "Risk Assessment", url: "/risk/coso/risk-assessment" },
          { id: "control-activities", label: "Control Activities", url: "/risk/coso/control-activities" },
          { id: "information-communication", label: "Information & Communication", url: "/risk/coso/information-communication" },
          { id: "monitoring", label: "Monitoring Activities", url: "/risk/coso/monitoring" }
        ]
      },
      {
        id: "iso-31000",
        label: "ISO 31000 Risk Management",
        url: "/risk/iso-31000/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/risk/iso-31000/capability-map" },
          { id: "risk-identification", label: "Risk Identification", url: "/risk/iso-31000/identification" },
          { id: "risk-analysis", label: "Risk Analysis", url: "/risk/iso-31000/analysis" },
          { id: "risk-evaluation", label: "Risk Evaluation", url: "/risk/iso-31000/evaluation" },
          { id: "risk-treatment", label: "Risk Treatment", url: "/risk/iso-31000/treatment" },
          { id: "monitoring-review", label: "Monitoring & Review", url: "/risk/iso-31000/monitoring-review" }
        ]
      },
      {
        id: "three-lines-defense",
        label: "Three Lines of Defense",
        url: "/risk/three-lines/dashboard",
        children: [
          { id: "first-line", label: "First Line: Operational Management", url: "/risk/three-lines/first-line" },
          { id: "second-line", label: "Second Line: Risk Management & Compliance", url: "/risk/three-lines/second-line" },
          { id: "third-line", label: "Third Line: Internal Audit", url: "/risk/three-lines/third-line" }
        ]
      }
    ]
  },

  // Business Management
  {
    id: "business-management",
    label: "Business Management",
    icon: Briefcase,
    url: "/business/dashboard",
    children: [
      {
        id: "scrum",
        label: "Scrum",
        url: "/frameworks/scrum/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/scrum/kanban" },
          { id: "product-backlog", label: "Product Backlog", url: "/frameworks/scrum/product-backlog" },
          { id: "sprint-planning", label: "Sprint Planning", url: "/frameworks/scrum/sprint-planning" },
          { id: "daily-scrum", label: "Daily Scrum", url: "/frameworks/scrum/daily-scrum" },
          { id: "sprint-review", label: "Sprint Review", url: "/frameworks/scrum/sprint-review" },
          { id: "sprint-retrospective", label: "Sprint Retrospective", url: "/frameworks/scrum/sprint-retrospective" }
        ]
      },
      {
        id: "safe",
        label: "SAFe 6.0",
        url: "/frameworks/safe/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/safe/kanban" },
          { id: "essential", label: "Essential SAFe", url: "/frameworks/safe/essential" },
          { id: "large-solution", label: "Large Solution SAFe", url: "/frameworks/safe/large-solution" },
          { id: "portfolio", label: "Portfolio SAFe", url: "/frameworks/safe/portfolio" },
          { id: "full", label: "Full SAFe", url: "/frameworks/safe/full" }
        ]
      },
      {
        id: "six-sigma",
        label: "Six Sigma / DMAIC",
        url: "/business/six-sigma/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/business/six-sigma/kanban" },
          { id: "define", label: "Define", url: "/business/six-sigma/define" },
          { id: "measure", label: "Measure", url: "/business/six-sigma/measure" },
          { id: "analyze", label: "Analyze", url: "/business/six-sigma/analyze" },
          { id: "improve", label: "Improve", url: "/business/six-sigma/improve" },
          { id: "control", label: "Control", url: "/business/six-sigma/control" }
        ]
      },
      {
        id: "lean",
        label: "Lean Management",
        url: "/business/lean/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/business/lean/kanban" },
          { id: "value-stream", label: "Value Stream Mapping", url: "/business/lean/value-stream" },
          { id: "5s", label: "5S Methodology", url: "/business/lean/5s" },
          { id: "kaizen", label: "Kaizen", url: "/business/lean/kaizen" },
          { id: "waste-elimination", label: "Waste Elimination", url: "/business/lean/waste-elimination" }
        ]
      },
      {
        id: "iso-9001",
        label: "ISO 9001:2015",
        url: "/frameworks/iso-9001/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/frameworks/iso-9001/capability-map" },
          { id: "context", label: "Context of Organization", url: "/frameworks/iso-9001/context" },
          { id: "leadership", label: "Leadership", url: "/frameworks/iso-9001/leadership" },
          { id: "planning", label: "Planning", url: "/frameworks/iso-9001/planning" },
          { id: "support", label: "Support", url: "/frameworks/iso-9001/support" },
          { id: "operation", label: "Operation", url: "/frameworks/iso-9001/operation" },
          { id: "performance", label: "Performance Evaluation", url: "/frameworks/iso-9001/performance" },
          { id: "improvement", label: "Improvement", url: "/frameworks/iso-9001/improvement" }
        ]
      },
      {
        id: "kanban",
        label: "Kanban Method",
        url: "/business/kanban/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/business/kanban/kanban" },
          { id: "visualize-workflow", label: "Visualize Workflow", url: "/business/kanban/visualize" },
          { id: "limit-wip", label: "Limit Work in Progress", url: "/business/kanban/limit-wip" },
          { id: "manage-flow", label: "Manage Flow", url: "/business/kanban/manage-flow" },
          { id: "explicit-policies", label: "Make Policies Explicit", url: "/business/kanban/policies" },
          { id: "feedback-loops", label: "Implement Feedback Loops", url: "/business/kanban/feedback" },
          { id: "improve-collaboratively", label: "Improve Collaboratively", url: "/business/kanban/improve" }
        ]
      },
      {
        id: "less",
        label: "LeSS (Large-Scale Scrum)",
        url: "/business/less/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/business/less/kanban" },
          { id: "less-framework", label: "LeSS Framework", url: "/business/less/framework" },
          { id: "less-huge", label: "LeSS Huge", url: "/business/less/huge" },
          { id: "organizational-structure", label: "Organizational Structure", url: "/business/less/org-structure" },
          { id: "product-owner", label: "Product Owner", url: "/business/less/product-owner" },
          { id: "sprint-planning", label: "Sprint Planning", url: "/business/less/sprint-planning" }
        ]
      },
      {
        id: "prince2",
        label: "PRINCE2",
        url: "/frameworks/prince2/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/prince2/kanban" },
          { id: "starting", label: "Starting Up", url: "/frameworks/prince2/starting" },
          { id: "initiating", label: "Initiating", url: "/frameworks/prince2/initiating" },
          { id: "controlling", label: "Controlling", url: "/frameworks/prince2/controlling" },
          { id: "managing-delivery", label: "Managing Delivery", url: "/frameworks/prince2/managing-delivery" },
          { id: "closing", label: "Closing", url: "/frameworks/prince2/closing" }
        ]
      },
      {
        id: "pmbok",
        label: "PMBOK",
        url: "/frameworks/pmbok/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/pmbok/kanban" },
          { id: "stakeholders", label: "Stakeholders", url: "/frameworks/pmbok/stakeholders" },
          { id: "team", label: "Team", url: "/frameworks/pmbok/team" },
          { id: "development-approach", label: "Development Approach", url: "/frameworks/pmbok/development-approach" },
          { id: "planning", label: "Planning", url: "/frameworks/pmbok/planning" },
          { id: "project-work", label: "Project Work", url: "/frameworks/pmbok/project-work" },
          { id: "delivery", label: "Delivery", url: "/frameworks/pmbok/delivery" },
          { id: "measurement", label: "Measurement", url: "/frameworks/pmbok/measurement" },
          { id: "uncertainty", label: "Uncertainty", url: "/frameworks/pmbok/uncertainty" }
        ]
      },
      {
        id: "bpmn",
        label: "BPMN 2.0",
        url: "/business/bpmn/dashboard",
        children: [
          { id: "events", label: "Events", url: "/business/bpmn/events" },
          { id: "activities", label: "Activities", url: "/business/bpmn/activities" },
          { id: "gateways", label: "Gateways", url: "/business/bpmn/gateways" },
          { id: "flows", label: "Sequence & Message Flows", url: "/business/bpmn/flows" },
          { id: "pools-lanes", label: "Pools & Lanes", url: "/business/bpmn/pools-lanes" }
        ]
      },
      {
        id: "kotters-8-step",
        label: "Kotter's 8-Step Change",
        url: "/business/kotters-8-step/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/kotter-change/kanban" },
          { id: "create-urgency", label: "Create Urgency", url: "/business/kotter/urgency/dashboard" },
          { id: "build-coalition", label: "Build Guiding Coalition", url: "/business/kotter/coalition/dashboard" },
          { id: "form-vision", label: "Form Strategic Vision", url: "/business/kotter/vision/dashboard" },
          { id: "enlist-army", label: "Enlist Volunteer Army", url: "/business/kotter/enlist/dashboard" },
          { id: "enable-action", label: "Enable Action", url: "/business/kotter/enable/dashboard" },
          { id: "generate-wins", label: "Generate Short-Term Wins", url: "/business/kotter/wins/dashboard" },
          { id: "sustain-acceleration", label: "Sustain Acceleration", url: "/business/kotter/sustain/dashboard" },
          { id: "institute-change", label: "Institute Change", url: "/business/kotter/institute/dashboard" }
        ]
      },
      {
        id: "adkar",
        label: "ADKAR Model",
        url: "/business/adkar/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/adkar/kanban" },
          { id: "awareness", label: "Awareness", url: "/business/adkar/awareness/dashboard" },
          { id: "desire", label: "Desire", url: "/business/adkar/desire/dashboard" },
          { id: "knowledge", label: "Knowledge", url: "/business/adkar/knowledge/dashboard" },
          { id: "ability", label: "Ability", url: "/business/adkar/ability/dashboard" },
          { id: "reinforcement", label: "Reinforcement", url: "/business/adkar/reinforcement/dashboard" }
        ]
      },
      {
        id: "design-thinking",
        label: "Design Thinking",
        url: "/business/design-thinking/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/design-thinking/kanban" },
          { id: "empathize", label: "Empathize", url: "/business/design-thinking/empathize/dashboard" },
          { id: "define", label: "Define", url: "/business/design-thinking/define/dashboard" },
          { id: "ideate", label: "Ideate", url: "/business/design-thinking/ideate/dashboard" },
          { id: "prototype", label: "Prototype", url: "/business/design-thinking/prototype/dashboard" },
          { id: "test", label: "Test", url: "/business/design-thinking/test/dashboard" }
        ]
      }
    ]
  },

  // IT Management
  {
    id: "it-management",
    label: "Information & Technology",
    icon: Database,
    url: "/it/dashboard",
    children: [
      {
        id: "itil4",
        label: "ITIL 4",
        url: "/frameworks/itil4/dashboard",
        children: [
          { id: "capability-map", label: "Capability Map", url: "/frameworks/itil4/capability-map" },
          { id: "service-value-system", label: "Service Value System", url: "/frameworks/itil4/service-value-system" },
          { id: "service-value-chain", label: "Service Value Chain", url: "/frameworks/itil4/service-value-chain" },
          { id: "general-practices", label: "General Management Practices", url: "/frameworks/itil4/general-practices" },
          { id: "service-practices", label: "Service Management Practices", url: "/frameworks/itil4/service-practices" },
          { id: "technical-practices", label: "Technical Management Practices", url: "/frameworks/itil4/technical-practices" }
        ]
      },
      {
        id: "aws-waf",
        label: "AWS Well-Architected",
        url: "/it/aws-waf/dashboard",
        children: [
          { id: "operational-excellence", label: "Operational Excellence", url: "/it/aws-waf/operational/dashboard" },
          { id: "security", label: "Security", url: "/it/aws-waf/security/dashboard" },
          { id: "reliability", label: "Reliability", url: "/it/aws-waf/reliability/dashboard" },
          { id: "performance-efficiency", label: "Performance Efficiency", url: "/it/aws-waf/performance/dashboard" },
          { id: "cost-optimization", label: "Cost Optimization", url: "/it/aws-waf/cost/dashboard" },
          { id: "sustainability", label: "Sustainability", url: "/it/aws-waf/sustainability/dashboard" }
        ]
      },
      {
        id: "dama-dmbok",
        label: "DAMA-DMBOK 2.0",
        url: "/it/dama-dmbok/dashboard",
        children: [
          { id: "data-governance", label: "Data Governance", url: "/it/dama-dmbok/data-governance/dashboard" },
          { id: "data-architecture", label: "Data Architecture", url: "/it/dama-dmbok/data-architecture/dashboard" },
          { id: "data-modeling", label: "Data Modeling & Design", url: "/it/dama-dmbok/data-modeling/dashboard" },
          { id: "data-storage", label: "Data Storage & Operations", url: "/it/dama-dmbok/data-storage/dashboard" },
          { id: "data-security", label: "Data Security", url: "/it/dama-dmbok/data-security/dashboard" },
          { id: "data-integration", label: "Data Integration & Interoperability", url: "/it/dama-dmbok/data-integration/dashboard" },
          { id: "master-data", label: "Reference & Master Data", url: "/it/dama-dmbok/master-data/dashboard" },
          { id: "data-warehousing", label: "Data Warehousing & BI", url: "/it/dama-dmbok/data-warehousing/dashboard" },
          { id: "metadata", label: "Metadata", url: "/it/dama-dmbok/metadata/dashboard" },
          { id: "data-quality", label: "Data Quality", url: "/it/dama-dmbok/data-quality/dashboard" }
        ]
      },
      {
        id: "cmmi",
        label: "CMMI (Capability Maturity Model Integration)",
        url: "/it/cmmi/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/cmmi/kanban" },
          { id: "level-1", label: "Level 1: Initial", url: "/it/cmmi/level-1/dashboard" },
          { id: "level-2", label: "Level 2: Managed", url: "/it/cmmi/level-2/dashboard" },
          { id: "level-3", label: "Level 3: Defined", url: "/it/cmmi/level-3/dashboard" },
          { id: "level-4", label: "Level 4: Quantitatively Managed", url: "/it/cmmi/level-4/dashboard" },
          { id: "level-5", label: "Level 5: Optimizing", url: "/it/cmmi/level-5/dashboard" }
        ]
      },
      {
        id: "azure-caf",
        label: "Azure Cloud Adoption Framework",
        url: "/it/azure-caf/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/azure-caf/kanban" },
          { id: "strategy", label: "Strategy", url: "/it/azure-caf/strategy/dashboard" },
          { id: "plan", label: "Plan", url: "/it/azure-caf/plan/dashboard" },
          { id: "ready", label: "Ready", url: "/it/azure-caf/ready/dashboard" },
          { id: "adopt", label: "Adopt", url: "/it/azure-caf/adopt/dashboard" },
          { id: "govern", label: "Govern", url: "/it/azure-caf/govern/dashboard" },
          { id: "manage", label: "Manage", url: "/it/azure-caf/manage/dashboard" }
        ]
      },
      {
        id: "gcp-framework",
        label: "Google Cloud Architecture Framework",
        url: "/it/gcp-framework/dashboard",
        children: [
          { id: "operational-excellence", label: "Operational Excellence", url: "/it/gcp/operational-excellence/dashboard" },
          { id: "security-privacy", label: "Security, Privacy & Compliance", url: "/it/gcp/security-privacy/dashboard" },
          { id: "reliability", label: "Reliability", url: "/it/gcp/reliability/dashboard" },
          { id: "cost-optimization", label: "Cost Optimization", url: "/it/gcp/cost-optimization/dashboard" },
          { id: "performance-optimization", label: "Performance Optimization", url: "/it/gcp/performance/dashboard" }
        ]
      },
      {
        id: "crisp-dm",
        label: "CRISP-DM",
        url: "/it/crisp-dm/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/crisp-dm/kanban" },
          { id: "business-understanding", label: "Business Understanding", url: "/it/crisp-dm/business-understanding/dashboard" },
          { id: "data-understanding", label: "Data Understanding", url: "/it/crisp-dm/data-understanding/dashboard" },
          { id: "data-preparation", label: "Data Preparation", url: "/it/crisp-dm/data-preparation/dashboard" },
          { id: "modeling", label: "Modeling", url: "/it/crisp-dm/modeling/dashboard" },
          { id: "evaluation", label: "Evaluation", url: "/it/crisp-dm/evaluation/dashboard" },
          { id: "deployment", label: "Deployment", url: "/it/crisp-dm/deployment/dashboard" }
        ]
      },
      {
        id: "devops-dora",
        label: "DevOps & DORA Metrics",
        url: "/it/devops-dora/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/devops/kanban" },
          { id: "deployment-frequency", label: "Deployment Frequency", url: "/it/devops/deployment-frequency/dashboard" },
          { id: "lead-time", label: "Lead Time for Changes", url: "/it/devops/lead-time/dashboard" },
          { id: "mttr", label: "Mean Time to Recovery", url: "/it/devops/mttr/dashboard" },
          { id: "change-failure-rate", label: "Change Failure Rate", url: "/it/devops/change-failure-rate/dashboard" }
        ]
      }
    ]
  },

  // Sales & CRM
  {
    id: "sales-crm",
    label: "Sales & CRM",
    icon: Users,
    url: "/sales/dashboard",
    children: [
      { id: "contacts", label: "Contacts", url: "/sales/contacts/dashboard" },
      { id: "companies", label: "Companies", url: "/sales/companies/dashboard" },
      { id: "opportunities", label: "Opportunities", url: "/sales/opportunities/dashboard" },
      { id: "activities", label: "Activities", url: "/sales/activities/dashboard" },
      { id: "sales-pipeline", label: "Sales Pipeline", url: "/sales/pipeline/dashboard" },
      { id: "lead-management", label: "Lead Management", url: "/sales/leads/dashboard" }
    ]
  },

  // AI & Evaluation
  {
    id: "ai-evaluation",
    label: "AI & Evaluation",
    icon: Brain,
    url: "/ai/dashboard",
    children: [
      { id: "ai-evaluations", label: "AI Evaluations", url: "/ai/evaluations/dashboard" },
      { id: "model-performance", label: "Model Performance", url: "/ai/models/dashboard" },
      { id: "test-scenarios", label: "Test Scenarios", url: "/ai/scenarios/dashboard" },
      { id: "evaluation-metrics", label: "Evaluation Metrics", url: "/ai/metrics/dashboard" },
      { id: "ai-reports", label: "AI Reports", url: "/ai/reports/dashboard" },
      { id: "dataset-management", label: "Dataset Management", url: "/ai/datasets/dashboard" }
    ]
  },

  // Code Generation
  {
    id: "code-generation",
    label: "Code Generation",
    icon: Code,
    url: "/code/dashboard",
    children: [
      { id: "code-templates", label: "Code Templates", url: "/code/templates/dashboard" },
      { id: "generators", label: "Generators", url: "/code/generators/dashboard" },
      { id: "workflows", label: "Workflows", url: "/code/workflows/dashboard" },
      { id: "generation-history", label: "Generation History", url: "/code/history/dashboard" },
      { id: "code-quality", label: "Code Quality", url: "/code/quality/dashboard" },
      { id: "documentation", label: "Documentation", url: "/code/docs/dashboard" }
    ]
  },

  // Integrations
  {
    id: "integrations",
    label: "Integrations",
    icon: Webhook,
    url: "/integrations/dashboard",
    children: [
      { id: "api-endpoints", label: "API Endpoints", url: "/integrations/apis/dashboard" },
      { id: "webhooks", label: "Webhooks", url: "/integrations/webhooks/dashboard" },
      { id: "data-connectors", label: "Data Connectors", url: "/integrations/connectors/dashboard" },
      { id: "event-streams", label: "Event Streams", url: "/integrations/events/dashboard" },
      { id: "integration-logs", label: "Integration Logs", url: "/integrations/logs/dashboard" },
      { id: "api-documentation", label: "API Documentation", url: "/integrations/docs/dashboard" }
    ]
  },

  // Enterprise Frameworks (Parent → Children with Kanban Workflows)
  {
    id: "agile-pm-capability",
    label: "Agile & Project Management",
    icon: Briefcase,
    url: "/capabilities/agile-project-management",
    children: [
      { 
        id: "scrum-framework", 
        label: "Scrum", 
        url: "/frameworks/scrum",
        children: [
          { id: "scrum-workflow", label: "Workflow (Kanban)", url: "/frameworks/scrum/kanban" }
        ]
      },
      { 
        id: "kanban-framework", 
        label: "Kanban Method", 
        url: "/frameworks/kanban",
        children: [
          { id: "kanban-workflow", label: "Workflow (Kanban)", url: "/frameworks/kanban/kanban" }
        ]
      },
      { 
        id: "safe-framework", 
        label: "SAFe", 
        url: "/frameworks/safe",
        children: [
          { id: "safe-workflow", label: "Workflow (Kanban)", url: "/frameworks/safe/kanban" }
        ]
      },
      { 
        id: "six-sigma-framework", 
        label: "Six Sigma / DMAIC", 
        url: "/frameworks/six-sigma",
        children: [
          { id: "six-sigma-workflow", label: "Workflow (Kanban)", url: "/frameworks/six-sigma/kanban" }
        ]
      },
      { 
        id: "less-framework", 
        label: "LeSS", 
        url: "/frameworks/less",
        children: [
          { id: "less-workflow", label: "Workflow (Kanban)", url: "/frameworks/less/kanban" }
        ]
      },
      { 
        id: "prince2-framework", 
        label: "PRINCE2", 
        url: "/frameworks/prince2",
        children: [
          { id: "prince2-workflow", label: "Workflow (Kanban)", url: "/frameworks/prince2/kanban" }
        ]
      },
      { 
        id: "pmbok-framework", 
        label: "PMBOK", 
        url: "/frameworks/pmbok",
        children: [
          { id: "pmbok-workflow", label: "Workflow (Kanban)", url: "/frameworks/pmbok/kanban" }
        ]
      },
      { 
        id: "lean-vsm-framework", 
        label: "Lean / VSM", 
        url: "/frameworks/lean-vsm",
        children: [
          { id: "lean-workflow", label: "Workflow (Kanban)", url: "/frameworks/lean-vsm/kanban" }
        ]
      },
    ]
  },

  // Cross-Cutting Features
  {
    id: "tech-stack",
    label: "Technology Portfolio",
    icon: Layers,
    url: "/portfolio/dashboard",
    children: [
      { id: "applications", label: "Application Inventory", url: "/portfolio/applications/dashboard" },
      { id: "infrastructure", label: "Infrastructure Inventory", url: "/portfolio/infrastructure/dashboard" },
      { id: "integrations", label: "Integration Architecture", url: "/portfolio/integrations/dashboard" },
      { id: "tech-radar", label: "Technology Radar", url: "/portfolio/tech-radar/dashboard" }
    ]
  },
  {
    id: "cost-finops",
    label: "Cost & FinOps",
    icon: Calculator,
    url: "/cost/dashboard",
    children: [
      {
        id: "finops",
        label: "FinOps Framework",
        url: "/cost/finops/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/finops/kanban" },
          { id: "inform", label: "Inform", url: "/cost/finops/inform/dashboard" },
          { id: "optimize", label: "Optimize", url: "/cost/finops/optimize/dashboard" },
          { id: "operate", label: "Operate", url: "/cost/finops/operate/dashboard" }
        ]
      },
      { id: "software-spend", label: "Software Spend Analysis", url: "/cost/software-spend/dashboard" },
      { id: "infrastructure-costs", label: "Infrastructure Costs", url: "/cost/infrastructure/dashboard" },
      { id: "optimization", label: "Cost Optimization", url: "/cost/optimization/dashboard" },
      {
        id: "abc-costing",
        label: "Activity-Based Costing (ABC)",
        url: "/cost/abc/dashboard",
        children: [
          { id: "activity-analysis", label: "Activity Analysis", url: "/cost/abc/activity-analysis/dashboard" },
          { id: "cost-drivers", label: "Cost Drivers", url: "/cost/abc/cost-drivers/dashboard" },
          { id: "cost-allocation", label: "Cost Allocation", url: "/cost/abc/allocation/dashboard" }
        ]
      },
      {
        id: "zero-based-budgeting",
        label: "Zero-Based Budgeting",
        url: "/cost/zbb/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/zbb/kanban" },
          { id: "decision-packages", label: "Decision Packages", url: "/cost/zbb/decision-packages/dashboard" },
          { id: "ranking", label: "Ranking & Prioritization", url: "/cost/zbb/ranking/dashboard" },
          { id: "allocation", label: "Resource Allocation", url: "/cost/zbb/allocation/dashboard" }
        ]
      },
      {
        id: "unit-economics",
        label: "Unit Economics",
        url: "/cost/unit-economics/dashboard",
        children: [
          { id: "cac", label: "Customer Acquisition Cost (CAC)", url: "/cost/unit-economics/cac/dashboard" },
          { id: "ltv", label: "Lifetime Value (LTV)", url: "/cost/unit-economics/ltv/dashboard" },
          { id: "contribution-margin", label: "Contribution Margin", url: "/cost/unit-economics/contribution-margin/dashboard" }
        ]
      }
    ]
  },

  // Innovation & Digital Transformation
  {
    id: "innovation",
    label: "Innovation & Digital Transformation",
    icon: Target,
    url: "/innovation/dashboard",
    children: [
      {
        id: "digital-transformation",
        label: "Digital Transformation Framework",
        url: "/innovation/digital-transformation/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/digital-transformation/kanban" },
          { id: "customer-experience", label: "Customer Experience", url: "/innovation/dt/customer-experience/dashboard" },
          { id: "operational-processes", label: "Operational Processes", url: "/innovation/dt/operational-processes/dashboard" },
          { id: "business-models", label: "Business Models", url: "/innovation/dt/business-models/dashboard" }
        ]
      },
      {
        id: "open-innovation",
        label: "Open Innovation Framework",
        url: "/innovation/open-innovation/dashboard",
        children: [
          { id: "inbound-innovation", label: "Inbound Innovation", url: "/innovation/open/inbound/dashboard" },
          { id: "outbound-innovation", label: "Outbound Innovation", url: "/innovation/open/outbound/dashboard" },
          { id: "coupled-innovation", label: "Coupled Innovation", url: "/innovation/open/coupled/dashboard" }
        ]
      },
      {
        id: "disruptive-innovation",
        label: "Disruptive Innovation",
        url: "/innovation/disruptive/dashboard",
        children: [
          { id: "low-end-disruption", label: "Low-End Disruption", url: "/innovation/disruptive/low-end/dashboard" },
          { id: "new-market-disruption", label: "New-Market Disruption", url: "/innovation/disruptive/new-market/dashboard" }
        ]
      }
    ]
  },

  // Customer & Experience
  {
    id: "customer-experience",
    label: "Customer & Experience",
    icon: Target,
    url: "/customer/dashboard",
    children: [
      {
        id: "customer-journey",
        label: "Customer Journey Mapping",
        url: "/customer/journey-mapping/dashboard",
        children: [
          { id: "kanban", label: "Kanban Board", url: "/frameworks/customer-journey/kanban" },
          { id: "awareness", label: "Awareness", url: "/customer/journey/awareness/dashboard" },
          { id: "consideration", label: "Consideration", url: "/customer/journey/consideration/dashboard" },
          { id: "purchase", label: "Purchase", url: "/customer/journey/purchase/dashboard" },
          { id: "retention", label: "Retention", url: "/customer/journey/retention/dashboard" },
          { id: "advocacy", label: "Advocacy", url: "/customer/journey/advocacy/dashboard" }
        ]
      },
      {
        id: "service-design",
        label: "Service Design Thinking",
        url: "/customer/service-design/dashboard",
        children: [
          { id: "service-blueprint", label: "Service Blueprint", url: "/customer/service-design/blueprint/dashboard" },
          { id: "touchpoints", label: "Touchpoint Analysis", url: "/customer/service-design/touchpoints/dashboard" },
          { id: "personas", label: "Personas", url: "/customer/service-design/personas/dashboard" }
        ]
      },
      {
        id: "jtbd",
        label: "Jobs-to-be-Done (JTBD)",
        url: "/customer/jtbd/dashboard",
        children: [
          { id: "functional-jobs", label: "Functional Jobs", url: "/customer/jtbd/functional/dashboard" },
          { id: "social-jobs", label: "Social Jobs", url: "/customer/jtbd/social/dashboard" },
          { id: "emotional-jobs", label: "Emotional Jobs", url: "/customer/jtbd/emotional/dashboard" }
        ]
      },
      {
        id: "nps",
        label: "Net Promoter Score (NPS)",
        url: "/customer/nps/dashboard",
        children: [
          { id: "promoters", label: "Promoters", url: "/customer/nps/promoters/dashboard" },
          { id: "passives", label: "Passives", url: "/customer/nps/passives/dashboard" },
          { id: "detractors", label: "Detractors", url: "/customer/nps/detractors/dashboard" }
        ]
      }
    ]
  },

  // Platform Administration
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    url: "/settings/dashboard",
    children: [
      { id: "organization", label: "Organization Profile", url: "/settings/organization/dashboard" },
      { id: "users", label: "User Management", url: "/settings/users/dashboard" },
      { id: "marketplace", label: "Framework Marketplace", url: "/settings/marketplace/dashboard" }
    ]
  },
  {
    id: "help",
    label: "Help & Learning",
    icon: HelpCircle,
    url: "/help/dashboard"
  }
];

// Recursive Navigation Item Component
function NavigationItemComponent({
  item,
  level = 0
}: {
  item: NavigationItem;
  level?: number;
}) {
  const [isExpanded, setIsExpanded] = React.useState(level < 3); // Auto-expand first 3 levels to show grandchildren
  const [mounted, setMounted] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Render leaf node (no children)
  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={isCollapsed ? item.label : undefined}
          className={cn(
            "relative",
            level > 0 && "text-sm",
            level > 1 && "text-xs"
          )}
        >
          <Link href={item.url || "#"}>
            {item.icon && <item.icon className={cn("shrink-0", level === 0 ? "size-4" : "size-3.5")} />}
            <span className="flex-1 truncate">{item.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  // Render parent node with children
  // Prevent hydration mismatch by only rendering Collapsible after mount
  if (!mounted) {
    return (
      <SidebarMenuItem>
        <div className="relative flex items-center w-full">
          <SidebarMenuButton
            asChild
            tooltip={isCollapsed ? item.label : undefined}
            className={cn(
              "flex-1 font-medium pr-8",
              level === 0 && "font-semibold",
              level > 0 && "text-sm"
            )}
          >
            <Link href={item.url || "#"}>
              {item.icon && <item.icon className={cn("shrink-0", level === 0 ? "size-4" : "size-3.5")} />}
              <span className="flex-1 truncate">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </div>
      </SidebarMenuItem>
    );
  }
  
  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <div className="relative flex items-center w-full">
          {/* Clickable link area */}
          <SidebarMenuButton
            asChild
            tooltip={isCollapsed ? item.label : undefined}
            className={cn(
              "flex-1 font-medium pr-8",
              level === 0 && "font-semibold",
              level > 0 && "text-sm"
            )}
          >
            <Link href={item.url || "#"}>
              {item.icon && <item.icon className={cn("shrink-0", level === 0 ? "size-4" : "size-3.5")} />}
              <span className="flex-1 truncate">{item.label}</span>
            </Link>
          </SidebarMenuButton>

          {/* Chevron toggle button */}
          {!isCollapsed && (
            <CollapsibleTrigger className="absolute right-1 flex items-center justify-center size-6 hover:bg-accent rounded-sm transition-colors">
              <ChevronRight
                className={cn(
                  "size-4 shrink-0 transition-transform",
                  isExpanded && "rotate-90"
                )}
              />
            </CollapsibleTrigger>
          )}
        </div>

        {/* Children */}
        <CollapsibleContent>
          <SidebarMenuSub className={cn(level > 0 && "ml-2")}>
            {item.children?.map((child) => (
              <NavigationItemComponent
                key={child.id}
                item={child}
                level={level + 1}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="border-r" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Building2 className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">ReqArchitect</span>
                  <span className="text-xs text-muted-foreground">Enterprise Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Platform Core Section */}
        <SidebarGroup>
          <SidebarMenu>
            {navigationData.slice(0, 2).map((item) => (
              <NavigationItemComponent key={item.id} item={item} level={0} />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Framework Capabilities Section */}
        <SidebarGroup>
          <SidebarMenu>
            {navigationData.slice(2, 8).map((item) => (
              <NavigationItemComponent key={item.id} item={item} level={0} />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Sales, AI, Code & Integrations Section */}
        <SidebarGroup>
          <SidebarMenu>
            {navigationData.slice(8, 12).map((item) => (
              <NavigationItemComponent key={item.id} item={item} level={0} />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Innovation & Customer Section */}
        <SidebarGroup>
          <SidebarMenu>
            {navigationData.slice(12, 14).map((item) => (
              <NavigationItemComponent key={item.id} item={item} level={0} />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Administration Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarMenu>
            {navigationData.slice(14).map((item) => (
              <NavigationItemComponent key={item.id} item={item} level={0} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm" asChild>
              <Link href="/profile/dashboard">
                <UserCog className="size-4" />
                <span>ReqArchitect Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
