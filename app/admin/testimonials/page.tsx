'use client'

import { useEffect, useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Star,
  Save,
} from 'lucide-react'
import Modal from '@/components/admin/Modal'

interface Testimonial {
  _id: string
  name: string
  location: string
  text: string
  rating: number
  isActive: boolean
  createdAt: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)

  // Form state
  const [formName, setFormName] = useState('')
  const [formLocation, setFormLocation] = useState('')
  const [formText, setFormText] = useState('')
  const [formRating, setFormRating] = useState(5)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  async function fetchTestimonials() {
    try {
      const res = await fetch('/api/testimonials')
      const data = await res.json()
      setTestimonials(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  function openAddModal() {
    setEditing(null)
    setFormName('')
    setFormLocation('')
    setFormText('')
    setFormRating(5)
    setModalOpen(true)
  }

  function openEditModal(testimonial: Testimonial) {
    setEditing(testimonial)
    setFormName(testimonial.name)
    setFormLocation(testimonial.location)
    setFormText(testimonial.text)
    setFormRating(testimonial.rating)
    setModalOpen(true)
  }

  async function handleSave() {
    const body = {
      name: formName,
      location: formLocation,
      text: formText,
      rating: formRating,
    }

    try {
      if (editing) {
        const res = await fetch(`/api/testimonials/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Failed to update testimonial')
      } else {
        const res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Failed to create testimonial')
      }
      setModalOpen(false)
      fetchTestimonials()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  async function toggleActive(testimonial: Testimonial) {
    try {
      await fetch(`/api/testimonials/${testimonial._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !testimonial.isActive }),
      })
      fetchTestimonials()
    } catch (error) {
      console.error('Failed to toggle testimonial:', error)
    }
  }

  async function deleteTestimonial(testimonial: Testimonial) {
    if (!confirm(`Delete testimonial from "${testimonial.name}"?`)) return

    try {
      await fetch(`/api/testimonials/${testimonial._id}`, { method: 'DELETE' })
      fetchTestimonials()
    } catch (error) {
      console.error('Failed to delete testimonial:', error)
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
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-sm text-gray-400">
            Manage customer testimonials displayed on the website
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-[#3B82F6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563EB]"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {testimonials.length === 0 ? (
          <div className="col-span-2 rounded-xl border border-[#2A3545] bg-[#1A2332] p-8 text-center">
            <p className="text-gray-500">No testimonials yet</p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className={`rounded-xl border bg-[#1A2332] p-5 ${
                testimonial.isActive
                  ? 'border-[#2A3545]'
                  : 'border-red-500/20 opacity-60'
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {testimonial.location}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleActive(testimonial)}
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#2A3545]"
                  >
                    {testimonial.isActive ? (
                      <ToggleRight className="h-5 w-5 text-green-400" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  <button
                    onClick={() => openEditModal(testimonial)}
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#2A3545] hover:text-[#3B82F6]"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteTestimonial(testimonial)}
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-2 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-300 line-clamp-3">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Testimonial' : 'Add Testimonial'}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-300">Name</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              placeholder="Customer name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Location
            </label>
            <input
              type="text"
              value={formLocation}
              onChange={(e) => setFormLocation(e.target.value)}
              className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              placeholder="e.g. Johannesburg, Gauteng"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Testimonial Text
            </label>
            <textarea
              value={formText}
              onChange={(e) => setFormText(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              placeholder="What the customer said..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Rating (1-5)
            </label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFormRating(i + 1)}
                  className="p-0.5"
                >
                  <Star
                    className={`h-6 w-6 ${
                      i < formRating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
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
