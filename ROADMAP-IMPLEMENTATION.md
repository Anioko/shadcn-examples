# Roadmap/Gantt Implementation

## Overview
Added Gantt chart/roadmap timeline view for framework planning, similar to the existing Kanban board structure.

## Routes Available

### Framework-Specific Roadmaps
Access via: `/frameworks/[framework-slug]/roadmap`

**Supported Frameworks (10 total):**

1. **Scrum** - `/frameworks/scrum/roadmap`
   - Sprint & Release Planning
   - Groups: Releases, Sprints, Epics

2. **SAFe** - `/frameworks/safe/roadmap`
   - Program Increment Planning
   - Groups: Program Increments, Features, Enablers

3. **PRINCE2** - `/frameworks/prince2/roadmap`
   - Project Stages
   - Groups: Stages, Deliverables, Milestones

4. **PMBOK** - `/frameworks/pmbok/roadmap`
   - Project Phases
   - Groups: Phases, Deliverables, Milestones

5. **TOGAF** - `/frameworks/togaf/roadmap`
   - Architecture Development
   - Groups: ADM Phases, Architecture Work, Implementation

6. **DevOps** - `/frameworks/devops/roadmap`
   - Release Pipeline
   - Groups: Releases, Features, Infrastructure

7. **Digital Transformation** - `/frameworks/digital-transformation/roadmap`
   - Transformation Initiatives
   - Groups: Initiatives, Technology, Process, Culture

8. **OKRs** - `/frameworks/okrs/roadmap`
   - Objectives & Key Results
   - Groups: Objectives, Key Results, Initiatives

9. **Lean** - `/frameworks/lean/roadmap`
   - Value Stream
   - Groups: Improvements, Kaizen Events, Projects

10. **Design Thinking** - `/frameworks/design-thinking/roadmap`
    - Innovation Pipeline
    - Groups: Discovery, Ideation, Prototyping, Implementation

## Files Created

### Type Definitions
- `lib/types/roadmap.ts` - TypeScript types for roadmap items, configs, and boards

### Configuration
- `lib/roadmap-config.ts` - Framework-specific roadmap configurations with groups and item types

### Mock Data
- `lib/mock-roadmap-data.ts` - Sample roadmap data for each supported framework

### Server Helpers
- `lib/roadmap-helpers.ts` - Server-side data fetching (placeholder for future database integration)

### Routes
- `app/(reqarchitect)/frameworks/[slug]/roadmap/page.tsx` - Server component for roadmap page
- `app/(reqarchitect)/frameworks/[slug]/roadmap/roadmap-client.tsx` - Client component with Gantt chart

### Layout Updates
- `app/(reqarchitect)/frameworks/[slug]/layout.tsx` - Updated to include Roadmap and Workflow tabs

## Features

### Gantt Chart View
- Interactive timeline with drag-and-drop
- Grouped by framework-specific categories
- Color-coded status indicators
- Priority badges on items
- Monthly/Quarterly/Daily views

### Statistics Dashboard
- In Progress count
- Planning count
- Completed count
- Total items

### Data Modes
- **Mock Data Mode** (default): Uses sample data for development
- **Database Mode**: Set `ROADMAP_USE_DATABASE=true` in `.env` to enable (requires database setup)

## Usage Examples

```bash
# View Scrum roadmap with sprint planning
http://localhost:3000/frameworks/scrum/roadmap

# View DevOps release pipeline
http://localhost:3000/frameworks/devops/roadmap

# View TOGAF architecture development timeline
http://localhost:3000/frameworks/togaf/roadmap

# View Digital Transformation initiatives
http://localhost:3000/frameworks/digital-transformation/roadmap
```

## Framework Layout Tabs

Each framework page now has 6 tabs:
1. **Overview** - Framework information
2. **Kanban** - Task board view (all frameworks)
3. **Roadmap** - Timeline/Gantt view (10 frameworks)
4. **Workflow** - Process flow diagram (selected frameworks)
5. **Assessment** - Coming soon
6. **Reports** - Coming soon

Tabs are conditionally enabled based on framework support.

## Future Enhancements

- Database integration for persistent roadmap items
- Create/Edit/Delete item modals
- Dependency visualization
- Milestone markers
- Resource allocation view
- Export to PDF/PNG
- Collaborative editing
- Real-time updates
