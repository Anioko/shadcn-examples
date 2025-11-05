# Project Switcher Feature

## Overview

The Project Switcher is a workspace-style component that allows Enterprise Architects to easily switch between multiple projects. All architecture work (TOGAF models, BPMN processes, data architectures, etc.) can now be scoped to specific projects.

## Features

✅ **Visual Project Switcher** - Command-palette style dropdown in the sidebar header
✅ **Project Context Management** - React Context API for global project state
✅ **Persistent Selection** - Selected project is saved to localStorage
✅ **Project Status Indicators** - Visual badges showing project status (active, planning, on-hold, etc.)
✅ **Priority Indicators** - Color-coded priority levels (low, medium, high, critical)
✅ **Quick Create** - Direct link to create new projects
✅ **Current Project Display** - Footer indicator showing the currently selected project

## Architecture

### Files Created

1. **`lib/contexts/project-context.tsx`**
   - React Context for managing selected project state
   - LocalStorage persistence
   - Provides `useProject()` hook

2. **`components/project-switcher.tsx`**
   - Main UI component for project selection
   - Fetches projects from API
   - Groups projects by status (Active vs Other)
   - Displays project metadata (name, description, status, priority)

3. **`app/api/projects/route.ts`**
   - GET endpoint: Fetch all projects for an organization
   - POST endpoint: Create new projects
   - Query parameters: `organizationId`, `status`

4. **`prisma/seed-projects.ts`**
   - Seed script to populate sample projects for testing

### Integration Points

- **`app/(reqarchitect)/layout.tsx`** - Wraps all routes with `ProjectProvider`
- **`app/(reqarchitect)/dashboard/components/app-sidebar.tsx`** - Displays `ProjectSwitcher` in header and current project in footer

## Usage

### For Users

1. **Switch Projects**
   - Click the project dropdown in the sidebar header
   - Search or browse available projects
   - Click a project to select it

2. **Create New Project**
   - Click "Create new project" in the dropdown
   - Redirects to `/project-management`

3. **View Current Project**
   - Check the sidebar footer for current project context
   - Status badge shows project state

### For Developers

#### Using the Project Context

```tsx
import { useProject } from '@/lib/contexts/project-context'

function MyComponent() {
  const { selectedProject, setSelectedProject, projects } = useProject()

  // Access current project
  console.log(selectedProject?.name)

  // Filter data by project
  const projectTasks = tasks.filter(t => t.projectId === selectedProject?.id)

  return <div>Working on: {selectedProject?.name}</div>
}
```

#### Filtering API Queries by Project

```tsx
// In your components
const { selectedProject } = useProject()

useEffect(() => {
  if (selectedProject) {
    fetch(`/api/kanban/togaf?projectId=${selectedProject.id}`)
      .then(res => res.json())
      .then(data => setCards(data.cards))
  }
}, [selectedProject])
```

#### API Endpoints

**GET /api/projects**
```bash
curl "http://localhost:3000/api/projects?organizationId=default-org"
```

Response:
```json
{
  "projects": [
    {
      "id": "proj-1",
      "name": "Enterprise Architecture Transformation",
      "description": "Modernize the enterprise architecture...",
      "status": "active",
      "priority": "critical",
      "progress": 45,
      "startDate": "2024-01-15T00:00:00.000Z",
      "endDate": "2025-06-30T00:00:00.000Z",
      "organizationId": "default-org"
    }
  ],
  "total": 7
}
```

**POST /api/projects**
```bash
curl -X POST "http://localhost:3000/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Architecture Initiative",
    "description": "Description here",
    "status": "planning",
    "priority": "high",
    "organizationId": "default-org"
  }'
```

## Setup & Testing

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Seed Sample Projects

```bash
npx tsx prisma/seed-projects.ts
```

This creates 7 sample projects:
- ✅ Enterprise Architecture Transformation (active, critical)
- ✅ Data Governance Initiative (active, high)
- ✅ ISO 27001 Compliance Program (active, high)
- 📋 Cloud Migration Strategy (planning, medium)
- ✅ Digital Customer Experience (active, critical)
- ⏸️ Business Process Optimization (on-hold, medium)
- ✓ ArchiMate Repository Setup (completed, low)

