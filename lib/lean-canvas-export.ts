import { LeanCanvas } from './types/lean-canvas'

/**
 * Export Lean Canvas as JSON
 */
export function exportLeanCanvasAsJSON(canvas: LeanCanvas) {
  const dataStr = JSON.stringify(canvas, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

  const exportFileDefaultName = `lean-canvas-${canvas.id}.json`

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

/**
 * Export Lean Canvas as CSV
 */
export function exportLeanCanvasAsCSV(canvas: LeanCanvas) {
  const rows = [
    ['Block', 'Content'],
    ['Problem', canvas.problem],
    ['Solution', canvas.solution],
    ['Unique Value Proposition', canvas.uniqueValueProposition],
    ['Unfair Advantage', canvas.unfairAdvantage],
    ['Customer Segments', canvas.customerSegments],
    ['Key Metrics', canvas.keyMetrics],
    ['Channels', canvas.channels],
    ['Cost Structure', canvas.costStructure],
    ['Revenue Streams', canvas.revenueStreams],
  ]

  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `lean-canvas-${canvas.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Export Lean Canvas as Markdown
 */
export function exportLeanCanvasAsMarkdown(canvas: LeanCanvas) {
  const markdown = `# ${canvas.name}

${canvas.description ? `> ${canvas.description}\n\n` : ''}

## Problem
${canvas.problem || '_Not specified_'}

## Solution
${canvas.solution || '_Not specified_'}

## Unique Value Proposition
${canvas.uniqueValueProposition || '_Not specified_'}

## Unfair Advantage
${canvas.unfairAdvantage || '_Not specified_'}

## Customer Segments
${canvas.customerSegments || '_Not specified_'}

## Key Metrics
${canvas.keyMetrics || '_Not specified_'}

## Channels
${canvas.channels || '_Not specified_'}

## Cost Structure
${canvas.costStructure || '_Not specified_'}

## Revenue Streams
${canvas.revenueStreams || '_Not specified_'}

---
*Last updated: ${new Date(canvas.updatedAt).toLocaleString()}*
`

  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `lean-canvas-${canvas.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Export Lean Canvas as PNG
 */
export async function exportLeanCanvasAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return

  const dataUrl = await html2canvas(element, {
    quality: 1,
    pixelRatio: 2,
  })

  const link = document.createElement('a')
  link.download = 'lean-canvas.png'
  link.href = dataUrl
  link.click()
}

/**
 * Export Lean Canvas as SVG
 */
export async function exportLeanCanvasAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return

  const dataUrl = await html2canvas(element)

  const link = document.createElement('a')
  link.download = 'lean-canvas.svg'
  link.href = dataUrl
  link.click()
}
