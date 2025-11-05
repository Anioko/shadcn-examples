'use client'

import React, { useState } from 'react'
import { OKRComponent } from '@/components/canvas/okr'
import { OKR } from '@/lib/types/okr'
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
  exportOKRAsJSON,
  exportOKRAsCSV,
  exportOKRAsMarkdown,
  exportOKRAsPNG,
  exportOKRAsSVG,
} from '@/lib/okr-export'

const initialOKR: OKR = {
  id: 'okr-001',
  name: 'OKR Canvas',
  description: 'Define objectives and key results',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  objective: '',
  keyResult1: '',
  keyResult2: '',
  keyResult3: '',
  keyResult4: '',
}

export default function OKRPage() {
  const [okr, setOKR] = useState<OKR>(initialOKR)
  const { toast } = useToast()

  const handleSave = () => {
    console.log('Saving OKR:', okr)
    toast({
      title: 'Saved',
      description: 'OKR has been saved successfully.',
    })
  }

  const handleExport = (format: string) => {
    switch (format) {
      case 'csv':
        exportOKRAsCSV(okr)
        break
      case 'json':
        exportOKRAsJSON(okr)
        break
      case 'markdown':
        exportOKRAsMarkdown(okr)
        break
      case 'png':
        exportOKRAsPNG('okr-canvas')
        break
      case 'svg':
        exportOKRAsSVG('okr-canvas')
        break
    }
    toast({
      title: 'Exported',
      description: `OKR has been exported as ${format.toUpperCase()}.`,
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
          const imported = JSON.parse(event.target?.result as string) as OKR
          setOKR(imported)
          toast({ title: 'Imported', description: 'OKR has been imported successfully.' })
        } catch (error) {
          toast({ title: 'Import Failed', description: 'Invalid JSON file format.', variant: 'destructive' })
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleReset = () => {
    setOKR(initialOKR)
    toast({ title: 'Reset', description: 'OKR has been reset to blank template.' })
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
          <h1 className="text-4xl font-bold tracking-tight">OKR Canvas</h1>
          <p className="text-muted-foreground">
            Define objectives and measurable key results for focused execution
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
      <div id="okr-canvas" className="mt-6">
        <OKRComponent okr={okr} onUpdate={setOKR} />
      </div>
    </div>
  )
}
