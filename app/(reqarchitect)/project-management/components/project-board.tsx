"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Plus, Calendar, Users, Target, AlertTriangle } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  status: "planning" | "active" | "on-hold" | "completed" | "cancelled"
  priority: "critical" | "high" | "medium" | "low"
  progress: number
  startDate: string
  endDate: string
  team: TeamMember[]
  budget: number
  spent: number
  tasksTotal: number
  tasksCompleted: number
  risks: number
  healthScore: number
  tags: string[]
}

interface TeamMember {
  id: string
  name: string
  role: string
  avatar?: string
}

export function ProjectBoard() {
  const projects: Project[] = [
    {
      id: "proj-1",
      name: "AI-Powered Assessment Engine",
      description: "Develop machine learning models for automated capability assessment",
      status: "active",
      priority: "critical",
      progress: 75,
      startDate: "2025-08-01",
      endDate: "2025-12-31",
      team: [
        { id: "u1", name: "Alex Chen", role: "Tech Lead", avatar: "/avatars/alex.jpg" },
        { id: "u2", name: "Sarah Kim", role: "ML Engineer", avatar: "/avatars/sarah.jpg" },
        { id: "u3", name: "Mike Johnson", role: "Backend Dev", avatar: "/avatars/mike.jpg" },
        { id: "u4", name: "Lisa Wang", role: "Data Scientist", avatar: "/avatars/lisa.jpg" }
      ],
      budget: 250000,
      spent: 187500,
      tasksTotal: 48,
      tasksCompleted: 36,
      risks: 2,
      healthScore: 85,
      tags: ["AI/ML", "Core Product", "High Priority"]
    },
    {
      id: "proj-2",
      name: "Enterprise Integration Platform",
      description: "Build comprehensive integration platform for enterprise customers",
      status: "active",
      priority: "high",
      progress: 45,
      startDate: "2025-09-01",
      endDate: "2026-03-31",
      team: [
        { id: "u5", name: "David Lee", role: "Integration Lead", avatar: "/avatars/david.jpg" },
        { id: "u6", name: "Emma Brown", role: "Frontend Dev", avatar: "/avatars/emma.jpg" },
        { id: "u7", name: "John Smith", role: "DevOps", avatar: "/avatars/john.jpg" }
      ],
      budget: 400000,
      spent: 120000,
      tasksTotal: 72,
      tasksCompleted: 24,
      risks: 4,
      healthScore: 72,
      tags: ["Enterprise", "Integration", "Revenue"]
    },
    {
      id: "proj-3",
      name: "Mobile Application",
      description: "Native mobile apps for iOS and Android platforms",
      status: "on-hold",
      priority: "medium",
      progress: 20,
      startDate: "2025-10-01",
      endDate: "2026-06-30",
      team: [
        { id: "u8", name: "Maria Garcia", role: "Mobile Lead", avatar: "/avatars/maria.jpg" },
        { id: "u9", name: "Tom Wilson", role: "iOS Dev", avatar: "/avatars/tom.jpg" }
      ],
      budget: 300000,
      spent: 45000,
      tasksTotal: 56,
      tasksCompleted: 8,
      risks: 1,
      healthScore: 60,
      tags: ["Mobile", "User Experience", "Future"]
    },
    {
      id: "proj-4",
      name: "SOC 2 Compliance",
      description: "Achieve SOC 2 Type II certification for enterprise readiness",
      status: "active",
      priority: "critical",
      progress: 85,
      startDate: "2025-07-01",
      endDate: "2025-11-30",
      team: [
        { id: "u10", name: "Jennifer Lee", role: "Compliance Lead", avatar: "/avatars/jennifer.jpg" },
        { id: "u11", name: "Robert Chen", role: "Security Eng", avatar: "/avatars/robert.jpg" }
      ],
      budget: 100000,
      spent: 82000,
      tasksTotal: 32,
      tasksCompleted: 28,
      risks: 1,
      healthScore: 92,
      tags: ["Compliance", "Security", "Enterprise"]
    },
    {
      id: "proj-5",
      name: "Customer Success Platform",
      description: "Implement proactive customer success and retention system",
      status: "planning",
      priority: "high",
      progress: 5,
      startDate: "2025-11-01",
      endDate: "2026-02-28",
      team: [
        { id: "u12", name: "Anna Rodriguez", role: "Product Manager", avatar: "/avatars/anna.jpg" },
        { id: "u13", name: "Chris Taylor", role: "Backend Dev", avatar: "/avatars/chris.jpg" }
      ],
      budget: 150000,
      spent: 8000,
      tasksTotal: 42,
      tasksCompleted: 2,
      risks: 0,
      healthScore: 75,
      tags: ["Customer Success", "Retention", "Operations"]
    },
    {
      id: "proj-6",
      name: "Advanced Analytics Dashboard",
      description: "Enhanced analytics and reporting capabilities",
      status: "completed",
      priority: "medium",
      progress: 100,
      startDate: "2025-05-01",
      endDate: "2025-08-31",
      team: [
        { id: "u14", name: "Kevin Zhang", role: "Data Engineer", avatar: "/avatars/kevin.jpg" },
        { id: "u15", name: "Sophie Miller", role: "Frontend Dev", avatar: "/avatars/sophie.jpg" }
      ],
      budget: 80000,
      spent: 75000,
      tasksTotal: 28,
      tasksCompleted: 28,
      risks: 0,
      healthScore: 100,
      tags: ["Analytics", "Reporting", "Completed"]
    }
  ]

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning': return 'bg-blue-500'
      case 'active': return 'bg-green-500'
      case 'on-hold': return 'bg-yellow-500'
      case 'completed': return 'bg-gray-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusVariant = (status: Project['status']) => {
    switch (status) {
      case 'planning': return 'secondary'
      case 'active': return 'default'
      case 'on-hold': return 'secondary'
      case 'completed': return 'default'
      case 'cancelled': return 'destructive'
      default: return 'outline'
    }
  }

  const getPriorityVariant = (priority: Project['priority']) => {
    switch (priority) {
      case 'critical': return 'destructive'
      case 'high': return 'default'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const groupedProjects = {
    active: projects.filter(p => p.status === 'active'),
    planning: projects.filter(p => p.status === 'planning'),
    onHold: projects.filter(p => p.status === 'on-hold'),
    completed: projects.filter(p => p.status === 'completed')
  }

  const renderProjectCard = (project: Project) => (
    <Card key={project.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant={getPriorityVariant(project.priority)}>
              {project.priority.toUpperCase()}
            </Badge>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Budget</div>
            <div className="font-medium">{formatCurrency(project.budget)}</div>
            <div className="text-xs text-muted-foreground">
              {formatCurrency(project.spent)} spent
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Tasks</div>
            <div className="font-medium">{project.tasksCompleted}/{project.tasksTotal}</div>
            <div className="text-xs text-muted-foreground">
              {Math.round((project.tasksCompleted / project.tasksTotal) * 100)}% complete
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
          </span>
        </div>

        {/* Health & Risks */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>Health Score:</span>
            <span className={`font-medium ${getHealthColor(project.healthScore)}`}>
              {project.healthScore}%
            </span>
          </div>
          {project.risks > 0 && (
            <div className="flex items-center gap-1 text-red-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">{project.risks} risks</span>
            </div>
          )}
        </div>

        {/* Team */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Team ({project.team.length})</span>
          </div>
          <div className="flex -space-x-2">
            {project.team.slice(0, 4).map((member) => (
              <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.team.length > 4 && (
              <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                +{project.team.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm">View Details</Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            Timeline
          </Button>
          {project.status === 'active' && (
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-1" />
              Update
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Project Portfolio</h2>
          <p className="text-sm text-muted-foreground">
            Overview of all projects with status, progress, and team information
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filter Projects</Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Project Status Columns */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Active Projects */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <h3 className="font-semibold">Active ({groupedProjects.active.length})</h3>
          </div>
          <div className="space-y-4">
            {groupedProjects.active.map(renderProjectCard)}
          </div>
        </div>

        {/* Planning Projects */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <h3 className="font-semibold">Planning ({groupedProjects.planning.length})</h3>
          </div>
          <div className="space-y-4">
            {groupedProjects.planning.map(renderProjectCard)}
          </div>
        </div>

        {/* On Hold Projects */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <h3 className="font-semibold">On Hold ({groupedProjects.onHold.length})</h3>
          </div>
          <div className="space-y-4">
            {groupedProjects.onHold.map(renderProjectCard)}
          </div>
        </div>

        {/* Completed Projects */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <h3 className="font-semibold">Completed ({groupedProjects.completed.length})</h3>
          </div>
          <div className="space-y-4">
            {groupedProjects.completed.map(renderProjectCard)}
          </div>
        </div>
      </div>
    </div>
  )
}