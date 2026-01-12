# Sidebar Links Update Summary

## ✅ What's Been Done:

Updated sidebar navigation to point framework children to `/frameworks/[slug]/dashboard`:

### Updated So Far:
1. ✅ **Lean Canvas** - All children now point to `/frameworks/lean-canvas/dashboard`
2. ✅ **TOGAF** - All children now point to `/frameworks/togaf/dashboard`

## 🎯 Pattern Applied:

**Before:**
```typescript
{
  id: "lean-canvas",
  label: "Lean Canvas",
  url: "/strategy/lean-canvas/dashboard",  // Old custom path
  children: [
    { id: "problem", label: "Problem", url: "/strategy/lean-canvas/problem/dashboard" },
    // ... more children
  ]
}
```

**After:**
```typescript
{
  id: "lean-canvas",
  label: "Lean Canvas",
  url: "/frameworks/lean-canvas/dashboard",  // New unified path
  children: [
    { id: "problem", label: "Problem", url: "/frameworks/lean-canvas/dashboard" },
    // All children point to same dashboard (it has tabs!)
  ]
}
```

## 🔄 Why This Works:

The framework dashboard has **tabbed tables** for each grandchild, so:
- Clicking "Lean Canvas" → Opens dashboard with all tabs
- Clicking "Problems" child → Opens same dashboard (user can navigate via tabs)
- Clicking "Solutions" child → Opens same dashboard (user can navigate via tabs)

## 📋 Remaining Frameworks to Update:

Based on `framework-config.ts`, these still need sidebar URL updates:

1. ⏳ Business Model Canvas
2. ⏳ OKRs  
3. ⏳ ArchiMate
4. ⏳ Zachman Framework
5. ⏳ ISO 27001
6. ⏳ NIST CSF
7. ⏳ CIS Controls
8. ⏳ PCI DSS
9. ⏳ SOC 2
10. ⏳ GDPR
11. ⏳ COBIT 2019
12. ⏳ ITIL 4
13. ⏳ PMBOK
14. ⏳ PRINCE2
15. ⏳ Scrum
16. ⏳ SAFe

## 🗺️ Mapping Guide:

| Sidebar Label | Framework Slug | New URL |
|--------------|----------------|---------|
| Lean Canvas | lean-canvas | `/frameworks/lean-canvas/dashboard` ✅ |
| Business Model Canvas | business-model-canvas | `/frameworks/business-model-canvas/dashboard` |
| OKRs | okr | `/frameworks/okr/dashboard` |
| TOGAF 10 | togaf | `/frameworks/togaf/dashboard` ✅ |
| ArchiMate 3.2 | archimate | `/frameworks/archimate/dashboard` |
| Zachman Framework | zachman | `/frameworks/zachman/dashboard` |
| ISO/IEC 27001:2022 | iso-27001 | `/frameworks/iso-27001/dashboard` |
| NIST CSF 2.0 | nist-csf | `/frameworks/nist-csf/dashboard` |
| CIS Controls v8 | cis-controls | `/frameworks/cis-controls/dashboard` |
| PCI DSS 4.0 | pci-dss | `/frameworks/pci-dss/dashboard` |
| SOC 2 Type II | soc2 | `/frameworks/soc2/dashboard` |
| GDPR | gdpr | `/frameworks/gdpr/dashboard` |
| COBIT 2019 | cobit-2019 | `/frameworks/cobit-2019/dashboard` |
| ITIL 4 | itil4 | `/frameworks/itil4/dashboard` |
| PMBOK 7th Edition | pmbok | `/frameworks/pmbok/dashboard` |
| PRINCE2 | prince2 | `/frameworks/prince2/dashboard` |
| Scrum | scrum | `/frameworks/scrum/dashboard` |
| SAFe | safe | `/frameworks/safe/dashboard` |

## 📝 Search Terms to Find in Sidebar:

Search for these labels in `app-sidebar.tsx` to find and update:
- "Business Model Canvas"
- "ISO/IEC 27001"
- "NIST"
- "CIS Controls"
- "PCI DSS"
- "SOC 2"
- "GDPR"
- "COBIT"
- "ITIL"
- "PMBOK"
- "PRINCE2"
- "Scrum"
- "SAFe"
- "ArchiMate"
- "Zachman"

## ✨ Result:

When all updates are complete:
- ✅ All framework children in sidebar will open their dashboards
- ✅ Consistent navigation pattern across all frameworks
- ✅ Users can navigate via tabs once dashboard is open
- ✅ All 18 frameworks fully accessible from sidebar

## 🚀 Next Steps:

Continue updating remaining 16 frameworks in the sidebar to use the `/frameworks/[slug]/dashboard` pattern.
