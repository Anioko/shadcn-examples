// Framework Dashboard Configurations
// Defines grandchildren (components) for each framework

export interface FrameworkGrandchild {
  id: string
  name: string
  description?: string
  order: number
}

export interface FrameworkDashboardConfig {
  frameworkId: string
  frameworkName: string
  frameworkSlug: string
  grandchildren: FrameworkGrandchild[]
}

// =============================================================================
// BUSINESS MODEL & STRATEGY FRAMEWORKS
// =============================================================================

export const leanCanvasConfig: FrameworkDashboardConfig = {
  frameworkId: "lean-canvas",
  frameworkName: "Lean Canvas",
  frameworkSlug: "lean-canvas",
  grandchildren: [
    { id: "problems", name: "Problems", description: "Top 3 problems worth solving", order: 1 },
    { id: "solutions", name: "Solutions", description: "Top 3 features that solve problems", order: 2 },
    { id: "key-metrics", name: "Key Metrics", description: "Key activities you measure", order: 3 },
    { id: "unique-value-propositions", name: "Unique Value Propositions", description: "Single, clear compelling message", order: 4 },
    { id: "unfair-advantages", name: "Unfair Advantages", description: "Something that cannot be easily copied or bought", order: 5 },
    { id: "channels", name: "Channels", description: "Path to customers", order: 6 },
    { id: "customer-segments", name: "Customer Segments", description: "Target customers", order: 7 },
    { id: "cost-structure", name: "Cost Structure", description: "Customer acquisition costs, distribution costs", order: 8 },
    { id: "revenue-streams", name: "Revenue Streams", description: "Revenue model, lifetime value", order: 9 },
  ],
}

export const businessModelCanvasConfig: FrameworkDashboardConfig = {
  frameworkId: "business-model-canvas",
  frameworkName: "Business Model Canvas",
  frameworkSlug: "business-model-canvas",
  grandchildren: [
    { id: "key-partners", name: "Key Partners", description: "Who are our key partners?", order: 1 },
    { id: "key-activities", name: "Key Activities", description: "What key activities do we do?", order: 2 },
    { id: "key-resources", name: "Key Resources", description: "What key resources do we need?", order: 3 },
    { id: "value-propositions", name: "Value Propositions", description: "What value do we deliver?", order: 4 },
    { id: "customer-relationships", name: "Customer Relationships", description: "What type of relationship?", order: 5 },
    { id: "channels", name: "Channels", description: "Through which channels?", order: 6 },
    { id: "customer-segments", name: "Customer Segments", description: "For whom are we creating value?", order: 7 },
    { id: "cost-structure", name: "Cost Structure", description: "What are the costs?", order: 8 },
    { id: "revenue-streams", name: "Revenue Streams", description: "How do we make money?", order: 9 },
  ],
}

export const okrConfig: FrameworkDashboardConfig = {
  frameworkId: "okr",
  frameworkName: "OKRs (Objectives and Key Results)",
  frameworkSlug: "okr",
  grandchildren: [
    { id: "objectives", name: "Objectives", description: "What do you want to accomplish?", order: 1 },
    { id: "key-results", name: "Key Results", description: "How will you measure success?", order: 2 },
    { id: "initiatives", name: "Initiatives", description: "What will you do to achieve the key results?", order: 3 },
  ],
}

// =============================================================================
// ENTERPRISE ARCHITECTURE FRAMEWORKS
// =============================================================================

export const togafConfig: FrameworkDashboardConfig = {
  frameworkId: "togaf",
  frameworkName: "TOGAF ADM",
  frameworkSlug: "togaf",
  grandchildren: [
    { id: "architecture-vision", name: "Architecture Vision", description: "Phase A: Architecture Vision", order: 1 },
    { id: "business-architecture", name: "Business Architecture", description: "Phase B: Business Architecture", order: 2 },
    { id: "information-systems", name: "Information Systems Architecture", description: "Phase C: Data & Application Architecture", order: 3 },
    { id: "technology-architecture", name: "Technology Architecture", description: "Phase D: Technology Architecture", order: 4 },
    { id: "opportunities-solutions", name: "Opportunities & Solutions", description: "Phase E: Opportunities and Solutions", order: 5 },
    { id: "migration-planning", name: "Migration Planning", description: "Phase F: Migration Planning", order: 6 },
    { id: "implementation-governance", name: "Implementation Governance", description: "Phase G: Implementation Governance", order: 7 },
    { id: "change-management", name: "Architecture Change Management", description: "Phase H: Architecture Change Management", order: 8 },
  ],
}

export const archimateConfig: FrameworkDashboardConfig = {
  frameworkId: "archimate",
  frameworkName: "ArchiMate 3.2",
  frameworkSlug: "archimate",
  grandchildren: [
    { id: "strategy-layer", name: "Strategy Layer", description: "Strategy elements and relationships", order: 1 },
    { id: "business-layer", name: "Business Layer", description: "Business processes and services", order: 2 },
    { id: "application-layer", name: "Application Layer", description: "Application components and services", order: 3 },
    { id: "technology-layer", name: "Technology Layer", description: "Technology infrastructure", order: 4 },
    { id: "physical-layer", name: "Physical Layer", description: "Physical elements", order: 5 },
    { id: "implementation-migration", name: "Implementation & Migration", description: "Implementation and migration elements", order: 6 },
  ],
}

export const zachmanConfig: FrameworkDashboardConfig = {
  frameworkId: "zachman",
  frameworkName: "Zachman Framework",
  frameworkSlug: "zachman",
  grandchildren: [
    { id: "contextual", name: "Contextual (Planner's View)", description: "Executive perspective", order: 1 },
    { id: "conceptual", name: "Conceptual (Owner's View)", description: "Business management perspective", order: 2 },
    { id: "logical", name: "Logical (Designer's View)", description: "Architect perspective", order: 3 },
    { id: "physical", name: "Physical (Builder's View)", description: "Engineer perspective", order: 4 },
    { id: "detailed", name: "Detailed (Subcontractor's View)", description: "Technician perspective", order: 5 },
  ],
}

export const capabilityModelConfig: FrameworkDashboardConfig = {
  frameworkId: "capability-model",
  frameworkName: "Capability Model",
  frameworkSlug: "capability-model",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual capability hierarchy and heat maps", order: 1 },
    { id: "workflow", name: "Workflow Designer", description: "Design capability workflows", order: 2 },
    { id: "dashboard", name: "Dashboard", description: "Overview and metrics", order: 3 },
  ],
}

