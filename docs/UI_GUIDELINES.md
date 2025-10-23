# ReqArchitect UI Guidelines & Guardrails

## Core Principle: 99.9% Design Parity

**CRITICAL**: ReqArchitect reuses Achromatic (https://achromatic.dev/) which uses shadcn examples (https://shadcnexamples.com/). We maintain **99.9% strict UI parity** with the source designs. Changes are permitted only within the defined 0.1% scope below.

---

## Source Templates (Use As-Is)

These templates form the foundation of ReqArchitect's UI and must be copied exactly:

1. **Admin Dashboard** - https://shadcnexamples.com/admin-dashboard
2. **Onboarding Flow** - https://shadcnexamples.com/onboarding-flow  
3. **Task Detail** - https://shadcnexamples.com/task-detail
4. **Roadmap** - https://shadcnexamples.com/roadmap
5. **Playground** - https://shadcnexamples.com/playground

---

## Absolute Prohibitions (Never Change)

### Layout & Structure
- ❌ **NEVER** modify grid layouts, spacing systems, or container widths
- ❌ **NEVER** change component positioning (header, sidebar, main content areas)
- ❌ **NEVER** alter responsive breakpoints or mobile/tablet/desktop layouts
- ❌ **NEVER** modify z-index stacking or layer hierarchies
- ❌ **NEVER** change navigation structures (top nav, side nav, breadcrumbs)
- ❌ **NEVER** alter card layouts, panel arrangements, or section divisions

### Visual Design
- ❌ **NEVER** change color palette (including hover states, active states, disabled states)
- ❌ **NEVER** modify typography (font families, sizes, weights, line heights)
- ❌ **NEVER** alter border styles, radii, or shadow definitions
- ❌ **NEVER** change animation durations, easing functions, or transition effects
- ❌ **NEVER** modify opacity values or blur effects
- ❌ **NEVER** change icon styles, sizes, or stroke widths

### Component Behavior
- ❌ **NEVER** change interaction patterns (clicks, hovers, focus states)
- ❌ **NEVER** modify form validation behaviors or error display patterns
- ❌ **NEVER** alter modal/dialog opening mechanisms or overlay behaviors
- ❌ **NEVER** change dropdown/select menu behaviors
- ❌ **NEVER** modify table sorting, filtering, or pagination mechanisms
- ❌ **NEVER** alter loading state presentations or skeleton screens

### Component Library
- ❌ **NEVER** create custom components when shadcn equivalents exist
- ❌ **NEVER** modify existing shadcn component source code
- ❌ **NEVER** change component composition patterns
- ❌ **NEVER** alter accessibility attributes (ARIA labels, roles, keyboard navigation)

---

## Permitted Changes (The 0.1%)

### Content Replacement ONLY
These are the **ONLY** allowed modifications:

#### 1. Text Content
✅ **ALLOWED**: Replace placeholder text with ReqArchitect-specific content
- Dashboard titles: "Dashboard Overview" → "ReqArchitect Dashboard"
- Section headers: "Recent Projects" → "Business Model Canvas"
- Button labels: "Create New" → "Create Requirement"
- Table column headers: "Name" → "Capability Name"
- Form labels: "Project Name" → "Architecture Component"
- Descriptions and help text for ReqArchitect features

❌ **FORBIDDEN**: Changing text styling, size, weight, or color

#### 2. Icon Swaps (Same Size Only)
✅ **ALLOWED**: Replace icons with semantically equivalent ones from **the same icon library**
- Must maintain exact same dimensions (width/height)
- Must maintain exact same stroke width
- Must maintain exact same color/className
- Example: `<Settings />` → `<Wrench />` (if both from lucide-react)

❌ **FORBIDDEN**: Using different icon libraries, custom SVGs, or different sizes

#### 3. Data Population
✅ **ALLOWED**: Replace mock data with ReqArchitect domain data
- Table rows with actual capability data
- Chart data points with real metrics
- List items with business model elements
- Form options with ReqArchitect-specific choices

❌ **FORBIDDEN**: Changing data visualization types, chart libraries, or display formats

#### 4. Image Assets
✅ **ALLOWED**: Replace placeholder images/logos
- Company logo in header
- User avatars (maintaining exact dimensions)
- Onboarding illustration images

❌ **FORBIDDEN**: Changing image dimensions, aspect ratios, or positioning

---

## Implementation Rules

### Rule 1: Copy First, Modify Never
```typescript
// ✅ CORRECT: Copy exact component structure
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function CapabilityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Management</CardTitle> {/* Content change only */}
      </CardHeader>
      <CardContent>
        {/* Exact same structure as source */}
      </CardContent>
    </Card>
  )
}

// ❌ WRONG: Custom styling or structure
function CapabilityCard() {
  return (
    <Card className="custom-border shadow-lg"> {/* Adding custom classes */}
      <CardHeader className="bg-blue-500"> {/* Modifying colors */}
        <CardTitle className="text-2xl">Customer Management</CardTitle> {/* Changing sizes */}
      </CardHeader>
    </Card>
  )
}
```

### Rule 2: No Custom CSS
```css
/* ❌ FORBIDDEN: Custom CSS files for UI modifications */
.custom-dashboard {
  grid-template-columns: 1fr 2fr; /* Never override layouts */
}

.custom-button {
  border-radius: 8px; /* Never override component styles */
}

/* ✅ ALLOWED: CSS for non-UI functionality only */
.print-only {
  display: none;
}
@media print {
  .print-only {
    display: block;
  }
}
```

### Rule 3: Exact Component Imports
```typescript
// ✅ CORRECT: Use shadcn components exactly as provided
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table"

// ❌ WRONG: Creating wrapper components that modify appearance
import { CustomTable } from "@/components/custom/table" // Don't create custom versions

// ❌ WRONG: Modifying component props beyond data
<Table className="custom-styling"> {/* Don't add custom classes */}
```

### Rule 4: No Tailwind Class Additions
```typescript
// ✅ CORRECT: Use existing classes from source
<div className="flex items-center justify-between">
  <span>Cost Breakdown</span>
</div>

// ❌ WRONG: Adding new Tailwind classes
<div className="flex items-center justify-between gap-4 p-6 rounded-xl">
  {/* Extra gap-4, p-6, rounded-xl not in source */}
</div>

// ❌ WRONG: Modifying existing classes
<div className="flex items-start justify-end"> 
  {/* Changed items-center to items-start */}
</div>
```

### Rule 5: Data Structure Adherence
```typescript
// ✅ CORRECT: Match source data structures exactly
interface TableData {
  id: string
  name: string
  status: "active" | "inactive"
  date: string
}

const capabilities: TableData[] = [
  { id: "1", name: "Customer Management", status: "active", date: "2025-01-15" }
]

// ❌ WRONG: Changing data structures
interface TableData {
  id: string
  name: string
  status: string // Should use union type from source
  date: Date // Should be string like source
  customField: string // Adding fields not in source structure
}
```

---

## Component-Specific Guidelines

### Admin Dashboard
**Source**: https://shadcnexamples.com/admin-dashboard

**Critical Navigation Structure (Must Copy Exactly)**:

#### 1. Top Header Bar (SiteHeader)
**IMMUTABLE Structure**:
```tsx
<header className="bg-background/90 sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
  <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
    <h1 className="text-base font-medium">{pageTitle}</h1> {/* ONLY change title text */}
    <div className="ml-auto flex items-center gap-2">
      <Button size="sm" className="hidden h-7 sm:flex">
        {/* ONLY change icon and button text */}
      </Button>
    </div>
  </div>
</header>
```

**Allowed Changes**:
- Page title text: "Documents" → "Business Model Canvas"
- Button text: "Quick Create" → "Add Capability" 
- Button icon (same size, same library)

**FORBIDDEN**:
- Header height, sticky positioning, z-index
- Background blur, border styling
- Responsive classes or breakpoints
- Button positioning (ml-auto must stay)
- Gap spacing or padding values

#### 2. Sidebar Structure (AppSidebar)
**IMMUTABLE Layout**:
```tsx
<Sidebar collapsible="none" className="h-auto border-r" {...props}>
  <SidebarHeader className="border-b">
    {/* Company logo/brand section - exact structure required */}
  </SidebarHeader>
  <SidebarContent>
    <NavMain items={navMain} />        {/* Primary navigation */}
    <NavDocuments items={documents} /> {/* Secondary navigation */}
    <NavSecondary items={navSecondary} className="mt-auto" /> {/* Footer nav */}
  </SidebarContent>
  <SidebarFooter>
    <NavUser user={user} />           {/* User profile section */}
  </SidebarFooter>
</Sidebar>
```

**Required Sub-Components (Must Include All)**:
- **SidebarHeader**: Company branding with logo and name
- **NavMain**: Primary navigation menu (Dashboard, Analytics, etc.)
- **NavDocuments**: Secondary tool/document navigation
- **NavSecondary**: Settings, Help, Search (with `mt-auto` positioning)
- **NavUser**: User profile in footer

**Allowed Changes**:
- Company name: "Acme Inc." → "ReqArchitect"
- Company logo icon (same size from same library)
- Menu item labels: "Analytics" → "Capabilities"
- Menu item icons (same size from same library)
- Menu item URLs for routing

**FORBIDDEN**:
- Removing any nav sections (NavMain, NavDocuments, NavSecondary, NavUser)
- Changing sidebar width variables
- Modifying collapsible behavior
- Changing border classes
- Altering section ordering or spacing
- Adding new nav sections

#### 3. Navigation Sub-Menus (Critical Pattern)
**NavDocuments Structure (Must Copy)**:
```tsx
<SidebarGroup>
  <SidebarGroupLabel>Documents</SidebarGroupLabel> {/* Section label */}
  <SidebarMenu>
    {items.map((item) => (
      <SidebarMenuItem key={item.name}>
        <SidebarMenuButton asChild>
          <Link href={item.url}>
            <item.icon />
            <span>{item.name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))}
  </SidebarMenu>
</SidebarGroup>
```

**Allowed Changes**:
- Section label: "Documents" → "Architecture Tools"
- Menu item names: "Data Library" → "Capability Map"
- Menu item icons (same library, same size)
- Menu item URLs

**FORBIDDEN**:
- Changing SidebarGroup/Menu/MenuItem structure
- Adding custom styling to menu items
- Changing hover/active state styling
- Modifying spacing between menu items

#### 4. Layout Container (SidebarProvider + SidebarInset)
**IMMUTABLE Structure**:
```tsx
<SidebarProvider
  className="min-h-auto"
  style={{
    "--sidebar-width": "calc(var(--spacing) * 64)",
    "--header-height": "calc(var(--spacing) * 12 + 1px)"
  } as React.CSSProperties}>
  <AppSidebar variant="sidebar" />
  <SidebarInset>
    <SiteHeader />
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        {/* Page content */}
      </div>
    </div>
  </SidebarInset>
</SidebarProvider>
```

**FORBIDDEN**:
- Changing CSS custom properties (sidebar width, header height)
- Modifying SidebarProvider className
- Altering SidebarInset structure
- Changing container gap values
- Removing @container/main class

#### 5. Data Table with Drawer (CRITICAL - Must Copy Exactly)
**Source Pattern**: https://shadcnexamples.com/admin-dashboard (DataTable component)

**IMMUTABLE Table Structure**:
```tsx
<Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
  <div className="flex items-center justify-between px-4 lg:px-6">
    {/* Tab selector and column customization controls */}
  </div>
  <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
    <div className="overflow-hidden rounded-lg border">
      <DndContext> {/* Drag and drop context */}
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {/* Column headers */}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
              {/* Draggable rows */}
            </SortableContext>
          </TableBody>
        </Table>
      </DndContext>
    </div>
    <div className="flex items-center justify-between px-4">
      {/* Pagination controls */}
    </div>
  </TabsContent>
</Tabs>
```

**Required Table Features (Must Include All)**:
1. **Tabs Structure**: Multiple tabs with TabsList and TabsContent
2. **Column Customization**: DropdownMenu with column visibility toggles
3. **Drag Handle Column**: First column with IconGripVertical for reordering
4. **Selection Column**: Checkbox column for row selection
5. **Drawer Integration**: TableCellViewer component with Drawer for detailed view
6. **Pagination**: Full pagination controls with page size selector
7. **Inline Editing**: Editable Input fields within table cells
8. **Action Menu**: DropdownMenu in last column with action items
9. **Sorting**: Column sorting with tanstack/react-table
10. **Filtering**: Built-in filtering capabilities

**CRITICAL Drawer Pattern (Must Copy)**:
```tsx
function TableCellViewer({ item }: { item: DataType }) {
  const isMobile = useIsMobile();
  
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.primaryField}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.primaryField}</DrawerTitle>
          <DrawerDescription>{item.description}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {/* Chart component (if applicable) */}
          {/* Form fields for editing */}
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

**Table Dependencies (Must Install)**:
```json
{
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/modifiers": "^7.0.0", 
  "@dnd-kit/sortable": "^8.0.0",
  "@dnd-kit/utilities": "^3.2.2",
  "@tanstack/react-table": "^8.20.5"
}
```

**Allowed Changes in Tables**:
- Column headers: "Header" → "Capability Name"
- Data content: Mock project data → Real business capability data
- Form field labels in drawer
- Chart data (if chart is included)
- Table schema field names
- Tab labels: "Outline" → "Active Capabilities"

**STRICTLY FORBIDDEN in Tables**:
- Removing drag and drop functionality
- Removing drawer integration
- Changing table visual structure
- Removing pagination controls
- Removing column customization
- Simplifying to basic HTML table
- Removing tabs structure
- Custom table implementations
- Different table libraries (no MUI, Ant Design, etc.)

**Other Immutable Elements**:
- Card arrangements and spacing
- Chart containers and sizing
- Stat cards layout (typically 4-column grid)

**Allowed Changes**:
- Stat card values: "$45,231" → "$127,450"
- Chart data points and labels
- Page-specific content within the layout structure

### Onboarding Flow
**Source**: https://shadcnexamples.com/onboarding-flow

**Immutable Elements**:
- Step indicator design and positioning
- Form field layouts and spacing
- Button positioning (back/next/complete)
- Progress bar design
- Slide transitions and animations
- Form validation error display

**Allowed Changes**:
- Step titles: "Setup Profile" → "Configure Business Model"
- Form field labels: "Company Name" → "Startup Name"
- Form field placeholder text
- Step descriptions and help text
- Success/completion messages

### Task Detail
**Source**: https://shadcnexamples.com/task-detail

**Immutable Elements**:
- Header layout with breadcrumbs
- Two-column or three-column layout structure
- Comment thread design
- Attachment display format
- Metadata section layout (assignee, dates, priority)
- Action button positioning

**Allowed Changes**:
- Task title: "Design System Updates" → "Implement Payment Module"
- Field labels: "Assignee" → "Capability Owner"
- Comment text content
- Attachment file names
- Status labels: "In Progress" → "Under Architecture Review"

### Roadmap
**Source**: https://shadcnexamples.com/roadmap

**Immutable Elements**:
- Timeline visualization structure
- Swimlane/row heights
- Card sizes within timeline
- Drag-and-drop interaction patterns
- Zoom/pan controls (if present)
- Filter/view controls layout

**Allowed Changes**:
- Roadmap item titles: "Feature Launch" → "ERP Integration Launch"
- Timeline labels: "Q1 2024" → "Q1 2025"
- Card content and descriptions
- Category names: "Engineering" → "Architecture Team"

### Playground
**Source**: https://shadcnexamples.com/playground

**Immutable Elements**:
- Code editor dimensions and positioning
- Preview pane sizing
- Panel splitter behavior
- Toolbar layout and controls
- Output console design
- File tree structure (if present)

**Allowed Changes**:
- Code examples: Generic API calls → ReqArchitect API examples
- Variable names in code samples
- Console output messages
- File names in examples

---

## LLM-Specific Guardrails

### For Code Generation Prompts

**Always Include This Preamble**:
```
CRITICAL UI CONSTRAINT: This code must maintain 99.9% visual parity with 
shadcn examples. You may ONLY change text content, data values, and swap 
semantically equivalent icons. You MUST NOT modify any styling, layout, 
spacing, colors, typography, or component structure. Copy the source design 
exactly and only replace the content.
```

**Validation Checklist for LLM Output**:
Before accepting any LLM-generated UI code, verify:

- [ ] No custom className additions beyond what exists in source
- [ ] No inline styles added
- [ ] No new CSS files created for UI styling
- [ ] Component structure matches source exactly
- [ ] Same number of grid columns/rows as source
- [ ] Same spacing values (gap, padding, margin) as source
- [ ] Same color classes as source
- [ ] Same typography classes as source
- [ ] Same component imports from shadcn
- [ ] Only text content, data, or icons changed

### Rejection Criteria

**Immediately reject LLM output if it contains**:
- New Tailwind utility classes not in source
- `style={{}}` inline styling
- Custom CSS imports
- Modified component props that affect appearance
- Different component from shadcn library
- Restructured component hierarchy
- Custom wrapper components
- Modified spacing/sizing values

---

## Business Model Canvas Specific Guidelines

Since BMC is central to ReqArchitect, here's how to implement it:

### Visual Representation
✅ **ALLOWED**: Use **existing card/grid layouts from admin dashboard**
- 9-box grid using `grid grid-cols-3 gap-4` (if source uses this)
- Card component from shadcn for each BMC block
- Existing typography for block titles and content

❌ **FORBIDDEN**: Creating custom BMC visualization
- No custom SVG diagrams
- No custom canvas implementations
- No different grid layouts than source provides

### Example Implementation
```typescript
// ✅ CORRECT: Using existing dashboard grid structure
<div className="grid grid-cols-3 gap-4"> {/* Exact classes from source */}
  <Card> {/* Standard shadcn Card */}
    <CardHeader>
      <CardTitle>Key Partners</CardTitle> {/* Content change only */}
    </CardHeader>
    <CardContent>
      <ul>
        <li>Cloud Provider AWS</li> {/* ReqArchitect data */}
        <li>Payment Gateway Stripe</li>
      </ul>
    </CardContent>
  </Card>
  {/* Repeat for all 9 BMC blocks */}
</div>

// ❌ WRONG: Custom BMC component
<BusinessModelCanvas 
  className="custom-bmc-layout" 
  blocks={bmcData}
  onBlockClick={handleClick}
/> {/* Creating custom components not in source */}
```

---

## Architecture & Technology Stack Visualization

### Capability Maps
✅ **Use**: Existing table or card grid components from admin dashboard
❌ **Don't**: Create custom visualization libraries (D3, vis.js, etc.)

### Tech Stack Lists
✅ **Use**: Existing list components, badges, and tags from source
❌ **Don't**: Create custom tech stack visualizers

### Cost Breakdown
✅ **Use**: Existing chart components (if charts exist in source)
✅ **Use**: Existing table components for detailed breakdowns
❌ **Don't**: Import new charting libraries or create custom graphs

---

## Form Guidelines (Onboarding & Data Entry)

### Field Types Must Match Source
If source uses:
- `<Input />` → Always use `<Input />`
- `<Select />` → Always use `<Select />`
- `<Textarea />` → Always use `<Textarea />`
- `<Checkbox />` → Always use `<Checkbox />`

Never substitute with different form components.

### Validation Display
✅ **Use**: Exact error message styling from source
❌ **Don't**: Create custom validation UI

### Example
```typescript
// ✅ CORRECT: Using source form structure
<form className="space-y-4"> {/* Exact spacing from source */}
  <div className="space-y-2">
    <Label>Startup Name</Label> {/* Content change */}
    <Input placeholder="Enter your startup name" /> {/* Content change */}
  </div>
  <Button type="submit">Continue</Button>
</form>

// ❌ WRONG: Modified structure
<form className="space-y-6 p-4 bg-gray-50 rounded-lg"> {/* Added classes */}
  <div className="flex flex-col gap-3"> {/* Changed structure */}
    <Label className="font-bold">Startup Name</Label> {/* Modified styling */}
    <Input className="border-2" placeholder="Enter name" /> {/* Added border */}
  </div>
</form>
```

---

## Navigation & Routing

### Sidebar/Navigation Menu
✅ **ALLOWED**: Changing menu item labels and destination routes
```typescript
const menuItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/bmc", label: "Business Model", icon: FileText }, // Content change
  { href: "/capabilities", label: "Capabilities", icon: Network }, // New route
]
```

❌ **FORBIDDEN**: Changing menu structure, styling, or behavior
```typescript
// ❌ Don't add submenus if source doesn't have them
// ❌ Don't change hover effects
// ❌ Don't modify active state styling
// ❌ Don't change icon sizes or positions
```

---

## Notification & Alert Systems

### Use Source Alert Components
If designing context-aware notifications (per ReqArchitect requirements):

✅ **Use**: Existing alert/toast components from shadcn
✅ **Use**: Existing badge components for notification counts
❌ **Don't**: Create custom notification UI

### Example
```typescript
// ✅ CORRECT: Using shadcn toast
import { useToast } from "@/components/ui/use-toast"

