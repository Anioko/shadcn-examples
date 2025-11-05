import { AnsoffMatrix } from './types/ansoff-matrix'

export function exportAnsoffAsJSON(matrix: AnsoffMatrix) {
  const dataStr = JSON.stringify(matrix, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', `ansoff-matrix-${matrix.id}.json`)
  linkElement.click()
}

export function exportAnsoffAsCSV(matrix: AnsoffMatrix) {
  const rows = [
    ['Quadrant', 'Content'],
    ['Market Penetration', matrix.marketPenetration],
    ['Market Development', matrix.marketDevelopment],
    ['Product Development', matrix.productDevelopment],
    ['Diversification', matrix.diversification],
  ]
  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `ansoff-matrix-${matrix.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportAnsoffAsMarkdown(matrix: AnsoffMatrix) {
  const markdown = `# ${matrix.name}

${matrix.description ? `> ${matrix.description}\n\n` : ''}

## Market Penetration (Existing Markets, Existing Products)
${matrix.marketPenetration || '_Not specified_'}

## Market Development (New Markets, Existing Products)
${matrix.marketDevelopment || '_Not specified_'}

## Product Development (Existing Markets, New Products)
${matrix.productDevelopment || '_Not specified_'}

## Diversification (New Markets, New Products)
${matrix.diversification || '_Not specified_'}

---
*Last updated: ${new Date(matrix.updatedAt).toLocaleString()}*
`
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `ansoff-matrix-${matrix.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function exportAnsoffAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element, { quality: 1, pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = 'ansoff-matrix.png'
  link.href = dataUrl
  link.click()
}

export async function exportAnsoffAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element)
  const link = document.createElement('a')
  link.download = 'ansoff-matrix.svg'
  link.href = dataUrl
  link.click()
}
