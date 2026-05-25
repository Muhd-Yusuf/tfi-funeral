import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  className?: string
  align?: 'center' | 'left'
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  className,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-[700px] mb-12 md:mb-16',
        align === 'center' && 'text-center mx-auto',
        align === 'left' && 'text-left',
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">
        {label}
      </p>
      <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/65 text-[1.05rem] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
