'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ProductVisionBoard } from '@/lib/types/product-vision-board'

interface ProductVisionBoardProps {
  board: ProductVisionBoard
  onUpdate: (board: ProductVisionBoard) => void
  readOnly?: boolean
}

export function ProductVisionBoardComponent({
  board,
  onUpdate,
  readOnly = false,
}: ProductVisionBoardProps) {
  const handleChange = (field: keyof ProductVisionBoard, value: string) => {
    onUpdate({
      ...board,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full space-y-4">
      {/* Vision - Top Section */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader className="bg-purple-100 pb-3">
          <CardTitle className="text-xl text-purple-900">🎯 Vision</CardTitle>
          <CardDescription className="text-purple-700 text-sm">
            The overarching goal - What is the ultimate purpose of creating the product?
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Textarea
            value={board.vision}
            onChange={(e) => handleChange('vision', e.target.value)}
            placeholder="What is your product vision?

Examples:
- Make learning accessible to everyone
- Help small businesses compete globally
- Enable teams to work seamlessly from anywhere

Your vision should be:
- Inspiring and motivating
- Broad enough to allow creativity
- Focused enough to guide decisions"
            className="min-h-[150px] resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400 font-mono text-sm"
            readOnly={readOnly}
          />
        </CardContent>
      </Card>

      {/* Middle Row - 3 Sections */}
      <div className="grid grid-cols-3 gap-4">
        {/* Target Group */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-lg text-blue-900">👥 Target Group</CardTitle>
            <CardDescription className="text-blue-700 text-xs">
              Which market or segment does the product address?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={board.targetGroup}
              onChange={(e) => handleChange('targetGroup', e.target.value)}
              placeholder="Who are your target users/customers?

Examples:
- Small business owners (1-50 employees)
- Software developers using React
- Parents of children ages 5-12
- Enterprise IT departments

Be specific:
- Demographics
- Psychographics
- Market segment
- User persona"
              className="min-h-[250px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Needs */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="bg-green-100 pb-3">
            <CardTitle className="text-lg text-green-900">🎯 Needs</CardTitle>
            <CardDescription className="text-green-700 text-xs">
              What problem does the product solve? What benefit does it provide?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={board.needs}
              onChange={(e) => handleChange('needs', e.target.value)}
              placeholder="What needs does your product address?

Examples:
- Need to manage projects efficiently
- Desire to learn new skills quickly
- Want to reduce operational costs
- Need better team collaboration

Focus on:
- Problems to solve
- Jobs to be done
- Pains to relieve
- Gains to create"
              className="min-h-[250px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* Product */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="bg-orange-100 pb-3">
            <CardTitle className="text-lg text-orange-900">📦 Product</CardTitle>
            <CardDescription className="text-orange-700 text-xs">
              What product is it? What makes it stand out?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={board.product}
              onChange={(e) => handleChange('product', e.target.value)}
              placeholder="What is your product?

Examples:
- Mobile app for task management
- SaaS platform for team collaboration
- AI-powered analytics dashboard
- Educational video platform

Key attributes:
- Core features
- Key differentiators
- Technology/platform
- What makes it unique?"
              className="min-h-[250px] resize-none border-orange-200 focus:border-orange-400 focus:ring-orange-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>

      {/* Business Goals - Bottom Section */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader className="bg-yellow-100 pb-3">
          <CardTitle className="text-xl text-yellow-900">💰 Business Goals</CardTitle>
          <CardDescription className="text-yellow-700 text-sm">
            How is the product going to benefit the company? What are the business goals?
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Textarea
            value={board.businessGoals}
            onChange={(e) => handleChange('businessGoals', e.target.value)}
            placeholder="What are your business goals?

Examples:
- Generate $X in revenue by end of year
- Acquire X,000 active users
- Increase market share by X%
- Reduce support costs by X%
- Achieve X% customer retention

Success metrics:
- Revenue targets
- User acquisition goals
- Cost savings
- Market position
- Strategic objectives"
            className="min-h-[150px] resize-none border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400 font-mono text-sm"
            readOnly={readOnly}
          />
        </CardContent>
      </Card>
    </div>
  )
}
