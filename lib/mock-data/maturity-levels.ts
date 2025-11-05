/**
 * Mock Maturity Assessment Data
 * Based on organization-maturity-engine from source
 * Implements industry-specific modifiers, company size influences, and framework readiness calculations
 */

export interface MaturityDimension {
  id: string;
  name: string;
  description: string;
  weight: number; // Importance weight in overall score (0-1, total=1.0)
}

export interface MaturityLevel {
  level: number;
  name: string;
  description: string;
  characteristics: string[];
  recommendedFrameworks: string[];
}

export interface MaturityAssessment {
  organizationId: string;
  dimension: string;
  currentLevel: number;
  targetLevel: number;
  gapAnalysis: string[];
  recommendedActions: string[];
  estimatedTimeframe: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  calculatedAt: Date;
}

export interface OrganizationMaturityProfile {
  organizationId: string;
  overallMaturity: number;
  dimensionScores: Record<string, number>;
  strengths: string[];
  gapsToAddress: string[];
  readinessForFrameworks: Record<string, number>;
  recommendedProgression: string[];
  lastAssessment: Date;
}

export interface IndustryMaturityModifiers {
  [industry: string]: {
    [dimension: string]: number; // Modifier to add to base maturity level
  };
}

export interface CompanySizeMaturityModifiers {
  [size: string]: {
    [dimension: string]: number;
  };
}

export interface FrameworkRequirements {
  [framework: string]: {
    [dimension: string]: number; // Required minimum level for this dimension
  };
}

// Maturity dimensions for framework readiness assessment
export const MATURITY_DIMENSIONS: MaturityDimension[] = [
  {
    id: 'governance',
    name: 'Governance & Oversight',
    description: 'Organizational governance structures, decision-making processes, and oversight capabilities',
    weight: 0.25
  },
  {
    id: 'process_maturity',
    name: 'Process Maturity',
    description: 'Standardization, documentation, and optimization of business processes',
    weight: 0.20
  },
  {
    id: 'technology_readiness',
    name: 'Technology Readiness',
    description: 'IT infrastructure, digital capabilities, and technology adoption',
    weight: 0.15
  },
  {
    id: 'data_management',
    name: 'Data Management',
    description: 'Data governance, quality, analytics, and information management capabilities',
    weight: 0.15
  },
  {
    id: 'change_management',
    name: 'Change Management',
    description: 'Organizational ability to manage and adapt to change initiatives',
    weight: 0.10
  },
  {
    id: 'risk_management',
    name: 'Risk Management',
    description: 'Risk identification, assessment, monitoring, and mitigation capabilities',
    weight: 0.10
  },
  {
    id: 'compliance_readiness',
    name: 'Compliance Readiness',
    description: 'Regulatory compliance awareness, controls, and reporting capabilities',
    weight: 0.05
  }
];

