"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Save,
  FileDown,
  FileUp,
  Undo,
  Redo,
  Copy,
  Clipboard,
  Trash2,
  Grid3X3,
  Move,
  MousePointer,
  Hand,
  ChevronDown,
  Download,
  Upload,
  FileText,
  Image,
  FileCode
} from 'lucide-react';

interface ArchitectureToolbarProps {
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onDelete?: () => void;
  onExport?: (format: string) => void;
  onImport?: () => void;
  selectedTool?: 'select' | 'pan' | 'move';
  onToolChange?: (tool: 'select' | 'pan' | 'move') => void;
  canUndo?: boolean;
  canRedo?: boolean;
  hasSelection?: boolean;
}

export function ArchitectureToolbar({
  onSave,
  onUndo,
  onRedo,
  onCopy,
  onPaste,
  onDelete,
  onExport,
  onImport,
  selectedTool = 'select',
  onToolChange,
  canUndo = false,
  canRedo = false,
  hasSelection = false,
}: ArchitectureToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b bg-background">
      {/* File Operations */}
      <div className="flex items-center gap-1">
        <Button 
          size="sm" 
          variant="outline"
          onClick={onSave}
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <FileDown className="w-4 h-4" />
              <span>Export</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Export Format</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onExport?.('png')}>
              <Image className="w-4 h-4 mr-2" />
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport?.('svg')}>
              <Image className="w-4 h-4 mr-2" />
              Export as SVG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport?.('pdf')}>
              <FileText className="w-4 h-4 mr-2" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport?.('archimate')}>
              <FileCode className="w-4 h-4 mr-2" />
              Export as ArchiMate XML
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport?.('json')}>
              <FileCode className="w-4 h-4 mr-2" />
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          size="sm" 
          variant="outline"
          onClick={onImport}
        >
          <FileUp className="w-4 h-4" />
          <span>Import</span>
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Edit Operations */}
      <div className="flex items-center gap-1">
        <Button 
          size="sm" 
          variant="outline"
          onClick={onUndo}
          disabled={!canUndo}
        >
          <Undo className="w-4 h-4" />
          <span>Undo</span>
        </Button>

        <Button 
          size="sm" 
          variant="outline"
          onClick={onRedo}
          disabled={!canRedo}
        >
          <Redo className="w-4 h-4" />
          <span>Redo</span>
        </Button>

        <Button 
          size="sm" 
          variant="outline"
          onClick={onCopy}
          disabled={!hasSelection}
        >
          <Copy className="w-4 h-4" />
          <span>Copy</span>
        </Button>

        <Button 
          size="sm" 
          variant="outline"
          onClick={onPaste}
        >
          <Clipboard className="w-4 h-4" />
          <span>Paste</span>
        </Button>

        <Button 
          size="sm" 
          variant="outline"
          onClick={onDelete}
          disabled={!hasSelection}
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Tools */}
      <div className="flex items-center gap-1">
        <Badge variant="outline" className="text-xs">
          Tools
        </Badge>

        <Button 
          size="sm" 
          variant={selectedTool === 'select' ? 'default' : 'outline'}
          onClick={() => onToolChange?.('select')}
        >
          <MousePointer className="w-4 h-4" />
          <span>Select</span>
        </Button>

        <Button 
          size="sm" 
          variant={selectedTool === 'pan' ? 'default' : 'outline'}
          onClick={() => onToolChange?.('pan')}
        >
          <Hand className="w-4 h-4" />
          <span>Pan</span>
        </Button>

        <Button 
          size="sm" 
          variant={selectedTool === 'move' ? 'default' : 'outline'}
          onClick={() => onToolChange?.('move')}
        >
          <Move className="w-4 h-4" />
          <span>Move</span>
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* View Controls */}
      <div className="flex items-center gap-1">
        <Badge variant="outline" className="text-xs">
          View
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <Grid3X3 className="w-4 h-4" />
              <span>Layout</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Auto Layout</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Hierarchical (Top-Down)</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Hierarchical (Left-Right)</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Force-Directed</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Circular</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Grid</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Status */}
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          5 elements
        </Badge>
        <Badge variant="secondary" className="text-xs">
          4 connections
        </Badge>
        <Badge variant="outline" className="text-xs">
          Saved 2 minutes ago
        </Badge>
      </div>
    </div>
  );
}