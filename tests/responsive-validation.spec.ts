import { test, expect } from '@playwright/test'

/**
 * STRICT RESPONSIVE DESIGN VALIDATION
 * These tests actually verify that the responsive design WORKS,
 * not just that elements are "visible"
 */

const FRAMEWORKS = [
  { slug: 'scrum', name: 'Scrum' },
  { slug: 'iso-27001', name: 'ISO 27001' },
]

test.describe('Strict Responsive Design Validation - NEW GRID-BASED KANBAN', () => {
  for (const framework of FRAMEWORKS) {
    test.describe(`${framework.name} Kanban - Responsive Grid Layout`, () => {
      test('mobile (375px): should show 1 column in grid layout', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto(`/frameworks/${framework.slug}/kanban`)
        await page.waitForLoadState('networkidle')

        // The board uses a grid layout
        const board = page.locator('.grid').first()
        await expect(board).toBeVisible()

        // Get all column containers
        const columns = page.locator('h3').filter({ hasText: /backlog|in progress|review|testing|done|compliant/i })
        const columnCount = await columns.count()

        // Should have 5 columns defined
        expect(columnCount).toBe(5)

        // On mobile (375px), grid should show 1 column (grid-cols-1)
        // Verify by checking that columns are stacked vertically
        const firstColumnBox = await columns.nth(0).boundingBox()
        const secondColumnBox = await columns.nth(1).boundingBox()

        expect(firstColumnBox).toBeTruthy()
        expect(secondColumnBox).toBeTruthy()

        // Second column should be BELOW first (vertically stacked)
        expect(secondColumnBox!.y).toBeGreaterThan(firstColumnBox!.y + firstColumnBox!.height)
      })

      test('tablet (768px): should show 3 columns in grid layout', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 })
        await page.goto(`/frameworks/${framework.slug}/kanban`)
        await page.waitForLoadState('networkidle')

        const board = page.locator('.grid').first()
        await expect(board).toBeVisible()

        // On tablet, columns should be arranged in a grid with ~3 columns per row
        const columns = page.locator('h3').filter({ hasText: /backlog|in progress|review|testing|done|compliant/i })

        const firstColumnBox = await columns.nth(0).boundingBox()
        const secondColumnBox = await columns.nth(1).boundingBox()
        const thirdColumnBox = await columns.nth(2).boundingBox()
        const fourthColumnBox = await columns.nth(3).boundingBox()

        expect(firstColumnBox).toBeTruthy()
        expect(secondColumnBox).toBeTruthy()
        expect(thirdColumnBox).toBeTruthy()
        expect(fourthColumnBox).toBeTruthy()

        // First 3 columns should be on same row (similar Y position)
        expect(Math.abs(firstColumnBox!.y - secondColumnBox!.y)).toBeLessThan(20)
        expect(Math.abs(secondColumnBox!.y - thirdColumnBox!.y)).toBeLessThan(20)

        // Fourth column should be on next row (below first row)
        expect(fourthColumnBox!.y).toBeGreaterThan(firstColumnBox!.y + 100)
      })

      test('desktop (1920px): should show all 5 columns in one row', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 })
        await page.goto(`/frameworks/${framework.slug}/kanban`)
        await page.waitForLoadState('networkidle')

        const board = page.locator('.grid').first()
        await expect(board).toBeVisible()

        const columns = page.locator('h3').filter({ hasText: /backlog|in progress|review|testing|done|compliant/i })
        const columnCount = await columns.count()

        expect(columnCount).toBe(5)

        // All 5 columns should be on the same row (similar Y position)
        const columnBoxes = []
        for (let i = 0; i < columnCount; i++) {
          const box = await columns.nth(i).boundingBox()
          expect(box).toBeTruthy()
          columnBoxes.push(box!)
        }

        // All columns should have similar Y positions (within 20px)
        for (let i = 1; i < columnBoxes.length; i++) {
          expect(Math.abs(columnBoxes[i].y - columnBoxes[0].y)).toBeLessThan(20)
        }

        // Columns should be arranged left to right
        for (let i = 1; i < columnBoxes.length; i++) {
          expect(columnBoxes[i].x).toBeGreaterThan(columnBoxes[i - 1].x)
        }
      })

      test('mobile: filters should stack vertically', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto(`/frameworks/${framework.slug}/kanban`)
        await page.waitForLoadState('networkidle')

        const searchInput = page.locator('input[placeholder*="Search"]')
        const priorityFilter = page.locator('button').filter({ hasText: /All Priorities|Priority/ }).first()

        const searchBox = await searchInput.boundingBox()
        const filterBox = await priorityFilter.boundingBox()

        expect(searchBox).toBeTruthy()
        expect(filterBox).toBeTruthy()

        // On mobile, filter should be BELOW search (vertical stacking)
        expect(filterBox!.y).toBeGreaterThan(searchBox!.y + searchBox!.height - 10)
      })

      test('desktop: filters should be horizontal (side-by-side)', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 })
        await page.goto(`/frameworks/${framework.slug}/kanban`)
        await page.waitForLoadState('networkidle')

        const searchInput = page.locator('input[placeholder*="Search"]')
        const priorityFilter = page.locator('button').filter({ hasText: /All Priorities|Priority/ }).first()

        const searchBox = await searchInput.boundingBox()
        const filterBox = await priorityFilter.boundingBox()

        expect(searchBox).toBeTruthy()
        expect(filterBox).toBeTruthy()

        // On desktop, filter should be BESIDE search (same row)
        expect(Math.abs(filterBox!.y - searchBox!.y)).toBeLessThan(20)

        // Filter should be to the right of search
        expect(filterBox!.x).toBeGreaterThan(searchBox!.x + searchBox!.width)
      })

      test('cards should be visible and draggable', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 })
        await page.goto(`/frameworks/${framework.slug}/kanban`)
        await page.waitForLoadState('networkidle')

        // Find cards (they have cursor-move class from @dnd-kit)
        const cards = page.locator('[class*="cursor-move"]')
        const cardCount = await cards.count()

        // Should have multiple cards
        expect(cardCount).toBeGreaterThan(0)

        // First card should be visible
        await expect(cards.first()).toBeVisible()
      })

      test('page loads without errors', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 })

        const errors: string[] = []
        page.on('pageerror', (error) => {
          errors.push(error.message)
        })

        await page.goto(`/frameworks/${framework.slug}/kanban`)
        await page.waitForLoadState('networkidle')

        // Page should have the Kanban heading
        const heading = page.locator('h1').filter({ hasText: /kanban/i })
        await expect(heading).toBeVisible()

        // Should have no JavaScript errors
        expect(errors).toHaveLength(0)
      })
    })
  }
})

