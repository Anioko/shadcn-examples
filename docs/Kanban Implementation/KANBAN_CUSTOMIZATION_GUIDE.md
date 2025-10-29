# Kanban Customization Guide

## 🎨 How to Customize Your Kanban Boards

This guide shows you how to:
1. Change column/phase names (e.g., "Backlog" → "Ideas")
2. Add new cards
3. Add/remove columns
4. Customize colors and limits
5. Add UI buttons for card creation

---

## 1️⃣ How to Change Column Names

### Example: Customize Scrum Board

**Goal**: Change "Backlog" to "Ideas" and "Sprint Planning" to "Ready"

**File**: `lib/kanban-config.ts`

**Find this section**:
```typescript
export const scrumKanbanConfig: KanbanBoardConfig = {
  frameworkId: "scrum",
  frameworkName: "Scrum",
  columns: [
    { id: "backlog", title: "Backlog", status: "backlog", ... },
    { id: "sprint-planning", title: "Sprint Planning", status: "sprint-planning", ... },
    // ... other columns
  ],
}
```

**Change to**:
```typescript
export const scrumKanbanConfig: KanbanBoardConfig = {
  frameworkId: "scrum",
  frameworkName: "Scrum",
  columns: [
    { id: "backlog", title: "Ideas", status: "backlog", description: "Creative ideas and future work", color: "bg-slate-100", order: 0 },
    { id: "sprint-planning", title: "Ready", status: "sprint-planning", description: "Ready to start", color: "bg-blue-100", order: 1 },
    { id: "in-progress", title: "Working On It", status: "in-progress", description: "Active development", color: "bg-yellow-100", limit: 5, order: 2 },
    { id: "testing", title: "QA Review", status: "testing", description: "Quality assurance", color: "bg-purple-100", order: 3 },
    { id: "done", title: "Shipped ✅", status: "done", description: "Live in production", color: "bg-green-100", order: 4 },
  ],
}
```

**Result**: Your column headers will now show "Ideas", "Ready", "Working On It", etc.

---

## 2️⃣ How to Add New Columns

### Example: Add a "Blocked" column to Scrum

```typescript
export const scrumKanbanConfig: KanbanBoardConfig = {
  frameworkId: "scrum",
  frameworkName: "Scrum",
  columns: [
    { id: "backlog", title: "Backlog", status: "backlog", description: "Product backlog items", color: "bg-slate-100", order: 0 },
    { id: "sprint-planning", title: "Sprint Planning", status: "sprint-planning", description: "Items selected for sprint", color: "bg-blue-100", order: 1 },
    { id: "in-progress", title: "In Progress", status: "in-progress", description: "Actively being worked on", color: "bg-yellow-100", limit: 5, order: 2 },

    // ✨ NEW COLUMN
    { id: "blocked", title: "⚠️ Blocked", status: "blocked", description: "Waiting on dependencies", color: "bg-red-100", limit: 3, order: 3 },

    { id: "testing", title: "Testing", status: "testing", description: "In QA/testing phase", color: "bg-purple-100", order: 4 },
    { id: "done", title: "Done", status: "done", description: "Completed", color: "bg-green-100", order: 5 },
  ],
}
```

