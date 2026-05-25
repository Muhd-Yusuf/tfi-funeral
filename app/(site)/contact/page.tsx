import { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook } from 'lucide-react'
import AnimatedSection from '../AnimatedSection'
import ContactPageForm from './ContactPageForm'

export const metadata: Metadata = {
  title: 'Contact Us — TFI Burial Society',
  description: 'Get in touch with TFI Burial Society. Request a quote, ask about plans, or chat with us on WhatsApp.',
}

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Page Header */}
      <section className="px-6 md:px-10 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-secondary mb-3">
            Contact Us
          </p>
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-white/65 text-lg">
            We&apos;re here to help. Whether you need a quote, have questions about our plans, or want to make a claim, reach out to us.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <AnimatedSection className="px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form — spans 3 cols */}
          <div className="lg:col-span-3">
            <ContactPageForm />
          </div>

          {/* Sidebar Info — spans 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* WhatsApp Card */}
            <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-6 relative overflow-hidden hover:border-[#25D366]/30 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#25D366] to-transparent" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#25D366]/20 to-[#128C7E]/20 border border-[#25D366]/20 flex items-center justify-center shrink-0">
                  <MessageCircle size={20} className="text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white mb-1">WhatsApp Us</h3>
                  <p className="text-white/50 text-sm mb-2">073 027 8136</p>
                  <p className="text-white/50 text-sm mb-3">Get instant responses on WhatsApp. We typically reply within minutes.</p>
                  <a
                    href="https://wa.me/27730278136?text=Hi%2C%20I%27m%20interested%20in%20funeral%20cover%20from%20TFI%20Burial%20Society."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full text-white text-sm font-semibold shadow-[0_4px_15px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_25px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <MessageCircle size={14} />
                    Chat Now
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-6">
              <h3 className="font-heading font-bold text-white mb-5">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">Head Office</div>
                    <a href="tel:0458381171" className="text-white/50 text-sm hover:text-primary transition-colors">
                      045 838 1171
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <MessageCircle size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">WhatsApp</div>
                    <a href="https://wa.me/27730278136" target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-[#25D366] transition-colors">
                      073 027 8136
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">Email</div>
                    <a href="mailto:dignifyfuneralsolutions@gmail.com" className="text-white/50 text-sm hover:text-primary transition-colors">
                      dignifyfuneralsolutions@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center shrink-0">
                    <Facebook size={14} className="text-[#1877F2]" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">Facebook</div>
                    <a href="https://facebook.com/DignifyFuneralSolutions" target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-[#1877F2] transition-colors">
                      Dignify Funeral Solutions
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Business Hours Card */}
            <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <Clock size={18} className="text-secondary" />
                <h3 className="font-heading font-bold text-white">Business Hours</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Monday - Friday</span>
                  <span className="text-white text-sm font-medium">08:00 - 17:00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Saturday</span>
                  <span className="text-white text-sm font-medium">09:00 - 13:00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Sunday & Public Holidays</span>
                  <span className="text-white/40 text-sm">Closed</span>
                </li>
                <li className="pt-2 border-t border-glass-border">
                  <span className="text-secondary text-xs font-medium">WhatsApp available 24/7 for emergencies</span>
                </li>
              </ul>
            </div>

            {/* Marketed By Card */}
            <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-6">
              <h3 className="font-heading font-bold text-white mb-4">Marketed By</h3>
              <p className="text-white/65 text-sm mb-2 font-medium">
                Dignify Funeral Solutions
              </p>
              <p className="text-white/40 text-xs leading-relaxed">
                TFI Brokers (Pty) Ltd is a juristic representative operating under House of Administration (Pty) Ltd, an authorised Financial Services Provider (FSP No. 50841). Terms & Conditions Apply.
              </p>
            </div>

            {/* Become an Agent */}
            <div className="bg-bg-card border border-glass-border rounded-2xl backdrop-blur-xl p-6">
              <h3 className="font-heading font-bold text-white mb-4">Become an Agent</h3>
              <p className="text-white/50 text-sm mb-4">
                Interested in becoming a TFI agent? Contact us for information about earning opportunities in your community.
              </p>
              <a href="tel:0458381171" className="flex items-center gap-2 text-primary text-sm font-semibold hover:text-primary-light transition-colors">
                <Phone size={14} />
                <span>045 838 1171</span>
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
