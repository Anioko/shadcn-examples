'use client'

import React, { useState } from 'react'
import { CapabilityMapViewer } from '@/components/capability-map/capability-map-viewer'
import { CapabilityPlanning } from '@/components/capability-map/capability-planning'
import { cobit2019CapabilityMap as initialCapabilityMap } from '@/lib/data/capability-maps/cobit-2019-capability-map'
import { Capability, CapabilityMap, CapabilityTypeDescriptions } from '@/lib/types/capability-map'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Download, Upload, Save, RefreshCw, FileText, FileSpreadsheet, Image, Code } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import {
  exportAsCSV,
  exportAsTXT,
  exportAsMarkdown,
  exportAsJSON,
  exportAsExcel,
  exportAsPNG,
  exportAsJPEG,
  exportAsSVG,
} from '@/lib/capability-map-export'

export default function cobit2019CapabilityMapPage() {
  const [activeTab, setActiveTab] = useState('map')
  const [capabilityMap, setCapabilityMap] = useState<CapabilityMap>(initialCapabilityMap)
  const { toast } = useToast()

  // Helper function to recursively delete capability and its children
  const deleteCapabilityAndChildren = (
    capabilities: Capability[],
    capabilityId: string
  ): Capability[] => {
    const childIds = capabilities
      .filter((c) => c.parentId === capabilityId)
      .map((c) => c.id)

    let filtered = capabilities.filter((c) => c.id !== capabilityId)
    childIds.forEach((childId) => {
      filtered = deleteCapabilityAndChildren(filtered, childId)
    })

    return filtered
  }

  const handleAddCapability = (capability: Capability) => {
    setCapabilityMap((prev) => ({
      ...prev,
      capabilities: [...prev.capabilities, capability],
      updatedAt: new Date().toISOString(),
    }))

    toast({
      title: 'Capability Added',
      description: `"${capability.name}" has been added successfully.`,
    })
  }

  const handleUpdateCapability = (updatedCapability: Capability) => {
    setCapabilityMap((prev) => ({
      ...prev,
      capabilities: prev.capabilities.map((c) =>
        c.id === updatedCapability.id ? updatedCapability : c
      ),
      updatedAt: new Date().toISOString(),
    }))

    toast({
      title: 'Capability Updated',
      description: `"${updatedCapability.name}" has been updated successfully.`,
    })
  }

  const handleDeleteCapability = (capabilityId: string) => {
    const capability = capabilityMap.capabilities.find((c) => c.id === capabilityId)
    if (!capability) return

    setCapabilityMap((prev) => ({
      ...prev,
      capabilities: deleteCapabilityAndChildren(prev.capabilities, capabilityId),
      updatedAt: new Date().toISOString(),
    }))

    toast({
      title: 'Capability Deleted',
      description: `"${capability.name}" and its sub-capabilities have been deleted.`,
      variant: 'destructive',
    })
  }

  const handleMetadataUpdate = (name: string, description: string) => {
    setCapabilityMap((prev) => ({
      ...prev,
      name: name,
      description: description,
      updatedAt: new Date().toISOString(),
    }))

    toast({
      title: 'Capability Map Updated',
      description: 'Capability map details have been updated successfully.',
    })
  }

  const handleTypeDescriptionsUpdate = (descriptions: CapabilityTypeDescriptions) => {
    setCapabilityMap((prev) => ({
      ...prev,
      typeDescriptions: descriptions,
      updatedAt: new Date().toISOString(),
    }))

    toast({
      title: 'Type Descriptions Updated',
      description: 'Capability type descriptions have been updated successfully.',
    })
  }

  const handleSave = () => {
    console.log('Saving capability map:', capabilityMap)
    toast({
      title: 'Saved',
      description: 'Capability map has been saved successfully.',
    })
  }

  const handleExportCSV = () => {
    exportAsCSV(capabilityMap)
    toast({
      title: 'Exported',
      description: 'Capability map has been exported as CSV.',
    })
  }

  const handleExportTXT = () => {
    exportAsTXT(capabilityMap)
    toast({
      title: 'Exported',
      description: 'Capability map has been exported as TXT.',
    })
  }

  const handleExportMarkdown = () => {
    exportAsMarkdown(capabilityMap)
    toast({
      title: 'Exported',
      description: 'Capability map has been exported as Markdown.',
    })
  }

  const handleExportJSON = () => {
    exportAsJSON(capabilityMap)
    toast({
      title: 'Exported',
      description: 'Capability map has been exported as JSON.',
    })
  }

  const handleExportExcel = () => {
    exportAsExcel(capabilityMap)
    toast({
      title: 'Exported',
      description: 'Capability map has been exported as Excel.',
    })
  }

  const handleExportPNG = async () => {
    await exportAsPNG('capability-map-viewer')
    toast({
      title: 'Exported',
      description: 'Capability map has been exported as PNG.',
    })
  }

  const handleExportJPEG = async () => {
    await exportAsJPEG('capability-map-viewer')
    toast({
      title: 'Exported',
      description: 'Capability map has been exported as JPEG.',
    })
  }

  const handleExportSVG = async () => {
    await exportAsSVG('capability-map-viewer')
    toast({
      title: 'Exported',
      description: 'Capability map has been exported as SVG.',
    })
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string) as CapabilityMap
          setCapabilityMap(imported)
          toast({
            title: 'Imported',
            description: 'Capability map has been imported successfully.',
          })
        } catch (error) {
          toast({
            title: 'Import Failed',
            description: 'Invalid JSON file format.',
            variant: 'destructive',
          })
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleReset = () => {
    setCapabilityMap(initialCapabilityMap)
    toast({
      title: 'Reset',
      description: 'Capability map has been reset to sample data.',
    })
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">COBIT 2019 Capability Map</h1>
          <p className="text-muted-foreground">
            Manage and visualize IT governance and management capabilities with heat maps and strategic planning
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleImport}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Data Formats
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={handleExportCSV}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportExcel}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export as Excel (.xlsx)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportJSON}>
                <Code className="h-4 w-4 mr-2" />
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportMarkdown}>
                <FileText className="h-4 w-4 mr-2" />
                Export as Markdown (.md)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportTXT}>
                <FileText className="h-4 w-4 mr-2" />
                Export as Text (.txt)
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuLabel className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Image Formats
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={handleExportPNG}>
                <Image className="h-4 w-4 mr-2" />
                Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportJPEG}>
                <Image className="h-4 w-4 mr-2" />
                Export as JPEG (.jpg)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportSVG}>
                <Image className="h-4 w-4 mr-2" />
                Export as SVG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <Separator />

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="map">Capability Map</TabsTrigger>
          <TabsTrigger value="planning">Planning & Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-6">
          <div id="capability-map-viewer">
            <CapabilityMapViewer
              capabilityMap={capabilityMap}
              onCapabilityAdd={handleAddCapability}
              onCapabilityUpdate={handleUpdateCapability}
              onCapabilityDelete={handleDeleteCapability}
              onMetadataUpdate={handleMetadataUpdate}
              onTypeDescriptionsUpdate={handleTypeDescriptionsUpdate}
            />
          </div>
        </TabsContent>

        <TabsContent value="planning" className="mt-6">
          <CapabilityPlanning capabilityMap={capabilityMap} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

