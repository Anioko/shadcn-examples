"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Target, Zap, Users, GitBranch, Settings, Database, Building, Lightbulb, Users2, DollarSign } from 'lucide-react';

interface ElementType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  layer: 'motivation' | 'strategy' | 'business' | 'application' | 'technology';
}

const archimateElements: Record<string, ElementType[]> = {
  'Motivation Layer': [
    {
      id: 'stakeholder',
      name: 'Stakeholder',
      description: 'An individual or group with concerns about the enterprise',
      icon: Users2,
      layer: 'motivation'
    },
    {
      id: 'driver',
      name: 'Driver',
      description: 'An external or internal force that motivates change',
      icon: Target,
      layer: 'motivation'
    },
    {
      id: 'goal',
      name: 'Goal',
      description: 'A high-level statement of intent or direction',
      icon: Target,
      layer: 'motivation'
    },
    {
      id: 'outcome',
      name: 'Outcome',
      description: 'A measurable result of the change',
      icon: Target,
      layer: 'motivation'
    },
    {
      id: 'principle',
      name: 'Principle',
      description: 'A fundamental rule or guideline',
      icon: Lightbulb,
      layer: 'motivation'
    },
    {
      id: 'requirement',
      name: 'Requirement',
      description: 'A statement of need that must be satisfied',
      icon: Target,
      layer: 'motivation'
    },
    {
      id: 'constraint',
      name: 'Constraint',
      description: 'A restriction on the way goals are realized',
      icon: Target,
      layer: 'motivation'
    }
  ],
  'Strategy Layer': [
    {
      id: 'capability',
      name: 'Capability',
      description: 'An ability that an organization possesses',
      icon: Zap,
      layer: 'strategy'
    },
    {
      id: 'value-stream',
      name: 'Value Stream',
      description: 'A series of steps that create value for stakeholders',
      icon: GitBranch,
      layer: 'strategy'
    },
    {
      id: 'course-of-action',
      name: 'Course of Action',
      description: 'An approach to achieve goals and objectives',
      icon: Target,
      layer: 'strategy'
    },
    {
      id: 'resource',
      name: 'Resource',
      description: 'An asset owned or controlled by an organization',
      icon: Database,
      layer: 'strategy'
    }
  ],
  'Business Layer': [
    {
      id: 'business-actor',
      name: 'Business Actor',
      description: 'An organizational entity capable of performing behavior',
      icon: Users,
      layer: 'business'
    },
    {
      id: 'business-role',
      name: 'Business Role',
      description: 'The responsibility for specific behavior',
      icon: Users,
      layer: 'business'
    },
    {
      id: 'business-collaboration',
      name: 'Business Collaboration',
      description: 'An aggregate of business actors working together',
      icon: Users2,
      layer: 'business'
    },
    {
      id: 'business-process',
      name: 'Business Process',
      description: 'A sequence of business behaviors',
      icon: GitBranch,
      layer: 'business'
    },
    {
      id: 'business-function',
      name: 'Business Function',
      description: 'A collection of business behaviors',
      icon: Settings,
      layer: 'business'
    },
    {
      id: 'business-interaction',
      name: 'Business Interaction',
      description: 'A unit of collective business behavior',
      icon: Users2,
      layer: 'business'
    },
    {
      id: 'business-event',
      name: 'Business Event',
      description: 'A business behavior triggered by a change in state',
      icon: Target,
      layer: 'business'
    },
    {
      id: 'business-service',
      name: 'Business Service',
      description: 'An explicitly defined exposed business behavior',
      icon: Settings,
      layer: 'business'
    },
    {
      id: 'business-object',
      name: 'Business Object',
      description: 'A concept used within a business domain',
      icon: Database,
      layer: 'business'
    },
    {
      id: 'contract',
      name: 'Contract',
      description: 'A formal agreement between parties',
      icon: Building,
      layer: 'business'
    },
    {
      id: 'representation',
      name: 'Representation',
      description: 'A perceptible form of information',
      icon: Database,
      layer: 'business'
    },
    {
      id: 'product',
      name: 'Product',
      description: 'A coherent collection of services',
      icon: DollarSign,
      layer: 'business'
    }
  ],
  'Application Layer': [
    {
      id: 'application-component',
      name: 'Application Component',
      description: 'An encapsulation of application functionality',
      icon: Settings,
      layer: 'application'
    },
    {
      id: 'application-collaboration',
      name: 'Application Collaboration',
      description: 'An aggregate of application components',
      icon: Settings,
      layer: 'application'
    },
    {
      id: 'application-interface',
      name: 'Application Interface',
      description: 'A point of access to application services',
      icon: GitBranch,
      layer: 'application'
    },
    {
      id: 'application-function',
      name: 'Application Function',
      description: 'Automated behavior of an application component',
      icon: Settings,
      layer: 'application'
    },
    {
      id: 'application-interaction',
      name: 'Application Interaction',
      description: 'A unit of collective application behavior',
      icon: GitBranch,
      layer: 'application'
    },
    {
      id: 'application-process',
      name: 'Application Process',
      description: 'A sequence of application behaviors',
      icon: GitBranch,
      layer: 'application'
    },
    {
      id: 'application-event',
      name: 'Application Event',
      description: 'Application behavior triggered by a change in state',
      icon: Target,
      layer: 'application'
    },
    {
      id: 'application-service',
      name: 'Application Service',
      description: 'An explicitly defined exposed application behavior',
      icon: Settings,
      layer: 'application'
    },
    {
      id: 'data-object',
      name: 'Data Object',
      description: 'A data structure used for applications',
      icon: Database,
      layer: 'application'
    }
  ],
  'Technology Layer': [
    {
      id: 'node',
      name: 'Node',
      description: 'A computational or physical resource',
      icon: Database,
      layer: 'technology'
    },
    {
      id: 'device',
      name: 'Device',
      description: 'A physical IT resource',
      icon: Database,
      layer: 'technology'
    },
    {
      id: 'system-software',
      name: 'System Software',
      description: 'Software that provides a platform for applications',
      icon: Settings,
      layer: 'technology'
    },
    {
      id: 'technology-collaboration',
      name: 'Technology Collaboration',
      description: 'An aggregate of technology nodes',
      icon: Database,
      layer: 'technology'
    },
    {
      id: 'technology-interface',
      name: 'Technology Interface',
      description: 'A point of access to technology services',
      icon: GitBranch,
      layer: 'technology'
    },
    {
      id: 'path',
      name: 'Path',
      description: 'A link between technology nodes',
      icon: GitBranch,
      layer: 'technology'
    },
    {
      id: 'communication-network',
      name: 'Communication Network',
      description: 'A set of structures connecting nodes',
      icon: GitBranch,
      layer: 'technology'
    },
    {
      id: 'technology-function',
      name: 'Technology Function',
      description: 'A behavior element of technology',
      icon: Settings,
      layer: 'technology'
    },
    {
      id: 'technology-process',
      name: 'Technology Process',
      description: 'A sequence of technology behaviors',
      icon: GitBranch,
      layer: 'technology'
    },
    {
      id: 'technology-interaction',
      name: 'Technology Interaction',
      description: 'A unit of collective technology behavior',
      icon: GitBranch,
      layer: 'technology'
    },
    {
      id: 'technology-event',
      name: 'Technology Event',
      description: 'Technology behavior triggered by a change in state',
      icon: Target,
      layer: 'technology'
    },
    {
      id: 'technology-service',
      name: 'Technology Service',
      description: 'An explicitly defined exposed technology behavior',
      icon: Database,
      layer: 'technology'
    },
    {
      id: 'artifact',
      name: 'Artifact',
      description: 'A piece of data used or produced by software',
      icon: Database,
      layer: 'technology'
    }
  ]
};

