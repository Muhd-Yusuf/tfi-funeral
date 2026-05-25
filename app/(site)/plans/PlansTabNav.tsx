'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { plansData } from '@/lib/plans-data'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'
import {
  User,
  Users,
  Heart,
  Home,
  UserPlus,
  HeartHandshake,
  Crown,
  ShoppingCart,
  Banknote,
  Star,
  Landmark,
  Shield,
} from 'lucide-react'

// Icon mapping from string names to components
const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  User,
  Users,
  Heart,
  Home,
  UserPlus,
  HeartHandshake,
  Crown,
  ShoppingCart,
  Banknote,
  Star,
  Landmark,
  Shield,
}

const mainTabs = [
  { id: 'main', label: 'Main Plans', icon: 'Home' },
  { id: 'extended', label: 'Extended Family', icon: 'UserPlus' },
  { id: 'cashPlan', label: 'Cash Plan', icon: 'Banknote' },
  { id: 'memberPlus', label: 'Member Plus', icon: 'Star' },
  { id: 'inkomo', label: 'Inkomo', icon: 'Crown' },
  { id: 'tombstone', label: 'Tombstone', icon: 'Landmark' },
  { id: 'grocery', label: 'Grocery', icon: 'ShoppingCart' },
  { id: 'after-tears', label: 'After Tears', icon: 'HeartHandshake' },
]

const mainSubTabs = [
  { id: 'singleMember', label: 'Single Member', icon: 'User' },
  { id: 'memberChildren', label: 'Member & Children', icon: 'Users' },
  { id: 'memberSpouse', label: 'Member & Spouse', icon: 'Heart' },
  { id: 'family', label: 'Family', icon: 'Home' },
]

const extendedLabels: Record<number, string> = {
  5: 'Member +5',
  7: 'Member +7',
  9: 'Member +9',
  13: 'Member +13',
}

const specialtyLabels: Record<number, string> = {
  10000: 'Individual',
  10001: 'Member & Children',
  10002: 'Member & Spouse',
  10003: 'Family',
  10005: 'Extended +5',
  10007: 'Extended +7',
  10009: 'Extended +9',
  20000: 'Individual',
  20001: 'Member & Children',
  20002: 'Member & Spouse',
  20003: 'Family',
  20005: 'Extended +5',
  20007: 'Extended +7',
  20009: 'Extended +9',
}

function PlanIcon({ iconName, className }: { iconName: string; className?: string }) {
  const Icon = iconMap[iconName] || Shield
  return <Icon className={className || 'w-5 h-5'} />
}

