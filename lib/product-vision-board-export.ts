import { ProductVisionBoard } from './types/product-vision-board'

export function exportPVBAsJSON(board: ProductVisionBoard) {
  const dataStr = JSON.stringify(board, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', `product-vision-board-${board.id}.json`)
  linkElement.click()
}

export function exportPVBAsCSV(board: ProductVisionBoard) {
  const rows = [
    ['Section', 'Content'],
    ['Vision', board.vision],
    ['Target Group', board.targetGroup],
    ['Needs', board.needs],
    ['Product', board.product],
    ['Business Goals', board.businessGoals],
  ]
  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `product-vision-board-${board.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportPVBAsMarkdown(board: ProductVisionBoard) {
  const markdown = `# ${board.name}

${board.description ? `> ${board.description}\n\n` : ''}

## 🎯 Vision
${board.vision || '_Not specified_'}

## 👥 Target Group
${board.targetGroup || '_Not specified_'}

## 🎯 Needs
${board.needs || '_Not specified_'}

## 📦 Product
${board.product || '_Not specified_'}

## 💰 Business Goals
${board.businessGoals || '_Not specified_'}

---
*Last updated: ${new Date(board.updatedAt).toLocaleString()}*
`
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `product-vision-board-${board.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function exportPVBAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element, { quality: 1, pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = 'product-vision-board.png'
  link.href = dataUrl
  link.click()
}

export async function exportPVBAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return
  const dataUrl = await html2canvas(element)
  const link = document.createElement('a')
  link.download = 'product-vision-board.svg'
  link.href = dataUrl
  link.click()
}
