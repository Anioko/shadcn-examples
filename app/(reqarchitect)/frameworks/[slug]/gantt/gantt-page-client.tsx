"use client"

import dynamic from "next/dynamic"
import { GanttTask, GanttBoardConfig } from "@/lib/types/gantt"

const GanttBoardWrapper = dynamic(
  () => import("@/components/gantt/gantt-board-wrapper").then((mod) => ({ default: mod.GanttBoardWrapper })),
  { ssr: false }
)

interface GanttPageClientProps {
  config: GanttBoardConfig
  tasks: GanttTask[]
}

export function GanttPageClient({ config, tasks }: GanttPageClientProps) {
  return (
    <GanttBoardWrapper
      config={config}
      initialTasks={tasks}
    />
  )
}
