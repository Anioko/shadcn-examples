import { test } from '@playwright/test'

test('ERD Screenshot - Capture current rendering', async ({ page }) => {
  await page.goto('http://localhost:3004/frameworks/data-architecture/workflow')

  // Wait for React Flow to load
  await page.waitForSelector('.react-flow', { state: 'attached', timeout: 15000 })
  await page.waitForTimeout(3000) // Wait for everything to render

  // Take full page screenshot
  await page.screenshot({
    path: 'erd-full-page.png',
    fullPage: true
  })

  console.log('✅ Screenshot saved: erd-full-page.png')

  // Zoom in on a relationship to see detail
  await page.evaluate(() => {
    const reactFlow = document.querySelector('.react-flow')
    if (reactFlow) {
      // @ts-ignore
      reactFlow.scrollTop = 200
      // @ts-ignore
      reactFlow.scrollLeft = 300
    }
  })

  await page.waitForTimeout(500)

  await page.screenshot({
    path: 'erd-relationship-detail.png',
    clip: { x: 300, y: 200, width: 800, height: 400 }
  })

  console.log('✅ Detail screenshot saved: erd-relationship-detail.png')
})
