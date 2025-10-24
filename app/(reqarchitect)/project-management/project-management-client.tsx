"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  CheckSquare, 
  Calendar, 
  Users, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  Target,
  Clock,
  Zap,
  Brain,
  Settings,
  Plus,
  Filter,
  Search,
  Download,
  Edit3,
  Eye,
  MoreHorizontal
} from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  status: "planning" | "active" | "on-hold" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "critical"
  progress: number
  startDate: string
  endDate: string
  budget: number
  spent: number
  team: TeamMember[]
  risks: ProjectRisk[]
  milestones: Milestone[]
  dependencies: string[]
}

interface TeamMember {
  id: string
  name: string
  role: string
  allocation: number
  avatar: string
}

interface ProjectRisk {
  id: string
  description: string
  probability: number
  impact: number
  mitigation: string
  status: "open" | "monitoring" | "closed"
}

interface Milestone {
  id: string
  name: string
  date: string
  status: "pending" | "in-progress" | "completed" | "delayed"
  dependencies: string[]
}

interface Resource {
  id: string
  name: string
  role: string
  capacity: number
  allocated: number
  skills: string[]
  projects: string[]
  costPerHour: number
}

export function ProjectManagementClient() {
  const [activeTab, setActiveTab] = useState("dashboard")
  
  const [projects] = useState<Project[]>([
    {
      id: "proj-1",
      name: "Customer Portal v2.0",
      description: "Complete redesign of customer portal with enhanced self-service capabilities",
      status: "active",
      priority: "high",
      progress: 67,
      startDate: "2024-09-01",
      endDate: "2024-12-15",
      budget: 450000,
      spent: 280000,
      team: [
        { id: "t1", name: "Alice Johnson", role: "Product Manager", allocation: 100, avatar: "/avatars/alice.jpg" },
        { id: "t2", name: "Bob Chen", role: "Lead Developer", allocation: 100, avatar: "/avatars/bob.jpg" },
        { id: "t3", name: "Carol Davis", role: "UX Designer", allocation: 80, avatar: "/avatars/carol.jpg" }
      ],
      risks: [
        { 
          id: "r1", 
          description: "Third-party API integration complexity", 
          probability: 0.7, 
          impact: 8, 
          mitigation: "Early POC and vendor consultation",
          status: "monitoring"
        }
      ],
      milestones: [
        { id: "m1", name: "Design Review", date: "2024-10-15", status: "completed", dependencies: [] },
        { id: "m2", name: "API Integration", date: "2024-11-30", status: "in-progress", dependencies: ["m1"] },
        { id: "m3", name: "User Testing", date: "2024-12-10", status: "pending", dependencies: ["m2"] }
      ],
      dependencies: ["Identity Management Upgrade"]
    },
    {
      id: "proj-2",
      name: "AI Analytics Engine",
      description: "Develop machine learning capabilities for predictive customer analytics",
      status: "active",
      priority: "critical",
      progress: 34,
      startDate: "2024-08-15",
      endDate: "2025-02-28",
      budget: 850000,
      spent: 290000,
      team: [
        { id: "t4", name: "David Wilson", role: "ML Engineer", allocation: 100, avatar: "/avatars/david.jpg" },
        { id: "t5", name: "Eva Martinez", role: "Data Scientist", allocation: 100, avatar: "/avatars/eva.jpg" }
      ],
      risks: [
        { 
          id: "r2", 
          description: "Data quality issues in legacy systems", 
          probability: 0.6, 
          impact: 9, 
          mitigation: "Comprehensive data cleaning pipeline",
          status: "open"
        }
      ],
      milestones: [
        { id: "m4", name: "Data Pipeline", date: "2024-11-15", status: "in-progress", dependencies: [] },
        { id: "m5", name: "Model Training", date: "2025-01-15", status: "pending", dependencies: ["m4"] }
      ],
      dependencies: ["Data Warehouse Migration"]
    }
  ])

  const [resources] = useState<Resource[]>([
    { 
      id: "res-1", 
      name: "Alice Johnson", 
      role: "Product Manager", 
      capacity: 40, 
      allocated: 40, 
      skills: ["Product Strategy", "Agile", "User Research"],
      projects: ["Customer Portal v2.0"],
      costPerHour: 120
    },
    { 
      id: "res-2", 
      name: "Bob Chen", 
      role: "Lead Developer", 
      capacity: 40, 
      allocated: 32, 
      skills: ["React", "Node.js", "AWS", "System Design"],
      projects: ["Customer Portal v2.0", "Legacy Migration"],
      costPerHour: 110
    },
    { 
      id: "res-3", 
      name: "Carol Davis", 
      role: "UX Designer", 
      capacity: 40, 
      allocated: 24, 
      skills: ["UI/UX Design", "Figma", "User Testing", "Design Systems"],
      projects: ["Customer Portal v2.0"],
      costPerHour: 95
    }
  ])

  const projectStats = [
    {
      label: "Active Projects",
      value: "12",
      description: "In progress",
      trend: "+2 this month",
      icon: CheckSquare,
      color: "text-blue-600"
    },
    {
      label: "Sprint Velocity",
      value: "32",
      description: "Story points/sprint",
      trend: "+8% vs last sprint",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      label: "Team Utilization",
      value: "85%",
      description: "Average capacity",
      trend: "Optimal range",
      icon: Users,
      color: "text-purple-600"
    },
    {
      label: "Budget Variance",
      value: "+3.2%",
      description: "vs planned",
      trend: "Within tolerance",
      icon: BarChart3,
      color: "text-orange-600"
    }
  ]

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <ProjectDashboard stats={projectStats} projects={projects} />
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <ProjectManagement projects={projects} />
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <ResourceManagement resources={resources} />
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <TimelineView projects={projects} />
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <AiProjectInsights projects={projects} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ProjectStat {
  label: string
  value: string
  description: string
  trend: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

function ProjectDashboard({ stats, projects }: { stats: ProjectStat[], projects: Project[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Project Dashboard</h2>
          <p className="text-muted-foreground">Overview of all projects and team performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <IconComponent className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <p className="text-xs text-green-600">{stat.trend}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-muted-foreground">{project.description}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={project.progress} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <Badge 
                      variant={project.priority === "critical" ? "destructive" : "secondary"}
                    >
                      {project.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk & Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projects.flatMap(p => p.risks).map((risk) => (
                <div key={risk.id} className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-sm">{risk.description}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Probability: {Math.round(risk.probability * 100)}%</div>
                    <div>Impact: {risk.impact}/10</div>
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {risk.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ProjectManagement({ projects }: { projects: Project[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "planning": return "bg-blue-100 text-blue-800"
      case "on-hold": return "bg-yellow-100 text-yellow-800"
      case "completed": return "bg-gray-100 text-gray-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Project Management</h2>
          <p className="text-muted-foreground">Detailed project tracking and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge variant="outline">
                    {project.priority} priority
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground">{project.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Progress</h4>
                  <div className="space-y-2">
                    <Progress value={project.progress} className="h-2" />
                    <span className="text-sm font-medium">{project.progress}% Complete</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Timeline</h4>
                  <div className="text-sm">
                    <div>Start: {new Date(project.startDate).toLocaleDateString()}</div>
                    <div>End: {new Date(project.endDate).toLocaleDateString()}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Budget</h4>
                  <div className="text-sm">
                    <div>Budget: ${project.budget.toLocaleString()}</div>
                    <div>Spent: ${project.spent.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((project.spent / project.budget) * 100)}% utilized
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Team</h4>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member) => (
                      <div
                        key={member.id}
                        className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                    {project.team.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Milestones</h4>
                  <div className="space-y-2">
                    {project.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-3 p-2 border rounded">
                        <div className={`w-3 h-3 rounded-full ${
                          milestone.status === "completed" ? "bg-green-500" :
                          milestone.status === "in-progress" ? "bg-blue-500" :
                          milestone.status === "delayed" ? "bg-red-500" : "bg-gray-300"
                        }`} />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{milestone.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(milestone.date).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {milestone.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Risks</h4>
                  <div className="space-y-2">
                    {project.risks.map((risk) => (
                      <div key={risk.id} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <span className="font-medium text-sm">{risk.description}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">
                          Probability: {Math.round(risk.probability * 100)}% | Impact: {risk.impact}/10
                        </div>
                        <div className="text-xs">{risk.mitigation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ResourceManagement({ resources }: { resources: Resource[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Resource Management</h2>
          <p className="text-muted-foreground">Team capacity planning and allocation optimization</p>
        </div>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </div>

      <div className="grid gap-4">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {resource.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground">{resource.role}</p>
                    <div className="flex gap-2 mt-1">
                      {resource.skills.slice(0, 3).map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-lg font-semibold">{resource.capacity}h</div>
                    <div className="text-xs text-muted-foreground">Capacity</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{resource.allocated}h</div>
                    <div className="text-xs text-muted-foreground">Allocated</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">
                      {Math.round((resource.allocated / resource.capacity) * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Utilization</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold">${resource.costPerHour}/hr</div>
                  <div className="text-xs text-muted-foreground">Hourly Rate</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Capacity Utilization</span>
                  <span className="text-sm text-muted-foreground">
                    {resource.allocated}/{resource.capacity} hours
                  </span>
                </div>
                <Progress 
                  value={(resource.allocated / resource.capacity) * 100} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TimelineView({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Project Timeline</h2>
          <p className="text-muted-foreground">Gantt chart view of project schedules and dependencies</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="months">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weeks">Weeks</SelectItem>
              <SelectItem value="months">Months</SelectItem>
              <SelectItem value="quarters">Quarters</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{project.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.progress}% complete
                  </div>
                </div>
                <div className="relative">
                  <div className="h-6 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-blue-500 rounded" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center px-2 text-xs text-white font-medium">
                    {project.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AiProjectInsights({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">AI Project Insights</h2>
          <p className="text-muted-foreground">Machine learning powered project analytics and predictions</p>
        </div>
        <Button variant="outline">
          <Brain className="h-4 w-4 mr-2" />
          Generate Insights
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Delivery Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-green-600">92%</div>
              <p className="text-sm text-muted-foreground">
                Probability of on-time delivery for active projects based on current velocity and risk factors.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Risk Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-orange-600">Medium</div>
              <p className="text-sm text-muted-foreground">
                Overall portfolio risk level. 2 projects require immediate attention for scope or timeline adjustments.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-blue-600">15%</div>
              <p className="text-sm text-muted-foreground">
                Potential efficiency improvement through resource reallocation and workflow optimization.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Resource Optimization</span>
                <Badge className="bg-blue-100 text-blue-800">High Impact</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Reallocate Carol Davis from Customer Portal to AI Analytics project to accelerate UX design phase.
              </p>
              <div className="text-xs text-muted-foreground">
                Expected outcome: 12% faster delivery, reduced risk of design bottleneck
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="font-medium">Risk Mitigation</span>
                <Badge className="bg-orange-100 text-orange-800">Medium Impact</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Schedule additional stakeholder reviews for AI Analytics to prevent scope creep.
              </p>
              <div className="text-xs text-muted-foreground">
                Risk reduction: 35% lower probability of timeline delays
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}