import { CapabilityMap } from '@/lib/types/capability-map'

/**
 * ISO 9001:2015 Quality Management System Capability Map
 * Grouped by the seven main clauses and quality management principles
 */
export const iso9001CapabilityMap: CapabilityMap = {
  id: 'iso-9001-cm-001',
  name: 'ISO 9001:2015 Quality Management System',
  description: 'Quality management capabilities organized by ISO 9001:2015 structure',
  version: '2015.0.0',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-15T00:00:00Z',
  typeDescriptions: {
    'context': 'Understanding the organization and its context, stakeholders, and QMS scope',
    'leadership': 'Leadership commitment, quality policy, and organizational roles',
    'planning': 'Risk-based thinking, quality objectives, and planning changes',
    'support': 'Resources, competence, awareness, communication, and documentation',
    'operation': 'Operational planning, product/service requirements, design, and delivery',
    'performance': 'Monitoring, measurement, analysis, evaluation, and internal audit',
    'improvement': 'Nonconformity management, corrective action, and continual improvement',
  },
  customTypeConfig: {
    'context': {
      label: 'Context of Organization',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      headerBg: 'bg-purple-100',
      textColor: 'text-purple-900',
    },
    'leadership': {
      label: 'Leadership',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      headerBg: 'bg-blue-100',
      textColor: 'text-blue-900',
    },
    'planning': {
      label: 'Planning',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      headerBg: 'bg-cyan-100',
      textColor: 'text-cyan-900',
    },
    'support': {
      label: 'Support',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      headerBg: 'bg-green-100',
      textColor: 'text-green-900',
    },
    'operation': {
      label: 'Operation',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      headerBg: 'bg-yellow-100',
      textColor: 'text-yellow-900',
    },
    'performance': {
      label: 'Performance Evaluation',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      headerBg: 'bg-orange-100',
      textColor: 'text-orange-900',
    },
    'improvement': {
      label: 'Improvement',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      headerBg: 'bg-red-100',
      textColor: 'text-red-900',
    },
  },
  capabilities: [
    // =========================================================================
    // LEVEL 1: Context of Organization
    // =========================================================================
    {
      id: 'iso9001-context-001',
      name: 'Understanding the Organization',
      description: 'Determine external and internal issues relevant to QMS',
      level: 1,
      type: 'context',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Quality Manager',
      },
    },
    {
      id: 'iso9001-context-002',
      name: 'Understanding Stakeholder Needs',
      description: 'Identify stakeholders and their requirements for QMS',
      level: 1,
      type: 'context',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Quality Manager',
      },
    },
    {
      id: 'iso9001-context-003',
      name: 'Determining QMS Scope',
      description: 'Define boundaries and applicability of the QMS',
      level: 1,
      type: 'context',
      metrics: {
        maturity: 5,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Quality Manager',
      },
    },
    {
      id: 'iso9001-context-004',
      name: 'QMS and Processes',
      description: 'Establish, implement, and maintain QMS processes',
      level: 1,
      type: 'context',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Quality Manager',
      },
    },

    // =========================================================================
    // LEVEL 1: Leadership
    // =========================================================================
    {
      id: 'iso9001-leadership-001',
      name: 'Leadership and Commitment',
      description: 'Top management commitment to QMS effectiveness',
      level: 1,
      type: 'leadership',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'CEO',
      },
    },
    {
      id: 'iso9001-leadership-002',
      name: 'Quality Policy',
      description: 'Establish, implement, and maintain quality policy',
      level: 1,
      type: 'leadership',
      metrics: {
        maturity: 5,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'CEO',
      },
    },
    {
      id: 'iso9001-leadership-003',
      name: 'Organizational Roles and Responsibilities',
      description: 'Assign responsibilities and authorities for QMS',
      level: 1,
      type: 'leadership',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Quality Manager',
      },
    },

    // =========================================================================
    // LEVEL 1: Planning
    // =========================================================================
    {
      id: 'iso9001-planning-001',
      name: 'Risk and Opportunity Management',
      description: 'Address risks and opportunities affecting QMS',
      level: 1,
      type: 'planning',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Quality Manager',
      },
    },
    {
      id: 'iso9001-planning-002',
      name: 'Quality Objectives',
      description: 'Establish quality objectives and planning to achieve them',
      level: 1,
      type: 'planning',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Quality Manager',
      },
    },
    {
      id: 'iso9001-planning-003',
      name: 'Planning of Changes',
      description: 'Plan and control changes to the QMS',
      level: 1,
      type: 'planning',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Change Manager',
      },
    },

    // =========================================================================
    // LEVEL 1: Support
    // =========================================================================
    {
      id: 'iso9001-support-001',
      name: 'Resources',
      description: 'Provide resources needed for QMS establishment and maintenance',
      level: 1,
      type: 'support',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Operations Manager',
      },
    },
    {
      id: 'iso9001-support-002',
      name: 'Competence',
      description: 'Determine and ensure competence of personnel',
      level: 1,
      type: 'support',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'HR Manager',
      },
    },
    {
      id: 'iso9001-support-003',
      name: 'Awareness',
      description: 'Ensure personnel awareness of quality policy and objectives',
      level: 1,
      type: 'support',
      metrics: {
        maturity: 3,
        strategicImportance: 'medium',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'HR Manager',
      },
    },
    {
      id: 'iso9001-support-004',
      name: 'Communication',
      description: 'Determine internal and external communications for QMS',
      level: 1,
      type: 'support',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Communications Manager',
      },
    },
    {
      id: 'iso9001-support-005',
      name: 'Documented Information',
      description: 'Create, update, and control QMS documented information',
      level: 1,
      type: 'support',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Quality Manager',
      },
    },

    // =========================================================================
    // LEVEL 1: Operation
    // =========================================================================
    {
      id: 'iso9001-operation-001',
      name: 'Operational Planning and Control',
      description: 'Plan, implement, and control processes for product/service provision',
      level: 1,
      type: 'operation',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Operations Manager',
      },
    },
    {
      id: 'iso9001-operation-002',
      name: 'Requirements for Products and Services',
      description: 'Determine, review, and control customer requirements',
      level: 1,
      type: 'operation',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Sales Manager',
      },
    },
    {
      id: 'iso9001-operation-003',
      name: 'Design and Development',
      description: 'Plan and control design and development of products/services',
      level: 1,
      type: 'operation',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'R&D Manager',
      },
    },
    {
      id: 'iso9001-operation-004',
      name: 'Control of External Providers',
      description: 'Ensure externally provided products/services conform to requirements',
      level: 1,
      type: 'operation',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Procurement Manager',
      },
    },
    {
      id: 'iso9001-operation-005',
      name: 'Production and Service Provision',
      description: 'Control production and service delivery processes',
      level: 1,
      type: 'operation',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Operations Manager',
      },
    },
    {
      id: 'iso9001-operation-006',
      name: 'Release of Products and Services',
      description: 'Verify product/service conformity before release',
      level: 1,
      type: 'operation',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Quality Manager',
      },
    },
    {
      id: 'iso9001-operation-007',
      name: 'Control of Nonconforming Outputs',
      description: 'Identify and control nonconforming products/services',
      level: 1,
      type: 'operation',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Quality Manager',
      },
    },

    // =========================================================================
    // LEVEL 1: Performance Evaluation
    // =========================================================================
    {
      id: 'iso9001-performance-001',
      name: 'Monitoring, Measurement, Analysis',
      description: 'Determine what to monitor, measure, analyze, and evaluate',
      level: 1,
      type: 'performance',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Quality Manager',
      },
    },
    {
      id: 'iso9001-performance-002',
      name: 'Customer Satisfaction',
      description: 'Monitor customer perceptions and satisfaction',
      level: 1,
      type: 'performance',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Customer Service Manager',
      },
    },
    {
      id: 'iso9001-performance-003',
      name: 'Internal Audit',
      description: 'Conduct internal audits to ensure QMS effectiveness',
      level: 1,
      type: 'performance',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Internal Auditor',
      },
    },
    {
      id: 'iso9001-performance-004',
      name: 'Management Review',
      description: 'Review QMS at planned intervals for suitability and effectiveness',
      level: 1,
      type: 'performance',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'CEO',
      },
    },

    // =========================================================================
    // LEVEL 1: Improvement
    // =========================================================================
    {
      id: 'iso9001-improvement-001',
      name: 'Nonconformity and Corrective Action',
      description: 'React to nonconformities and take corrective actions',
      level: 1,
      type: 'improvement',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Quality Manager',
      },
    },
    {
      id: 'iso9001-improvement-002',
      name: 'Continual Improvement',
      description: 'Continually improve suitability, adequacy, and effectiveness of QMS',
      level: 1,
      type: 'improvement',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Quality Manager',
      },
    },
  ],
}
