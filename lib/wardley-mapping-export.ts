import { WardleyMapping } from './types/wardley-mapping'

export function exportWardleyMappingAsJSON(wardleyMapping: WardleyMapping) {
  const dataStr = JSON.stringify(wardleyMapping, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', `wardley-mapping-${wardleyMapping.id}.json`)
  linkElement.click()
}

export function exportWardleyMappingAsCSV(wardleyMapping: WardleyMapping) {
  const rows = [
    ['Section', 'Content'],
    ['Value Chain', wardleyMapping.valueChain],
    ['Evolution Stages', wardleyMapping.evolutionStages],
    ['Components', wardleyMapping.components],
    ['Strategic Movement', wardleyMapping.strategicMovement],
  ]
  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `wardley-mapping-${wardleyMapping.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportWardleyMappingAsMarkdown(wardleyMapping: WardleyMapping) {
  const markdown = `# ${wardleyMapping.name}

${wardleyMapping.description ? `> ${wardleyMapping.description}\n\n` : ''}

## Value Chain
${wardleyMapping.valueChain || '_Not specified_'}

## Evolution Stages
${wardleyMapping.evolutionStages || '_Not specified_'}

## Components
${wardleyMapping.components || '_Not specified_'}

## Strategic Movement
${wardleyMapping.strategicMovement || '_Not specified_'}

---
*Last updated: ${new Date(wardleyMapping.updatedAt).toLocaleString()}*
`
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `wardley-mapping-${wardleyMapping.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function exportWardleyMappingAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element, { quality: 1, pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = 'wardley-mapping.png'
  link.href = dataUrl
  link.click()
}

export async function exportWardleyMappingAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element)
  const link = document.createElement('a')
  link.download = 'wardley-mapping.svg'
  link.href = dataUrl
  link.click()
}