export const applicationCapabilityModelConfig: FrameworkDashboardConfig = {
  frameworkId: "application-capability-model",
  frameworkName: "Application Capability Model",
  frameworkSlug: "application-capability-model",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual application capability hierarchy and heat maps", order: 1 },
    { id: "workflow", name: "Workflow Designer", description: "Design application capability workflows", order: 2 },
    { id: "dashboard", name: "Dashboard", description: "Overview and metrics", order: 3 },
  ],
}

export const genaiConfig: FrameworkDashboardConfig = {
  frameworkId: "genai",
  frameworkName: "IBM Gen AI Capability Model",
  frameworkSlug: "genai",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual GenAI capability hierarchy and heat maps", order: 1 },
    { id: "genai-operations", name: "GenAI Operations", description: "Model training, tuning, and lifecycle management", order: 2 },
    { id: "application-development", name: "Application Development", description: "GenAI app development and agents", order: 3 },
    { id: "governance", name: "GenAI Governance", description: "Monitoring, safeguards, and compliance", order: 4 },
    { id: "data-management", name: "Data Management", description: "Data storage, transformation, and cataloging", order: 5 },
    { id: "resources", name: "GenAI Resources", description: "Hardware, cloud, and infrastructure", order: 6 },
  ],
}

// =============================================================================
// RISK & SECURITY FRAMEWORKS
// =============================================================================

export const iso27001Config: FrameworkDashboardConfig = {
  frameworkId: "iso-27001",
  frameworkName: "ISO/IEC 27001:2022",
  frameworkSlug: "iso-27001",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual capability hierarchy and heat maps", order: 0 },
    { id: "context-organization", name: "Context of Organization", description: "Clause 4: Understanding the organization", order: 1 },
    { id: "leadership", name: "Leadership", description: "Clause 5: Leadership and commitment", order: 2 },
    { id: "planning", name: "Planning", description: "Clause 6: Planning for ISMS", order: 3 },
    { id: "support", name: "Support", description: "Clause 7: Support resources", order: 4 },
    { id: "operation", name: "Operation", description: "Clause 8: Operational planning and control", order: 5 },
    { id: "performance-evaluation", name: "Performance Evaluation", description: "Clause 9: Monitoring and measurement", order: 6 },
    { id: "improvement", name: "Improvement", description: "Clause 10: Continual improvement", order: 7 },
    { id: "organizational-controls", name: "Organizational Controls", description: "Annex A: Organizational controls", order: 8 },
    { id: "people-controls", name: "People Controls", description: "Annex A: People controls", order: 9 },
    { id: "physical-controls", name: "Physical Controls", description: "Annex A: Physical controls", order: 10 },
    { id: "technological-controls", name: "Technological Controls", description: "Annex A: Technological controls", order: 11 },
  ],
}

export const nistCsfConfig: FrameworkDashboardConfig = {
  frameworkId: "nist-csf",
  frameworkName: "NIST Cybersecurity Framework 2.0",
  frameworkSlug: "nist-csf",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual capability hierarchy and heat maps", order: 0 },
    { id: "govern", name: "Govern", description: "Governance of cybersecurity risk", order: 1 },
    { id: "identify", name: "Identify", description: "Asset management and risk assessment", order: 2 },
    { id: "protect", name: "Protect", description: "Protective technology and processes", order: 3 },
    { id: "detect", name: "Detect", description: "Detection processes and procedures", order: 4 },
    { id: "respond", name: "Respond", description: "Response planning and communications", order: 5 },
    { id: "recover", name: "Recover", description: "Recovery planning and improvements", order: 6 },
  ],
}

export const cisControlsConfig: FrameworkDashboardConfig = {
  frameworkId: "cis-controls",
  frameworkName: "CIS Controls v8",
  frameworkSlug: "cis-controls",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual capability hierarchy and heat maps", order: 0 },
    { id: "ig1", name: "Implementation Group 1 (Basic)", description: "Essential cyber hygiene", order: 1 },
    { id: "ig2", name: "Implementation Group 2 (Foundational)", description: "Establishing security program", order: 2 },
    { id: "ig3", name: "Implementation Group 3 (Organizational)", description: "Advanced security program", order: 3 },
  ],
}

export const pciDssConfig: FrameworkDashboardConfig = {
  frameworkId: "pci-dss",
  frameworkName: "PCI DSS 4.0",
  frameworkSlug: "pci-dss",
  grandchildren: [
    { id: "secure-network", name: "Build & Maintain Secure Network", description: "Requirements 1-2", order: 1 },
    { id: "protect-data", name: "Protect Account Data", description: "Requirements 3-4", order: 2 },
    { id: "vulnerability-mgmt", name: "Maintain Vulnerability Management", description: "Requirements 5-6", order: 3 },
    { id: "access-controls", name: "Implement Strong Access Controls", description: "Requirements 7-8", order: 4 },
    { id: "monitor-test", name: "Monitor & Test Networks", description: "Requirements 9-10", order: 5 },
    { id: "security-policy", name: "Maintain Information Security Policy", description: "Requirements 11-12", order: 6 },
  ],
}

export const soc2Config: FrameworkDashboardConfig = {
  frameworkId: "soc2",
  frameworkName: "SOC 2 Type II",
  frameworkSlug: "soc2",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual capability hierarchy and heat maps", order: 0 },
    { id: "security", name: "Security", description: "Security trust service criteria", order: 1 },
    { id: "availability", name: "Availability", description: "Availability trust service criteria", order: 2 },
    { id: "processing-integrity", name: "Processing Integrity", description: "Processing integrity criteria", order: 3 },
    { id: "confidentiality", name: "Confidentiality", description: "Confidentiality criteria", order: 4 },
    { id: "privacy", name: "Privacy", description: "Privacy criteria", order: 5 },
  ],
}

export const gdprConfig: FrameworkDashboardConfig = {
  frameworkId: "gdpr",
  frameworkName: "GDPR Compliance",
  frameworkSlug: "gdpr",
  grandchildren: [
    { id: "lawfulness", name: "Lawfulness, Fairness & Transparency", description: "Article 5(1)(a)", order: 1 },
    { id: "purpose-limitation", name: "Purpose Limitation", description: "Article 5(1)(b)", order: 2 },
    { id: "data-minimization", name: "Data Minimization", description: "Article 5(1)(c)", order: 3 },
    { id: "accuracy", name: "Accuracy", description: "Article 5(1)(d)", order: 4 },
    { id: "storage-limitation", name: "Storage Limitation", description: "Article 5(1)(e)", order: 5 },
    { id: "integrity-confidentiality", name: "Integrity & Confidentiality", description: "Article 5(1)(f)", order: 6 },
    { id: "accountability", name: "Accountability", description: "Article 5(2)", order: 7 },
  ],
}

