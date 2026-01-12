# Capability Model - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Access the Dashboard
Navigate to:
```
/frameworks/capability-model/dashboard
```

You'll see:
- Total capabilities count
- Average maturity level
- Average health score
- Total investment amount
- Distribution charts
- High-risk capabilities
- Recent activity

### Step 2: Open the Workflow
Click the **"Open Workflow"** button (top right) or navigate to:
```
/frameworks/capability-model/workflow
```

### Step 3: Explore Sample Data
On first visit, you'll see sample data:
- 3 main capabilities (Customer Management, Order Processing, Inventory Management)
- 1 sub-capability (Lead Management)
- 1 application (CRM System)
- 1 resource (Sales Team)
- 1 process (Order Fulfillment)
- Relationships connecting them

### Step 4: Try Key Features

**Add a New Capability:**
1. Click dropdown "Add Element"
2. Select "Capability"
3. New node appears on canvas
4. Click to edit, drag to position

**Use Heat Maps:**
1. Click "Heat Map" dropdown
2. Select "Maturity" to see capability maturity levels
3. Try "Health" to see health scores
4. Try "Investment" to see budget allocation

**View Analytics:**
1. Click "Analytics" button (top right)
2. Side panel opens with comprehensive metrics
3. View maturity distribution
4. View investment distribution
5. Check top maturity gaps
6. Review high-risk capabilities

**Create Relationships:**
1. Hover over a capability node
2. Drag from white circle (connection handle)
3. Drop on another node's handle
4. Relationship created

**Resize a Node:**
1. Click to select a node
2. Drag corner handles
3. Node resizes smoothly

**Copy & Paste:**
1. Select a capability (click)
2. Press `Ctrl+C`
3. Press `Ctrl+V`
4. Duplicate appears offset

### Step 5: Save Your Work

**Auto-save:** Changes automatically saved to browser localStorage

**Manual save:** Press `Ctrl+S` or click "Save" button

**Export JSON:**
1. Click "Save" button
2. Downloads complete model as JSON
3. Includes all metadata, version info

**Export Image:**
1. Click "Export" dropdown
2. Select PNG, JPEG, or SVG
3. High-resolution image downloads

## 🎯 Common Use Cases

### Use Case 1: Initial Capability Assessment
1. Add your main L1 capabilities (5-10 capabilities)
2. Set current maturity for each
3. Set target maturity
4. Use "Maturity" heat map to visualize gaps
5. View analytics to see distribution
6. Identify high-risk capabilities

### Use Case 2: Investment Planning
1. Assign criticality to each capability
2. Set investment levels
3. Use "Investment" heat map to see allocation
4. Check analytics for adequacy
5. Identify under-invested critical capabilities
6. Adjust investment plans

### Use Case 3: Dependency Mapping
1. Create all capabilities
2. Add supporting applications
3. Add supporting processes
4. Add resources (teams, data, tech)
5. Connect with "uses" relationships
6. Connect capabilities with "depends-on"
7. Visualize full ecosystem

