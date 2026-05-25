import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import FAQ from '@/lib/models/FAQ'

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
    const faq = await FAQ.findByIdAndUpdate(id, body, { new: true })
    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }
    return NextResponse.json(faq)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
      { status: 500 }
    )
  }
}

export async function DELETE(
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
    const faq = await FAQ.findByIdAndDelete(id)
    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'FAQ deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    )
  }
}
