import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return `R${amount.toLocaleString()}`
}

export function getWhatsAppLink(message?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '27730278136'
  const msg = message || 'Hi, I\'m interested in funeral cover from TFI Burial Society.'
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`
}
