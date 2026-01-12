import { CapabilityMap } from '@/lib/types/capability-map'

/**
 * NIST Cybersecurity Framework 2.0 Capability Map
 * Grouped by the six core functions of NIST CSF 2.0
 */
export const nistCsfCapabilityMap: CapabilityMap = {
  id: 'nist-csf-cm-001',
  name: 'NIST Cybersecurity Framework 2.0',
  description: 'Cybersecurity risk management organized by NIST CSF 2.0 core functions',
  version: '2.0.0',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-15T00:00:00Z',
  typeDescriptions: {
    'govern': 'Establish and monitor cybersecurity risk management strategy',
    'identify': 'Understand cybersecurity risks to systems, assets, data, and capabilities',
    'protect': 'Implement safeguards to prevent or reduce cybersecurity risks',
    'detect': 'Find and analyze possible cybersecurity attacks and compromises',
    'respond': 'Take action regarding detected cybersecurity incidents',
    'recover': 'Restore assets and operations affected by cybersecurity incidents',
  },
  customTypeConfig: {
    'govern': {
      label: 'Govern',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      headerBg: 'bg-purple-100',
      textColor: 'text-purple-900',
    },
    'identify': {
      label: 'Identify',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      headerBg: 'bg-blue-100',
      textColor: 'text-blue-900',
    },
    'protect': {
      label: 'Protect',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      headerBg: 'bg-green-100',
      textColor: 'text-green-900',
    },
    'detect': {
      label: 'Detect',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      headerBg: 'bg-yellow-100',
      textColor: 'text-yellow-900',
    },
    'respond': {
      label: 'Respond',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      headerBg: 'bg-orange-100',
      textColor: 'text-orange-900',
    },
    'recover': {
      label: 'Recover',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      headerBg: 'bg-cyan-100',
      textColor: 'text-cyan-900',
    },
  },
  capabilities: [
    // =========================================================================
    // LEVEL 0: NIST CSF Categories (grouped by core functions)
    // =========================================================================
    ,
    ,
    ,

    // =========================================================================
    // LEVEL 1: Govern - Sub-categories
    // =========================================================================
    {
      id: 'nist-govern-001',
      name: 'Organizational Context',
      description: 'Understanding organizational mission, objectives, and risk tolerance',
      level: 0,
      type: 'govern',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Enterprise Risk Manager',
      },
    },
    {
      id: 'nist-govern-002',
      name: 'Risk Management Strategy',
      description: 'Priorities, constraints, risk tolerance, and assumptions',
      level: 0,
      type: 'govern',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'CISO',
      },
    },
    {
      id: 'nist-govern-003',
      name: 'Roles & Responsibilities',
      description: 'Cybersecurity roles, responsibilities, and authorities',
      level: 0,
      type: 'govern',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'CISO',
      },
    },
    {
      id: 'nist-govern-004',
      name: 'Policy & Oversight',
      description: 'Cybersecurity policy is established, communicated, and enforced',
      level: 0,
      type: 'govern',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Policy Manager',
      },
    },
    {
      id: 'nist-govern-005',
      name: 'Cybersecurity Supply Chain Risk Management',
      description: 'Supply chain risk management processes',
      level: 0,
      type: 'govern',
      metrics: {
        maturity: 2,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Vendor Risk Manager',
      },
    },

    // =========================================================================
    // LEVEL 2: Risk Management Strategy - Sub-capabilities
    // =========================================================================
    {
      id: 'nist-govern-002-1',
      name: 'Risk Appetite Definition',
      description: 'Define organizational risk appetite and tolerance levels',
      level: 1,
      type: 'govern',
      parentId: 'nist-govern-002',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Risk Strategy Lead',
      },
    },
    {
      id: 'nist-govern-002-2',
      name: 'Risk Assessment Methodology',
      description: 'Establish risk assessment processes and criteria',
      level: 1,
      type: 'govern',
      parentId: 'nist-govern-002',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Risk Methodologist',
      },
    },

    // =========================================================================
    // LEVEL 1: Identify - Categories
    // =========================================================================
    {
      id: 'nist-identify-001',
      name: 'Asset Management',
      description: 'Data, personnel, devices, systems, and facilities managed',
      level: 0,
      type: 'govern',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Asset Manager',
      },
    },
    {
      id: 'nist-identify-002',
      name: 'Risk Assessment',
      description: 'Organization understands cybersecurity risk to operations and assets',
      level: 0,
      type: 'identify',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Risk Analyst',
      },
    },
    {
      id: 'nist-identify-003',
      name: 'Improvement',
      description: 'Improvements to organizational cybersecurity risk management',
      level: 0,
      type: 'identify',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Process Improvement Lead',
      },
    },

    // =========================================================================
    // LEVEL 2: Asset Management - Sub-capabilities
    // =========================================================================
    {
      id: 'nist-identify-001-1',
      name: 'Inventory of Assets',
      description: 'Physical devices and systems inventoried',
      level: 1,
      type: 'identify',
      parentId: 'nist-identify-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Asset Inventory Manager',
      },
    },
    {
      id: 'nist-identify-001-2',
      name: 'Software Inventory',
      description: 'Software platforms and applications inventoried',
      level: 1,
      type: 'identify',
      parentId: 'nist-identify-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Software Asset Manager',
      },
    },
    {
      id: 'nist-identify-001-3',
      name: 'Data Flow Mapping',
      description: 'Data flows are mapped and documented',
      level: 1,
      type: 'identify',
      parentId: 'nist-identify-001',
      metrics: {
        maturity: 2,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Data Architect',
      },
    },

    // =========================================================================
    // LEVEL 3: Physical Asset Inventory - Implementation
    // =========================================================================
    {
      id: 'nist-identify-001-1-1',
      name: 'Automated Asset Discovery',
      description: 'Automated tools for discovering network-connected assets',
      level: 2,
      type: 'identify',
      parentId: 'nist-identify-001-1',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Network Discovery Engineer',
      },
    },
    {
      id: 'nist-identify-001-1-2',
      name: 'Asset Classification',
      description: 'Assets classified by criticality and sensitivity',
      level: 3,
      type: 'strategic',
      parentId: 'nist-identify-001-1',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Asset Classification Analyst',
      },
    },

    // =========================================================================
    // LEVEL 1: Protect - Categories
    // =========================================================================
    {
      id: 'nist-protect-001',
      name: 'Identity Management & Access Control',
      description: 'Access to physical and logical assets managed',
      level: 0,
      type: 'protect',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'IAM Manager',
      },
    },
    {
      id: 'nist-protect-002',
      name: 'Awareness & Training',
      description: 'Personnel trained in cybersecurity awareness',
      level: 0,
      type: 'protect',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Security Awareness Manager',
      },
    },
    {
      id: 'nist-protect-003',
      name: 'Data Security',
      description: 'Information and records managed consistent with risk strategy',
      level: 0,
      type: 'protect',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Data Protection Officer',
      },
    },
    {
      id: 'nist-protect-004',
      name: 'Platform Security',
      description: 'Technology assets managed consistent with risk strategy',
      level: 0,
      type: 'protect',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Platform Security Manager',
      },
    },
    {
      id: 'nist-protect-005',
      name: 'Technology Infrastructure Resilience',
      description: 'Technology infrastructure resilient to cybersecurity events',
      level: 0,
      type: 'protect',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Infrastructure Manager',
      },
    },

    // =========================================================================
    // LEVEL 2: Identity Management - Sub-capabilities
    // =========================================================================
    {
      id: 'nist-protect-001-1',
      name: 'Authentication Management',
      description: 'User authentication processes and controls',
      level: 1,
      type: 'protect',
      parentId: 'nist-protect-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Authentication Engineer',
      },
    },
    {
      id: 'nist-protect-001-2',
      name: 'Authorization Management',
      description: 'Access authorization and privilege management',
      level: 1,
      type: 'protect',
      parentId: 'nist-protect-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Authorization Manager',
      },
    },
    {
      id: 'nist-protect-001-3',
      name: 'Remote Access Control',
      description: 'Remote access is managed and controlled',
      level: 1,
      type: 'protect',
      parentId: 'nist-protect-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Remote Access Manager',
      },
    },

    // =========================================================================
    // LEVEL 1: Detect - Categories
    // =========================================================================
    {
      id: 'nist-detect-001',
      name: 'Continuous Monitoring',
      description: 'Information system and assets monitored to identify events',
      level: 0,
      type: 'protect',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Security Monitoring Lead',
      },
    },
    {
      id: 'nist-detect-002',
      name: 'Adverse Event Analysis',
      description: 'Analysis of detected events to understand attack targets and methods',
      level: 0,
      type: 'detect',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Security Analyst',
      },
    },

    // =========================================================================
    // LEVEL 2: Continuous Monitoring - Sub-capabilities
    // =========================================================================
    {
      id: 'nist-detect-001-1',
      name: 'Network Monitoring',
      description: 'Network traffic monitored for cybersecurity events',
      level: 1,
      type: 'detect',
      parentId: 'nist-detect-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Network Security Analyst',
      },
    },
    {
      id: 'nist-detect-001-2',
      name: 'Security Event Logging',
      description: 'Event logs retained and reviewed',
      level: 1,
      type: 'detect',
      parentId: 'nist-detect-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Log Management Engineer',
      },
    },
    {
      id: 'nist-detect-001-3',
      name: 'Malware Detection',
      description: 'Malicious code detected and reported',
      level: 1,
      type: 'detect',
      parentId: 'nist-detect-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Malware Analyst',
      },
    },

    // =========================================================================
    // LEVEL 3: Network Monitoring - Implementation
    // =========================================================================
    {
      id: 'nist-detect-001-1-1',
      name: 'IDS/IPS Systems',
      description: 'Intrusion detection and prevention systems deployed',
      level: 2,
      type: 'detect',
      parentId: 'nist-detect-001-1',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'IDS Engineer',
      },
    },
    {
      id: 'nist-detect-001-1-2',
      name: 'Network Traffic Analysis',
      description: 'Advanced network traffic analysis and anomaly detection',
      level: 3,
      type: 'operational',
      parentId: 'nist-detect-001-1',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Network Traffic Analyst',
      },
    },

    // =========================================================================
    // LEVEL 1: Respond - Categories
    // =========================================================================
    {
      id: 'nist-respond-001',
      name: 'Incident Management',
      description: 'Incident response processes executed and managed',
      level: 0,
      type: 'respond',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Incident Manager',
      },
    },
    {
      id: 'nist-respond-002',
      name: 'Incident Analysis',
      description: 'Investigations ensure effective response and support forensics',
      level: 0,
      type: 'respond',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Forensics Lead',
      },
    },
    {
      id: 'nist-respond-003',
      name: 'Incident Response Reporting & Communication',
      description: 'Response activities coordinated with internal and external stakeholders',
      level: 0,
      type: 'respond',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Communications Manager',
      },
    },

    // =========================================================================
    // LEVEL 2: Incident Management - Sub-capabilities
    // =========================================================================
    {
      id: 'nist-respond-001-1',
      name: 'Incident Response Plan',
      description: 'Documented incident response plan executed during incidents',
      level: 1,
      type: 'respond',
      parentId: 'nist-respond-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'IR Plan Manager',
      },
    },
    {
      id: 'nist-respond-001-2',
      name: 'Incident Handling',
      description: 'Personnel trained and equipped to handle incidents',
      level: 1,
      type: 'respond',
      parentId: 'nist-respond-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'IR Team Lead',
      },
    },

    // =========================================================================
    // LEVEL 1: Recover - Categories
    // =========================================================================
    {
      id: 'nist-recover-001',
      name: 'Incident Recovery Plan Execution',
      description: 'Recovery processes and procedures executed and maintained',
      level: 0,
      type: 'respond',
      metrics: {
        maturity: 2,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Recovery Manager',
      },
    },
    {
      id: 'nist-recover-002',
      name: 'Incident Recovery Communication',
      description: 'Communication managed during and following recovery',
      level: 0,
      type: 'recover',
      metrics: {
        maturity: 2,
        strategicImportance: 'high',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Crisis Communications Lead',
      },
    },

    // =========================================================================
    // LEVEL 2: Recovery Plan Execution - Sub-capabilities
    // =========================================================================
    {
      id: 'nist-recover-001-1',
      name: 'Business Continuity Plan',
      description: 'Business continuity plans address cybersecurity events',
      level: 1,
      type: 'recover',
      parentId: 'nist-recover-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'BC Manager',
      },
    },
    {
      id: 'nist-recover-001-2',
      name: 'Disaster Recovery',
      description: 'IT disaster recovery procedures implemented',
      level: 1,
      type: 'recover',
      parentId: 'nist-recover-001',
      metrics: {
        maturity: 2,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'DR Manager',
      },
    },
    {
      id: 'nist-recover-001-3',
      name: 'Backup & Restore',
      description: 'Data backups tested and restoration procedures validated',
      level: 1,
      type: 'recover',
      parentId: 'nist-recover-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Backup Administrator',
      },
    },
  ],
}



