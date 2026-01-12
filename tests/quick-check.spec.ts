import { test, expect } from '@playwright/test'

test('quick check - ArchiMate workflow loads', async ({ page }) => {
  const consoleErrors: string[] = []

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text())
      console.log('[ERROR]', msg.text())
    }
  })

  page.on('pageerror', error => {
    console.log('[PAGE ERROR]', error.message)
  })

  console.log('Navigating to ArchiMate workflow...')
  await page.goto('http://localhost:3001/frameworks/archimate3.2/workflow')

  // Wait for page to load
  await page.waitForTimeout(15000)

  const title = await page.title()
  console.log('Page title:', title)

  // Check for React Flow
  const reactFlowCount = await page.locator('.react-flow').count()
  console.log('React Flow elements found:', reactFlowCount)

  // Check for nodes
  const nodesCount = await page.locator('[data-id]').count()
  console.log('Nodes found:', nodesCount)

  // Take screenshot
  await page.screenshot({ path: 'test-results/archimate-quick-check.png', fullPage: true })
  console.log('Screenshot saved')

  // Verify
  expect(reactFlowCount).toBeGreaterThan(0)
  expect(nodesCount).toBeGreaterThan(0)
  console.log('✓ Page loaded successfully!')
})
