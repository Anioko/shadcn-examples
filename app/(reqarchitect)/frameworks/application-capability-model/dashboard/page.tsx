"use client"

import { sampleApplicationCapabilityMap } from "@/lib/data/sample-application-capability-map"
import { ApplicationCapabilityDashboardCards } from "./components/application-capability-dashboard-cards"

export default function ApplicationCapabilityModelDashboard() {
  const capabilityMap = sampleApplicationCapabilityMap

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <ApplicationCapabilityDashboardCards capabilityMap={capabilityMap} />
      </div>
    </div>
  )
}
