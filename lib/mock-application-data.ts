/**
 * Mock Application Data Generation
 * Converts CMDB applications to FrameworkItem format
 */

import { mockCMDBApplications, type CMDBApplication } from './mock-cmdb-data'
import { applicationGrandchildren, type ApplicationGrandchild } from './application-config'

export interface ApplicationItem {
  id: number
  grandchildId: string
  header: string
  type: string
  status: 'Done' | 'In Progress' | 'Planned'
  target: number
  limit: number
  reviewer: string
  // Additional CMDB fields
  application: CMDBApplication
}

export function generateApplicationData(): ApplicationItem[] {
  const items: ApplicationItem[] = []
  let idCounter = 1

  mockCMDBApplications.forEach((app) => {
    // Determine which grandchild categories this app belongs to
    const grandchildIds: string[] = ['all'] // All apps go in "all"

    if (app.status === 'deployed') {
      grandchildIds.push('deployed')
    }

    if (app.criticality === 'mission_critical') {
      grandchildIds.push('critical')
    }

    if (app.hostingModel && ['cloud_aws', 'cloud_azure', 'cloud_gcp', 'saas'].includes(app.hostingModel)) {
      grandchildIds.push('cloud')
    }

    // Create an item for each matching category
    grandchildIds.forEach((grandchildId) => {
      items.push({
        id: idCounter++,
        grandchildId,
        header: app.name,
        type: app.type.charAt(0).toUpperCase() + app.type.slice(1),
        status: app.status === 'deployed' ? 'Done' : app.status === 'development' || app.status === 'testing' ? 'In Progress' : 'Planned',
        target: 100,
        limit: 200,
        reviewer: app.businessOwner || 'Assign reviewer',
        application: app,
      })
    })
  })

  return items
}

export function generateApplicationChartData(
  grandchildren: ApplicationGrandchild[],
  data: ApplicationItem[]
) {
  return grandchildren.map((grandchild) => {
    const grandchildData = data.filter((item) => item.grandchildId === grandchild.id)

    return {
      name: grandchild.name,
      total: grandchildData.length,
      done: grandchildData.filter((item) => item.status === 'Done').length,
      inProgress: grandchildData.filter((item) => item.status === 'In Progress').length,
    }
  })
}
