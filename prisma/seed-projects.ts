import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding projects...')

  // First, ensure we have an organization
  const org = await prisma.organization.upsert({
    where: { id: 'default-org' },
    update: {},
    create: {
      id: 'default-org',
      name: 'Default Organization',
      industry: 'Technology',
      size: 'medium',
    },
  })

  console.log(`Organization: ${org.name}`)

  // Create sample projects
  const projects = [
    {
      id: 'proj-ea-transformation',
      name: 'Enterprise Architecture Transformation',
      description: 'Modernize the enterprise architecture using TOGAF ADM methodology',
      status: 'active',
      priority: 'critical',
      organizationId: org.id,
      completionRate: 45,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2025-06-30'),
      budget: 2500000,
    },
    {
      id: 'proj-data-governance',
      name: 'Data Governance Initiative',
      description: 'Implement DAMA-DMBOK data governance framework across the organization',
      status: 'active',
      priority: 'high',
      organizationId: org.id,
      completionRate: 67,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2025-03-31'),
      budget: 850000,
    },
    {
      id: 'proj-security-compliance',
      name: 'ISO 27001 Compliance Program',
      description: 'Achieve ISO 27001:2022 certification for information security',
      status: 'active',
      priority: 'high',
      organizationId: org.id,
      completionRate: 34,
      startDate: new Date('2024-05-01'),
      endDate: new Date('2025-12-31'),
      budget: 650000,
    },
    {
      id: 'proj-cloud-migration',
      name: 'Cloud Migration Strategy',
      description: 'Migrate legacy applications to AWS following Well-Architected Framework',
      status: 'planning',
      priority: 'medium',
      organizationId: org.id,
      completionRate: 12,
      startDate: new Date('2024-11-01'),
      endDate: new Date('2026-06-30'),
      budget: 3200000,
    },
    {
      id: 'proj-digital-transformation',
      name: 'Digital Customer Experience',
      description: 'Transform customer touchpoints using design thinking and agile methodologies',
      status: 'active',
      priority: 'critical',
      organizationId: org.id,
      completionRate: 58,
      startDate: new Date('2024-02-15'),
      endDate: new Date('2025-08-31'),
      budget: 1750000,
    },
    {
      id: 'proj-business-process',
      name: 'Business Process Optimization',
      description: 'Optimize core business processes using BPMN 2.0 and Lean Six Sigma',
      status: 'on-hold',
      priority: 'medium',
      organizationId: org.id,
      completionRate: 28,
      startDate: new Date('2024-04-01'),
      endDate: new Date('2025-04-30'),
      budget: 480000,
    },
    {
      id: 'proj-archimate-repository',
      name: 'ArchiMate Repository Setup',
      description: 'Build comprehensive ArchiMate 3.2 repository for architecture models',
      status: 'completed',
      priority: 'low',
      organizationId: org.id,
      completionRate: 100,
      startDate: new Date('2023-09-01'),
      endDate: new Date('2024-02-28'),
      budget: 320000,
    },
  ]

  for (const projectData of projects) {
    const project = await prisma.project.upsert({
      where: { id: projectData.id },
      update: projectData,
      create: projectData,
    })
    console.log(`✓ Created/Updated project: ${project.name} (${project.status})`)
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
