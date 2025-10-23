import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { SiteHeader } from "../dashboard/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Settings, TrendingUp, TrendingDown, DollarSign, Database, Cloud, Shield, Users, BarChart3 } from "lucide-react";

// Tech stack data following admin-dashboard card patterns
const applications = [
  {
    id: 1,
    name: "Salesforce",
    category: "CRM",
    status: "Active",
    monthlyCost: 450,
    users: 15,
    lastUpdated: "2025-10-20",
    healthScore: 92,
    icon: Users,
    description: "Customer relationship management and sales automation"
  },
  {
    id: 2,
    name: "AWS",
    category: "Infrastructure",
    status: "Active",
    monthlyCost: 2800,
    users: 8,
    lastUpdated: "2025-10-19",
    healthScore: 98,
    icon: Cloud,
    description: "Cloud infrastructure and hosting services"
  },
  {
    id: 3,
    name: "Stripe",
    category: "Payments",
    status: "Active",
    monthlyCost: 180,
    users: 5,
    lastUpdated: "2025-10-18",
    healthScore: 95,
    icon: DollarSign,
    description: "Payment processing and financial services"
  },
  {
    id: 4,
    name: "MongoDB Atlas",
    category: "Database",
    status: "Active",
    monthlyCost: 320,
    users: 6,
    lastUpdated: "2025-10-17",
    healthScore: 89,
    icon: Database,
    description: "Cloud database service and data storage"
  },
  {
    id: 5,
    name: "Okta",
    category: "Security",
    status: "Active",
    monthlyCost: 240,
    users: 25,
    lastUpdated: "2025-10-16",
    healthScore: 94,
    icon: Shield,
    description: "Identity and access management platform"
  },
  {
    id: 6,
    name: "Tableau",
    category: "Analytics",
    status: "Planning",
    monthlyCost: 1200,
    users: 0,
    lastUpdated: "2025-10-15",
    healthScore: 0,
    icon: BarChart3,
    description: "Business intelligence and data visualization"
  },
  {
    id: 7,
    name: "HubSpot",
    category: "Marketing",
    status: "Active",
    monthlyCost: 800,
    users: 12,
    lastUpdated: "2025-10-14",
    healthScore: 87,
    icon: TrendingUp,
    description: "Marketing automation and lead management"
  },
  {
    id: 8,
    name: "Slack",
    category: "Communication",
    status: "Active",
    monthlyCost: 160,
    users: 25,
    lastUpdated: "2025-10-13",
    healthScore: 91,
    icon: Users,
    description: "Team communication and collaboration platform"
  }
];

function TechStackPageContent() {
  const totalMonthlyCost = applications.reduce((acc, app) => acc + app.monthlyCost, 0);
  const activeApps = applications.filter(app => app.status === 'Active');
  const averageHealthScore = Math.round(activeApps.reduce((acc, app) => acc + app.healthScore, 0) / activeApps.length);
  
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Header section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Technology Stack</h1>
          <p className="text-muted-foreground">
            Manage your application portfolio, track costs, and optimize your technology investments
          </p>
        </div>

        {/* Stats cards - using exact same structure as admin-dashboard SectionCards */}
        <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl:grid-cols-2 @5xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Monthly SaaS Cost</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                ${totalMonthlyCost.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">+12% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardDescription>Active Applications</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {activeApps.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-orange-500" />
                <span className="text-muted-foreground">-2 this quarter</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardDescription>Average Health Score</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {averageHealthScore}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">Excellent overall health</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardDescription>Cost per User</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                ${Math.round(totalMonthlyCost / 25)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Average monthly cost per employee
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs section following admin-dashboard pattern */}
        <Tabs defaultValue="all" className="w-full flex-col justify-start gap-6">
          <div className="flex items-center justify-between">
            <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
              <TabsTrigger value="all">
                All Applications <Badge variant="secondary">{applications.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="by-category">
                By Category
              </TabsTrigger>
              <TabsTrigger value="cost-analysis">
                Cost Analysis
              </TabsTrigger>
              <TabsTrigger value="optimization">
                AI Insights
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings />
                <span className="hidden lg:inline">Configure</span>
              </Button>
              <Button variant="outline" size="sm">
                <Plus />
                <span className="hidden lg:inline">Add Application</span>
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="relative flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((app) => {
                const IconComponent = app.icon;
                return (
                  <Card key={app.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5" />
                          <CardTitle className="text-lg">{app.name}</CardTitle>
                        </div>
                        <Badge 
                          variant={app.status === "Active" ? "default" : "secondary"}
                        >
                          {app.status}
                        </Badge>
                      </div>
                      <CardDescription>{app.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Monthly Cost</span>
                          <span className="font-semibold">${app.monthlyCost}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Active Users</span>
                          <span className="font-semibold">{app.users}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Health Score</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{app.healthScore}%</span>
                            <Badge 
                              variant={
                                app.healthScore >= 90 ? "default" :
                                app.healthScore >= 75 ? "secondary" :
                                app.healthScore === 0 ? "outline" : "destructive"
                              }
                              className="text-xs"
                            >
                              {app.healthScore >= 90 ? "Excellent" :
                               app.healthScore >= 75 ? "Good" :
                               app.healthScore === 0 ? "Not Active" : "Needs Attention"}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">
                              {app.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Updated {app.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="by-category" className="flex flex-col">
            <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Application Categories</h3>
                <p className="text-muted-foreground">Visualization of applications grouped by category</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cost-analysis" className="flex flex-col">
            <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
              <div className="text-center">
                <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Cost Analysis Dashboard</h3>
                <p className="text-muted-foreground">Detailed cost breakdowns and spending trends</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="optimization" className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Cost Optimization Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Consolidate similar tools (Slack + Teams)</li>
                    <li>• Review Tableau license utilization</li>
                    <li>• Optimize AWS resource allocation</li>
                    <li>• Consider annual billing discounts</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Security Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Enable MFA for all critical applications</li>
                    <li>• Review user access permissions quarterly</li>
                    <li>• Update security policies for new tools</li>
                    <li>• Implement SSO across all platforms</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TechStackContent() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <TechStackPageContent />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <SidebarProvider
      className="min-h-auto"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)"
        } as React.CSSProperties
      }>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader 
          title="Technology Stack" 
          buttonText="Add Application"
          buttonIcon={<Plus />}
        />
        <TechStackContent />
      </SidebarInset>
    </SidebarProvider>
  );
}