# Kanban Database Integration - Testing Checklist

## 🧪 Pre-Flight Checks

### Environment Setup
- [ ] `.env` file exists
- [ ] `DATABASE_URL` is configured (if using database mode)
- [ ] `KANBAN_USE_DATABASE` is set to desired mode
- [ ] `DEFAULT_ORG_ID` is set (if using database mode)

### Dependencies
- [ ] `npm install` completed successfully
- [ ] `npx prisma generate` ran without errors (if using database mode)
- [ ] `npx prisma db push` completed (if using database mode)

---

## 🎯 Test Scenarios

### Scenario 1: Mock Data Mode (Default)
**Purpose**: Verify the system works without database

**Steps**:
1. Ensure `.env` has `KANBAN_USE_DATABASE=false` (or leave unset)
2. Start server: `npm run dev`
3. Navigate to: `http://localhost:3000/frameworks/scrum/kanban`

**Expected Results**:
- ✅ Page loads successfully
- ✅ Shows "(Mock Data Mode)" indicator
- ✅ Displays mock Kanban cards
- ✅ Cards can be dragged between columns
- ✅ Search and filters work
- ✅ Console shows: "Using mock data" messages

---

### Scenario 2: Database Mode
**Purpose**: Verify database integration works

**Steps**:
1. Set `.env` to `KANBAN_USE_DATABASE=true`
2. Set `DEFAULT_ORG_ID=org_test_123`
3. Restart server: `npm run dev`
4. Navigate to: `http://localhost:3000/frameworks/scrum/kanban?organizationId=org_test_123`

**Expected Results**:
- ✅ Page loads successfully
- ✅ Shows "(Database Mode)" indicator
- ✅ Fetches cards from database (may be empty initially)
- ✅ Cards can be dragged between columns
- ✅ Drag-drop triggers database update
- ✅ Console shows: "✓ Card moved" messages
- ✅ Browser shows success/error notifications

---

### Scenario 3: API Testing - Fetch Cards

**Test GET Endpoint**:
```bash
curl -s http://localhost:3000/api/kanban/scrum?organizationId=org_test_123 | jq .
```

**Expected Results**:
- ✅ HTTP 200 status
- ✅ Returns JSON with `success: true`
- ✅ Contains `cards` array
- ✅ Cards have all required fields (id, title, status, priority, etc.)

**Test with Filters**:
```bash
# Filter by source
curl -s "http://localhost:3000/api/kanban/scrum?organizationId=org_test_123&source=task" | jq .

# Filter by user
curl -s "http://localhost:3000/api/kanban/scrum?organizationId=org_test_123&userId=user_123" | jq .

# Filter by sprint
curl -s "http://localhost:3000/api/kanban/scrum?organizationId=org_test_123&sprintId=sprint_123" | jq .
```

---

### Scenario 4: API Testing - Update Card

**Prerequisites**:
- Have a card ID from the GET request (e.g., `card_123`)

**Test PATCH Endpoint**:
```bash
curl -X PATCH http://localhost:3000/api/kanban/scrum \
  -H "Content-Type: application/json" \
  -d '{
    "cardId": "card_123",
    "source": "task",
    "updates": {
      "status": "in-progress",
      "columnPosition": 0
    }
  }' | jq .
```

**Expected Results**:
- ✅ HTTP 200 status
- ✅ Returns `{ "success": true, "card": {...} }`
- ✅ Card status updated in database
- ✅ Refresh page shows card in new column

**Test Error Handling**:
```bash
# Invalid card ID
curl -X PATCH http://localhost:3000/api/kanban/scrum \
  -H "Content-Type: application/json" \
  -d '{
    "cardId": "invalid_id",
    "source": "task",
    "updates": { "status": "done" }
  }' | jq .

# Expected: HTTP 404 or 400, { "success": false, "error": "..." }
```

---

### Scenario 5: API Testing - Create Card

**Test POST Endpoint**:
```bash
curl -X POST http://localhost:3000/api/kanban/scrum \
  -H "Content-Type: application/json" \
  -d '{
    "source": "task",
    "data": {
      "title": "Test Card from API",
      "description": "This is a test card created via API",
      "status": "todo",
      "priority": "high",
      "frameworkId": "scrum",
      "organizationId": "org_test_123",
      "tags": ["test", "api"]
    }
  }' | jq .
```

**Expected Results**:
- ✅ HTTP 201 status
- ✅ Returns `{ "success": true, "card": {...} }`
- ✅ Card created in database
- ✅ Refresh page shows new card in "To Do" column

---

### Scenario 6: Multi-Framework Support

**Test Different Frameworks**:
1. Scrum: `http://localhost:3000/frameworks/scrum/kanban`
2. TOGAF: `http://localhost:3000/frameworks/togaf/kanban`
3. ISO 27001: `http://localhost:3000/frameworks/iso27001/kanban`
4. NIST CSF: `http://localhost:3000/frameworks/nist-csf/kanban`

**Expected Results**:
- ✅ Each framework has appropriate columns
- ✅ Cards are framework-specific
- ✅ Metadata reflects framework type

---

### Scenario 7: Drag-and-Drop with Database Sync

**Steps**:
1. Enable database mode
2. Navigate to a Kanban board
3. Drag a card from "To Do" to "In Progress"
4. Observe console logs

