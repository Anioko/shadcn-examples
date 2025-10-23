"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight,
  Brain,
  CheckCircle,
  AlertTriangle,
  Wand2,
  MapPin,
  Layers,
  Settings,
  Zap,
  Target,
  FileCode,
  Link
} from "lucide-react";

const mappingExamples = {
  servicenow: {
    name: "ServiceNow CMDB",
    accuracy: 98.2,
    mappings: [
      {
        source: "name",
        target: "name",
        type: "string",
        confidence: 99,
        transform: "none",
        required: true,
        status: "mapped"
      },
      {
        source: "short_description",
        target: "description",
        type: "text",
        confidence: 97,
        transform: "truncate(500)",
        required: false,
        status: "mapped"
      },
      {
        source: "owned_by.email",
        target: "ownerEmail",
        type: "string",
        confidence: 95,
        transform: "extractEmail",
        required: false,
        status: "mapped"
      },
      {
        source: "operational_status",
        target: "status",
        type: "choice",
        confidence: 92,
        transform: "mapOperationalStatus",
        required: true,
        status: "mapped"
      },
      {
        source: "u_criticality",
        target: "criticality",
        type: "choice",
        confidence: 88,
        transform: "mapCriticality",
        required: false,
        status: "suggested"
      },
      {
        source: "install_date",
        target: "createdAt",
        type: "datetime",
        confidence: 85,
        transform: "parseDate",
        required: false,
        status: "suggested"
      }
    ]
  },
  jira: {
    name: "Jira Projects",
    accuracy: 96.5,
    mappings: [
      {
        source: "key",
        target: "externalId",
        type: "string",
        confidence: 99,
        transform: "none",
        required: true,
        status: "mapped"
      },
      {
        source: "name",
        target: "name",
        type: "string",
        confidence: 98,
        transform: "none",
        required: true,
        status: "mapped"
      },
      {
        source: "description",
        target: "description",
        type: "text",
        confidence: 95,
        transform: "stripHtml",
        required: false,
        status: "mapped"
      },
      {
        source: "lead.emailAddress",
        target: "ownerEmail",
        type: "string",
        confidence: 92,
        transform: "extractEmail",
        required: false,
        status: "mapped"
      },
      {
        source: "projectCategory.name",
        target: "category",
        type: "string",
        confidence: 87,
        transform: "toLowerCase",
        required: false,
        status: "suggested"
      }
    ]
  },
  azuread: {
    name: "Azure Active Directory",
    accuracy: 97.8,
    mappings: [
      {
        source: "userPrincipalName",
        target: "email",
        type: "string",
        confidence: 99,
        transform: "none",
        required: true,
        status: "mapped"
      },
      {
        source: "displayName",
        target: "name",
        type: "string",
        confidence: 98,
        transform: "none",
        required: true,
        status: "mapped"
      },
      {
        source: "givenName",
        target: "firstName",
        type: "string",
        confidence: 95,
        transform: "none",
        required: false,
        status: "mapped"
      },
      {
        source: "surname",
        target: "lastName",
        type: "string",
        confidence: 95,
        transform: "none",
        required: false,
        status: "mapped"
      },
      {
        source: "jobTitle",
        target: "title",
        type: "string",
        confidence: 90,
        transform: "none",
        required: false,
        status: "mapped"
      },
      {
        source: "department",
        target: "department",
        type: "string",
        confidence: 88,
        transform: "none",
        required: false,
        status: "suggested"
      }
    ]
  }
};

const transformationLibrary = [
  {
    name: "extractEmail",
    description: "Extract email from reference field or object",
    example: `// Input: { value: "john@company.com", display_value: "John Doe" }
// Output: "john@company.com"`,
    usage: 247
  },
  {
    name: "mapOperationalStatus",
    description: "Map ServiceNow operational status to ReqArchitect status",
    example: `// Input: "1" (Operational)
// Output: "PRODUCTION"`,
    usage: 189
  },
  {
    name: "stripHtml",
    description: "Remove HTML tags from rich text content",
    example: `// Input: "<p>This is <strong>bold</strong> text</p>"
// Output: "This is bold text"`,
    usage: 156
  },
  {
    name: "parseDate",
    description: "Parse various date formats to ISO 8601",
    example: `// Input: "2024-01-15 14:30:00"
// Output: "2024-01-15T14:30:00.000Z"`,
    usage: 134
  },
  {
    name: "mapCriticality",
    description: "Map numeric criticality to descriptive levels",
    example: `// Input: "1"
// Output: "CRITICAL"`,
    usage: 98
  }
];

const aiInsights = [
  {
    type: "Pattern Recognition",
    description: "Detected common naming pattern: 'u_' prefix indicates custom fields",
    confidence: 94,
    suggestion: "Auto-map custom fields with semantic similarity > 85%"
  },
  {
    type: "Data Quality",
    description: "Source field 'install_date' has 23% null values",
    confidence: 87,
    suggestion: "Consider optional mapping with fallback to 'created' field"
  },
  {
    type: "Relationship Discovery",
    description: "Found potential relationship: 'owned_by' → User entity",
    confidence: 91,
    suggestion: "Create automatic relationship mapping to User entities"
  },
  {
    type: "Schema Drift",
    description: "New field 'u_compliance_status' detected in source",
    confidence: 96,
    suggestion: "Map to new 'complianceStatus' field in ReqArchitect schema"
  }
];

