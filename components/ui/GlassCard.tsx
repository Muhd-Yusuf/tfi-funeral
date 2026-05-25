'use client'

import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  gradient?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export default function GlassCard({
  children,
  hover = true,
  gradient = true,
  padding = 'md',
  className,
  ...props
}: GlassCardProps) {
  const paddingStyles = {
    sm: 'p-5',
    md: 'p-7 md:p-9',
    lg: 'p-9 md:p-12',
  }

  return (
    <div
      className={cn(
        'relative rounded-3xl',
        'bg-bg-card border border-glass-border',
        'backdrop-blur-[20px]',
        'transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'overflow-hidden',
        paddingStyles[padding],
        // Hover effects
        hover && [
          'hover:-translate-y-2 hover:scale-[1.02]',
          'hover:border-primary/30',
          'hover:shadow-[0_20px_60px_rgba(0,136,255,0.15)]',
        ],
        // Gradient border reveal on top
        gradient && [
          'before:absolute before:top-0 before:left-0 before:right-0',
          'before:h-[3px]',
          'before:bg-gradient-to-r before:from-primary before:to-secondary',
          'before:opacity-0 before:transition-opacity before:duration-300',
          'hover:before:opacity-100',
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