export const pcfConfig: FrameworkDashboardConfig = {
  frameworkId: "pcf",
  frameworkName: "Process Classification Framework (PCF)",
  frameworkSlug: "pcf",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual capability hierarchy and heat maps", order: 0 },
    { id: "operating-processes", name: "Operating Processes", description: "Core business processes", order: 1 },
    { id: "management-processes", name: "Management & Support Processes", description: "Management and supporting processes", order: 2 },
  ],
}

export const iso9001Config: FrameworkDashboardConfig = {
  frameworkId: "iso-9001",
  frameworkName: "ISO 9001:2015",
  frameworkSlug: "iso-9001",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual capability hierarchy and heat maps", order: 0 },
    { id: "context", name: "Context of Organization", description: "Clause 4: Understanding context and stakeholders", order: 1 },
    { id: "leadership", name: "Leadership", description: "Clause 5: Leadership and commitment", order: 2 },
    { id: "planning", name: "Planning", description: "Clause 6: Risk-based thinking and objectives", order: 3 },
    { id: "support", name: "Support", description: "Clause 7: Resources and documentation", order: 4 },
    { id: "operation", name: "Operation", description: "Clause 8: Operational planning and control", order: 5 },
    { id: "performance", name: "Performance Evaluation", description: "Clause 9: Monitoring and measurement", order: 6 },
    { id: "improvement", name: "Improvement", description: "Clause 10: Continual improvement", order: 7 },
  ],
}

export const feafConfig: FrameworkDashboardConfig = {
  frameworkId: "feaf",
  frameworkName: "Federal Enterprise Architecture Framework",
  frameworkSlug: "feaf",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual capability hierarchy and heat maps", order: 0 },
    { id: "prm", name: "Performance Reference Model", description: "Outcomes and performance measures", order: 1 },
    { id: "brm", name: "Business Reference Model", description: "Business functions and services", order: 2 },
    { id: "srm", name: "Service Component Reference Model", description: "Service components", order: 3 },
    { id: "drm", name: "Data Reference Model", description: "Data standards and exchange", order: 4 },
    { id: "trm", name: "Technical Reference Model", description: "Technology standards", order: 5 },
  ],
}

export const sabsaConfig: FrameworkDashboardConfig = {
  frameworkId: "sabsa",
  frameworkName: "SABSA Security Architecture",
  frameworkSlug: "sabsa",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual capability hierarchy and heat maps", order: 0 },
    { id: "contextual", name: "Contextual Layer", description: "Business view - Why?", order: 1 },
    { id: "conceptual", name: "Conceptual Layer", description: "Architect view - What?", order: 2 },
    { id: "logical", name: "Logical Layer", description: "Designer view - How?", order: 3 },
    { id: "physical", name: "Physical Layer", description: "Builder view - With what?", order: 4 },
    { id: "component", name: "Component Layer", description: "Tradesman view - Where/When?", order: 5 },
    { id: "operational", name: "Operational Layer", description: "Facility manager view - Who?", order: 6 },
  ],
}

export const cobit2019Config: FrameworkDashboardConfig = {
  frameworkId: "cobit-2019",
  frameworkName: "COBIT 2019",
  frameworkSlug: "cobit-2019",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual capability hierarchy and heat maps", order: 0 },
    { id: "governance-system", name: "Governance System", description: "Governance framework components", order: 1 },
    { id: "governance-objectives", name: "Governance & Management Objectives", description: "40 governance and management objectives", order: 2 },
    { id: "design-factors", name: "Design Factors", description: "Enterprise context and design factors", order: 3 },
    { id: "performance-mgmt", name: "Performance Management", description: "Goals cascade and metrics", order: 4 },
  ],
}

// =============================================================================
// IT SERVICE MANAGEMENT
// =============================================================================

export const itil4Config: FrameworkDashboardConfig = {
  frameworkId: "itil4",
  frameworkName: "ITIL 4",
  frameworkSlug: "itil4",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual capability hierarchy and heat maps", order: 0 },
    { id: "service-value-system", name: "Service Value System", description: "ITIL SVS components", order: 1 },
    { id: "service-value-chain", name: "Service Value Chain", description: "Six value chain activities", order: 2 },
    { id: "general-practices", name: "General Management Practices", description: "14 general management practices", order: 3 },
    { id: "service-practices", name: "Service Management Practices", description: "17 service management practices", order: 4 },
    { id: "technical-practices", name: "Technical Management Practices", description: "3 technical management practices", order: 5 },
  ],
}

// =============================================================================
// PROJECT MANAGEMENT
// =============================================================================

export const pmbokConfig: FrameworkDashboardConfig = {
  frameworkId: "pmbok",
  frameworkName: "PMBOK 7th Edition",
  frameworkSlug: "pmbok",
  grandchildren: [
    { id: "stakeholders", name: "Stakeholders", description: "Stakeholder performance domain", order: 1 },
    { id: "team", name: "Team", description: "Team performance domain", order: 2 },
    { id: "development-approach", name: "Development Approach", description: "Development approach and life cycle", order: 3 },
    { id: "planning", name: "Planning", description: "Planning performance domain", order: 4 },
    { id: "project-work", name: "Project Work", description: "Project work performance domain", order: 5 },
    { id: "delivery", name: "Delivery", description: "Delivery performance domain", order: 6 },
    { id: "measurement", name: "Measurement", description: "Measurement performance domain", order: 7 },
    { id: "uncertainty", name: "Uncertainty", description: "Uncertainty performance domain", order: 8 },
  ],
}

export const prince2Config: FrameworkDashboardConfig = {
  frameworkId: "prince2",
  frameworkName: "PRINCE2",
  frameworkSlug: "prince2",
  grandchildren: [
    { id: "starting", name: "Starting Up", description: "Pre-project initiation", order: 1 },
    { id: "initiating", name: "Initiating", description: "Detailed planning phase", order: 2 },
    { id: "controlling", name: "Controlling", description: "Stage control activities", order: 3 },
    { id: "managing-delivery", name: "Managing Delivery", description: "Work package delivery", order: 4 },
    { id: "closing", name: "Closing", description: "Project closure activities", order: 5 },
  ],
}

