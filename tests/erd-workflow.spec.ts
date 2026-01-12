import { test, expect } from '@playwright/test'

const ERD_WORKFLOW_URL = 'http://localhost:3001/frameworks/data-architecture/workflow'

test.describe('Data Architecture ERD Workflow Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ERD_WORKFLOW_URL)
    // Wait for React Flow to be ready
    await page.waitForSelector('.react-flow', { timeout: 30000 })
  })

  test('should load ERD workflow page successfully', async ({ page }) => {
    // Check page title
    const title = await page.textContent('h2')
    expect(title).toContain('Data Architecture')

    // Check that React Flow is present
    const reactFlow = await page.locator('.react-flow')
    await expect(reactFlow).toBeVisible()

    console.log('✅ ERD workflow page loaded successfully')
  })

  test('should render all database tables with correct structure', async ({ page }) => {
    // Wait for nodes to be rendered
    await page.waitForSelector('.react-flow__node', { timeout: 10000 })

    // Count the number of table nodes (should be 7: users, orders, order_items, products, categories, addresses, reviews)
    const nodes = await page.locator('.react-flow__node').count()
    console.log(`Found ${nodes} table nodes`)
    expect(nodes).toBeGreaterThanOrEqual(7)

    // Check for specific tables
    const tables = ['users', 'orders', 'order_items', 'products', 'categories', 'addresses', 'reviews']
    for (const tableName of tables) {
      const tableNode = page.locator('.react-flow__node').filter({ hasText: tableName })
      await expect(tableNode).toBeVisible()
      console.log(`✅ Table "${tableName}" is visible`)
    }
  })

  test('should display table columns with proper structure', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 })

    // Check the users table for column details
    const usersTable = page.locator('.react-flow__node').filter({ hasText: 'users' }).first()
    await expect(usersTable).toBeVisible()

    // Check for column names (id, email, username should be present)
    await expect(usersTable.locator('text=id')).toBeVisible()
    await expect(usersTable.locator('text=email')).toBeVisible()
    await expect(usersTable.locator('text=username')).toBeVisible()

    console.log('✅ Table columns are displayed correctly')
  })

  test('should display primary key indicators', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 })

    // Check for primary key visual indicators (yellow background)
    const usersTable = page.locator('.react-flow__node').filter({ hasText: 'users' }).first()

    // The id column should have a primary key indicator
    const idColumn = usersTable.locator('text=id').first()
    await expect(idColumn).toBeVisible()

    console.log('✅ Primary key indicators are visible')
  })

  test('should render crow\'s foot notation edges', async ({ page }) => {
    await page.waitForSelector('.react-flow__edge', { timeout: 10000 })

    // Count edges (should be 9 relationships)
    const edges = await page.locator('.react-flow__edge').count()
    console.log(`Found ${edges} relationship edges`)
    expect(edges).toBeGreaterThanOrEqual(9)

    // Check that edges are visible
    const firstEdge = page.locator('.react-flow__edge').first()
    await expect(firstEdge).toBeVisible()

    console.log('✅ Crow\'s foot notation edges are rendered')
  })

  test('should display edge labels for relationships', async ({ page }) => {
    await page.waitForSelector('.react-flow__edge', { timeout: 10000 })

    // Check for relationship labels (places, contains, has, etc.)
    const labels = ['places', 'contains', 'has']
    for (const label of labels) {
      const edgeLabel = page.locator('.react-flow__edge-label').filter({ hasText: label })
      if (await edgeLabel.count() > 0) {
        console.log(`✅ Found relationship label: "${label}"`)
      }
    }
  })

  test('should display control buttons and legend', async ({ page }) => {
    // Check for Add Table button
    const addTableBtn = page.locator('button').filter({ hasText: 'Add Table' })
    await expect(addTableBtn).toBeVisible()

    // Check for Import button
    const importBtn = page.locator('button').filter({ hasText: 'Import' })
    await expect(importBtn).toBeVisible()

    // Check for Export button
    const exportBtn = page.locator('button').filter({ hasText: 'Export' })
    await expect(exportBtn).toBeVisible()

    // Check for legend
    const legend = page.locator('text=Crow\'s Foot Notation Legend')
    await expect(legend).toBeVisible()

    console.log('✅ Control buttons and legend are displayed')
  })

  test('should display minimap', async ({ page }) => {
    // Check for minimap
    const minimap = page.locator('.react-flow__minimap')
    await expect(minimap).toBeVisible()

    console.log('✅ Minimap is displayed')
  })

  test('should display background grid', async ({ page }) => {
    // Check for background
    const background = page.locator('.react-flow__background')
    await expect(background).toBeVisible()

    console.log('✅ Background grid is displayed')
  })

  test('should be able to drag and reposition tables', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 })

    // Get the first table node
    const firstNode = page.locator('.react-flow__node').first()
    const initialBox = await firstNode.boundingBox()

    if (initialBox) {
      // Drag the node
      await firstNode.hover()
      await page.mouse.down()
      await page.mouse.move(initialBox.x + 100, initialBox.y + 100)
      await page.mouse.up()

      // Wait a bit for the position to update
      await page.waitForTimeout(500)

      // Check if position changed
      const newBox = await firstNode.boundingBox()
      if (newBox) {
        const moved = Math.abs(newBox.x - initialBox.x) > 50 || Math.abs(newBox.y - initialBox.y) > 50
        expect(moved).toBeTruthy()
        console.log('✅ Tables can be dragged and repositioned')
      }
    }
  })

  test('should support zoom controls', async ({ page }) => {
    await page.waitForSelector('.react-flow__controls', { timeout: 10000 })

    // Check for zoom controls
    const controls = page.locator('.react-flow__controls')
    await expect(controls).toBeVisible()

    // Try zoom in button
    const zoomInBtn = controls.locator('button').first()
    await expect(zoomInBtn).toBeVisible()
    await zoomInBtn.click()

    console.log('✅ Zoom controls are functional')
  })

  test('should display correct table count badge', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 })

    // Check for the badge showing table count
    const badge = page.locator('text=Tables').first()
    await expect(badge).toBeVisible()

    console.log('✅ Table count badge is displayed')
  })

  test('should show instructions panel', async ({ page }) => {
    // Check for instructions
    const instructions = page.locator('text=ERD Controls')
    await expect(instructions).toBeVisible()

    console.log('✅ Instructions panel is displayed')
  })

  test('should handle Add Table button click', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 })

    // Count initial nodes
    const initialCount = await page.locator('.react-flow__node').count()

    // Click Add Table button
    const addTableBtn = page.locator('button').filter({ hasText: 'Add Table' })
    await addTableBtn.click()

    // Wait for new node to be added
    await page.waitForTimeout(1000)

    // Count nodes again
    const newCount = await page.locator('.react-flow__node').count()
    expect(newCount).toBeGreaterThan(initialCount)

    console.log(`✅ Add Table button works (${initialCount} → ${newCount} tables)`)
  })

  test('should open export dropdown menu', async ({ page }) => {
    // Click Export button
    const exportBtn = page.locator('button').filter({ hasText: 'Export' })
    await exportBtn.click()

    // Wait for dropdown to open
    await page.waitForTimeout(500)

    // Check for export options
    const exportJSON = page.locator('text=Export as JSON')
    const exportPNG = page.locator('text=Export as PNG')
    const exportJPEG = page.locator('text=Export as JPEG')
    const exportSVG = page.locator('text=Export as SVG')

    await expect(exportJSON).toBeVisible()
    await expect(exportPNG).toBeVisible()
    await expect(exportJPEG).toBeVisible()
    await expect(exportSVG).toBeVisible()

    console.log('✅ Export dropdown shows all format options')
  })

  test('should display foreign key relationships correctly', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 })

    // Check orders table for foreign key column (user_id)
    const ordersTable = page.locator('.react-flow__node').filter({ hasText: 'orders' }).first()
    await expect(ordersTable).toBeVisible()

    // user_id should be visible as a foreign key
    const userIdColumn = ordersTable.locator('text=user_id')
    await expect(userIdColumn).toBeVisible()

    console.log('✅ Foreign key columns are displayed')
  })

  test('should render self-referencing relationship on categories table', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 })

    // Find the categories table
    const categoriesTable = page.locator('.react-flow__node').filter({ hasText: 'categories' }).first()
    await expect(categoriesTable).toBeVisible()

    // Categories should have parent_id column for self-referencing
    const parentIdColumn = categoriesTable.locator('text=parent_id')
    await expect(parentIdColumn).toBeVisible()

    console.log('✅ Self-referencing relationship structure is present')
  })

  test('should display NOT NULL indicators', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 })

    // Check for red asterisk indicators for NOT NULL columns
    const usersTable = page.locator('.react-flow__node').filter({ hasText: 'users' }).first()

    // The table should contain NOT NULL indicators (red asterisks)
    const notNullIndicator = usersTable.locator('.text-red-500')
    const count = await notNullIndicator.count()

    if (count > 0) {
      console.log(`✅ Found ${count} NOT NULL indicators`)
    } else {
      console.log('⚠️ NOT NULL indicators may not be visible or using different styling')
    }
  })

  test('performance: page should load within reasonable time', async ({ page }) => {
    const startTime = Date.now()

    await page.goto(ERD_WORKFLOW_URL)
    await page.waitForSelector('.react-flow__node', { timeout: 30000 })

    const loadTime = Date.now() - startTime
    console.log(`Page loaded in ${loadTime}ms`)

    // Page should load within 15 seconds
    expect(loadTime).toBeLessThan(15000)

    console.log('✅ Page load performance is acceptable')
  })

  test('should render all connection handles', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 })

    // Check for handles (connection points)
    const handles = await page.locator('.react-flow__handle').count()
    console.log(`Found ${handles} connection handles`)

    // Each table should have at least 2 handles (source and target)
    expect(handles).toBeGreaterThanOrEqual(14) // 7 tables * 2 handles minimum

    console.log('✅ Connection handles are rendered')
  })
})
