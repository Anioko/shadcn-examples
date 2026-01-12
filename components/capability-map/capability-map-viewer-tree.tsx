'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Capability,
  CapabilityMap,
  CapabilityType,
  MATURITY_COLORS,
  IMPORTANCE_COLORS,
  INVESTMENT_COLORS,
} from '@/lib/types/capability-map'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Target, Cog, Shield, Plus, Edit2, Trash2, ChevronDown, ChevronRight } from 'lucide-react'
import { CapabilityFormDialog } from './capability-form-dialog'
import { DeleteConfirmationDialog } from './delete-confirmation-dialog'

type HeatMapMode = 'maturity' | 'importance' | 'investment'

interface CapabilityMapViewerProps {
  capabilityMap: CapabilityMap
  onCapabilityClick?: (capability: Capability) => void
  onCapabilityUpdate?: (capability: Capability) => void
  onCapabilityDelete?: (capabilityId: string) => void
  onCapabilityAdd?: (capability: Capability) => void
  readOnly?: boolean
}

const CAPABILITY_TYPE_CONFIG = {
  strategic: {
    label: 'Strategic Capabilities',
    description: 'High-level capabilities that differentiate the organization',
    icon: Target,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    headerBg: 'bg-blue-100',
    textColor: 'text-blue-900',
  },
  operational: {
    label: 'Operational Capabilities',
    description: 'Core business operations that deliver value to customers',
    icon: Cog,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    headerBg: 'bg-green-100',
    textColor: 'text-green-900',
  },
  supporting: {
    label: 'Supporting Capabilities',
    description: 'Foundational capabilities that enable strategic and operational layers',
    icon: Shield,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    headerBg: 'bg-amber-100',
    textColor: 'text-amber-900',
  },
}

