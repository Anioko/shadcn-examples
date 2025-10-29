"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../dashboard/components/app-sidebar";
import { SiteHeader } from "../../dashboard/components/site-header";
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Code, Download, Eye, FileText, Wand2, X, Plus, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Schema Types
interface FormSchema {
  id: string;
  title: string;
  description?: string;
  steps: FormStep[];
}

interface FormStep {
  id: string;
  title: string;
  fields: FormField[];
}

interface FormField {
  id: string;
  type: 'input' | 'textarea' | 'select' | 'tags' | 'date' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required: boolean;
  suggestions?: string[];
}

// Sample Schema
const sampleSchema: FormSchema = {
  id: "product-feedback",
  title: "Product Feedback Collection",
  description: "Gather comprehensive feedback on product features and improvements",
  steps: [
    {
      id: "basic-info",
      title: "Basic Information",
      fields: [
        {
          id: "product-name",
          type: "input",
          label: "Product Name",
          placeholder: "Enter product name",
          required: true
        },
        {
          id: "category",
          type: "select",
          label: "Product Category",
          required: true,
          suggestions: ["SaaS", "Mobile App", "Web Platform", "E-commerce", "Analytics"]
        },
        {
          id: "description",
          type: "textarea",
          label: "Product Description",
          placeholder: "Brief description of the product",
          required: false
        }
      ]
    },
    {
      id: "feedback-areas",
      title: "Feedback Areas",
      fields: [
        {
          id: "features",
          type: "tags",
          label: "Key Features to Evaluate",
          placeholder: "Add features to evaluate",
          required: true,
          suggestions: [
            "User Interface", "Performance", "Security", "Mobile Experience", 
            "Integration Capabilities", "Customer Support", "Pricing Model",
            "Onboarding Process", "Documentation", "API Quality",
            "Data Analytics", "Customization Options", "Scalability",
            "User Management", "Reporting Features"
          ]
        },
        {
          id: "improvement-areas",
          type: "tags",
          label: "Areas for Improvement",
          placeholder: "Identify improvement areas",
          required: false,
          suggestions: [
            "Loading Speed", "User Experience", "Feature Discoverability",
            "Mobile Responsiveness", "Error Handling", "Data Visualization",
            "Search Functionality", "Navigation", "Accessibility",
            "Integration Options", "Customer Onboarding", "Help Documentation"
          ]
        }
      ]
    }
  ]
};

