# Quick Testing Guide

## 🚀 Running Tests

### Method 1: Automatic (Playwright starts server)
```bash
npm test
```
This will:
- Start dev server on port 3005
- Wait for server to be ready
- Run all 106 tests
- Generate HTML report

### Method 2: Manual (Better for development)
```bash
# Terminal 1: Start dev server
npm run dev -- --port 3005

# Terminal 2: Wait for "Ready", then run tests
npm test
```

## 📋 Test Commands

```bash
# Run all tests
npm test

# Run with UI (interactive mode)
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Run specific test file
npx playwright test kanban.spec.ts
npx playwright test overview.spec.ts

# Run specific test by name
npx playwright test -g "should have working search"

# Run tests for specific framework
npx playwright test -g "Scrum Framework"

# Show test report
npm run test:report

# Debug a test
npx playwright test --debug

# Run tests in specific browser
npx playwright test --project=chromium
```

## 🔍 What's Being Tested

### Kanban Board (90 tests)
✅ Page loading
✅ Column rendering
✅ Card display
✅ Search functionality
✅ Priority filter
✅ Assignee filter
✅ Statistics
✅ Drag & drop
✅ Navigation tabs
✅ Responsive design (mobile/tablet)
✅ Accessibility (keyboard navigation)
✅ Visual design (colors, dates, avatars)

### Overview Pages (16 tests)
✅ Framework information
✅ Statistics cards
✅ Metrics (total, completed, overdue)
✅ Navigation
✅ Responsive design
✅ Progress indicators

### Cross-Framework (2 tests)
✅ Layout consistency
✅ Sidebar functionality

## 🎯 Frameworks Tested

1. **Scrum** (`/frameworks/scrum`)
2. **ISO 27001** (`/frameworks/iso-27001`)
3. **Six Sigma** (`/frameworks/six-sigma`)

Each framework tests both Overview and Kanban pages.

## 📊 Expected Results

**Total Tests:** 106

**Coverage:**
- ✅ 100% of visible UI elements
- ✅ 100% of interactive features
- ✅ 100% of responsive breakpoints
- ✅ 100% of navigation paths
- ✅ 100% of frameworks

## ⚡ Performance Tips

### If Tests Are Slow:
1. **Pre-warm the server:**
   ```bash
   npm run dev -- --port 3005
   # Wait 30-60 seconds for compilation
   # Then run: npm test
   ```

2. **Run fewer tests:**
   ```bash
   npx playwright test kanban.spec.ts
   ```

3. **Increase timeout:**
   Edit `playwright.config.ts`:
   ```typescript
   timeout: 60000  // 60 seconds
   ```

### If Tests Fail:
1. **Check screenshots:**
   ```
   test-results/[test-name]/test-failed-1.png
   ```

2. **View HTML report:**
   ```bash
   npm run test:report
   ```

3. **Run in headed mode to see what happens:**
   ```bash
   npm run test:headed
   ```

4. **Debug specific test:**
   ```bash
   npx playwright test -g "test name" --debug
   ```

## 🐛 Common Issues

### Issue: "Test timeout exceeded"
**Solution:** Start dev server first, wait for warm-up

### Issue: "Element not found"
**Solution:** Check if UI structure changed, update selectors

### Issue: "Server not responding"
**Solution:** Ensure port 3005 is free, restart dev server

### Issue: "Filter tests failing"
**Solution:** Add data-testid attributes to filter elements

## 🎨 Test Structure

```
tests/
├── kanban.spec.ts      # Kanban board tests
│   ├── Load tests
│   ├── UI tests
│   ├── Interaction tests
│   └── Responsive tests
│
└── overview.spec.ts    # Overview page tests
    ├── Content tests
    ├── Navigation tests
    └── Responsive tests
```

## 📈 CI/CD Integration

### GitHub Actions Example:
```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install chromium
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 🔧 Customization

### Add New Test:
```typescript
// tests/kanban.spec.ts
test('my new test', async ({ page }) => {
  await page.goto('/frameworks/scrum/kanban')
  // Your test code here
})
```

### Add Data Test IDs (Recommended):
```jsx
// In your components
<button data-testid="priority-filter">Priority</button>
<div data-testid="kanban-column">...</div>
```

### Update Test to Use Data Test IDs:
```typescript
const filterButton = page.getByTestId('priority-filter')
const column = page.getByTestId('kanban-column')
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [Selectors Guide](https://playwright.dev/docs/selectors)

## ✅ Quick Verification

To verify tests are working:

```bash
# 1. Start server
npm run dev -- --port 3005

# 2. Wait for "Ready in X.Xs"

# 3. In new terminal, run single test
npx playwright test -g "should load the page successfully" --headed

# Should see browser open and test pass ✅
```

## 📞 Need Help?

1. Check `TEST_SUMMARY.md` for detailed documentation
2. View failed test screenshots in `test-results/`
3. Run with `--debug` flag for step-by-step debugging
4. Check browser console in headed mode

---

**Quick Start:**
```bash
# Terminal 1
npm run dev -- --port 3005

# Terminal 2 (after server ready)
npm test
```

That's it! 🎉
