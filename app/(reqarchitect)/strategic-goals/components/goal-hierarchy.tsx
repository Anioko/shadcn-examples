"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronDown, Target, Plus, MoreHorizontal } from "lucide-react"
import { useState } from "react"

interface Goal {
  id: string
  title: string
  description: string
  level: "vision" | "strategic" | "objective" | "key-result"
  status: "on-track" | "at-risk" | "behind" | "completed"
  progress: number
  owner: string
  deadline: string
  children?: Goal[]
  expanded?: boolean
}

export function GoalHierarchy() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "vision-1",
      title: "Become the Leading AI-Powered Business Platform",
      description: "Transform how small businesses architect and execute their strategy",
      level: "vision",
      status: "on-track",
      progress: 65,
      owner: "CEO",
      deadline: "2027-12-31",
      expanded: true,
      children: [
        {
          id: "strategic-1",
          title: "Achieve Market Leadership in SMB Segment",
          description: "Capture 15% market share in AI-powered business tools for SMBs",
          level: "strategic",
          status: "on-track",
          progress: 40,
          owner: "VP Strategy",
          deadline: "2026-12-31",
          expanded: true,
          children: [
            {
              id: "objective-1",
              title: "Reach 10,000 Active Users",
              description: "Scale user base to 10K monthly active users",
              level: "objective",
              status: "on-track",
              progress: 35,
              owner: "VP Growth",
              deadline: "2025-12-31",
              children: [
                {
                  id: "kr-1",
                  title: "Acquire 1,000 New Users Monthly",
                  description: "Consistent monthly user acquisition",
                  level: "key-result",
                  status: "behind",
                  progress: 20,
                  owner: "Marketing Lead",
                  deadline: "2025-12-31"
                },
                {
                  id: "kr-2",
                  title: "Achieve 85% User Retention Rate",
                  description: "Monthly user retention rate",
                  level: "key-result",
                  status: "on-track",
                  progress: 78,
                  owner: "Product Lead",
                  deadline: "2025-12-31"
                }
              ]
            },
            {
              id: "objective-2",
              title: "Launch Enterprise Features",
              description: "Develop and launch enterprise-grade capabilities",
              level: "objective",
              status: "at-risk",
              progress: 25,
              owner: "VP Product",
              deadline: "2025-09-30",
              children: [
                {
                  id: "kr-3",
                  title: "SSO Integration Complete",
                  description: "Single Sign-On for enterprise customers",
                  level: "key-result",
                  status: "behind",
                  progress: 10,
                  owner: "Engineering Lead",
                  deadline: "2025-06-30"
                }
              ]
            }
          ]
        },
        {
          id: "strategic-2",
          title: "Build Sustainable Revenue Model",
          description: "Achieve $10M ARR with positive unit economics",
          level: "strategic",
          status: "on-track",
          progress: 55,
          owner: "CFO",
          deadline: "2026-12-31",
          children: [
            {
              id: "objective-3",
              title: "Reach $2M ARR",
              description: "Annual Recurring Revenue milestone",
              level: "objective",
              status: "on-track",
              progress: 60,
              owner: "VP Sales",
              deadline: "2025-12-31",
              children: [
                {
                  id: "kr-4",
                  title: "Close 50 Enterprise Deals",
                  description: "Enterprise customer acquisition",
                  level: "key-result",
                  status: "on-track",
                  progress: 45,
                  owner: "Sales Director",
                  deadline: "2025-12-31"
                }
              ]
            }
          ]
        }
      ]
    }
  ])

  const toggleExpanded = (goalId: string) => {
    const updateGoal = (goals: Goal[]): Goal[] => {
      return goals.map(goal => {
        if (goal.id === goalId) {
          return { ...goal, expanded: !goal.expanded }
        }
        if (goal.children) {
          return { ...goal, children: updateGoal(goal.children) }
        }
        return goal
      })
    }
    setGoals(updateGoal(goals))
  }

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'on-track': return 'bg-green-500'
      case 'at-risk': return 'bg-yellow-500'
      case 'behind': return 'bg-red-500'
      case 'completed': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusVariant = (status: Goal['status']) => {
    switch (status) {
      case 'on-track': return 'default'
      case 'at-risk': return 'secondary'
      case 'behind': return 'destructive'
      case 'completed': return 'default'
      default: return 'outline'
    }
  }

  const getLevelIcon = (level: Goal['level']) => {
    switch (level) {
      case 'vision': return '🎯'
      case 'strategic': return '🎖️'
      case 'objective': return '📋'
      case 'key-result': return '📊'
      default: return '📌'
    }
  }

  const renderGoal = (goal: Goal, level: number = 0) => {
    const hasChildren = goal.children && goal.children.length > 0
    
    return (
      <div key={goal.id} className="space-y-2">
        <Card className={`transition-all hover:shadow-md ${level > 0 ? 'ml-6 border-l-4' : ''} ${level === 0 ? 'border-l-4 border-l-blue-500' : level === 1 ? 'border-l-green-500' : level === 2 ? 'border-l-yellow-500' : 'border-l-purple-500'}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(goal.id)}
                    className="h-6 w-6 p-0"
                  >
                    {goal.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getLevelIcon(goal.level)}</span>
                  <div>
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusVariant(goal.status)} className="capitalize">
                  {goal.status.replace('-', ' ')}
                </Badge>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span><strong>Owner:</strong> {goal.owner}</span>
                  <span><strong>Deadline:</strong> {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>
                <span className="font-medium">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Target className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {hasChildren && (
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Child
                    </Button>
                  )}
                </div>
                <Badge variant="outline" className="text-xs">
                  {goal.level.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {hasChildren && goal.expanded && (
          <div className="space-y-2">
            {goal.children?.map(child => renderGoal(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Goal Hierarchy</h2>
          <p className="text-sm text-muted-foreground">
            Visualize strategic goals from vision to key results
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="space-y-4">
        {goals.map(goal => renderGoal(goal))}
      </div>
    </div>
  )
}