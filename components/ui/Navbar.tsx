'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/plans', label: 'Plans' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[1000]',
          'px-5 md:px-10 py-4',
          'flex items-center justify-between',
          'transition-all duration-300',
          'border-b',
          isScrolled
            ? 'bg-[rgba(3,11,26,0.9)] backdrop-blur-xl border-[rgba(255,255,255,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-[rgba(3,11,26,0.6)] backdrop-blur-md border-transparent'
        )}
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/images/logo.png"
            alt="TFI Burial Society Logo"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
          />
          <span className="font-heading text-xl md:text-[1.4rem] font-extrabold bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
            TFI Burial Society
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'relative text-[0.9rem] font-medium text-white/65',
                  'hover:text-white transition-colors duration-300',
                  // Underline animation
                  "after:content-[''] after:absolute after:bottom-[-4px] after:left-0",
                  'after:w-0 after:h-[2px]',
                  'after:bg-gradient-to-r after:from-primary after:to-secondary',
                  'after:transition-all after:duration-300',
                  'hover:after:w-full'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className={cn(
            'hidden md:inline-flex items-center gap-2',
            'px-6 py-2.5',
            'bg-gradient-to-br from-primary to-secondary',
            'rounded-full text-white text-[0.85rem] font-semibold',
            'shadow-[0_4px_20px_rgba(0,136,255,0.3)]',
            'hover:shadow-[0_8px_30px_rgba(0,136,255,0.5)]',
            'hover:-translate-y-0.5',
            'transition-all duration-300'
          )}
        >
          <Phone size={14} />
          Get a Quote
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden relative z-[1001] p-2 text-white"
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <span
              className={cn(
                'w-full h-[2px] bg-white rounded-full transition-all duration-300 origin-center',
                isMobileOpen && 'rotate-45 translate-y-[9px]'
              )}
            />
            <span
              className={cn(
                'w-full h-[2px] bg-white rounded-full transition-all duration-300',
                isMobileOpen && 'opacity-0 scale-0'
              )}
            />
            <span
              className={cn(
                'w-full h-[2px] bg-white rounded-full transition-all duration-300 origin-center',
                isMobileOpen && '-rotate-45 -translate-y-[9px]'
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[999] md:hidden',
          'bg-[rgba(3,11,26,0.98)] backdrop-blur-2xl',
          'transition-all duration-400',
          isMobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-8 py-20">
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className={cn(
                  'transition-all duration-500',
                  isMobileOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                )}
                style={{
                  transitionDelay: isMobileOpen ? `${150 + i * 75}ms` : '0ms',
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-2xl font-heading font-bold text-white/80 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div
            className={cn(
              'mt-12 transition-all duration-500',
              isMobileOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            )}
            style={{
              transitionDelay: isMobileOpen ? '450ms' : '0ms',
            }}
          >
            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-primary to-secondary rounded-full text-white font-semibold shadow-[0_4px_20px_rgba(0,136,255,0.3)]"
            >
              <Phone size={16} />
              Get a Quote
            </Link>
          </div>

          {/* Decorative gradient orb */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-[80px] pointer-events-none" />
        </div>
      </div>
    </>
  )
}
