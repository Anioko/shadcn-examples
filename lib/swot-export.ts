import { SWOTAnalysis } from './types/swot'

export function exportSWOTAsJSON(analysis: SWOTAnalysis) {
  const dataStr = JSON.stringify(analysis, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', `swot-analysis-${analysis.id}.json`)
  linkElement.click()
}

export function exportSWOTAsCSV(analysis: SWOTAnalysis) {
  const rows = [
    ['Quadrant', 'Content'],
    ['Strengths', analysis.strengths],
    ['Weaknesses', analysis.weaknesses],
    ['Opportunities', analysis.opportunities],
    ['Threats', analysis.threats],
  ]
  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `swot-analysis-${analysis.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportSWOTAsMarkdown(analysis: SWOTAnalysis) {
  const markdown = `# ${analysis.name}

${analysis.description ? `> ${analysis.description}\n\n` : ''}

## 💪 Strengths
${analysis.strengths || '_Not specified_'}

## ⚠️ Weaknesses
${analysis.weaknesses || '_Not specified_'}

## 🌟 Opportunities
${analysis.opportunities || '_Not specified_'}

## ⚡ Threats
${analysis.threats || '_Not specified_'}

---
*Last updated: ${new Date(analysis.updatedAt).toLocaleString()}*
`
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `swot-analysis-${analysis.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function exportSWOTAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element, { quality: 1, pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = 'swot-analysis.png'
  link.href = dataUrl
  link.click()
}

export async function exportSWOTAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element)
  const link = document.createElement('a')
  link.download = 'swot-analysis.svg'
  link.href = dataUrl
  link.click()
}
