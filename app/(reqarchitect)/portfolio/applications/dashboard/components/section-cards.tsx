"use client"

import * as React from "react"
import { IconTrendingUp, IconPlus } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ApplicationItem } from "@/lib/mock-application-data"
import { ApplicationGrandchild } from "@/lib/application-config"
import { singularize } from "@/lib/utils"
import { AddApplicationDrawer } from "@/components/framework/add-application-drawer"

interface SectionCardsProps {
  grandchildren: ApplicationGrandchild[]
  data: ApplicationItem[]
}

export function SectionCards({ grandchildren, data }: SectionCardsProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [selectedGrandchild, setSelectedGrandchild] = React.useState<ApplicationGrandchild | null>(null)

  const handleAddClick = (grandchild: ApplicationGrandchild) => {
    setSelectedGrandchild(grandchild)
    setDrawerOpen(true)
  }

  const handleSuccess = (data: Record<string, any>) => {
    // TODO: Refresh data here
    console.log("New item added:", data)
  }

  // Calculate counts for each grandchild
  const grandchildCounts = grandchildren.map((grandchild) => {
    const count = data.filter(
      (item) => item.grandchildId === grandchild.id
    ).length

    const doneCount = data.filter(
      (item) =>
        item.grandchildId === grandchild.id &&
        item.status === "Done"
    ).length

    const completionRate = count > 0 ? Math.round((doneCount / count) * 100) : 0

    return {
      ...grandchild,
      count,
      doneCount,
      completionRate,
    }
  })

  // Display ALL grandchildren as cards (not just first 4)
  const displayGrandchildren = grandchildCounts

  return (
    <>
      <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {displayGrandchildren.map((grandchild) => {
          const singularName = singularize(grandchild.name)

          return (
            <Card key={grandchild.id} className="@container/card">
              <CardHeader>
                <CardDescription>Total {grandchild.name}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {grandchild.count}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    {grandchild.completionRate > 0 && <IconTrendingUp />}
                    {grandchild.completionRate}%
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleAddClick(grandchild)}
                >
                  <IconPlus className="h-4 w-4" />
                  Add {singularName}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Add Item Drawer */}
      {selectedGrandchild && (
        <AddApplicationDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          grandchildId={selectedGrandchild.id}
          grandchildName={selectedGrandchild.name}
          onSuccess={handleSuccess}
        />
      )}
    </>
  )
}
