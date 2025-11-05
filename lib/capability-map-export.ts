import { Capability, CapabilityMap } from "./types/capability-map"
import * as XLSX from "xlsx"

/**
 * Flatten capability hierarchy for export
 */
function flattenCapabilities(capabilities: Capability[]): Capability[] {
  const flattened: Capability[] = []

  function flatten(cap: Capability) {
    flattened.push(cap)
    if (cap.children && cap.children.length > 0) {
      cap.children.forEach(flatten)
    }
  }

  capabilities.forEach(flatten)
  return flattened
}

/**
 * Export capability map as CSV
 */
export function exportAsCSV(capabilityMap: CapabilityMap): void {
  const capabilities = flattenCapabilities(capabilityMap.capabilities)

  // CSV headers
  const headers = [
    "ID",
    "Name",
    "Description",
    "Type",
    "Level",
    "Parent ID",
    "Maturity",
    "Strategic Importance",
    "Current Investment",
    "Owner",
    "Risk Level"
  ]

  // Build CSV content
  let csvContent = headers.join(",") + "\n"

  capabilities.forEach(cap => {
    const row = [
      cap.id,
      `"${cap.name.replace(/"/g, '""')}"`, // Escape quotes
      `"${(cap.description || '').replace(/"/g, '""')}"`,
      cap.type,
      cap.level,
      cap.parentId || "",
      cap.metrics.maturity,
      cap.metrics.strategicImportance,
      cap.metrics.currentInvestment,
      cap.metrics.owner || "",
      cap.metrics.riskLevel || ""
    ]
    csvContent += row.join(",") + "\n"
  })

  // Download
  downloadFile(csvContent, `capability-map-${Date.now()}.csv`, "text/csv")
}

/**
 * Export capability map as TXT (plain text)
 */
export function exportAsTXT(capabilityMap: CapabilityMap): void {
  const capabilities = flattenCapabilities(capabilityMap.capabilities)

  let txtContent = `Capability Map Export\n`
  txtContent += `Name: ${capabilityMap.name}\n`
  txtContent += `Description: ${capabilityMap.description || 'N/A'}\n`
  txtContent += `Total Capabilities: ${capabilities.length}\n`
  txtContent += `Export Date: ${new Date().toLocaleString()}\n`
  txtContent += `\n${"=".repeat(80)}\n\n`

  capabilities.forEach((cap, index) => {
    txtContent += `${index + 1}. ${cap.name}\n`
    txtContent += `   ID: ${cap.id}\n`
    txtContent += `   Type: ${cap.type.toUpperCase()}\n`
    txtContent += `   Level: ${cap.level}\n`
    if (cap.description) {
      txtContent += `   Description: ${cap.description}\n`
    }
    txtContent += `   Maturity: ${cap.metrics.maturity}/5\n`
    txtContent += `   Strategic Importance: ${cap.metrics.strategicImportance}\n`
    txtContent += `   Current Investment: ${cap.metrics.currentInvestment}\n`
    if (cap.metrics.owner) {
      txtContent += `   Owner: ${cap.metrics.owner}\n`
    }
    if (cap.metrics.riskLevel) {
      txtContent += `   Risk Level: ${cap.metrics.riskLevel}\n`
    }
    if (cap.parentId) {
      txtContent += `   Parent ID: ${cap.parentId}\n`
    }
    txtContent += `\n`
  })

  downloadFile(txtContent, `capability-map-${Date.now()}.txt`, "text/plain")
}

/**
 * Export capability map as Markdown
 */
export function exportAsMarkdown(capabilityMap: CapabilityMap): void {
  const capabilities = flattenCapabilities(capabilityMap.capabilities)

  let mdContent = `# ${capabilityMap.name}\n\n`

  if (capabilityMap.description) {
    mdContent += `${capabilityMap.description}\n\n`
  }

  mdContent += `**Total Capabilities:** ${capabilities.length}  \n`
  mdContent += `**Export Date:** ${new Date().toLocaleString()}\n\n`

  mdContent += `---\n\n`

  // Group by type
  const strategic = capabilities.filter(c => c.type === 'strategic')
  const operational = capabilities.filter(c => c.type === 'operational')
  const supporting = capabilities.filter(c => c.type === 'supporting')

  // Strategic Capabilities
  if (strategic.length > 0) {
    mdContent += `## 🎯 Strategic Capabilities (${strategic.length})\n\n`
    mdContent += createMarkdownTable(strategic)
    mdContent += `\n`
  }

  // Operational Capabilities
  if (operational.length > 0) {
    mdContent += `## ⚙️ Operational Capabilities (${operational.length})\n\n`
    mdContent += createMarkdownTable(operational)
    mdContent += `\n`
  }

  // Supporting Capabilities
  if (supporting.length > 0) {
    mdContent += `## 🛡️ Supporting Capabilities (${supporting.length})\n\n`
    mdContent += createMarkdownTable(supporting)
    mdContent += `\n`
  }

  downloadFile(mdContent, `capability-map-${Date.now()}.md`, "text/markdown")
}

function createMarkdownTable(capabilities: Capability[]): string {
  let table = `| Name | Level | Maturity | Importance | Investment | Owner |\n`
  table += `|------|-------|----------|------------|------------|-------|\n`

  capabilities.forEach(cap => {
    table += `| ${cap.name} | L${cap.level} | ${cap.metrics.maturity}/5 | ${cap.metrics.strategicImportance} | ${cap.metrics.currentInvestment} | ${cap.metrics.owner || 'N/A'} |\n`
  })

  return table
}

/**
 * Export capability map as JSON
 */