// =============================================================================
// AGILE FRAMEWORKS
// =============================================================================

export const scrumConfig: FrameworkDashboardConfig = {
  frameworkId: "scrum",
  frameworkName: "Scrum",
  frameworkSlug: "scrum",
  grandchildren: [
    { id: "product-backlog", name: "Product Backlog", description: "Ordered list of work items", order: 1 },
    { id: "sprint-planning", name: "Sprint Planning", description: "Sprint planning activities", order: 2 },
    { id: "daily-scrum", name: "Daily Scrum", description: "Daily stand-up meetings", order: 3 },
    { id: "sprint-review", name: "Sprint Review", description: "Sprint review meetings", order: 4 },
    { id: "sprint-retrospective", name: "Sprint Retrospective", description: "Sprint retrospectives", order: 5 },
  ],
}

export const safeConfig: FrameworkDashboardConfig = {
  frameworkId: "safe",
  frameworkName: "SAFe",
  frameworkSlug: "safe",
  grandchildren: [
    { id: "essential", name: "Essential SAFe", description: "Essential SAFe configuration", order: 1 },
    { id: "large-solution", name: "Large Solution SAFe", description: "Large solution configuration", order: 2 },
    { id: "portfolio", name: "Portfolio SAFe", description: "Portfolio configuration", order: 3 },
    { id: "full", name: "Full SAFe", description: "Full SAFe configuration", order: 4 },
  ],
}

// =============================================================================
// STRATEGY ANALYSIS FRAMEWORKS
// =============================================================================

export const swotConfig: FrameworkDashboardConfig = {
  frameworkId: "swot",
  frameworkName: "SWOT Analysis",
  frameworkSlug: "swot",
  grandchildren: [
    { id: "strengths", name: "Strengths", description: "Internal positive attributes and capabilities", order: 1 },
    { id: "weaknesses", name: "Weaknesses", description: "Internal limitations and areas for improvement", order: 2 },
    { id: "opportunities", name: "Opportunities", description: "External favorable conditions to exploit", order: 3 },
    { id: "threats", name: "Threats", description: "External challenges and obstacles", order: 4 },
  ],
}

export const pestleConfig: FrameworkDashboardConfig = {
  frameworkId: "pestle",
  frameworkName: "PESTLE Analysis",
  frameworkSlug: "pestle",
  grandchildren: [
    { id: "political", name: "Political", description: "Government policies and political stability", order: 1 },
    { id: "economic", name: "Economic", description: "Economic growth, rates, and market conditions", order: 2 },
    { id: "social", name: "Social", description: "Demographics, culture, and lifestyle trends", order: 3 },
    { id: "technological", name: "Technological", description: "Innovation, automation, and tech change", order: 4 },
    { id: "legal", name: "Legal", description: "Laws, regulations, and compliance requirements", order: 5 },
    { id: "environmental", name: "Environmental", description: "Climate, sustainability, and ecological factors", order: 6 },
  ],
}

export const portersFiveForcesConfig: FrameworkDashboardConfig = {
  frameworkId: "porters-five-forces",
  frameworkName: "Porter's Five Forces",
  frameworkSlug: "porters-five-forces",
  grandchildren: [
    { id: "threat-new-entrants", name: "Threat of New Entrants", description: "Barriers to entry and new competition", order: 1 },
    { id: "supplier-power", name: "Bargaining Power of Suppliers", description: "Supplier concentration and switching costs", order: 2 },
    { id: "buyer-power", name: "Bargaining Power of Buyers", description: "Customer concentration and price sensitivity", order: 3 },
    { id: "threat-substitutes", name: "Threat of Substitutes", description: "Alternative products and services", order: 4 },
    { id: "competitive-rivalry", name: "Competitive Rivalry", description: "Industry competition and market saturation", order: 5 },
  ],
}

export const balancedScorecardConfig: FrameworkDashboardConfig = {
  frameworkId: "balanced-scorecard",
  frameworkName: "Balanced Scorecard",
  frameworkSlug: "balanced-scorecard",
  grandchildren: [
    { id: "financial", name: "Financial Perspective", description: "Revenue, profitability, and cost metrics", order: 1 },
    { id: "customer", name: "Customer Perspective", description: "Customer satisfaction and market share", order: 2 },
    { id: "internal-process", name: "Internal Process Perspective", description: "Operational efficiency and quality", order: 3 },
    { id: "learning-growth", name: "Learning & Growth Perspective", description: "Employee development and innovation", order: 4 },
  ],
}

export const ansoffMatrixConfig: FrameworkDashboardConfig = {
  frameworkId: "ansoff",
  frameworkName: "Ansoff Matrix",
  frameworkSlug: "ansoff",
  grandchildren: [
    { id: "market-penetration", name: "Market Penetration", description: "Existing markets, existing products", order: 1 },
    { id: "market-development", name: "Market Development", description: "New markets, existing products", order: 2 },
    { id: "product-development", name: "Product Development", description: "Existing markets, new products", order: 3 },
    { id: "diversification", name: "Diversification", description: "New markets, new products", order: 4 },
  ],
}

export const blueOceanConfig: FrameworkDashboardConfig = {
  frameworkId: "blue-ocean",
  frameworkName: "Blue Ocean Strategy",
  frameworkSlug: "blue-ocean",
  grandchildren: [
    { id: "eliminate", name: "Eliminate", description: "Factors to eliminate from the industry", order: 1 },
    { id: "reduce", name: "Reduce", description: "Factors to reduce below industry standards", order: 2 },
    { id: "raise", name: "Raise", description: "Factors to raise above industry standards", order: 3 },
    { id: "create", name: "Create", description: "Factors to create that industry never offered", order: 4 },
  ],
}

export const mckinsey7sConfig: FrameworkDashboardConfig = {
  frameworkId: "mckinsey-7s",
  frameworkName: "McKinsey 7S Framework",
  frameworkSlug: "mckinsey-7s",
  grandchildren: [
    { id: "strategy", name: "Strategy", description: "Plan to achieve competitive advantage", order: 1 },
    { id: "structure", name: "Structure", description: "Organization hierarchy and reporting", order: 2 },
    { id: "systems", name: "Systems", description: "Procedures and processes", order: 3 },
    { id: "shared-values", name: "Shared Values", description: "Core beliefs and culture", order: 4 },
    { id: "style", name: "Style", description: "Leadership and management approach", order: 5 },
    { id: "staff", name: "Staff", description: "Human resources and talent", order: 6 },
    { id: "skills", name: "Skills", description: "Core competencies and capabilities", order: 7 },
  ],
}

