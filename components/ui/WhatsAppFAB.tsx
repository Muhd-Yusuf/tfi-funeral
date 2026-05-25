'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/utils'

interface WhatsAppFABProps {
  message?: string
}

export default function WhatsAppFAB({ message }: WhatsAppFABProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const whatsappUrl = getWhatsAppLink(message)

  return (
    <div className="fixed bottom-7 right-7 z-[999] flex flex-col items-end gap-3">
      {/* Tooltip Bubble */}
      {showTooltip && (
        <div className="relative flex items-center gap-2 px-4 py-3 rounded-2xl bg-[rgba(12,25,50,0.95)] border border-glass-border backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-fade-in-up">
          <p className="text-white text-sm font-medium whitespace-nowrap">
            Need help? Chat with us!
          </p>
          <button
            onClick={(e) => {
              e.preventDefault()
              setShowTooltip(false)
            }}
            className="text-white/40 hover:text-white transition-colors"
            aria-label="Dismiss tooltip"
          >
            <X size={14} />
          </button>
          {/* Tail */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 rotate-45 bg-[rgba(12,25,50,0.95)] border-r border-b border-glass-border" />
        </div>
      )}

      {/* FAB Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="
          group relative
          w-[60px] h-[60px]
          bg-gradient-to-br from-[#25D366] to-[#128C7E]
          rounded-full
          flex items-center justify-center
          cursor-pointer
          shadow-[0_4px_20px_rgba(37,211,102,0.4)]
          transition-all duration-300 ease-out
          hover:scale-110
          hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)]
          animate-pulse-ring
        "
      >
        <MessageCircle className="w-7 h-7 text-white fill-white transition-transform duration-300 group-hover:scale-110" />

        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      </a>
    </div>
  )
}
