/**
 * Kanban Helper Utilities
 * Functions for transforming database models to Kanban cards
 */

import { KanbanCard } from '@/lib/types/kanban'

/**
 * Fetches Kanban cards from the API
 */
export async function fetchKanbanCards(
  frameworkId: string,
  options?: {
    organizationId?: string
    userId?: string
    source?: 'task' | 'frameworkTask' | 'workflow' | 'all'
    sprintId?: string
    projectId?: string
  }
): Promise<KanbanCard[]> {
  try {
    const params = new URLSearchParams({
      ...(options?.organizationId && { organizationId: options.organizationId }),
      ...(options?.userId && { userId: options.userId }),
      ...(options?.source && { source: options.source }),
      ...(options?.sprintId && { sprintId: options.sprintId }),
      ...(options?.projectId && { projectId: options.projectId }),
    })

    const url = `/api/kanban/${frameworkId}${params.toString() ? `?${params.toString()}` : ''}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch Kanban cards: ${response.statusText}`)
    }

    const data = await response.json()
    return data.cards || []
  } catch (error) {
    console.error('Error fetching Kanban cards:', error)
    return []
  }
}

/**
 * Updates a Kanban card via API
 */
export async function updateKanbanCard(
  frameworkId: string,
  cardId: string,
  source: 'task' | 'frameworkTask' | 'workflow',
  updates: {
    status?: string
    columnPosition?: number
    assigneeId?: string
    priority?: string
  }
): Promise<{ success: boolean; card?: any; error?: string }> {
  try {
    const response = await fetch(`/api/kanban/${frameworkId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardId,
        source,
        updates,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to update card')
    }

    const data = await response.json()
    return { success: true, card: data.card }
  } catch (error) {
    console.error('Error updating Kanban card:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Creates a new Kanban card via API
 */
export async function createKanbanCard(
  frameworkId: string,
  data: {
    source: 'task' | 'frameworkTask' | 'workflow'
    organizationId: string
    title: string
    description?: string
    status?: string
    priority?: string
    assigneeId?: string
  }
): Promise<{ success: boolean; card?: any; error?: string }> {
  try {
    const response = await fetch(`/api/kanban/${frameworkId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create card')
    }

    const responseData = await response.json()
    return { success: true, card: responseData.card }
  } catch (error) {
    console.error('Error creating Kanban card:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Server-side helper to fetch cards directly from database
 * This is used in Server Components to avoid API round-trips
 */
export async function getKanbanCardsServer(
  frameworkId: string,
  options?: {
    organizationId?: string
    userId?: string
    source?: 'task' | 'frameworkTask' | 'workflow' | 'all'
    sprintId?: string
    projectId?: string
  }
): Promise<KanbanCard[]> {
  // Import prisma dynamically to avoid bundling in client components
  const { prisma } = await import('@/lib/prisma')

  try {
    let cards: KanbanCard[] = []
    const source = options?.source || 'all'

    // Fetch from Task model
    if (source === 'task' || source === 'all') {
      const tasks = await prisma.task.findMany({
        where: {
          frameworkType: frameworkId,
          ...(options?.organizationId && { organizationId: options.organizationId }),
          ...(options?.userId && { assigneeId: options.userId }),
          ...(options?.sprintId && { sprintId: options.sprintId }),
          ...(options?.projectId && { projectId: options.projectId }),
        },
        include: {
          assignee: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: [
          { workflowColumn: 'asc' },
          { columnPosition: 'asc' },
        ],
      })

      const taskCards: KanbanCard[] = tasks.map((task) => ({
        id: task.id,
        title: task.name,
        description: task.description || undefined,
        status: task.workflowColumn || task.status,
        frameworkId,
        priority: task.priority as 'low' | 'medium' | 'high' | 'critical',
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        assignee: task.assignee ? {
          id: task.assignee.id,
          name: task.assignee.name,
          email: task.assignee.email,
        } : undefined,
        dueDate: task.dueDate || undefined,
        tags: task.tags || undefined,
        organizationId: task.organizationId,
        columnPosition: task.columnPosition || undefined,
        source: 'task',
        sprintId: task.sprintId || undefined,
        projectId: task.projectId || undefined,
        workflowId: task.workflowId || undefined,
        metadata: {
          type: 'Task',
          controlId: task.controlId || undefined,
          frameworkType: task.frameworkType || undefined,
          storyPoints: task.storyPoints || undefined,
        },
      }))

      cards = [...cards, ...taskCards]
    }

    // TODO: Add FrameworkTask and Workflow fetching
    // (Same logic as in the API route)

    return cards
  } catch (error) {
    console.error('Error fetching Kanban cards from database:', error)
    return []
  }
}

/**
 * Calculates column statistics for a set of cards
 */
export function getColumnStats(cards: KanbanCard[], columnStatus: string) {
  const columnCards = cards.filter((card) => card.status === columnStatus)

  return {
    total: columnCards.length,
    high: columnCards.filter((card) => card.priority === 'high' || card.priority === 'critical').length,
    assigned: columnCards.filter((card) => card.assignee).length,
    overdue: columnCards.filter((card) => card.dueDate && new Date(card.dueDate) < new Date()).length,
  }
}

/**
 * Sorts cards within a column based on position or priority
 */
export function sortCardsInColumn(cards: KanbanCard[], columnStatus: string): KanbanCard[] {
  return cards
    .filter((card) => card.status === columnStatus)
    .sort((a, b) => {
      // First sort by columnPosition if available
      if (a.columnPosition !== undefined && b.columnPosition !== undefined) {
        return a.columnPosition - b.columnPosition
      }

      // Then by priority
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      const aPriority = priorityOrder[a.priority] ?? 2
      const bPriority = priorityOrder[b.priority] ?? 2

      if (aPriority !== bPriority) {
        return aPriority - bPriority
      }

      // Finally by creation date
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
}

/**
 * Recalculates column positions after drag and drop
 */
export function recalculateColumnPositions(
  cards: KanbanCard[],
  movedCardId: string,
  targetStatus: string,
  targetPosition: number
): Array<{ id: string; status: string; position: number; source: string }> {
  const updates: Array<{ id: string; status: string; position: number; source: string }> = []

  // Get all cards in the target column
  const columnCards = cards
    .filter((card) => card.status === targetStatus && card.id !== movedCardId)
    .sort((a, b) => (a.columnPosition || 0) - (b.columnPosition || 0))

  // Insert the moved card at the target position
  columnCards.splice(targetPosition, 0, cards.find((c) => c.id === movedCardId)!)

  // Recalculate positions
  columnCards.forEach((card, index) => {
    updates.push({
      id: card.id,
      status: targetStatus,
      position: index,
      source: card.source || 'task',
    })
  })

  return updates
}
