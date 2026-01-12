import { CapabilityMap } from '@/lib/types/capability-map'

/**
 * COBIT 2019 Capability Map
 * Grouped by COBIT 2019 domains (EDM, APO, BAI, DSS, MEA)
 */
export const cobit2019CapabilityMap: CapabilityMap = {
  id: 'cobit-2019-cm-001',
  name: 'COBIT 2019 IT Governance Framework',
  description: 'IT governance and management capabilities organized by COBIT 2019 domains',
  version: '1.0.0',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-15T00:00:00Z',
  typeDescriptions: {
    'edm': 'Evaluate, Direct and Monitor - Governance objectives for board and executives',
    'apo': 'Align, Plan and Organize - Strategic alignment and planning',
    'bai': 'Build, Acquire and Implement - Solution delivery and change management',
    'dss': 'Deliver, Service and Support - Service operations and support',
    'mea': 'Monitor, Evaluate and Assess - Performance monitoring and compliance',
  },
  customTypeConfig: {
    'edm': {
      label: 'EDM (Evaluate, Direct, Monitor)',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      headerBg: 'bg-purple-100',
      textColor: 'text-purple-900',
    },
    'apo': {
      label: 'APO (Align, Plan, Organize)',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      headerBg: 'bg-blue-100',
      textColor: 'text-blue-900',
    },
    'bai': {
      label: 'BAI (Build, Acquire, Implement)',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      headerBg: 'bg-green-100',
      textColor: 'text-green-900',
    },
    'dss': {
      label: 'DSS (Deliver, Service, Support)',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      headerBg: 'bg-orange-100',
      textColor: 'text-orange-900',
    },
    'mea': {
      label: 'MEA (Monitor, Evaluate, Assess)',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      headerBg: 'bg-cyan-100',
      textColor: 'text-cyan-900',
    },
  },
  capabilities: [
    // =========================================================================
    // LEVEL 0: COBIT 2019 Governance and Management Objectives
    // =========================================================================

    // =========================================================================
    // LEVEL 1: Governance System Components
    // =========================================================================
    {
      id: 'cobit-gs-001',
      name: 'Governance Framework',
      description: 'Principles, policies, and framework components',
      level: 0, type: 'edm',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Governance Framework Lead',
      },
    },
    {
      id: 'cobit-gs-002',
      name: 'Processes & Practices',
      description: 'Governance and management processes',
      level: 0, type: 'edm',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Process Manager',
      },
    },
    {
      id: 'cobit-gs-003',
      name: 'Organizational Structures',
      description: 'Key decision-making entities and organizational structures',
      level: 0, type: 'edm',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Organizational Design Lead',
      },
    },
    {
      id: 'cobit-gs-004',
      name: 'Culture, Ethics & Behavior',
      description: 'Organizational culture supporting governance',
      level: 0, type: 'edm',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Culture & Ethics Officer',
      },
    },
    {
      id: 'cobit-gs-005',
      name: 'Information',
      description: 'Information for decision-making and reporting',
      level: 0, type: 'edm',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Information Manager',
      },
    },
    // =========================================================================
    // LEVEL 2: Governance Framework Details
    // =========================================================================
    {
      id: 'cobit-gs-001-1',
      name: 'Governance Principles',
      description: 'Six COBIT governance principles',
      level: 1,
      type: 'edm',
      parentId: 'cobit-gs-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Governance Lead',
      },
    },
    {
      id: 'cobit-gs-001-2',
      name: 'Policy Framework',
      description: 'IT governance policies and standards',
      level: 1,
      type: 'edm',
      parentId: 'cobit-gs-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Policy Manager',
      },
    },
    // =========================================================================
    // EDM Domain Objectives
    // =========================================================================
    // LEVEL 2: EDM Objectives Details
    // =========================================================================
    {
      id: 'cobit-edm-01',
      name: 'EDM01: Ensure Governance Framework Setting',
      description: 'Establish and maintain governance framework',
      level: 0,
      type: 'apo',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Governance Lead',
      },
    },
    {
      id: 'cobit-edm-02',
      name: 'EDM02: Ensure Benefits Delivery',
      description: 'Optimize value creation from IT investments',
      level: 0,
      type: 'edm',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Value Manager',
      },
    },
    {
      id: 'cobit-edm-03',
      name: 'EDM03: Ensure Risk Optimization',
      description: 'Risk appetite and tolerance established',
      level: 0,
      type: 'edm',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Risk Manager',
      },
    },
    {
      id: 'cobit-edm-04',
      name: 'EDM04: Ensure Resource Optimization',
      description: 'Resource capabilities adequately and effectively deployed',
      level: 0,
      type: 'edm',
      metrics: {
        maturity: 2,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Resource Manager',
      },
    },
    {
      id: 'cobit-edm-05',
      name: 'EDM05: Ensure Stakeholder Engagement',
      description: 'Stakeholder needs and expectations understood',
      level: 0,
      type: 'edm',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Stakeholder Manager',
      },
    },
    // =========================================================================
    // LEVEL 2: APO Objectives (Selected)
    // =========================================================================
    {
      id: 'cobit-apo-01',
      name: 'APO01: Manage IT Management Framework',
      description: 'IT management framework for governance execution',
      level: 0,
      type: 'apo',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'IT Management Lead',
      },
    },
    {
      id: 'cobit-apo-02',
      name: 'APO02: Manage Strategy',
      description: 'IT strategy aligned with enterprise strategy',
      level: 0,
      type: 'apo',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Strategy Manager',
      },
    },
    {
      id: 'cobit-apo-08',
      name: 'APO08: Manage Relationships',
      description: 'Business and IT relationship management',
      level: 0,
      type: 'apo',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Relationship Manager',
      },
    },
    {
      id: 'cobit-apo-12',
      name: 'APO12: Manage Risk',
      description: 'Identification, assessment and reduction of IT risk',
      level: 0,
      type: 'apo',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'IT Risk Manager',
      },
    },
    {
      id: 'cobit-apo-13',
      name: 'APO13: Manage Security',
      description: 'Definition and maintenance of information security',
      level: 0,
      type: 'apo',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Security Manager',
      },
    },
    // =========================================================================
    // LEVEL 3: APO01 Process Components
    // =========================================================================
    {
      id: 'cobit-apo-01-01',
      name: 'Define Management Framework',
      description: 'Document and communicate IT management framework',
      level: 2,
      type: 'apo',
      parentId: 'cobit-apo-01',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Framework Manager',
      },
    },
    {
      id: 'cobit-apo-01-02',
      name: 'Establish Organizational Structure',
      description: 'Define IT organizational structure and decision rights',
      level: 2,
      type: 'apo',
      parentId: 'cobit-apo-01',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Organization Design Lead',
      },
    },
    // =========================================================================
    // LEVEL 1: Design Factors
    // =========================================================================
    {
      id: 'cobit-df-001',
      name: 'Enterprise Strategy',
      description: 'Strategic goals, objectives and value drivers',
      level: 1,
      type: 'edm',
      parentId: 'cobit-design-factors',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Strategy Lead',
      },
    },
    {
      id: 'cobit-df-002',
      name: 'Enterprise Goals',
      description: 'Specific, measurable enterprise goals',
      level: 0, type: 'apo',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Goals Manager',
      },
    },
    {
      id: 'cobit-df-003',
      name: 'Risk Profile',
      description: 'Enterprise risk appetite and profile',
      level: 0, type: 'apo',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Enterprise Risk Manager',
      },
    },
    {
      id: 'cobit-df-004',
      name: 'Compliance Requirements',
      description: 'Legal, regulatory and contractual compliance',
      level: 0, type: 'apo',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Compliance Officer',
      },
    },
    {
      id: 'cobit-df-005',
      name: 'Technology Landscape',
      description: 'Current and emerging technology environment',
      level: 0, type: 'apo',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Technology Strategist',
      },
    },
    // =========================================================================
    // LEVEL 1: Performance Management
    // =========================================================================
    {
      id: 'cobit-perf-001',
      name: 'Goals Cascade',
      description: 'Cascade from enterprise goals to IT goals',
      level: 0, type: 'mea',
      metrics: {
        maturity: 2,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Performance Lead',
      },
    },
    {
      id: 'cobit-perf-002',
      name: 'Metrics & Measurement',
      description: 'Define and collect performance metrics',
      level: 0, type: 'mea',
      metrics: {
        maturity: 2,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Metrics Manager',
      },
    },
    {
      id: 'cobit-perf-003',
      name: 'Maturity Assessment',
      description: 'Assess capability maturity levels',
      level: 0, type: 'mea',
      metrics: {
        maturity: 2,
        strategicImportance: 'medium',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Maturity Assessor',
      },
    },
    {
      id: 'cobit-perf-004',
      name: 'Performance Dashboards',
      description: 'Visualize and communicate performance',
      level: 0, type: 'mea',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Dashboard Manager',
      },
    },
    // =========================================================================
    // LEVEL 2: Metrics Details
    // =========================================================================
    {
      id: 'cobit-perf-002-1',
      name: 'Key Performance Indicators (KPIs)',
      description: 'Lag indicators of goal achievement',
      level: 1,
      type: 'mea',
      parentId: 'cobit-perf-002',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'KPI Manager',
      },
    },
    {
      id: 'cobit-perf-002-2',
      name: 'Key Goal Indicators (KGIs)',
      description: 'Lead indicators of goal progress',
      level: 1,
      type: 'mea',
      parentId: 'cobit-perf-002',
      metrics: {
        maturity: 2,
        strategicImportance: 'medium',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'KGI Manager',
      },
    },
  ],
}






