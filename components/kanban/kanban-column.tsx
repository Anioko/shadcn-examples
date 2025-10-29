"use client"

import { useState } from "react"
import { KanbanCard as KanbanCardType, KanbanColumn as KanbanColumnType } from "@/lib/types/kanban"
import { KanbanCard } from "./kanban-card"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface KanbanColumnProps {
  column: KanbanColumnType
  cards: KanbanCardType[]
  onDrop: (cardId: string, newStatus: string) => void
}

export function KanbanColumn({ column, cards, onDrop }: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", cardId)
    setDraggingCardId(cardId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const cardId = e.dataTransfer.getData("text/plain")
    if (cardId) {
      onDrop(cardId, column.status)
    }
    setDraggingCardId(null)
  }

  const handleDragEnd = () => {
    setDraggingCardId(null)
  }

  // Show WIP limit warning
  const isAtLimit = column.limit && cards.length >= column.limit
  const isOverLimit = column.limit && cards.length > column.limit

  return (
    <div className="flex-shrink-0 w-[calc(100vw-3rem)] sm:w-80 md:w-64 lg:w-72 xl:w-80">
      <Card className={cn("flex flex-col h-full", column.color)}>
        {/* Column Header */}
        <div className="p-4 border-b bg-background/50">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold">{column.title}</h3>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  isOverLimit && "bg-red-100 text-red-700 border-red-300",
                  isAtLimit && !isOverLimit && "bg-yellow-100 text-yellow-700 border-yellow-300"
                )}
              >
                {cards.length}
                {column.limit && ` / ${column.limit}`}
              </Badge>
            </div>
          </div>
          {column.description && (
            <p className="text-xs text-muted-foreground">
              {column.description}
            </p>
          )}
        </div>

        {/* Drop Zone */}
        <div
          className={cn(
            "flex-1 p-3 transition-colors",
            isDragOver && "bg-primary/10 ring-2 ring-primary ring-inset"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-3 pr-3">
              {cards.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-sm text-muted-foreground border-2 border-dashed rounded-lg">
                  {isDragOver ? "Drop here" : "No items"}
                </div>
              ) : (
                cards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id)}
                    onDragEnd={handleDragEnd}
                    className="cursor-move"
                  >
                    <KanbanCard
                      card={card}
                      isDragging={draggingCardId === card.id}
                    />
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </Card>
    </div>
  )
}
