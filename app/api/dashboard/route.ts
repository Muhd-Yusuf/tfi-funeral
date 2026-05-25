import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Quote, Contact, Plan } from '@/lib/models'

export async function GET() {
  try {
    await connectDB()

    const [totalQuotes, newMessages, activePlans, recentQuotesData, recentMessagesData] =
      await Promise.all([
        Quote.countDocuments(),
        Contact.countDocuments({ status: 'new' }),
        Plan.countDocuments({ isActive: true }),
        Quote.find().sort({ createdAt: -1 }).limit(5).lean(),
        Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
      ])

    // Count total members as sum of numberOfMembers across converted quotes
    const memberAgg = await Quote.aggregate([
      { $match: { status: 'converted' } },
      { $group: { _id: null, total: { $sum: { $ifNull: ['$numberOfMembers', 1] } } } },
    ])
    const totalMembers = memberAgg.length > 0 ? memberAgg[0].total : 0

    return NextResponse.json({
      totalQuotes,
      newMessages,
      activePlans,
      totalMembers,
      recentQuotes: recentQuotesData,
      recentMessages: recentMessagesData,
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
