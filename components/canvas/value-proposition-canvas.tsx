'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ValuePropositionCanvas } from '@/lib/types/value-proposition-canvas'

interface ValuePropositionCanvasProps {
  canvas: ValuePropositionCanvas
  onUpdate: (canvas: ValuePropositionCanvas) => void
  readOnly?: boolean
}

export function ValuePropositionCanvasComponent({
  canvas,
  onUpdate,
  readOnly = false,
}: ValuePropositionCanvasProps) {
  const handleChange = (field: keyof ValuePropositionCanvas, value: string) => {
    onUpdate({
      ...canvas,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full">
      {/* Canvas Grid Layout - 2 main sections */}
      <div className="grid grid-cols-2 gap-6">
        {/* LEFT SIDE - VALUE MAP */}
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-blue-900">Value Map</h2>
            <p className="text-sm text-muted-foreground">How you create value for customers</p>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="bg-blue-100 pb-3">
              <CardTitle className="text-lg text-blue-900">Products & Services</CardTitle>
              <CardDescription className="text-blue-700 text-xs">
                List of products and services your value proposition is built around
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={canvas.productsServices}
                onChange={(e) => handleChange('productsServices', e.target.value)}
                placeholder="What products or services do you offer?&#10;&#10;Examples:&#10;- Physical/tangible products&#10;- Intangible products&#10;- Digital products&#10;- Financial services&#10;&#10;List the key products/services that help customers complete jobs, relieve pains, or create gains."
                className="min-h-[200px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="bg-green-100 pb-3">
              <CardTitle className="text-lg text-green-900">Pain Relievers</CardTitle>
              <CardDescription className="text-green-700 text-xs">
                How your products and services alleviate customer pains
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={canvas.painRelievers}
                onChange={(e) => handleChange('painRelievers', e.target.value)}
                placeholder="How do you eliminate or reduce customer pains?&#10;&#10;Examples:&#10;- Produce savings (time, money, effort)&#10;- Make customers feel better (eliminate frustrations, annoyances)&#10;- Fix underperforming solutions&#10;- Eliminate risks&#10;- Remove obstacles&#10;&#10;Which pains are you addressing?"
                className="min-h-[200px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="bg-purple-100 pb-3">
              <CardTitle className="text-lg text-purple-900">Gain Creators</CardTitle>
              <CardDescription className="text-purple-700 text-xs">
                How your products and services create customer gains
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={canvas.gainCreators}
                onChange={(e) => handleChange('gainCreators', e.target.value)}
                placeholder="How do you create gains for customers?&#10;&#10;Examples:&#10;- Create savings (time, money, effort)&#10;- Produce outcomes customers expect&#10;- Outperform current solutions&#10;- Make customer's life easier&#10;- Create positive social consequences&#10;- Deliver more than expected&#10;&#10;Which gains are you addressing?"
                className="min-h-[200px] resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE - CUSTOMER PROFILE */}
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-orange-900">Customer Profile</h2>
            <p className="text-sm text-muted-foreground">Understanding your customer</p>
          </div>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="bg-yellow-100 pb-3">
              <CardTitle className="text-lg text-yellow-900">Customer Jobs</CardTitle>
              <CardDescription className="text-yellow-700 text-xs">
                What customers are trying to get done in their work and life
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={canvas.customerJobs}
                onChange={(e) => handleChange('customerJobs', e.target.value)}
                placeholder="What jobs are customers trying to complete?&#10;&#10;Functional jobs:&#10;- Tasks customers want to complete&#10;&#10;Social jobs:&#10;- How customers want to be perceived&#10;&#10;Emotional jobs:&#10;- How customers want to feel&#10;&#10;Supporting jobs:&#10;- Buyer, co-creator, transferrer"
                className="min-h-[200px] resize-none border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardHeader className="bg-red-100 pb-3">
              <CardTitle className="text-lg text-red-900">Pains</CardTitle>
              <CardDescription className="text-red-700 text-xs">
                Bad outcomes, risks, and obstacles related to customer jobs
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={canvas.customerPains}
                onChange={(e) => handleChange('customerPains', e.target.value)}
                placeholder="What are customer pains?&#10;&#10;Examples:&#10;- Undesired outcomes, problems, characteristics&#10;- Obstacles preventing jobs being done&#10;- Risks (financial, social, technical)&#10;- Things keeping customers awake at night&#10;- Common mistakes customers make&#10;- Barriers preventing adoption&#10;&#10;Rank by severity: extreme, moderate, or light"
                className="min-h-[200px] resize-none border-red-200 focus:border-red-400 focus:ring-red-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>

          <Card className="bg-cyan-50 border-cyan-200">
            <CardHeader className="bg-cyan-100 pb-3">
              <CardTitle className="text-lg text-cyan-900">Gains</CardTitle>
              <CardDescription className="text-cyan-700 text-xs">
                Outcomes and benefits customers want
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={canvas.customerGains}
                onChange={(e) => handleChange('customerGains', e.target.value)}
                placeholder="What are customer gains?&#10;&#10;Examples:&#10;- Required gains (solution won't work without)&#10;- Expected gains (basic but expected)&#10;- Desired gains (go beyond expectations)&#10;- Unexpected gains (exceed expectations)&#10;&#10;Functional utility, social gains, positive emotions, cost savings&#10;&#10;Rank by relevance: essential, nice to have, or insignificant"
                className="min-h-[200px] resize-none border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fit Indicator */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg border-2 border-dashed">
        <div className="text-center">
          <h3 className="font-bold text-lg mb-2">Value Proposition Fit</h3>
          <p className="text-sm text-muted-foreground">
            You achieve fit between value map and customer profile when customers get excited about your value proposition.
            This happens when you address important jobs, alleviate extreme pains, and create essential gains that customers care about.
          </p>
        </div>
      </div>
    </div>
  )
}
