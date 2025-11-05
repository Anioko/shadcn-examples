import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET table data for a specific framework grandchild
export async function GET(
  request: Request,
  { params }: { params: { slug: string; grandchildId: string } }
) {
  try {
    const { slug, grandchildId } = params
    
    // TODO: Get organizationId from session/auth
    // For now using a placeholder - replace with actual auth
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
      },
      include: {
        tableData: {
          where: {
            grandchildId: grandchildId
          }
        }
      }
    })
    
    if (!orgFramework) {
      // Create organization framework if it doesn't exist
      orgFramework = await prisma.organizationFramework.create({
        data: {
          organizationId,
          frameworkTemplateId: template.id,
          status: 'PLANNING'
        },
        include: {
          tableData: true
        }
      })
    }
    
    const tableData = orgFramework.tableData[0]
    
    return NextResponse.json({
      data: tableData?.data || [],
      grandchildId: grandchildId
    })
  } catch (error) {
    console.error('Error fetching table data:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

// POST/PUT - Update table data
export async function POST(
  request: Request,
  { params }: { params: { slug: string; grandchildId: string } }
) {
  try {
    const { slug, grandchildId } = params
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
    
    // Upsert table data
    const tableData = await prisma.frameworkTableData.upsert({
      where: {
        organizationFrameworkId_grandchildId: {
          organizationFrameworkId: orgFramework.id,
          grandchildId: grandchildId
        }
      },
      create: {
        organizationFrameworkId: orgFramework.id,
        grandchildId: grandchildId,
        data: body.data
      },
      update: {
        data: body.data
      }
    })
    
    return NextResponse.json(tableData)
  } catch (error) {
    console.error('Error updating table data:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
