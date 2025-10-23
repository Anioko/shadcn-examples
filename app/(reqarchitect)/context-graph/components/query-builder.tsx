"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Play, 
  Save, 
  History, 
  Code, 
  FileText,
  Download,
  Copy,
  Database,
  Server,
  Users,
  GitBranch,
  Shield,
  Zap
} from "lucide-react";

const sampleQueries = [
  {
    id: 1,
    name: "Applications without owners",
    description: "Find all applications that don't have assigned owners",
    query: `MATCH (app:Application)
WHERE app.owner IS NULL OR app.owner = ""
RETURN app.name, app.type, app.status`,
    category: "governance"
  },
  {
    id: 2,
    name: "Critical dependencies",
    description: "Find applications that depend on legacy systems",
    query: `MATCH (app:Application)-[r:DEPENDS_ON]->(legacy:Application)
WHERE legacy.status = "Legacy" OR legacy.lifecycle = "Deprecated"
RETURN app.name, legacy.name, r.strength`,
    category: "risk"
  },
  {
    id: 3,
    name: "Capability support analysis",
    description: "Show which applications support each business capability",
    query: `MATCH (cap:Capability)<-[r:SUPPORTS]-(app:Application)
RETURN cap.name, collect(app.name) as supporting_apps, count(app) as app_count
ORDER BY app_count DESC`,
    category: "analysis"
  },
  {
    id: 4,
    name: "Technology stack usage",
    description: "Find all applications using specific technology",
    query: `MATCH (app:Application)-[r:USES]->(tech:Technology)
WHERE tech.name CONTAINS "PostgreSQL"
RETURN app.name, app.owner, tech.version`,
    category: "technology"
  },
  {
    id: 5,
    name: "Team ownership patterns",
    description: "Analyze which teams own the most applications",
    query: `MATCH (team:Team)-[r:OWNS]->(app:Application)
RETURN team.name, count(app) as owned_apps, collect(app.name) as applications
ORDER BY owned_apps DESC`,
    category: "governance"
  }
];

const queryCategories = [
  { value: "all", label: "All Categories" },
  { value: "governance", label: "Governance" },
  { value: "risk", label: "Risk Analysis" },
  { value: "analysis", label: "Architecture Analysis" },
  { value: "technology", label: "Technology" },
  { value: "compliance", label: "Compliance" }
];

const entityTypes = [
  { value: "Application", label: "Applications", icon: Server },
  { value: "Capability", label: "Capabilities", icon: GitBranch },
  { value: "Technology", label: "Technology", icon: Database },
  { value: "Team", label: "Teams", icon: Users },
  { value: "Initiative", label: "Initiatives", icon: Zap },
  { value: "Security", label: "Security Controls", icon: Shield },
];

const relationshipTypes = [
  { value: "DEPENDS_ON", label: "Depends On" },
  { value: "SUPPORTS", label: "Supports" },
  { value: "USES", label: "Uses" },
  { value: "OWNS", label: "Owns" },
  { value: "IMPLEMENTS", label: "Implements" },
  { value: "SERVES", label: "Serves" },
  { value: "MANAGES", label: "Manages" },
];

const sampleResults = [
  {
    name: "Customer Portal",
    type: "Application",
    status: "Production",
    owner: "Engineering Team",
    dependencies: 8
  },
  {
    name: "Order Management API",
    type: "Application", 
    status: "Production",
    owner: "Backend Team",
    dependencies: 12
  },
  {
    name: "Legacy Billing System",
    type: "Application",
    status: "Legacy",
    owner: null,
    dependencies: 3
  },
  {
    name: "Analytics Platform",
    type: "Application",
    status: "Production", 
    owner: "Data Team",
    dependencies: 15
  }
];

