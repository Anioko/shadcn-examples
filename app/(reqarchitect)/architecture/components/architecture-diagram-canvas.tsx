"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Move, RotateCcw, Target, Zap, Settings, Database, Users, GitBranch } from 'lucide-react';

interface ArchimateElement {
  id: string;
  type: 'goal' | 'capability' | 'business-process' | 'application-component' | 'technology-service' | 'business-actor';
  label: string;
  description?: string;
  position: { x: number; y: number };
  layer: 'motivation' | 'strategy' | 'business' | 'application' | 'technology';
}

const initialElements: ArchimateElement[] = [
  {
    id: '1',
    type: 'goal',
    label: 'Improve Customer Experience',
    description: 'Strategic goal to enhance overall customer satisfaction',
    position: { x: 100, y: 50 },
    layer: 'motivation'
  },
  {
    id: '2',
    type: 'capability',
    label: 'Customer Management',
    description: 'Capability to manage customer relationships',
    position: { x: 100, y: 200 },
    layer: 'strategy'
  },
  {
    id: '3',
    type: 'business-process',
    label: 'Customer Onboarding',
    description: 'Process for onboarding new customers',
    position: { x: 100, y: 350 },
    layer: 'business'
  },
  {
    id: '4',
    type: 'application-component',
    label: 'CRM System',
    description: 'Customer relationship management application',
    position: { x: 400, y: 350 },
    layer: 'application'
  },
  {
    id: '5',
    type: 'technology-service',
    label: 'Database Service',
    description: 'Customer data storage service',
    position: { x: 400, y: 500 },
    layer: 'technology'
  },
];

const getElementIcon = (type: ArchimateElement['type']) => {
  switch (type) {
    case 'goal': return Target;
    case 'capability': return Zap;
    case 'business-process': return GitBranch;
    case 'application-component': return Settings;
    case 'technology-service': return Database;
    case 'business-actor': return Users;
    default: return Target;
  }
};

const getElementColor = (layer: ArchimateElement['layer']) => {
  switch (layer) {
    case 'motivation': return 'bg-yellow-100 text-yellow-600';
    case 'strategy': return 'bg-red-100 text-red-600';
    case 'business': return 'bg-blue-100 text-blue-600';
    case 'application': return 'bg-green-100 text-green-600';
    case 'technology': return 'bg-purple-100 text-purple-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

function ArchimateElementCard({ element, selected, onSelect, onDrag }: {
  element: ArchimateElement;
  selected: boolean;
  onSelect: (element: ArchimateElement) => void;
  onDrag: (id: string, position: { x: number; y: number }) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const Icon = getElementIcon(element.type);
  const colorClass = getElementColor(element.layer);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - element.position.x, y: e.clientY - element.position.y });
    onSelect(element);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && dragStart) {
      const newPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      };
      onDrag(element.id, newPosition);
    }
  }, [isDragging, dragStart, element.id, onDrag]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={elementRef}
      className={`absolute cursor-move select-none transition-all ${isDragging ? 'z-50' : ''}`}
      style={{
        left: element.position.x,
        top: element.position.y,
      }}
      onMouseDown={handleMouseDown}
    >
      <Card className={`min-w-[200px] transition-all ${selected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'} ${isDragging ? 'opacity-80' : ''}`}>
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <div className={`p-1.5 rounded-md ${colorClass}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm leading-tight">{element.label}</div>
              {element.description && (
                <div className="text-xs text-muted-foreground mt-1">{element.description}</div>
              )}
              <Badge variant="outline" className="text-xs mt-2 capitalize">
                {element.layer}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ArchitectureDiagramCanvas() {
  const [elements, setElements] = useState<ArchimateElement[]>(initialElements);
  const [selectedElement, setSelectedElement] = useState<ArchimateElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleElementDrag = useCallback((id: string, position: { x: number; y: number }) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, position } : el
    ));
  }, []);

  const handleElementSelect = useCallback((element: ArchimateElement) => {
    setSelectedElement(element);
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedElement(null);
    }
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="h-full w-full bg-background relative overflow-hidden">
      {/* Canvas Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button size="sm" variant="outline" onClick={handleZoomIn}>
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleZoomOut}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleResetView}>
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Badge variant="secondary" className="px-2 py-1">
          {Math.round(zoom * 100)}%
        </Badge>
      </div>

      {/* Diagram Canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full bg-grid-pattern relative"
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transformOrigin: 'top left',
        }}
        onClick={handleCanvasClick}
      >
        {/* Connection Lines (simplified) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="hsl(var(--muted-foreground))"
              />
            </marker>
          </defs>
          
          {/* Example connections */}
          <line
            x1={200}
            y1={120}
            x2={200}
            y2={190}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1={200}
            y1={270}
            x2={200}
            y2={340}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1={300}
            y1={400}
            x2={390}
            y2={400}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1={500}
            y1={420}
            x2={500}
            y2={490}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        </svg>

        {/* ArchiMate Elements */}
        <div className="relative" style={{ zIndex: 2 }}>
          {elements.map((element) => (
            <ArchimateElementCard
              key={element.id}
              element={element}
              selected={selectedElement?.id === element.id}
              onSelect={handleElementSelect}
              onDrag={handleElementDrag}
            />
          ))}
        </div>
      </div>

      {/* Grid Pattern Background */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}