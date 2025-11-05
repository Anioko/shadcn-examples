'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { McKinsey7S } from '@/lib/types/mckinsey-7s'

interface McKinsey7SProps {
  framework: McKinsey7S
  onUpdate: (framework: McKinsey7S) => void
  readOnly?: boolean
}

export function McKinsey7SComponent({
  framework,
  onUpdate,
  readOnly = false,
}: McKinsey7SProps) {
  const handleChange = (field: keyof McKinsey7S, value: string) => {
    onUpdate({
      ...framework,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full space-y-6">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left Column - Hard Elements */}
        <div className="space-y-4">
          {/* Strategy */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="bg-blue-100 pb-3">
              <CardTitle className="text-lg text-blue-900">Strategy</CardTitle>
              <CardDescription className="text-blue-700 text-xs">
                Plan devised to maintain and build competitive advantage
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={framework.strategy}
                onChange={(e) => handleChange('strategy', e.target.value)}
                placeholder="Strategic objectives and plans:

Examples:
- Long-term goals and vision
- Competitive positioning
- Market differentiation
- Growth strategy
- Resource allocation priorities
- Key strategic initiatives

Consider:
- What is our competitive advantage?
- How do we respond to market changes?
- What are our strategic priorities?"
                className="min-h-[220px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>

          {/* Structure */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="bg-blue-100 pb-3">
              <CardTitle className="text-lg text-blue-900">Structure</CardTitle>
              <CardDescription className="text-blue-700 text-xs">
                How the organization is structured and who reports to whom
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={framework.structure}
                onChange={(e) => handleChange('structure', e.target.value)}
                placeholder="Organizational structure:

Examples:
- Hierarchy and reporting lines
- Centralized vs. decentralized
- Functional vs. divisional
- Matrix structure
- Decision-making authority
- Spans of control

Consider:
- How is work organized?
- How are decisions made?
- What are the reporting relationships?"
                className="min-h-[220px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>

          {/* Systems */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="bg-blue-100 pb-3">
              <CardTitle className="text-lg text-blue-900">Systems</CardTitle>
              <CardDescription className="text-blue-700 text-xs">
                Daily activities and procedures that staff use to get the job done
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={framework.systems}
                onChange={(e) => handleChange('systems', e.target.value)}
                placeholder="Systems and processes:

Examples:
- Performance management systems
- Information systems
- Financial systems
- Quality control processes
- Incentive systems
- Resource allocation systems
- Communication systems

Consider:
- What are the key processes?
- How is performance measured?
- What systems support operations?"
                className="min-h-[220px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>
        </div>

        {/* Center Column - Shared Values (larger) */}
        <div className="space-y-4">
          <Card className="bg-purple-50 border-purple-200 h-full">
            <CardHeader className="bg-purple-100 pb-3">
              <CardTitle className="text-2xl text-purple-900">Shared Values</CardTitle>
              <CardDescription className="text-purple-700 text-sm">
                Core values and corporate culture - the heart of the organization
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={framework.sharedValues}
                onChange={(e) => handleChange('sharedValues', e.target.value)}
                placeholder="Core values and culture:

The central element connecting all other elements of the framework.

Examples:
- Mission and vision statements
- Core beliefs and values
- Corporate culture
- Ethical standards
- Guiding principles
- What the organization stands for
- Organizational identity

Consider:
- What are our fundamental beliefs?
- What unites our organization?
- What guides our decisions?
- What is our purpose?
- What makes us unique?
- How do we define success?

These values should align with and support all other elements of the 7S framework."
                className="min-h-[750px] resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Soft Elements */}
        <div className="space-y-4">
          {/* Style */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="bg-green-100 pb-3">
              <CardTitle className="text-lg text-green-900">Style</CardTitle>
              <CardDescription className="text-green-700 text-xs">
                Leadership approach and management style
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={framework.style}
                onChange={(e) => handleChange('style', e.target.value)}
                placeholder="Management and leadership style:

Examples:
- Leadership approach
- Management style
- Decision-making style
- Communication patterns
- Cultural norms
- Work environment
- How leaders spend time

Consider:
- How do leaders behave?
- What is the management approach?
- How is power exercised?"
                className="min-h-[220px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>

          {/* Staff */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="bg-green-100 pb-3">
              <CardTitle className="text-lg text-green-900">Staff</CardTitle>
              <CardDescription className="text-green-700 text-xs">
                Employees and their general capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={framework.staff}
                onChange={(e) => handleChange('staff', e.target.value)}
                placeholder="People and human resources:

Examples:
- Number and types of personnel
- Recruitment and selection
- Diversity and inclusion
- Employee development
- Succession planning
- Talent management
- Workforce composition

Consider:
- What are our staffing needs?
- How do we attract talent?
- How do we develop people?"
                className="min-h-[220px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="bg-green-100 pb-3">
              <CardTitle className="text-lg text-green-900">Skills</CardTitle>
              <CardDescription className="text-green-700 text-xs">
                Distinctive capabilities and competencies
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={framework.skills}
                onChange={(e) => handleChange('skills', e.target.value)}
                placeholder="Core competencies and capabilities:

Examples:
- Core competencies
- Organizational capabilities
- Technical expertise
- Problem-solving abilities
- Innovation capabilities
- Knowledge and skills
- What we do best

Consider:
- What are we best at?
- What distinctive skills exist?
- What capabilities need development?"
                className="min-h-[220px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400 font-mono text-sm"
                readOnly={readOnly}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-purple-900 mb-2">McKinsey 7S Framework</h3>
        <p className="text-sm text-purple-700">
          The McKinsey 7S Framework analyzes seven internal aspects of an organization to determine how well aligned they are.
          <strong className="text-purple-900"> Shared Values</strong> sit at the center, connecting the three <strong className="text-blue-900">Hard Elements</strong> (Strategy, Structure, Systems)
          with the three <strong className="text-green-900">Soft Elements</strong> (Style, Staff, Skills). All seven elements must be aligned for organizational effectiveness.
        </p>
      </div>
    </div>
  )
}
