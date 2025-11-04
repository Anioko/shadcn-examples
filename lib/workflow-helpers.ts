/**
 * Workflow Helper Utilities
 * Functions for transforming database models to Workflow nodes/edges
 */

import { WorkflowNode, WorkflowEdge } from '@/lib/types/workflow'

/**
 * Fetches Workflow data from the API
 */
export async function fetchWorkflowData(
  frameworkId: string,
  options?: {
    organizationId?: string
    userId?: string
  }
): Promise<{ nodes: WorkflowNode[]; edges: WorkflowEdge[] }> {
  try {
    const params = new URLSearchParams({
      ...(options?.organizationId && { organizationId: options.organizationId }),
      ...(options?.userId && { userId: options.userId }),
    })

    const url = `/api/workflow/${frameworkId}${params.toString() ? `?${params.toString()}` : ''}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch Workflow data: ${response.statusText}`)
    }

    const data = await response.json()
    return { nodes: data.nodes || [], edges: data.edges || [] }
  } catch (error) {
    console.error('Error fetching Workflow data:', error)
    return { nodes: [], edges: [] }
  }
}

/**
 * Updates a Workflow node via API
 */
export async function updateWorkflowNode(
  frameworkId: string,
  nodeId: string,
  updates: Partial<WorkflowNode>
): Promise<{ success: boolean; node?: WorkflowNode; error?: string }> {
  try {
    const response = await fetch(`/api/workflow/${frameworkId}/node`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nodeId,
        updates,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to update node')
    }

    const data = await response.json()
    return { success: true, node: data.node }
  } catch (error) {
    console.error('Error updating Workflow node:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update node',
    }
  }
}

/**
 * Server-side fetch for Workflow data (for use in Server Components)
 */
export async function getWorkflowDataServer(
  frameworkId: string,
  options?: {
    organizationId?: string
    userId?: string
  }
): Promise<{ nodes: WorkflowNode[]; edges: WorkflowEdge[] }> {
  // This would connect to your database in production
  // For now, return empty data
  return { nodes: [], edges: [] }
}
