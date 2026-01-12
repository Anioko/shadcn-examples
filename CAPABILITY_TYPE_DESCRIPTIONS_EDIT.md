# Capability Type Descriptions Edit Feature

## ✅ Type Descriptions Editing Complete!

You can now edit the descriptions for all three capability types (Strategic, Operational, Supporting) directly from the UI!

---

## 🎯 Feature Overview

Each capability type section now includes an **Edit** button (✏️) next to the description that allows you to modify:
- **Strategic Capabilities** description
- **Operational Capabilities** description
- **Supporting Capabilities** description

All three descriptions are edited together in a single dialog for convenience.

---

## 📍 Location

Edit buttons appear next to each type description in the capability band headers:

```
┌─────────────────────────────────────────────────────────────┐
│  🎯 Strategic Capabilities                   [+ Add]         │
│     High-level capabilities that differentiate... [✏️]       │
├─────────────────────────────────────────────────────────────┤
│  ⚙️ Operational Capabilities                 [+ Add]         │
│     Core business operations that deliver... [✏️]            │
├─────────────────────────────────────────────────────────────┤
│  🛡️ Supporting Capabilities                  [+ Add]         │
│     Foundational capabilities that enable... [✏️]            │
└─────────────────────────────────────────────────────────────┘
```

**Note**: All three edit buttons open the same dialog where you can edit all three descriptions at once.

---

## 🎨 UI Components

### Edit Buttons
- **Location**: Next to each type description
- **Icon**: Small pencil/edit icon (Edit2)
- **Style**: Ghost button, extra small
- **Color**: Matches capability type color scheme
- **Hover**: Opacity increases, subtle background
- **Visibility**: Only shown when:
  - Not in read-only mode
  - onTypeDescriptionsUpdate callback is provided

### Edit Dialog
Professional, scrollable dialog with:
- **Title**: "Edit Capability Type Descriptions"
- **Description**: Helper text explaining the purpose
- **Form Fields** (3 textareas):
  1. **Strategic Capabilities**
     - Icon: 🎯 Target (blue)
     - 2-row textarea
     - Helper text with examples
  2. **Operational Capabilities**
     - Icon: ⚙️ Cog (green)
     - 2-row textarea
     - Helper text with examples
  3. **Supporting Capabilities**
     - Icon: 🛡️ Shield (amber)
     - 2-row textarea
     - Helper text with examples
- **Actions**:
  - Reset to Defaults button (left side)
  - Cancel button (right side)
  - Save Changes button (primary, right side)

---

## 📁 File Structure

### New Files Created:

#### `components/capability-map/capability-type-descriptions-dialog.tsx`
Dialog component for editing all three capability type descriptions simultaneously.

**Features**:
- ✅ Three separate textareas with color-coded icons
- ✅ Auto-populated with current values
- ✅ Cancel resets form to original values
- ✅ Reset to Defaults button restores original descriptions
- ✅ Helper text and examples for each type
- ✅ Responsive design with scrolling for small screens
- ✅ Keyboard accessible

**Props**:
```typescript
interface CapabilityTypeDescriptionsDialogProps {
  open: boolean
  onClose: () => void
  onSave: (descriptions: CapabilityTypeDescriptions) => void
  capabilityMap: CapabilityMap
}
```

**Default Descriptions**:
```typescript
{
  strategic: 'High-level capabilities that differentiate the organization',
  operational: 'Core business operations that deliver value to customers',
  supporting: 'Foundational capabilities that enable strategic and operational layers',
}
```

### Modified Files:

#### `lib/types/capability-map.ts`
- Added `CapabilityTypeDescriptions` interface
- Extended `CapabilityMap` interface with optional `typeDescriptions` field

```typescript
export interface CapabilityTypeDescriptions {
  strategic: string
  operational: string
  supporting: string
}

export interface CapabilityMap {
  // ... existing fields
  typeDescriptions?: CapabilityTypeDescriptions
  // ... rest of fields
}
```

