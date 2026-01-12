/**
 * Application Inventory Configuration
 * Matches the framework pattern structure
 */

export interface ApplicationGrandchild {
  id: string
  name: string
  description?: string
}

export const applicationGrandchildren: ApplicationGrandchild[] = [
  {
    id: 'all',
    name: 'All Applications',
    description: 'Complete application portfolio',
  },
  {
    id: 'deployed',
    name: 'Deployed',
    description: 'Applications in production',
  },
  {
    id: 'critical',
    name: 'Mission Critical',
    description: 'High-priority applications',
  },
  {
    id: 'cloud',
    name: 'Cloud Hosted',
    description: 'Cloud-based applications',
  },
]

export function getApplicationConfig() {
  return {
    name: 'Application Inventory',
    grandchildren: applicationGrandchildren,
  }
}
