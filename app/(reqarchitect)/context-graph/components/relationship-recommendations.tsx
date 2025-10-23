"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Lightbulb, 
  ThumbsUp, 
  ThumbsDown, 
  Clock, 
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Star,
  Zap,
  Link,
  ArrowRight
} from "lucide-react";

const sampleRecommendations = [
  {
    id: "rec-1",
    type: "missing_relationship",
    confidence: 92,
    priority: "high",
    title: "Customer Portal should depend on User Authentication Service",
    description: "Pattern analysis suggests these systems should be connected. Similar applications in your architecture show this dependency.",
    reasoning: [
      "Customer Portal references user authentication in code",
      "97% of similar web applications depend on auth services",
      "Missing this relationship affects impact analysis accuracy"
    ],
    evidence: [
      "Code analysis found 15 authentication API calls",
      "Similar pattern in Mobile App → Auth Service relationship",
      "Security team guidelines require explicit auth dependencies"
    ],
    suggestedRelationship: {
      source: "Customer Portal",
      target: "User Authentication Service", 
      type: "DEPENDS_ON",
      strength: 85
    },
    impact: {
      strategicValue: 75,
      completeness: 80,
      consistency: 90
    },
    algorithm: "pattern_matching"
  },
  {
    id: "rec-2", 
    type: "strengthen_relationship",
    confidence: 87,
    priority: "medium",
    title: "Increase strength of Order API → Payment Gateway relationship",
    description: "Current relationship strength (45%) seems low based on usage patterns and business criticality.",
    reasoning: [
      "High transaction volume indicates stronger dependency",
      "Business impact analysis shows critical relationship",
      "Benchmark against industry standards suggests 80%+ strength"
    ],
    evidence: [
      "99.7% uptime requirement for payment processing",
      "500+ daily transactions through this connection",
      "Previous outage caused $50K revenue loss"
    ],
    suggestedRelationship: {
      source: "Order API",
      target: "Payment Gateway",
      type: "DEPENDS_ON", 
      strength: 85,
      currentStrength: 45
    },
    impact: {
      strategicValue: 85,
      completeness: 60,
      consistency: 75
    },
    algorithm: "usage_analysis"
  },
  {
    id: "rec-3",
    type: "new_relationship",
    confidence: 79,
    priority: "medium", 
    title: "Link Digital Transformation initiative to Customer Experience capability",
    description: "Initiative objectives align with capability outcomes. This connection would improve traceability.",
    reasoning: [
      "Initiative mentions customer experience 12 times in documentation",
      "Capability owner is stakeholder in initiative",
      "Budget allocation suggests capability investment"
    ],
    evidence: [
      "Initiative charter lists 'improve customer satisfaction' as key goal",
      "Same team manages both initiative and capability",
      "40% of initiative budget allocated to customer-facing improvements"
    ],
    suggestedRelationship: {
      source: "Digital Transformation",
      target: "Customer Experience", 
      type: "REALIZES",
      strength: 70
    },
    impact: {
      strategicValue: 80,
      completeness: 70,
      consistency: 65
    },
    algorithm: "semantic_analysis"
  },
  {
    id: "rec-4",
    type: "remove_relationship", 
    confidence: 71,
    priority: "low",
    title: "Review Order API → Legacy Inventory relationship",
    description: "This relationship may be outdated. New inventory system appears to have replaced legacy system.",
    reasoning: [
      "Legacy Inventory marked as 'deprecated' 6 months ago",
      "New Inventory System deployed with same functionality",
      "No recent data flows detected on this connection"
    ],
    evidence: [
      "Legacy system last updated 8 months ago",
      "All teams migrated to new system per migration plan",
      "Monitoring shows zero API calls in past 90 days"
    ],
    suggestedRelationship: {
      source: "Order API",
      target: "Legacy Inventory System",
      type: "DEPENDS_ON",
      action: "remove"
    },
    impact: {
      strategicValue: 60,
      completeness: 80,
      consistency: 70
    },
    algorithm: "lifecycle_analysis"
  }
];

