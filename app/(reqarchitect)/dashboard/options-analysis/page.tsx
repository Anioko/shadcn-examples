'use client';

import { useState } from 'react';
import { Toaster } from 'sonner';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  TrendingUp,
  Clock,
  FileText,
  BarChart3,
  Award
} from 'lucide-react';

import mockData from '@/lib/mock-data/capability-options-analysis.json';
import { NewAnalysisDialog } from './components/new-analysis-dialog';
import { AnalysisCard } from './components/analysis-card';
import { ComparisonMatrix } from './components/comparison-matrix';

export default function OptionsAnalysisPage() {
  const [showNewAnalysisDialog, setShowNewAnalysisDialog] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState(mockData.savedAnalyses[0]);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAnalysisDeleted = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleAnalysisDuplicated = () => {
    setRefreshKey(prev => prev + 1);
  };

  const stats = [
    {
      title: 'Active Analyses',
      value: '12',
      change: '+3 this month',
      icon: FileText,
      trend: 'up'
    },
    {
      title: 'Completed Reviews',
      value: '45',
      change: '+8 this quarter',
      icon: Award,
      trend: 'up'
    },
    {
      title: 'Avg. Analysis Time',
      value: '2.5 weeks',
      change: '15% faster',
      icon: Clock,
      trend: 'up'
    },
    {
      title: 'Decision Confidence',
      value: '87%',
      change: '+5% vs last quarter',
      icon: TrendingUp,
      trend: 'up'
    }
  ];

  return (
    <>
      <Toaster position="top-right" />
      <SidebarProvider
        className="min-h-auto"
        style={{
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)"
        } as React.CSSProperties}>
        <AppSidebar variant="sidebar" />
        <SidebarInset>
        <SiteHeader
          title="Capability Options Analysis"
          buttonText="New Analysis"
          buttonIcon={<Plus className="mr-2 h-4 w-4" />}
          onButtonClick={() => setShowNewAnalysisDialog(true)}
          buttonSize="lg"
          useOriginalButtonStyle={true}
        />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              {/* Page Description */}
              <div className="px-4 lg:px-6">
                <p className="text-muted-foreground">
                  Compare and evaluate application options for enterprise capabilities
                </p>
              </div>

              {/* Stats Cards */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat) => (
                    <Card key={stat.title}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stat.change}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="analyses" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="analyses">
                      My Analyses
                    </TabsTrigger>
                    <TabsTrigger value="comparison">
                      Comparison Matrix
                    </TabsTrigger>
                    <TabsTrigger value="recommendations">
                      Recommendations
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="analyses" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" key={refreshKey}>
                      {mockData.savedAnalyses.map((analysis) => (
                        <AnalysisCard
                          key={analysis.id}
                          analysis={analysis}
                          onSelect={() => setSelectedAnalysis(analysis)}
                          isSelected={selectedAnalysis.id === analysis.id}
                          onDeleted={handleAnalysisDeleted}
                          onDuplicated={handleAnalysisDuplicated}
                        />
                      ))}

                      {/* Empty state for more */}
                      <Card className="border-dashed hover:border-primary cursor-pointer transition-colors" onClick={() => setShowNewAnalysisDialog(true)}>
                        <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                          <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="font-semibold mb-2">Start New Analysis</h3>
                          <p className="text-sm text-muted-foreground">
                            Compare applications for a capability
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="comparison" className="space-y-4">
                    {selectedAnalysis && (
                      <ComparisonMatrix analysis={selectedAnalysis} />
                    )}
                  </TabsContent>

                  <TabsContent value="recommendations" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          AI-Powered Recommendations
                        </CardTitle>
                        <CardDescription>
                          Based on your evaluation criteria and scoring
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {selectedAnalysis && (
                          <>
                            <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-100 rounded-full">
                                  <Award className="h-5 w-5 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-green-900">Recommended Solution</h4>
                                  <p className="text-sm text-green-700 mt-1">
                                    {selectedAnalysis.recommendation}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-semibold">Key Decision Factors</h4>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <Badge variant="outline" className="mt-0.5">High Impact</Badge>
                                  <span>Functional fit scores indicate strong alignment with business requirements</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Badge variant="outline" className="mt-0.5">Medium Risk</Badge>
                                  <span>Implementation complexity should be carefully managed</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Badge variant="outline" className="mt-0.5">Financial</Badge>
                                  <span>TCO analysis shows competitive pricing within budget constraints</span>
                                </li>
                              </ul>
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-semibold">Next Steps</h4>
                              <ol className="space-y-2 text-sm list-decimal list-inside">
                                <li>Schedule vendor demos with top 2 options</li>
                                <li>Conduct proof-of-concept for recommended solution</li>
                                <li>Review TCO calculations with finance team</li>
                                <li>Prepare business case for executive approval</li>
                                <li>Develop detailed implementation roadmap</li>
                              </ol>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>

      {/* New Analysis Dialog */}
      <NewAnalysisDialog
        open={showNewAnalysisDialog}
        onClose={() => setShowNewAnalysisDialog(false)}
      />
      </SidebarProvider>
    </>
  );
}
