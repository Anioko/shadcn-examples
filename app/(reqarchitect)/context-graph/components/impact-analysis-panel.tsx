"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Users, 
  DollarSign,
  TrendingUp,
  AlertCircle,
  Info
} from "lucide-react";

const sampleEntities = [
  { id: "app-1", name: "Customer Portal", type: "Application" },
  { id: "app-2", name: "Order Management API", type: "Application" },
  { id: "cap-1", name: "Customer Service", type: "Capability" },
  { id: "cap-2", name: "Order Processing", type: "Capability" },
  { id: "tech-1", name: "PostgreSQL Database", type: "Technology" },
  { id: "tech-2", name: "Redis Cache", type: "Technology" },
  { id: "init-1", name: "Digital Transformation", type: "Initiative" },
];

const changeTypes = [
  { value: "delete", label: "Delete/Retire", severity: "high" },
  { value: "deprecate", label: "Deprecate", severity: "medium" },
  { value: "modify", label: "Modify/Update", severity: "low" },
  { value: "move", label: "Move/Migrate", severity: "medium" },
  { value: "replace", label: "Replace", severity: "high" },
];

const sampleImpactResults = {
  impactScore: 78,
  affectedEntities: [
    {
      id: "app-1",
      name: "Customer Portal",
      type: "Application",
      impactLevel: "critical",
      reason: "Directly depends on the entity being modified",
      distance: 1,
      estimatedEffort: "8 hours",
      actions: ["Update API endpoints", "Test integration", "Update documentation"]
    },
    {
      id: "app-3",
      name: "Mobile App",
      type: "Application", 
      impactLevel: "high",
      reason: "Uses shared authentication service",
      distance: 2,
      estimatedEffort: "4 hours",
      actions: ["Update SDK", "Test authentication flow"]
    },
    {
      id: "cap-1",
      name: "Customer Service",
      type: "Capability",
      impactLevel: "medium",
      reason: "Capability delivery may be affected",
      distance: 1,
      estimatedEffort: "2 hours",
      actions: ["Review service levels", "Update process documentation"]
    },
    {
      id: "team-1",
      name: "Engineering Team",
      type: "Team",
      impactLevel: "medium",
      reason: "Team responsibilities may change",
      distance: 1,
      estimatedEffort: "6 hours",
      actions: ["Team training", "Update runbooks", "Knowledge transfer"]
    },
  ],
  riskAssessment: {
    severity: "High",
    probability: 85,
    businessImpact: [
      "Customer service disruption possible",
      "Potential revenue impact from downtime",
      "Customer satisfaction may be affected"
    ],
    technicalImpact: [
      "4 applications require updates",
      "Database schema changes needed",
      "Integration testing required"
    ],
    mitigationStrategies: [
      "Implement changes during maintenance window",
      "Prepare rollback plan",
      "Coordinate with customer service team",
      "Monitor systems closely post-deployment"
    ]
  },
  timeline: {
    estimatedEffort: 20,
    estimatedDuration: 3,
    parallelizable: true
  }
};

export function ImpactAnalysisPanel() {
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedChangeType, setSelectedChangeType] = useState("");
  const [analysis, setAnalysis] = useState<typeof sampleImpactResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = async () => {
    if (!selectedEntity || !selectedChangeType) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalysis(sampleImpactResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getImpactIcon = (level: string) => {
    switch (level) {
      case "critical": return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "high": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "medium": return <Info className="h-4 w-4 text-yellow-500" />;
      case "low": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getImpactColor = (level: string) => {
    switch (level) {
      case "critical": return "border-l-red-500";
      case "high": return "border-l-orange-500";
      case "medium": return "border-l-yellow-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      {/* Analysis Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Configure Impact Analysis</CardTitle>
          <CardDescription>
            Select an entity and change type to analyze potential impacts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entity">Target Entity</Label>
              <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity to analyze..." />
                </SelectTrigger>
                <SelectContent>
                  {sampleEntities.map((entity) => (
                    <SelectItem key={entity.id} value={entity.id}>
                      {entity.name} ({entity.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="changeType">Change Type</Label>
              <Select value={selectedChangeType} onValueChange={setSelectedChangeType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select change type..." />
                </SelectTrigger>
                <SelectContent>
                  {changeTypes.map((changeType) => (
                    <SelectItem key={changeType.value} value={changeType.value}>
                      <div className="flex items-center gap-2">
                        {changeType.label}
                        <Badge 
                          variant={changeType.severity === "high" ? "destructive" : 
                                  changeType.severity === "medium" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {changeType.severity}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={runAnalysis} 
            disabled={!selectedEntity || !selectedChangeType || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Impact...
              </>
            ) : (
              "Run Impact Analysis"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-4">
          {/* Impact Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Impact Analysis Results
                <Badge 
                  variant={analysis.impactScore > 70 ? "destructive" : 
                          analysis.impactScore > 40 ? "default" : "secondary"}
                  className="text-lg px-3 py-1"
                >
                  {analysis.impactScore}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Affected Entities</p>
                    <p className="font-medium">{analysis.affectedEntities.length}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Effort</p>
                    <p className="font-medium">{analysis.timeline.estimatedEffort} hours</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{analysis.timeline.estimatedDuration} days</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    <p className="font-medium">{analysis.riskAssessment.severity}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Affected Entities */}
          <Card>
            <CardHeader>
              <CardTitle>Affected Entities</CardTitle>
              <CardDescription>
                Systems and components that will be impacted by this change
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.affectedEntities.map((entity, index) => (
                  <div 
                    key={index} 
                    className={`border-l-4 pl-4 py-3 rounded-r-lg bg-muted/30 ${getImpactColor(entity.impactLevel)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getImpactIcon(entity.impactLevel)}
                          <span className="font-medium">{entity.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {entity.type}
                          </Badge>
                          <Badge 
                            variant={entity.impactLevel === "critical" ? "destructive" : 
                                    entity.impactLevel === "high" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {entity.impactLevel.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {entity.reason}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                          <span>Distance: {entity.distance} hop{entity.distance !== 1 ? 's' : ''}</span>
                          <span>Estimated effort: {entity.estimatedEffort}</span>
                        </div>
                        
                        {entity.actions.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              Suggested Actions:
                            </p>
                            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                              {entity.actions.map((action, actionIndex) => (
                                <li key={actionIndex}>{action}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Probability</span>
                  <span className="text-sm">{analysis.riskAssessment.probability}%</span>
                </div>
                <Progress value={analysis.riskAssessment.probability} className="h-2" />
                
                <Separator />
                
                <div>
                  <p className="text-sm font-medium mb-2">Business Impact</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {analysis.riskAssessment.businessImpact.map((impact, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <DollarSign className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Technical Impact</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {analysis.riskAssessment.technicalImpact.map((impact, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mitigation Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.riskAssessment.mitigationStrategies.map((strategy, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {strategy}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}