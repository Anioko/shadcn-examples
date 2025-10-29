"use client"

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Wand2, 
  FileText, 
  BarChart3, 
  Zap, 
  Shield, 
  Smartphone, 
  Code, 
  Eye,
  ArrowRight,
  CheckCircle
} from "lucide-react"

const generators = [
  {
    id: "form-generator",
    title: "Form Generator",
    description: "Generate multi-step, type-safe forms with validation and tag-based inputs",
    icon: FileText,
    features: [
      "Multi-step wizard pattern",
      "Tag-based multi-entry fields",
      "Real-time validation",
      "99.9% shadcn design parity",
      "TypeScript interfaces",
      "Mobile-responsive"
    ],
    href: "/generators/form-generator",
    status: "ready",
    preview: "Schema → Multi-step Form → Generated Code"
  },
  {
    id: "dashboard-generator",
    title: "Dashboard Generator",
    description: "Create responsive, interactive dashboards with charts, tables, and metrics",
    icon: BarChart3,
    features: [
      "Grid-based layouts",
      "Interactive charts & tables",
      "Filtering & search",
      "Metric cards",
      "Data visualization",
      "Export capabilities"
    ],
    href: "/generators/dashboard-generator",
    status: "ready",
    preview: "Schema → Dashboard Layout → Generated Code"
  }
]

const benefits = [
  {
    icon: Zap,
    title: "10x Development Speed",
    description: "Generate production-ready components in minutes, not hours"
  },
  {
    icon: Shield,
    title: "Type-Safe by Default",
    description: "All generated code includes TypeScript interfaces and Zod validation"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Responsive layouts that work perfectly on all device sizes"
  },
  {
    icon: Code,
    title: "Clean, Maintainable Code",
    description: "Generated code follows ReqArchitect standards and best practices"
  }
]

export default function GeneratorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wand2 className="w-10 h-10" />
            <h1 className="text-4xl font-bold text-gray-900">ReqArchitect Generators</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accelerate development with schema-driven code generation. 
            Create forms and dashboards that maintain 99.9% design parity with shadcn standards.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Why Use ReqArchitect Generators?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardHeader>
                  <benefit.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Generators */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center">Available Generators</h2>
          
          {generators.map((generator) => (
            <Card key={generator.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <generator.icon className="w-8 h-8 text-blue-600" />
                    <div>
                      <CardTitle className="text-xl">{generator.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {generator.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={generator.status === 'ready' ? 'default' : 'secondary'}>
                    {generator.status === 'ready' ? 'Ready' : 'Coming Soon'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Features */}
                  <div>
                    <h3 className="font-semibold mb-3">Key Features</h3>
                    <div className="space-y-2">
                      {generator.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Workflow */}
                  <div>
                    <h3 className="font-semibold mb-3">Workflow</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <Eye className="w-4 h-4" />
                      <span>{generator.preview}</span>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button asChild>
                        <Link href={generator.href} className="flex items-center gap-2">
                          Try Generator
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`${generator.href}#documentation`}>
                          View Docs
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Standards */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Technical Standards & Guardrails</CardTitle>
              <CardDescription>
                All generators follow strict standards to ensure consistency and quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Design Principles</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 99.9% shadcn design parity</li>
                    <li>• Mobile-first responsive design</li>
                    <li>• Accessibility (WCAG 2.1 AA)</li>
                    <li>• Consistent component patterns</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Technical Standards</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• TypeScript interfaces</li>
                    <li>• Zod schema validation</li>
                    <li>• Tree-shakable components</li>
                    <li>• Performance optimized</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Quality Assurance</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Visual testing</li>
                    <li>• Type safety validation</li>
                    <li>• Cross-browser compatibility</li>
                    <li>• Lighthouse scores &gt;90</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started */}
        <div className="mt-12 text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Ready to Get Started?</CardTitle>
              <CardDescription className="text-blue-700">
                Choose a generator above to start creating production-ready components in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link href="/generators/form-generator">
                    Start with Forms
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/generators/dashboard-generator">
                    Try Dashboards
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}