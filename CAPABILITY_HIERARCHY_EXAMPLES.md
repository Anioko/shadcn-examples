# Capability Map - 5-Level Hierarchy Examples

## 📊 Complete Level Structure (0 → 4)

The capability map supports **5 levels of depth** demonstrating organizational capability granularity from strategic domains down to implementation components.

---

## 🌳 Full Hierarchy Example

### Example 1: Information Technology Capability Tree

```
🛡️ Level 0: Information Technology (Supporting)
│   Owner: Chief Technology Officer
│   Type: Supporting
│
├─ 📊 Level 1: Data Management & Analytics
│   │   Owner: Chief Data Officer
│   │   Maturity: 2/5 (Developing)
│   │
│   ├─ 🗃️ Level 2: Data Architecture
│   │   │   Owner: Data Architect
│   │   │   Maturity: 2/5
│   │   │
│   │   ├─ 📐 Level 3: Data Modeling
│   │   │   │   Owner: Lead Data Modeler
│   │   │   │   Maturity: 2/5
│   │   │   │
│   │   │   ├─ 📄 Level 4: Conceptual Data Models ✓ (DEEPEST)
│   │   │   │       Owner: Data Modeler
│   │   │   │       Maturity: 2/5
│   │   │   │       Focus: Entity-relationship models
│   │   │   │
│   │   │   └─ 📄 Level 4: Physical Data Models ✓ (DEEPEST)
│   │   │           Owner: Database Developer
│   │   │           Maturity: 3/5
│   │   │           Focus: Database-specific schemas
│   │   │
│   │   ├─ 🏗️ Level 3: Database Design
│   │   │   │   Owner: Database Architect
│   │   │   │   Maturity: 3/5
│   │   │   │
│   │   │   └─ 📄 Level 4: Schema Design Patterns ✓ (DEEPEST)
│   │   │           Owner: Senior Database Designer
│   │   │           Maturity: 3/5
│   │   │           Focus: Star schema, snowflake patterns
│   │   │
│   │   └─ 🏭 Level 3: Data Warehouse Architecture
│   │           Owner: Data Warehouse Architect
│   │           Maturity: 2/5
│   │           Focus: EDW, data lakes, lakehouses
│   │
│   ├─ ✅ Level 2: Data Governance
│   │   │   Owner: Data Governance Manager
│   │   │   Maturity: 1/5 (Initial)
│   │   │
│   │   ├─ 🎯 Level 3: Data Quality Management
│   │   │   │   Owner: Data Quality Lead
│   │   │   │   Maturity: 1/5
│   │   │   │
│   │   │   ├─ 📄 Level 4: Data Quality Rules Engine ✓ (DEEPEST)
│   │   │   │       Owner: DQ Systems Engineer
│   │   │   │       Maturity: 1/5
│   │   │   │       Focus: Automated rule execution
│   │   │   │
│   │   │   └─ 📄 Level 4: Data Profiling Tools ✓ (DEEPEST)
│   │   │           Owner: Data Analyst
│   │   │           Maturity: 2/5
│   │   │           Focus: Automated profiling
│   │   │
│   │   ├─ 📚 Level 3: Metadata Management
│   │   │       Owner: Metadata Manager
│   │   │       Maturity: 1/5
│   │   │
│   │   └─ 👥 Level 3: Data Stewardship
│   │           Owner: Chief Data Steward
│   │           Maturity: 2/5
│   │
│   └─ 🤖 Level 2: Advanced Analytics & AI
│       │   Owner: Data Science Manager
│       │   Maturity: 1/5
│       │
│       ├─ ⚙️ Level 3: Machine Learning Operations
│       │   │   Owner: ML Platform Engineer
│       │   │   Maturity: 1/5
│       │   │
│       │   ├─ 📄 Level 4: Model Training Pipeline ✓ (DEEPEST)
│       │   │       Owner: ML Engineer
│       │   │       Maturity: 1/5
│       │   │       Focus: Automated ML training
│       │   │
│       │   └─ 📄 Level 4: Model Deployment Automation ✓ (DEEPEST)
│       │           Owner: DevOps Engineer
│       │           Maturity: 1/5
│       │           Focus: CI/CD for ML models
│       │
│       ├─ 📈 Level 3: Predictive Analytics
│       │       Owner: Analytics Lead
│       │       Maturity: 2/5
│       │
│       └─ 🗣️ Level 3: Natural Language Processing
│               Owner: NLP Engineer
│               Maturity: 1/5
```

---

## 📋 Level-by-Level Breakdown

### Level 0: Domain (Root)
**Purpose**: Top-level capability domains in strategic, operational, or supporting bands

**Examples**:
- 🎯 Strategy & Planning (Strategic)
- ⚙️ Customer Engagement (Operational)
- 🛡️ Information Technology (Supporting)

**Characteristics**:
- Always visible in main grid
- Has a type (strategic/operational/supporting)
- Represents major organizational areas

---

### Level 1: Capability
**Purpose**: Major capabilities within a domain

**Examples** (under Information Technology):
- Data Management & Analytics
- Application Development & Management
- IT Infrastructure & Cloud
- Cybersecurity & Risk

**Characteristics**:
- First child level
- Shown when parent is expanded
- Represents functional areas

---

### Level 2: Sub-capability
**Purpose**: Specific capability areas within a capability

**Examples** (under Data Management & Analytics):
- Data Architecture
- Data Governance
- Business Intelligence & Reporting
- Advanced Analytics & AI

**Characteristics**:
- Second child level
- More granular functional areas
- Often align with team structures