export function CapabilityMapViewer({
  capabilityMap,
  onCapabilityClick,
  onCapabilityUpdate,
  onCapabilityDelete,
  onCapabilityAdd,
  readOnly = false,
}: CapabilityMapViewerProps) {
  const [heatMapMode, setHeatMapMode] = useState<HeatMapMode>('maturity')
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null)
  const [expandedCapabilities, setExpandedCapabilities] = useState<Set<string>>(new Set())

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingCapability, setEditingCapability] = useState<Capability | null>(null)
  const [parentForNewCapability, setParentForNewCapability] = useState<Capability | null>(null)
  const [deletingCapability, setDeletingCapability] = useState<Capability | null>(null)
  const [newCapabilityType, setNewCapabilityType] = useState<CapabilityType>('operational')

  // Group capabilities by type
  const capabilitiesByType = {
    strategic: capabilityMap.capabilities.filter((c) => c.type === 'strategic' && c.level === 0),
    operational: capabilityMap.capabilities.filter((c) => c.type === 'operational' && c.level === 0),
    supporting: capabilityMap.capabilities.filter((c) => c.type === 'supporting' && c.level === 0),
  }

  // Get children of a capability
  const getChildren = (parentId: string): Capability[] => {
    return capabilityMap.capabilities.filter((c) => c.parentId === parentId)
  }

  // Count all descendants (recursive)
  const countDescendants = (capabilityId: string): number => {
    const children = getChildren(capabilityId)
    return children.reduce((count, child) => {
      return count + 1 + countDescendants(child.id)
    }, 0)
  }

  const toggleExpanded = (capabilityId: string) => {
    const newExpanded = new Set(expandedCapabilities)
    if (newExpanded.has(capabilityId)) {
      newExpanded.delete(capabilityId)
    } else {
      newExpanded.add(capabilityId)
    }
    setExpandedCapabilities(newExpanded)
  }

  const getHeatMapColor = (capability: Capability): string => {
    switch (heatMapMode) {
      case 'maturity':
        return MATURITY_COLORS[capability.metrics.maturity]
      case 'importance':
        return IMPORTANCE_COLORS[capability.metrics.strategicImportance]
      case 'investment':
        return INVESTMENT_COLORS[capability.metrics.currentInvestment]
      default:
        return 'bg-gray-300'
    }
  }

  const getHeatMapOpacity = (level: number): string => {
    // Higher levels (more detailed) get more transparent base
    const opacities = ['', 'opacity-90', 'opacity-80', 'opacity-70', 'opacity-60']
    return opacities[level] || 'opacity-60'
  }

  const handleCapabilityClick = (capability: Capability) => {
    setSelectedCapability(capability)
    onCapabilityClick?.(capability)
  }

  // CRUD Handlers
  const handleAddRootCapability = (type: CapabilityType) => {
    setNewCapabilityType(type)
    setParentForNewCapability(null)
    setEditingCapability(null)
    setFormDialogOpen(true)
  }

  const handleAddChildCapability = (parent: Capability) => {
    setParentForNewCapability(parent)
    setEditingCapability(null)
    setFormDialogOpen(true)
  }

  const handleEditCapability = (capability: Capability) => {
    setEditingCapability(capability)
    setParentForNewCapability(null)
    setFormDialogOpen(true)
  }

  const handleDeleteCapability = (capability: Capability) => {
    setDeletingCapability(capability)
    setDeleteDialogOpen(true)
  }

  const handleSaveCapability = (capability: Capability) => {
    if (editingCapability) {
      onCapabilityUpdate?.(capability)
    } else {
      onCapabilityAdd?.(capability)
    }
    setFormDialogOpen(false)
    setEditingCapability(null)
    setParentForNewCapability(null)
  }

  const handleConfirmDelete = () => {
    if (deletingCapability) {
      onCapabilityDelete?.(deletingCapability.id)
    }
    setDeleteDialogOpen(false)
    setDeletingCapability(null)
  }

  const renderCapability = (capability: Capability, depth: number = 0) => {
    const children = getChildren(capability.id)
    const hasChildren = children.length > 0
    const isExpanded = expandedCapabilities.has(capability.id)
    const isSelected = selectedCapability?.id === capability.id

    return (
      <div key={capability.id} className="flex flex-col">
        <Card
          className={cn(
            'relative cursor-pointer transition-all hover:shadow-md border-2',
            getHeatMapColor(capability),
            getHeatMapOpacity(capability.level),
            isSelected && 'ring-4 ring-blue-500 border-blue-600'
          )}
          onClick={() => handleCapabilityClick(capability)}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 flex-1">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpanded(capability.id)
                    }}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                )}
                <h3 className="font-semibold text-sm text-gray-900">{capability.name}</h3>
              </div>

              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs bg-white/80">
                  L{capability.level}
                </Badge>
                {!readOnly && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddChildCapability(capability)
                      }}
                      title="Add sub-capability"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditCapability(capability)
                      }}
                      title="Edit capability"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteCapability(capability)
                      }}
                      title="Delete capability"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {capability.description && (
              <p className="text-xs text-gray-700 mb-2">{capability.description}</p>
            )}

            <div className="flex flex-wrap gap-1 text-xs">
              {capability.metrics.owner && (
                <Badge variant="secondary" className="bg-white/60">
                  Owner: {capability.metrics.owner}
                </Badge>
              )}
              {heatMapMode === 'maturity' && (
                <Badge variant="secondary" className="bg-white/60">
                  Maturity: {capability.metrics.maturity}/5
                </Badge>
              )}
              {heatMapMode === 'importance' && (
                <Badge variant="secondary" className="bg-white/60">
                  Importance: {capability.metrics.strategicImportance}
                </Badge>
              )}
              {heatMapMode === 'investment' && (
                <Badge variant="secondary" className="bg-white/60">
                  Investment: {capability.metrics.currentInvestment}
                </Badge>
              )}
            </div>
          </div>
        </Card>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div className="ml-6 mt-2 space-y-2 border-l-2 border-gray-300 pl-4">
            {children.map((child) => renderCapability(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  const renderCapabilityBand = (type: CapabilityType) => {
    const config = CAPABILITY_TYPE_CONFIG[type]
    const Icon = config.icon
    const capabilities = capabilitiesByType[type]

    return (
      <div key={type} className={cn('rounded-lg border-2 overflow-hidden', config.borderColor)}>
        {/* Band Header */}
        <div className={cn('px-6 py-4', config.headerBg)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className={cn('h-6 w-6', config.textColor)} />
              <div>
                <h3 className={cn('text-lg font-bold', config.textColor)}>{config.label}</h3>
                <p className={cn('text-sm', config.textColor, 'opacity-80')}>
                  {config.description}
                </p>
              </div>
            </div>
            {!readOnly && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddRootCapability(type)}
                className={cn('bg-white/80 hover:bg-white', config.textColor)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Capability
              </Button>
            )}
          </div>
        </div>

        {/* Band Content */}
        <div className={cn('p-6 space-y-3', config.bgColor)}>
          {capabilities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No {type} capabilities yet.</p>
              {!readOnly && (
                <p className="text-xs mt-1">Click "Add Capability" to create one.</p>
              )}
            </div>
          ) : (
            capabilities.map((capability) => renderCapability(capability))
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <Card className="w-full">
        {/* Control Panel */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{capabilityMap.name}</h2>
              {capabilityMap.description && (
                <p className="text-sm text-muted-foreground mt-1">{capabilityMap.description}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Heat Map:</span>
              <Select
                value={heatMapMode}
                onValueChange={(value) => setHeatMapMode(value as HeatMapMode)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maturity">Maturity Level</SelectItem>
                  <SelectItem value="importance">Strategic Importance</SelectItem>
                  <SelectItem value="investment">Current Investment</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Expand all capabilities
                  const allIds = new Set(capabilityMap.capabilities.map((c) => c.id))
                  setExpandedCapabilities(allIds)
                }}
              >
                Expand All
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setExpandedCapabilities(new Set())}
              >
                Collapse All
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Capability Map with Segmented Bands */}
        <CardContent className="space-y-6">
          {renderCapabilityBand('strategic')}
          {renderCapabilityBand('operational')}
          {renderCapabilityBand('supporting')}
        </CardContent>

        {/* Legend */}
        <div className="px-6 pb-6">
          <div className="flex flex-wrap items-center gap-6 p-4 bg-muted/50 rounded-lg">
            <span className="text-sm font-semibold">Legend:</span>
            {heatMapMode === 'maturity' && (
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-red-500" />
                  <span className="text-xs">1-Initial</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-orange-500" />
                  <span className="text-xs">2-Developing</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-yellow-500" />
                  <span className="text-xs">3-Defined</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-lime-500" />
                  <span className="text-xs">4-Managed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-green-500" />
                  <span className="text-xs">5-Optimized</span>
                </div>
              </div>
            )}
            {heatMapMode === 'importance' && (
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-400" />
                  <span className="text-xs">Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-blue-400" />
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-purple-500" />
                  <span className="text-xs">High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-red-600" />
                  <span className="text-xs">Critical</span>
                </div>
              </div>
            )}
            {heatMapMode === 'investment' && (
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-300" />
                  <span className="text-xs">None</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-blue-300" />
                  <span className="text-xs">Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-blue-500" />
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-blue-700" />
                  <span className="text-xs">High</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Dialogs */}
      <CapabilityFormDialog
        open={formDialogOpen}
        onClose={() => {
          setFormDialogOpen(false)
          setEditingCapability(null)
          setParentForNewCapability(null)
        }}
        onSave={handleSaveCapability}
        capability={editingCapability}
        parentCapability={parentForNewCapability}
        suggestedType={newCapabilityType}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false)
          setDeletingCapability(null)
        }}
        onConfirm={handleConfirmDelete}
        capability={deletingCapability}
        childrenCount={deletingCapability ? countDescendants(deletingCapability.id) : 0}
      />
    </>
  )
}
