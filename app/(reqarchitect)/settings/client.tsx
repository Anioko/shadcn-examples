"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  UserManagement,
  RoleBasedAccess, 
  AuditLogs,
  SystemConfiguration,
  IntegrationSettings
} from "./components/settings-dashboard"

export default function SettingsClient() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings & Administration</h1>
                <p className="text-muted-foreground">
                  Manage users, permissions, audit logs, and system configuration
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Admin Access</Badge>
                <Button>System Health</Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="roles">Roles & Access</TabsTrigger>
                <TabsTrigger value="audit">Audit Logs</TabsTrigger>
                <TabsTrigger value="system">System Config</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-6">
                <UserManagement />
              </TabsContent>

              <TabsContent value="roles" className="space-y-6">
                <RoleBasedAccess />
              </TabsContent>

              <TabsContent value="audit" className="space-y-6">
                <AuditLogs />
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <SystemConfiguration />
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <IntegrationSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}