/**
 * Mock CMDB Data for Application Inventory
 * Based on ApplicationComponent schema from Prisma
 */

export type ApplicationComponentStatus =
  | 'planned'
  | 'development'
  | 'testing'
  | 'deployed'
  | 'deprecated'
  | 'retired'

export type ApplicationComponentType =
  | 'service'
  | 'microservice'
  | 'module'
  | 'library'
  | 'framework'
  | 'plugin'
  | 'custom'

export type HostingModel =
  | 'on_premises'
  | 'cloud_aws'
  | 'cloud_azure'
  | 'cloud_gcp'
  | 'hybrid'
  | 'saas'
  | 'paas'
  | 'iaas'
  | 'containerized'

export type Criticality =
  | 'mission_critical'
  | 'important'
  | 'standard'
  | 'non_critical'

export type DataClassification =
  | 'public'
  | 'internal'
  | 'confidential'
  | 'restricted'
  | 'pii'

export interface CMDBApplication {
  id: string
  organizationId: string
  name: string
  description: string
  type: ApplicationComponentType
  status: ApplicationComponentStatus
  version: string
  isActive: boolean
  deploymentUnit?: string
  repository?: string
  documentation?: string
  healthCheckUrl?: string

  // CMDB Fields - Ownership & Governance
  businessOwner?: string
  itOwner?: string
  vendor?: string
  supportGroup?: string

  // CMDB Fields - Infrastructure & Hosting
  hostingModel?: HostingModel

  // CMDB Fields - Criticality & Risk
  criticality?: Criticality
  dataClassification?: DataClassification
  rto?: number // Recovery Time Objective (minutes)
  rpo?: number // Recovery Point Objective (minutes)
  mttr?: number // Mean Time To Recovery (minutes)

  // CMDB Fields - Lifecycle
  eolDate?: string

  // CMDB Fields - Financial
  totalCostOfOwnership?: number
  annualOpex?: number
  annualCapex?: number
  licenseType?: string
  licenseExpiration?: string

  // Metadata
  createdAt: string
  updatedAt: string
}

