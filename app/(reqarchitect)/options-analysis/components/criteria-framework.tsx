"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Target, Zap, DollarSign, Shield, TrendingUp } from "lucide-react"

interface CriterionCategory {
  id: string
  name: string
  description: string
  weight: number
  color: string
  icon: React.ReactNode
  criteria: Criterion[]
}

interface Criterion {
  id: string
  name: string
  description: string
  weight: number
  evaluationType: 'quantitative' | 'qualitative' | 'binary'
  unit?: string
  isMandatory: boolean
}

export function CriteriaFramework() {
  const [categories, setCategories] = useState<CriterionCategory[]>([
    {
      id: "technical",
      name: "Technical",
      description: "Technical feasibility, architecture quality, and implementation complexity",
      weight: 30,
      color: "bg-blue-100 text-blue-800",
      icon: <Zap className="h-4 w-4" />,
      criteria: [
        {
          id: "tech-feasibility",
          name: "Technical Feasibility",
          description: "How technically achievable is this option",
          weight: 35,
          evaluationType: "qualitative",
          isMandatory: true
        },
        {
          id: "scalability",
          name: "Scalability",
          description: "Ability to handle future growth and load",
          weight: 30,
          evaluationType: "qualitative",
          isMandatory: true
        },
        {
          id: "complexity",
          name: "Implementation Complexity",
          description: "Overall complexity of implementation",
          weight: 25,
          evaluationType: "qualitative",
          isMandatory: true
        },
        {
          id: "maintainability",
          name: "Maintainability",
          description: "Long-term maintenance requirements",
          weight: 10,
          evaluationType: "qualitative",
          isMandatory: false
        }
      ]
    },
    {
      id: "financial",
      name: "Financial",
      description: "Total cost of ownership, ROI, and financial impact",
      weight: 25,
      color: "bg-green-100 text-green-800",
      icon: <DollarSign className="h-4 w-4" />,
      criteria: [
        {
          id: "total-cost",
          name: "Total Cost of Ownership",
          description: "5-year TCO including all costs",
          weight: 40,
          evaluationType: "quantitative",
          unit: "USD",
          isMandatory: true
        },
        {
          id: "roi",
          name: "Return on Investment",
          description: "Expected ROI over 5 years",
          weight: 30,
          evaluationType: "quantitative",
          unit: "%",
          isMandatory: true
        },
        {
          id: "payback-period",
          name: "Payback Period",
          description: "Time to recover initial investment",
          weight: 20,
          evaluationType: "quantitative",
          unit: "months",
          isMandatory: true
        },
        {
          id: "budget-fit",
          name: "Budget Alignment",
          description: "Fits within approved budget",
          weight: 10,
          evaluationType: "binary",
          isMandatory: true
        }
      ]
    },
    {
      id: "strategic",
      name: "Strategic",
      description: "Alignment with business strategy and long-term goals",
      weight: 20,
      color: "bg-purple-100 text-purple-800",
      icon: <Target className="h-4 w-4" />,
      criteria: [
        {
          id: "strategy-alignment",
          name: "Strategic Alignment",
          description: "Alignment with business strategy",
          weight: 40,
          evaluationType: "qualitative",
          isMandatory: true
        },
        {
          id: "competitive-advantage",
          name: "Competitive Advantage",
          description: "Potential for competitive differentiation",
          weight: 30,
          evaluationType: "qualitative",
          isMandatory: false
        },
        {
          id: "innovation",
          name: "Innovation Enablement",
          description: "Enables future innovation and capabilities",
          weight: 30,
          evaluationType: "qualitative",
          isMandatory: false
        }
      ]
    },
    {
      id: "risk",
      name: "Risk",
      description: "Implementation risks, operational risks, and mitigation strategies",
      weight: 15,
      color: "bg-red-100 text-red-800",
      icon: <Shield className="h-4 w-4" />,
      criteria: [
        {
          id: "implementation-risk",
          name: "Implementation Risk",
          description: "Risk of implementation failure",
          weight: 40,
          evaluationType: "qualitative",
          isMandatory: true
        },
        {
          id: "operational-risk",
          name: "Operational Risk",
          description: "Ongoing operational risks",
          weight: 35,
          evaluationType: "qualitative",
          isMandatory: true
        },
        {
          id: "vendor-risk",
          name: "Vendor/Technology Risk",
          description: "Dependency and vendor lock-in risks",
          weight: 25,
          evaluationType: "qualitative",
          isMandatory: false
        }
      ]
    },
    {
      id: "operational",
      name: "Operational",
      description: "Operational impact, change management, and organizational readiness",
      weight: 10,
      color: "bg-yellow-100 text-yellow-800",
      icon: <TrendingUp className="h-4 w-4" />,
      criteria: [
        {
          id: "change-impact",
          name: "Change Impact",
          description: "Impact on people and processes",
          weight: 40,
          evaluationType: "qualitative",
          isMandatory: true
        },
        {
          id: "timeline",
          name: "Implementation Timeline",
          description: "Time to complete implementation",
          weight: 30,
          evaluationType: "quantitative",
          unit: "months",
          isMandatory: true
        },
        {
          id: "skills-gap",
          name: "Skills Gap",
          description: "Required new skills and training",
          weight: 30,
          evaluationType: "qualitative",
          isMandatory: false
        }
      ]
    }
  ])

  const handleWeightChange = (categoryId: string, newWeight: number[]) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, weight: newWeight[0] } : cat
    ))
  }

  const handleCriterionWeightChange = (categoryId: string, criterionId: string, newWeight: number[]) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            criteria: cat.criteria.map(crit =>
              crit.id === criterionId ? { ...crit, weight: newWeight[0] } : crit
            )
          }
        : cat
    ))
  }

  const totalWeight = categories.reduce((sum, cat) => sum + cat.weight, 0)
  const mandatoryCriteria = categories.reduce((sum, cat) => 
    sum + cat.criteria.filter(c => c.isMandatory).length, 0
  )
  const totalCriteria = categories.reduce((sum, cat) => sum + cat.criteria.length, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-gray-500" />
          <span>Criteria Framework</span>
        </CardTitle>
        <CardDescription>
          Configure evaluation criteria and weights for decision analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Framework Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-600">{totalCriteria}</div>
            <div className="text-sm text-muted-foreground">
              Total Criteria ({mandatoryCriteria} mandatory)
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className={`text-2xl font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
              {totalWeight}%
            </div>
            <div className="text-sm text-muted-foreground">Total Weight</div>
          </div>
        </div>

        {totalWeight !== 100 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-sm text-yellow-800">
              ⚠️ Category weights must sum to 100%. Current total: {totalWeight}%
            </div>
          </div>
        )}

        {/* Category Configuration */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="border rounded-lg p-4 space-y-4">
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {category.icon}
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                  <Badge className={category.color}>
                    {category.weight}% weight
                  </Badge>
                </div>
                <Button size="sm" variant="outline">
                  Edit Category
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">{category.description}</p>

              {/* Category Weight Slider */}
              <div className="space-y-2">
                <Label>Category Weight: {category.weight}%</Label>
                <Slider
                  value={[category.weight]}
                  onValueChange={(value) => handleWeightChange(category.id, value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Criteria */}
              <div className="space-y-3">
                <div className="text-sm font-medium">Criteria ({category.criteria.length})</div>
                {category.criteria.map((criterion) => (
                  <div key={criterion.id} className="bg-gray-50 rounded-lg p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{criterion.name}</span>
                          {criterion.isMandatory && (
                            <Badge variant="outline" className="text-xs">
                              Mandatory
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {criterion.evaluationType}
                          </Badge>
                          {criterion.unit && (
                            <Badge variant="outline" className="text-xs">
                              {criterion.unit}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{criterion.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{criterion.weight}%</div>
                        <div className="text-xs text-muted-foreground">within category</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">
                        Criterion Weight: {criterion.weight}%
                      </Label>
                      <Slider
                        value={[criterion.weight]}
                        onValueChange={(value) => handleCriterionWeightChange(category.id, criterion.id, value)}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Criterion */}
              <Button size="sm" variant="outline" className="w-full">
                Add Criterion to {category.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Framework Actions */}
        <div className="flex space-x-4">
          <Button className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Save Framework</span>
          </Button>
          <Button variant="outline">
            Reset to Default
          </Button>
          <Button variant="outline">
            Import Framework
          </Button>
          <Button variant="outline">
            Add Category
          </Button>
        </div>

        {/* Framework Templates */}
        <div className="border-t pt-4">
          <div className="text-sm font-medium mb-3">Framework Templates</div>
          <div className="grid gap-2 md:grid-cols-3">
            <Button size="sm" variant="outline">
              Cloud Migration
            </Button>
            <Button size="sm" variant="outline">
              Vendor Selection
            </Button>
            <Button size="sm" variant="outline">
              Technology Modernization
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}