const getLayerColor = (layer: string) => {
  switch (layer) {
    case 'Motivation Layer': return 'bg-yellow-50 border-yellow-200';
    case 'Strategy Layer': return 'bg-red-50 border-red-200';
    case 'Business Layer': return 'bg-blue-50 border-blue-200';
    case 'Application Layer': return 'bg-green-50 border-green-200';
    case 'Technology Layer': return 'bg-purple-50 border-purple-200';
    default: return 'bg-gray-50 border-gray-200';
  }
};

const getElementColor = (layer: ElementType['layer']) => {
  switch (layer) {
    case 'motivation': return 'bg-yellow-100 text-yellow-600';
    case 'strategy': return 'bg-red-100 text-red-600';
    case 'business': return 'bg-blue-100 text-blue-600';
    case 'application': return 'bg-green-100 text-green-600';
    case 'technology': return 'bg-purple-100 text-purple-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

function ElementPaletteItem({ element }: { element: ElementType }) {
  const Icon = element.icon;
  const colorClass = getElementColor(element.layer);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(element));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center gap-2 p-2 rounded-md border border-transparent hover:border-border hover:bg-muted/50 cursor-grab active:cursor-grabbing transition-colors"
    >
      <div className={`p-1 rounded-sm ${colorClass}`}>
        <Icon className="w-3 h-3" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium truncate">{element.name}</div>
        <div className="text-xs text-muted-foreground truncate">{element.description}</div>
      </div>
    </div>
  );
}

function LayerSection({ layerName, elements }: { layerName: string; elements: ElementType[] }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className={`flex items-center justify-between w-full p-2 rounded-md border ${getLayerColor(layerName)} hover:bg-muted/30 cursor-pointer transition-colors`}>
          <div className="flex items-center gap-2">
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{layerName}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {elements.length}
          </Badge>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 mt-1">
        {elements.map((element) => (
          <ElementPaletteItem key={element.id} element={element} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function ElementPalette() {
  return (
    <Card className="w-80 h-full border-r rounded-none flex flex-col">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-sm font-medium">ArchiMate Elements</CardTitle>
        <p className="text-xs text-muted-foreground">
          Drag elements onto the canvas to create your architecture diagram
        </p>
      </CardHeader>
      <CardContent className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-3">
          {Object.entries(archimateElements).map(([layerName, elements]) => (
            <LayerSection key={layerName} layerName={layerName} elements={elements} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}