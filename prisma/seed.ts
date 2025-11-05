import { PrismaClient, FrameworkCategory, FrameworkDomain, FrameworkComplexity } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')
  
  // Seed framework templates based on existing configurations
  const frameworks: Array<{
    frameworkId: string
    name: string
    version: string
    description: string
    category: FrameworkCategory
    domain: FrameworkDomain
    complexity: FrameworkComplexity
    implementationTime: string
    isActive: boolean
    isPublic: boolean
  }> = [
    {
      frameworkId: 'togaf',
      name: 'TOGAF ADM',
      version: '9.2',
      description: 'The Open Group Architecture Framework - Architecture Development Method',
      category: 'ENTERPRISE_ARCHITECTURE',
      domain: 'STRATEGIC',
      complexity: 'HIGH',
      implementationTime: '6-12 months',
      isActive: true,
      isPublic: true
    },
    {
      frameworkId: 'iso-27001',
      name: 'ISO/IEC 27001:2022',
      version: '2022',
      description: 'Information Security Management System standard',
      category: 'SECURITY_FRAMEWORKS',
      domain: 'REGULATORY',
      complexity: 'HIGH',
      implementationTime: '6-12 months',
      isActive: true,
      isPublic: true
    },
    {
      frameworkId: 'itil4',
      name: 'ITIL 4',
      version: '4.0',
      description: 'IT Infrastructure Library - IT Service Management framework',
      category: 'IT_GOVERNANCE',
      domain: 'OPERATIONAL',
      complexity: 'MEDIUM',
      implementationTime: '3-6 months',
      isActive: true,
      isPublic: true
    },
    {
      frameworkId: 'pcf',
      name: 'Process Classification Framework (PCF)',
      version: '8.0',
      description: 'APQC Process Classification Framework for business processes',
      category: 'PROCESS_MANAGEMENT',
      domain: 'OPERATIONAL',
      complexity: 'MEDIUM',
      implementationTime: '2-4 months',
      isActive: true,
      isPublic: true
    },
    {
      frameworkId: 'archimate',
      name: 'ArchiMate 3.2',
      version: '3.2',
      description: 'Enterprise architecture modeling language',
      category: 'ENTERPRISE_ARCHITECTURE',
      domain: 'TECHNICAL',
      complexity: 'HIGH',
      implementationTime: '4-8 months',
      isActive: true,
      isPublic: true
    },
    {
      frameworkId: 'scrum',
      name: 'Scrum',
      version: '2020',
      description: 'Agile framework for developing and sustaining complex products',
      category: 'AGILE_METHODOLOGIES',
      domain: 'TACTICAL',
      complexity: 'LOW',
      implementationTime: '1-2 months',
      isActive: true,
      isPublic: true
    },
    {
      frameworkId: 'safe',
      name: 'SAFe (Scaled Agile Framework)',
      version: '6.0',
      description: 'Scaled Agile Framework for enterprise agility',
      category: 'AGILE_METHODOLOGIES',
      domain: 'STRATEGIC',
      complexity: 'HIGH',
      implementationTime: '6-12 months',
      isActive: true,
      isPublic: true
    },
    {
      frameworkId: 'nist-csf',
      name: 'NIST Cybersecurity Framework 2.0',
      version: '2.0',
      description: 'Framework for improving critical infrastructure cybersecurity',
      category: 'SECURITY_FRAMEWORKS',
      domain: 'REGULATORY',
      complexity: 'MEDIUM',
      implementationTime: '4-8 months',
      isActive: true,
      isPublic: true
    },
    {
      frameworkId: 'cobit-2019',
      name: 'COBIT 2019',
      version: '2019',
      description: 'Framework for governance and management of enterprise IT',
      category: 'IT_GOVERNANCE',
      domain: 'GOVERNANCE',
      complexity: 'HIGH',
      implementationTime: '6-12 months',
      isActive: true,
      isPublic: true
    },
    {
      frameworkId: 'application-capability-model',
      name: 'Application Capability Model',
      version: '1.0',
      description: 'Framework for mapping application capabilities and technical architecture',
      category: 'ENTERPRISE_ARCHITECTURE',
      domain: 'TECHNICAL',
      complexity: 'MEDIUM',
      implementationTime: '2-4 months',
      isActive: true,
      isPublic: true
    }
  ]
  
  for (const framework of frameworks) {
    await prisma.frameworkTemplate.upsert({
      where: { frameworkId: framework.frameworkId },
      create: framework,
      update: framework
    })
    console.log(`✅ Seeded framework: ${framework.name}`)
  }
  
  // Create a default organization for testing
  const defaultOrg = await prisma.organization.upsert({
    where: { id: 'default-org' },
    create: {
      id: 'default-org',
      name: 'Default Organization',
      slug: 'default-org'
    },
    update: {}
  })
  console.log(`✅ Created default organization: ${defaultOrg.name}`)
  
  console.log('🎉 Database seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