export const wardleyMappingConfig: FrameworkDashboardConfig = {
  frameworkId: "wardley-mapping",
  frameworkName: "Wardley Mapping",
  frameworkSlug: "wardley-mapping",
  grandchildren: [
    { id: "value-chain", name: "Value Chain", description: "User needs to components mapping", order: 1 },
    { id: "evolution", name: "Evolution Stages", description: "Genesis to commodity evolution", order: 2 },
    { id: "components", name: "Components", description: "System components and positioning", order: 3 },
    { id: "strategic-play", name: "Strategic Play", description: "Strategic movements and gameplay", order: 4 },
  ],
}

// =============================================================================
// BUSINESS MANAGEMENT FRAMEWORKS
// =============================================================================

export const sixSigmaConfig: FrameworkDashboardConfig = {
  frameworkId: "six-sigma",
  frameworkName: "Six Sigma / DMAIC",
  frameworkSlug: "six-sigma",
  grandchildren: [
    { id: "define", name: "Define", description: "Define the problem and project goals", order: 1 },
    { id: "measure", name: "Measure", description: "Measure current performance and collect data", order: 2 },
    { id: "analyze", name: "Analyze", description: "Analyze data to find root causes", order: 3 },
    { id: "improve", name: "Improve", description: "Implement solutions and improvements", order: 4 },
    { id: "control", name: "Control", description: "Control and sustain improvements", order: 5 },
  ],
}

export const leanManagementConfig: FrameworkDashboardConfig = {
  frameworkId: "lean",
  frameworkName: "Lean Management",
  frameworkSlug: "lean",
  grandchildren: [
    { id: "value-stream", name: "Value Stream Mapping", description: "Map current and future state value streams", order: 1 },
    { id: "5s", name: "5S Methodology", description: "Sort, Set in order, Shine, Standardize, Sustain", order: 2 },
    { id: "kaizen", name: "Kaizen", description: "Continuous improvement activities", order: 3 },
    { id: "kanban", name: "Kanban", description: "Visual workflow management", order: 4 },
    { id: "waste-elimination", name: "Waste Elimination", description: "Identify and eliminate 8 wastes", order: 5 },
  ],
}

export const kanbanMethodConfig: FrameworkDashboardConfig = {
  frameworkId: "kanban-method",
  frameworkName: "Kanban Method",
  frameworkSlug: "kanban-method",
  grandchildren: [
    { id: "visualize-workflow", name: "Visualize Workflow", description: "Make work visible on Kanban board", order: 1 },
    { id: "limit-wip", name: "Limit Work in Progress", description: "Set WIP limits for each column", order: 2 },
    { id: "manage-flow", name: "Manage Flow", description: "Monitor and optimize flow of work", order: 3 },
    { id: "explicit-policies", name: "Make Policies Explicit", description: "Define and communicate workflow policies", order: 4 },
    { id: "feedback-loops", name: "Implement Feedback Loops", description: "Regular meetings and metrics reviews", order: 5 },
    { id: "improve-collaboratively", name: "Improve Collaboratively", description: "Evolve experimentally using models and methods", order: 6 },
  ],
}

export const lessConfig: FrameworkDashboardConfig = {
  frameworkId: "less",
  frameworkName: "LeSS (Large-Scale Scrum)",
  frameworkSlug: "less",
  grandchildren: [
    { id: "less-framework", name: "LeSS Framework", description: "Basic LeSS framework (up to 8 teams)", order: 1 },
    { id: "less-huge", name: "LeSS Huge", description: "LeSS Huge for very large products", order: 2 },
    { id: "organizational-structure", name: "Organizational Structure", description: "Feature teams and organizational design", order: 3 },
    { id: "product-owner", name: "Product Owner", description: "Single Product Owner role", order: 4 },
    { id: "sprint-planning", name: "Sprint Planning", description: "Overall and team-level sprint planning", order: 5 },
  ],
}

export const bpmnConfig: FrameworkDashboardConfig = {
  frameworkId: "bpmn",
  frameworkName: "BPMN 2.0",
  frameworkSlug: "bpmn",
  grandchildren: [
    { id: "events", name: "Events", description: "Start, intermediate, and end events", order: 1 },
    { id: "activities", name: "Activities", description: "Tasks and sub-processes", order: 2 },
    { id: "gateways", name: "Gateways", description: "Exclusive, parallel, and inclusive gateways", order: 3 },
    { id: "flows", name: "Sequence & Message Flows", description: "Control flow and message passing", order: 4 },
    { id: "pools-lanes", name: "Pools & Lanes", description: "Organizational units and responsibilities", order: 5 },
  ],
}

export const kottersConfig: FrameworkDashboardConfig = {
  frameworkId: "kotters-8-step",
  frameworkName: "Kotter's 8-Step Change",
  frameworkSlug: "kotters-8-step",
  grandchildren: [
    { id: "create-urgency", name: "Create Urgency", description: "Develop a sense of urgency around the need for change", order: 1 },
    { id: "build-coalition", name: "Build Guiding Coalition", description: "Form a powerful coalition to lead the change", order: 2 },
    { id: "form-vision", name: "Form Strategic Vision", description: "Create a vision and strategy for change", order: 3 },
    { id: "enlist-army", name: "Enlist Volunteer Army", description: "Communicate the vision to create buy-in", order: 4 },
    { id: "enable-action", name: "Enable Action", description: "Remove obstacles to empower action", order: 5 },
    { id: "generate-wins", name: "Generate Short-Term Wins", description: "Create and celebrate short-term wins", order: 6 },
    { id: "sustain-acceleration", name: "Sustain Acceleration", description: "Build on the change momentum", order: 7 },
    { id: "institute-change", name: "Institute Change", description: "Anchor changes in corporate culture", order: 8 },
  ],
}

export const adkarConfig: FrameworkDashboardConfig = {
  frameworkId: "adkar",
  frameworkName: "ADKAR Model",
  frameworkSlug: "adkar",
  grandchildren: [
    { id: "awareness", name: "Awareness", description: "Awareness of the need for change", order: 1 },
    { id: "desire", name: "Desire", description: "Desire to support and participate in change", order: 2 },
    { id: "knowledge", name: "Knowledge", description: "Knowledge on how to change", order: 3 },
    { id: "ability", name: "Ability", description: "Ability to implement required skills and behaviors", order: 4 },
    { id: "reinforcement", name: "Reinforcement", description: "Reinforcement to sustain the change", order: 5 },
  ],
}

