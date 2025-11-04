"use client"

import { useState, useEffect } from "react"
import { WorkflowEdge } from "@/lib/types/workflow"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface WorkflowEdgeEditDialogProps {
  edge: WorkflowEdge | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (edge: WorkflowEdge) => void
}

export function WorkflowEdgeEditDialog({
  edge,
  open,
  onOpenChange,
  onSave,
}: WorkflowEdgeEditDialogProps) {
  const [editedEdge, setEditedEdge] = useState<WorkflowEdge | null>(null)
  const [customLabel, setCustomLabel] = useState("")
  const [isCustom, setIsCustom] = useState(false)

  useEffect(() => {
    if (edge) {
      setEditedEdge({ ...edge })
      // Check if it's a custom relationship (has archimateRelationType but not one of the standard ones)
      const standardTypes = [
        "composition", "aggregation", "assignment", "realization",
        "serving", "access", "influence", "association",
        "triggering", "flow", "specialization"
      ]
      const isCustomRel = edge.archimateRelationType && !standardTypes.includes(edge.archimateRelationType)
      setIsCustom(isCustomRel || false)
      setCustomLabel(isCustomRel ? (edge.label || "") : "")
    }
  }, [edge])

  if (!editedEdge) return null

  // Detect if this is an ArchiMate relationship
  const isArchimateRelationship = editedEdge.type?.startsWith("archimate") || editedEdge.archimateRelationType

  const handleSave = () => {
    onSave(editedEdge)
    onOpenChange(false)
  }

  const handleRelationshipTypeChange = (value: string) => {
    if (value === "custom") {
      setIsCustom(true)
      setEditedEdge({
        ...editedEdge,
        archimateRelationType: undefined,
        label: customLabel,
        type: "default"
      })
    } else {
      setIsCustom(false)
      setEditedEdge({
        ...editedEdge,
        archimateRelationType: value as WorkflowEdge["archimateRelationType"],
        label: value,
        type: "archimate-structural" // Will be updated based on the type
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit {isArchimateRelationship ? "Relationship" : "Connection"}</DialogTitle>
          <DialogDescription>
            {isArchimateRelationship
              ? "Select ArchiMate 3.2 relationship type or define custom"
              : "Update connection label, condition, and type"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {isArchimateRelationship ? (
            // ArchiMate Mode - Simplified UX
            <>
              {/* ArchiMate Relationship Type - Primary Dropdown */}
              <div className="grid gap-2">
                <Label htmlFor="archimate-relation">Relationship Type</Label>
                <Select
                  value={isCustom ? "custom" : (editedEdge.archimateRelationType || "")}
                  onValueChange={handleRelationshipTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship type" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px]">
                    <SelectGroup>
                      <SelectLabel>Structural Relationships</SelectLabel>
                      <SelectItem value="composition">Composition (solid blue ◆)</SelectItem>
                      <SelectItem value="aggregation">Aggregation (solid purple ◇)</SelectItem>
                      <SelectItem value="assignment">Assignment (solid green ●)</SelectItem>
                      <SelectItem value="realization">Realization (dashed amber →)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Dependency Relationships</SelectLabel>
                      <SelectItem value="serving">Serving (solid cyan →)</SelectItem>
                      <SelectItem value="access">Access (dashed lime →)</SelectItem>
                      <SelectItem value="influence">Influence (dashed pink →)</SelectItem>
                      <SelectItem value="association">Association (solid slate —)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Dynamic Relationships</SelectLabel>
                      <SelectItem value="triggering">Triggering (solid orange →)</SelectItem>
                      <SelectItem value="flow">Flow (dashed indigo →)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Other Relationships</SelectLabel>
                      <SelectItem value="specialization">Specialization (solid purple ▷)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Custom</SelectLabel>
                      <SelectItem value="custom">✏️ Custom Relationship</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Label Input - Only shown when "Custom" is selected */}
              {isCustom && (
                <div className="grid gap-2">
                  <Label htmlFor="custom-label">Custom Relationship Name</Label>
                  <Input
                    id="custom-label"
                    value={customLabel}
                    onChange={(e) => {
                      setCustomLabel(e.target.value)
                      setEditedEdge({ ...editedEdge, label: e.target.value })
                    }}
                    placeholder="e.g. depends on, requires, validates"
                  />
                </div>
              )}

              {/* Optional Description */}
              <div className="grid gap-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  value={editedEdge.condition || ""}
                  onChange={(e) =>
                    setEditedEdge({ ...editedEdge, condition: e.target.value })
                  }
                  placeholder="Additional context about this relationship"
                />
              </div>
            </>
          ) : (
            // BPMN/Standard Mode - Original UX
            <>
              {/* Edge Label */}
              <div className="grid gap-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={editedEdge.label || ""}
                  onChange={(e) =>
                    setEditedEdge({ ...editedEdge, label: e.target.value })
                  }
                  placeholder="e.g. Yes, No, Approved"
                />
              </div>

              {/* Condition */}
              <div className="grid gap-2">
                <Label htmlFor="condition">Condition (optional)</Label>
                <Input
                  id="condition"
                  value={editedEdge.condition || ""}
                  onChange={(e) =>
                    setEditedEdge({ ...editedEdge, condition: e.target.value })
                  }
                  placeholder="e.g. priority == 1, stock > 0"
                />
              </div>

              {/* Edge Type */}
              <div className="grid gap-2">
                <Label htmlFor="type">Connection Type</Label>
                <Select
                  value={editedEdge.type || "default"}
                  onValueChange={(value) =>
                    setEditedEdge({ ...editedEdge, type: value as WorkflowEdge["type"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="conditional">Conditional</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
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
