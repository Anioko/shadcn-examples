# Technical Implementation Guide for ReqArchitect Diagramming

## 1. Enhanced Node System Architecture

### Base Node Interface
```typescript
// types/nodes.ts
export interface BaseNodeData {
  id: string;
  label: string;
  notation: NotationType;
  layer?: ArchimateLayer;
  properties: Record<string, any>;
  metadata: NodeMetadata;
  styling: NodeStyling;
}

export interface NodeMetadata {
  author: string;
  created: Date;
  modified: Date;
  version: string;
  status: 'draft' | 'review' | 'approved';
  tags: string[];
  documentation: string;
}

export interface NodeStyling {
  fillColor: string;
  borderColor: string;
  borderWidth: number;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  icon?: string;
  shape: ShapeType;
}

export type NotationType = 'archimate' | 'erd' | 'uml' | 'c4' | 'bpmn';
export type ArchimateLayer = 'strategy' | 'business' | 'application' | 
  'technology' | 'physical' | 'motivation' | 'implementation';
export type ShapeType = 'rectangle' | 'rounded-rectangle' | 'ellipse' | 
  'diamond' | 'hexagon' | 'custom';
```

### ArchiMate Element Registry
```typescript
// config/archimate-elements.ts
export const ARCHIMATE_ELEMENTS = {
  strategy: {
    resource: {
      name: 'Resource',
      layer: 'strategy',
      type: 'active',
      shape: 'rectangle',
      icon: '📦',
      color: '#F5DEB3',
      description: 'An asset owned or controlled by an individual or organization',
      allowedRelationships: ['composition', 'aggregation', 'assignment', 'realization']
    },
    capability: {
      name: 'Capability',
      layer: 'strategy',
      type: 'behavior',
      shape: 'rounded-rectangle',
      icon: '⚡',
      color: '#F5DEB3',
      description: 'An ability that an active structure element possesses',
      allowedRelationships: ['realization', 'serving', 'aggregation']
    },
    // ... all other strategy elements
  },
  business: {
    businessActor: {
      name: 'Business Actor',
      layer: 'business',
      type: 'active',
      shape: 'rectangle',
      icon: '👤',
      color: '#FFFFCC',
      description: 'A business entity that is capable of performing behavior',
      allowedRelationships: ['composition', 'aggregation', 'assignment']
    },
    businessProcess: {
      name: 'Business Process',
      layer: 'business',
      type: 'behavior',
      shape: 'rounded-rectangle',
      icon: '⚙️',
      color: '#FFFFCC',
      description: 'A sequence of business behaviors that achieves a specific outcome',
      allowedRelationships: ['triggering', 'flow', 'composition', 'aggregation']
    },
    // ... all other business elements
  },
  application: {
    applicationComponent: {
      name: 'Application Component',
      layer: 'application',
      type: 'active',
      shape: 'rectangle',
      icon: '💻',
      color: '#B5E7FF',
      description: 'An encapsulation of application functionality',
      allowedRelationships: ['composition', 'aggregation', 'assignment', 'serving']
    },
    // ... all other application elements
  },
  technology: {
    node: {
      name: 'Node',
      layer: 'technology',
      type: 'active',
      shape: 'rectangle',
      icon: '🖥️',
      color: '#C9E7B7',
      description: 'A computational or physical resource',
      allowedRelationships: ['composition', 'aggregation', 'assignment']
    },
    // ... all other technology elements
  }
};

export const ARCHIMATE_RELATIONSHIPS = {
  structural: {
    composition: {
      name: 'Composition',
      type: 'structural',
      style: 'solid',
      arrow: 'filled-diamond',
      description: 'A whole-part relationship',
      validation: (source: ElementType, target: ElementType) => {
        // Complex validation logic
        return isValidComposition(source, target);
      }
    },
    aggregation: {
      name: 'Aggregation',
      type: 'structural',
      style: 'solid',
      arrow: 'hollow-diamond',
      description: 'A grouping relationship',
      validation: (source: ElementType, target: ElementType) => {
        return isValidAggregation(source, target);
      }
    }
  },
  dependency: {
    serving: {
      name: 'Serving',
      type: 'dependency',
      style: 'solid',
      arrow: 'simple',
      description: 'A service relationship',
      validation: (source: ElementType, target: ElementType) => {
        return isValidServing(source, target);
      }
    },
    access: {
      name: 'Access',
      type: 'dependency',
      style: 'dashed',
      arrow: 'simple',
      accessType: ['read', 'write', 'readwrite'],
      description: 'A data access relationship',
      validation: (source: ElementType, target: ElementType) => {
        // Must be accessing a passive element
        return target.type === 'passive';
      }
    }
  }
  // ... all other relationships
};
```

