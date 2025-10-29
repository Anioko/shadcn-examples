import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getFrameworkKanbanConfig } from "@/lib/kanban-config"
import { getMockKanbanCards } from "@/lib/mock-kanban-data"
import Link from "next/link"
import { BarChart3, Target, AlertTriangle, CheckCircle } from "lucide-react"

interface FrameworkOverviewPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: FrameworkOverviewPageProps): Promise<Metadata> {
  const { slug } = await params
  const config = getFrameworkKanbanConfig(slug)

  if (!config) {
    return {
      title: "Framework Overview | ReqArchitect",
    }
  }

  return {
    title: `${config.frameworkName} Overview | ReqArchitect`,
    description: `Overview and dashboard for ${config.frameworkName} implementation`,
  }
}

export default async function FrameworkOverviewPage({ params }: FrameworkOverviewPageProps) {
  const { slug } = await params
  const config = getFrameworkKanbanConfig(slug)

  if (!config) {
    notFound()
  }

  const cards = getMockKanbanCards(slug)

  // Calculate stats
  const totalCards = cards.length
  const completedCards = cards.filter(
    (c) => c.status === "done" || c.status === "compliant"
  ).length
  const inProgressCards = cards.filter(
    (c) => c.status === "in-progress"
  ).length
  const overdueCards = cards.filter(
    (c) => c.dueDate && new Date(c.dueDate) < new Date() &&
    c.status !== "done" && c.status !== "compliant"
  ).length

  const completionPercentage = totalCards > 0
    ? Math.round((completedCards / totalCards) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {config.frameworkName}
          </h1>
          <Badge variant="outline">{slug}</Badge>
        </div>
        <p className="text-muted-foreground">
          Overview and progress tracking for {config.frameworkName} implementation
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCards}</div>
            <p className="text-xs text-muted-foreground">
              Work items tracked
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedCards}</div>
            <p className="text-xs text-muted-foreground">
              {completionPercentage}% complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inProgressCards}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueCards}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Completion</span>
              <span className="font-medium">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {config.columns.map((column) => {
              const columnCards = cards.filter((c) => c.status === column.status)
              return (
                <div key={column.id} className="space-y-1">
                  <div className="text-sm font-medium">{column.title}</div>
                  <div className="text-2xl font-bold">{columnCards.length}</div>
                  <div className="text-xs text-muted-foreground">
                    {totalCards > 0
                      ? Math.round((columnCards.length / totalCards) * 100)
                      : 0}%
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={`/frameworks/${slug}/kanban`}>
              Open Kanban Board
            </Link>
          </Button>
          <Button variant="outline" disabled>
            Start Assessment
          </Button>
          <Button variant="outline" disabled>
            Generate Report
          </Button>
          <Button variant="outline" disabled>
            View Documentation
          </Button>
        </CardContent>
      </Card>

      {/* Framework Details */}
      <Card>
        <CardHeader>
          <CardTitle>Framework Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Workflow Stages</h4>
            <div className="flex flex-wrap gap-2">
              {config.columns.map((column) => (
                <Badge key={column.id} variant="outline">
                  {column.title}
                </Badge>
              ))}
            </div>
          </div>

          {config.cardTypes && config.cardTypes.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Work Item Types</h4>
              <div className="flex flex-wrap gap-2">
                {config.cardTypes.map((type) => (
                  <Badge key={type} variant="secondary">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
