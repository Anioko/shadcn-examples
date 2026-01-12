import { CapabilityMap } from '@/lib/types/capability-map'

/**
 * COSO Internal Control Framework Capability Map
 * 5 Components with 17 Principles for Internal Control
 */
export const cosoCapabilityMap: CapabilityMap = {
  id: 'coso-cm-001',
  name: 'COSO Internal Control Framework',
  description: '5 Components and 17 Principles for effective internal control systems',
  version: '2013',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  typeDescriptions: {
    'control-environment': 'Control Environment - The foundation for internal control',
    'risk-assessment': 'Risk Assessment - Identifying and analyzing risks to achievement of objectives',
    'control-activities': 'Control Activities - Actions established through policies and procedures',
    'information-communication': 'Information & Communication - Internal and external communication',
    'monitoring': 'Monitoring Activities - Ongoing evaluations and separate evaluations',
  },
  customTypeConfig: {
    'control-environment': {
      label: 'Control Environment',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      headerBg: 'bg-blue-100',
      textColor: 'text-blue-900',
    },
    'risk-assessment': {
      label: 'Risk Assessment',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      headerBg: 'bg-red-100',
      textColor: 'text-red-900',
    },
    'control-activities': {
      label: 'Control Activities',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      headerBg: 'bg-green-100',
      textColor: 'text-green-900',
    },
    'information-communication': {
      label: 'Information & Communication',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      headerBg: 'bg-purple-100',
      textColor: 'text-purple-900',
    },
    'monitoring': {
      label: 'Monitoring Activities',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      headerBg: 'bg-orange-100',
      textColor: 'text-orange-900',
    },
  },
  capabilities: [
    // =========================================================================
    // COMPONENT 1: CONTROL ENVIRONMENT (Principles 1-5)
    // =========================================================================
    {
      id: 'coso-p1',
      name: 'Principle 1: Demonstrates Commitment to Integrity and Ethical Values',
      description: 'The organization demonstrates a commitment to integrity and ethical values',
      level: 0,
      type: 'control-environment',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Chief Ethics Officer',
      },
    },
    {
      id: 'coso-p2',
      name: 'Principle 2: Exercises Oversight Responsibility',
      description: 'The board of directors demonstrates independence and exercises oversight',
      level: 0,
      type: 'control-environment',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Board of Directors',
      },
    },
    {
      id: 'coso-p3',
      name: 'Principle 3: Establishes Structure, Authority, and Responsibility',
      description: 'Management establishes structure, authority, and responsibility for objectives',
      level: 0,
      type: 'control-environment',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Executive Management',
      },
    },
    {
      id: 'coso-p4',
      name: 'Principle 4: Demonstrates Commitment to Competence',
      description: 'The organization demonstrates commitment to attract, develop, and retain competent individuals',
      level: 0,
      type: 'control-environment',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Chief Human Resources Officer',
      },
    },
    {
      id: 'coso-p5',
      name: 'Principle 5: Enforces Accountability',
      description: 'The organization holds individuals accountable for their internal control responsibilities',
      level: 0,
      type: 'control-environment',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Chief Compliance Officer',
      },
    },
    // =========================================================================
    // COMPONENT 2: RISK ASSESSMENT (Principles 6-9)
    // =========================================================================
    {
      id: 'coso-p6',
      name: 'Principle 6: Specifies Suitable Objectives',
      description: 'The organization specifies objectives with sufficient clarity to enable risk identification',
      level: 0,
      type: 'risk-assessment',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Chief Strategy Officer',
      },
    },
    {
      id: 'coso-p7',
      name: 'Principle 7: Identifies and Analyzes Risk',
      description: 'The organization identifies risks and analyzes them as a basis for determining how to manage',
      level: 0,
      type: 'risk-assessment',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Chief Risk Officer',
      },
    },
    {
      id: 'coso-p8',
      name: 'Principle 8: Assesses Fraud Risk',
      description: 'The organization considers the potential for fraud in assessing risks',
      level: 0,
      type: 'risk-assessment',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Fraud Risk Manager',
      },
    },
    {
      id: 'coso-p9',
      name: 'Principle 9: Identifies and Analyzes Significant Change',
      description: 'The organization identifies and assesses changes that could significantly impact internal control',
      level: 0,
      type: 'risk-assessment',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Change Management Lead',
      },
    },
    // =========================================================================
    // COMPONENT 3: CONTROL ACTIVITIES (Principles 10-12)
    // =========================================================================
    {
      id: 'coso-p10',
      name: 'Principle 10: Selects and Develops Control Activities',
      description: 'The organization selects and develops control activities that contribute to mitigation of risks',
      level: 0,
      type: 'control-activities',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Internal Control Manager',
      },
    },
    {
      id: 'coso-p11',
      name: 'Principle 11: Selects and Develops General Controls over Technology',
      description: 'The organization selects and develops general control activities over technology',
      level: 0,
      type: 'control-activities',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'IT Control Manager',
      },
    },
    {
      id: 'coso-p12',
      name: 'Principle 12: Deploys through Policies and Procedures',
      description: 'The organization deploys control activities through policies and procedures',
      level: 0,
      type: 'control-activities',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Policy Manager',
      },
    },
    // =========================================================================
    // COMPONENT 4: INFORMATION & COMMUNICATION (Principles 13-15)
    // =========================================================================
    {
      id: 'coso-p13',
      name: 'Principle 13: Uses Relevant Information',
      description: 'The organization obtains or generates and uses relevant, quality information',
      level: 0,
      type: 'information-communication',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Chief Information Officer',
      },
    },
    {
      id: 'coso-p14',
      name: 'Principle 14: Communicates Internally',
      description: 'The organization internally communicates information necessary to support internal control',
      level: 0,
      type: 'information-communication',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Chief Communications Officer',
      },
    },
    {
      id: 'coso-p15',
      name: 'Principle 15: Communicates Externally',
      description: 'The organization communicates with external parties regarding matters affecting internal control',
      level: 0,
      type: 'information-communication',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'External Relations Manager',
      },
    },
    // =========================================================================
    // COMPONENT 5: MONITORING ACTIVITIES (Principles 16-17)
    // =========================================================================
    {
      id: 'coso-p16',
      name: 'Principle 16: Conducts Ongoing and Separate Evaluations',
      description: 'The organization selects, develops, and performs ongoing and separate evaluations',
      level: 0,
      type: 'monitoring',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Chief Audit Executive',
      },
    },
    {
      id: 'coso-p17',
      name: 'Principle 17: Evaluates and Communicates Deficiencies',
      description: 'The organization evaluates and communicates internal control deficiencies timely',
      level: 0,
      type: 'monitoring',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Audit Committee',
      },
    },
  ],
}
