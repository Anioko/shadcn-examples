'use client'

import React, { useState } from 'react'
import { ValuePropositionCanvasComponent } from '@/components/canvas/value-proposition-canvas'
import { ValuePropositionCanvas } from '@/lib/types/value-proposition-canvas'
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
import { useToast } from '@/components/ui/use-toast'
import {
  exportVPCAsJSON,
  exportVPCAsCSV,
  exportVPCAsMarkdown,
  exportVPCAsPNG,
  exportVPCAsSVG,
} from '@/lib/value-proposition-canvas-export'

// Initial/Sample Canvas
const initialCanvas: ValuePropositionCanvas = {
  id: 'vpc-001',
  name: 'My Value Proposition',
  description: 'Design compelling value propositions that customers want',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  productsServices: '',
  painRelievers: '',
  gainCreators: '',
  customerJobs: '',
  customerPains: '',
  customerGains: '',
}

export default function ValuePropositionCanvasPage() {
  const [canvas, setCanvas] = useState<ValuePropositionCanvas>(initialCanvas)
  const { toast } = useToast()

  const handleSave = () => {
    console.log('Saving value proposition canvas:', canvas)
    toast({
      title: 'Saved',
      description: 'Value Proposition Canvas has been saved successfully.',
    })
  }

  const handleExportCSV = () => {
    exportVPCAsCSV(canvas)
    toast({
      title: 'Exported',
      description: 'Value Proposition Canvas has been exported as CSV.',
    })
  }

  const handleExportMarkdown = () => {
    exportVPCAsMarkdown(canvas)
    toast({
      title: 'Exported',
      description: 'Value Proposition Canvas has been exported as Markdown.',
    })
  }

  const handleExportJSON = () => {
    exportVPCAsJSON(canvas)
    toast({
      title: 'Exported',
      description: 'Value Proposition Canvas has been exported as JSON.',
    })
  }

  const handleExportPNG = async () => {
    await exportVPCAsPNG('value-proposition-canvas')
    toast({
      title: 'Exported',
      description: 'Value Proposition Canvas has been exported as PNG.',
    })
  }

  const handleExportSVG = async () => {
    await exportVPCAsSVG('value-proposition-canvas')
    toast({
      title: 'Exported',
      description: 'Value Proposition Canvas has been exported as SVG.',
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
          const imported = JSON.parse(event.target?.result as string) as ValuePropositionCanvas
          setCanvas(imported)
          toast({
            title: 'Imported',
            description: 'Value Proposition Canvas has been imported successfully.',
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
    setCanvas(initialCanvas)
    toast({
      title: 'Reset',
      description: 'Value Proposition Canvas has been reset to blank template.',
    })
  }

  return (
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
          <h1 className="text-4xl font-bold tracking-tight">Value Proposition Canvas</h1>
          <p className="text-muted-foreground">
            Design value propositions that customers want - Achieve product-market fit
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

              <DropdownMenuSeparator />

              <DropdownMenuLabel className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Image Formats
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={handleExportPNG}>
                <Image className="h-4 w-4 mr-2" />
                Export as PNG
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
      <div id="value-proposition-canvas" className="mt-6">
        <ValuePropositionCanvasComponent canvas={canvas} onUpdate={setCanvas} />
      </div>
    </div>
  )
}
