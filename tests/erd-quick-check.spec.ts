import { test, expect } from '@playwright/test'

test('ERD Quick Check - Is React Flow visible now?', async ({ page }) => {
  await page.goto('http://localhost:3001/frameworks/data-architecture/workflow')

  // Wait for React Flow element to exist (not necessarily visible)
  await page.waitForSelector('.react-flow', { state: 'attached', timeout: 10000 })

  // Check if React Flow is visible
  const reactFlow = page.locator('.react-flow')
  const isVisible = await reactFlow.isVisible()

  console.log('✅ React Flow visible:', isVisible)

  // Check height
  const box = await reactFlow.boundingBox()
  console.log('React Flow height:', box?.height)

  // Check for nodes
  const nodeCount = await page.locator('.react-flow__node').count()
  console.log('Nodes found:', nodeCount)

  // Check for edges
  const edgeCount = await page.locator('.react-flow__edge').count()
  console.log('Edges found:', edgeCount)

  // Assertions
  expect(isVisible).toBe(true)
  expect(box?.height).toBeGreaterThan(0)
  expect(nodeCount).toBeGreaterThanOrEqual(7)
  expect(edgeCount).toBeGreaterThanOrEqual(9)

  console.log('✅ ERD Workflow is working correctly!')
})