---

### Level 3: Component
**Purpose**: Detailed capability components or practices

**Examples** (under Data Architecture):
- Data Modeling
- Database Design
- Data Warehouse Architecture

**Examples** (under Data Governance):
- Data Quality Management
- Metadata Management
- Data Stewardship

**Examples** (under Advanced Analytics & AI):
- Machine Learning Operations
- Predictive Analytics
- Natural Language Processing

**Characteristics**:
- Third child level
- Specific methodologies or practices
- Technical implementation areas

---

### Level 4: Sub-component (DEEPEST)
**Purpose**: Lowest-level implementation details or tools

**Examples** (under Data Modeling):
- ✅ Conceptual Data Models
- ✅ Physical Data Models

**Examples** (under Database Design):
- ✅ Schema Design Patterns

**Examples** (under Data Quality Management):
- ✅ Data Quality Rules Engine
- ✅ Data Profiling Tools

**Examples** (under Machine Learning Operations):
- ✅ Model Training Pipeline
- ✅ Model Deployment Automation

**Characteristics**:
- Fourth and FINAL child level
- Specific tools, patterns, or implementations
- Cannot have children (maximum depth reached)

---

## 🎨 Visual Representation in the UI

### How It Looks in the Capability Map

**Level 0** (Grid Layout - 4 columns on desktop):
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 🛡️ Info Tech │ │ 💰 Finance   │ │ 👥 Human Cap │ │ ⚖️ Legal     │
│ L0 - 4 sub   │ │ L0 - 3 sub   │ │ L0 - 3 sub   │ │ L0 - 0 sub   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
      ▼ Show 4 Sub-Capabilities
```

**Level 1** (Vertical list when expanded):
```
└─ ┌────────────────────────────┐
   │ 📊 Data Management & Analytics │
   │ L1 - 4 sub                 │
   └────────────────────────────┘
        ▼ Show 4 Sub-Capabilities
```

**Level 2** (Nested vertical list):
```
   └─ ┌──────────────────────┐
      │ 🗃️ Data Architecture │
      │ L2 - 3 sub           │
      └──────────────────────┘
           ▼ Show 3 Sub-Capabilities
```

**Level 3** (Further nested):
```
      └─ ┌────────────────────┐
         │ 📐 Data Modeling   │
         │ L3 - 2 sub         │
         └────────────────────┘
              ▼ Show 2 Sub-Capabilities
```

**Level 4** (Deepest - no children):
```
         └─ ┌──────────────────────────┐
            │ 📄 Conceptual Data Models│
            │ L4 - 0 sub               │
            │ ✓ DEEPEST LEVEL          │
            └──────────────────────────┘
```

---

## 🧪 How to Test All 5 Levels

### Step-by-Step Navigation

1. **Visit**: http://localhost:3000/frameworks/capability-model/capability-map

2. **Find Information Technology** (Supporting Capabilities band - amber):
   - Look for "Information Technology" card with 🛡️ icon
   - Badge shows "L0"

3. **Expand Level 1**:
   - Click "Show 4 Sub-Capabilities" on Information Technology
   - See "Data Management & Analytics" appear

4. **Expand Level 2**:
   - Click "Show 4 Sub-Capabilities" on Data Management & Analytics
   - See "Data Architecture", "Data Governance", "Advanced Analytics & AI"

5. **Expand Level 3**:
   - Click "Show 3 Sub-Capabilities" on Data Architecture
   - See "Data Modeling", "Database Design", "Data Warehouse Architecture"

6. **Expand Level 4** (DEEPEST):
   - Click "Show 2 Sub-Capabilities" on Data Modeling
   - See "Conceptual Data Models" and "Physical Data Models"
   - Notice: NO "Show Sub-Capabilities" button (Level 4 is the max!)

---

## 📊 Statistics

Current sample data now includes:

| Level | Count | Label |
|-------|-------|-------|
| **0** | 15 | Domain |
| **1** | 22 | Capability |
| **2** | 10 | Sub-capability |
| **3** | 9 | Component |
| **4** | 7 | Sub-component ✓ |
| **TOTAL** | **63 capabilities** |

---

## 🎯 Use Cases by Level

| Level | Business Use | Technical Use |
|-------|--------------|---------------|
| **0** | Executive dashboards | Platform architecture |
| **1** | Department planning | System design |
| **2** | Team roadmaps | Component design |
| **3** | Project planning | Implementation patterns |
| **4** | Task breakdown | Tool/library selection |

---

## ⚠️ Limitation

**Maximum Depth**: Level 4
- Cannot create Level 5 or deeper
- TypeScript enforces this limit: `CapabilityLevel = 0 | 1 | 2 | 3 | 4`
- If you need more depth, the type would need to be extended

---

## 🔄 Creating Your Own Deep Hierarchy

To create a full 5-level hierarchy:

1. Click "Add Capability" in any band → Creates **Level 0**
2. Click "Add" on the Level 0 card → Creates **Level 1** (auto)
3. Click "Add" on the Level 1 card → Creates **Level 2** (auto)
4. Click "Add" on the Level 2 card → Creates **Level 3** (auto)
5. Click "Add" on the Level 3 card → Creates **Level 4** (auto - DEEPEST)

Each child automatically inherits:
- Parent's type (strategic/operational/supporting)
- Level = Parent Level + 1
- Appears in the same capability band

---

**Ready to explore?** Visit the capability map and drill down into "Information Technology" → "Data Management & Analytics" to see all 5 levels in action! 🚀
