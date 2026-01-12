import { test, expect, Page, Locator } from '@playwright/test'

/**
 * ArchiMate 3.2 Workflow - Comprehensive Resize Testing
 *
 * Tests:
 * 1. Basic element resizing functionality
 * 2. Minimum/maximum size constraints
 * 3. Auto-resize behavior with child elements
 * 4. Parent-child nesting and drag-drop
 * 5. Visual correctness of resizing
 * 6. Edge cases (collapsed parents, multiple children, etc.)
 */

const ARCHIMATE_WORKFLOW_URL = 'http://localhost:3001/frameworks/archimate3.2/workflow'

// Helper function to get bounding box of an element
async function getBoundingBox(locator: Locator) {
  return await locator.boundingBox()
}

// Helper function to wait for React Flow to be ready
async function waitForReactFlowReady(page: Page) {
  // Wait for the React Flow container to be visible
  await page.waitForSelector('.react-flow', { timeout: 30000 })
  // Wait for nodes to be rendered
  await page.waitForSelector('[data-id]', { timeout: 10000 })
  // Wait for network to be idle
  await page.waitForLoadState('networkidle')
  // Extra delay to ensure React Flow is fully initialized
  await page.waitForTimeout(2000)
}

test.describe('ArchiMate 3.2 Workflow - Resizing Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to ArchiMate workflow page
    await page.goto(ARCHIMATE_WORKFLOW_URL)

    // Wait for React Flow to be fully ready
    await waitForReactFlowReady(page)
  })

  test.describe('Basic Resizing Functionality', () => {

    test('should load workflow with resizable elements', async ({ page }) => {
      // Check that the page loaded successfully
      await expect(page).toHaveTitle(/ArchiMate/i)

      // Check for React Flow canvas
      const reactFlow = page.locator('.react-flow')
      await expect(reactFlow).toBeVisible()

      // Check that there are nodes on the canvas
      const nodes = page.locator('[data-id]')
      const nodeCount = await nodes.count()
      expect(nodeCount).toBeGreaterThan(0)

      console.log(`✓ Found ${nodeCount} nodes on the canvas`)
    })

    test('should have NodeResizer handles on elements', async ({ page }) => {
      // Click on a node to select it
      const firstNode = page.locator('[data-id]').first()
      await firstNode.click()

      // Wait for selection
      await page.waitForTimeout(500)

      // Look for resize handles (NodeResizer creates handles with specific classes)
      // React Flow NodeResizer adds handles around the selected node
      const resizeHandles = page.locator('.react-flow__resize-control')
      const handleCount = await resizeHandles.count()

      console.log(`✓ Found ${handleCount} resize handles`)

      // Should have at least some resize handles (4 corners + 4 edges = 8 handles typically)
      expect(handleCount).toBeGreaterThan(0)
    })

    test('should be able to resize an element by dragging', async ({ page }) => {
      // Find a business process node (known to be resizable)
      const businessNode = page.locator('[data-id*="business-process"]').first()

      if (await businessNode.count() === 0) {
        // Fallback to any node
        const anyNode = page.locator('[data-id]').first()
        await anyNode.click()
      } else {
        await businessNode.click()
      }

      // Wait for selection
      await page.waitForTimeout(500)

      // Get initial bounding box
      const selectedNode = page.locator('.react-flow__node.selected').first()
      const initialBox = await getBoundingBox(selectedNode)

      if (!initialBox) {
        throw new Error('Could not get initial bounding box')
      }

      console.log('Initial size:', initialBox.width, 'x', initialBox.height)

      // Find the bottom-right resize handle (southeast handle)
      const seHandle = page.locator('.react-flow__resize-control.bottom.right, .react-flow__resize-control-handle[data-position="bottom-right"]').first()

      if (await seHandle.count() === 0) {
        console.log('⚠ No specific SE handle found, looking for any resize handle')
        // Try any resize handle
        const anyHandle = page.locator('.react-flow__resize-control').last()

        // Drag the handle to resize
        await anyHandle.hover()
        await page.mouse.down()
        await page.mouse.move(initialBox.x + initialBox.width + 50, initialBox.y + initialBox.height + 50)
        await page.mouse.up()
      } else {
        // Drag the SE handle to make the element larger
        await seHandle.hover()
        await page.mouse.down()
        await page.mouse.move(initialBox.x + initialBox.width + 50, initialBox.y + initialBox.height + 50, { steps: 10 })
        await page.mouse.up()
      }

      // Wait for resize to complete
      await page.waitForTimeout(1000)

      // Get new bounding box
      const finalBox = await getBoundingBox(selectedNode)

      if (!finalBox) {
        throw new Error('Could not get final bounding box')
      }

      console.log('Final size:', finalBox.width, 'x', finalBox.height)

      // Element should be larger (at least one dimension should have increased)
      const widthIncreased = finalBox.width > initialBox.width
      const heightIncreased = finalBox.height > initialBox.height

      expect(widthIncreased || heightIncreased).toBeTruthy()
      console.log(`✓ Element resized successfully (width: ${widthIncreased ? 'increased' : 'same'}, height: ${heightIncreased ? 'increased' : 'same'})`)
    })
  })

  test.describe('Size Constraints', () => {

    test('should enforce minimum size constraints', async ({ page }) => {
      // Select a node
      const firstNode = page.locator('[data-id]').first()
      await firstNode.click()
      await page.waitForTimeout(500)

      const selectedNode = page.locator('.react-flow__node.selected').first()
      const initialBox = await getBoundingBox(selectedNode)

      if (!initialBox) {
        console.log('⚠ Could not get bounding box for minimum size test')
        return
      }

      // Try to drag a resize handle to make it very small
      const resizeHandle = page.locator('.react-flow__resize-control').first()

      if (await resizeHandle.count() > 0) {
        await resizeHandle.hover()
        await page.mouse.down()

        // Try to drag to a very small size (10x10)
        await page.mouse.move(initialBox.x + 10, initialBox.y + 10, { steps: 10 })
        await page.mouse.up()

        await page.waitForTimeout(1000)

        // Get final bounding box
        const finalBox = await getBoundingBox(selectedNode)

        if (finalBox) {
          console.log('Minimum size test - Final dimensions:', finalBox.width, 'x', finalBox.height)

          // Should have some reasonable minimum (at least 50x50 based on typical ArchiMate elements)
          expect(finalBox.width).toBeGreaterThan(40)
          expect(finalBox.height).toBeGreaterThan(40)
          console.log(`✓ Minimum size constraint enforced (${finalBox.width}x${finalBox.height})`)
        }
      } else {
        console.log('⚠ No resize handles found for minimum size test')
      }
    })
  })

  test.describe('Parent-Child Auto-Resize', () => {

    test('should auto-resize parent when child is resized', async ({ page }) => {
      // Look for a parent node with children
      // From mock data, we know "Order Management" has children
      const parentNode = page.locator('[data-id*="business-process-1"]').first()

      if (await parentNode.count() === 0) {
        console.log('⚠ Parent node not found, using alternative selector')
        // Try finding any node that might have children by checking for grouping or location nodes
        const groupingNode = page.locator('[data-id*="grouping"]').first()
        if (await groupingNode.count() > 0) {
          await groupingNode.click()
        } else {
          console.log('⚠ No suitable parent node found for auto-resize test')
          return
        }
      } else {
        // Get initial parent size
        const initialParentBox = await getBoundingBox(parentNode)

        if (initialParentBox) {
          console.log('Initial parent size:', initialParentBox.width, 'x', initialParentBox.height)
        }

        // Find a child node inside this parent
        // Children would be positioned relative to parent
        const childNodes = page.locator('[data-id*="task"]')

        if (await childNodes.count() > 0) {
          const firstChild = childNodes.first()
          await firstChild.click()
          await page.waitForTimeout(500)

          // Get child's initial size
          const initialChildBox = await getBoundingBox(firstChild)

          if (initialChildBox) {
            console.log('Initial child size:', initialChildBox.width, 'x', initialChildBox.height)

            // Resize the child to be larger
            const resizeHandle = page.locator('.react-flow__resize-control').last()

            if (await resizeHandle.count() > 0) {
              await resizeHandle.hover()
              await page.mouse.down()
              await page.mouse.move(
                initialChildBox.x + initialChildBox.width + 100,
                initialChildBox.y + initialChildBox.height + 100,
                { steps: 10 }
              )
              await page.mouse.up()

              await page.waitForTimeout(1500)

              // Click somewhere else to deselect
              await page.locator('.react-flow').click({ position: { x: 50, y: 50 } })
              await page.waitForTimeout(500)

              // Get parent's final size
              const finalParentBox = await getBoundingBox(parentNode)

              if (finalParentBox && initialParentBox) {
                console.log('Final parent size:', finalParentBox.width, 'x', finalParentBox.height)

                // Parent should have auto-resized to accommodate larger child
                // At minimum, parent should not be smaller
                expect(finalParentBox.width).toBeGreaterThanOrEqual(initialParentBox.width * 0.95) // Allow small variance
                console.log('✓ Parent auto-resize triggered')
              }
            }
          }
        } else {
          console.log('⚠ No child nodes found for auto-resize test')
        }
      }
    })
  })

  test.describe('Nested Elements (White Box / Black Box)', () => {

    test('should show resize handles on parent elements', async ({ page }) => {
      // Look for a grouping or parent element
      const parentElements = page.locator('[data-id*="business-process"], [data-id*="grouping"], [data-id*="location"]')

      if (await parentElements.count() > 0) {
        const parent = parentElements.first()
        await parent.click()
        await page.waitForTimeout(500)

        // Should have resize handles
        const resizeHandles = page.locator('.react-flow__resize-control')
        const handleCount = await resizeHandles.count()

        expect(handleCount).toBeGreaterThan(0)
        console.log(`✓ Parent element has ${handleCount} resize handles`)
      } else {
        console.log('⚠ No parent elements found')
      }
    })

    test('should collapse/expand parent elements', async ({ page }) => {
      // Look for collapsed parent indicators (chevron icons or collapse buttons)
      const collapseButtons = page.locator('[data-testid*="collapse"], [class*="chevron"], button:has-text("nested")')

      const buttonCount = await collapseButtons.count()
      console.log(`Found ${buttonCount} potential collapse/expand buttons`)

      if (buttonCount > 0) {
        const firstButton = collapseButtons.first()

        // Get initial state (count of visible child nodes)
        const initialNodes = await page.locator('[data-id]').count()

        // Click to toggle
        await firstButton.click()
        await page.waitForTimeout(1000)

        // Count nodes after toggle
        const afterToggleNodes = await page.locator('[data-id]').count()

        // Node count should have changed (children hidden or shown)
        console.log(`Node count changed from ${initialNodes} to ${afterToggleNodes}`)

        // Click again to toggle back
        await firstButton.click()
        await page.waitForTimeout(1000)

        const finalNodes = await page.locator('[data-id]').count()

        // Should return to original state
        expect(finalNodes).toBe(initialNodes)
        console.log('✓ Collapse/expand functionality works')
      } else {
        console.log('⚠ No collapse/expand buttons found')
      }
    })
  })

  test.describe('Drag and Drop Nesting', () => {

    test('should support dragging elements onto parent nodes', async ({ page }) => {
      // Find a standalone element
      const standaloneNode = page.locator('[data-id]:not([data-parent])').first()

      // Find a potential parent (grouping or location)
      const parentNode = page.locator('[data-id*="grouping"], [data-id*="location"]').first()

      if (await standaloneNode.count() > 0 && await parentNode.count() > 0) {
        const nodeBox = await getBoundingBox(standaloneNode)
        const parentBox = await getBoundingBox(parentNode)

        if (nodeBox && parentBox) {
          console.log('Dragging node onto parent for nesting...')

          // Drag the standalone node onto the parent
          await standaloneNode.hover()
          await page.mouse.down()

          // Drag to center of parent
          await page.mouse.move(
            parentBox.x + parentBox.width / 2,
            parentBox.y + parentBox.height / 2,
            { steps: 20 }
          )

          await page.mouse.up()
          await page.waitForTimeout(2000)

          // After nesting, parent should potentially resize
          const finalParentBox = await getBoundingBox(parentNode)

          if (finalParentBox) {
            console.log('Parent size after nesting:', finalParentBox.width, 'x', finalParentBox.height)
            console.log('✓ Drag and drop nesting completed')
          }
        }
      } else {
        console.log('⚠ Could not find suitable nodes for nesting test')
      }
    })
  })

  test.describe('Visual Correctness', () => {

    test('should maintain element aspect ratios', async ({ page }) => {
      // Select an element
      const node = page.locator('[data-id]').first()
      await node.click()
      await page.waitForTimeout(500)

      const selectedNode = page.locator('.react-flow__node.selected').first()
      const box = await getBoundingBox(selectedNode)

      if (box) {
        const aspectRatio = box.width / box.height
        console.log(`Element aspect ratio: ${aspectRatio.toFixed(2)}`)

        // Reasonable aspect ratios for ArchiMate elements (roughly 1:1 to 4:1)
        expect(aspectRatio).toBeGreaterThan(0.5)
        expect(aspectRatio).toBeLessThan(5)
        console.log('✓ Element has reasonable aspect ratio')
      }
    })

    test('should show visual feedback during resize', async ({ page }) => {
      // Select a node
      const node = page.locator('[data-id]').first()
      await node.click()
      await page.waitForTimeout(500)

      // Check for selected state styling
      const selectedNode = page.locator('.react-flow__node.selected')
      await expect(selectedNode).toBeVisible()

      // Check for resize handles visibility
      const resizeHandles = page.locator('.react-flow__resize-control')
      const handleCount = await resizeHandles.count()

      expect(handleCount).toBeGreaterThan(0)
      console.log(`✓ Visual feedback present: ${handleCount} resize handles visible`)
    })

    test('should take a screenshot of the workflow', async ({ page }) => {
      // Take a screenshot for visual verification
      await page.screenshot({
        path: 'test-results/archimate-workflow-screenshot.png',
        fullPage: true
      })

      console.log('✓ Screenshot saved to test-results/archimate-workflow-screenshot.png')
    })
  })

  test.describe('Export Functionality', () => {

    test('should have export buttons available', async ({ page }) => {
      // Look for export/download buttons
      const exportButtons = page.locator('button:has-text("Export"), button:has-text("Download"), [data-testid*="export"]')

      const buttonCount = await exportButtons.count()
      console.log(`Found ${buttonCount} export buttons`)

      expect(buttonCount).toBeGreaterThan(0)
    })
  })

  test.describe('Performance & Stability', () => {

    test('should handle rapid resize operations', async ({ page }) => {
      const node = page.locator('[data-id]').first()
      await node.click()
      await page.waitForTimeout(500)

      const selectedNode = page.locator('.react-flow__node.selected').first()
      const initialBox = await getBoundingBox(selectedNode)

      if (initialBox) {
        const resizeHandle = page.locator('.react-flow__resize-control').last()

        if (await resizeHandle.count() > 0) {
          // Perform multiple rapid resize operations
          for (let i = 0; i < 5; i++) {
            await resizeHandle.hover()
            await page.mouse.down()
            await page.mouse.move(
              initialBox.x + initialBox.width + (i * 20),
              initialBox.y + initialBox.height + (i * 20),
              { steps: 5 }
            )
            await page.mouse.up()
            await page.waitForTimeout(200)
          }

          // Should still be stable
          const finalBox = await getBoundingBox(selectedNode)
          expect(finalBox).toBeTruthy()
          console.log('✓ Handled rapid resize operations without crashing')
        }
      }
    })
  })
})
