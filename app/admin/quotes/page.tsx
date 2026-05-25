'use client'

import { useState, useEffect, useCallback, Fragment } from 'react'

interface Quote {
  _id: string
  name: string
  phone: string
  email?: string
  planType: string
  coverAmount: number
  ageGroup: string
  numberOfMembers?: number
  status: 'pending' | 'contacted' | 'converted' | 'closed'
  notes?: string
  createdAt: string
  updatedAt: string
}

const statusColors: Record<Quote['status'], { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Pending' },
  contacted: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Contacted' },
  converted: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Converted' },
  closed: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Closed' },
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState<{ id: string; notes: string } | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filterStatus !== 'all') params.set('status', filterStatus)
      if (searchQuery) params.set('search', searchQuery)

      const res = await fetch(`/api/quotes?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setQuotes(data.quotes || data)
      }
    } catch (error) {
      console.error('Failed to fetch quotes:', error)
    } finally {
      setLoading(false)
    }
  }, [filterStatus, searchQuery])

  useEffect(() => {
    fetchQuotes()
  }, [fetchQuotes])

  const updateStatus = async (quoteId: string, newStatus: Quote['status']) => {
    setUpdatingStatus(quoteId)
    try {
      const res = await fetch(`/api/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setQuotes((prev) =>
          prev.map((q) => (q._id === quoteId ? { ...q, status: newStatus } : q))
        )
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    } finally {
      setUpdatingStatus(null)
    }
  }

  const saveNotes = async (quoteId: string, notes: string) => {
    try {
      const res = await fetch(`/api/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      })
      if (res.ok) {
        setQuotes((prev) =>
          prev.map((q) => (q._id === quoteId ? { ...q, notes } : q))
        )
        setEditingNotes(null)
      }
    } catch (error) {
      console.error('Failed to save notes:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatCurrency = (amount: number) => {
    return `R${amount.toLocaleString()}`
  }

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      !searchQuery ||
      quote.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.phone.includes(searchQuery)
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Quote Requests</h1>
        <p className="text-gray-400 mt-1">Manage and track all incoming quote requests</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#1A2332] border border-[#2A3545] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'contacted', 'converted', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                filterStatus === status
                  ? 'bg-[#3B82F6] text-white'
                  : 'bg-[#1A2332] text-gray-400 border border-[#2A3545] hover:border-[#3B82F6]/50'
              }`}
            >
              {status === 'all' ? 'All' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {(['pending', 'contacted', 'converted', 'closed'] as const).map((status) => {
          const count = quotes.filter((q) => q.status === status).length
          const { bg, text, label } = statusColors[status]
          return (
            <div key={status} className="bg-[#1A2332] border border-[#2A3545] rounded-lg p-4">
              <div className={`text-2xl font-bold ${text}`}>{count}</div>
              <div className="text-gray-400 text-sm mt-1">{label}</div>
            </div>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-[#1A2332] border border-[#2A3545] rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B82F6]" />
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No quotes found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A3545]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Plan Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cover Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Age Group</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A3545]">
                {filteredQuotes.map((quote) => (
                  <Fragment key={quote._id}>
                    <tr
                      className="hover:bg-[#1E2A3E] transition-colors cursor-pointer"
                      onClick={() =>
                        setExpandedQuote(expandedQuote === quote._id ? null : quote._id)
                      }
                    >
                      <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                        {formatDate(quote.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-white font-medium whitespace-nowrap">
                        {quote.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                        {quote.phone}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap capitalize">
                        {quote.planType}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                        {formatCurrency(quote.coverAmount)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                        {quote.ageGroup}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[quote.status].bg} ${statusColors[quote.status].text}`}
                        >
                          {statusColors[quote.status].label}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={quote.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateStatus(quote._id, e.target.value as Quote['status'])}
                          disabled={updatingStatus === quote._id}
                          className="bg-[#0F1729] border border-[#2A3545] text-gray-300 text-xs rounded-md px-2 py-1 focus:outline-none focus:border-[#3B82F6] disabled:opacity-50"
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {expandedQuote === quote._id && (
                      <tr className="bg-[#0F1729]">
                        <td colSpan={8} className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Details */}
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-white">Quote Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Full Name:</span>
                                  <span className="text-white">{quote.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Phone:</span>
                                  <span className="text-white">{quote.phone}</span>
                                </div>
                                {quote.email && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Email:</span>
                                    <span className="text-white">{quote.email}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Plan Type:</span>
                                  <span className="text-white capitalize">{quote.planType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Cover Amount:</span>
                                  <span className="text-white">{formatCurrency(quote.coverAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Age Group:</span>
                                  <span className="text-white">{quote.ageGroup}</span>
                                </div>
                                {quote.numberOfMembers && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Members:</span>
                                    <span className="text-white">{quote.numberOfMembers}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Submitted:</span>
                                  <span className="text-white">
                                    {new Date(quote.createdAt).toLocaleString('en-ZA')}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-white">Notes</h4>
                              {editingNotes?.id === quote._id ? (
                                <div className="space-y-2">
                                  <textarea
                                    value={editingNotes.notes}
                                    onChange={(e) =>
                                      setEditingNotes({ ...editingNotes, notes: e.target.value })
                                    }
                                    rows={4}
                                    className="w-full px-3 py-2 bg-[#1A2332] border border-[#2A3545] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] resize-none"
                                    placeholder="Add notes about this quote..."
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => saveNotes(quote._id, editingNotes.notes)}
                                      className="px-3 py-1.5 bg-[#3B82F6] text-white text-xs rounded-md hover:bg-[#2563EB] transition-colors"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditingNotes(null)}
                                      className="px-3 py-1.5 bg-[#2A3545] text-gray-300 text-xs rounded-md hover:bg-[#3A4555] transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setEditingNotes({ id: quote._id, notes: quote.notes || '' })
                                  }}
                                  className="min-h-[80px] px-3 py-2 bg-[#1A2332] border border-[#2A3545] rounded-lg text-sm text-gray-300 cursor-text hover:border-[#3B82F6]/50 transition-colors"
                                >
                                  {quote.notes || (
                                    <span className="text-gray-500 italic">Click to add notes...</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
