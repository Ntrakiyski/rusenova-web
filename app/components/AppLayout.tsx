'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import ContactSection from './ContactSection';
import Footer from './home/Footer';
import homeContent from '@/app/data/homeContent.json';

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
      <main>
        {children}
      </main>

      {/* Contact Section - appears on all pages */}
      <ContactSection content={homeContent.contact} />

      {/* Footer - appears on all pages */}
      <Footer />
    </div>
  );
}