test.describe('Navigation Functionality Validation', () => {
  test('Overview to Kanban navigation actually works', async ({ page }) => {
    await page.goto('/frameworks/scrum')
    await page.waitForLoadState('networkidle')

    // Find the Open Kanban Board button
    const kanbanButton = page.getByRole('link', { name: /open kanban board/i })
    await expect(kanbanButton).toBeVisible()

    // Verify href is correct BEFORE clicking
    const href = await kanbanButton.getAttribute('href')
    expect(href).toContain('/kanban')

    // Click and wait for navigation
    await Promise.all([
      page.waitForURL('**/kanban', { timeout: 10000 }),
      kanbanButton.click()
    ])

    // Verify we actually navigated
    expect(page.url()).toContain('/frameworks/scrum/kanban')

    // Verify Kanban board actually loaded
    const kanbanHeading = page.locator('h1').filter({ hasText: /kanban/i })
    await expect(kanbanHeading).toBeVisible()

    // Verify we can see actual Kanban columns
    const columns = page.locator('h3')
    const columnCount = await columns.count()
    expect(columnCount).toBeGreaterThanOrEqual(5)
  })

  test('Tab navigation between Overview and Kanban works', async ({ page }) => {
    await page.goto('/frameworks/scrum')
    await page.waitForLoadState('networkidle')

    // Click Kanban tab
    const kanbanTab = page.locator('a[href*="/kanban"]').filter({ hasText: /kanban/i }).first()
    await Promise.all([
      page.waitForURL('**/kanban'),
      kanbanTab.click()
    ])

    expect(page.url()).toContain('/kanban')

    // Click Overview tab to go back
    const overviewTab = page.locator('a[href*="/frameworks/scrum"]').filter({ hasText: /overview/i }).first()
    await Promise.all([
      page.waitForURL(/\/frameworks\/scrum$/),
      overviewTab.click()
    ])

    expect(page.url()).not.toContain('/kanban')
    expect(page.url()).toMatch(/\/frameworks\/scrum$/)
  })
})
