"use client";

import { Menu, Briefcase, Code, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { mlProjects } from "@/app/data/mlProjects";
import { productDesignProjects } from "@/app/data/productDesignProjects";
import { 
  Accordion, 
 AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
  projectId?: string | number;
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/flower_logo.png",
    alt: "Gloria Logo",
    title: "Gloria",
  },
}: Navbar1Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  // Use consistent styling - always use light background and dark text
  const isHomePage = pathname === '/';
  const bgColor = 'bg-bg-light';
  const textColor = 'text-text-primary';
  const linkColor = 'text-text-primary hover:underline';

  // Mobile menu background
  const mobileMenuBgColor = 'bg-bg-light';
  
  // Generate Projects menu items from ML projects
  const projectsItems = mlProjects.map((project, index) => ({
    title: project.heroTitle || project.title || "Project",
    description: project.heroDescription || project.description || "",
    icon: <Code className="size-5 shrink-0" />,
    url: `/ml/${project.slug || project.id || index}`,
    projectId: project.slug || project.id || index,
  }));

  // Generate Experience menu items from Product Design projects
  const experienceItems = productDesignProjects.map((project, index) => ({
    title: project.title || project.title || project.id || "Experience",
    description: project.heroDescription || project.description || "",
    icon: <Briefcase className="size-5 shrink-0" />,
    url: `/product-design/${project.slug || project.id || index}`,
    projectId: project.slug || project.id || index,
  }));

  const menu: MenuItem[] = [
    {
      title: "Projects",
      url: "/ml",
      items: projectsItems,
    },
    {
      title: "Experience", 
      url: "/product-design",
      items: experienceItems,
    },
    { title: "About", url: "/#about" },
    { title: "Contact", url: "/#contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    // Handle specific project sections (e.g., "projects-rag-evaluation-system")
    if (sectionId.includes('-')) {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = window.innerWidth >= 768 ? 80 : 72;
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
        return;
      }
    }
    
    // Handle general sections
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
    } else if (href.startsWith('/ml') || href.startsWith('/product-design')) {
      // Navigate to the specific project/experience page
      window.location.assign(href);
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
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              // Always navigate to home page and scroll to top
              if (pathname !== '/') {
                window.location.assign('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            {/* <div className="relative size-[32px] md:size-[40px]">
              <Image
                alt={logo.alt}
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={logo.src}
                width={40}
                height={40}
              />
            </div> */}
            <p
              className={`text-md-semibold font-bold text-text-primary text-[20px] md:text-[20px]`}
            >
              {logo.title}
            </p>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center">
            {menu.map((item) => {
              const isActive = activeSection === item.title.toLowerCase();
              if (item.items && item.items.length > 0) {
                return (
                  <div key={item.title} className="relative group">
                    <button
                      className={`block px-4 py-3 font-['Bricolage_Grotesque:Regular',sans-serif] ${
                        isActive ? 'text-text-primary' : linkColor
                      } text-[16px] cursor-pointer ${
                        isActive ? 'underline decoration-2 underline-offset-4' : ''
                      }`}
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      {item.title}
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.projectId}
                          href={subItem.url}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(subItem.url);
                          }}
                          className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-bg-light dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="text-text-lg-regular">{subItem.title}</div>
                             
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.url);
                  }}
                  className={`block px-4 py-3 font-['Bricolage_Grotesque:Regular',sans-serif] ${
                    isActive ? 'text-text-primary' : linkColor
                  } text-[16px] cursor-pointer ${
                    isActive ? 'underline decoration-2 underline-offset-4' : ''
                  }`}
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 ${textColor}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className={`md:hidden ${mobileMenuBgColor} fixed inset-0 w-full h-screen overflow-y-auto pb-6`}>
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2 ${textColor} hover:bg-bg-white rounded-full transition-colors`}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-4 justify-center items-start min-h-screen w-full px-6">
              {menu.map((item) => {
                const isActive = activeSection === item.title.toLowerCase();
                
                if (item.items && item.items.length > 0) {
                  return (
                    <div key={item.title} className="px-4">
                      <Accordion type="single" collapsible className="w-full" defaultValue="Projects">
                        <AccordionItem value={item.title} className="border-b-0">
                          <AccordionTrigger className={`font-['Bricolage_Grotesque:Regular',sans-serif] ${
                            isActive ? 'text-text-primary' : linkColor
                          } text-[20px] hover:no-underline`}>
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent className="pb-2">
                            <div className="flex flex-col gap-2 pl-4">
                              {item.items.map((subItem) => (
                                <Link
                                  key={subItem.projectId}
                                  href={subItem.url}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(subItem.url);
                                  }}
                                  className={`block py-3 font-['Bricolage_Grotesque:Regular',sans-serif] ${
                                    linkColor
                                  } text-[18px] cursor-pointer hover:underline`}
                                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                                >
                                  <div className="flex items-start gap-2">
                                    {/* <div className="mt-0.5">{subItem.icon}</div> */}
                                    <div>
                                      <div className="font-medium">{subItem.title}</div>
                                      {/* {subItem.description && (
                                        <p className="text-xs opacity-75 mt-1">{subItem.description}</p>
                                      )} */}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.title}
                    href={item.url}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.url);
                    }}
                    className={`block px-4 py-5 font-['Bricolage_Grotesque:Regular',sans-serif] ${
                      isActive ? 'text-text-primary' : linkColor
                    } text-[20px] cursor-pointer ${
                      isActive ? 'underline decoration-2 underline-offset-4' : ''
                    }`}
                    style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export { Navbar1 };
