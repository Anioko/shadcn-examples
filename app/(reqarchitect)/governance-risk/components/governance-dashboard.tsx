"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  FileCheck,
  Users,
  Calendar,
  TrendingUp,
  BarChart3,
  Settings,
  Clock,
  Eye,
  Download,
  Plus,
  Filter
} from "lucide-react"

interface ComplianceFramework {
  id: string
  name: string
  description: string
  status: 'compliant' | 'partial' | 'non-compliant' | 'pending'
  progress: number
  lastAssessment: string
  nextReview: string
  controls: number
  implementedControls: number
  criticalFindings: number
  priority: 'high' | 'medium' | 'low'
  certificationDate?: string
  expiryDate?: string
}

interface RiskItem {
  id: string
  title: string
  description: string
  category: 'operational' | 'financial' | 'strategic' | 'compliance' | 'technical'
  probability: number
  impact: number
  riskScore: number
  status: 'open' | 'mitigated' | 'closed'
  owner: string
  lastReview: string
  mitigation?: string
}

export function ComplianceFrameworks() {
  const frameworks: ComplianceFramework[] = [
    {
      id: "soc2",
      name: "SOC 2 Type II",
      description: "Service Organization Control 2 Type II audit for security, availability, processing integrity",
      status: 'compliant',
      progress: 98,
      lastAssessment: "2025-09-15",
      nextReview: "2026-09-15",
      controls: 127,
      implementedControls: 125,
      criticalFindings: 0,
      priority: 'high',
      certificationDate: "2025-09-15",
      expiryDate: "2026-09-15"
    },
    {
      id: "iso27001",
      name: "ISO 27001",
      description: "International standard for information security management systems",
      status: 'partial',
      progress: 78,
      lastAssessment: "2025-08-20",
      nextReview: "2025-11-20",
      controls: 114,
      implementedControls: 89,
      criticalFindings: 3,
      priority: 'high'
    },
    {
      id: "gdpr",
      name: "GDPR",
      description: "General Data Protection Regulation compliance for EU data processing",
      status: 'compliant',
      progress: 94,
      lastAssessment: "2025-10-01",
      nextReview: "2026-04-01",
      controls: 68,
      implementedControls: 64,
      criticalFindings: 0,
      priority: 'high'
    },
    {
      id: "hipaa",
      name: "HIPAA",
      description: "Health Insurance Portability and Accountability Act compliance",
      status: 'pending',
      progress: 45,
      lastAssessment: "2025-07-15",
      nextReview: "2025-12-15",
      controls: 42,
      implementedControls: 19,
      criticalFindings: 7,
      priority: 'medium'
    },
    {
      id: "pci",
      name: "PCI DSS",
      description: "Payment Card Industry Data Security Standard",
      status: 'non-compliant',
      progress: 32,
      lastAssessment: "2025-06-10",
      nextReview: "2025-11-10",
      controls: 285,
      implementedControls: 91,
      criticalFindings: 12,
      priority: 'high'
    }
  ]

  const getStatusColor = (status: ComplianceFramework['status']) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50'
      case 'partial': return 'text-yellow-600 bg-yellow-50'
      case 'non-compliant': return 'text-red-600 bg-red-50'
      case 'pending': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: ComplianceFramework['status']) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'partial': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'non-compliant': return <XCircle className="h-4 w-4 text-red-600" />
      case 'pending': return <Clock className="h-4 w-4 text-blue-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: ComplianceFramework['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Compliance Frameworks</h2>
          <p className="text-sm text-muted-foreground">
            Manage compliance with industry standards and regulatory requirements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Framework
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Compliant</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Partial</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Non-Compliant</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">22</p>
                <p className="text-sm text-muted-foreground">Critical Findings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Frameworks List */}
      <div className="space-y-4">
        {frameworks.map((framework) => (
          <Card key={framework.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(framework.status)}
                  <div>
                    <CardTitle className="text-lg">{framework.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {framework.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`${getPriorityColor(framework.priority)}`}
                  >
                    {framework.priority.toUpperCase()}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(framework.status)}`}
                  >
                    {framework.status.toUpperCase().replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Compliance Progress</span>
                  <span className="font-medium">{framework.progress}%</span>
                </div>
                <Progress value={framework.progress} className="h-2" />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-medium">{framework.implementedControls}/{framework.controls}</div>
                  <div className="text-muted-foreground">Controls Implemented</div>
                </div>
                <div>
                  <div className={`font-medium ${framework.criticalFindings > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {framework.criticalFindings}
                  </div>
                  <div className="text-muted-foreground">Critical Findings</div>
                </div>
                <div>
                  <div className="font-medium">{new Date(framework.lastAssessment).toLocaleDateString()}</div>
                  <div className="text-muted-foreground">Last Assessment</div>
                </div>
                <div>
                  <div className="font-medium">{new Date(framework.nextReview).toLocaleDateString()}</div>
                  <div className="text-muted-foreground">Next Review</div>
                </div>
              </div>

              {/* Certification Info */}
              {framework.certificationDate && (
                <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                  <FileCheck className="h-5 w-5 text-green-600" />
                  <div className="text-sm">
                    <div className="font-medium text-green-800">
                      Certified on {new Date(framework.certificationDate).toLocaleDateString()}
                    </div>
                    {framework.expiryDate && (
                      <div className="text-green-600">
                        Expires {new Date(framework.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <FileCheck className="h-4 w-4 mr-1" />
                  Assessment
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function RiskAssessment() {
  const risks: RiskItem[] = [
    {
      id: "risk-1",
      title: "Data Breach Risk",
      description: "Potential unauthorized access to customer data due to insufficient access controls",
      category: 'technical',
      probability: 3,
      impact: 5,
      riskScore: 15,
      status: 'open',
      owner: "Security Team",
      lastReview: "2025-10-15",
      mitigation: "Implement multi-factor authentication and zero-trust architecture"
    },
    {
      id: "risk-2",
      title: "Vendor Dependency",
      description: "Over-reliance on single cloud provider could impact business continuity",
      category: 'operational',
      probability: 2,
      impact: 4,
      riskScore: 8,
      status: 'mitigated',
      owner: "Infrastructure Team",
      lastReview: "2025-10-10"
    },
    {
      id: "risk-3",
      title: "Regulatory Changes",
      description: "New privacy regulations may require significant compliance updates",
      category: 'compliance',
      probability: 4,
      impact: 3,
      riskScore: 12,
      status: 'open',
      owner: "Legal Team",
      lastReview: "2025-10-12"
    }
  ]

  const getRiskColor = (score: number) => {
    if (score >= 15) return 'text-red-600 bg-red-50'
    if (score >= 10) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  const getRiskLevel = (score: number) => {
    if (score >= 15) return 'HIGH'
    if (score >= 10) return 'MEDIUM'
    return 'LOW'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Risk Assessment</h2>
          <p className="text-sm text-muted-foreground">
            Identify, assess, and manage organizational risks
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Risk
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">High Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Medium Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Mitigated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {risks.map((risk) => (
          <Card key={risk.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{risk.title}</CardTitle>
                <Badge 
                  variant="outline" 
                  className={getRiskColor(risk.riskScore)}
                >
                  {getRiskLevel(risk.riskScore)} RISK
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{risk.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-medium">Probability: {risk.probability}/5</div>
                  <Progress value={risk.probability * 20} className="h-1 mt-1" />
                </div>
                <div>
                  <div className="font-medium">Impact: {risk.impact}/5</div>
                  <Progress value={risk.impact * 20} className="h-1 mt-1" />
                </div>
                <div>
                  <div className="font-medium">Score: {risk.riskScore}</div>
                  <div className="text-muted-foreground">P × I</div>
                </div>
                <div>
                  <div className="font-medium">{risk.owner}</div>
                  <div className="text-muted-foreground">Owner</div>
                </div>
              </div>
              {risk.mitigation && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-800">Mitigation Plan</div>
                  <div className="text-sm text-blue-600">{risk.mitigation}</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ControlsManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls Management</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Internal controls implementation and monitoring</p>
      </CardContent>
    </Card>
  )
}

export function AuditManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Management</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Internal and external audit planning and tracking</p>
      </CardContent>
    </Card>
  )
}

export function PolicyGovernance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Policy Governance</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Policy management, approval workflows, and compliance tracking</p>
      </CardContent>
    </Card>
  )
}