import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import FAQ from '@/lib/models/FAQ'

export async function GET() {
  try {
    await connectDB()
    const faqs = await FAQ.find({}).sort({ order: 1 })
    return NextResponse.json(faqs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await req.json()

    // Auto-set order to last position
    const lastFaq = await FAQ.findOne({}).sort({ order: -1 })
    body.order = lastFaq ? lastFaq.order + 1 : 0

    const faq = await FAQ.create(body)
    return NextResponse.json(faq, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    )
  }
}
