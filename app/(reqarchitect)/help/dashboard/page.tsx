'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle, Book, Video, MessageSquare, FileText } from 'lucide-react'
import Link from 'next/link'

export default function HelpDashboard() {
  const helpSections = [
    {
      id: 'documentation',
      title: 'Documentation',
      description: 'Comprehensive guides and framework documentation',
      icon: Book,
      color: 'bg-blue-500',
      items: '150+ articles'
    },
    {
      id: 'video-tutorials',
      title: 'Video Tutorials',
      description: 'Step-by-step video guides and walkthroughs',
      icon: Video,
      color: 'bg-green-500',
      items: '45 videos'
    },
    {
      id: 'support',
      title: 'Support Center',
      description: 'Get help from our support team',
      icon: MessageSquare,
      color: 'bg-purple-500',
      items: '24/7 support'
    },
    {
      id: 'release-notes',
      title: 'Release Notes',
      description: 'Latest updates and new features',
      icon: FileText,
      color: 'bg-orange-500',
      items: 'Latest: v2.4.0'
    }
  ]

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Help & Learning Center</h1>
            <p className="text-muted-foreground">
              Documentation, tutorials, and support resources
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documentation</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">150+</div>
              <p className="text-xs text-muted-foreground">
                Articles and guides
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Video Tutorials</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                Video guides available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Open tickets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Version</CardTitle>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">v2.4.0</div>
              <p className="text-xs text-muted-foreground">
                Latest stable release
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Help Sections */}
        <div className="grid gap-6 px-4 lg:px-6 md:grid-cols-2">
          {helpSections.map((section) => (
            <Card key={section.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${section.color} bg-opacity-10`}>
                    <section.icon className={`h-6 w-6 ${section.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{section.items}</span>
                  <Button variant="outline" size="sm">
                    Browse
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Resources */}
        <div className="grid gap-6 px-4 lg:px-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Essential guides for new users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
                  <Book className="h-4 w-4 text-muted-foreground" />
                  <span>Platform Overview</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <span>Quick Start Tutorial</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
                  <Book className="h-4 w-4 text-muted-foreground" />
                  <span>Framework Selection Guide</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <span>Navigation Basics</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
              <CardDescription>Most viewed help articles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Working with TOGAF Framework</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Setting up ISO 27001 Controls</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Creating Capability Maps</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>User Permissions & Roles</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>Our support team is here to assist you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <Button className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
                <Button variant="outline" className="flex-1">
                  <Book className="mr-2 h-4 w-4" />
                  Browse Documentation
                </Button>
                <Button variant="outline" className="flex-1">
                  <Video className="mr-2 h-4 w-4" />
                  Watch Tutorials
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Link */}
        <div className="px-4 lg:px-6">
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
