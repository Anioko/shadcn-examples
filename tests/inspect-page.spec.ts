import { test } from '@playwright/test'

test('inspect kanban page structure', async ({ page }) => {
  // Navigate to the page
  await page.goto('/frameworks/scrum/kanban', { waitUntil: 'networkidle' })

  // Wait a bit for full render
  await page.waitForTimeout(2000)

  console.log('\n=== PAGE STRUCTURE INSPECTION ===\n')

  // Check for headings
  console.log('--- ALL HEADINGS ---')
  const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
  for (const heading of headings) {
    const text = await heading.textContent()
    const tagName = await heading.evaluate(el => el.tagName)
    console.log(`${tagName}: "${text}"`)
  }

  // Check for search input
  console.log('\n--- SEARCH INPUT ---')
  const searchInputs = await page.locator('input[type="search"], input[type="text"], input[placeholder*="search" i], input[placeholder*="Search" i]').all()
  console.log(`Found ${searchInputs.length} potential search inputs`)
  for (const input of searchInputs) {
    const placeholder = await input.getAttribute('placeholder')
    const type = await input.getAttribute('type')
    console.log(`  Input: type="${type}", placeholder="${placeholder}"`)
  }

  // Check for buttons (potential filters)
  console.log('\n--- BUTTONS ---')
  const buttons = await page.locator('button').all()
  console.log(`Found ${buttons.length} buttons`)
  for (const button of buttons.slice(0, 10)) { // First 10 buttons
    const text = await button.textContent()
    const ariaLabel = await button.getAttribute('aria-label')
    console.log(`  Button: text="${text?.trim()}", aria-label="${ariaLabel}"`)
  }

  // Check for cards
  console.log('\n--- CARDS ---')
  const cards = await page.locator('[draggable="true"]').all()
  console.log(`Found ${cards.length} draggable cards`)
  if (cards.length > 0) {
    const firstCard = cards[0]
    const cardHtml = await firstCard.evaluate(el => el.outerHTML.substring(0, 200))
    console.log(`First card HTML: ${cardHtml}...`)
  }

  // Check for columns/sections
  console.log('\n--- COLUMNS/SECTIONS ---')
  const possibleColumns = await page.locator('section, div[class*="column"], div[class*="lane"], div[data-testid], main > div > div').all()
  console.log(`Found ${possibleColumns.length} potential column elements`)

  // Check for select dropdowns
  console.log('\n--- SELECT DROPDOWNS ---')
  const selects = await page.locator('select').all()
  console.log(`Found ${selects.length} select dropdowns`)

  // Check page title
  console.log('\n--- PAGE INFO ---')
  const title = await page.title()
  console.log(`Page title: ${title}`)

  // Take a screenshot
  await page.screenshot({ path: 'test-results/page-inspection.png', fullPage: true })
  console.log('\nScreenshot saved to test-results/page-inspection.png')

  console.log('\n=== END INSPECTION ===\n')
})
