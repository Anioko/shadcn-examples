"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search,
  Settings,
  Shield,
  GitBranch,
  Users,
  Target,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Clock,
  Building2,
  FileCheck,
  Zap,
  Network
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FrameworksClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeFramework, setActiveFramework] = useState<string | null>(null)

  const frameworkCategories = [
    { id: "all", label: "All Frameworks", icon: Settings },
    { id: "agile", label: "Agile & Project Management", icon: GitBranch },
    { id: "security", label: "Security & Compliance", icon: Shield },
    { id: "architecture", label: "Enterprise Architecture", icon: Building2 },
    { id: "quality", label: "Quality & Process", icon: CheckCircle },
    { id: "risk", label: "Risk Management", icon: AlertTriangle },
    { id: "strategy", label: "Strategy & Planning", icon: Target }
  ]

  const frameworks = [
    // Agile & Project Management
    {
      id: "safe",
      name: "SAFe (Scaled Agile Framework)",
      version: "6.0",
      category: "agile",
      maturity: "Production Ready",
      complexity: "High",
      description: "Comprehensive framework for scaling agile across large enterprises",
      configurations: ["Essential SAFe", "Large Solution SAFe", "Portfolio SAFe", "Full SAFe"],
      status: "available"
    },
    {
      id: "less",
      name: "LeSS (Large-Scale Scrum)",
      version: "2023",
      category: "agile", 
      maturity: "Production Ready",
      complexity: "Medium",
      description: "Framework for scaling Scrum to multiple teams",
      configurations: ["LeSS", "LeSS Huge"],
      status: "available"
    },
    {
      id: "nexus",
      name: "Nexus",
      version: "2023",
      category: "agile",
      maturity: "Production Ready", 
      complexity: "Medium",
      description: "Framework for scaling Scrum using a single Product Backlog",
      configurations: ["3-9 Teams", "10+ Teams"],
      status: "available"
    },
    {
      id: "scrum-at-scale",
      name: "Scrum@Scale",
      version: "2023",
      category: "agile",
      maturity: "Production Ready",
      complexity: "Medium", 
      description: "Scale-free framework based on Scrum principles",
      configurations: ["Team Level", "Coordination Level", "Executive Level"],
      status: "available"
    },
    {
      id: "spotify-model",
      name: "Spotify Model",
      version: "2023",
      category: "agile",
      maturity: "Reference",
      complexity: "Medium",
      description: "Organizational model focused on autonomy and alignment",
      configurations: ["Squads", "Tribes", "Chapters", "Guilds"],
      status: "available"
    },
    
    // Security & Compliance
    {
      id: "nist-csf",
      name: "NIST Cybersecurity Framework",
      version: "2.0",
      category: "security",
      maturity: "Production Ready",
      complexity: "Medium",
      description: "Risk-based approach to cybersecurity with five core functions",
      configurations: ["Identify", "Protect", "Detect", "Respond", "Recover"],
      status: "available"
    },
    {
      id: "nist-800-53",
      name: "NIST 800-53",
      version: "Rev 5",
      category: "security",
      maturity: "Production Ready", 
      complexity: "High",
      description: "Security and privacy controls for federal information systems",
      configurations: ["Low Impact", "Moderate Impact", "High Impact"],
      status: "available"
    },
    {
      id: "nist-800-171",
      name: "NIST 800-171",
      version: "Rev 2",
      category: "security",
      maturity: "Production Ready",
      complexity: "Medium",
      description: "Protecting Controlled Unclassified Information (CUI)",
      configurations: ["Basic Safeguards", "Enhanced Safeguards"],
      status: "available"
    },
    {
      id: "iso-27001",
      name: "ISO 27001",
      version: "2022",
      category: "security",
      maturity: "Production Ready",
      complexity: "High",
      description: "International standard for information security management",
      configurations: ["Annex A Controls", "Core Requirements"],
      status: "available"
    },
    {
      id: "soc2",
      name: "SOC 2",
      version: "2023",
      category: "security",
      maturity: "Production Ready",
      complexity: "Medium",
      description: "Auditing procedure for service organizations' controls",
      configurations: ["Type I", "Type II"],
      status: "available"
    },
    {
      id: "cobit",
      name: "COBIT 2019",
      version: "2019",
      category: "security",
      maturity: "Production Ready",
      complexity: "High",
      description: "Framework for IT governance and management",
      configurations: ["Governance", "Management"],
      status: "available"
    },
    
    // Enterprise Architecture
    {
      id: "togaf",
      name: "TOGAF",
      version: "9.2",
      category: "architecture",
      maturity: "Production Ready",
      complexity: "High",
      description: "The Open Group Architecture Framework",
      configurations: ["ADM Phases", "Architecture Views", "Content Framework"],
      status: "available"
    },
    {
      id: "dodaf",
      name: "DoDAF",
      version: "2.02",
      category: "architecture",
      maturity: "Production Ready",
      complexity: "High",
      description: "Department of Defense Architecture Framework",
      configurations: ["Operational", "Systems", "Technical", "Standards"],
      status: "available"
    },
    {
      id: "zachman",
      name: "Zachman Framework",
      version: "2023",
      category: "architecture",
      maturity: "Reference",
      complexity: "High",
      description: "Enterprise architecture framework based on 6x6 matrix",
      configurations: ["What", "How", "Where", "Who", "When", "Why"],
      status: "available"
    },
    {
      id: "archimate",
      name: "ArchiMate",
      version: "3.2",
      category: "architecture",
      maturity: "Production Ready",
      complexity: "Medium",
      description: "Enterprise architecture modeling language",
      configurations: ["Business Layer", "Application Layer", "Technology Layer"],
      status: "available"
    },
    
    // Quality & Process
    {
      id: "cmmi",
      name: "CMMI",
      version: "3.0",
      category: "quality",
      maturity: "Production Ready",
      complexity: "High",
      description: "Capability Maturity Model Integration",
      configurations: ["Development", "Services", "Acquisition"],
      status: "available"
    },
    {
      id: "itil",
      name: "ITIL 4",
      version: "4.0",
      category: "quality",
      maturity: "Production Ready",
      complexity: "Medium",
      description: "IT Infrastructure Library for IT service management",
      configurations: ["Service Value System", "Practices", "Guiding Principles"],
      status: "available"
    },
    {
      id: "six-sigma",
      name: "Six Sigma",
      version: "2023",
      category: "quality",
      maturity: "Production Ready",
      complexity: "Medium",
      description: "Data-driven methodology for process improvement",
      configurations: ["DMAIC", "DMADV", "Lean Six Sigma"],
      status: "available"
    },
    {
      id: "pmbok",
      name: "PMBOK Guide",
      version: "7th Edition",
      category: "quality",
      maturity: "Production Ready",
      complexity: "Medium",
      description: "Project Management Body of Knowledge",
      configurations: ["Performance Domains", "Project Lifecycle"],
      status: "available"
    },
    
    // Risk Management
    {
      id: "iso-31000",
      name: "ISO 31000",
      version: "2018",
      category: "risk",
      maturity: "Production Ready",
      complexity: "Medium",
      description: "Risk management principles and guidelines",
      configurations: ["Principles", "Framework", "Process"],
      status: "available"
    },
    {
      id: "coso-erm",
      name: "COSO ERM",
      version: "2017",
      category: "risk",
      maturity: "Production Ready",
      complexity: "Medium",
      description: "Enterprise Risk Management framework",
      configurations: ["Components", "Principles"],
      status: "available"
    },
    {
      id: "fair",
      name: "FAIR",
      version: "2023",
      category: "risk",
      maturity: "Production Ready",
      complexity: "High",
      description: "Factor Analysis of Information Risk",
      configurations: ["Basic FAIR", "Advanced FAIR"],
      status: "available"
    }
  ]

  const filteredFrameworks = frameworks.filter(framework => {
    const matchesSearch = framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         framework.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || framework.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const implementedCount = frameworks.filter(f => f.status === "available").length
  const totalCount = frameworks.length

  return (
    <div className="space-y-6">
      {/* Framework Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Frameworks</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground">Across 6 categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implemented</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{implementedCount}</div>
            <p className="text-xs text-muted-foreground">Ready for use</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Frameworks</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">7</div>
            <p className="text-xs text-muted-foreground">Currently in use</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">85%</div>
            <p className="text-xs text-muted-foreground">Across active frameworks</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search frameworks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {frameworkCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="gallery" className="space-y-4">
        <TabsList>
          <TabsTrigger value="gallery">Framework Gallery</TabsTrigger>
          <TabsTrigger value="active">Active Frameworks</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Dashboard</TabsTrigger>
          <TabsTrigger value="mapping">Framework Mapping</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFrameworks.map((framework) => (
              <Card key={framework.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{framework.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{framework.version}</Badge>
                        <Badge 
                          variant={framework.status === 'available' ? 'default' : 'secondary'}
                          className={framework.status === 'available' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {framework.status === 'available' ? 'Available' : 'Coming Soon'}
                        </Badge>
                      </div>
                    </div>
                    {frameworkCategories.find(cat => cat.id === framework.category)?.icon && (
                      <div className="p-2 bg-muted rounded">
                        {(() => {
                          const IconComponent = frameworkCategories.find(cat => cat.id === framework.category)?.icon
                          return IconComponent ? <IconComponent className="h-4 w-4" /> : null
                        })()}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{framework.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Complexity:</span>
                      <Badge variant={
                        framework.complexity === 'High' ? 'destructive' : 
                        framework.complexity === 'Medium' ? 'default' : 'secondary'
                      }>
                        {framework.complexity}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Maturity:</span>
                      <span className="font-medium">{framework.maturity}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Configurations:</span>
                      <div className="flex flex-wrap gap-1">
                        {framework.configurations.slice(0, 2).map((config, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {config}
                          </Badge>
                        ))}
                        {framework.configurations.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{framework.configurations.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      disabled={framework.status !== 'available'}
                    >
                      {framework.status === 'available' ? 'Configure' : 'Coming Soon'}
                    </Button>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Framework Implementations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {frameworks.filter(f => f.status === 'available').slice(0, 5).map((framework) => (
                  <div key={framework.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{framework.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Implementation progress: 75% • Last updated: 2 days ago
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Active</Badge>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>NIST CSF</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ISO 27001</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>SOC 2</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>SAFe</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Compliance Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">NIST CSF assessment completed</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">SOC 2 audit preparation in progress</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">ISO 27001 gap identified</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">SAFe PI planning completed</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Framework Mapping & Relationships</CardTitle>
              <p className="text-sm text-muted-foreground">
                Understand how different frameworks relate to each other and identify synergies
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Security Framework Alignment</h4>
                    <div className="space-y-3">
                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">NIST CSF ↔ ISO 27001</span>
                          <Badge variant="default">85% overlap</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Controls and subcategories align well for comprehensive security program
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">SOC 2 ↔ NIST 800-53</span>
                          <Badge variant="secondary">60% overlap</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Trust Service Criteria map to security controls
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Agile Framework Comparison</h4>
                    <div className="space-y-3">
                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">SAFe vs LeSS</span>
                          <Badge variant="outline">Different approaches</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          SAFe: More prescriptive, LeSS: Minimalistic approach
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Scrum@Scale vs Nexus</span>
                          <Badge variant="outline">Complementary</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Both focus on scaling Scrum, different implementation approaches
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Cross-Domain Mappings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 border rounded text-center">
                      <Network className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <span className="text-sm font-medium">Architecture → Security</span>
                      <p className="text-xs text-muted-foreground mt-1">TOGAF views align with NIST CSF categories</p>
                    </div>
                    
                    <div className="p-3 border rounded text-center">
                      <GitBranch className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <span className="text-sm font-medium">Agile → Quality</span>
                      <p className="text-xs text-muted-foreground mt-1">SAFe practices support CMMI processes</p>
                    </div>
                    
                    <div className="p-3 border rounded text-center">
                      <Shield className="h-6 w-6 mx-auto mb-2 text-red-600" />
                      <span className="text-sm font-medium">Risk → Compliance</span>
                      <p className="text-xs text-muted-foreground mt-1">ISO 31000 supports regulatory frameworks</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}