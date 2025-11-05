import { BalancedScorecard } from './types/balanced-scorecard'

export function exportBalancedScorecardAsJSON(scorecard: BalancedScorecard) {
  const dataStr = JSON.stringify(scorecard, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', `balanced-scorecard-${scorecard.id}.json`)
  linkElement.click()
}

export function exportBalancedScorecardAsCSV(scorecard: BalancedScorecard) {
  const rows = [
    ['Perspective', 'Content'],
    ['Financial Perspective', scorecard.financialPerspective],
    ['Customer Perspective', scorecard.customerPerspective],
    ['Internal Process Perspective', scorecard.internalProcessPerspective],
    ['Learning & Growth Perspective', scorecard.learningGrowthPerspective],
  ]
  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `balanced-scorecard-${scorecard.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportBalancedScorecardAsMarkdown(scorecard: BalancedScorecard) {
  const markdown = `# ${scorecard.name}

${scorecard.description ? `> ${scorecard.description}\n\n` : ''}

## Financial Perspective
${scorecard.financialPerspective || '_Not specified_'}

## Customer Perspective
${scorecard.customerPerspective || '_Not specified_'}

## Internal Process Perspective
${scorecard.internalProcessPerspective || '_Not specified_'}

## Learning & Growth Perspective
${scorecard.learningGrowthPerspective || '_Not specified_'}

---
*Last updated: ${new Date(scorecard.updatedAt).toLocaleString()}*
`
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `balanced-scorecard-${scorecard.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function exportBalancedScorecardAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element, { quality: 1, pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = 'balanced-scorecard.png'
  link.href = dataUrl
  link.click()
}

export async function exportBalancedScorecardAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element)
  const link = document.createElement('a')
  link.download = 'balanced-scorecard.svg'
  link.href = dataUrl
  link.click()
}
