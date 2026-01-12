import { test, expect } from '@playwright/test'

test.describe('ArchiMate Drag and Resize', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002/frameworks/archimate3.2/workflow')
    await page.waitForLoadState('networkidle')
  })

  test('should drag node without jumping back', async ({ page }) => {
    // Add a business process node
    await page.click('button:has-text("Select element type")')
    await page.click('text=Business Process')

    // Wait for node to appear
    await page.waitForTimeout(500)

    // Get the node's initial position
    const node = page.locator('.react-flow__node').first()
    const initialBox = await node.boundingBox()
    expect(initialBox).not.toBeNull()

    // Drag the node to a new position (200px right, 150px down)
    await node.hover()
    await page.mouse.down()
    await page.mouse.move(
      initialBox!.x + initialBox!.width / 2 + 200,
      initialBox!.y + initialBox!.height / 2 + 150,
      { steps: 10 }
    )
    await page.mouse.up()

    // Wait for position to settle
    await page.waitForTimeout(200)

    // Get the new position
    const finalBox = await node.boundingBox()
    expect(finalBox).not.toBeNull()

    // Verify the node moved and didn't jump back
    const deltaX = finalBox!.x - initialBox!.x
    const deltaY = finalBox!.y - initialBox!.y

    expect(deltaX).toBeGreaterThan(150) // Should have moved significantly right
    expect(deltaY).toBeGreaterThan(100) // Should have moved significantly down

    console.log(`Node moved by: ${deltaX}px right, ${deltaY}px down`)
  })

  test('should resize node without snapping back', async ({ page }) => {
    // Add a business process node
    await page.click('button:has-text("Select element type")')
    await page.click('text=Business Process')

    // Wait for node to appear
    await page.waitForTimeout(500)

    // Click on the node to select it (shows resize handles)
    const node = page.locator('.react-flow__node').first()
    await node.click()

    // Wait for resize handle to appear
    await page.waitForTimeout(200)

    // Get initial dimensions
    const initialBox = await node.boundingBox()
    expect(initialBox).not.toBeNull()

    // Find and drag the bottom-right resize handle
    const resizeHandle = page.locator('.react-flow__resize-control.bottom.right').first()
    await resizeHandle.waitFor({ state: 'visible', timeout: 2000 })

    const handleBox = await resizeHandle.boundingBox()
    expect(handleBox).not.toBeNull()

    // Drag resize handle to make node larger
    await page.mouse.move(handleBox!.x + handleBox!.width / 2, handleBox!.y + handleBox!.height / 2)
    await page.mouse.down()
    await page.mouse.move(
      handleBox!.x + 100,
      handleBox!.y + 80,
      { steps: 10 }
    )
    await page.mouse.up()

    // Wait for resize to settle
    await page.waitForTimeout(200)

    // Get the new dimensions
    const finalBox = await node.boundingBox()
    expect(finalBox).not.toBeNull()

    // Verify the node resized and didn't snap back
    const widthIncrease = finalBox!.width - initialBox!.width
    const heightIncrease = finalBox!.height - initialBox!.height

    expect(widthIncrease).toBeGreaterThan(50) // Should have grown in width
    expect(heightIncrease).toBeGreaterThan(40) // Should have grown in height

    console.log(`Node resized by: +${widthIncrease}px width, +${heightIncrease}px height`)
  })

  test('should maintain position after multiple drags', async ({ page }) => {
    // Add a business process node
    await page.click('button:has-text("Select element type")')
    await page.click('text=Business Process')

    await page.waitForTimeout(500)

    const node = page.locator('.react-flow__node').first()

    // Perform three consecutive drags
    for (let i = 0; i < 3; i++) {
      const currentBox = await node.boundingBox()
      expect(currentBox).not.toBeNull()

      await node.hover()
      await page.mouse.down()
      await page.mouse.move(
        currentBox!.x + currentBox!.width / 2 + 50,
        currentBox!.y + currentBox!.height / 2 + 50,
        { steps: 5 }
      )
      await page.mouse.up()
      await page.waitForTimeout(100)
    }

    // Final position should be significantly different from initial
    await page.waitForTimeout(200)
    const finalBox = await node.boundingBox()
    expect(finalBox).not.toBeNull()

    console.log(`Node final position: (${finalBox!.x}, ${finalBox!.y})`)
  })
})