export const designThinkingConfig: FrameworkDashboardConfig = {
  frameworkId: "design-thinking",
  frameworkName: "Design Thinking",
  frameworkSlug: "design-thinking",
  grandchildren: [
    { id: "empathize", name: "Empathize", description: "Understand user needs and problems", order: 1 },
    { id: "define", name: "Define", description: "Define the problem statement", order: 2 },
    { id: "ideate", name: "Ideate", description: "Generate creative solution ideas", order: 3 },
    { id: "prototype", name: "Prototype", description: "Build prototypes of solutions", order: 4 },
    { id: "test", name: "Test", description: "Test prototypes with users", order: 5 },
  ],
}

// =============================================================================
// IT MANAGEMENT FRAMEWORKS
// =============================================================================

export const awsWafConfig: FrameworkDashboardConfig = {
  frameworkId: "aws-waf",
  frameworkName: "AWS Well-Architected Framework",
  frameworkSlug: "aws-waf",
  grandchildren: [
    { id: "operational-excellence", name: "Operational Excellence", description: "Run and monitor systems to deliver business value", order: 1 },
    { id: "security", name: "Security", description: "Protect information and systems", order: 2 },
    { id: "reliability", name: "Reliability", description: "Recover from failures and meet demand", order: 3 },
    { id: "performance-efficiency", name: "Performance Efficiency", description: "Use computing resources efficiently", order: 4 },
    { id: "cost-optimization", name: "Cost Optimization", description: "Avoid unnecessary costs", order: 5 },
    { id: "sustainability", name: "Sustainability", description: "Minimize environmental impacts", order: 6 },
  ],
}

export const damaDmbokConfig: FrameworkDashboardConfig = {
  frameworkId: "dama-dmbok",
  frameworkName: "DAMA-DMBOK 2.0",
  frameworkSlug: "dama-dmbok",
  grandchildren: [
    { id: "data-governance", name: "Data Governance", description: "Framework for data governance", order: 1 },
    { id: "data-architecture", name: "Data Architecture", description: "Design and manage data architecture", order: 2 },
    { id: "data-modeling", name: "Data Modeling & Design", description: "Data models and database design", order: 3 },
    { id: "data-storage", name: "Data Storage & Operations", description: "Database operations and management", order: 4 },
    { id: "data-security", name: "Data Security", description: "Protect data assets", order: 5 },
    { id: "data-integration", name: "Data Integration & Interoperability", description: "Data integration and exchange", order: 6 },
    { id: "master-data", name: "Reference & Master Data", description: "Master data management", order: 7 },
    { id: "data-warehousing", name: "Data Warehousing & BI", description: "Analytics and business intelligence", order: 8 },
    { id: "metadata", name: "Metadata", description: "Metadata management", order: 9 },
    { id: "data-quality", name: "Data Quality", description: "Data quality management", order: 10 },
  ],
}

export const cmmiConfig: FrameworkDashboardConfig = {
  frameworkId: "cmmi",
  frameworkName: "CMMI (Capability Maturity Model Integration)",
  frameworkSlug: "cmmi",
  grandchildren: [
    { id: "level-1", name: "Level 1: Initial", description: "Processes unpredictable and reactive", order: 1 },
    { id: "level-2", name: "Level 2: Managed", description: "Processes characterized for projects", order: 2 },
    { id: "level-3", name: "Level 3: Defined", description: "Processes characterized for organization", order: 3 },
    { id: "level-4", name: "Level 4: Quantitatively Managed", description: "Processes measured and controlled", order: 4 },
    { id: "level-5", name: "Level 5: Optimizing", description: "Focus on continuous improvement", order: 5 },
  ],
}

export const azureCafConfig: FrameworkDashboardConfig = {
  frameworkId: "azure-caf",
  frameworkName: "Azure Cloud Adoption Framework",
  frameworkSlug: "azure-caf",
  grandchildren: [
    { id: "strategy", name: "Strategy", description: "Define business justification and outcomes", order: 1 },
    { id: "plan", name: "Plan", description: "Align actionable adoption plans", order: 2 },
    { id: "ready", name: "Ready", description: "Prepare cloud environment", order: 3 },
    { id: "adopt", name: "Adopt", description: "Migrate and innovate", order: 4 },
    { id: "govern", name: "Govern", description: "Govern and manage cloud environments", order: 5 },
    { id: "manage", name: "Manage", description: "Operations management", order: 6 },
  ],
}

export const gcpFrameworkConfig: FrameworkDashboardConfig = {
  frameworkId: "gcp-framework",
  frameworkName: "Google Cloud Architecture Framework",
  frameworkSlug: "gcp-framework",
  grandchildren: [
    { id: "operational-excellence", name: "Operational Excellence", description: "Efficient operations and deployment", order: 1 },
    { id: "security-privacy", name: "Security, Privacy & Compliance", description: "Protect systems and data", order: 2 },
    { id: "reliability", name: "Reliability", description: "Design for availability and resilience", order: 3 },
    { id: "cost-optimization", name: "Cost Optimization", description: "Maximize business value", order: 4 },
    { id: "performance-optimization", name: "Performance Optimization", description: "Efficient resource utilization", order: 5 },
  ],
}

export const crispDmConfig: FrameworkDashboardConfig = {
  frameworkId: "crisp-dm",
  frameworkName: "CRISP-DM",
  frameworkSlug: "crisp-dm",
  grandchildren: [
    { id: "business-understanding", name: "Business Understanding", description: "Understand project objectives and requirements", order: 1 },
    { id: "data-understanding", name: "Data Understanding", description: "Collect and explore data", order: 2 },
    { id: "data-preparation", name: "Data Preparation", description: "Construct final dataset", order: 3 },
    { id: "modeling", name: "Modeling", description: "Select and apply modeling techniques", order: 4 },
    { id: "evaluation", name: "Evaluation", description: "Evaluate model quality", order: 5 },
    { id: "deployment", name: "Deployment", description: "Deploy model to production", order: 6 },
  ],
}

