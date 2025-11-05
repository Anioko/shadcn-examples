'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { BlueOceanStrategy } from '@/lib/types/blue-ocean'

interface BlueOceanStrategyProps {
  strategy: BlueOceanStrategy
  onUpdate: (strategy: BlueOceanStrategy) => void
  readOnly?: boolean
}

export function BlueOceanStrategyComponent({
  strategy,
  onUpdate,
  readOnly = false,
}: BlueOceanStrategyProps) {
  const handleChange = (field: keyof BlueOceanStrategy, value: string) => {
    onUpdate({
      ...strategy,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {/* Eliminate - Top Left (Red) */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="bg-red-100 pb-3">
            <CardTitle className="text-xl text-red-900">Eliminate</CardTitle>
            <CardDescription className="text-red-700 text-sm">
              Which factors that the industry takes for granted should be eliminated?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={strategy.eliminate}
              onChange={(e) => handleChange('eliminate', e.target.value)}
              placeholder="What factors should be completely removed from the industry?

Examples:
- Outdated features or services
- Unnecessary complexity
- Industry assumptions
- Legacy practices
- Redundant processes
- Costly overhead
- Traditional pain points

Questions to Consider:
- What factors can we eliminate that customers don't value?
- What industry standards are outdated?
- What can be removed to simplify?
- What factors add cost but not value?"
              className="min-h-[400px] resize-none border-red-200 focus:border-red-400 focus:ring-red-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Reduce - Top Right (Orange) */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="bg-orange-100 pb-3">
            <CardTitle className="text-xl text-orange-900">Reduce</CardTitle>
            <CardDescription className="text-orange-700 text-sm">
              Which factors should be reduced well below the industry standard?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={strategy.reduce}
              onChange={(e) => handleChange('reduce', e.target.value)}
              placeholder="What should be reduced significantly below industry norms?

Examples:
- Over-engineered features
- Excessive customization
- Premium pricing tiers
- Long delivery times
- Complex procedures
- Maintenance requirements
- Training needs

Questions to Consider:
- What factors are over-designed?
- Where is the industry over-serving?
- What can be simplified?
- Which costs can be reduced?"
              className="min-h-[400px] resize-none border-orange-200 focus:border-orange-400 focus:ring-orange-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Raise - Bottom Left (Blue) */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-xl text-blue-900">Raise</CardTitle>
            <CardDescription className="text-blue-700 text-sm">
              Which factors should be raised well above the industry standard?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={strategy.raise}
              onChange={(e) => handleChange('raise', e.target.value)}
              placeholder="What should be increased significantly above industry norms?

Examples:
- Customer experience
- Convenience
- Speed of delivery
- Accessibility
- Quality standards
- Sustainability
- Innovation

Questions to Consider:
- What factors should we emphasize?
- Where is the industry under-serving?
- What creates exceptional value?
- Which improvements matter most?"
              className="min-h-[400px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Create - Bottom Right (Green) */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="bg-green-100 pb-3">
            <CardTitle className="text-xl text-green-900">Create</CardTitle>
            <CardDescription className="text-green-700 text-sm">
              Which factors should be created that the industry has never offered?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={strategy.create}
              onChange={(e) => handleChange('create', e.target.value)}
              placeholder="What new factors should be created in the industry?

Examples:
- Novel features or services
- New revenue models
- Unique value propositions
- Breakthrough experiences
- Innovative delivery methods
- New customer segments
- Unexpected benefits

Questions to Consider:
- What new sources of value can we create?
- What latent needs are unmet?
- What could transform the industry?
- What would create a leap in value?
- What has never been offered before?"
              className="min-h-[400px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
