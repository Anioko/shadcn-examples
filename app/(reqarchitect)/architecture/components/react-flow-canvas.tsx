"use client";

import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  NodeTypes,
  Handle,
  Position,
  MarkerType,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  Briefcase,
  Monitor,
  Database,
  Target,
  ArrowRight,
  Circle,
  Square,
  Triangle,
  Diamond,
  Save,
  Download,
  Upload,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Plus,
  Trash2,
  Group,
  Ungroup,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Brain,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Wand2,
} from 'lucide-react';

// Define node data interface
interface NodeData {
  type?: string;
  label?: string;
  description?: string;
}

// ArchiMate element types
interface ElementType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  category: string;
}

const ARCHIMATE_ELEMENTS: ElementType[] = [
  // Business Layer - Passive Structure
  { 
    id: "business-object", 
    name: "Business Object", 
    icon: Square, 
    color: "text-yellow-800", 
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    category: "Business" 
  },
  // Business Layer - Active Structure
  { 
    id: "business-actor", 
    name: "Business Actor", 
    icon: Users, 
    color: "text-yellow-800", 
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    category: "Business" 
  },
  { 
    id: "business-role", 
    name: "Business Role", 
    icon: Briefcase, 
    color: "text-yellow-800", 
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    category: "Business" 
  },
  { 
    id: "business-collaboration", 
    name: "Business Collaboration", 
    icon: Users, 
    color: "text-yellow-800", 
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    category: "Business" 
  },
  { 
    id: "business-interface", 
    name: "Business Interface", 
    icon: Circle, 
    color: "text-yellow-800", 
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    category: "Business" 
  },
  // Business Layer - Behavior
  { 
    id: "business-process", 
    name: "Business Process", 
    icon: ArrowRight, 
    color: "text-yellow-800", 
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    category: "Business" 
  },
  { 
    id: "business-function", 
    name: "Business Function", 
    icon: Square, 
    color: "text-yellow-800", 
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    category: "Business" 
  },
  { 
    id: "business-interaction", 
    name: "Business Interaction", 
    icon: ArrowRight, 
    color: "text-yellow-800", 
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    category: "Business" 
  },
  { 
    id: "business-event", 
    name: "Business Event", 
    icon: Circle, 
    color: "text-yellow-800", 
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    category: "Business" 
  },
  { 
    id: "business-service", 
    name: "Business Service", 
    icon: Circle, 
    color: "text-yellow-800", 
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    category: "Business" 
  },
  
  // Application Layer - Passive Structure
  { 
    id: "data-object", 
    name: "Data Object", 
    icon: Database, 
    color: "text-blue-800", 
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    category: "Application" 
  },
  // Application Layer - Active Structure
  { 
    id: "application-component", 
    name: "Application Component", 
    icon: Square, 
    color: "text-blue-800", 
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    category: "Application" 
  },
  { 
    id: "application-collaboration", 
    name: "Application Collaboration", 
    icon: Square, 
    color: "text-blue-800", 
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    category: "Application" 
  },
  { 
    id: "application-interface", 
    name: "Application Interface", 
    icon: Monitor, 
    color: "text-blue-800", 
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    category: "Application" 
  },
  // Application Layer - Behavior
  { 
    id: "application-function", 
    name: "Application Function", 
    icon: Square, 
    color: "text-blue-800", 
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    category: "Application" 
  },
  { 
    id: "application-interaction", 
    name: "Application Interaction", 
    icon: ArrowRight, 
    color: "text-blue-800", 
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    category: "Application" 
  },
  { 
    id: "application-process", 
    name: "Application Process", 
    icon: ArrowRight, 
    color: "text-blue-800", 
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    category: "Application" 
  },
  { 
    id: "application-event", 
    name: "Application Event", 
    icon: Circle, 
    color: "text-blue-800", 
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    category: "Application" 
  },
  { 
    id: "application-service", 
    name: "Application Service", 
    icon: Circle, 
    color: "text-blue-800", 
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    category: "Application" 
  },
  
  // Technology Layer - Passive Structure
  { 
    id: "artifact", 
    name: "Artifact", 
    icon: Database, 
    color: "text-green-800", 
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    category: "Technology" 
  },
  // Technology Layer - Active Structure
  { 
    id: "node", 
    name: "Node", 
    icon: Square, 
    color: "text-green-800", 
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    category: "Technology" 
  },
  { 
    id: "device", 
    name: "Device", 
    icon: Monitor, 
    color: "text-green-800", 
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    category: "Technology" 
  },
  { 
    id: "system-software", 
    name: "System Software", 
    icon: Square, 
    color: "text-green-800", 
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    category: "Technology" 
  },
  { 
    id: "technology-collaboration", 
    name: "Technology Collaboration", 
    icon: Square, 
    color: "text-green-800", 
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    category: "Technology" 
  },
  { 
    id: "technology-interface", 
    name: "Technology Interface", 
    icon: Circle, 
    color: "text-green-800", 
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    category: "Technology" 
  },
  // Technology Layer - Behavior
  { 
    id: "technology-function", 
    name: "Technology Function", 
    icon: Square, 
    color: "text-green-800", 
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    category: "Technology" 
  },
  { 
    id: "technology-process", 
    name: "Technology Process", 
    icon: ArrowRight, 
    color: "text-green-800", 
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    category: "Technology" 
  },
  { 
    id: "technology-interaction", 
    name: "Technology Interaction", 
    icon: ArrowRight, 
    color: "text-green-800", 
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    category: "Technology" 
  },
  { 
    id: "technology-event", 
    name: "Technology Event", 
    icon: Circle, 
    color: "text-green-800", 
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    category: "Technology" 
  },
  { 
    id: "technology-service", 
    name: "Technology Service", 
    icon: Circle, 
    color: "text-green-800", 
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    category: "Technology" 
  },
  
  // Physical Layer - Passive Structure
  { 
    id: "material", 
    name: "Material", 
    icon: Square, 
    color: "text-gray-800", 
    bgColor: "bg-gray-50",
    borderColor: "border-gray-300",
    category: "Physical" 
  },
  // Physical Layer - Active Structure
  { 
    id: "equipment", 
    name: "Equipment", 
    icon: Square, 
    color: "text-gray-800", 
    bgColor: "bg-gray-50",
    borderColor: "border-gray-300",
    category: "Physical" 
  },
  { 
    id: "facility", 
    name: "Facility", 
    icon: Square, 
    color: "text-gray-800", 
    bgColor: "bg-gray-50",
    borderColor: "border-gray-300",
    category: "Physical" 
  },
  { 
    id: "distribution-network", 
    name: "Distribution Network", 
    icon: ArrowRight, 
    color: "text-gray-800", 
    bgColor: "bg-gray-50",
    borderColor: "border-gray-300",
    category: "Physical" 
  },
  
  // Motivation Layer
  { 
    id: "stakeholder", 
    name: "Stakeholder", 
    icon: Users, 
    color: "text-purple-800", 
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    category: "Motivation" 
  },
  { 
    id: "driver", 
    name: "Driver", 
    icon: Target, 
    color: "text-purple-800", 
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    category: "Motivation" 
  },
  { 
    id: "assessment", 
    name: "Assessment", 
    icon: Diamond, 
    color: "text-purple-800", 
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    category: "Motivation" 
  },
  { 
    id: "goal", 
    name: "Goal", 
    icon: Target, 
    color: "text-purple-800", 
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    category: "Motivation" 
  },
  { 
    id: "outcome", 
    name: "Outcome", 
    icon: Diamond, 
    color: "text-purple-800", 
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    category: "Motivation" 
  },
  { 
    id: "principle", 
    name: "Principle", 
    icon: Triangle, 
    color: "text-purple-800", 
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    category: "Motivation" 
  },
  { 
    id: "requirement", 
    name: "Requirement", 
    icon: Square, 
    color: "text-purple-800", 
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    category: "Motivation" 
  },
  { 
    id: "constraint", 
    name: "Constraint", 
    icon: Square, 
    color: "text-purple-800", 
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    category: "Motivation" 
  },
  { 
    id: "meaning", 
    name: "Meaning", 
    icon: Circle, 
    color: "text-purple-800", 
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    category: "Motivation" 
  },
  { 
    id: "value", 
    name: "Value", 
    icon: Diamond, 
    color: "text-purple-800", 
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    category: "Motivation" 
  },
  
  // Strategy Layer
  { 
    id: "resource", 
    name: "Resource", 
    icon: Square, 
    color: "text-orange-800", 
    bgColor: "bg-orange-50",
    borderColor: "border-orange-300",
    category: "Strategy" 
  },
  { 
    id: "capability", 
    name: "Capability", 
    icon: Square, 
    color: "text-orange-800", 
    bgColor: "bg-orange-50",
    borderColor: "border-orange-300",
    category: "Strategy" 
  },
  { 
    id: "course-of-action", 
    name: "Course of Action", 
    icon: ArrowRight, 
    color: "text-orange-800", 
    bgColor: "bg-orange-50",
    borderColor: "border-orange-300",
    category: "Strategy" 
  },
  
  // Implementation & Migration Layer
  { 
    id: "work-package", 
    name: "Work Package", 
    icon: Square, 
    color: "text-pink-800", 
    bgColor: "bg-pink-50",
    borderColor: "border-pink-300",
    category: "Implementation" 
  },
  { 
    id: "deliverable", 
    name: "Deliverable", 
    icon: Square, 
    color: "text-pink-800", 
    bgColor: "bg-pink-50",
    borderColor: "border-pink-300",
    category: "Implementation" 
  },
  { 
    id: "implementation-event", 
    name: "Implementation Event", 
    icon: Circle, 
    color: "text-pink-800", 
    bgColor: "bg-pink-50",
    borderColor: "border-pink-300",
    category: "Implementation" 
  },
  { 
    id: "plateau", 
    name: "Plateau", 
    icon: Square, 
    color: "text-pink-800", 
    bgColor: "bg-pink-50",
    borderColor: "border-pink-300",
    category: "Implementation" 
  },
  { 
    id: "gap", 
    name: "Gap", 
    icon: Square, 
    color: "text-pink-800", 
    bgColor: "bg-pink-50",
    borderColor: "border-pink-300",
    category: "Implementation" 
  },
];

