# Quick Start Guide: Implementing Boss Requirements

## 🎯 TL;DR - What You Need to Do

Your boss wants you to **connect the UI to the database**. Everything currently uses mock data - you need to make it real.

---

## 🚀 Start Here (Day 1)

### Step 1: Understand What You Have

Run the app and visit these URLs:
```bash
npm run dev
```

Then open:
1. http://localhost:3000/frameworks/togaf/dashboard
2. http://localhost:3000/canvases/business-model-canvas
3. http://localhost:3000/frameworks/pcf/capability-map

**What you'll see**: Beautiful UIs with mock data that doesn't save.

**What you need**: Same UIs but with real database persistence.

---

## 📋 Quick Implementation Path

### Phase 1: Database (Days 1-2)

#### 1.1 Review Current Schema
```bash
# Open and read this file
code prisma/schema.prisma
```

Look for these models:
- `FrameworkTemplate` (line ~10650)
- `OrganizationFramework` (line ~10792)
- `BusinessModelCanvas` (search for it)

#### 1.2 Add Missing Models

Add these to `schema.prisma`:

```prisma
// Generic table data for framework grandchildren
model FrameworkTableData {
  id                      String   @id @default(cuid())
  organizationFrameworkId String
  grandchildId            String   // e.g., "architecture-vision", "key-partners"
  
  // Flexible data storage
  data                    Json     // Stores table rows
  
  // Metadata
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
  
  organizationFramework   OrganizationFramework @relation(fields: [organizationFrameworkId], references: [id], onDelete: Cascade)
  
  @@unique([organizationFrameworkId, grandchildId])
  @@map("framework_table_data")
}

// Kanban board data
model KanbanBoard {
  id                      String   @id @default(cuid())
  organizationFrameworkId String
  frameworkSlug           String
  
  // Board configuration
  columns                 Json     // Column definitions
  
  // Metadata
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
  
  organizationFramework   OrganizationFramework @relation(fields: [organizationFrameworkId], references: [id], onDelete: Cascade)
  cards                   KanbanCard[]
  
  @@unique([organizationFrameworkId, frameworkSlug])
  @@map("kanban_boards")
}

model KanbanCard {
  id          String   @id @default(cuid())
  boardId     String
  columnId    String
  
  // Card data
  title       String
  description String?  @db.Text
  priority    String?
  assignee    String?
  dueDate     DateTime?
  tags        String[]
  
  // Position
  position    Int      @default(0)
  
  // Metadata
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  board       KanbanBoard @relation(fields: [boardId], references: [id], onDelete: Cascade)
  
  @@index([boardId, columnId])
  @@map("kanban_cards")
}

// Capability map data
model CapabilityMapData {
  id                      String   @id @default(cuid())
  organizationFrameworkId String
  frameworkSlug           String
  
  // Capability data
  capabilities            Json     // Hierarchical capability structure
  
  // Metadata
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
  
  organizationFramework   OrganizationFramework @relation(fields: [organizationFrameworkId], references: [id], onDelete: Cascade)
  
  @@unique([organizationFrameworkId, frameworkSlug])
  @@map("capability_map_data")
}
```

#### 1.3 Update OrganizationFramework Model

Find `OrganizationFramework` model and add these relations:
```prisma
model OrganizationFramework {
  // ... existing fields ...
  
  // Add these relations at the bottom
  tableData       FrameworkTableData[]
  kanbanBoards    KanbanBoard[]
  capabilityMaps  CapabilityMapData[]
}
```

#### 1.4 Run Migration
```bash
npx prisma migrate dev --name add_framework_data_models
npx prisma generate
```

---

### Phase 2: API Routes (Days 3-4)

#### 2.1 Create Prisma Client Helper

