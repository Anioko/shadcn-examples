'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { EmpathyMap } from '@/lib/types/empathy-map'

interface EmpathyMapProps {
  map: EmpathyMap
  onUpdate: (map: EmpathyMap) => void
  readOnly?: boolean
}

export function EmpathyMapComponent({
  map,
  onUpdate,
  readOnly = false,
}: EmpathyMapProps) {
  const handleChange = (field: keyof EmpathyMap, value: string) => {
    onUpdate({
      ...map,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full space-y-4">
      {/* Title Section */}
      <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border-2 border-dashed">
        <h2 className="text-2xl font-bold text-purple-900 mb-2">👤 User/Customer in the Center</h2>
        <p className="text-sm text-muted-foreground">
          Who are we empathizing with? What is the situation they are in?
        </p>
      </div>

      {/* Main 4 Quadrants */}
      <div className="grid grid-cols-2 gap-4">
        {/* SAYS */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="bg-yellow-100 pb-3">
            <CardTitle className="text-lg text-yellow-900 flex items-center gap-2">
              💬 Says
            </CardTitle>
            <CardDescription className="text-yellow-700 text-xs">
              What are some quotes and defining words your user says?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={map.says}
              onChange={(e) => handleChange('says', e.target.value)}
              placeholder="What does the user say?&#10;&#10;Examples:&#10;- Direct quotes during interviews&#10;- Comments they make&#10;- What they tell others&#10;- Verbal expressions&#10;&#10;'I need a faster way to...'&#10;'This is too complicated'&#10;'I love how easy this is'"
              className="min-h-[250px] resize-none border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* THINKS */}
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="bg-purple-100 pb-3">
            <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
              💭 Thinks
            </CardTitle>
            <CardDescription className="text-purple-700 text-xs">
              What might your user be thinking? What does this tell you about their beliefs?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={map.thinks}
              onChange={(e) => handleChange('thinks', e.target.value)}
              placeholder="What occupies the user's thoughts?&#10;&#10;Examples:&#10;- Worries and concerns&#10;- Hopes and aspirations&#10;- What keeps them up at night&#10;- Private thoughts not spoken&#10;&#10;'I hope this works...'&#10;'What if I fail?'&#10;'I wish there was a better way'"
              className="min-h-[250px] resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* DOES */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="bg-blue-100 pb-3">
            <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
              🏃 Does
            </CardTitle>
            <CardDescription className="text-blue-700 text-xs">
              What actions and behaviors did you notice? What could they do differently?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={map.does}
              onChange={(e) => handleChange('does', e.target.value)}
              placeholder="What does the user do?&#10;&#10;Examples:&#10;- Observable actions&#10;- Behaviors you notice&#10;- How they interact with products&#10;- Their workflow and habits&#10;&#10;Checks email 20x per day&#10;Takes notes on paper&#10;Switches between 5 apps&#10;Asks colleagues for help"
              className="min-h-[250px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        {/* FEELS */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="bg-green-100 pb-3">
            <CardTitle className="text-lg text-green-900 flex items-center gap-2">
              ❤️ Feels
            </CardTitle>
            <CardDescription className="text-green-700 text-xs">
              What emotions might your subject be feeling? What matters to them?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={map.feels}
              onChange={(e) => handleChange('feels', e.target.value)}
              placeholder="What are the user's emotions?&#10;&#10;Examples:&#10;- Emotional state&#10;- Feelings throughout experience&#10;- Frustrations and delights&#10;- Anxieties and motivations&#10;&#10;Frustrated with slow process&#10;Excited about possibilities&#10;Anxious about making mistakes&#10;Confident when using familiar tools"
              className="min-h-[250px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Pains & Gains */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="bg-red-100 pb-3">
            <CardTitle className="text-lg text-red-900 flex items-center gap-2">
              😖 Pains
            </CardTitle>
            <CardDescription className="text-red-700 text-xs">
              What are their fears, frustrations, and obstacles?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={map.pains}
              onChange={(e) => handleChange('pains', e.target.value)}
              placeholder="What are the user's pains?&#10;&#10;Examples:&#10;- Fears and risks&#10;- Frustrations and obstacles&#10;- Bad experiences&#10;- Things that annoy them&#10;&#10;Fear of data loss&#10;Too many steps required&#10;Unclear instructions&#10;Wasted time on manual tasks"
              className="min-h-[180px] resize-none border-red-200 focus:border-red-400 focus:ring-red-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>

        <Card className="bg-cyan-50 border-cyan-200">
          <CardHeader className="bg-cyan-100 pb-3">
            <CardTitle className="text-lg text-cyan-900 flex items-center gap-2">
              😊 Gains
            </CardTitle>
            <CardDescription className="text-cyan-700 text-xs">
              What are their wants, needs, and measures of success?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={map.gains}
              onChange={(e) => handleChange('gains', e.target.value)}
              placeholder="What are the user's gains?&#10;&#10;Examples:&#10;- Goals and aspirations&#10;- Success criteria&#10;- Desired outcomes&#10;- What makes them happy&#10;&#10;Save time and money&#10;Feel confident and in control&#10;Get recognized by peers&#10;Achieve better results faster"
              className="min-h-[180px] resize-none border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400 font-mono text-sm"
              readOnly={readOnly}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