const { toast } = useToast()

toast({
  title: "Architecture Violation Detected", // Content change
  description: "Unauthorized dependency in Payment Service", // Content change
  variant: "destructive" // Using source variants only
})

// ❌ WRONG: Custom notification component
<CustomNotification 
  type="error"
  className="slide-in-right custom-shadow"
  icon={<CustomIcon />}
/> {/* Don't create custom components */}
```

---

## Responsive Design

### Must Maintain Source Breakpoints
```typescript
// ✅ CORRECT: Using exact breakpoint classes from source
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Same responsive behavior as source */}
</div>

// ❌ WRONG: Different breakpoints
<div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-6 gap-6">
  {/* Changed breakpoints and gap size */}
</div>
```

### Mobile Navigation
✅ **Keep**: Exact hamburger menu behavior from source
✅ **Keep**: Exact mobile sidebar slide-in animation
❌ **Don't**: Change mobile navigation patterns

---

## Accessibility (Must Preserve)

All accessibility features from source templates are **IMMUTABLE**:
- ARIA labels and roles
- Keyboard navigation sequences
- Focus indicators styling
- Screen reader text
- Tab indices
- Color contrast ratios

---

## Testing & Validation

### Visual Regression Testing
Implement visual diff testing against source templates:
1. Screenshot source template
2. Screenshot ReqArchitect implementation
3. Ensure pixel-perfect match (allowing only for text content changes)

### Checklist Before Deployment
- [ ] Side-by-side comparison with source template
- [ ] No custom Tailwind classes added
- [ ] No inline styles present
- [ ] Component structure identical
- [ ] Spacing values unchanged
- [ ] Color palette unchanged
- [ ] Typography unchanged
- [ ] Animations/transitions identical
- [ ] Responsive breakpoints identical
- [ ] Only content/data modified

---

## When You Need Something Not in Templates

### Process for "Missing" Features

1. **First**: Check if feature can be built using existing components
   - Example: Need a cost breakdown? Use existing table + badges
   
2. **Second**: Check if another shadcn example has it
   - Browse https://shadcnexamples.com/ for similar patterns
   
3. **Third**: Use plain shadcn components without modification
   - Compose from base shadcn library
   
4. **Last Resort**: Create minimal custom logic (not UI)
   - Business logic only, no visual customization

### Example: Cost Tracking Dashboard
```typescript
// ✅ CORRECT: Using existing components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Compose existing components, change only content
function CostDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"> {/* From source */}
      <Card> {/* From source */}
        <CardHeader>
          <CardTitle>Monthly SaaS Cost</CardTitle> {/* Content change */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,450</div> {/* Content */}
          <Badge variant="outline">+12% from last month</Badge> {/* Content */}
        </CardContent>
      </Card>
      {/* More cards using same structure */}
    </div>
  )
}

