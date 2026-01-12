/**
 * Framework Capability Maps Index
 * Export all framework-specific capability maps
 */

export { iso27001CapabilityMap } from './iso-27001-capability-map'
export { nistCsfCapabilityMap } from './nist-csf-capability-map'
export { cobit2019CapabilityMap } from './cobit-2019-capability-map'
export { itil4CapabilityMap } from './itil4-capability-map'
export { pcfCapabilityMap } from './pcf-capability-map'
export { iso9001CapabilityMap } from './iso-9001-capability-map'
export { feafCapabilityMap } from './feaf-capability-map'
export { sabsaCapabilityMap } from './sabsa-capability-map'

/**
 * Get capability map by framework slug
 */
export function getFrameworkCapabilityMap(frameworkSlug: string) {
  const maps: Record<string, any> = {
    'iso-27001': () => import('./iso-27001-capability-map').then(m => m.iso27001CapabilityMap),
    'nist-csf': () => import('./nist-csf-capability-map').then(m => m.nistCsfCapabilityMap),
    'cobit-2019': () => import('./cobit-2019-capability-map').then(m => m.cobit2019CapabilityMap),
    'itil4': () => import('./itil4-capability-map').then(m => m.itil4CapabilityMap),
    'pcf': () => import('./pcf-capability-map').then(m => m.pcfCapabilityMap),
    'iso-9001': () => import('./iso-9001-capability-map').then(m => m.iso9001CapabilityMap),
    'feaf': () => import('./feaf-capability-map').then(m => m.feafCapabilityMap),
    'sabsa': () => import('./sabsa-capability-map').then(m => m.sabsaCapabilityMap),
  }

  return maps[frameworkSlug]?.() || null
}

/**
 * Check if framework has a capability map
 */
export function hasCapabilityMap(frameworkSlug: string): boolean {
  return ['iso-27001', 'nist-csf', 'cobit-2019', 'itil4', 'pcf', 'iso-9001', 'feaf', 'sabsa'].includes(frameworkSlug)
}

/**
 * Get all framework slugs with capability maps
 */
export function getFrameworksWithCapabilityMaps(): string[] {
  return ['iso-27001', 'nist-csf', 'cobit-2019', 'itil4', 'pcf', 'iso-9001', 'feaf', 'sabsa']
}
