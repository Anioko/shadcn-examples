'use client';

import { useParams, useRouter } from 'next/navigation';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { SiteHeader } from "../../components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Award,
  TrendingUp,
  Edit,
  Download,
  Share2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

import mockData from '@/lib/mock-data/capability-options-analysis.json';
import { ComparisonMatrix } from '../components/comparison-matrix';
import {
  exportToJSON,
  exportToCSV,
  exportToMarkdown,
  exportToExcel,
  generateShareableLink,
  type Analysis
} from '@/lib/utils/analysis-export';

export default function AnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params.analysisId as string;

  // Check mock data first, then localStorage for newly created analyses
  let analysis = mockData.savedAnalyses.find(a => a.id === analysisId);

  if (!analysis && typeof window !== 'undefined') {
    const storedAnalyses = localStorage.getItem('userAnalyses');
    if (storedAnalyses) {
      const userAnalyses = JSON.parse(storedAnalyses);
      analysis = userAnalyses.find((a: any) => a.id === analysisId);
    }
  }

  if (!analysis) {
    return (
      <SidebarProvider>
        <AppSidebar variant="sidebar" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 items-center justify-center p-6">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Not Found</CardTitle>
                <CardDescription>
                  The requested analysis could not be found.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push('/dashboard/options-analysis')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Analyses
                </Button>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  const capability = mockData.capabilities.find(c => c.id === analysis.capability);
  const selectedOptions = analysis.selectedOptions.map((optionId: string) => {
    const options = (mockData.applicationOptions as any)[analysis.capability] || [];
    return options.find((opt: any) => opt.id === optionId);
  }).filter(Boolean);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = async () => {
    const shareableLink = generateShareableLink(analysisId);

    try {
      await navigator.clipboard.writeText(shareableLink);
      toast.success('Link copied to clipboard', {
        description: 'Share this link with your team members'
      });
    } catch (error) {
      toast.error('Failed to copy link', {
        description: shareableLink
      });
    }
  };

  const handleExport = (format: 'json' | 'csv' | 'md' | 'excel') => {
    if (!analysis) return;

    try {
      switch (format) {
        case 'json':
          exportToJSON(analysis as Analysis);
          break;
        case 'csv':
          exportToCSV(analysis as Analysis);
          break;
        case 'md':
          exportToMarkdown(analysis as Analysis);
          break;
        case 'excel':
          exportToExcel(analysis as Analysis);
          break;
      }

      toast.success('Export successful', {
        description: `Analysis exported as ${format.toUpperCase()}`
      });
    } catch (error) {
      toast.error('Export failed', {
        description: 'Could not export the analysis. Please try again.'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              {/* Header */}
              <div className="px-4 lg:px-6">
                <div className="flex items-start justify-between mb-4">
                  <Button
                    variant="ghost"
                    onClick={() => router.push('/dashboard/options-analysis')}
                    className="mb-4"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Analyses
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleExport('json')}>
                          Export as JSON
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport('csv')}>
                          Export as CSV
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport('md')}>
                          Export as Markdown
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport('excel')}>
                          Export as Excel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{analysis.name}</h1>
                      <Badge className={getStatusColor(analysis.status)}>
                        {analysis.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">
                      Analysis for {capability?.name}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Created by {analysis.createdBy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Created {formatDate(analysis.createdDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Last modified {formatDate(analysis.lastModified)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Capability Context */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Capability Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Capability</label>
                        <p className="text-base mt-1">{capability?.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Category</label>
                        <p className="text-base mt-1">{capability?.category}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Current State</label>
                        <p className="text-base mt-1">{capability?.currentState}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Strategic Importance</label>
                        <Badge variant="outline" className="mt-1">{capability?.strategicImportance}</Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Description</label>
                      <p className="text-base mt-1 text-muted-foreground">{capability?.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Applications Being Compared */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Applications Under Evaluation</CardTitle>
                    <CardDescription>
                      {selectedOptions.length} options selected for comparison
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {selectedOptions.map((option: any) => (
                        <Card key={option.id} className="border-2">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">{option.name}</CardTitle>
                            <Badge variant="outline" className="w-fit">{option.type}</Badge>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                            <div className="text-xs">
                              <span className="font-semibold">Vendor:</span> {option.vendor}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analysis Notes */}
              {analysis.notes && (
                <div className="px-4 lg:px-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{analysis.notes}</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Tabs for Detailed Analysis */}
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="comparison" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="comparison">
                      Detailed Comparison
                    </TabsTrigger>
                    <TabsTrigger value="recommendation">
                      Recommendation
                    </TabsTrigger>
                    <TabsTrigger value="history">
                      Activity History
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="comparison" className="space-y-4">
                    <ComparisonMatrix analysis={analysis} />
                  </TabsContent>

                  <TabsContent value="recommendation" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-yellow-500" />
                          Final Recommendation
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-100 rounded-full">
                              <Award className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-green-900">Recommended Solution</h4>
                              <p className="text-sm text-green-700 mt-1">
                                {analysis.recommendation}
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

                        <Separator />

                        <div className="space-y-3">
                          <h4 className="font-semibold">Recommended Next Steps</h4>
                          <ol className="space-y-2 text-sm list-decimal list-inside">
                            <li>Schedule vendor demos with top 2 options</li>
                            <li>Conduct proof-of-concept for recommended solution</li>
                            <li>Review TCO calculations with finance team</li>
                            <li>Prepare business case for executive approval</li>
                            <li>Develop detailed implementation roadmap</li>
                            <li>Establish governance and success metrics</li>
                          </ol>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="history" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Activity Timeline</CardTitle>
                        <CardDescription>
                          Track changes and updates to this analysis
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="rounded-full bg-blue-100 p-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="h-full w-px bg-border mt-2" />
                            </div>
                            <div className="flex-1 pb-4">
                              <p className="font-medium">Analysis last modified</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(analysis.lastModified)} by {analysis.createdBy}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="rounded-full bg-green-100 p-2">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="h-full w-px bg-border mt-2" />
                            </div>
                            <div className="flex-1 pb-4">
                              <p className="font-medium">Scoring completed</p>
                              <p className="text-sm text-muted-foreground">
                                All evaluation criteria scored for {selectedOptions.length} applications
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="rounded-full bg-purple-100 p-2">
                                <FileText className="h-4 w-4 text-purple-600" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Analysis created</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(analysis.createdDate)} by {analysis.createdBy}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </>
  );
}
