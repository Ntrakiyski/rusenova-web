'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import ContactSection from './ContactSection';
import Footer from './home/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className={isHomePage ? "min-h-screen bg-[#f7f4ed]" : "min-h-screen bg-white"}>
      {/* Navigation - background changes based on page */}
      <Navigation isDark={!isHomePage} />

      {/* Main content area */}
      <main className="pt-20">
        {children}
      </main>

      {/* Contact Section - appears on all pages */}
      <ContactSection />

      {/* Footer - appears on all pages */}
      <Footer />
    </div>
  );
}