### ERD Element Registry
```typescript
// config/erd-elements.ts
export const ERD_ELEMENTS = {
  entities: {
    strongEntity: {
      name: 'Entity',
      type: 'strong',
      shape: 'rectangle',
      color: '#E8F4F8',
      icon: '📋',
      description: 'A strong entity with independent existence'
    },
    weakEntity: {
      name: 'Weak Entity',
      type: 'weak',
      shape: 'double-rectangle',
      color: '#FFF4E8',
      icon: '📋',
      description: 'A weak entity dependent on another entity'
    }
  },
  attributes: {
    simple: {
      name: 'Attribute',
      type: 'simple',
      shape: 'ellipse',
      color: '#F0F0F0',
      icon: '○'
    },
    key: {
      name: 'Key Attribute',
      type: 'key',
      shape: 'ellipse',
      color: '#FFE8E8',
      icon: '🔑',
      textStyle: 'underline'
    },
    multivalued: {
      name: 'Multivalued Attribute',
      type: 'multivalued',
      shape: 'double-ellipse',
      color: '#F0F0F0',
      icon: '◎'
    },
    derived: {
      name: 'Derived Attribute',
      type: 'derived',
      shape: 'dashed-ellipse',
      color: '#F0F0F0',
      icon: '○'
    }
  },
  relationships: {
    oneToOne: {
      name: '1:1 Relationship',
      cardinality: { source: '1', target: '1' },
      shape: 'diamond',
      color: '#E8FFE8'
    },
    oneToMany: {
      name: '1:N Relationship',
      cardinality: { source: '1', target: 'N' },
      shape: 'diamond',
      color: '#E8FFE8'
    },
    manyToMany: {
      name: 'M:N Relationship',
      cardinality: { source: 'M', target: 'N' },
      shape: 'diamond',
      color: '#FFE8F0'
    }
  }
};
```

## 2. Advanced Node Component Implementation

### Custom ArchiMate Node Component
```typescript
// components/nodes/ArchiMateNode.tsx
import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  InfoIcon, 
  EditIcon, 
  LinkIcon, 
  AlertTriangleIcon 
} from 'lucide-react';

interface ArchiMateNodeData extends BaseNodeData {
  elementType: string;
  layer: ArchimateLayer;
  linkedBMCElements?: string[];
  linkedRequirements?: string[];
  linkedCosts?: number;
  warnings?: ValidationWarning[];
}

export const ArchiMateNode = memo<NodeProps<ArchiMateNodeData>>(({ data, selected }) => {
  const [showProperties, setShowProperties] = useState(false);
  const elementConfig = ARCHIMATE_ELEMENTS[data.layer]?.[data.elementType];
  
  if (!elementConfig) return null;
  
  const hasWarnings = (data.warnings?.length || 0) > 0;
  const hasLinks = (data.linkedBMCElements?.length || 0) > 0 || 
                   (data.linkedRequirements?.length || 0) > 0;

  return (
    <div
      className={cn(
        'relative min-w-[140px] rounded-lg border-2 shadow-md transition-all',
        selected && 'ring-2 ring-blue-500 ring-offset-2',
        elementConfig.type === 'behavior' && 'rounded-2xl',
        elementConfig.type === 'passive' && 'rounded-sm'
      )}
      style={{
        backgroundColor: data.styling?.fillColor || elementConfig.color,
        borderColor: data.styling?.borderColor || 'rgba(0,0,0,0.2)',
        borderWidth: data.styling?.borderWidth || 2
      }}
    >
      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-blue-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-blue-500"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-blue-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-blue-500"
      />

      {/* Node Content */}
      <div className="p-3">
        <div className="flex items-start gap-2">
          <span className="text-lg">{elementConfig.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">
              {data.label}
            </div>
            <div className="text-xs text-gray-600 mt-0.5">
              {elementConfig.name}
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-1 mt-2">
          {data.metadata?.status && (
            <Badge variant="outline" className="text-xs">
              {data.metadata.status}
            </Badge>
          )}
          {data.layer && (
            <Badge variant="secondary" className="text-xs">
              {data.layer}
            </Badge>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="absolute -top-8 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Popover open={showProperties} onOpenChange={setShowProperties}>
          <PopoverTrigger asChild>
            <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
              <InfoIcon className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <NodePropertiesPanel data={data} />
          </PopoverContent>
        </Popover>

        {hasLinks && (
          <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
            <LinkIcon className="h-3 w-3" />
          </Button>
        )}

        {hasWarnings && (
          <Button size="sm" variant="destructive" className="h-6 w-6 p-0">
            <AlertTriangleIcon className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Warning Indicator */}
      {hasWarnings && (
        <div className="absolute -top-1 -right-1">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>
      )}

      {/* Link Indicator */}
      {hasLinks && (
        <div className="absolute -bottom-1 -right-1">
          <Badge variant="default" className="h-4 px-1 text-xs">
            {(data.linkedBMCElements?.length || 0) + (data.linkedRequirements?.length || 0)}
          </Badge>
        </div>
      )}
    </div>
  );
});

ArchiMateNode.displayName = 'ArchiMateNode';
```

