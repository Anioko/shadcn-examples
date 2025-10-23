"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Clock,
  Database,
  Filter,
  Shuffle,
  Upload,
  GitBranch,
  Activity,
  TrendingUp,
  Download,
  Settings
} from "lucide-react";

const pipelineStages = [
  {
    id: "extract",
    name: "Extract",
    description: "Fetch data from source system",
    icon: <Download className="h-4 w-4" />,
    duration: "2.1m",
    percentage: 25
  },
  {
    id: "transform",
    name: "Transform",
    description: "Apply field mappings and transformations",
    icon: <Shuffle className="h-4 w-4" />,
    duration: "3.0m",
    percentage: 35
  },
  {
    id: "validate",
    name: "Validate",
    description: "Check data quality and requirements",
    icon: <CheckCircle className="h-4 w-4" />,
    duration: "1.3m",
    percentage: 15
  },
  {
    id: "deduplicate",
    name: "Deduplicate",
    description: "Remove duplicate records",
    icon: <Filter className="h-4 w-4" />,
    duration: "0.8m",
    percentage: 10
  },
  {
    id: "load",
    name: "Load",
    description: "Insert data into ReqArchitect",
    icon: <Upload className="h-4 w-4" />,
    duration: "2.1m",
    percentage: 25
  },
  {
    id: "relationships",
    name: "Relationships",
    description: "Create entity relationships",
    icon: <GitBranch className="h-4 w-4" />,
    duration: "0.5m",
    percentage: 5
  }
];

const activeJobs = [
  {
    id: "job-001",
    connector: "ServiceNow",
    entityType: "Applications",
    status: "running",
    currentStage: "transform",
    progress: 67,
    recordsProcessed: 1247,
    totalRecords: 1856,
    startTime: "2024-01-15T14:30:00Z",
    estimatedCompletion: "2024-01-15T14:38:00Z"
  },
  {
    id: "job-002",
    connector: "Jira",
    entityType: "Projects",
    status: "completed",
    currentStage: "relationships",
    progress: 100,
    recordsProcessed: 456,
    totalRecords: 456,
    startTime: "2024-01-15T14:20:00Z",
    completedTime: "2024-01-15T14:27:00Z"
  },
  {
    id: "job-003",
    connector: "Azure AD",
    entityType: "Users",
    status: "failed",
    currentStage: "extract",
    progress: 23,
    recordsProcessed: 156,
    totalRecords: 678,
    startTime: "2024-01-15T14:15:00Z",
    error: "Authentication token expired"
  }
];

const performanceMetrics = {
  avgProcessingRate: 2456, // records per hour
  successRate: 97.3,
  avgJobDuration: 8.5, // minutes
  totalJobsToday: 23,
  errorRate: 1.8,
  dataQualityScore: 96.2
};

const codeExample = `// Universal Import Pipeline Usage

const pipeline = new UniversalImportPipeline();

// Execute complete import
const result = await pipeline.executeImport({
  organizationId: "org-123",
  userId: "user-456",
  connector: serviceNowConnector,
  mapping: applicationMapping,
  options: {
    batchSize: 100,
    deduplicationStrategy: "skip",
    failOnError: false,
    enableAI: true
  }
});

console.log(\`Imported \${result.imported} records\`);
// Output: "Imported 1247 records"`;

