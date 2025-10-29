// Mock data for Kanban boards (Scrum & ISO 27001)

import { KanbanCard } from "./types/kanban"

// Scrum mock cards
export const scrumMockCards: KanbanCard[] = [
  // Backlog
  {
    id: "scrum-1",
    title: "Implement user authentication",
    description: "Add OAuth 2.0 authentication with Google and GitHub providers",
    status: "backlog",
    frameworkId: "scrum",
    assignee: undefined,
    priority: "high",
    tags: ["security", "authentication"],
    dueDate: undefined,
    metadata: { storyPoints: 8, type: "User Story" },
    createdAt: new Date("2025-01-20"),
    updatedAt: new Date("2025-01-20"),
  },
  {
    id: "scrum-2",
    title: "Design mobile responsive layout",
    description: "Update dashboard to be mobile-friendly",
    status: "backlog",
    frameworkId: "scrum",
    assignee: undefined,
    priority: "medium",
    tags: ["ui", "responsive"],
    dueDate: undefined,
    metadata: { storyPoints: 5, type: "User Story" },
    createdAt: new Date("2025-01-21"),
    updatedAt: new Date("2025-01-21"),
  },

  // Sprint Planning
  {
    id: "scrum-3",
    title: "Setup CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    status: "sprint-planning",
    frameworkId: "scrum",
    assignee: {
      id: "user-1",
      name: "Sarah Chen",
      avatar: "SC",
    },
    priority: "high",
    tags: ["devops", "infrastructure"],
    dueDate: new Date("2025-02-05"),
    metadata: { storyPoints: 13, type: "Technical Debt", sprint: "Sprint 12" },
    createdAt: new Date("2025-01-18"),
    updatedAt: new Date("2025-01-26"),
  },

  // In Progress
  {
    id: "scrum-4",
    title: "API rate limiting",
    description: "Implement rate limiting middleware for public API endpoints",
    status: "in-progress",
    frameworkId: "scrum",
    assignee: {
      id: "user-2",
      name: "Marcus Rodriguez",
      avatar: "MR",
    },
    priority: "high",
    tags: ["api", "security"],
    dueDate: new Date("2025-01-30"),
    metadata: { storyPoints: 5, type: "Task", sprint: "Sprint 12" },
    createdAt: new Date("2025-01-22"),
    updatedAt: new Date("2025-01-27"),
  },
  {
    id: "scrum-5",
    title: "Fix dashboard loading bug",
    description: "Dashboard shows spinner indefinitely on slow connections",
    status: "in-progress",
    frameworkId: "scrum",
    assignee: {
      id: "user-3",
      name: "Priya Sharma",
      avatar: "PS",
    },
    priority: "critical",
    tags: ["bug", "performance"],
    dueDate: new Date("2025-01-29"),
    metadata: { storyPoints: 3, type: "Bug", sprint: "Sprint 12" },
    createdAt: new Date("2025-01-26"),
    updatedAt: new Date("2025-01-27"),
  },

  // Testing
  {
    id: "scrum-6",
    title: "User profile page redesign",
    description: "New profile page with activity timeline and settings",
    status: "testing",
    frameworkId: "scrum",
    assignee: {
      id: "user-4",
      name: "James Kim",
      avatar: "JK",
    },
    priority: "medium",
    tags: ["ui", "profile"],
    dueDate: new Date("2025-01-28"),
    metadata: { storyPoints: 8, type: "User Story", sprint: "Sprint 12" },
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-27"),
  },

  // Done
  {
    id: "scrum-7",
    title: "Database migration to PostgreSQL",
    description: "Migrate from SQLite to PostgreSQL for production",
    status: "done",
    frameworkId: "scrum",
    assignee: {
      id: "user-1",
      name: "Sarah Chen",
      avatar: "SC",
    },
    priority: "high",
    tags: ["database", "migration"],
    dueDate: new Date("2025-01-25"),
    metadata: { storyPoints: 13, type: "Technical Debt", sprint: "Sprint 12" },
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-25"),
  },
  {
    id: "scrum-8",
    title: "Add export to PDF feature",
    description: "Allow users to export reports as PDF",
    status: "done",
    frameworkId: "scrum",
    assignee: {
      id: "user-2",
      name: "Marcus Rodriguez",
      avatar: "MR",
    },
    priority: "low",
    tags: ["feature", "export"],
    dueDate: new Date("2025-01-24"),
    metadata: { storyPoints: 5, type: "User Story", sprint: "Sprint 11" },
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-24"),
  },
]

