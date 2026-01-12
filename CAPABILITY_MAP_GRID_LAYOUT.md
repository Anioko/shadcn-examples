# Capability Map - Grid Layout with Icons

## ✅ New Grid Layout Implemented

The capability map now displays capabilities in a **responsive grid layout** with contextual icons instead of the previous tree/hierarchical view.

## 🎨 Key Features

### Visual Design
- **Grid Cards**: Responsive grid layout (1-4 columns based on screen size)
- **Smart Icons**: Auto-detected icons based on capability name keywords
  - 💡 Innovation/Learning → Lightbulb
  - 👥 Human/Customer → Users
  - 💰 Finance/Revenue → Dollar
  - 🔒 Security/Compliance → Lock
  - 📊 Analytics/Market → Bar Chart
  - ...and 20+ more icon mappings
- **Icon Sizes**: Level 0 (larger) vs Level 1+ (smaller) for visual hierarchy
- **Heat Map Colors**: Still maintained - maturity, importance, investment
- **Hover Effects**: Shadow and action buttons appear on hover

### Layout Structure
- **Three Bands**: Strategic (blue), Operational (green), Supporting (amber)
- **Grid per Band**: Each band contains a responsive grid of capabilities
- **Expandable Children**: Click "Show X Sub-Capabilities" to expand nested grids
- **Nested Indentation**: Children grids are indented with left border indicator

### CRUD Operations
- All CRUD functionality preserved
- **Add**: Band-level "Add Capability" button + card-level "Add" button
- **Edit**: Pencil icon on each card (visible on hover)
- **Delete**: Trash icon on each card (visible on hover)
- Same dialogs and confirmation workflows

### Responsive Grid
```
Desktop (xl):  4 columns
Laptop (lg):   3 columns
Tablet (md):   2 columns
Mobile:        1 column
```

## 📂 Files

### New Files
- `components/capability-map/capability-map-viewer.tsx` - New grid-based viewer (current)

### Backup Files
- `components/capability-map/capability-map-viewer-tree.tsx` - Original tree viewer (backup)

## 🔄 How to Revert to Tree View

If you prefer the original tree/hierarchical view:

### Option 1: Quick File Swap
```bash
cd components/capability-map
mv capability-map-viewer.tsx capability-map-viewer-grid.tsx
mv capability-map-viewer-tree.tsx capability-map-viewer.tsx
```

### Option 2: Update Import (Recommended)
In `app/(reqarchitect)/frameworks/capability-model/capability-map/page.tsx`:

**Change:**
```typescript
import { CapabilityMapViewer } from '@/components/capability-map/capability-map-viewer'
```

**To:**
```typescript
import { CapabilityMapViewer } from '@/components/capability-map/capability-map-viewer-tree'
```

## 📊 Comparison

| Feature | Grid Layout (New) | Tree Layout (Old) |
|---------|------------------|-------------------|
| View Style | Card grid with icons | Hierarchical tree with indents |
| Icon Display | ✅ Smart icons per capability | ❌ No individual icons |
| Compactness | More compact, scannable | More vertical space |
| Hierarchy | Expandable nested grids | Inline tree expansion |
| CRUD Controls | Hover buttons | Always visible buttons |
| Responsive | 1-4 column grid | Single column |
| Visual Density | Higher (more on screen) | Lower (more spacing) |

## 🎯 Icon Mapping

The grid layout includes smart icon detection based on capability name keywords:

```typescript
strategy → Target
innovation → Lightbulb
customer → Users
product → Package
finance → DollarSign
data → Database
security → Lock
marketing → Briefcase
operations → Settings
...and more!
```

Falls back to type-based icons:
- Strategic → Target
- Operational → Cog
- Supporting → Shield

## 💡 Usage Tips

### For Dense Information Display
- Use "Collapse All" to see just Level 0 capabilities
- Grid shows more items per screen than tree view

### For Hierarchical Exploration
- Click "Show X Sub-Capabilities" on any card
- Children appear in nested grid below parent

### For Quick Scanning
- Icons provide visual categorization
- Heat map colors show status at a glance
- Badge shows child count

## 🚀 Test It Out

Visit: http://localhost:3000/frameworks/capability-model/capability-map

Try:
1. View the grid layout across all three bands
2. Hover over cards to see CRUD buttons
3. Click "Show Sub-Capabilities" on any parent
4. Add a new capability and see it appear in the grid
5. Toggle heat maps to see color changes
6. Resize browser to see responsive grid columns

---

**Current Status**: Grid layout is ACTIVE
**Backup Available**: Tree layout backed up as `capability-map-viewer-tree.tsx`
**Easy Revert**: Change import or swap files
