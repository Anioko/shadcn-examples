"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Code, Play, Download, Star, GitBranch, MoreHorizontal } from "lucide-react"

interface CodeTemplate {
  id: string
  name: string
  description: string
  category: "component" | "api" | "database" | "workflow" | "test" | "deployment"
  framework: string[]
  language: string
  complexity: "beginner" | "intermediate" | "advanced"
  usage: number
  rating: number
  downloads: number
  lastUpdated: string
  author: string
  tags: string[]
  parameters: TemplateParameter[]
}

interface TemplateParameter {
  name: string
  type: string
  required: boolean
  default?: string
  description: string
}

export function CodeTemplates() {
  const templates: CodeTemplate[] = [
    {
      id: "tpl-1",
      name: "React Component with TypeScript",
      description: "Fully typed React component with props interface, state management, and testing",
      category: "component",
      framework: ["React", "Next.js"],
      language: "TypeScript",
      complexity: "intermediate",
      usage: 1247,
      rating: 4.8,
      downloads: 3421,
      lastUpdated: "2025-10-15",
      author: "ReqArchitect Team",
      tags: ["React", "TypeScript", "Component", "Testing"],
      parameters: [
        { name: "componentName", type: "string", required: true, description: "Name of the component" },
        { name: "hasState", type: "boolean", required: false, default: "false", description: "Include state management" },
        { name: "includeTests", type: "boolean", required: false, default: "true", description: "Generate test files" }
      ]
    },
    {
      id: "tpl-2",
      name: "REST API Endpoint",
      description: "Express.js REST API endpoint with validation, error handling, and documentation",
      category: "api",
      framework: ["Express", "Node.js"],
      language: "JavaScript",
      complexity: "intermediate",
      usage: 892,
      rating: 4.6,
      downloads: 2103,
      lastUpdated: "2025-10-12",
      author: "Community",
      tags: ["API", "Express", "REST", "Validation"],
      parameters: [
        { name: "endpointName", type: "string", required: true, description: "API endpoint name" },
        { name: "httpMethod", type: "select", required: true, description: "HTTP method (GET, POST, PUT, DELETE)" },
        { name: "includeAuth", type: "boolean", required: false, default: "true", description: "Include authentication" }
      ]
    },
    {
      id: "tpl-3",
      name: "Database Migration",
      description: "Database migration script with rollback support for Prisma/TypeORM",
      category: "database",
      framework: ["Prisma", "TypeORM"],
      language: "SQL",
      complexity: "advanced",
      usage: 567,
      rating: 4.5,
      downloads: 1289,
      lastUpdated: "2025-10-10",
      author: "Database Team",
      tags: ["Database", "Migration", "Prisma", "SQL"],
      parameters: [
        { name: "tableName", type: "string", required: true, description: "Database table name" },
        { name: "operation", type: "select", required: true, description: "Migration type (create, alter, drop)" },
        { name: "addIndexes", type: "boolean", required: false, default: "true", description: "Add database indexes" }
      ]
    },
    {
      id: "tpl-4",
      name: "CI/CD Pipeline",
      description: "GitHub Actions workflow for testing, building, and deployment",
      category: "deployment",
      framework: ["GitHub Actions", "Docker"],
      language: "YAML",
      complexity: "advanced",
      usage: 423,
      rating: 4.7,
      downloads: 956,
      lastUpdated: "2025-10-08",
      author: "DevOps Team",
      tags: ["CI/CD", "GitHub Actions", "Docker", "Deployment"],
      parameters: [
        { name: "projectName", type: "string", required: true, description: "Project name" },
        { name: "deployTarget", type: "select", required: true, description: "Deployment target (AWS, Azure, GCP)" },
        { name: "includeTests", type: "boolean", required: false, default: "true", description: "Include test stage" }
      ]
    },
    {
      id: "tpl-5",
      name: "Jest Test Suite",
      description: "Comprehensive Jest test suite with mocks, fixtures, and coverage",
      category: "test",
      framework: ["Jest", "React Testing Library"],
      language: "JavaScript",
      complexity: "intermediate",
      usage: 734,
      rating: 4.4,
      downloads: 1876,
      lastUpdated: "2025-10-14",
      author: "QA Team",
      tags: ["Testing", "Jest", "Mocking", "Coverage"],
      parameters: [
        { name: "testSubject", type: "string", required: true, description: "What to test (component, function, etc.)" },
        { name: "includeMocks", type: "boolean", required: false, default: "true", description: "Generate mock files" },
        { name: "coverageThreshold", type: "number", required: false, default: "80", description: "Coverage threshold %" }
      ]
    },
    {
      id: "tpl-6",
      name: "GraphQL Schema",
      description: "GraphQL schema with resolvers, mutations, and subscriptions",
      category: "api",
      framework: ["Apollo", "GraphQL"],
      language: "TypeScript",
      complexity: "advanced",
      usage: 321,
      rating: 4.6,
      downloads: 543,
      lastUpdated: "2025-10-11",
      author: "API Team",
      tags: ["GraphQL", "Apollo", "Schema", "Resolvers"],
      parameters: [
        { name: "entityName", type: "string", required: true, description: "GraphQL entity name" },
        { name: "includeSubscriptions", type: "boolean", required: false, default: "false", description: "Add subscriptions" },
        { name: "authRequired", type: "boolean", required: false, default: "true", description: "Require authentication" }
      ]
    }
  ]

  const getComplexityColor = (complexity: CodeTemplate['complexity']) => {
    switch (complexity) {
      case 'beginner': return 'text-green-600'
      case 'intermediate': return 'text-yellow-600'
      case 'advanced': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getCategoryIcon = (category: CodeTemplate['category']) => {
    switch (category) {
      case 'component': return <Code className="h-4 w-4" />
      case 'api': return <GitBranch className="h-4 w-4" />
      case 'database': return <GitBranch className="h-4 w-4" />
      case 'workflow': return <Play className="h-4 w-4" />
      case 'test': return <GitBranch className="h-4 w-4" />
      case 'deployment': return <Download className="h-4 w-4" />
      default: return <Code className="h-4 w-4" />
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Code Templates</h2>
          <p className="text-sm text-muted-foreground">
            Browse and use pre-built code templates for rapid development
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Create Template</Button>
          <Button>Generate Code</Button>
        </div>
      </div>

      {/* Template Categories */}
      <div className="flex flex-wrap gap-2">
        {["All", "Component", "API", "Database", "Workflow", "Test", "Deployment"].map((category) => (
          <Button key={category} variant="outline" size="sm">
            {category}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getCategoryIcon(template.category)}
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {template.description}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Framework & Language */}
              <div className="flex items-center gap-2">
                <Badge variant="outline">{template.language}</Badge>
                {template.framework.slice(0, 2).map((fw, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {fw}
                  </Badge>
                ))}
                {template.framework.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{template.framework.length - 2}
                  </Badge>
                )}
              </div>

              {/* Rating & Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(template.rating)}
                    <span className="text-xs text-muted-foreground ml-1">
                      {template.rating}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {template.usage} uses
                  </div>
                </div>
                <div>
                  <div className="font-medium">{template.downloads.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Downloads</div>
                </div>
              </div>

              {/* Complexity */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">Complexity: </span>
                  <span className={`font-medium capitalize ${getComplexityColor(template.complexity)}`}>
                    {template.complexity}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {template.category.toUpperCase()}
                </Badge>
              </div>

              {/* Parameters Preview */}
              <div className="space-y-1">
                <div className="text-sm font-medium">
                  Parameters ({template.parameters.length})
                </div>
                <div className="text-xs text-muted-foreground">
                  {template.parameters.slice(0, 2).map(p => p.name).join(', ')}
                  {template.parameters.length > 2 && ` +${template.parameters.length - 2} more`}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {template.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{template.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Meta Info */}
              <div className="text-xs text-muted-foreground border-t pt-2">
                <div>By {template.author}</div>
                <div>Updated {new Date(template.lastUpdated).toLocaleDateString()}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Play className="h-4 w-4 mr-1" />
                  Use Template
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function GeneratorWorkflows() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generator Workflows</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Visual workflow designer for automated code generation pipelines</p>
      </CardContent>
    </Card>
  )
}

export function GenerationHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generation History</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Audit trail of all code generation activities with rollback capabilities</p>
      </CardContent>
    </Card>
  )
}

export function CodeQuality() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Quality Analysis</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Static analysis, security scanning, and best practice compliance</p>
      </CardContent>
    </Card>
  )
}

export function DocumentationGen() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentation Generation</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Automated API docs, architecture diagrams, and deployment guides</p>
      </CardContent>
    </Card>
  )
}