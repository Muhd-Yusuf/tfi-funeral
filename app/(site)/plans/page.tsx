import { Metadata } from 'next'
import { plansData, childBenefits } from '@/lib/plans-data'
import { formatCurrency } from '@/lib/utils'
import PlansTabNav from './PlansTabNav'

export const metadata: Metadata = {
  title: 'Our Plans — TFI Burial Society',
  description: 'View all funeral cover plans from TFI Burial Society. Single, couple, family, extended, After Tears, Inkomo, and Grocery plans.',
}

export default function PlansPage() {
  return (
    <div className="pt-28 pb-20 px-6 md:px-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">
          All Plans
        </p>
        <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
          Find Your Perfect Cover
        </h1>
        <p className="text-white/65 text-lg">
          Choose from our comprehensive range of funeral cover plans. Individual, family, extended, and specialty plans to suit every need and budget.
        </p>
      </div>

      {/* Child Benefits Info */}
      <div className="max-w-4xl mx-auto mb-12 bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-6 md:p-8">
        <h3 className="font-heading font-bold text-lg text-white mb-4">
          <span className="bg-gradient-to-r from-gold to-[#FF8C00] bg-clip-text text-transparent">Children&apos;s Benefit</span> Percentages
        </h3>
        <p className="text-white/50 text-sm mb-4">
          Children receive a percentage of the main member&apos;s cover amount based on their age:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {childBenefits.map((benefit) => (
            <div key={benefit.ageRange} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl p-3 text-center">
              <div className="font-heading font-black text-xl text-gold">{benefit.percentage}%</div>
              <div className="text-white/50 text-xs mt-1">{benefit.ageRange}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans Tab Navigation (Client Component) */}
      <PlansTabNav />
    </div>
  )
}
