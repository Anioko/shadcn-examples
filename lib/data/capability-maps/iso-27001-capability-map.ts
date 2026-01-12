import { CapabilityMap } from '@/lib/types/capability-map'

/**
 * ISO 27001:2022 Capability Map
 * Grouped by ISO/IEC 27001:2022 clauses and control groups
 */
export const iso27001CapabilityMap: CapabilityMap = {
  id: 'iso-27001-cm-001',
  name: 'ISO/IEC 27001:2022 Information Security Management',
  description: 'Information Security Management System capabilities organized by ISO 27001 structure',
  version: '1.0.0',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-15T00:00:00Z',
  typeDescriptions: {
    'context': 'Understanding organization, interested parties, and ISMS scope (Clause 4)',
    'leadership': 'Leadership commitment, policy, and organizational roles (Clause 5)',
    'planning': 'Risk assessment, treatment, and objectives (Clause 6)',
    'support': 'Resources, competence, awareness, communication (Clause 7)',
    'operation': 'Operational planning, risk assessment and treatment (Clause 8)',
    'performance': 'Monitoring, measurement, analysis, audit, review (Clause 9)',
    'improvement': 'Nonconformity, corrective action, continual improvement (Clause 10)',
    'controls': 'Annex A security controls (organizational, people, physical, technological)',
  },
  customTypeConfig: {
    'context': {
      label: 'Context (Clause 4)',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      headerBg: 'bg-purple-100',
      textColor: 'text-purple-900',
    },
    'leadership': {
      label: 'Leadership (Clause 5)',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      headerBg: 'bg-blue-100',
      textColor: 'text-blue-900',
    },
    'planning': {
      label: 'Planning (Clause 6)',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      headerBg: 'bg-green-100',
      textColor: 'text-green-900',
    },
    'support': {
      label: 'Support (Clause 7)',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      headerBg: 'bg-yellow-100',
      textColor: 'text-yellow-900',
    },
    'operation': {
      label: 'Operation (Clause 8)',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      headerBg: 'bg-orange-100',
      textColor: 'text-orange-900',
    },
    'performance': {
      label: 'Performance (Clause 9)',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      headerBg: 'bg-cyan-100',
      textColor: 'text-cyan-900',
    },
    'improvement': {
      label: 'Improvement (Clause 10)',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      headerBg: 'bg-teal-100',
      textColor: 'text-teal-900',
    },
    'controls': {
      label: 'Controls (Annex A)',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      headerBg: 'bg-red-100',
      textColor: 'text-red-900',
    },
  },
  capabilities: [
    // =========================================================================
    // LEVEL 0: Main ISO 27001 Clauses (as specified by user)
    // =========================================================================
    {
      id: 'iso27001-context',
      name: 'Context of Organization',
      description: 'Understanding the organization and its context, interested parties, and ISMS scope',
      level: 0,
      type: 'context',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'CISO',
      },
    },
    {
      id: 'iso27001-leadership',
      name: 'Leadership',
      description: 'Leadership and commitment, information security policy, roles and responsibilities',
      level: 0,
      type: 'leadership',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'CISO',
      },
    },
    {
      id: 'iso27001-planning',
      name: 'Planning',
      description: 'Risk assessment, risk treatment, information security objectives and planning',
      level: 0,
      type: 'planning',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Risk Manager',
      },
    },
    {
      id: 'iso27001-support',
      name: 'Support',
      description: 'Resources, competence, awareness, communication, and documented information',
      level: 0,
      type: 'support',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'HR Director',
      },
    },
    {
      id: 'iso27001-operation',
      name: 'Operation',
      description: 'Operational planning and control, information security risk assessment and treatment',
      level: 0,
      type: 'operation',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Security Operations Manager',
      },
    },
    {
      id: 'iso27001-performance',
      name: 'Performance Evaluation',
      description: 'Monitoring, measurement, analysis, evaluation, internal audit, and management review',
      level: 0,
      type: 'performance',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Quality Manager',
      },
    },
    {
      id: 'iso27001-improvement',
      name: 'Improvement',
      description: 'Nonconformity and corrective action, continual improvement',
      level: 0,
      type: 'improvement',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Process Improvement Lead',
      },
    },
    {
      id: 'iso27001-org-controls',
      name: 'Organizational Controls',
      description: 'Annex A organizational security controls (37 controls)',
      level: 0,
      type: 'controls',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Security Governance Lead',
      },
    },
    {
      id: 'iso27001-people-controls',
      name: 'People Controls',
      description: 'Annex A people security controls (8 controls)',
      level: 0,
      type: 'controls',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'HR Security Lead',
      },
    },
    {
      id: 'iso27001-physical-controls',
      name: 'Physical Controls',
      description: 'Annex A physical security controls (14 controls)',
      level: 0,
      type: 'controls',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Facilities Manager',
      },
    },
    {
      id: 'iso27001-tech-controls',
      name: 'Technological Controls',
      description: 'Annex A technological security controls (34 controls)',
      level: 0,
      type: 'controls',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'IT Security Manager',
      },
    },

    // =========================================================================
    // LEVEL 1: Context of Organization Sub-capabilities
    // =========================================================================
    {
      id: 'iso27001-context-001',
      name: 'Understanding Organization & Context',
      description: 'Internal and external issues relevant to ISMS',
      level: 1,
      type: 'context',
      parentId: 'iso27001-context',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Enterprise Architect',
      },
    },
    {
      id: 'iso27001-context-002',
      name: 'Understanding Interested Parties',
      description: 'Identify and understand stakeholder needs and expectations',
      level: 1,
      type: 'context',
      parentId: 'iso27001-context',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Stakeholder Relations Manager',
      },
    },
    {
      id: 'iso27001-context-003',
      name: 'ISMS Scope Determination',
      description: 'Define boundaries and applicability of ISMS',
      level: 1,
      type: 'context',
      parentId: 'iso27001-context',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'CISO',
      },
    },

    // =========================================================================
    // LEVEL 2: Understanding Organization - Detailed Capabilities
    // =========================================================================
    {
      id: 'iso27001-context-001-1',
      name: 'Internal Issues Analysis',
      description: 'Analyze internal factors affecting ISMS',
      level: 2,
      type: 'context',
      parentId: 'iso27001-context-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Business Analyst',
      },
    },
    {
      id: 'iso27001-context-001-2',
      name: 'External Issues Analysis',
      description: 'Analyze external factors including regulatory, market, and threat landscape',
      level: 2,
      type: 'context',
      parentId: 'iso27001-context-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Threat Intelligence Analyst',
      },
    },

    // =========================================================================
    // LEVEL 1: Leadership Sub-capabilities
    // =========================================================================
    {
      id: 'iso27001-leadership-001',
      name: 'Leadership & Commitment',
      description: 'Top management demonstration of leadership and commitment to ISMS',
      level: 1,
      type: 'context',
      parentId: 'iso27001-leadership',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'CEO',
      },
    },
    {
      id: 'iso27001-leadership-002',
      name: 'Information Security Policy',
      description: 'Establish and maintain information security policy',
      level: 1,
      type: 'leadership',
      parentId: 'iso27001-leadership',
      metrics: {
        maturity: 5,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'CISO',
      },
    },
    {
      id: 'iso27001-leadership-003',
      name: 'Organizational Roles & Responsibilities',
      description: 'Assign responsibilities and authorities for information security',
      level: 1,
      type: 'leadership',
      parentId: 'iso27001-leadership',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'CISO',
      },
    },

    // =========================================================================
    // LEVEL 1: Planning Sub-capabilities
    // =========================================================================
    {
      id: 'iso27001-planning-001',
      name: 'Risk Assessment Process',
      description: 'Systematic process to identify and assess information security risks',
      level: 1,
      type: 'leadership',
      parentId: 'iso27001-planning',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Risk Manager',
      },
    },
    {
      id: 'iso27001-planning-002',
      name: 'Risk Treatment Process',
      description: 'Select and implement appropriate risk treatment options',
      level: 1,
      type: 'planning',
      parentId: 'iso27001-planning',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Risk Manager',
      },
    },
    {
      id: 'iso27001-planning-003',
      name: 'Information Security Objectives',
      description: 'Establish measurable information security objectives',
      level: 1,
      type: 'planning',
      parentId: 'iso27001-planning',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'CISO',
      },
    },

    // =========================================================================
    // LEVEL 2: Risk Assessment - Detailed Capabilities
    // =========================================================================
    {
      id: 'iso27001-planning-001-1',
      name: 'Asset Identification',
      description: 'Identify and classify information assets',
      level: 2,
      type: 'planning',
      parentId: 'iso27001-planning-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Asset Manager',
      },
    },
    {
      id: 'iso27001-planning-001-2',
      name: 'Threat & Vulnerability Assessment',
      description: 'Identify threats and vulnerabilities to information assets',
      level: 2,
      type: 'planning',
      parentId: 'iso27001-planning-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Vulnerability Manager',
      },
    },
    {
      id: 'iso27001-planning-001-3',
      name: 'Risk Analysis & Evaluation',
      description: 'Analyze and evaluate information security risks',
      level: 2,
      type: 'planning',
      parentId: 'iso27001-planning-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Risk Analyst',
      },
    },

    // =========================================================================
    // LEVEL 3: Asset Identification - Implementation Capabilities
    // =========================================================================
    {
      id: 'iso27001-planning-001-1-1',
      name: 'Information Asset Register',
      description: 'Maintain comprehensive register of information assets',
      level: 3,
      type: 'planning',
      parentId: 'iso27001-planning-001-1',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Asset Custodian',
      },
    },
    {
      id: 'iso27001-planning-001-1-2',
      name: 'Asset Classification Scheme',
      description: 'Define and apply asset classification levels',
      level: 3,
      type: 'strategic',
      parentId: 'iso27001-planning-001-1',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'low',
        owner: 'Information Classification Officer',
      },
    },

    // =========================================================================
    // LEVEL 1: Technological Controls Sub-capabilities
    // =========================================================================
    {
      id: 'iso27001-tech-001',
      name: 'User Endpoint Security',
      description: 'Security of information on user endpoint devices',
      level: 1,
      type: 'controls',
      parentId: 'iso27001-tech-controls',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Endpoint Security Manager',
      },
    },
    {
      id: 'iso27001-tech-002',
      name: 'Access Control',
      description: 'Control access to information and information processing facilities',
      level: 1,
      type: 'controls',
      parentId: 'iso27001-tech-controls',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Identity & Access Manager',
      },
    },
    {
      id: 'iso27001-tech-003',
      name: 'Cryptographic Controls',
      description: 'Use of cryptography for information protection',
      level: 1,
      type: 'controls',
      parentId: 'iso27001-tech-controls',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Cryptography Officer',
      },
    },
    {
      id: 'iso27001-tech-004',
      name: 'Network Security',
      description: 'Security of networks and network services',
      level: 1,
      type: 'controls',
      parentId: 'iso27001-tech-controls',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Network Security Manager',
      },
    },
    {
      id: 'iso27001-tech-005',
      name: 'Security Monitoring & Logging',
      description: 'Event logging and monitoring for security',
      level: 1,
      type: 'controls',
      parentId: 'iso27001-tech-controls',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'SOC Manager',
      },
    },

    // =========================================================================
    // LEVEL 2: Access Control - Detailed Capabilities
    // =========================================================================
    {
      id: 'iso27001-tech-002-1',
      name: 'Identity Management',
      description: 'Manage user identities and authentication',
      level: 2,
      type: 'supporting',
      parentId: 'iso27001-tech-002',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'IAM Engineer',
      },
    },
    {
      id: 'iso27001-tech-002-2',
      name: 'Privileged Access Management',
      description: 'Control and monitor privileged access',
      level: 2,
      type: 'controls',
      parentId: 'iso27001-tech-002',
      metrics: {
        maturity: 2,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'PAM Administrator',
      },
    },
    {
      id: 'iso27001-tech-002-3',
      name: 'Access Rights Review',
      description: 'Regular review and adjustment of access rights',
      level: 2,
      type: 'controls',
      parentId: 'iso27001-tech-002',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Access Reviewer',
      },
    },

    // =========================================================================
    // LEVEL 3: Identity Management - Implementation Capabilities
    // =========================================================================
    {
      id: 'iso27001-tech-002-1-1',
      name: 'Multi-Factor Authentication',
      description: 'Implement MFA for enhanced authentication',
      level: 3,
      type: 'controls',
      parentId: 'iso27001-tech-002-1',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Authentication Engineer',
      },
    },
    {
      id: 'iso27001-tech-002-1-2',
      name: 'Single Sign-On',
      description: 'Centralized authentication for multiple systems',
      level: 3,
      type: 'supporting',
      parentId: 'iso27001-tech-002-1',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'SSO Engineer',
      },
    },

    // =========================================================================
    // LEVEL 4: MFA - Specific Implementation
    // =========================================================================
    {
      id: 'iso27001-tech-002-1-1-1',
      name: 'Biometric Authentication',
      description: 'Fingerprint and facial recognition systems',
      level: 4,
      type: 'supporting',
      parentId: 'iso27001-tech-002-1-1',
      metrics: {
        maturity: 2,
        strategicImportance: 'medium',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Biometric Systems Admin',
      },
    },
    {
      id: 'iso27001-tech-002-1-1-2',
      name: 'Hardware Token Management',
      description: 'Physical security token provisioning and lifecycle',
      level: 4,
      type: 'supporting',
      parentId: 'iso27001-tech-002-1-1',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Token Administrator',
      },
    },

    // =========================================================================
    // LEVEL 1: Organizational Controls Sub-capabilities
    // =========================================================================
    {
      id: 'iso27001-org-001',
      name: 'Information Security Policies',
      description: 'Set of policies for information security',
      level: 1,
      type: 'controls',
      parentId: 'iso27001-org-controls',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Policy Manager',
      },
    },
    {
      id: 'iso27001-org-002',
      name: 'Segregation of Duties',
      description: 'Separation of conflicting duties and areas of responsibility',
      level: 1,
      type: 'controls',
      parentId: 'iso27001-org-controls',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Compliance Officer',
      },
    },
    {
      id: 'iso27001-org-003',
      name: 'Supplier Relationships',
      description: 'Information security in supplier relationships',
      level: 1,
      type: 'controls',
      parentId: 'iso27001-org-controls',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Vendor Manager',
      },
    },

    // =========================================================================
    // LEVEL 1: Performance Evaluation Sub-capabilities
    // =========================================================================
    {
      id: 'iso27001-perf-001',
      name: 'Monitoring & Measurement',
      description: 'Monitor, measure, analyze and evaluate ISMS performance',
      level: 1,
      type: 'performance',
      parentId: 'iso27001-performance',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Metrics Manager',
      },
    },
    {
      id: 'iso27001-perf-002',
      name: 'Internal Audit Program',
      description: 'Conduct internal ISMS audits at planned intervals',
      level: 1,
      type: 'performance',
      parentId: 'iso27001-performance',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Internal Audit Manager',
      },
    },
    {
      id: 'iso27001-perf-003',
      name: 'Management Review',
      description: 'Top management review of ISMS at planned intervals',
      level: 1,
      type: 'performance',
      parentId: 'iso27001-performance',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'CISO',
      },
    },
  ],
}


