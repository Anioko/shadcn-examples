import { EmpathyMap } from './types/empathy-map'

export function exportEmpathyMapAsJSON(map: EmpathyMap) {
  const dataStr = JSON.stringify(map, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', `empathy-map-${map.id}.json`)
  linkElement.click()
}

export function exportEmpathyMapAsCSV(map: EmpathyMap) {
  const rows = [
    ['Quadrant', 'Content'],
    ['Says', map.says],
    ['Thinks', map.thinks],
    ['Does', map.does],
    ['Feels', map.feels],
    ['Pains', map.pains],
    ['Gains', map.gains],
  ]
  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `empathy-map-${map.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportEmpathyMapAsMarkdown(map: EmpathyMap) {
  const markdown = `# ${map.name}

${map.description ? `> ${map.description}\n\n` : ''}

## 💬 Says
${map.says || '_Not specified_'}

## 💭 Thinks
${map.thinks || '_Not specified_'}

## 🏃 Does
${map.does || '_Not specified_'}

## ❤️ Feels
${map.feels || '_Not specified_'}

## 😖 Pains
${map.pains || '_Not specified_'}

## 😊 Gains
${map.gains || '_Not specified_'}

---
*Last updated: ${new Date(map.updatedAt).toLocaleString()}*
`
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `empathy-map-${map.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function exportEmpathyMapAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element, { quality: 1, pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = 'empathy-map.png'
  link.href = dataUrl
  link.click()
}

export async function exportEmpathyMapAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element)
  const link = document.createElement('a')
  link.download = 'empathy-map.svg'
  link.href = dataUrl
  link.click()
}