export const mockCMDBApplications: CMDBApplication[] = [
  {
    id: 'app-001',
    organizationId: 'org-001',
    name: 'Customer Portal',
    description: 'Self-service customer portal for account management, orders, and support',
    type: 'service',
    status: 'deployed',
    version: '3.2.1',
    isActive: true,
    deploymentUnit: 'customer-portal-v3',
    repository: 'https://github.com/org/customer-portal',
    documentation: 'https://docs.company.com/customer-portal',
    healthCheckUrl: 'https://portal.company.com/health',
    businessOwner: 'Sarah Chen (VP Customer Success)',
    itOwner: 'Mike Johnson (IT Director)',
    vendor: 'In-house',
    supportGroup: 'Customer Experience Team',
    hostingModel: 'cloud_aws',
    criticality: 'mission_critical',
    dataClassification: 'pii',
    rto: 60,
    rpo: 15,
    mttr: 45,
    eolDate: '2028-12-31',
    totalCostOfOwnership: 450000,
    annualOpex: 120000,
    annualCapex: 80000,
    licenseType: 'Enterprise',
    licenseExpiration: '2026-06-30',
    createdAt: '2021-03-15T10:00:00Z',
    updatedAt: '2024-11-01T14:30:00Z'
  },
  {
    id: 'app-002',
    organizationId: 'org-001',
    name: 'E-Commerce Platform',
    description: 'Main e-commerce platform handling product catalog, shopping cart, and checkout',
    type: 'service',
    status: 'deployed',
    version: '5.1.0',
    isActive: true,
    deploymentUnit: 'ecommerce-platform-v5',
    repository: 'https://github.com/org/ecommerce-platform',
    documentation: 'https://docs.company.com/ecommerce',
    healthCheckUrl: 'https://shop.company.com/health',
    businessOwner: 'David Martinez (Chief Commercial Officer)',
    itOwner: 'Lisa Wong (Enterprise Architect)',
    vendor: 'Commercetools',
    supportGroup: 'E-Commerce Operations',
    hostingModel: 'saas',
    criticality: 'mission_critical',
    dataClassification: 'pii',
    rto: 30,
    rpo: 5,
    mttr: 30,
    eolDate: '2029-06-30',
    totalCostOfOwnership: 850000,
    annualOpex: 280000,
    annualCapex: 150000,
    licenseType: 'SaaS Subscription',
    licenseExpiration: '2026-12-31',
    createdAt: '2020-01-10T09:00:00Z',
    updatedAt: '2024-10-28T16:45:00Z'
  },
  {
    id: 'app-003',
    organizationId: 'org-001',
    name: 'Payment Gateway',
    description: 'Secure payment processing and transaction management system',
    type: 'microservice',
    status: 'deployed',
    version: '2.8.3',
    isActive: true,
    deploymentUnit: 'payment-gateway-v2',
    repository: 'https://github.com/org/payment-gateway',
    documentation: 'https://docs.company.com/payment-gateway',
    healthCheckUrl: 'https://payments.company.com/health',
    businessOwner: 'Rachel Kim (CFO)',
    itOwner: 'Tom Anderson (Security Architect)',
    vendor: 'Stripe',
    supportGroup: 'Payment Systems Team',
    hostingModel: 'hybrid',
    criticality: 'mission_critical',
    dataClassification: 'pii',
    rto: 15,
    rpo: 1,
    mttr: 20,
    totalCostOfOwnership: 620000,
    annualOpex: 180000,
    annualCapex: 90000,
    licenseType: 'Transaction-based',
    createdAt: '2020-06-20T11:00:00Z',
    updatedAt: '2024-10-30T09:15:00Z'
  },
  {
    id: 'app-004',
    organizationId: 'org-001',
    name: 'Inventory Management System',
    description: 'Real-time inventory tracking, warehouse management, and stock optimization',
    type: 'service',
    status: 'deployed',
    version: '4.5.2',
    isActive: true,
    deploymentUnit: 'inventory-mgmt-v4',
    repository: 'https://github.com/org/inventory-system',
    documentation: 'https://docs.company.com/inventory',
    healthCheckUrl: 'https://inventory.company.com/health',
    businessOwner: 'James Wilson (VP Operations)',
    itOwner: 'Angela Brown (IT Director)',
    vendor: 'SAP',
    supportGroup: 'Supply Chain IT',
    hostingModel: 'on_premises',
    criticality: 'important',
    dataClassification: 'internal',
    rto: 120,
    rpo: 30,
    mttr: 90,
    eolDate: '2027-03-31',
    totalCostOfOwnership: 720000,
    annualOpex: 200000,
    annualCapex: 120000,
    licenseType: 'Named User',
    licenseExpiration: '2025-12-31',
    createdAt: '2019-09-05T08:30:00Z',
    updatedAt: '2024-10-25T11:20:00Z'
  },
  {
    id: 'app-005',
    organizationId: 'org-001',
    name: 'CRM System',
    description: 'Customer relationship management platform for sales, marketing, and support',
    type: 'service',
    status: 'deployed',
    version: '2024.1',
    isActive: true,
    deploymentUnit: 'crm-v2024',
    repository: 'N/A (SaaS)',
    documentation: 'https://docs.company.com/crm',
    healthCheckUrl: 'https://crm.company.com/health',
    businessOwner: 'Sarah Chen (VP Customer Success)',
    itOwner: 'Mike Johnson (IT Director)',
    vendor: 'Salesforce',
    supportGroup: 'CRM Admin Team',
    hostingModel: 'saas',
    criticality: 'important',
    dataClassification: 'pii',
    rto: 240,
    rpo: 60,
    mttr: 120,
    totalCostOfOwnership: 380000,
    annualOpex: 150000,
    annualCapex: 40000,
    licenseType: 'Per User/Month',
    licenseExpiration: '2025-08-31',
    createdAt: '2018-04-12T10:00:00Z',
    updatedAt: '2024-11-02T08:00:00Z'
  },
  {
    id: 'app-006',
    organizationId: 'org-001',
    name: 'Analytics Dashboard',
    description: 'Business intelligence and analytics platform for data visualization and reporting',
    type: 'service',
    status: 'deployed',
    version: '1.9.0',
    isActive: true,
    deploymentUnit: 'analytics-dashboard-v1',
    repository: 'https://github.com/org/analytics-dashboard',
    documentation: 'https://docs.company.com/analytics',
    healthCheckUrl: 'https://analytics.company.com/health',
    businessOwner: 'Jennifer Lopez (Chief Data Officer)',
    itOwner: 'Chris Taylor (Data Platform Lead)',
    vendor: 'Tableau',
    supportGroup: 'Data & Analytics Team',
    hostingModel: 'cloud_aws',
    criticality: 'standard',
    dataClassification: 'internal',
    rto: 480,
    rpo: 120,
    mttr: 180,
    eolDate: '2028-09-30',
    totalCostOfOwnership: 290000,
    annualOpex: 95000,
    annualCapex: 55000,
    licenseType: 'Concurrent User',
    licenseExpiration: '2026-03-31',
    createdAt: '2022-01-20T14:00:00Z',
    updatedAt: '2024-10-20T13:30:00Z'
  },
  {
    id: 'app-007',
    organizationId: 'org-001',
    name: 'Marketing Automation',
    description: 'Email marketing, campaign management, and lead nurturing platform',
    type: 'service',
    status: 'deployed',
    version: '8.2.1',
    isActive: true,
    deploymentUnit: 'marketing-auto-v8',
    repository: 'N/A (SaaS)',
    documentation: 'https://docs.company.com/marketing',
    businessOwner: 'Emily Davis (CMO)',
    itOwner: 'Kevin Smith (Marketing Systems)',
    vendor: 'HubSpot',
    supportGroup: 'Marketing Ops',
    hostingModel: 'saas',
    criticality: 'standard',
    dataClassification: 'internal',
    rto: 480,
    rpo: 240,
    mttr: 240,
    totalCostOfOwnership: 180000,
    annualOpex: 75000,
    annualCapex: 25000,
    licenseType: 'Contact-based',
    licenseExpiration: '2025-10-31',
    createdAt: '2020-08-15T09:30:00Z',
    updatedAt: '2024-10-18T10:45:00Z'
  },
  {
    id: 'app-008',
    organizationId: 'org-001',
    name: 'HR Management System',
    description: 'Human resources platform for employee records, payroll, and benefits',
    type: 'service',
    status: 'deployed',
    version: '6.3.0',
    isActive: true,
    deploymentUnit: 'hrms-v6',
    repository: 'N/A (SaaS)',
    documentation: 'https://docs.company.com/hrms',
    businessOwner: 'Patricia Moore (CHRO)',
    itOwner: 'Daniel Green (IT Manager)',
    vendor: 'Workday',
    supportGroup: 'HR Systems Team',
    hostingModel: 'saas',
    criticality: 'important',
    dataClassification: 'pii',
    rto: 240,
    rpo: 60,
    mttr: 120,
    totalCostOfOwnership: 420000,
    annualOpex: 160000,
    annualCapex: 60000,
    licenseType: 'Per Employee',
    licenseExpiration: '2026-01-31',
    createdAt: '2019-02-28T11:00:00Z',
    updatedAt: '2024-11-03T09:00:00Z'
  },
  {
    id: 'app-009',
    organizationId: 'org-001',
    name: 'API Gateway',
    description: 'Enterprise API gateway for service orchestration, rate limiting, and authentication',
    type: 'microservice',
    status: 'deployed',
    version: '3.1.4',
    isActive: true,
    deploymentUnit: 'api-gateway-v3',
    repository: 'https://github.com/org/api-gateway',
    documentation: 'https://docs.company.com/api-gateway',
    healthCheckUrl: 'https://api.company.com/health',
    businessOwner: 'Lisa Wong (Enterprise Architect)',
    itOwner: 'Alex Rodriguez (Platform Lead)',
    vendor: 'Kong',
    supportGroup: 'Platform Engineering',
    hostingModel: 'containerized',
    criticality: 'mission_critical',
    dataClassification: 'internal',
    rto: 30,
    rpo: 5,
    mttr: 30,
    eolDate: '2029-12-31',
    totalCostOfOwnership: 340000,
    annualOpex: 110000,
    annualCapex: 70000,
    licenseType: 'Enterprise Plus',
    licenseExpiration: '2026-09-30',
    createdAt: '2021-07-10T10:00:00Z',
    updatedAt: '2024-11-04T07:15:00Z'
  },
  {
    id: 'app-010',
    organizationId: 'org-001',
    name: 'Document Management',
    description: 'Enterprise document storage, version control, and collaboration platform',
    type: 'service',
    status: 'deployed',
    version: '2023.4',
    isActive: true,
    deploymentUnit: 'docmgmt-v2023',
    repository: 'N/A (SaaS)',
    documentation: 'https://docs.company.com/docmgmt',
    businessOwner: 'Robert Johnson (COO)',
    itOwner: 'Susan Lee (IT Manager)',
    vendor: 'Microsoft',
    supportGroup: 'Collaboration Services',
    hostingModel: 'cloud_azure',
    criticality: 'standard',
    dataClassification: 'confidential',
    rto: 480,
    rpo: 120,
    mttr: 240,
    totalCostOfOwnership: 250000,
    annualOpex: 85000,
    annualCapex: 40000,
    licenseType: 'Per User',
    licenseExpiration: '2025-11-30',
    createdAt: '2019-11-05T13:00:00Z',
    updatedAt: '2024-10-15T15:20:00Z'
  },
  {
    id: 'app-011',
    organizationId: 'org-001',
    name: 'Notification Service',
    description: 'Multi-channel notification system for email, SMS, and push notifications',
    type: 'microservice',
    status: 'deployed',
    version: '2.3.0',
    isActive: true,
    deploymentUnit: 'notification-svc-v2',
    repository: 'https://github.com/org/notification-service',
    documentation: 'https://docs.company.com/notifications',
    healthCheckUrl: 'https://notifications.company.com/health',
    businessOwner: 'Sarah Chen (VP Customer Success)',
    itOwner: 'Alex Rodriguez (Platform Lead)',
    vendor: 'In-house',
    supportGroup: 'Platform Engineering',
    hostingModel: 'containerized',
    criticality: 'important',
    dataClassification: 'internal',
    rto: 120,
    rpo: 30,
    mttr: 60,
    totalCostOfOwnership: 180000,
    annualOpex: 65000,
    annualCapex: 35000,
    licenseType: 'Open Source',
    createdAt: '2022-03-18T09:00:00Z',
    updatedAt: '2024-10-22T11:30:00Z'
  },
  {
    id: 'app-012',
    organizationId: 'org-001',
    name: 'Legacy Billing System',
    description: 'Legacy billing and invoicing system scheduled for replacement',
    type: 'service',
    status: 'deprecated',
    version: '1.2.8',
    isActive: true,
    deploymentUnit: 'billing-legacy-v1',
    repository: 'https://github.com/org/legacy-billing',
    documentation: 'https://docs.company.com/legacy-billing',
    businessOwner: 'Rachel Kim (CFO)',
    itOwner: 'Mike Johnson (IT Director)',
    vendor: 'Custom Built',
    supportGroup: 'Legacy Systems Team',
    hostingModel: 'on_premises',
    criticality: 'important',
    dataClassification: 'confidential',
    rto: 240,
    rpo: 60,
    mttr: 180,
    eolDate: '2025-06-30',
    totalCostOfOwnership: 480000,
    annualOpex: 140000,
    annualCapex: 30000,
    licenseType: 'Perpetual',
    createdAt: '2015-05-10T10:00:00Z',
    updatedAt: '2024-09-30T14:00:00Z'
  },
  {
    id: 'app-013',
    organizationId: 'org-001',
    name: 'Mobile App Backend',
    description: 'Backend services for iOS and Android mobile applications',
    type: 'microservice',
    status: 'deployed',
    version: '4.2.0',
    isActive: true,
    deploymentUnit: 'mobile-backend-v4',
    repository: 'https://github.com/org/mobile-backend',
    documentation: 'https://docs.company.com/mobile-backend',
    healthCheckUrl: 'https://mobile-api.company.com/health',
    businessOwner: 'David Martinez (Chief Commercial Officer)',
    itOwner: 'Chris Taylor (Mobile Platform Lead)',
    vendor: 'In-house',
    supportGroup: 'Mobile Engineering',
    hostingModel: 'cloud_aws',
    criticality: 'mission_critical',
    dataClassification: 'pii',
    rto: 60,
    rpo: 10,
    mttr: 45,
    totalCostOfOwnership: 520000,
    annualOpex: 175000,
    annualCapex: 95000,
    licenseType: 'N/A',
    createdAt: '2021-02-14T12:00:00Z',
    updatedAt: '2024-11-01T10:45:00Z'
  },
  {
    id: 'app-014',
    organizationId: 'org-001',
    name: 'AI Recommendation Engine',
    description: 'Machine learning-based product recommendation and personalization engine',
    type: 'microservice',
    status: 'testing',
    version: '1.0.0-rc2',
    isActive: true,
    deploymentUnit: 'ai-recommendations-v1',
    repository: 'https://github.com/org/ai-recommendations',
    documentation: 'https://docs.company.com/ai-recommendations',
    healthCheckUrl: 'https://ai-rec.company.com/health',
    businessOwner: 'Jennifer Lopez (Chief Data Officer)',
    itOwner: 'Dr. Sam Patel (ML Engineering Lead)',
    vendor: 'In-house',
    supportGroup: 'ML Engineering',
    hostingModel: 'cloud_gcp',
    criticality: 'standard',
    dataClassification: 'internal',
    rto: 480,
    rpo: 240,
    mttr: 180,
    totalCostOfOwnership: 420000,
    annualOpex: 145000,
    annualCapex: 95000,
    licenseType: 'N/A',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-11-04T16:00:00Z'
  },
  {
    id: 'app-015',
    organizationId: 'org-001',
    name: 'Supply Chain Portal',
    description: 'Supplier collaboration portal for purchase orders, shipments, and forecasting',
    type: 'service',
    status: 'development',
    version: '0.8.0-beta',
    isActive: false,
    deploymentUnit: 'supply-chain-portal-v0',
    repository: 'https://github.com/org/supply-chain-portal',
    documentation: 'https://docs.company.com/supply-chain-portal',
    businessOwner: 'James Wilson (VP Operations)',
    itOwner: 'Angela Brown (IT Director)',
    vendor: 'In-house',
    supportGroup: 'Supply Chain IT',
    hostingModel: 'cloud_azure',
    criticality: 'standard',
    dataClassification: 'internal',
    rto: 720,
    rpo: 240,
    mttr: 360,
    totalCostOfOwnership: 350000,
    annualOpex: 120000,
    annualCapex: 80000,
    licenseType: 'N/A',
    createdAt: '2024-05-01T09:00:00Z',
    updatedAt: '2024-11-03T14:20:00Z'
  }
]

