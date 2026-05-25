import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Quote from '@/lib/models/Quote'

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
    const quote = await Quote.findByIdAndUpdate(id, body, { new: true })
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
    }
    return NextResponse.json(quote)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update quote' },
      { status: 500 }
    )
  }
}