// ❌ WRONG: Custom cost visualization
function CostDashboard() {
  return (
    <CustomCostChart 
      data={costs}
      theme="modern"
      animated={true}
    /> {/* Don't create custom visualizations */}
  )
}
```

---

## Summary Checklist for Developers

Before committing any UI code, verify:

### ✅ Do's
- Copy exact component structure from source templates
- Change only text content to ReqArchitect terminology
- Populate with ReqArchitect domain data
- Use existing shadcn components as-is
- Maintain exact spacing and layout from source
- Keep all colors, typography, and styling unchanged

### ❌ Don'ts  
- Add custom Tailwind classes
- Create custom CSS files for UI
- Modify component structure
- Change spacing values
- Alter color palette
- Modify typography
- Create custom components when shadcn equivalents exist
- Add inline styles
- Change animations or transitions
- Modify responsive breakpoints
- Alter accessibility features

---

## LLM Prompt Template

When requesting UI code from an LLM, always use this prompt structure:

```
Build a [component name] for ReqArchitect using shadcn components.

STRICT CONSTRAINTS:
1. Copy the exact structure from [specific shadcn example URL]
2. Maintain 99.9% visual parity - do NOT modify any styling
3. Only change: text content, data values, and semantically equivalent icons
4. Do NOT add any custom classes, inline styles, or CSS
5. Do NOT modify spacing, colors, typography, or layouts
6. Use only shadcn components from @/components/ui/

