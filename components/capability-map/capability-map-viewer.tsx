'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Capability,
  CapabilityMap,
  CapabilityType,
  CapabilityTypeDescriptions,
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
import {
  Target,
  Cog,
  Shield,
  Plus,
  Edit2,
  Trash2,
  Lightbulb,
  Users,
  Briefcase,
  TrendingUp,
  Database,
  Lock,
  DollarSign,
  FileText,
  Building2,
  Zap,
  Settings,
  BarChart3,
  Package,
  ShoppingCart,
  MessageSquare,
  Award,
  Layers,
} from 'lucide-react'
import { CapabilityFormDialog } from './capability-form-dialog'
import { DeleteConfirmationDialog } from './delete-confirmation-dialog'
import { CapabilityMapMetadataDialog } from './capability-map-metadata-dialog'
import { CapabilityTypeDescriptionsDialog } from './capability-type-descriptions-dialog'

type HeatMapMode = 'maturity' | 'importance' | 'investment'

interface CapabilityMapViewerProps {
  capabilityMap: CapabilityMap
  onCapabilityClick?: (capability: Capability) => void
  onCapabilityUpdate?: (capability: Capability) => void
  onCapabilityDelete?: (capabilityId: string) => void
  onCapabilityAdd?: (capability: Capability) => void
  onMetadataUpdate?: (name: string, description: string) => void
  onTypeDescriptionsUpdate?: (descriptions: CapabilityTypeDescriptions) => void
  readOnly?: boolean
}

const DEFAULT_TYPE_DESCRIPTIONS: CapabilityTypeDescriptions = {
  strategic: 'High-level capabilities that differentiate the organization',
  operational: 'Core business operations that deliver value to customers',
  supporting: 'Foundational capabilities that enable strategic and operational layers',
}

// Default type configuration (can be overridden by capability map)
const DEFAULT_CAPABILITY_TYPE_CONFIG: Record<string, {
  label: string
  bgColor: string
  borderColor: string
  headerBg: string
  textColor: string
}> = {
  strategic: {
    label: 'Strategic Capabilities',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    headerBg: 'bg-blue-100',
    textColor: 'text-blue-900',
  },
  operational: {
    label: 'Operational Capabilities',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    headerBg: 'bg-green-100',
    textColor: 'text-green-900',
  },
  supporting: {
    label: 'Supporting Capabilities',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    headerBg: 'bg-amber-100',
    textColor: 'text-amber-900',
  },
}

// Icon mapping for capabilities
const CAPABILITY_ICONS: Record<string, any> = {
  strategy: Target,
  planning: TrendingUp,
  innovation: Lightbulb,
  digital: Zap,
  business: Briefcase,
  market: BarChart3,
  customer: Users,
  engagement: MessageSquare,
  product: Package,
  service: Award,
  sales: DollarSign,
  revenue: TrendingUp,
  marketing: Briefcase,
  brand: Award,
  operations: Settings,
  supply: ShoppingCart,
  order: FileText,
  fulfillment: Package,
  finance: DollarSign,
  accounting: FileText,
  human: Users,
  talent: Users,
  learning: Lightbulb,
  compensation: DollarSign,
  technology: Database,
  application: Layers,
  infrastructure: Database,
  data: Database,
  analytics: BarChart3,
  cybersecurity: Lock,
  security: Lock,
  legal: FileText,
  compliance: Lock,
  corporate: Building2,
}

// Get icon for capability based on name keywords
const getCapabilityIcon = (capability: Capability) => {
  const nameLower = capability.name.toLowerCase()
  for (const [keyword, Icon] of Object.entries(CAPABILITY_ICONS)) {
    if (nameLower.includes(keyword)) {
      return Icon
    }
  }
  // Default icons by type
  if (capability.type === 'strategic') return Target
  if (capability.type === 'operational') return Cog
  return Shield
}

