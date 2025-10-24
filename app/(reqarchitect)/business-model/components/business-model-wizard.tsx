"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  AlertTriangle,
  Target,
  Users,
  Building2,
  Cog,
  Heart,
  Handshake,
  Truck,
  DollarSign,
  Wallet,
  Lightbulb,
  Sparkles,
  X,
  Plus
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Value Proposition",
    description: "Define your core value"
  },
  {
    id: 2,
    title: "Customer Segments",
    description: "Identify your customers"
  },
  {
    id: 3,
    title: "Key Resources",
    description: "Resources and activities"
  },
  {
    id: 4,
    title: "Channels & Revenue",
    description: "How you reach and monetize"
  },
  {
    id: 5,
    title: "AI Review",
    description: "AI recommendations"
  }
];

export default function BusinessModelWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Value Proposition
    valueProposition: "",
    problemSolving: "",
    uniqueAdvantage: "",
    targetOutcomes: [] as string[], // New: Multiple target outcomes
    
    // Step 2: Customer Segments
    targetCustomers: "",
    customerSize: "small-business",
    customerIndustry: [] as string[], // Changed to multiple industries
    customerPains: [] as string[], // Changed to multiple pain points
    customerJobs: [] as string[], // New: Jobs customers are trying to do
    
    // Step 3: Key Resources & Activities
    keyResources: [] as string[],
    keyActivities: [] as string[],
    keyPartners: [] as string[], // Changed to multiple partners
    coreCompetencies: [] as string[], // New: Core competencies
    
    // Step 4: Channels & Revenue
    channels: [] as string[],
    revenueModel: "subscription",
    revenueStreams: [] as string[], // New: Multiple revenue streams
    pricingStrategy: "",
    costStructure: [] as string[], // Changed to multiple cost components
    
    // Step 5: AI Settings
    enableAIRecommendations: true,
    industryBenchmark: true,
    competitorAnalysis: false
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: string, item: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    const updated = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateFormData(field, updated);
  };

  const addTagItem = (field: string, value: string) => {
    if (value.trim()) {
      const currentArray = formData[field as keyof typeof formData] as string[];
      if (!currentArray.includes(value.trim())) {
        updateFormData(field, [...currentArray, value.trim()]);
      }
    }
  };

  const removeTagItem = (field: string, item: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    updateFormData(field, currentArray.filter(i => i !== item));
  };

  const handleTagInput = (field: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      addTagItem(field, input.value);
      input.value = '';
    }
  };

  const renderTagInput = (
    field: string,
    label: string,
    placeholder: string,
    suggestions: string[] = [],
    required: boolean = false
  ) => {
    const currentTags = formData[field as keyof typeof formData] as string[];
    const availableSuggestions = suggestions.filter(suggestion => !currentTags.includes(suggestion));
    
    return (
      <div>
        <Label className="text-base font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="mt-2 space-y-4">
          {/* Display existing tags */}
          {currentTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {currentTags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1 bg-black text-white hover:bg-gray-800">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTagItem(field, tag)}
                    className="ml-1 hover:text-red-300 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          
          {/* Input for new tags */}
          <div>
            <Input
              placeholder={placeholder}
              onKeyDown={(e) => handleTagInput(field, e)}
              className="w-full"
            />
            <p className="mt-1 text-xs text-gray-500">
              Press Enter to add custom items
            </p>
          </div>
          
          {/* Suggestion buttons */}
          {availableSuggestions.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-sm text-gray-600">Popular Options:</Label>
                <span className="text-xs text-gray-500">
                  {availableSuggestions.length} options available
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 max-h-48 overflow-y-auto border rounded-md p-3 bg-gray-50">
                {availableSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => addTagItem(field, suggestion)}
                    className="flex items-center justify-start rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors text-left">
                    <Plus className="mr-2 h-3 w-3 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {currentTags.length > 0 && (
            <p className="text-sm text-green-600">
              ✓ {currentTags.length} item{currentTags.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Value Proposition
              </CardTitle>
              <CardDescription>
                Define the unique value your business delivers to customers.{" "}
                <Link href="#" className="text-purple-600 hover:underline">
                  Learn more
                </Link>
                .
              </CardDescription>
            </CardHeader>

            <div className="space-y-6">
              <div>
                <Label htmlFor="valueProposition" className="text-base font-medium">
                  Core Value Proposition <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="valueProposition"
                  value={formData.valueProposition}
                  onChange={(e) => updateFormData("valueProposition", e.target.value)}
                  placeholder="What unique value do you deliver to customers?"
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="problemSolving" className="text-base font-medium">
                  Problem You&apos;re Solving <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="problemSolving"
                  value={formData.problemSolving}
                  onChange={(e) => updateFormData("problemSolving", e.target.value)}
                  placeholder="What customer problem does your product solve?"
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="uniqueAdvantage" className="text-base">
                  Unique Competitive Advantage
                </Label>
                <Textarea
                  id="uniqueAdvantage"
                  value={formData.uniqueAdvantage}
                  onChange={(e) => updateFormData("uniqueAdvantage", e.target.value)}
                  placeholder="What makes you different from competitors?"
                  className="mt-2"
                  rows={2}
                />
                <p className="mt-2 text-sm text-gray-500">
                  AI will help identify potential competitive advantages based on your inputs
                </p>
              </div>

              {renderTagInput(
                "targetOutcomes",
                "Target Customer Outcomes",
                "Add desired outcome for customers...",
                [
                  "Increased Productivity",
                  "Cost Reduction",
                  "Better User Experience",
                  "Time Savings",
                  "Revenue Growth",
                  "Risk Mitigation",
                  "Operational Efficiency",
                  "Customer Satisfaction"
                ]
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Customer Segments
              </CardTitle>
              <CardDescription>
                Identify and describe your target customer segments.{" "}
                <Link href="#" className="text-purple-600 hover:underline">
                  Customer research guide
                </Link>
                .
              </CardDescription>
            </CardHeader>

            <div className="space-y-6">
              <div>
                <Label htmlFor="targetCustomers" className="text-base font-medium">
                  Target Customer Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="targetCustomers"
                  value={formData.targetCustomers}
                  onChange={(e) => updateFormData("targetCustomers", e.target.value)}
                  placeholder="Describe your ideal customers (demographics, roles, behaviors)"
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label className="mb-4 block text-base">Customer Size Segment</Label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {["individual", "small-business", "enterprise", "government"].map((size) => (
                    <button
                      key={size}
                      onClick={() => updateFormData("customerSize", size)}
                      className={cn(
                        "rounded-lg border-2 p-4 text-center transition-all text-sm font-medium",
                        formData.customerSize === size
                          ? "bg-muted border-purple-500 ring-2 ring-purple-500"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      )}>
                      {size.charAt(0).toUpperCase() + size.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {renderTagInput(
                "customerIndustry",
                "Target Industries",
                "Add industry focus...",
                [
                  "Technology",
                  "Finance",
                  "Healthcare",
                  "Retail",
                  "Manufacturing",
                  "Education",
                  "Real Estate",
                  "Legal Services",
                  "Construction",
                  "Transportation",
                  "Entertainment",
                  "Non-profit"
                ]
              )}

              {renderTagInput(
                "customerPains",
                "Customer Pain Points",
                "Add pain point...",
                [
                  "Manual Processes",
                  "High Costs",
                  "Poor User Experience",
                  "Data Silos",
                  "Compliance Issues",
                  "Scalability Problems",
                  "Security Concerns",
                  "Integration Challenges"
                ],
                true
              )}

              {renderTagInput(
                "customerJobs",
                "Jobs Customers Are Trying To Do",
                "Add customer job...",
                [
                  "Automate Workflows",
                  "Analyze Data",
                  "Communicate Effectively",
                  "Manage Projects",
                  "Track Performance",
                  "Reduce Costs",
                  "Improve Quality",
                  "Scale Operations"
                ]
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-purple-600" />
                Key Resources & Activities
              </CardTitle>
              <CardDescription>
                Define the essential resources, activities, and partnerships for your business.{" "}
                <Link href="#" className="text-purple-600 hover:underline">
                  Resource planning guide
                </Link>
                .
              </CardDescription>
            </CardHeader>

            <div className="space-y-6">
              {renderTagInput(
                "keyResources",
                "Key Resources",
                "Add key resource...",
                [
                  // Technology & Digital
                  "Technology Platform",
                  "Software Applications",
                  "Mobile Applications",
                  "Website & E-commerce",
                  "APIs & Integrations",
                  "Cloud Infrastructure",
                  "Data Analytics Tools",
                  "AI/ML Capabilities",
                  "Cybersecurity Systems",
                  "IT Infrastructure",
                  
                  // Human Resources
                  "Development Team",
                  "Engineering Team",
                  "Design Team",
                  "Sales Team",
                  "Marketing Team",
                  "Customer Support Team",
                  "Operations Team",
                  "Management Team",
                  "Advisory Board",
                  "Consultants",
                  
                  // Intellectual Property
                  "Patents",
                  "Trademarks",
                  "Copyrights",
                  "Trade Secrets",
                  "Proprietary Algorithms",
                  "Brand & Reputation",
                  "Customer Lists",
                  "Supplier Networks",
                  
                  // Financial Resources
                  "Venture Capital",
                  "Bank Loans",
                  "Revenue Streams",
                  "Investment Portfolio",
                  "Credit Lines",
                  "Government Grants",
                  
                  // Physical Assets
                  "Office Space",
                  "Manufacturing Facilities",
                  "Warehouses",
                  "Equipment & Machinery",
                  "Vehicles",
                  "Inventory",
                  
                  // Data & Information
                  "Customer Database",
                  "Market Research",
                  "Business Intelligence",
                  "Analytics Data",
                  "User Generated Content",
                  
                  // Partnerships & Networks
                  "Strategic Partnerships",
                  "Distribution Networks",
                  "Supplier Relationships",
                  "Industry Connections",
                  "Professional Networks"
                ],
                true
              )}

              {renderTagInput(
                "keyActivities",
                "Key Activities",
                "Add key activity...",
                [
                  // Product & Development
                  "Product Development",
                  "Software Development",
                  "Mobile App Development",
                  "Web Development",
                  "API Development",
                  "System Architecture",
                  "Database Management",
                  "DevOps & Deployment",
                  "Quality Assurance",
                  "Testing & Validation",
                  "User Experience Design",
                  "User Interface Design",
                  "Prototyping",
                  
                  // Research & Innovation
                  "Research & Development",
                  "Market Research",
                  "Technology Research",
                  "Innovation Labs",
                  "Proof of Concepts",
                  "Patent Development",
                  
                  // Sales & Marketing
                  "Marketing & Promotion",
                  "Digital Marketing",
                  "Content Marketing",
                  "Social Media Management",
                  "SEO & SEM",
                  "Lead Generation",
                  "Sales Processes",
                  "Customer Acquisition",
                  "Account Management",
                  "Partner Sales",
                  "Channel Management",
                  
                  // Operations & Support
                  "Platform Operations",
                  "Infrastructure Management",
                  "Customer Support",
                  "Technical Support",
                  "Help Desk Operations",
                  "Training & Onboarding",
                  "Documentation",
                  "Community Management",
                  
                  // Business Operations
                  "Business Development",
                  "Strategic Planning",
                  "Financial Management",
                  "Legal & Compliance",
                  "Human Resources",
                  "Vendor Management",
                  "Supply Chain Management",
                  "Procurement",
                  
                  // Analytics & Intelligence
                  "Data Analytics",
                  "Business Intelligence",
                  "Performance Monitoring",
                  "Reporting & Dashboards",
                  "Market Analysis",
                  "Competitive Analysis",
                  
                  // Security & Risk
                  "Security Management",
                  "Risk Management",
                  "Compliance Monitoring",
                  "Audit & Review",
                  
                  // Customer Experience
                  "Customer Success",
                  "Customer Retention",
                  "User Experience Optimization",
                  "Feedback Management",
                  "Customer Analytics"
                ],
                true
              )}

              {renderTagInput(
                "keyPartners",
                "Key Partners & Suppliers",
                "Add partner or supplier...",
                [
                  "Technology Vendors",
                  "Cloud Providers",
                  "Payment Processors",
                  "Marketing Agencies",
                  "Legal Advisors",
                  "Consultants",
                  "Distributors",
                  "Integration Partners",
                  "Research Institutions",
                  "Industry Associations"
                ]
              )}

              {renderTagInput(
                "coreCompetencies",
                "Core Competencies",
                "Add core competency...",
                [
                  "Software Development",
                  "Data Analytics",
                  "User Experience Design",
                  "System Integration",
                  "Project Management",
                  "Technical Support",
                  "Business Intelligence",
                  "Machine Learning",
                  "Security Expertise",
                  "Industry Knowledge"
                ]
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-purple-600" />
                Channels & Revenue
              </CardTitle>
              <CardDescription>
                Define how you reach customers and generate revenue.{" "}
                <Link href="#" className="text-purple-600 hover:underline">
                  Revenue model guide
                </Link>
                .
              </CardDescription>
            </CardHeader>

            <div className="space-y-6">
              <div>
                <Label className="mb-4 block text-base font-medium">
                  Distribution Channels <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Direct Web Sales",
                    "Partner Networks",
                    "App Marketplaces",
                    "Social Media",
                    "Email Marketing",
                    "Content Marketing",
                    "Sales Team",
                    "Resellers"
                  ].map((channel) => (
                    <button
                      key={channel}
                      onClick={() => toggleArrayItem("channels", channel)}
                      className={cn(
                        "rounded-lg border-2 p-3 text-left transition-all text-sm",
                        formData.channels.includes(channel)
                          ? "bg-muted border-purple-500 ring-2 ring-purple-500"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      )}>
                      {channel}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-4 block text-base font-medium">
                  Revenue Model <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {[
                    { id: "subscription", label: "Subscription (SaaS)", desc: "Recurring monthly/annual fees" },
                    { id: "usage", label: "Usage-based", desc: "Pay per use or transaction" },
                    { id: "freemium", label: "Freemium", desc: "Free tier with paid upgrades" },
                    { id: "marketplace", label: "Marketplace", desc: "Commission on transactions" }
                  ].map((model) => (
                    <Card
                      key={model.id}
                      className={cn(
                        "cursor-pointer transition-all",
                        formData.revenueModel === model.id
                          ? "bg-muted border-purple-500 ring-2 ring-purple-500"
                          : "border-gray-200 hover:shadow-md"
                      )}
                      onClick={() => updateFormData("revenueModel", model.id)}>
                      <CardContent className="p-4">
                        <div className="font-medium">{model.label}</div>
                        <div className="text-sm text-gray-500">{model.desc}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {renderTagInput(
                "revenueStreams",
                "Revenue Streams",
                "Add revenue stream...",
                [
                  "Software Licenses",
                  "Subscription Fees",
                  "Transaction Fees",
                  "Service Fees",
                  "Training & Consulting",
                  "Support & Maintenance",
                  "Data Analytics Services",
                  "Integration Services",
                  "Custom Development",
                  "API Usage Fees"
                ]
              )}

              <div>
                <Label htmlFor="pricingStrategy" className="text-base">
                  Pricing Strategy
                </Label>
                <Textarea
                  id="pricingStrategy"
                  value={formData.pricingStrategy}
                  onChange={(e) => updateFormData("pricingStrategy", e.target.value)}
                  placeholder="Describe your pricing approach and key price points"
                  className="mt-2"
                  rows={2}
                />
              </div>

              {renderTagInput(
                "costStructure",
                "Key Cost Components",
                "Add cost component...",
                [
                  "Software Development",
                  "Cloud Infrastructure",
                  "Marketing & Sales",
                  "Customer Support",
                  "Legal & Compliance",
                  "Office & Operations",
                  "Research & Development",
                  "Third-party Licenses",
                  "Professional Services",
                  "Security & Monitoring"
                ]
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI-Powered Analysis
              </CardTitle>
              <CardDescription>
                Enable AI recommendations to enhance your business model.{" "}
                <Link href="#" className="text-purple-600 hover:underline">
                  Learn about AI features
                </Link>
                .
              </CardDescription>
            </CardHeader>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-3">
                    <Lightbulb className="h-6 w-6 text-purple-600" />
                    <div>
                      <div className="font-medium">AI Recommendations</div>
                      <div className="text-sm text-gray-500">
                        Get AI-powered suggestions for improving your business model
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={formData.enableAIRecommendations}
                    onCheckedChange={(checked) => updateFormData("enableAIRecommendations", checked)}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-3">
                    <Target className="h-6 w-6 text-blue-600" />
                    <div>
                      <div className="font-medium">Industry Benchmarking</div>
                      <div className="text-sm text-gray-500">
                        Compare your model against industry standards and best practices
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={formData.industryBenchmark}
                    onCheckedChange={(checked) => updateFormData("industryBenchmark", checked)}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-green-600" />
                    <div>
                      <div className="font-medium">Competitor Analysis</div>
                      <div className="text-sm text-gray-500">
                        Analyze competitive landscape and positioning opportunities
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={formData.competitorAnalysis}
                    onCheckedChange={(checked) => updateFormData("competitorAnalysis", checked)}
                  />
                </div>
              </div>

              <Alert className="border-green-200 bg-green-50">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Ready to generate your Business Model Canvas!</strong>
                  <br />
                  AI will analyze your inputs and create a comprehensive business model with 
                  personalized recommendations for improvement.
                </AlertDescription>
              </Alert>

              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="font-medium mb-2">What happens next:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• AI analyzes your business model inputs</li>
                  <li>• Generates a complete Business Model Canvas</li>
                  <li>• Provides improvement recommendations</li>
                  <li>• Creates actionable next steps</li>
                  <li>• Saves to your ReqArchitect workspace</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="pb-0">
          {/* Step Indicator */}
          <div className="mb-6 flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.id} className="relative flex flex-1 flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300",
                    currentStep > step.id
                      ? "bg-black text-white"
                      : currentStep === step.id
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-600"
                  )}>
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <div
                  className={cn(
                    "mt-2 text-center text-sm font-medium",
                    currentStep >= step.id ? "text-gray-800" : "text-gray-500"
                  )}>
                  {step.title}
                </div>
                {step.id < steps.length && (
                  <div
                    className={cn(
                      "absolute top-5 left-[calc(50%+20px)] h-0.5 w-[calc(100%-40px)] -translate-y-1/2 bg-gray-200 transition-colors duration-300",
                      currentStep > step.id && "bg-black"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          {renderStepContent()}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t pt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            {currentStep < 5 ? (
              <Button onClick={handleNext}>
                <span>Continue</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => console.log("Generate Business Model Canvas", formData)}>
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Generate Business Model Canvas</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}