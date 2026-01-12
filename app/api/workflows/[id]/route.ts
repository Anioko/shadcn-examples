import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ApiResponse, UpdateWorkflowRequest } from '@/lib/types/database'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

/**
 * GET /api/workflows/[id]
 * Get a specific workflow by ID
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
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

    const { data: workflow, error } = await supabase
      .from('workflows')
      .select('*, workspace:workspaces(*), creator:created_by(*)')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: { message: 'Workflow not found', code: 'NOT_FOUND' },
          },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: workflow,
    })
  } catch (error: any) {
    console.error('Error fetching workflow:', error)

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
        error: { message: error.message || 'Failed to fetch workflow' },
      },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/workflows/[id]
 * Update a specific workflow
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
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

    const body: UpdateWorkflowRequest = await request.json()

    // Update workflow
    const updateData: any = {
      ...body,
      last_edited_by: user.id,
      updated_at: new Date().toISOString(),
    }

    const { data: workflow, error } = await supabase
      .from('workflows')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: { message: 'Workflow not found', code: 'NOT_FOUND' },
          },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: workflow,
    })
  } catch (error: any) {
    console.error('Error updating workflow:', error)

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
        error: { message: error.message || 'Failed to update workflow' },
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/workflows/[id]
 * Delete a specific workflow
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
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

    const { error } = await supabase.from('workflows').delete().eq('id', id)

    if (error) throw error

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { message: 'Workflow deleted successfully' },
    })
  } catch (error: any) {
    console.error('Error deleting workflow:', error)

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
        error: { message: error.message || 'Failed to delete workflow' },
      },
      { status: 500 }
    )
  }
}
