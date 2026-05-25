'use client'

import { useState } from 'react'
import { Send, MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/utils'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would POST to an API
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 4000)
    setFormData({ name: '', phone: '', message: '' })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 md:p-10 relative overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />

        {isSubmitted && (
          <div className="mb-6 p-4 bg-secondary/10 border border-secondary/30 rounded-xl text-secondary text-sm text-center animate-fade-in-up">
            Thank you! We&apos;ll be in touch shortly.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full name"
                required
                className="w-full px-4 py-3.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,136,255,0.15)] transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 072 000 0000"
                required
                className="w-full px-4 py-3.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,136,255,0.15)] transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can we help you?"
              rows={4}
              className="w-full px-4 py-3.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,136,255,0.15)] transition-all duration-300 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-[#0066CC] rounded-xl text-white font-bold shadow-[0_4px_30px_rgba(0,136,255,0.3)] hover:shadow-[0_8px_40px_rgba(0,136,255,0.5)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Send size={16} />
              Send Message
            </button>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-xl text-white font-bold shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
