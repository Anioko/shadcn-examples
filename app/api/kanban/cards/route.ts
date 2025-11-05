import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// POST - Create a new kanban card
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const card = await prisma.kanbanCard.create({
      data: {
        boardId: body.boardId,
        columnId: body.columnId,
        title: body.title,
        description: body.description,
        priority: body.priority,
        assignee: body.assignee,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        tags: body.tags || [],
        metadata: body.metadata || null,
        position: body.position || 0
      }
    })
    
    return NextResponse.json(card)
  } catch (error) {
    console.error('Error creating card:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

// PUT - Update an existing kanban card
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Card ID is required' }, 
        { status: 400 }
      )
    }
    
    // Convert dueDate if present
    if (data.dueDate) {
      data.dueDate = new Date(data.dueDate)
    }
    
    const card = await prisma.kanbanCard.update({
      where: { id },
      data
    })
    
    return NextResponse.json(card)
  } catch (error) {
    console.error('Error updating card:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

// DELETE - Delete a kanban card
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Card ID is required' }, 
        { status: 400 }
      )
    }
    
    await prisma.kanbanCard.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting card:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
