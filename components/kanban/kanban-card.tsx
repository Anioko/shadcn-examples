"use client"

import { KanbanCard as KanbanCardType } from "@/lib/types/kanban"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, isPast, isToday, isTomorrow } from "date-fns"

interface KanbanCardProps {
  card: KanbanCardType
  isDragging?: boolean
}

const priorityStyles = {
  low: "bg-slate-100 text-slate-700 border-slate-300",
  medium: "bg-blue-100 text-blue-700 border-blue-300",
  high: "bg-orange-100 text-orange-700 border-orange-300",
  critical: "bg-red-100 text-red-700 border-red-300",
}

export function KanbanCard({ card, isDragging = false }: KanbanCardProps) {
  const dueDateStatus = card.dueDate ? (
    isPast(card.dueDate) && card.status !== "done" && card.status !== "compliant" ? "overdue" :
    isToday(card.dueDate) ? "today" :
    isTomorrow(card.dueDate) ? "tomorrow" :
    "upcoming"
  ) : null

  return (
    <Card
      className={cn(
        "cursor-move hover:shadow-md transition-shadow",
        isDragging && "opacity-50 rotate-2"
      )}
      draggable
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium leading-tight line-clamp-2">
            {card.title}
          </h4>
          <Badge
            variant="outline"
            className={cn("shrink-0 text-xs", priorityStyles[card.priority])}
          >
            {card.priority}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-3">
        {/* Description */}
        {card.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {card.description}
          </p>
        )}

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {card.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {card.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{card.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Metadata (framework-specific) */}
        {card.metadata && (
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {card.metadata.type && (
              <span className="flex items-center gap-1">
                <span className="font-medium">Type:</span> {card.metadata.type}
              </span>
            )}
            {card.metadata.storyPoints && (
              <span className="flex items-center gap-1">
                <span className="font-medium">SP:</span> {card.metadata.storyPoints}
              </span>
            )}
            {card.metadata.controlId && (
              <span className="flex items-center gap-1">
                <span className="font-medium">Control:</span> {card.metadata.controlId}
              </span>
            )}
          </div>
        )}

        {/* Footer: Assignee & Due Date */}
        <div className="flex items-center justify-between pt-2 border-t">
          {/* Assignee */}
          <div className="flex items-center gap-2">
            {card.assignee ? (
              <>
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {card.assignee.avatar || card.assignee.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {card.assignee.name}
                </span>
              </>
            ) : (
              <span className="text-xs text-muted-foreground italic">
                Unassigned
              </span>
            )}
          </div>

          {/* Due Date */}
          {card.dueDate && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs",
                dueDateStatus === "overdue" && "text-red-600 font-medium",
                dueDateStatus === "today" && "text-orange-600 font-medium",
                dueDateStatus === "tomorrow" && "text-yellow-600",
                dueDateStatus === "upcoming" && "text-muted-foreground"
              )}
            >
              <Calendar className="h-3 w-3" />
              <span>{format(card.dueDate, "MMM d")}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
