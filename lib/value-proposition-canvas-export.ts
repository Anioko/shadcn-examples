import { ValuePropositionCanvas } from './types/value-proposition-canvas'

/**
 * Export Value Proposition Canvas as JSON
 */
export function exportVPCAsJSON(canvas: ValuePropositionCanvas) {
  const dataStr = JSON.stringify(canvas, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

  const exportFileDefaultName = `value-proposition-canvas-${canvas.id}.json`

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

/**
 * Export Value Proposition Canvas as CSV
 */
export function exportVPCAsCSV(canvas: ValuePropositionCanvas) {
  const rows = [
    ['Section', 'Block', 'Content'],
    ['Value Map', 'Products & Services', canvas.productsServices],
    ['Value Map', 'Pain Relievers', canvas.painRelievers],
    ['Value Map', 'Gain Creators', canvas.gainCreators],
    ['Customer Profile', 'Customer Jobs', canvas.customerJobs],
    ['Customer Profile', 'Pains', canvas.customerPains],
    ['Customer Profile', 'Gains', canvas.customerGains],
  ]

  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `value-proposition-canvas-${canvas.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Export Value Proposition Canvas as Markdown
 */
export function exportVPCAsMarkdown(canvas: ValuePropositionCanvas) {
  const markdown = `# ${canvas.name}

${canvas.description ? `> ${canvas.description}\n\n` : ''}

## Value Map

### Products & Services
${canvas.productsServices || '_Not specified_'}

### Pain Relievers
${canvas.painRelievers || '_Not specified_'}

### Gain Creators
${canvas.gainCreators || '_Not specified_'}

---

## Customer Profile

### Customer Jobs
${canvas.customerJobs || '_Not specified_'}

### Pains
${canvas.customerPains || '_Not specified_'}

### Gains
${canvas.customerGains || '_Not specified_'}

---
*Last updated: ${new Date(canvas.updatedAt).toLocaleString()}*
`

  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `value-proposition-canvas-${canvas.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Export Value Proposition Canvas as PNG
 */
export async function exportVPCAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return

  const dataUrl = await html2canvas(element, {
    quality: 1,
    pixelRatio: 2,
  })

  const link = document.createElement('a')
  link.download = 'value-proposition-canvas.png'
  link.href = dataUrl
  link.click()
}

/**
 * Export Value Proposition Canvas as SVG
 */
export async function exportVPCAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return

  const dataUrl = await html2canvas(element)

  const link = document.createElement('a')
  link.download = 'value-proposition-canvas.svg'
  link.href = dataUrl
  link.click()
}
