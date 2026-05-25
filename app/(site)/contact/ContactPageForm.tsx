'use client'

import { useState } from 'react'
import { Send, User, Phone, Mail, MessageSquare, Briefcase, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  message?: string
}

export default function ContactPageForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    planInterest: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          message: formData.message.trim(),
          planInterest: formData.planInterest || undefined,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setIsSubmitted(true)
      setFormData({ name: '', phone: '', email: '', message: '', planInterest: '' })
      setErrors({})
    } catch {
      setSubmitError('Something went wrong. Please try again or contact us via WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6">
            <CheckCircle size={28} className="text-secondary" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-white mb-3">Message Sent</h2>
          <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
            Thank you for reaching out. Our team will get back to you as soon as possible. For urgent enquiries, please WhatsApp us at 073 027 8136.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-glass-border rounded-xl text-white/70 text-sm font-medium hover:border-primary/30 hover:text-white transition-all duration-300"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 md:p-10 relative overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <h2 className="font-heading font-bold text-2xl text-white mb-2">Send Us a Message</h2>
      <p className="text-white/50 text-sm mb-8">
        Fill in the form below and we&apos;ll get back to you as soon as possible.
      </p>

      {submitError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
          <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">
              <User size={12} />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (errors.name) setErrors({ ...errors, name: undefined })
              }}
              placeholder="Your full name"
              className={cn(
                'w-full px-4 py-3.5 bg-[rgba(255,255,255,0.03)] border rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,136,255,0.15)] transition-all duration-300',
                errors.name ? 'border-red-500/50' : 'border-[rgba(255,255,255,0.08)]'
              )}
            />
            {errors.name && (
              <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
                <AlertCircle size={10} />
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">
              <Phone size={12} />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value })
                if (errors.phone) setErrors({ ...errors, phone: undefined })
              }}
              placeholder="e.g. 073 027 8136"
              className={cn(
                'w-full px-4 py-3.5 bg-[rgba(255,255,255,0.03)] border rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,136,255,0.15)] transition-all duration-300',
                errors.phone ? 'border-red-500/50' : 'border-[rgba(255,255,255,0.08)]'
              )}
            />
            {errors.phone && (
              <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
                <AlertCircle size={10} />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">
            <Mail size={12} />
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
              if (errors.email) setErrors({ ...errors, email: undefined })
            }}
            placeholder="your@email.com (optional)"
            className={cn(
              'w-full px-4 py-3.5 bg-[rgba(255,255,255,0.03)] border rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,136,255,0.15)] transition-all duration-300',
              errors.email ? 'border-red-500/50' : 'border-[rgba(255,255,255,0.08)]'
            )}
          />
          {errors.email && (
            <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
              <AlertCircle size={10} />
              {errors.email}
            </p>
          )}
        </div>

        {/* Plan Interest */}
        <div>
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">
            <Briefcase size={12} />
            Plan Interest
          </label>
          <select
            value={formData.planInterest}
            onChange={(e) => setFormData({ ...formData, planInterest: e.target.value })}
            className="w-full px-4 py-3.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-white text-sm outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,136,255,0.15)] transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value="" className="bg-bg-surface">Select a plan (optional)</option>
            <option value="single" className="bg-bg-surface">Single Member</option>
            <option value="children" className="bg-bg-surface">Member &amp; Children</option>
            <option value="spouse" className="bg-bg-surface">Member &amp; Spouse</option>
            <option value="family" className="bg-bg-surface">Family Plan</option>
            <option value="extended" className="bg-bg-surface">Extended Family</option>
            <option value="after-tears" className="bg-bg-surface">After Tears</option>
            <option value="inkomo" className="bg-bg-surface">Inkomo Plan</option>
            <option value="grocery" className="bg-bg-surface">Grocery Plan</option>
            <option value="other" className="bg-bg-surface">Other / General Inquiry</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">
            <MessageSquare size={12} />
            Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value })
              if (errors.message) setErrors({ ...errors, message: undefined })
            }}
            placeholder="Tell us how we can help you..."
            rows={5}
            className={cn(
              'w-full px-4 py-3.5 bg-[rgba(255,255,255,0.03)] border rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,136,255,0.15)] transition-all duration-300 resize-none',
              errors.message ? 'border-red-500/50' : 'border-[rgba(255,255,255,0.08)]'
            )}
          />
          {errors.message && (
            <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
              <AlertCircle size={10} />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all duration-300',
            isSubmitting
              ? 'bg-primary/50 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary to-[#0066CC] shadow-[0_4px_30px_rgba(0,136,255,0.3)] hover:shadow-[0_8px_40px_rgba(0,136,255,0.5)] hover:-translate-y-0.5'
          )}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  )
}