// Industry-specific maturity modifiers (from source organization-maturity-engine.ts)
// Positive values increase maturity, negative values decrease it
export const INDUSTRY_MATURITY_MODIFIERS: IndustryMaturityModifiers = {
  // Financial Services
  'banking-traditional': {
    governance: 1.5,
    compliance_readiness: 2.0,
    risk_management: 1.5,
    process_maturity: 1.0
  },
  'investment-management': {
    governance: 1.5,
    compliance_readiness: 2.0,
    risk_management: 2.0,
    data_management: 1.0
  },
  'insurance': {
    governance: 1.0,
    compliance_readiness: 1.5,
    risk_management: 2.0,
    process_maturity: 1.0
  },
  'fintech': {
    technology_readiness: 2.0,
    change_management: 1.5,
    compliance_readiness: 1.0,
    data_management: 1.0
  },

  // Healthcare
  'hospitals-health-systems': {
    compliance_readiness: 1.5,
    risk_management: 1.0,
    data_management: 1.0,
    governance: 0.5
  },
  'pharmaceutical': {
    compliance_readiness: 2.0,
    risk_management: 1.5,
    process_maturity: 1.5,
    data_management: 1.0
  },
  'biotechnology': {
    compliance_readiness: 1.5,
    risk_management: 1.0,
    technology_readiness: 1.5,
    data_management: 1.5
  },

  // Technology & Software
  'software-development': {
    technology_readiness: 2.0,
    change_management: 1.5,
    process_maturity: 0.5,
    data_management: 1.0
  },
  'saas-platforms': {
    technology_readiness: 2.0,
    change_management: 1.5,
    data_management: 1.5,
    compliance_readiness: 0.5
  },
  'cybersecurity': {
    technology_readiness: 1.5,
    risk_management: 2.0,
    compliance_readiness: 1.5,
    governance: 1.0
  },
  'artificial-intelligence': {
    technology_readiness: 2.0,
    data_management: 2.0,
    change_management: 1.0,
    risk_management: 0.5
  },

  // Manufacturing
  'manufacturing': {
    process_maturity: 1.5,
    risk_management: 1.0,
    governance: 1.0,
    compliance_readiness: 0.5
  },

  // Government & Public Sector
  'government': {
    governance: 2.0,
    compliance_readiness: 1.5,
    process_maturity: 1.0,
    change_management: -0.5 // Negative modifier
  },

  // Default for unspecified industries
  'other': {
    governance: 0.0,
    process_maturity: 0.0,
    technology_readiness: 0.0,
    data_management: 0.0,
    change_management: 0.0,
    risk_management: 0.0,
    compliance_readiness: 0.0
  }
};

// Company size maturity modifiers (from source)
export const COMPANY_SIZE_MATURITY_MODIFIERS: CompanySizeMaturityModifiers = {
  'startup': {
    change_management: 1.5,
    technology_readiness: 1.0,
    governance: -1.0,        // Negative: startups lack governance
    process_maturity: -0.5   // Negative: processes not yet mature
  },
  'small': {
    change_management: 1.0,
    technology_readiness: 0.5,
    governance: -0.5,
    process_maturity: 0.0
  },
  'medium': {
    technology_readiness: 0.5,
    change_management: 0.5,
    process_maturity: 0.5
  },
  'large': {
    governance: 0.5,
    process_maturity: 0.5,
    technology_readiness: 0.5,
    compliance_readiness: 0.5
  },
  'enterprise': {
    governance: 1.0,
    process_maturity: 1.0,
    compliance_readiness: 1.0,
    change_management: 0.5
  }
};

// Framework requirements: minimum maturity levels needed per dimension
export const FRAMEWORK_REQUIREMENTS: FrameworkRequirements = {
  // Governance frameworks
  'cobit2019': {
    governance: 3,
    process_maturity: 3,
    risk_management: 3,
    compliance_readiness: 3
  },
  'togaf-enterprise-architecture': {
    governance: 3,
    technology_readiness: 3,
    process_maturity: 3,
    change_management: 3
  },

  // Compliance frameworks
  'iso27001': {
    governance: 3,
    compliance_readiness: 3,
    risk_management: 3,
    process_maturity: 3
  },
  'sox-sarbanes-oxley': {
    governance: 4,
    compliance_readiness: 4,
    risk_management: 4,
    process_maturity: 4
  },
  'basel-iv': {
    governance: 4,
    compliance_readiness: 4,
    risk_management: 4,
    data_management: 3
  },
  'hipaa': {
    compliance_readiness: 3,
    risk_management: 3,
    data_management: 3,
    technology_readiness: 2
  },
  'gdpr': {
    compliance_readiness: 3,
    data_management: 3,
    governance: 2,
    risk_management: 2
  },

  // Process frameworks
  'itil-v4': {
    process_maturity: 3,
    technology_readiness: 3,
    governance: 2,
    change_management: 2
  },
  'lean-six-sigma': {
    process_maturity: 3,
    change_management: 2,
    governance: 2
  },
  'cmmi-dev': {
    process_maturity: 4,
    governance: 3,
    risk_management: 3
  },

  // Agile/DevOps frameworks
  'agile-methodology': {
    process_maturity: 2,
    change_management: 2,
    technology_readiness: 2
  },
  'devops-practices': {
    technology_readiness: 3,
    process_maturity: 3,
    change_management: 3
  },
  'safe-scaled-agile': {
    process_maturity: 3,
    governance: 3,
    change_management: 3,
    technology_readiness: 2
  },

  // Risk frameworks
  'coso-erm': {
    risk_management: 3,
    governance: 3,
    compliance_readiness: 2
  },
  'iso31000': {
    risk_management: 3,
    governance: 2,
    process_maturity: 2
  },

  // Lightweight frameworks (lower requirements)
  'lean-canvas': {
    process_maturity: 1,
    governance: 1
  },
  'okr-objectives-key-results': {
    governance: 2,
    process_maturity: 2
  },
  'balanced-scorecard': {
    governance: 2,
    process_maturity: 2,
    data_management: 2
  }
};

