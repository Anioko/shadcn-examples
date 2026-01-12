# Form Generator Integration - Implementation Progress

## ✅ What's Been Created

### 1. **Form Schema System** (`lib/framework-form-schemas.ts`)
- Defines form schemas for each grandchild type
- Currently includes schemas for:
  - **Lean Canvas**: Problems, Solutions, Key Metrics
  - **TOGAF**: Architecture Vision
  - **ISO 27001**: Controls (all 4 types)
- **Default Generic Schema** as fallback for grandchildren without custom schemas
- Helper functions: `getFormSchema()`, `hasCustomFormSchema()`

### 2. **Dynamic Form Component** (`components/framework/dynamic-form.tsx`)
- Reusable form component that renders based on schema
- Supports multiple field types:
  - Text input
  - Number input
  - Textarea
  - Select dropdown
  - Tags with suggestions
  - Date picker
  - Checkbox
- **Multi-step support** with progress indicator
- Navigation between steps (Previous/Next buttons)
- Form validation

## 🔄 Next Steps - Integration

### Step 1: Update Data Table Component
Need to modify `app/(reqarchitect)/frameworks/[slug]/dashboard/components/data-table.tsx`:

1. Import `DynamicForm` and `getFormSchema`
2. Add state for "add new item" mode
3. Modify the "Add [Grandchild]" button to open form in drawer
4. Update drawer to show form instead of edit fields when adding new item

### Step 2: Wire Up Section Cards
Update `section-cards.tsx`:
- Add click handler to "Add [Grandchild]" buttons
- Open drawer with form (can pass grandchild info via props)

### Step 3: Wire Up Navbar Dropdown
Update `site-header.tsx`:
- Add click handlers to dropdown menu items
- Trigger drawer/modal with appropriate form

### Step 4: Handle Form Submission
- Create submission handler
- Show success toast
- Refresh data (currently mock, will integrate with API later)
- Close drawer

## 📋 Form Schema Structure

### Example: Lean Canvas - Problem
```typescript
{
  id: "lean-canvas-problem",
  title: "Add Problem",
  description: "Define a problem that your customers face",
  steps: [
    {
      id: "problem-details",
      title: "Problem Details",
      fields: [
        { id: "title", type: "input", label: "Problem Title", required: true },
        { id: "description", type: "textarea", label: "Problem Description", required: true },
        { id: "customerSegments", type: "tags", label: "Customer Segments", suggestions: [...] },
        { id: "priority", type: "select", label: "Priority", options: [...] },
        // ... more fields
      ]
    }
  ]
}
```

## 🎯 Benefits

1. **Consistent UX**: All forms follow the same pattern
2. **Easy to Extend**: Add new schemas in one place
3. **Multi-step Support**: Complex forms can have multiple steps
4. **Validation**: Built-in form validation
5. **Suggestions**: Tag fields can have predefined suggestions
6. **Fallback**: Generic form for grandchildren without custom schemas

## 📝 Adding New Form Schemas

To add a schema for a new grandchild:

```typescript
// In lib/framework-form-schemas.ts

export const newGrandchildSchema: FrameworkFormSchema = {
  id: "framework-grandchild",
  title: "Add Grandchild",
  description: "Description here",
  steps: [
    {
      id: "step-1",
      title: "Step Title",
      fields: [
        // Define your fields
      ]
    }
  ]
}

// Add to mapping
export const frameworkFormSchemas: Record<string, Record<string, FrameworkFormSchema>> = {
  "framework-slug": {
    "grandchild-id": newGrandchildSchema,
  }
}
```

## 🔗 Integration with Prisma

The form data will be saved to Prisma models:
- `BusinessModelCanvas` - for Lean Canvas items (JSON fields)
- Custom models for other frameworks
- Generic `FrameworkTask` or similar for items without specific models

## ⚠️ Current Status

**Created:**
- ✅ Form schema definitions
- ✅ Dynamic form component
- ✅ Default fallback schema

**Needs Integration:**
- ⏳ Wire up "Add" buttons to open forms
- ⏳ Handle form submission
- ⏳ Integrate with data refresh
- ⏳ Add API endpoints for saving data

## 🎨 UI Flow

```
User clicks "Add Problem" 
  → Drawer opens with DynamicForm
  → Form renders based on leanCanvasProblemSchema
  → User fills out fields
  → Tags can be added with suggestions
  → User clicks Submit
  → Data saved (currently mock)
  → Success toast shown
  → Drawer closes
  → Table refreshes with new item
```

## 🚀 Ready to Continue

The foundation is complete! Next step is to integrate the form into the data table drawer.

Would you like me to:
1. Continue with the integration?
2. Add more form schemas first?
3. Review and test what's been created?
