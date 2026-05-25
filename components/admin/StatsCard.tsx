'use client'

import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
}: StatsCardProps) {
  const changeColor =
    changeType === 'positive'
      ? 'text-green-400'
      : changeType === 'negative'
      ? 'text-red-400'
      : 'text-gray-400'

  return (
    <div className="rounded-xl border border-[#2A3545] bg-[#1A2332] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {change && (
            <p className={`mt-1 text-sm ${changeColor}`}>{change}</p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3B82F6]/10">
          <Icon className="h-6 w-6 text-[#3B82F6]" />
        </div>
      </div>
    </div>
  )
}
