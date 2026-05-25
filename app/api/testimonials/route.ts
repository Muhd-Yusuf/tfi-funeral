import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Testimonial from '@/lib/models/Testimonial'

export async function GET() {
  try {
    await connectDB()
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 })
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
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
    const testimonial = await Testimonial.create(body)
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}