#### `lib/data/sample-capability-map.ts`
- Added default `typeDescriptions` to sample data
- Populated with standard ArchiMate-style descriptions

#### `components/capability-map/capability-map-viewer.tsx`
- Added `onTypeDescriptionsUpdate` to props interface
- Imported `CapabilityTypeDescriptions` and new dialog
- Added `typeDescriptionsDialogOpen` state
- Created `DEFAULT_TYPE_DESCRIPTIONS` constant
- Removed hardcoded descriptions from `CAPABILITY_TYPE_CONFIG`
- Added logic to use `capabilityMap.typeDescriptions` or defaults
- Updated section headers to use dynamic descriptions
- Added edit button to each capability band header
- Integrated `CapabilityTypeDescriptionsDialog` component

#### `app/(reqarchitect)/frameworks/capability-model/capability-map/page.tsx`
- Imported `CapabilityTypeDescriptions` type
- Added `handleTypeDescriptionsUpdate()` function
- Updates capability map state with new descriptions
- Updates timestamp
- Shows success toast notification
- Passed `onTypeDescriptionsUpdate` to CapabilityMapViewer

---

## 🔧 Technical Implementation

### Data Structure

Type descriptions are stored in the `CapabilityMap` object:
```typescript
interface CapabilityMap {
  id: string
  name: string
  description?: string
  typeDescriptions?: CapabilityTypeDescriptions  // ← New field
  version: string
  capabilities: Capability[]
  createdAt: string
  updatedAt: string
}

interface CapabilityTypeDescriptions {
  strategic: string     // ← Editable
  operational: string   // ← Editable
  supporting: string    // ← Editable
}
```

### Update Flow

1. User clicks Edit button (✏️) next to any type description
2. Dialog opens with all three descriptions pre-filled
3. User modifies any or all of the descriptions
4. User clicks "Save Changes"
5. All three descriptions are saved (even if only one was changed)
6. Parent component updates state
7. `updatedAt` timestamp is updated
8. Success toast notification appears
9. Dialog closes
10. UI updates with new descriptions in all three bands

### Fallback Behavior

If `typeDescriptions` is not defined in the capability map data:
```typescript
const typeDescriptions = capabilityMap.typeDescriptions || DEFAULT_TYPE_DESCRIPTIONS
```

This ensures backward compatibility and provides sensible defaults.

---

## 🎯 User Experience

### Opening the Dialog
- Click any of the three edit buttons (✏️)
- All buttons open the same dialog
- Dialog slides in from center
- Form is pre-populated with current values
- First field (Strategic) is auto-focused

### Editing
- Edit any or all three descriptions
- Textareas auto-expand vertically
- Real-time character count (if needed)
- Helper text provides guidance

### Saving Changes
1. **Via Save Button**:
   - Click "Save Changes" button
   - All three descriptions saved
   - Changes applied immediately
   - Toast notification confirms success
   - Dialog closes

2. **Via Reset Button**:
   - Click "Reset to Defaults" button
   - All fields reset to default values
   - No save yet - just resets form
   - Can still cancel or save

3. **Via Cancel Button**:
   - Click "Cancel" button
   - Form resets to original values
   - No changes applied
   - Dialog closes

4. **Via Close (X) or Outside Click**:
   - Same as Cancel
   - Changes discarded
   - Form resets

---

## 💡 Example Use Cases

### Scenario 1: Industry-Specific Language
**Original**: "High-level capabilities that differentiate the organization"
**New**: "Strategic differentiators and competitive advantages in financial services"

### Scenario 2: Internal Terminology
**Original**: "Core business operations that deliver value to customers"
**New**: "Revenue-generating operations and client-facing services"

### Scenario 3: Simplified Descriptions
**Original**: "Foundational capabilities that enable strategic and operational layers"
**New**: "Support functions like IT, HR, and Finance"

### Scenario 4: Detailed Explanations
**Original**: "Core business operations that deliver value to customers"
**New**: "Day-to-day operational activities including production, delivery, sales, and customer support that directly generate revenue and customer satisfaction"

