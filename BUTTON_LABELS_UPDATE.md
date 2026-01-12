# Button Labels Update - Implementation Complete

## Changes Made

### 1. **Singularize Helper Function** (`lib/utils.ts`)
Added a comprehensive `singularize()` function that converts plural words to singular:
- Handles special cases (People → Person, Analyses → Analysis, etc.)
- Handles common plural patterns (-ies → -y, -oes → -o, -sses → -ss, etc.)
- Preserves original casing

**Examples:**
- "Problems" → "Problem"
- "Solutions" → "Solution"
- "Key Metrics" → "Key Metric"
- "Unique Value Propositions" → "Unique Value Proposition"
- "Activities" → "Activity"
- "Policies" → "Policy"

### 2. **Section Cards - Add Buttons** (`section-cards.tsx`)
Each stat card now has an "Add [Grandchild]" button at the bottom:
- "Add Problem" for Problems card
- "Add Solution" for Solutions card
- "Add Key Metric" for Key Metrics card
- "Add Unique Value Proposition" for Unique Value Propositions card

### 3. **Table Tab Buttons** (`data-table.tsx`)
Updated the "Add" button in each table tab to show singular grandchild name:
- Problems tab: "Add Problem"
- Solutions tab: "Add Solution"
- Key Metrics tab: "Add Key Metric"
- On mobile: Shows just "Add" with full name in tooltip

### 4. **Dashboard Header** (`dashboard-header.tsx`)
Created new header component with:
- Framework name and description
- Primary "Add [Framework Name]" button with dropdown
- Dropdown shows all grandchildren with singular names:
  - "Add Problem"
  - "Add Solution"
  - "Add Key Metric"
  - etc.

### 5. **Layout Cleanup** (`layout.tsx`)
**REMOVED** the following tabs that were not part of requirements:
- ❌ Overview tab
- ❌ Kanban tab
- ❌ Assessment tab
- ❌ Reports tab

Now the layout is clean with just the dashboard content.

## Button Label Patterns

### Main Dashboard Header
```
Button: "Add Lean Canvas" (with dropdown)
Dropdown items:
  - Add Problem
  - Add Solution
  - Add Key Metric
  - Add Unique Value Proposition
  - Add Unfair Advantage
  - Add Channel
  - Add Customer Segment
  - Add Cost Structure
  - Add Revenue Stream
```

### Section Cards (First 4)
```
Card 1: "Total Problems"
  Button: "Add Problem"

Card 2: "Total Solutions"
  Button: "Add Solution"

Card 3: "Total Key Metrics"
  Button: "Add Key Metric"

Card 4: "Total Unique Value Propositions"
  Button: "Add Unique Value Proposition"
```

### Table Tabs
```
Tab: Problems
  Button: "Add Problem" (desktop) / "Add" (mobile with tooltip)

Tab: Solutions
  Button: "Add Solution" (desktop) / "Add" (mobile with tooltip)

Tab: Key Metrics
  Button: "Add Key Metric" (desktop) / "Add" (mobile with tooltip)
```

## Files Modified

1. ✅ `lib/utils.ts` - Added singularize() function
2. ✅ `app/(reqarchitect)/frameworks/[slug]/dashboard/components/section-cards.tsx` - Added card buttons
3. ✅ `app/(reqarchitect)/frameworks/[slug]/dashboard/components/data-table.tsx` - Updated table buttons
4. ✅ `app/(reqarchitect)/frameworks/[slug]/dashboard/components/dashboard-header.tsx` - NEW: Header with dropdown
5. ✅ `app/(reqarchitect)/frameworks/[slug]/dashboard/page.tsx` - Integrated header
6. ✅ `app/(reqarchitect)/frameworks/[slug]/layout.tsx` - Removed unwanted tabs

## Framework Examples

### Lean Canvas
- "Add Problem"
- "Add Solution"
- "Add Key Metric"
- "Add Unique Value Proposition"
- "Add Unfair Advantage"

### TOGAF
- "Add Architecture Vision"
- "Add Business Architecture"
- "Add Information Systems Architecture"
- "Add Technology Architecture"

### ISO 27001
- "Add Context of Organization"
- "Add Leadership"
- "Add Planning"
- "Add Organizational Control"
- "Add People Control"

### Scrum
- "Add Product Backlog"
- "Add Sprint Planning"
- "Add Daily Scrum"
- "Add Sprint Review"

## Testing

Visit any framework dashboard:
```
http://localhost:3000/frameworks/lean-canvas/dashboard
http://localhost:3000/frameworks/togaf/dashboard
http://localhost:3000/frameworks/iso-27001/dashboard
```

You should see:
1. ✅ Dashboard header with "Add [Framework]" dropdown
2. ✅ Section cards with "Add [Grandchild]" buttons
3. ✅ Table tabs with "Add [Grandchild]" buttons
4. ✅ All buttons using singular form
5. ✅ No Overview/Kanban/Assessment/Reports tabs

## Mobile Behavior

- **Desktop**: Full button text "Add [Grandchild]"
- **Mobile**: Icon + "Add" text, full name in tooltip

## Next Steps

If you want to make these buttons functional:
1. Create modal/drawer for adding new items
2. Connect to API/database for persistence
3. Add form validation
4. Add success/error notifications
5. Refresh data after adding

All the UI structure is ready - just need to wire up the backend! 🎉
