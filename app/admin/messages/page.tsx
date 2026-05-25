'use client'

import { useEffect, useState } from 'react'
import {
  MessageSquare,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  X,
} from 'lucide-react'
import DataTable from '@/components/admin/DataTable'
import Modal from '@/components/admin/Modal'

interface Contact {
  _id: string
  name: string
  phone: string
  email?: string
  message: string
  planInterest?: string
  status: 'new' | 'contacted' | 'resolved'
  createdAt: string
}

export default function MessagesPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [])

  async function fetchContacts() {
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()
      setContacts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchContacts()
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, status: status as Contact['status'] })
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  function openDetail(contact: Contact) {
    setSelectedMessage(contact)
    setDetailOpen(true)
  }

  function getWhatsAppLink(phone: string, name: string) {
    const cleanPhone = phone.replace(/[^0-9]/g, '')
    const message = encodeURIComponent(
      `Hi ${name}, thank you for contacting TFI Burial Society. `
    )
    return `https://wa.me/${cleanPhone}?text=${message}`
  }

  const filteredContacts =
    filter === 'all'
      ? contacts
      : contacts.filter((c) => c.status === filter)

  const statusCounts = {
    all: contacts.length,
    new: contacts.filter((c) => c.status === 'new').length,
    contacted: contacts.filter((c) => c.status === 'contacted').length,
    resolved: contacts.filter((c) => c.status === 'resolved').length,
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
        <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
        <p className="text-sm text-gray-400">
          View and manage contact form submissions
        </p>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'new', 'contacted', 'resolved'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-[#3B82F6] text-white'
                : 'border border-[#2A3545] text-gray-400 hover:bg-[#1A2332]'
            }`}
          >
            {status === 'new' && <AlertCircle className="h-4 w-4" />}
            {status === 'contacted' && <Clock className="h-4 w-4" />}
            {status === 'resolved' && <CheckCircle className="h-4 w-4" />}
            <span className="capitalize">{status}</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs ${
                filter === status
                  ? 'bg-white/20'
                  : 'bg-[#2A3545]'
              }`}
            >
              {statusCounts[status]}
            </span>
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {filteredContacts.length === 0 ? (
          <div className="rounded-xl border border-[#2A3545] bg-[#1A2332] p-8 text-center">
            <MessageSquare className="mx-auto mb-2 h-8 w-8 text-gray-600" />
            <p className="text-gray-500">No messages found</p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact._id}
              className="rounded-xl border border-[#2A3545] bg-[#1A2332] p-4 transition-colors hover:border-[#3B82F6]/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-white">{contact.name}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        contact.status === 'new'
                          ? 'bg-red-500/10 text-red-400'
                          : contact.status === 'contacted'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-green-500/10 text-green-400'
                      }`}
                    >
                      {contact.status}
                    </span>
                    {contact.planInterest && (
                      <span className="rounded bg-[#3B82F6]/10 px-2 py-0.5 text-xs text-[#3B82F6]">
                        {contact.planInterest}
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {contact.phone}
                    </span>
                    {contact.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {contact.email}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-300 line-clamp-2">
                    {contact.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="ml-4 flex items-center gap-2">
                  <button
                    onClick={() => openDetail(contact)}
                    className="rounded-lg border border-[#2A3545] p-2 text-gray-400 transition-colors hover:bg-[#2A3545] hover:text-white"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <a
                    href={getWhatsAppLink(contact.phone, contact.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-green-500/20 p-2 text-green-400 transition-colors hover:bg-green-500/10"
                    title="Reply via WhatsApp"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Detail Modal */}
      <Modal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        title="Message Details"
        size="md"
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400">Name</label>
                <p className="text-sm text-white">{selectedMessage.name}</p>
              </div>
              <div>
                <label className="text-xs text-gray-400">Phone</label>
                <p className="text-sm text-white">{selectedMessage.phone}</p>
              </div>
              {selectedMessage.email && (
                <div>
                  <label className="text-xs text-gray-400">Email</label>
                  <p className="text-sm text-white">{selectedMessage.email}</p>
                </div>
              )}
              {selectedMessage.planInterest && (
                <div>
                  <label className="text-xs text-gray-400">
                    Plan Interest
                  </label>
                  <p className="text-sm text-white">
                    {selectedMessage.planInterest}
                  </p>
                </div>
              )}
              <div>
                <label className="text-xs text-gray-400">Date</label>
                <p className="text-sm text-white">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400">Message</label>
              <p className="mt-1 rounded-lg border border-[#2A3545] bg-[#0F1729] p-3 text-sm text-gray-300">
                {selectedMessage.message}
              </p>
            </div>

            {/* Status Update */}
            <div>
              <label className="mb-2 block text-xs text-gray-400">
                Update Status
              </label>
              <div className="flex gap-2">
                {(['new', 'contacted', 'resolved'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      updateStatus(selectedMessage._id, status)
                    }
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      selectedMessage.status === status
                        ? status === 'new'
                          ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/50'
                          : status === 'contacted'
                          ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50'
                          : 'bg-green-500/20 text-green-400 ring-1 ring-green-500/50'
                        : 'border border-[#2A3545] text-gray-400 hover:bg-[#2A3545]'
                    }`}
                  >
                    <span className="capitalize">{status}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* WhatsApp Reply */}
            <div className="border-t border-[#2A3545] pt-4">
              <a
                href={getWhatsAppLink(
                  selectedMessage.phone,
                  selectedMessage.name
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                <Phone className="h-4 w-4" />
                Reply via WhatsApp
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
