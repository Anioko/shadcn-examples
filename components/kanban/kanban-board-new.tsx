"use client"

import { useState, useMemo, useCallback } from "react"
import { KanbanCard, KanbanBoardConfig } from "@/lib/types/kanban"
import * as Kanban from "./kanban"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarDays, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { updateKanbanCard } from "@/lib/kanban-helpers"

interface KanbanBoardProps {
  config: KanbanBoardConfig
  initialCards: KanbanCard[]
  onCardMove?: (cardId: string, newStatus: string) => void
  enableDatabaseSync?: boolean // Enable API updates on drag-drop
  onError?: (error: string) => void // Optional error handler
  onSuccess?: (message: string) => void // Optional success handler
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

function formatDate(date?: Date | string) {
  if (!date) return undefined
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function KanbanBoardNew({
  config,
  initialCards,
  onCardMove,
  enableDatabaseSync = false,
  onError,
  onSuccess
}: KanbanBoardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")

  // Get unique assignees for filter
  const assignees = useMemo(() => {
    const uniqueAssignees = initialCards
      .filter((card) => card.assignee)
      .map((card) => card.assignee!)
      .filter(
        (assignee, index, self) =>
          index === self.findIndex((a) => a.id === assignee.id)
      )
    return uniqueAssignees
  }, [initialCards])

  // Filter cards
  const filteredCards = useMemo(() => {
    return initialCards.filter((card) => {
      const matchesSearch =
        searchQuery === "" ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesPriority =
        priorityFilter === "all" || card.priority === priorityFilter

      const matchesAssignee =
        assigneeFilter === "all" ||
        (assigneeFilter === "unassigned" && !card.assignee) ||
        card.assignee?.id === assigneeFilter

      return matchesSearch && matchesPriority && matchesAssignee
    })
  }, [initialCards, searchQuery, priorityFilter, assigneeFilter])

  // Group cards by status
  const [columns, setColumns] = useState<Record<string, KanbanCard[]>>(() => {
    const grouped: Record<string, KanbanCard[]> = {}
    config.columns.forEach((column) => {
      grouped[column.status] = filteredCards.filter((card) => card.status === column.status)
    })
    return grouped
  })

  // Update columns when filters change
  useMemo(() => {
    const grouped: Record<string, KanbanCard[]> = {}
    config.columns.forEach((column) => {
      grouped[column.status] = filteredCards.filter((card) => card.status === column.status)
    })
    setColumns(grouped)
  }, [filteredCards, config.columns])

  // Handle column change from drag-and-drop
  const handleColumnsChange = useCallback(async (newColumns: Record<string, KanbanCard[]>) => {
    // Find what changed
    const oldColumnEntries = Object.entries(columns)
    const newColumnEntries = Object.entries(newColumns)

    // Find the card that moved
    let movedCard: KanbanCard | null = null
    let newStatus: string | null = null
    let newPosition: number | null = null

    for (const [status, newCards] of newColumnEntries) {
      const oldCards = columns[status] || []

      // Check if a card was added to this column
      for (let i = 0; i < newCards.length; i++) {
        const card = newCards[i]
        const wasInOldColumn = oldCards.some(c => c.id === card.id)

        if (!wasInOldColumn) {
          movedCard = card
          newStatus = status
          newPosition = i
          break
        }
      }

      if (movedCard) break
    }

    // Update local state immediately for smooth UX
    setColumns(newColumns)

    // If a card was moved and database sync is enabled, update the database
    if (movedCard && newStatus && enableDatabaseSync) {
      const result = await updateKanbanCard(
        config.frameworkId,
        movedCard.id,
        movedCard.source || 'task',
        {
          status: newStatus,
          columnPosition: newPosition || 0,
        }
      )

      if (result.success) {
        const message = `Card "${movedCard.title}" moved to ${newStatus}`
        console.log(`✓ ${message}`)
        onSuccess?.(message)

        // Call custom onCardMove callback if provided
        onCardMove?.(movedCard.id, newStatus)
      } else {
        // Revert on error
        setColumns(columns)
        const errorMessage = result.error || "An error occurred while updating the card"
        console.error(`✗ Failed to move card: ${errorMessage}`)
        onError?.(errorMessage)
      }
    } else if (movedCard && newStatus) {
      // Just call the callback if database sync is disabled
      onCardMove?.(movedCard.id, newStatus)
    }
  }, [columns, config.frameworkId, enableDatabaseSync, onCardMove, onSuccess, onError])

  // Calculate stats
  const stats = useMemo(() => {
    const total = initialCards.length
    const filtered = filteredCards.length
    const overdue = initialCards.filter(
      (card) =>
        card.dueDate &&
        new Date(card.dueDate) < new Date() &&
        card.status !== "done" &&
        card.status !== "compliant"
    ).length

    return { total, filtered, overdue }
  }, [initialCards, filteredCards])

  const hasActiveFilters = searchQuery !== "" || priorityFilter !== "all" || assigneeFilter !== "all"

  return (
    <div className="flex flex-col gap-4">
      {/* Header with Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cards..."
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
            <span className="font-medium">{stats.total}</span> items
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

      {/* Kanban Board */}
      <Kanban.Root
        value={columns}
        onValueChange={handleColumnsChange}
        getItemValue={(item) => item.id}
      >
        <Kanban.Board className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {config.columns
            .sort((a, b) => a.order - b.order)
            .map((column) => {
              const columnCards = columns[column.status] || []
              const isAtLimit = column.limit && columnCards.length >= column.limit
              const isOverLimit = column.limit && columnCards.length > column.limit

              return (
                <Kanban.Column key={column.status} value={column.status}>
                  <div className="flex flex-col gap-3 h-full">
                    {/* Column Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold">{column.title}</h3>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "pointer-events-none rounded-sm h-5 px-1.5 text-[11px]",
                            isOverLimit && "bg-red-100 text-red-700 border-red-300",
                            isAtLimit && !isOverLimit && "bg-yellow-100 text-yellow-700 border-yellow-300"
                          )}
                        >
                          {columnCards.length}
                          {column.limit && ` / ${column.limit}`}
                        </Badge>
                      </div>
                    </div>

                    {/* Column Description */}
                    {column.description && (
                      <p className="text-xs text-muted-foreground">
                        {column.description}
                      </p>
                    )}

                    {/* Cards */}
                    <div className="flex flex-col gap-2 flex-1 overflow-y-auto max-h-[calc(100vh-320px)]">
                      {columnCards.length === 0 ? (
                        <div className="flex items-center justify-center h-32 text-sm text-muted-foreground border-2 border-dashed rounded-lg">
                          No items
                        </div>
                      ) : (
                        columnCards.map((card) => (
                          <Kanban.Item key={card.id} value={card.id} asHandle asChild>
                            <div className="bg-card rounded-md border p-3 shadow-sm hover:shadow-md transition-shadow cursor-move">
                              <div className="flex flex-col gap-2">
                                {/* Title & Priority */}
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="line-clamp-2 text-sm font-medium flex-1">
                                    {card.title}
                                  </h4>
                                  <Badge
                                    variant={getPriorityVariant(card.priority)}
                                    className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize shrink-0"
                                  >
                                    {card.priority}
                                  </Badge>
                                </div>

                                {/* Description */}
                                {card.description && (
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {card.description}
                                  </p>
                                )}

                                {/* Tags */}
                                {card.tags && card.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {card.tags.slice(0, 3).map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="outline"
                                        className="h-5 rounded-sm px-1.5 text-[10px]"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                    {card.tags.length > 3 && (
                                      <Badge
                                        variant="outline"
                                        className="h-5 rounded-sm px-1.5 text-[10px]"
                                      >
                                        +{card.tags.length - 3}
                                      </Badge>
                                    )}
                                  </div>
                                )}

                                {/* Footer: Assignee & Due Date */}
                                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t">
                                  {card.assignee ? (
                                    <div className="flex items-center gap-1.5">
                                      <Avatar className="h-5 w-5">
                                        <AvatarFallback className="text-[10px]">
                                          {card.assignee.avatar || card.assignee.name.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="line-clamp-1 text-[11px]">
                                        {card.assignee.name}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-[11px]">Unassigned</span>
                                  )}

                                  {card.dueDate && (
                                    <div className="flex items-center gap-1">
                                      <CalendarDays className="h-3 w-3" />
                                      <time className="text-[10px] tabular-nums">
                                        {formatDate(card.dueDate)}
                                      </time>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Kanban.Item>
                        ))
                      )}
                    </div>
                  </div>
                </Kanban.Column>
              )
            })}
        </Kanban.Board>

        <Kanban.Overlay>
          <div className="bg-primary/10 size-full rounded-md border-2 border-primary" />
        </Kanban.Overlay>
      </Kanban.Root>
    </div>
  )
}
