'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { BalancedScorecard } from '@/lib/types/balanced-scorecard'

interface BalancedScorecardProps {
  scorecard: BalancedScorecard
  onUpdate: (scorecard: BalancedScorecard) => void
  readOnly?: boolean
}

export function BalancedScorecardComponent({
  scorecard,
  onUpdate,
  readOnly = false,
}: BalancedScorecardProps) {
  const handleChange = (field: keyof BalancedScorecard, value: string) => {
    onUpdate({
      ...scorecard,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {/* Financial Perspective - Top Left */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="bg-green-100 pb-3">
            <CardTitle className="text-xl text-green-900">Financial Perspective</CardTitle>
            <CardDescription className="text-green-700 text-sm">
              How do we look to shareholders? - Financial performance and value creation
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={scorecard.financialPerspective}
              onChange={(e) => handleChange('financialPerspective', e.target.value)}
              placeholder="Financial objectives and measures:

Examples:
- Revenue growth targets
- Profit margins
- Return on investment (ROI)
- Cost reduction goals
- Cash flow management
- Asset utilization
- Shareholder value

Consider:
- How can we increase revenue?
- How can we improve profitability?
- How can we use our assets better?
- What are our cost efficiency goals?"
              className="min-h-[400px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Customer Perspective - Top Right */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-xl text-blue-900">Customer Perspective</CardTitle>
            <CardDescription className="text-blue-700 text-sm">
              How do customers see us? - Customer satisfaction and market position
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={scorecard.customerPerspective}
              onChange={(e) => handleChange('customerPerspective', e.target.value)}
              placeholder="Customer objectives and measures:

Examples:
- Customer satisfaction scores
- Customer retention rates
- Market share
- Brand reputation
- Customer acquisition
- Net Promoter Score (NPS)
- Customer lifetime value

Consider:
- What value do we deliver to customers?
- How can we improve customer satisfaction?
- What makes us unique in the market?
- How can we attract new customers?"
              className="min-h-[400px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Internal Process Perspective - Bottom Left */}
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="bg-purple-100 pb-3">
            <CardTitle className="text-xl text-purple-900">Internal Process Perspective</CardTitle>
            <CardDescription className="text-purple-700 text-sm">
              What must we excel at? - Operational excellence and process efficiency
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={scorecard.internalProcessPerspective}
              onChange={(e) => handleChange('internalProcessPerspective', e.target.value)}
              placeholder="Internal process objectives and measures:

Examples:
- Process cycle times
- Quality metrics
- Innovation rate
- Operational efficiency
- Time to market
- Defect rates
- Supply chain performance

Consider:
- Which processes are critical to success?
- How can we improve quality?
- How can we reduce cycle times?
- What innovations are needed?"
              className="min-h-[400px] resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Learning & Growth Perspective - Bottom Right */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="bg-orange-100 pb-3">
            <CardTitle className="text-xl text-orange-900">Learning & Growth Perspective</CardTitle>
            <CardDescription className="text-orange-700 text-sm">
              How can we continue to improve? - Organizational capacity and capability building
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={scorecard.learningGrowthPerspective}
              onChange={(e) => handleChange('learningGrowthPerspective', e.target.value)}
              placeholder="Learning and growth objectives and measures:

Examples:
- Employee satisfaction
- Training and development hours
- Employee retention rate
- Skills development
- Innovation culture
- Technology infrastructure
- Knowledge management

Consider:
- What skills do we need to develop?
- How can we improve employee engagement?
- What technology investments are needed?
- How do we foster innovation?"
              className="min-h-[400px] resize-none border-orange-200 focus:border-orange-400 focus:ring-orange-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
