// Mock data for Workflow boards (BPMN, ITIL4, DevOps)

import { WorkflowNode, WorkflowEdge, WorkflowBoard } from "./types/workflow"

// =============================================================================
// BPMN 2.0 - Order Processing Workflow
// =============================================================================

export const bpmnMockNodes: WorkflowNode[] = [
  // Customer Lane
  {
    id: "bpmn-start",
    type: "start",
    label: "Customer Places Order",
    status: "completed",
    position: { x: 50, y: 50 },
    metadata: { duration: "1 min" },
  },
  {
    id: "bpmn-submit",
    type: "task",
    label: "Submit Order Form",
    status: "completed",
    position: { x: 200, y: 50 },
    metadata: { duration: "2 min", automation: false },
  },

  // Sales Lane
  {
    id: "bpmn-receive",
    type: "event",
    label: "Order Received",
    status: "completed",
    position: { x: 400, y: 180 },
    metadata: { automation: true },
  },
  {
    id: "bpmn-validate",
    type: "task",
    label: "Validate Order",
    status: "active",
    position: { x: 550, y: 180 },
    metadata: { duration: "10 min", assignee: "Sales Team" },
  },
  {
    id: "bpmn-check-stock",
    type: "decision",
    label: "In Stock?",
    status: "active",
    position: { x: 730, y: 180 },
    metadata: { automation: true },
  },

  // Fulfillment Lane
  {
    id: "bpmn-process-order",
    type: "task",
    label: "Process Order",
    status: "pending",
    position: { x: 900, y: 310 },
    metadata: { duration: "30 min", assignee: "Warehouse" },
  },
  {
    id: "bpmn-ship",
    type: "task",
    label: "Ship Order",
    status: "pending",
    position: { x: 1080, y: 310 },
    metadata: { duration: "2 hours", assignee: "Logistics" },
  },

  // Finance Lane
  {
    id: "bpmn-invoice",
    type: "task",
    label: "Generate Invoice",
    status: "pending",
    position: { x: 900, y: 440 },
    metadata: { duration: "5 min", automation: true },
  },
  {
    id: "bpmn-payment",
    type: "task",
    label: "Process Payment",
    status: "pending",
    position: { x: 1080, y: 440 },
    metadata: { duration: "1 min", automation: true },
  },

  // End
  {
    id: "bpmn-end",
    type: "end",
    label: "Order Complete",
    status: "pending",
    position: { x: 1280, y: 310 },
  },

  // Error path
  {
    id: "bpmn-backorder",
    type: "task",
    label: "Create Backorder",
    status: "pending",
    position: { x: 730, y: 50 },
    metadata: { duration: "15 min" },
  },
]

export const bpmnMockEdges: WorkflowEdge[] = [
  { id: "e1", source: "bpmn-start", target: "bpmn-submit", label: "" },
  { id: "e2", source: "bpmn-submit", target: "bpmn-receive", label: "" },
  { id: "e3", source: "bpmn-receive", target: "bpmn-validate", label: "" },
  { id: "e4", source: "bpmn-validate", target: "bpmn-check-stock", label: "" },
  { id: "e5", source: "bpmn-check-stock", target: "bpmn-process-order", label: "Yes", condition: "stock > 0" },
  { id: "e6", source: "bpmn-check-stock", target: "bpmn-backorder", label: "No", condition: "stock == 0", type: "conditional" },
  { id: "e7", source: "bpmn-process-order", target: "bpmn-ship", label: "" },
  { id: "e8", source: "bpmn-process-order", target: "bpmn-invoice", label: "Parallel" },
  { id: "e9", source: "bpmn-invoice", target: "bpmn-payment", label: "" },
  { id: "e10", source: "bpmn-ship", target: "bpmn-end", label: "" },
  { id: "e11", source: "bpmn-payment", target: "bpmn-end", label: "" },
]

// =============================================================================
// ITIL 4 - Incident Management Workflow
// =============================================================================