---

## 🎨 Visual Design

### Edit Buttons
- **Size**: Extra small (5x5 pixels)
- **Icon**: Edit2 (3x3 pixels)
- **Color**: Matches section color (blue/green/amber)
- **Opacity**: 60% default, 100% on hover
- **Background**: Transparent, white/50 on hover
- **Position**: Inline with description text

### Dialog
- Max width: 700px on desktop
- Max height: 90vh (scrollable)
- Full width on mobile
- Smooth animation on open/close
- Backdrop overlay
- Rounded corners
- Shadow for depth

### Form Fields
- Color-coded icons for each type
- 2-row textareas (non-resizable)
- Helper text in muted color
- Proper spacing between fields
- Responsive layout

### Action Buttons
- Reset to Defaults: Outline style, left-aligned
- Cancel: Outline style, right-aligned
- Save Changes: Primary style, right-aligned

---

## 📊 Impact on Exports

When you update the capability type descriptions:

✅ **All export formats reflect the new descriptions:**

1. **CSV**: Section comments include descriptions (if applicable)
2. **Excel**: Sheet descriptions/notes use updated text
3. **JSON**: `typeDescriptions` object fully updated
4. **Markdown**: Section headers include updated descriptions
5. **Text**: Section headers show new descriptions
6. **PNG/JPEG/JPG/SVG**: Visual displays updated descriptions in headers

---

## 🔐 Security & Validation

### Input Sanitization
- Descriptions are trimmed (whitespace removed)
- If empty, defaults are used
- No HTML injection (React handles escaping)
- Reasonable length limits enforced by UI

### Defaults on Empty
If user clears all text and saves:
```typescript
{
  strategic: strategic.trim() || DEFAULT_DESCRIPTIONS.strategic,
  operational: operational.trim() || DEFAULT_DESCRIPTIONS.operational,
  supporting: supporting.trim() || DEFAULT_DESCRIPTIONS.supporting,
}
```

This ensures descriptions are never truly empty.

---

## ♿ Accessibility

- ✅ Keyboard navigation fully supported
- ✅ Screen reader labels (sr-only)
- ✅ Focus management (auto-focus on first field)
- ✅ ARIA attributes on form fields
- ✅ Clear focus indicators
- ✅ Logical tab order
- ✅ Accessible button titles

---

## 📱 Responsive Design

### Desktop
- Dialog centered on screen
- Max width: 700px
- Three-column button layout
- Comfortable padding

### Tablet
- Slightly narrower dialog
- Same layout as desktop
- Touch-friendly button sizes

### Mobile
- Full-width dialog (with margins)
- Scrollable content area
- Larger touch targets
- Single-column layout
- Bottom action buttons

---

## 🔄 State Synchronization

The type descriptions feature properly synchronizes with:

1. **Local State**: Component state updates immediately
2. **UI Display**: All three band headers update in real-time
3. **Export Functions**: All exports use updated descriptions
4. **Timestamps**: `updatedAt` field automatically updated
5. **Toast Notifications**: User feedback on success

---

## 🎉 Benefits

1. **Flexibility**: Customize descriptions for your organization's language
2. **Consistency**: All three types managed in one place
3. **No Code Required**: Edit directly in the UI
4. **Real-Time Updates**: Changes reflect immediately across all bands
5. **Export-Ready**: Updated descriptions appear in all export formats
6. **User-Friendly**: Simple, intuitive dialog interface
7. **Reversible**: Reset to Defaults button restores original text
8. **Validation**: Empty fields auto-fill with defaults

---

## 🚀 Usage Instructions

### How to Edit Capability Type Descriptions

1. Navigate to the Capability Map page:
   ```
   /frameworks/capability-model/capability-map
   ```

2. Find any of the three edit buttons (✏️) next to the type descriptions:
   - Strategic Capabilities: Blue section
   - Operational Capabilities: Green section
   - Supporting Capabilities: Amber section

3. Click any **Edit** button (✏️)