CONTENT TO CHANGE:
- [List specific text changes needed]
- [List specific data to populate]
- [List any icon swaps needed]

Provide the code with inline comments showing what was changed from source.
```

---

## Enforcement Mechanism

### Code Review Requirements
All UI code must be reviewed against these guidelines:
1. **Automated**: Linting rules to detect custom classes
2. **Manual**: Visual comparison with source template
3. **Testing**: Visual regression tests must pass

### Automated Checks (Recommended)
```javascript
// ESLint rule to flag custom Tailwind classes
// Maintain whitelist of allowed classes from source templates
// Flag any classes not in whitelist

// Example check
if (className.includes('custom-') || 
    className.includes('my-') ||
    !isInSourceTemplateWhitelist(className)) {
  throw new Error('Custom styling detected - violates UI guidelines')
}
```

---

## Version Control

### Git Commit Standards
UI commits must include:
- Reference to source template used
- List of content changes made
- Confirmation of 99.9% parity

Example:
```
feat(ui): Add capability map view

Source: https://shadcnexamples.com/admin-dashboard (card grid section)
Content changes:
- Title: "Recent Activity" → "Business Capabilities"
- Data: Mock projects → Real capabilities
- Icons: FolderIcon → NetworkIcon

Parity confirmed: ✅ 99.9% (structure, spacing, colors unchanged)
```

---

## Exceptions Process

If you genuinely need to modify styling (extremely rare):

1. **Document why** existing patterns don't work
2. **Get approval** from tech lead + design lead
3. **Minimize scope** to absolute minimum necessary
4. **Update guidelines** to document the exception
5. **Consider** if this means source templates need updating

**Note**: In 99% of cases, existing patterns should suffice. Exceptions indicate either:
- Misunderstanding of how to compose existing components
- Need to find different source template that has the pattern
- Edge case that requires business logic, not UI customization

---

## Quick Reference Card

| Need | Solution | Forbidden |
|------|----------|-----------|
| Different text | Change content strings | Change text styling |
| Different data | Populate with new data | Change data display format |
| Different icon | Swap from same library | Use different icon size |
| Different colors | **Not allowed** | Adding color classes |
| Different spacing | **Not allowed** | Modifying gap/padding |
| Different layout | **Not allowed** | Changing grid structure |
| New component | Use shadcn library | Create custom component |
| Different animation | **Not allowed** | Modifying transitions |

---

## Final Word

**When in doubt, don't change it.**

The 99.9% rule means: if you're questioning whether something is allowed, it almost certainly isn't. ReqArchitect's value is in its functionality and data model, not in having unique UI styling. Maintaining strict design system adherence ensures:

1. **Consistency** across the entire application
2. **Maintainability** as shadcn examples evolve
3. **Quality** through proven, tested designs
4. **Speed** of development (no time wasted on custom styling)
5. **Focus** on business logic and features that matter

Remember: **Great products win through features and user experience, not through custom button styles.**

---

## Contact & Questions

If you're unsure whether a change violates these guidelines:
1. Show the proposed change
2. Cite the specific guideline you're questioning
3. Explain the business requirement driving the need
4. Wait for approval before implementing

**Default answer to "Can I change this?" is NO unless explicitly listed in the "Permitted Changes" section above.**
