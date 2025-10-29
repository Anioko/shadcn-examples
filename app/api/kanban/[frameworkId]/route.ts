import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { KanbanCard } from '@/lib/types/kanban'

/**
 * GET /api/kanban/[frameworkId]
 * Fetches Kanban cards for a specific framework
 *
 * Query Parameters:
 * - organizationId: Filter by organization (required when auth is enabled)
 * - userId: Filter by assigned user (for "My Tasks" view)
 * - source: "task" | "frameworkTask" | "workflow" | "all" (default: "all")
 * - sprintId: Filter by sprint (for agile frameworks)
 * - projectId: Filter by project
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ frameworkId: string }> }
) {
  try {
    const { frameworkId } = await params
    const searchParams = request.nextUrl.searchParams

    // TODO: Add authentication - Get user from session
    // const session = await getServerSession()
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const organizationId = searchParams.get('organizationId') // TODO: Get from session
    const userId = searchParams.get('userId')
    const source = searchParams.get('source') || 'all'
    const sprintId = searchParams.get('sprintId')
    const projectId = searchParams.get('projectId')

    let cards: KanbanCard[] = []

    // Fetch from Task model (general tasks, agile stories, etc.)
    if (source === 'task' || source === 'all') {
      const tasks = await prisma.task.findMany({
        where: {
          frameworkType: frameworkId,
          ...(organizationId && { organizationId }),
          ...(userId && { assigneeId: userId }),
          ...(sprintId && { sprintId }),
          ...(projectId && { projectId }),
        },
        include: {
          assignee: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          sprint: true,
          project: true,
          workflow: true,
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

    // Fetch from FrameworkTask model (compliance-specific tasks)
    if (source === 'frameworkTask' || source === 'all') {
      const frameworkTasks = await prisma.frameworkTask.findMany({
        where: {
          organizationFramework: {
            frameworkTemplate: {
              slug: frameworkId, // Assuming FrameworkTemplate has a slug field
            },
            ...(organizationId && { organizationId }),
          },
          ...(userId && { assigneeId: userId }),
        },
        include: {
          assignee: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          organizationFramework: {
            include: {
              frameworkTemplate: true,
            },
          },
        },
        orderBy: [
          { status: 'asc' },
          { createdAt: 'asc' },
        ],
      })

      const frameworkTaskCards: KanbanCard[] = frameworkTasks.map((task) => {
        // Map FrameworkTaskStatus to Kanban column status
        const statusMap: Record<string, string> = {
          'PENDING': 'backlog',
          'IN_PROGRESS': 'in-progress',
          'REVIEW': 'review',
          'COMPLETED': 'done',
          'BLOCKED': 'blocked',
        }

        return {
          id: task.id,
          title: task.title,
          description: task.description || undefined,
          status: statusMap[task.status] || 'backlog',
          frameworkId,
          priority: task.priority.toLowerCase() as 'low' | 'medium' | 'high' | 'critical',
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          assignee: task.assignee ? {
            id: task.assignee.id,
            name: task.assignee.name,
            email: task.assignee.email,
          } : undefined,
          dueDate: task.dueDate || undefined,
          tags: [task.taskType],
          organizationId: task.organizationFramework.organizationId,
          source: 'frameworkTask',
          metadata: {
            type: task.taskType,
            progress: task.progress,
            dependsOnTaskIds: task.dependsOnTaskIds,
            blockedByTaskIds: task.blockedByTaskIds,
          },
        }
      })

      cards = [...cards, ...frameworkTaskCards]
    }

    // Fetch from Workflow model (framework phase tracking)
    if (source === 'workflow' || source === 'all') {
      const workflows = await prisma.workflow.findMany({
        where: {
          frameworkType: frameworkId,
          ...(organizationId && { organizationId }),
          ...(projectId && { projectId }),
        },
        include: {
          project: true,
        },
        orderBy: [
          { segment: 'asc' },
        ],
      })

      const workflowCards: KanbanCard[] = workflows.map((workflow) => {
        // Map workflow status to Kanban columns
        const statusMap: Record<string, string> = {
          'active': 'in-progress',
          'completed': 'done',
          'planned': 'backlog',
        }

        return {
          id: workflow.id,
          title: workflow.segmentName || workflow.name,
          description: workflow.description || undefined,
          status: statusMap[workflow.status] || 'backlog',
          frameworkId,
          priority: 'medium', // Workflows don't have explicit priority
          createdAt: workflow.createdAt,
          updatedAt: workflow.updatedAt,
          organizationId: workflow.organizationId,
          source: 'workflow',
          projectId: workflow.projectId || undefined,
          metadata: {
            type: 'Workflow Phase',
            frameworkType: workflow.frameworkType,
            segment: workflow.segment,
            segmentName: workflow.segmentName || undefined,
            totalTasks: workflow.totalTasks,
            completedTasks: workflow.completedTasks,
            progressPercent: workflow.progressPercent ? Number(workflow.progressPercent) : undefined,
          },
        }
      })

      cards = [...cards, ...workflowCards]
    }

    return NextResponse.json({ cards, count: cards.length })
  } catch (error) {
    console.error('Error fetching Kanban cards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Kanban cards', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/kanban/[frameworkId]
 * Updates a Kanban card (e.g., move between columns, update assignee)
 *
 * Body: {
 *   cardId: string
 *   source: "task" | "frameworkTask" | "workflow"
 *   updates: {
 *     status?: string
 *     columnPosition?: number
 *     assigneeId?: string
 *     priority?: string
 *   }
 * }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ frameworkId: string }> }
) {
  try {
    const { frameworkId } = await params
    const body = await request.json()

    // TODO: Add authentication and authorization
    // const session = await getServerSession()
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { cardId, source, updates } = body

    if (!cardId || !source) {
      return NextResponse.json(
        { error: 'Missing required fields: cardId, source' },
        { status: 400 }
      )
    }

    // Create audit log entry
    // TODO: Add audit logging when AuditLog model is available

    // Update based on source
    if (source === 'task') {
      const updated = await prisma.task.update({
        where: { id: cardId },
        data: {
          ...(updates.status && { workflowColumn: updates.status }),
          ...(updates.columnPosition !== undefined && { columnPosition: updates.columnPosition }),
          ...(updates.assigneeId !== undefined && { assigneeId: updates.assigneeId }),
          ...(updates.priority && { priority: updates.priority }),
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
      })

      return NextResponse.json({
        success: true,
        card: {
          id: updated.id,
          status: updated.workflowColumn || updated.status,
          columnPosition: updated.columnPosition,
          assignee: updated.assignee,
        }
      })
    }

    if (source === 'frameworkTask') {
      // Map Kanban column status back to FrameworkTaskStatus
      const statusMap: Record<string, string> = {
        'backlog': 'PENDING',
        'in-progress': 'IN_PROGRESS',
        'review': 'REVIEW',
        'done': 'COMPLETED',
        'blocked': 'BLOCKED',
      }

      const updated = await prisma.frameworkTask.update({
        where: { id: cardId },
        data: {
          ...(updates.status && { status: statusMap[updates.status] as any }),
          ...(updates.assigneeId !== undefined && { assigneeId: updates.assigneeId }),
          ...(updates.priority && { priority: updates.priority.toUpperCase() as any }),
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
      })

      return NextResponse.json({
        success: true,
        card: {
          id: updated.id,
          status: updates.status,
          assignee: updated.assignee,
        }
      })
    }

    if (source === 'workflow') {
      const statusMap: Record<string, string> = {
        'backlog': 'planned',
        'in-progress': 'active',
        'done': 'completed',
      }

      const updated = await prisma.workflow.update({
        where: { id: cardId },
        data: {
          ...(updates.status && { status: statusMap[updates.status] || updates.status }),
        },
      })

      return NextResponse.json({
        success: true,
        card: {
          id: updated.id,
          status: updates.status,
        }
      })
    }

    return NextResponse.json(
      { error: 'Invalid source type' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error updating Kanban card:', error)
    return NextResponse.json(
      { error: 'Failed to update Kanban card', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/kanban/[frameworkId]
 * Creates a new Kanban card
 *
 * Body: {
 *   source: "task" | "frameworkTask" | "workflow"
 *   organizationId: string
 *   title: string
 *   description?: string
 *   status?: string
 *   priority?: string
 *   assigneeId?: string
 *   ... other fields based on source
 * }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ frameworkId: string }> }
) {
  try {
    const { frameworkId } = await params
    const body = await request.json()

    // TODO: Add authentication and authorization
    // const session = await getServerSession()
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { source, organizationId, title, description, status, priority, assigneeId } = body

    if (!source || !organizationId || !title) {
      return NextResponse.json(
        { error: 'Missing required fields: source, organizationId, title' },
        { status: 400 }
      )
    }

    if (source === 'task') {
      const newTask = await prisma.task.create({
        data: {
          organizationId,
          name: title,
          description,
          status: status || 'todo',
          workflowColumn: status || 'backlog',
          priority: priority || 'medium',
          assigneeId,
          frameworkType: frameworkId,
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
      })

      return NextResponse.json({ success: true, card: newTask }, { status: 201 })
    }

    // TODO: Add handlers for frameworkTask and workflow creation

    return NextResponse.json(
      { error: 'Source type not yet implemented' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Error creating Kanban card:', error)
    return NextResponse.json(
      { error: 'Failed to create Kanban card', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
