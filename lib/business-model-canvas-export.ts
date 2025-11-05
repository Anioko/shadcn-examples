import { BusinessModelCanvas } from './types/business-model-canvas'

/**
 * Export Business Model Canvas as JSON
 */
export function exportCanvasAsJSON(canvas: BusinessModelCanvas) {
  const dataStr = JSON.stringify(canvas, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

  const exportFileDefaultName = `business-model-canvas-${canvas.id}.json`

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

/**
 * Export Business Model Canvas as CSV
 */
export function exportCanvasAsCSV(canvas: BusinessModelCanvas) {
  const rows = [
    ['Block', 'Content'],
    ['Key Partners', canvas.keyPartners],
    ['Key Activities', canvas.keyActivities],
    ['Key Resources', canvas.keyResources],
    ['Value Propositions', canvas.valuePropositions],
    ['Customer Relationships', canvas.customerRelationships],
    ['Channels', canvas.channels],
    ['Customer Segments', canvas.customerSegments],
    ['Cost Structure', canvas.costStructure],
    ['Revenue Streams', canvas.revenueStreams],
  ]

  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `business-model-canvas-${canvas.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Export Business Model Canvas as Markdown
 */
export function exportCanvasAsMarkdown(canvas: BusinessModelCanvas) {
  const markdown = `# ${canvas.name}

${canvas.description ? `> ${canvas.description}\n\n` : ''}

## Key Partners
${canvas.keyPartners || '_Not specified_'}

## Key Activities
${canvas.keyActivities || '_Not specified_'}

## Key Resources
${canvas.keyResources || '_Not specified_'}

## Value Propositions
${canvas.valuePropositions || '_Not specified_'}

## Customer Relationships
${canvas.customerRelationships || '_Not specified_'}

## Channels
${canvas.channels || '_Not specified_'}

## Customer Segments
${canvas.customerSegments || '_Not specified_'}

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
  link.setAttribute('download', `business-model-canvas-${canvas.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Export Business Model Canvas as plain text
 */
export function exportCanvasAsTXT(canvas: BusinessModelCanvas) {
  const text = `${canvas.name}
${canvas.description ? `\n${canvas.description}\n` : ''}
${'='.repeat(80)}

KEY PARTNERS
${'-'.repeat(80)}
${canvas.keyPartners || '(Not specified)'}

KEY ACTIVITIES
${'-'.repeat(80)}
${canvas.keyActivities || '(Not specified)'}

KEY RESOURCES
${'-'.repeat(80)}
${canvas.keyResources || '(Not specified)'}

VALUE PROPOSITIONS
${'-'.repeat(80)}
${canvas.valuePropositions || '(Not specified)'}

CUSTOMER RELATIONSHIPS
${'-'.repeat(80)}
${canvas.customerRelationships || '(Not specified)'}

CHANNELS
${'-'.repeat(80)}
${canvas.channels || '(Not specified)'}

CUSTOMER SEGMENTS
${'-'.repeat(80)}
${canvas.customerSegments || '(Not specified)'}

COST STRUCTURE
${'-'.repeat(80)}
${canvas.costStructure || '(Not specified)'}

REVENUE STREAMS
${'-'.repeat(80)}
${canvas.revenueStreams || '(Not specified)'}

${'='.repeat(80)}
Last updated: ${new Date(canvas.updatedAt).toLocaleString()}
`

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `business-model-canvas-${canvas.id}.txt`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Export Business Model Canvas as PNG
 */
export async function exportCanvasAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return

  const dataUrl = await html2canvas(element, {
    quality: 1,
    pixelRatio: 2,
  })

  const link = document.createElement('a')
  link.download = 'business-model-canvas.png'
  link.href = dataUrl
  link.click()
}

/**
 * Export Business Model Canvas as JPEG
 */
export async function exportCanvasAsJPEG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toJpeg
  const element = document.getElementById(elementId)
  if (!element) return

  const dataUrl = await html2canvas(element, {
    quality: 0.95,
    pixelRatio: 2,
  })

  const link = document.createElement('a')
  link.download = 'business-model-canvas.jpg'
  link.href = dataUrl
  link.click()
}

/**
 * Export Business Model Canvas as SVG
 */
export async function exportCanvasAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return

  const dataUrl = await html2canvas(element)

  const link = document.createElement('a')
  link.download = 'business-model-canvas.svg'
  link.href = dataUrl
  link.click()
}
