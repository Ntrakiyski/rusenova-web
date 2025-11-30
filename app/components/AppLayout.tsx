'use client';

import { usePathname } from 'next/navigation';
import { Navbar1 } from '@/components/navbar1';
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
    <div className={`overflow-x-hidden ${isHomePage ? "min-h-screen bg-[#f7f4ed]" : "min-h-screen bg-white"}`}>
      {/* Navigation - background changes based on page */}
      <Navbar1 />

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