export const devopsDoraConfig: FrameworkDashboardConfig = {
  frameworkId: "devops-dora",
  frameworkName: "DevOps & DORA Metrics",
  frameworkSlug: "devops-dora",
  grandchildren: [
    { id: "deployment-frequency", name: "Deployment Frequency", description: "How often code is deployed to production", order: 1 },
    { id: "lead-time", name: "Lead Time for Changes", description: "Time from commit to production", order: 2 },
    { id: "mttr", name: "Mean Time to Recovery", description: "Time to restore service after incident", order: 3 },
    { id: "change-failure-rate", name: "Change Failure Rate", description: "Percentage of deployments causing failures", order: 4 },
  ],
}

// =============================================================================
// COST & FINOPS FRAMEWORKS
// =============================================================================

export const finopsConfig: FrameworkDashboardConfig = {
  frameworkId: "finops",
  frameworkName: "FinOps Framework",
  frameworkSlug: "finops",
  grandchildren: [
    { id: "inform", name: "Inform", description: "Visibility and allocation of cloud costs", order: 1 },
    { id: "optimize", name: "Optimize", description: "Optimize cloud usage and costs", order: 2 },
    { id: "operate", name: "Operate", description: "Define governance and continuous improvement", order: 3 },
  ],
}

export const abcCostingConfig: FrameworkDashboardConfig = {
  frameworkId: "abc-costing",
  frameworkName: "Activity-Based Costing (ABC)",
  frameworkSlug: "abc-costing",
  grandchildren: [
    { id: "activity-analysis", name: "Activity Analysis", description: "Identify and analyze activities", order: 1 },
    { id: "cost-drivers", name: "Cost Drivers", description: "Identify cost drivers for each activity", order: 2 },
    { id: "cost-allocation", name: "Cost Allocation", description: "Allocate costs to products or services", order: 3 },
  ],
}

export const zbbConfig: FrameworkDashboardConfig = {
  frameworkId: "zero-based-budgeting",
  frameworkName: "Zero-Based Budgeting",
  frameworkSlug: "zero-based-budgeting",
  grandchildren: [
    { id: "decision-packages", name: "Decision Packages", description: "Create decision packages for each activity", order: 1 },
    { id: "ranking", name: "Ranking & Prioritization", description: "Rank and prioritize decision packages", order: 2 },
    { id: "allocation", name: "Resource Allocation", description: "Allocate resources based on priorities", order: 3 },
  ],
}

export const unitEconomicsConfig: FrameworkDashboardConfig = {
  frameworkId: "unit-economics",
  frameworkName: "Unit Economics",
  frameworkSlug: "unit-economics",
  grandchildren: [
    { id: "cac", name: "Customer Acquisition Cost (CAC)", description: "Cost to acquire a customer", order: 1 },
    { id: "ltv", name: "Lifetime Value (LTV)", description: "Total value of a customer relationship", order: 2 },
    { id: "contribution-margin", name: "Contribution Margin", description: "Revenue minus variable costs per unit", order: 3 },
  ],
}

// =============================================================================
// RISK MANAGEMENT FRAMEWORKS
// =============================================================================

export const cosoConfig: FrameworkDashboardConfig = {
  frameworkId: "coso",
  frameworkName: "COSO Framework",
  frameworkSlug: "coso",
  grandchildren: [
    { id: "capability-map", name: "Capability Map", description: "Visual capability hierarchy and heat maps", order: 0 },
    { id: "control-environment", name: "Control Environment", description: "Set the tone of the organization", order: 1 },
    { id: "risk-assessment", name: "Risk Assessment", description: "Identify and analyze risks", order: 2 },
    { id: "control-activities", name: "Control Activities", description: "Policies and procedures to mitigate risks", order: 3 },
    { id: "information-communication", name: "Information & Communication", description: "Identify, capture, and communicate information", order: 4 },
    { id: "monitoring", name: "Monitoring Activities", description: "Monitor and evaluate control effectiveness", order: 5 },
  ],
}

export const iso31000Config: FrameworkDashboardConfig = {
  frameworkId: "iso-31000",
  frameworkName: "ISO 31000 Risk Management",
  frameworkSlug: "iso-31000",
  grandchildren: [
    { id: "risk-identification", name: "Risk Identification", description: "Find, recognize, and describe risks", order: 1 },
    { id: "risk-analysis", name: "Risk Analysis", description: "Understand the nature and characteristics of risk", order: 2 },
    { id: "risk-evaluation", name: "Risk Evaluation", description: "Compare risk analysis results with risk criteria", order: 3 },
    { id: "risk-treatment", name: "Risk Treatment", description: "Select and implement risk treatment options", order: 4 },
    { id: "monitoring-review", name: "Monitoring & Review", description: "Monitor, review, and improve risk management", order: 5 },
  ],
}

export const threeLinesConfig: FrameworkDashboardConfig = {
  frameworkId: "three-lines-defense",
  frameworkName: "Three Lines of Defense",
  frameworkSlug: "three-lines-defense",
  grandchildren: [
    { id: "first-line", name: "First Line: Operational Management", description: "Own and manage risks", order: 1 },
    { id: "second-line", name: "Second Line: Risk Management & Compliance", description: "Oversee and monitor risks", order: 2 },
    { id: "third-line", name: "Third Line: Internal Audit", description: "Provide independent assurance", order: 3 },
  ],
}

// =============================================================================
// INNOVATION & DIGITAL TRANSFORMATION
// =============================================================================

export const digitalTransformationConfig: FrameworkDashboardConfig = {
  frameworkId: "digital-transformation",
  frameworkName: "Digital Transformation Framework",
  frameworkSlug: "digital-transformation",
  grandchildren: [
    { id: "customer-experience", name: "Customer Experience", description: "Transform customer interactions and touchpoints", order: 1 },
    { id: "operational-processes", name: "Operational Processes", description: "Digitize and optimize business processes", order: 2 },
    { id: "business-models", name: "Business Models", description: "Innovate business models with digital technologies", order: 3 },
  ],
}

export const openInnovationConfig: FrameworkDashboardConfig = {
  frameworkId: "open-innovation",
  frameworkName: "Open Innovation Framework",
  frameworkSlug: "open-innovation",
  grandchildren: [
    { id: "inbound-innovation", name: "Inbound Innovation", description: "Bring external ideas and technologies inside", order: 1 },
    { id: "outbound-innovation", name: "Outbound Innovation", description: "Send internal ideas and technologies outside", order: 2 },
    { id: "coupled-innovation", name: "Coupled Innovation", description: "Combine inbound and outbound processes", order: 3 },
  ],
}

