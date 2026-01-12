"use client"

import { getApplicationConfig } from "@/lib/application-config"
import { generateApplicationData } from "@/lib/mock-application-data"
import { SectionCards } from "./components/section-cards"
import { ChartAreaInteractive } from "./components/chart-area-interactive"
import { DataTable } from "./components/data-table"

export default function ApplicationInventoryDashboard() {
  const config = getApplicationConfig()
  const data = generateApplicationData()

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards grandchildren={config.grandchildren} data={data} />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive grandchildren={config.grandchildren} data={data} />
        </div>
        <DataTable grandchildren={config.grandchildren} data={data} />
      </div>
    </div>
  )
}