export const itil4MockNodes: WorkflowNode[] = [
  // User Lane
  {
    id: "itil-start",
    type: "start",
    label: "User Reports Issue",
    status: "completed",
    position: { x: 50, y: 50 },
  },
  {
    id: "itil-ticket",
    type: "task",
    label: "Create Ticket",
    status: "completed",
    position: { x: 220, y: 50 },
    metadata: { duration: "2 min", automation: true },
  },

  // Service Desk Lane
  {
    id: "itil-classify",
    type: "task",
    label: "Classify Incident",
    status: "completed",
    position: { x: 420, y: 180 },
    metadata: { duration: "5 min", assignee: "Service Desk" },
  },
  {
    id: "itil-priority",
    type: "decision",
    label: "Priority?",
    status: "active",
    position: { x: 600, y: 180 },
    metadata: { sla: "P1: 1hr, P2: 4hr, P3: 24hr" },
  },

  // Support Team Lane
  {
    id: "itil-investigate",
    type: "task",
    label: "Investigate",
    status: "active",
    position: { x: 800, y: 310 },
    metadata: { duration: "30 min", assignee: "L2 Support" },
  },
  {
    id: "itil-resolve",
    type: "task",
    label: "Resolve Incident",
    status: "pending",
    position: { x: 1000, y: 310 },
    metadata: { assignee: "Technical Team" },
  },
  {
    id: "itil-workaround",
    type: "task",
    label: "Provide Workaround",
    status: "pending",
    position: { x: 800, y: 180 },
    metadata: { duration: "15 min" },
  },

  // Change Management Lane
  {
    id: "itil-change",
    type: "subprocess",
    label: "Raise Change Request",
    status: "pending",
    position: { x: 800, y: 440 },
    metadata: { sla: "RFC approval: 24hr" },
  },

  // Resolution
  {
    id: "itil-close",
    type: "task",
    label: "Close Ticket",
    status: "pending",
    position: { x: 1200, y: 310 },
    metadata: { automation: true },
  },
  {
    id: "itil-end",
    type: "end",
    label: "Incident Resolved",
    status: "pending",
    position: { x: 1380, y: 310 },
  },
]

export const itil4MockEdges: WorkflowEdge[] = [
  { id: "i1", source: "itil-start", target: "itil-ticket" },
  { id: "i2", source: "itil-ticket", target: "itil-classify" },
  { id: "i3", source: "itil-classify", target: "itil-priority" },
  { id: "i4", source: "itil-priority", target: "itil-investigate", label: "P2/P3", condition: "priority >= 2" },
  { id: "i5", source: "itil-priority", target: "itil-workaround", label: "P1 Critical", condition: "priority == 1", type: "conditional" },
  { id: "i6", source: "itil-workaround", target: "itil-investigate" },
  { id: "i7", source: "itil-investigate", target: "itil-resolve" },
  { id: "i8", source: "itil-investigate", target: "itil-change", label: "Needs Change", type: "conditional" },
  { id: "i9", source: "itil-resolve", target: "itil-close" },
  { id: "i10", source: "itil-close", target: "itil-end" },
]

// =============================================================================
// DevOps - CI/CD Pipeline Workflow
// =============================================================================

