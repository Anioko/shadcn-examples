"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  MessageCircle, 
  Bell,
  Calendar,
  Video,
  Share2,
  FileText,
  Edit3,
  Eye,
  Download,
  Upload,
  Plus,
  Settings,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Heart,
  Reply,
  Forward,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  AtSign,
  Hash,
  Pin,
  Archive,
  Trash2,
  UserPlus,
  Monitor,
  Presentation,
  BarChart3,
  PieChart,
  LineChart,
  Globe,
  Lock,
  Unlock,
  Activity
} from "lucide-react"

interface CollaborationSpace {
  id: string
  name: string
  description: string
  type: "project" | "team" | "department" | "external"
  privacy: "public" | "private" | "restricted"
  members: TeamMember[]
  lastActivity: string
  messageCount: number
  documentCount: number
  status: "active" | "archived"
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  status: "online" | "away" | "offline"
  lastSeen: string
  permissions: string[]
}

interface Message {
  id: string
  author: TeamMember
  content: string
  timestamp: string
  type: "text" | "file" | "announcement" | "system"
  reactions: Reaction[]
  replies: Message[]
  attachments: Attachment[]
  mentions: string[]
}

interface Reaction {
  emoji: string
  users: TeamMember[]
  count: number
}

interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

interface Notification {
  id: string
  type: "mention" | "reply" | "assignment" | "deadline" | "update"
  title: string
  description: string
  timestamp: string
  read: boolean
  actionUrl: string
  priority: "low" | "medium" | "high"
}

interface StakeholderDashboard {
  stakeholder: string
  role: string
  interests: string[]
  updateFrequency: "daily" | "weekly" | "monthly"
  preferredChannels: string[]
  customMetrics: DashboardMetric[]
}

interface DashboardMetric {
  name: string
  value: number
  unit: string
  trend: "up" | "down" | "stable"
  description: string
}