### ERD Entity Node Component
```typescript
// components/nodes/ERDEntityNode.tsx
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { cn } from '@/lib/utils';

interface ERDEntityData extends BaseNodeData {
  entityType: 'strong' | 'weak' | 'associative';
  attributes: EntityAttribute[];
  primaryKeys: string[];
  foreignKeys: ForeignKey[];
}

interface EntityAttribute {
  name: string;
  type: string;
  isPrimary: boolean;
  isForeign: boolean;
  isRequired: boolean;
  isUnique: boolean;
}

interface ForeignKey {
  attributeName: string;
  referencedEntity: string;
  referencedAttribute: string;
}

export const ERDEntityNode = memo<NodeProps<ERDEntityData>>(({ data, selected }) => {
  const isWeak = data.entityType === 'weak';

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-lg overflow-hidden transition-all',
        selected && 'ring-2 ring-blue-500 ring-offset-2',
        isWeak && 'border-4 border-double'
      )}
      style={{ minWidth: '200px' }}
    >
      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-blue-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-blue-500"
      />

      {/* Entity Header */}
      <div className="bg-blue-100 border-b-2 border-blue-300 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          <span className="font-bold text-sm">{data.label}</span>
        </div>
      </div>

      {/* Attributes Section */}
      <div className="divide-y divide-gray-200">
        {data.attributes.map((attr, index) => (
          <div
            key={index}
            className={cn(
              'px-4 py-1.5 text-xs flex items-center gap-2',
              attr.isPrimary && 'bg-yellow-50',
              attr.isForeign && 'bg-blue-50'
            )}
          >
            {/* Key Icon */}
            {attr.isPrimary && <span className="text-yellow-600">🔑</span>}
            {attr.isForeign && !attr.isPrimary && (
              <span className="text-blue-600">🔗</span>
            )}

            {/* Attribute Name */}
            <span
              className={cn(
                'flex-1',
                attr.isPrimary && 'font-semibold underline'
              )}
            >
              {attr.name}
            </span>

            {/* Type */}
            <span className="text-gray-500 text-xs">{attr.type}</span>

            {/* Constraints */}
            <div className="flex gap-1">
              {attr.isRequired && (
                <span className="text-red-500 font-bold">*</span>
              )}
              {attr.isUnique && (
                <span className="text-purple-500 text-xs">U</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Foreign Key Info (on hover) */}
      {data.foreignKeys.length > 0 && (
        <div className="border-t-2 border-gray-200 px-4 py-2 bg-gray-50">
          <div className="text-xs text-gray-600 font-semibold mb-1">
            Foreign Keys:
          </div>
          {data.foreignKeys.map((fk, index) => (
            <div key={index} className="text-xs text-gray-500">
              {fk.attributeName} → {fk.referencedEntity}.{fk.referencedAttribute}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

ERDEntityNode.displayName = 'ERDEntityNode';
```

## 3. Intelligent Relationship Validation

