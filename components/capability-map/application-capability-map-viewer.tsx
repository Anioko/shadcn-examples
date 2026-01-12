'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ApplicationCapability,
  ApplicationCapabilityMap,
  ApplicationCapabilityDomain,
  ApplicationCapabilityDomainDescriptions,
  APPLICATION_MATURITY_COLORS,
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
  Monitor,
  Database,
  Lock,
  Cloud,
  Bot,
  MessageCircle,
  Server,
  Plus,
  Edit2,
  Trash2,
  Layers,
  Code,
  HardDrive,
  Shield,
  Settings,
  Brain,
  Bell,
  Layout,
  Palette,
  Smartphone,
  Box,
  GitBranch as Workflow,
  FileCode,
  Cog,
  Package,
  Key as KeyRound,
  Shield as ShieldCheck,
  FileText as FileKey,
  GitBranch,
  Package as Container,
  Eye,
  Wrench,
  Settings as ServerCog,
  Network,
  Zap,
  TrendingUp as LineChart,
} from 'lucide-react'
import { CapabilityFormDialog } from './capability-form-dialog'
import { DeleteConfirmationDialog } from './delete-confirmation-dialog'
import { CapabilityMapMetadataDialog } from './capability-map-metadata-dialog'

type HeatMapMode = 'maturity' | 'importance' | 'investment'

interface ApplicationCapabilityMapViewerProps {
  capabilityMap: ApplicationCapabilityMap
  onCapabilityClick?: (capability: ApplicationCapability) => void
  onCapabilityUpdate?: (capability: ApplicationCapability) => void
  onCapabilityDelete?: (capabilityId: string) => void
  onCapabilityAdd?: (capability: ApplicationCapability) => void
  onMetadataUpdate?: (name: string, description: string) => void
  onDomainDescriptionsUpdate?: (descriptions: ApplicationCapabilityDomainDescriptions) => void
  readOnly?: boolean
}

const DOMAIN_CONFIG = {
  'user-experience': {
    label: 'User Experience',
    icon: Monitor,
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    headerBg: 'bg-purple-100',
    textColor: 'text-purple-900',
  },
  'application-services': {
    label: 'Application Services',
    icon: Server,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    headerBg: 'bg-blue-100',
    textColor: 'text-blue-900',
  },
  'data-storage': {
    label: 'Data & Storage',
    icon: Database,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    headerBg: 'bg-green-100',
    textColor: 'text-green-900',
  },
  'security-identity': {
    label: 'Security & Identity',
    icon: Lock,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    headerBg: 'bg-red-100',
    textColor: 'text-red-900',
  },
  'devops-platform': {
    label: 'DevOps & Platform',
    icon: Cloud,
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    headerBg: 'bg-cyan-100',
    textColor: 'text-cyan-900',
  },
  'ai-analytics': {
    label: 'AI & Analytics',
    icon: Bot,
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    headerBg: 'bg-orange-100',
    textColor: 'text-orange-900',
  },
  'communication': {
    label: 'Communication',
    icon: MessageCircle,
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    headerBg: 'bg-pink-100',
    textColor: 'text-pink-900',
  },
}

const DEFAULT_DOMAIN_DESCRIPTIONS: ApplicationCapabilityDomainDescriptions = {
  'user-experience': 'Frontend interfaces, design systems, and user interactions',
  'application-services': 'APIs, business logic, and integration services',
  'data-storage': 'Data management, storage solutions, and data services',
  'security-identity': 'Authentication, authorization, encryption, and compliance',
  'devops-platform': 'Development tools, CI/CD, observability, and infrastructure',
  'ai-analytics': 'Machine learning services and business intelligence',
  'communication': 'Notification systems, real-time communication, and collaboration',
}

