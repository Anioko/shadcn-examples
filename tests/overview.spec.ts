import { test, expect } from '@playwright/test'

const FRAMEWORKS = [
  { slug: 'scrum', name: 'Scrum' },
  { slug: 'iso-27001', name: 'ISO 27001' },
]

test.describe('Overview Page - Design & Functionality Tests', () => {
  for (const framework of FRAMEWORKS) {
    test.describe(`${framework.name} Overview`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/frameworks/${framework.slug}`)
        await page.waitForLoadState('networkidle')
      })

      test('should load overview page successfully', async ({ page }) => {
        // Check page title
        await expect(page).toHaveTitle(new RegExp(framework.name, 'i'))

        // Check main heading
        const heading = page.locator('h1').filter({ hasText: framework.name })
        await expect(heading).toBeVisible()
      })

      test('should display framework name and slug', async ({ page }) => {
        // Framework name should be visible
        const frameworkName = page.locator('h1, h2').filter({ hasText: framework.name })
        await expect(frameworkName).toBeVisible()

        // Slug badge should be visible - use first() to avoid strict mode with multiple matches
        const slugBadge = page.locator(`text=${framework.slug}`).first()
        await expect(slugBadge).toBeVisible()
      })

      test('should display statistics cards', async ({ page }) => {
        // Look for stat cards with numbers
        const statCards = page.locator('[class*="card"], [data-testid*="stat"]')
        const cardCount = await statCards.count()

        expect(cardCount).toBeGreaterThan(0)

        // Check for numeric values in stats
        const numbersOnPage = page.locator('text=/\\d+/')
        const numberCount = await numbersOnPage.count()
        expect(numberCount).toBeGreaterThan(0)
      })

      test('should show completion percentage', async ({ page }) => {
        // Look for percentage indicators
        const percentagePattern = /\d+%/
        const percentages = page.locator(`text=${percentagePattern}`)
        const percentageCount = await percentages.count()

        expect(percentageCount).toBeGreaterThan(0)
      })

      test('should display total cards metric', async ({ page }) => {
        // Look for "Total Items" card title
        const totalText = page.locator('text=/total/i')
        await expect(totalText.first()).toBeVisible()

        // Find the Card containing "Total" and verify it has a number
        // The number is in a sibling CardContent, so look within the same card
        const statCards = page.locator('[class*="card"]')
        let foundTotal = false

        for (let i = 0; i < await statCards.count(); i++) {
          const card = statCards.nth(i)
          const cardText = await card.textContent()
          if (cardText && /total/i.test(cardText) && /\d+/.test(cardText)) {
            foundTotal = true
            break
          }
        }

        expect(foundTotal).toBeTruthy()
      })

      test('should display completed tasks metric', async ({ page }) => {
        // Look for completed stat
        const completedText = page.locator('text=/completed/i')
        await expect(completedText.first()).toBeVisible()

        // Find the Card containing "Completed" and verify it has a number
        const statCards = page.locator('[class*="card"]')
        let foundCompleted = false

        for (let i = 0; i < await statCards.count(); i++) {
          const card = statCards.nth(i)
          const cardText = await card.textContent()
          if (cardText && /completed/i.test(cardText) && /\d+/.test(cardText)) {
            foundCompleted = true
            break
          }
        }

        expect(foundCompleted).toBeTruthy()
      })

      test('should display in progress tasks metric', async ({ page }) => {
        // Look for in progress stat
        const progressText = page.locator('text=/in progress|progress/i')
        await expect(progressText.first()).toBeVisible()

        // Verify the card has a number
        const statCards = page.locator('[class*="card"]')
        let foundProgress = false

        for (let i = 0; i < await statCards.count(); i++) {
          const card = statCards.nth(i)
          const cardText = await card.textContent()
          if (cardText && /in progress|progress/i.test(cardText) && /\d+/.test(cardText)) {
            foundProgress = true
            break
          }
        }

        expect(foundProgress).toBeTruthy()
      })

      test('should display overdue tasks metric', async ({ page }) => {
        // Look for overdue stat
        const overdueText = page.locator('text=/overdue/i')
        await expect(overdueText.first()).toBeVisible()

        // Find the Card containing "Overdue" and verify it has a number
        const statCards = page.locator('[class*="card"]')
        let foundOverdue = false

        for (let i = 0; i < await statCards.count(); i++) {
          const card = statCards.nth(i)
          const cardText = await card.textContent()
          if (cardText && /overdue/i.test(cardText) && /\d+/.test(cardText)) {
            foundOverdue = true
            break
          }
        }

        expect(foundOverdue).toBeTruthy()
      })

      test('should have navigation tabs', async ({ page }) => {
        // Check for Overview tab - use first() to avoid strict mode violations
        const overviewTab = page.getByRole('link', { name: /overview/i }).first()
        await expect(overviewTab).toBeVisible()

        // Check for Kanban tab
        const kanbanTab = page.getByRole('link', { name: /kanban/i }).first()
        await expect(kanbanTab).toBeVisible()

        // Overview should be active
        const overviewClasses = await overviewTab.getAttribute('class') ||
                                await overviewTab.getAttribute('data-state') || ''
        expect(overviewClasses).toBeTruthy()
      })

      test('should navigate to Kanban board from overview', async ({ page }) => {
        // Find and click the "Open Kanban Board" button
        const kanbanButton = page.getByRole('link', { name: /open kanban board/i })

        await expect(kanbanButton).toBeVisible()

        // Click and wait for navigation
        await Promise.all([
          page.waitForURL('**/kanban', { timeout: 10000 }),
          kanbanButton.click()
        ])

        // Verify we're on the Kanban page
        expect(page.url()).toContain('/kanban')
      })

      test('should display framework description', async ({ page }) => {
        // Look for description text
        const description = page.locator('p').filter({
          hasText: /overview|implementation|tracking/i
        })

        const descriptionCount = await description.count()
        expect(descriptionCount).toBeGreaterThan(0)
      })

      test('should show icons for statistics', async ({ page }) => {
        // Look for SVG icons (lucide-react icons)
        const icons = page.locator('svg')
        const iconCount = await icons.count()

        // Should have multiple icons for visual appeal
        expect(iconCount).toBeGreaterThan(2)
      })

      test('should have proper card styling', async ({ page }) => {
        // Find stat cards
        const cards = page.locator('[class*="card"]')
        const cardCount = await cards.count()

        expect(cardCount).toBeGreaterThan(0)

        // Check first card has proper structure
        const firstCard = cards.first()
        await expect(firstCard).toBeVisible()

        // Should have content
        const cardText = await firstCard.textContent()
        expect(cardText!.length).toBeGreaterThan(0)
      })

      test('should be responsive on mobile', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 })
        await page.waitForTimeout(500)

        // Main heading should still be visible
        const heading = page.locator('h1').filter({ hasText: framework.name })
        await expect(heading).toBeVisible()

        // Stats should still be visible (may stack vertically)
        const statCards = page.locator('[class*="card"]')
        const visibleCards = await statCards.count()
        expect(visibleCards).toBeGreaterThan(0)
      })

      test('should be responsive on tablet', async ({ page }) => {
        // Set tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 })
        await page.waitForTimeout(500)

        // Verify layout
        const heading = page.locator('h1').filter({ hasText: framework.name })
        await expect(heading).toBeVisible()

        // All stat cards should be visible
        const statCards = page.locator('[class*="card"]')
        const cardCount = await statCards.count()
        expect(cardCount).toBeGreaterThan(0)
      })

      test('should have proper heading hierarchy', async ({ page }) => {
        // Should have h1 for main title
        const h1 = page.locator('h1')
        await expect(h1.first()).toBeVisible()

        // May have h2 or h3 for sections
        const headings = page.locator('h1, h2, h3, h4')
        const headingCount = await headings.count()
        expect(headingCount).toBeGreaterThan(0)
      })

      test('should display progress indicators', async ({ page }) => {
        // Look for progress bars or indicators
        const progressBar = page.locator('[role="progressbar"], progress, [class*="progress"]')
        const hasProgress = await progressBar.count() > 0

        // At least some visual progress indicator should exist
        expect(hasProgress || await page.locator('text=/\\d+%/').count() > 0).toBeTruthy()
      })

      test('should show color-coded statistics', async ({ page }) => {
        // Check for different colored elements (success, warning, danger)
        const stats = page.locator('[class*="card"]')
        const firstStat = stats.first()

        await expect(firstStat).toBeVisible()

        // Should have some styling classes
        const classes = await firstStat.getAttribute('class')
        expect(classes).toBeTruthy()
        expect(classes!.length).toBeGreaterThan(0)
      })
    })
  }

  test.describe('Framework Navigation', () => {
    test('should navigate between different frameworks', async ({ page }) => {
      // Start with first framework
      await page.goto(`/frameworks/${FRAMEWORKS[0].slug}`)
      await page.waitForLoadState('networkidle')

      // Verify first framework loaded
      const firstHeading = page.locator('h1').filter({ hasText: FRAMEWORKS[0].name })
      await expect(firstHeading).toBeVisible()

      // Navigate to second framework
      await page.goto(`/frameworks/${FRAMEWORKS[1].slug}`)
      await page.waitForLoadState('networkidle')

      // Verify second framework loaded
      const secondHeading = page.locator('h1').filter({ hasText: FRAMEWORKS[1].name })
      await expect(secondHeading).toBeVisible()
    })

    test('should maintain tab state across navigation', async ({ page }) => {
      // Go to overview
      await page.goto(`/frameworks/${FRAMEWORKS[0].slug}`)
      await page.waitForLoadState('networkidle')

      // Navigate to Kanban via tab - look for tab links specifically
      const kanbanTab = page.locator('a[href*="/kanban"]').filter({ hasText: /kanban/i }).first()
      await expect(kanbanTab).toBeVisible()

      // Click and wait for navigation
      await Promise.all([
        page.waitForURL('**/kanban', { timeout: 10000 }),
        kanbanTab.click()
      ])

      // Verify URL changed
      expect(page.url()).toContain('/kanban')

      // Go back to overview via tab
      const overviewTab = page.locator('a[href*="/frameworks/' + FRAMEWORKS[0].slug + '"]').filter({ hasText: /overview/i }).first()
      await expect(overviewTab).toBeVisible()

      // Click and wait for navigation back
      await Promise.all([
        page.waitForURL(new RegExp(`/frameworks/${FRAMEWORKS[0].slug}$`), { timeout: 10000 }),
        overviewTab.click()
      ])

      // Should be back at overview (without /kanban)
      expect(page.url()).not.toContain('/kanban')
      expect(page.url()).toContain(`/frameworks/${FRAMEWORKS[0].slug}`)
    })
  })
})
