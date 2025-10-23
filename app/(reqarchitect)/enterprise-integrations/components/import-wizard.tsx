"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, 
  ArrowLeft,
  Check, 
  AlertCircle,
  Database,
  Settings,
  FileText,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  MapPin
} from "lucide-react";

const importSteps = [
  { id: 1, title: "Source Selection", description: "Choose your data source" },
  { id: 2, title: "Authentication", description: "Connect to your system" },
  { id: 3, title: "Entity Mapping", description: "Map data fields" },
  { id: 4, title: "Configuration", description: "Configure import settings" },
  { id: 5, title: "Preview & Import", description: "Review and execute" }
];

const connectors = [
  {
    id: "servicenow",
    name: "ServiceNow",
    logo: "🔧",
    description: "Import applications, infrastructure, and services from ServiceNow CMDB",
    entities: ["Applications", "Infrastructure", "Services", "Changes", "Incidents"],
    authType: "OAuth 2.0",
    installed: true
  },
  {
    id: "jira",
    name: "Jira",
    logo: "📋",
    description: "Import projects, epics, stories, and work items",
    entities: ["Projects", "Epics", "Stories", "Tasks", "Bugs"],
    authType: "API Token",
    installed: true
  },
  {
    id: "azure-ad",
    name: "Azure Active Directory",
    logo: "🔐",
    description: "Import users, groups, and organizational structure",
    entities: ["Users", "Groups", "Organizations", "Applications"],
    authType: "App Registration",
    installed: true
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    logo: "☁️",
    description: "Import cloud infrastructure resources",
    entities: ["EC2 Instances", "RDS Databases", "Lambda Functions", "S3 Buckets"],
    authType: "IAM Role",
    installed: false
  }
];

const fieldMappings = {
  servicenow: [
    { source: "name", target: "name", type: "string", required: true, mapped: true },
    { source: "sys_id", target: "externalId", type: "string", required: true, mapped: true },
    { source: "description", target: "description", type: "text", required: false, mapped: true },
    { source: "category", target: "category", type: "string", required: false, mapped: true },
    { source: "business_service", target: "businessService", type: "reference", required: false, mapped: false },
    { source: "operational_status", target: "status", type: "choice", required: false, mapped: true },
    { source: "owned_by", target: "owner", type: "reference", required: false, mapped: false },
    { source: "supported_by", target: "supportTeam", type: "reference", required: false, mapped: false },
  ]
};