export function CollaborationClient() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedSpace, setSelectedSpace] = useState<string>("project-alpha")
  
  const [collaborationSpaces] = useState<CollaborationSpace[]>([
    {
      id: "project-alpha",
      name: "Project Alpha",
      description: "Strategic initiative for market expansion",
      type: "project",
      privacy: "private",
      members: [
        {
          id: "user-1",
          name: "Sarah Chen",
          email: "sarah.chen@company.com",
          role: "Project Manager",
          avatar: "/avatars/sarah.jpg",
          status: "online",
          lastSeen: "now",
          permissions: ["admin", "edit", "comment"]
        },
        {
          id: "user-2", 
          name: "Mike Johnson",
          email: "mike.johnson@company.com",
          role: "Lead Developer",
          avatar: "/avatars/mike.jpg",
          status: "away",
          lastSeen: "5 minutes ago",
          permissions: ["edit", "comment"]
        }
      ],
      lastActivity: "2 minutes ago",
      messageCount: 247,
      documentCount: 18,
      status: "active"
    },
    {
      id: "leadership-team",
      name: "Leadership Team",
      description: "Executive leadership discussions",
      type: "team",
      privacy: "restricted",
      members: [
        {
          id: "user-3",
          name: "Emma Wilson",
          email: "emma.wilson@company.com", 
          role: "CEO",
          avatar: "/avatars/emma.jpg",
          status: "online",
          lastSeen: "now",
          permissions: ["admin", "edit", "comment"]
        }
      ],
      lastActivity: "1 hour ago",
      messageCount: 89,
      documentCount: 12,
      status: "active"
    }
  ])

  const [notifications] = useState<Notification[]>([
    {
      id: "notif-1",
      type: "mention",
      title: "You were mentioned in Project Alpha",
      description: "Sarah Chen mentioned you in a discussion about timeline updates",
      timestamp: "5 minutes ago",
      read: false,
      actionUrl: "/collaboration/project-alpha",
      priority: "medium"
    },
    {
      id: "notif-2",
      type: "deadline",
      title: "Upcoming deadline: Q4 Strategy Review",
      description: "Strategic planning review is due in 2 days",
      timestamp: "1 hour ago",
      read: false,
      actionUrl: "/strategic-planning",
      priority: "high"
    },
    {
      id: "notif-3",
      type: "update",
      title: "Financial model updated",
      description: "New scenario analysis has been added to the primary model",
      timestamp: "3 hours ago",
      read: true,
      actionUrl: "/financial-modeling",
      priority: "low"
    }
  ])

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="spaces" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Spaces
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="stakeholders" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Stakeholders
          </TabsTrigger>
          <TabsTrigger value="presentations" className="flex items-center gap-2">
            <Presentation className="h-4 w-4" />
            Presentations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <CollaborationOverview spaces={collaborationSpaces} notifications={notifications} />
        </TabsContent>

        <TabsContent value="spaces" className="space-y-6">
          <CollaborationSpaces spaces={collaborationSpaces} selectedSpace={selectedSpace} />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationCenter notifications={notifications} />
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <DocumentManagement />
        </TabsContent>

        <TabsContent value="stakeholders" className="space-y-6">
          <StakeholderDashboards />
        </TabsContent>

        <TabsContent value="presentations" className="space-y-6">
          <PresentationBuilder />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CollaborationOverview({ spaces, notifications }: { spaces: CollaborationSpace[], notifications: Notification[] }) {
  const unreadNotifications = notifications.filter(n => !n.read).length
  const activeSpaces = spaces.filter(s => s.status === "active").length
  const totalMembers = spaces.reduce((acc, space) => acc + space.members.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Collaboration & Communication</h2>
          <p className="text-muted-foreground">Real-time collaboration platform with integrated workflows</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Preferences
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Space
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Spaces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSpaces}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3 text-blue-600" />
              {totalMembers} total members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadNotifications}</div>
            <p className="text-xs text-muted-foreground">
              {notifications.filter(n => n.priority === "high").length} high priority
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Activity className="h-3 w-3 text-green-600" />
              +12% vs yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collaboration Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92%</div>
            <p className="text-xs text-muted-foreground">
              Team engagement
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/sarah.jpg" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium text-sm">Sarah Chen updated the project timeline</div>
                  <div className="text-xs text-muted-foreground">Project Alpha • 5 minutes ago</div>
                </div>
                <Badge variant="outline" className="text-xs">Update</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/mike.jpg" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium text-sm">Mike Johnson shared a document</div>
                  <div className="text-xs text-muted-foreground">Architecture Review.pdf • 15 minutes ago</div>
                </div>
                <Badge variant="outline" className="text-xs">Document</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/emma.jpg" />
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium text-sm">Emma Wilson started a new discussion</div>
                  <div className="text-xs text-muted-foreground">Leadership Team • 1 hour ago</div>
                </div>
                <Badge variant="outline" className="text-xs">Discussion</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Video className="h-6 w-6" />
                <span className="text-sm">Start Meeting</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="h-6 w-6" />
                <span className="text-sm">New Document</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Invite Members</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Presentation className="h-6 w-6" />
                <span className="text-sm">Create Presentation</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Collaboration Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Team Collaboration Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Real-time insights into team communication patterns and engagement
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="p-3 border rounded">
                  <div className="font-medium">Response Time</div>
                  <div className="text-2xl font-bold text-blue-600">12m</div>
                  <div className="text-sm text-muted-foreground">Avg</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">Engagement</div>
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-muted-foreground">Active</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">Satisfaction</div>
                  <div className="text-2xl font-bold text-purple-600">4.6</div>
                  <div className="text-sm text-muted-foreground">/5.0</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CollaborationSpaces({ spaces, selectedSpace }: { spaces: CollaborationSpace[], selectedSpace: string }) {
  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case "public": return Globe
      case "private": return Lock
      case "restricted": return Unlock
      default: return Lock
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Collaboration Spaces</h2>
          <p className="text-muted-foreground">Real-time communication and document collaboration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Space
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium">Your Spaces</h3>
          {spaces.map((space) => {
            const PrivacyIcon = getPrivacyIcon(space.privacy)
            return (
              <Card key={space.id} className={`cursor-pointer transition-colors ${selectedSpace === space.id ? 'ring-2 ring-blue-500' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{space.name}</div>
                    <div className="flex items-center gap-1">
                      <PrivacyIcon className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="outline" className="text-xs">{space.type}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{space.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{space.members.length} members</span>
                    <span>{space.lastActivity}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="secondary" className="text-xs">{space.messageCount} messages</Badge>
                    <Badge variant="secondary" className="text-xs">{space.documentCount} docs</Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Project Alpha</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Real-time Collaboration</h3>
                  <p className="text-muted-foreground mb-4">
                    Interactive chat with real-time co-editing, file sharing, and @mentions
                  </p>
                  <div className="max-w-md mx-auto space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded border">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">Sarah Chen</div>
                        <div className="text-xs text-muted-foreground">Timeline updated for Q4 deliverables...</div>
                      </div>
                      <div className="text-xs text-muted-foreground">2m</div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded border border-blue-200">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>MJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">Mike Johnson</div>
                        <div className="text-xs text-muted-foreground">@you Great progress on the architecture review!</div>
                      </div>
                      <div className="text-xs text-muted-foreground">5m</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function NotificationCenter({ notifications }: { notifications: Notification[] }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-200 bg-red-50"
      case "medium": return "border-orange-200 bg-orange-50"
      case "low": return "border-blue-200 bg-blue-50"
      default: return "border-gray-200 bg-gray-50"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "mention": return AtSign
      case "reply": return Reply
      case "assignment": return CheckCircle
      case "deadline": return Clock
      case "update": return Activity
      default: return Bell
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Notification Center</h2>
          <p className="text-muted-foreground">Smart notifications and workflow alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.filter(n => !n.read).length}</div>
            <p className="text-xs text-muted-foreground">New notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{notifications.filter(n => n.priority === "high").length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mentions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.filter(n => n.type === "mention").length}</div>
            <p className="text-xs text-muted-foreground">Direct mentions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8m</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => {
              const TypeIcon = getTypeIcon(notification.type)
              return (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded border ${getPriorityColor(notification.priority)} ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <TypeIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-sm">{notification.title}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{notification.priority}</Badge>
                          <div className="text-xs text-muted-foreground">{notification.timestamp}</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Mark Read</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DocumentManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Document Management</h2>
          <p className="text-muted-foreground">Real-time collaborative editing and version control</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Document
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Collaborative Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Edit3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Collaborative Document Editor</h3>
              <p className="text-muted-foreground mb-4">
                Real-time co-editing with comments, suggestions, and version history
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="p-3 border rounded bg-white">
                  <div className="font-medium">Active Editors</div>
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-muted-foreground">Online now</div>
                </div>
                <div className="p-3 border rounded bg-white">
                  <div className="font-medium">Comments</div>
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-muted-foreground">Unresolved</div>
                </div>
                <div className="p-3 border rounded bg-white">
                  <div className="font-medium">Versions</div>
                  <div className="text-2xl font-bold text-purple-600">7</div>
                  <div className="text-sm text-muted-foreground">Auto-saved</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Q4 Strategy Document</div>
                  <div className="text-xs text-muted-foreground">Updated 5 minutes ago by Sarah Chen</div>
                </div>
                <Button variant="outline" size="sm">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded">
                <FileText className="h-8 w-8 text-green-600" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Architecture Review</div>
                  <div className="text-xs text-muted-foreground">Updated 1 hour ago by Mike Johnson</div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded">
                <FileText className="h-8 w-8 text-purple-600" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Financial Projections</div>
                  <div className="text-xs text-muted-foreground">Updated 2 hours ago by Emma Wilson</div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="h-6 w-6" />
                <span className="text-sm">Project Plan</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="h-6 w-6" />
                <span className="text-sm">Status Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Meeting Notes</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <PieChart className="h-6 w-6" />
                <span className="text-sm">Analysis</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StakeholderDashboards() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Stakeholder Dashboards</h2>
          <p className="text-muted-foreground">Customized reporting and communication for different stakeholders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Dashboard
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Executive Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Strategic Progress</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              
              <div className="flex justify-between">
                <span className="text-sm">Budget Utilization</span>
                <span className="font-medium">67%</span>
              </div>
              <Progress value={67} className="h-2" />
              
              <div className="flex justify-between">
                <span className="text-sm">Risk Level</span>
                <Badge variant="secondary">Low</Badge>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              <Eye className="h-4 w-4 mr-2" />
              View Full Dashboard
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Team Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Sprint Progress</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
              
              <div className="flex justify-between">
                <span className="text-sm">Issues Resolved</span>
                <span className="font-medium">24/31</span>
              </div>
              <Progress value={77} className="h-2" />
              
              <div className="flex justify-between">
                <span className="text-sm">Team Velocity</span>
                <Badge variant="default">High</Badge>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              <Activity className="h-4 w-4 mr-2" />
              View Team Metrics
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Investor Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Revenue Growth</span>
                <span className="font-medium text-green-600">+15.2%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm">Market Share</span>
                <span className="font-medium">14.2%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm">Valuation</span>
                <span className="font-medium">$425M</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              <BarChart3 className="h-4 w-4 mr-2" />
              Financial Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stakeholder Communication Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded">
                <div className="font-medium mb-2">C-Level Executives</div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>• Weekly executive summary</div>
                  <div>• Monthly strategic review</div>
                  <div>• Real-time critical alerts</div>
                </div>
                <Badge variant="outline" className="mt-2">Weekly Updates</Badge>
              </div>
              
              <div className="p-4 border rounded">
                <div className="font-medium mb-2">Project Managers</div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>• Daily progress updates</div>
                  <div>• Risk and issue tracking</div>
                  <div>• Resource utilization</div>
                </div>
                <Badge variant="outline" className="mt-2">Daily Updates</Badge>
              </div>
              
              <div className="p-4 border rounded">
                <div className="font-medium mb-2">External Investors</div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>• Quarterly financial reports</div>
                  <div>• Strategic milestone updates</div>
                  <div>• Market performance data</div>
                </div>
                <Badge variant="outline" className="mt-2">Monthly Updates</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PresentationBuilder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Presentation Builder</h2>
          <p className="text-muted-foreground">AI-powered presentation creation with dynamic data integration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Template
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Presentation
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Smart Presentation Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Presentation className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI-Powered Presentation Creation</h3>
              <p className="text-muted-foreground mb-4">
                Generate professional presentations with live data integration and smart templates
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="p-3 border rounded bg-white">
                  <div className="font-medium">Templates</div>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-muted-foreground">Professional</div>
                </div>
                <div className="p-3 border rounded bg-white">
                  <div className="font-medium">Data Sources</div>
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-muted-foreground">Connected</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Presentations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded">
                <Presentation className="h-8 w-8 text-blue-600" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Q4 Strategy Review</div>
                  <div className="text-xs text-muted-foreground">24 slides • Updated 1 hour ago</div>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded">
                <Presentation className="h-8 w-8 text-green-600" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Board Meeting Deck</div>
                  <div className="text-xs text-muted-foreground">18 slides • Updated 2 days ago</div>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded">
                <Presentation className="h-8 w-8 text-purple-600" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Product Roadmap</div>
                  <div className="text-xs text-muted-foreground">32 slides • Updated 1 week ago</div>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Presentation Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="h-6 w-6" />
                <span className="text-sm">Executive Summary</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <LineChart className="h-6 w-6" />
                <span className="text-sm">Financial Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Team Update</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Globe className="h-6 w-6" />
                <span className="text-sm">Market Analysis</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}