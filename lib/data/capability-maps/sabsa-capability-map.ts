import { CapabilityMap } from '@/lib/types/capability-map'

/**
 * SABSA (Sherwood Applied Business Security Architecture) Capability Map
 * Grouped by the six architectural layers
 */
export const sabsaCapabilityMap: CapabilityMap = {
  id: 'sabsa-cm-001',
  name: 'SABSA Security Architecture Framework',
  description: 'Security architecture capabilities organized by SABSA layers',
  version: '1.0.0',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-15T00:00:00Z',
  typeDescriptions: {
    'contextual': 'Business view - Why? Business drivers, requirements, and risk',
    'conceptual': 'Architect view - What? Security services and control objectives',
    'logical': 'Designer view - How? Security mechanisms and policy',
    'physical': 'Builder view - With what? Security products and standards',
    'component': 'Tradesman view - Where/When? Detailed configuration and deployment',
    'operational': 'Facility manager view - Who? Operations and management',
  },
  customTypeConfig: {
    'contextual': {
      label: 'Contextual Layer',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      headerBg: 'bg-purple-100',
      textColor: 'text-purple-900',
    },
    'conceptual': {
      label: 'Conceptual Layer',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      headerBg: 'bg-blue-100',
      textColor: 'text-blue-900',
    },
    'logical': {
      label: 'Logical Layer',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      headerBg: 'bg-cyan-100',
      textColor: 'text-cyan-900',
    },
    'physical': {
      label: 'Physical Layer',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      headerBg: 'bg-green-100',
      textColor: 'text-green-900',
    },
    'component': {
      label: 'Component Layer',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      headerBg: 'bg-yellow-100',
      textColor: 'text-yellow-900',
    },
    'operational': {
      label: 'Operational Layer',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      headerBg: 'bg-orange-100',
      textColor: 'text-orange-900',
    },
  },
  capabilities: [
    // =========================================================================
    // LEVEL 1: Contextual Layer (Business View)
    // =========================================================================
    {
      id: 'sabsa-contextual-001',
      name: 'Business Risk Assessment',
      description: 'Identify and assess business risks requiring security controls',
      level: 1,
      type: 'contextual',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Chief Risk Officer',
      },
    },
    {
      id: 'sabsa-contextual-002',
      name: 'Business Attributes',
      description: 'Define security-critical business attributes and requirements',
      level: 1,
      type: 'contextual',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Enterprise Architect',
      },
    },
    {
      id: 'sabsa-contextual-003',
      name: 'Business Process Analysis',
      description: 'Analyze business processes for security requirements',
      level: 1,
      type: 'contextual',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Business Analyst',
      },
    },
    {
      id: 'sabsa-contextual-004',
      name: 'Stakeholder Analysis',
      description: 'Identify stakeholders and their security expectations',
      level: 1,
      type: 'contextual',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Stakeholder Manager',
      },
    },

    // =========================================================================
    // LEVEL 1: Conceptual Layer (Architect View)
    // =========================================================================
    {
      id: 'sabsa-conceptual-001',
      name: 'Control Objectives',
      description: 'Define security control objectives addressing business risks',
      level: 1,
      type: 'conceptual',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Security Architect',
      },
    },
    {
      id: 'sabsa-conceptual-002',
      name: 'Security Services',
      description: 'Specify security services required by the business',
      level: 1,
      type: 'conceptual',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Security Architect',
      },
    },
    {
      id: 'sabsa-conceptual-003',
      name: 'Security Domain Model',
      description: 'Model security domains and trust relationships',
      level: 1,
      type: 'conceptual',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Security Architect',
      },
    },
    {
      id: 'sabsa-conceptual-004',
      name: 'Security Attributes Profile',
      description: 'Map business attributes to security attributes',
      level: 1,
      type: 'conceptual',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Security Architect',
      },
    },

    // =========================================================================
    // LEVEL 1: Logical Layer (Designer View)
    // =========================================================================
    {
      id: 'sabsa-logical-001',
      name: 'Security Mechanisms',
      description: 'Design security mechanisms implementing control objectives',
      level: 1,
      type: 'logical',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Security Designer',
      },
    },
    {
      id: 'sabsa-logical-002',
      name: 'Security Policy',
      description: 'Define security policies, standards, and procedures',
      level: 1,
      type: 'logical',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Security Policy Manager',
      },
    },
    {
      id: 'sabsa-logical-003',
      name: 'Identity and Access Management',
      description: 'Design IAM architecture and access control models',
      level: 1,
      type: 'logical',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'IAM Architect',
      },
    },
    {
      id: 'sabsa-logical-004',
      name: 'Cryptography Architecture',
      description: 'Design cryptographic solutions and key management',
      level: 1,
      type: 'logical',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Cryptography Architect',
      },
    },
    {
      id: 'sabsa-logical-005',
      name: 'Security Infrastructure',
      description: 'Design security infrastructure and network architecture',
      level: 1,
      type: 'logical',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Security Infrastructure Architect',
      },
    },

    // =========================================================================
    // LEVEL 1: Physical Layer (Builder View)
    // =========================================================================
    {
      id: 'sabsa-physical-001',
      name: 'Security Products Selection',
      description: 'Select and specify security products and technologies',
      level: 1,
      type: 'physical',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'medium',
        owner: 'Security Engineer',
      },
    },
    {
      id: 'sabsa-physical-002',
      name: 'Platform Security',
      description: 'Implement platform-level security controls and hardening',
      level: 1,
      type: 'physical',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Platform Security Engineer',
      },
    },
    {
      id: 'sabsa-physical-003',
      name: 'Network Security Implementation',
      description: 'Deploy firewalls, IDS/IPS, and network security devices',
      level: 1,
      type: 'physical',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Network Security Engineer',
      },
    },
    {
      id: 'sabsa-physical-004',
      name: 'Application Security',
      description: 'Implement application security controls and secure coding',
      level: 1,
      type: 'physical',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Application Security Engineer',
      },
    },
    {
      id: 'sabsa-physical-005',
      name: 'Physical Security',
      description: 'Implement physical security controls for facilities and assets',
      level: 1,
      type: 'physical',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Physical Security Manager',
      },
    },

    // =========================================================================
    // LEVEL 1: Component Layer (Tradesman View)
    // =========================================================================
    {
      id: 'sabsa-component-001',
      name: 'Security Configuration',
      description: 'Configure security products and components',
      level: 1,
      type: 'component',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'medium',
        owner: 'Security Administrator',
      },
    },
    {
      id: 'sabsa-component-002',
      name: 'Security Testing',
      description: 'Test security controls and validate effectiveness',
      level: 1,
      type: 'component',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Security Tester',
      },
    },
    {
      id: 'sabsa-component-003',
      name: 'Deployment and Integration',
      description: 'Deploy and integrate security components into production',
      level: 1,
      type: 'component',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'medium',
        owner: 'DevSecOps Engineer',
      },
    },
    {
      id: 'sabsa-component-004',
      name: 'Security Documentation',
      description: 'Document security configurations and procedures',
      level: 1,
      type: 'component',
      metrics: {
        maturity: 3,
        strategicImportance: 'medium',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Technical Writer',
      },
    },

    // =========================================================================
    // LEVEL 1: Operational Layer (Facility Manager View)
    // =========================================================================
    {
      id: 'sabsa-operational-001',
      name: 'Security Operations',
      description: 'Operate security controls and monitoring systems',
      level: 1,
      type: 'operational',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'SOC Manager',
      },
    },
    {
      id: 'sabsa-operational-002',
      name: 'Incident Response',
      description: 'Detect, respond to, and recover from security incidents',
      level: 1,
      type: 'operational',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Incident Response Manager',
      },
    },
    {
      id: 'sabsa-operational-003',
      name: 'Security Monitoring',
      description: 'Monitor security events, alerts, and compliance',
      level: 1,
      type: 'operational',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Security Analyst',
      },
    },
    {
      id: 'sabsa-operational-004',
      name: 'Vulnerability Management',
      description: 'Identify, assess, and remediate vulnerabilities',
      level: 1,
      type: 'operational',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Vulnerability Manager',
      },
    },
    {
      id: 'sabsa-operational-005',
      name: 'Security Maintenance',
      description: 'Maintain and update security systems and controls',
      level: 1,
      type: 'operational',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Security Operations Engineer',
      },
    },
    {
      id: 'sabsa-operational-006',
      name: 'Security Metrics and Reporting',
      description: 'Measure security effectiveness and report to stakeholders',
      level: 1,
      type: 'operational',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Security Metrics Analyst',
      },
    },
  ],
}
