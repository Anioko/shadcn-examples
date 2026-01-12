"use client"

import { useState, useMemo } from "react"
import { GanttTask, GanttBoardConfig } from "@/lib/types/gantt"
import {
  GanttProvider,
  GanttSidebar,
  GanttSidebarHeader,
  GanttSidebarGroup,
  GanttSidebarItem,
  GanttTimeline,
  GanttFeatureList,
  GanttFeatureListGroup,
  GanttFeatureItem,
  GanttToday,
  GanttHeader,
  type GanttFeature,
  type GanttStatus,
} from "@/components/ui/shadcn-io/gantt"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GanttTaskEditDialog } from "./gantt-task-edit-dialog"

interface GanttBoardWrapperProps {
  config: GanttBoardConfig
  initialTasks: GanttTask[]
  onTaskMove?: (taskId: string, newStartDate: Date, newEndDate: Date) => void
  enableDatabaseSync?: boolean
  onError?: (error: string) => void
  onSuccess?: (message: string) => void
}

function getPriorityVariant(priority: string) {
  switch (priority) {
    case "critical":
    case "high":
      return "destructive"
    case "medium":
      return "default"
    default:
      return "secondary"
  }
}

export function GanttBoardWrapper({
  config,
  initialTasks,
  onTaskMove,
  enableDatabaseSync = false,
  onError,
  onSuccess
}: GanttBoardWrapperProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")
  const [selectedTask, setSelectedTask] = useState<GanttTask | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [tasks, setTasks] = useState<GanttTask[]>(initialTasks)

  // Get unique assignees for filter
  const assignees = useMemo(() => {
    const uniqueAssignees = tasks
      .filter((task) => task.assignee)
      .map((task) => task.assignee!)
      .filter(
        (assignee, index, self) =>
          index === self.findIndex((a) => a.id === assignee.id)
      )
    return uniqueAssignees
  }, [tasks])

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter

      const matchesAssignee =
        assigneeFilter === "all" ||
        (assigneeFilter === "unassigned" && !task.assignee) ||
        task.assignee?.id === assigneeFilter

      return matchesSearch && matchesPriority && matchesAssignee
    })
  }, [tasks, searchQuery, priorityFilter, assigneeFilter])

  // Transform tasks to Gantt features format
  const ganttFeatures: (GanttFeature & { lane: string })[] = useMemo(() => {
    const features = filteredTasks.map((task) => {
      // Find the lane info from config
      const lane = config.lanes.find((l) => l.id === task.status)

      // Ensure dates are Date objects
      const startDate = task.startDate instanceof Date ? task.startDate : new Date(task.startDate)
      const endDate = task.endDate instanceof Date ? task.endDate : new Date(task.endDate)

      return {
        id: task.id,
        name: task.title,
        startAt: startDate,
        endAt: endDate,
        status: {
          id: task.status,
          name: lane?.title || task.status,
          color: lane?.color || "bg-gray-100",
        } as GanttStatus,
        lane: task.status, // Group by lane/status
      }
    })

    return features
  }, [filteredTasks, config.lanes])

  // Group features by lane
  const groupedFeatures = useMemo(() => {
    const groups: Record<string, typeof ganttFeatures> = {}
    config.lanes.forEach((lane) => {
      groups[lane.id] = ganttFeatures.filter((f) => f.lane === lane.id)
    })
    return groups
  }, [ganttFeatures, config.lanes])

  // Calculate stats
  const stats = useMemo(() => {
    const total = tasks.length
    const filtered = filteredTasks.length
    const overdue = tasks.filter(
      (task) =>
        task.endDate &&
        new Date(task.endDate) < new Date() &&
        task.progress !== 100
    ).length

    return { total, filtered, overdue }
  }, [tasks, filteredTasks])

  // Handle task click
  const handleTaskClick = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setSelectedTask(task)
      setIsEditDialogOpen(true)
    }
  }

  // Handle task save
  const handleTaskSave = (updatedTask: GanttTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    )
    onSuccess?.(`Task "${updatedTask.title}" updated successfully`)
  }

  const hasActiveFilters = searchQuery !== "" || priorityFilter !== "all" || assigneeFilter !== "all"

  return (
    <div className="flex flex-col gap-4">
      {/* Header with Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {assignees.map((assignee) => (
                <SelectItem key={assignee.id} value={assignee.id}>
                  {assignee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-2 px-3 sm:px-4 bg-muted/50 rounded-lg">
        <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
          <span className="text-muted-foreground whitespace-nowrap">
            Showing <span className="font-medium">{stats.filtered}</span> of{" "}
            <span className="font-medium">{stats.total}</span> tasks
          </span>
          {stats.overdue > 0 && (
            <Badge variant="destructive" className="h-6 text-xs">
              {stats.overdue} overdue
            </Badge>
          )}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setPriorityFilter("all")
                setAssigneeFilter("all")
              }}
              className="h-6 px-2 text-xs"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Gantt Timeline */}
      <div className="border rounded-lg overflow-hidden" style={{ height: '600px' }}>
        <GanttProvider range={config.viewMode || "monthly"} zoom={100}>
          <GanttSidebar>
            <GanttSidebarHeader />
            {config.lanes.map((lane) => {
              const laneFeatures = groupedFeatures[lane.id] || []
              if (laneFeatures.length === 0) return null

              return (
                <GanttSidebarGroup key={lane.id} title={lane.title}>
                  {laneFeatures.map((feature) => (
                    <GanttSidebarItem
                      key={feature.id}
                      feature={feature}
                      className="py-2"
                      onSelectItem={(id) => handleTaskClick(id)}
                    />
                  ))}
                </GanttSidebarGroup>
              )
            })}
          </GanttSidebar>

          <GanttTimeline>
            <GanttHeader />
            <GanttFeatureList>
              {config.lanes.map((lane) => {
                const laneFeatures = groupedFeatures[lane.id] || []
                if (laneFeatures.length === 0) return null

                return (
                  <GanttFeatureListGroup key={lane.id}>
                    {laneFeatures.map((feature) => {
                      const task = filteredTasks.find((t) => t.id === feature.id)
                      return (
                        <GanttFeatureItem
                          key={feature.id}
                          {...feature}
                          onDragEnd={(dates) => {
                            onTaskMove?.(feature.id, dates.startAt, dates.endAt)
                          }}
                        >
                          <div className="relative h-full w-full group">
                            <div className="flex items-center gap-1.5 h-full w-full px-2 overflow-hidden">
                              <span className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis flex-shrink">
                                {feature.name}
                              </span>
                              {task && (
                                <Badge
                                  variant={getPriorityVariant(task.priority)}
                                  className="h-4 text-[10px] px-1 flex-shrink-0 whitespace-nowrap"
                                >
                                  {task.priority}
                                </Badge>
                              )}
                              {task?.progress !== undefined && (
                                <span className="text-[10px] text-muted-foreground flex-shrink-0 whitespace-nowrap">
                                  {task.progress}%
                                </span>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleTaskClick(feature.id)
                              }}
                              className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border rounded p-0.5 hover:bg-accent z-10"
                              title="Edit task"
                            >
                              <Edit2 className="h-3 w-3" />
                            </button>
                          </div>
                        </GanttFeatureItem>
                      )
                    })}
                  </GanttFeatureListGroup>
                )
              })}
            </GanttFeatureList>
            <GanttToday />
          </GanttTimeline>
        </GanttProvider>
      </div>

      {/* Edit Dialog */}
      <GanttTaskEditDialog
        task={selectedTask}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleTaskSave}
        assignees={assignees}
      />
    </div>
  )
}
