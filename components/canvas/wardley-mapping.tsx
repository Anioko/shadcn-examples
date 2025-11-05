'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { WardleyMapping } from '@/lib/types/wardley-mapping'

interface WardleyMappingProps {
  wardleyMapping: WardleyMapping
  onUpdate: (wardleyMapping: WardleyMapping) => void
  readOnly?: boolean
}

export function WardleyMappingComponent({ wardleyMapping, onUpdate, readOnly = false }: WardleyMappingProps) {
  const handleChange = (field: keyof WardleyMapping, value: string) => {
    onUpdate({
      ...wardleyMapping,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full">
      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* Value Chain - Purple */}
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="bg-purple-100 pb-3">
            <CardTitle className="text-xl text-purple-900">Value Chain</CardTitle>
            <CardDescription className="text-purple-700 text-sm">
              Map the chain of needs from user needs to the components that fulfill them
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={wardleyMapping.valueChain}
              onChange={(e) => handleChange('valueChain', e.target.value)}
              placeholder="Define your value chain:

Examples:
- User needs (visible) → Business capabilities → Technical components
- Customer facing services → Platform services → Infrastructure
- Product features → APIs → Data stores

Guidelines:
- Start with user needs at the top
- Work down through dependencies
- Show what delivers value to whom
- Identify key components
- Map relationships and dependencies

Your value chain should answer: What components are needed to deliver value to users?"
              className="min-h-[350px] resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Evolution Stages - Blue */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-xl text-blue-900">Evolution Stages</CardTitle>
            <CardDescription className="text-blue-700 text-sm">
              Classify components by their evolution from Genesis to Commodity
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={wardleyMapping.evolutionStages}
              onChange={(e) => handleChange('evolutionStages', e.target.value)}
              placeholder="Map evolution stages:

Evolution Stages (left to right):
I. Genesis - Novel, uncertain, rapidly changing
II. Custom Built - Emerging, understood by few
III. Product/Rental - Mature, standardized
IV. Commodity/Utility - Widespread, well-defined

Examples:
- Genesis: AI/ML models, novel algorithms
- Custom Built: Bespoke integrations, custom code
- Product: Commercial software, SaaS platforms
- Commodity: Cloud compute, electricity, networking

Guidelines:
- Plot each component on evolution axis
- Genesis components need experimentation
- Commodity components should be outsourced
- Evolution moves left to right over time"
              className="min-h-[350px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Components - Green */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="bg-green-100 pb-3">
            <CardTitle className="text-xl text-green-900">Components</CardTitle>
            <CardDescription className="text-green-700 text-sm">
              List all components with their position in the value chain and evolution
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={wardleyMapping.components}
              onChange={(e) => handleChange('components', e.target.value)}
              placeholder="List your components:

Format: Component Name (Value Chain Position, Evolution Stage)

Examples:
- User Interface (High visibility, Product)
- API Gateway (Medium visibility, Product)
- Authentication Service (Low visibility, Product)
- Database (Low visibility, Commodity)
- Custom Algorithm (Medium visibility, Genesis)
- Cloud Infrastructure (Low visibility, Commodity)

Guidelines:
- Include all key components
- Note dependencies between components
- Mark visibility to users
- Identify strategic components
- Flag components for evolution
- Consider outsourcing commodities"
              className="min-h-[350px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Strategic Movement - Orange */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="bg-orange-100 pb-3">
            <CardTitle className="text-xl text-orange-900">Strategic Movement</CardTitle>
            <CardDescription className="text-orange-700 text-sm">
              Identify strategic plays, movements, and gameplay patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={wardleyMapping.strategicMovement}
              onChange={(e) => handleChange('strategicMovement', e.target.value)}
              placeholder="Define strategic movements:

Strategic Plays:
- Accelerate: Speed component evolution
- Disrupt: Challenge industry norms
- Differentiate: Invest in unique capabilities
- Commoditize: Make components utility-like
- Outsource: Use external providers
- Insource: Build internally for control

Examples:
- Move custom auth to commodity (OAuth/SAML)
- Invest in Genesis AI capabilities for differentiation
- Commoditize infrastructure via cloud migration
- Accelerate API evolution with standards
- Disrupt market with open-source approach

Guidelines:
- Identify opportunities from map
- Consider competitor movements
- Plan for component evolution
- Look for gameplay patterns
- Define concrete actions"
              className="min-h-[350px] resize-none border-orange-200 focus:border-orange-400 focus:ring-orange-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