// ISO 27001 mock cards
export const iso27001MockCards: KanbanCard[] = [
  // Not Implemented
  {
    id: "iso-1",
    title: "A.5.1 - Policies for information security",
    description: "Information security policy and topic-specific policies shall be defined, approved by management, published, communicated to and acknowledged by relevant personnel and relevant interested parties",
    status: "not-implemented",
    frameworkId: "iso-27001",
    assignee: undefined,
    priority: "high",
    tags: ["Organizational Controls", "Policy"],
    dueDate: new Date("2025-03-01"),
    metadata: { controlId: "A.5.1", category: "Organizational Controls", requiresEvidence: true },
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "iso-2",
    title: "A.8.1 - User endpoint devices",
    description: "Information stored on, processed by or accessible via user endpoint devices shall be protected",
    status: "not-implemented",
    frameworkId: "iso-27001",
    assignee: undefined,
    priority: "medium",
    tags: ["Technological Controls", "Endpoint Security"],
    dueDate: new Date("2025-03-15"),
    metadata: { controlId: "A.8.1", category: "Technological Controls", requiresEvidence: true },
    createdAt: new Date("2025-01-16"),
    updatedAt: new Date("2025-01-16"),
  },

  // In Progress
  {
    id: "iso-3",
    title: "A.5.10 - Acceptable use of information",
    description: "Rules for acceptable use and procedures for handling information and other associated assets shall be identified, documented and implemented",
    status: "in-progress",
    frameworkId: "iso-27001",
    assignee: {
      id: "user-5",
      name: "Emily Watson",
      avatar: "EW",
    },
    priority: "high",
    tags: ["Organizational Controls", "Policy"],
    dueDate: new Date("2025-02-10"),
    metadata: { controlId: "A.5.10", category: "Organizational Controls", requiresEvidence: true },
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-27"),
  },
  {
    id: "iso-4",
    title: "A.8.2 - Privileged access rights",
    description: "The allocation and use of privileged access rights shall be restricted and managed",
    status: "in-progress",
    frameworkId: "iso-27001",
    assignee: {
      id: "user-6",
      name: "David Park",
      avatar: "DP",
    },
    priority: "critical",
    tags: ["Technological Controls", "Access Control"],
    dueDate: new Date("2025-02-05"),
    metadata: { controlId: "A.8.2", category: "Technological Controls", requiresEvidence: true },
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-27"),
  },

  // Evidence Collected
  {
    id: "iso-5",
    title: "A.5.2 - Information security roles and responsibilities",
    description: "Information security roles and responsibilities shall be defined and allocated according to the organization needs",
    status: "evidence-collected",
    frameworkId: "iso-27001",
    assignee: {
      id: "user-5",
      name: "Emily Watson",
      avatar: "EW",
    },
    priority: "high",
    tags: ["Organizational Controls", "Roles"],
    dueDate: new Date("2025-02-01"),
    metadata: {
      controlId: "A.5.2",
      category: "Organizational Controls",
      requiresEvidence: true,
      evidenceFiles: ["roles-matrix.pdf", "responsibilities-doc.pdf"]
    },
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-26"),
  },
  {
    id: "iso-6",
    title: "A.6.7 - Remote working",
    description: "Security measures shall be implemented when personnel are working remotely to protect information accessed, processed or stored outside the organization's premises",
    status: "evidence-collected",
    frameworkId: "iso-27001",
    assignee: {
      id: "user-7",
      name: "Lisa Thompson",
      avatar: "LT",
    },
    priority: "medium",
    tags: ["People Controls", "Remote Work"],
    dueDate: new Date("2025-01-31"),
    metadata: {
      controlId: "A.6.7",
      category: "People Controls",
      requiresEvidence: true,
      evidenceFiles: ["remote-work-policy.pdf", "vpn-configs.pdf"]
    },
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-25"),
  },

  // Validated
  {
    id: "iso-7",
    title: "A.8.3 - Information access restriction",
    description: "Access to information and other associated assets shall be restricted in accordance with the established topic-specific policy on access control",
    status: "validated",
    frameworkId: "iso-27001",
    assignee: {
      id: "user-6",
      name: "David Park",
      avatar: "DP",
    },
    priority: "high",
    tags: ["Technological Controls", "Access Control"],
    dueDate: new Date("2025-01-28"),
    metadata: {
      controlId: "A.8.3",
      category: "Technological Controls",
      requiresEvidence: true,
      evidenceFiles: ["access-matrix.xlsx", "rbac-config.json"],
      validatedBy: "Internal Audit Team",
      validatedDate: "2025-01-26"
    },
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-26"),
  },

  // Compliant
  {
    id: "iso-8",
    title: "A.5.3 - Segregation of duties",
    description: "Conflicting duties and conflicting areas of responsibility shall be segregated",
    status: "compliant",
    frameworkId: "iso-27001",
    assignee: {
      id: "user-5",
      name: "Emily Watson",
      avatar: "EW",
    },
    priority: "high",
    tags: ["Organizational Controls", "Governance"],
    dueDate: new Date("2025-01-20"),
    metadata: {
      controlId: "A.5.3",
      category: "Organizational Controls",
      requiresEvidence: true,
      evidenceFiles: ["sod-matrix.pdf", "approval-workflows.pdf"],
      validatedBy: "External Auditor",
      validatedDate: "2025-01-20",
      auditApproved: true
    },
    createdAt: new Date("2024-12-15"),
    updatedAt: new Date("2025-01-20"),
  },
  {
    id: "iso-9",
    title: "A.5.4 - Management responsibilities",
    description: "Management shall require all personnel to apply information security in accordance with the established information security policy",
    status: "compliant",
    frameworkId: "iso-27001",
    assignee: {
      id: "user-5",
      name: "Emily Watson",
      avatar: "EW",
    },
    priority: "medium",
    tags: ["Organizational Controls", "Management"],
    dueDate: new Date("2025-01-22"),
    metadata: {
      controlId: "A.5.4",
      category: "Organizational Controls",
      requiresEvidence: true,
      evidenceFiles: ["management-sign-off.pdf", "training-records.pdf"],
      validatedBy: "External Auditor",
      validatedDate: "2025-01-22",
      auditApproved: true
    },
    createdAt: new Date("2024-12-20"),
    updatedAt: new Date("2025-01-22"),
  },
]