export function FieldMapping() {
  const [selectedConnector, setSelectedConnector] = useState<keyof typeof mappingExamples>("servicenow");
  const [selectedMapping, setSelectedMapping] = useState(mappingExamples.servicenow.mappings[0]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "mapped":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "suggested":
        return <Brain className="h-4 w-4 text-blue-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "mapped":
        return <Badge className="bg-green-100 text-green-800">Mapped</Badge>;
      case "suggested":
        return <Badge className="bg-blue-100 text-blue-800">AI Suggested</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>;
      default:
        return null;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-600";
    if (confidence >= 85) return "text-blue-600";
    if (confidence >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const currentMapping = mappingExamples[selectedConnector];

  return (
    <div className="space-y-6">
      {/* Connector Selection and Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {Object.entries(mappingExamples).map(([key, mapping]) => (
          <Card 
            key={key} 
            className={`cursor-pointer transition-all ${
              selectedConnector === key ? "border-primary ring-2 ring-primary/20" : "hover:border-muted-foreground/40"
            }`}
            onClick={() => setSelectedConnector(key as keyof typeof mappingExamples)}
          >
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{mapping.name}</h4>
                <Badge className="bg-green-100 text-green-800">{mapping.accuracy}%</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mapping Accuracy</span>
                  <span className="font-medium">{mapping.accuracy}%</span>
                </div>
                <Progress value={mapping.accuracy} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {mapping.mappings.filter(m => m.status === "mapped").length} mapped, {" "}
                  {mapping.mappings.filter(m => m.status === "suggested").length} suggested
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Field Mapping Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Field Mappings - {currentMapping.name}
            </CardTitle>
            <CardDescription>
              AI-powered field mapping with {currentMapping.accuracy}% accuracy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentMapping.mappings.map((mapping, index) => (
              <div 
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedMapping === mapping ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedMapping(mapping)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(mapping.status)}
                    {getStatusBadge(mapping.status)}
                  </div>
                  <div className={`text-sm font-medium ${getConfidenceColor(mapping.confidence)}`}>
                    {mapping.confidence}%
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1">
                    <div className="font-mono text-sm">{mapping.source}</div>
                    <div className="text-xs text-muted-foreground">{mapping.type}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-mono text-sm">{mapping.target}</div>
                    <div className="text-xs text-muted-foreground">
                      {mapping.required ? "Required" : "Optional"}
                    </div>
                  </div>
                </div>

                {mapping.transform !== "none" && (
                  <div className="flex items-center gap-2 mt-2">
                    <Wand2 className="h-3 w-3 text-purple-600" />
                    <span className="text-xs text-purple-600 font-mono">{mapping.transform}</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Mapping Details
            </CardTitle>
            <CardDescription>
              Configuration for selected field mapping
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Source Field</h4>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-mono text-sm">{selectedMapping.source}</div>
                  <div className="text-xs text-muted-foreground mt-1">Type: {selectedMapping.type}</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Target Field</h4>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-mono text-sm">{selectedMapping.target}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {selectedMapping.required ? "Required" : "Optional"}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">AI Confidence</h4>
              <div className="flex items-center gap-3">
                <Progress value={selectedMapping.confidence} className="flex-1" />
                <span className={`font-medium ${getConfidenceColor(selectedMapping.confidence)}`}>
                  {selectedMapping.confidence}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on semantic similarity, naming patterns, and data type analysis
              </p>
            </div>

            {selectedMapping.transform !== "none" && (
              <div>
                <h4 className="font-medium mb-2">Transformation</h4>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wand2 className="h-4 w-4 text-purple-600" />
                    <span className="font-mono text-sm">{selectedMapping.transform}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {transformationLibrary.find(t => t.name === selectedMapping.transform)?.description}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Accept Mapping
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="h-3 w-3" />
                Customize
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights and Transformation Library */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Mapping Insights
            </CardTitle>
            <CardDescription>
              Machine learning insights for improved mapping accuracy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{insight.type}</Badge>
                  <span className={`text-sm font-medium ${getConfidenceColor(insight.confidence)}`}>
                    {insight.confidence}%
                  </span>
                </div>
                <p className="text-sm mb-2">{insight.description}</p>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-600">{insight.suggestion}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5" />
              Transformation Library
            </CardTitle>
            <CardDescription>
              Reusable transformation functions with usage statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {transformationLibrary.map((transform, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-mono text-sm font-medium">{transform.name}</h4>
                  <Badge variant="outline">{transform.usage} uses</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{transform.description}</p>
                <details className="group">
                  <summary className="cursor-pointer text-sm text-blue-600 hover:underline">
                    View Example
                  </summary>
                  <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-x-auto">
                    <code>{transform.example}</code>
                  </pre>
                </details>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-8 w-8 text-purple-600" />
              <div>
                <h4 className="font-medium">AI-Powered Mapping</h4>
                <p className="text-sm text-muted-foreground">95%+ accuracy</p>
              </div>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Semantic field name analysis</li>
              <li>• Data type compatibility checking</li>
              <li>• Pattern recognition across connectors</li>
              <li>• Confidence scoring for all mappings</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-yellow-600" />
              <div>
                <h4 className="font-medium">Smart Transformations</h4>
                <p className="text-sm text-muted-foreground">Automated data conversion</p>
              </div>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Pre-built transformation library</li>
              <li>• Custom transformation functions</li>
              <li>• Data validation and cleaning</li>
              <li>• Type conversion and formatting</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Link className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-medium">Relationship Discovery</h4>
                <p className="text-sm text-muted-foreground">Automatic link detection</p>
              </div>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Reference field analysis</li>
              <li>• Cross-entity relationship mapping</li>
              <li>• Foreign key detection</li>
              <li>• Bidirectional relationship support</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}