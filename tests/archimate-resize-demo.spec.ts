import { test, expect } from '@playwright/test'

test.describe('ArchiMate Resize Demo', () => {
  test('demonstrate resize functionality working', async ({ page }) => {
    console.log('\n🚀 Starting ArchiMate Resize Demo...\n')

    // Navigate to the ArchiMate workflow page
    await page.goto('http://localhost:3000/frameworks/archimate3.2/workflow')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    console.log('✓ Page loaded successfully')

    // Add a business process node
    await page.click('button:has-text("Select element type")')
    await page.click('text=Business Process')
    await page.waitForTimeout(1000)

    console.log('✓ Business Process node added')

    // Get the node
    const node = page.locator('.react-flow__node').first()
    const initialBox = await node.boundingBox()

    if (!initialBox) {
      throw new Error('Node not found')
    }

    console.log(`📏 Initial node size: ${Math.round(initialBox.width)}px × ${Math.round(initialBox.height)}px`)

    // Click on the node to select it (this should show resize handles)
    await node.click()
    await page.waitForTimeout(500)

    console.log('✓ Node selected')

    // Check if resize handles are visible
    const resizeHandle = page.locator('.react-flow__resize-control.bottom.right').first()
    const isVisible = await resizeHandle.isVisible()

    console.log(`🔍 Resize handle visible: ${isVisible ? '✅ YES' : '❌ NO'}`)

    if (isVisible) {
      // Get the resize handle position
      const handleBox = await resizeHandle.boundingBox()

      if (handleBox) {
        console.log('✓ Resize handle found at bottom-right corner')

        // Drag the resize handle to make the node larger
        const startX = handleBox.x + handleBox.width / 2
        const startY = handleBox.y + handleBox.height / 2
        const endX = startX + 100
        const endY = startY + 80

        console.log(`🖱️  Dragging resize handle from (${Math.round(startX)}, ${Math.round(startY)}) to (${Math.round(endX)}, ${Math.round(endY)})`)

        await page.mouse.move(startX, startY)
        await page.mouse.down()
        await page.mouse.move(endX, endY, { steps: 10 })
        await page.mouse.up()

        // Wait for the resize to complete
        await page.waitForTimeout(500)

        // Get the new dimensions
        const finalBox = await node.boundingBox()

        if (finalBox) {
          const widthIncrease = finalBox.width - initialBox.width
          const heightIncrease = finalBox.height - initialBox.height

          console.log(`\n${'='.repeat(50)}`)
          console.log('📊 RESIZE RESULTS')
          console.log(${'='.repeat(50)})
          console.log(`Initial size:  ${Math.round(initialBox.width)}px × ${Math.round(initialBox.height)}px`)
          console.log(`Final size:    ${Math.round(finalBox.width)}px × ${Math.round(finalBox.height)}px`)
          console.log(`Width change:  ${widthIncrease > 0 ? '+' : ''}${Math.round(widthIncrease)}px`)
          console.log(`Height change: ${heightIncrease > 0 ? '+' : ''}${Math.round(heightIncrease)}px`)
          console.log(${'='.repeat(50)}\n)

          // Verify the node actually resized
          expect(widthIncrease).toBeGreaterThan(50)
          expect(heightIncrease).toBeGreaterThan(40)

          console.log('✅ SUCCESS! Node successfully resized and maintained new dimensions.')
          console.log('🎉 Resize functionality is working correctly!\n')
        }
      }
    } else {
      console.log('❌ FAILED: Resize handle not visible - resize functionality may not be working\n')
      throw new Error('Resize handle not visible')
    }

    // Keep the browser open for a moment to see the result
    await page.waitForTimeout(2000)
  })
})
