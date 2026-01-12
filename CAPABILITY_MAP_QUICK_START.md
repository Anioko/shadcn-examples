# Capability Map - Quick Start Guide

## 🚀 Access Capability Maps

Visit any of these URLs:

```
http://localhost:3000/frameworks/iso-27001/capability-map
http://localhost:3000/frameworks/nist-csf/capability-map
http://localhost:3000/frameworks/cobit-2019/capability-map
http://localhost:3000/frameworks/itil4/capability-map
```

Or navigate via:
1. Go to framework dashboard
2. Click on "Capability Map" in grandchildren list
3. Or use "View Capability Map" button

---

## 🎯 Quick Actions

### View Capabilities
- **Expand**: Click "Show X Sub-Capabilities"
- **Collapse**: Click "Hide Sub-Capabilities"
- **Details**: Click on any capability card

### Heat Maps
1. Click "Heat Map" dropdown
2. Select:
   - **Maturity** - See capability maturity (1-5)
   - **Strategic Importance** - View criticality
   - **Investment** - Check funding levels
3. Legend updates automatically

### Add Capability
1. Click "Add Capability" button
2. Fill in form:
   - Name
   - Description
   - Maturity level (1-5)
   - Strategic importance
   - Investment levels
   - Owner
3. Click "Add Capability"

### Edit Capability
1. Click on capability card
2. Click "Edit" button
3. Update fields
4. Click "Update"

### Delete Capability
1. Click on capability card
2. Click "Delete" button
3. Confirm (deletes all children)

### Export Data
1. Click "Export" dropdown
2. Choose format:
   - CSV, Excel, JSON (data)
   - PNG, JPEG, SVG (images)
3. File downloads automatically

### Planning & Analysis
1. Click "Planning & Analysis" tab
2. View:
   - Overview metrics
   - Distribution charts
   - Gap analysis
   - Risk areas

---

## 📊 Framework-Specific Details

### ISO 27001 (11 L0 Capabilities)
- Context of Organization
- Leadership
- Planning
- Support
- Operation
- Performance Evaluation
- Improvement
- Organizational Controls
- People Controls
- Physical Controls
- Technological Controls

**Best For**: Information security management maturity assessment

### NIST CSF (6 L0 Capabilities)
- Govern
- Identify
- Protect
- Detect
- Respond
- Recover

**Best For**: Cybersecurity program assessment and roadmap planning

### COBIT 2019 (4 L0 Capabilities)
- Governance System
- Governance & Management Objectives
- Design Factors
- Performance Management

**Best For**: IT governance maturity and performance management

### ITIL 4 (5 L0 Capabilities)
- Service Value System
- Service Value Chain
- General Management Practices
- Service Management Practices
- Technical Management Practices

**Best For**: IT service management capability assessment

---

## 🎨 Understanding Heat Maps

### Maturity Levels
- 🔴 **Level 1**: Initial (ad-hoc, unpredictable)
- 🟠 **Level 2**: Developing (basic, inconsistent)
- 🟡 **Level 3**: Defined (standardized, documented)
- 🟢 **Level 4**: Managed (measured, controlled)
- 🟢 **Level 5**: Optimizing (continuously improving)

### Strategic Importance
- ⚪ **Low**: Minor impact
- 🔵 **Medium**: Moderate impact
- 🟣 **High**: Significant impact
- 🔴 **Critical**: Mission-critical

### Investment Levels
- ⚪ **None**: No investment
- 🔵 **Low**: $0-50K
- 🔵 **Medium**: $50K-250K
- 🔵 **High**: $250K+

---

## 💡 Tips & Best Practices

### Assessment
1. Start with L0 capabilities
2. Assess maturity honestly
3. Document evidence
4. Review with stakeholders
5. Update quarterly

### Planning
1. Identify gaps (target > current)
2. Prioritize critical capabilities
3. Align investment with importance
4. Set realistic targets (+1 or +2 levels)
5. Track progress monthly

### Reporting
1. Use heat maps for executive presentations
2. Export charts for documentation
3. Share JSON for collaboration
4. Generate reports quarterly
5. Track improvements year-over-year

---

## ⚡ Keyboard Shortcuts

- `Ctrl+S` - Save
- `Ctrl+E` - Export
- `Ctrl+I` - Import
- `Ctrl+R` - Reset
- `Esc` - Close dialog

---

## 🐛 Troubleshooting

### Heat map not showing?
- Check that capabilities have metrics defined
- Verify heat map mode is selected
- Try refreshing the page

### Export not working?
- Check browser popup blocker
- Verify file permissions
- Try different export format

### Import failing?
- Validate JSON structure
- Check file format (.json)
- Ensure IDs are unique

### Page not loading?
- Clear browser cache
- Check dev server is running
- Verify framework slug is correct

---

## 📞 Need Help?

1. Check full documentation: `CAPABILITY_MAP_FRAMEWORKS.md`
2. Review implementation details: `CAPABILITY_MAP_IMPLEMENTATION_SUMMARY.md`
3. See sample data in: `lib/data/capability-maps/`

---

**Last Updated**: January 2025
**Version**: 1.0
