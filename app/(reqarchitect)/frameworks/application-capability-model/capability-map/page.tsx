'use client'

import React, { useState } from 'react'
import { ApplicationCapabilityMapViewer } from '@/components/capability-map/application-capability-map-viewer'
import { sampleApplicationCapabilityMap as initialCapabilityMap } from '@/lib/data/sample-application-capability-map'
import { ApplicationCapability, ApplicationCapabilityMap, ApplicationCapabilityDomainDescriptions } from '@/lib/types/capability-map'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowLeft, Download, Upload, Save, RefreshCw, FileText, FileSpreadsheet, Image, Code } from 'lucide-react'
import Link from 'next/link'
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
} from '@/lib/application-capability-map-export'

export default function CapabilityMapPage() {
  const [activeTab, setActiveTab] = useState('map')
  const [capabilityMap, setCapabilityMap] = useState<ApplicationCapabilityMap>(initialCapabilityMap)
  const { toast } = useToast()

  // Helper function to recursively delete capability and its children
  const deleteCapabilityAndChildren = (
    capabilities: ApplicationCapability[],
    capabilityId: string
  ): ApplicationCapability[] => {
    // Find all children of the capability being deleted
    const childIds = capabilities
      .filter((c) => c.parentId === capabilityId)
      .map((c) => c.id)

    // Recursively delete children
    let filtered = capabilities.filter((c) => c.id !== capabilityId)
    childIds.forEach((childId) => {
      filtered = deleteCapabilityAndChildren(filtered, childId)
    })

    return filtered
  }

  // Add new capability
  const handleAddCapability = (capability: ApplicationCapability) => {
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

  // Update existing capability
  const handleUpdateCapability = (updatedCapability: ApplicationCapability) => {
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

  // Delete capability and all its children
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

  // Update capability map metadata (name and description)
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

  // Update capability domain descriptions
  const handleDomainDescriptionsUpdate = (descriptions: ApplicationCapabilityDomainDescriptions) => {
    setCapabilityMap((prev) => ({
      ...prev,
      domainDescriptions: descriptions,
      updatedAt: new Date().toISOString(),
    }))

    toast({
      title: 'Domain Descriptions Updated',
      description: 'Capability domain descriptions have been updated successfully.',
    })
  }

  // Save capability map (placeholder for API integration)
  const handleSave = () => {
    // TODO: Implement API call to save capability map
    console.log('Saving capability map:', capabilityMap)

    toast({
      title: 'Saved',
      description: 'Capability map has been saved successfully.',
    })
  }

  // Export handlers for different formats
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

  // Import capability map from JSON
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
          const imported = JSON.parse(event.target?.result as string) as ApplicationCapabilityMap
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

  // Reset to sample data
  const handleReset = () => {
    setCapabilityMap(initialCapabilityMap)
    toast({
      title: 'Reset',
      description: 'Capability map has been reset to sample data.',
    })
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/frameworks/application-capability-model/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Capability Map & Planning</h1>
          <p className="text-muted-foreground">
            Manage and visualize business capabilities with heat maps and strategic planning
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
      <div id="capability-map-viewer">
        <ApplicationCapabilityMapViewer
          capabilityMap={capabilityMap}
          onCapabilityAdd={handleAddCapability}
          onCapabilityUpdate={handleUpdateCapability}
          onCapabilityDelete={handleDeleteCapability}
          onMetadataUpdate={handleMetadataUpdate}
          onDomainDescriptionsUpdate={handleDomainDescriptionsUpdate}
        />
      </div>
    </div>
  )
}