export const devopsMockNodes: WorkflowNode[] = [
  // Development Lane
  {
    id: "dev-start",
    type: "start",
    label: "Code Commit",
    status: "completed",
    position: { x: 50, y: 50 },
  },
  {
    id: "dev-pr",
    type: "task",
    label: "Create Pull Request",
    status: "completed",
    position: { x: 220, y: 50 },
    metadata: { duration: "5 min", assignee: "Developer" },
  },
  {
    id: "dev-review",
    type: "decision",
    label: "Code Review",
    status: "completed",
    position: { x: 420, y: 50 },
    metadata: { assignee: "Senior Dev" },
  },

  // Build & Test Lane
  {
    id: "build-trigger",
    type: "event",
    label: "Build Triggered",
    status: "active",
    position: { x: 620, y: 180 },
    metadata: { automation: true },
  },
  {
    id: "build-compile",
    type: "task",
    label: "Compile Code",
    status: "active",
    position: { x: 790, y: 180 },
    metadata: { duration: "3 min", automation: true },
  },
  {
    id: "build-unit",
    type: "task",
    label: "Unit Tests",
    status: "pending",
    position: { x: 970, y: 180 },
    metadata: { duration: "5 min", automation: true },
  },
  {
    id: "build-integration",
    type: "task",
    label: "Integration Tests",
    status: "pending",
    position: { x: 1150, y: 180 },
    metadata: { duration: "10 min", automation: true },
  },
  {
    id: "build-quality",
    type: "decision",
    label: "Quality Gate",
    status: "pending",
    position: { x: 1350, y: 180 },
    metadata: { automation: true },
  },

  // Staging Lane
  {
    id: "stage-deploy",
    type: "task",
    label: "Deploy to Staging",
    status: "pending",
    position: { x: 1550, y: 310 },
    metadata: { duration: "2 min", automation: true },
  },
  {
    id: "stage-smoke",
    type: "task",
    label: "Smoke Tests",
    status: "pending",
    position: { x: 1730, y: 310 },
    metadata: { duration: "5 min", automation: true },
  },

  // Production Lane
  {
    id: "prod-approval",
    type: "decision",
    label: "Approve Deploy?",
    status: "pending",
    position: { x: 1550, y: 440 },
    metadata: { assignee: "Release Manager" },
  },
  {
    id: "prod-deploy",
    type: "task",
    label: "Deploy to Production",
    status: "pending",
    position: { x: 1730, y: 440 },
    metadata: { automation: true },
  },
  {
    id: "prod-monitor",
    type: "task",
    label: "Monitor Metrics",
    status: "pending",
    position: { x: 1910, y: 440 },
    metadata: { automation: true, sla: "24/7 monitoring" },
  },
  {
    id: "dev-end",
    type: "end",
    label: "Release Complete",
    status: "pending",
    position: { x: 2090, y: 440 },
  },

  // Error handling
  {
    id: "build-fail",
    type: "task",
    label: "Notify Developer",
    status: "pending",
    position: { x: 1350, y: 50 },
    metadata: { automation: true },
  },
]

export const devopsMockEdges: WorkflowEdge[] = [
  { id: "d1", source: "dev-start", target: "dev-pr" },
  { id: "d2", source: "dev-pr", target: "dev-review" },
  { id: "d3", source: "dev-review", target: "build-trigger", label: "Approved" },
  { id: "d4", source: "build-trigger", target: "build-compile" },
  { id: "d5", source: "build-compile", target: "build-unit" },
  { id: "d6", source: "build-unit", target: "build-integration" },
  { id: "d7", source: "build-integration", target: "build-quality" },
  { id: "d8", source: "build-quality", target: "stage-deploy", label: "Pass", condition: "quality > 80%" },
  { id: "d9", source: "build-quality", target: "build-fail", label: "Fail", condition: "quality <= 80%", type: "error" },
  { id: "d10", source: "stage-deploy", target: "stage-smoke" },
  { id: "d11", source: "stage-smoke", target: "prod-approval" },
  { id: "d12", source: "prod-approval", target: "prod-deploy", label: "Approved" },
  { id: "d13", source: "prod-deploy", target: "prod-monitor" },
  { id: "d14", source: "prod-monitor", target: "dev-end" },
]

// =============================================================================
// ArchiMate 3.2 - Enterprise Architecture Model
// =============================================================================

