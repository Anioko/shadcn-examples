'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CapabilityMap, CapabilityTypeDescriptions } from '@/lib/types/capability-map'
import { Target, Cog, Shield } from 'lucide-react'

interface CapabilityTypeDescriptionsDialogProps {
  open: boolean
  onClose: () => void
  onSave: (descriptions: CapabilityTypeDescriptions) => void
  capabilityMap: CapabilityMap
}

const DEFAULT_DESCRIPTIONS: CapabilityTypeDescriptions = {
  strategic: 'High-level capabilities that differentiate the organization',
  operational: 'Core business operations that deliver value to customers',
  supporting: 'Foundational capabilities that enable strategic and operational layers',
}

export function CapabilityTypeDescriptionsDialog({
  open,
  onClose,
  onSave,
  capabilityMap,
}: CapabilityTypeDescriptionsDialogProps) {
  const [strategic, setStrategic] = useState(
    capabilityMap.typeDescriptions?.strategic || DEFAULT_DESCRIPTIONS.strategic
  )
  const [operational, setOperational] = useState(
    capabilityMap.typeDescriptions?.operational || DEFAULT_DESCRIPTIONS.operational
  )
  const [supporting, setSupporting] = useState(
    capabilityMap.typeDescriptions?.supporting || DEFAULT_DESCRIPTIONS.supporting
  )

  // Update form when capabilityMap changes
  useEffect(() => {
    setStrategic(capabilityMap.typeDescriptions?.strategic || DEFAULT_DESCRIPTIONS.strategic)
    setOperational(capabilityMap.typeDescriptions?.operational || DEFAULT_DESCRIPTIONS.operational)
    setSupporting(capabilityMap.typeDescriptions?.supporting || DEFAULT_DESCRIPTIONS.supporting)
  }, [capabilityMap])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const descriptions: CapabilityTypeDescriptions = {
      strategic: strategic.trim() || DEFAULT_DESCRIPTIONS.strategic,
      operational: operational.trim() || DEFAULT_DESCRIPTIONS.operational,
      supporting: supporting.trim() || DEFAULT_DESCRIPTIONS.supporting,
    }

    onSave(descriptions)
    onClose()
  }

  const handleCancel = () => {
    // Reset form to original values
    setStrategic(capabilityMap.typeDescriptions?.strategic || DEFAULT_DESCRIPTIONS.strategic)
    setOperational(capabilityMap.typeDescriptions?.operational || DEFAULT_DESCRIPTIONS.operational)
    setSupporting(capabilityMap.typeDescriptions?.supporting || DEFAULT_DESCRIPTIONS.supporting)
    onClose()
  }

  const handleReset = () => {
    setStrategic(DEFAULT_DESCRIPTIONS.strategic)
    setOperational(DEFAULT_DESCRIPTIONS.operational)
    setSupporting(DEFAULT_DESCRIPTIONS.supporting)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Capability Type Descriptions</DialogTitle>
          <DialogDescription>
            Customize the descriptions for each capability type. These descriptions help explain
            the purpose and scope of each capability layer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Strategic Capabilities */}
          <div className="space-y-2">
            <Label htmlFor="strategic-desc" className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              Strategic Capabilities
            </Label>
            <Textarea
              id="strategic-desc"
              value={strategic}
              onChange={(e) => setStrategic(e.target.value)}
              placeholder="Describe strategic capabilities..."
              rows={2}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              High-level capabilities that define competitive advantage and long-term direction.
            </p>
          </div>

          {/* Operational Capabilities */}
          <div className="space-y-2">
            <Label htmlFor="operational-desc" className="flex items-center gap-2">
              <Cog className="h-4 w-4 text-green-600" />
              Operational Capabilities
            </Label>
            <Textarea
              id="operational-desc"
              value={operational}
              onChange={(e) => setOperational(e.target.value)}
              placeholder="Describe operational capabilities..."
              rows={2}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Core business processes and functions that directly deliver value.
            </p>
          </div>

          {/* Supporting Capabilities */}
          <div className="space-y-2">
            <Label htmlFor="supporting-desc" className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-600" />
              Supporting Capabilities
            </Label>
            <Textarea
              id="supporting-desc"
              value={supporting}
              onChange={(e) => setSupporting(e.target.value)}
              placeholder="Describe supporting capabilities..."
              rows={2}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Foundational enablers like IT, HR, and Finance that support operations.
            </p>
          </div>

          <DialogFooter className="flex items-center justify-between sm:justify-between">
            <Button type="button" variant="outline" onClick={handleReset} className="mr-auto">
              Reset to Defaults
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
