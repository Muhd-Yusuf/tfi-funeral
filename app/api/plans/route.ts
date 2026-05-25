import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Plan from '@/lib/models/Plan'

export async function GET() {
  try {
    await connectDB()
    const plans = await Plan.find({}).sort({ order: 1, createdAt: -1 })
    return NextResponse.json(plans)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
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
    const plan = await Plan.create(body)
    return NextResponse.json(plan, { status: 201 })
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A plan with this slug already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create plan' },
      { status: 500 }
    )
  }
}