Create `lib/prisma.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

#### 2.2 Create Framework Table Data API

Create `app/api/frameworks/[slug]/tables/[grandchildId]/route.ts`:
```typescript
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET table data
export async function GET(
  request: Request,
  { params }: { params: { slug: string; grandchildId: string } }
) {
  try {
    // TODO: Get organizationId from session
    const organizationId = 'org-123' // Temporary
    
    // Find or create organization framework
    let orgFramework = await prisma.organizationFramework.findFirst({
      where: {
        organizationId,
        frameworkTemplate: {
          frameworkId: params.slug
        }
      },
      include: {
        tableData: {
          where: {
            grandchildId: params.grandchildId
          }
        }
      }
    })
    
    if (!orgFramework) {
      // Create if doesn't exist
      const template = await prisma.frameworkTemplate.findFirst({
        where: { frameworkId: params.slug }
      })
      
      if (!template) {
        return NextResponse.json({ error: 'Framework not found' }, { status: 404 })
      }
      
      orgFramework = await prisma.organizationFramework.create({
        data: {
          organizationId,
          frameworkTemplateId: template.id,
          status: 'PLANNING'
        },
        include: {
          tableData: true
        }
      })
    }
    
    const tableData = orgFramework.tableData[0]
    
    return NextResponse.json({
      data: tableData?.data || [],
      grandchildId: params.grandchildId
    })
  } catch (error) {
    console.error('Error fetching table data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST/PUT - Update table data
export async function POST(
  request: Request,
  { params }: { params: { slug: string; grandchildId: string } }
) {
  try {
    const body = await request.json()
    const organizationId = 'org-123' // TODO: Get from session
    
    // Find organization framework
    const orgFramework = await prisma.organizationFramework.findFirst({
      where: {
        organizationId,
        frameworkTemplate: {
          frameworkId: params.slug
        }
      }
    })
    
    if (!orgFramework) {
      return NextResponse.json({ error: 'Framework not found' }, { status: 404 })
    }
    
    // Upsert table data
    const tableData = await prisma.frameworkTableData.upsert({
      where: {
        organizationFrameworkId_grandchildId: {
          organizationFrameworkId: orgFramework.id,
          grandchildId: params.grandchildId
        }
      },
      create: {
        organizationFrameworkId: orgFramework.id,
        grandchildId: params.grandchildId,
        data: body.data
      },
      update: {
        data: body.data
      }
    })
    
    return NextResponse.json(tableData)
  } catch (error) {
    console.error('Error updating table data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

#### 2.3 Create Kanban API

Create `app/api/kanban/[slug]/route.ts`:
```typescript
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET kanban board
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const organizationId = 'org-123' // TODO: Get from session
    
    const orgFramework = await prisma.organizationFramework.findFirst({
      where: {
        organizationId,
        frameworkTemplate: {
          frameworkId: params.slug
        }
      },
      include: {
        kanbanBoards: {
          include: {
            cards: {
              orderBy: { position: 'asc' }
            }
          }
        }
      }
    })
    
    if (!orgFramework?.kanbanBoards[0]) {
      // Return empty board structure
      return NextResponse.json({
        columns: [],
        cards: []
      })
    }
    
    return NextResponse.json({
      columns: orgFramework.kanbanBoards[0].columns,
      cards: orgFramework.kanbanBoards[0].cards
    })
  } catch (error) {
    console.error('Error fetching kanban board:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Update kanban board
export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const organizationId = 'org-123' // TODO: Get from session
    
    const orgFramework = await prisma.organizationFramework.findFirst({
      where: {
        organizationId,
        frameworkTemplate: {
          frameworkId: params.slug
        }
      }
    })
    
    if (!orgFramework) {
      return NextResponse.json({ error: 'Framework not found' }, { status: 404 })
    }
    
    // Upsert board
    const board = await prisma.kanbanBoard.upsert({
      where: {
        organizationFrameworkId_frameworkSlug: {
          organizationFrameworkId: orgFramework.id,
          frameworkSlug: params.slug
        }
      },
      create: {
        organizationFrameworkId: orgFramework.id,
        frameworkSlug: params.slug,
        columns: body.columns
      },
      update: {
        columns: body.columns
      }
    })
    
    return NextResponse.json(board)
  } catch (error) {
    console.error('Error updating kanban board:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

Create `app/api/kanban/cards/route.ts`:
```typescript
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// POST - Create card
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const card = await prisma.kanbanCard.create({
      data: body
    })
    
    return NextResponse.json(card)
  } catch (error) {
    console.error('Error creating card:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update card
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    
    const card = await prisma.kanbanCard.update({
      where: { id },
      data
    })
    
    return NextResponse.json(card)
  } catch (error) {
    console.error('Error updating card:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete card
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Card ID required' }, { status: 400 })
    }
    
    await prisma.kanbanCard.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting card:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

### Phase 3: Connect UI (Days 5-7)

#### 3.1 Update Dashboard Page

Edit `app/(reqarchitect)/frameworks/[slug]/dashboard/page.tsx`:

**Before:**
```typescript
const data = getMockFrameworkData(slug, config.grandchildren)
```

**After:**
```typescript
import { prisma } from '@/lib/prisma'

// In the component function:
const organizationId = 'org-123' // TODO: Get from session

// Fetch real data
const orgFramework = await prisma.organizationFramework.findFirst({
  where: {
    organizationId,
    frameworkTemplate: {
      frameworkId: slug
    }
  },
  include: {
    tableData: true
  }
})

// Transform to expected format
const data = config.grandchildren.map(grandchild => {
  const tableData = orgFramework?.tableData.find(
    td => td.grandchildId === grandchild.id
  )
  
  return {
    id: grandchild.id,
    name: grandchild.name,
    items: tableData?.data || []
  }
})
```

#### 3.2 Update Table Component to Use API

Edit `app/(reqarchitect)/frameworks/[slug]/dashboard/components/data-table.tsx`:

Add these functions:
```typescript
'use client'

import { useState, useEffect } from 'react'

export function DataTable({ frameworkSlug, grandchildren, initialData }) {
  const [data, setData] = useState(initialData)
  
  // Fetch data
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/frameworks/${frameworkSlug}/tables/${grandchildren[0].id}`
      )
      const result = await response.json()
      setData(result.data)
    }
    fetchData()
  }, [frameworkSlug, grandchildren])
  
  // Create item
  const handleCreate = async (item) => {
    const newData = [...data, item]
    
    await fetch(
      `/api/frameworks/${frameworkSlug}/tables/${grandchildren[0].id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: newData })
      }
    )
    
    setData(newData)
  }
  
  // Update item
  const handleUpdate = async (updatedItem) => {
    const newData = data.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    )
    
    await fetch(
      `/api/frameworks/${frameworkSlug}/tables/${grandchildren[0].id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: newData })
      }
    )
    
    setData(newData)
  }
  
  // Delete item
  const handleDelete = async (itemId) => {
    const newData = data.filter(item => item.id !== itemId)
    
    await fetch(
      `/api/frameworks/${frameworkSlug}/tables/${grandchildren[0].id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: newData })
      }
    )
    
    setData(newData)
  }
  
  // ... rest of component
}
```

#### 3.3 Update Kanban Page

Edit `app/(reqarchitect)/frameworks/[slug]/kanban/page.tsx`:

Add API integration:
```typescript
'use client'

import { useState, useEffect } from 'react'

export default function KanbanPage({ params }) {
  const [board, setBoard] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchBoard() {
      const response = await fetch(`/api/kanban/${params.slug}`)
      const data = await response.json()
      setBoard(data)
      setLoading(false)
    }
    fetchBoard()
  }, [params.slug])
  
  const handleCardMove = async (cardId, newColumnId, newPosition) => {
    // Update locally
    // ... update state ...
    
    // Save to API
    await fetch('/api/kanban/cards', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: cardId,
        columnId: newColumnId,
        position: newPosition
      })
    })
  }
  
  const handleCardCreate = async (card) => {
    const response = await fetch('/api/kanban/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    })
    
    const newCard = await response.json()
    // Update state with new card
  }
  
  // ... rest of component
}
```

---

### Phase 4: Seed Data (Day 8)

#### 4.1 Create Seed Script

Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding framework templates...')
  
  // Seed TOGAF
  await prisma.frameworkTemplate.upsert({
    where: { frameworkId: 'togaf' },
    create: {
      frameworkId: 'togaf',
      name: 'TOGAF ADM',
      version: '9.2',
      description: 'The Open Group Architecture Framework',
      category: 'ENTERPRISE_ARCHITECTURE',
      domain: 'ARCHITECTURE',
      complexity: 'HIGH',
      implementationTime: '6-12 months',
      isActive: true,
      isPublic: true
    },
    update: {}
  })
  
  // Seed ISO 27001
  await prisma.frameworkTemplate.upsert({
    where: { frameworkId: 'iso-27001' },
    create: {
      frameworkId: 'iso-27001',
      name: 'ISO/IEC 27001:2022',
      version: '2022',
      description: 'Information Security Management System',
      category: 'SECURITY_COMPLIANCE',
      domain: 'SECURITY',
      complexity: 'HIGH',
      implementationTime: '6-12 months',
      isActive: true,
      isPublic: true
    },
    update: {}
  })
  
  // Add all 33 frameworks...
  
  console.log('Seeding complete!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

#### 4.2 Update package.json

Add seed script:
```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

#### 4.3 Run Seed
```bash
npm install -D ts-node
npx prisma db seed
```

---

## ✅ Testing Your Work

### Test Checklist:

1. **Database**
   ```bash
   npx prisma studio
   # Verify tables exist and have data
   ```

2. **API Routes**
   ```bash
   # Test in browser or Postman
   GET http://localhost:3000/api/frameworks/togaf/tables/architecture-vision
   ```

3. **UI Integration**
   - Open http://localhost:3000/frameworks/togaf/dashboard
   - Add a new item
   - Refresh page - item should still be there
   - Edit the item
   - Delete the item

4. **Kanban Board**
   - Open http://localhost:3000/frameworks/scrum/kanban
   - Create a card
   - Drag it to another column
   - Refresh page - card should be in new position

---

## 🎯 Success Criteria

You're done when:
- [ ] All framework dashboards show real data from database
- [ ] Users can add/edit/delete items in tables
- [ ] Changes persist after page refresh
- [ ] Kanban boards save card positions
- [ ] Canvas data saves to database
- [ ] Capability maps save to database
- [ ] No more mock data anywhere
- [ ] All CRUD operations work

---

## 🆘 Common Issues & Solutions

### Issue: "Prisma Client not found"
```bash
npx prisma generate
```

### Issue: "Cannot connect to database"
Check `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

### Issue: "API route returns 404"
Make sure file structure is correct:
```
app/api/frameworks/[slug]/tables/[grandchildId]/route.ts
```

### Issue: "Data not persisting"
Check browser console for API errors. Verify API routes are being called.

---

## 📞 Questions to Ask

If stuck, ask your boss:
1. "Should I start with TOGAF or another framework?"
2. "Do we have a test organization ID I should use?"
3. "Should I implement authentication first or use a placeholder?"
4. "What's the priority: Kanban, Canvas, or Capability Maps?"

---

## 🎓 Learning Resources

### Prisma Docs
- https://www.prisma.io/docs/getting-started
- https://www.prisma.io/docs/concepts/components/prisma-client

### Next.js API Routes
- https://nextjs.org/docs/app/building-your-application/routing/route-handlers

### Your Codebase
- Study: `components/crud-table.tsx` - Example CRUD implementation
- Study: `lib/framework-config.ts` - Framework definitions
- Study: `app/(reqarchitect)/frameworks/[slug]/kanban/page.tsx` - Kanban example

---

**Remember**: Start small, test often, and iterate. Don't try to do everything at once!

Good luck! 🚀
