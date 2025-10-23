"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Filter, 
  Search, 
  Info,
  Server,
  Database,
  Users,
  Zap,
  Shield,
  GitBranch
} from "lucide-react";

// Sample graph data
const sampleNodes = [
  // Capabilities
  { id: "cap-1", name: "Customer Service", type: "capability", x: 100, y: 100, connections: 8 },
  { id: "cap-2", name: "Order Management", type: "capability", x: 200, y: 150, connections: 12 },
  { id: "cap-3", name: "Payment Processing", type: "capability", x: 300, y: 120, connections: 6 },
  { id: "cap-4", name: "Inventory Management", type: "capability", x: 150, y: 250, connections: 9 },
  
  // Applications
  { id: "app-1", name: "Customer Portal", type: "application", x: 120, y: 200, connections: 15 },
  { id: "app-2", name: "Order API", type: "application", x: 250, y: 220, connections: 18 },
  { id: "app-3", name: "Payment Gateway", type: "application", x: 320, y: 180, connections: 10 },
  { id: "app-4", name: "Warehouse System", type: "application", x: 180, y: 300, connections: 7 },
  { id: "app-5", name: "Analytics Platform", type: "application", x: 400, y: 250, connections: 11 },
  
  // Technology
  { id: "tech-1", name: "PostgreSQL", type: "technology", x: 200, y: 350, connections: 22 },
  { id: "tech-2", name: "Redis Cache", type: "technology", x: 300, y: 320, connections: 8 },
  { id: "tech-3", name: "AWS Load Balancer", type: "technology", x: 150, y: 380, connections: 12 },
  { id: "tech-4", name: "Kubernetes", type: "technology", x: 350, y: 380, connections: 16 },
  
  // Teams
  { id: "team-1", name: "Engineering Team", type: "team", x: 450, y: 150, connections: 25 },
  { id: "team-2", name: "Product Team", type: "team", x: 500, y: 200, connections: 18 },
  { id: "team-3", name: "DevOps Team", type: "team", x: 450, y: 350, connections: 14 },
];

const sampleLinks = [
  { source: "cap-1", target: "app-1", type: "supports", strength: 85 },
  { source: "cap-2", target: "app-2", type: "supports", strength: 92 },
  { source: "cap-3", target: "app-3", type: "supports", strength: 88 },
  { source: "cap-4", target: "app-4", type: "supports", strength: 90 },
  { source: "app-1", target: "tech-1", type: "uses", strength: 78 },
  { source: "app-2", target: "tech-1", type: "uses", strength: 82 },
  { source: "app-2", target: "tech-2", type: "uses", strength: 75 },
  { source: "app-3", target: "tech-4", type: "runs_on", strength: 95 },
  { source: "app-4", target: "tech-1", type: "uses", strength: 80 },
  { source: "app-5", target: "tech-1", type: "uses", strength: 85 },
  { source: "team-1", target: "app-1", type: "owns", strength: 100 },
  { source: "team-1", target: "app-2", type: "owns", strength: 100 },
  { source: "team-2", target: "cap-1", type: "manages", strength: 90 },
  { source: "team-2", target: "cap-2", type: "manages", strength: 95 },
  { source: "team-3", target: "tech-3", type: "manages", strength: 100 },
  { source: "team-3", target: "tech-4", type: "manages", strength: 100 },
];

const nodeTypeConfig = {
  capability: { color: "#3b82f6", icon: GitBranch, label: "Capability" },
  application: { color: "#10b981", icon: Server, label: "Application" },
  technology: { color: "#8b5cf6", icon: Database, label: "Technology" },
  team: { color: "#f59e0b", icon: Users, label: "Team" },
  initiative: { color: "#ef4444", icon: Zap, label: "Initiative" },
  security: { color: "#06b6d4", icon: Shield, label: "Security" },
};