export function QueryBuilder() {
  const [queryMode, setQueryMode] = useState<"visual" | "cypher">("visual");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cypherQuery, setCypherQuery] = useState("");
  const [queryResults, setQueryResults] = useState<typeof sampleResults | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [savedQueries, setSavedQueries] = useState(sampleQueries);

  // Visual query builder state
  const [visualQuery, setVisualQuery] = useState({
    sourceEntity: "",
    relationship: "",
    targetEntity: "",
    filters: [],
    returnFields: []
  });

  const executeQuery = async () => {
    setIsExecuting(true);
    
    // Simulate query execution
    setTimeout(() => {
      setQueryResults(sampleResults);
      setIsExecuting(false);
    }, 1500);
  };

  const saveQuery = () => {
    if (!cypherQuery.trim()) return;
    
    const newQuery = {
      id: savedQueries.length + 1,
      name: `Custom Query ${savedQueries.length + 1}`,
      description: "User-defined query",
      query: cypherQuery,
      category: "custom"
    };
    
    setSavedQueries([...savedQueries, newQuery]);
  };

  const loadQuery = (query: string) => {
    setCypherQuery(query);
    setQueryMode("cypher");
  };

  const filteredQueries = selectedCategory === "all" 
    ? savedQueries 
    : savedQueries.filter(q => q.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Query Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Graph Query Builder
          </CardTitle>
          <CardDescription>
            Build and execute queries against your architecture graph using visual tools or Cypher syntax
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={queryMode} onValueChange={(value) => setQueryMode(value as "visual" | "cypher")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="visual">Visual Builder</TabsTrigger>
              <TabsTrigger value="cypher">Cypher Query</TabsTrigger>
            </TabsList>

            <TabsContent value="visual" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Source Entity</Label>
                  <Select value={visualQuery.sourceEntity} onValueChange={(value) => 
                    setVisualQuery(prev => ({ ...prev, sourceEntity: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {entityTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Select value={visualQuery.relationship} onValueChange={(value) => 
                    setVisualQuery(prev => ({ ...prev, relationship: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship..." />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipTypes.map(rel => (
                        <SelectItem key={rel.value} value={rel.value}>
                          {rel.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Target Entity</Label>
                  <Select value={visualQuery.targetEntity} onValueChange={(value) => 
                    setVisualQuery(prev => ({ ...prev, targetEntity: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {entityTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Filters (optional)</Label>
                <Input 
                  placeholder="e.g., status = 'Production', owner IS NOT NULL"
                  className="font-mono text-sm"
                />
              </div>

              <Button 
                onClick={() => {
                  // Convert visual query to Cypher
                  if (visualQuery.sourceEntity && visualQuery.relationship && visualQuery.targetEntity) {
                    const generatedQuery = `MATCH (source:${visualQuery.sourceEntity})-[r:${visualQuery.relationship}]->(target:${visualQuery.targetEntity})
RETURN source.name, target.name, r.strength`;
                    setCypherQuery(generatedQuery);
                    setQueryMode("cypher");
                  }
                }}
                disabled={!visualQuery.sourceEntity || !visualQuery.relationship || !visualQuery.targetEntity}
              >
                <Code className="h-4 w-4 mr-2" />
                Generate Cypher Query
              </Button>
            </TabsContent>

            <TabsContent value="cypher" className="space-y-4">
              <div className="space-y-2">
                <Label>Cypher Query</Label>
                <Textarea
                  value={cypherQuery}
                  onChange={(e) => setCypherQuery(e.target.value)}
                  placeholder="Enter your Cypher query here..."
                  className="font-mono text-sm min-h-32"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={executeQuery} disabled={!cypherQuery.trim() || isExecuting}>
                  <Play className="h-4 w-4 mr-2" />
                  {isExecuting ? "Executing..." : "Execute Query"}
                </Button>
                <Button variant="outline" onClick={saveQuery} disabled={!cypherQuery.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Query
                </Button>
                <Button variant="outline" onClick={() => setCypherQuery("")}>
                  Clear
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Query Results */}
      {queryResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Query Results
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              {queryResults.length} results found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Owner</th>
                    <th className="text-left p-3 font-medium">Dependencies</th>
                  </tr>
                </thead>
                <tbody>
                  {queryResults.map((result, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3 font-medium">{result.name}</td>
                      <td className="p-3">
                        <Badge variant="outline">{result.type}</Badge>
                      </td>
                      <td className="p-3">
                        <Badge 
                          variant={result.status === "Production" ? "default" : 
                                  result.status === "Legacy" ? "destructive" : "secondary"}
                        >
                          {result.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        {result.owner ? (
                          <span>{result.owner}</span>
                        ) : (
                          <span className="text-muted-foreground italic">No owner</span>
                        )}
                      </td>
                      <td className="p-3">{result.dependencies}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Queries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Query Library
          </CardTitle>
          <CardDescription>
            Pre-built queries and your saved queries for common analysis patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Label>Category:</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {queryCategories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Queries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQueries.map((query) => (
                <Card key={query.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{query.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {query.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {query.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="bg-muted rounded p-3">
                        <code className="text-xs text-muted-foreground">
                          {query.query.length > 100 
                            ? query.query.substring(0, 100) + "..." 
                            : query.query}
                        </code>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => loadQuery(query.query)}
                          className="text-xs"
                        >
                          <Code className="h-3 w-3 mr-1" />
                          Load
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setCypherQuery(query.query);
                            executeQuery();
                          }}
                          className="text-xs"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Run
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}