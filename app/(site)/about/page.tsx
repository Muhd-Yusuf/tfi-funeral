import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, Heart, Users, Award, Handshake, Target, Building2, Megaphone, FileCheck } from 'lucide-react'
import AnimatedSection from '../AnimatedSection'

export const metadata: Metadata = {
  title: 'About Us — TFI Burial Society',
  description: 'Learn about TFI Burial Society (PTY) Ltd, marketed by Dignify Funeral Solutions, underwritten by Old Mutual and RMA. FSP No. 50841.',
}

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero Section */}
      <section className="relative px-6 md:px-10 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">
              About Us
            </p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
              Protecting South African Families with{' '}
              <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                Dignity
              </span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-6">
              TFI Burial Society (PTY) Ltd was founded with a simple mission: to ensure that every South African family can give their loved ones a dignified farewell, without the devastating financial burden.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Marketed by Dignify Funeral Solutions and underwritten by Old Mutual and RMA — two of the most trusted names in South African insurance — we offer comprehensive funeral cover plans starting from just R39 per month, covering up to R30,000 for individuals, families, and extended family members.
            </p>

            {/* Registration Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-bg-card border border-glass-border rounded-xl backdrop-blur-xl">
              <Shield size={20} className="text-primary" />
              <div>
                <div className="text-white font-semibold text-sm">FSP No. 50841</div>
                <div className="text-white/40 text-xs">Authorised Financial Services Provider</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-glass-border">
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
              alt="Family togetherness"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Company Structure */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">
            Who We Are
          </p>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            Our Structure
          </h2>
          <p className="text-white/65">
            A trusted partnership bringing you reliable funeral cover backed by industry-leading underwriters.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 text-center hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center mb-5">
              <Building2 size={24} className="text-primary" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">TFI Burial Society (PTY) Ltd</h3>
            <p className="text-white/50 text-sm">
              The registered funeral cover provider, operating as a juristic representative under House of Administration (Pty) Ltd.
            </p>
          </div>

          <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 text-center hover:border-secondary/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 flex items-center justify-center mb-5">
              <Megaphone size={24} className="text-secondary" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">Dignify Funeral Solutions</h3>
            <p className="text-white/50 text-sm">
              Our marketing and distribution partner, connecting communities with affordable funeral cover through trusted local agents.
            </p>
          </div>

          <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 text-center hover:border-gold/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 flex items-center justify-center mb-5">
              <FileCheck size={24} className="text-gold" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">Old Mutual & RMA</h3>
            <p className="text-white/50 text-sm">
              Our underwriters — South Africa&apos;s most reputable financial institutions ensuring your claims are always honoured.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Mission & Vision */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center mb-5">
              <Target size={20} className="text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white mb-3">Our Mission</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              To provide affordable, accessible funeral cover that ensures every South African family can afford a dignified burial for their loved ones. We believe financial hardship should never add to the pain of loss.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 relative overflow-hidden group hover:border-secondary/30 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 border border-secondary/20 flex items-center justify-center mb-5">
              <Heart size={20} className="text-secondary" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white mb-3">Our Vision</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              To be South Africa&apos;s most trusted funeral cover provider, known for our compassionate service, fast claims processing, and genuine care for the families we serve during their most difficult moments.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Partners */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">
            Our Partners
          </p>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            Backed by Industry Leaders
          </h2>
          <p className="text-white/65">
            Our funeral plans are underwritten by some of South Africa&apos;s most reputable financial institutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Old Mutual */}
          <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 text-center hover:border-primary/30 transition-all duration-300">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center mb-5">
              <Building2 size={28} className="text-primary" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">Old Mutual</h3>
            <p className="text-white/50 text-sm">
              South Africa&apos;s oldest mutual life insurance company, with over 178 years of experience protecting families.
            </p>
          </div>

          {/* RMA */}
          <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 text-center hover:border-secondary/30 transition-all duration-300">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 flex items-center justify-center mb-5">
              <Shield size={28} className="text-secondary" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">RMA</h3>
            <p className="text-white/50 text-sm">
              Rand Mutual Assurance — a leading South African insurer providing reliable underwriting for funeral cover products.
            </p>
          </div>

          {/* Dignify */}
          <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 text-center hover:border-gold/30 transition-all duration-300">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 flex items-center justify-center mb-5">
              <Award size={28} className="text-gold" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">Dignify Funeral Solutions</h3>
            <p className="text-white/50 text-sm">
              Our marketing partner ensuring dignified funeral solutions reach communities across South Africa.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Values */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">
            Our Values
          </p>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            What Drives Us
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Heart, title: 'Compassion', description: 'We treat every family with empathy and understanding during their most difficult times.' },
            { icon: Shield, title: 'Integrity', description: 'Transparent pricing, honest communication, and fair claims processing — always.' },
            { icon: Users, title: 'Community', description: 'We serve and uplift the communities we are part of, because we are one of them.' },
            { icon: Award, title: 'Excellence', description: 'We strive for excellence in service delivery, processing claims within 48 hours.' },
            { icon: Handshake, title: 'Trust', description: 'Backed by Old Mutual and RMA, we deliver on our promises — every single time.' },
            { icon: Target, title: 'Accessibility', description: 'From R39/month, funeral cover should be affordable for every South African family.' },
          ].map((value) => (
            <div
              key={value.title}
              className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-6 hover:border-primary/20 transition-all duration-300"
            >
              <value.icon size={20} className="text-primary mb-4" />
              <h3 className="font-heading font-bold text-white mb-2">{value.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Disclaimer */}
      <AnimatedSection className="py-10 px-6 md:px-10">
        <div className="max-w-4xl mx-auto bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <FileCheck size={18} className="text-white/50" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-sm mb-2">Regulatory Disclaimer</h3>
              <p className="text-white/45 text-xs leading-relaxed">
                TFI Brokers (Pty) Ltd is a juristic representative operating under House of Administration (Pty) Ltd, an authorised Financial Services Provider (FSP No. 50841). Terms & Conditions Apply.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-secondary/5 blur-[80px]" />

          <h2 className="relative font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            Ready to Protect Your Family?
          </h2>
          <p className="relative text-white/60 text-base mb-8 max-w-lg mx-auto">
            Get a personalized quote today. Our team is ready to help you find the perfect plan for your family&apos;s needs.
          </p>
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-primary to-[#0066CC] rounded-full text-white font-bold shadow-[0_4px_30px_rgba(0,136,255,0.4)] hover:shadow-[0_8px_40px_rgba(0,136,255,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              Get a Quote
            </Link>
            <Link
              href="/plans"
              className="px-8 py-4 border border-glass-border rounded-full text-white font-semibold hover:border-secondary hover:bg-secondary/10 transition-all duration-300 backdrop-blur-sm"
            >
              View Plans
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
