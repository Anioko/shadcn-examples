import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type {
  CreateWorkflowRequest,
  ApiResponse,
  Workflow,
  WorkflowFilters,
} from '@/lib/types/database'

/**
 * GET /api/workflows
 * List all workflows accessible to the current user
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: { message: 'Unauthorized', code: 'UNAUTHORIZED' },
        },
        { status: 401 }
      )
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const workspaceId = searchParams.get('workspace_id')
    const type = searchParams.get('type')
    const isArchived = searchParams.get('is_archived') === 'true'
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('per_page') || '20')

    // Build query
    let query = supabase
      .from('workflows')
      .select('*, workspace:workspaces(*)', { count: 'exact' })
      .eq('is_archived', isArchived)
      .order('updated_at', { ascending: false })
      .range((page - 1) * perPage, page * perPage - 1)

    // Apply filters
    if (workspaceId) query = query.eq('workspace_id', workspaceId)
    if (type) query = query.eq('type', type)
    if (search) query = query.ilike('name', `%${search}%`)

    const { data: workflows, error, count } = await query

    if (error) throw error

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        workflows,
        pagination: {
          total: count || 0,
          page,
          per_page: perPage,
          has_next: count ? page * perPage < count : false,
          has_prev: page > 1,
        },
      },
    })
  } catch (error: any) {
    console.error('Error fetching workflows:', error)

    // Check if it's a Supabase configuration error
    if (error.message && error.message.includes('Supabase is not configured')) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: {
            message: 'Database not configured. Please configure Supabase credentials in .env.local',
            code: 'CONFIG_ERROR'
          },
        },
        { status: 503 }
      )
    }

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: { message: error.message || 'Failed to fetch workflows' },
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/workflows
 * Create a new workflow
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: { message: 'Unauthorized', code: 'UNAUTHORIZED' },
        },
        { status: 401 }
      )
    }

    const body: CreateWorkflowRequest = await request.json()

    // Validate required fields
    if (!body.workspace_id || !body.name || !body.type) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: { message: 'Missing required fields', code: 'VALIDATION_ERROR' },
        },
        { status: 400 }
      )
    }

    // Create workflow
    const { data: workflow, error } = await supabase
      .from('workflows')
      .insert({
        workspace_id: body.workspace_id,
        name: body.name,
        description: body.description || null,
        type: body.type,
        data: body.data || { nodes: [], edges: [] },
        is_template: body.is_template || false,
        created_by: user.id,
        last_edited_by: user.id,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: workflow,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating workflow:', error)

    // Check if it's a Supabase configuration error
    if (error.message && error.message.includes('Supabase is not configured')) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: {
            message: 'Database not configured. Please configure Supabase credentials in .env.local',
            code: 'CONFIG_ERROR'
          },
        },
        { status: 503 }
      )
    }

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: { message: error.message || 'Failed to create workflow' },
      },
      { status: 500 }
    )
  }
}