function PricingTable({
  pricing,
  coverLabel,
}: {
  pricing: typeof plansData.singleMember.pricing
  coverLabel?: 'amount' | 'members' | 'type'
}) {
  if (!pricing || pricing.length === 0) return null

  const columnCount = pricing[0]?.ageGroups.length + 1

  return (
    <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        {/* Header */}
        <div
          className="grid bg-[rgba(255,255,255,0.03)] border-b border-glass-border"
          style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
        >
          <div className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50">
            {coverLabel === 'members' ? 'Members' : coverLabel === 'type' ? 'Plan Type' : 'Cover'}
          </div>
          {pricing[0]?.ageGroups.map((ag) => (
            <div
              key={ag.ageRange}
              className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50 text-center"
            >
              {ag.ageRange}
            </div>
          ))}
        </div>

        {/* Rows */}
        {pricing.map((row, i) => (
          <div
            key={row.coverAmount}
            className={cn(
              'grid border-b border-glass-border last:border-0',
              i % 2 === 0 ? '' : 'bg-[rgba(255,255,255,0.02)]'
            )}
            style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
          >
            <div className="p-4 font-semibold text-white text-sm">
              {coverLabel === 'members'
                ? extendedLabels[row.coverAmount] || `+${row.coverAmount}`
                : coverLabel === 'type'
                  ? specialtyLabels[row.coverAmount] || formatCurrency(row.coverAmount)
                  : formatCurrency(row.coverAmount)}
            </div>
            {row.ageGroups.map((ag) => (
              <div key={ag.ageRange} className="p-4 text-center text-sm text-white/70">
                {ag.premium ? `R${ag.premium}` : '\u2014'}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-glass-border">
        {pricing.map((row, i) => (
          <div
            key={row.coverAmount}
            className={cn('p-4', i % 2 === 0 ? '' : 'bg-[rgba(255,255,255,0.02)]')}
          >
            <div className="font-semibold text-white text-sm mb-3">
              {coverLabel === 'members'
                ? extendedLabels[row.coverAmount] || `+${row.coverAmount}`
                : coverLabel === 'type'
                  ? specialtyLabels[row.coverAmount] || formatCurrency(row.coverAmount)
                  : formatCurrency(row.coverAmount)}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {row.ageGroups.map((ag) => (
                <div
                  key={ag.ageRange}
                  className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg p-2 text-center"
                >
                  <div className="text-[10px] uppercase tracking-wider text-white/40 mb-0.5">
                    {ag.ageRange}
                  </div>
                  <div className="text-sm font-medium text-white/70">
                    {ag.premium ? `R${ag.premium}` : '\u2014'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlanHeader({ plan }: { plan: { name: string; icon: string; description: string; features: string[] } }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-glass-border flex items-center justify-center">
          <PlanIcon iconName={plan.icon} className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-heading font-bold text-xl text-white">
          {plan.name}
        </h3>
      </div>
      <p className="text-white/50 text-sm ml-[52px]">{plan.description}</p>
      <div className="flex flex-wrap gap-2 mt-3 ml-[52px]">
        {plan.features.map((f) => (
          <span
            key={f}
            className="px-3 py-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-full text-white/60 text-xs"
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function PlansTabNav() {
  const [activeTab, setActiveTab] = useState('main')
  const [activeSubTab, setActiveSubTab] = useState('singleMember')

  const renderMainPlans = () => {
    const plan = plansData[activeSubTab as keyof typeof plansData]
    if (!plan) return null

    return (
      <div>
        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {mainSubTabs.map((tab) => {
            const TabIcon = iconMap[tab.icon] || Shield
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  activeSubTab === tab.id
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-[rgba(255,255,255,0.03)] text-white/50 border border-[rgba(255,255,255,0.06)] hover:text-white/80 hover:border-white/20'
                )}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Plan Info */}
        <PlanHeader plan={plan} />

        {/* Pricing Table */}
        <PricingTable pricing={plan.pricing} coverLabel="amount" />
      </div>
    )
  }

  const renderExtendedPlans = () => {
    const plan = plansData.extendedFamily
    return (
      <div>
        <PlanHeader plan={plan} />
        <PricingTable pricing={plan.pricing} coverLabel="members" />
        <p className="text-white/40 text-xs mt-4">
          * Premiums shown are monthly. All extended plans include R10,000 cover per additional member.
        </p>
      </div>
    )
  }

  const renderSpecialtyPlan = (planKey: 'afterTears' | 'inkomo' | 'grocery') => {
    const plan = plansData[planKey]
    return (
      <div>
        <PlanHeader plan={plan} />
        <PricingTable pricing={plan.pricing} coverLabel="type" />
        <p className="text-white/40 text-xs mt-4">
          * Premiums shown are monthly. Extended options include R10,000 cover per additional member.
        </p>
      </div>
    )
  }

  const renderStandalonePlan = (planKey: 'cashPlan' | 'memberPlus' | 'tombstone') => {
    const plan = plansData[planKey]
    return (
      <div>
        <PlanHeader plan={plan} />
        <PricingTable pricing={plan.pricing} coverLabel="amount" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Main Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {mainTabs.map((tab) => {
          const TabIcon = iconMap[tab.icon] || Shield
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                if (tab.id === 'main') setActiveSubTab('singleMember')
              }}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-[0_4px_20px_rgba(0,136,255,0.3)]'
                  : 'bg-bg-card border border-glass-border text-white/60 hover:text-white hover:border-white/20 backdrop-blur-sm'
              )}
            >
              <TabIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + activeSubTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'main' && renderMainPlans()}
          {activeTab === 'extended' && renderExtendedPlans()}
          {activeTab === 'after-tears' && renderSpecialtyPlan('afterTears')}
          {activeTab === 'inkomo' && renderSpecialtyPlan('inkomo')}
          {activeTab === 'grocery' && renderSpecialtyPlan('grocery')}
          {activeTab === 'cashPlan' && renderStandalonePlan('cashPlan')}
          {activeTab === 'memberPlus' && renderStandalonePlan('memberPlus')}
          {activeTab === 'tombstone' && renderStandalonePlan('tombstone')}
        </motion.div>
      </AnimatePresence>

      {/* General Notes */}
      <div className="mt-12 bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-6 md:p-8">
        <h4 className="font-heading font-bold text-white mb-3">Important Information</h4>
        <ul className="space-y-2 text-white/50 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-secondary mt-0.5 shrink-0">&#8226;</span>
            <span>A 6-month waiting period applies for natural death claims. Accidental death is covered immediately.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-secondary mt-0.5 shrink-0">&#8226;</span>
            <span>No medical examination required for any plan.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-secondary mt-0.5 shrink-0">&#8226;</span>
            <span>Claims are processed within 48 hours of receiving all required documentation.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-secondary mt-0.5 shrink-0">&#8226;</span>
            <span>Children&apos;s cover is based on a percentage of the main member&apos;s cover amount according to age.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-secondary mt-0.5 shrink-0">&#8226;</span>
            <span>All plans are underwritten by Old Mutual and RMA. TFI Burial Society FSP No. 50841.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
