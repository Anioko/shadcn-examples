# Framework-Specific Capability Groupings

## Overview

Each framework now uses its own natural groupings instead of generic "Strategic/Operational/Supporting" classifications. This provides a more accurate representation of how capabilities are organized within each framework.

---

## Framework Groupings

### 1. ITIL 4 - Service Value Chain Activities

Capabilities grouped by the **6 Service Value Chain activities**:

- **Plan** - Ensure shared understanding of vision, current status, and improvement direction
- **Improve** - Continually improve all products, services, and practices
- **Engage** - Provide transparency and good relationships with all stakeholders
- **Design & Transition** - Ensure products and services continually meet stakeholder expectations
- **Obtain/Build** - Ensure service components are available when and where needed
- **Deliver & Support** - Ensure services are delivered and supported according to agreed specifications

**Example mapping**:
- Service Value System → **Plan**
- General Management Practices → **Engage**
- Service Management Practices → **Deliver & Support**
- Technical Management Practices → **Obtain/Build**

**Color Scheme**:
- Plan: Purple
- Improve: Green
- Engage: Blue
- Design & Transition: Yellow
- Obtain/Build: Orange
- Deliver & Support: Cyan

---

### 2. COBIT 2019 - Five Domains

Capabilities grouped by **COBIT 2019 governance and management domains**:

- **EDM** - Evaluate, Direct and Monitor (Governance objectives for board and executives)
- **APO** - Align, Plan and Organize (Strategic alignment and planning)
- **BAI** - Build, Acquire and Implement (Solution delivery and change management)
- **DSS** - Deliver, Service and Support (Service operations and support)
- **MEA** - Monitor, Evaluate and Assess (Performance monitoring and compliance)

**Example mapping**:
- Governance System → **EDM**
- Governance & Management Objectives → Contains all 5 domains
- Design Factors → **APO**
- Performance Management → **MEA**

**Color Scheme**:
- EDM: Purple
- APO: Blue
- BAI: Green
- DSS: Orange
- MEA: Cyan

---

### 3. NIST CSF - Six Core Functions

Capabilities grouped by **NIST CSF 2.0 core functions**:

- **Govern** - Establish and monitor cybersecurity risk management strategy
- **Identify** - Understand cybersecurity risks to systems, assets, data, and capabilities
- **Protect** - Implement safeguards to prevent or reduce cybersecurity risks
- **Detect** - Find and analyze possible cybersecurity attacks and compromises
- **Respond** - Take action regarding detected cybersecurity incidents
- **Recover** - Restore assets and operations affected by cybersecurity incidents

**Example mapping**:
- All L0 capabilities (Govern, Identify, Protect, Detect, Respond, Recover) are grouped by their respective functions
- Sub-capabilities inherit their parent's function grouping

**Color Scheme**:
- Govern: Purple
- Identify: Blue
- Protect: Green
- Detect: Yellow
- Respond: Orange
- Recover: Cyan

---

### 4. ISO 27001:2022 - Clauses and Control Groups

Capabilities grouped by **ISO/IEC 27001:2022 structure**:

- **Context** - Understanding organization, interested parties, and ISMS scope (Clause 4)
- **Leadership** - Leadership commitment, policy, and organizational roles (Clause 5)
- **Planning** - Risk assessment, treatment, and objectives (Clause 6)
- **Support** - Resources, competence, awareness, communication (Clause 7)
- **Operation** - Operational planning, risk assessment and treatment (Clause 8)
- **Performance** - Monitoring, measurement, analysis, audit, review (Clause 9)
- **Improvement** - Nonconformity, corrective action, continual improvement (Clause 10)
- **Controls** - Annex A security controls (organizational, people, physical, technological)

**Example mapping**:
- Context of Organization → **Context**
- Leadership → **Leadership**
- Planning → **Planning**
- All Annex A controls → **Controls**

**Color Scheme**:
- Context: Purple
- Leadership: Blue
- Planning: Green
- Support: Yellow
- Operation: Orange
- Performance: Cyan
- Improvement: Teal
- Controls: Red

---

## Implementation Details

### Type System

The type system has been extended to support framework-specific groupings:

```typescript
// Generic capability type (backward compatible)
export type CapabilityType = 'strategic' | 'operational' | 'supporting' | string

// Framework-specific types
export type ITILValueChainActivity = 'plan' | 'improve' | 'engage' | 'design-transition' | 'obtain-build' | 'deliver-support'
export type COBITDomain = 'edm' | 'apo' | 'bai' | 'dss' | 'mea'
export type NISTCSFFunction = 'govern' | 'identify' | 'protect' | 'detect' | 'respond' | 'recover'
export type ISO27001Clause = 'context' | 'leadership' | 'planning' | 'support' | 'operation' | 'performance' | 'improvement' | 'controls'
```

