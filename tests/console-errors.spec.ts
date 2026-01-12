import { test } from '@playwright/test'

test('capture console errors on workflow page', async ({ page }) => {
  const consoleMessages: string[] = []
  const pageErrors: string[] = []

  // Capture all console messages
  page.on('console', msg => {
    const type = msg.type()
    const text = msg.text()
    consoleMessages.push(`[${type}] ${text}`)
    if (type === 'error' || type === 'warning') {
      console.log(`[${type.toUpperCase()}] ${text}`)
    }
  })

  // Capture page errors
  page.on('pageerror', error => {
    pageErrors.push(error.message)
    console.log(`[PAGE ERROR] ${error.message}`)
    console.log(error.stack)
  })

  // Navigate to BPMN workflow first (simpler test)
  console.log('\n=== BPMN WORKFLOW ===')
  await page.goto('http://localhost:3003/frameworks/bpmn/workflow')
  await page.waitForTimeout(10000) // Wait longer for hydration

  console.log(`\nTotal console messages: ${consoleMessages.length}`)
  console.log(`Page errors: ${pageErrors.length}`)

  if (pageErrors.length > 0) {
    console.log('\n=== ALL PAGE ERRORS ===')
    pageErrors.forEach(err => console.log(err))
  }

  // Check what's actually rendered
  const bodyText = await page.evaluate(() => {
    const body = document.body
    // Get all text nodes
    return body.textContent?.substring(0, 500)
  })

  console.log('\n=== BODY CONTENT (first 500 chars) ===')
  console.log(bodyText)

  // Check for any divs with class names
  const classNames = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('[class]'))
    const classes = new Set<string>()
    elements.forEach(el => {
      el.className.split(' ').forEach(c => {
        if (c.trim()) classes.add(c.trim())
      })
    })
    return Array.from(classes).filter(c => c.includes('flow') || c.includes('react'))
  })

  console.log('\n=== REACT FLOW RELATED CLASSES ===')
  console.log(classNames)

  // Take screenshot
  await page.screenshot({
    path: 'test-results/workflow-page.png',
    fullPage: true
  })

  console.log('\n Screenshot saved to test-results/workflow-page.png')
})