export const archimate32MockNodes: WorkflowNode[] = [
  // Strategy Layer
  {
    id: "arch-driver-1",
    type: "driver",
    label: "Digital Transformation",
    description: "Need to modernize systems",
    status: "completed",
    position: { x: 50, y: 50 },
  },
  {
    id: "arch-goal-1",
    type: "goal",
    label: "Increase Efficiency",
    description: "Reduce processing time by 40%",
    status: "active",
    position: { x: 250, y: 50 },
  },
  {
    id: "arch-capability-1",
    type: "capability",
    label: "Order Management",
    description: "End-to-end order processing capability (WHITE BOX EXAMPLE)",
    status: "active",
    position: { x: 450, y: 50 },
    metadata: {
      width: 400,
      height: 250,
      isCollapsed: false
    },
  },
  // NESTED ELEMENTS inside Order Management capability (child elements)
  {
    id: "arch-capability-child-1",
    type: "capability",
    label: "Order Validation",
    description: "Validate customer orders",
    status: "active",
    position: { x: 20, y: 40 },
    metadata: {
      parentNode: "arch-capability-1",
      width: 120,
      height: 60
    },
  },
  {
    id: "arch-capability-child-2",
    type: "capability",
    label: "Order Processing",
    description: "Process validated orders",
    status: "active",
    position: { x: 160, y: 40 },
    metadata: {
      parentNode: "arch-capability-1",
      width: 120,
      height: 60
    },
  },
  {
    id: "arch-capability-child-3",
    type: "capability",
    label: "Order Fulfillment",
    description: "Fulfill processed orders",
    status: "active",
    position: { x: 20, y: 120 },
    metadata: {
      parentNode: "arch-capability-1",
      width: 120,
      height: 60
    },
  },
  {
    id: "arch-capability-child-4",
    type: "capability",
    label: "Order Tracking",
    description: "Track order status",
    status: "active",
    position: { x: 160, y: 120 },
    metadata: {
      parentNode: "arch-capability-1",
      width: 120,
      height: 60
    },
  },
  {
    id: "arch-course-1",
    type: "course-of-action",
    label: "Implement CRM System",
    description: "Deploy new customer relationship platform",
    status: "pending",
    position: { x: 900, y: 50 },
  },

  // Business Layer
  {
    id: "arch-actor-1",
    type: "business-actor",
    label: "Sales Manager",
    description: "Manages sales team and processes",
    status: "active",
    position: { x: 50, y: 200 },
  },
  {
    id: "arch-process-1",
    type: "business-process",
    label: "Process Customer Order",
    description: "Handle incoming customer orders (CONTAINS SUB-PROCESSES)",
    status: "active",
    position: { x: 250, y: 200 },
    metadata: {
      duration: "15 min",
      width: 500,
      height: 200,
      isCollapsed: false
    },
  },
  // NESTED SUB-PROCESSES inside Process Customer Order
  {
    id: "arch-subprocess-1",
    type: "business-function",
    label: "Receive Order",
    description: "Initial order intake",
    status: "active",
    position: { x: 20, y: 40 },
    metadata: {
      parentNode: "arch-process-1",
      width: 100,
      height: 50
    },
  },
  {
    id: "arch-subprocess-2",
    type: "business-function",
    label: "Validate Order",
    description: "Check order validity",
    status: "active",
    position: { x: 140, y: 40 },
    metadata: {
      parentNode: "arch-process-1",
      width: 100,
      height: 50
    },
  },
  {
    id: "arch-subprocess-3",
    type: "business-function",
    label: "Process Payment",
    description: "Handle payment",
    status: "active",
    position: { x: 260, y: 40 },
    metadata: {
      parentNode: "arch-process-1",
      width: 100,
      height: 50
    },
  },
  {
    id: "arch-subprocess-4",
    type: "business-function",
    label: "Confirm Order",
    description: "Send confirmation",
    status: "active",
    position: { x: 380, y: 40 },
    metadata: {
      parentNode: "arch-process-1",
      width: 100,
      height: 50
    },
  },
  {
    id: "arch-subprocess-5",
    type: "business-function",
    label: "Update Inventory",
    description: "Stock management",
    status: "active",
    position: { x: 20, y: 110 },
    metadata: {
      parentNode: "arch-process-1",
      width: 100,
      height: 50
    },
  },
  {
    id: "arch-subprocess-6",
    type: "business-function",
    label: "Notify Warehouse",
    description: "Alert fulfillment",
    status: "active",
    position: { x: 140, y: 110 },
    metadata: {
      parentNode: "arch-process-1",
      width: 100,
      height: 50
    },
  },
  {
    id: "arch-service-1",
    type: "business-service",
    label: "Order Service",
    description: "Customer-facing order service",
    status: "active",
    position: { x: 470, y: 200 },
  },
  {
    id: "arch-object-1",
    type: "business-object",
    label: "Customer Order",
    description: "Order information",
    status: "completed",
    position: { x: 670, y: 200 },
  },

  // Application Layer
  {
    id: "arch-app-comp-1",
    type: "application-component",
    label: "CRM Application",
    description: "Customer relationship management system (BLACK BOX EXAMPLE - Click chevron to expand)",
    status: "active",
    position: { x: 50, y: 370 },
    metadata: {
      technology: "Salesforce",
      width: 350,
      height: 220,
      isCollapsed: true
    },
  },
  // NESTED MODULES inside CRM Application (child elements) - Currently hidden because parent is collapsed
  {
    id: "arch-app-module-1",
    type: "application-component",
    label: "Contact Module",
    description: "Manage customer contacts",
    status: "active",
    position: { x: 20, y: 40 },
    metadata: {
      parentNode: "arch-app-comp-1",
      width: 140,
      height: 60,
      hidden: true
    },
  },
  {
    id: "arch-app-module-2",
    type: "application-component",
    label: "Sales Module",
    description: "Track sales opportunities",
    status: "active",
    position: { x: 180, y: 40 },
    metadata: {
      parentNode: "arch-app-comp-1",
      width: 140,
      height: 60,
      hidden: true
    },
  },
  {
    id: "arch-app-module-3",
    type: "application-component",
    label: "Reporting Module",
    description: "Generate reports and analytics",
    status: "active",
    position: { x: 20, y: 120 },
    metadata: {
      parentNode: "arch-app-comp-1",
      width: 140,
      height: 60,
      hidden: true
    },
  },
  {
    id: "arch-app-module-4",
    type: "application-component",
    label: "Integration Module",
    description: "API and data integration",
    status: "active",
    position: { x: 180, y: 120 },
    metadata: {
      parentNode: "arch-app-comp-1",
      width: 140,
      height: 60,
      hidden: true
    },
  },
  {
    id: "arch-app-service-1",
    type: "application-service",
    label: "Customer Data API",
    description: "Provides customer information",
    status: "active",
    position: { x: 250, y: 370 },
  },
  {
    id: "arch-data-1",
    type: "data-object",
    label: "Customer Database",
    description: "Central customer data store",
    status: "active",
    position: { x: 450, y: 370 },
  },
  {
    id: "arch-app-comp-2",
    type: "application-component",
    label: "Order Management System",
    description: "Processes and tracks orders",
    status: "pending",
    position: { x: 650, y: 370 },
    metadata: { technology: "SAP" },
  },

  // Technology Layer
  {
    id: "arch-node-1",
    type: "infrastructure-node",
    label: "Application Server",
    description: "Production app server cluster",
    status: "active",
    position: { x: 50, y: 540 },
    metadata: { specs: "8 CPU, 32GB RAM" },
  },
  {
    id: "arch-tech-service-1",
    type: "technology-service",
    label: "Database Service",
    description: "PostgreSQL database service",
    status: "active",
    position: { x: 250, y: 540 },
  },
  {
    id: "arch-node-2",
    type: "infrastructure-node",
    label: "Cloud Infrastructure",
    description: "AWS cloud platform",
    status: "active",
    position: { x: 450, y: 540 },
    metadata: { specs: "Multi-AZ deployment" },
  },

  // Implementation & Migration
  {
    id: "arch-workpackage-1",
    type: "work-package",
    label: "CRM Implementation",
    description: "Deploy and configure CRM",
    status: "active",
    position: { x: 850, y: 200 },
    metadata: { duration: "Q2 2025" },
  },
  {
    id: "arch-deliverable-1",
    type: "deliverable",
    label: "System Documentation",
    description: "Technical and user docs",
    status: "pending",
    position: { x: 1050, y: 200 },
  },
  {
    id: "arch-workpackage-2",
    type: "work-package",
    label: "Data Migration",
    description: "Migrate legacy customer data",
    status: "pending",
    position: { x: 850, y: 370 },
    metadata: { duration: "Q3 2025" },
  },
]

