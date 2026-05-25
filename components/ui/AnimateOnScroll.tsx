'use client'

import { type ReactNode } from 'react'
import { motion, type Variant } from 'framer-motion'

type AnimationVariant = 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'fadeIn'

interface AnimateOnScrollProps {
  children: ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  amount?: number
}

const variants: Record<AnimationVariant, { hidden: Variant; visible: Variant }> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

export default function AnimateOnScroll({
  children,
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  className,
  once = true,
  amount = 0.2,
}: AnimateOnScrollProps) {
  const selectedVariant = variants[variant]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
