import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ApiResponse, CreateVersionRequest } from '@/lib/types/database'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

/**
 * GET /api/workflows/[id]/versions
 * Get all versions of a workflow
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

    const { data: versions, error } = await supabase
      .from('workflow_versions')
      .select('*, creator:created_by(*)')
      .eq('workflow_id', id)
      .order('version_number', { ascending: false })

    if (error) throw error

    return NextResponse.json<ApiResponse>({
      success: true,
      data: versions,
    })
  } catch (error: any) {
    console.error('Error fetching workflow versions:', error)

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
        error: { message: error.message || 'Failed to fetch workflow versions' },
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/workflows/[id]/versions
 * Create a new version of the workflow
 */
export async function POST(request: NextRequest, context: RouteContext) {
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

    const body: CreateVersionRequest = await request.json()

    // Get current workflow data
    const { data: workflow, error: workflowError } = await supabase
      .from('workflows')
      .select('data')
      .eq('id', id)
      .single()

    if (workflowError) throw workflowError

    // Create version
    const { data: version, error } = await supabase
      .from('workflow_versions')
      .insert({
        workflow_id: id,
        data: workflow.data,
        commit_message: body.commit_message || null,
        created_by: user.id,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: version,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating workflow version:', error)

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
        error: { message: error.message || 'Failed to create workflow version' },
      },
      { status: 500 }
    )
  }
}
