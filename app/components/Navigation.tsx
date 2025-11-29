'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  isDark?: boolean;
}

export default function Navigation({}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  // Use cream background on home page, dark on other pages
  const isHomePage = pathname === '/';
  const bgColor = isHomePage ? 'bg-[#f7f4ed]' : 'bg-[#252222]';
  const textColor = isHomePage ? 'text-[#191818]' : 'text-white';
  const linkColor = isHomePage ? 'text-[#191818] hover:underline' : 'text-white hover:underline';

  const navItems = [
    { label: 'Home', href: '/', section: 'home' },
    { label: 'Projects', href: '/#projects', section: 'projects' },
    { label: 'Experience', href: '/#experience', section: 'experience' },
    { label: 'About', href: '/#about', section: 'about' },
    { label: 'Contact', href: '/#contact', section: 'contact' }
  ];

  // Determine if we should use dark background for mobile menu
  const mobileMenuBgColor = isHomePage ? 'bg-[#f7f4ed]/95' : 'bg-[#252222]/95';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Use hardcoded heights: 72px for mobile, 80px for desktop
      const headerHeight = window.innerWidth >= 768 ? 80 : 72;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const updateActiveSection = () => {
      if (pathname !== '/') return;
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
    
    const handleScroll = () => {
      // Clear existing timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      // Debounce the scroll handler to prevent flickering
      scrollTimeout = setTimeout(() => {
        updateActiveSection();
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    updateActiveSection();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [pathname]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const sectionId = href.includes('#') ? href.split('#')[1] : '';

    if (href === '/') {
      // Use Next.js router for navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('/#')) {
      if (pathname === '/') {
        // If on home page, just scroll to the section
        scrollToSection(sectionId);
      } else {
        // If on different page, navigate to home page first, then scroll to section
        window.location.assign(href);
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 ${bgColor} shadow-none border-0`}
      style={{
        boxShadow: 'none',
        border: 'none',
        borderWidth: '0',
        borderBottom: 'none',
        outline: 'none'
      }}
    >
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
                src="/flower_logo.png"
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

          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`block px-4 py-3 font-['Bricolage_Grotesque:Regular',sans-serif] ${
                    isActive ? (isHomePage ? 'text-[#191818]' : 'text-white') : linkColor
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

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 ${textColor}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className={`md:hidden ${mobileMenuBgColor} pb-4`}>
            {navItems.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`block px-4 py-3 font-['Bricolage_Grotesque:Regular',sans-serif] ${
                    isActive ? (isHomePage ? 'text-[#191818]' : 'text-white') : linkColor
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
