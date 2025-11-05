# Setup Instructions: Running the Implementation

## ⚠️ Prerequisites

You need PostgreSQL installed and running. If you don't have it:

### Option 1: Local PostgreSQL
```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql
brew services start postgresql
```

### Option 2: Docker PostgreSQL
```bash
docker run --name reqarchitect-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=reqarchitect \
  -p 5432:5432 \
  -d postgres:15
```

### Option 3: Cloud Database
Use services like:
- Supabase (free tier)
- Neon (free tier)
- Railway (free tier)
- Vercel Postgres

---

## 🚀 Step-by-Step Setup

### Step 1: Configure Database Connection

Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your database URL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/reqarchitect"
```

**Examples**:
- Local: `postgresql://postgres:password@localhost:5432/reqarchitect`
- Docker: `postgresql://postgres:password@localhost:5432/reqarchitect`
- Supabase: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`

### Step 2: Install Dependencies

```bash
npm install
```

This will also run `prisma generate` automatically.

### Step 3: Run Database Migration

```bash
npx prisma migrate dev --name add_framework_data_models
```

This creates all the necessary tables in your database.

**Expected output**:
```
✔ Generated Prisma Client
✔ The migration has been generated
✔ Applied migration
```

### Step 4: Seed Framework Templates

```bash
npx prisma db seed
```

This populates your database with:
- 10 framework templates
- Default organization

**Expected output**:
```
🌱 Starting database seed...
✅ Seeded framework: TOGAF ADM
✅ Seeded framework: ISO/IEC 27001:2022
... (8 more)
✅ Created default organization: Default Organization
🎉 Database seed completed!
```

### Step 5: Verify Database

```bash
npx prisma studio
```

This opens a GUI at http://localhost:5555 where you can:
- View all tables
- See seeded framework templates
- Inspect data structure

**Check these tables**:
- ✅ `framework_templates` - Should have 10 rows
- ✅ `organizations` - Should have 1 row (default-org)
- ✅ `framework_table_data` - Empty (will be populated by users)
- ✅ `kanban_boards` - Empty (will be populated by users)
- ✅ `kanban_cards` - Empty (will be populated by users)
- ✅ `capability_map_data` - Empty (will be populated by users)

### Step 6: Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## 🧪 Testing the APIs

### Test Framework Tables API

```bash
# Get table data (should return empty array initially)
curl http://localhost:3000/api/frameworks/togaf/tables/architecture-vision

# Create table data
curl -X POST http://localhost:3000/api/frameworks/togaf/tables/architecture-vision \
  -H "Content-Type: application/json" \
  -d '{"data": [{"id": "1", "name": "Test Item", "status": "active"}]}'

# Get again (should return the data you just created)
curl http://localhost:3000/api/frameworks/togaf/tables/architecture-vision
```

### Test Kanban API

```bash
# Get kanban board (should return empty initially)
curl http://localhost:3000/api/kanban/scrum

# Create board with columns
curl -X POST http://localhost:3000/api/kanban/scrum \
  -H "Content-Type: application/json" \
  -d '{"columns": [{"id": "todo", "name": "To Do"}, {"id": "doing", "name": "In Progress"}]}'

# Create a card
curl -X POST http://localhost:3000/api/kanban/cards \
  -H "Content-Type: application/json" \
  -d '{"boardId": "BOARD_ID_FROM_PREVIOUS_RESPONSE", "columnId": "todo", "title": "Test Card", "position": 0}'
```

### Test Capability Map API

```bash
# Get capability map (should return empty initially)
curl http://localhost:3000/api/capability-maps/pcf

# Save capability map
curl -X POST http://localhost:3000/api/capability-maps/pcf \
  -H "Content-Type: application/json" \
  -d '{"capabilities": [{"id": "1", "name": "Operating Processes", "level": 0}]}'
```

---

## 🔍 Verifying Everything Works

### 1. Check Database Connection
```bash
npx prisma db pull
```
Should complete without errors.

### 2. Check Prisma Client
```bash
npx prisma generate
```
Should generate client successfully.

### 3. Check Seeded Data
```bash
npx prisma studio
```
Open and verify framework_templates table has 10 rows.

### 4. Check API Routes
Visit in browser:
- http://localhost:3000/api/frameworks/togaf/tables/architecture-vision
- http://localhost:3000/api/kanban/scrum
- http://localhost:3000/api/capability-maps/pcf

All should return JSON (empty arrays initially).

---

## 🐛 Troubleshooting

### Error: "Environment variable not found: DATABASE_URL"

**Solution**: Create `.env.local` file with DATABASE_URL:
```bash
echo 'DATABASE_URL="postgresql://postgres:password@localhost:5432/reqarchitect"' > .env.local
```

### Error: "Can't reach database server"

**Solution**: 
1. Check PostgreSQL is running:
   ```bash
   # Check status
   sudo systemctl status postgresql
   
   # Start if not running
   sudo systemctl start postgresql
   ```

2. Or start Docker container:
   ```bash
   docker start reqarchitect-db
   ```

### Error: "Database does not exist"

**Solution**: Create the database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE reqarchitect;

# Exit
\q
```

### Error: Migration fails

**Solution**: Reset and try again:
```bash
# WARNING: This deletes all data
npx prisma migrate reset

# Then run migration
npx prisma migrate dev
```

### Error: Seed fails

**Solution**: Check database connection and try:
```bash
# Generate Prisma Client first
npx prisma generate

# Then seed
npx prisma db seed
```

### Error: "Module not found: ts-node"

**Solution**: Install ts-node:
```bash
npm install -D ts-node
```

---

## 📋 Quick Setup Checklist

- [ ] PostgreSQL installed and running
- [ ] `.env.local` file created with DATABASE_URL
- [ ] Dependencies installed (`npm install`)
- [ ] Migration run (`npx prisma migrate dev`)
- [ ] Database seeded (`npx prisma db seed`)
- [ ] Prisma Studio verified data (`npx prisma studio`)
- [ ] Dev server running (`npm run dev`)
- [ ] API endpoints tested (curl or browser)

---

## 🎯 What's Next

After setup is complete:

1. **Test the APIs** - Use curl or Postman to verify CRUD operations
2. **Connect UI** - Follow instructions in `IMPLEMENTATION_COMPLETE.md`
3. **Test in Browser** - Visit framework pages and verify data persists

---

## 💡 Tips

### Use Prisma Studio for Development
```bash
npx prisma studio
```
This is the easiest way to:
- View your data
- Manually add/edit/delete records
- Debug data issues
- Verify API operations

### Reset Database When Needed
```bash
npx prisma migrate reset
npx prisma db seed
```
Useful when you want a fresh start.

### Check Logs
API errors are logged to console. Check terminal where `npm run dev` is running.

---

## 🔐 Production Considerations

When deploying to production:

1. **Use Strong Database Password**
2. **Use Connection Pooling** (Prisma Accelerate or PgBouncer)
3. **Set up Backups**
4. **Use Environment Variables** (not .env.local)
5. **Enable SSL** for database connections
6. **Replace 'default-org'** with actual organization IDs from auth

---

## 📞 Need Help?

If you encounter issues:

1. Check the error message carefully
2. Verify database connection with `npx prisma db pull`
3. Check Prisma Studio for data state
4. Review API logs in terminal
5. Ask your boss for:
   - Database credentials
   - Organization ID structure
   - Authentication integration details

---

**Status**: Setup instructions complete. Follow steps above to get the implementation running.
