# ReqArchitect Integration Guide: Diagramming + Business Features

## Overview

This guide shows how to integrate the enhanced enterprise architecture diagramming tool with ReqArchitect's unique startup-focused features: Business Model Canvas, Requirements Management, Cost Tracking, and AI Assistance.

## 1. Business Model Canvas → Architecture Diagram Flow

### Bidirectional Linking System

```typescript
// types/bmc-architecture-link.ts
export interface BMCArchitectureLink {
  bmcElementId: string;
  bmcElementType: BMCElementType;
  architectureElementId: string;
  architectureElementType: string;
  linkType: 'realizes' | 'supports' | 'requires' | 'costs';
  strength: 'strong' | 'medium' | 'weak';
  notes?: string;
}

export type BMCElementType =
  | 'customer-segment'
  | 'value-proposition'
  | 'channel'
  | 'customer-relationship'
  | 'revenue-stream'
  | 'key-resource'
  | 'key-activity'
  | 'key-partnership'
  | 'cost-structure';

// Mapping rules from BMC to ArchiMate
export const BMC_TO_ARCHIMATE_MAPPING = {
  'value-proposition': {
    archimateElements: ['capability', 'businessService', 'product'],
    layer: 'strategy',
    reasoning: 'Value propositions represent strategic capabilities'
  },
  'customer-segment': {
    archimateElements: ['businessActor', 'businessRole'],
    layer: 'business',
    reasoning: 'Customer segments are business actors/roles'
  },
  'channel': {
    archimateElements: ['businessInterface', 'applicationInterface', 'applicationComponent'],
    layer: ['business', 'application'],
    reasoning: 'Channels are interfaces through which value is delivered'
  },
  'key-activity': {
    archimateElements: ['businessProcess', 'businessFunction'],
    layer: 'business',
    reasoning: 'Key activities are business processes/functions'
  },
  'key-resource': {
    archimateElements: ['resource', 'businessObject', 'applicationComponent', 'node'],
    layer: ['strategy', 'business', 'application', 'technology'],
    reasoning: 'Resources can be strategic, informational, or technical'
  },
  'key-partnership': {
    archimateElements: ['businessActor', 'businessCollaboration'],
    layer: 'business',
    reasoning: 'Partnerships are external business actors'
  },
  'revenue-stream': {
    archimateElements: ['businessService', 'product', 'contract'],
    layer: 'business',
    reasoning: 'Revenue streams are monetized services/products'
  },
  'cost-structure': {
    archimateElements: ['resource', 'node', 'applicationComponent'],
    layer: ['strategy', 'application', 'technology'],
    reasoning: 'Costs are associated with resources and infrastructure'
  }
};
```

### Visual Linkage Component