### Capability Map Configuration

Each framework's capability map includes custom type configuration:

```typescript
export const itil4CapabilityMap: CapabilityMap = {
  // ... metadata
  typeDescriptions: {
    'plan': 'Ensure shared understanding of vision...',
    'improve': 'Continually improve all products...',
    // ... etc
  },
  customTypeConfig: {
    'plan': {
      label: 'Plan',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      headerBg: 'bg-purple-100',
      textColor: 'text-purple-900',
    },
    // ... etc
  },
  capabilities: [
    {
      id: 'itil4-svs',
      name: 'Service Value System',
      type: 'plan', // Uses ITIL-specific grouping
      // ...
    }
  ]
}
```

### Dynamic Rendering

The capability map viewer component now dynamically renders capability bands based on the unique types present in the capability map:

```typescript
// Get all unique capability types
const capabilityTypes = Array.from(new Set(
  capabilityMap.capabilities.filter(c => c.level === 0).map(c => c.type)
))

// Get type configuration (custom or default)
const capabilityTypeConfig = capabilityMap.customTypeConfig || DEFAULT_CAPABILITY_TYPE_CONFIG

// Render bands dynamically
{capabilityTypes.map(type => renderCapabilityBand(type))}
```

---

## Benefits

### 1. Framework Alignment
Capabilities are organized exactly as defined in the framework standard, making it easier for practitioners to navigate and understand.

### 2. Natural Workflow
Users familiar with the framework will find the capability groupings intuitive and aligned with how they already think about the framework.

### 3. Visual Clarity
Each grouping has a distinct color scheme that matches the framework's documentation and common representations.

### 4. Consistency
Within each framework, all related capabilities are grouped together, making it easier to assess maturity and plan improvements for specific framework areas.

---

## Migration from Generic Groupings

### Before (Generic)
```typescript
{
  type: 'strategic', // Generic classification
  // ...
}
```

### After (Framework-Specific)
```typescript
{
  type: 'plan', // ITIL 4 Value Chain activity
  // or
  type: 'edm', // COBIT domain
  // or
  type: 'govern', // NIST CSF function
  // or
  type: 'context', // ISO 27001 clause
  // ...
}
```

---

## Future Framework Additions

When adding new frameworks with capability maps, define appropriate groupings:

### ISO 9001:2015 Example
Would use quality management system clauses:
- Context
- Leadership
- Planning
- Support
- Operation
- Performance Evaluation
- Improvement

### SABSA Example
Would use SABSA layers:
- Contextual (Business View)
- Conceptual (Architect's View)
- Logical (Designer's View)
- Physical (Builder's View)
- Component (Tradesman's View)
- Operational (Facilities Manager View)

### FEAF Example
Would use reference models:
- Business Reference Model
- Service Component Reference Model
- Technical Reference Model
- Data Reference Model
- Performance Reference Model

---

## Best Practices

### 1. Use Framework Terminology
Always use the exact terms from the framework standard to maintain consistency and familiarity.

### 2. Logical Grouping
Group capabilities based on their primary function within the framework, not by arbitrary classifications.

### 3. Color Coding
Use distinct, professional colors for each grouping to aid visual navigation and pattern recognition.

### 4. Description Clarity
Provide clear, concise descriptions for each grouping that explain its purpose within the framework.

### 5. Consistent Mapping
Within a framework, ensure capabilities are consistently mapped to the appropriate grouping based on their primary focus.

---

## Visual Examples

### ITIL 4 Capability Map
```
┌─────────────────────────────────────────────────────────┐
│ Plan (Purple)                                           │
│ - Service Value System                                  │
│ - Service Value Chain                                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Engage (Blue)                                           │
│ - General Management Practices                          │
│ - Relationship Management                               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Deliver & Support (Cyan)                                │
│ - Service Management Practices                          │
│ - Incident Management, Problem Management, etc.         │
└─────────────────────────────────────────────────────────┘
```

### COBIT 2019 Capability Map
```
┌─────────────────────────────────────────────────────────┐
│ EDM - Evaluate, Direct, Monitor (Purple)                │
│ - Governance System                                      │
│ - EDM01, EDM02, EDM03, EDM04, EDM05                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ APO - Align, Plan, Organize (Blue)                      │
│ - Design Factors                                         │
│ - APO01, APO02, APO08, APO12, APO13                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ MEA - Monitor, Evaluate, Assess (Cyan)                  │
│ - Performance Management                                 │
│ - MEA objectives                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Summary

Framework-specific capability groupings provide a more authentic, intuitive, and practical way to organize and visualize enterprise capabilities. By using each framework's native structure, users can more easily map their organizational capabilities to industry standards and conduct meaningful maturity assessments.

**Key Takeaway**: Each framework speaks its own language. Capability maps now reflect that reality, making them more useful and actionable for practitioners.
