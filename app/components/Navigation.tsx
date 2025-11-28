'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  isDark?: boolean;
  background?: string;
}

export default function Navigation({ isDark = false, background }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  // Use provided background prop or default based on isDark
  const bgColor = background || (isDark ? 'bg-[#252222]/95' : 'bg-[#f7f4ed]/95');
  const textColor = isDark ? 'text-white' : 'text-[#191818]';
  const linkColor = isDark ? 'text-[#babcc0] hover:text-white' : 'text-[#494848] hover:text-[#191818]';

  const navItems = [
    { label: 'Home', href: '/', section: 'home' },
    { label: 'Projects', href: '/#projects', section: 'projects' },
    { label: 'Experience', href: '/#experience', section: 'experience' },
    { label: 'About', href: '/#about', section: 'about' },
    { label: 'Contact', href: '/#contact', section: 'contact' }
  ];

  const isOnHomePage = () => {
    return pathname === '/';
  };

  // Determine if we should use dark background for mobile menu
  const mobileMenuBgColor = isDark ? 'bg-[#252222]/95' : 'bg-[#f7f4ed]/95';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isOnHomePage()) return;
      const sections = ['projects', 'experience', 'about', 'contact'];
      const scrollPosition = window.scrollY + 150;

      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleNavClick = (href: string, section: string) => {
    setMobileMenuOpen(false);
    const sectionId = href.includes('#') ? href.split('#')[1] : '';

    if (href === '/') {
      // Use Next.js router for navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('/#')) {
      scrollToSection(sectionId);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${bgColor} backdrop-blur-sm`}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5">
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative size-[32px] md:size-[40px]">
              <Image
                alt="Gloria Logo"
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src="/rag-results.png"
                width={40}
                height={40}
              />
            </div>
            <p
              className={`font-['Bricolage_Grotesque:96pt_ExtraBold',sans-serif] ${textColor} text-[20px] md:text-[24px]`}
              style={{ fontVariationSettings: "'opsz' 96, 'wdth' 100" }}
            >
              Gloria
            </p>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.section);
                  }}
                  className={`font-['Bricolage_Grotesque:Regular',sans-serif] ${
                    isActive ? (isDark ? 'text-white' : 'text-[#191818]') : linkColor
                  } transition-colors text-[16px] cursor-pointer ${
                    isActive ? 'underline decoration-2 underline-offset-4' : ''
                  }`}
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 ${textColor}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className={`md:hidden border-t ${isDark ? 'border-white/10' : 'border-[#191818]/10'} ${mobileMenuBgColor} pb-4`}>
            {navItems.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.section);
                  }}
                  className={`block px-4 py-3 font-['Bricolage_Grotesque:Regular',sans-serif] ${
                    isActive ? (isDark ? 'text-white' : 'text-[#191818]') : linkColor
                  } text-[16px] cursor-pointer ${
                    isActive ? 'underline decoration-2 underline-offset-4' : ''
                  }`}
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}