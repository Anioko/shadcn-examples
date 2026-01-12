# Capability Map Metadata Edit Feature

## ✅ Metadata Editing Complete!

You can now edit the capability map title and description directly from the UI!

---

## 🎯 Feature Overview

The capability map now includes an **Edit** button next to the title that allows you to modify:
- **Capability Map Name** (e.g., "Enterprise Business Capabilities")
- **Description** (e.g., "Complete capability model organized by strategic, operational, and supporting layers")

---

## 📍 Location

The edit button appears in the **Capability Map Viewer** header:

```
┌─────────────────────────────────────────────────────────┐
│  Enterprise Business Capabilities  [✏️ Edit]            │
│  Complete capability model organized by...               │
│                                                          │
│  Heat Map: [Maturity ▼]  [+ Add Root Capability]       │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 UI Components

### Edit Button
- **Location**: Next to capability map title
- **Icon**: Pencil/Edit icon (Edit2)
- **Style**: Ghost button, small size
- **Visibility**: Only shown when:
  - Not in read-only mode
  - onMetadataUpdate callback is provided

### Edit Dialog
Professional dialog modal with:
- **Title**: "Edit Capability Map Details"
- **Description**: Helper text explaining the purpose
- **Form Fields**:
  1. **Capability Map Name** (required)
     - Input field with validation
     - Example placeholder text
     - Required field indicator (red asterisk)
  2. **Description** (optional)
     - Textarea with 3 rows
     - Expandable for longer descriptions
     - Helper text with examples
- **Actions**:
  - Cancel button (outline style)
  - Save Changes button (primary style, disabled when name is empty)

---

## 📁 File Structure

### New Files Created:

#### `components/capability-map/capability-map-metadata-dialog.tsx`
Dialog component for editing capability map metadata.

**Features**:
- ✅ Form validation (name is required)
- ✅ Auto-populated with current values
- ✅ Cancel resets form to original values
- ✅ Helper text and examples
- ✅ Responsive design
- ✅ Keyboard accessible

**Props**:
```typescript
interface CapabilityMapMetadataDialogProps {
  open: boolean
  onClose: () => void
  onSave: (name: string, description: string) => void
  capabilityMap: CapabilityMap
}
```

### Modified Files:

#### `components/capability-map/capability-map-viewer.tsx`
- Added `onMetadataUpdate` to props interface
- Added `metadataDialogOpen` state
- Added Edit button in header (next to title)
- Imported and integrated `CapabilityMapMetadataDialog`
- Conditional rendering based on `readOnly` and `onMetadataUpdate`

#### `app/(reqarchitect)/frameworks/capability-model/capability-map/page.tsx`
- Added `handleMetadataUpdate()` function
- Updates capability map name and description
- Updates timestamp
- Shows success toast notification
- Passed `onMetadataUpdate={handleMetadataUpdate}` to CapabilityMapViewer

---

## 🔧 Technical Implementation

### State Management

The metadata is part of the `CapabilityMap` object:
```typescript
interface CapabilityMap {
  id: string
  name: string                // ← Editable
  description?: string        // ← Editable
  version: string
  createdAt: string
  updatedAt: string          // ← Auto-updated on save
  capabilities: Capability[]
}
```

### Update Flow

1. User clicks Edit button (✏️) next to title
2. Dialog opens with current name and description pre-filled
3. User modifies fields
4. User clicks "Save Changes"
5. Validation checks if name is not empty
6. `onSave` handler triggered with new values
7. Parent component updates state
8. `updatedAt` timestamp is updated
9. Success toast notification appears
10. Dialog closes
11. UI updates with new values

### Validation

- **Name**: Required field
  - Cannot be empty or whitespace only
  - Trimmed before saving
  - Save button disabled when empty

- **Description**: Optional field
  - Can be empty
  - Trimmed before saving

---

## 🎯 User Experience

### Opening the Dialog
- Click the edit button (pencil icon) next to the title
- Dialog slides in from center
- Form is pre-populated with current values
- Name field is auto-focused

### Editing
- Type in the fields
- Real-time validation
- Helper text provides examples and guidance
- Character count visible in textarea

### Saving Changes
1. **Via Save Button**:
   - Click "Save Changes" button
   - Changes applied immediately
   - Toast notification confirms success
   - Dialog closes

2. **Via Cancel Button**:
   - Click "Cancel" button
   - Form resets to original values
   - No changes applied
   - Dialog closes

3. **Via Close (X) or Outside Click**:
   - Same as Cancel
   - Changes discarded
   - Form resets

---

## 💡 Example Use Cases

### Scenario 1: Rebranding
**Original**: "Enterprise Business Capabilities"
**New**: "Digital Transformation Roadmap"

### Scenario 2: More Specific Description
**Original**: "Complete capability model organized by strategic, operational, and supporting layers"
**New**: "Q1 2025 Enterprise Architecture - Strategic initiative mapping across all business units with focus on digital enablement"

### Scenario 3: Project-Specific Naming
**Original**: "Enterprise Business Capabilities"
**New**: "Project Phoenix - Core Capabilities Assessment"

---

## 🎨 Visual Design

### Edit Button
- Ghost button style (transparent, shows on hover)
- Small size (7x7 pixels)
- Edit2 icon (Lucide)
- Positioned inline with title
- Accessible label: "Edit capability map details"

### Dialog
- Max width: 600px on desktop
- Full width on mobile
- Smooth animation on open/close
- Backdrop overlay
- Rounded corners
- Shadow for depth

### Form Fields
- Clear labels
- Required field indicators
- Helper text in muted color
- Proper spacing between fields
- Responsive layout

---

## 📊 Impact on Exports

When you update the capability map name and description:

✅ **All export formats reflect the new metadata:**

1. **CSV**: First line header comment (if applicable)
2. **Excel**: Sheet names and summary use new name
3. **JSON**: `name` and `description` fields updated
4. **Markdown**: Top-level heading uses new name
5. **Text**: Header section shows new name
6. **PNG/JPEG/JPG/SVG**: Visual shows new name in header

---

## 🔐 Security & Validation

### Input Sanitization
- Name and description are trimmed (whitespace removed)
- No HTML injection (React handles escaping)
- Maximum reasonable lengths enforced by UI

### Required Fields
- Name is required (cannot be empty)
- Save button disabled until valid
- Form validation on submit

---

## ♿ Accessibility

- ✅ Keyboard navigation supported
- ✅ Screen reader labels (sr-only)
- ✅ Focus management (auto-focus on name field)
- ✅ ARIA attributes on form fields
- ✅ Clear focus indicators
- ✅ Logical tab order

---

## 📱 Responsive Design

### Desktop
- Dialog centered on screen
- Max width: 600px
- Comfortable padding
- Two-column layout for actions

### Tablet
- Slightly narrower dialog
- Same layout as desktop
- Touch-friendly button sizes

### Mobile
- Full-width dialog
- Single-column layout
- Larger touch targets
- Bottom sheet style (if needed)

---

## 🔄 State Synchronization

The metadata edit feature properly synchronizes with:

1. **Local State**: Component state updates immediately
2. **UI Display**: Title and description update in real-time
3. **Export Functions**: All exports use updated metadata
4. **Timestamps**: `updatedAt` field automatically updated
5. **Toast Notifications**: User feedback on success

---

## 🎉 Benefits

1. **Flexibility**: Easily customize capability map naming for different projects
2. **No Code Required**: Edit directly in the UI without touching code
3. **Real-Time Updates**: Changes reflect immediately
4. **Export-Ready**: Updated metadata appears in all export formats
5. **User-Friendly**: Simple, intuitive dialog interface
6. **Validation**: Prevents invalid states (empty names)
7. **Reversible**: Cancel button discards changes

---

## 🚀 Usage Instructions

### How to Edit Capability Map Metadata

1. Navigate to the Capability Map page:
   ```
   /frameworks/capability-model/capability-map
   ```

2. Look for the title section at the top:
   ```
   Enterprise Business Capabilities  [✏️]
   ```

3. Click the **Edit** button (pencil icon)

4. In the dialog:
   - Edit the **Capability Map Name** (required)
   - Edit the **Description** (optional)

5. Click **Save Changes** to apply

6. See success notification

7. Verify changes in:
   - Header display
   - Exported files

---

## 🔍 Testing Checklist

- [x] Edit button appears next to title
- [x] Edit button only shows when not read-only
- [x] Clicking edit opens dialog
- [x] Dialog pre-fills with current values
- [x] Name field is required
- [x] Save button disabled when name empty
- [x] Save button updates state
- [x] Toast notification appears on save
- [x] Dialog closes on save
- [x] Cancel resets form
- [x] Cancel closes dialog
- [x] Outside click closes dialog
- [x] Escape key closes dialog
- [x] Changes persist in UI
- [x] Updated timestamp changes
- [x] Exports use new metadata

---

## 💾 Data Persistence

**Current Implementation**: In-memory state only

The metadata changes are stored in the component's local state. To persist changes:

### Option 1: Local Storage
Add to `handleMetadataUpdate`:
```typescript
localStorage.setItem('capabilityMap', JSON.stringify(capabilityMap))
```

### Option 2: API Integration
Replace the TODO in `handleSave`:
```typescript
await fetch('/api/capability-maps', {
  method: 'PUT',
  body: JSON.stringify(capabilityMap)
})
```

### Option 3: Database (Supabase)
Use existing Supabase integration:
```typescript
await supabase
  .from('capability_maps')
  .update({ name, description, updated_at: new Date() })
  .eq('id', capabilityMap.id)
```

---

## 📝 Future Enhancements

Potential additions:
- 📅 Version tracking for metadata changes
- 👥 Multi-user collaboration (real-time updates)
- 🔒 Permission-based editing (role restrictions)
- 📊 Metadata history/audit log
- 🎨 Custom metadata fields (owner, department, etc.)
- 🔍 Metadata search/filter
- 📎 Attachments (documents, links)
- 🏷️ Tags/categories for organization

---

## ✅ Summary

The capability map metadata edit feature is fully functional and provides:

- ✅ **Easy editing** via dialog interface
- ✅ **Real-time updates** to title and description
- ✅ **Form validation** to prevent invalid states
- ✅ **User feedback** via toast notifications
- ✅ **Export integration** - all formats use updated metadata
- ✅ **Responsive design** works on all devices
- ✅ **Accessible** keyboard and screen reader support

**You can now customize your capability map name and description directly from the UI!** 🎉
