'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { OKR } from '@/lib/types/okr'

interface OKRProps {
  okr: OKR
  onUpdate: (okr: OKR) => void
  readOnly?: boolean
}

export function OKRComponent({ okr, onUpdate, readOnly = false }: OKRProps) {
  const handleChange = (field: keyof OKR, value: string) => {
    onUpdate({
      ...okr,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full space-y-4">
      {/* Objective - Large Card at Top */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader className="bg-purple-100 pb-3">
          <CardTitle className="text-2xl text-purple-900">Objective</CardTitle>
          <CardDescription className="text-purple-700 text-sm">
            What do you want to achieve? - A qualitative, aspirational goal that provides direction
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Textarea
            value={okr.objective}
            onChange={(e) => handleChange('objective', e.target.value)}
            placeholder="Define your objective:

Examples:
- Launch a world-class mobile app experience
- Become the market leader in customer satisfaction
- Build a high-performing engineering culture
- Expand into new geographic markets

Guidelines:
- Make it inspiring and memorable
- Keep it qualitative (not a number)
- Time-bound (usually quarterly or annual)
- Ambitious but achievable
- Aligned with company strategy

Your objective should answer: What is the meaningful goal we want to accomplish?"
            className="min-h-[250px] resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400 font-mono text-sm"
            readOnly={readOnly}
          />
        </CardContent>
      </Card>

      {/* Key Results - 4 Smaller Cards in Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Key Result 1 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-lg text-blue-900">Key Result 1</CardTitle>
            <CardDescription className="text-blue-700 text-xs">
              Measurable outcome that indicates progress toward the objective
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={okr.keyResult1}
              onChange={(e) => handleChange('keyResult1', e.target.value)}
              placeholder="First measurable outcome:

Examples:
- Increase app store rating from 3.8 to 4.5
- Achieve 100,000 monthly active users
- Reduce customer churn from 5% to 2%
- Launch in 3 new countries

Make it:
- Specific and measurable
- Include baseline and target
- Time-bound
- Aggressive but realistic"
              className="min-h-[200px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Key Result 2 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-lg text-blue-900">Key Result 2</CardTitle>
            <CardDescription className="text-blue-700 text-xs">
              Measurable outcome that indicates progress toward the objective
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={okr.keyResult2}
              onChange={(e) => handleChange('keyResult2', e.target.value)}
              placeholder="Second measurable outcome:

Examples:
- Increase Net Promoter Score from 45 to 70
- Reduce average response time to under 1 second
- Achieve 95% test coverage
- Generate $2M in new market revenue

Make it:
- Specific and measurable
- Include baseline and target
- Time-bound
- Aggressive but realistic"
              className="min-h-[200px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Key Result 3 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-lg text-blue-900">Key Result 3</CardTitle>
            <CardDescription className="text-blue-700 text-xs">
              Measurable outcome that indicates progress toward the objective
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={okr.keyResult3}
              onChange={(e) => handleChange('keyResult3', e.target.value)}
              placeholder="Third measurable outcome:

Examples:
- Ship 5 major features with zero critical bugs
- Reduce deployment time from 2 hours to 15 minutes
- Increase employee engagement score to 85%
- Achieve 50% market share in target segment

Make it:
- Specific and measurable
- Include baseline and target
- Time-bound
- Aggressive but realistic"
              className="min-h-[200px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Key Result 4 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-lg text-blue-900">Key Result 4</CardTitle>
            <CardDescription className="text-blue-700 text-xs">
              Measurable outcome that indicates progress toward the objective
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={okr.keyResult4}
              onChange={(e) => handleChange('keyResult4', e.target.value)}
              placeholder="Fourth measurable outcome:

Examples:
- Increase conversion rate from 2% to 5%
- Reduce infrastructure costs by 30%
- Achieve 99.99% uptime SLA
- Onboard 20 enterprise customers

Make it:
- Specific and measurable
- Include baseline and target
- Time-bound
- Aggressive but realistic"
              className="min-h-[200px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
