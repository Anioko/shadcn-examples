// Framework Categories (Parent Capabilities)
// Maps parent capabilities to their child frameworks

export type FrameworkCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  frameworks: FrameworkInfo[];
};

export type FrameworkInfo = {
  id: string;
  name: string;
  slug: string;
  description: string;
  hasKanban: boolean;
  tier?: 1 | 2 | 3; // Kanban suitability tier
};

export const frameworkCategories: FrameworkCategory[] = [
  {
    id: "agile-project-management",
    name: "Agile & Project Management",
    description: "Agile methodologies, project management frameworks, and delivery approaches",
    icon: "Briefcase",
    frameworks: [
      {
        id: "scrum",
        name: "Scrum",
        slug: "scrum",
        description: "Iterative agile framework for managing product development",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "kanban",
        name: "Kanban Method",
        slug: "kanban",
        description: "Visual workflow management method",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "safe",
        name: "SAFe",
        slug: "safe",
        description: "Scaled Agile Framework for enterprise",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "six-sigma",
        name: "Six Sigma / DMAIC",
        slug: "six-sigma",
        description: "Data-driven quality improvement methodology",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "less",
        name: "LeSS",
        slug: "less",
        description: "Large-Scale Scrum framework",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "prince2",
        name: "PRINCE2",
        slug: "prince2",
        description: "Process-based project management method",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "pmbok",
        name: "PMBOK",
        slug: "pmbok",
        description: "Project Management Body of Knowledge",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "lean-vsm",
        name: "Lean / Value Stream Mapping",
        slug: "lean-vsm",
        description: "Lean principles and value stream optimization",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "crisp-dm",
        name: "CRISP-DM",
        slug: "crisp-dm",
        description: "Cross-Industry Standard Process for Data Mining",
        hasKanban: true,
        tier: 2,
      },
      {
        id: "design-thinking",
        name: "Design Thinking",
        slug: "design-thinking",
        description: "Human-centered innovation approach",
        hasKanban: true,
        tier: 2,
      },
    ],
  },
  {
    id: "change-management",
    name: "Change Management",
    description: "Organizational change, transformation, and adoption frameworks",
    icon: "RefreshCw",
    frameworks: [
      {
        id: "kotter",
        name: "Kotter's 8-Step Change",
        slug: "kotter",
        description: "Eight-step process for leading change",
        hasKanban: true,
        tier: 2,
      },
      {
        id: "adkar",
        name: "ADKAR",
        slug: "adkar",
        description: "Individual change management model",
        hasKanban: true,
        tier: 2,
      },
      {
        id: "digital-transformation",
        name: "Digital Transformation",
        slug: "digital-transformation",
        description: "Enterprise digital transformation framework",
        hasKanban: true,
        tier: 2,
      },
    ],
  },
  {
    id: "enterprise-architecture",
    name: "Enterprise Architecture",
    description: "Enterprise architecture frameworks and methodologies",
    icon: "Building2",
    frameworks: [
      {
        id: "togaf",
        name: "TOGAF ADM",
        slug: "togaf",
        description: "The Open Group Architecture Framework",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "sabsa",
        name: "SABSA",
        slug: "sabsa",
        description: "Sherwood Applied Business Security Architecture",
        hasKanban: true,
        tier: 2,
      },
      {
        id: "azure-caf",
        name: "Azure/Cloud Adoption Framework",
        slug: "azure-caf",
        description: "Microsoft Cloud Adoption Framework",
        hasKanban: true,
        tier: 2,
      },
    ],
  },
  {
    id: "security-compliance",
    name: "Security & Compliance",
    description: "Information security, risk management, and compliance frameworks",
    icon: "Shield",
    frameworks: [
      {
        id: "iso-31000",
        name: "ISO 31000 Risk Management",
        slug: "iso-31000",
        description: "International risk management standard",
        hasKanban: true,
        tier: 2,
      },
      {
        id: "iso-27001",
        name: "ISO 27001",
        slug: "iso-27001",
        description: "Information security management system",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "nist-csf",
        name: "NIST CSF",
        slug: "nist-csf",
        description: "NIST Cybersecurity Framework",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "cis-controls",
        name: "CIS Controls",
        slug: "cis-controls",
        description: "Center for Internet Security Controls",
        hasKanban: true,
        tier: 2,
      },
      {
        id: "soc2",
        name: "SOC 2",
        slug: "soc2",
        description: "Service Organization Control 2",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "gdpr",
        name: "GDPR Compliance",
        slug: "gdpr",
        description: "General Data Protection Regulation",
        hasKanban: true,
        tier: 2,
      },
      {
        id: "pci-dss",
        name: "PCI DSS",
        slug: "pci-dss",
        description: "Payment Card Industry Data Security Standard",
        hasKanban: true,
        tier: 2,
      },
    ],
  },
  {
    id: "governance-audit",
    name: "Governance & Audit",
    description: "IT governance, audit, and control frameworks",
    icon: "FileCheck",
    frameworks: [
      {
        id: "coso",
        name: "COSO Framework",
        slug: "coso",
        description: "Committee of Sponsoring Organizations framework",
        hasKanban: true,
        tier: 2,
      },
      {
        id: "cobit",
        name: "COBIT",
        slug: "cobit",
        description: "Control Objectives for Information Technologies",
        hasKanban: true,
        tier: 2,
      },
      {
        id: "iso-9001",
        name: "ISO 9001",
        slug: "iso-9001",
        description: "Quality management system standard",
        hasKanban: true,
        tier: 2,
      },
    ],
  },
  {
    id: "it-service-management",
    name: "IT Service Management",
    description: "IT service delivery, operations, and DevOps frameworks",
    icon: "Settings",
    frameworks: [
      {
        id: "itil4",
        name: "ITIL 4",
        slug: "itil4",
        description: "IT Infrastructure Library v4",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "devops",
        name: "DevOps Pipeline",
        slug: "devops",
        description: "DevOps practices and CI/CD pipeline",
        hasKanban: true,
        tier: 1,
      },
      {
        id: "cmmi",
        name: "CMMI Process Improvement",
        slug: "cmmi",
        description: "Capability Maturity Model Integration",
        hasKanban: true,
        tier: 2,
      },
    ],
  },
  {
    id: "financial-management",
    name: "Financial Management",
    description: "Financial planning, budgeting, and cost optimization frameworks",
    icon: "DollarSign",
    frameworks: [
      {
        id: "finops",
        name: "FinOps Framework",
        slug: "finops",
        description: "Cloud financial management framework",
        hasKanban: true,
        tier: 2,
      },
      {
        id: "zero-based-budgeting",
        name: "Zero-Based Budgeting",
        slug: "zero-based-budgeting",
        description: "Budget planning from zero base",
        hasKanban: true,
        tier: 3,
      },
    ],
  },
  {
    id: "customer-experience",
    name: "Customer Experience",
    description: "Customer journey, experience design, and transformation",
    icon: "Users",
    frameworks: [
      {
        id: "customer-journey",
        name: "Customer Journey Mapping",
        slug: "customer-journey",
        description: "Customer experience journey mapping",
        hasKanban: true,
        tier: 2,
      },
    ],
  },
];

// Helper functions
export function getFrameworkCategory(categoryId: string): FrameworkCategory | undefined {
  return frameworkCategories.find((cat) => cat.id === categoryId);
}

export function getFrameworkBySlug(slug: string): { framework: FrameworkInfo; category: FrameworkCategory } | undefined {
  for (const category of frameworkCategories) {
    const framework = category.frameworks.find((f) => f.slug === slug);
    if (framework) {
      return { framework, category };
    }
  }
  return undefined;
}

export function getAllFrameworksWithKanban(): Array<{ framework: FrameworkInfo; category: FrameworkCategory }> {
  const result: Array<{ framework: FrameworkInfo; category: FrameworkCategory }> = [];
  for (const category of frameworkCategories) {
    for (const framework of category.frameworks) {
      if (framework.hasKanban) {
        result.push({ framework, category });
      }
    }
  }
  return result;
}

export function getFrameworksByCategory(categoryId: string): FrameworkInfo[] {
  const category = getFrameworkCategory(categoryId);
  return category?.frameworks || [];
}