```typescript
// components/BMCArchitectureLinker.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Link2, 
  Sparkles, 
  Eye 
} from 'lucide-react';

interface BMCArchitectureLinkerProps {
  bmc: BusinessModelCanvas;
  diagram: ArchiMateDiagram;
  onGenerateDiagram: () => void;
  onShowLinks: (elementId: string) => void;
}

export function BMCArchitectureLinker({
  bmc,
  diagram,
  onGenerateDiagram,
  onShowLinks
}: BMCArchitectureLinkerProps) {
  const [selectedBMCElement, setSelectedBMCElement] = useState<string | null>(null);

  const getLinkCount = (bmcElementId: string) => {
    return diagram.nodes.filter(node => 
      node.data.linkedBMCElements?.includes(bmcElementId)
    ).length;
  };

  const getCoverage = () => {
    const bmcElements = Object.keys(bmc);
    const linkedElements = bmcElements.filter(id => getLinkCount(id) > 0);
    return Math.round((linkedElements.length / bmcElements.length) * 100);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Business Model Canvas Side */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Business Model Canvas</span>
            <Badge variant="secondary">
              {getCoverage()}% Coverage
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(bmc).map(([key, value]) => {
              const linkCount = getLinkCount(key);
              return (
                <div
                  key={key}
                  className={cn(
                    'p-3 rounded-lg border-2 cursor-pointer transition-all',
                    selectedBMCElement === key && 'border-blue-500 bg-blue-50',
                    linkCount === 0 && 'border-red-200 bg-red-50'
                  )}
                  onClick={() => setSelectedBMCElement(key)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">
                        {formatBMCLabel(key)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {value.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {linkCount > 0 ? (
                        <Badge variant="default">
                          <Link2 className="h-3 w-3 mr-1" />
                          {linkCount}
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          Not Linked
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onShowLinks(key);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-2">
            <Button
              className="w-full"
              onClick={onGenerateDiagram}
              disabled={Object.keys(bmc).length === 0}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Architecture from BMC
            </Button>
            <p className="text-xs text-gray-500 text-center">
              AI will create an architecture diagram based on your business model
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Architecture Diagram Side */}
      <Card>
        <CardHeader>
          <CardTitle>Architecture Elements</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedBMCElement ? (
            <LinkedArchitectureElements
              bmcElementId={selectedBMCElement}
              diagram={diagram}
            />
          ) : (
            <div className="text-center text-gray-500 py-8">
              Select a BMC element to see linked architecture components
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function LinkedArchitectureElements({ 
  bmcElementId, 
  diagram 
}: { 
  bmcElementId: string; 
  diagram: ArchiMateDiagram 
}) {
  const linkedNodes = diagram.nodes.filter(node =>
    node.data.linkedBMCElements?.includes(bmcElementId)
  );

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold mb-2">
        Linked Architecture Elements ({linkedNodes.length})
      </div>
      {linkedNodes.map(node => (
        <div key={node.id} className="p-3 border rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getElementIcon(node.data.elementType)}</span>
            <div className="flex-1">
              <div className="font-medium text-sm">{node.data.label}</div>
              <div className="text-xs text-gray-600">
                {node.data.elementType} • {node.data.layer} layer
              </div>
            </div>
            <Badge variant="outline">{node.data.layer}</Badge>
          </div>
        </div>
      ))}
      
      {linkedNodes.length === 0 && (
        <div className="text-sm text-gray-500 text-center py-4">
          No architecture elements linked yet
        </div>
      )}
    </div>
  );
}
```

### AI-Powered BMC → Diagram Generation

```typescript
// services/bmc-to-diagram-service.ts
export class BMCToDiagramService {
  private aiGenerator: AIDiagramGenerator;

  constructor() {
    this.aiGenerator = new AIDiagramGenerator(process.env.ANTHROPIC_API_KEY!);
  }

  async generateFromBMC(bmc: BusinessModelCanvas): Promise<GenerationResult> {
    // Step 1: Analyze BMC and create generation plan
    const plan = await this.createGenerationPlan(bmc);

    // Step 2: Generate Strategy Layer (Capabilities from Value Props)
    const strategyElements = await this.generateStrategyLayer(bmc.valuePropositions);

    // Step 3: Generate Business Layer (Processes, Actors, Services)
    const businessElements = await this.generateBusinessLayer(
      bmc.customerSegments,
      bmc.keyActivities,
      bmc.channels,
      bmc.keyPartnerships
    );

    // Step 4: Generate Application Layer (Apps supporting business)
    const applicationElements = await this.generateApplicationLayer(
      bmc.channels,
      bmc.keyActivities
    );

    // Step 5: Generate Technology Layer (Infrastructure for apps)
    const technologyElements = await this.generateTechnologyLayer(
      bmc.keyResources,
      bmc.costStructure
    );

    // Step 6: Create relationships between layers
    const relationships = await this.generateRelationships(
      strategyElements,
      businessElements,
      applicationElements,
      technologyElements
    );

    // Step 7: Apply auto-layout
    const layoutService = new AutoLayoutService();
    const layouted = await layoutService.applyLayout(
      [...strategyElements, ...businessElements, ...applicationElements, ...technologyElements],
      relationships,
      'layered',
      { layerSpacing: 250, nodeSpacing: 100 }
    );

    // Step 8: Add BMC links metadata
    const nodesWithLinks = this.addBMCLinks(layouted.nodes, bmc);

    return {
      nodes: nodesWithLinks,
      edges: layouted.edges,
      metadata: {
        generatedFrom: 'bmc',
        timestamp: new Date(),
        coverage: this.calculateCoverage(nodesWithLinks, bmc)
      }
    };
  }

  private async createGenerationPlan(bmc: BusinessModelCanvas): Promise<GenerationPlan> {
    const prompt = `
Analyze this Business Model Canvas and create a generation plan for an ArchiMate architecture:

${JSON.stringify(bmc, null, 2)}

