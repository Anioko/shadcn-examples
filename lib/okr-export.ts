import { OKR } from './types/okr'

export function exportOKRAsJSON(okr: OKR) {
  const dataStr = JSON.stringify(okr, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', `okr-${okr.id}.json`)
  linkElement.click()
}

export function exportOKRAsCSV(okr: OKR) {
  const rows = [
    ['Type', 'Content'],
    ['Objective', okr.objective],
    ['Key Result 1', okr.keyResult1],
    ['Key Result 2', okr.keyResult2],
    ['Key Result 3', okr.keyResult3],
    ['Key Result 4', okr.keyResult4],
  ]
  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `okr-${okr.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportOKRAsMarkdown(okr: OKR) {
  const markdown = `# ${okr.name}

${okr.description ? `> ${okr.description}\n\n` : ''}

## Objective
${okr.objective || '_Not specified_'}

## Key Results

### Key Result 1
${okr.keyResult1 || '_Not specified_'}

### Key Result 2
${okr.keyResult2 || '_Not specified_'}

### Key Result 3
${okr.keyResult3 || '_Not specified_'}

### Key Result 4
${okr.keyResult4 || '_Not specified_'}

---
*Last updated: ${new Date(okr.updatedAt).toLocaleString()}*
`
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `okr-${okr.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function exportOKRAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element, { quality: 1, pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = 'okr.png'
  link.href = dataUrl
  link.click()
}

export async function exportOKRAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element)
  const link = document.createElement('a')
  link.download = 'okr.svg'
  link.href = dataUrl
  link.click()
}