export function GraphVisualization() {
  const [selectedNode, setSelectedNode] = useState<typeof sampleNodes[0] | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showLegend, setShowLegend] = useState(true);

  const handleNodeClick = useCallback((node: typeof sampleNodes[0]) => {
    setSelectedNode(node);
  }, []);

  const filteredNodes = sampleNodes.filter(node => {
    const matchesFilter = filterType === "all" || node.type === filterType;
    const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredLinks = sampleLinks.filter(link => {
    const sourceNode = filteredNodes.find(n => n.id === link.source);
    const targetNode = filteredNodes.find(n => n.id === link.target);
    return sourceNode && targetNode;
  });

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <Input 
              placeholder="Search entities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="capability">Capabilities</SelectItem>
                <SelectItem value="application">Applications</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="team">Teams</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Maximize className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowLegend(!showLegend)}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Graph Canvas */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full h-[600px] bg-background border rounded overflow-hidden">
                {/* SVG Graph */}
                <svg width="100%" height="100%" className="absolute inset-0">
                  {/* Links */}
                  <g>
                    {filteredLinks.map((link, index) => {
                      const sourceNode = filteredNodes.find(n => n.id === link.source);
                      const targetNode = filteredNodes.find(n => n.id === link.target);
                      if (!sourceNode || !targetNode) return null;
                      
                      const strengthColor = link.strength > 80 ? "#10b981" : 
                                           link.strength > 60 ? "#f59e0b" : "#ef4444";
                      
                      return (
                        <line
                          key={index}
                          x1={sourceNode.x}
                          y1={sourceNode.y}
                          x2={targetNode.x}
                          y2={targetNode.y}
                          stroke={strengthColor}
                          strokeWidth={Math.max(1, link.strength / 30)}
                          strokeOpacity={0.6}
                          markerEnd="url(#arrowhead)"
                        />
                      );
                    })}
                  </g>
                  
                  {/* Arrow markers */}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#666"
                        opacity="0.6"
                      />
                    </marker>
                  </defs>
                  
                  {/* Nodes */}
                  <g>
                    {filteredNodes.map((node) => {
                      const config = nodeTypeConfig[node.type as keyof typeof nodeTypeConfig];
                      const isSelected = selectedNode?.id === node.id;
                      
                      return (
                        <g key={node.id}>
                          {/* Node circle */}
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={Math.max(8, Math.min(20, node.connections + 5))}
                            fill={config.color}
                            stroke={isSelected ? "#000" : "#fff"}
                            strokeWidth={isSelected ? 3 : 2}
                            className="cursor-pointer hover:stroke-gray-600 transition-colors"
                            onClick={() => handleNodeClick(node)}
                          />
                          
                          {/* Node label */}
                          <text
                            x={node.x}
                            y={node.y + Math.max(8, Math.min(20, node.connections + 5)) + 15}
                            textAnchor="middle"
                            className="text-xs fill-current pointer-events-none"
                            style={{ fontSize: '10px' }}
                          >
                            {node.name.length > 15 ? node.name.substring(0, 15) + '...' : node.name}
                          </text>
                          
                          {/* Connection count badge */}
                          <circle
                            cx={node.x + 12}
                            cy={node.y - 12}
                            r="8"
                            fill="#ffffff"
                            stroke={config.color}
                            strokeWidth="2"
                            className="pointer-events-none"
                          />
                          <text
                            x={node.x + 12}
                            y={node.y - 8}
                            textAnchor="middle"
                            className="text-xs fill-current pointer-events-none"
                            style={{ fontSize: '8px' }}
                          >
                            {node.connections}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                </svg>
                
                {/* Overlay info */}
                <div className="absolute top-4 left-4 text-sm text-muted-foreground bg-background/80 p-2 rounded">
                  {filteredNodes.length} nodes, {filteredLinks.length} relationships
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Legend */}
          {showLegend && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Entity Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(nodeTypeConfig).map(([type, config]) => {
                  const Icon = config.icon;
                  const count = filteredNodes.filter(n => n.type === type).length;
                  return (
                    <div key={type} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: config.color }}
                      />
                      <Icon className="h-4 w-4" style={{ color: config.color }} />
                      <span className="text-sm">{config.label}</span>
                      <Badge variant="secondary" className="ml-auto">{count}</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Selected Node Details */}
          {selectedNode && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: nodeTypeConfig[selectedNode.type as keyof typeof nodeTypeConfig].color }}
                  />
                  {selectedNode.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Type</Label>
                  <p className="text-sm font-medium capitalize">{selectedNode.type}</p>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">Connections</Label>
                  <p className="text-sm font-medium">{selectedNode.connections} relationships</p>
                </div>

                <Separator />

                <div>
                  <Label className="text-xs text-muted-foreground">Connected To</Label>
                  <div className="space-y-1 mt-1">
                    {filteredLinks
                      .filter(link => link.source === selectedNode.id || link.target === selectedNode.id)
                      .slice(0, 5)
                      .map((link, index) => {
                        const connectedNodeId = link.source === selectedNode.id ? link.target : link.source;
                        const connectedNode = filteredNodes.find(n => n.id === connectedNodeId);
                        if (!connectedNode) return null;
                        
                        return (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <span>{connectedNode.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {link.type}
                            </Badge>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSelectedNode(null)}
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}