export function CapabilityMapViewer({
  capabilityMap,
  onCapabilityClick,
  onCapabilityUpdate,
  onCapabilityDelete,
  onCapabilityAdd,
  onMetadataUpdate,
  onTypeDescriptionsUpdate,
  readOnly = false,
}: CapabilityMapViewerProps) {
  const [heatMapMode, setHeatMapMode] = useState<HeatMapMode>('maturity')
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null)
  const [expandedCapabilities, setExpandedCapabilities] = useState<Set<string>>(new Set())

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [metadataDialogOpen, setMetadataDialogOpen] = useState(false)
  const [typeDescriptionsDialogOpen, setTypeDescriptionsDialogOpen] = useState(false)
  const [editingCapability, setEditingCapability] = useState<Capability | null>(null)
  const [parentForNewCapability, setParentForNewCapability] = useState<Capability | null>(null)
  const [deletingCapability, setDeletingCapability] = useState<Capability | null>(null)
  const [newCapabilityType, setNewCapabilityType] = useState<CapabilityType>('operational')

  // Get type descriptions from capability map or use defaults
  const typeDescriptions = capabilityMap.typeDescriptions || DEFAULT_TYPE_DESCRIPTIONS
  
  // Get type configuration from capability map or use defaults
  const capabilityTypeConfig = capabilityMap.customTypeConfig || DEFAULT_CAPABILITY_TYPE_CONFIG
  
  // Get all unique capability types in the map
  const capabilityTypes = Array.from(new Set(
    capabilityMap.capabilities.filter(c => c.level === 0).map(c => c.type)
  ))

  // Group capabilities by type
  const capabilitiesByType: Record<string, Capability[]> = {}
  capabilityTypes.forEach(type => {
    capabilitiesByType[type] = capabilityMap.capabilities.filter(
      (c) => c.type === type && c.level === 0
    )
  })

  // Get children of a capability
  const getChildren = (parentId: string): Capability[] => {
    return capabilityMap.capabilities.filter((c) => c.parentId === parentId)
  }

  // Get all descendants (recursive)
  const getAllDescendants = (parentId: string): Capability[] => {
    const children = getChildren(parentId)
    const descendants: Capability[] = [...children]
    children.forEach((child) => {
      descendants.push(...getAllDescendants(child.id))
    })
    return descendants
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

  // Render capability card in grid
  const renderCapabilityCard = (capability: Capability, showChildren: boolean = true) => {
    const children = getChildren(capability.id)
    const hasChildren = children.length > 0
    const isExpanded = expandedCapabilities.has(capability.id)
    const isSelected = selectedCapability?.id === capability.id
    const CapabilityIcon = getCapabilityIcon(capability)

    return (
      <div key={capability.id} className="flex flex-col w-full">
        {/* Main Capability Card */}
        <Card
          className={cn(
            'relative cursor-pointer transition-all hover:shadow-lg border-2 group',
            getHeatMapColor(capability),
            isSelected && 'ring-4 ring-blue-500 border-blue-600',
            !isExpanded && 'h-full' // Only stretch to full height when not expanded
          )}
          onClick={() => handleCapabilityClick(capability)}
        >
          <CardContent className="p-4">
            {/* Icon and Title */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div className={cn('p-2 rounded-lg', capability.level === 0 ? 'bg-white/90' : 'bg-white/70')}>
                  <CapabilityIcon className={cn('text-gray-700', capability.level === 0 ? 'h-6 w-6' : 'h-5 w-5')} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={cn('font-bold text-gray-900 mb-1 break-words', capability.level === 0 ? 'text-base' : 'text-sm')}>
                    {capability.name}
                  </h3>
                  {capability.description && (
                    <p className="text-xs text-gray-700 line-clamp-2">{capability.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-1 mb-3">
              <Badge variant="outline" className="text-xs bg-white/80">
                L{capability.level}
              </Badge>
              {heatMapMode === 'maturity' && (
                <Badge variant="secondary" className="text-xs bg-white/60">
                  M: {capability.metrics.maturity}/5
                </Badge>
              )}
              {heatMapMode === 'importance' && (
                <Badge variant="secondary" className="text-xs bg-white/60">
                  {capability.metrics.strategicImportance}
                </Badge>
              )}
              {heatMapMode === 'investment' && (
                <Badge variant="secondary" className="text-xs bg-white/60">
                  {capability.metrics.currentInvestment}
                </Badge>
              )}
              {hasChildren && (
                <Badge variant="secondary" className="text-xs bg-white/60">
                  {children.length} sub
                </Badge>
              )}
            </div>

            {/* Owner */}
            {capability.metrics.owner && (
              <p className="text-xs text-gray-600 mb-3 truncate">👤 {capability.metrics.owner}</p>
            )}

            {/* Action Buttons */}
            {!readOnly && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddChildCapability(capability)
                  }}
                  title="Add sub-capability"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditCapability(capability)
                  }}
                  title="Edit"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteCapability(capability)
                  }}
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}

            {/* Expand/Collapse for children */}
            {hasChildren && showChildren && (
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 h-7 text-xs"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleExpanded(capability.id)
                }}
              >
                {isExpanded ? '▼' : '▶'} {isExpanded ? 'Hide' : 'Show'} {children.length} Sub-Capabilities
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Children Grid */}
        {hasChildren && isExpanded && showChildren && (
          <div className="mt-4 space-y-3 w-full">
            <div className="pl-4 border-l-4 border-gray-300">
              <div className="space-y-3">
                {children.map((child) => (
                  <div key={child.id} className="w-full">
                    {renderCapabilityCard(child, true)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderCapabilityBand = (type: CapabilityType) => {
    const config = capabilityTypeConfig[type]
    if (!config) return null // Skip if no config found
    
    const Icon = Target // Default icon for all bands
    const capabilities = capabilitiesByType[type] || []

    return (
      <div key={type} className={cn('rounded-lg border-2 overflow-hidden', config.borderColor)}>
        {/* Band Header */}
        <div className={cn('px-6 py-4', config.headerBg)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Icon className={cn('h-6 w-6', config.textColor)} />
              <div className="flex-1">
                <h3 className={cn('text-lg font-bold', config.textColor)}>{config.label}</h3>
                <div className="flex items-center gap-2">
                  <p className={cn('text-sm', config.textColor, 'opacity-80')}>
                    {typeDescriptions[type] || ''}
                  </p>
                  {!readOnly && onTypeDescriptionsUpdate && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTypeDescriptionsDialogOpen(true)}
                      className={cn('h-5 w-5 p-0 hover:bg-white/50', config.textColor, 'opacity-60 hover:opacity-100')}
                      title="Edit capability type descriptions"
                    >
                      <Edit2 className="h-3 w-3" />
                      <span className="sr-only">Edit capability type descriptions</span>
                    </Button>
                  )}
                </div>
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

        {/* Band Content - Grid Layout */}
        <div className={cn('p-6', config.bgColor)}>
          {capabilities.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No {config.label.toLowerCase()} capabilities yet.</p>
              {!readOnly && (
                <p className="text-xs mt-1">Click "Add Capability" to create one.</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {capabilities.map((capability) => renderCapabilityCard(capability))}
            </div>
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{capabilityMap.name}</h2>
                {!readOnly && onMetadataUpdate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMetadataDialogOpen(true)}
                    className="h-7 w-7 p-0"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only">Edit capability map details</span>
                  </Button>
                )}
              </div>
              {capabilityMap.description && (
                <p className="text-sm text-muted-foreground mt-1">{capabilityMap.description}</p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
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

        {/* Capability Map with Grid Layout */}
        <CardContent className="space-y-6">
          {capabilityTypes.map(type => renderCapabilityBand(type))}
        </CardContent>

        {/* Legend */}
        <div className="px-6 pb-6">
          <div className="flex flex-wrap items-center gap-6 p-4 bg-muted/50 rounded-lg">
            <span className="text-sm font-semibold">Legend:</span>
            {heatMapMode === 'maturity' && (
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-red-500 rounded" />
                  <span className="text-xs">1-Initial</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-orange-500 rounded" />
                  <span className="text-xs">2-Developing</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-yellow-500 rounded" />
                  <span className="text-xs">3-Defined</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-lime-500 rounded" />
                  <span className="text-xs">4-Managed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span className="text-xs">5-Optimized</span>
                </div>
              </div>
            )}
            {heatMapMode === 'importance' && (
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-400 rounded" />
                  <span className="text-xs">Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-blue-400 rounded" />
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-purple-500 rounded" />
                  <span className="text-xs">High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-red-600 rounded" />
                  <span className="text-xs">Critical</span>
                </div>
              </div>
            )}
            {heatMapMode === 'investment' && (
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-300 rounded" />
                  <span className="text-xs">None</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-blue-300 rounded" />
                  <span className="text-xs">Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-blue-500 rounded" />
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-blue-700 rounded" />
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

      <CapabilityMapMetadataDialog
        open={metadataDialogOpen}
        onClose={() => setMetadataDialogOpen(false)}
        onSave={(name, description) => {
          if (onMetadataUpdate) {
            onMetadataUpdate(name, description)
          }
          setMetadataDialogOpen(false)
        }}
        capabilityMap={capabilityMap}
      />

      <CapabilityTypeDescriptionsDialog
        open={typeDescriptionsDialogOpen}
        onClose={() => setTypeDescriptionsDialogOpen(false)}
        onSave={(descriptions) => {
          if (onTypeDescriptionsUpdate) {
            onTypeDescriptionsUpdate(descriptions)
          }
          setTypeDescriptionsDialogOpen(false)
        }}
        capabilityMap={capabilityMap}
      />
    </>
  )
}