// Utility functions for data aggregation
export function getApplicationsByStatus() {
  const statusCount: Record<ApplicationComponentStatus, number> = {
    planned: 0,
    development: 0,
    testing: 0,
    deployed: 0,
    deprecated: 0,
    retired: 0
  }

  mockCMDBApplications.forEach(app => {
    statusCount[app.status]++
  })

  return statusCount
}

export function getApplicationsByCriticality() {
  const criticalityCount: Record<string, number> = {
    mission_critical: 0,
    important: 0,
    standard: 0,
    non_critical: 0,
    unclassified: 0
  }

  mockCMDBApplications.forEach(app => {
    if (app.criticality) {
      criticalityCount[app.criticality]++
    } else {
      criticalityCount.unclassified++
    }
  })

  return criticalityCount
}

export function getApplicationsByHosting() {
  const hostingCount: Record<string, number> = {
    cloud_aws: 0,
    cloud_azure: 0,
    cloud_gcp: 0,
    on_premises: 0,
    hybrid: 0,
    saas: 0,
    paas: 0,
    iaas: 0,
    containerized: 0,
    unclassified: 0
  }

  mockCMDBApplications.forEach(app => {
    if (app.hostingModel) {
      hostingCount[app.hostingModel]++
    } else {
      hostingCount.unclassified++
    }
  })

  return hostingCount
}

export function getTotalCosts() {
  let totalTCO = 0
  let totalOpex = 0
  let totalCapex = 0

  mockCMDBApplications.forEach(app => {
    if (app.totalCostOfOwnership) totalTCO += app.totalCostOfOwnership
    if (app.annualOpex) totalOpex += app.annualOpex
    if (app.annualCapex) totalCapex += app.annualCapex
  })

  return { totalTCO, totalOpex, totalCapex }
}

export function getApplicationsByType() {
  const typeCount: Record<ApplicationComponentType, number> = {
    service: 0,
    microservice: 0,
    module: 0,
    library: 0,
    framework: 0,
    plugin: 0,
    custom: 0
  }

  mockCMDBApplications.forEach(app => {
    typeCount[app.type]++
  })

  return typeCount
}
