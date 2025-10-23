# ReqArchitect Demo - Setup Instructions

## Overview
This demo implements ReqArchitect's key features using the exact structure and components from shadcn-examples, maintaining 99.9% UI parity as per the UI Guidelines.

## Prerequisites
- Node.js 18+ installed
- Your C:\shadcn-examples directory

## Setup Steps

### 1. Navigate to your shadcn-examples directory
```bash
cd C:\shadcn-examples
```

### 2. Create a new branch for ReqArchitect modifications
```bash
git checkout -b reqarchitect-demo
```

### 3. Copy the files from this output directory
Copy all files from `/mnt/user-data/outputs/reqarchitect-demo/` to your `C:\shadcn-examples\` directory.

The structure will be:
```
C:\shadcn-examples/
├── docs/
│   └── UI_GUIDELINES.md (already there)
├── app/
│   ├── (reqarchitect)/           # NEW - ReqArchitect routes
│   │   ├── dashboard/
│   │   ├── business-model/
│   │   ├── capabilities/
│   │   ├── tech-stack/
│   │   └── cost-analysis/
│   └── ... (existing shadcn examples)
├── components/
│   ├── ui/                        # Existing shadcn components (unchanged)
│   └── reqarchitect/              # NEW - ReqArchitect-specific components
└── ...
```

### 4. Install dependencies (if not already done)
```bash
npm install
```

### 5. Run the development server
```bash
npm run dev
```

### 6. Access ReqArchitect Demo
Open http://localhost:3000/dashboard in your browser

## ReqArchitect Routes

### Main Dashboard
**URL**: `/dashboard`
**Source Template**: shadcn admin-dashboard
**Content Changes**: 
- Title: "Dashboard" → "ReqArchitect Overview"
- Stats cards show ReqArchitect metrics (capabilities, applications, monthly costs)
- Recent activity shows business model changes

### Business Model Canvas
**URL**: `/business-model`
**Source Template**: shadcn admin-dashboard (card grid layout)
**Content Changes**:
- 9-box BMC grid using existing card components
- Each block editable with existing form components

### Capabilities Map
**URL**: `/capabilities`
**Source Template**: shadcn admin-dashboard (table view)
**Content Changes**:
- Table columns: Capability Name, Owner, Status, Supporting Applications
- Uses existing Table component

### Tech Stack
**URL**: `/tech-stack`
**Source Template**: shadcn admin-dashboard (card list)
**Content Changes**:
- Cards showing each application with cost, category, status
- Uses existing Card and Badge components

### Cost Analysis
**URL**: `/cost-analysis`
**Source Template**: shadcn admin-dashboard (charts + tables)
**Content Changes**:
- Overview chart shows monthly spending
- Breakdown table shows cost per application
- Uses existing Chart and Table components

## Key Features Implemented

### 1. Business Model Canvas
- Interactive 9-box grid
- Editable blocks
- Links to related capabilities and tech stack

### 2. Capability Management
- List view with filtering
- Detail view with architecture mapping
- Owner assignment

### 3. Tech Stack Inventory
- Application catalog
- Cost tracking per application
- Integration status indicators

### 4. Cost Dashboard
- Monthly spend overview
- Category breakdown
- Trend analysis
- Unused license alerts

### 5. Notifications (Context-Aware)
- Architecture violation alerts
- Cost spike warnings
- Compliance issue notifications
- Using existing Alert/Toast components

## UI Compliance

✅ **99.9% Parity Maintained**:
- All layouts copied from shadcn-examples
- Only text content changed (titles, labels, data)
- No custom CSS added
- No modified Tailwind classes
- Same component structure throughout

✅ **Permitted Changes Applied**:
- Text: "Dashboard" → "ReqArchitect Overview"
- Icons: Generic → ReqArchitect-specific (same library)
- Data: Mock data → ReqArchitect domain data
- Routes: Example paths → ReqArchitect paths

❌ **No Prohibited Changes**:
- Zero custom styling
- Zero layout modifications
- Zero component structure changes
- Zero new Tailwind utility classes

## Testing Checklist

Before committing, verify:
- [ ] Side-by-side visual comparison with shadcn-examples
- [ ] No custom classes in any component
- [ ] All components from @/components/ui/*
- [ ] Same spacing/padding/margins as source
- [ ] Same colors/typography as source
- [ ] Same animations/transitions as source
- [ ] Only content/data differs from source

## Development Workflow

### To Add a New Feature:
1. Identify which shadcn example has similar UI
2. Copy that example's component structure exactly
3. Change ONLY the content (text, data, icons)
4. Verify against UI Guidelines checklist
5. Commit with proper format (see UI_GUIDELINES.md)

### Example Commit Message:
```
feat(ui): Add capability detail view

Source: shadcn-examples admin-dashboard (detail page)
Content changes:
- Title: "Project Details" → "Capability Details"
- Fields: Project fields → Capability fields
- Data: Mock projects → Real capabilities

Parity confirmed: ✅ 99.9%
```

## Troubleshooting

### If styles look different:
1. Check if you accidentally added custom classes
2. Verify you're importing from @/components/ui/
3. Compare your component structure with source
4. Run: `git diff` to see what changed

### If layout breaks:
1. You likely modified grid/flex classes
2. Revert to exact source structure
3. Re-apply ONLY content changes

### If components don't work:
1. Ensure all shadcn components are installed
2. Check import paths match source
3. Verify you didn't modify component props

## Next Steps

After verifying the demo works:
1. Review each route against UI Guidelines
2. Test all interactions match shadcn behavior
3. Populate with more realistic ReqArchitect data
4. Add data persistence layer (separate from UI)
5. Deploy to Vercel for stakeholder review

## Reference Links

- UI Guidelines: `C:\shadcn-examples\docs\UI_GUIDELINES.md`
- shadcn Dashboard: https://ui.shadcn.com/examples/dashboard
- shadcn Components: https://ui.shadcn.com/docs/components
- ReqArchitect PRD: Review project documents

## Support

If uncertain about any UI modification:
1. Consult UI_GUIDELINES.md
2. Default answer: "Don't change it"
3. If still unsure, ask before implementing

Remember: **ReqArchitect's value is in its functionality, not in custom UI styling.**