For each BMC element, identify:
1. What ArchiMate elements should be created
2. Which layer they belong to
3. How they relate to other elements
4. Reasoning for the mapping

Return JSON with structure:
{
  "elements": [
    {
      "bmcSource": "value-proposition-1",
      "archimateElement": "capability",
      "label": "Suggested name",
      "layer": "strategy",
      "reasoning": "Why this mapping"
    }
  ],
  "relationships": [
    {
      "source": "element-id",
      "target": "element-id",
      "type": "realization",
      "reasoning": "Why this relationship"
    }
  ]
}
    `;

    const response = await this.aiGenerator.generatePlanFromPrompt(prompt);
    return response;
  }

  private addBMCLinks(nodes: Node[], bmc: BusinessModelCanvas): Node[] {
    return nodes.map(node => {
      // Determine which BMC elements this architecture element relates to
      const linkedBMCElements = this.findLinkedBMCElements(node, bmc);
      
      return {
        ...node,
        data: {
          ...node.data,
          linkedBMCElements,
          bmcContext: this.getBMCContext(linkedBMCElements, bmc)
        }
      };
    });
  }

  private findLinkedBMCElements(node: Node, bmc: BusinessModelCanvas): string[] {
    // Use AI or rule-based matching to find connections
    // For example, if node.data.label contains keywords from a BMC element
    const links: string[] = [];

    // Check each BMC element for semantic similarity
    Object.entries(bmc).forEach(([key, value]) => {
      const similarity = this.calculateSimilarity(
        node.data.label + ' ' + node.data.documentation,
        value.description
      );

      if (similarity > 0.7) {
        links.push(key);
      }
    });

    return links;
  }

  private calculateCoverage(nodes: Node[], bmc: BusinessModelCanvas): number {
    const bmcElementsCount = Object.keys(bmc).length;
    const linkedElements = new Set<string>();

    nodes.forEach(node => {
      node.data.linkedBMCElements?.forEach((id: string) => {
        linkedElements.add(id);
      });
    });

    return (linkedElements.size / bmcElementsCount) * 100;
  }
}
```

## 2. Requirements → Architecture Traceability

### Requirements-Architecture Matrix

