"use client"

import * as React from "react"
import { DataTable } from "./data-table"
import { FrameworkGrandchild } from "@/lib/framework-config"
import { FrameworkItem } from "@/lib/mock-framework-data"

interface DataTableWrapperProps {
  frameworkSlug: string
  grandchildren: FrameworkGrandchild[]
}

export function DataTableWrapper({ frameworkSlug, grandchildren }: DataTableWrapperProps) {
  const [data, setData] = React.useState<FrameworkItem[]>([])
  const [loading, setLoading] = React.useState(true)

  // Fetch data for all grandchildren
  React.useEffect(() => {
    async function fetchAllData() {
      setLoading(true)
      try {
        const allData: FrameworkItem[] = []
        
        for (const grandchild of grandchildren) {
          const response = await fetch(`/api/frameworks/${frameworkSlug}/tables/${grandchild.id}`)
          if (response.ok) {
            const result = await response.json()
            // Add grandchildId to each item
            const itemsWithGrandchildId = (result.data || []).map((item: any) => ({
              ...item,
              grandchildId: grandchild.id
            }))
            allData.push(...itemsWithGrandchildId)
          }
        }
        
        setData(allData)
      } catch (error) {
        console.error('Error fetching framework data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [frameworkSlug, grandchildren])

  // Function to refresh data for a specific grandchild
  const refreshGrandchildData = React.useCallback(async (grandchildId: string) => {
    try {
      const response = await fetch(`/api/frameworks/${frameworkSlug}/tables/${grandchildId}`)
      if (response.ok) {
        const result = await response.json()
        const itemsWithGrandchildId = (result.data || []).map((item: any) => ({
          ...item,
          grandchildId: grandchildId
        }))
        
        // Update data by replacing items for this grandchild
        setData(prevData => [
          ...prevData.filter(item => item.grandchildId !== grandchildId),
          ...itemsWithGrandchildId
        ])
      }
    } catch (error) {
      console.error('Error refreshing data:', error)
    }
  }, [frameworkSlug])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading framework data...</div>
      </div>
    )
  }

  return (
    <DataTable 
      frameworkSlug={frameworkSlug} 
      grandchildren={grandchildren} 
      data={data}
      onDataChange={refreshGrandchildData}
    />
  )
}
