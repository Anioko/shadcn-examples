import { ApplicationCapability, ApplicationCapabilityMap } from "./types/capability-map"
import * as XLSX from "xlsx"

/**
 * Flatten capability hierarchy for export
 */
function flattenCapabilities(capabilities: ApplicationCapability[]): ApplicationCapability[] {
  const flattened: ApplicationCapability[] = []

  function flatten(cap: ApplicationCapability) {
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
export function exportAsCSV(capabilityMap: ApplicationCapabilityMap): void {
  const capabilities = flattenCapabilities(capabilityMap.capabilities)

  // CSV headers
  const headers = [
    "ID",
    "Name",
    "Description",
    "Domain",
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
      cap.domain,
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
  downloadFile(csvContent, `application-capability-map-${Date.now()}.csv`, "text/csv")
}

/**
 * Export capability map as TXT (plain text)
 */
export function exportAsTXT(capabilityMap: ApplicationCapabilityMap): void {
  const capabilities = flattenCapabilities(capabilityMap.capabilities)

  let txtContent = `Application Capability Map Export\n`
  txtContent += `Name: ${capabilityMap.name}\n`
  txtContent += `Description: ${capabilityMap.description || 'N/A'}\n`
  txtContent += `Total Capabilities: ${capabilities.length}\n`
  txtContent += `Export Date: ${new Date().toLocaleString()}\n`
  txtContent += `\n${"=".repeat(80)}\n\n`

  capabilities.forEach((cap, index) => {
    txtContent += `${index + 1}. ${cap.name}\n`
    txtContent += `   ID: ${cap.id}\n`
    txtContent += `   Domain: ${cap.domain.toUpperCase()}\n`
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

  downloadFile(txtContent, `application-capability-map-${Date.now()}.txt`, "text/plain")
}

/**
 * Export capability map as Markdown
 */
export function exportAsMarkdown(capabilityMap: ApplicationCapabilityMap): void {
  const capabilities = flattenCapabilities(capabilityMap.capabilities)

  let mdContent = `# ${capabilityMap.name}\n\n`
  if (capabilityMap.description) {
    mdContent += `${capabilityMap.description}\n\n`
  }
  mdContent += `**Total Capabilities:** ${capabilities.length}\n\n`
  mdContent += `**Export Date:** ${new Date().toLocaleString()}\n\n`
  mdContent += `---\n\n`

  // Group by domain
  const domains = ['user-experience', 'application-services', 'data-storage', 'security-identity', 'devops-platform', 'ai-analytics', 'communication'] as const

  domains.forEach(domain => {
    const domainCaps = capabilities.filter(c => c.domain === domain)
    if (domainCaps.length === 0) return

    mdContent += `## ${domain.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}\n\n`

    domainCaps.forEach(cap => {
      const indent = '  '.repeat(cap.level)
      mdContent += `${indent}- **${cap.name}** (${cap.id})\n`
      if (cap.description) {
        mdContent += `${indent}  - ${cap.description}\n`
      }
      mdContent += `${indent}  - Maturity: ${cap.metrics.maturity}/5 | Importance: ${cap.metrics.strategicImportance} | Investment: ${cap.metrics.currentInvestment}\n`
      if (cap.metrics.owner) {
        mdContent += `${indent}  - Owner: ${cap.metrics.owner}\n`
      }
    })
    mdContent += `\n`
  })

  downloadFile(mdContent, `application-capability-map-${Date.now()}.md`, "text/markdown")
}

/**
 * Export capability map as JSON
 */
export function exportAsJSON(capabilityMap: ApplicationCapabilityMap): void {
  const jsonContent = JSON.stringify(capabilityMap, null, 2)
  downloadFile(jsonContent, `application-capability-map-${Date.now()}.json`, "application/json")
}

/**
 * Export capability map as Excel (.xlsx)
 */
export function exportAsExcel(capabilityMap: ApplicationCapabilityMap): void {
  const capabilities = flattenCapabilities(capabilityMap.capabilities)

  // Create workbook
  const wb = XLSX.utils.book_new()

  // Sheet 1: All Capabilities
  const allData = capabilities.map(cap => ({
    ID: cap.id,
    Name: cap.name,
    Description: cap.description || '',
    Domain: cap.domain,
    Level: cap.level,
    'Parent ID': cap.parentId || '',
    Maturity: cap.metrics.maturity,
    'Strategic Importance': cap.metrics.strategicImportance,
    'Current Investment': cap.metrics.currentInvestment,
    'Planned Investment': cap.metrics.plannedInvestment,
    Owner: cap.metrics.owner || '',
    'Risk Level': cap.metrics.riskLevel || ''
  }))
  const ws = XLSX.utils.json_to_sheet(allData)
  XLSX.utils.book_append_sheet(wb, ws, "All Capabilities")

  // Sheet 2-8: By Domain
  const domains = ['user-experience', 'application-services', 'data-storage', 'security-identity', 'devops-platform', 'ai-analytics', 'communication'] as const

  domains.forEach(domain => {
    const domainCaps = capabilities.filter(c => c.domain === domain)
    if (domainCaps.length > 0) {
      const domainData = domainCaps.map(cap => ({
        ID: cap.id,
        Name: cap.name,
        Description: cap.description || '',
        Level: cap.level,
        'Parent ID': cap.parentId || '',
        Maturity: cap.metrics.maturity,
        'Strategic Importance': cap.metrics.strategicImportance,
        'Current Investment': cap.metrics.currentInvestment,
        'Planned Investment': cap.metrics.plannedInvestment,
        Owner: cap.metrics.owner || ''
      }))
      const domainWs = XLSX.utils.json_to_sheet(domainData)
      const sheetName = domain.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      XLSX.utils.book_append_sheet(wb, domainWs, sheetName.substring(0, 31)) // Excel has 31 char limit
    }
  })

  // Sheet 9: Summary
  const summaryData = domains.map(domain => {
    const domainCaps = capabilities.filter(c => c.domain === domain)
    const avgMaturity = domainCaps.length > 0
      ? (domainCaps.reduce((sum, c) => sum + c.metrics.maturity, 0) / domainCaps.length).toFixed(2)
      : 0
    const criticalCount = domainCaps.filter(c => c.metrics.strategicImportance === 'critical').length

    return {
      Domain: domain.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      'Total Capabilities': domainCaps.length,
      'Average Maturity': avgMaturity,
      'Critical Count': criticalCount
    }
  })
  const summaryWs = XLSX.utils.json_to_sheet(summaryData)
  XLSX.utils.book_append_sheet(wb, summaryWs, "Summary")

  // Write file
  XLSX.writeFile(wb, `application-capability-map-${Date.now()}.xlsx`)
}

/**
 * Export capability map as PNG image
 */
export async function exportAsPNG(elementId: string): Promise<void> {
  try {
    const { toPng } = await import('html-to-image')
    const element = document.getElementById(elementId)
    if (!element) {
      console.error('Element not found:', elementId)
      return
    }

    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2,
    })

    const link = document.createElement('a')
    link.download = `application-capability-map-${Date.now()}.png`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Failed to export as PNG:', error)
  }
}

/**
 * Export capability map as JPEG image
 */
export async function exportAsJPEG(elementId: string): Promise<void> {
  try {
    const { toJpeg } = await import('html-to-image')
    const element = document.getElementById(elementId)
    if (!element) {
      console.error('Element not found:', elementId)
      return
    }

    const dataUrl = await toJpeg(element, {
      quality: 0.95,
      pixelRatio: 2,
    })

    const link = document.createElement('a')
    link.download = `application-capability-map-${Date.now()}.jpg`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Failed to export as JPEG:', error)
  }
}

/**
 * Export capability map as SVG image
 */
export async function exportAsSVG(elementId: string): Promise<void> {
  try {
    const { toSvg } = await import('html-to-image')
    const element = document.getElementById(elementId)
    if (!element) {
      console.error('Element not found:', elementId)
      return
    }

    const dataUrl = await toSvg(element)

    const link = document.createElement('a')
    link.download = `application-capability-map-${Date.now()}.svg`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Failed to export as SVG:', error)
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
