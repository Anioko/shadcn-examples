'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { SWOTAnalysis } from '@/lib/types/swot'
import { TrendingUp, AlertTriangle, Target, Shield } from 'lucide-react'

interface SWOTAnalysisProps {
  analysis: SWOTAnalysis
  onUpdate: (analysis: SWOTAnalysis) => void
  readOnly?: boolean
}

export function SWOTAnalysisComponent({
  analysis,
  onUpdate,
  readOnly = false,
}: SWOTAnalysisProps) {
  const handleChange = (field: keyof SWOTAnalysis, value: string) => {
    onUpdate({
      ...analysis,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {/* Strengths - Top Left */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-200 shadow-md hover:shadow-lg transition-all duration-200 group">
          <CardHeader className="bg-gradient-to-r from-green-100 to-green-200/80 pb-3 border-b-2 border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <TrendingUp className="h-5 w-5 text-green-700" />
              </div>
              <CardTitle className="text-xl text-green-900 font-bold">💪 Strengths</CardTitle>
            </div>
            <CardDescription className="text-green-700 text-sm font-medium">
              Internal positive attributes - What advantages do you have?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.strengths}
              onChange={(e) => handleChange('strengths', e.target.value)}
              placeholder="What does your organization do well?

Examples:
- Strong brand reputation
- Skilled workforce
- Proprietary technology
- Strong financial position
- Excellent customer service
- Efficient processes
- Strategic partnerships

Consider:
- Internal capabilities
- Resources and assets
- Competitive advantages
- What makes you unique?"
              className="min-h-[400px] resize-none border-2 border-green-200 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 bg-white shadow-sm font-medium text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Weaknesses - Top Right */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200 shadow-md hover:shadow-lg transition-all duration-200 group">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200/80 pb-3 border-b-2 border-orange-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <AlertTriangle className="h-5 w-5 text-orange-700" />
              </div>
              <CardTitle className="text-xl text-orange-900 font-bold">⚠️ Weaknesses</CardTitle>
            </div>
            <CardDescription className="text-orange-700 text-sm font-medium">
              Internal negative attributes - What could you improve?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.weaknesses}
              onChange={(e) => handleChange('weaknesses', e.target.value)}
              placeholder="What areas need improvement?

Examples:
- Limited resources
- Lack of expertise in key areas
- Poor location
- Outdated technology
- Limited product range
- Weak brand recognition
- High employee turnover

Consider:
- Internal limitations
- Resource constraints
- Areas where competitors excel
- Customer complaints"
              className="min-h-[400px] resize-none border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 bg-white shadow-sm font-medium text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Opportunities - Bottom Left */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 shadow-md hover:shadow-lg transition-all duration-200 group">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200/80 pb-3 border-b-2 border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <Target className="h-5 w-5 text-blue-700" />
              </div>
              <CardTitle className="text-xl text-blue-900 font-bold">🌟 Opportunities</CardTitle>
            </div>
            <CardDescription className="text-blue-700 text-sm font-medium">
              External positive factors - What favorable conditions exist?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.opportunities}
              onChange={(e) => handleChange('opportunities', e.target.value)}
              placeholder="What external opportunities can you exploit?

Examples:
- Emerging markets
- Technological advances
- Regulatory changes
- Market gaps
- Strategic partnerships
- Growing demand
- Competitor weaknesses

Consider:
- Market trends
- Industry developments
- Economic factors
- Social/demographic changes
- Technology trends"
              className="min-h-[400px] resize-none border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white shadow-sm font-medium text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Threats - Bottom Right */}
        <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 shadow-md hover:shadow-lg transition-all duration-200 group">
          <CardHeader className="bg-gradient-to-r from-red-100 to-red-200/80 pb-3 border-b-2 border-red-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <Shield className="h-5 w-5 text-red-700" />
              </div>
              <CardTitle className="text-xl text-red-900 font-bold">⚡ Threats</CardTitle>
            </div>
            <CardDescription className="text-red-700 text-sm font-medium">
              External negative factors - What obstacles do you face?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.threats}
              onChange={(e) => handleChange('threats', e.target.value)}
              placeholder="What external threats could harm your organization?

Examples:
- New competitors
- Economic downturn
- Changing regulations
- Technological disruption
- Changing customer preferences
- Supply chain issues
- Political instability

Consider:
- Competitive pressures
- Market trends
- Economic conditions
- Regulatory environment
- Technological changes"
              className="min-h-[400px] resize-none border-2 border-red-200 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 bg-white shadow-sm font-medium text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
