"use client";

import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Target, 
  Zap, 
  Users, 
  Settings, 
  Database, 
  GitBranch,
  Save,
  Download,
  Upload,
  Plus,
  Trash2,
  Move,
  MousePointer
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'goal' | 'capability' | 'process' | 'application' | 'service';
  title: string;
  description: string;
  position: { x: number; y: number };
  color: string;
}

const nodeTypes = [
  { type: 'goal' as const, label: 'Strategic Goal', icon: Target, color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
  { type: 'capability' as const, label: 'Business Capability', icon: Zap, color: 'bg-red-100 text-red-600 border-red-200' },
  { type: 'process' as const, label: 'Business Process', icon: GitBranch, color: 'bg-blue-100 text-blue-600 border-blue-200' },
  { type: 'application' as const, label: 'Application', icon: Settings, color: 'bg-green-100 text-green-600 border-green-200' },
  { type: 'service' as const, label: 'Technology Service', icon: Database, color: 'bg-purple-100 text-purple-600 border-purple-200' },
];

const initialNodes: WorkflowNode[] = [
  {
    id: '1',
    type: 'goal',
    title: 'Improve Customer Experience',
    description: 'Enhance overall customer satisfaction and retention',
    position: { x: 200, y: 100 },
    color: 'bg-yellow-100 text-yellow-600 border-yellow-200'
  },
  {
    id: '2',
    type: 'capability',
    title: 'Customer Management',
    description: 'Manage customer relationships effectively',
    position: { x: 200, y: 250 },
    color: 'bg-red-100 text-red-600 border-red-200'
  },
  {
    id: '3',
    type: 'process',
    title: 'Customer Onboarding',
    description: 'Streamlined process for new customers',
    position: { x: 200, y: 400 },
    color: 'bg-blue-100 text-blue-600 border-blue-200'
  },
  {
    id: '4',
    type: 'application',
    title: 'CRM System',
    description: 'Customer relationship management platform',
    position: { x: 500, y: 400 },
    color: 'bg-green-100 text-green-600 border-green-200'
  },
  {
    id: '5',
    type: 'service',
    title: 'Customer Database',
    description: 'Centralized customer data storage',
    position: { x: 500, y: 550 },
    color: 'bg-purple-100 text-purple-600 border-purple-200'
  },
];

function WorkflowNode({ 
  node, 
  selected, 
  onSelect, 
  onDrag 
}: {
  node: WorkflowNode;
  selected: boolean;
  onSelect: (node: WorkflowNode) => void;
  onDrag: (id: string, position: { x: number; y: number }) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  const nodeType = nodeTypes.find(nt => nt.type === node.type);
  const Icon = nodeType?.icon || Target;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - node.position.x, y: e.clientY - node.position.y });
    onSelect(node);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && dragStart) {
      const newPosition = {
        x: Math.max(0, e.clientX - dragStart.x),
        y: Math.max(0, e.clientY - dragStart.y)
      };
      onDrag(node.id, newPosition);
    }
  }, [isDragging, dragStart, node.id, onDrag]);

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
      ref={nodeRef}
      className={`absolute cursor-move select-none transition-all ${isDragging ? 'z-50' : ''}`}
      style={{
        left: node.position.x,
        top: node.position.y,
      }}
      onMouseDown={handleMouseDown}
    >
      <Card className={`min-w-[220px] max-w-[280px] transition-all border-2 ${node.color} ${selected ? 'ring-2 ring-primary shadow-lg scale-105' : 'hover:shadow-md'} ${isDragging ? 'opacity-80' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-md ${node.color.replace('text-', 'bg-').replace('100', '200')}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm leading-tight mb-1">{node.title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{node.description}</div>
              <Badge variant="outline" className="text-xs mt-2 capitalize">
                {nodeType?.label}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NodePalette({ onAddNode }: { onAddNode: (type: WorkflowNode['type']) => void }) {
  return (
    <Card className="w-72 h-full border-r rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Enterprise Elements</CardTitle>
        <p className="text-xs text-muted-foreground">
          Click to add elements to your architecture diagram
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {nodeTypes.map((nodeType) => {
          const Icon = nodeType.icon;
          return (
            <Button
              key={nodeType.type}
              variant="outline"
              className={`w-full justify-start gap-3 h-auto p-3 ${nodeType.color} hover:bg-opacity-80`}
              onClick={() => onAddNode(nodeType.type)}
            >
              <Icon className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium text-xs">{nodeType.label}</div>
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}

function PropertiesPanel({ 
  selectedNode, 
  onUpdateNode, 
  onDeleteNode 
}: { 
  selectedNode: WorkflowNode | null;
  onUpdateNode: (id: string, updates: Partial<WorkflowNode>) => void;
  onDeleteNode: (id: string) => void;
}) {
  const [title, setTitle] = useState(selectedNode?.title || '');
  const [description, setDescription] = useState(selectedNode?.description || '');

  React.useEffect(() => {
    setTitle(selectedNode?.title || '');
    setDescription(selectedNode?.description || '');
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <Card className="w-80 h-full border-l rounded-none">
        <CardHeader>
          <CardTitle className="text-sm">Properties</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-center">
          <Settings className="w-12 h-12 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">
            Select an element to edit its properties
          </p>
        </CardContent>
      </Card>
    );
  }

  const nodeType = nodeTypes.find(nt => nt.type === selectedNode.type);
  const Icon = nodeType?.icon || Target;

  const handleSave = () => {
    onUpdateNode(selectedNode.id, { title, description });
  };

  const handleDelete = () => {
    onDeleteNode(selectedNode.id);
  };

  return (
    <Card className="w-80 h-full border-l rounded-none">
      <CardHeader>
        <CardTitle className="text-sm">Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <div className={`p-2 rounded-md ${selectedNode.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="font-medium text-sm">{nodeType?.label}</div>
            <Badge variant="outline" className="text-xs">
              ID: {selectedNode.id}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="title" className="text-xs font-medium">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
              placeholder="Enter title"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-xs font-medium">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div>
            <Label className="text-xs font-medium">Position</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <Label className="text-xs text-muted-foreground">X</Label>
                <Input
                  value={Math.round(selectedNode.position.x)}
                  readOnly
                  className="text-xs"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Y</Label>
                <Input
                  value={Math.round(selectedNode.position.y)}
                  readOnly
                  className="text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button size="sm" onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CanvasToolbar({ 
  zoom, 
  onZoomIn, 
  onZoomOut, 
  onResetView,
  onSave,
  onExport 
}: {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onSave: () => void;
  onExport: () => void;
}) {
  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2 bg-background border rounded-lg p-2 shadow-sm">
      <Button size="sm" variant="outline" onClick={onZoomIn}>
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="outline" onClick={onZoomOut}>
        <ZoomOut className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="outline" onClick={onResetView}>
        <RotateCcw className="w-4 h-4" />
      </Button>
      <Badge variant="secondary" className="px-2 py-1 text-xs">
        {Math.round(zoom * 100)}%
      </Badge>
      <div className="border-l mx-1" />
      <Button size="sm" variant="outline" onClick={onSave}>
        <Save className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="outline" onClick={onExport}>
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function WorkflowCanvas() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleNodeDrag = useCallback((id: string, position: { x: number; y: number }) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, position } : node
    ));
  }, []);

  const handleNodeSelect = useCallback((node: WorkflowNode) => {
    setSelectedNode(node);
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedNode(null);
    }
  }, []);

  const handleAddNode = useCallback((type: WorkflowNode['type']) => {
    const nodeType = nodeTypes.find(nt => nt.type === type);
    if (!nodeType) return;

    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type,
      title: `New ${nodeType.label}`,
      description: `Enter description for this ${nodeType.label.toLowerCase()}`,
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
      color: nodeType.color
    };

    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode);
  }, []);

  const handleUpdateNode = useCallback((id: string, updates: Partial<WorkflowNode>) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, ...updates } : node
    ));
  }, []);

  const handleDeleteNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(node => node.id !== id));
    setSelectedNode(null);
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleSave = () => {
    console.log('Saving diagram...', nodes);
    // Implement save functionality
  };

  const handleExport = () => {
    console.log('Exporting diagram...', nodes);
    // Implement export functionality
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <NodePalette onAddNode={handleAddNode} />
      
      <div className="flex-1 relative bg-background">
        <CanvasToolbar
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetView={handleResetView}
          onSave={handleSave}
          onExport={handleExport}
        />
        
        <div
          ref={canvasRef}
          className="w-full h-full bg-grid-pattern relative overflow-hidden"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: 'top left',
          }}
          onClick={handleCanvasClick}
        >
          {/* Connection Lines */}
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
            
            {/* Sample connections */}
            <line
              x1={310}
              y1={150}
              x2={310}
              y2={240}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <line
              x1={310}
              y1={300}
              x2={310}
              y2={390}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <line
              x1={420}
              y1={450}
              x2={490}
              y2={450}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <line
              x1={610}
              y1={500}
              x2={610}
              y2={540}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          </svg>

          {/* Workflow Nodes */}
          <div className="relative" style={{ zIndex: 2 }}>
            {nodes.map((node) => (
              <WorkflowNode
                key={node.id}
                node={node}
                selected={selectedNode?.id === node.id}
                onSelect={handleNodeSelect}
                onDrag={handleNodeDrag}
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

      <PropertiesPanel
        selectedNode={selectedNode}
        onUpdateNode={handleUpdateNode}
        onDeleteNode={handleDeleteNode}
      />
    </div>
  );
}