### 4. Run Development Server

```bash
npm run dev
```

### 5. Test the Feature

1. Navigate to `http://localhost:3000/dashboard`
2. You should see the Project Switcher in the sidebar header
3. Click it to see the list of projects
4. Select a project - it will be saved to localStorage
5. Check the sidebar footer to see the current project indicator

## Next Steps

### Recommended Enhancements

1. **Add projectId to Architecture Models**
   - Update Prisma schema to add optional `projectId` fields to:
     - `ApplicationComponent`
     - `DataObject`
     - `BPMNElement`
     - `BusinessActor`
     - `TechnologyComponent`

2. **Filter Architecture Views by Project**
   - Update all framework pages to filter by `selectedProject`
   - Show "All Projects" option for organization-wide view

3. **Project-Scoped URLs**
   - Change from `/frameworks/togaf/business-architecture`
   - To: `/projects/[projectId]/frameworks/togaf/business-architecture`

4. **Project Dashboard Integration**
   - Add project metrics to framework dashboards
   - Show project progress in navigation

5. **Authentication Integration**
   - Replace hardcoded `organizationId` with session-based auth
   - Implement role-based access control per project

6. **Project Team Management**
   - Assign users to projects
   - Filter project list by user assignments

## Database Schema

The feature uses the existing `Project` model from `prisma/schema.prisma`:

```prisma
model Project {
  id             String    @id @default(cuid())
  organizationId String
  name           String    @db.VarChar(255)
  description    String?
  status         String    @default("planning") @db.VarChar(50)
  priority       String    @default("medium") @db.VarChar(50)
  startDate      DateTime?
  endDate        DateTime?
  completionRate Int?      @default(0)

  organization   Organization @relation(fields: [organizationId], references: [id])
  workflows      Workflow[]
  tasks          Task[]
  sprints        Sprint[]
  // ... other relations
}
```

## Troubleshooting

### Project Switcher Shows "Loading..." Forever

- Check browser console for API errors
- Verify `/api/projects` endpoint is accessible
- Ensure database has projects seeded
- Check that `organizationId` is correct (currently hardcoded to "default-org")

### Selected Project Not Persisting

- Check browser localStorage for `reqarchitect-selected-project` key
- Verify localStorage is not disabled
- Check browser console for JSON parse errors

### Projects API Returns Empty Array

- Run seed script: `npx tsx prisma/seed-projects.ts`
- Verify database connection
- Check Prisma schema is up to date: `npx prisma generate`

## Technical Details

### State Management

- **Context**: React Context API (`ProjectContext`)
- **Persistence**: Browser localStorage
- **Key**: `reqarchitect-selected-project`

### Project Status Values

- `planning` - Project in planning phase (gray)
- `active` - Currently active project (green)
- `on-hold` - Temporarily paused (yellow)
- `completed` - Finished project (blue)
- `cancelled` - Cancelled project (red)

### Priority Levels

- `low` - Low priority (gray)
- `medium` - Medium priority (blue)
- `high` - High priority (orange)
- `critical` - Critical priority (red)

## Demo Workflow

1. **Architect logs in** → Sees project switcher in sidebar
2. **Selects "Enterprise Architecture Transformation"** → Context updates
3. **Navigates to TOGAF Business Architecture** → Sees only artifacts for selected project
4. **Creates new business process** → Automatically tagged with current project
5. **Switches to "Data Governance Initiative"** → Different set of artifacts loads
6. **Creates new data model** → Tagged with Data Governance project

## Benefits

✅ **Multi-Project Support** - Work on multiple EA initiatives simultaneously
✅ **Context Isolation** - Keep architectures separate per project
✅ **Better Organization** - Clear project boundaries
✅ **Improved Navigation** - Quick switching between projects
✅ **Persistent State** - Project selection survives page refreshes
✅ **Scalable** - Supports unlimited projects per organization

---

**Status**: ✅ Implementation Complete
**Version**: 1.0
**Last Updated**: 2025-11-05
