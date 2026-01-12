import { CapabilityMap } from '@/lib/types/capability-map'

/**
 * FEAF (Federal Enterprise Architecture Framework) Capability Map
 * Grouped by the five reference models
 */
export const feafCapabilityMap: CapabilityMap = {
  id: 'feaf-cm-001',
  name: 'Federal Enterprise Architecture Framework (FEAF)',
  description: 'Enterprise architecture capabilities organized by FEAF reference models',
  version: '2.0.0',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-15T00:00:00Z',
  typeDescriptions: {
    'prm': 'Performance Reference Model - Outcomes and measures for agency performance',
    'brm': 'Business Reference Model - Business functions and services',
    'srm': 'Service Component Reference Model - Service components supporting business',
    'drm': 'Data Reference Model - Data and information exchange standards',
    'trm': 'Technical Reference Model - Technologies, standards, and specifications',
  },
  customTypeConfig: {
    'prm': {
      label: 'Performance Reference Model',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      headerBg: 'bg-purple-100',
      textColor: 'text-purple-900',
    },
    'brm': {
      label: 'Business Reference Model',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      headerBg: 'bg-blue-100',
      textColor: 'text-blue-900',
    },
    'srm': {
      label: 'Service Component Reference Model',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      headerBg: 'bg-green-100',
      textColor: 'text-green-900',
    },
    'drm': {
      label: 'Data Reference Model',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      headerBg: 'bg-yellow-100',
      textColor: 'text-yellow-900',
    },
    'trm': {
      label: 'Technical Reference Model',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      headerBg: 'bg-orange-100',
      textColor: 'text-orange-900',
    },
  },
  capabilities: [
    // =========================================================================
    // LEVEL 1: Performance Reference Model (PRM)
    // =========================================================================
    {
      id: 'feaf-prm-001',
      name: 'Mission and Strategic Outcomes',
      description: 'Define mission objectives and strategic outcomes for the agency',
      level: 1,
      type: 'prm',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Chief Strategy Officer',
      },
    },
    {
      id: 'feaf-prm-002',
      name: 'Customer Results',
      description: 'Measure and improve outcomes for citizens and stakeholders',
      level: 1,
      type: 'prm',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Customer Experience Officer',
      },
    },
    {
      id: 'feaf-prm-003',
      name: 'Processes and Activities',
      description: 'Optimize processes and activities supporting mission delivery',
      level: 1,
      type: 'prm',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Chief Process Officer',
      },
    },
    {
      id: 'feaf-prm-004',
      name: 'Technology and Infrastructure',
      description: 'Manage technology infrastructure supporting mission capabilities',
      level: 1,
      type: 'prm',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Chief Technology Officer',
      },
    },
    {
      id: 'feaf-prm-005',
      name: 'Human Capital',
      description: 'Develop workforce capabilities and competencies',
      level: 1,
      type: 'prm',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Chief Human Capital Officer',
      },
    },

    // =========================================================================
    // LEVEL 1: Business Reference Model (BRM)
    // =========================================================================
    {
      id: 'feaf-brm-001',
      name: 'Services for Citizens',
      description: 'Deliver services directly to citizens and external stakeholders',
      level: 1,
      type: 'brm',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Service Delivery Manager',
      },
    },
    {
      id: 'feaf-brm-002',
      name: 'Support Delivery of Services',
      description: 'Provide foundational support for service delivery operations',
      level: 1,
      type: 'brm',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'medium',
        owner: 'Operations Manager',
      },
    },
    {
      id: 'feaf-brm-003',
      name: 'Manage Government Resources',
      description: 'Manage financial, human, and physical resources',
      level: 1,
      type: 'brm',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Resource Manager',
      },
    },
    {
      id: 'feaf-brm-004',
      name: 'Manage Government Knowledge',
      description: 'Capture, organize, and disseminate organizational knowledge',
      level: 1,
      type: 'brm',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Chief Knowledge Officer',
      },
    },

    // =========================================================================
    // LEVEL 1: Service Component Reference Model (SRM)
    // =========================================================================
    {
      id: 'feaf-srm-001',
      name: 'Customer Services',
      description: 'Service components supporting customer interactions',
      level: 1,
      type: 'srm',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Service Component Manager',
      },
    },
    {
      id: 'feaf-srm-002',
      name: 'Process Automation Services',
      description: 'Automate and streamline business processes',
      level: 1,
      type: 'srm',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Automation Manager',
      },
    },
    {
      id: 'feaf-srm-003',
      name: 'Digital Asset Services',
      description: 'Manage digital assets and content lifecycle',
      level: 1,
      type: 'srm',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Digital Asset Manager',
      },
    },
    {
      id: 'feaf-srm-004',
      name: 'Business Management Services',
      description: 'Support business operations and decision-making',
      level: 1,
      type: 'srm',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'medium',
        owner: 'Business Manager',
      },
    },
    {
      id: 'feaf-srm-005',
      name: 'Back Office Services',
      description: 'Administrative and support service components',
      level: 1,
      type: 'srm',
      metrics: {
        maturity: 4,
        strategicImportance: 'medium',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Operations Manager',
      },
    },

    // =========================================================================
    // LEVEL 1: Data Reference Model (DRM)
    // =========================================================================
    {
      id: 'feaf-drm-001',
      name: 'Data Context',
      description: 'Define data architecture, governance, and standards',
      level: 1,
      type: 'drm',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Chief Data Officer',
      },
    },
    {
      id: 'feaf-drm-002',
      name: 'Data Description',
      description: 'Document data structures, metadata, and semantics',
      level: 1,
      type: 'drm',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Data Architect',
      },
    },
    {
      id: 'feaf-drm-003',
      name: 'Data Sharing',
      description: 'Enable secure data exchange across organizational boundaries',
      level: 1,
      type: 'drm',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Data Integration Manager',
      },
    },
    {
      id: 'feaf-drm-004',
      name: 'Data Quality',
      description: 'Ensure accuracy, completeness, and consistency of data',
      level: 1,
      type: 'drm',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Data Quality Manager',
      },
    },

    // =========================================================================
    // LEVEL 1: Technical Reference Model (TRM)
    // =========================================================================
    {
      id: 'feaf-trm-001',
      name: 'Service Access and Delivery',
      description: 'Technologies for service access channels and delivery',
      level: 1,
      type: 'trm',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Infrastructure Manager',
      },
    },
    {
      id: 'feaf-trm-002',
      name: 'Service Platform and Infrastructure',
      description: 'Platform services, middleware, and infrastructure',
      level: 1,
      type: 'trm',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Platform Manager',
      },
    },
    {
      id: 'feaf-trm-003',
      name: 'Component Framework',
      description: 'Reusable software components and frameworks',
      level: 1,
      type: 'trm',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Architecture Manager',
      },
    },
    {
      id: 'feaf-trm-004',
      name: 'Service Interface and Integration',
      description: 'APIs, integration patterns, and interoperability',
      level: 1,
      type: 'trm',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Integration Architect',
      },
    },
    {
      id: 'feaf-trm-005',
      name: 'Data Management',
      description: 'Database systems, data warehousing, and analytics',
      level: 1,
      type: 'trm',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Data Platform Manager',
      },
    },
    {
      id: 'feaf-trm-006',
      name: 'Security',
      description: 'Security technologies, controls, and standards',
      level: 1,
      type: 'trm',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Chief Information Security Officer',
      },
    },
  ],
}
