import Link from 'next/link'
import { Shield, Wallet, Users, Zap, Building2, Headphones, Star, ChevronDown, MessageCircle, Clock, Award, TrendingUp, User, Heart, Home } from 'lucide-react'
import { plansData, childBenefits, whyChooseUs } from '@/lib/plans-data'
import { formatCurrency } from '@/lib/utils'
import QuickQuoteForm from './QuickQuoteForm'
import FAQAccordion from './FAQAccordion'
import ContactForm from './ContactForm'
import AnimatedSection from './AnimatedSection'

export const metadata = {
  title: 'TFI Burial Society — Affordable Funeral Cover for South African Families',
  description: 'Funeral cover from R39/month. Plans for individuals, couples, and families. Underwritten by Old Mutual & RMA. FSP No. 50841.',
}

export default function HomePage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-10 pt-28 pb-20">
        {/* Hero Background Pattern */}
        <div className="absolute inset-0 z-0">
          {/* Radial gradient pattern for professional look */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,136,255,0.15)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,200,150,0.08)_0%,transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,136,255,0.06)_0%,transparent_30%)]" />
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/30 via-bg-deep/60 to-bg-deep" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-glass-bg border border-glass-border rounded-full text-xs text-secondary-light backdrop-blur-sm mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
            FSP No. 50841 — Underwritten by Old Mutual &amp; RMA
          </div>

          {/* Headline */}
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-7xl leading-[1.1] mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-primary-light via-secondary-light to-gold bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-shift">
              Affordable Funeral Cover
            </span>
            <br />
            <span className="text-white">for You &amp; Your Family</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up">
            Protect your loved ones with comprehensive funeral cover starting from just R39/month. Fast claims, trusted partners, complete peace of mind.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up">
            <Link
              href="/contact"
              className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-primary to-[#0066CC] rounded-full text-white font-bold shadow-[0_4px_30px_rgba(0,136,255,0.4)] hover:shadow-[0_8px_40px_rgba(0,136,255,0.6)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-400"
            >
              Get a Quote
            </Link>
            <a
              href="https://wa.me/27730278136?text=Hi%2C%20I%27m%20interested%20in%20funeral%20cover%20from%20TFI%20Burial%20Society."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full text-white font-bold shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:-translate-y-1 transition-all duration-300"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>

          {/* Partner Logos */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-[rgba(255,255,255,0.08)] animate-fade-in-up">
            <span className="text-[10px] uppercase tracking-[3px] text-white/40">Trusted Partners</span>
            <div className="flex items-center gap-3">
              {['Dignify Funeral Solutions', 'Old Mutual', 'RMA'].map((partner) => (
                <span
                  key={partner}
                  className="px-4 py-2 bg-glass-bg border border-[rgba(255,255,255,0.08)] rounded-xl text-white/50 font-semibold text-sm backdrop-blur-sm"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ROW ===== */}
      <AnimatedSection className="py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: '15K+', label: 'Active Members', icon: Users },
            { value: 'R30K', label: 'Max Cover', icon: Shield },
            { value: '48hr', label: 'Claims Process', icon: Clock },
            { value: '99%', label: 'Claims Ratio', icon: Award },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-5 md:p-6 text-center group hover:border-primary/30 transition-all duration-300"
            >
              <stat.icon className="mx-auto mb-3 text-primary" size={24} />
              <div className="font-heading font-black text-2xl md:text-3xl text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/50 text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ===== QUICK QUOTE FORM ===== */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">Instant Quote</p>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            Get Your Quote in Seconds
          </h2>
          <p className="text-white/65">
            Select your plan type, cover amount, and age group to see your monthly premium.
          </p>
        </div>
        <QuickQuoteForm />
      </AnimatedSection>

      {/* ===== PLAN CARDS ===== */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">Our Plans</p>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            Choose Your Cover
          </h2>
          <p className="text-white/65">
            Flexible funeral cover options to fit every family and budget.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Single Member Card */}
          <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 hover:border-primary/30 hover:-translate-y-1 transition-all duration-400 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center mb-4">
              <User size={22} className="text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white mb-2">Single Member</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-white/50 text-sm">From</span>
              <span className="font-heading font-black text-3xl text-primary">R39</span>
              <span className="text-white/50 text-sm">/month</span>
            </div>
            <ul className="space-y-2 mb-6">
              {['Cover up to R30,000', 'Ages 18 – 85+', 'Fast 48hr claims', 'No medical exam'].map((f) => (
                <li key={f} className="flex items-start gap-2 text-white/60 text-sm">
                  <span className="text-secondary mt-0.5">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/plans" className="block w-full text-center px-6 py-3 border border-glass-border rounded-full text-white/80 text-sm font-semibold hover:border-primary hover:bg-primary/10 transition-all duration-300">
              View Details
            </Link>
          </div>

          {/* Member & Spouse Card (Popular) */}
          <div className="relative bg-bg-card border border-primary/40 rounded-2xl backdrop-blur-xl p-8 hover:-translate-y-1 transition-all duration-400 group shadow-[0_0_30px_rgba(0,136,255,0.1)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
              Most Popular
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center mb-4">
              <Heart size={22} className="text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white mb-2">Member &amp; Spouse</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-white/50 text-sm">From</span>
              <span className="font-heading font-black text-3xl text-primary">R51</span>
              <span className="text-white/50 text-sm">/month</span>
            </div>
            <ul className="space-y-2 mb-6">
              {['Both partners covered', 'Cover up to R30,000', 'Joint affordable premiums', 'No medical exam'].map((f) => (
                <li key={f} className="flex items-start gap-2 text-white/60 text-sm">
                  <span className="text-secondary mt-0.5">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/plans" className="block w-full text-center px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white text-sm font-bold shadow-[0_4px_20px_rgba(0,136,255,0.3)] hover:shadow-[0_8px_30px_rgba(0,136,255,0.5)] transition-all duration-300">
              View Details
            </Link>
          </div>

          {/* Family Card */}
          <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 hover:border-primary/30 hover:-translate-y-1 transition-all duration-400 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center mb-4">
              <Home size={22} className="text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white mb-2">Family Plan</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-white/50 text-sm">From</span>
              <span className="font-heading font-black text-3xl text-primary">R58</span>
              <span className="text-white/50 text-sm">/month</span>
            </div>
            <ul className="space-y-2 mb-6">
              {['Member, spouse & children', 'Cover up to R30,000', 'Child benefits included', 'Extended add-ons'].map((f) => (
                <li key={f} className="flex items-start gap-2 text-white/60 text-sm">
                  <span className="text-secondary mt-0.5">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/plans" className="block w-full text-center px-6 py-3 border border-glass-border rounded-full text-white/80 text-sm font-semibold hover:border-primary hover:bg-primary/10 transition-all duration-300">
              View Details
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ===== FULL PRICING TABLE ===== */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">Pricing</p>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            Single Member Pricing
          </h2>
          <p className="text-white/65">
            Transparent pricing — no hidden fees. All premiums are monthly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 bg-[rgba(255,255,255,0.03)] border-b border-glass-border">
            <div className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50">Cover</div>
            <div className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50 text-center">18-64</div>
            <div className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50 text-center">65-74</div>
            <div className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50 text-center">75-84</div>
            <div className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50 text-center">85+</div>
          </div>

          {/* Table Rows */}
          {plansData.singleMember.pricing.map((row, i) => (
            <div
              key={row.coverAmount}
              className={`grid grid-cols-5 border-b border-glass-border last:border-0 ${i % 2 === 0 ? '' : 'bg-[rgba(255,255,255,0.02)]'}`}
            >
              <div className="p-4 font-semibold text-white text-sm">
                {formatCurrency(row.coverAmount)}
              </div>
              {row.ageGroups.map((ag) => (
                <div key={ag.ageRange} className="p-4 text-center text-sm text-white/70">
                  {ag.premium ? `R${ag.premium}` : '—'}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/plans" className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:text-primary-light transition-colors">
            View all plan pricing <span>&rarr;</span>
          </Link>
        </div>
      </AnimatedSection>

      {/* ===== CHILD BENEFITS ===== */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-gold mb-3">Child Benefits</p>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            Children&apos;s Cover Percentage
          </h2>
          <p className="text-white/65">
            Children receive a percentage of the main member&apos;s cover amount based on their age.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {childBenefits.map((benefit) => (
            <div
              key={benefit.ageRange}
              className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-6 text-center hover:border-gold/30 transition-all duration-300 group"
            >
              <div className="font-heading font-black text-3xl md:text-4xl bg-gradient-to-r from-gold to-[#FF8C00] bg-clip-text text-transparent mb-2">
                {benefit.percentage}%
              </div>
              <div className="text-white/60 text-xs md:text-sm">{benefit.ageRange}</div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ===== WHY CHOOSE US ===== */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">Why Us</p>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            Why Choose TFI Burial Society
          </h2>
          <p className="text-white/65">
            We go above and beyond to protect South African families during their most difficult moments.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, i) => {
            const icons = [Shield, Wallet, Users, Zap, Building2, Headphones]
            const Icon = icons[i] || Shield
            return (
              <div
                key={item.title}
                className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-6 hover:border-primary/30 hover:-translate-y-1 transition-all duration-400 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center mb-4 group-hover:border-primary/40 transition-colors">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </AnimatedSection>

      {/* ===== TESTIMONIALS ===== */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">Testimonials</p>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            What Our Members Say
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'TFI made a devastating time so much easier for our family. The claim was processed in under 48 hours and the team was incredibly supportive.',
              author: 'Nomsa M.',
              role: 'Family Plan Member',
              stars: 5,
            },
            {
              quote: 'I never thought I could afford funeral cover, but TFI changed that. R39 a month gives me complete peace of mind knowing my family is protected.',
              author: 'Sipho K.',
              role: 'Single Member',
              stars: 5,
            },
            {
              quote: 'The extended family plan is incredible. We have 9 family members covered under one policy. Truly affordable and comprehensive.',
              author: 'Thembi N.',
              role: 'Extended Family Member',
              stars: 5,
            },
          ].map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-white text-sm">{testimonial.author}</div>
                <div className="text-white/40 text-xs">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ===== FAQ ===== */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">FAQ</p>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>
        <FAQAccordion />
      </AnimatedSection>

      {/* ===== CONTACT CTA ===== */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">Get in Touch</p>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            Ready to Protect Your Family?
          </h2>
          <p className="text-white/65">
            Send us a message or chat with us on WhatsApp. We respond within minutes.
          </p>
        </div>
        <ContactForm />
      </AnimatedSection>
    </>
  )
}