// Custom ArchiMate Node Component
function ArchiMateNode({ data, selected }: { data: { type: string; label?: string; description?: string }; selected: boolean }) {
  const elementType = ARCHIMATE_ELEMENTS.find(el => el.id === data.type) || ARCHIMATE_ELEMENTS[0];
  const IconComponent = elementType.icon;

  return (
    <div className={`
      relative rounded-lg border-2 p-3 min-w-[140px] max-w-[200px] shadow-lg transition-all
      ${elementType.bgColor} ${elementType.borderColor} ${elementType.color}
      ${selected ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-xl'}
    `}>
      {/* Connection Handles */}
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-primary" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-primary" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-primary" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-primary" />
      
      {/* Node Content */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <IconComponent className="w-4 h-4" />
          <Badge variant="outline" className={`text-xs ${elementType.color} border-current`}>
            {elementType.category}
          </Badge>
        </div>
        <div className="font-semibold text-sm leading-tight">
          {data.label || elementType.name}
        </div>
        {data.description && (
          <div className="text-xs opacity-75 leading-tight">
            {data.description}
          </div>
        )}
      </div>
    </div>
  );
}

// Node types for React Flow
const nodeTypes: NodeTypes = {
  archimate: ArchiMateNode,
};

export function ReactFlowCanvas() {
  const initialNodes: Node[] = [
    {
      id: 'business-1',
      type: 'archimate',
      position: { x: 100, y: 100 },
      data: {
        type: 'business-process',
        label: 'Customer Onboarding',
        description: 'Process for onboarding new customers'
      }
    },
    {
      id: 'application-1',
      type: 'archimate',
      position: { x: 300, y: 200 },
      data: {
        type: 'application-component',
        label: 'CRM System',
        description: 'Customer relationship management platform'
      }
    },
    {
      id: 'technology-1',
      type: 'archimate',
      position: { x: 500, y: 300 },
      data: {
        type: 'infrastructure-service',
        label: 'Database Service',
        description: 'Centralized customer data storage'
      }
    }
  ];
  
  const initialEdges: Edge[] = [
    {
      id: 'edge-1',
      source: 'business-1',
      target: 'application-1',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#6366f1', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#6366f1',
      },
      label: 'uses',
      labelStyle: { fill: '#6366f1', fontWeight: 600 },
    },
    {
      id: 'edge-2',
      source: 'application-1',
      target: 'technology-1',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#10b981',
      },
      label: 'depends on',
      labelStyle: { fill: '#10b981', fontWeight: 600 },
    }
  ];
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodeCounter, setNodeCounter] = useState(1);
  const [validationIssues, setValidationIssues] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  // Handle edge creation with custom styling
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const newEdge = {
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#6366f1',
        },
        label: 'influences',
        labelStyle: { fill: '#6366f1', fontWeight: 600 },
        labelBgStyle: { fill: 'white', fillOpacity: 0.8 },
        labelBgPadding: [8, 4] as [number, number],
        labelBgBorderRadius: 4,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Add new node to canvas
  const addNode = useCallback((elementType: ElementType) => {
    const id = `${elementType.id}-${nodeCounter}`;
    const newNode: Node = {
      id,
      type: 'archimate',
      position: { x: Math.random() * 300 + 100, y: Math.random() * 300 + 100 },
      data: {
        type: elementType.id,
        label: elementType.name,
        description: `New ${elementType.name}`,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeCounter(prev => prev + 1);
  }, [nodeCounter, setNodes]);

  // Handle node selection
  const onSelectionChange = useCallback(({ nodes }: { nodes: Node[] }) => {
    setSelectedNode(nodes.length > 0 ? nodes[0] : null);
  }, []);

  // Update node properties
  const updateNodeProperty = useCallback((property: string, value: string) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: { ...node.data, [property]: value },
              }
            : node
        )
      );
      setSelectedNode(prev => 
        prev ? { ...prev, data: { ...prev.data, [property]: value } } : null
      );
    }
  }, [selectedNode, setNodes]);

  // Delete selected node
  const deleteSelectedNode = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) => eds.filter((edge) => 
        edge.source !== selectedNode.id && edge.target !== selectedNode.id
      ));
      setSelectedNode(null);
    }
  }, [selectedNode, setNodes, setEdges]);

  // Export diagram
  const exportDiagram = useCallback(() => {
    const data = { nodes, edges };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architecture-diagram.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  // AI-powered validation function
  const validateArchitecture = useCallback(() => {
    setIsValidating(true);
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Check for orphaned nodes
    const connectedNodeIds = new Set();
    edges.forEach(edge => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });
    
    const orphanedNodes = nodes.filter(node => !connectedNodeIds.has(node.id));
    if (orphanedNodes.length > 0) {
      issues.push(`${orphanedNodes.length} isolated elements found - consider connecting them to show relationships`);
    }

    // Check layer violations (ArchiMate 3.2 best practices)
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      if (sourceNode && targetNode) {
        const sourceType = (sourceNode.data as NodeData).type;
        const targetType = (targetNode.data as NodeData).type;
        
        // ArchiMate 3.2 Layer relationship rules
        // Business layer should not directly connect to Technology layer
        if (sourceType?.includes('business') && targetType?.includes('technology')) {
          issues.push(`ArchiMate 3.2 Violation: Direct connection between Business and Technology layers - consider adding Application layer`);
        }
        
        // Physical elements should connect to Technology layer
        if (sourceType?.includes('physical') && !targetType?.includes('technology')) {
          issues.push(`ArchiMate 3.2 Violation: Physical elements should connect to Technology layer`);
        }
        
        // Strategy elements should influence Motivation elements
        if (sourceType?.includes('strategy') && !targetType?.includes('motivation') && !targetType?.includes('business')) {
          issues.push(`ArchiMate 3.2 Violation: Strategy elements should influence Motivation or Business elements`);
        }
        
        // Implementation elements should realize other layers
        if (sourceType?.includes('implementation') && targetType?.includes('implementation')) {
          issues.push(`ArchiMate 3.2 Violation: Implementation elements should realize elements from other layers`);
        }
      }
    });

    // Check for required ArchiMate 3.2 relationships
    const businessNodes = nodes.filter(n => (n.data as NodeData).type?.includes('business'));
    const appNodes = nodes.filter(n => (n.data as NodeData).type?.includes('application'));
    const techNodes = nodes.filter(n => (n.data as NodeData).type?.includes('technology'));
    const motivationNodes = nodes.filter(n => (n.data as NodeData).type?.includes('goal') || (n.data as NodeData).type?.includes('principle') || (n.data as NodeData).type?.includes('requirement'));
    const strategyNodes = nodes.filter(n => (n.data as NodeData).type?.includes('strategy') || (n.data as NodeData).type?.includes('capability'));

    // Generate ArchiMate 3.2 compliant suggestions
    if (motivationNodes.length === 0 && nodes.length > 2) {
      suggestions.push("ArchiMate 3.2: Consider adding Motivation elements (Goals, Requirements, Principles) to define the 'why' of your architecture");
    }
    
    if (businessNodes.length > 0 && motivationNodes.length === 0) {
      suggestions.push("ArchiMate 3.2: Business elements should be motivated by Goals or Requirements from the Motivation layer");
    }
    
    if (strategyNodes.length === 0 && businessNodes.length > 2) {
      suggestions.push("ArchiMate 3.2: Consider adding Strategy elements (Capabilities, Resources) to bridge Motivation and Business layers");
    }
    
    if (nodes.length > 5 && !nodes.some(n => (n.data as NodeData).type?.includes('implementation'))) {
      suggestions.push("ArchiMate 3.2: Consider adding Implementation & Migration elements to show transformation path");
    }

    setValidationIssues(issues);
    setAiSuggestions(suggestions);
    setIsValidating(false);
  }, [nodes, edges]);

  // Auto-generate documentation
  const generateDocumentation = useCallback(() => {
    const doc = {
      title: "Enterprise Architecture Overview",
      elements: nodes.length,
      relationships: edges.length,
      layers: {
        business: nodes.filter(n => (n.data as NodeData).type?.includes('business')).length,
        application: nodes.filter(n => (n.data as NodeData).type?.includes('application')).length,
        technology: nodes.filter(n => (n.data as NodeData).type?.includes('technology')).length,
        physical: nodes.filter(n => (n.data as NodeData).type?.includes('physical') || (n.data as NodeData).type?.includes('equipment') || (n.data as NodeData).type?.includes('facility')).length,
        motivation: nodes.filter(n => (n.data as NodeData).type?.includes('goal') || (n.data as NodeData).type?.includes('principle') || (n.data as NodeData).type?.includes('requirement') || (n.data as NodeData).type?.includes('stakeholder')).length,
        strategy: nodes.filter(n => (n.data as NodeData).type?.includes('capability') || (n.data as NodeData).type?.includes('resource') || (n.data as NodeData).type?.includes('course-of-action')).length,
        implementation: nodes.filter(n => (n.data as NodeData).type?.includes('work-package') || (n.data as NodeData).type?.includes('deliverable') || (n.data as NodeData).type?.includes('plateau')).length,
      }
    };

    const docText = `# ${doc.title}

Generated on: ${new Date().toLocaleDateString()}

## Architecture Summary
- Total Elements: ${doc.elements}
- Total Relationships: ${doc.relationships}

## Layer Distribution (ArchiMate 3.2 Compliant)
- Business Layer: ${doc.layers.business} elements
- Application Layer: ${doc.layers.application} elements
- Technology Layer: ${doc.layers.technology} elements
- Physical Layer: ${doc.layers.physical} elements
- Motivation Layer: ${doc.layers.motivation} elements
- Strategy Layer: ${doc.layers.strategy} elements
- Implementation & Migration Layer: ${doc.layers.implementation} elements

## Elements Detail
${nodes.map(node => `- ${(node.data as NodeData).label || 'Unnamed'}: ${(node.data as NodeData).description || 'No description'}`).join('\n')}
`;

    const blob = new Blob([docText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architecture-documentation.md';
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  // Clear diagram
  const clearDiagram = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setValidationIssues([]);
    setAiSuggestions([]);
  }, [setNodes, setEdges]);

  return (
    <div className="h-screen flex bg-background">
      {/* Element Palette */}
      <div className="w-80 border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-lg">ArchiMate Elements</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Drag elements to add them to the canvas
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <Tabs defaultValue="Business" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="Business">Business</TabsTrigger>
              <TabsTrigger value="Application">Application</TabsTrigger>
              <TabsTrigger value="Technology">Technology</TabsTrigger>
            </TabsList>
            <TabsList className="grid w-full grid-cols-3 mt-2">
              <TabsTrigger value="Physical">Physical</TabsTrigger>
              <TabsTrigger value="Motivation">Motivation</TabsTrigger>
              <TabsTrigger value="Strategy">Strategy</TabsTrigger>
            </TabsList>
            <TabsList className="grid w-full grid-cols-1 mt-2">
              <TabsTrigger value="Implementation">Implementation</TabsTrigger>
            </TabsList>

            {["Business", "Application", "Technology", "Physical", "Motivation", "Strategy", "Implementation"].map(category => (
              <TabsContent key={category} value={category} className="space-y-2 mt-4">
                {ARCHIMATE_ELEMENTS
                  .filter(el => el.category === category)
                  .map(element => {
                    const IconComponent = element.icon;
                    return (
                      <Button
                        key={element.id}
                        variant="outline"
                        className="w-full justify-start h-auto p-3 hover:shadow-md"
                        onClick={() => addNode(element)}
                      >
                        <IconComponent className="w-4 h-4 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">{element.name}</div>
                          <Badge variant="outline" className={`mt-1 ${element.color} border-current`}>
                            {element.category}
                          </Badge>
                        </div>
                      </Button>
                    );
                  })}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Toolbar */}
        <div className="border-b bg-card p-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm">
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Redo className="w-4 h-4" />
              </Button>
            </div>
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Group className="w-4 h-4" />
                Group
              </Button>
              <Button variant="outline" size="sm">
                <Ungroup className="w-4 h-4" />
                Ungroup
              </Button>
            </div>
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4" />
                Fit View
              </Button>
            </div>
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={deleteSelectedNode}
                disabled={!selectedNode}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
              <Button variant="outline" size="sm" onClick={clearDiagram}>
                Clear All
              </Button>
            </div>
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={validateArchitecture}
                disabled={isValidating}
              >
                <Brain className="w-4 h-4" />
                {isValidating ? 'Validating...' : 'AI Validate'}
              </Button>
              <Button variant="outline" size="sm" onClick={generateDocumentation}>
                <Wand2 className="w-4 h-4" />
                Generate Docs
              </Button>
            </div>
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" onClick={exportDiagram}>
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4" />
                Import
              </Button>
              <Button variant="default" size="sm">
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <Badge variant="outline" className="text-xs">
                {nodes.length} elements • {edges.length} connections
              </Badge>
              <div className="text-xs text-muted-foreground">
                Professional Enterprise Architecture Tool
              </div>
            </div>
          </div>
        </div>

        {/* React Flow Canvas */}
        <div className="flex-1 flex">
          <div className="flex-1">
            <style jsx>{`
              .react-flow__pane {
                cursor: crosshair !important;
                background-color: rgba(0, 0, 0, 0.02) !important;
              }
              .react-flow__pane:active {
                cursor: grabbing !important;
              }
              .react-flow__node:hover {
                cursor: grab !important;
              }
              .react-flow__node.selected {
                cursor: move !important;
              }
              .react-flow__edge:hover {
                cursor: pointer !important;
              }
              /* Enhanced cursor visibility */
              * {
                cursor: auto !important;
              }
              .react-flow__pane * {
                cursor: crosshair !important;
              }
            `}</style>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onSelectionChange={onSelectionChange}
              nodeTypes={nodeTypes}
              fitView
              attributionPosition="bottom-left"
              className="bg-background"
              style={{ cursor: 'crosshair' }}
            >
              <Background 
                variant={BackgroundVariant.Dots} 
                gap={20} 
                size={1} 
                className="opacity-50"
              />
              <Controls 
                className="!bg-card !border !border-border !shadow-lg"
                showZoom={true}
                showFitView={true}
                showInteractive={true}
              />
              <MiniMap 
                className="!bg-card !border !border-border !shadow-lg"
                nodeColor="#10b981"
                maskColor="rgb(240, 240, 240, 0.6)"
                pannable
                zoomable
              />
            </ReactFlow>
          </div>

          {/* Properties Panel */}
          <div className="w-80 border-l bg-card flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-lg">Properties & AI Insights</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {/* AI Validation Results */}
              {(validationIssues.length > 0 || aiSuggestions.length > 0) && (
                <div className="mb-6 space-y-3">
                  <h4 className="font-medium text-sm">AI Analysis</h4>
                  
                  {validationIssues.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium">Issues Found</span>
                      </div>
                      {validationIssues.map((issue, index) => (
                        <div key={index} className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-200">
                          {issue}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {aiSuggestions.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">AI Suggestions</span>
                      </div>
                      {aiSuggestions.map((suggestion, index) => (
                        <div key={index} className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-200">
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {selectedNode ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Element Type</label>
                    <div className="mt-1">
                      <Badge 
                        variant="outline" 
                        className={
                          ARCHIMATE_ELEMENTS.find(el => el.id === selectedNode.data.type)?.color + 
                          " border-current"
                        }
                      >
                        {ARCHIMATE_ELEMENTS.find(el => el.id === selectedNode.data.type)?.name}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="label" className="text-sm font-medium">Name</label>
                    <Input
                      id="label"
                      value={((selectedNode.data as { label?: string }).label) || ''}
                      onChange={(e) => updateNodeProperty('label', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea
                      id="description"
                      value={((selectedNode.data as { description?: string }).description) || ''}
                      onChange={(e) => updateNodeProperty('description', e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Position</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div>
                        <label className="text-xs text-muted-foreground">X</label>
                        <Input
                          type="number"
                          value={Math.round(selectedNode.position.x)}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Y</label>
                        <Input
                          type="number"
                          value={Math.round(selectedNode.position.y)}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={deleteSelectedNode}
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Element
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Square className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select an element to view and edit its properties</p>
                  <p className="text-xs mt-2">
                    Click on elements or drag connections between them to create relationships
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}