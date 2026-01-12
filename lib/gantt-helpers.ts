/**
 * Gantt Helper Utilities
 * Functions for transforming database models to Gantt tasks
 */

import { GanttTask } from '@/lib/types/gantt'

/**
 * Fetches Gantt tasks from the API
 */
export async function fetchGanttTasks(
  frameworkId: string,
  options?: {
    organizationId?: string
    userId?: string
    source?: 'task' | 'frameworkTask' | 'workflow' | 'all'
    sprintId?: string
    projectId?: string
  }
): Promise<GanttTask[]> {
  try {
    const params = new URLSearchParams({
      ...(options?.organizationId && { organizationId: options.organizationId }),
      ...(options?.userId && { userId: options.userId }),
      ...(options?.source && { source: options.source }),
      ...(options?.sprintId && { sprintId: options.sprintId }),
      ...(options?.projectId && { projectId: options.projectId }),
    })

    const url = `/api/gantt/${frameworkId}${params.toString() ? `?${params.toString()}` : ''}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch Gantt tasks: ${response.statusText}`)
    }

    const data = await response.json()
    return data.tasks || []
  } catch (error) {
    console.error('Error fetching Gantt tasks:', error)
    return []
  }
}

/**
 * Updates a Gantt task via API
 */
export async function updateGanttTask(
  frameworkId: string,
  taskId: string,
  source: 'task' | 'frameworkTask' | 'workflow',
  updates: {
    startDate?: string
    endDate?: string
    lanePosition?: number
    assigneeId?: string
    priority?: string
    progress?: number
  }
): Promise<{ success: boolean; task?: any; error?: string }> {
  try {
    const response = await fetch(`/api/gantt/${frameworkId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskId,
        source,
        updates,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to update task')
    }

    const data = await response.json()
    return { success: true, task: data.task }
  } catch (error) {
    console.error('Error updating Gantt task:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update task',
    }
  }
}

/**
 * Server-side fetch for Gantt tasks (for use in Server Components)
 */
export async function getGanttTasksServer(
  frameworkId: string,
  options?: {
    organizationId?: string
    userId?: string
    source?: 'task' | 'frameworkTask' | 'workflow' | 'all'
    sprintId?: string
    projectId?: string
  }
): Promise<GanttTask[]> {
  // This would connect to your database in production
  // For now, return empty array
  return []
}
