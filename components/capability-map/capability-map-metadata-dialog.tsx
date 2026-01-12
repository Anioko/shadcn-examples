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
import { CapabilityMap } from '@/lib/types/capability-map'

interface CapabilityMapMetadataDialogProps {
  open: boolean
  onClose: () => void
  onSave: (name: string, description: string) => void
  capabilityMap: CapabilityMap
}

export function CapabilityMapMetadataDialog({
  open,
  onClose,
  onSave,
  capabilityMap,
}: CapabilityMapMetadataDialogProps) {
  const [name, setName] = useState(capabilityMap.name)
  const [description, setDescription] = useState(capabilityMap.description || '')

  // Update form when capabilityMap changes
  useEffect(() => {
    setName(capabilityMap.name)
    setDescription(capabilityMap.description || '')
  }, [capabilityMap])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      return
    }

    onSave(name.trim(), description.trim())
    onClose()
  }

  const handleCancel = () => {
    // Reset form to original values
    setName(capabilityMap.name)
    setDescription(capabilityMap.description || '')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Capability Map Details</DialogTitle>
          <DialogDescription>
            Update the name and description of your capability map. This will be displayed in
            the header and in all exported files.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="map-name">
              Capability Map Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="map-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter capability map name"
              required
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Example: Enterprise Business Capabilities, Digital Transformation Roadmap
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="map-description">Description</Label>
            <Textarea
              id="map-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description of this capability map"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Provide a brief overview of what this capability map represents and its purpose.
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
