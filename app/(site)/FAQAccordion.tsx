'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'What is the waiting period before I can claim?',
    answer: 'There is a standard 6-month waiting period for natural death claims. Accidental death is covered immediately from the date your policy starts. During the waiting period, premiums paid to date will be refunded if the member passes away from natural causes.',
  },
  {
    question: 'How quickly are claims processed?',
    answer: 'We process claims within 48 hours of receiving all required documentation. Our dedicated claims team works around the clock to ensure your family receives support when they need it most.',
  },
  {
    question: 'Can I add more family members later?',
    answer: 'Yes! You can upgrade your plan or add extended family members at any time. Simply contact your agent or reach us via WhatsApp to adjust your cover. Additional members will be subject to their own waiting period.',
  },
  {
    question: 'Do I need a medical examination to join?',
    answer: 'No medical examination is required to join any of our plans. We believe funeral cover should be accessible to everyone, regardless of their health status. Simply choose your plan and start paying your premium.',
  },
  {
    question: 'Who underwrites the TFI Burial Society plans?',
    answer: 'Our plans are underwritten by Old Mutual and RMA (Rand Mutual Assurance) — two of South Africa\'s most trusted insurance providers. TFI Burial Society is registered as an FSP (Financial Service Provider) with licence number 50841.',
  },
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-primary/20"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-5 md:p-6 text-left"
          >
            <span className="font-semibold text-white text-sm md:text-base pr-4">
              {faq.question}
            </span>
            <ChevronDown
              size={18}
              className={cn(
                'shrink-0 text-white/50 transition-transform duration-300',
                openIndex === index && 'rotate-180 text-primary'
              )}
            />
          </button>
          <div
            className={cn(
              'grid transition-all duration-300',
              openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            )}
          >
            <div className="overflow-hidden">
              <p className="px-5 md:px-6 pb-5 md:pb-6 text-white/60 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
