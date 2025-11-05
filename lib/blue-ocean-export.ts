import { BlueOceanStrategy } from './types/blue-ocean'

export function exportBlueOceanAsJSON(strategy: BlueOceanStrategy) {
  const dataStr = JSON.stringify(strategy, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', `blue-ocean-strategy-${strategy.id}.json`)
  linkElement.click()
}

export function exportBlueOceanAsCSV(strategy: BlueOceanStrategy) {
  const rows = [
    ['Action Framework', 'Content'],
    ['Eliminate', strategy.eliminate],
    ['Reduce', strategy.reduce],
    ['Raise', strategy.raise],
    ['Create', strategy.create],
  ]
  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `blue-ocean-strategy-${strategy.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportBlueOceanAsMarkdown(strategy: BlueOceanStrategy) {
  const markdown = `# ${strategy.name}

${strategy.description ? `> ${strategy.description}\n\n` : ''}

## Eliminate (Red - Remove from Industry)
${strategy.eliminate || '_Not specified_'}

## Reduce (Orange - Lower to Well Below Industry Standard)
${strategy.reduce || '_Not specified_'}

## Raise (Blue - Increase to Well Above Industry Standard)
${strategy.raise || '_Not specified_'}

## Create (Green - Create New Value in Industry)
${strategy.create || '_Not specified_'}

---
*Last updated: ${new Date(strategy.updatedAt).toLocaleString()}*
`
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `blue-ocean-strategy-${strategy.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function exportBlueOceanAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element, { quality: 1, pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = 'blue-ocean-strategy.png'
  link.href = dataUrl
  link.click()
}

export async function exportBlueOceanAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element)
  const link = document.createElement('a')
  link.download = 'blue-ocean-strategy.svg'
  link.href = dataUrl
  link.click()
}
