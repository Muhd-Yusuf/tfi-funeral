'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0.01, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '100px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn('relative z-10', className)}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.section>
  )
}