**Notes**:
- `id` - Unique identifier (kebab-case)
- `title` - Display name (what users see)
- `status` - Database value (must match cards' status field)
- `description` - Tooltip/help text
- `color` - Tailwind background color class
- `limit` - Optional WIP (Work In Progress) limit
- `order` - Display order (0-based)

---

## 3️⃣ How to Add New Cards

### Method 1: Using API (Recommended for Production)

**Create a button component**:

```typescript
// components/kanban/add-card-button.tsx
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { createKanbanCard } from '@/lib/kanban-helpers'

export function AddCardButton({ frameworkId, organizationId }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAddCard = async () => {
    setIsLoading(true)

    const result = await createKanbanCard(frameworkId, 'task', {
      title: "New Card",
      description: "Click to edit",
      status: "backlog", // Or any default status
      priority: "medium",
      frameworkId,
      organizationId,
    })

    if (result.success) {
      alert('Card created!')
      window.location.reload() // Or use React Query to refetch
    } else {
      alert('Failed: ' + result.error)
    }

    setIsLoading(false)
  }

  return (
    <Button onClick={handleAddCard} disabled={isLoading}>
      <Plus className="mr-2 h-4 w-4" />
      {isLoading ? 'Adding...' : 'Add Card'}
    </Button>
  )
}
```

**Use the button**:
```typescript
// In your page component
import { AddCardButton } from '@/components/kanban/add-card-button'

export default function Page() {
  return (
    <div>
      <AddCardButton frameworkId="scrum" organizationId="org_123" />
      <KanbanBoardNew {...props} />
    </div>
  )
}
```

### Method 2: Using Dialog/Modal for Rich Input

```typescript
// components/kanban/add-card-dialog.tsx
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createKanbanCard } from '@/lib/kanban-helpers'
import { Plus } from 'lucide-react'

export function AddCardDialog({ frameworkId, organizationId, columns }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: columns[0]?.status || 'backlog',
    priority: 'medium',
  })

  const handleSubmit = async () => {
    const result = await createKanbanCard(frameworkId, 'task', {
      ...formData,
      frameworkId,
      organizationId,
    })

    if (result.success) {
      setOpen(false)
      setFormData({ title: '', description: '', status: columns[0]?.status || 'backlog', priority: 'medium' })
      window.location.reload() // Or refetch with React Query
    } else {
      alert('Failed: ' + result.error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Card</DialogTitle>
          <DialogDescription>
            Add a new card to your Kanban board.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Card title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Card description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Column</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((col) => (
                    <SelectItem key={col.status} value={col.status}>
                      {col.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Create Card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### Method 3: Add to Mock Data (Development Only)

**File**: `lib/mock-kanban-data.ts`

```typescript
export function getMockKanbanCards(frameworkId: string): KanbanCard[] {
  if (frameworkId === 'scrum') {
    return [
      // ✨ Add your custom card here
      {
        id: `scrum-${Date.now()}`, // Unique ID
        title: "My Custom Task",
        description: "This is a custom task I added",
        status: "backlog", // Must match a column status
        frameworkId: "scrum",
        priority: "high",
        assignee: {
          id: "user_custom",
          name: "Your Name",
          avatar: "YN"
        },
        dueDate: new Date("2025-12-01"),
        tags: ["custom", "important"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // ... existing cards
    ]
  }
}
```

---

## 4️⃣ Customize Column Colors and WIP Limits

### Available Tailwind Colors
```typescript
columns: [
  { ...col, color: "bg-slate-100" },    // Gray
  { ...col, color: "bg-blue-100" },     // Blue
  { ...col, color: "bg-yellow-100" },   // Yellow
  { ...col, color: "bg-purple-100" },   // Purple
  { ...col, color: "bg-green-100" },    // Green
  { ...col, color: "bg-red-100" },      // Red
  { ...col, color: "bg-orange-100" },   // Orange
  { ...col, color: "bg-pink-100" },     // Pink
  { ...col, color: "bg-indigo-100" },   // Indigo
  { ...col, color: "bg-teal-100" },     // Teal
]
```

### Set WIP Limits
```typescript
columns: [
  {
    id: "in-progress",
    title: "In Progress",
    status: "in-progress",
    limit: 5, // ← Maximum 5 cards allowed in this column
    color: "bg-yellow-100",
    order: 2
  }
]
```

When limit is exceeded, the column count badge will turn red/orange to warn users.

---

## 5️⃣ Add Context Menu for Card Actions

Create a card with dropdown menu:

```typescript
// components/kanban/card-menu.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical, Edit, Trash, Copy } from 'lucide-react'

export function CardMenu({ cardId, onEdit, onDelete, onDuplicate }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(cardId)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Card
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDuplicate(cardId)}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDelete(cardId)}
          className="text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## 6️⃣ Quick Reference: Common Customizations

### Change All Column Names at Once
```typescript
const myCustomColumns = [
  { id: "ideas", title: "💡 Ideas", status: "ideas", description: "Brainstorming", color: "bg-slate-100", order: 0 },
  { id: "planning", title: "📋 Planning", status: "planning", description: "Being planned", color: "bg-blue-100", order: 1 },
  { id: "doing", title: "🔨 Doing", status: "doing", description: "In progress", color: "bg-yellow-100", limit: 3, order: 2 },
  { id: "review", title: "👀 Review", status: "review", description: "Under review", color: "bg-purple-100", order: 3 },
  { id: "complete", title: "✅ Complete", status: "complete", description: "All done!", color: "bg-green-100", order: 4 },
]
```

### Add Emojis to Column Titles
```typescript
columns: [
  { id: "backlog", title: "📦 Backlog", status: "backlog", ... },
  { id: "in-progress", title: "⚡ In Progress", status: "in-progress", ... },
  { id: "done", title: "✅ Done", status: "done", ... },
]
```

### Create Custom Framework
```typescript
export const myCustomFrameworkConfig: KanbanBoardConfig = {
  frameworkId: "my-framework",
  frameworkName: "My Custom Workflow",
  columns: [
    { id: "new", title: "New", status: "new", description: "Just created", color: "bg-slate-100", order: 0 },
    { id: "active", title: "Active", status: "active", description: "Being worked on", color: "bg-blue-100", order: 1 },
    { id: "completed", title: "Completed", status: "completed", description: "All done", color: "bg-green-100", order: 2 },
  ],
  cardTypes: ["Task", "Bug", "Feature"],
  defaultView: "all",
}

// Add to frameworkConfigs object
export const frameworkConfigs: Record<string, KanbanBoardConfig> = {
  "scrum": scrumKanbanConfig,
  "kanban": kanbanMethodConfig,
  "my-framework": myCustomFrameworkConfig, // ← Add your custom framework
  // ... other frameworks
}
```

---

## 7️⃣ Complete Example: Fully Customized Board

```typescript
// lib/kanban-config.ts
export const myTeamKanbanConfig: KanbanBoardConfig = {
  frameworkId: "my-team",
  frameworkName: "My Team Workflow",
  columns: [
    {
      id: "inbox",
      title: "📥 Inbox",
      status: "inbox",
      description: "New requests and ideas",
      color: "bg-slate-100",
      order: 0
    },
    {
      id: "triage",
      title: "🔍 Triage",
      status: "triage",
      description: "Being evaluated and prioritized",
      color: "bg-blue-100",
      order: 1
    },
    {
      id: "ready",
      title: "✨ Ready to Start",
      status: "ready",
      description: "Approved and ready for work",
      color: "bg-purple-100",
      order: 2
    },
    {
      id: "wip",
      title: "🚀 Work in Progress",
      status: "wip",
      description: "Currently being worked on",
      color: "bg-yellow-100",
      limit: 5, // WIP limit
      order: 3
    },
    {
      id: "review",
      title: "👁️ In Review",
      status: "review",
      description: "Awaiting review/approval",
      color: "bg-orange-100",
      limit: 3,
      order: 4
    },
    {
      id: "deployed",
      title: "🎉 Deployed",
      status: "deployed",
      description: "Live in production",
      color: "bg-green-100",
      order: 5
    }
  ],
  cardTypes: ["Feature", "Bug", "Improvement", "Technical Debt", "Spike"],
  defaultView: "all",
}

// Register it
export const frameworkConfigs: Record<string, KanbanBoardConfig> = {
  // ... existing frameworks
  "my-team": myTeamKanbanConfig,
}

// Helper function to check if framework supports Kanban
export function supportsKanban(frameworkId: string): boolean {
  return frameworkId in frameworkConfigs
}

// Helper function to get config
export function getFrameworkKanbanConfig(frameworkId: string): KanbanBoardConfig | null {
  return frameworkConfigs[frameworkId] || null
}
```

---

## 8️⃣ Testing Your Changes

After making changes:

1. **Restart the dev server**:
```bash
npm run dev
```

2. **Visit your custom board**:
```
http://localhost:3000/frameworks/my-team/kanban
```

3. **Check the UI**:
- Column names should show your custom titles
- Colors should match your config
- WIP limits should display next to count
- Cards should be draggable between columns

---

## 9️⃣ Pro Tips

### Use Descriptive Status Values
```typescript
// ✅ Good - clear and semantic
status: "waiting-for-approval"

// ❌ Avoid - ambiguous
status: "status3"
```

### Keep Column Count Manageable
- **3-5 columns**: Optimal for most teams
- **6-8 columns**: Fine for complex workflows
- **9+ columns**: Consider simplifying

### Use WIP Limits Strategically
```typescript
// Set limits on bottleneck columns
{ id: "in-progress", limit: 5 },  // Prevent too much WIP
{ id: "review", limit: 3 },       // Encourage quick reviews
// Don't limit: "backlog" or "done"
```

### Color Coding Best Practices
- **Gray** (slate): Start states
- **Blue**: Planning/preparation
- **Yellow**: Active work
- **Purple/Orange**: Review/validation
- **Green**: Complete/success
- **Red**: Blocked/issues

---

## 🎨 Summary

**To customize your Kanban board:**

1. **Change column names**: Edit `title` in `lib/kanban-config.ts`
2. **Add new columns**: Add new objects to `columns` array
3. **Add cards via UI**: Create button/dialog components using `createKanbanCard()`
4. **Add cards to mock**: Edit `lib/mock-kanban-data.ts`
5. **Customize colors**: Change `color` property with Tailwind classes
6. **Set WIP limits**: Add `limit` property to columns
7. **Add emojis**: Use emoji characters in `title` property

**Files to edit:**
- `lib/kanban-config.ts` - Column configuration
- `lib/mock-kanban-data.ts` - Mock cards (dev mode)
- Create components for add/edit dialogs

---

**Happy customizing! 🎨**
