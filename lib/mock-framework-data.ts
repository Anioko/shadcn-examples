// Mock data generator for framework dashboard items
// Generates sample data for grandchildren items

export interface FrameworkItem {
  id: number
  header: string
  type: string
  status: string
  target: string
  limit: string
  reviewer: string
  grandchildId: string
  frameworkSlug: string
}

/**
 * Generate mock items for a specific grandchild category
 */
export function generateMockItemsForGrandchild(
  frameworkSlug: string,
  grandchildId: string,
  grandchildName: string,
  count: number = 3
): FrameworkItem[] {
  const items: FrameworkItem[] = []
  const statuses = ["Done", "In Process", "Not Started"]
  const reviewers = ["Eddie Lake", "Jamik Tashpulatov", "Assign reviewer"]

  for (let i = 1; i <= count; i++) {
    items.push({
      id: parseInt(`${grandchildId.replace(/[^0-9]/g, "")}${i}`),
      header: `${grandchildName} ${i}`,
      type: grandchildName,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      target: String(Math.floor(Math.random() * 30) + 1),
      limit: String(Math.floor(Math.random() * 40) + 1),
      reviewer: reviewers[Math.floor(Math.random() * reviewers.length)],
      grandchildId,
      frameworkSlug,
    })
  }

  return items
}

/**
 * Get mock data for all grandchildren of a framework
 */
export function getMockFrameworkData(
  frameworkSlug: string,
  grandchildren: { id: string; name: string }[]
): FrameworkItem[] {
  const allItems: FrameworkItem[] = []

  grandchildren.forEach((grandchild) => {
    const itemCount = Math.floor(Math.random() * 5) + 2 // 2-6 items per grandchild
    const items = generateMockItemsForGrandchild(
      frameworkSlug,
      grandchild.id,
      grandchild.name,
      itemCount
    )
    allItems.push(...items)
  })

  return allItems
}

/**
 * Get mock data filtered by grandchild ID
 */
export function getMockDataByGrandchild(
  frameworkSlug: string,
  grandchildId: string,
  allData: FrameworkItem[]
): FrameworkItem[] {
  return allData.filter(
    (item) =>
      item.frameworkSlug === frameworkSlug && item.grandchildId === grandchildId
  )
}

/**
 * Get count of items per grandchild
 */
export function getGrandchildItemCounts(
  frameworkSlug: string,
  grandchildren: { id: string; name: string }[],
  allData: FrameworkItem[]
): Record<string, number> {
  const counts: Record<string, number> = {}

  grandchildren.forEach((grandchild) => {
    counts[grandchild.id] = allData.filter(
      (item) =>
        item.frameworkSlug === frameworkSlug &&
        item.grandchildId === grandchild.id
    ).length
  })

  return counts
}

/**
 * Calculate statistics for framework dashboard cards
 */
export function calculateFrameworkStats(allData: FrameworkItem[]) {
  const total = allData.length
  const done = allData.filter((item) => item.status === "Done").length
  const inProgress = allData.filter((item) => item.status === "In Process").length
  const notStarted = allData.filter((item) => item.status === "Not Started").length

  return {
    total,
    done,
    inProgress,
    notStarted,
    completionPercentage: total > 0 ? Math.round((done / total) * 100) : 0,
  }
}

/**
 * Generate chart data for framework dashboard
 */
export function generateFrameworkChartData(
  grandchildren: { id: string; name: string }[],
  allData: FrameworkItem[]
) {
  return grandchildren.map((grandchild) => {
    const items = allData.filter((item) => item.grandchildId === grandchild.id)
    return {
      name: grandchild.name.length > 15 
        ? grandchild.name.substring(0, 15) + "..." 
        : grandchild.name,
      total: items.length,
      done: items.filter((item) => item.status === "Done").length,
      inProgress: items.filter((item) => item.status === "In Process").length,
    }
  })
}
