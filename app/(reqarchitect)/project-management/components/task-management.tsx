"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TaskManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Comprehensive task management interface with Kanban boards, task dependencies, and progress tracking</p>
      </CardContent>
    </Card>
  )
}

export function SprintPlanning() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sprint Planning</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Agile sprint planning with velocity tracking, story points, and burn-down charts</p>
      </CardContent>
    </Card>
  )
}

export function ResourceCapacity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Capacity</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Team capacity planning, resource allocation, and workload balancing</p>
      </CardContent>
    </Card>
  )
}

export function TimeTracking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Tracking</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Time entry, timesheet management, and project profitability analysis</p>
      </CardContent>
    </Card>
  )
}

export function IssueTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue Tracker</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Bug tracking, issue triage, priority management, and resolution workflows</p>
      </CardContent>
    </Card>
  )
}