```typescript
// components/RequirementsTraceabilityMatrix.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  X, 
  AlertTriangle,
  ArrowRight 
} from 'lucide-react';

interface RequirementsTraceabilityMatrixProps {
  requirements: Requirement[];
  diagram: ArchiMateDiagram;
  onLinkRequirement: (reqId: string, elementId: string) => void;
  onShowGaps: () => void;
}

export function RequirementsTraceabilityMatrix({
  requirements,
  diagram,
  onLinkRequirement,
  onShowGaps
}: RequirementsTraceabilityMatrixProps) {
  const getImplementingElements = (reqId: string) => {
    return diagram.nodes.filter(node =>
      node.data.linkedRequirements?.includes(reqId)
    );
  };

  const getCoverageStatus = (reqId: string) => {
    const elements = getImplementingElements(reqId);
    if (elements.length === 0) return 'not-covered';
    if (elements.length < 2) return 'partial';
    return 'covered';
  };

  const overallCoverage = () => {
    const covered = requirements.filter(r => 
      getCoverageStatus(r.id) === 'covered'
    ).length;
    return Math.round((covered / requirements.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Requirements Coverage</span>
            <div className="flex items-center gap-4">
              <Badge variant={overallCoverage() >= 80 ? 'default' : 'destructive'}>
                {overallCoverage()}% Covered
              </Badge>
              <Button size="sm" variant="outline" onClick={onShowGaps}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Show Gaps
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <StatusCard
              label="Covered"
              count={requirements.filter(r => getCoverageStatus(r.id) === 'covered').length}
              color="green"
            />
            <StatusCard
              label="Partially Covered"
              count={requirements.filter(r => getCoverageStatus(r.id) === 'partial').length}
              color="yellow"
            />
            <StatusCard
              label="Not Covered"
              count={requirements.filter(r => getCoverageStatus(r.id) === 'not-covered').length}
              color="red"
            />
          </div>
        </CardContent>
      </Card>

      {/* Traceability Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Requirement → Architecture Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requirements.map(req => {
              const elements = getImplementingElements(req.id);
              const status = getCoverageStatus(req.id);

              return (
                <div
                  key={req.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Requirement Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={req.priority === 'high' ? 'destructive' : 'secondary'}>
                          {req.priority}
                        </Badge>
                        <span className="font-semibold">{req.title}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {req.description}
                      </p>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-2">
                      {status === 'covered' && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      {status === 'partial' && (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      {status === 'not-covered' && (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>

                  {/* Implementing Elements */}
                  {elements.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-blue-200">
                      <div className="text-xs font-semibold text-gray-700 mb-2">
                        Implemented by:
                      </div>
                      <div className="space-y-2">
                        {elements.map(element => (
                          <div
                            key={element.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <ArrowRight className="h-3 w-3 text-gray-400" />
                            <span>{element.data.label}</span>
                            <Badge variant="outline" className="text-xs">
                              {element.data.layer}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action: Add Implementation */}
                  {status === 'not-covered' && (
                    <div className="mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onLinkRequirement(req.id, '')}
                      >
                        Link to Architecture
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Impact Analysis When Requirements Change

```typescript
// services/impact-analysis-service.ts
export class ImpactAnalysisService {
  analyzeRequirementChange(
    requirement: Requirement,
    changeType: 'added' | 'modified' | 'removed',
    diagram: ArchiMateDiagram
  ): ImpactAnalysisResult {
    const impactedElements: Node[] = [];
    const impactedRelationships: Edge[] = [];
    const recommendations: string[] = [];
    const estimatedEffort: EffortEstimate = {
      hours: 0,
      complexity: 'low'
    };

    // Find directly linked elements
    const directlyLinked = diagram.nodes.filter(node =>
      node.data.linkedRequirements?.includes(requirement.id)
    );

    impactedElements.push(...directlyLinked);

    // Find indirectly impacted elements (via relationships)
    const indirectlyImpacted = this.findIndirectImpact(
      directlyLinked,
      diagram
    );

    impactedElements.push(...indirectlyImpacted);

    // Analyze impact by layer
    const layerImpact = this.analyzeLayerImpact(impactedElements);

    // Generate recommendations
    if (changeType === 'added') {
      recommendations.push(
        'Consider which existing architecture elements can support this requirement'
      );
      
      if (impactedElements.length === 0) {
        recommendations.push(
          '⚠️ This requirement has no implementing architecture elements. New components may need to be designed.'
        );
        estimatedEffort.complexity = 'high';
      }
    }

    if (changeType === 'modified') {
      if (layerImpact.application > 2) {
        recommendations.push(
          '⚠️ This change impacts multiple application components. Consider backward compatibility.'
        );
        estimatedEffort.complexity = 'medium';
      }
    }

    if (changeType === 'removed') {
      if (impactedElements.length > 0) {
        recommendations.push(
          `⚠️ ${impactedElements.length} architecture elements currently implement this requirement. Review if they should be deprecated.`
        );
      }
    }

    // Estimate effort
    estimatedEffort.hours = this.estimateEffort(impactedElements, layerImpact);

    return {
      impactedElements,
      impactedRelationships,
      recommendations,
      estimatedEffort,
      layerImpact
    };
  }

  private findIndirectImpact(
    directElements: Node[],
    diagram: ArchiMateDiagram
  ): Node[] {
    const indirectIds = new Set<string>();
    const queue = [...directElements];
    const visited = new Set(directElements.map(n => n.id));

    while (queue.length > 0) {
      const current = queue.shift()!;

      // Find relationships where current is source or target
      const relatedEdges = diagram.edges.filter(
        edge => edge.source === current.id || edge.target === current.id
      );

      relatedEdges.forEach(edge => {
        const relatedId = edge.source === current.id ? edge.target : edge.source;
        
        if (!visited.has(relatedId)) {
          visited.add(relatedId);
          indirectIds.add(relatedId);

          // Only traverse one level for indirect impact
          // Can be made recursive for deeper analysis
        }
      });
    }

    return diagram.nodes.filter(node => indirectIds.has(node.id));
  }

  private analyzeLayerImpact(elements: Node[]): LayerImpact {
    const impact: LayerImpact = {
      strategy: 0,
      business: 0,
      application: 0,
      technology: 0,
      physical: 0
    };

    elements.forEach(element => {
      const layer = element.data.layer;
      if (layer && layer in impact) {
        impact[layer as keyof LayerImpact]++;
      }
    });

    return impact;
  }