// Icon mapping for application capabilities
const CAPABILITY_ICONS: Record<string, any> = {
  web: Layout,
  frontend: Monitor,
  mobile: Smartphone,
  design: Palette,
  ui: Layout,
  ux: Monitor,
  api: Box,
  service: Server,
  business: Workflow,
  logic: Code,
  integration: Network,
  background: Cog,
  processing: Settings,
  database: Database,
  storage: HardDrive,
  file: Package,
  pipeline: GitBranch,
  cache: Zap,
  caching: Zap,
  authentication: KeyRound,
  authorization: ShieldCheck,
  auth: Lock,
  security: Shield,
  protection: Shield,
  compliance: FileKey,
  monitoring: Eye,
  cicd: GitBranch,
  infrastructure: Cloud,
  container: Container,
  orchestration: Settings,
  observability: Eye,
  development: Wrench,
  tools: Wrench,
  cloud: Cloud,
  machine: Brain,
  learning: Bot,
  ml: Bot,
  ai: Brain,
  intelligence: LineChart,
  analytics: LineChart,
  predictive: LineChart,
  notification: Bell,
  messaging: MessageCircle,
  realtime: Zap,
  collaboration: Network,
  communication: MessageCircle,
}

// Get icon for capability based on name keywords
const getCapabilityIcon = (capability: ApplicationCapability) => {
  const nameLower = capability.name.toLowerCase()
  for (const [keyword, Icon] of Object.entries(CAPABILITY_ICONS)) {
    if (nameLower.includes(keyword)) {
      return Icon
    }
  }
  // Default icons by domain
  const domainConfig = DOMAIN_CONFIG[capability.domain]
  return domainConfig?.icon || Layers
}

