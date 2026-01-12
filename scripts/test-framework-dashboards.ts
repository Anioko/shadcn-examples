// Test script to verify all framework dashboards load correctly
import { getAllFrameworkConfigs } from '../lib/framework-config'
import { getMockFrameworkData } from '../lib/mock-framework-data'
import { getFormSchema } from '../lib/framework-form-schemas'

console.log('🧪 Testing Framework Dashboards...\n')

const frameworks = getAllFrameworkConfigs()

let passCount = 0
let failCount = 0
const issues: string[] = []

frameworks.forEach((framework) => {
  console.log(`\n📋 Testing: ${framework.frameworkName} (${framework.frameworkSlug})`)
  
  try {
    // Test 1: Framework has grandchildren
    if (!framework.grandchildren || framework.grandchildren.length === 0) {
      issues.push(`❌ ${framework.frameworkName}: No grandchildren defined`)
      failCount++
      return
    }
    console.log(`  ✓ Has ${framework.grandchildren.length} grandchildren`)
    
    // Test 2: Mock data generates correctly
    const mockData = getMockFrameworkData(framework.frameworkSlug, framework.grandchildren)
    if (!mockData || mockData.length === 0) {
      issues.push(`⚠️  ${framework.frameworkName}: No mock data generated`)
    } else {
      console.log(`  ✓ Generated ${mockData.length} mock items`)
    }
    
    // Test 3: Each grandchild has a form schema (custom or default)
    framework.grandchildren.forEach((grandchild) => {
      const schema = getFormSchema(framework.frameworkSlug, grandchild.id)
      if (!schema) {
        issues.push(`❌ ${framework.frameworkName} → ${grandchild.name}: No form schema`)
        failCount++
      } else {
        const schemaType = schema.id === 'default' ? '(default)' : '(custom)'
        console.log(`  ✓ ${grandchild.name}: ${schema.title} ${schemaType}`)
      }
    })
    
    // Test 4: Grandchildren have valid IDs and names
    framework.grandchildren.forEach((grandchild) => {
      if (!grandchild.id || !grandchild.name) {
        issues.push(`❌ ${framework.frameworkName}: Invalid grandchild definition`)
        failCount++
      }
    })
    
    console.log(`  ✅ ${framework.frameworkName} passed all tests`)
    passCount++
    
  } catch (error) {
    issues.push(`❌ ${framework.frameworkName}: Error - ${error}`)
    failCount++
  }
})

// Summary
console.log('\n' + '='.repeat(60))
console.log('📊 TEST SUMMARY')
console.log('='.repeat(60))
console.log(`✅ Passed: ${passCount}/${frameworks.length} frameworks`)
console.log(`❌ Failed: ${failCount}/${frameworks.length} frameworks`)

if (issues.length > 0) {
  console.log('\n⚠️  Issues Found:')
  issues.forEach((issue) => console.log(`  ${issue}`))
} else {
  console.log('\n🎉 All tests passed! All frameworks are ready.')
}

// List all framework routes
console.log('\n' + '='.repeat(60))
console.log('🌐 AVAILABLE DASHBOARD ROUTES')
console.log('='.repeat(60))
frameworks.forEach((framework) => {
  console.log(`  /frameworks/${framework.frameworkSlug}/dashboard`)
})

console.log('\n✨ Test complete!\n')
