import { PESTLEAnalysis } from './types/pestle'

export function exportPESTLEAsJSON(analysis: PESTLEAnalysis) {
  const dataStr = JSON.stringify(analysis, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', `pestle-analysis-${analysis.id}.json`)
  linkElement.click()
}

export function exportPESTLEAsCSV(analysis: PESTLEAnalysis) {
  const rows = [
    ['Factor', 'Content'],
    ['Political', analysis.political],
    ['Economic', analysis.economic],
    ['Social', analysis.social],
    ['Technological', analysis.technological],
    ['Legal', analysis.legal],
    ['Environmental', analysis.environmental],
  ]
  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `pestle-analysis-${analysis.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportPESTLEAsMarkdown(analysis: PESTLEAnalysis) {
  const markdown = `# ${analysis.name}

${analysis.description ? `> ${analysis.description}\n\n` : ''}

## 🏛️ Political
${analysis.political || '_Not specified_'}

## 💰 Economic
${analysis.economic || '_Not specified_'}

## 👥 Social
${analysis.social || '_Not specified_'}

## 🔬 Technological
${analysis.technological || '_Not specified_'}

## ⚖️ Legal
${analysis.legal || '_Not specified_'}

## 🌍 Environmental
${analysis.environmental || '_Not specified_'}

---
*Last updated: ${new Date(analysis.updatedAt).toLocaleString()}*
`
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `pestle-analysis-${analysis.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function exportPESTLEAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element, { quality: 1, pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = 'pestle-analysis.png'
  link.href = dataUrl
  link.click()
}

export async function exportPESTLEAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element)
  const link = document.createElement('a')
  link.download = 'pestle-analysis.svg'
  link.href = dataUrl
  link.click()
}
