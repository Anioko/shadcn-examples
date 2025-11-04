import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFrameworkCategory } from "@/lib/framework-categories";
import { getFrameworkKanbanConfig } from "@/lib/kanban-config";
import { getMockKanbanCards } from "@/lib/mock-kanban-data";
import { 
  BarChart3, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Briefcase,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Agile & Project Management | ReqArchitect",
  description: "Comprehensive dashboard for all agile and project management frameworks",
};

export default function AgileProjectManagementPage() {
  const category = getFrameworkCategory("agile-project-management");

  if (!category) {
    return <div>Category not found</div>;
  }

  // Aggregate stats across all child frameworks
  let totalItems = 0;
  let completedItems = 0;
  let inProgressItems = 0;
  let overdueItems = 0;

  const frameworkStats = category.frameworks.map((framework) => {
    const cards = getMockKanbanCards(framework.slug);
    const completed = cards.filter(
      (c) => c.status === "done" || c.status === "compliant"
    ).length;
    const inProgress = cards.filter((c) => c.status === "in-progress").length;
    const overdue = cards.filter(
      (c) =>
        c.dueDate &&
        new Date(c.dueDate) < new Date() &&
        c.status !== "done" &&
        c.status !== "compliant"
    ).length;

    totalItems += cards.length;
    completedItems += completed;
    inProgressItems += inProgress;
    overdueItems += overdue;

    return {
      framework,
      totalCards: cards.length,
      completed,
      inProgress,
      overdue,
      completionPercentage:
        cards.length > 0 ? Math.round((completed / cards.length) * 100) : 0,
    };
  });

  const overallCompletion =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </div>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
      </div>

      {/* Aggregated Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Across {category.frameworks.length} frameworks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {completedItems}
            </div>
            <p className="text-xs text-muted-foreground">
              {overallCompletion}% complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {inProgressItems}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueItems}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>
            Aggregated completion across all frameworks in this capability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Completion</span>
              <span className="font-medium">{overallCompletion}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all"
                style={{ width: `${overallCompletion}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Frameworks Grid - Click to open child dashboards */}
      <Card>
        <CardHeader>
          <CardTitle>Frameworks</CardTitle>
          <CardDescription>
            Click on any framework card to view its detailed dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {frameworkStats.map(({ framework, totalCards, completed, inProgress, completionPercentage }) => (
              <Link
                key={framework.id}
                href={`/frameworks/${framework.slug}`}
                className="block group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {framework.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {framework.description}
                        </CardDescription>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="flex gap-2 pt-2">
                      {framework.hasKanban && (
                        <Badge variant="secondary">Kanban</Badge>
                      )}
                      {framework.tier && (
                        <Badge variant="outline">Tier {framework.tier}</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Mini Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-lg font-bold">{totalCards}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">
                          {completed}
                        </div>
                        <div className="text-xs text-muted-foreground">Done</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">
                          {inProgress}
                        </div>
                        <div className="text-xs text-muted-foreground">Active</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{completionPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${completionPercentage}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Charts and Tables */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks Table</TabsTrigger>
          <TabsTrigger value="items">All Items</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Framework Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {frameworkStats.map(({ framework, totalCards, completionPercentage }) => (
                  <div key={framework.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{framework.name}</span>
                      <span className="text-muted-foreground">
                        {totalCards} items ({completionPercentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frameworks">
          <Card>
            <CardHeader>
              <CardTitle>Frameworks Summary Table</CardTitle>
              <CardDescription>
                Detailed breakdown of all frameworks in this capability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">Framework</th>
                      <th className="p-3 text-center font-medium">Total</th>
                      <th className="p-3 text-center font-medium">Completed</th>
                      <th className="p-3 text-center font-medium">In Progress</th>
                      <th className="p-3 text-center font-medium">Overdue</th>
                      <th className="p-3 text-center font-medium">Progress</th>
                      <th className="p-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {frameworkStats.map(
                      ({ framework, totalCards, completed, inProgress, overdue, completionPercentage }) => (
                        <tr key={framework.id} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{framework.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {framework.description}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center">{totalCards}</td>
                          <td className="p-3 text-center text-green-600 font-medium">
                            {completed}
                          </td>
                          <td className="p-3 text-center text-blue-600 font-medium">
                            {inProgress}
                          </td>
                          <td className="p-3 text-center text-red-600 font-medium">
                            {overdue}
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{ width: `${completionPercentage}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium">
                                {completionPercentage}%
                              </span>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/frameworks/${framework.slug}`}>
                                View
                                <ArrowRight className="ml-2 h-3 w-3" />
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>All Work Items</CardTitle>
              <CardDescription>
                Combined view of all items across frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Table with CRUD operations coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Charts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Advanced analytics and visualizations coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