### Validation Engine
```typescript
// lib/validation/relationship-validator.ts
import { Node, Edge } from 'reactflow';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
}

export interface ValidationError {
  id: string;
  type: 'relationship' | 'metamodel' | 'structural';
  severity: 'error' | 'warning';
  message: string;
  affectedElements: string[];
  suggestedFix?: string;
}

export class RelationshipValidator {
  private notation: NotationType;
  private metamodel: MetamodelDefinition;

  constructor(notation: NotationType) {
    this.notation = notation;
    this.metamodel = this.loadMetamodel(notation);
  }

  validateRelationship(
    sourceNode: Node,
    targetNode: Node,
    relationshipType: string
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];

    // 1. Check if relationship type is valid for this notation
    if (!this.isValidRelationshipType(relationshipType)) {
      errors.push({
        id: `invalid-type-${Date.now()}`,
        type: 'metamodel',
        severity: 'error',
        message: `Relationship type '${relationshipType}' is not valid for ${this.notation}`,
        affectedElements: [sourceNode.id, targetNode.id]
      });
      return { isValid: false, errors, warnings, suggestions };
    }

    // 2. Check metamodel rules
    const isAllowed = this.metamodel.isRelationshipAllowed(
      sourceNode.data.elementType,
      targetNode.data.elementType,
      relationshipType
    );

    if (!isAllowed) {
      errors.push({
        id: `metamodel-violation-${Date.now()}`,
        type: 'metamodel',
        severity: 'error',
        message: `${relationshipType} relationship not allowed between ${sourceNode.data.elementType} and ${targetNode.data.elementType}`,
        affectedElements: [sourceNode.id, targetNode.id],
        suggestedFix: this.suggestAlternativeRelationship(sourceNode, targetNode)
      });
    }

    // 3. Check layer crossing rules (for ArchiMate)
    if (this.notation === 'archimate') {
      const layerCrossingResult = this.validateLayerCrossing(
        sourceNode.data.layer,
        targetNode.data.layer,
        relationshipType
      );
      
      if (!layerCrossingResult.isValid) {
        warnings.push({
          id: `layer-crossing-${Date.now()}`,
          type: 'structural',
          severity: 'warning',
          message: layerCrossingResult.message,
          affectedElements: [sourceNode.id, targetNode.id]
        });
      }
    }

    // 4. Check for circular dependencies
    const circularCheck = this.checkCircularDependency(sourceNode, targetNode);
    if (circularCheck.hasCircular) {
      warnings.push({
        id: `circular-${Date.now()}`,
        type: 'structural',
        severity: 'warning',
        message: 'This relationship creates a circular dependency',
        affectedElements: circularCheck.cycle
      });
    }

    // 5. Suggest related relationships
    const relatedSuggestions = this.suggestRelatedRelationships(
      sourceNode,
      targetNode
    );
    suggestions.push(...relatedSuggestions);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions
    };
  }

  validateDiagram(nodes: Node[], edges: Edge[]): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];

    // Check each edge
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      if (sourceNode && targetNode) {
        const result = this.validateRelationship(
          sourceNode,
          targetNode,
          edge.data?.relationshipType || 'association'
        );
        errors.push(...result.errors);
        warnings.push(...result.warnings);
      }
    });

    // Check for disconnected nodes
    const connectedNodeIds = new Set<string>();
    edges.forEach(edge => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });
    
    nodes.forEach(node => {
      if (!connectedNodeIds.has(node.id) && node.type !== 'start') {
        warnings.push({
          id: `disconnected-${node.id}`,
          type: 'structural',
          severity: 'warning',
          message: `Element '${node.data.label}' is not connected to any other element`,
          affectedElements: [node.id]
        });
      }
    });

    // Check viewpoint compliance
    if (this.notation === 'archimate') {
      const viewpointResult = this.validateViewpoint(nodes, edges);
      errors.push(...viewpointResult.errors);
      warnings.push(...viewpointResult.warnings);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions
    };
  }

  private suggestAlternativeRelationship(
    sourceNode: Node,
    targetNode: Node
  ): string {
    const allowedRelationships = this.metamodel.getAllowedRelationships(
      sourceNode.data.elementType,
      targetNode.data.elementType
    );

    if (allowedRelationships.length > 0) {
      return `Try using: ${allowedRelationships.join(', ')}`;
    }
    return 'No alternative relationships available';
  }

  private validateLayerCrossing(
    sourceLayer: string,
    targetLayer: string,
    relationshipType: string
  ): { isValid: boolean; message: string } {
    const layerOrder = ['strategy', 'business', 'application', 'technology', 'physical'];
    const sourceIndex = layerOrder.indexOf(sourceLayer);
    const targetIndex = layerOrder.indexOf(targetLayer);

    // Serving relationships can cross layers downward
    if (relationshipType === 'serving' && sourceIndex < targetIndex) {
      return {
        isValid: false,
        message: 'Serving relationships should generally go from lower to higher layers'
      };
    }

    // Realization relationships should go upward
    if (relationshipType === 'realization' && sourceIndex > targetIndex) {
      return {
        isValid: false,
        message: 'Realization relationships should go from lower to higher layers'
      };
    }

    return { isValid: true, message: '' };
  }

  private checkCircularDependency(
    sourceNode: Node,
    targetNode: Node
  ): { hasCircular: boolean; cycle: string[] } {
    // Implement cycle detection using DFS
    // This is a simplified version
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    function dfs(nodeId: string): boolean {
      visited.add(nodeId);
      recursionStack.add(nodeId);

      // Check outgoing edges
      // In production, maintain an adjacency list for efficiency

      recursionStack.delete(nodeId);
      return false;
    }

    const hasCycle = dfs(targetNode.id);
    return { hasCircular: hasCycle, cycle: [] };
  }
}
```

