"use client"

import { useState, useEffect } from "react"
import { WorkflowNode, WorkflowBoardConfig } from "@/lib/types/workflow"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface WorkflowNodeEditDialogProps {
  node: WorkflowNode | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (node: WorkflowNode) => void
  assignees?: Array<{ id: string; name: string }>
  config?: WorkflowBoardConfig
}

export function WorkflowNodeEditDialog({
  node,
  open,
  onOpenChange,
  onSave,
  assignees = [],
  config,
}: WorkflowNodeEditDialogProps) {
  const [editedNode, setEditedNode] = useState<WorkflowNode | null>(null)

  useEffect(() => {
    if (node) {
      setEditedNode({ ...node })
    }
  }, [node])

  if (!editedNode) return null

  // Framework-aware element type detection
  // ArchiMate elements should not show BPMN-specific fields
  const bpmnTypes = ["start", "end", "task", "decision", "parallel", "event", "subprocess", "gateway"]
  const isArchimateElement = config?.frameworkId === 'archimate3.2' || !bpmnTypes.includes(editedNode.type)

  const handleSave = () => {
    onSave(editedNode)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {isArchimateElement ? "Element" : "Node"}</DialogTitle>
          <DialogDescription>
            {isArchimateElement
              ? "Update ArchiMate element name and documentation"
              : "Update node details, type, and metadata information"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Node Label */}
          <div className="grid gap-2">
            <Label htmlFor="label">{isArchimateElement ? "Element Name" : "Node Label"}</Label>
            <Input
              id="label"
              value={editedNode.label}
              onChange={(e) =>
                setEditedNode({ ...editedNode, label: e.target.value })
              }
              placeholder={isArchimateElement ? "Enter element name" : "Enter node label"}
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">{isArchimateElement ? "Documentation" : "Description"}</Label>
            <Textarea
              id="description"
              value={editedNode.description || ""}
              onChange={(e) =>
                setEditedNode({ ...editedNode, description: e.target.value })
              }
              placeholder={isArchimateElement ? "Enter element documentation" : "Enter node description"}
              rows={4}
            />
          </div>

          {/* Node Type - Read-only for ArchiMate */}
          <div className="grid gap-2">
            <Label htmlFor="type">{isArchimateElement ? "Element Type" : "Node Type"}</Label>
            {isArchimateElement ? (
              <Input
                id="type"
                value={editedNode.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                disabled
                className="bg-muted"
              />
            ) : (
              <Select
                value={editedNode.type}
                onValueChange={(value) =>
                  setEditedNode({ ...editedNode, type: value as WorkflowNode["type"] })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select node type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Start</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="decision">Decision</SelectItem>
                  <SelectItem value="parallel">Parallel</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="subprocess">Subprocess</SelectItem>
                  <SelectItem value="gateway">Gateway</SelectItem>
                  <SelectItem value="end">End</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* BPMN-specific fields */}
          {!isArchimateElement && (
            <>
              {/* Status */}
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editedNode.status}
                  onValueChange={(value) =>
                    setEditedNode({ ...editedNode, status: value as WorkflowNode["status"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Metadata - Duration */}
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (optional)</Label>
                <Input
                  id="duration"
                  value={editedNode.metadata?.duration || ""}
                  onChange={(e) =>
                    setEditedNode({
                      ...editedNode,
                      metadata: {
                        ...editedNode.metadata,
                        duration: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g. 5 min, 2 hours"
                />
              </div>

              {/* Metadata - Assignee */}
              <div className="grid gap-2">
                <Label htmlFor="assignee">Assignee (optional)</Label>
                <Select
                  value={editedNode.metadata?.assignee || "unassigned"}
                  onValueChange={(value) => {
                    if (value === "unassigned") {
                      const { assignee, ...restMetadata } = editedNode.metadata || {}
                      setEditedNode({
                        ...editedNode,
                        metadata: restMetadata,
                      })
                    } else {
                      const assignee = assignees.find((a) => a.id === value)
                      if (assignee) {
                        setEditedNode({
                          ...editedNode,
                          metadata: {
                            ...editedNode.metadata,
                            assignee: assignee.name,
                          },
                        })
                      } else {
                        setEditedNode({
                          ...editedNode,
                          metadata: {
                            ...editedNode.metadata,
                            assignee: value,
                          },
                        })
                      }
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {assignees.map((assignee) => (
                      <SelectItem key={assignee.id} value={assignee.id}>
                        {assignee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Metadata - Automation */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="automation">Automated</Label>
                  <div className="text-sm text-muted-foreground">
                    Mark this node as automated
                  </div>
                </div>
                <Switch
                  id="automation"
                  checked={editedNode.metadata?.automation || false}
                  onCheckedChange={(checked) =>
                    setEditedNode({
                      ...editedNode,
                      metadata: {
                        ...editedNode.metadata,
                        automation: checked,
                      },
                    })
                  }
                />
              </div>

              {/* Metadata - SLA */}
              <div className="grid gap-2">
                <Label htmlFor="sla">SLA (optional)</Label>
                <Input
                  id="sla"
                  value={editedNode.metadata?.sla || ""}
                  onChange={(e) =>
                    setEditedNode({
                      ...editedNode,
                      metadata: {
                        ...editedNode.metadata,
                        sla: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g. P1: 1hr, P2: 4hr"
                />
              </div>
            </>
          )}

          {/* ArchiMate-specific optional properties field */}
          {isArchimateElement && (
            <div className="grid gap-2">
              <Label htmlFor="properties">Properties (optional)</Label>
              <Textarea
                id="properties"
                value={editedNode.metadata?.properties || ""}
                onChange={(e) =>
                  setEditedNode({
                    ...editedNode,
                    metadata: {
                      ...editedNode.metadata,
                      properties: e.target.value,
                    },
                  })
                }
                placeholder="Additional properties or notes"
                rows={2}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