export function ImportPipeline() {
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (simulationRunning) {
      const interval = setInterval(() => {
        setSimulationProgress(prev => {
          if (prev >= 100) {
            setSimulationRunning(false);
            return 100;
          }
          
          // Update current stage based on progress
          const newProgress = prev + Math.random() * 8;
          let stageIndex = 0;
          let cumulativePercentage = 0;
          
          for (let i = 0; i < pipelineStages.length; i++) {
            cumulativePercentage += pipelineStages[i].percentage;
            if (newProgress <= cumulativePercentage) {
              stageIndex = i;
              break;
            }
          }
          
          setCurrentStage(stageIndex);
          return newProgress;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [simulationRunning]);

  const startSimulation = () => {
    setSimulationRunning(true);
    setSimulationProgress(0);
    setCurrentStage(0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Activity className="h-4 w-4 text-blue-600 animate-pulse" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "scheduled":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case "scheduled":
        return <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>;
      default:
        return null;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Performance Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing Rate</p>
                <p className="text-2xl font-bold">{performanceMetrics.avgProcessingRate.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">records/hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{performanceMetrics.successRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Duration</p>
                <p className="text-2xl font-bold">{performanceMetrics.avgJobDuration}m</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">per 1K records</p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Import Pipeline Visualization
          </CardTitle>
          <CardDescription>
            Interactive demonstration of the universal import pipeline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pipeline Stages */}
          <div className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div key={stage.id} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  simulationRunning && index === currentStage 
                    ? "bg-blue-100 text-blue-600" 
                    : simulationRunning && index < currentStage
                      ? "bg-green-100 text-green-600"
                      : simulationProgress >= 100 
                        ? "bg-green-100 text-green-600"
                        : "bg-muted text-muted-foreground"
                }`}>
                  {stage.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{stage.name}</h4>
                    <span className="text-sm text-muted-foreground">{stage.duration}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{stage.description}</p>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        simulationRunning && index === currentStage 
                          ? "bg-blue-600" 
                          : simulationRunning && index < currentStage
                            ? "bg-green-600"
                            : simulationProgress >= 100
                              ? "bg-green-600"
                              : "bg-muted-foreground/30"
                      }`}
                      style={{ 
                        width: simulationRunning && index === currentStage 
                          ? "75%" 
                          : simulationRunning && index < currentStage
                            ? "100%"
                            : simulationProgress >= 100
                              ? "100%"
                              : "0%"
                      }}
                    />
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium">{stage.percentage}%</div>
                  <div className="text-xs text-muted-foreground">of total time</div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(simulationProgress)}%</span>
            </div>
            <Progress value={simulationProgress} className="h-3" />
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <Button 
              onClick={startSimulation}
              disabled={simulationRunning}
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              {simulationRunning ? "Running..." : "Start Demo"}
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setSimulationRunning(false);
                setSimulationProgress(0);
                setCurrentStage(0);
              }}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Jobs and Code Example */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Active Import Jobs
            </CardTitle>
            <CardDescription>
              Real-time monitoring of import pipeline jobs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeJobs.map((job, index) => (
              <div key={job.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-medium">{job.connector}</h4>
                      <p className="text-sm text-muted-foreground">{job.entityType}</p>
                    </div>
                    {getStatusIcon(job.status)}
                  </div>
                  {getStatusBadge(job.status)}
                </div>

                {job.status === "running" && (
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress ({job.currentStage})</span>
                      <span>{job.recordsProcessed} / {job.totalRecords}</span>
                    </div>
                    <Progress value={job.progress} />
                  </div>
                )}

                {job.status === "failed" && job.error && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700 mb-3">
                    {job.error}
                  </div>
                )}

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Started {formatTimeAgo(job.startTime)}</span>
                  {job.completedTime && (
                    <span>Completed {formatTimeAgo(job.completedTime)}</span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Pipeline API Usage
            </CardTitle>
            <CardDescription>
              How to use the universal import pipeline in your code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{codeExample}</code>
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="h-8 w-8 text-blue-600" />
              <div>
                <h4 className="font-medium">Parallel Processing</h4>
                <p className="text-sm text-muted-foreground">Multi-threaded execution</p>
              </div>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Batch processing with configurable size</li>
              <li>• Async job queue management</li>
              <li>• Resource-aware scaling</li>
              <li>• Automatic retry on failure</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-medium">Data Quality</h4>
                <p className="text-sm text-muted-foreground">Validation & deduplication</p>
              </div>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Schema validation and type checking</li>
              <li>• Duplicate detection algorithms</li>
              <li>• Data cleaning and normalization</li>
              <li>• Quality score calculation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-8 w-8 text-purple-600" />
              <div>
                <h4 className="font-medium">Monitoring</h4>
                <p className="text-sm text-muted-foreground">Real-time observability</p>
              </div>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Live progress tracking</li>
              <li>• Performance metrics collection</li>
              <li>• Error alerting and logging</li>
              <li>• Historical job analytics</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}