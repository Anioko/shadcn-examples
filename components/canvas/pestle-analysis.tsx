'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { PESTLEAnalysis } from '@/lib/types/pestle'

interface PESTLEAnalysisProps {
  analysis: PESTLEAnalysis
  onUpdate: (analysis: PESTLEAnalysis) => void
  readOnly?: boolean
}

export function PESTLEAnalysisComponent({
  analysis,
  onUpdate,
  readOnly = false,
}: PESTLEAnalysisProps) {
  const handleChange = (field: keyof PESTLEAnalysis, value: string) => {
    onUpdate({
      ...analysis,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {/* Political */}
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="bg-purple-100 pb-3">
            <CardTitle className="text-lg text-purple-900">🏛️ Political</CardTitle>
            <CardDescription className="text-purple-700 text-xs">
              Government policies, political stability, tax policy, trade restrictions
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.political}
              onChange={(e) => handleChange('political', e.target.value)}
              placeholder="Political factors affecting your organization:

Examples:
- Government stability
- Tax policies
- Trade regulations
- Political climate
- Corruption levels
- Government intervention

Consider:
- Upcoming elections
- Policy changes
- International relations
- Political risks"
              className="min-h-[280px] resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Economic */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="bg-green-100 pb-3">
            <CardTitle className="text-lg text-green-900">💰 Economic</CardTitle>
            <CardDescription className="text-green-700 text-xs">
              Economic growth, interest rates, inflation, exchange rates
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.economic}
              onChange={(e) => handleChange('economic', e.target.value)}
              placeholder="Economic factors impacting your business:

Examples:
- Economic growth rates
- Interest rates
- Inflation
- Unemployment levels
- Exchange rates
- Disposable income

Consider:
- Economic cycles
- Consumer confidence
- Market conditions
- Financial trends"
              className="min-h-[280px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Social */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-lg text-blue-900">👥 Social</CardTitle>
            <CardDescription className="text-blue-700 text-xs">
              Demographics, cultural trends, population, lifestyle changes
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.social}
              onChange={(e) => handleChange('social', e.target.value)}
              placeholder="Social and cultural factors:

Examples:
- Population demographics
- Cultural attitudes
- Lifestyle trends
- Education levels
- Health consciousness
- Social mobility

Consider:
- Generational shifts
- Cultural values
- Consumer behavior
- Social movements"
              className="min-h-[280px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Technological */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="bg-orange-100 pb-3">
            <CardTitle className="text-lg text-orange-900">🔬 Technological</CardTitle>
            <CardDescription className="text-orange-700 text-xs">
              Innovation, automation, R&D, technological change
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.technological}
              onChange={(e) => handleChange('technological', e.target.value)}
              placeholder="Technological factors and trends:

Examples:
- Automation
- R&D activity
- Technology incentives
- Rate of tech change
- Digital transformation
- Innovation

Consider:
- Emerging technologies
- Digital adoption
- Infrastructure
- Tech disruption"
              className="min-h-[280px] resize-none border-orange-200 focus:border-orange-400 focus:ring-orange-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Legal */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="bg-red-100 pb-3">
            <CardTitle className="text-lg text-red-900">⚖️ Legal</CardTitle>
            <CardDescription className="text-red-700 text-xs">
              Laws, regulations, compliance, legal requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.legal}
              onChange={(e) => handleChange('legal', e.target.value)}
              placeholder="Legal and regulatory factors:

Examples:
- Employment law
- Consumer protection
- Data protection
- Health & safety
- Antitrust law
- Industry regulations

Consider:
- Compliance requirements
- Legal changes
- Licensing
- Regulatory bodies"
              className="min-h-[280px] resize-none border-red-200 focus:border-red-400 focus:ring-red-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Environmental */}
        <Card className="bg-teal-50 border-teal-200">
          <CardHeader className="bg-teal-100 pb-3">
            <CardTitle className="text-lg text-teal-900">🌍 Environmental</CardTitle>
            <CardDescription className="text-teal-700 text-xs">
              Climate, sustainability, carbon footprint, environmental impact
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={analysis.environmental}
              onChange={(e) => handleChange('environmental', e.target.value)}
              placeholder="Environmental and ecological factors:

Examples:
- Climate change
- Sustainability
- Carbon emissions
- Waste management
- Renewable energy
- Environmental regulations

Consider:
- Environmental impact
- Green initiatives
- Resource scarcity
- Corporate responsibility"
              className="min-h-[280px] resize-none border-teal-200 focus:border-teal-400 focus:ring-teal-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