**Expected Results**:
- ✅ Card moves instantly (optimistic UI)
- ✅ Console shows: "✓ Card moved to in-progress"
- ✅ No visual glitches
- ✅ Database updated (verify with API call)
- ✅ Refresh page: card stays in new column

**Test Error Scenario**:
1. Disconnect database (stop PostgreSQL)
2. Try to drag a card
3. Observe error handling

**Expected Results**:
- ✅ Card moves initially (optimistic UI)
- ✅ Card reverts to original column after error
- ✅ Console shows error: "✗ Failed to move card: ..."
- ✅ Error message displayed to user (if onError callback is provided)

---

### Scenario 8: Search and Filtering

**Test Search**:
1. Enter text in search box
2. Observe filtered results

**Expected Results**:
- ✅ Results update in real-time
- ✅ Searches title, description, and tags
- ✅ Case-insensitive search

**Test Priority Filter**:
1. Select "High" from priority dropdown
2. Observe filtered results

**Expected Results**:
- ✅ Only high-priority cards shown
- ✅ Stats update to reflect filtered count

**Test Assignee Filter**:
1. Select an assignee from dropdown
2. Observe filtered results

**Expected Results**:
- ✅ Only cards assigned to selected user shown
- ✅ "Unassigned" option works correctly

---

### Scenario 9: Performance Testing

**Large Dataset Test**:
1. Create 100+ cards in database
2. Load Kanban board
3. Measure load time
4. Test drag-and-drop responsiveness

**Expected Results**:
- ✅ Page loads in < 3 seconds
- ✅ Drag-and-drop remains responsive
- ✅ Filtering is instant
- ✅ No memory leaks in DevTools

---

### Scenario 10: Mobile Responsiveness

**Test on Mobile Viewports**:
1. Open DevTools
2. Set viewport to iPhone (375px width)
3. Test Kanban board

**Expected Results**:
- ✅ Columns stack vertically on mobile
- ✅ Search and filters are usable
- ✅ Cards are readable and tappable
- ✅ Drag-and-drop works (touch events)

---

## 🐛 Known Issues & Limitations

### Current Limitations
- ⚠️ Authentication not yet integrated (organizationId from query params)
- ⚠️ No user permission checks (planned for future)
- ⚠️ No real-time updates via WebSocket (manual refresh required)
- ⚠️ No pagination (may be slow with 1000+ cards)

### Workarounds
- Use query parameters for organizationId until auth is integrated
- Refresh page to see changes from other users
- Use filtering to manage large card counts

---

## 📊 Testing Metrics

### Coverage Goals
- [ ] 100% of API endpoints tested (GET, PATCH, POST)
- [ ] All frameworks tested (at least spot-check 5)
- [ ] Both mock and database modes tested
- [ ] Error scenarios tested
- [ ] Edge cases tested (empty boards, missing data, etc.)

### Performance Benchmarks
- [ ] Page load: < 3 seconds
- [ ] API response: < 500ms
- [ ] Drag-drop latency: < 100ms (optimistic)
- [ ] Search/filter: < 50ms

---

## ✅ Sign-Off Checklist

### Before Considering "Done"
- [ ] All test scenarios pass
- [ ] No console errors
- [ ] Mock mode works
- [ ] Database mode works
- [ ] API endpoints return correct data
- [ ] Drag-and-drop syncs to database
- [ ] Error handling works (rollback on failure)
- [ ] All frameworks tested
- [ ] Mobile responsiveness verified
- [ ] Documentation reviewed

---

## 🚨 Troubleshooting

### Page Shows 500 Error
- **Check**: Server logs for specific error
- **Common Cause**: Database connection issue
- **Fix**: Verify `DATABASE_URL` in `.env`

### Cards Don't Appear
- **Check**: Console for API errors
- **Common Cause**: Wrong organizationId
- **Fix**: Ensure `organizationId` matches data in database

### Drag-and-Drop Doesn't Work
- **Check**: `enableDatabaseSync` prop is set to `true`
- **Common Cause**: API endpoint unreachable
- **Fix**: Verify server is running on correct port

### Cards Revert After Drag
- **Check**: Console for error messages
- **Common Cause**: Database update failed
- **Fix**: Check database connection and permissions

---

## 📝 Test Results Log

### Test Run: [DATE]
**Tester**: _______________
**Environment**: □ Development  □ Staging  □ Production

| Scenario | Status | Notes |
|----------|--------|-------|
| Mock Data Mode | ☐ Pass ☐ Fail | |
| Database Mode | ☐ Pass ☐ Fail | |
| API - Fetch Cards | ☐ Pass ☐ Fail | |
| API - Update Card | ☐ Pass ☐ Fail | |
| API - Create Card | ☐ Pass ☐ Fail | |
| Multi-Framework | ☐ Pass ☐ Fail | |
| Drag-and-Drop Sync | ☐ Pass ☐ Fail | |
| Search & Filter | ☐ Pass ☐ Fail | |
| Performance | ☐ Pass ☐ Fail | |
| Mobile | ☐ Pass ☐ Fail | |

**Overall Result**: ☐ Pass  ☐ Fail  ☐ Partial

**Comments**:
_________________________________________
_________________________________________
_________________________________________

---

**Happy Testing! 🧪**
