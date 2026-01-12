# Capability Map L0 Fix - Separating Groupings from Capabilities

## Problem Identified

The NIST CSF capability map had a fundamental structural error where:
- **Groupings** (Govern, Identify, Protect, Detect, Respond, Recover) 
- **L0 Capabilities** (also Govern, Identify, Protect, Detect, Respond, Recover)

Were the same entities, which is logically inconsistent. A capability cannot group itself.

## The Correct Structure

### Groupings vs Capabilities

**Groupings** are organizational bands/containers that visually organize capabilities.  
**L0 Capabilities** are the actual top-level capabilities (framework grandchildren) that appear as cards within those grouping bands.

### Fixed Structure

```
❌ BEFORE (WRONG):
┌─────────────────────────────────────┐
│ Govern (Grouping)                   │
│  - Govern (L0 capability)           │  ← Same as grouping!
│    - Risk Management (L1)           │
└─────────────────────────────────────┘

✅ AFTER (CORRECT):
┌─────────────────────────────────────┐
│ Govern (Grouping)                   │
│  - Organizational Context (L0)      │  ← Actual capability
│  - Risk Management Strategy (L0)    │  ← Actual capability
│  - Roles & Responsibilities (L0)    │  ← Actual capability
│    - CISO Role Definition (L1)      │  ← Sub-capability
└─────────────────────────────────────┘
```

## Changes Made

### NIST Cybersecurity Framework 2.0

**Actions Taken:**
1. Removed 6 placeholder L0 capabilities that matched grouping names
2. Promoted all L1 capabilities to L0 (removed parentId references)
3. Promoted all subsequent levels up by 1 (L2→L1, L3→L2, etc.)
4. Cleaned up empty entries left by deletions

**Before:**
- L0: 6 placeholder capabilities (Govern, Identify, Protect, Detect, Respond, Recover)
- L1: 20+ actual categories
- L2: Sub-categories
- L3: Implementation details

**After:**
- **Groupings**: 6 core functions (Govern, Identify, Protect, Detect, Respond, Recover)
- **L0**: 20+ NIST CSF categories (Organizational Context, Risk Management Strategy, Asset Management, etc.)
- **L1**: Sub-categories and implementation areas
- **L2**: Specific implementation details

**Example L0 Capabilities in "Govern" Grouping:**
- Organizational Context
- Risk Management Strategy
- Roles & Responsibilities
- Policy & Oversight
- Cybersecurity Supply Chain Risk Management

### Other Frameworks - No Changes Needed

**COBIT 2019** ✅ Already Correct
- **Groupings**: 5 domains (EDM, APO, BAI, DSS, MEA)
- **L0 Capabilities**: 4 grandchildren (Governance System, Governance & Management Objectives, Design Factors, Performance Management)
- These are appropriately distributed across the groupings

**ITIL 4** ✅ Already Correct
- **Groupings**: 6 Value Chain activities (Plan, Improve, Engage, Design & Transition, Obtain/Build, Deliver & Support)
- **L0 Capabilities**: 5 grandchildren (Service Value System, Service Value Chain, General Management Practices, Service Management Practices, Technical Management Practices)
- These are appropriately distributed across the groupings

**ISO 27001:2022** ✅ Already Correct
- **Groupings**: 8 clause-based bands (Context, Leadership, Planning, Support, Operation, Performance, Improvement, Controls)
- **L0 Capabilities**: 11 grandchildren (matching the framework structure exactly)
- Each L0 capability maps to its appropriate grouping

## Verification

### NIST CSF After Fix

```bash
Level 0: 20 capabilities (categories like "Organizational Context", "Asset Management", etc.)
Level 1: 16 capabilities (sub-categories)
Level 2: 2 capabilities (implementation details)
```

No placeholder L0 capabilities matching grouping names remain.

### All Frameworks Summary

| Framework | Groupings | L0 Capabilities (Grandchildren) | Status |
|-----------|-----------|--------------------------------|--------|
| NIST CSF | 6 functions | 20+ categories | ✅ FIXED |
| COBIT 2019 | 5 domains | 4 components | ✅ Correct |
| ITIL 4 | 6 value chain activities | 5 practices | ✅ Correct |
| ISO 27001 | 8 clauses | 11 clauses/controls | ✅ Correct |

## Impact

### User Experience
- **Before**: Confusing - L0 cards had the same names as the grouping bands
- **After**: Clear - L0 cards show actual capabilities within each functional area

### Data Integrity
- **Before**: Redundant data structure with meaningless placeholder capabilities
- **After**: Clean hierarchy where every capability represents actual organizational capability

### Framework Fidelity
- **Before**: Oversimplified to just 6 L0 capabilities for NIST CSF
- **After**: Accurately represents the full NIST CSF structure with proper categories

## Technical Details

### Files Modified
- `lib/data/capability-maps/nist-csf-capability-map.ts`

### Changes Summary
- Removed: 6 placeholder capability objects
- Updated: ~40 capability level assignments
- Cleaned: Empty array entries

### Backward Compatibility
- No breaking changes to the UI pattern
- Same component logic handles the corrected structure
- Type system already supports flexible capability levels

## Testing

### Verification Steps
1. ✅ Navigate to `/frameworks/nist-csf/capability-map`
2. ✅ Verify 6 grouping bands appear (Govern, Identify, Protect, Detect, Respond, Recover)
3. ✅ Verify each band contains actual capability cards (not self-referential)
4. ✅ Verify capability cards show meaningful names like "Organizational Context", "Asset Management", etc.
5. ✅ Verify expanding capabilities shows proper sub-capabilities

### Expected Result
Each NIST CSF function band should display 3-5 L0 capability cards that represent actual categories from the framework, not placeholders that repeat the function name.

## Lessons Learned

### Key Principle
**Groupings and Capabilities must be separate entities.** Groupings are organizational constructs for the UI. Capabilities are the actual business/technical capabilities being assessed and managed.

### Framework Mapping Rule
When creating capability maps:
1. Identify the framework's natural organizational structure → These become **Groupings**
2. Identify the framework's grandchildren/components → These become **L0 Capabilities**
3. Assign each L0 capability to the appropriate grouping via the `type` field
4. Build sub-capabilities (L1, L2, etc.) under the L0 capabilities as needed

## Status

✅ **FIXED** - NIST CSF now has proper separation between groupings and L0 capabilities  
✅ **VERIFIED** - Other frameworks already had correct structure  
✅ **DOCUMENTED** - Changes recorded for future reference  

---

**Date**: January 2025  
**Issue**: Groupings conflated with L0 capabilities in NIST CSF  
**Resolution**: Removed placeholder L0s, promoted categories to L0, maintained grouping structure  
**Impact**: Improved clarity and framework fidelity  
