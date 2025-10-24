"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { SiteHeader } from "../dashboard/components/site-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  DollarSign, 
  Target, 
  Truck, 
  Heart, 
  Handshake, 
  Cog, 
  Wallet, 
  Download, 
  Plus,
  Sparkles,
  ArrowRight 
} from "lucide-react";
import { useState } from "react";
import BusinessModelWizard from "./components/business-model-wizard";

function BusinessModelContent() {
  const [showWizard, setShowWizard] = useState(false);

  if (showWizard) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="text-center flex-1">
                <h1 className="text-3xl font-bold">AI-Powered Business Model Creator</h1>
                <p className="text-muted-foreground">
                  Create your business model canvas with AI-powered insights and recommendations
                </p>
              </div>
              <Button variant="outline" onClick={() => setShowWizard(false)}>
                Back to Canvas
              </Button>
            </div>
            <BusinessModelWizard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Business Model Canvas</h1>
              <p className="text-muted-foreground">
                Visual overview of your startup&apos;s business model and key components
              </p>
            </div>
            <Button onClick={() => setShowWizard(true)} className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Create New with AI
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="h-5 w-5" />
                  Key Partners
                </CardTitle>
                <CardDescription>Who are our key partners and suppliers?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Cloud Infrastructure Provider (AWS)</li>
                  <li>• Payment Gateway (Stripe)</li>
                  <li>• Email Service Provider (SendGrid)</li>
                  <li>• Analytics Platform (Google Analytics)</li>
                  <li>• Security Provider (Auth0)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cog className="h-5 w-5" />
                  Key Activities
                </CardTitle>
                <CardDescription>What key activities does our value proposition require?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Software Development</li>
                  <li>• Customer Support</li>
                  <li>• Platform Maintenance</li>
                  <li>• Business Model Analysis</li>
                  <li>• Data Security Management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="lg:row-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Value Propositions
                </CardTitle>
                <CardDescription>What value do we deliver to customers?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Badge variant="default" className="mb-2">Core Value</Badge>
                    <p className="text-sm">Streamlined business model visualization and analysis for startups</p>
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">Key Benefits</Badge>
                    <ul className="space-y-1 text-sm">
                      <li>• Rapid business model creation</li>
                      <li>• Architecture requirement mapping</li>
                      <li>• Cost optimization insights</li>
                      <li>• Compliance tracking</li>
                      <li>• AI-powered recommendations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Customer Relationships
                </CardTitle>
                <CardDescription>What type of relationship do we establish?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Self-service platform</li>
                  <li>• Dedicated support team</li>
                  <li>• Community forums</li>
                  <li>• Automated assistance</li>
                  <li>• Personal consultation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Customer Segments
                </CardTitle>
                <CardDescription>Who are we creating value for?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Early-stage startups</li>
                  <li>• Technical founders</li>
                  <li>• Business analysts</li>
                  <li>• Solution architects</li>
                  <li>• Small business owners</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Key Resources
                </CardTitle>
                <CardDescription>What key resources does our value proposition require?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Development team</li>
                  <li>• Cloud infrastructure</li>
                  <li>• Intellectual property</li>
                  <li>• Customer database</li>
                  <li>• Brand reputation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Channels
                </CardTitle>
                <CardDescription>Through which channels do we reach customer segments?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Badge variant="outline" className="mb-2">Direct</Badge>
                    <ul className="space-y-1 text-sm">
                      <li>• Web platform</li>
                      <li>• Direct sales</li>
                      <li>• Email marketing</li>
                    </ul>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Indirect</Badge>
                    <ul className="space-y-1 text-sm">
                      <li>• Partner networks</li>
                      <li>• App marketplaces</li>
                      <li>• Social media</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue Streams
                </CardTitle>
                <CardDescription>For what value are customers willing to pay?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Badge variant="default" className="mb-2">Subscription</Badge>
                    <p className="text-sm">Monthly/annual SaaS subscriptions</p>
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">Professional Services</Badge>
                    <p className="text-sm">Custom consulting and implementation</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Enterprise</Badge>
                    <p className="text-sm">White-label licensing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Cost Structure
                </CardTitle>
                <CardDescription>What are the most important costs in our business model?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Badge variant="destructive" className="mb-2">Fixed Costs</Badge>
                    <ul className="space-y-1 text-sm">
                      <li>• Development team salaries: $25,000/month</li>
                      <li>• Cloud infrastructure: $2,500/month</li>
                      <li>• Office & operations: $3,000/month</li>
                    </ul>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Variable Costs</Badge>
                    <ul className="space-y-1 text-sm">
                      <li>• Customer acquisition: $150/customer</li>
                      <li>• Transaction fees: 2.9% + $0.30</li>
                      <li>• Support costs: $45/customer/month</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Model Health</CardTitle>
                <CardDescription>Key metrics and validation status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Validation</span>
                    <Badge variant="default">Validated</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Product-Market Fit</span>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue Model</span>
                    <Badge variant="default">Proven</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Scalability</span>
                    <Badge variant="outline">Planning</Badge>
                  </div>
                  <Button className="w-full mt-4">
                    Export Business Model
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessModelPage() {
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
        <SiteHeader 
          title="Business Model Canvas" 
          buttonText="Export BMC"
          buttonIcon={<Download />}
        />
        <BusinessModelContent />
      </SidebarInset>
    </SidebarProvider>
  );
}