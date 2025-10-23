"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Star, ChevronRight, Target, Zap, CheckCircle } from "lucide-react"

interface AIInsight {
  id: string
  type: 'strength' | 'weakness' | 'opportunity' | 'threat'
  category: string
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  actionable: boolean
}

interface Recommendation {
  id: string
  title: string
  description: string
  rationale: string
  confidence: number
  priority: 'high' | 'medium' | 'low'
  timeframe: string
  effort: number
  impact: number
  tags: string[]
}

interface PatternAnalysis {
  pattern: string
  description: string
  relevance: number
  examples: string[]
}

export function AIRecommendations() {
  const [activeTab, setActiveTab] = useState("insights")
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null)

  const insights: AIInsight[] = [
    {
      id: "containerization-scaling",
      type: "strength",
      category: "Technical Architecture",
      title: "Containerization enables superior scalability patterns",
      description: "Analysis shows containerization approach provides 3x better horizontal scaling capabilities compared to lift-and-shift, with auto-scaling reducing operational overhead by 40%.",
      confidence: 92,
      impact: "high",
      actionable: true
    },
    {
      id: "financial-complexity",
      type: "weakness", 
      category: "Financial Analysis",
      title: "TCO calculations lack operational complexity factors",
      description: "Current financial model may underestimate operational costs for serverless by 25-30% due to cold start impacts and vendor lock-in considerations.",
      confidence: 78,
      impact: "medium",
      actionable: true
    },
    {
      id: "skill-gap-risk",
      type: "threat",
      category: "Organizational Readiness",
      title: "Significant skill gaps identified across modern approaches",
      description: "Team assessment reveals 65% skill gap for Kubernetes and 80% for serverless architectures, creating implementation and maintenance risks.",
      confidence: 85,
      impact: "high", 
      actionable: true
    },
    {
      id: "vendor-ecosystem",
      type: "opportunity",
      category: "Strategic Positioning",
      title: "Cloud-native ecosystem provides competitive advantages",
      description: "Adopting containerization unlocks access to broader cloud-native tooling ecosystem, enabling future innovations in AI/ML, observability, and automation.",
      confidence: 88,
      impact: "high",
      actionable: false
    },
    {
      id: "compliance-alignment",
      type: "strength",
      category: "Risk Management",
      title: "All options meet core compliance requirements",
      description: "Security and compliance analysis confirms all migration approaches satisfy SOC2, ISO27001, and industry regulations with proper implementation.",
      confidence: 94,
      impact: "medium",
      actionable: false
    }
  ]

  const recommendations: Recommendation[] = [
    {
      id: "hybrid-implementation",
      title: "Implement Phased Hybrid Approach",
      description: "Start with lift-and-shift for critical systems, then containerize applications incrementally based on business value and technical readiness.",
      rationale: "Reduces initial risk while building team capabilities. Allows learning and optimization before full commitment to containerization strategy.",
      confidence: 89,
      priority: "high",
      timeframe: "3-6 months",
      effort: 7,
      impact: 8,
      tags: ["Risk Mitigation", "Incremental", "Capability Building"]
    },
    {
      id: "skill-development",
      title: "Accelerate Cloud-Native Skill Development",
      description: "Implement comprehensive training program focusing on Kubernetes, container orchestration, and cloud-native development practices.",
      rationale: "Skill gaps are the primary risk factor. Investing in capabilities unlocks the full potential of containerization while reducing implementation risks.",
      confidence: 92,
      priority: "high",
      timeframe: "2-4 months",
      effort: 6,
      impact: 9,
      tags: ["Capability Building", "Risk Reduction", "Long-term Value"]
    },
    {
      id: "vendor-strategy",
      title: "Establish Multi-Cloud Vendor Strategy", 
      description: "Design architecture to avoid vendor lock-in while leveraging cloud-specific services strategically for competitive advantage.",
      rationale: "Balances innovation opportunities with strategic flexibility. Prevents over-dependence while enabling cloud-native capabilities.",
      confidence: 76,
      priority: "medium",
      timeframe: "1-3 months",
      effort: 5,
      impact: 7,
      tags: ["Strategic Planning", "Vendor Management", "Flexibility"]
    },
    {
      id: "financial-optimization",
      title: "Implement FinOps Practice for Cost Management",
      description: "Establish financial operations practices to monitor, optimize, and predict cloud costs across all migration approaches.",
      rationale: "Cloud costs can escalate quickly without proper governance. FinOps ensures ROI realization and enables data-driven optimization decisions.",
      confidence: 83,
      priority: "medium",
      timeframe: "2-3 months",
      effort: 4,
      impact: 6,
      tags: ["Cost Management", "Governance", "Operational Excellence"]
    },
    {
      id: "pilot-program",
      title: "Execute Containerization Pilot with Non-Critical Applications",
      description: "Select 2-3 non-critical applications for containerization pilot to validate approach, build experience, and refine processes.",
      rationale: "Reduces risk of large-scale implementation while providing real-world learning. Builds confidence and refines migration methodology.",
      confidence: 94,
      priority: "high",
      timeframe: "1-2 months", 
      effort: 5,
      impact: 8,
      tags: ["Proof of Concept", "Risk Mitigation", "Learning"]
    }
  ]

  const patterns: PatternAnalysis[] = [
    {
      pattern: "Infrastructure Modernization Success Patterns",
      description: "Organizations achieving highest ROI typically follow incremental modernization with strong capability building",
      relevance: 94,
      examples: [
        "Phased approach reduces implementation risk by 60%",
        "Skill investment correlates with 3x higher success rates",
        "Pilot programs improve final implementation quality by 40%"
      ]
    },
    {
      pattern: "Cloud Migration Risk Patterns",
      description: "Common failure modes include underestimating operational complexity and skill requirements",
      relevance: 87,
      examples: [
        "65% of failed migrations cite insufficient team preparation",
        "Cost overruns average 30% when operational factors ignored",
        "Vendor lock-in decisions made early create long-term constraints"
      ]
    },
    {
      pattern: "Technology Adoption Lifecycle",
      description: "Containerization is entering mainstream adoption with mature tooling and established best practices",
      relevance: 82,
      examples: [
        "92% of enterprises planning container adoption by 2025", 
        "Kubernetes becoming industry standard for orchestration",
        "Cloud-native ecosystem providing competitive advantages"
      ]
    }
  ]

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'strength': return 'bg-green-100 text-green-800 border-green-200'
      case 'weakness': return 'bg-red-100 text-red-800 border-red-200'
      case 'opportunity': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'threat': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return <CheckCircle className="h-4 w-4" />
      case 'weakness': return <AlertTriangle className="h-4 w-4" />
      case 'opportunity': return <Star className="h-4 w-4" />
      case 'threat': return <AlertTriangle className="h-4 w-4" />
      default: return <Lightbulb className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800' 
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-500" />
          <span>AI-Powered Recommendations</span>
        </CardTitle>
        <CardDescription>
          Intelligent analysis and recommendations based on decision patterns, risk assessment, and industry best practices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
            <TabsTrigger value="confidence">Confidence Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4">
              {insights.map((insight) => (
                <div 
                  key={insight.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedInsight === insight.id ? 'ring-2 ring-purple-200' : ''
                  } ${getInsightColor(insight.type)}`}
                  onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getInsightIcon(insight.type)}
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{insight.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {insight.category}
                          </Badge>
                        </div>
                        <p className="text-sm opacity-90">{insight.description}</p>
                        
                        {selectedInsight === insight.id && (
                          <div className="mt-3 pt-3 border-t border-current/20 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span>Confidence Level</span>
                              <span className="font-medium">{insight.confidence}%</span>
                            </div>
                            <Progress value={insight.confidence} className="h-2" />
                            
                            {insight.actionable && (
                              <div className="flex items-center space-x-2 mt-2">
                                <Target className="h-3 w-3" />
                                <span className="text-xs font-medium">Actionable Insight</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="text-xs">
                        {insight.impact.toUpperCase()} Impact
                      </Badge>
                      <ChevronRight 
                        className={`h-4 w-4 transition-transform ${
                          selectedInsight === insight.id ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="space-y-4">
              {recommendations
                .sort((a, b) => (b.priority === 'high' ? 1 : 0) - (a.priority === 'high' ? 1 : 0))
                .map((rec) => (
                <div key={rec.id} className="border rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{rec.title}</h4>
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority.toUpperCase()} Priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">
                          {rec.confidence}%
                        </div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded border text-sm">
                      <div className="font-medium text-gray-700 mb-1">Rationale</div>
                      <div className="text-gray-600">{rec.rationale}</div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Timeframe</div>
                        <div className="font-medium">{rec.timeframe}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Effort (1-10)</div>
                        <div className="flex items-center space-x-2">
                          <Progress value={rec.effort * 10} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{rec.effort}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Expected Impact (1-10)</div>
                        <div className="flex items-center space-x-2">
                          <Progress value={rec.impact * 10} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{rec.impact}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {rec.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <div className="space-y-4">
              {patterns.map((pattern, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{pattern.pattern}</h4>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          {pattern.relevance}%
                        </div>
                        <div className="text-xs text-muted-foreground">Relevance</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{pattern.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Supporting Evidence</div>
                      <ul className="space-y-1">
                        {pattern.examples.map((example, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="confidence" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Analysis Confidence Levels</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Financial Analysis</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={85} className="w-20 h-2" />
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Technical Feasibility</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={92} className="w-20 h-2" />
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Risk Assessment</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={78} className="w-20 h-2" />
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Strategic Alignment</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={89} className="w-20 h-2" />
                      <span className="text-sm font-medium">89%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Recommendation Strength</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Implementation Approach</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={94} className="w-20 h-2" />
                      <span className="text-sm font-medium">94%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Skill Development Priority</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={92} className="w-20 h-2" />
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vendor Strategy</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={76} className="w-20 h-2" />
                      <span className="text-sm font-medium">76%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Financial Optimization</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={83} className="w-20 h-2" />
                      <span className="text-sm font-medium">83%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-purple-50 border-purple-200">
              <div className="space-y-2">
                <div className="font-medium text-purple-900 flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>AI Analysis Summary</span>
                </div>
                <div className="text-sm text-purple-800 space-y-1">
                  <div>• Analysis based on 15,000+ similar migration projects and industry benchmarks</div>
                  <div>• Machine learning models trained on successful transformation patterns</div>
                  <div>• Real-time market data and technology trend analysis incorporated</div>
                  <div>• Confidence intervals adjusted for organization-specific context factors</div>
                  <div>• Recommendations validated against 95% confidence threshold</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4 border-t">
          <Button className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Regenerate Analysis</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Export Insights</span>
          </Button>
          <Button variant="outline">
            Schedule Review
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}