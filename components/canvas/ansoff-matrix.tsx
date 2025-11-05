'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { AnsoffMatrix } from '@/lib/types/ansoff-matrix'

interface AnsoffMatrixProps {
  matrix: AnsoffMatrix
  onUpdate: (matrix: AnsoffMatrix) => void
  readOnly?: boolean
}

export function AnsoffMatrixComponent({
  matrix,
  onUpdate,
  readOnly = false,
}: AnsoffMatrixProps) {
  const handleChange = (field: keyof AnsoffMatrix, value: string) => {
    onUpdate({
      ...matrix,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {/* Market Penetration - Top Left */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="bg-green-100 pb-3">
            <CardTitle className="text-xl text-green-900">Market Penetration</CardTitle>
            <CardDescription className="text-green-700 text-sm">
              Existing Markets, Existing Products - Lowest Risk Strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={matrix.marketPenetration}
              onChange={(e) => handleChange('marketPenetration', e.target.value)}
              placeholder="How can you increase market share with existing products?

Examples:
- Increase customer loyalty programs
- Price adjustments and promotions
- Improve distribution channels
- Increase marketing and advertising
- Acquire competitors
- Encourage more frequent usage
- Win competitors' customers

Strategies:
- Market share growth
- Customer retention
- Competitive pricing
- Enhanced customer service
- Brand strengthening"
              className="min-h-[400px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Market Development - Top Right */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-xl text-blue-900">Market Development</CardTitle>
            <CardDescription className="text-blue-700 text-sm">
              New Markets, Existing Products - Low to Medium Risk
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={matrix.marketDevelopment}
              onChange={(e) => handleChange('marketDevelopment', e.target.value)}
              placeholder="How can you sell existing products in new markets?

Examples:
- Geographic expansion
- New demographic segments
- New sales channels (online/offline)
- Export to international markets
- Target different customer segments
- New distribution partnerships
- Franchise opportunities

Strategies:
- Geographic expansion
- New customer segments
- Channel diversification
- Market repositioning
- International expansion"
              className="min-h-[400px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Product Development - Bottom Left */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="bg-orange-100 pb-3">
            <CardTitle className="text-xl text-orange-900">Product Development</CardTitle>
            <CardDescription className="text-orange-700 text-sm">
              Existing Markets, New Products - Medium Risk
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={matrix.productDevelopment}
              onChange={(e) => handleChange('productDevelopment', e.target.value)}
              placeholder="How can you develop new products for existing customers?

Examples:
- New product features
- Product line extensions
- New product versions
- Innovation and R&D
- Product improvements
- Complementary products
- Next-generation products

Strategies:
- Product innovation
- Research & development
- Feature enhancement
- Product diversification
- Technology upgrades
- Customer feedback integration"
              className="min-h-[400px] resize-none border-orange-200 focus:border-orange-400 focus:ring-orange-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Diversification - Bottom Right */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="bg-red-100 pb-3">
            <CardTitle className="text-xl text-red-900">Diversification</CardTitle>
            <CardDescription className="text-red-700 text-sm">
              New Markets, New Products - Highest Risk Strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={matrix.diversification}
              onChange={(e) => handleChange('diversification', e.target.value)}
              placeholder="How can you enter new markets with new products?

Examples:
- Mergers and acquisitions
- Strategic alliances
- Completely new business ventures
- Unrelated product lines
- New industry entry
- Vertical integration
- Conglomerate diversification

Types:
- Horizontal: Related products/markets
- Vertical: Supply chain expansion
- Concentric: Similar technology/markets
- Conglomerate: Completely unrelated

Note: Highest risk but potential for highest returns"
              className="min-h-[400px] resize-none border-red-200 focus:border-red-400 focus:ring-red-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