### Use Case 4: Health Monitoring
1. Ensure maturity, investment, criticality set
2. Use "Health" heat map
3. Check analytics for health scores
4. Review high-risk list
5. Take action on low-health capabilities
6. Monitor improvements over time

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` | Undo last change |
| `Ctrl+Y` | Redo change |
| `Ctrl+C` | Copy selected capabilities |
| `Ctrl+V` | Paste capabilities |
| `Del` or `Backspace` | Delete selected |
| `Ctrl+S` | Save to JSON file |
| `Shift+Click` | Multi-select |

## 🎨 Node Types Reference

### Capability (Blue)
Main business capability with:
- Maturity indicator (1-5)
- Criticality badge
- Investment level
- Health score bar
- Owner info

### Sub-Capability (Purple)
Nested capability with:
- Compact design
- Maturity indicator
- Criticality badge

### Resource (Green)
People/Tech/Data/Infrastructure with:
- Resource type icon
- Allocation percentage
- Cost center

### Application (Orange)
Supporting system with:
- Version number
- Vendor name
- License cost
- Renewal date

### Process (Teal)
Business process with:
- Process maturity
- Efficiency score
- Automation level

### Organization (Gray)
Org unit with:
- Headcount
- Budget allocation
- Department

## 🔥 Heat Map Modes

| Mode | Shows | Use For |
|------|-------|---------|
| **None** | Normal view | General editing |
| **Maturity** | Maturity levels 1-5 | Capability maturity gaps |
| **Investment** | Investment tiers | Budget allocation |
| **Criticality** | Business criticality | Priority assessment |
| **Health** | Overall health 0-100% | Risk monitoring |

## 📊 Analytics Metrics

**Maturity Distribution:**
- Shows count per level (1-5)
- Visualizes maturity spread
- Identifies improvement opportunities

**Investment Distribution:**
- Shows count per tier
- Displays budget ranges
- Helps balance portfolio

**Top Maturity Gaps:**
- Lists biggest gaps
- Shows current → target
- Prioritizes improvement efforts

**High-Risk Capabilities:**
Automatically flags:
- Health score < 40%
- Mission-critical with low investment
- Very low maturity (Level 1-2)

## 💡 Pro Tips

1. **Start Simple** - Begin with 5-10 L1 capabilities, expand later
2. **Use Heat Maps** - Great for presentations and executive reviews
3. **Regular Updates** - Review maturity quarterly, update accordingly
4. **Align Investment** - Match investment to criticality level
5. **Track Progress** - Export JSON regularly to track changes over time
6. **Nest Strategically** - Use parent-child for logical grouping
7. **Color Consistency** - Use heat maps for consistent communication
8. **Document Owners** - Always assign capability owners
9. **Link Dependencies** - Map all "depends-on" relationships early
10. **Monitor Health** - Weekly check of high-risk capabilities

## 🛠️ Troubleshooting

**Q: My changes aren't saving**
A: Changes auto-save to localStorage. Check browser storage permissions.

**Q: Heat map not showing colors**
A: Ensure capabilities have maturity/investment/criticality set in metadata.

**Q: Can't resize nodes**
A: Click to select first, then drag corner handles.

**Q: Import failed**
A: Check JSON structure matches export format, validate with sample.

**Q: Nodes overlapping**
A: Drag to reposition, use mini-map for overview, zoom out for space.

## 📦 Sample Data Included

The workflow includes sample data on first load:
- Customer Management (Capability)
- Order Processing (Capability)
- Inventory Management (Capability)
- Lead Management (Sub-Capability)
- CRM System (Application)
- Sales Team (Resource)
- Order Fulfillment (Process)

Feel free to modify or delete to build your own model!

## 🎓 Learning Path

**Beginner (Day 1):**
1. Explore sample data
2. Add 1-2 capabilities
3. Try heat maps
4. View analytics

**Intermediate (Week 1):**
1. Build complete L1 capability map (10-15 capabilities)
2. Set maturity for all
3. Assign criticality
4. Create relationships
5. Export JSON backup

**Advanced (Month 1):**
1. Full capability decomposition (L1 → L2 → L3)
2. Map all supporting elements (apps, processes, resources)
3. Complete dependency mapping
4. Regular health monitoring
5. Investment optimization
6. Quarterly maturity reviews

## 🚀 Next Steps

1. **Customize** - Replace sample data with your capabilities
2. **Assess** - Set current maturity levels
3. **Plan** - Set target maturity levels
4. **Invest** - Assign investment levels
5. **Monitor** - Use health scores to track
6. **Improve** - Close maturity gaps over time

## 📚 Additional Resources

- `CAPABILITY_MODEL_README.md` - Full documentation
- `CAPABILITY_MODEL_SUMMARY.md` - Implementation details
- Code comments - Inline documentation in all files

---

**Ready to build your capability model?**

Go to: `/frameworks/capability-model/workflow`

**Questions?** Review the full README for comprehensive guidance.

Happy capability modeling! 🎯
