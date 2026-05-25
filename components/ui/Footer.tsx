import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

const planLinks = [
  { label: 'Single Member', href: '/plans#single' },
  { label: 'Member & Spouse', href: '/plans#spouse' },
  { label: 'Member & Children', href: '/plans#children' },
  { label: 'Family Plan', href: '/plans#family' },
  { label: 'Extended Family', href: '/plans#extended' },
  { label: 'Cash Plan', href: '/plans#cash' },
  { label: 'Member Plus', href: '/plans#member-plus' },
  { label: 'Inkomo Plan', href: '/plans#inkomo' },
  { label: 'Tombstone Plan', href: '/plans#tombstone' },
  { label: 'Grocery Plan', href: '/plans#grocery' },
  { label: 'After Tears', href: '/plans#after-tears' },
]

const companyLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Plans', href: '/plans' },
  { label: 'Contact', href: '/contact' },
  { label: 'Get a Quote', href: '/contact' },
  { label: 'Claims', href: '/contact#claims' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Complaints Procedure', href: '/complaints' },
  { label: 'POPIA Compliance', href: '/popia' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgba(255,255,255,0.08)] bg-[rgba(3,11,26,0.9)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 md:pt-20 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          {/* Brand Column */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4"
            >
              <Image
                src="/images/logo.png"
                alt="TFI Burial Society Logo"
                width={36}
                height={36}
                className="h-9 w-auto object-contain"
              />
              <span className="font-heading text-[1.3rem] font-extrabold bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                TFI Burial Society
              </span>
            </Link>
            <p className="text-white/50 text-[0.85rem] leading-[1.7] max-w-[320px]">
              Affordable funeral cover for South African families. Flexible plans from R5,000 to R30,000 with cover for individuals, spouses, children, and extended family. Underwritten by Old Mutual & RMA.
            </p>

            {/* Partner Badges */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              {['Old Mutual', 'RMA', 'Dignify'].map((partner) => (
                <span
                  key={partner}
                  className="px-3 py-1.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white/50 text-xs font-medium backdrop-blur-sm"
                >
                  {partner}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://facebook.com/DignifyFuneralSolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white/50 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white/50 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://wa.me/27730278136"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white/50 hover:text-white hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Plans Column */}
          <div>
            <h4 className="text-[0.85rem] font-bold uppercase tracking-[2px] text-white mb-5">
              Our Plans
            </h4>
            <ul className="space-y-2.5">
              {planLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-[0.85rem] hover:text-primary-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-[0.85rem] font-bold uppercase tracking-[2px] text-white mb-5">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-[0.85rem] hover:text-primary-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal Column */}
          <div>
            <h4 className="text-[0.85rem] font-bold uppercase tracking-[2px] text-white mb-5">
              Contact
            </h4>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-primary mt-0.5 shrink-0" />
                <span className="text-white/50 text-[0.85rem]">045 838 1171</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-secondary mt-0.5 shrink-0" />
                <span className="text-white/50 text-[0.85rem]">WhatsApp: 073 027 8136</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-primary mt-0.5 shrink-0" />
                <span className="text-white/50 text-[0.85rem]">dignifyfuneralsolutions@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                <span className="text-white/50 text-[0.85rem]">South Africa</span>
              </li>
            </ul>

            <h4 className="text-[0.85rem] font-bold uppercase tracking-[2px] text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-[0.85rem] hover:text-primary-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-white/40 text-[0.75rem] leading-[1.7] text-center max-w-4xl mx-auto mb-6">
            TFI Burial Society is an authorised financial services provider (FSP No. 50841). Funeral policies underwritten by Old Mutual Life Assurance Company (South Africa) Ltd and RMA (Rand Mutual Assurance). All claims are subject to the terms and conditions of the policy. A waiting period of 6 months applies for natural causes. Cover amounts and premiums shown are for principal members aged 18-64 unless otherwise stated.
          </p>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[rgba(255,255,255,0.04)]">
            <p className="text-white/35 text-xs">
              &copy; {new Date().getFullYear()} TFI Burial Society. All rights reserved.
            </p>
            <p className="text-white/25 text-xs">
              FSP No. 50841 | Underwritten by Old Mutual & RMA
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
