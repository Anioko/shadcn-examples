'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { PortersFiveForcesAnalysis } from '@/lib/types/porters-five-forces'

interface PortersFiveForcesProps {
  analysis: PortersFiveForcesAnalysis
  onUpdate: (analysis: PortersFiveForcesAnalysis) => void
  readOnly?: boolean
}

export function PortersFiveForcesComponent({
  analysis,
  onUpdate,
  readOnly = false,
}: PortersFiveForcesProps) {
  const handleChange = (field: keyof PortersFiveForcesAnalysis, value: string) => {
    onUpdate({
      ...analysis,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        {/* Top Row - Threat of New Entrants (spanning left column) */}
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="bg-purple-100 pb-3">
            <CardTitle className="text-lg text-purple-900">🚪 Threat of New Entrants</CardTitle>
            <CardDescription className="text-purple-700 text-xs">
              How easy is it for new competitors to enter the market?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.threatOfNewEntrants}
              onChange={(e) => handleChange('threatOfNewEntrants', e.target.value)}
              placeholder="Assess barriers to entry:

Examples:
- Capital requirements
- Economies of scale
- Brand loyalty
- Access to distribution
- Government policies
- Switching costs
- Proprietary technology

Consider:
- How difficult is market entry?
- What are the entry costs?
- Are there regulatory barriers?
- Is specialized expertise required?"
              className="min-h-[350px] resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Center - Competitive Rivalry (larger, center card) */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="bg-red-100 pb-3">
            <CardTitle className="text-xl text-red-900">⚔️ Competitive Rivalry</CardTitle>
            <CardDescription className="text-red-700 text-xs">
              How intense is competition among existing competitors?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.competitiveRivalry}
              onChange={(e) => handleChange('competitiveRivalry', e.target.value)}
              placeholder="Evaluate competitive intensity:

Examples:
- Number of competitors
- Industry growth rate
- Product differentiation
- Exit barriers
- Brand loyalty
- Price competition
- Innovation pace

Consider:
- How many competitors exist?
- How fierce is the competition?
- What differentiates products?
- How easy is it to exit?
- What's the market growth rate?"
              className="min-h-[350px] resize-none border-red-200 focus:border-red-400 focus:ring-red-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Top Row - Bargaining Power of Suppliers (spanning right column) */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-lg text-blue-900">📦 Bargaining Power of Suppliers</CardTitle>
            <CardDescription className="text-blue-700 text-xs">
              How much control do suppliers have over prices?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.bargainingPowerOfSuppliers}
              onChange={(e) => handleChange('bargainingPowerOfSuppliers', e.target.value)}
              placeholder="Assess supplier power:

Examples:
- Number of suppliers
- Switching costs
- Supplier concentration
- Input differentiation
- Forward integration threat
- Importance to suppliers
- Substitute inputs

Consider:
- How many suppliers exist?
- Can you switch easily?
- Are suppliers concentrated?
- Are inputs unique?
- Could suppliers integrate forward?"
              className="min-h-[350px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Bottom Row - Threat of Substitutes */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="bg-orange-100 pb-3">
            <CardTitle className="text-lg text-orange-900">🔄 Threat of Substitutes</CardTitle>
            <CardDescription className="text-orange-700 text-xs">
              How easily can customers find alternative solutions?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.threatOfSubstitutes}
              onChange={(e) => handleChange('threatOfSubstitutes', e.target.value)}
              placeholder="Evaluate substitute products:

Examples:
- Alternative products
- Price-performance tradeoff
- Switching costs
- Customer propensity
- Perceived differentiation
- New technologies
- Changing preferences

Consider:
- What alternatives exist?
- How easy is switching?
- What's the price difference?
- Are substitutes improving?
- What drives customers to switch?"
              className="min-h-[350px] resize-none border-orange-200 focus:border-orange-400 focus:ring-orange-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Bottom Center - Empty spacer for layout */}
        <div className=""></div>

        {/* Bottom Row - Bargaining Power of Buyers */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="bg-green-100 pb-3">
            <CardTitle className="text-lg text-green-900">🛒 Bargaining Power of Buyers</CardTitle>
            <CardDescription className="text-green-700 text-xs">
              How much control do customers have over prices?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.bargainingPowerOfBuyers}
              onChange={(e) => handleChange('bargainingPowerOfBuyers', e.target.value)}
              placeholder="Assess buyer power:

Examples:
- Buyer concentration
- Volume of purchases
- Switching costs
- Price sensitivity
- Product differentiation
- Backward integration threat
- Information availability

Consider:
- How concentrated are buyers?
- Can buyers switch easily?
- Are buyers price sensitive?
- Is the product standardized?
- Could buyers integrate backward?"
              className="min-h-[350px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