// 5-level maturity model (1=Initial, 2=Developing, 3=Defined, 4=Managed, 5=Optimized)
export const MATURITY_LEVELS: Record<string, MaturityLevel[]> = {
  governance: [
    {
      level: 1,
      name: 'Initial',
      description: 'Ad-hoc governance with minimal formal structure',
      characteristics: [
        'Informal decision-making processes',
        'Limited governance documentation',
        'Reactive management approach',
        'Unclear roles and responsibilities'
      ],
      recommendedFrameworks: ['lean-canvas', 'business-model-canvas']
    },
    {
      level: 2,
      name: 'Developing',
      description: 'Basic governance structures emerging',
      characteristics: [
        'Some formal processes documented',
        'Basic organizational structure defined',
        'Limited strategic planning',
        'Some accountability measures'
      ],
      recommendedFrameworks: ['okr-objectives-key-results', 'balanced-scorecard']
    },
    {
      level: 3,
      name: 'Defined',
      description: 'Formal governance framework established',
      characteristics: [
        'Clear governance policies and procedures',
        'Defined decision-making authority',
        'Regular strategic planning cycles',
        'Established oversight mechanisms'
      ],
      recommendedFrameworks: ['togaf-enterprise-architecture', 'cobit2019']
    },
    {
      level: 4,
      name: 'Managed',
      description: 'Quantitative governance management',
      characteristics: [
        'Metrics-driven governance',
        'Regular performance monitoring',
        'Continuous improvement processes',
        'Integrated risk management'
      ],
      recommendedFrameworks: ['iso27001', 'itil-v4', 'prince2']
    },
    {
      level: 5,
      name: 'Optimized',
      description: 'Continuously improving governance',
      characteristics: [
        'Predictive governance analytics',
        'Automated governance processes',
        'Innovation-driven improvement',
        'Benchmark-exceeding performance'
      ],
      recommendedFrameworks: ['devops-dora-metrics', 'ai-governance-framework']
    }
  ],
  process_maturity: [
    {
      level: 1,
      name: 'Initial',
      description: 'Chaotic, ad hoc processes',
      characteristics: [
        'Undocumented processes',
        'Hero-dependent operations',
        'Inconsistent execution',
        'Fire-fighting mode'
      ],
      recommendedFrameworks: ['agile-methodology', 'kanban-system']
    },
    {
      level: 2,
      name: 'Developing',
      description: 'Some processes documented',
      characteristics: [
        'Key processes identified',
        'Basic documentation exists',
        'Some standardization efforts',
        'Informal training'
      ],
      recommendedFrameworks: ['lean-six-sigma', 'process-mapping']
    },
    {
      level: 3,
      name: 'Defined',
      description: 'Standardized processes',
      characteristics: [
        'Comprehensive process documentation',
        'Standard operating procedures',
        'Role-based training programs',
        'Process ownership assigned'
      ],
      recommendedFrameworks: ['iso9001', 'cmmi-dev', 'bpmn-modeling']
    },
    {
      level: 4,
      name: 'Managed',
      description: 'Quantitatively managed processes',
      characteristics: [
        'Process performance metrics',
        'Statistical process control',
        'Predictable outcomes',
        'Data-driven decisions'
      ],
      recommendedFrameworks: ['six-sigma-dmaic', 'spc-framework']
    },
    {
      level: 5,
      name: 'Optimized',
      description: 'Continuously optimizing processes',
      characteristics: [
        'Continuous process improvement',
        'Innovation and technology adoption',
        'Predictive process analytics',
        'Industry-leading practices'
      ],
      recommendedFrameworks: ['lean-startup-methodology', 'design-thinking']
    }
  ],
  technology_readiness: [
    {
      level: 1,
      name: 'Initial',
      description: 'Basic technology infrastructure',
      characteristics: [
        'Minimal IT infrastructure',
        'Limited digital capabilities',
        'Manual processes predominant',
        'Ad-hoc technology adoption'
      ],
      recommendedFrameworks: ['cloud-first-strategy', 'basic-it-infrastructure']
    },
    {
      level: 2,
      name: 'Developing',
      description: 'Growing technology adoption',
      characteristics: [
        'Some cloud services adopted',
        'Basic digital tools in use',
        'IT support structure forming',
        'Technology roadmap emerging'
      ],
      recommendedFrameworks: ['saas-adoption-framework', 'it-service-management']
    },
    {
      level: 3,
      name: 'Defined',
      description: 'Established technology platform',
      characteristics: [
        'Comprehensive IT infrastructure',
        'Cloud-native applications',
        'Defined technology standards',
        'IT governance in place'
      ],
      recommendedFrameworks: ['enterprise-architecture', 'cloud-governance']
    },
    {
      level: 4,
      name: 'Managed',
      description: 'Optimized technology operations',
      characteristics: [
        'Automated infrastructure management',
        'Performance monitoring and optimization',
        'Service-level agreements enforced',
        'Technology ROI tracked'
      ],
      recommendedFrameworks: ['devops-practices', 'site-reliability-engineering']
    },
    {
      level: 5,
      name: 'Optimized',
      description: 'Innovation-driven technology',
      characteristics: [
        'AI/ML capabilities integrated',
        'Predictive infrastructure scaling',
        'Self-healing systems',
        'Technology innovation leader'
      ],
      recommendedFrameworks: ['aiops-framework', 'platform-engineering']
    }
  ],
  data_management: [
    {
      level: 1,
      name: 'Initial',
      description: 'Unstructured data practices',
      characteristics: [
        'Data siloed across systems',
        'No data governance',
        'Limited data quality',
        'Reactive data management'
      ],
      recommendedFrameworks: ['data-cataloging', 'basic-data-governance']
    },
    {
      level: 2,
      name: 'Developing',
      description: 'Emerging data practices',
      characteristics: [
        'Data inventory started',
        'Basic data quality checks',
        'Some data standards defined',
        'Initial analytics capabilities'
      ],
      recommendedFrameworks: ['master-data-management', 'data-quality-framework']
    },
    {
      level: 3,
      name: 'Defined',
      description: 'Structured data management',
      characteristics: [
        'Data governance framework',
        'Data quality standards enforced',
        'Enterprise data architecture',
        'Analytics widely used'
      ],
      recommendedFrameworks: ['data-mesh', 'enterprise-data-warehouse']
    },
    {
      level: 4,
      name: 'Managed',
      description: 'Data-driven organization',
      characteristics: [
        'Data quality metrics tracked',
        'Automated data pipelines',
        'Advanced analytics capabilities',
        'Data monetization initiatives'
      ],
      recommendedFrameworks: ['data-fabric', 'advanced-analytics-framework']
    },
    {
      level: 5,
      name: 'Optimized',
      description: 'AI-powered data intelligence',
      characteristics: [
        'Real-time data processing',
        'AI-driven insights automated',
        'Predictive analytics embedded',
        'Data as strategic asset'
      ],
      recommendedFrameworks: ['mlops-framework', 'ai-data-platform']
    }
  ],
  change_management: [
    {
      level: 1,
      name: 'Initial',
      description: 'Reactive to change',
      characteristics: [
        'No formal change process',
        'High resistance to change',
        'Ad-hoc change initiatives',
        'Limited stakeholder engagement'
      ],
      recommendedFrameworks: ['change-readiness-assessment', 'stakeholder-mapping']
    },
    {
      level: 2,
      name: 'Developing',
      description: 'Basic change capability',
      characteristics: [
        'Change process documented',
        'Key stakeholders identified',
        'Communication plan exists',
        'Some training provided'
      ],
      recommendedFrameworks: ['prosci-adkar', 'change-communication-framework']
    },
    {
      level: 3,
      name: 'Defined',
      description: 'Structured change management',
      characteristics: [
        'Formal change methodology',
        'Change impact assessments',
        'Stakeholder engagement plans',
        'Change champions network'
      ],
      recommendedFrameworks: ['kotter-8-step', 'organizational-change-management']
    },
    {
      level: 4,
      name: 'Managed',
      description: 'Proactive change culture',
      characteristics: [
        'Change readiness measured',
        'Continuous improvement mindset',
        'Change success metrics',
        'Lessons learned integrated'
      ],
      recommendedFrameworks: ['agile-change-management', 'continuous-improvement']
    },
    {
      level: 5,
      name: 'Optimized',
      description: 'Change as competitive advantage',
      characteristics: [
        'Change anticipation capabilities',
        'Rapid adaptation culture',
        'Innovation embedded',
        'Change excellence recognized'
      ],
      recommendedFrameworks: ['adaptive-enterprise', 'innovation-management']
    }
  ],
  risk_management: [
    {
      level: 1,
      name: 'Initial',
      description: 'Reactive risk response',
      characteristics: [
        'No formal risk process',
        'Crisis management mode',
        'Limited risk awareness',
        'Risks not documented'
      ],
      recommendedFrameworks: ['risk-register', 'basic-risk-assessment']
    },
    {
      level: 2,
      name: 'Developing',
      description: 'Basic risk awareness',
      characteristics: [
        'Key risks identified',
        'Risk assessment periodic',
        'Some mitigation plans',
        'Risk owners assigned'
      ],
      recommendedFrameworks: ['risk-matrix', 'risk-mitigation-planning']
    },
    {
      level: 3,
      name: 'Defined',
      description: 'Structured risk management',
      characteristics: [
        'Enterprise risk framework',
        'Regular risk assessments',
        'Risk appetite defined',
        'Risk reporting established'
      ],
      recommendedFrameworks: ['coso-erm', 'iso31000']
    },
    {
      level: 4,
      name: 'Managed',
      description: 'Integrated risk management',
      characteristics: [
        'Risk metrics tracked',
        'Risk-adjusted decisions',
        'Three lines of defense',
        'Continuous risk monitoring'
      ],
      recommendedFrameworks: ['integrated-risk-management', 'risk-quantification']
    },
    {
      level: 5,
      name: 'Optimized',
      description: 'Predictive risk intelligence',
      characteristics: [
        'Predictive risk analytics',
        'Real-time risk monitoring',
        'AI-powered risk detection',
        'Risk-aware culture'
      ],
      recommendedFrameworks: ['predictive-risk-analytics', 'ai-risk-management']
    }
  ],
  compliance_readiness: [
    {
      level: 1,
      name: 'Initial',
      description: 'Minimal compliance awareness',
      characteristics: [
        'No compliance framework',
        'Reactive to violations',
        'Limited regulatory knowledge',
        'No compliance tracking'
      ],
      recommendedFrameworks: ['compliance-gap-analysis', 'regulatory-inventory']
    },
    {
      level: 2,
      name: 'Developing',
      description: 'Basic compliance structure',
      characteristics: [
        'Key regulations identified',
        'Compliance officer assigned',
        'Basic controls implemented',
        'Periodic compliance checks'
      ],
      recommendedFrameworks: ['compliance-management-system', 'control-framework']
    },
    {
      level: 3,
      name: 'Defined',
      description: 'Established compliance program',
      characteristics: [
        'Comprehensive compliance framework',
        'Regular compliance audits',
        'Training programs in place',
        'Compliance reporting routine'
      ],
      recommendedFrameworks: ['grc-framework', 'compliance-automation']
    },
    {
      level: 4,
      name: 'Managed',
      description: 'Proactive compliance',
      characteristics: [
        'Continuous compliance monitoring',
        'Compliance metrics tracked',
        'Automated compliance checks',
        'Regulatory change management'
      ],
      recommendedFrameworks: ['continuous-compliance', 'regtech-solutions']
    },
    {
      level: 5,
      name: 'Optimized',
      description: 'Compliance excellence',
      characteristics: [
        'Predictive compliance analytics',
        'Real-time compliance dashboards',
        'Industry compliance leader',
        'Compliance as differentiator'
      ],
      recommendedFrameworks: ['ai-compliance-monitoring', 'compliance-intelligence']
    }
  ]
};