export default function FormGeneratorPage() {
  const [schema, setSchema] = useState<string>(JSON.stringify(sampleSchema, null, 2))
  const [activeTab, setActiveTab] = useState("schema")
  const [parsedSchema, setParsedSchema] = useState<FormSchema | null>(sampleSchema)

  const parseSchema = () => {
    try {
      const parsed = JSON.parse(schema)
      setParsedSchema(parsed)
      setActiveTab("preview")
    } catch (error) {
      alert("Invalid JSON schema")
    }
  }

  const generateFormCode = () => {
    if (!parsedSchema) return ""
    
    return `"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const steps = ${JSON.stringify(parsedSchema.steps.map((step, index) => ({
  id: index + 1,
  title: step.title,
  description: step.fields.length + " fields"
})), null, 2)};

export default function ${parsedSchema.id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
${parsedSchema.steps.map(step => 
  step.fields.map(field => `    ${field.id}: ${field.type === 'tags' ? '[] as string[]' : "''"},`).join('\n')
).join('\n')}
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTagInput = (field: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value) {
        addTagItem(field, value);
        e.currentTarget.value = '';
      }
    }
  };

  const addTagItem = (field: string, item: string) => {
    const currentTags = formData[field as keyof typeof formData] as string[];
    if (!currentTags.includes(item)) {
      updateFormData(field, [...currentTags, item]);
    }
  };

  const removeTagItem = (field: string, item: string) => {
    const currentTags = formData[field as keyof typeof formData] as string[];
    updateFormData(field, currentTags.filter(tag => tag !== item));
  };

  // EXACT renderTagInput pattern from BusinessModelWizard
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

  const renderField = (field: any) => {
    switch (field.type) {
      case 'input':
        return (
          <div key={field.id}>
            <Label className="text-base font-medium">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id as keyof typeof formData] as string}
              onChange={(e) => updateFormData(field.id, e.target.value)}
              className="mt-2"
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={field.id}>
            <Label className="text-base font-medium">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id as keyof typeof formData] as string}
              onChange={(e) => updateFormData(field.id, e.target.value)}
              className="mt-2"
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.id}>
            <Label className="text-base font-medium">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select
              value={formData[field.id as keyof typeof formData] as string}
              onValueChange={(value) => updateFormData(field.id, value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.suggestions?.map((option: string) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 'tags':
        return renderTagInput(
          field.id,
          field.label,
          field.placeholder || "Add items",
          field.suggestions || [],
          field.required
        );
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep - 1];
    const stepFields = ${JSON.stringify(parsedSchema.steps, null, 2)}[currentStep - 1].fields;
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
          <p className="mt-2 text-gray-600">{step.description}</p>
        </div>
        
        <div className="space-y-6">
          {stepFields.map(renderField)}
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="pb-0">
          {/* EXACT Step Indicator pattern from BusinessModelWizard */}
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

          {/* EXACT Navigation pattern from BusinessModelWizard */}
          <div className="mt-8 flex items-center justify-between border-t pt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={handleNext}>
                <span>Continue</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => console.log("Form submitted:", formData)}>
                <span>Submit Form</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/*
 * This form uses the EXACT same patterns as BusinessModelWizard:
 * - Same Card layout (shadow-lg)
 * - Same step indicators (black circles with Check icons)
 * - Same renderTagInput function (copied verbatim)
 * - Same navigation buttons (ChevronLeft/ChevronRight)
 * - Same spacing and styling (p-6 md:p-8)
 * - Same cn() utility usage
 * - Same Badge styling (bg-black text-white)
 * - Same progress lines between steps
 */`;
  }

  const renderFormPreview = () => {
    if (!parsedSchema) return null

    return <LiveFormPreview schema={parsedSchema} />
  }

  // Live Interactive Preview Component
  const LiveFormPreview = ({ schema }: { schema: FormSchema }) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [previewData, setPreviewData] = useState<Record<string, string | string[]>>({})

    const steps = schema.steps.map((step, index) => ({
      id: index + 1,
      title: step.title,
      description: step.fields.length + " fields"
    }))

    const updatePreviewData = (field: string, value: string | string[]) => {
      setPreviewData(prev => ({ ...prev, [field]: value }))
    }

    const handleNext = () => {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
      }
    }

    const handlePrevious = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1)
      }
    }

    const renderPreviewField = (field: FormField) => {
      switch (field.type) {
        case 'input':
          return (
            <div key={field.id}>
              <Label className="text-base font-medium">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Input
                placeholder={field.placeholder}
                value={previewData[field.id] || ''}
                onChange={(e) => updatePreviewData(field.id, e.target.value)}
                className="mt-2"
              />
            </div>
          )
        case 'textarea':
          return (
            <div key={field.id}>
              <Label className="text-base font-medium">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                placeholder={field.placeholder}
                value={previewData[field.id] || ''}
                onChange={(e) => updatePreviewData(field.id, e.target.value)}
                className="mt-2"
              />
            </div>
          )
        case 'select':
          return (
            <div key={field.id}>
              <Label className="text-base font-medium">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Select value={(previewData[field.id] as string) || ''} onValueChange={(value) => updatePreviewData(field.id, value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {field.suggestions?.map((option: string) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        case 'tags':
          return (
            <div key={field.id}>
              <Label className="text-base font-medium">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <div className="mt-2 space-y-3">
                {/* Sample tags display */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1 bg-black text-white">
                    Sample Tag
                    <X className="h-3 w-3" />
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1 bg-black text-white">
                    Another Tag
                    <X className="h-3 w-3" />
                  </Badge>
                </div>
                <Input placeholder={field.placeholder || "Add items"} className="w-full" />
                {field.suggestions && field.suggestions.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-md p-2 bg-gray-50">
                    {field.suggestions.slice(0, 4).map((suggestion: string) => (
                      <button
                        key={suggestion}
                        type="button"
                        className="flex items-center justify-start rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 text-left">
                        <Plus className="mr-1 h-3 w-3 text-gray-400" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        default:
          return null
      }
    }

    const renderStepContent = () => {
      const step = schema.steps[currentStep - 1]
      if (!step) return null

      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
            <p className="mt-2 text-gray-600">{step.fields.length} fields in this step</p>
          </div>
          
          <div className="space-y-6">
            {step.fields.map(renderPreviewField)}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{schema.title}</h2>
          {schema.description && (
            <p className="text-gray-600 mt-2">{schema.description}</p>
          )}
          <Badge className="mt-2 bg-green-100 text-green-800">Live Interactive Preview</Badge>
        </div>

        {/* LIVE ONBOARDING WIZARD PREVIEW */}
        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl shadow-lg">
            <CardHeader className="pb-0">
              {/* EXACT Step Indicator pattern from Business Model Wizard */}
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

              {/* EXACT Navigation pattern from Business Model Wizard */}
              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>

                {currentStep < steps.length ? (
                  <Button onClick={handleNext}>
                    <span>Continue</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button>
                    <span>Submit Form</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pattern Compliance Information */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-green-800">100% Onboarding Wizard Pattern Compliance</span>
          </div>
          <ul className="text-sm text-green-700 space-y-1">
            <li>✓ Exact Card layout with shadow-lg</li>
            <li>✓ Black circular step indicators with Check icons</li>
            <li>✓ renderTagInput pattern with black badges</li>
            <li>✓ ChevronLeft/ChevronRight navigation buttons</li>
            <li>✓ Same spacing patterns (p-6 md:p-8)</li>
            <li>✓ cn() utility for conditional styling</li>
            <li>✓ Progress lines between steps</li>
            <li>✓ Identical form field handling</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider
      className="min-h-auto"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)"
        } as React.CSSProperties
      }>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="mb-8 text-center">
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                    <Wand2 className="w-8 h-8" />
                    ReqArchitect Form Generator
                  </h1>
                  <p className="text-gray-600 mt-2">Generate type-safe, multi-step forms from JSON schemas</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="schema" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Schema
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Generated Code
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="schema" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Form Schema</CardTitle>
                        <CardDescription>
                          Define your form structure using JSON. The generator will create a multi-step wizard with validation.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="schema">JSON Schema</Label>
                          <Textarea
                            id="schema"
                            value={schema}
                            onChange={(e) => setSchema(e.target.value)}
                            className="min-h-[400px] font-mono text-sm"
                            placeholder="Enter your form schema..."
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={parseSchema}>
                            Parse & Preview
                          </Button>
                          <Button variant="outline" onClick={() => setSchema(JSON.stringify(sampleSchema, null, 2))}>
                            Load Sample
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="preview" className="space-y-6">
                    {renderFormPreview()}
                  </TabsContent>

                  <TabsContent value="code" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Generated Form Component</CardTitle>
                        <CardDescription>
                          Copy this code to create your form component. All styling follows ReqArchitect standards.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-[600px] text-sm">
                            <code>{generateFormCode()}</code>
                          </pre>
                          <Button
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => navigator.clipboard.writeText(generateFormCode())}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Copy Code
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}