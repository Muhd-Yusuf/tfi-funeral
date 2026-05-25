import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import WhatsAppFAB from '@/components/ui/WhatsAppFAB'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-[1] min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp FAB */}
      <WhatsAppFAB />
    </>
  )
}
