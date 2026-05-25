import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Contact from '@/lib/models/Contact'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await connectDB()
    const body = await req.json()
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true })
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }
    return NextResponse.json(contact)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    )
  }
}