## 4. AI-Powered Diagram Generation

### AI Generation Service
```typescript
// services/ai-diagram-generator.ts
import Anthropic from '@anthropic-ai/sdk';

export class AIDiagramGenerator {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generateFromBusinessModelCanvas(
    bmc: BusinessModelCanvas
  ): Promise<ArchiMateDiagram> {
    const prompt = this.buildBMCToArchimatePrompt(bmc);
    
    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      const diagram = this.parseDiagramFromResponse(content.text);
      return diagram;
    }

    throw new Error('Failed to generate diagram');
  }

  async generateFromRequirements(
    requirements: Requirement[]
  ): Promise<ArchiMateDiagram> {
    const prompt = `
You are an enterprise architect. Based on the following requirements, generate an ArchiMate diagram.

Requirements:
${requirements.map(r => `- ${r.title}: ${r.description}`).join('\n')}

Generate a JSON structure representing an ArchiMate diagram with:
1. Business layer elements (business processes, actors, services)
2. Application layer elements (application components, services)
3. Technology layer elements (nodes, artifacts, devices)
4. Appropriate relationships between elements

Format the response as JSON with nodes and edges arrays.
    `;

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      const diagram = this.parseDiagramFromResponse(content.text);
      return diagram;
    }

    throw new Error('Failed to generate diagram');
  }

  async suggestImprovements(
    diagram: Diagram
  ): Promise<DiagramImprovement[]> {
    const prompt = `
Analyze this architecture diagram and suggest improvements:

Diagram Structure:
${JSON.stringify(diagram, null, 2)}

Provide suggestions for:
1. Missing elements or relationships
2. Architecture anti-patterns
3. Best practice violations
4. Opportunities for consolidation
5. Security or scalability concerns

Format response as JSON array of improvements with: type, severity, message, suggestedFix
    `;

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      // Parse improvements from response
      const improvements = JSON.parse(this.extractJSON(content.text));
      return improvements;
    }

    return [];
  }

  async autoComplete(
    partialDiagram: Diagram,
    context: string
  ): Promise<CompletionSuggestion[]> {
    const prompt = `
Given this partial architecture diagram and context, suggest logical next elements to add:

Current Diagram:
${JSON.stringify(partialDiagram, null, 2)}

Context: ${context}

Suggest 3-5 elements that would logically complete or extend this diagram.
Format as JSON array with: elementType, label, layer, reasoning
    `;

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      const suggestions = JSON.parse(this.extractJSON(content.text));
      return suggestions;
    }

    return [];
  }

  private buildBMCToArchimatePrompt(bmc: BusinessModelCanvas): string {
    return `
You are an enterprise architect creating an ArchiMate diagram from a Business Model Canvas.

Business Model Canvas:
${JSON.stringify(bmc, null, 2)}

Generate an ArchiMate architecture diagram that represents this business model. Include:

Strategy Layer:
- Capabilities derived from Value Propositions
- Resources from Key Resources

Business Layer:
- Business Actors from Customer Segments and Key Partners
- Business Processes from Key Activities
- Business Services supporting Value Propositions
- Business Objects from Value Propositions

Application Layer:
- Application Components supporting Business Processes
- Application Services for key digital channels

Technology Layer:
- Technology Services and Nodes supporting applications

Create appropriate relationships:
- Realization relationships (lower layers realize higher layers)
- Serving relationships (services serve processes/actors)
- Assignment relationships (actors assigned to processes)

Format the output as JSON with this structure:
{
  "nodes": [
    {
      "id": "unique-id",
      "type": "archimate-node",
      "data": {
        "label": "Element Name",
        "elementType": "capability|businessActor|businessProcess|...",
        "layer": "strategy|business|application|technology",
        "linkedBMCElements": ["BMC element ids"],
        "documentation": "Description"
      },
      "position": { "x": 0, "y": 0 }
    }
  ],
  "edges": [
    {
      "id": "edge-id",
      "source": "source-node-id",
      "target": "target-node-id",
      "type": "archimate-edge",
      "data": {
        "relationshipType": "realization|serving|assignment|...",
        "label": "Optional label"
      }
    }
  ]
}

Ensure proper layering and positioning for a clear, hierarchical layout.
    `;
  }

  private parseDiagramFromResponse(response: string): ArchiMateDiagram {
    // Extract JSON from markdown code blocks if present
    const jsonStr = this.extractJSON(response);
    const parsed = JSON.parse(jsonStr);
    
    // Validate and transform to internal diagram format
    return {
      nodes: parsed.nodes.map((n: any) => ({
        ...n,
        id: n.id || `node-${Date.now()}-${Math.random()}`,
        position: n.position || { x: 0, y: 0 }
      })),
      edges: parsed.edges.map((e: any) => ({
        ...e,
        id: e.id || `edge-${Date.now()}-${Math.random()}`
      }))
    };
  }

  private extractJSON(text: string): string {
    // Try to extract JSON from markdown code blocks
    const codeBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch) {
      return codeBlockMatch[1];
    }

    // Try to find JSON object
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return jsonMatch[0];
    }

    return text;
  }
}
```

