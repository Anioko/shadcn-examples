import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET capability map data for a framework
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    
    // TODO: Get organizationId from session/auth
    const organizationId = 'default-org'
    
    // Find framework template
    const template = await prisma.frameworkTemplate.findFirst({
      where: { frameworkId: slug }
    })
    
    if (!template) {
      return NextResponse.json({ error: 'Framework not found' }, { status: 404 })
    }
    
    // Find organization framework
    const orgFramework = await prisma.organizationFramework.findFirst({
      where: {
        organizationId,
        frameworkTemplateId: template.id
      },
      include: {
        capabilityMaps: true
      }
    })
    
    if (!orgFramework?.capabilityMaps[0]) {
      // Return empty capability structure
      return NextResponse.json({
        capabilities: []
      })
    }
    
    return NextResponse.json({
      id: orgFramework.capabilityMaps[0].id,
      capabilities: orgFramework.capabilityMaps[0].capabilities
    })
  } catch (error) {
    console.error('Error fetching capability map:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

// POST - Create or update capability map
export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const body = await request.json()
    
    // TODO: Get organizationId from session/auth
    const organizationId = 'default-org'
    
    // Find framework template
    const template = await prisma.frameworkTemplate.findFirst({
      where: { frameworkId: slug }
    })
    
    if (!template) {
      return NextResponse.json({ error: 'Framework not found' }, { status: 404 })
    }
    
    // Find or create organization framework
    let orgFramework = await prisma.organizationFramework.findFirst({
      where: {
        organizationId,
        frameworkTemplateId: template.id
      }
    })
    
    if (!orgFramework) {
      orgFramework = await prisma.organizationFramework.create({
        data: {
          organizationId,
          frameworkTemplateId: template.id,
          status: 'PLANNING'
        }
      })
    }
    
    // Upsert capability map
    const capabilityMap = await prisma.capabilityMapData.upsert({
      where: {
        organizationFrameworkId_frameworkSlug: {
          organizationFrameworkId: orgFramework.id,
          frameworkSlug: slug
        }
      },
      create: {
        organizationFrameworkId: orgFramework.id,
        frameworkSlug: slug,
        capabilities: body.capabilities
      },
      update: {
        capabilities: body.capabilities
      }
    })
    
    return NextResponse.json(capabilityMap)
  } catch (error) {
    console.error('Error updating capability map:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
