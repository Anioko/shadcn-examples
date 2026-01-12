import { ApplicationCapabilityMap, ApplicationCapability } from '@/lib/types/capability-map'

/**
 * Sample Application Capability Map
 * Based on ReqArchitect Application Capability Reference Model (ACM)
 * Organized by 7 domains: User Experience, Application Services, Data & Storage,
 * Security & Identity, DevOps & Platform, AI & Analytics, Communication
 */
export const sampleApplicationCapabilityMap: ApplicationCapabilityMap = {
  id: 'acm-001',
  name: 'Application Capability Model',
  description: 'Comprehensive application capability reference model for modern web and mobile applications',
  domainDescriptions: {
    'user-experience': 'Frontend interfaces, design systems, and user interactions',
    'application-services': 'APIs, business logic, and integration services',
    'data-storage': 'Data management, storage solutions, and data services',
    'security-identity': 'Authentication, authorization, encryption, and compliance',
    'devops-platform': 'Development tools, CI/CD, observability, and infrastructure',
    'ai-analytics': 'Machine learning services and business intelligence',
    'communication': 'Notification systems, real-time communication, and collaboration',
  },
  version: '1.0.0',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-15T00:00:00Z',
  capabilities: [
    // =========================================================================
    // DOMAIN 1: USER EXPERIENCE - Level 0
    // Frontend interfaces, design systems, and user interactions
    // =========================================================================
    {
      id: 'ux-001',
      name: 'User Experience',
      description: 'Frontend interfaces, design systems, and user interactions',
      level: 0,
      domain: 'user-experience',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Head of Product',
        riskLevel: 'medium',
      },
    },

    // User Experience Level 1
    {
      id: 'ux-101',
      name: 'Web Frontend',
      description: 'React, Vue, Angular framework implementation',
      level: 1,
      domain: 'user-experience',
      parentId: 'ux-001',
      metrics: {
        maturity: 4, // Advanced - Fully featured, automated, integrated
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Frontend Lead',
      },
    },
    {
      id: 'ux-102',
      name: 'Mobile Frontend',
      description: 'Native and cross-platform mobile development',
      level: 1,
      domain: 'user-experience',
      parentId: 'ux-001',
      metrics: {
        maturity: 3, // Functional - Production-ready with core features
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Mobile Lead',
      },
    },
    {
      id: 'ux-103',
      name: 'Design System',
      description: 'Branding, theming, and component libraries',
      level: 1,
      domain: 'user-experience',
      parentId: 'ux-001',
      metrics: {
        maturity: 4, // Advanced - Comprehensive component library
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Design Lead',
      },
    },

    // =========================================================================
    // DOMAIN 2: APPLICATION SERVICES - Level 0
    // APIs, business logic, and integration services
    // =========================================================================
    {
      id: 'app-001',
      name: 'Application Services',
      description: 'APIs, business logic, and integration services',
      level: 0,
      domain: 'application-services',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'VP of Engineering',
        riskLevel: 'medium',
      },
    },

    // Application Services Level 1
    {
      id: 'app-101',
      name: 'API Layer',
      description: 'REST, GraphQL, and API gateway management',
      level: 1,
      domain: 'application-services',
      parentId: 'app-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Backend Lead',
      },
    },
    {
      id: 'app-102',
      name: 'Business Logic',
      description: 'Core application logic and domain services',
      level: 1,
      domain: 'application-services',
      parentId: 'app-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Backend Lead',
      },
    },
    {
      id: 'app-103',
      name: 'Integration Services',
      description: 'Third-party integrations and service orchestration',
      level: 1,
      domain: 'application-services',
      parentId: 'app-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Integration Lead',
      },
    },
    {
      id: 'app-104',
      name: 'Background Processing',
      description: 'Job queues, scheduled tasks, and async processing',
      level: 1,
      domain: 'application-services',
      parentId: 'app-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'medium',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Backend Lead',
      },
    },

    // =========================================================================
    // DOMAIN 3: DATA & STORAGE - Level 0
    // Data management, storage solutions, and data services
    // =========================================================================
    {
      id: 'data-001',
      name: 'Data & Storage',
      description: 'Data management, storage solutions, and data services',
      level: 0,
      domain: 'data-storage',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Data Engineering Lead',
        riskLevel: 'medium',
      },
    },

    // Data & Storage Level 1
    {
      id: 'data-101',
      name: 'Database Management',
      description: 'Relational and NoSQL database administration',
      level: 1,
      domain: 'data-storage',
      parentId: 'data-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'Database Admin',
      },
    },
    {
      id: 'data-102',
      name: 'File Storage',
      description: 'Object storage, CDN, and media management',
      level: 1,
      domain: 'data-storage',
      parentId: 'data-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Infrastructure Lead',
      },
    },
    {
      id: 'data-103',
      name: 'Data Pipeline',
      description: 'ETL processes and data transformation',
      level: 1,
      domain: 'data-storage',
      parentId: 'data-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Data Engineering Lead',
      },
    },
    {
      id: 'data-104',
      name: 'Caching Layer',
      description: 'Redis, Memcached, and application caching',
      level: 1,
      domain: 'data-storage',
      parentId: 'data-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'low',
        owner: 'Backend Lead',
      },
    },

    // =========================================================================
    // DOMAIN 4: SECURITY & IDENTITY - Level 0
    // Authentication, authorization, encryption, and compliance
    // =========================================================================
    {
      id: 'sec-001',
      name: 'Security & Identity',
      description: 'Authentication, authorization, encryption, and compliance',
      level: 0,
      domain: 'security-identity',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'high',
        owner: 'CISO',
        riskLevel: 'high',
      },
    },

    // Security & Identity Level 1
    {
      id: 'sec-101',
      name: 'Authentication',
      description: 'User authentication and session management',
      level: 1,
      domain: 'security-identity',
      parentId: 'sec-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'medium',
        owner: 'Security Architect',
      },
    },
    {
      id: 'sec-102',
      name: 'Authorization',
      description: 'Role-based access control and permissions',
      level: 1,
      domain: 'security-identity',
      parentId: 'sec-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'critical',
        currentInvestment: 'high',
        plannedInvestment: 'medium',
        owner: 'Security Architect',
      },
    },
    {
      id: 'sec-103',
      name: 'Data Protection',
      description: 'Encryption, key management, and data privacy',
      level: 1,
      domain: 'security-identity',
      parentId: 'sec-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'critical',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Security Architect',
      },
    },
    {
      id: 'sec-104',
      name: 'Compliance',
      description: 'GDPR, SOC 2, and regulatory compliance',
      level: 1,
      domain: 'security-identity',
      parentId: 'sec-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Compliance Officer',
      },
    },

    // =========================================================================
    // DOMAIN 5: DEVOPS & PLATFORM - Level 0
    // Development tools, CI/CD, observability, and infrastructure
    // =========================================================================
    {
      id: 'devops-001',
      name: 'DevOps & Platform',
      description: 'Development tools, CI/CD, observability, and infrastructure',
      level: 0,
      domain: 'devops-platform',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'medium',
        owner: 'Head of Platform',
        riskLevel: 'medium',
      },
    },

    // DevOps & Platform Level 1
    {
      id: 'devops-101',
      name: 'CI/CD Pipeline',
      description: 'Continuous integration and deployment automation',
      level: 1,
      domain: 'devops-platform',
      parentId: 'devops-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'medium',
        owner: 'DevOps Lead',
      },
    },
    {
      id: 'devops-102',
      name: 'Infrastructure as Code',
      description: 'Terraform, CloudFormation, infrastructure provisioning',
      level: 1,
      domain: 'devops-platform',
      parentId: 'devops-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'low',
        owner: 'Infrastructure Lead',
      },
    },
    {
      id: 'devops-103',
      name: 'Container Orchestration',
      description: 'Kubernetes, Docker, container management',
      level: 1,
      domain: 'devops-platform',
      parentId: 'devops-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'medium',
        owner: 'Platform Lead',
      },
    },
    {
      id: 'devops-104',
      name: 'Observability',
      description: 'Logging, monitoring, tracing, and alerting',
      level: 1,
      domain: 'devops-platform',
      parentId: 'devops-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'medium',
        owner: 'SRE Lead',
      },
    },
    {
      id: 'devops-105',
      name: 'Cloud Services',
      description: 'AWS, Azure, GCP infrastructure and managed services',
      level: 1,
      domain: 'devops-platform',
      parentId: 'devops-001',
      metrics: {
        maturity: 4,
        strategicImportance: 'high',
        currentInvestment: 'high',
        plannedInvestment: 'medium',
        owner: 'Cloud Architect',
      },
    },

    // =========================================================================
    // DOMAIN 6: AI & ANALYTICS - Level 0
    // Machine learning services and business intelligence
    // =========================================================================
    {
      id: 'ai-001',
      name: 'AI & Analytics',
      description: 'Machine learning services and business intelligence',
      level: 0,
      domain: 'ai-analytics',
      metrics: {
        maturity: 2, // Basic/MVP - Newer capability, still maturing
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Chief Data Officer',
        riskLevel: 'medium',
      },
    },

    // AI & Analytics Level 1
    {
      id: 'ai-101',
      name: 'Machine Learning',
      description: 'ML model development, training, and deployment',
      level: 1,
      domain: 'ai-analytics',
      parentId: 'ai-001',
      metrics: {
        maturity: 2, // Basic/MVP - Basic ML models in production, limited automation
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'ML Engineering Lead',
      },
    },
    {
      id: 'ai-102',
      name: 'Business Intelligence',
      description: 'Data warehousing, reporting, and analytics',
      level: 1,
      domain: 'ai-analytics',
      parentId: 'ai-001',
      metrics: {
        maturity: 3, // Functional - Production dashboards and reports
        strategicImportance: 'medium',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Analytics Lead',
      },
    },
    {
      id: 'ai-103',
      name: 'Predictive Analytics',
      description: 'Forecasting and predictive modeling',
      level: 1,
      domain: 'ai-analytics',
      parentId: 'ai-001',
      metrics: {
        maturity: 2, // Basic/MVP - Early stage, experimenting with models
        strategicImportance: 'medium',
        currentInvestment: 'low',
        plannedInvestment: 'high',
        owner: 'Data Science Lead',
      },
    },

    // =========================================================================
    // DOMAIN 7: COMMUNICATION - Level 0
    // Notification systems, real-time communication, and collaboration
    // =========================================================================
    {
      id: 'comm-001',
      name: 'Communication',
      description: 'Notification systems, real-time communication, and collaboration',
      level: 0,
      domain: 'communication',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Platform Lead',
        riskLevel: 'low',
      },
    },

    // Communication Level 1
    {
      id: 'comm-101',
      name: 'Notification Services',
      description: 'Email, SMS, and push notification delivery',
      level: 1,
      domain: 'communication',
      parentId: 'comm-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'high',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: 'Platform Lead',
      },
    },
    {
      id: 'comm-102',
      name: 'Real-time Communication',
      description: 'WebSocket, WebRTC, and messaging protocols',
      level: 1,
      domain: 'communication',
      parentId: 'comm-001',
      metrics: {
        maturity: 3,
        strategicImportance: 'medium',
        currentInvestment: 'medium',
        plannedInvestment: 'high',
        owner: 'Platform Lead',
      },
    },
    {
      id: 'comm-103',
      name: 'Collaboration Tools',
      description: 'Chat, video conferencing, and team collaboration',
      level: 1,
      domain: 'communication',
      parentId: 'comm-001',
      metrics: {
        maturity: 2,
        strategicImportance: 'low',
        currentInvestment: 'low',
        plannedInvestment: 'medium',
        owner: 'Product Lead',
      },
    },
  ],
}
