import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import SiteContent from '@/lib/models/SiteContent'

export async function GET() {
  try {
    await connectDB()
    const content = await SiteContent.find({})
    return NextResponse.json(content)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch site content' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await req.json()

    // body can be a single item or array
    const items = Array.isArray(body) ? body : [body]
    const results = []

    for (const item of items) {
      const { key, ...data } = item
      const content = await SiteContent.findOneAndUpdate(
        { key },
        { key, ...data },
        { new: true, upsert: true }
      )
      results.push(content)
    }

    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update site content' },
      { status: 500 }
    )
  }
}
