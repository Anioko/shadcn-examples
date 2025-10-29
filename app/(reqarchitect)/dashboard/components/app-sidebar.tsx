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
  Calculator
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
        url: "/strategy/business-model-canvas/dashboard",
        children: [
          { id: "customer-segments", label: "Customer Segments", url: "/strategy/bmc/customer-segments/dashboard" },
          { id: "value-propositions", label: "Value Propositions", url: "/strategy/bmc/value-propositions/dashboard" },
          { id: "channels", label: "Channels", url: "/strategy/bmc/channels/dashboard" },
          { id: "customer-relationships", label: "Customer Relationships", url: "/strategy/bmc/customer-relationships/dashboard" },
          { id: "revenue-streams", label: "Revenue Streams", url: "/strategy/bmc/revenue-streams/dashboard" },
          { id: "key-resources", label: "Key Resources", url: "/strategy/bmc/key-resources/dashboard" },
          { id: "key-activities", label: "Key Activities", url: "/strategy/bmc/key-activities/dashboard" },
          { id: "key-partnerships", label: "Key Partnerships", url: "/strategy/bmc/key-partnerships/dashboard" },
          { id: "cost-structure", label: "Cost Structure", url: "/strategy/bmc/cost-structure/dashboard" }
        ]
      },
      {
        id: "lean-canvas",
        label: "Lean Canvas",
        url: "/strategy/lean-canvas/dashboard",
        children: [
          { id: "problem", label: "Problem", url: "/strategy/lean-canvas/problem/dashboard" },
          { id: "solution", label: "Solution", url: "/strategy/lean-canvas/solution/dashboard" },
          { id: "key-metrics", label: "Key Metrics", url: "/strategy/lean-canvas/key-metrics/dashboard" },
          { id: "unique-value-prop", label: "Unique Value Proposition", url: "/strategy/lean-canvas/uvp/dashboard" },
          { id: "unfair-advantage", label: "Unfair Advantage", url: "/strategy/lean-canvas/unfair-advantage/dashboard" }
        ]
      },
      {
        id: "value-proposition-canvas",
        label: "Value Proposition Canvas",
        url: "/strategy/value-proposition-canvas/dashboard",
        children: [
          { id: "customer-jobs", label: "Customer Jobs", url: "/strategy/vpc/customer-jobs/dashboard" },
          { id: "pains", label: "Pains", url: "/strategy/vpc/pains/dashboard" },
          { id: "gains", label: "Gains", url: "/strategy/vpc/gains/dashboard" },
          { id: "pain-relievers", label: "Pain Relievers", url: "/strategy/vpc/pain-relievers/dashboard" },
          { id: "gain-creators", label: "Gain Creators", url: "/strategy/vpc/gain-creators/dashboard" }
        ]
      },
      {
        id: "okr",
        label: "OKRs",
        url: "/strategy/okrs/dashboard",
        children: [
          { id: "company-objectives", label: "Company Objectives", url: "/strategy/okrs/company-objectives/dashboard" },
          { id: "team-objectives", label: "Team Objectives", url: "/strategy/okrs/team-objectives/dashboard" },
          { id: "individual-objectives", label: "Individual Objectives", url: "/strategy/okrs/individual-objectives/dashboard" },
          { id: "key-results", label: "Key Results Tracking", url: "/strategy/okrs/key-results/dashboard" }
        ]
      },
      {
        id: "porters-five-forces",
        label: "Porter's Five Forces",
        url: "/strategy/porters-five-forces/dashboard",
        children: [
          { id: "new-entrants", label: "Threat of New Entrants", url: "/strategy/porters/new-entrants/dashboard" },
          { id: "suppliers", label: "Bargaining Power of Suppliers", url: "/strategy/porters/suppliers/dashboard" },
          { id: "buyers", label: "Bargaining Power of Buyers", url: "/strategy/porters/buyers/dashboard" },
          { id: "substitutes", label: "Threat of Substitutes", url: "/strategy/porters/substitutes/dashboard" },
          { id: "rivalry", label: "Competitive Rivalry", url: "/strategy/porters/rivalry/dashboard" }
        ]
      },
      {
        id: "swot",
        label: "SWOT Analysis",
        url: "/strategy/swot/dashboard",
        children: [
          { id: "strengths", label: "Strengths", url: "/strategy/swot/strengths/dashboard" },
          { id: "weaknesses", label: "Weaknesses", url: "/strategy/swot/weaknesses/dashboard" },
          { id: "opportunities", label: "Opportunities", url: "/strategy/swot/opportunities/dashboard" },
          { id: "threats", label: "Threats", url: "/strategy/swot/threats/dashboard" }
        ]
      },
      {
        id: "pestle",
        label: "PESTLE Analysis",
        url: "/strategy/pestle/dashboard",
        children: [
          { id: "political", label: "Political", url: "/strategy/pestle/political/dashboard" },
          { id: "economic", label: "Economic", url: "/strategy/pestle/economic/dashboard" },
          { id: "social", label: "Social", url: "/strategy/pestle/social/dashboard" },
          { id: "technological", label: "Technological", url: "/strategy/pestle/technological/dashboard" },
          { id: "legal", label: "Legal", url: "/strategy/pestle/legal/dashboard" },
          { id: "environmental", label: "Environmental", url: "/strategy/pestle/environmental/dashboard" }
        ]
      },
      {
        id: "balanced-scorecard",
        label: "Balanced Scorecard",
        url: "/strategy/balanced-scorecard/dashboard",
        children: [
          { id: "financial", label: "Financial Perspective", url: "/strategy/bsc/financial/dashboard" },
          { id: "customer", label: "Customer Perspective", url: "/strategy/bsc/customer/dashboard" },
          { id: "internal-process", label: "Internal Process Perspective", url: "/strategy/bsc/internal-process/dashboard" },
          { id: "learning-growth", label: "Learning & Growth Perspective", url: "/strategy/bsc/learning-growth/dashboard" }
        ]
      },
      {
        id: "ansoff-matrix",
        label: "Ansoff Matrix",
        url: "/strategy/ansoff/dashboard",
        children: [
          { id: "market-penetration", label: "Market Penetration", url: "/strategy/ansoff/market-penetration/dashboard" },
          { id: "market-development", label: "Market Development", url: "/strategy/ansoff/market-development/dashboard" },
          { id: "product-development", label: "Product Development", url: "/strategy/ansoff/product-development/dashboard" },
          { id: "diversification", label: "Diversification", url: "/strategy/ansoff/diversification/dashboard" }
        ]
      },
      {
        id: "blue-ocean",
        label: "Blue Ocean Strategy",
        url: "/strategy/blue-ocean/dashboard",
        children: [
          { id: "eliminate", label: "Eliminate", url: "/strategy/blue-ocean/eliminate/dashboard" },
          { id: "reduce", label: "Reduce", url: "/strategy/blue-ocean/reduce/dashboard" },
          { id: "raise", label: "Raise", url: "/strategy/blue-ocean/raise/dashboard" },
          { id: "create", label: "Create", url: "/strategy/blue-ocean/create/dashboard" }
        ]
      },
      {
        id: "mckinsey-7s",
        label: "McKinsey 7S Framework",
        url: "/strategy/mckinsey-7s/dashboard",
        children: [
          { id: "strategy", label: "Strategy", url: "/strategy/7s/strategy/dashboard" },
          { id: "structure", label: "Structure", url: "/strategy/7s/structure/dashboard" },
          { id: "systems", label: "Systems", url: "/strategy/7s/systems/dashboard" },
          { id: "shared-values", label: "Shared Values", url: "/strategy/7s/shared-values/dashboard" },
          { id: "style", label: "Style", url: "/strategy/7s/style/dashboard" },
          { id: "staff", label: "Staff", url: "/strategy/7s/staff/dashboard" },
          { id: "skills", label: "Skills", url: "/strategy/7s/skills/dashboard" }
        ]
      },
      {
        id: "wardley-mapping",
        label: "Wardley Mapping",
        url: "/strategy/wardley-mapping/dashboard",
        children: [
          { id: "value-chain", label: "Value Chain Analysis", url: "/strategy/wardley/value-chain/dashboard" },
          { id: "evolution", label: "Evolution Stages", url: "/strategy/wardley/evolution/dashboard" },
          { id: "movement", label: "Strategic Movement", url: "/strategy/wardley/movement/dashboard" },
          { id: "gameplay", label: "Gameplay Patterns", url: "/strategy/wardley/gameplay/dashboard" }
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
        url: "/ea/togaf/dashboard",
        children: [
          { id: "preliminary-phase", label: "Preliminary Phase", url: "/ea/togaf/preliminary/dashboard" },
          { id: "architecture-vision", label: "Phase A: Architecture Vision", url: "/ea/togaf/vision/dashboard" },
          { id: "business-architecture", label: "Phase B: Business Architecture", url: "/ea/togaf/business/dashboard" },
          { id: "information-systems", label: "Phase C: Information Systems", url: "/ea/togaf/information-systems/dashboard" },
          { id: "technology-architecture", label: "Phase D: Technology Architecture", url: "/ea/togaf/technology/dashboard" },
          { id: "opportunities-solutions", label: "Phase E: Opportunities & Solutions", url: "/ea/togaf/opportunities/dashboard" },
          { id: "migration-planning", label: "Phase F: Migration Planning", url: "/ea/togaf/migration/dashboard" },
          { id: "implementation-governance", label: "Phase G: Implementation Governance", url: "/ea/togaf/implementation/dashboard" },
          { id: "architecture-change", label: "Phase H: Architecture Change Management", url: "/ea/togaf/change/dashboard" },
          { id: "requirements-management", label: "Requirements Management", url: "/ea/togaf/requirements/dashboard" }
        ]
      },
      {
        id: "archimate",
        label: "ArchiMate 3.2",
        url: "/ea/archimate/dashboard",
        children: [
          {
            id: "strategy-layer",
            label: "Strategy Layer",
            url: "/ea/archimate/strategy/dashboard",
            children: [
              { id: "resources", label: "Resources", url: "/ea/archimate/strategy/resources/dashboard" },
              { id: "capabilities", label: "Capabilities", url: "/ea/archimate/strategy/capabilities/dashboard" },
              { id: "courses-of-action", label: "Courses of Action", url: "/ea/archimate/strategy/courses-of-action/dashboard" },
              { id: "value-streams", label: "Value Streams", url: "/ea/archimate/strategy/value-streams/dashboard" }
            ]
          },
          {
            id: "business-layer",
            label: "Business Layer",
            url: "/ea/archimate/business/dashboard",
            children: [
              { id: "active-structure", label: "Active Structure Elements", url: "/ea/archimate/business/active-structure/dashboard" },
              { id: "behavior", label: "Behavior Elements", url: "/ea/archimate/business/behavior/dashboard" },
              { id: "passive-structure", label: "Passive Structure Elements", url: "/ea/archimate/business/passive-structure/dashboard" },
              { id: "business-actors", label: "Business Actors", url: "/ea/archimate/business/actors/dashboard" },
              { id: "business-roles", label: "Business Roles", url: "/ea/archimate/business/roles/dashboard" },
              { id: "business-collaboration", label: "Business Collaboration", url: "/ea/archimate/business/collaboration/dashboard" },
              { id: "business-processes", label: "Business Processes", url: "/ea/archimate/business/processes/dashboard" },
              { id: "business-functions", label: "Business Functions", url: "/ea/archimate/business/functions/dashboard" },
              { id: "business-interactions", label: "Business Interactions", url: "/ea/archimate/business/interactions/dashboard" },
              { id: "business-events", label: "Business Events", url: "/ea/archimate/business/events/dashboard" },
              { id: "business-services", label: "Business Services", url: "/ea/archimate/business/services/dashboard" },
              { id: "business-objects", label: "Business Objects", url: "/ea/archimate/business/objects/dashboard" },
              { id: "contracts", label: "Contracts", url: "/ea/archimate/business/contracts/dashboard" },
              { id: "representations", label: "Representations", url: "/ea/archimate/business/representations/dashboard" }
            ]
          },
          {
            id: "application-layer",
            label: "Application Layer",
            url: "/ea/archimate/application/dashboard",
            children: [
              { id: "application-components", label: "Application Components", url: "/ea/archimate/application/components/dashboard" },
              { id: "application-collaboration", label: "Application Collaboration", url: "/ea/archimate/application/collaboration/dashboard" },
              { id: "application-interface", label: "Application Interface", url: "/ea/archimate/application/interface/dashboard" },
              { id: "application-functions", label: "Application Functions", url: "/ea/archimate/application/functions/dashboard" },
              { id: "application-interactions", label: "Application Interactions", url: "/ea/archimate/application/interactions/dashboard" },
              { id: "application-processes", label: "Application Processes", url: "/ea/archimate/application/processes/dashboard" },
              { id: "application-events", label: "Application Events", url: "/ea/archimate/application/events/dashboard" },
              { id: "application-services", label: "Application Services", url: "/ea/archimate/application/services/dashboard" },
              { id: "data-objects", label: "Data Objects", url: "/ea/archimate/application/data-objects/dashboard" }
            ]
          },
          {
            id: "technology-layer",
            label: "Technology Layer",
            url: "/ea/archimate/technology/dashboard",
            children: [
              { id: "nodes", label: "Nodes", url: "/ea/archimate/technology/nodes/dashboard" },
              { id: "devices", label: "Devices", url: "/ea/archimate/technology/devices/dashboard" },
              { id: "system-software", label: "System Software", url: "/ea/archimate/technology/system-software/dashboard" },
              { id: "technology-collaboration", label: "Technology Collaboration", url: "/ea/archimate/technology/collaboration/dashboard" },
              { id: "technology-interface", label: "Technology Interface", url: "/ea/archimate/technology/interface/dashboard" },
              { id: "paths", label: "Paths", url: "/ea/archimate/technology/paths/dashboard" },
              { id: "communication-networks", label: "Communication Networks", url: "/ea/archimate/technology/networks/dashboard" },
              { id: "technology-functions", label: "Technology Functions", url: "/ea/archimate/technology/functions/dashboard" },
              { id: "technology-processes", label: "Technology Processes", url: "/ea/archimate/technology/processes/dashboard" },
              { id: "technology-interactions", label: "Technology Interactions", url: "/ea/archimate/technology/interactions/dashboard" },
              { id: "technology-events", label: "Technology Events", url: "/ea/archimate/technology/events/dashboard" },
              { id: "technology-services", label: "Technology Services", url: "/ea/archimate/technology/services/dashboard" },
              { id: "artifacts", label: "Artifacts", url: "/ea/archimate/technology/artifacts/dashboard" }
            ]
          },
          {
            id: "physical-layer",
            label: "Physical Layer",
            url: "/ea/archimate/physical/dashboard",
            children: [
              { id: "equipment", label: "Equipment", url: "/ea/archimate/physical/equipment/dashboard" },
              { id: "facilities", label: "Facilities", url: "/ea/archimate/physical/facilities/dashboard" },
              { id: "distribution-networks", label: "Distribution Networks", url: "/ea/archimate/physical/distribution-networks/dashboard" },
              { id: "materials", label: "Materials", url: "/ea/archimate/physical/materials/dashboard" }
            ]
          },
          {
            id: "implementation-migration",
            label: "Implementation & Migration",
            url: "/ea/archimate/migration/dashboard",
            children: [
              { id: "work-packages", label: "Work Packages", url: "/ea/archimate/migration/work-packages/dashboard" },
              { id: "deliverables", label: "Deliverables", url: "/ea/archimate/migration/deliverables/dashboard" },
              { id: "implementation-events", label: "Implementation Events", url: "/ea/archimate/migration/events/dashboard" },
              { id: "plateaus", label: "Plateaus", url: "/ea/archimate/migration/plateaus/dashboard" },
              { id: "gaps", label: "Gaps", url: "/ea/archimate/migration/gaps/dashboard" }
            ]
          },
          {
            id: "motivation-elements",
            label: "Motivation Elements",
            url: "/ea/archimate/motivation/dashboard",
            children: [
              { id: "stakeholders", label: "Stakeholders", url: "/ea/archimate/motivation/stakeholders/dashboard" },
              { id: "drivers", label: "Drivers", url: "/ea/archimate/motivation/drivers/dashboard" },
              { id: "assessments", label: "Assessments", url: "/ea/archimate/motivation/assessments/dashboard" },
              { id: "goals", label: "Goals", url: "/ea/archimate/motivation/goals/dashboard" },
              { id: "outcomes", label: "Outcomes", url: "/ea/archimate/motivation/outcomes/dashboard" },
              { id: "principles", label: "Principles", url: "/ea/archimate/motivation/principles/dashboard" },
              { id: "requirements", label: "Requirements", url: "/ea/archimate/motivation/requirements/dashboard" },
              { id: "constraints", label: "Constraints", url: "/ea/archimate/motivation/constraints/dashboard" },
              { id: "meaning", label: "Meaning", url: "/ea/archimate/motivation/meaning/dashboard" },
              { id: "value", label: "Value", url: "/ea/archimate/motivation/value/dashboard" }
            ]
          }
        ]
      },
      {
        id: "zachman",
        label: "Zachman Framework",
        url: "/ea/zachman/dashboard",
        children: [
          { id: "contextual", label: "Contextual (Planner's View)", url: "/ea/zachman/contextual/dashboard" },
          { id: "conceptual", label: "Conceptual (Owner's View)", url: "/ea/zachman/conceptual/dashboard" },
          { id: "logical", label: "Logical (Designer's View)", url: "/ea/zachman/logical/dashboard" },
          { id: "physical", label: "Physical (Builder's View)", url: "/ea/zachman/physical/dashboard" },
          { id: "detailed", label: "Detailed (Subcontractor's View)", url: "/ea/zachman/detailed/dashboard" }
        ]
      },
      {
        id: "sabsa",
        label: "SABSA",
        url: "/ea/sabsa/dashboard",
        children: [
          { id: "contextual", label: "Contextual (Business View)", url: "/ea/sabsa/contextual/dashboard" },
          { id: "conceptual", label: "Conceptual (Architect's View)", url: "/ea/sabsa/conceptual/dashboard" },
          { id: "logical", label: "Logical (Designer's View)", url: "/ea/sabsa/logical/dashboard" },
          { id: "physical", label: "Physical (Builder's View)", url: "/ea/sabsa/physical/dashboard" },
          { id: "component", label: "Component (Tradesman's View)", url: "/ea/sabsa/component/dashboard" },
          { id: "operational", label: "Operational (Facilities Manager View)", url: "/ea/sabsa/operational/dashboard" }
        ]
      },
      {
        id: "feaf",
        label: "Federal Enterprise Architecture (FEAF)",
        url: "/ea/feaf/dashboard",
        children: [
          { id: "business-reference", label: "Business Reference Model", url: "/ea/feaf/business-reference/dashboard" },
          { id: "service-component", label: "Service Component Reference Model", url: "/ea/feaf/service-component/dashboard" },
          { id: "technical-reference", label: "Technical Reference Model", url: "/ea/feaf/technical-reference/dashboard" },
          { id: "data-reference", label: "Data Reference Model", url: "/ea/feaf/data-reference/dashboard" },
          { id: "performance-reference", label: "Performance Reference Model", url: "/ea/feaf/performance-reference/dashboard" }
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
        url: "/risk/iso-27001/dashboard",
        children: [
          { id: "context-organization", label: "Clause 4: Context of Organization", url: "/risk/iso-27001/context/dashboard" },
          { id: "leadership", label: "Clause 5: Leadership", url: "/risk/iso-27001/leadership/dashboard" },
          { id: "planning", label: "Clause 6: Planning", url: "/risk/iso-27001/planning/dashboard" },
          { id: "support", label: "Clause 7: Support", url: "/risk/iso-27001/support/dashboard" },
          { id: "operation", label: "Clause 8: Operation", url: "/risk/iso-27001/operation/dashboard" },
          { id: "performance-evaluation", label: "Clause 9: Performance Evaluation", url: "/risk/iso-27001/performance/dashboard" },
          { id: "improvement", label: "Clause 10: Improvement", url: "/risk/iso-27001/improvement/dashboard" },
          {
            id: "annex-a",
            label: "Annex A Controls",
            url: "/risk/iso-27001/annex-a/dashboard",
            children: [
              { id: "organizational-controls", label: "Organizational Controls (37)", url: "/risk/iso-27001/annex-a/organizational/dashboard" },
              { id: "people-controls", label: "People Controls (8)", url: "/risk/iso-27001/annex-a/people/dashboard" },
              { id: "physical-controls", label: "Physical Controls (14)", url: "/risk/iso-27001/annex-a/physical/dashboard" },
              { id: "technological-controls", label: "Technological Controls (34)", url: "/risk/iso-27001/annex-a/technological/dashboard" }
            ]
          }
        ]
      },
      {
        id: "nist-csf",
        label: "NIST Cybersecurity Framework",
        url: "/risk/nist-csf/dashboard",
        children: [
          { id: "govern", label: "Govern", url: "/risk/nist-csf/govern/dashboard" },
          { id: "identify", label: "Identify", url: "/risk/nist-csf/identify/dashboard" },
          { id: "protect", label: "Protect", url: "/risk/nist-csf/protect/dashboard" },
          { id: "detect", label: "Detect", url: "/risk/nist-csf/detect/dashboard" },
          { id: "respond", label: "Respond", url: "/risk/nist-csf/respond/dashboard" },
          { id: "recover", label: "Recover", url: "/risk/nist-csf/recover/dashboard" }
        ]
      },
      {
        id: "cis-controls",
        label: "CIS Controls v8",
        url: "/risk/cis-controls/dashboard",
        children: [
          { id: "ig1", label: "Implementation Group 1 (Basic)", url: "/risk/cis/ig1/dashboard" },
          { id: "ig2", label: "Implementation Group 2 (Foundational)", url: "/risk/cis/ig2/dashboard" },
          { id: "ig3", label: "Implementation Group 3 (Organizational)", url: "/risk/cis/ig3/dashboard" }
        ]
      },
      {
        id: "soc2",
        label: "SOC 2 Type II",
        url: "/risk/soc2/dashboard",
        children: [
          { id: "security", label: "Security", url: "/risk/soc2/security/dashboard" },
          { id: "availability", label: "Availability", url: "/risk/soc2/availability/dashboard" },
          { id: "confidentiality", label: "Confidentiality", url: "/risk/soc2/confidentiality/dashboard" }
        ]
      },
      {
        id: "cobit-2019",
        label: "COBIT 2019",
        url: "/risk/cobit/dashboard",
        children: [
          { id: "governance-system", label: "Governance System", url: "/risk/cobit/governance-system/dashboard" },
          { id: "governance-objectives", label: "Governance & Management Objectives", url: "/risk/cobit/governance-objectives/dashboard" },
          { id: "design-factors", label: "Design Factors", url: "/risk/cobit/design-factors/dashboard" },
          { id: "performance-mgmt", label: "Performance Management", url: "/risk/cobit/performance/dashboard" }
        ]
      },
      {
        id: "gdpr",
        label: "GDPR Compliance",
        url: "/risk/gdpr/dashboard",
        children: [
          { id: "lawfulness", label: "Lawfulness, Fairness & Transparency", url: "/risk/gdpr/lawfulness/dashboard" },
          { id: "purpose-limitation", label: "Purpose Limitation", url: "/risk/gdpr/purpose-limitation/dashboard" },
          { id: "data-minimization", label: "Data Minimization", url: "/risk/gdpr/data-minimization/dashboard" },
          { id: "accuracy", label: "Accuracy", url: "/risk/gdpr/accuracy/dashboard" },
          { id: "storage-limitation", label: "Storage Limitation", url: "/risk/gdpr/storage-limitation/dashboard" },
          { id: "integrity-confidentiality", label: "Integrity & Confidentiality", url: "/risk/gdpr/integrity/dashboard" },
          { id: "accountability", label: "Accountability", url: "/risk/gdpr/accountability/dashboard" }
        ]
      },
      {
        id: "pci-dss",
        label: "PCI DSS 4.0",
        url: "/risk/pci-dss/dashboard",
        children: [
          { id: "secure-network", label: "Build & Maintain Secure Network", url: "/risk/pci-dss/secure-network/dashboard" },
          { id: "protect-data", label: "Protect Account Data", url: "/risk/pci-dss/protect-data/dashboard" },
          { id: "vulnerability-mgmt", label: "Maintain Vulnerability Management", url: "/risk/pci-dss/vulnerability/dashboard" },
          { id: "access-controls", label: "Implement Strong Access Controls", url: "/risk/pci-dss/access-controls/dashboard" },
          { id: "monitor-test", label: "Monitor & Test Networks", url: "/risk/pci-dss/monitor-test/dashboard" },
          { id: "security-policy", label: "Maintain Information Security Policy", url: "/risk/pci-dss/security-policy/dashboard" }
        ]
      },
      {
        id: "coso",
        label: "COSO Framework",
        url: "/risk/coso/dashboard",
        children: [
          { id: "control-environment", label: "Control Environment", url: "/risk/coso/control-environment/dashboard" },
          { id: "risk-assessment", label: "Risk Assessment", url: "/risk/coso/risk-assessment/dashboard" },
          { id: "control-activities", label: "Control Activities", url: "/risk/coso/control-activities/dashboard" },
          { id: "information-communication", label: "Information & Communication", url: "/risk/coso/information-communication/dashboard" },
          { id: "monitoring", label: "Monitoring Activities", url: "/risk/coso/monitoring/dashboard" }
        ]
      },
      {
        id: "iso-31000",
        label: "ISO 31000 Risk Management",
        url: "/risk/iso-31000/dashboard",
        children: [
          { id: "risk-identification", label: "Risk Identification", url: "/risk/iso-31000/identification/dashboard" },
          { id: "risk-analysis", label: "Risk Analysis", url: "/risk/iso-31000/analysis/dashboard" },
          { id: "risk-evaluation", label: "Risk Evaluation", url: "/risk/iso-31000/evaluation/dashboard" },
          { id: "risk-treatment", label: "Risk Treatment", url: "/risk/iso-31000/treatment/dashboard" },
          { id: "monitoring-review", label: "Monitoring & Review", url: "/risk/iso-31000/monitoring-review/dashboard" }
        ]
      },
      {
        id: "three-lines-defense",
        label: "Three Lines of Defense",
        url: "/risk/three-lines/dashboard",
        children: [
          { id: "first-line", label: "First Line: Operational Management", url: "/risk/three-lines/first-line/dashboard" },
          { id: "second-line", label: "Second Line: Risk Management & Compliance", url: "/risk/three-lines/second-line/dashboard" },
          { id: "third-line", label: "Third Line: Internal Audit", url: "/risk/three-lines/third-line/dashboard" }
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
        url: "/business/scrum/dashboard",
        children: [
          { id: "product-backlog", label: "Product Backlog", url: "/business/scrum/backlog/dashboard" },
          { id: "sprint-backlog", label: "Sprint Backlog", url: "/business/scrum/sprint-backlog/dashboard" },
          { id: "increment", label: "Increment", url: "/business/scrum/increment/dashboard" },
          { id: "definition-done", label: "Definition of Done", url: "/business/scrum/dod/dashboard" },
          { id: "sprint-planning", label: "Sprint Planning", url: "/business/scrum/planning/dashboard" },
          { id: "daily-scrum", label: "Daily Scrum", url: "/business/scrum/daily/dashboard" },
          { id: "sprint-review", label: "Sprint Review", url: "/business/scrum/review/dashboard" },
          { id: "sprint-retrospective", label: "Sprint Retrospective", url: "/business/scrum/retrospective/dashboard" },
          { id: "product-owner", label: "Product Owner", url: "/business/scrum/product-owner/dashboard" },
          { id: "scrum-master", label: "Scrum Master", url: "/business/scrum/scrum-master/dashboard" },
          { id: "developers", label: "Developers", url: "/business/scrum/developers/dashboard" }
        ]
      },
      {
        id: "safe",
        label: "SAFe 6.0",
        url: "/business/safe/dashboard",
        children: [
          { id: "essential", label: "Essential SAFe", url: "/business/safe/essential/dashboard" },
          { id: "large-solution", label: "Large Solution SAFe", url: "/business/safe/large-solution/dashboard" },
          { id: "portfolio", label: "Portfolio SAFe", url: "/business/safe/portfolio/dashboard" },
          { id: "full", label: "Full SAFe", url: "/business/safe/full/dashboard" }
        ]
      },
      {
        id: "six-sigma",
        label: "Six Sigma / DMAIC",
        url: "/business/six-sigma/dashboard",
        children: [
          { id: "define", label: "Define", url: "/business/six-sigma/define/dashboard" },
          { id: "measure", label: "Measure", url: "/business/six-sigma/measure/dashboard" },
          { id: "analyze", label: "Analyze", url: "/business/six-sigma/analyze/dashboard" },
          { id: "improve", label: "Improve", url: "/business/six-sigma/improve/dashboard" },
          { id: "control", label: "Control", url: "/business/six-sigma/control/dashboard" }
        ]
      },
      {
        id: "lean",
        label: "Lean Management",
        url: "/business/lean/dashboard",
        children: [
          { id: "value-stream", label: "Value Stream Mapping", url: "/business/lean/value-stream/dashboard" },
          { id: "5s", label: "5S Methodology", url: "/business/lean/5s/dashboard" },
          { id: "kaizen", label: "Kaizen", url: "/business/lean/kaizen/dashboard" },
          { id: "kanban", label: "Kanban", url: "/business/lean/kanban/dashboard" },
          { id: "waste-elimination", label: "Waste Elimination", url: "/business/lean/waste-elimination/dashboard" }
        ]
      },
      {
        id: "iso-9001",
        label: "ISO 9001:2015",
        url: "/business/iso-9001/dashboard",
        children: [
          { id: "context", label: "Context of Organization", url: "/business/iso-9001/context/dashboard" },
          { id: "leadership", label: "Leadership", url: "/business/iso-9001/leadership/dashboard" },
          { id: "planning", label: "Planning", url: "/business/iso-9001/planning/dashboard" },
          { id: "support", label: "Support", url: "/business/iso-9001/support/dashboard" },
          { id: "operation", label: "Operation", url: "/business/iso-9001/operation/dashboard" },
          { id: "evaluation", label: "Performance Evaluation", url: "/business/iso-9001/evaluation/dashboard" },
          { id: "improvement", label: "Improvement", url: "/business/iso-9001/improvement/dashboard" }
        ]
      },
      {
        id: "kanban",
        label: "Kanban Method",
        url: "/business/kanban/dashboard",
        children: [
          { id: "visualize-workflow", label: "Visualize Workflow", url: "/business/kanban/visualize/dashboard" },
          { id: "limit-wip", label: "Limit Work in Progress", url: "/business/kanban/limit-wip/dashboard" },
          { id: "manage-flow", label: "Manage Flow", url: "/business/kanban/manage-flow/dashboard" },
          { id: "explicit-policies", label: "Make Policies Explicit", url: "/business/kanban/policies/dashboard" },
          { id: "feedback-loops", label: "Implement Feedback Loops", url: "/business/kanban/feedback/dashboard" },
          { id: "improve-collaboratively", label: "Improve Collaboratively", url: "/business/kanban/improve/dashboard" }
        ]
      },
      {
        id: "less",
        label: "LeSS (Large-Scale Scrum)",
        url: "/business/less/dashboard",
        children: [
          { id: "less-framework", label: "LeSS Framework", url: "/business/less/framework/dashboard" },
          { id: "less-huge", label: "LeSS Huge", url: "/business/less/huge/dashboard" },
          { id: "organizational-structure", label: "Organizational Structure", url: "/business/less/org-structure/dashboard" },
          { id: "product-owner", label: "Product Owner", url: "/business/less/product-owner/dashboard" },
          { id: "sprint-planning", label: "Sprint Planning", url: "/business/less/sprint-planning/dashboard" }
        ]
      },
      {
        id: "prince2",
        label: "PRINCE2",
        url: "/business/prince2/dashboard",
        children: [
          { id: "starting-project", label: "Starting Up a Project", url: "/business/prince2/starting/dashboard" },
          { id: "initiating-project", label: "Initiating a Project", url: "/business/prince2/initiating/dashboard" },
          { id: "directing-project", label: "Directing a Project", url: "/business/prince2/directing/dashboard" },
          { id: "controlling-stage", label: "Controlling a Stage", url: "/business/prince2/controlling/dashboard" },
          { id: "managing-product-delivery", label: "Managing Product Delivery", url: "/business/prince2/product-delivery/dashboard" },
          { id: "managing-stage-boundary", label: "Managing a Stage Boundary", url: "/business/prince2/stage-boundary/dashboard" },
          { id: "closing-project", label: "Closing a Project", url: "/business/prince2/closing/dashboard" }
        ]
      },
      {
        id: "pmbok",
        label: "PMBOK",
        url: "/business/pmbok/dashboard",
        children: [
          { id: "integration", label: "Integration Management", url: "/business/pmbok/integration/dashboard" },
          { id: "scope", label: "Scope Management", url: "/business/pmbok/scope/dashboard" },
          { id: "schedule", label: "Schedule Management", url: "/business/pmbok/schedule/dashboard" },
          { id: "cost", label: "Cost Management", url: "/business/pmbok/cost/dashboard" },
          { id: "quality", label: "Quality Management", url: "/business/pmbok/quality/dashboard" },
          { id: "resource", label: "Resource Management", url: "/business/pmbok/resource/dashboard" },
          { id: "communications", label: "Communications Management", url: "/business/pmbok/communications/dashboard" },
          { id: "risk", label: "Risk Management", url: "/business/pmbok/risk/dashboard" },
          { id: "procurement", label: "Procurement Management", url: "/business/pmbok/procurement/dashboard" },
          { id: "stakeholder", label: "Stakeholder Management", url: "/business/pmbok/stakeholder/dashboard" }
        ]
      },
      {
        id: "bpmn",
        label: "BPMN 2.0",
        url: "/business/bpmn/dashboard",
        children: [
          { id: "events", label: "Events", url: "/business/bpmn/events/dashboard" },
          { id: "activities", label: "Activities", url: "/business/bpmn/activities/dashboard" },
          { id: "gateways", label: "Gateways", url: "/business/bpmn/gateways/dashboard" },
          { id: "flows", label: "Sequence & Message Flows", url: "/business/bpmn/flows/dashboard" },
          { id: "pools-lanes", label: "Pools & Lanes", url: "/business/bpmn/pools-lanes/dashboard" }
        ]
      },
      {
        id: "kotters-8-step",
        label: "Kotter's 8-Step Change",
        url: "/business/kotters-8-step/dashboard",
        children: [
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
        url: "/it/itil4/dashboard",
        children: [
          { id: "service-value-system", label: "Service Value System", url: "/it/itil4/svs/dashboard" },
          { id: "service-value-chain", label: "Service Value Chain", url: "/it/itil4/svc/dashboard" },
          { id: "continual-improvement", label: "Continual Improvement", url: "/it/itil4/continual-improvement/dashboard" },
          { id: "change-enablement", label: "Change Enablement", url: "/it/itil4/change-enablement/dashboard" },
          { id: "incident-management", label: "Incident Management", url: "/it/itil4/incident/dashboard" },
          { id: "problem-management", label: "Problem Management", url: "/it/itil4/problem/dashboard" },
          { id: "service-request", label: "Service Request Management", url: "/it/itil4/service-request/dashboard" },
          { id: "service-desk", label: "Service Desk", url: "/it/itil4/service-desk/dashboard" },
          { id: "service-level", label: "Service Level Management", url: "/it/itil4/service-level/dashboard" },
          { id: "availability", label: "Availability Management", url: "/it/itil4/availability/dashboard" },
          { id: "capacity-performance", label: "Capacity & Performance Management", url: "/it/itil4/capacity/dashboard" },
          { id: "monitoring-events", label: "Monitoring & Event Management", url: "/it/itil4/monitoring/dashboard" },
          { id: "release-management", label: "Release Management", url: "/it/itil4/release/dashboard" },
          { id: "deployment-management", label: "Deployment Management", url: "/it/itil4/deployment/dashboard" }
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
          { id: "deployment-frequency", label: "Deployment Frequency", url: "/it/devops/deployment-frequency/dashboard" },
          { id: "lead-time", label: "Lead Time for Changes", url: "/it/devops/lead-time/dashboard" },
          { id: "mttr", label: "Mean Time to Recovery", url: "/it/devops/mttr/dashboard" },
          { id: "change-failure-rate", label: "Change Failure Rate", url: "/it/devops/change-failure-rate/dashboard" }
        ]
      }
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
  const hasChildren = item.children && item.children.length > 0;
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

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
  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={isCollapsed ? item.label : undefined}
            className={cn(
              "relative font-medium",
              level === 0 && "font-semibold",
              level > 0 && "text-sm"
            )}
          >
            {item.icon && <item.icon className={cn("shrink-0", level === 0 ? "size-4" : "size-3.5")} />}
            <span className="flex-1 truncate">{item.label}</span>

            {/* Chevron indicator */}
            {!isCollapsed && (
              <ChevronRight
                className={cn(
                  "ml-auto size-4 shrink-0 transition-transform",
                  isExpanded && "rotate-90"
                )}
              />
            )}
          </SidebarMenuButton>
        </CollapsibleTrigger>

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

        {/* Innovation & Customer Section */}
        <SidebarGroup>
          <SidebarMenu>
            {navigationData.slice(8, 10).map((item) => (
              <NavigationItemComponent key={item.id} item={item} level={0} />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Administration Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarMenu>
            {navigationData.slice(10).map((item) => (
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