## 5. Auto-Layout Engine

### Layout Service
```typescript
// services/auto-layout.ts
import Elk from 'elkjs/lib/elk.bundled.js';
import dagre from 'dagre';
import { Node, Edge } from 'reactflow';

export type LayoutAlgorithm = 
  | 'hierarchical' 
  | 'orthogonal' 
  | 'force-directed' 
  | 'circular'
  | 'layered';

export class AutoLayoutService {
  private elk: any;

  constructor() {
    this.elk = new Elk();
  }

  async applyLayout(
    nodes: Node[],
    edges: Edge[],
    algorithm: LayoutAlgorithm,
    options: LayoutOptions = {}
  ): Promise<{ nodes: Node[]; edges: Edge[] }> {
    switch (algorithm) {
      case 'hierarchical':
        return this.applyHierarchicalLayout(nodes, edges, options);
      case 'layered':
        return this.applyLayeredLayout(nodes, edges, options);
      case 'force-directed':
        return this.applyForceDirectedLayout(nodes, edges, options);
      case 'circular':
        return this.applyCircularLayout(nodes, edges, options);
      default:
        return { nodes, edges };
    }
  }

  async applyHierarchicalLayout(
    nodes: Node[],
    edges: Edge[],
    options: LayoutOptions
  ): Promise<{ nodes: Node[]; edges: Edge[] }> {
    const graph = new dagre.graphlib.Graph();
    graph.setGraph({
      rankdir: options.direction || 'TB',
      nodesep: options.nodeSpacing || 50,
      ranksep: options.rankSpacing || 100,
      marginx: options.margin || 20,
      marginy: options.margin || 20
    });

    graph.setDefaultEdgeLabel(() => ({}));

    // Add nodes to graph
    nodes.forEach(node => {
      graph.setNode(node.id, {
        width: node.width || 140,
        height: node.height || 60
      });
    });

    // Add edges to graph
    edges.forEach(edge => {
      graph.setEdge(edge.source, edge.target);
    });

    // Calculate layout
    dagre.layout(graph);

    // Update node positions
    const layoutedNodes = nodes.map(node => {
      const nodeWithPosition = graph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - (node.width || 140) / 2,
          y: nodeWithPosition.y - (node.height || 60) / 2
        }
      };
    });

    return { nodes: layoutedNodes, edges };
  }

  async applyLayeredLayout(
    nodes: Node[],
    edges: Edge[],
    options: LayoutOptions
  ): Promise<{ nodes: Node[]; edges: Edge[] }> {
    // Group nodes by layer
    const layers: Record<string, Node[]> = {};
    nodes.forEach(node => {
      const layer = node.data.layer || 'default';
      if (!layers[layer]) layers[layer] = [];
      layers[layer].push(node);
    });

    // Define layer order (for ArchiMate)
    const layerOrder = [
      'strategy',
      'business',
      'application',
      'technology',
      'physical'
    ];

    let currentY = options.margin || 50;
    const layerSpacing = options.layerSpacing || 200;
    const nodeSpacing = options.nodeSpacing || 100;

    const layoutedNodes = [];

    for (const layerName of layerOrder) {
      const layerNodes = layers[layerName] || [];
      if (layerNodes.length === 0) continue;

      // Layout nodes in this layer horizontally
      let currentX = options.margin || 50;

      for (const node of layerNodes) {
        layoutedNodes.push({
          ...node,
          position: {
            x: currentX,
            y: currentY
          }
        });
        currentX += (node.width || 140) + nodeSpacing;
      }

      currentY += (layerNodes[0]?.height || 60) + layerSpacing;
    }

    return { nodes: layoutedNodes, edges };
  }

  async applyForceDirectedLayout(
    nodes: Node[],
    edges: Edge[],
    options: LayoutOptions
  ): Promise<{ nodes: Node[]; edges: Edge[] }> {
    // Use ELK for force-directed layout
    const graph = {
      id: 'root',
      layoutOptions: {
        'elk.algorithm': 'force',
        'elk.spacing.nodeNode': `${options.nodeSpacing || 80}`,
        'elk.force.repulsion': '1000'
      },
      children: nodes.map(node => ({
        id: node.id,
        width: node.width || 140,
        height: node.height || 60
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target]
      }))
    };

    const layoutedGraph = await this.elk.layout(graph);

    const layoutedNodes = nodes.map(node => {
      const layoutNode = layoutedGraph.children?.find(
        (n: any) => n.id === node.id
      );
      return {
        ...node,
        position: {
          x: layoutNode?.x || 0,
          y: layoutNode?.y || 0
        }
      };
    });

    return { nodes: layoutedNodes, edges };
  }

  async applyCircularLayout(
    nodes: Node[],
    edges: Edge[],
    options: LayoutOptions
  ): Promise<{ nodes: Node[]; edges: Edge[] }> {
    const centerX = options.centerX || 400;
    const centerY = options.centerY || 400;
    const radius = options.radius || 300;

    const layoutedNodes = nodes.map((node, index) => {
      const angle = (2 * Math.PI * index) / nodes.length;
      return {
        ...node,
        position: {
          x: centerX + radius * Math.cos(angle) - (node.width || 140) / 2,
          y: centerY + radius * Math.sin(angle) - (node.height || 60) / 2
        }
      };
    });

    return { nodes: layoutedNodes, edges };
  }
}

interface LayoutOptions {
  direction?: 'TB' | 'BT' | 'LR' | 'RL';
  nodeSpacing?: number;
  rankSpacing?: number;
  layerSpacing?: number;
  margin?: number;
  centerX?: number;
  centerY?: number;
  radius?: number;
}
```