export const disruptiveInnovationConfig: FrameworkDashboardConfig = {
  frameworkId: "disruptive-innovation",
  frameworkName: "Disruptive Innovation",
  frameworkSlug: "disruptive-innovation",
  grandchildren: [
    { id: "low-end-disruption", name: "Low-End Disruption", description: "Target overserved customers at the low end", order: 1 },
    { id: "new-market-disruption", name: "New-Market Disruption", description: "Create new markets for non-consumers", order: 2 },
  ],
}

// =============================================================================
// CUSTOMER & EXPERIENCE FRAMEWORKS
// =============================================================================

export const customerJourneyConfig: FrameworkDashboardConfig = {
  frameworkId: "customer-journey",
  frameworkName: "Customer Journey Mapping",
  frameworkSlug: "customer-journey",
  grandchildren: [
    { id: "awareness", name: "Awareness", description: "Customer becomes aware of needs", order: 1 },
    { id: "consideration", name: "Consideration", description: "Customer considers options", order: 2 },
    { id: "purchase", name: "Purchase", description: "Customer makes purchase decision", order: 3 },
    { id: "retention", name: "Retention", description: "Customer continues using product/service", order: 4 },
    { id: "advocacy", name: "Advocacy", description: "Customer becomes brand advocate", order: 5 },
  ],
}

export const serviceDesignConfig: FrameworkDashboardConfig = {
  frameworkId: "service-design",
  frameworkName: "Service Design Thinking",
  frameworkSlug: "service-design",
  grandchildren: [
    { id: "service-blueprint", name: "Service Blueprint", description: "Map service delivery processes", order: 1 },
    { id: "touchpoints", name: "Touchpoint Analysis", description: "Analyze customer touchpoints", order: 2 },
    { id: "personas", name: "Personas", description: "Create user personas and empathy maps", order: 3 },
  ],
}

export const jtbdConfig: FrameworkDashboardConfig = {
  frameworkId: "jtbd",
  frameworkName: "Jobs-to-be-Done (JTBD)",
  frameworkSlug: "jtbd",
  grandchildren: [
    { id: "functional-jobs", name: "Functional Jobs", description: "Practical tasks to be completed", order: 1 },
    { id: "social-jobs", name: "Social Jobs", description: "How customers want to be perceived", order: 2 },
    { id: "emotional-jobs", name: "Emotional Jobs", description: "How customers want to feel", order: 3 },
  ],
}

export const npsConfig: FrameworkDashboardConfig = {
  frameworkId: "nps",
  frameworkName: "Net Promoter Score (NPS)",
  frameworkSlug: "nps",
  grandchildren: [
    { id: "promoters", name: "Promoters", description: "Loyal enthusiasts (score 9-10)", order: 1 },
    { id: "passives", name: "Passives", description: "Satisfied but unenthusiastic (score 7-8)", order: 2 },
    { id: "detractors", name: "Detractors", description: "Unhappy customers (score 0-6)", order: 3 },
  ],
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// Map of all framework configurations
export const frameworkConfigs: Record<string, FrameworkDashboardConfig> = {
  // Business Model & Strategy
  "lean-canvas": leanCanvasConfig,
  "business-model-canvas": businessModelCanvasConfig,
  "okr": okrConfig,

  // Strategy Analysis
  "swot": swotConfig,
  "pestle": pestleConfig,
  "porters-five-forces": portersFiveForcesConfig,
  "balanced-scorecard": balancedScorecardConfig,
  "ansoff": ansoffMatrixConfig,
  "blue-ocean": blueOceanConfig,
  "mckinsey-7s": mckinsey7sConfig,
  "wardley-mapping": wardleyMappingConfig,

  // Enterprise Architecture
  "togaf": togafConfig,
  "archimate": archimateConfig,
  "zachman": zachmanConfig,
  "capability-model": capabilityModelConfig,
  "application-capability-model": applicationCapabilityModelConfig,
  "genai": genaiConfig,
  "pcf": pcfConfig,
  "feaf": feafConfig,

  // Risk & Security
  "iso-27001": iso27001Config,
  "nist-csf": nistCsfConfig,
  "cis-controls": cisControlsConfig,
  "pci-dss": pciDssConfig,
  "soc2": soc2Config,
  "gdpr": gdprConfig,
  "cobit-2019": cobit2019Config,
  "sabsa": sabsaConfig,
  "iso-9001": iso9001Config,
  "coso": cosoConfig,
  "iso-31000": iso31000Config,
  "three-lines-defense": threeLinesConfig,

  // IT Service Management
  "itil4": itil4Config,

  // Project Management
  "pmbok": pmbokConfig,
  "prince2": prince2Config,

  // Agile
  "scrum": scrumConfig,
  "safe": safeConfig,

  // Business Management
  "six-sigma": sixSigmaConfig,
  "lean": leanManagementConfig,
  "kanban-method": kanbanMethodConfig,
  "less": lessConfig,
  "bpmn": bpmnConfig,
  "kotters-8-step": kottersConfig,
  "adkar": adkarConfig,
  "design-thinking": designThinkingConfig,

  // IT Management
  "aws-waf": awsWafConfig,
  "dama-dmbok": damaDmbokConfig,
  "cmmi": cmmiConfig,
  "azure-caf": azureCafConfig,
  "gcp-framework": gcpFrameworkConfig,
  "crisp-dm": crispDmConfig,
  "devops-dora": devopsDoraConfig,

  // Cost & FinOps
  "finops": finopsConfig,
  "abc-costing": abcCostingConfig,
  "zero-based-budgeting": zbbConfig,
  "unit-economics": unitEconomicsConfig,

  // Innovation & Digital Transformation
  "digital-transformation": digitalTransformationConfig,
  "open-innovation": openInnovationConfig,
  "disruptive-innovation": disruptiveInnovationConfig,

  // Customer & Experience
  "customer-journey": customerJourneyConfig,
  "service-design": serviceDesignConfig,
  "jtbd": jtbdConfig,
  "nps": npsConfig,
}

/**
 * Get framework dashboard configuration by slug
 */
export function getFrameworkDashboardConfig(slug: string): FrameworkDashboardConfig | null {
  return frameworkConfigs[slug] || null
}

/**
 * Get all available framework configurations
 */
export function getAllFrameworkConfigs(): FrameworkDashboardConfig[] {
  return Object.values(frameworkConfigs)
}

/**
 * Check if a framework has dashboard configuration
 */
export function hasFrameworkDashboard(slug: string): boolean {
  return slug in frameworkConfigs
}
