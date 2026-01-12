import { test } from '@playwright/test'

test('ERD Debug - Capture page state', async ({ page }) => {
  const ERD_URL = 'http://localhost:3001/frameworks/data-architecture/workflow'

  // Capture console logs BEFORE navigation
  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()))
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message))
  page.on('crash', () => console.log('BROWSER CRASHED'))
  page.on('response', response => {
    if (!response.ok()) {
      console.log('❌ FAILED REQUEST:', response.url(), 'Status:', response.status())
    }
  })

  console.log('Navigating to:', ERD_URL)
  await page.goto(ERD_URL, { waitUntil: 'networkidle' })

  // Wait a bit for React to render
  await page.waitForTimeout(5000)

  // Take screenshot
  await page.screenshot({ path: 'erd-debug-screenshot.png', fullPage: true })

  // Check page title and HTML
  const title = await page.title()
  console.log('Page title:', title)

  const html = await page.content()
  console.log('Page HTML length:', html.length)

  // Check for React Flow
  const reactFlowExists = await page.locator('.react-flow').count()
  console.log('React Flow elements found:', reactFlowExists)

  if (reactFlowExists > 0) {
    const isVisible = await page.locator('.react-flow').isVisible()
    console.log('React Flow visible:', isVisible)

    const box = await page.locator('.react-flow').boundingBox()
    console.log('React Flow bounding box:', box)

    // Check computed styles
    const styles = await page.locator('.react-flow').evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return {
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity,
        width: computed.width,
        height: computed.height,
        position: computed.position,
      }
    })
    console.log('React Flow computed styles:', styles)
  }

  // Check for nodes
  const nodeCount = await page.locator('.react-flow__node').count()
  console.log('React Flow nodes found:', nodeCount)

  // Check for edges
  const edgeCount = await page.locator('.react-flow__edge').count()
  console.log('React Flow edges found:', edgeCount)

  // Check for any error messages
  const errorMessages = await page.locator('[role="alert"]').allTextContents()
  if (errorMessages.length > 0) {
    console.log('Error messages on page:', errorMessages)
  }

  // Check page source for data-architecture
  console.log('Page contains "Data Architecture":', html.includes('Data Architecture'))
  console.log('Page contains "ERDWorkflowBoardWrapper":', html.includes('ERDWorkflowBoardWrapper'))

  // Wait to keep browser open
  await page.waitForTimeout(60000)
})
