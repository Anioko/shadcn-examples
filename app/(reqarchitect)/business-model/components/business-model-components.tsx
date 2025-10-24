"use client"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Save, 
  Users, 
  Building2, 
  DollarSign, 
  Target, 
  Truck, 
  Heart, 
  Handshake, 
  Cog, 
  Wallet,
  Sparkles,
  RotateCcw,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react"

interface BMCSection {
  id: string
  title: string
  description: string
  items: string[]
  icon: React.ComponentType<{ className?: string }>
  color: string
}

interface BusinessModel {
  id: string
  name: string
  version: string
  lastModified: string
  sections: BMCSection[]
  validation: {
    completeness: number
    aiRecommendations: string[]
    missingElements: string[]
  }
}

export function BusinessModelCanvas() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const [businessModel, setBusinessModel] = useState<BusinessModel>({
    id: "bmc-1",
    name: "ReqArchitect Business Model",
    version: "2.1",
    lastModified: "2025-10-24T10:30:00Z",
    sections: [
      {
        id: "key-partners",
        title: "Key Partners",
        description: "Who are our key partners and suppliers?",
        icon: Handshake,
        color: "bg-blue-50 border-blue-200",
        items: [
          "Cloud Infrastructure Provider (AWS)",
          "Payment Gateway (Stripe)", 
          "AI/ML Platform (Anthropic)",
          "Security Provider (Auth0)",
          "Integration Partners (Zapier)"
        ]
      },
      {
        id: "key-activities",
        title: "Key Activities",
        description: "What key activities does our value proposition require?",
        icon: Cog,
        color: "bg-green-50 border-green-200",
        items: [
          "AI-Powered Platform Development",
          "Customer Success & Support",
          "Business Model Analysis R&D",
          "Strategic Partnership Management",
          "Continuous Platform Enhancement"
        ]
      },
      {
        id: "value-propositions",
        title: "Value Propositions", 
        description: "What value do we deliver to customers?",
        icon: Target,
        color: "bg-purple-50 border-purple-200",
        items: [
          "AI-Powered Business Model Design",
          "Strategy-to-Execution Alignment",
          "Automated Architecture Mapping",
          "Context-Aware Recommendations",
          "Real-time Business Intelligence"
        ]
      },
      {
        id: "customer-relationships",
        title: "Customer Relationships",
        description: "What type of relationship do we establish?",
        icon: Heart,
        color: "bg-pink-50 border-pink-200",
        items: [
          "Self-Service Platform",
          "Dedicated Customer Success",
          "AI-Powered Guidance",
          "Community & Forums",
          "Premium Consultation Services"
        ]
      },
      {
        id: "customer-segments",
        title: "Customer Segments",
        description: "Who are we creating value for?",
        icon: Users,
        color: "bg-orange-50 border-orange-200",
        items: [
          "Technical Founders (Solo/Early Stage)",
          "Seed-Funded Startup Teams (3-10 people)",
          "Post-PMF Startups (10-50 people)",
          "Small Enterprise Architects",
          "Business Analysts & Product Managers"
        ]
      },
      {
        id: "key-resources",
        title: "Key Resources",
        description: "What key resources does our value proposition require?",
        icon: Building2,
        color: "bg-indigo-50 border-indigo-200",
        items: [
          "AI/ML Development Team",
          "Business Architecture Expertise",
          "Cloud Infrastructure",
          "Customer Data & Context",
          "Strategic Partnerships"
        ]
      },
      {
        id: "channels",
        title: "Channels",
        description: "Through which channels do we reach customer segments?",
        icon: Truck,
        color: "bg-cyan-50 border-cyan-200",
        items: [
          "Direct SaaS Platform",
          "Content Marketing & SEO",
          "Startup Accelerator Partnerships",
          "VC Network & Referrals",
          "Developer Community Outreach"
        ]
      },
      {
        id: "cost-structure",
        title: "Cost Structure",
        description: "What are the most important costs?",
        icon: Wallet,
        color: "bg-red-50 border-red-200",
        items: [
          "R&D Team (60% of costs)",
          "Cloud Infrastructure (15%)",
          "AI/ML Services (10%)",
          "Customer Acquisition (10%)",
          "Operations & Support (5%)"
        ]
      },
      {
        id: "revenue-streams",
        title: "Revenue Streams",
        description: "For what value are customers willing to pay?",
        icon: DollarSign,
        color: "bg-emerald-50 border-emerald-200",
        items: [
          "SaaS Subscriptions (Tiered Pricing)",
          "Professional Services & Consulting",
          "Enterprise Licensing & White-label",
          "Training & Certification Programs",
          "API Usage & Integration Fees"
        ]
      }
    ],
    validation: {
      completeness: 87,
      aiRecommendations: [
        "Consider adding competitive moats to Value Propositions",
        "Expand international market segments",
        "Detail revenue model pricing strategy"
      ],
      missingElements: [
        "Unique competitive advantages",
        "International expansion strategy"
      ]
    }
  })

  const handleAddItem = (sectionId: string, item: string) => {
    if (!item.trim()) return
    
    setBusinessModel(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, items: [...section.items, item.trim()] }
          : section
      ),
      lastModified: new Date().toISOString()
    }))
  }

  const handleRemoveItem = (sectionId: string, itemIndex: number) => {
    setBusinessModel(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, items: section.items.filter((_, i) => i !== itemIndex) }
          : section
      ),
      lastModified: new Date().toISOString()
    }))
  }

  const handleEditItem = (sectionId: string, itemIndex: number, newValue: string) => {
    setBusinessModel(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { 
              ...section, 
              items: section.items.map((item, i) => 
                i === itemIndex ? newValue : item
              ) 
            }
          : section
      ),
      lastModified: new Date().toISOString()
    }))
  }

  const aiValidate = async () => {
    // Simulate AI validation
    const recommendations = [
      "Your value proposition aligns well with target customer segments",
      "Consider adding API marketplace revenue stream",
      "Key partnerships could include more enterprise software vendors",
      "Customer acquisition channels show good diversity"
    ]
    
    setBusinessModel(prev => ({
      ...prev,
      validation: {
        ...prev.validation,
        completeness: Math.min(prev.validation.completeness + 5, 100),
        aiRecommendations: recommendations
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header with Validation */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">{businessModel.name}</h2>
            <p className="text-sm text-muted-foreground">
              Version {businessModel.version} • Last modified {new Date(businessModel.lastModified).toLocaleDateString()}
            </p>
          </div>
          <Badge variant="outline" className="bg-white">
            {businessModel.validation.completeness}% Complete
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={aiValidate}>
            <Sparkles className="h-4 w-4 mr-2" />
            AI Validate
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* AI Recommendations */}
      {businessModel.validation.aiRecommendations.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {businessModel.validation.aiRecommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Business Model Canvas Grid */}
      <div className="grid grid-cols-5 gap-4 min-h-[600px]">
        {/* Row 1: Key Partners, Key Activities, Value Propositions, Customer Relationships, Customer Segments */}
        <div className="col-span-1">
          <BMCSection 
            section={businessModel.sections.find(s => s.id === "key-partners")!}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onEditItem={handleEditItem}
            isSelected={selectedSection === "key-partners"}
            onSelect={() => setSelectedSection("key-partners")}
          />
        </div>
        
        <div className="col-span-1">
          <BMCSection 
            section={businessModel.sections.find(s => s.id === "key-activities")!}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onEditItem={handleEditItem}
            isSelected={selectedSection === "key-activities"}
            onSelect={() => setSelectedSection("key-activities")}
          />
        </div>
        
        <div className="col-span-1 row-span-2">
          <BMCSection 
            section={businessModel.sections.find(s => s.id === "value-propositions")!}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onEditItem={handleEditItem}
            isSelected={selectedSection === "value-propositions"}
            onSelect={() => setSelectedSection("value-propositions")}
            className="h-full"
          />
        </div>
        
        <div className="col-span-1">
          <BMCSection 
            section={businessModel.sections.find(s => s.id === "customer-relationships")!}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onEditItem={handleEditItem}
            isSelected={selectedSection === "customer-relationships"}
            onSelect={() => setSelectedSection("customer-relationships")}
          />
        </div>
        
        <div className="col-span-1">
          <BMCSection 
            section={businessModel.sections.find(s => s.id === "customer-segments")!}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onEditItem={handleEditItem}
            isSelected={selectedSection === "customer-segments"}
            onSelect={() => setSelectedSection("customer-segments")}
          />
        </div>

        {/* Row 2: Key Resources, Channels (spans to align with Value Propositions) */}
        <div className="col-span-1">
          <BMCSection 
            section={businessModel.sections.find(s => s.id === "key-resources")!}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onEditItem={handleEditItem}
            isSelected={selectedSection === "key-resources"}
            onSelect={() => setSelectedSection("key-resources")}
          />
        </div>
        
        <div className="col-span-2">
          <BMCSection 
            section={businessModel.sections.find(s => s.id === "channels")!}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onEditItem={handleEditItem}
            isSelected={selectedSection === "channels"}
            onSelect={() => setSelectedSection("channels")}
          />
        </div>

        {/* Row 3: Cost Structure, Revenue Streams */}
        <div className="col-span-2">
          <BMCSection 
            section={businessModel.sections.find(s => s.id === "cost-structure")!}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onEditItem={handleEditItem}
            isSelected={selectedSection === "cost-structure"}
            onSelect={() => setSelectedSection("cost-structure")}
          />
        </div>
        
        <div className="col-span-1"></div> {/* Spacer for value prop column */}
        
        <div className="col-span-2">
          <BMCSection 
            section={businessModel.sections.find(s => s.id === "revenue-streams")!}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onEditItem={handleEditItem}
            isSelected={selectedSection === "revenue-streams"}
            onSelect={() => setSelectedSection("revenue-streams")}
          />
        </div>
      </div>
    </div>
  )
}

interface BMCSectionProps {
  section: BMCSection
  onAddItem: (sectionId: string, item: string) => void
  onRemoveItem: (sectionId: string, itemIndex: number) => void
  onEditItem: (sectionId: string, itemIndex: number, newValue: string) => void
  isSelected: boolean
  onSelect: () => void
  className?: string
}

function BMCSection({ 
  section, 
  onAddItem, 
  onRemoveItem, 
  onEditItem, 
  isSelected, 
  onSelect,
  className = ""
}: BMCSectionProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newItem, setNewItem] = useState("")
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleAdd = () => {
    if (newItem.trim()) {
      onAddItem(section.id, newItem)
      setNewItem("")
      setIsAdding(false)
    }
  }

  const handleEdit = (index: number, value: string) => {
    setEditingIndex(index)
    setEditValue(value)
  }

  const handleSaveEdit = () => {
    if (editingIndex !== null && editValue.trim()) {
      onEditItem(section.id, editingIndex, editValue)
      setEditingIndex(null)
      setEditValue("")
    }
  }

  const IconComponent = section.icon

  return (
    <Card 
      className={`${section.color} ${isSelected ? 'ring-2 ring-blue-500' : ''} cursor-pointer transition-all hover:shadow-md ${className}`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <IconComponent className="h-4 w-4" />
          {section.title}
        </CardTitle>
        <p className="text-xs text-muted-foreground">{section.description}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {section.items.map((item, index) => (
          <div 
            key={index} 
            className="group flex items-center justify-between p-2 bg-white rounded border text-xs hover:shadow-sm"
          >
            {editingIndex === index ? (
              <div className="flex-1 flex gap-1">
                <Input 
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="text-xs h-6"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit()
                    if (e.key === 'Escape') {
                      setEditingIndex(null)
                      setEditValue("")
                    }
                  }}
                  autoFocus
                />
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={handleSaveEdit}>
                  <CheckCircle className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <>
                <span className="flex-1">{item}</span>
                <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-5 w-5 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEdit(index, item)
                    }}
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-5 w-5 p-0 text-red-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveItem(section.id, index)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
        
        {isAdding ? (
          <div className="flex gap-1">
            <Input 
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item..."
              className="text-xs h-7"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAdd()
                if (e.key === 'Escape') {
                  setIsAdding(false)
                  setNewItem("")
                }
              }}
              autoFocus
            />
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={handleAdd}>
              <CheckCircle className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-7 text-xs border-dashed border-2 border-gray-300"
            onClick={(e) => {
              e.stopPropagation()
              setIsAdding(true)
            }}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add item
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function ValuePropositionCanvas() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Value Proposition Canvas</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Detailed customer segment and value proposition design</p>
      </CardContent>
    </Card>
  )
}

export function LeanCanvas() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lean Canvas</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Problem-focused adaptation of BMC for startups</p>
      </CardContent>
    </Card>
  )
}

export function BMCTemplateLibrary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Library</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Pre-built business model templates for common industries</p>
      </CardContent>
    </Card>
  )
}

export function BMCVersionHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Version History</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Track changes and pivot history with git-like versioning</p>
      </CardContent>
    </Card>
  )
}