// Framework-specific Kanban board configurations
// Supports 35+ enterprise frameworks across 3 tiers

import { KanbanBoardConfig } from "./types/kanban"

// =============================================================================
// TIER 1: HIGHLY SUITABLE (Natural Fit) - 12 Frameworks
// =============================================================================

// 1. Scrum
export const scrumKanbanConfig: KanbanBoardConfig = {
  frameworkId: "scrum",
  frameworkName: "Scrum",
  columns: [
    { id: "backlog", title: "Backlog", status: "backlog", description: "Product backlog items waiting to be prioritized", color: "bg-slate-100", order: 0 },
    { id: "sprint-planning", title: "Sprint Planning", status: "sprint-planning", description: "Items selected for upcoming sprint", color: "bg-blue-100", order: 1 },
    { id: "in-progress", title: "In Progress", status: "in-progress", description: "Actively being worked on", color: "bg-yellow-100", limit: 5, order: 2 },
    { id: "testing", title: "Testing", status: "testing", description: "In QA/testing phase", color: "bg-purple-100", order: 3 },
    { id: "done", title: "Done", status: "done", description: "Completed and meets Definition of Done", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["User Story", "Task", "Bug", "Technical Debt"],
  defaultView: "all",
}

// 2. Kanban Method
export const kanbanMethodConfig: KanbanBoardConfig = {
  frameworkId: "kanban",
  frameworkName: "Kanban Method",
  columns: [
    { id: "to-do", title: "To Do", status: "to-do", description: "Work items ready to start", color: "bg-slate-100", order: 0 },
    { id: "in-progress", title: "In Progress", status: "in-progress", description: "Work in progress", color: "bg-yellow-100", limit: 3, order: 1 },
    { id: "review", title: "Review", status: "review", description: "Ready for review", color: "bg-blue-100", limit: 2, order: 2 },
    { id: "testing", title: "Testing", status: "testing", description: "In testing", color: "bg-purple-100", order: 3 },
    { id: "done", title: "Done", status: "done", description: "Completed work", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Feature", "Improvement", "Bug", "Maintenance"],
  defaultView: "all",
}

// 3. SAFe (Scaled Agile Framework)
export const safeKanbanConfig: KanbanBoardConfig = {
  frameworkId: "safe",
  frameworkName: "SAFe",
  columns: [
    { id: "backlog", title: "Backlog", status: "backlog", description: "Feature backlog", color: "bg-slate-100", order: 0 },
    { id: "pi-planning", title: "PI Planning", status: "pi-planning", description: "Program Increment planning", color: "bg-blue-100", order: 1 },
    { id: "development", title: "Development", status: "development", description: "Active development", color: "bg-yellow-100", limit: 8, order: 2 },
    { id: "system-demo", title: "System Demo", status: "system-demo", description: "Ready for system demo", color: "bg-purple-100", order: 3 },
    { id: "release", title: "Release", status: "release", description: "Released to production", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Epic", "Feature", "Capability", "Enabler"],
  defaultView: "all",
}

// 4. Six Sigma / DMAIC
export const sixSigmaKanbanConfig: KanbanBoardConfig = {
  frameworkId: "six-sigma",
  frameworkName: "Six Sigma / DMAIC",
  columns: [
    { id: "define", title: "Define", status: "define", description: "Define problem and goals", color: "bg-slate-100", order: 0 },
    { id: "measure", title: "Measure", status: "measure", description: "Measure current performance", color: "bg-blue-100", order: 1 },
    { id: "analyze", title: "Analyze", status: "analyze", description: "Analyze root causes", color: "bg-yellow-100", order: 2 },
    { id: "improve", title: "Improve", status: "improve", description: "Implement improvements", color: "bg-purple-100", order: 3 },
    { id: "control", title: "Control", status: "control", description: "Control and monitor", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Improvement Project", "Quality Initiative", "Process Optimization"],
  defaultView: "all",
}

// 5. LeSS (Large Scale Scrum)
export const lessKanbanConfig: KanbanBoardConfig = {
  frameworkId: "less",
  frameworkName: "LeSS",
  columns: [
    { id: "product-backlog", title: "Product Backlog", status: "product-backlog", description: "Product-level backlog", color: "bg-slate-100", order: 0 },
    { id: "team-backlog", title: "Team Backlog", status: "team-backlog", description: "Team-specific items", color: "bg-blue-100", order: 1 },
    { id: "in-progress", title: "In Progress", status: "in-progress", description: "Active work across teams", color: "bg-yellow-100", limit: 10, order: 2 },
    { id: "review", title: "Review", status: "review", description: "Ready for review", color: "bg-purple-100", order: 3 },
    { id: "done", title: "Done", status: "done", description: "Completed", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["User Story", "Feature", "Bug"],
  defaultView: "all",
}

// 6. PRINCE2
export const prince2KanbanConfig: KanbanBoardConfig = {
  frameworkId: "prince2",
  frameworkName: "PRINCE2",
  columns: [
    { id: "starting", title: "Starting Up", status: "starting", description: "Project initiation", color: "bg-slate-100", order: 0 },
    { id: "initiating", title: "Initiating", status: "initiating", description: "Detailed planning", color: "bg-blue-100", order: 1 },
    { id: "controlling", title: "Controlling", status: "controlling", description: "Stage control", color: "bg-yellow-100", order: 2 },
    { id: "managing-delivery", title: "Managing Delivery", status: "managing-delivery", description: "Work package delivery", color: "bg-purple-100", order: 3 },
    { id: "closing", title: "Closing", status: "closing", description: "Project closure", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Stage", "Work Package", "Deliverable"],
  defaultView: "all",
}

// 7. PMBOK (Project Management Body of Knowledge)
export const pmbokKanbanConfig: KanbanBoardConfig = {
  frameworkId: "pmbok",
  frameworkName: "PMBOK",
  columns: [
    { id: "initiating", title: "Initiating", status: "initiating", description: "Project charter and stakeholder identification", color: "bg-slate-100", order: 0 },
    { id: "planning", title: "Planning", status: "planning", description: "Develop project management plan", color: "bg-blue-100", order: 1 },
    { id: "executing", title: "Executing", status: "executing", description: "Execute project work", color: "bg-yellow-100", order: 2 },
    { id: "monitoring", title: "Monitoring", status: "monitoring", description: "Monitor and control", color: "bg-purple-100", order: 3 },
    { id: "closing", title: "Closing", status: "closing", description: "Close project or phase", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Activity", "Deliverable", "Milestone"],
  defaultView: "all",
}

// 8. Lean / Value Stream Mapping
export const leanKanbanConfig: KanbanBoardConfig = {
  frameworkId: "lean",
  frameworkName: "Lean / Value Stream Mapping",
  columns: [
    { id: "identify", title: "Identify", status: "identify", description: "Identify value streams", color: "bg-slate-100", order: 0 },
    { id: "analyze", title: "Analyze", status: "analyze", description: "Current state mapping", color: "bg-blue-100", order: 1 },
    { id: "optimize", title: "Optimize", status: "optimize", description: "Design future state", color: "bg-yellow-100", order: 2 },
    { id: "implement", title: "Implement", status: "implement", description: "Implement improvements", color: "bg-purple-100", order: 3 },
    { id: "monitor", title: "Monitor", status: "monitor", description: "Monitor and sustain", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Process Improvement", "Waste Elimination", "Flow Optimization"],
  defaultView: "all",
}

// 9. CRISP-DM (Data Science)
export const crispDmKanbanConfig: KanbanBoardConfig = {
  frameworkId: "crisp-dm",
  frameworkName: "CRISP-DM",
  columns: [
    { id: "business-understanding", title: "Business Understanding", status: "business-understanding", description: "Define objectives", color: "bg-slate-100", order: 0 },
    { id: "data-understanding", title: "Data Understanding", status: "data-understanding", description: "Explore data", color: "bg-blue-100", order: 1 },
    { id: "data-prep", title: "Data Preparation", status: "data-prep", description: "Clean and transform", color: "bg-yellow-100", order: 2 },
    { id: "modeling", title: "Modeling", status: "modeling", description: "Build models", color: "bg-purple-100", order: 3 },
    { id: "evaluation", title: "Evaluation", status: "evaluation", description: "Evaluate results", color: "bg-orange-100", order: 4 },
    { id: "deployment", title: "Deployment", status: "deployment", description: "Deploy to production", color: "bg-green-100", order: 5 },
  ],
  cardTypes: ["ML Project", "Data Pipeline", "Model"],
  defaultView: "all",
}

// 10. Design Thinking
export const designThinkingKanbanConfig: KanbanBoardConfig = {
  frameworkId: "design-thinking",
  frameworkName: "Design Thinking",
  columns: [
    { id: "empathize", title: "Empathize", status: "empathize", description: "Understand users", color: "bg-slate-100", order: 0 },
    { id: "define", title: "Define", status: "define", description: "Define problem statement", color: "bg-blue-100", order: 1 },
    { id: "ideate", title: "Ideate", status: "ideate", description: "Brainstorm solutions", color: "bg-yellow-100", order: 2 },
    { id: "prototype", title: "Prototype", status: "prototype", description: "Build prototypes", color: "bg-purple-100", order: 3 },
    { id: "test", title: "Test", status: "test", description: "Test with users", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Design Sprint", "Innovation Project", "UX Initiative"],
  defaultView: "all",
}

// 11. Kotter's 8-Step Change
export const kotterKanbanConfig: KanbanBoardConfig = {
  frameworkId: "kotter-change",
  frameworkName: "Kotter's 8-Step Change",
  columns: [
    { id: "urgency", title: "Create Urgency", status: "urgency", description: "Establish sense of urgency", color: "bg-red-100", order: 0 },
    { id: "coalition", title: "Build Coalition", status: "coalition", description: "Form guiding coalition", color: "bg-orange-100", order: 1 },
    { id: "vision", title: "Form Vision", status: "vision", description: "Create vision and strategy", color: "bg-yellow-100", order: 2 },
    { id: "communicate", title: "Communicate", status: "communicate", description: "Communicate vision", color: "bg-blue-100", order: 3 },
    { id: "empower", title: "Empower", status: "empower", description: "Empower action", color: "bg-purple-100", order: 4 },
    { id: "wins", title: "Generate Wins", status: "wins", description: "Generate short-term wins", color: "bg-pink-100", order: 5 },
    { id: "accelerate", title: "Accelerate", status: "accelerate", description: "Sustain acceleration", color: "bg-indigo-100", order: 6 },
    { id: "anchor", title: "Anchor", status: "anchor", description: "Anchor changes", color: "bg-green-100", order: 7 },
  ],
  cardTypes: ["Change Initiative", "Transformation Project"],
  defaultView: "all",
}

// 12. ADKAR
export const adkarKanbanConfig: KanbanBoardConfig = {
  frameworkId: "adkar",
  frameworkName: "ADKAR",
  columns: [
    { id: "awareness", title: "Awareness", status: "awareness", description: "Awareness of need for change", color: "bg-slate-100", order: 0 },
    { id: "desire", title: "Desire", status: "desire", description: "Desire to support change", color: "bg-blue-100", order: 1 },
    { id: "knowledge", title: "Knowledge", status: "knowledge", description: "Knowledge of how to change", color: "bg-yellow-100", order: 2 },
    { id: "ability", title: "Ability", status: "ability", description: "Ability to implement", color: "bg-purple-100", order: 3 },
    { id: "reinforcement", title: "Reinforcement", status: "reinforcement", description: "Reinforcement to sustain", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Individual Change", "Training Initiative", "Change Activity"],
  defaultView: "all",
}

// =============================================================================
// TIER 2: VERY SUITABLE (Natural Workflow) - 18 Frameworks
// =============================================================================

// 13. TOGAF ADM
export const togafKanbanConfig: KanbanBoardConfig = {
  frameworkId: "togaf",
  frameworkName: "TOGAF ADM",
  columns: [
    { id: "preliminary", title: "Preliminary", status: "preliminary", description: "Framework setup", color: "bg-slate-100", order: 0 },
    { id: "vision", title: "Architecture Vision", status: "vision", description: "Phase A - Vision", color: "bg-blue-100", order: 1 },
    { id: "business", title: "Business Arch", status: "business", description: "Phase B - Business", color: "bg-yellow-100", order: 2 },
    { id: "information", title: "Information Arch", status: "information", description: "Phase C - Information", color: "bg-purple-100", order: 3 },
    { id: "technology", title: "Technology Arch", status: "technology", description: "Phase D - Technology", color: "bg-orange-100", order: 4 },
    { id: "migration", title: "Migration Planning", status: "migration", description: "Phase E&F - Migration", color: "bg-pink-100", order: 5 },
    { id: "implementation", title: "Implementation", status: "implementation", description: "Phase G - Implementation", color: "bg-indigo-100", order: 6 },
    { id: "change-mgmt", title: "Change Management", status: "change-mgmt", description: "Phase H - Change", color: "bg-green-100", order: 7 },
  ],
  cardTypes: ["Architecture Deliverable", "Building Block", "Work Package"],
  defaultView: "all",
}

// 14. SABSA
export const sabsaKanbanConfig: KanbanBoardConfig = {
  frameworkId: "sabsa",
  frameworkName: "SABSA",
  columns: [
    { id: "contextual", title: "Contextual", status: "contextual", description: "Business context", color: "bg-slate-100", order: 0 },
    { id: "conceptual", title: "Conceptual", status: "conceptual", description: "Conceptual architecture", color: "bg-blue-100", order: 1 },
    { id: "logical", title: "Logical", status: "logical", description: "Logical design", color: "bg-yellow-100", order: 2 },
    { id: "physical", title: "Physical", status: "physical", description: "Physical design", color: "bg-purple-100", order: 3 },
    { id: "component", title: "Component", status: "component", description: "Component selection", color: "bg-orange-100", order: 4 },
    { id: "operational", title: "Operational", status: "operational", description: "Operational implementation", color: "bg-green-100", order: 5 },
  ],
  cardTypes: ["Security Architecture", "Control", "Risk Treatment"],
  defaultView: "all",
}

// 15. Azure/Cloud Adoption Framework
export const azureCafKanbanConfig: KanbanBoardConfig = {
  frameworkId: "azure-caf",
  frameworkName: "Azure/Cloud Adoption Framework",
  columns: [
    { id: "strategy", title: "Strategy", status: "strategy", description: "Define strategy", color: "bg-slate-100", order: 0 },
    { id: "plan", title: "Plan", status: "plan", description: "Cloud adoption plan", color: "bg-blue-100", order: 1 },
    { id: "ready", title: "Ready", status: "ready", description: "Prepare environment", color: "bg-yellow-100", order: 2 },
    { id: "adopt", title: "Adopt", status: "adopt", description: "Migrate/Innovate", color: "bg-purple-100", order: 3 },
    { id: "govern", title: "Govern", status: "govern", description: "Governance", color: "bg-orange-100", order: 4 },
    { id: "manage", title: "Manage", status: "manage", description: "Operations management", color: "bg-green-100", order: 5 },
  ],
  cardTypes: ["Workload", "Migration", "Landing Zone"],
  defaultView: "all",
}

// 16. ISO 31000 Risk Management
export const iso31000KanbanConfig: KanbanBoardConfig = {
  frameworkId: "iso-31000",
  frameworkName: "ISO 31000 Risk Management",
  columns: [
    { id: "identify", title: "Identify", status: "identify", description: "Identify risks", color: "bg-red-100", order: 0 },
    { id: "analyze", title: "Analyze", status: "analyze", description: "Analyze likelihood/impact", color: "bg-orange-100", order: 1 },
    { id: "evaluate", title: "Evaluate", status: "evaluate", description: "Evaluate risk level", color: "bg-yellow-100", order: 2 },
    { id: "treat", title: "Treat", status: "treat", description: "Implement treatment", color: "bg-blue-100", order: 3 },
    { id: "monitor", title: "Monitor & Review", status: "monitor", description: "Monitor and review", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Risk", "Mitigation Action", "Control"],
  defaultView: "all",
}

// 17. ISO 27001
export const iso27001KanbanConfig: KanbanBoardConfig = {
  frameworkId: "iso-27001",
  frameworkName: "ISO 27001:2022",
  columns: [
    { id: "not-implemented", title: "Not Implemented", status: "not-implemented", description: "Controls not yet started", color: "bg-red-50", order: 0 },
    { id: "in-progress", title: "In Progress", status: "in-progress", description: "Control implementation underway", color: "bg-yellow-100", order: 1 },
    { id: "evidence-collected", title: "Evidence Collected", status: "evidence-collected", description: "Implementation complete, evidence documented", color: "bg-blue-100", order: 2 },
    { id: "validated", title: "Validated", status: "validated", description: "Control tested and validated", color: "bg-purple-100", order: 3 },
    { id: "compliant", title: "Compliant", status: "compliant", description: "Fully compliant and auditable", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Annex A Control", "Policy", "Procedure", "Technical Control"],
  defaultView: "all",
}

// 18. NIST CSF
export const nistCsfKanbanConfig: KanbanBoardConfig = {
  frameworkId: "nist-csf",
  frameworkName: "NIST Cybersecurity Framework",
  columns: [
    { id: "identify", title: "Identify", status: "identify", description: "Asset/risk management", color: "bg-slate-100", order: 0 },
    { id: "protect", title: "Protect", status: "protect", description: "Protective controls", color: "bg-blue-100", order: 1 },
    { id: "detect", title: "Detect", status: "detect", description: "Detection processes", color: "bg-yellow-100", order: 2 },
    { id: "respond", title: "Respond", status: "respond", description: "Response activities", color: "bg-orange-100", order: 3 },
    { id: "recover", title: "Recover", status: "recover", description: "Recovery planning", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Control", "Security Initiative", "Category"],
  defaultView: "all",
}

// 19. CIS Controls
export const cisControlsKanbanConfig: KanbanBoardConfig = {
  frameworkId: "cis-controls",
  frameworkName: "CIS Controls",
  columns: [
    { id: "not-implemented", title: "Not Implemented", status: "not-implemented", description: "Control not started", color: "bg-red-100", order: 0 },
    { id: "in-progress", title: "In Progress", status: "in-progress", description: "Implementation underway", color: "bg-yellow-100", order: 1 },
    { id: "partial", title: "Partially Implemented", status: "partial", description: "Partial implementation", color: "bg-blue-100", order: 2 },
    { id: "implemented", title: "Fully Implemented", status: "implemented", description: "Fully implemented", color: "bg-green-100", order: 3 },
  ],
  cardTypes: ["IG1 Control", "IG2 Control", "IG3 Control"],
  defaultView: "all",
}

// 20. SOC 2
export const soc2KanbanConfig: KanbanBoardConfig = {
  frameworkId: "soc-2",
  frameworkName: "SOC 2",
  columns: [
    { id: "scoping", title: "Scoping", status: "scoping", description: "Define scope", color: "bg-slate-100", order: 0 },
    { id: "gap-analysis", title: "Gap Analysis", status: "gap-analysis", description: "Identify gaps", color: "bg-orange-100", order: 1 },
    { id: "remediation", title: "Remediation", status: "remediation", description: "Fix gaps", color: "bg-yellow-100", order: 2 },
    { id: "evidence", title: "Evidence Collection", status: "evidence", description: "Collect evidence", color: "bg-blue-100", order: 3 },
    { id: "audit", title: "Audit", status: "audit", description: "Auditor review", color: "bg-purple-100", order: 4 },
    { id: "certified", title: "Certified", status: "certified", description: "SOC 2 certified", color: "bg-green-100", order: 5 },
  ],
  cardTypes: ["TSC - Security", "TSC - Availability", "TSC - Processing Integrity", "TSC - Confidentiality", "TSC - Privacy"],
  defaultView: "all",
}

// 21. GDPR Compliance
export const gdprKanbanConfig: KanbanBoardConfig = {
  frameworkId: "gdpr",
  frameworkName: "GDPR Compliance",
  columns: [
    { id: "assessment", title: "Assessment", status: "assessment", description: "Data protection assessment", color: "bg-slate-100", order: 0 },
    { id: "planning", title: "Planning", status: "planning", description: "Plan compliance", color: "bg-blue-100", order: 1 },
    { id: "implementation", title: "Implementation", status: "implementation", description: "Implement controls", color: "bg-yellow-100", order: 2 },
    { id: "documentation", title: "Documentation", status: "documentation", description: "Document compliance", color: "bg-purple-100", order: 3 },
    { id: "monitoring", title: "Monitoring", status: "monitoring", description: "Ongoing monitoring", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["DPIA", "Data Subject Right", "Processing Activity", "Consent Management"],
  defaultView: "all",
}

// 22. PCI DSS
export const pciDssKanbanConfig: KanbanBoardConfig = {
  frameworkId: "pci-dss",
  frameworkName: "PCI DSS",
  columns: [
    { id: "gap-analysis", title: "Gap Analysis", status: "gap-analysis", description: "Identify gaps", color: "bg-red-100", order: 0 },
    { id: "remediation", title: "Remediation", status: "remediation", description: "Fix gaps", color: "bg-yellow-100", order: 1 },
    { id: "validation", title: "Validation", status: "validation", description: "Validate controls", color: "bg-blue-100", order: 2 },
    { id: "audit", title: "Audit", status: "audit", description: "QSA audit", color: "bg-purple-100", order: 3 },
    { id: "compliant", title: "Compliant", status: "compliant", description: "PCI DSS compliant", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Requirement 1", "Requirement 2", "Requirement 3", "Requirement 4", "Requirement 5", "Requirement 6", "Requirement 7", "Requirement 8", "Requirement 9", "Requirement 10", "Requirement 11", "Requirement 12"],
  defaultView: "all",
}

// 23. COSO Framework
export const cosoKanbanConfig: KanbanBoardConfig = {
  frameworkId: "coso",
  frameworkName: "COSO Framework",
  columns: [
    { id: "design", title: "Design", status: "design", description: "Design controls", color: "bg-slate-100", order: 0 },
    { id: "implementation", title: "Implementation", status: "implementation", description: "Implement controls", color: "bg-blue-100", order: 1 },
    { id: "assessment", title: "Assessment", status: "assessment", description: "Assess effectiveness", color: "bg-yellow-100", order: 2 },
    { id: "remediation", title: "Remediation", status: "remediation", description: "Fix deficiencies", color: "bg-orange-100", order: 3 },
    { id: "monitoring", title: "Monitoring", status: "monitoring", description: "Ongoing monitoring", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Control Environment", "Risk Assessment", "Control Activities", "Information & Communication", "Monitoring Activities"],
  defaultView: "all",
}

// 24. COBIT
export const cobitKanbanConfig: KanbanBoardConfig = {
  frameworkId: "cobit",
  frameworkName: "COBIT",
  columns: [
    { id: "planning", title: "Planning", status: "planning", description: "Plan objectives", color: "bg-slate-100", order: 0 },
    { id: "implementation", title: "Implementation", status: "implementation", description: "Implement practices", color: "bg-blue-100", order: 1 },
    { id: "operation", title: "Operation", status: "operation", description: "Operate processes", color: "bg-yellow-100", order: 2 },
    { id: "monitoring", title: "Monitoring", status: "monitoring", description: "Monitor performance", color: "bg-green-100", order: 3 },
  ],
  cardTypes: ["Governance Objective", "Management Objective", "Process"],
  defaultView: "all",
}

// 25. ISO 9001
export const iso9001KanbanConfig: KanbanBoardConfig = {
  frameworkId: "iso-9001",
  frameworkName: "ISO 9001",
  columns: [
    { id: "gap-analysis", title: "Gap Analysis", status: "gap-analysis", description: "Identify gaps", color: "bg-orange-100", order: 0 },
    { id: "planning", title: "Planning", status: "planning", description: "Plan implementation", color: "bg-blue-100", order: 1 },
    { id: "implementation", title: "Implementation", status: "implementation", description: "Implement QMS", color: "bg-yellow-100", order: 2 },
    { id: "audit-prep", title: "Audit Prep", status: "audit-prep", description: "Prepare for audit", color: "bg-purple-100", order: 3 },
    { id: "certified", title: "Certified", status: "certified", description: "ISO 9001 certified", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Quality Policy", "Procedure", "Process", "Record"],
  defaultView: "all",
}

// 26. ITIL 4
export const itil4KanbanConfig: KanbanBoardConfig = {
  frameworkId: "itil-4",
  frameworkName: "ITIL 4",
  columns: [
    { id: "request", title: "Request", status: "request", description: "Service request received", color: "bg-slate-100", order: 0 },
    { id: "assessment", title: "Assessment", status: "assessment", description: "Assess request", color: "bg-blue-100", order: 1 },
    { id: "approval", title: "Approval", status: "approval", description: "Approval required", color: "bg-yellow-100", order: 2 },
    { id: "implementation", title: "Implementation", status: "implementation", description: "Implement change", color: "bg-purple-100", order: 3 },
    { id: "review", title: "Review", status: "review", description: "Post-implementation review", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Incident", "Service Request", "Change", "Problem"],
  defaultView: "all",
}

// 27. DevOps Pipeline
export const devopsKanbanConfig: KanbanBoardConfig = {
  frameworkId: "devops",
  frameworkName: "DevOps Pipeline",
  columns: [
    { id: "backlog", title: "Backlog", status: "backlog", description: "Feature backlog", color: "bg-slate-100", order: 0 },
    { id: "development", title: "Development", status: "development", description: "Active development", color: "bg-blue-100", order: 1 },
    { id: "testing", title: "Testing", status: "testing", description: "CI/CD testing", color: "bg-yellow-100", order: 2 },
    { id: "staging", title: "Staging", status: "staging", description: "Staging environment", color: "bg-purple-100", order: 3 },
    { id: "production", title: "Production", status: "production", description: "Deployed to prod", color: "bg-orange-100", order: 4 },
    { id: "monitoring", title: "Monitoring", status: "monitoring", description: "Production monitoring", color: "bg-green-100", order: 5 },
  ],
  cardTypes: ["Feature", "Bug Fix", "Deployment", "Hotfix"],
  defaultView: "all",
}

// 28. CMMI Process Improvement
export const cmmiKanbanConfig: KanbanBoardConfig = {
  frameworkId: "cmmi",
  frameworkName: "CMMI Process Improvement",
  columns: [
    { id: "level-1", title: "Level 1: Initial", status: "level-1", description: "Ad hoc processes", color: "bg-red-100", order: 0 },
    { id: "level-2", title: "Level 2: Managed", status: "level-2", description: "Managed processes", color: "bg-orange-100", order: 1 },
    { id: "level-3", title: "Level 3: Defined", status: "level-3", description: "Defined processes", color: "bg-yellow-100", order: 2 },
    { id: "level-4", title: "Level 4: Quantitatively Managed", status: "level-4", description: "Measured processes", color: "bg-blue-100", order: 3 },
    { id: "level-5", title: "Level 5: Optimizing", status: "level-5", description: "Optimizing processes", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Process Improvement", "Process Area", "Practice"],
  defaultView: "all",
}

// 29. FinOps Framework
export const finopsKanbanConfig: KanbanBoardConfig = {
  frameworkId: "finops",
  frameworkName: "FinOps Framework",
  columns: [
    { id: "inform", title: "Inform", status: "inform", description: "Cost visibility", color: "bg-blue-100", order: 0 },
    { id: "optimize", title: "Optimize", status: "optimize", description: "Cost optimization", color: "bg-yellow-100", order: 1 },
    { id: "operate", title: "Operate", status: "operate", description: "Operational excellence", color: "bg-green-100", order: 2 },
  ],
  cardTypes: ["Cost Optimization", "Reserved Instance", "Rightsizing", "Showback"],
  defaultView: "all",
}

// 30. Zero-Based Budgeting
export const zbbKanbanConfig: KanbanBoardConfig = {
  frameworkId: "zbb",
  frameworkName: "Zero-Based Budgeting",
  columns: [
    { id: "decision-package", title: "Decision Package", status: "decision-package", description: "Create decision packages", color: "bg-slate-100", order: 0 },
    { id: "ranking", title: "Ranking", status: "ranking", description: "Rank packages", color: "bg-yellow-100", order: 1 },
    { id: "approval", title: "Approval", status: "approval", description: "Approval process", color: "bg-blue-100", order: 2 },
    { id: "allocation", title: "Allocation", status: "allocation", description: "Budget allocation", color: "bg-green-100", order: 3 },
  ],
  cardTypes: ["Budget Item", "Decision Package"],
  defaultView: "all",
}

// =============================================================================
// TIER 3: SOMEWHAT SUITABLE (Can Benefit) - 5 Frameworks
// =============================================================================

// 31. Customer Journey Mapping
export const customerJourneyKanbanConfig: KanbanBoardConfig = {
  frameworkId: "customer-journey",
  frameworkName: "Customer Journey Mapping",
  columns: [
    { id: "awareness", title: "Awareness", status: "awareness", description: "Customer becomes aware", color: "bg-slate-100", order: 0 },
    { id: "consideration", title: "Consideration", status: "consideration", description: "Considering options", color: "bg-blue-100", order: 1 },
    { id: "purchase", title: "Purchase", status: "purchase", description: "Purchase decision", color: "bg-yellow-100", order: 2 },
    { id: "retention", title: "Retention", status: "retention", description: "Customer retention", color: "bg-purple-100", order: 3 },
    { id: "advocacy", title: "Advocacy", status: "advocacy", description: "Customer advocacy", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Touchpoint Improvement", "Customer Initiative", "Experience Enhancement"],
  defaultView: "all",
}

// 32. Digital Transformation
export const digitalTransformationKanbanConfig: KanbanBoardConfig = {
  frameworkId: "digital-transformation",
  frameworkName: "Digital Transformation",
  columns: [
    { id: "assessment", title: "Assessment", status: "assessment", description: "Current state assessment", color: "bg-slate-100", order: 0 },
    { id: "strategy", title: "Strategy", status: "strategy", description: "Define strategy", color: "bg-blue-100", order: 1 },
    { id: "implementation", title: "Implementation", status: "implementation", description: "Implement initiatives", color: "bg-yellow-100", order: 2 },
    { id: "optimization", title: "Optimization", status: "optimization", description: "Optimize and scale", color: "bg-green-100", order: 3 },
  ],
  cardTypes: ["CX Initiative", "Operations Initiative", "Business Model Initiative"],
  defaultView: "all",
}

// 33. OKRs
export const okrsKanbanConfig: KanbanBoardConfig = {
  frameworkId: "okrs",
  frameworkName: "OKRs",
  columns: [
    { id: "draft", title: "Draft", status: "draft", description: "Drafting OKRs", color: "bg-slate-100", order: 0 },
    { id: "review", title: "Review", status: "review", description: "Under review", color: "bg-blue-100", order: 1 },
    { id: "active", title: "Active", status: "active", description: "Active quarter", color: "bg-yellow-100", order: 2 },
    { id: "in-progress", title: "In Progress", status: "in-progress", description: "Making progress", color: "bg-purple-100", order: 3 },
    { id: "completed", title: "Completed", status: "completed", description: "Achieved", color: "bg-green-100", order: 4 },
  ],
  cardTypes: ["Objective", "Key Result", "Initiative"],
  defaultView: "all",
}

// 34. Balanced Scorecard
export const balancedScorecardKanbanConfig: KanbanBoardConfig = {
  frameworkId: "balanced-scorecard",
  frameworkName: "Balanced Scorecard",
  columns: [
    { id: "planning", title: "Planning", status: "planning", description: "Strategic planning", color: "bg-slate-100", order: 0 },
    { id: "implementation", title: "Implementation", status: "implementation", description: "Implement initiatives", color: "bg-blue-100", order: 1 },
    { id: "monitoring", title: "Monitoring", status: "monitoring", description: "Monitor KPIs", color: "bg-yellow-100", order: 2 },
    { id: "review", title: "Review", status: "review", description: "Strategic review", color: "bg-green-100", order: 3 },
  ],
  cardTypes: ["Financial", "Customer", "Internal Process", "Learning & Growth"],
  defaultView: "all",
}

// 35. Blue Ocean Strategy
export const blueOceanKanbanConfig: KanbanBoardConfig = {
  frameworkId: "blue-ocean",
  frameworkName: "Blue Ocean Strategy",
  columns: [
    { id: "analysis", title: "Analysis", status: "analysis", description: "Current state analysis", color: "bg-slate-100", order: 0 },
    { id: "errc", title: "ERRC Grid", status: "errc", description: "Eliminate-Reduce-Raise-Create", color: "bg-blue-100", order: 1 },
    { id: "strategy", title: "Strategy", status: "strategy", description: "Define new strategy", color: "bg-yellow-100", order: 2 },
    { id: "implementation", title: "Implementation", status: "implementation", description: "Execute strategy", color: "bg-green-100", order: 3 },
  ],
  cardTypes: ["Strategic Move", "Value Innovation", "Blue Ocean Initiative"],
  defaultView: "all",
}

// =============================================================================
// Registry of All Framework Configs
// =============================================================================

export const frameworkKanbanConfigs: Record<string, KanbanBoardConfig> = {
  // TIER 1
  "scrum": scrumKanbanConfig,
  "kanban": kanbanMethodConfig,
  "safe": safeKanbanConfig,
  "six-sigma": sixSigmaKanbanConfig,
  "less": lessKanbanConfig,
  "prince2": prince2KanbanConfig,
  "pmbok": pmbokKanbanConfig,
  "lean": leanKanbanConfig,
  "crisp-dm": crispDmKanbanConfig,
  "design-thinking": designThinkingKanbanConfig,
  "kotter-change": kotterKanbanConfig,
  "adkar": adkarKanbanConfig,

  // TIER 2
  "togaf": togafKanbanConfig,
  "sabsa": sabsaKanbanConfig,
  "azure-caf": azureCafKanbanConfig,
  "iso-31000": iso31000KanbanConfig,
  "iso-27001": iso27001KanbanConfig,
  "nist-csf": nistCsfKanbanConfig,
  "cis-controls": cisControlsKanbanConfig,
  "soc-2": soc2KanbanConfig,
  "gdpr": gdprKanbanConfig,
  "pci-dss": pciDssKanbanConfig,
  "coso": cosoKanbanConfig,
  "cobit": cobitKanbanConfig,
  "iso-9001": iso9001KanbanConfig,
  "itil-4": itil4KanbanConfig,
  "devops": devopsKanbanConfig,
  "cmmi": cmmiKanbanConfig,
  "finops": finopsKanbanConfig,
  "zbb": zbbKanbanConfig,

  // TIER 3
  "customer-journey": customerJourneyKanbanConfig,
  "digital-transformation": digitalTransformationKanbanConfig,
  "okrs": okrsKanbanConfig,
  "balanced-scorecard": balancedScorecardKanbanConfig,
  "blue-ocean": blueOceanKanbanConfig,
}

// Helper function to get config for a framework
export function getFrameworkKanbanConfig(frameworkId: string): KanbanBoardConfig | null {
  return frameworkKanbanConfigs[frameworkId] || null
}

// Helper to check if a framework supports Kanban
export function supportsKanban(frameworkId: string): boolean {
  return frameworkId in frameworkKanbanConfigs
}

// Get all supported framework IDs
export function getSupportedFrameworks(): string[] {
  return Object.keys(frameworkKanbanConfigs)
}

// Get frameworks by tier
export function getFrameworksByTier(tier: 1 | 2 | 3): KanbanBoardConfig[] {
  const tier1 = ["scrum", "kanban", "safe", "six-sigma", "less", "prince2", "pmbok", "lean", "crisp-dm", "design-thinking", "kotter-change", "adkar"]
  const tier2 = ["togaf", "sabsa", "azure-caf", "iso-31000", "iso-27001", "nist-csf", "cis-controls", "soc-2", "gdpr", "pci-dss", "coso", "cobit", "iso-9001", "itil-4", "devops", "cmmi", "finops", "zbb"]
  const tier3 = ["customer-journey", "digital-transformation", "okrs", "balanced-scorecard", "blue-ocean"]

  const frameworks = tier === 1 ? tier1 : tier === 2 ? tier2 : tier3
  return frameworks.map(id => frameworkKanbanConfigs[id]).filter(Boolean)
}
