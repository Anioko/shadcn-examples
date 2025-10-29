"use client"

import { useState, useMemo } from "react"
import { KanbanCard, KanbanBoardConfig } from "@/lib/types/kanban"
import { KanbanColumn } from "./kanban-column"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, Plus, SlidersHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface KanbanBoardProps {
  config: KanbanBoardConfig
  initialCards: KanbanCard[]
  onCardMove?: (cardId: string, newStatus: string) => void // Optional callback
}

export function KanbanBoard({ config, initialCards, onCardMove }: KanbanBoardProps) {
  const [cards, setCards] = useState<KanbanCard[]>(initialCards)
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")

  // Handle card movement between columns
  const handleCardDrop = (cardId: string, newStatus: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? { ...card, status: newStatus, updatedAt: new Date() }
          : card
      )
    )

    // Log card movement
    console.log(`Card ${cardId} moved to ${newStatus}`)

    // Call parent callback if provided
    if (onCardMove) {
      onCardMove(cardId, newStatus)
    }

    // TODO: Implement API call to persist card movement
    // Example: await fetch(`/api/kanban/cards/${cardId}`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) })
  }

  // Get unique assignees for filter
  const assignees = useMemo(() => {
    const uniqueAssignees = cards
      .filter((card) => card.assignee)
      .map((card) => card.assignee!)
      .filter(
        (assignee, index, self) =>
          index === self.findIndex((a) => a.id === assignee.id)
      )
    return uniqueAssignees
  }, [cards])

  // Filter cards based on search and filters
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )

      // Priority filter
      const matchesPriority =
        priorityFilter === "all" || card.priority === priorityFilter

      // Assignee filter
      const matchesAssignee =
        assigneeFilter === "all" ||
        (assigneeFilter === "unassigned" && !card.assignee) ||
        card.assignee?.id === assigneeFilter

      return matchesSearch && matchesPriority && matchesAssignee
    })
  }, [cards, searchQuery, priorityFilter, assigneeFilter])

  // Group filtered cards by status
  const cardsByStatus = useMemo(() => {
    const groups: Record<string, KanbanCard[]> = {}
    config.columns.forEach((column) => {
      groups[column.status] = filteredCards.filter(
        (card) => card.status === column.status
      )
    })
    return groups
  }, [filteredCards, config.columns])

  // Calculate stats
  const stats = useMemo(() => {
    const total = cards.length
    const filtered = filteredCards.length
    const overdue = cards.filter(
      (card) => card.dueDate && new Date(card.dueDate) < new Date() &&
      card.status !== "done" && card.status !== "compliant"
    ).length

    return { total, filtered, overdue }
  }, [cards, filteredCards])

  // Check if any filters are active
  const hasActiveFilters = searchQuery !== "" || priorityFilter !== "all" || assigneeFilter !== "all"

  return (
    <div className="space-y-4">
      {/* Header with Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
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

          <Button variant="outline" size="icon" className="hidden sm:flex">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
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

        <Button size="sm" className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span className="sm:inline">Add Card</span>
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-3 sm:gap-4">
          {config.columns
            .sort((a, b) => a.order - b.order)
            .map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                cards={cardsByStatus[column.status] || []}
                onDrop={handleCardDrop}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
