'use client'

import React, { useState } from 'react'
import { EmpathyMapComponent } from '@/components/canvas/empathy-map'
import { EmpathyMap } from '@/lib/types/empathy-map'
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
  exportEmpathyMapAsJSON,
  exportEmpathyMapAsCSV,
  exportEmpathyMapAsMarkdown,
  exportEmpathyMapAsPNG,
  exportEmpathyMapAsSVG,
} from '@/lib/empathy-map-export'

const initialMap: EmpathyMap = {
  id: 'em-001',
  name: 'My Empathy Map',
  description: 'Gain deeper insight into your customers',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  says: '',
  thinks: '',
  does: '',
  feels: '',
  pains: '',
  gains: '',
}

export default function EmpathyMapPage() {
  const [map, setMap] = useState<EmpathyMap>(initialMap)
  const { toast } = useToast()

  const handleSave = () => {
    console.log('Saving empathy map:', map)
    toast({
      title: 'Saved',
      description: 'Empathy Map has been saved successfully.',
    })
  }

  const handleExport = (format: string) => {
    switch (format) {
      case 'csv':
        exportEmpathyMapAsCSV(map)
        break
      case 'json':
        exportEmpathyMapAsJSON(map)
        break
      case 'markdown':
        exportEmpathyMapAsMarkdown(map)
        break
      case 'png':
        exportEmpathyMapAsPNG('empathy-map')
        break
      case 'svg':
        exportEmpathyMapAsSVG('empathy-map')
        break
    }
    toast({
      title: 'Exported',
      description: `Empathy Map has been exported as ${format.toUpperCase()}.`,
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
          const imported = JSON.parse(event.target?.result as string) as EmpathyMap
          setMap(imported)
          toast({ title: 'Imported', description: 'Empathy Map has been imported successfully.' })
        } catch (error) {
          toast({ title: 'Import Failed', description: 'Invalid JSON file format.', variant: 'destructive' })
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleReset = () => {
    setMap(initialMap)
    toast({ title: 'Reset', description: 'Empathy Map has been reset to blank template.' })
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
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
          <h1 className="text-4xl font-bold tracking-tight">Empathy Map</h1>
          <p className="text-muted-foreground">
            Gain deeper insight into your customers - Says, Thinks, Does, Feels
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
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                <Code className="h-4 w-4 mr-2" />
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('markdown')}>
                <FileText className="h-4 w-4 mr-2" />
                Export as Markdown (.md)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Image Formats
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleExport('png')}>
                <Image className="h-4 w-4 mr-2" />
                Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('svg')}>
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
      <div id="empathy-map" className="mt-6">
        <EmpathyMapComponent map={map} onUpdate={setMap} />
      </div>
    </div>
  )
}
