'use client'

import { useEffect, useState } from 'react'
import { Save, RefreshCw, FileText, Image, Info } from 'lucide-react'

interface ContentItem {
  _id?: string
  key: string
  section: string
  title?: string
  subtitle?: string
  body?: string
  image?: string
  metadata?: Record<string, any>
}

const defaultContent: ContentItem[] = [
  {
    key: 'hero',
    section: 'hero',
    title: 'Affordable Funeral Cover For Your Family',
    subtitle: 'Plans starting from just R39/month. Protect your loved ones with TFI Burial Society.',
    body: '',
    image: '',
  },
  {
    key: 'about',
    section: 'about',
    title: 'About TFI Burial Society',
    subtitle: 'Trusted funeral cover since establishment',
    body: 'TFI Burial Society provides affordable and reliable funeral cover plans for individuals and families across South Africa. Our mission is to ensure that every family can give their loved ones a dignified farewell without financial burden.',
    image: '',
  },
  {
    key: 'company-info',
    section: 'company',
    title: 'TFI Burial Society',
    subtitle: '',
    body: '',
    metadata: {
      fspNumber: '',
      phone: '',
      whatsapp: '',
      email: '',
      address: '',
      partners: 'Old Mutual, RMA',
      disclaimer: 'TFI Burial Society is an authorised financial services provider. All funeral plans are underwritten by registered insurance companies.',
    },
  },
]

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>(defaultContent)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('hero')

  useEffect(() => {
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      const res = await fetch('/api/content')
      const data = await res.json()

      if (Array.isArray(data) && data.length > 0) {
        // Merge fetched data with defaults
        const merged = defaultContent.map((dc) => {
          const found = data.find((d: ContentItem) => d.key === dc.key)
          return found || dc
        })
        setContent(merged)
      }
    } catch (error) {
      console.error('Failed to fetch content:', error)
    } finally {
      setLoading(false)
    }
  }

  function updateField(key: string, field: string, value: any) {
    setContent((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    )
  }

  function updateMetadata(key: string, metaKey: string, value: string) {
    setContent((prev) =>
      prev.map((item) =>
        item.key === key
          ? {
              ...item,
              metadata: { ...item.metadata, [metaKey]: value },
            }
          : item
      )
    )
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      if (!res.ok) throw new Error('Failed to save content')
      alert('Content saved successfully!')
    } catch (error) {
      alert('Failed to save content')
    } finally {
      setSaving(false)
    }
  }

  const currentItem = content.find((c) => c.key === activeTab) || content[0]

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
          <h1 className="text-2xl font-bold text-white">Site Content</h1>
          <p className="text-sm text-gray-400">
            Edit website text, images, and company information
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-[#3B82F6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563EB] disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#2A3545] pb-2">
        {content.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === item.key
                ? 'bg-[#3B82F6] text-white'
                : 'text-gray-400 hover:bg-[#1A2332] hover:text-white'
            }`}
          >
            {item.key === 'hero' && <FileText className="h-4 w-4" />}
            {item.key === 'about' && <Info className="h-4 w-4" />}
            {item.key === 'company-info' && <Image className="h-4 w-4" />}
            <span className="capitalize">{item.key.replace('-', ' ')}</span>
          </button>
        ))}
      </div>

      {/* Content Editor */}
      <div className="rounded-xl border border-[#2A3545] bg-[#1A2332] p-6">
        {/* Hero Section */}
        {activeTab === 'hero' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">
              Hero Section
            </h2>
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                Title
              </label>
              <input
                type="text"
                value={currentItem.title || ''}
                onChange={(e) => updateField('hero', 'title', e.target.value)}
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                Subtitle
              </label>
              <textarea
                value={currentItem.subtitle || ''}
                onChange={(e) =>
                  updateField('hero', 'subtitle', e.target.value)
                }
                rows={3}
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                Hero Image URL
              </label>
              <input
                type="text"
                value={currentItem.image || ''}
                onChange={(e) => updateField('hero', 'image', e.target.value)}
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                placeholder="Image URL (upload feature coming soon)"
              />
            </div>
          </div>
        )}

        {/* About Section */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">About Page</h2>
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                Title
              </label>
              <input
                type="text"
                value={currentItem.title || ''}
                onChange={(e) => updateField('about', 'title', e.target.value)}
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                Subtitle
              </label>
              <input
                type="text"
                value={currentItem.subtitle || ''}
                onChange={(e) =>
                  updateField('about', 'subtitle', e.target.value)
                }
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                About Text
              </label>
              <textarea
                value={currentItem.body || ''}
                onChange={(e) => updateField('about', 'body', e.target.value)}
                rows={6}
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                About Image URL
              </label>
              <input
                type="text"
                value={currentItem.image || ''}
                onChange={(e) => updateField('about', 'image', e.target.value)}
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                placeholder="Image URL (upload feature coming soon)"
              />
            </div>
          </div>
        )}

        {/* Company Info Section */}
        {activeTab === 'company-info' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">
              Company Information
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-gray-300">
                  Company Name
                </label>
                <input
                  type="text"
                  value={currentItem.title || ''}
                  onChange={(e) =>
                    updateField('company-info', 'title', e.target.value)
                  }
                  className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-300">
                  FSP Number
                </label>
                <input
                  type="text"
                  value={currentItem.metadata?.fspNumber || ''}
                  onChange={(e) =>
                    updateMetadata('company-info', 'fspNumber', e.target.value)
                  }
                  className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                  placeholder="e.g. FSP 12345"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-300">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={currentItem.metadata?.phone || ''}
                  onChange={(e) =>
                    updateMetadata('company-info', 'phone', e.target.value)
                  }
                  className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-300">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={currentItem.metadata?.whatsapp || ''}
                  onChange={(e) =>
                    updateMetadata('company-info', 'whatsapp', e.target.value)
                  }
                  className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={currentItem.metadata?.email || ''}
                  onChange={(e) =>
                    updateMetadata('company-info', 'email', e.target.value)
                  }
                  className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-300">
                  Address
                </label>
                <input
                  type="text"
                  value={currentItem.metadata?.address || ''}
                  onChange={(e) =>
                    updateMetadata('company-info', 'address', e.target.value)
                  }
                  className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-300">
                Partners (comma separated)
              </label>
              <input
                type="text"
                value={currentItem.metadata?.partners || ''}
                onChange={(e) =>
                  updateMetadata('company-info', 'partners', e.target.value)
                }
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                placeholder="e.g. Old Mutual, RMA"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-300">
                Disclaimer Text
              </label>
              <textarea
                value={currentItem.metadata?.disclaimer || ''}
                onChange={(e) =>
                  updateMetadata('company-info', 'disclaimer', e.target.value)
                }
                rows={3}
                className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] px-3 py-2 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