/**
 * Calculate maturity score for a single dimension based on industry and company size
 */
export function calculateDimensionMaturity(
  dimension: string,
  industry?: string,
  companySize?: string,
  selectedFrameworks: string[] = []
): number {
  // Start at base level 1
  let score = 1.0;

  // Apply industry modifiers
  if (industry) {
    const industryModifiers = INDUSTRY_MATURITY_MODIFIERS[industry] || INDUSTRY_MATURITY_MODIFIERS['other'];
    score += industryModifiers[dimension] || 0;
  }

  // Apply company size modifiers
  if (companySize) {
    const sizeModifiers = COMPANY_SIZE_MATURITY_MODIFIERS[companySize] || {};
    score += sizeModifiers[dimension] || 0;
  }

  // Apply framework bonuses (if org has selected frameworks)
  for (const framework of selectedFrameworks) {
    const requirements = FRAMEWORK_REQUIREMENTS[framework];
    if (requirements && requirements[dimension]) {
      // Having a framework gives a small bonus (0.5 level) toward that dimension
      score += 0.5;
    }
  }

  // Clamp between 1 and 5
  return Math.max(1, Math.min(5, score));
}

/**
 * Calculate framework readiness percentage based on current maturity levels
 */
export function calculateFrameworkReadiness(
  framework: string,
  dimensionScores: Record<string, number>
): number {
  const requirements = FRAMEWORK_REQUIREMENTS[framework];
  if (!requirements) return 0;

  let readinessScore = 0;
  let totalWeight = 0;

  for (const [dimension, requiredLevel] of Object.entries(requirements)) {
    const currentLevel = dimensionScores[dimension] || 1;
    const dimWeight = MATURITY_DIMENSIONS.find(d => d.id === dimension)?.weight || 0.1;

    // Calculate readiness as percentage of requirement met
    const dimensionReadiness = Math.min(currentLevel / requiredLevel, 1.0);
    readinessScore += dimensionReadiness * dimWeight;
    totalWeight += dimWeight;
  }

  return totalWeight > 0 ? (readinessScore / totalWeight) * 100 : 0;
}

