"use client"

import * as React from "react"
import {
  GanttProvider,
  GanttSidebar,
  GanttSidebarGroup,
  GanttSidebarItem,
  GanttTimeline,
  GanttHeader,
  GanttFeatureList,
  GanttFeatureListGroup,
  GanttFeatureItem,
  GanttToday,
  type GanttFeature,
} from "@/components/ui/gantt"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RoadmapBoardConfig } from "@/lib/types/roadmap"
import { RoadmapItem } from "@/lib/types/roadmap"
import { PlusIcon } from "lucide-react"

interface RoadmapClientProps {
  config: RoadmapBoardConfig
  items: RoadmapItem[]
}

export function RoadmapClient({ config, items }: RoadmapClientProps) {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null)

  // Convert RoadmapItem to GanttFeature format
  const ganttFeatures: GanttFeature[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    startAt: item.startAt,
    endAt: item.endAt,
    status: item.status,
    lane: item.lane,
  }))

  // Group features by their group
  const groupedFeatures = items.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = []
    }
    acc[item.group].push(item)
    return acc
  }, {} as Record<string, RoadmapItem[]>)

  // Sort groups by config order
  const sortedGroups = Object.keys(groupedFeatures).sort((a, b) => {
    const groupA = config.groups.find(g => g.id === a)
    const groupB = config.groups.find(g => g.id === b)
    return (groupA?.order || 999) - (groupB?.order || 999)
  })

  const handleViewItem = (id: string) => {
    setSelectedItem(id)
    const item = items.find((i) => i.id === id)
    if (item) {
      console.log("View item:", item)
      // TODO: Open item details modal/drawer
    }
  }

  const handleMoveItem = (id: string, startAt: Date, endAt: Date | null) => {
    console.log(`Move item ${id} from ${startAt} to ${endAt}`)
    // TODO: Implement API call to update item dates
  }

  const handleAddItem = (date: Date) => {
    console.log(`Add item at ${date.toISOString()}`)
    // TODO: Implement create item modal
  }

  // Calculate statistics
  const stats = {
    inProgress: items.filter((i) => i.status.id === "in-progress").length,
    planning: items.filter((i) => i.status.id === "planning").length,
    completed: items.filter((i) => i.status.id === "completed").length,
    total: items.length,
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Active items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.planning}</div>
            <p className="text-xs text-muted-foreground">Upcoming work</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Finished items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All roadmap items</p>
          </CardContent>
        </Card>
      </div>

      {/* Gantt Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>2024 Roadmap Timeline</CardTitle>
              <CardDescription>
                Drag items to adjust dates. Click to view details.
              </CardDescription>
            </div>
            <Button size="sm">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[600px] overflow-hidden">
            <GanttProvider
              className="rounded-lg border w-full h-full"
              onAddItem={handleAddItem}
              range={config.defaultRange || "monthly"}
              zoom={100}
            >
              <GanttSidebar>
                {sortedGroups.map((groupId) => {
                  const groupConfig = config.groups.find(g => g.id === groupId)
                  const groupItems = groupedFeatures[groupId]
                  
                  return (
                    <GanttSidebarGroup key={groupId} name={groupConfig?.name || groupId}>
                      {groupItems.map((item) => (
                        <GanttSidebarItem
                          feature={{
                            id: item.id,
                            name: item.name,
                            startAt: item.startAt,
                            endAt: item.endAt,
                            status: item.status,
                            lane: item.lane,
                          }}
                          key={item.id}
                          onSelectItem={handleViewItem}
                        />
                      ))}
                    </GanttSidebarGroup>
                  )
                })}
              </GanttSidebar>

              <GanttTimeline>
                <GanttHeader />
                <GanttFeatureList>
                  {sortedGroups.map((groupId) => {
                    const groupItems = groupedFeatures[groupId]
                    
                    return (
                      <GanttFeatureListGroup key={groupId}>
                        {groupItems.map((item) => (
                          <div className="flex" key={item.id}>
                            <GanttFeatureItem
                              id={item.id}
                              name={item.name}
                              startAt={item.startAt}
                              endAt={item.endAt}
                              status={item.status}
                              lane={item.lane}
                              onMove={handleMoveItem}
                            >
                              <div className="flex w-full items-center gap-2 px-2">
                                <p className="flex-1 truncate text-left text-xs">
                                  {item.name}
                                </p>
                                <span className="shrink-0 rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-medium">
                                  {item.priority}
                                </span>
                              </div>
                            </GanttFeatureItem>
                          </div>
                        ))}
                      </GanttFeatureListGroup>
                    )
                  })}
                </GanttFeatureList>
                <GanttToday />
              </GanttTimeline>
            </GanttProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