  private estimateEffort(
    elements: Node[],
    layerImpact: LayerImpact
  ): number {
    // Simple heuristic: 4 hours per application element, 2 per business, etc.
    return (
      layerImpact.strategy * 8 +
      layerImpact.business * 3 +
      layerImpact.application * 4 +
      layerImpact.technology * 6 +
      layerImpact.physical * 8
    );
  }
}

interface ImpactAnalysisResult {
  impactedElements: Node[];
  impactedRelationships: Edge[];
  recommendations: string[];
  estimatedEffort: EffortEstimate;
  layerImpact: LayerImpact;
}

interface EffortEstimate {
  hours: number;
  complexity: 'low' | 'medium' | 'high';
}

interface LayerImpact {
  strategy: number;
  business: number;
  application: number;
  technology: number;
  physical: number;
}
```

## 3. Cost Tracking Integration

### Cost-Architecture Mapping

```typescript
// components/CostArchitectureView.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertCircle 
} from 'lucide-react';

interface CostArchitectureViewProps {
  diagram: ArchiMateDiagram;
  costs: CostData[];
  onAllocateCost: (elementId: string) => void;
}

export function CostArchitectureView({
  diagram,
  costs,
  onAllocateCost
}: CostArchitectureViewProps) {
  const getTotalCost = (layer: string) => {
    const layerNodes = diagram.nodes.filter(n => n.data.layer === layer);
    return layerNodes.reduce((sum, node) => {
      const nodeCosts = costs.filter(c => c.architectureElementId === node.id);
      return sum + nodeCosts.reduce((s, c) => s + c.monthlyAmount, 0);
    }, 0);
  };

  const getElementCost = (elementId: string) => {
    const elementCosts = costs.filter(c => c.architectureElementId === elementId);
    return elementCosts.reduce((sum, c) => sum + c.monthlyAmount, 0);
  };

  const getUnallocatedCosts = () => {
    return costs.filter(c => !c.architectureElementId);
  };

  const totalMonthlyCost = costs.reduce((sum, c) => sum + c.monthlyAmount, 0);

  return (
    <div className="space-y-6">
      {/* Cost Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <DollarSign className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold">
                ${totalMonthlyCost.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Monthly</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold">
                ${getTotalCost('application').toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Application Layer</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingDown className="h-8 w-8 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold">
                ${getTotalCost('technology').toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Technology Layer</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <div className="text-2xl font-bold">
                {getUnallocatedCosts().length}
              </div>
              <div className="text-sm text-gray-600">Unallocated</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost by Element */}
      <Card>
        <CardHeader>
          <CardTitle>Cost by Architecture Element</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {diagram.nodes
              .filter(node => getElementCost(node.id) > 0)
              .sort((a, b) => getElementCost(b.id) - getElementCost(a.id))
              .map(node => {
                const elementCost = getElementCost(node.id);
                const percentage = (elementCost / totalMonthlyCost) * 100;

                return (
                  <div
                    key={node.id}
                    className="flex items-center gap-4 p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{node.data.label}</span>
                        <Badge variant="outline">{node.data.layer}</Badge>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {node.data.elementType}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold">
                        ${elementCost.toLocaleString()}/mo
                      </div>
                      <div className="text-xs text-gray-600">
                        {percentage.toFixed(1)}% of total
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="w-48">
                      <div className="text-xs text-gray-600 mb-1">
                        Cost Items:
                      </div>
                      {costs
                        .filter(c => c.architectureElementId === node.id)
                        .map(cost => (
                          <div key={cost.id} className="text-xs flex justify-between">
                            <span>{cost.name}</span>
                            <span>${cost.monthlyAmount}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Unallocated Costs */}
      {getUnallocatedCosts().length > 0 && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="h-5 w-5" />
              Unallocated Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              These costs are not linked to any architecture element. Allocate them for better visibility.
            </p>
            <div className="space-y-2">
              {getUnallocatedCosts().map(cost => (
                <div
                  key={cost.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <div className="font-semibold">{cost.name}</div>
                    <div className="text-xs text-gray-600">{cost.category}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold">${cost.monthlyAmount}/mo</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAllocateCost(cost.id)}
                    >
                      Allocate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cost Optimization Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>AI Cost Optimization Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <CostOptimizationSuggestions
            diagram={diagram}
            costs={costs}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function CostOptimizationSuggestions({
  diagram,
  costs
}: {
  diagram: ArchiMateDiagram;
  costs: CostData[];
}) {
  // Use AI to analyze cost patterns and suggest optimizations
  const suggestions = [
    {
      type: 'consolidation',
      title: 'Consolidate Similar Tools',
      description: 'You have 3 monitoring tools (Datadog, New Relic, CloudWatch) serving similar purposes',
      potentialSavings: 400,
      effort: 'medium'
    },
    {
      type: 'right-sizing',
      title: 'Right-size Cloud Resources',
      description: 'Your application servers are over-provisioned based on actual usage patterns',
      potentialSavings: 250,
      effort: 'low'
    },
    {
      type: 'licensing',
      title: 'Unused Licenses',
      description: '5 inactive Slack seats and 3 unused Jira licenses detected',
      potentialSavings: 85,
      effort: 'low'
    }
  ];

  return (
    <div className="space-y-3">
      {suggestions.map((suggestion, index) => (
        <div key={index} className="p-4 border rounded-lg bg-blue-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{suggestion.title}</span>
                <Badge variant={suggestion.effort === 'low' ? 'default' : 'secondary'}>
                  {suggestion.effort} effort
                </Badge>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                {suggestion.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                -${suggestion.potentialSavings}/mo
              </div>
              <div className="text-xs text-gray-600">
                ${suggestion.potentialSavings * 12}/year
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total Potential Savings</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              -$735/mo
            </div>
            <div className="text-sm text-gray-600">
              $8,820/year
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 4. Complete User Experience Flow

### Integrated Workflow

```typescript
// pages/architecture-studio.tsx
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Network, 
  FileText, 
  DollarSign,
  Sparkles 
} from 'lucide-react';

export default function ArchitectureStudio() {
  const [activeView, setActiveView] = useState('diagram');
  const [bmc, setBMC] = useState<BusinessModelCanvas | null>(null);
  const [diagram, setDiagram] = useState<ArchiMateDiagram | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [costs, setCosts] = useState<CostData[]>([]);

  const handleGenerateFromBMC = async () => {
    if (!bmc) return;
    
    const service = new BMCToDiagramService();
    const result = await service.generateFromBMC(bmc);
    setDiagram(result);
    setActiveView('diagram');
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation */}
      <div className="border-b bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">ReqArchitect Studio</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              Save
            </Button>
            <Button size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Assist
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Side Panel - Context */}
        <div className="w-80 border-r bg-gray-50 overflow-y-auto">
          <div className="p-4">
            <Tabs defaultValue="bmc">
              <TabsList className="w-full">
                <TabsTrigger value="bmc" className="flex-1">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  BMC
                </TabsTrigger>
                <TabsTrigger value="requirements" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Reqs
                </TabsTrigger>
                <TabsTrigger value="costs" className="flex-1">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Costs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bmc" className="mt-4">
                <BusinessModelCanvasPanel
                  bmc={bmc}
                  onUpdate={setBMC}
                  onGenerate={handleGenerateFromBMC}
                />
              </TabsContent>

              <TabsContent value="requirements" className="mt-4">
                <RequirementsPanel
                  requirements={requirements}
                  diagram={diagram}
                  onUpdate={setRequirements}
                />
              </TabsContent>

              <TabsContent value="costs" className="mt-4">
                <CostsPanel
                  costs={costs}
                  diagram={diagram}
                  onUpdate={setCosts}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Center Panel - Diagram */}
        <div className="flex-1 relative">
          <DiagramCanvas
            diagram={diagram}
            onUpdate={setDiagram}
            contextData={{
              bmc,
              requirements,
              costs
            }}
          />
        </div>

        {/* Right Panel - Properties */}
        <div className="w-80 border-l bg-gray-50 overflow-y-auto">
          <DiagramPropertiesPanel
            selectedElement={/* current selection */}
            onUpdate={/* update handler */}
          />
        </div>
      </div>
    </div>
  );
}
```

This integration guide demonstrates how the enhanced diagramming tool seamlessly connects with ReqArchitect's core value propositions:

1. **Business Model Canvas Integration** - Direct links between strategy and architecture
2. **Requirements Traceability** - Full visibility from requirements to implementation
3. **Cost Tracking** - Real-time cost allocation to architecture elements
4. **AI-Powered Intelligence** - Automated generation, suggestions, and optimizations

The result is a unique platform that helps startup founders make informed decisions about their technology architecture while maintaining clear alignment with their business model and constraints.
