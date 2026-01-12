import { test } from '@playwright/test'

test('simple navigation test', async ({ page }) => {
  // Try the root page first
  console.log('1. Testing root page...')
  await page.goto('http://localhost:3003/')
  await page.waitForTimeout(3000)
  let title = await page.title()
  console.log('Root page title:', title)

  // Try the dashboard
  console.log('\n2. Testing dashboard...')
  await page.goto('http://localhost:3003/dashboard')
  await page.waitForTimeout(3000)
  title = await page.title()
  console.log('Dashboard title:', title)

  // Try a framework overview
  console.log('\n3. Testing framework overview (BPMN)...')
  await page.goto('http://localhost:3003/frameworks/bpmn')
  await page.waitForTimeout(3000)
  title = await page.title()
  console.log('BPMN overview title:', title)
  const html = await page.evaluate(() => document.body.textContent?.substring(0, 200))
  console.log('BPMN page content:', html)

  // Try BPMN workflow
  console.log('\n4. Testing BPMN workflow...')
  await page.goto('http://localhost:3003/frameworks/bpmn/workflow')
  await page.waitForTimeout(5000)
  title = await page.title()
  console.log('BPMN workflow title:', title)
  const reactFlowCount = await page.locator('.react-flow').count()
  console.log('React Flow elements:', reactFlowCount)

  // Try ArchiMate with different slug format
  console.log('\n5. Testing ArchiMate with different formats...')

  const slugVariants = [
    'archimate3.2',
    'archimate32',
    'archimate-3-2',
  ]

  for (const slug of slugVariants) {
    console.log(`\n  Trying slug: ${slug}`)
    await page.goto(`http://localhost:3003/frameworks/${slug}/workflow`)
    await page.waitForTimeout(3000)
    title = await page.title()
    const content = await page.evaluate(() => document.body.textContent?.substring(0, 100))
    console.log(`  Title: ${title}`)
    console.log(`  Content: ${content}`)
    const rfCount = await page.locator('.react-flow').count()
    console.log(`  React Flow count: ${rfCount}`)
  }
})
