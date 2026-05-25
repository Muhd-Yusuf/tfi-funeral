'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { LogOut, User } from 'lucide-react'
import { signOut } from 'next-auth/react'

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [status, router, pathname])

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0F1729]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3B82F6] border-t-transparent" />
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Login page doesn't need the admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0F1729]">
      <AdminSidebar />

      {/* Main content */}
      <div className="ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#2A3545] bg-[#0F1729]/80 px-6 backdrop-blur-md">
          <div>
            <h1 className="text-sm font-medium text-gray-400">
              Welcome back,
            </h1>
            <p className="text-sm font-semibold text-white">
              {session.user?.name || 'Admin'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-[#2A3545] bg-[#1A2332] px-3 py-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">
                {session.user?.email}
              </span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center gap-2 rounded-lg border border-[#2A3545] px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <AdminGuard>{children}</AdminGuard>
    </SessionProvider>
  )
}
