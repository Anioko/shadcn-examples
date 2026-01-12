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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Capability,
  CapabilityType,
  ApplicationCapability,
  ApplicationCapabilityDomain,
  CapabilityLevel,
  MaturityLevel,
  StrategicImportance,
  InvestmentLevel,
} from '@/lib/types/capability-map'

interface CapabilityFormDialogProps {
  open: boolean
  onClose: () => void
  onSave: (capability: Capability | ApplicationCapability) => void
  capability?: Capability | ApplicationCapability | null // For editing existing capability
  parentCapability?: Capability | ApplicationCapability | null // For creating child capabilities
  suggestedType?: CapabilityType | ApplicationCapabilityDomain // Pre-fill type/domain based on context
  suggestedLevel?: CapabilityLevel // Pre-fill level based on context
  isApplicationCapability?: boolean // Whether this is for application capabilities
}

export function CapabilityFormDialog({
  open,
  onClose,
  onSave,
  capability,
  parentCapability,
  suggestedType,
  suggestedLevel,
  isApplicationCapability = false,
}: CapabilityFormDialogProps) {
  const isEditMode = !!capability
  const isChildMode = !!parentCapability

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    typeOrDomain: (suggestedType || (isApplicationCapability ? 'application-services' : 'operational')) as CapabilityType | ApplicationCapabilityDomain,
    level: (suggestedLevel || 0) as CapabilityLevel,
    maturity: 3 as MaturityLevel,
    strategicImportance: 'medium' as StrategicImportance,
    currentInvestment: 'medium' as InvestmentLevel,
    plannedInvestment: 'medium' as InvestmentLevel,
    owner: '',
    riskLevel: 'medium' as 'low' | 'medium' | 'high',
  })

  // Initialize form data when dialog opens
  useEffect(() => {
    if (capability) {
      // Edit mode - load existing capability
      const typeOrDomain = 'type' in capability ? capability.type : capability.domain
      setFormData({
        name: capability.name,
        description: capability.description || '',
        typeOrDomain: typeOrDomain,
        level: capability.level,
        maturity: capability.metrics.maturity,
        strategicImportance: capability.metrics.strategicImportance,
        currentInvestment: capability.metrics.currentInvestment,
        plannedInvestment: capability.metrics.plannedInvestment,
        owner: capability.metrics.owner || '',
        riskLevel: capability.metrics.riskLevel || 'medium',
      })
    } else if (parentCapability) {
      // Child mode - inherit from parent
      const parentTypeOrDomain = 'type' in parentCapability ? parentCapability.type : parentCapability.domain
      setFormData({
        name: '',
        description: '',
        typeOrDomain: parentTypeOrDomain, // Inherit parent's type/domain
        level: (parentCapability.level + 1) as CapabilityLevel, // One level deeper
        maturity: 3,
        strategicImportance: 'medium',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: '',
        riskLevel: 'medium',
      })
    } else {
      // New root capability mode
      setFormData({
        name: '',
        description: '',
        typeOrDomain: suggestedType || (isApplicationCapability ? 'application-services' : 'operational'),
        level: suggestedLevel || 0,
        maturity: 3,
        strategicImportance: 'medium',
        currentInvestment: 'medium',
        plannedInvestment: 'medium',
        owner: '',
        riskLevel: 'medium',
      })
    }
  }, [capability, parentCapability, suggestedType, suggestedLevel, isApplicationCapability, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isApplicationCapability) {
      const newCapability: ApplicationCapability = {
        id: capability?.id || `${formData.typeOrDomain}-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        domain: formData.typeOrDomain as ApplicationCapabilityDomain,
        level: formData.level,
        parentId: parentCapability?.id,
        metrics: {
          maturity: formData.maturity,
          strategicImportance: formData.strategicImportance,
          currentInvestment: formData.currentInvestment,
          plannedInvestment: formData.plannedInvestment,
          owner: formData.owner || undefined,
          riskLevel: formData.riskLevel,
        },
      }
      onSave(newCapability)
    } else {
      const newCapability: Capability = {
        id: capability?.id || `${formData.typeOrDomain}-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        type: formData.typeOrDomain as CapabilityType,
        level: formData.level,
        parentId: parentCapability?.id,
        metrics: {
          maturity: formData.maturity,
          strategicImportance: formData.strategicImportance,
          currentInvestment: formData.currentInvestment,
          plannedInvestment: formData.plannedInvestment,
          owner: formData.owner || undefined,
          riskLevel: formData.riskLevel,
        },
      }
      onSave(newCapability)
    }

    onClose()
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode
              ? 'Edit Capability'
              : isChildMode
              ? `Add Sub-Capability to "${parentCapability.name}"`
              : 'Add New Capability'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update the capability details below'
              : isChildMode
              ? `Create a new Level ${formData.level} sub-capability under ${parentCapability.name}`
              : 'Create a new capability at the root level'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Basic Information</h3>

            <div className="space-y-2">
              <Label htmlFor="name">Capability Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Customer Engagement, Data Architecture"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe what this capability encompasses..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="typeOrDomain">{isApplicationCapability ? 'Application Domain *' : 'Capability Type *'}</Label>
                <Select
                  value={formData.typeOrDomain}
                  onValueChange={(value) => handleChange('typeOrDomain', value)}
                  disabled={isChildMode} // Can't change type/domain for child capabilities
                >
                  <SelectTrigger id="typeOrDomain">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {isApplicationCapability ? (
                      <>
                        <SelectItem value="user-experience">User Experience</SelectItem>
                        <SelectItem value="application-services">Application Services</SelectItem>
                        <SelectItem value="data-storage">Data & Storage</SelectItem>
                        <SelectItem value="security-identity">Security & Identity</SelectItem>
                        <SelectItem value="devops-platform">DevOps & Platform</SelectItem>
                        <SelectItem value="ai-analytics">AI & Analytics</SelectItem>
                        <SelectItem value="communication">Communication</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="strategic">Strategic</SelectItem>
                        <SelectItem value="operational">Operational</SelectItem>
                        <SelectItem value="supporting">Supporting</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Hierarchy Level *</Label>
                <Select
                  value={formData.level.toString()}
                  onValueChange={(value) => handleChange('level', parseInt(value))}
                  disabled={isChildMode} // Auto-calculated for child capabilities
                >
                  <SelectTrigger id="level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Level 0 (Domain)</SelectItem>
                    <SelectItem value="1">Level 1 (Capability)</SelectItem>
                    <SelectItem value="2">Level 2 (Sub-capability)</SelectItem>
                    <SelectItem value="3">Level 3 (Component)</SelectItem>
                    <SelectItem value="4">Level 4 (Sub-component)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner">Owner</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => handleChange('owner', e.target.value)}
                placeholder="e.g., Chief Technology Officer, VP Product"
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Capability Metrics</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maturity">Maturity Level</Label>
                <Select
                  value={formData.maturity.toString()}
                  onValueChange={(value) => handleChange('maturity', parseInt(value))}
                >
                  <SelectTrigger id="maturity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {isApplicationCapability ? (
                      <>
                        <SelectItem value="1">1 - Not Implemented</SelectItem>
                        <SelectItem value="2">2 - Basic/MVP</SelectItem>
                        <SelectItem value="3">3 - Functional</SelectItem>
                        <SelectItem value="4">4 - Advanced</SelectItem>
                        <SelectItem value="5">5 - Optimized/Leading</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="1">1 - Initial</SelectItem>
                        <SelectItem value="2">2 - Developing</SelectItem>
                        <SelectItem value="3">3 - Defined</SelectItem>
                        <SelectItem value="4">4 - Managed</SelectItem>
                        <SelectItem value="5">5 - Optimized</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="strategicImportance">Strategic Importance</Label>
                <Select
                  value={formData.strategicImportance}
                  onValueChange={(value) => handleChange('strategicImportance', value)}
                >
                  <SelectTrigger id="strategicImportance">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentInvestment">Current Investment</Label>
                <Select
                  value={formData.currentInvestment}
                  onValueChange={(value) => handleChange('currentInvestment', value)}
                >
                  <SelectTrigger id="currentInvestment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plannedInvestment">Planned Investment</Label>
                <Select
                  value={formData.plannedInvestment}
                  onValueChange={(value) => handleChange('plannedInvestment', value)}
                >
                  <SelectTrigger id="plannedInvestment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="riskLevel">Risk Level</Label>
                <Select
                  value={formData.riskLevel}
                  onValueChange={(value) => handleChange('riskLevel', value)}
                >
                  <SelectTrigger id="riskLevel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? 'Update Capability' : 'Create Capability'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