/**
 * Generate complete maturity profile for an organization
 */
export function generateMaturityProfile(
  organizationId: string,
  industry?: string,
  companySize?: string,
  selectedFrameworks: string[] = []
): OrganizationMaturityProfile {
  // Calculate maturity score for each dimension
  const dimensionScores: Record<string, number> = {};
  for (const dimension of MATURITY_DIMENSIONS) {
    dimensionScores[dimension.id] = calculateDimensionMaturity(
      dimension.id,
      industry,
      companySize,
      selectedFrameworks
    );
  }

  // Calculate overall maturity (weighted average)
  const overallMaturity = MATURITY_DIMENSIONS.reduce(
    (sum, dim) => sum + dimensionScores[dim.id] * dim.weight,
    0
  );

  // Identify strengths (dimensions above overall average)
  const strengths = MATURITY_DIMENSIONS
    .filter(dim => dimensionScores[dim.id] > overallMaturity)
    .map(dim => dim.name);

  // Identify gaps (dimensions below overall average or below level 3)
  const gapsToAddress = MATURITY_DIMENSIONS
    .filter(dim => dimensionScores[dim.id] < Math.max(overallMaturity, 3))
    .map(dim => dim.name);

  // Calculate readiness for all frameworks
  const readinessForFrameworks: Record<string, number> = {};
  for (const framework of Object.keys(FRAMEWORK_REQUIREMENTS)) {
    readinessForFrameworks[framework] = calculateFrameworkReadiness(framework, dimensionScores);
  }

  // Recommended progression (focus on lowest scoring dimensions)
  const sortedDimensions = MATURITY_DIMENSIONS
    .map(dim => ({ name: dim.name, id: dim.id, score: dimensionScores[dim.id] }))
    .sort((a, b) => a.score - b.score);

  const recommendedProgression = sortedDimensions
    .slice(0, 3)
    .map(dim => `Improve ${dim.name} (current level: ${dim.score.toFixed(1)})`);

  return {
    organizationId,
    overallMaturity: Math.round(overallMaturity * 10) / 10,
    dimensionScores,
    strengths,
    gapsToAddress,
    readinessForFrameworks,
    recommendedProgression,
    lastAssessment: new Date()
  };
}

