import { test, expect } from '@playwright/test'

test('ArchiMate node resizing works', async ({ page }) => {
  // Navigate to ArchiMate workflow
  await page.goto('http://localhost:3000/frameworks/archimate3.2/workflow')

  // Wait for page to load
  await page.waitForTimeout(2000)

  // Look for the "Add Node" dropdown
  await page.click('text=Add Node')
  await page.waitForTimeout(500)

  // Select a Business Actor node
  await page.click('text=Business Actor')
  await page.waitForTimeout(1000)

  // Click on the canvas to add the node
  const canvas = page.locator('.react-flow__renderer')
  await canvas.click({ position: { x: 400, y: 300 } })
  await page.waitForTimeout(1000)

  // Find and click the newly added node to select it
  const node = page.locator('.react-flow__node').first()
  await node.click()
  await page.waitForTimeout(500)

  // Check if NodeResizer handles are visible
  const resizerHandles = page.locator('.react-flow__resize-control')
  const count = await resizerHandles.count()

  console.log(`Found ${count} resize handles`)

  // Take a screenshot
  await page.screenshot({ path: 'tests/screenshots/archimate-resize-check.png', fullPage: true })

  // Verify resize handles exist
  expect(count).toBeGreaterThan(0)
})
