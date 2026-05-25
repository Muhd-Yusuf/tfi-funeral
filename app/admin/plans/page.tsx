'use client'

import { useEffect, useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  X,
  Save,
  Shield,
} from 'lucide-react'
import Modal from '@/components/admin/Modal'

interface AgeGroup {
  ageRange: string
  premium: number | null
}

interface Pricing {
  coverAmount: number
  ageGroups: AgeGroup[]
}

interface Plan {
  _id: string
  name: string
  slug: string
  category: string
  description: string
  icon: string
  features: string[]
  pricing: Pricing[]
  isActive: boolean
  order: number
}

const categories = ['main', 'extended', 'after-tears', 'inkomo', 'grocery']

const defaultPricing: Pricing = {
  coverAmount: 5000,
  ageGroups: [
    { ageRange: '18-64', premium: 0 },
    { ageRange: '65-74', premium: 0 },
    { ageRange: '75-84', premium: 0 },
  ],
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)

  // Form state
  const [formName, setFormName] = useState('')
  const [formSlug, setFormSlug] = useState('')
  const [formCategory, setFormCategory] = useState('main')
  const [formDescription, setFormDescription] = useState('')
  const [formIcon, setFormIcon] = useState('')
  const [formFeatures, setFormFeatures] = useState('')
  const [formPricing, setFormPricing] = useState<Pricing[]>([{ ...defaultPricing }])

  useEffect(() => {
    fetchPlans()
  }, [])

  async function fetchPlans() {
    try {
      const res = await fetch('/api/plans')
      const data = await res.json()
      setPlans(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch plans:', error)
    } finally {
      setLoading(false)
    }
  }

  function openAddModal() {
    setEditingPlan(null)
    setFormName('')
    setFormSlug('')
    setFormCategory('main')
    setFormDescription('')
    setFormIcon('')
    setFormFeatures('')
    setFormPricing([{ ...defaultPricing }])
    setModalOpen(true)
  }

  function openEditModal(plan: Plan) {
    setEditingPlan(plan)
    setFormName(plan.name)
    setFormSlug(plan.slug)
    setFormCategory(plan.category)
    setFormDescription(plan.description)
    setFormIcon(plan.icon)
    setFormFeatures(plan.features.join('\n'))
    setFormPricing(plan.pricing.map((p) => ({ ...p, ageGroups: p.ageGroups.map((a) => ({ ...a })) })))
    setModalOpen(true)
  }

  async function handleSave() {
    const body = {
      name: formName,
      slug: formSlug,
      category: formCategory,
      description: formDescription,
      icon: formIcon,
      features: formFeatures.split('\n').filter((f) => f.trim()),
      pricing: formPricing,
    }

    try {
      if (editingPlan) {
        const res = await fetch(`/api/plans/${editingPlan._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Failed to update plan')
      } else {
        const res = await fetch('/api/plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Failed to create plan')
      }
      setModalOpen(false)
      fetchPlans()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  async function toggleActive(plan: Plan) {
    try {
      await fetch(`/api/plans/${plan._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !plan.isActive }),
      })
      fetchPlans()
    } catch (error) {
      console.error('Failed to toggle plan:', error)
    }
  }

  async function deletePlan(plan: Plan) {
    if (!confirm(`Are you sure you want to delete "${plan.name}"?`)) return

    try {
      await fetch(`/api/plans/${plan._id}`, { method: 'DELETE' })
      fetchPlans()
    } catch (error) {
      console.error('Failed to delete plan:', error)
    }
  }

  // Pricing editor helpers
  function addPricingRow() {
    setFormPricing([...formPricing, { ...defaultPricing, ageGroups: defaultPricing.ageGroups.map((a) => ({ ...a })) }])
  }

  function removePricingRow(index: number) {
    setFormPricing(formPricing.filter((_, i) => i !== index))
  }

  function updatePricingCover(index: number, value: number) {
    const updated = [...formPricing]
    updated[index].coverAmount = value
    setFormPricing(updated)
  }

  function updatePricingPremium(
    rowIndex: number,
    ageIndex: number,
    value: string
  ) {
    const updated = [...formPricing]
    updated[rowIndex].ageGroups[ageIndex].premium =
      value === '' ? null : Number(value)
    setFormPricing(updated)
  }

  function addAgeGroup(rowIndex: number) {
    const updated = [...formPricing]
    updated[rowIndex].ageGroups.push({ ageRange: '85+', premium: 0 })
    setFormPricing(updated)
  }

  function updateAgeRange(rowIndex: number, ageIndex: number, value: string) {
    const updated = [...formPricing]
    updated[rowIndex].ageGroups[ageIndex].ageRange = value
    setFormPricing(updated)
  }

  function removeAgeGroup(rowIndex: number, ageIndex: number) {
    const updated = [...formPricing]
    updated[rowIndex].ageGroups.splice(ageIndex, 1)
    setFormPricing(updated)
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
          <h1 className="text-2xl font-bold text-white">Plans Management</h1>
          <p className="text-sm text-gray-400">
            Manage funeral cover plans and pricing
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-[#3B82F6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563EB]"
        >
          <Plus className="h-4 w-4" />
          Add Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`rounded-xl border bg-[#1A2332] p-5 transition-colors ${
              plan.isActive ? 'border-[#2A3545]' : 'border-red-500/20 opacity-60'
            }`}
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]/10">
                  <Shield className="h-5 w-5 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{plan.name}</h3>
                  <span className="rounded-full bg-[#3B82F6]/10 px-2 py-0.5 text-xs text-[#3B82F6]">
                    {plan.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleActive(plan)}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#2A3545]"
                  title={plan.isActive ? 'Deactivate' : 'Activate'}
                >
                  {plan.isActive ? (
                    <ToggleRight className="h-5 w-5 text-green-400" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                <button
                  onClick={() => openEditModal(plan)}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#2A3545] hover:text-[#3B82F6]"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deletePlan(plan)}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mb-3 text-sm text-gray-400">{plan.description}</p>

            {/* Mini pricing table */}
            {plan.pricing.length > 0 && (
              <div className="overflow-x-auto rounded-lg border border-[#2A3545]">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#2A3545] bg-[#0F1729]">
                      <th className="px-2 py-1.5 text-left text-gray-400">
                        Cover
                      </th>
                      {plan.pricing[0].ageGroups.map((ag, i) => (
                        <th
                          key={i}
                          className="px-2 py-1.5 text-right text-gray-400"
                        >
                          {ag.ageRange}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A3545]">
                    {plan.pricing.slice(0, 3).map((row, idx) => (
                      <tr key={idx}>
                        <td className="px-2 py-1.5 text-gray-300">
                          R{row.coverAmount.toLocaleString()}
                        </td>
                        {row.ageGroups.map((ag, i) => (
                          <td
                            key={i}
                            className="px-2 py-1.5 text-right text-gray-300"
                          >
                            {ag.premium !== null ? `R${ag.premium}` : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {plan.pricing.length > 3 && (
                      <tr>
                        <td
                          colSpan={plan.pricing[0].ageGroups.length + 1}
                          className="px-2 py-1.5 text-center text-gray-500"
                        >
                          +{plan.pricing.length - 3} more rows
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Features */}
            <div className="mt-3 flex flex-wrap gap-1">
              {plan.features.slice(0, 3).map((feat, idx) => (
                <span
                  key={idx}
                  className="rounded bg-[#0F1729] px-2 py-0.5 text-xs text-gray-400"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPlan ? 'Edit Plan' : 'Add New Plan'}
        size="xl"
      >
        <div className="space-y-5">
          {/* Basic info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-gray-300">Name</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                placeholder="Plan name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-300">Slug</label>
              <input
                type="text"
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value)}
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                placeholder="plan-slug"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                Category
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                Icon Key
              </label>
              <input
                type="text"
                value={formIcon}
                onChange={(e) => setFormIcon(e.target.value)}
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                placeholder="e.g. shield, heart, users"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Description
            </label>
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              placeholder="Plan description"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Features (one per line)
            </label>
            <textarea
              value={formFeatures}
              onChange={(e) => setFormFeatures(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            />
          </div>

          {/* Pricing Editor */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Pricing Table
              </label>
              <button
                onClick={addPricingRow}
                className="flex items-center gap-1 rounded-lg bg-[#3B82F6]/10 px-3 py-1.5 text-xs text-[#3B82F6] hover:bg-[#3B82F6]/20"
              >
                <Plus className="h-3 w-3" />
                Add Row
              </button>
            </div>

            <div className="space-y-3">
              {formPricing.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="rounded-lg border border-[#2A3545] bg-[#0F1729] p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-400">
                        Cover Amount:
                      </label>
                      <input
                        type="number"
                        value={row.coverAmount}
                        onChange={(e) =>
                          updatePricingCover(rowIdx, Number(e.target.value))
                        }
                        className="w-28 rounded border border-[#2A3545] bg-[#1A2332] px-2 py-1 text-xs text-white focus:border-[#3B82F6] focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => addAgeGroup(rowIdx)}
                        className="rounded p-1 text-xs text-[#3B82F6] hover:bg-[#3B82F6]/10"
                        title="Add age group"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removePricingRow(rowIdx)}
                        className="rounded p-1 text-red-400 hover:bg-red-500/10"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {row.ageGroups.map((ag, ageIdx) => (
                      <div key={ageIdx} className="relative">
                        <input
                          type="text"
                          value={ag.ageRange}
                          onChange={(e) =>
                            updateAgeRange(rowIdx, ageIdx, e.target.value)
                          }
                          className="mb-1 w-full rounded border border-[#2A3545] bg-[#1A2332] px-2 py-1 text-xs text-gray-400 focus:border-[#3B82F6] focus:outline-none"
                          placeholder="Age range"
                        />
                        <input
                          type="number"
                          value={ag.premium ?? ''}
                          onChange={(e) =>
                            updatePricingPremium(rowIdx, ageIdx, e.target.value)
                          }
                          className="w-full rounded border border-[#2A3545] bg-[#1A2332] px-2 py-1 text-xs text-white focus:border-[#3B82F6] focus:outline-none"
                          placeholder="Premium (R)"
                        />
                        {row.ageGroups.length > 1 && (
                          <button
                            onClick={() => removeAgeGroup(rowIdx, ageIdx)}
                            className="absolute -top-1 -right-1 rounded-full bg-red-500/20 p-0.5 text-red-400 hover:bg-red-500/30"
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
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
              {editingPlan ? 'Update Plan' : 'Create Plan'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
