'use client'

import { useEffect, useState } from 'react'
import {
  ClipboardList,
  MessageSquare,
  Shield,
  Users,
  ArrowRight,
  Phone,
} from 'lucide-react'
import StatsCard from '@/components/admin/StatsCard'
import Link from 'next/link'

interface DashboardStats {
  totalQuotes: number
  newMessages: number
  activePlans: number
  totalMembers: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalQuotes: 0,
    newMessages: 0,
    activePlans: 0,
    totalMembers: 0,
  })
  const [recentQuotes, setRecentQuotes] = useState<any[]>([])
  const [recentMessages, setRecentMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    try {
      const [quotesRes, messagesRes, plansRes] = await Promise.all([
        fetch('/api/quotes'),
        fetch('/api/contact'),
        fetch('/api/plans'),
      ])

      const quotes = await quotesRes.json()
      const messages = await messagesRes.json()
      const plans = await plansRes.json()

      const quotesArr = Array.isArray(quotes) ? quotes : []
      const messagesArr = Array.isArray(messages) ? messages : []
      const plansArr = Array.isArray(plans) ? plans : []

      setStats({
        totalQuotes: quotesArr.length,
        newMessages: messagesArr.filter((m: any) => m.status === 'new').length,
        activePlans: plansArr.filter((p: any) => p.isActive).length,
        totalMembers: quotesArr.filter((q: any) => q.status === 'converted')
          .length,
      })

      setRecentQuotes(quotesArr.slice(0, 5))
      setRecentMessages(messagesArr.slice(0, 5))
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3B82F6] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-sm text-gray-400">
          Welcome to the TFI Burial Society admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Quotes"
          value={stats.totalQuotes}
          icon={ClipboardList}
          change="+12% from last month"
          changeType="positive"
        />
        <StatsCard
          title="New Messages"
          value={stats.newMessages}
          icon={MessageSquare}
          change="Requires attention"
          changeType={stats.newMessages > 0 ? 'negative' : 'neutral'}
        />
        <StatsCard
          title="Active Plans"
          value={stats.activePlans}
          icon={Shield}
        />
        <StatsCard
          title="Members"
          value={stats.totalMembers}
          icon={Users}
          change="Converted leads"
          changeType="positive"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/admin/plans"
          className="flex items-center justify-between rounded-xl border border-[#2A3545] bg-[#1A2332] p-4 transition-colors hover:border-[#3B82F6]/50"
        >
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-[#3B82F6]" />
            <span className="text-sm font-medium text-white">
              Manage Plans
            </span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </Link>
        <Link
          href="/admin/messages"
          className="flex items-center justify-between rounded-xl border border-[#2A3545] bg-[#1A2332] p-4 transition-colors hover:border-[#3B82F6]/50"
        >
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-[#3B82F6]" />
            <span className="text-sm font-medium text-white">
              View Messages
            </span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </Link>
        <Link
          href="/admin/testimonials"
          className="flex items-center justify-between rounded-xl border border-[#2A3545] bg-[#1A2332] p-4 transition-colors hover:border-[#3B82F6]/50"
        >
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-[#3B82F6]" />
            <span className="text-sm font-medium text-white">
              Testimonials
            </span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Quotes */}
        <div className="rounded-xl border border-[#2A3545] bg-[#1A2332] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Recent Quotes
            </h2>
            <Link
              href="/admin/quotes"
              className="text-sm text-[#3B82F6] hover:underline"
            >
              View all
            </Link>
          </div>
          {recentQuotes.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-500">
              No quotes yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentQuotes.map((quote: any) => (
                <div
                  key={quote._id}
                  className="flex items-center justify-between rounded-lg border border-[#2A3545] bg-[#0F1729] p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {quote.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {quote.planType} - R{quote.coverAmount?.toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      quote.status === 'pending'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : quote.status === 'contacted'
                        ? 'bg-blue-500/10 text-blue-400'
                        : quote.status === 'converted'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-gray-500/10 text-gray-400'
                    }`}
                  >
                    {quote.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="rounded-xl border border-[#2A3545] bg-[#1A2332] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Recent Messages
            </h2>
            <Link
              href="/admin/messages"
              className="text-sm text-[#3B82F6] hover:underline"
            >
              View all
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-500">
              No messages yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg: any) => (
                <div
                  key={msg._id}
                  className="flex items-center justify-between rounded-lg border border-[#2A3545] bg-[#0F1729] p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {msg.name}
                    </p>
                    <p className="line-clamp-1 text-xs text-gray-400">
                      {msg.message}
                    </p>
                  </div>
                  <div className="ml-3 flex items-center gap-2">
                    <a
                      href={`https://wa.me/${msg.phone?.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-1.5 text-green-400 transition-colors hover:bg-green-500/10"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        msg.status === 'new'
                          ? 'bg-red-500/10 text-red-400'
                          : msg.status === 'contacted'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-green-500/10 text-green-400'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