// Pre-generated mock profiles for common scenarios
export const MOCK_MATURITY_PROFILES: Record<string, OrganizationMaturityProfile> = {
  'fintech-startup': generateMaturityProfile('mock-fintech-startup', 'fintech', 'startup', ['agile-methodology']),
  'healthcare-enterprise': generateMaturityProfile('mock-healthcare-enterprise', 'hospitals-health-systems', 'enterprise', ['hipaa', 'iso27001']),
  'tech-medium': generateMaturityProfile('mock-tech-medium', 'software-development', 'medium', ['agile-methodology', 'devops-practices']),
  'banking-large': generateMaturityProfile('mock-banking-large', 'banking-traditional', 'large', ['basel-iv', 'sox-sarbanes-oxley', 'iso27001']),
  'startup-ai': generateMaturityProfile('mock-startup-ai', 'artificial-intelligence', 'startup', ['lean-canvas', 'agile-methodology']),
  'pharma-enterprise': generateMaturityProfile('mock-pharma-enterprise', 'pharmaceutical', 'enterprise', ['iso27001', 'cmmi-dev']),
};

// Helper function to get maturity profile based on organization characteristics
export function getMockMaturityProfile(
  companySize?: string,
  industry?: string,
  selectedFrameworks: string[] = []
): OrganizationMaturityProfile {
  // Try to match a pre-generated profile
  const profileKey = `${industry}-${companySize}`;
  if (MOCK_MATURITY_PROFILES[profileKey]) {
    return MOCK_MATURITY_PROFILES[profileKey];
  }

  // Generate on-the-fly if no match
  return generateMaturityProfile(
    'mock-dynamic',
    industry,
    companySize,
    selectedFrameworks
  );
}

// Helper function to get maturity level details for a dimension
export function getMaturityLevelDetails(
  dimension: string,
  level: number
): MaturityLevel | undefined {
  const levels = MATURITY_LEVELS[dimension];
  return levels?.find(l => l.level === Math.round(level));
}

// Helper function to calculate overall maturity from dimension scores
export function calculateOverallMaturity(
  dimensionScores: Record<string, number>
): number {
  return MATURITY_DIMENSIONS.reduce(
    (sum, dim) => sum + (dimensionScores[dim.id] || 1) * dim.weight,
    0
  );
}
