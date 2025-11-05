"use client"

import { IconPlus, IconChevronDown } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FrameworkGrandchild } from "@/lib/framework-config"
import { singularize } from "@/lib/utils"

interface DashboardHeaderProps {
  frameworkName: string
  grandchildren: FrameworkGrandchild[]
}

export function DashboardHeader({ frameworkName, grandchildren }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 lg:px-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{frameworkName} Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Manage and track all {frameworkName.toLowerCase()} components
        </p>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <IconPlus className="h-4 w-4" />
              <span className="hidden lg:inline">Add {frameworkName}</span>
              <span className="lg:hidden">Add</span>
              <IconChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {grandchildren.map((grandchild) => (
              <DropdownMenuItem key={grandchild.id}>
                <IconPlus className="h-4 w-4 mr-2" />
                Add {singularize(grandchild.name)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