// Generic assignees pool for all frameworks
const assigneesPool = [
  { id: "user-1", name: "Sarah Chen", avatar: "SC" },
  { id: "user-2", name: "Marcus Rodriguez", avatar: "MR" },
  { id: "user-3", name: "Priya Sharma", avatar: "PS" },
  { id: "user-4", name: "James Kim", avatar: "JK" },
  { id: "user-5", name: "Emily Watson", avatar: "EW" },
  { id: "user-6", name: "David Park", avatar: "DP" },
  { id: "user-7", name: "Lisa Thompson", avatar: "LT" },
  { id: "user-8", name: "Ahmed Hassan", avatar: "AH" },
  { id: "user-9", name: "Maria Garcia", avatar: "MG" },
  { id: "user-10", name: "Chen Wei", avatar: "CW" },
]

// Generic mock card titles by framework type
const frameworkCardTitles: Record<string, string[]> = {
  "default-process": [
    "Process improvement initiative",
    "Workflow optimization",
    "Stakeholder alignment meeting",
    "Documentation review",
    "Quality assurance check",
  ],
  "default-compliance": [
    "Control implementation",
    "Policy review and update",
    "Evidence collection",
    "Compliance audit preparation",
    "Risk assessment",
  ],
  "default-project": [
    "Project planning",
    "Resource allocation",
    "Milestone delivery",
    "Stakeholder communication",
    "Quality review",
  ],
}

// Dynamic mock card generator
function generateMockCards(frameworkId: string, config: any): KanbanCard[] {
  const cards: KanbanCard[] = []
  const priorities = ["low", "medium", "high", "critical"]
  const now = new Date()

  // For each column, generate 1-3 cards
  config.columns.forEach((column: any, colIndex: number) => {
    const cardsInColumn = Math.max(1, Math.min(3, 4 - colIndex)) // More cards in earlier columns

    for (let i = 0; i < cardsInColumn; i++) {
      const cardId = `${frameworkId}-${colIndex}-${i}`
      const priority = priorities[Math.floor(Math.random() * priorities.length)]
      const hasAssignee = Math.random() > 0.3 // 70% chance of having assignee
      const assignee = hasAssignee ? assigneesPool[Math.floor(Math.random() * assigneesPool.length)] : undefined
      const hasDueDate = Math.random() > 0.4 // 60% chance of having due date
      const dueDate = hasDueDate ? new Date(now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined

      // Select title template
      const titleType = frameworkId.includes("iso-") || frameworkId.includes("nist") || frameworkId.includes("cis") || frameworkId.includes("soc") || frameworkId.includes("pci") || frameworkId.includes("gdpr") || frameworkId.includes("coso") || frameworkId.includes("cobit")
        ? "default-compliance"
        : frameworkId.includes("scrum") || frameworkId.includes("kanban") || frameworkId.includes("safe") || frameworkId.includes("prince2") || frameworkId.includes("pmbok")
        ? "default-project"
        : "default-process"

      const titleTemplates = frameworkCardTitles[titleType]
      const title = `${column.title}: ${titleTemplates[i % titleTemplates.length]}`

      // Generate tags based on card type
      const cardType = config.cardTypes[Math.floor(Math.random() * config.cardTypes.length)]
      const tags = [cardType, column.title.toLowerCase().replace(/\s+/g, "-")]

      cards.push({
        id: cardId,
        title,
        description: `Sample ${cardType.toLowerCase()} for ${config.frameworkName} in ${column.title} stage`,
        status: column.status,
        frameworkId,
        assignee,
        priority,
        tags,
        dueDate,
        metadata: {
          type: cardType,
          phase: column.title,
        },
        createdAt: new Date(now.getTime() - Math.random() * 14 * 24 * 60 * 60 * 1000), // Random date in last 2 weeks
        updatedAt: new Date(now.getTime() - Math.random() * 3 * 24 * 60 * 60 * 1000), // Random date in last 3 days
      })
    }
  })

  return cards
}

// Helper function to get mock cards for a framework
export function getMockKanbanCards(frameworkId: string): KanbanCard[] {
  // Use predefined detailed mock data for Scrum and ISO 27001
  if (frameworkId === "scrum") {
    return scrumMockCards
  }
  if (frameworkId === "iso-27001") {
    return iso27001MockCards
  }

  // For all other frameworks, generate dynamic mock data
  const { getFrameworkKanbanConfig } = require("./kanban-config")
  const config = getFrameworkKanbanConfig(frameworkId)

  if (!config) {
    return []
  }

  return generateMockCards(frameworkId, config)
}