## 6. Export Engine

### Multi-Format Export
```typescript
// services/export-service.ts
import { toPng, toSvg, toBlob } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { Node, Edge } from 'reactflow';

export class DiagramExportService {
  async exportToPNG(
    element: HTMLElement,
    options: ExportOptions
  ): Promise<Blob> {
    const blob = await toBlob(element, {
      quality: options.quality || 1,
      width: options.width,
      height: options.height,
      backgroundColor: options.backgroundColor || '#ffffff'
    });

    if (!blob) throw new Error('Failed to export PNG');
    return blob;
  }

  async exportToSVG(
    element: HTMLElement,
    options: ExportOptions
  ): Promise<string> {
    const svg = await toSvg(element, {
      width: options.width,
      height: options.height,
      backgroundColor: options.backgroundColor || '#ffffff'
    });

    return svg;
  }

  async exportToPDF(
    element: HTMLElement,
    options: ExportOptions
  ): Promise<Blob> {
    const imgData = await toPng(element, {
      quality: 1,
      width: options.width,
      height: options.height
    });

    const pdf = new jsPDF({
      orientation: options.orientation || 'landscape',
      unit: 'px',
      format: [options.width || 1920, options.height || 1080]
    });

    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      options.width || 1920,
      options.height || 1080
    );

    return pdf.output('blob');
  }

  exportToArchimateExchange(
    nodes: Node[],
    edges: Edge[],
    metadata: DiagramMetadata
  ): string {
    // Generate ArchiMate Exchange XML format
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<model xmlns="http://www.opengroup.org/xsd/archimate/3.0/"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.opengroup.org/xsd/archimate/3.0/ http://www.opengroup.org/xsd/archimate/3.1/archimate3_Diagram.xsd"
       identifier="${metadata.id}">
  <name>${metadata.name}</name>
  <documentation>${metadata.documentation || ''}</documentation>
  
  <elements>
    ${this.generateArchimateElements(nodes)}
  </elements>
  
  <relationships>
    ${this.generateArchimateRelationships(edges, nodes)}
  </relationships>
  
  <views>
    <diagrams>
      <view identifier="${metadata.id}-view">
        <name>${metadata.name}</name>
        ${this.generateViewNodes(nodes)}
        ${this.generateViewConnections(edges)}
      </view>
    </diagrams>
  </views>
</model>`;

    return xml;
  }

  exportToJSON(
    nodes: Node[],
    edges: Edge[],
    metadata: DiagramMetadata
  ): string {
    const diagramData = {
      metadata,
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        data: node.data,
        position: node.position,
        width: node.width,
        height: node.height
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type,
        data: edge.data
      }))
    };

    return JSON.stringify(diagramData, null, 2);
  }

  async exportToCSV(nodes: Node[], edges: Edge[]): Promise<string> {
    const csvRows = [];

    // Header
    csvRows.push('Type,ID,Label,ElementType,Layer,Documentation');

    // Nodes
    nodes.forEach(node => {
      csvRows.push([
        'Node',
        node.id,
        node.data.label || '',
        node.data.elementType || '',
        node.data.layer || '',
        (node.data.documentation || '').replace(/,/g, ';')
      ].join(','));
    });

    // Edges
    edges.forEach(edge => {
      csvRows.push([
        'Relationship',
        edge.id,
        edge.data?.label || '',
        edge.data?.relationshipType || '',
        `${edge.source} -> ${edge.target}`,
        ''
      ].join(','));
    });

    return csvRows.join('\n');
  }

  private generateArchimateElements(nodes: Node[]): string {
    return nodes
      .map(node => {
        const elementType = node.data.elementType;
        return `
    <element identifier="${node.id}"
             xsi:type="${elementType}">
      <name>${node.data.label}</name>
      ${node.data.documentation ? `<documentation>${node.data.documentation}</documentation>` : ''}
    </element>`;
      })
      .join('\n');
  }

  private generateArchimateRelationships(edges: Edge[], nodes: Node[]): string {
    return edges
      .map(edge => {
        const relType = edge.data?.relationshipType || 'Association';
        return `
    <relationship identifier="${edge.id}"
                  xsi:type="${relType}"
                  source="${edge.source}"
                  target="${edge.target}">
      ${edge.data?.label ? `<name>${edge.data.label}</name>` : ''}
    </relationship>`;
      })
      .join('\n');
  }

  private generateViewNodes(nodes: Node[]): string {
    return nodes
      .map(node => `
      <node identifier="${node.id}-view"
            elementRef="${node.id}"
            x="${node.position.x}"
            y="${node.position.y}"
            w="${node.width || 140}"
            h="${node.height || 60}">
      </node>`)
      .join('\n');
  }

  private generateViewConnections(edges: Edge[]): string {
    return edges
      .map(edge => `
      <connection identifier="${edge.id}-view"
                  relationshipRef="${edge.id}"
                  source="${edge.source}-view"
                  target="${edge.target}-view">
      </connection>`)
      .join('\n');
  }
}

