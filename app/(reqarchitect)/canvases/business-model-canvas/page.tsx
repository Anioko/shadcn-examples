'use client'

import React, { useState } from 'react'
import { BusinessModelCanvasComponent } from '@/components/canvas/business-model-canvas'
import { BusinessModelCanvas } from '@/lib/types/business-model-canvas'
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
import { ArrowLeft, Download, Upload, Save, RefreshCw, FileText, Image, Code, FileSpreadsheet } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Toaster } from 'sonner'
import {
  exportCanvasAsJSON,
  exportCanvasAsCSV,
  exportCanvasAsMarkdown,
  exportCanvasAsTXT,
  exportCanvasAsPNG,
  exportCanvasAsJPEG,
  exportCanvasAsSVG,
} from '@/lib/business-model-canvas-export'

// Initial/Sample Canvas
const initialCanvas: BusinessModelCanvas = {
  id: 'bmc-001',
  name: 'My Business Model',
  description: 'Strategic planning template for your business',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  keyPartners: '',
  keyActivities: '',
  keyResources: '',
  valuePropositions: '',
  customerRelationships: '',
  channels: '',
  customerSegments: '',
  costStructure: '',
  revenueStreams: '',
}

export default function BusinessModelCanvasPage() {
  const [canvas, setCanvas] = useState<BusinessModelCanvas>(initialCanvas)

  const handleSave = () => {
    console.log('Saving business model canvas:', canvas)
    toast.success('Saved', {
      description: 'Business Model Canvas has been saved successfully.',
    })
  }

  const handleExportCSV = () => {
    exportCanvasAsCSV(canvas)
    toast.success('Exported', {
      description: 'Business Model Canvas has been exported as CSV.',
    })
  }

  const handleExportTXT = () => {
    exportCanvasAsTXT(canvas)
    toast.success('Exported', {
      description: 'Business Model Canvas has been exported as TXT.',
    })
  }

  const handleExportMarkdown = () => {
    exportCanvasAsMarkdown(canvas)
    toast.success('Exported', {
      description: 'Business Model Canvas has been exported as Markdown.',
    })
  }

  const handleExportJSON = () => {
    exportCanvasAsJSON(canvas)
    toast.success('Exported', {
      description: 'Business Model Canvas has been exported as JSON.',
    })
  }

  const handleExportPNG = async () => {
    await exportCanvasAsPNG('business-model-canvas')
    toast.success('Exported', {
      description: 'Business Model Canvas has been exported as PNG.',
    })
  }

  const handleExportJPEG = async () => {
    await exportCanvasAsJPEG('business-model-canvas')
    toast.success('Exported', {
      description: 'Business Model Canvas has been exported as JPEG.',
    })
  }

  const handleExportSVG = async () => {
    await exportCanvasAsSVG('business-model-canvas')
    toast.success('Exported', {
      description: 'Business Model Canvas has been exported as SVG.',
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
          const imported = JSON.parse(event.target?.result as string) as BusinessModelCanvas
          setCanvas(imported)
          toast.success('Imported', {
            description: 'Business Model Canvas has been imported successfully.',
          })
        } catch (error) {
          toast.error('Import Failed', {
            description: 'Invalid JSON file format.',
          })
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleReset = () => {
    setCanvas(initialCanvas)
    toast.success('Reset', {
      description: 'Business Model Canvas has been reset to blank template.',
    })
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Business Model Canvas</h1>
          <p className="text-muted-foreground">
            Strategic management template for developing and documenting business models
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
      <div id="business-model-canvas" className="mt-6">
        <BusinessModelCanvasComponent canvas={canvas} onUpdate={setCanvas} />
      </div>
    </div>
    </>
  )
}
