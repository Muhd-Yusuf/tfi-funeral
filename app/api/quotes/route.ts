import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Quote from '@/lib/models/Quote'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const quotes = await Quote.find({}).sort({ createdAt: -1 })
    return NextResponse.json(quotes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const quote = await Quote.create(body)
    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    )
  }
}