4. In the dialog:
   - Edit **Strategic Capabilities** description
   - Edit **Operational Capabilities** description
   - Edit **Supporting Capabilities** description

5. Optional: Click **Reset to Defaults** to restore original descriptions

6. Click **Save Changes** to apply

7. See success notification

8. Verify changes in:
   - All three band headers
   - Exported files

---

## 🔍 Testing Checklist

- [x] Edit buttons appear next to each type description
- [x] Edit buttons only show when not read-only
- [x] Clicking any edit button opens dialog
- [x] Dialog pre-fills with current values
- [x] All three textareas are editable
- [x] Reset to Defaults button works
- [x] Save button updates state
- [x] Toast notification appears on save
- [x] Dialog closes on save
- [x] Cancel resets form
- [x] Cancel closes dialog
- [x] Outside click closes dialog
- [x] Escape key closes dialog
- [x] Changes persist in UI
- [x] All three bands show updated descriptions
- [x] Updated timestamp changes
- [x] Exports use new descriptions
- [x] Empty fields use defaults

---

## 💾 Data Persistence

**Current Implementation**: In-memory state only

The type descriptions are stored in the component's local state. To persist changes:

### Option 1: Local Storage
Add to `handleTypeDescriptionsUpdate`:
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
  .update({
    type_descriptions: descriptions,
    updated_at: new Date()
  })
  .eq('id', capabilityMap.id)
```

---

## 📝 Default Descriptions Reference

### Strategic Capabilities (🎯)
```
High-level capabilities that differentiate the organization
```

Purpose: Defines competitive advantage, market positioning, and strategic direction.

### Operational Capabilities (⚙️)
```
Core business operations that deliver value to customers
```

Purpose: Revenue-generating activities and customer-facing processes.

### Supporting Capabilities (🛡️)
```
Foundational capabilities that enable strategic and operational layers
```

Purpose: Infrastructure, shared services, and enablers like IT, HR, Finance.

---

## 📚 ArchiMate Alignment

These descriptions align with ArchiMate 3.2 capability-based planning principles:

- **Strategic Layer**: Defines "what" makes the organization unique
- **Operational Layer**: Defines "how" value is delivered
- **Supporting Layer**: Defines "what enables" the other layers

Source: [ArchiMate Capability-Based Planning](https://www.modernanalyst.com/Resources/Articles/tabid/115/ID/5248/Capability-Based-Planning-with-ArchiMate.aspx)

---

## 🔄 Migration Notes

### For Existing Data
If you have existing capability maps without `typeDescriptions`:
1. They will automatically use the default descriptions
2. No data migration required
3. Edit and save to add custom descriptions
4. `typeDescriptions` field will be added on first save

### Backward Compatibility
- ✅ Old data works without changes
- ✅ New field is optional (`typeDescriptions?`)
- ✅ Defaults provided via `DEFAULT_TYPE_DESCRIPTIONS`
- ✅ No breaking changes

---

## 📈 Future Enhancements

Potential additions:
- 📝 Rich text editing for descriptions
- 🎨 Custom color schemes per type
- 🔤 Multi-language support for descriptions
- 📋 Description templates library
- 🔍 Description search/filter
- 📊 Description history/versioning
- 🏷️ Tags/keywords for types
- 🔗 Links to documentation in descriptions
- 👥 Collaborative editing with comments

---

## ✅ Summary

The capability type descriptions edit feature provides:

- ✅ **Easy editing** via a single dialog for all three types
- ✅ **Real-time updates** across all capability band headers
- ✅ **Reset functionality** to restore defaults
- ✅ **User feedback** via toast notifications
- ✅ **Export integration** - all formats use updated descriptions
- ✅ **Responsive design** works on all devices
- ✅ **Accessible** keyboard and screen reader support
- ✅ **Backward compatible** with existing data

**You can now customize all three capability type descriptions directly from the UI!** 🎉

All three edit buttons open the same dialog where you can efficiently update all descriptions at once, with the ability to reset to defaults if needed.
