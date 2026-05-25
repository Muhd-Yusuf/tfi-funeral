'use client'

import { useEffect, useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Save,
} from 'lucide-react'
import Modal from '@/components/admin/Modal'

interface FAQ {
  _id: string
  question: string
  answer: string
  order: number
  isActive: boolean
  createdAt: string
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<FAQ | null>(null)

  // Form state
  const [formQuestion, setFormQuestion] = useState('')
  const [formAnswer, setFormAnswer] = useState('')

  useEffect(() => {
    fetchFAQs()
  }, [])

  async function fetchFAQs() {
    try {
      const res = await fetch('/api/faq')
      const data = await res.json()
      setFaqs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  function openAddModal() {
    setEditing(null)
    setFormQuestion('')
    setFormAnswer('')
    setModalOpen(true)
  }

  function openEditModal(faq: FAQ) {
    setEditing(faq)
    setFormQuestion(faq.question)
    setFormAnswer(faq.answer)
    setModalOpen(true)
  }

  async function handleSave() {
    const body = {
      question: formQuestion,
      answer: formAnswer,
    }

    try {
      if (editing) {
        const res = await fetch(`/api/faq/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Failed to update FAQ')
      } else {
        const res = await fetch('/api/faq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Failed to create FAQ')
      }
      setModalOpen(false)
      fetchFAQs()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  async function toggleActive(faq: FAQ) {
    try {
      await fetch(`/api/faq/${faq._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !faq.isActive }),
      })
      fetchFAQs()
    } catch (error) {
      console.error('Failed to toggle FAQ:', error)
    }
  }

  async function deleteFAQ(faq: FAQ) {
    if (!confirm('Delete this FAQ?')) return

    try {
      await fetch(`/api/faq/${faq._id}`, { method: 'DELETE' })
      fetchFAQs()
    } catch (error) {
      console.error('Failed to delete FAQ:', error)
    }
  }

  async function moveUp(index: number) {
    if (index === 0) return
    const current = faqs[index]
    const above = faqs[index - 1]

    try {
      await Promise.all([
        fetch(`/api/faq/${current._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: above.order }),
        }),
        fetch(`/api/faq/${above._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: current.order }),
        }),
      ])
      fetchFAQs()
    } catch (error) {
      console.error('Failed to reorder:', error)
    }
  }

  async function moveDown(index: number) {
    if (index >= faqs.length - 1) return
    const current = faqs[index]
    const below = faqs[index + 1]

    try {
      await Promise.all([
        fetch(`/api/faq/${current._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: below.order }),
        }),
        fetch(`/api/faq/${below._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: current.order }),
        }),
      ])
      fetchFAQs()
    } catch (error) {
      console.error('Failed to reorder:', error)
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">FAQ Management</h1>
          <p className="text-sm text-gray-400">
            Manage frequently asked questions. Use arrows to reorder.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-[#3B82F6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563EB]"
        >
          <Plus className="h-4 w-4" />
          Add FAQ
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-2">
        {faqs.length === 0 ? (
          <div className="rounded-xl border border-[#2A3545] bg-[#1A2332] p-8 text-center">
            <p className="text-gray-500">No FAQs yet</p>
          </div>
        ) : (
          faqs.map((faq, index) => (
            <div
              key={faq._id}
              className={`rounded-xl border bg-[#1A2332] p-4 ${
                faq.isActive
                  ? 'border-[#2A3545]'
                  : 'border-red-500/20 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Reorder buttons */}
                <div className="flex flex-col items-center gap-0.5 pt-1">
                  <GripVertical className="h-4 w-4 text-gray-600" />
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="rounded p-0.5 text-gray-400 hover:text-white disabled:opacity-30"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index >= faqs.length - 1}
                    className="rounded p-0.5 text-gray-400 hover:text-white disabled:opacity-30"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#3B82F6]/10 px-1.5 py-0.5 text-xs text-[#3B82F6]">
                      #{index + 1}
                    </span>
                    <h3 className="font-medium text-white">{faq.question}</h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                    {faq.answer}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleActive(faq)}
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#2A3545]"
                  >
                    {faq.isActive ? (
                      <ToggleRight className="h-5 w-5 text-green-400" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  <button
                    onClick={() => openEditModal(faq)}
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#2A3545] hover:text-[#3B82F6]"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteFAQ(faq)}
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit FAQ' : 'Add FAQ'}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Question
            </label>
            <input
              type="text"
              value={formQuestion}
              onChange={(e) => setFormQuestion(e.target.value)}
              className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              placeholder="Enter the question"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-300">Answer</label>
            <textarea
              value={formAnswer}
              onChange={(e) => setFormAnswer(e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              placeholder="Enter the answer"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-[#2A3545] pt-4">
            <button
              onClick={() => setModalOpen(false)}
              className="rounded-lg border border-[#2A3545] px-4 py-2 text-sm text-gray-400 hover:bg-[#2A3545]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563EB]"
            >
              <Save className="h-4 w-4" />
              {editing ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
