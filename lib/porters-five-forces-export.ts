import { PortersFiveForcesAnalysis } from './types/porters-five-forces'

export function exportPortersFiveForcesAsJSON(analysis: PortersFiveForcesAnalysis) {
  const dataStr = JSON.stringify(analysis, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', `porters-five-forces-${analysis.id}.json`)
  linkElement.click()
}

export function exportPortersFiveForcesAsCSV(analysis: PortersFiveForcesAnalysis) {
  const rows = [
    ['Force', 'Content'],
    ['Threat of New Entrants', analysis.threatOfNewEntrants],
    ['Bargaining Power of Suppliers', analysis.bargainingPowerOfSuppliers],
    ['Bargaining Power of Buyers', analysis.bargainingPowerOfBuyers],
    ['Threat of Substitutes', analysis.threatOfSubstitutes],
    ['Competitive Rivalry', analysis.competitiveRivalry],
  ]
  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `porters-five-forces-${analysis.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportPortersFiveForcesAsMarkdown(analysis: PortersFiveForcesAnalysis) {
  const markdown = `# ${analysis.name}

${analysis.description ? `> ${analysis.description}\n\n` : ''}

## 🚪 Threat of New Entrants
${analysis.threatOfNewEntrants || '_Not specified_'}

## 📦 Bargaining Power of Suppliers
${analysis.bargainingPowerOfSuppliers || '_Not specified_'}

## 🛒 Bargaining Power of Buyers
${analysis.bargainingPowerOfBuyers || '_Not specified_'}

## 🔄 Threat of Substitutes
${analysis.threatOfSubstitutes || '_Not specified_'}

## ⚔️ Competitive Rivalry
${analysis.competitiveRivalry || '_Not specified_'}

---
*Last updated: ${new Date(analysis.updatedAt).toLocaleString()}*
`
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `porters-five-forces-${analysis.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function exportPortersFiveForcesAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element, { quality: 1, pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = 'porters-five-forces.png'
  link.href = dataUrl
  link.click()
}

export async function exportPortersFiveForcesAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element)
  const link = document.createElement('a')
  link.download = 'porters-five-forces.svg'
  link.href = dataUrl
  link.click()
}