export function ImportWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedConnector, setSelectedConnector] = useState<string>("");
  const [authConfig, setAuthConfig] = useState({
    endpoint: "",
    username: "",
    password: "",
    apiKey: ""
  });
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [importConfig, setImportConfig] = useState({
    importName: "",
    description: "",
    schedule: "manual",
    batchSize: 100,
    handleConflicts: "skip",
    enableAI: true
  });
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  const selectedConnectorData = connectors.find(c => c.id === selectedConnector);

  const nextStep = () => {
    if (currentStep < importSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEntityToggle = (entity: string) => {
    setSelectedEntities(prev => 
      prev.includes(entity) 
        ? prev.filter(e => e !== entity)
        : [...prev, entity]
    );
  };

  const startImport = () => {
    setIsImporting(true);
    setImportProgress(0);
    
    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Select Data Source</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Choose the system you want to import data from.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connectors.map((connector) => (
                <Card 
                  key={connector.id}
                  className={`cursor-pointer transition-all ${
                    selectedConnector === connector.id 
                      ? "border-primary ring-2 ring-primary/20" 
                      : "hover:border-muted-foreground/40"
                  }`}
                  onClick={() => setSelectedConnector(connector.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{connector.logo}</div>
                        <div>
                          <CardTitle className="text-base">{connector.name}</CardTitle>
                          <CardDescription className="text-sm">{connector.authType}</CardDescription>
                        </div>
                      </div>
                      {connector.installed ? (
                        <Badge className="bg-green-100 text-green-800">Installed</Badge>
                      ) : (
                        <Badge variant="outline">Not Installed</Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {connector.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {connector.entities.slice(0, 3).map((entity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {entity}
                        </Badge>
                      ))}
                      {connector.entities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{connector.entities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Authentication</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Configure connection settings for {selectedConnectorData?.name}.
              </p>
            </div>

            {selectedConnectorData && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{selectedConnectorData.logo}</div>
                    <div>
                      <CardTitle className="text-base">{selectedConnectorData.name}</CardTitle>
                      <CardDescription>Authentication: {selectedConnectorData.authType}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {selectedConnector === "servicenow" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="endpoint">ServiceNow Instance URL</Label>
                        <Input
                          id="endpoint"
                          placeholder="https://your-instance.service-now.com"
                          value={authConfig.endpoint}
                          onChange={(e) => setAuthConfig(prev => ({ ...prev, endpoint: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={authConfig.username}
                            onChange={(e) => setAuthConfig(prev => ({ ...prev, username: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={authConfig.password}
                            onChange={(e) => setAuthConfig(prev => ({ ...prev, password: e.target.value }))}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {selectedConnector === "jira" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="endpoint">Jira Base URL</Label>
                        <Input
                          id="endpoint"
                          placeholder="https://your-domain.atlassian.net"
                          value={authConfig.endpoint}
                          onChange={(e) => setAuthConfig(prev => ({ ...prev, endpoint: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apiKey">API Token</Label>
                        <Input
                          id="apiKey"
                          type="password"
                          placeholder="Your Jira API token"
                          value={authConfig.apiKey}
                          onChange={(e) => setAuthConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                        />
                      </div>
                    </>
                  )}

                  <Button className="w-full" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Entity Selection & Mapping</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Choose which entities to import and configure field mappings.
              </p>
            </div>

            {/* Entity Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Available Entities</CardTitle>
                <CardDescription>Select the entity types you want to import</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedConnectorData?.entities.map((entity) => (
                    <div key={entity} className="flex items-center space-x-2">
                      <Checkbox
                        id={entity}
                        checked={selectedEntities.includes(entity)}
                        onCheckedChange={() => handleEntityToggle(entity)}
                      />
                      <Label htmlFor={entity} className="text-sm">{entity}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Field Mapping */}
            {selectedEntities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Field Mapping</CardTitle>
                  <CardDescription>Map source fields to ReqArchitect entities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fieldMappings[selectedConnector as keyof typeof fieldMappings]?.map((field, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-sm">{field.source}</span>
                            <Badge variant="outline" className="text-xs">{field.type}</Badge>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-sm">{field.target}</span>
                            {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                          </div>
                        </div>
                        <Checkbox checked={field.mapped} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Import Configuration</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Configure how the import should be performed.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="importName">Import Name</Label>
                  <Input
                    id="importName"
                    placeholder="My ServiceNow Import"
                    value={importConfig.importName}
                    onChange={(e) => setImportConfig(prev => ({ ...prev, importName: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe this import job..."
                    value={importConfig.description}
                    onChange={(e) => setImportConfig(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Schedule</Label>
                    <Select value={importConfig.schedule} onValueChange={(value) => setImportConfig(prev => ({ ...prev, schedule: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Batch Size</Label>
                    <Select value={importConfig.batchSize.toString()} onValueChange={(value) => setImportConfig(prev => ({ ...prev, batchSize: parseInt(value) }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 records</SelectItem>
                        <SelectItem value="100">100 records</SelectItem>
                        <SelectItem value="250">250 records</SelectItem>
                        <SelectItem value="500">500 records</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Conflict Resolution</Label>
                  <Select value={importConfig.handleConflicts} onValueChange={(value) => setImportConfig(prev => ({ ...prev, handleConflicts: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skip">Skip existing records</SelectItem>
                      <SelectItem value="overwrite">Overwrite existing records</SelectItem>
                      <SelectItem value="merge">Merge with existing records</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enableAI"
                    checked={importConfig.enableAI}
                    onCheckedChange={(checked) => setImportConfig(prev => ({ ...prev, enableAI: checked as boolean }))}
                  />
                  <Label htmlFor="enableAI" className="text-sm">
                    Enable AI-powered relationship discovery
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Preview & Import</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Review your configuration and start the import process.
              </p>
            </div>

            {/* Import Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Import Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Source</p>
                    <p className="text-sm text-muted-foreground">{selectedConnectorData?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Import Name</p>
                    <p className="text-sm text-muted-foreground">{importConfig.importName || "Unnamed Import"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Entities</p>
                    <p className="text-sm text-muted-foreground">{selectedEntities.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Schedule</p>
                    <p className="text-sm text-muted-foreground capitalize">{importConfig.schedule}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Import Progress */}
            {isImporting && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Import in Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing records...</span>
                      <span>{Math.round(importProgress)}%</span>
                    </div>
                    <Progress value={importProgress} />
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Imported {Math.round(importProgress * 2.5)} of 250 records
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Pause className="h-4 w-4 mr-1" />
                      Pause
                    </Button>
                    <Button size="sm" variant="outline">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Import Complete */}
            {!isImporting && importProgress === 100 && (
              <Card className="border-green-200 bg-green-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-green-100 p-2">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Import Completed Successfully</h4>
                      <p className="text-sm text-muted-foreground">250 records imported from {selectedConnectorData?.name}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">247</p>
                      <p className="text-xs text-muted-foreground">Successful</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">3</p>
                      <p className="text-xs text-muted-foreground">Warnings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">0</p>
                      <p className="text-xs text-muted-foreground">Errors</p>
                    </div>
                  </div>

                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    View Import Report
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Start Import Button */}
            {!isImporting && importProgress < 100 && (
              <Button 
                className="w-full" 
                size="lg"
                onClick={startImport}
                disabled={!selectedConnector || selectedEntities.length === 0}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Import
              </Button>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {importSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center gap-3 ${index > 0 ? "ml-4" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep > step.id 
                  ? "bg-green-100 text-green-800" 
                  : currentStep === step.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
              }`}>
                {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <div className="hidden md:block">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {index < importSteps.length - 1 && (
              <div className={`hidden md:block w-12 h-0.5 mx-4 ${
                currentStep > step.id ? "bg-green-200" : "bg-muted"
              }`} />
            )}
          </div>
        ))}
      </div>

      <Separator />

      {/* Step Content */}
      <div className="min-h-[500px]">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button 
          onClick={nextStep}
          disabled={currentStep === importSteps.length || (currentStep === 1 && !selectedConnector)}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}