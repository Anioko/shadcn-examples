"use client"

import * as React from "react"
import { CirclePlus } from "lucide-react"
import { IconPlus, IconChevronDown } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { singularize } from "@/lib/utils"
import { AddItemDrawer } from "@/components/framework/add-item-drawer"

interface Grandchild {
  id: string
  name: string
}

interface SiteHeaderProps {
  title?: string
  buttonText?: string
  buttonIcon?: React.ReactNode
  frameworkName?: string
  frameworkSlug?: string
  grandchildren?: Grandchild[]
}

export function SiteHeader({ 
  title = "ReqArchitect Dashboard", 
  buttonText = "Add Component",
  buttonIcon = <CirclePlus />,
  frameworkName,
  frameworkSlug,
  grandchildren
}: SiteHeaderProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [selectedGrandchild, setSelectedGrandchild] = React.useState<Grandchild | null>(null)

  // If framework data is provided, show framework dropdown
  const showFrameworkDropdown = frameworkName && frameworkSlug && grandchildren && grandchildren.length > 0

  const handleGrandchildClick = (grandchild: Grandchild) => {
    setSelectedGrandchild(grandchild)
    setDrawerOpen(true)
  }

  return (
    <header className="bg-background/90 sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          {showFrameworkDropdown ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="hidden sm:flex">
                  <IconPlus className="h-4 w-4" />
                  <span className="hidden lg:inline">Add {frameworkName}</span>
                  <span className="lg:hidden">Add</span>
                  <IconChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {grandchildren.map((grandchild) => (
                  <DropdownMenuItem 
                    key={grandchild.id}
                    onClick={() => handleGrandchildClick(grandchild)}
                  >
                    <IconPlus className="h-4 w-4 mr-2" />
                    Add {singularize(grandchild.name)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" className="hidden h-7 sm:flex">
              {buttonIcon}
              <span>{buttonText}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Add Item Drawer */}
      {selectedGrandchild && frameworkSlug && (
        <AddItemDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          frameworkSlug={frameworkSlug}
          grandchildId={selectedGrandchild.id}
          grandchildName={selectedGrandchild.name}
          onSuccess={(data) => {
            // TODO: Refresh data
            console.log("New item added from navbar:", data)
          }}
        />
      )}
    </header>
  )
}