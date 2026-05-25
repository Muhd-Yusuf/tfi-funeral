'use client'

import { useState } from 'react'
import { plansData } from '@/lib/plans-data'
import { formatCurrency } from '@/lib/utils'
import { Calculator } from 'lucide-react'

type QuoteResult = { type: 'found'; premium: number } | { type: 'unavailable' } | null

export default function QuickQuoteForm() {
  const [planType, setPlanType] = useState('singleMember')
  const [coverAmount, setCoverAmount] = useState('10000')
  const [ageGroup, setAgeGroup] = useState('18-64')
  const [result, setResult] = useState<QuoteResult>(null)

  const handleCalculate = () => {
    const plan = plansData[planType as keyof typeof plansData]
    if (!plan) return

    const pricing = plan.pricing.find((p) => p.coverAmount === Number(coverAmount))
    if (!pricing) {
      setResult({ type: 'unavailable' })
      return
    }

    const ageData = pricing.ageGroups.find((ag) => ag.ageRange === ageGroup)
    if (ageData?.premium) {
      setResult({ type: 'found', premium: ageData.premium })
    } else {
      setResult({ type: 'unavailable' })
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 md:p-10 relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Plan Type */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">
            Plan Type
          </label>
          <select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            className="w-full px-4 py-3.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-white text-sm font-medium outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,136,255,0.15)] transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value="singleMember" className="bg-bg-surface">Single Member</option>
            <option value="memberChildren" className="bg-bg-surface">Member &amp; Children</option>
            <option value="memberSpouse" className="bg-bg-surface">Member &amp; Spouse</option>
            <option value="family" className="bg-bg-surface">Family Plan</option>
          </select>
        </div>

        {/* Cover Amount */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">
            Cover Amount
          </label>
          <select
            value={coverAmount}
            onChange={(e) => setCoverAmount(e.target.value)}
            className="w-full px-4 py-3.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-white text-sm font-medium outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,136,255,0.15)] transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value="5000" className="bg-bg-surface">R5,000</option>
            <option value="10000" className="bg-bg-surface">R10,000</option>
            <option value="15000" className="bg-bg-surface">R15,000</option>
            <option value="20000" className="bg-bg-surface">R20,000</option>
            <option value="30000" className="bg-bg-surface">R30,000</option>
          </select>
        </div>

        {/* Age Group */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">
            Age Group
          </label>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="w-full px-4 py-3.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-white text-sm font-medium outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,136,255,0.15)] transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value="18-64" className="bg-bg-surface">18 – 64 years</option>
            <option value="65-74" className="bg-bg-surface">65 – 74 years</option>
            <option value="75-84" className="bg-bg-surface">75 – 84 years</option>
            <option value="85+" className="bg-bg-surface">85+ years</option>
          </select>
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-[#0066CC] rounded-xl text-white font-bold shadow-[0_4px_30px_rgba(0,136,255,0.3)] hover:shadow-[0_8px_40px_rgba(0,136,255,0.5)] hover:-translate-y-0.5 transition-all duration-300"
      >
        <Calculator size={18} />
        Calculate Premium
      </button>

      {/* Result */}
      {result?.type === 'found' && (
        <div className="mt-6 p-5 bg-[rgba(0,136,255,0.05)] border border-primary/20 rounded-xl text-center animate-fade-in-up">
          <p className="text-white/60 text-sm mb-1">Your estimated monthly premium</p>
          <p className="font-heading font-black text-4xl text-primary">
            R{result.premium}
          </p>
          <p className="text-white/40 text-xs mt-2">
            For {formatCurrency(Number(coverAmount))} cover, ages {ageGroup}
          </p>
        </div>
      )}

      {result?.type === 'unavailable' && (
        <div className="mt-6 p-5 bg-[rgba(255,181,71,0.05)] border border-gold/20 rounded-xl text-center animate-fade-in-up">
          <p className="text-white/60 text-sm">
            This combination is not available. Please try a different selection.
          </p>
        </div>
      )}
    </div>
  )
}
