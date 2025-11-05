'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { BusinessModelCanvas } from '@/lib/types/business-model-canvas'
import { Users, Cog, Lightbulb, MessageSquare, Target, DollarSign, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BusinessModelCanvasProps {
  canvas: BusinessModelCanvas
  onUpdate: (canvas: BusinessModelCanvas) => void
  readOnly?: boolean
}

export function BusinessModelCanvasComponent({
  canvas,
  onUpdate,
  readOnly = false,
}: BusinessModelCanvasProps) {
  const handleChange = (field: keyof BusinessModelCanvas, value: string) => {
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
        {/* LEFT COLUMN - Key Partners */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 shadow-md hover:shadow-lg transition-all duration-200 group">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200/80 pb-3 border-b-2 border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <Users className="h-4 w-4 text-blue-700" />
              </div>
              <CardTitle className="text-lg text-blue-900 font-bold">Key Partners</CardTitle>
            </div>
            <CardDescription className="text-blue-700 text-xs font-medium">
              Who are our key partners? Who are our key suppliers?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.keyPartners}
              onChange={(e) => handleChange('keyPartners', e.target.value)}
              placeholder="List your key partners, suppliers, and strategic alliances..."
              className="min-h-[320px] resize-none border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white shadow-sm font-medium"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* MIDDLE-LEFT COLUMN - Key Activities & Resources */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 shadow-md hover:shadow-lg transition-all duration-200 group">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200/80 pb-3 border-b-2 border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <Cog className="h-4 w-4 text-blue-700" />
              </div>
              <CardTitle className="text-lg text-blue-900 font-bold">Key Activities</CardTitle>
            </div>
            <CardDescription className="text-blue-700 text-xs font-medium">
              What key activities do our value propositions require?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.keyActivities}
              onChange={(e) => handleChange('keyActivities', e.target.value)}
              placeholder="Production, problem solving, platform/network..."
              className="min-h-[150px] resize-none border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white shadow-sm font-medium"
              readOnly={readOnly}
            />
          </CardContent>

          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200/80 pb-3 mt-4 border-b-2 border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <Lightbulb className="h-4 w-4 text-blue-700" />
              </div>
              <CardTitle className="text-lg text-blue-900 font-bold">Key Resources</CardTitle>
            </div>
            <CardDescription className="text-blue-700 text-xs font-medium">
              What key resources do our value propositions require?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.keyResources}
              onChange={(e) => handleChange('keyResources', e.target.value)}
              placeholder="Physical, intellectual, human, financial..."
              className="min-h-[150px] resize-none border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white shadow-sm font-medium"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* CENTER COLUMN - Value Propositions */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-2 border-purple-200 shadow-md hover:shadow-lg transition-all duration-200 group">
          <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-200/80 pb-3 border-b-2 border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <Target className="h-4 w-4 text-purple-700" />
              </div>
              <CardTitle className="text-lg text-purple-900 font-bold">Value Propositions</CardTitle>
            </div>
            <CardDescription className="text-purple-700 text-xs font-medium">
              What value do we deliver to the customer? Which problems are we helping to solve?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.valuePropositions}
              onChange={(e) => handleChange('valuePropositions', e.target.value)}
              placeholder="Newness, performance, customization, design, brand/status, price, convenience..."
              className="min-h-[320px] resize-none border-2 border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 bg-white shadow-sm font-medium"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* MIDDLE-RIGHT COLUMN - Customer Relationships & Channels */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-200 shadow-md hover:shadow-lg transition-all duration-200 group">
          <CardHeader className="bg-gradient-to-r from-green-100 to-green-200/80 pb-3 border-b-2 border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <MessageSquare className="h-4 w-4 text-green-700" />
              </div>
              <CardTitle className="text-lg text-green-900 font-bold">Customer Relationships</CardTitle>
            </div>
            <CardDescription className="text-green-700 text-xs font-medium">
              What type of relationship does each customer segment expect?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.customerRelationships}
              onChange={(e) => handleChange('customerRelationships', e.target.value)}
              placeholder="Personal assistance, self-service, automated services, communities..."
              className="min-h-[150px] resize-none border-2 border-green-200 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 bg-white shadow-sm font-medium"
              readOnly={readOnly}
            />
          </CardContent>

          <CardHeader className="bg-gradient-to-r from-green-100 to-green-200/80 pb-3 mt-4 border-b-2 border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <TrendingDown className="h-4 w-4 text-green-700 rotate-90" />
              </div>
              <CardTitle className="text-lg text-green-900 font-bold">Channels</CardTitle>
            </div>
            <CardDescription className="text-green-700 text-xs font-medium">
              Through which channels do our customers want to be reached?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.channels}
              onChange={(e) => handleChange('channels', e.target.value)}
              placeholder="Direct sales, web sales, stores, partner channels..."
              className="min-h-[150px] resize-none border-2 border-green-200 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 bg-white shadow-sm font-medium"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* RIGHT COLUMN - Customer Segments */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-200 shadow-md hover:shadow-lg transition-all duration-200 group">
          <CardHeader className="bg-gradient-to-r from-green-100 to-green-200/80 pb-3 border-b-2 border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <Users className="h-4 w-4 text-green-700" />
              </div>
              <CardTitle className="text-lg text-green-900 font-bold">Customer Segments</CardTitle>
            </div>
            <CardDescription className="text-green-700 text-xs font-medium">
              For whom are we creating value? Who are our most important customers?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.customerSegments}
              onChange={(e) => handleChange('customerSegments', e.target.value)}
              placeholder="Mass market, niche market, segmented, diversified, multi-sided platform..."
              className="min-h-[320px] resize-none border-2 border-green-200 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 bg-white shadow-sm font-medium"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>

      {/* BOTTOM ROW - Cost Structure & Revenue Streams */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200 shadow-md hover:shadow-lg transition-all duration-200 group">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200/80 pb-3 border-b-2 border-orange-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <TrendingDown className="h-4 w-4 text-orange-700" />
              </div>
              <CardTitle className="text-lg text-orange-900 font-bold">Cost Structure</CardTitle>
            </div>
            <CardDescription className="text-orange-700 text-xs font-medium">
              What are the most important costs inherent in our business model?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.costStructure}
              onChange={(e) => handleChange('costStructure', e.target.value)}
              placeholder="Fixed costs, variable costs, economies of scale, economies of scope..."
              className="min-h-[150px] resize-none border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 bg-white shadow-sm font-medium"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200 shadow-md hover:shadow-lg transition-all duration-200 group">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200/80 pb-3 border-b-2 border-orange-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <DollarSign className="h-4 w-4 text-orange-700" />
              </div>
              <CardTitle className="text-lg text-orange-900 font-bold">Revenue Streams</CardTitle>
            </div>
            <CardDescription className="text-orange-700 text-xs font-medium">
              For what value are our customers really willing to pay?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={canvas.revenueStreams}
              onChange={(e) => handleChange('revenueStreams', e.target.value)}
              placeholder="Asset sale, usage fee, subscription fees, lending/renting/leasing, licensing, brokerage fees, advertising..."
              className="min-h-[150px] resize-none border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 bg-white shadow-sm font-medium"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