export function ApplicationCapabilityMapViewer({
  capabilityMap,
  onCapabilityClick,
  onCapabilityUpdate,
  onCapabilityDelete,
  onCapabilityAdd,
  onMetadataUpdate,
  onDomainDescriptionsUpdate,
  readOnly = false,
}: ApplicationCapabilityMapViewerProps) {
  const [heatMapMode, setHeatMapMode] = useState<HeatMapMode>('maturity')
  const [selectedCapability, setSelectedCapability] = useState<ApplicationCapability | null>(null)
  const [expandedCapabilities, setExpandedCapabilities] = useState<Set<string>>(new Set())

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [metadataDialogOpen, setMetadataDialogOpen] = useState(false)
  const [editingCapability, setEditingCapability] = useState<ApplicationCapability | null>(null)
  const [parentForNewCapability, setParentForNewCapability] = useState<ApplicationCapability | null>(null)
  const [deletingCapability, setDeletingCapability] = useState<ApplicationCapability | null>(null)
  const [newCapabilityDomain, setNewCapabilityDomain] = useState<ApplicationCapabilityDomain>('application-services')

  // Get domain descriptions from capability map or use defaults
  const domainDescriptions = capabilityMap.domainDescriptions || DEFAULT_DOMAIN_DESCRIPTIONS

  // Group capabilities by domain
  const capabilitiesByDomain: Record<ApplicationCapabilityDomain, ApplicationCapability[]> = {
    'user-experience': capabilityMap.capabilities.filter((c) => c.domain === 'user-experience' && c.level === 0),
    'application-services': capabilityMap.capabilities.filter((c) => c.domain === 'application-services' && c.level === 0),
    'data-storage': capabilityMap.capabilities.filter((c) => c.domain === 'data-storage' && c.level === 0),
    'security-identity': capabilityMap.capabilities.filter((c) => c.domain === 'security-identity' && c.level === 0),
    'devops-platform': capabilityMap.capabilities.filter((c) => c.domain === 'devops-platform' && c.level === 0),
    'ai-analytics': capabilityMap.capabilities.filter((c) => c.domain === 'ai-analytics' && c.level === 0),
    'communication': capabilityMap.capabilities.filter((c) => c.domain === 'communication' && c.level === 0),
  }

  // Get children of a capability
  const getChildren = (parentId: string): ApplicationCapability[] => {
    return capabilityMap.capabilities.filter((c) => c.parentId === parentId)
  }

  // Get all descendants (recursive)
  const getAllDescendants = (parentId: string): ApplicationCapability[] => {
    const children = getChildren(parentId)
    const descendants: ApplicationCapability[] = [...children]
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

  const getHeatMapColor = (capability: ApplicationCapability): string => {
    switch (heatMapMode) {
      case 'maturity':
        return APPLICATION_MATURITY_COLORS[capability.metrics.maturity]
      case 'importance':
        return IMPORTANCE_COLORS[capability.metrics.strategicImportance]
      case 'investment':
        return INVESTMENT_COLORS[capability.metrics.currentInvestment]
      default:
        return 'bg-gray-300'
    }
  }

  const handleCapabilityClick = (capability: ApplicationCapability) => {
    setSelectedCapability(capability)
    onCapabilityClick?.(capability)
  }

  // CRUD Handlers
  const handleAddRootCapability = (domain: ApplicationCapabilityDomain) => {
    setNewCapabilityDomain(domain)
    setParentForNewCapability(null)
    setEditingCapability(null)
    setFormDialogOpen(true)
  }

  const handleAddChildCapability = (parent: ApplicationCapability) => {
    setParentForNewCapability(parent)
    setEditingCapability(null)
    setFormDialogOpen(true)
  }

  const handleEditCapability = (capability: ApplicationCapability) => {
    setEditingCapability(capability)
    setParentForNewCapability(null)
    setFormDialogOpen(true)
  }

  const handleDeleteCapability = (capability: ApplicationCapability) => {
    setDeletingCapability(capability)
    setDeleteDialogOpen(true)
  }

  const handleSaveCapability = (capability: any) => {
    if (editingCapability) {
      onCapabilityUpdate?.(capability as ApplicationCapability)
    } else {
      onCapabilityAdd?.(capability as ApplicationCapability)
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
  const renderCapabilityCard = (capability: ApplicationCapability, showChildren: boolean = true) => {
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

  const renderDomainBand = (domain: ApplicationCapabilityDomain) => {
    const config = DOMAIN_CONFIG[domain]
    const Icon = config.icon
    const capabilities = capabilitiesByDomain[domain]

    return (
      <div key={domain} className={cn('rounded-lg border-2 overflow-hidden', config.borderColor)}>
        {/* Band Header */}
        <div className={cn('px-6 py-4', config.headerBg)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Icon className={cn('h-6 w-6', config.textColor)} />
              <div className="flex-1">
                <h3 className={cn('text-lg font-bold', config.textColor)}>{config.label}</h3>
                <div className="flex items-center gap-2">
                  <p className={cn('text-sm', config.textColor, 'opacity-80')}>
                    {domainDescriptions[domain]}
                  </p>
                </div>
              </div>
            </div>
            {!readOnly && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddRootCapability(domain)}
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
          {renderDomainBand('user-experience')}
          {renderDomainBand('application-services')}
          {renderDomainBand('data-storage')}
          {renderDomainBand('security-identity')}
          {renderDomainBand('devops-platform')}
          {renderDomainBand('ai-analytics')}
          {renderDomainBand('communication')}
        </CardContent>

        {/* Legend */}
        <div className="px-6 pb-6">
          <div className="flex flex-wrap items-center gap-6 p-4 bg-muted/50 rounded-lg">
            <span className="text-sm font-semibold">Legend:</span>
            {heatMapMode === 'maturity' && (
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-400 rounded" />
                  <span className="text-xs">1-Not Implemented</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-orange-400 rounded" />
                  <span className="text-xs">2-Basic/MVP</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-yellow-400 rounded" />
                  <span className="text-xs">3-Functional</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-lime-500 rounded" />
                  <span className="text-xs">4-Advanced</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span className="text-xs">5-Optimized/Leading</span>
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
        capability={editingCapability as any}
        parentCapability={parentForNewCapability as any}
        suggestedType={newCapabilityDomain as any}
        isApplicationCapability={true}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false)
          setDeletingCapability(null)
        }}
        onConfirm={handleConfirmDelete}
        capability={deletingCapability as any}
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
        capabilityMap={capabilityMap as any}
      />
    </>
  )
}
