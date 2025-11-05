'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { LeanCanvas } from '@/lib/types/lean-canvas'

interface LeanCanvasProps {
  canvas: LeanCanvas
  onUpdate: (canvas: LeanCanvas) => void
  readOnly?: boolean
}

export function LeanCanvasComponent({
  canvas,
  onUpdate,
  readOnly = false,
}: LeanCanvasProps) {
  const handleChange = (field: keyof LeanCanvas, value: string) => {
    onUpdate({
      ...canvas,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full">
      {/* Canvas Grid Layout */}
      <div className="grid grid-cols-5 gap-4 min-h-[800px]">
        {/* LEFT COLUMN - Problem */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="bg-red-100 pb-3">
            <CardTitle className="text-lg text-red-900">Problem</CardTitle>
            <CardDescription className="text-red-700 text-xs">
              Top 3 problems you're solving
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.problem}
              onChange={(e) => handleChange('problem', e.target.value)}
              placeholder="1. Problem #1&#10;2. Problem #2&#10;3. Problem #3&#10;&#10;Existing Alternatives:&#10;- How do people solve this today?"
              className="min-h-[320px] resize-none border-red-200 focus:border-red-400 focus:ring-red-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* MIDDLE-LEFT COLUMN - Solution & Key Metrics */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-lg text-blue-900">Solution</CardTitle>
            <CardDescription className="text-blue-700 text-xs">
              Top 3 features for each problem
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.solution}
              onChange={(e) => handleChange('solution', e.target.value)}
              placeholder="1. Feature for Problem #1&#10;2. Feature for Problem #2&#10;3. Feature for Problem #3"
              className="min-h-[150px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>

          <CardHeader className="bg-yellow-100 pb-3 mt-4">
            <CardTitle className="text-lg text-yellow-900">Key Metrics</CardTitle>
            <CardDescription className="text-yellow-700 text-xs">
              Key activities you measure
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.keyMetrics}
              onChange={(e) => handleChange('keyMetrics', e.target.value)}
              placeholder="What are the key numbers that tell you how your business is doing?&#10;&#10;Examples:&#10;- # of active users&#10;- Conversion rate&#10;- Revenue/customer&#10;- Churn rate"
              className="min-h-[150px] resize-none border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400 font-mono text-sm bg-yellow-50"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* CENTER COLUMN - Unique Value Proposition */}
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="bg-purple-100 pb-3">
            <CardTitle className="text-lg text-purple-900">Unique Value Proposition</CardTitle>
            <CardDescription className="text-purple-700 text-xs">
              Single, clear, compelling message
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.uniqueValueProposition}
              onChange={(e) => handleChange('uniqueValueProposition', e.target.value)}
              placeholder="Why are you different and worth buying?&#10;&#10;High-Level Concept:&#10;What analogy can you use?&#10;(e.g., 'YouTube for X')&#10;&#10;What makes you remarkable and worth talking about?"
              className="min-h-[320px] resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* MIDDLE-RIGHT COLUMN - Unfair Advantage & Channels */}
        <Card className="bg-cyan-50 border-cyan-200">
          <CardHeader className="bg-cyan-100 pb-3">
            <CardTitle className="text-lg text-cyan-900">Unfair Advantage</CardTitle>
            <CardDescription className="text-cyan-700 text-xs">
              Can't be easily copied or bought
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.unfairAdvantage}
              onChange={(e) => handleChange('unfairAdvantage', e.target.value)}
              placeholder="What do you have that others can't easily copy?&#10;&#10;Examples:&#10;- Inside information&#10;- Expert endorsements&#10;- Dream team&#10;- Personal authority&#10;- Large network&#10;- Existing customers&#10;- SEO ranking"
              className="min-h-[150px] resize-none border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>

          <CardHeader className="bg-green-100 pb-3 mt-4">
            <CardTitle className="text-lg text-green-900">Channels</CardTitle>
            <CardDescription className="text-green-700 text-xs">
              Path to customers
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.channels}
              onChange={(e) => handleChange('channels', e.target.value)}
              placeholder="How will you reach your customers?&#10;&#10;Free channels:&#10;- SEO, blogs, social media&#10;&#10;Paid channels:&#10;- SEM, ads, affiliates"
              className="min-h-[150px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm bg-green-50"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* RIGHT COLUMN - Customer Segments */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="bg-green-100 pb-3">
            <CardTitle className="text-lg text-green-900">Customer Segments</CardTitle>
            <CardDescription className="text-green-700 text-xs">
              Target customers
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.customerSegments}
              onChange={(e) => handleChange('customerSegments', e.target.value)}
              placeholder="Who are your early adopters?&#10;&#10;Target Customer:&#10;- Demographics&#10;- Behaviors&#10;- Needs&#10;&#10;Early Adopters:&#10;- Who has the problem most acutely?&#10;- Who is willing to try new solutions?"
              className="min-h-[320px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>

      {/* BOTTOM ROW - Cost Structure & Revenue Streams */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="bg-orange-100 pb-3">
            <CardTitle className="text-lg text-orange-900">Cost Structure</CardTitle>
            <CardDescription className="text-orange-700 text-xs">
              Customer Acquisition Costs, Distribution Costs, Hosting, People, etc.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.costStructure}
              onChange={(e) => handleChange('costStructure', e.target.value)}
              placeholder="What are your key costs?&#10;&#10;Fixed costs:&#10;- Salaries, rent, etc.&#10;&#10;Variable costs:&#10;- Cost per acquisition&#10;- Hosting per customer&#10;- Support per customer"
              className="min-h-[150px] resize-none border-orange-200 focus:border-orange-400 focus:ring-orange-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="bg-orange-100 pb-3">
            <CardTitle className="text-lg text-orange-900">Revenue Streams</CardTitle>
            <CardDescription className="text-orange-700 text-xs">
              Revenue Model, Life Time Value, Revenue, Gross Margin
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.revenueStreams}
              onChange={(e) => handleChange('revenueStreams', e.target.value)}
              placeholder="How will you make money?&#10;&#10;Revenue Model:&#10;- Subscription? One-time? Freemium?&#10;&#10;Pricing:&#10;- How much will you charge?&#10;- Life time value (LTV)?&#10;&#10;Key assumptions:&#10;- What needs to be true?"
              className="min-h-[150px] resize-none border-orange-200 focus:border-orange-400 focus:ring-orange-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
