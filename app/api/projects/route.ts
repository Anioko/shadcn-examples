import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/projects
 * Fetches all projects for an organization
 *
 * Query Parameters:
 * - organizationId: Filter by organization (required when auth is enabled)
 * - status: Filter by project status (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // TODO: Add authentication - Get user from session
    // const session = await getServerSession()
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const organizationId = searchParams.get('organizationId')
    const status = searchParams.get('status')

    // Build where clause
    const where: any = {}
    if (organizationId) {
      where.organizationId = organizationId
    }
    if (status) {
      where.status = status
    }

    const projects = await prisma.project.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        priority: true,
        startDate: true,
        endDate: true,
        completionRate: true,
        organizationId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [
        { status: 'asc' }, // Active projects first
        { priority: 'desc' }, // High priority first
        { updatedAt: 'desc' }, // Most recently updated
      ],
    })

    // Transform completionRate to progress for frontend compatibility
    const transformedProjects = projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      priority: project.priority,
      progress: project.completionRate,
      startDate: project.startDate?.toISOString(),
      endDate: project.endDate?.toISOString(),
      organizationId: project.organizationId,
    }))

    return NextResponse.json({
      projects: transformedProjects,
      total: transformedProjects.length,
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/projects
 * Creates a new project
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, status, priority, organizationId, startDate, endDate } = body

    // TODO: Add authentication and validation
    // const session = await getServerSession()
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (!name || !organizationId) {
      return NextResponse.json(
        { error: 'Missing required fields: name and organizationId are required' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        status: status || 'planning',
        priority: priority || 'medium',
        organizationId,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        completionRate: 0,
      },
    })

    return NextResponse.json({
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        priority: project.priority,
        progress: project.completionRate,
        startDate: project.startDate?.toISOString(),
        endDate: project.endDate?.toISOString(),
        organizationId: project.organizationId,
      },
    })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