export function exportAsJSON(capabilityMap: CapabilityMap): void {
  const jsonContent = JSON.stringify(capabilityMap, null, 2)
  downloadFile(jsonContent, `capability-map-${Date.now()}.json`, "application/json")
}

/**
 * Export capability map as Excel (XLSX)
 */
export function exportAsExcel(capabilityMap: CapabilityMap): void {
  const capabilities = flattenCapabilities(capabilityMap.capabilities)

  // Prepare data for Excel
  const data = capabilities.map(cap => ({
    "ID": cap.id,
    "Name": cap.name,
    "Description": cap.description || "",
    "Type": cap.type,
    "Level": cap.level,
    "Parent ID": cap.parentId || "",
    "Maturity": cap.metrics.maturity,
    "Strategic Importance": cap.metrics.strategicImportance,
    "Current Investment": cap.metrics.currentInvestment,
    "Owner": cap.metrics.owner || "",
    "Risk Level": cap.metrics.riskLevel || ""
  }))

  // Create workbook
  const wb = XLSX.utils.book_new()

  // Main sheet with all capabilities
  const ws = XLSX.utils.json_to_sheet(data)
  XLSX.utils.book_append_sheet(wb, ws, "All Capabilities")

  // Create separate sheets by type
  const strategic = capabilities.filter(c => c.type === 'strategic').map(cap => ({
    "ID": cap.id,
    "Name": cap.name,
    "Description": cap.description || "",
    "Level": cap.level,
    "Maturity": cap.metrics.maturity,
    "Strategic Importance": cap.metrics.strategicImportance,
    "Current Investment": cap.metrics.currentInvestment,
    "Owner": cap.metrics.owner || ""
  }))

  const operational = capabilities.filter(c => c.type === 'operational').map(cap => ({
    "ID": cap.id,
    "Name": cap.name,
    "Description": cap.description || "",
    "Level": cap.level,
    "Maturity": cap.metrics.maturity,
    "Strategic Importance": cap.metrics.strategicImportance,
    "Current Investment": cap.metrics.currentInvestment,
    "Owner": cap.metrics.owner || ""
  }))

  const supporting = capabilities.filter(c => c.type === 'supporting').map(cap => ({
    "ID": cap.id,
    "Name": cap.name,
    "Description": cap.description || "",
    "Level": cap.level,
    "Maturity": cap.metrics.maturity,
    "Strategic Importance": cap.metrics.strategicImportance,
    "Current Investment": cap.metrics.currentInvestment,
    "Owner": cap.metrics.owner || ""
  }))

  if (strategic.length > 0) {
    const wsStrategic = XLSX.utils.json_to_sheet(strategic)
    XLSX.utils.book_append_sheet(wb, wsStrategic, "Strategic")
  }

  if (operational.length > 0) {
    const wsOperational = XLSX.utils.json_to_sheet(operational)
    XLSX.utils.book_append_sheet(wb, wsOperational, "Operational")
  }

  if (supporting.length > 0) {
    const wsSupporting = XLSX.utils.json_to_sheet(supporting)
    XLSX.utils.book_append_sheet(wb, wsSupporting, "Supporting")
  }

  // Summary sheet
  const summary = [
    { "Metric": "Total Capabilities", "Value": capabilities.length },
    { "Metric": "Strategic Capabilities", "Value": strategic.length },
    { "Metric": "Operational Capabilities", "Value": operational.length },
    { "Metric": "Supporting Capabilities", "Value": supporting.length },
    { "Metric": "Average Maturity", "Value": (capabilities.reduce((sum, c) => sum + c.metrics.maturity, 0) / capabilities.length).toFixed(2) },
    { "Metric": "Critical Capabilities", "Value": capabilities.filter(c => c.metrics.strategicImportance === 'critical').length },
    { "Metric": "High Investment Capabilities", "Value": capabilities.filter(c => c.metrics.currentInvestment === 'high').length }
  ]
  const wsSummary = XLSX.utils.json_to_sheet(summary)
  XLSX.utils.book_append_sheet(wb, wsSummary, "Summary")

  // Write file
  XLSX.writeFile(wb, `capability-map-${Date.now()}.xlsx`)
}

/**
 * Export capability map as PNG image
 */
export async function exportAsPNG(elementId: string): Promise<void> {
  const { toPng } = await import("html-to-image")
  const element = document.getElementById(elementId)

  if (!element) {
    console.error("Element not found for export")
    return
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: '#ffffff'
    })

    const link = document.createElement('a')
    link.download = `capability-map-${Date.now()}.png`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error("Error exporting as PNG:", error)
  }
}

/**
 * Export capability map as JPEG image
 */
export async function exportAsJPEG(elementId: string): Promise<void> {
  const { toJpeg } = await import("html-to-image")
  const element = document.getElementById(elementId)

  if (!element) {
    console.error("Element not found for export")
    return
  }

  try {
    const dataUrl = await toJpeg(element, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#ffffff'
    })

    const link = document.createElement('a')
    link.download = `capability-map-${Date.now()}.jpg`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error("Error exporting as JPEG:", error)
  }
}

/**
 * Export capability map as SVG image
 */
export async function exportAsSVG(elementId: string): Promise<void> {
  const { toSvg } = await import("html-to-image")
  const element = document.getElementById(elementId)

  if (!element) {
    console.error("Element not found for export")
    return
  }

  try {
    const dataUrl = await toSvg(element, {
      backgroundColor: '#ffffff'
    })

    const link = document.createElement('a')
    link.download = `capability-map-${Date.now()}.svg`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error("Error exporting as SVG:", error)
  }
}

/**
 * Helper function to download a file
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