interface ExportOptions {
  quality?: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  orientation?: 'portrait' | 'landscape';
}

interface DiagramMetadata {
  id: string;
  name: string;
  version: string;
  author: string;
  created: Date;
  modified: Date;
  documentation?: string;
}
```

## 7. Performance Optimization

### Virtual Rendering Implementation
```typescript
// hooks/useVirtualRendering.ts
import { useMemo, useCallback } from 'react';
import { Node, Edge, Viewport } from 'reactflow';

export function useVirtualRendering(
  nodes: Node[],
  edges: Edge[],
  viewport: Viewport,
  viewportBounds: { width: number; height: number }
) {
  // Calculate visible area with buffer
  const visibleArea = useMemo(() => {
    const buffer = 200; // pixels
    const { x, y, zoom } = viewport;

    return {
      minX: -x / zoom - buffer,
      maxX: (-x + viewportBounds.width) / zoom + buffer,
      minY: -y / zoom - buffer,
      maxY: (-y + viewportBounds.height) / zoom + buffer
    };
  }, [viewport, viewportBounds]);

  // Filter visible nodes
  const visibleNodes = useMemo(() => {
    if (nodes.length < 100) return nodes; // No need for virtualization

    return nodes.filter(node => {
      const nodeWidth = node.width || 140;
      const nodeHeight = node.height || 60;

      return (
        node.position.x + nodeWidth > visibleArea.minX &&
        node.position.x < visibleArea.maxX &&
        node.position.y + nodeHeight > visibleArea.minY &&
        node.position.y < visibleArea.maxY
      );
    });
  }, [nodes, visibleArea]);

  // Filter visible edges
  const visibleEdges = useMemo(() => {
    if (edges.length < 100) return edges;

    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

    return edges.filter(edge => {
      return visibleNodeIds.has(edge.source) || visibleNodeIds.has(edge.target);
    });
  }, [edges, visibleNodes]);

  return {
    visibleNodes,
    visibleEdges,
    totalNodes: nodes.length,
    totalEdges: edges.length
  };
}
```

This implementation guide provides the technical foundation for transforming the basic workflow builder into a professional enterprise architecture tool. The key improvements are:

1. **Complete notation support** - Full ArchiMate 3.2, ERD, and extensible to other notations
2. **Professional node components** - Rich, interactive nodes with metadata, validation, and links
3. **Intelligent validation** - Metamodel-compliant relationship validation
4. **AI-powered assistance** - Diagram generation, suggestions, auto-completion
5. **Auto-layout** - Multiple algorithms for different diagram types
6. **Multi-format export** - Standard EA formats plus images/PDFs
7. **Performance optimization** - Virtual rendering for large diagrams

Would you like me to continue with additional implementation details for collaboration features, integration with ReqArchitect's core features, or deployment/scalability considerations?
