import { McKinsey7S } from './types/mckinsey-7s'

/**
 * Export McKinsey 7S Framework as JSON
 */
export function exportMcKinsey7SAsJSON(framework: McKinsey7S) {
  const dataStr = JSON.stringify(framework, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

  const exportFileDefaultName = `mckinsey-7s-${framework.id}.json`

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

/**
 * Export McKinsey 7S Framework as CSV
 */
export function exportMcKinsey7SAsCSV(framework: McKinsey7S) {
  const rows = [
    ['Element', 'Content'],
    ['Strategy', framework.strategy],
    ['Structure', framework.structure],
    ['Systems', framework.systems],
    ['Shared Values', framework.sharedValues],
    ['Style', framework.style],
    ['Staff', framework.staff],
    ['Skills', framework.skills],
  ]

  const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `mckinsey-7s-${framework.id}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Export McKinsey 7S Framework as Markdown
 */
export function exportMcKinsey7SAsMarkdown(framework: McKinsey7S) {
  const markdown = `# ${framework.name}

${framework.description ? `> ${framework.description}\n\n` : ''}

## Hard Elements

### Strategy
${framework.strategy || '_Not specified_'}

### Structure
${framework.structure || '_Not specified_'}

### Systems
${framework.systems || '_Not specified_'}

## Soft Elements

### Shared Values
${framework.sharedValues || '_Not specified_'}

### Style
${framework.style || '_Not specified_'}

### Staff
${framework.staff || '_Not specified_'}

### Skills
${framework.skills || '_Not specified_'}

---
*Last updated: ${new Date(framework.updatedAt).toLocaleString()}*
`

  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `mckinsey-7s-${framework.id}.md`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Export McKinsey 7S Framework as plain text
 */
export function exportMcKinsey7SAsTXT(framework: McKinsey7S) {
  const text = `${framework.name}
${framework.description ? `\n${framework.description}\n` : ''}
${'='.repeat(80)}

HARD ELEMENTS

STRATEGY
${'-'.repeat(80)}
${framework.strategy || '(Not specified)'}

STRUCTURE
${'-'.repeat(80)}
${framework.structure || '(Not specified)'}

SYSTEMS
${'-'.repeat(80)}
${framework.systems || '(Not specified)'}

SOFT ELEMENTS

SHARED VALUES
${'-'.repeat(80)}
${framework.sharedValues || '(Not specified)'}

STYLE
${'-'.repeat(80)}
${framework.style || '(Not specified)'}

STAFF
${'-'.repeat(80)}
${framework.staff || '(Not specified)'}

SKILLS
${'-'.repeat(80)}
${framework.skills || '(Not specified)'}

${'='.repeat(80)}
Last updated: ${new Date(framework.updatedAt).toLocaleString()}
`

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `mckinsey-7s-${framework.id}.txt`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Export McKinsey 7S Framework as PNG
 */
export async function exportMcKinsey7SAsPNG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toPng
  const element = document.getElementById(elementId)
  if (!element) return

  const dataUrl = await html2canvas(element, {
    quality: 1,
    pixelRatio: 2,
  })

  const link = document.createElement('a')
  link.download = 'mckinsey-7s-framework.png'
  link.href = dataUrl
  link.click()
}

/**
 * Export McKinsey 7S Framework as JPEG
 */
export async function exportMcKinsey7SAsJPEG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toJpeg
  const element = document.getElementById(elementId)
  if (!element) return

  const dataUrl = await html2canvas(element, {
    quality: 0.95,
    pixelRatio: 2,
  })

  const link = document.createElement('a')
  link.download = 'mckinsey-7s-framework.jpg'
  link.href = dataUrl
  link.click()
}

/**
 * Export McKinsey 7S Framework as SVG
 */
export async function exportMcKinsey7SAsSVG(elementId: string) {
  const html2canvas = (await import('html-to-image')).toSvg
  const element = document.getElementById(elementId)
  if (!element) return

  const dataUrl = await html2canvas(element)

  const link = document.createElement('a')
  link.download = 'mckinsey-7s-framework.svg'
  link.href = dataUrl
  link.click()
}
