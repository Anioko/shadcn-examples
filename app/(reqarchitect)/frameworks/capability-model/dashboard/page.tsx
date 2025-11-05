"use client"

import { sampleCapabilityMap } from "@/lib/data/sample-capability-map"
import { CapabilityDashboardCards } from "./components/capability-dashboard-cards"
import { CapabilityCharts } from "./components/capability-charts"
import { CapabilityDataTable } from "./components/capability-data-table"

export default function CapabilityModelDashboard() {
  const capabilityMap = sampleCapabilityMap

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <CapabilityDashboardCards capabilityMap={capabilityMap} />
        <div className="px-4 lg:px-6">
          <CapabilityCharts capabilityMap={capabilityMap} />
        </div>
        <CapabilityDataTable capabilityMap={capabilityMap} />
      </div>
    </div>
  )
}
