'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'whatsapp' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  icon?: ReactNode
  loading?: boolean
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-gradient-to-br from-primary to-primary-dark',
    'text-white font-bold',
    'shadow-[0_4px_30px_rgba(0,136,255,0.4)]',
    'hover:shadow-[0_8px_40px_rgba(0,136,255,0.6)]',
    'hover:-translate-y-[3px] hover:scale-[1.02]',
    'relative overflow-hidden',
    'before:absolute before:inset-0 before:left-[-100%]',
    'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    'before:transition-[left] before:duration-600',
    'hover:before:left-[100%]',
  ].join(' '),
  secondary: [
    'bg-transparent',
    'border border-glass-border',
    'text-white font-semibold',
    'backdrop-blur-[10px]',
    'hover:border-secondary hover:bg-secondary/10',
    'hover:-translate-y-[2px]',
    'hover:shadow-[0_4px_20px_rgba(0,201,167,0.2)]',
  ].join(' '),
  whatsapp: [
    'bg-gradient-to-br from-[#25D366] to-[#128C7E]',
    'text-white font-bold',
    'shadow-[0_4px_20px_rgba(37,211,102,0.3)]',
    'hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)]',
    'hover:-translate-y-[3px]',
  ].join(' '),
  ghost: [
    'bg-transparent',
    'text-white/65 font-medium',
    'hover:text-white hover:bg-white/5',
    'hover:-translate-y-[1px]',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-sm rounded-full',
  md: 'px-7 py-3.5 text-sm rounded-full',
  lg: 'px-9 py-4 text-base rounded-full',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      icon,
      loading = false,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'transition-all duration-300 ease-out',
          'cursor-pointer select-none',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