export const archimate32MockEdges: WorkflowEdge[] = [
  // Strategy relationships - using ArchiMate 3.2 relationship types
  { id: "a1", source: "arch-driver-1", target: "arch-goal-1", label: "influence", archimateRelationType: "influence" },
  { id: "a2", source: "arch-goal-1", target: "arch-capability-1", label: "realization", archimateRelationType: "realization" },
  { id: "a3", source: "arch-capability-1", target: "arch-course-1", label: "association", archimateRelationType: "association" },

  // Strategy to Business
  { id: "a4", source: "arch-course-1", target: "arch-actor-1", label: "influence", archimateRelationType: "influence" },
  { id: "a5", source: "arch-capability-1", target: "arch-process-1", label: "realization", archimateRelationType: "realization" },

  // Business Layer relationships
  { id: "a6", source: "arch-actor-1", target: "arch-process-1", label: "assignment", archimateRelationType: "assignment" },
  { id: "a7", source: "arch-process-1", target: "arch-service-1", label: "realization", archimateRelationType: "realization" },
  { id: "a8", source: "arch-service-1", target: "arch-object-1", label: "access", archimateRelationType: "access" },

  // Business to Application
  { id: "a9", source: "arch-app-service-1", target: "arch-service-1", label: "serving", archimateRelationType: "serving" },
  { id: "a10", source: "arch-data-1", target: "arch-object-1", label: "realization", archimateRelationType: "realization" },

  // Application Layer relationships
  { id: "a11", source: "arch-app-comp-1", target: "arch-app-service-1", label: "assignment", archimateRelationType: "assignment" },
  { id: "a12", source: "arch-app-service-1", target: "arch-data-1", label: "access", archimateRelationType: "access" },
  { id: "a13", source: "arch-app-comp-2", target: "arch-data-1", label: "access", archimateRelationType: "access" },

  // Application to Technology
  { id: "a14", source: "arch-node-1", target: "arch-app-comp-1", label: "assignment", archimateRelationType: "assignment" },
  { id: "a15", source: "arch-node-2", target: "arch-app-comp-2", label: "assignment", archimateRelationType: "assignment" },
  { id: "a16", source: "arch-tech-service-1", target: "arch-node-1", label: "assignment", archimateRelationType: "assignment" },
  { id: "a17", source: "arch-node-2", target: "arch-tech-service-1", label: "composition", archimateRelationType: "composition" },

  // Implementation relationships
  { id: "a18", source: "arch-workpackage-1", target: "arch-course-1", label: "realization", archimateRelationType: "realization" },
  { id: "a19", source: "arch-workpackage-1", target: "arch-app-comp-1", label: "realization", archimateRelationType: "realization" },
  { id: "a20", source: "arch-workpackage-1", target: "arch-deliverable-1", label: "aggregation", archimateRelationType: "aggregation" },
  { id: "a21", source: "arch-workpackage-2", target: "arch-data-1", label: "association", archimateRelationType: "association" },
]

// =============================================================================
// Import ERD Mock Data
// =============================================================================
import { mockERDData } from "./mock-erd-data"

// =============================================================================
// Export Functions
// =============================================================================

export function getMockWorkflowData(frameworkId: string): { nodes: WorkflowNode[]; edges: WorkflowEdge[] } {
  switch (frameworkId) {
    case "bpmn":
      return { nodes: bpmnMockNodes, edges: bpmnMockEdges }
    case "itil-4":
      return { nodes: itil4MockNodes, edges: itil4MockEdges }
    case "devops":
      return { nodes: devopsMockNodes, edges: devopsMockEdges }
    case "archimate3.2":
      return { nodes: archimate32MockNodes, edges: archimate32MockEdges }
    case "data-architecture":
      return mockERDData
    default:
      return { nodes: [], edges: [] }
  }
}
