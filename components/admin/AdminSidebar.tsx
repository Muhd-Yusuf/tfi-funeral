'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Star,
  HelpCircle,
  Shield,
  ClipboardList,
  LogOut,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Plans', href: '/admin/plans', icon: Shield },
  { label: 'Quotes', href: '/admin/quotes', icon: ClipboardList },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { label: 'Site Content', href: '/admin/content', icon: FileText },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[#2A3545] bg-[#0F1729]">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[#2A3545] px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B82F6]">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">TFI Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#3B82F6]/10 text-[#3B82F6]'
                      : 'text-gray-400 hover:bg-[#1A2332] hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 px-3 space-y-2">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
        <div className="rounded-lg border border-[#2A3545] bg-[#1A2332] p-3">
          <p className="text-xs text-gray-500">TFI Burial Society</p>
          <p className="text-xs text-gray-400">Admin Dashboard v1.0</p>
        </div>
      </div>
    </aside>
  )
}
