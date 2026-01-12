import { test, expect } from '@playwright/test'

const ARCHIMATE_WORKFLOW_URL = 'http://localhost:3003/frameworks/archimate3.2/workflow'

test.describe('ArchiMate Debug Tests', () => {
  test('debug: navigate and inspect page', async ({ page }) => {
    console.log('Navigating to:', ARCHIMATE_WORKFLOW_URL)

    await page.goto(ARCHIMATE_WORKFLOW_URL)

    // Wait longer for page to load
    await page.waitForTimeout(10000)

    // Take screenshot
    await page.screenshot({
      path: 'test-results/debug-archimate-page.png',
      fullPage: true
    })

    // Log page HTML structure
    const bodyHTML = await page.evaluate(() => document.body.innerHTML)
    console.log('Page HTML length:', bodyHTML.length)

    // Check for React Flow elements
    const reactFlowExists = await page.locator('.react-flow').count()
    console.log('React Flow elements found:', reactFlowExists)

    // Check for any React Flow related classes
    const allDivs = await page.locator('div').count()
    console.log('Total div elements:', allDivs)

    // Log all class names on the page
    const classNames = await page.evaluate(() => {
      const elements = document.querySelectorAll('[class]')
      const classes = new Set<string>()
      elements.forEach(el => {
        el.className.split(' ').forEach(c => c.trim() && classes.add(c))
      })
      return Array.from(classes).sort()
    })

    console.log('All CSS classes on page:', classNames.length)
    console.log('Sample classes:', classNames.slice(0, 20))

    // Check for data-id attributes
    const dataIdElements = await page.locator('[data-id]').count()
    console.log('Elements with data-id:', dataIdElements)

    // Check title
    const title = await page.title()
    console.log('Page title:', title)

    // Check for any errors in console
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Browser console error:', msg.text())
      }
    })

    // Log current URL
    const currentUrl = page.url()
    console.log('Current URL:', currentUrl)
  })
})
