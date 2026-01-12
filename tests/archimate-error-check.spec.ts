import { test } from '@playwright/test'

const ARCHIMATE_WORKFLOW_URL = 'http://localhost:3003/frameworks/archimate3.2/workflow'

test('check for error on ArchiMate page', async ({ page }) => {
  // Capture console messages
  const consoleMessages: string[] = []
  page.on('console', msg => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`)
  })

  // Capture page errors
  const pageErrors: string[] = []
  page.on('pageerror', error => {
    pageErrors.push(error.message)
  })

  await page.goto(ARCHIMATE_WORKFLOW_URL)

  await page.waitForTimeout(10000)

  // Get the full body text
  const bodyText = await page.evaluate(() => document.body.textContent)
  console.log('=== PAGE CONTENT ===')
  console.log(bodyText)
  console.log('===================')

  // Get the HTML
  const bodyHTML = await page.evaluate(() => document.body.innerHTML)
  console.log('=== PAGE HTML ===')
  console.log(bodyHTML.substring(0, 500))
  console.log('=================')

  console.log('=== CONSOLE MESSAGES ===')
  consoleMessages.forEach(msg => console.log(msg))
  console.log('========================')

  console.log('=== PAGE ERRORS ===')
  pageErrors.forEach(err => console.log(err))
  console.log('===================')

  await page.screenshot({
    path: 'test-results/error-page.png',
    fullPage: true
  })
})