export function RelationshipRecommendations() {
  const [acceptedRecs, setAcceptedRecs] = useState<Set<string>>(new Set());
  const [rejectedRecs, setRejectedRecs] = useState<Set<string>>(new Set());

  const handleAccept = (recId: string) => {
    setAcceptedRecs(prev => new Set([...prev, recId]));
  };

  const handleReject = (recId: string) => {
    setRejectedRecs(prev => new Set([...prev, recId]));
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "low": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return <CheckCircle2 className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-yellow-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "missing_relationship": return <Link className="h-4 w-4 text-blue-500" />;
      case "strengthen_relationship": return <TrendingUp className="h-4 w-4 text-purple-500" />;
      case "new_relationship": return <Zap className="h-4 w-4 text-green-500" />;
      case "remove_relationship": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Lightbulb className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAlgorithmBadge = (algorithm: string) => {
    const algorithmMap: Record<string, { label: string; color: string }> = {
      pattern_matching: { label: "Pattern Analysis", color: "bg-blue-100 text-blue-800" },
      usage_analysis: { label: "Usage Analysis", color: "bg-green-100 text-green-800" },
      semantic_analysis: { label: "Semantic Analysis", color: "bg-purple-100 text-purple-800" },
      lifecycle_analysis: { label: "Lifecycle Analysis", color: "bg-orange-100 text-orange-800" },
      collaborative_filtering: { label: "Collaborative", color: "bg-pink-100 text-pink-800" },
    };
    
    const config = algorithmMap[algorithm] || { label: algorithm, color: "bg-gray-100 text-gray-800" };
    return (
      <Badge className={`text-xs ${config.color}`} variant="secondary">
        {config.label}
      </Badge>
    );
  };

  const pendingRecs = sampleRecommendations.filter(
    rec => !acceptedRecs.has(rec.id) && !rejectedRecs.has(rec.id)
  );

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Lightbulb className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Recommendations</p>
              <p className="text-2xl font-bold">{sampleRecommendations.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <ThumbsUp className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Accepted</p>
              <p className="text-2xl font-bold">{acceptedRecs.size}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{pendingRecs.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Star className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Avg Confidence</p>
              <p className="text-2xl font-bold">
                {Math.round(sampleRecommendations.reduce((acc, rec) => acc + rec.confidence, 0) / sampleRecommendations.length)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI-Powered Relationship Recommendations
          </CardTitle>
          <CardDescription>
            Intelligent suggestions to improve your architecture graph completeness and accuracy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {pendingRecs.map((rec) => (
              <div 
                key={rec.id} 
                className={`border-l-4 pl-6 py-4 rounded-r-lg bg-muted/30 ${getPriorityColor(rec.priority)}`}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getTypeIcon(rec.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{rec.title}</h4>
                          {getPriorityIcon(rec.priority)}
                          <Badge 
                            variant={rec.priority === "high" ? "destructive" : 
                                    rec.priority === "medium" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {rec.priority.toUpperCase()}
                          </Badge>
                          {getAlgorithmBadge(rec.algorithm)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{rec.confidence}%</div>
                        <div className="text-xs text-muted-foreground">confidence</div>
                      </div>
                      <Progress value={rec.confidence} className="w-12 h-2" />
                    </div>
                  </div>

                  {/* Suggested Relationship */}
                  {rec.suggestedRelationship && (
                    <div className="bg-background/50 rounded-lg p-3 border">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-muted-foreground">SUGGESTED RELATIONSHIP</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{rec.suggestedRelationship.source}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{rec.suggestedRelationship.target}</span>
                        <Badge variant="outline" className="text-xs">
                          {rec.suggestedRelationship.type}
                        </Badge>
                        {rec.suggestedRelationship.strength && (
                          <Badge variant="secondary" className="text-xs">
                            {rec.suggestedRelationship.strength}% strength
                          </Badge>
                        )}
                        {rec.suggestedRelationship.currentStrength && (
                          <Badge variant="outline" className="text-xs">
                            current: {rec.suggestedRelationship.currentStrength}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Reasoning & Evidence */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground mb-2">REASONING</h5>
                      <ul className="text-xs space-y-1">
                        {rec.reasoning.map((reason, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground mb-2">EVIDENCE</h5>
                      <ul className="text-xs space-y-1">
                        {rec.evidence.map((evidence, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Star className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                            {evidence}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">{rec.impact.strategicValue}%</div>
                      <div className="text-xs text-muted-foreground">Strategic Value</div>
                      <Progress value={rec.impact.strategicValue} className="h-1 mt-1" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{rec.impact.completeness}%</div>
                      <div className="text-xs text-muted-foreground">Completeness</div>
                      <Progress value={rec.impact.completeness} className="h-1 mt-1" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{rec.impact.consistency}%</div>
                      <div className="text-xs text-muted-foreground">Consistency</div>
                      <Progress value={rec.impact.consistency} className="h-1 mt-1" />
                    </div>
                  </div>

                  <Separator />

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Recommendation ID: {rec.id}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleReject(rec.id)}
                        className="text-xs"
                      >
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleAccept(rec.id)}
                        className="text-xs"
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Accept & Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {pendingRecs.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">All recommendations reviewed!</h3>
                <p className="text-muted-foreground">
                  Great job! You&apos;ve reviewed all AI-generated relationship recommendations.
                  New suggestions will appear as your architecture evolves.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}