import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import svgPaths from "../../public/file.svg";
import imgImage132 from "../../public/rag-results.png";
import imgCrystal from "../../public/rag-results.png";
import imgCubs from "../../public/rag-results.png";
import imgTriangle from "../../public/rag-results.png";
import spiralImage from "../../public/rag-results.png";
import Link from 'next/link';

// ML Data
const mlData = [
  {
    id: "rag-evaluation-system",
    slug: "rag-evaluation-system",
    title: "RAG+ Evaluation System",
    shortDescription: "Reduced information retrieval time by 85% while achieving 92% answer accuracy through a custom RAG pipeline with advanced evaluation framework",
    metrics: [
      { value: "92%", label: "Precision" },
      { value: "89%", label: "Response Accuracy" }
    ],
    gradientColors: ["#F38301", "#F28EC1", "#E9A8E5"]
  },
  {
    id: "fraud-detection-system",
    slug: "fraud-detection-system",
    title: "Fraud detection system",
    shortDescription: "An AI-powered system that catches 84% of fraud while keeping false alarms under 0.05%",
    metrics: [
      { value: "83.8%", label: "Fraud Caught" },
      { value: "83.8%", label: "Fraud Caught" }
    ],
    gradientColors: ["#8EB2F2", "#F38300", "#E9A8E5", "#F44B2F"]
  },
  {
    id: "real-time-meeting-agent",
    slug: "real-time-meeting-agent",
    title: "Real-time meeting agent",
    shortDescription: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    metrics: [
      { value: "", label: "Response acuracy %" }
    ],
    gradientColors: []
  }
];

// Product Design Data
const productDesignData = [
  {
    id: "tide",
    slug: "tide",
    title: "Senior Product Designer",
    company: "Tide",
    role: "Designer • E-commerce white label platform",
    shortDescription: "Tide is transforming SME banking & business management with 1.6M+ members",
    metrics: [
      { value: "28%", label: "Increased paid bills" },
      { value: "12%", label: "Increased DAU" }
    ],
    gradientColors: ["#F38301", "#F28EC1", "#F44B2F", "#E9A8E5"]
  },
  {
    id: "telenor",
    slug: "telenor",
    title: "Telenor",
    role: "Design • Community Management",
    shortDescription: "Telecommunications company with 1M+ Users",
    metrics: [
      { value: "", label: "Managed community of designers" }
    ],
    gradientColors: ["#8EB2F2", "#F28EC1", "#F1850B", "#F44B2F"]
  },
  {
    id: "epam",
    slug: "epam",
    title: "EPAM",
    role: "Software Engineering",
    shortDescription: "Software Engineering & Product Development Services",
    metrics: [
      { value: "", label: "Decision-tree system for message priority" }
    ],
    gradientColors: ["#8EB2F2", "#F38300", "#E9A8E5", "#F44B2F"]
  }
];

export default function HomePage() {
  // Header State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Scroll refs
  const mlScrollRef = useRef<HTMLDivElement>(null);
  const pdScrollRef = useRef<HTMLDivElement>(null);

  const isDark = false;
  const bgColor = 'bg-[#f7f4ed]/95';
  const textColor = 'text-[#191818]';
  const linkColor = 'text-[#494848] hover:text-[#191818]';

  const navItems = [
    { label: 'Home', href: '/', section: 'home' },
    { label: 'Projects', href: '/#projects', section: 'projects' },
    { label: 'Experience', href: '/#experience', section: 'experience' },
    { label: 'About', href: '/#about', section: 'about' },
    { label: 'Contact', href: '/#contact', section: 'contact' }
  ];

  const isOnHomePage = () => {
    const hash = window.location.hash;
    return !hash || hash.startsWith('#projects') || hash.startsWith('#experience') || hash.startsWith('#about') || hash.startsWith('#contact');
  };

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
  }, []);

  const handleNavClick = (href: string, section: string) => {
    setMobileMenuOpen(false);
    const sectionId = href.includes('#') ? href.split('#')[1] : '';
    const onHomePage = isOnHomePage();
    
    if (href === '/') {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('/#')) {
      if (onHomePage) {
        scrollToSection(sectionId);
      } else {
        window.location.hash = '';
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      }
    }
  };

  const scrollML = (direction: 'left' | 'right') => {
    if (mlScrollRef.current) {
      const scrollAmount = 420;
      const newScrollPosition = mlScrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      mlScrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollPD = (direction: 'left' | 'right') => {
    if (pdScrollRef.current) {
      const scrollAmount = 420;
      const newScrollPosition = pdScrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      pdScrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleMLClick = (slug: string) => {
    window.location.hash = `ml/${slug}`;
  };

  const handlePDClick = (slug: string) => {
    window.location.hash = `product-design/${slug}`;
  };

  const services = [
    'Machine Learning Engineering',
    'Data Science',
    'Product Design'
  ];

  const features = [
    {
      icon: imgCubs,
      title: 'AI integrations',
      description: 'Automate repetitive workflows and eliminate manual tasks'
    },
    {
      icon: imgTriangle,
      title: 'AI chatbots',
      description: 'Issues which resolves themselves 24/7'
    },
    {
      icon: imgCubs,
      title: 'Custom AI apps',
      description: 'Specialized AI for your needs'
    },
    {
      icon: imgTriangle,
      title: 'Algorithm Advisory',
      description: 'Driving data-led business impact'
    }
  ];

  const stats = [
    { value: '8+', label: 'Years of Experience' },
    { value: '3', label: 'Major Companies' },
    { value: '100%', label: 'Passion for AI & Design' }
  ];

  const opportunities = [
    ['Machine Learning Engineering', 'Data Science'],
    ['Product Design']
  ];

  const footerLinks = {
    services: [
      { label: 'Machine Learning', href: '#' },
      { label: 'Product Design', href: '#' },
      { label: 'AI Integration', href: '#' },
      { label: 'Consulting', href: '#' }
    ],
    company: [
      { label: 'About', href: '/#about' },
      { label: 'Projects', href: '/#projects' },
      { label: 'Experience', href: '/#experience' },
      { label: 'Contact', href: '/#contact' }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const featureContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const featureItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ed]">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${bgColor} backdrop-blur-sm`}>
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5">
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '';
              }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative size-[32px] md:size-[40px]">
                <img 
                  alt="Gloria Logo" 
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
                  src={imgImage132} 
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
                      isActive ? 'text-[#191818]' : linkColor
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
            <nav className={`md:hidden border-t border-[#191818]/10 ${bgColor} pb-4`}>
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
                      isActive ? 'text-[#191818]' : linkColor
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

      {/* HERO SECTION */}
      <section className="relative bg-[#f7f4ed] pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden rounded-bl-[40px] rounded-br-[40px] md:rounded-bl-[60px] md:rounded-br-[60px]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col items-center gap-8 md:gap-12">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#f0633f] text-[18px] md:text-[24px] text-center"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              HUMAN & AI
            </motion.p>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-['Bricolage_Grotesque:Bold',sans-serif] text-[#191818] text-[36px] md:text-[64px] lg:text-[90px] text-center max-w-[1024px] leading-tight"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              Smart systems build for real people
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px] md:text-[20px] text-center max-w-[768px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              Hi, I'm Gloria and I bend Product Design & Machine Learning to create better systems for great user experience
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 md:gap-5 w-full sm:w-auto"
            >
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="box-border flex items-center justify-center px-5 py-3 rounded-lg border border-[#191818] bg-white shadow-sm hover:bg-[#f7f4ed] transition-colors"
              >
                <span 
                  className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#191818] text-[16px]"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  Email
                </span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="box-border flex items-center justify-center px-5 py-3 rounded-lg border border-[#252222] bg-[#252222] shadow-sm hover:bg-[#191818] transition-colors"
              >
                <span 
                  className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-white text-[16px]"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  LinkedIn
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 100, rotate: 0 }}
          animate={{ opacity: 1, x: 0, rotate: 15 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="absolute bottom-[-80px] right-0 h-[200px] md:h-[250px] lg:h-[320px] w-auto hidden md:block"
        >
          <div className="relative h-full">
            <div className="h-full relative">
              <div className="absolute left-[-120%] bottom-[-280%] w-[350%] h-[350%] opacity-50 pointer-events-none">
                <div className="absolute inset-[-8.43%_-7.97%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2470 2490">
                    <g>
                      <g filter="url(#filter0_f_crystal)" opacity="0.6">
                        <path d={svgPaths.p12c89c00} fill="#F38301" />
                      </g>
                      <g filter="url(#filter1_f_crystal)" opacity="0.5">
                        <path d={svgPaths.pabed300} fill="#F28EC1" />
                      </g>
                      <g filter="url(#filter2_f_crystal)" opacity="0.6">
                        <path d={svgPaths.p46c6880} fill="#F44B2F" />
                      </g>
                      <g filter="url(#filter3_f_crystal)" opacity="0.5">
                        <path d={svgPaths.p13240970} fill="#E9A8E5" />
                      </g>
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2489.05" id="filter0_f_crystal" width="2469.46" x="0" y="0">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                        <feGaussianBlur result="effect1_foregroundBlur_crystal" stdDeviation="100" />
                      </filter>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2337.05" id="filter1_f_crystal" width="2319" x="88" y="76">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                        <feGaussianBlur result="effect1_foregroundBlur_crystal" stdDeviation="100" />
                      </filter>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2144.05" id="filter2_f_crystal" width="2127" x="183" y="173">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                        <feGaussianBlur result="effect1_foregroundBlur_crystal" stdDeviation="100" />
                      </filter>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1911.05" id="filter3_f_crystal" width="1897" x="299" y="289">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                        <feGaussianBlur result="effect1_foregroundBlur_crystal" stdDeviation="100" />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
              
              <img alt="" className="h-full w-auto object-contain pointer-events-none relative z-10" src={imgCrystal} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-white py-16 md:py-24 rounded-bl-[40px] rounded-br-[40px]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px] text-center w-full"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              I can help with
            </motion.p>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-6"
            >
              {services.map((service, index) => (
                <motion.p
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, color: '#f0633f' }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#191818] text-[18px] md:text-[20px] text-center cursor-default"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  {service}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-black relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-5 mb-12 md:mb-16"
          >
            <h2 
              className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-white text-[28px] md:text-[36px] text-center max-w-[768px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              Building intelligence into your product
            </h2>
            <p 
              className="font-['Bricolage_Grotesque:Regular',sans-serif] text-white text-[16px] md:text-[20px] text-center max-w-[768px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              ML systems that work technically and experiences that work for humans—because <span style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>you need both</span>.
            </p>
          </motion.div>

          <motion.div 
            variants={featureContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={featureItemVariants}
                className="flex flex-col items-center gap-6 p-6 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="relative size-[72px]">
                  <img 
                    alt="" 
                    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
                    src={feature.icon} 
                  />
                </div>

                <div className="flex flex-col gap-3 text-center">
                  <h3 
                    className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-white text-[20px]"
                    style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] text-[16px]"
                    style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ML SECTION */}
      <section id="ml" className="bg-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-12 md:mb-16"
          >
            <div className="flex flex-col gap-5">
              <h2 
                className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#101828] text-[28px] md:text-[36px]"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                Machine Learning & AI
              </h2>
              <p 
                className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px] md:text-[20px] max-w-[768px]"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                Hands-on experimentation with fraud detection, retrieval systems, and autonomous agents.
              </p>
            </div>
            
            <div className="hidden lg:flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollML('left')}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f7f4ed] transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-[#191818]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollML('right')}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f7f4ed] transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-[#191818]" />
              </motion.button>
            </div>
          </motion.div>

          <div 
            ref={mlScrollRef}
            className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex gap-6 md:gap-8 min-w-max">
              {mlData.map((project, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col gap-5 w-[320px] md:w-[380px] lg:w-[400px] flex-shrink-0 cursor-pointer"
                  onClick={() => handleMLClick(project.slug)}
                >
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative bg-[#f7f4ed] h-[280px] md:h-[320px] lg:h-[403px] overflow-hidden rounded-3xl"
                  >
                    {project.metrics[0]?.value && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="absolute left-[38px] top-[85px] font-['Bricolage_Grotesque:Light',sans-serif] text-[#191818] text-[16px]"
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                      >
                        <span 
                          className="font-['Bricolage_Grotesque:Bold',sans-serif]"
                          style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                        >
                          {project.metrics[0].value}
                        </span>
                        {' '}{project.metrics[0].label}
                      </motion.p>
                    )}
                    {project.metrics[1]?.value && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="absolute left-[146px] bottom-[86px] font-['Bricolage_Grotesque:Light',sans-serif] text-[#191818] text-[16px]"
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                      >
                        <span 
                          className="font-['Bricolage_Grotesque:Bold',sans-serif]"
                          style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                        >
                          {project.metrics[1].value}
                        </span>
                        {' '}{project.metrics[1].label}
                      </motion.p>
                    )}
                    {!project.metrics[0]?.value && project.metrics[0]?.label && (
                      <p 
                        className="absolute left-[61px] bottom-[104px] font-['Bricolage_Grotesque:Light',sans-serif] text-[#191818] text-[16px]"
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                      >
                        {project.metrics[0].label}
                      </p>
                    )}
                    
                    {project.gradientColors.length > 0 && (
                      <div className="absolute inset-0 opacity-30">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 480 403">
                          <defs>
                            {project.gradientColors.map((color, i) => (
                              <radialGradient 
                                key={i} 
                                id={`gradient-${index}-${i}`}
                                cx={i === 0 ? "30%" : i === 1 ? "70%" : i === 2 ? "50%" : "80%"}
                                cy={i === 0 ? "30%" : i === 1 ? "70%" : i === 2 ? "50%" : "20%"}
                                r="60%"
                              >
                                <stop offset="0%" stopColor={color} stopOpacity="0.8" />
                                <stop offset="100%" stopColor={color} stopOpacity="0" />
                              </radialGradient>
                            ))}
                          </defs>
                          {project.gradientColors.map((_, i) => (
                            <circle 
                              key={i}
                              cx={i === 0 ? "30%" : i === 1 ? "70%" : i === 2 ? "50%" : "80%"}
                              cy={i === 0 ? "30%" : i === 1 ? "70%" : i === 2 ? "50%" : "20%"}
                              r="50%"
                              fill={`url(#gradient-${index}-${i})`}
                            />
                          ))}
                        </svg>
                      </div>
                    )}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    <h3 
                      className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#101828] text-[20px] md:text-[24px]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      {project.title}
                    </h3>
                    <p 
                      className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      {project.shortDescription}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="bg-[#f7f4ed] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6 order-2 lg:order-1"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#f0633f] text-[14px] md:text-[16px]"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                ONE PERSON TEAM
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#191818] text-[28px] md:text-[36px]"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                I'm Gloria
              </motion.h2>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col gap-4"
              >
                <p 
                  className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px] md:text-[18px]"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  I'm Gloria - a product designer, based in Bulgaria with 8 years of experience exploring how systems, data, and human behavior connect to shape meaningful experiences. I've always been drawn to the details that make complex systems feel seamless, from how a product behaves to how people move through its journey. My curiosity about data naturally led me to machine learning, where I found a new way to understand and design smarter experiences.
                </p>
                
                <p 
                  className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px] md:text-[18px]"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  After studying statistics and ML and building several projects, I'm excited to merge these worlds — using design thinking to make AI more intuitive and human-centered. If you're working on something in that space, I'd love to collaborate
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-6 mt-8"
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex flex-col gap-1"
                  >
                    <span 
                      className="font-['Bricolage_Grotesque:Bold',sans-serif] text-[#191818] text-[32px] md:text-[40px]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      {stat.value}
                    </span>
                    <span 
                      className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[14px]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-[400px] mx-auto lg:max-w-none"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1654512697945-9936dc2ca5b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwZGVzaWduZXJ8ZW58MXx8fHwxNzYzNzU3NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Gloria"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCT DESIGN SECTION */}
      <section id="productdesign" className="bg-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-12 md:mb-16"
          >
            <div className="flex flex-col gap-5">
              <h2 
                className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#101828] text-[28px] md:text-[36px]"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                Product Design
              </h2>
              <p 
                className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px] md:text-[20px] max-w-[768px]"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                This is my working experience company wide with just a few selected projects
              </p>
            </div>
            
            <div className="hidden lg:flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollPD('left')}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f7f4ed] transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-[#191818]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollPD('right')}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f7f4ed] transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-[#191818]" />
              </motion.button>
            </div>
          </motion.div>

          <div 
            ref={pdScrollRef}
            className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex gap-6 md:gap-8 min-w-max">
              {productDesignData.map((exp, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col gap-5 w-[320px] md:w-[380px] lg:w-[400px] flex-shrink-0 cursor-pointer"
                  onClick={() => handlePDClick(exp.slug)}
                >
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative bg-[#f7f4ed] h-[280px] md:h-[320px] lg:h-[403px] overflow-hidden rounded-3xl"
                  >
                    {exp.metrics[0] && exp.metrics[0].value && (
                      <p 
                        className="absolute left-[38px] top-[85px] font-['Bricolage_Grotesque:Light',sans-serif] text-[#191818] text-[16px]"
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                      >
                        <span 
                          className="font-['Bricolage_Grotesque:Bold',sans-serif]"
                          style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                        >
                          {exp.metrics[0].value}
                        </span>
                        {' '}{exp.metrics[0].label}
                      </p>
                    )}
                    {!exp.metrics[0]?.value && exp.metrics[0]?.label && (
                      <p 
                        className="absolute left-[38px] top-[85px] font-['Bricolage_Grotesque:Light',sans-serif] text-[#191818] text-[14px] max-w-[calc(100%-76px)]"
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                      >
                        {exp.metrics[0].label}
                      </p>
                    )}
                    {exp.metrics[1] && exp.metrics[1].value && (
                      <p 
                        className="absolute left-[146px] bottom-[86px] font-['Bricolage_Grotesque:Light',sans-serif] text-[#191818] text-[16px]"
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                      >
                        <span 
                          className="font-['Bricolage_Grotesque:Bold',sans-serif]"
                          style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                        >
                          {exp.metrics[1].value}
                        </span>
                        {' '}{exp.metrics[1].label}
                      </p>
                    )}
                    
                    {exp.gradientColors.length > 0 && (
                      <div 
                        className="absolute right-0 bottom-0 w-[300px] h-[300px] rounded-br-3xl overflow-hidden"
                      >
                        <div
                          className="absolute right-[-150px] bottom-[-150px] w-[300px] h-[300px]"
                          style={{
                            background: `radial-gradient(circle, ${exp.gradientColors.join(', ')})`,
                            filter: 'blur(60px)',
                            opacity: 0.5
                          }}
                        />
                      </div>
                    )}
                  </motion.div>

                  <div className="flex flex-col gap-2">
                    <h3 
                      className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#101828] text-[20px] md:text-[24px]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      {exp.title}
                    </h3>
                    <p 
                      className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#494848] text-[16px]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      {exp.role}
                    </p>
                    <p 
                      className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      {exp.shortDescription}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="contact" className="relative py-20">
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#212121] rounded-[24px] overflow-clip shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-center p-16"
              >
                <div className="flex flex-col gap-5">
                  <h2 
                    className="font-['Inter:Semi_Bold',sans-serif] text-white text-[36px] leading-[44px] tracking-[-0.72px]"
                  >
                    Want to talk about your project?
                  </h2>

                  <p 
                    className="font-['Inter:Regular',sans-serif] text-white text-[20px] leading-[30px]"
                  >
                    Message me on LinkedIn or send me an email
                  </p>

                  <div className="flex gap-3 mt-8">
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      href="mailto:gloria@example.com"
                      className="px-[18px] py-[12px] rounded-lg border border-white hover:bg-white/5 transition-colors shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                    >
                      <span 
                        className="font-['Inter:Semi_Bold',sans-serif] text-white text-[16px] leading-[24px]"
                      >
                        Email
                      </span>
                    </motion.a>
                    
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-[18px] py-[12px] rounded-lg bg-white hover:bg-white/90 transition-colors border border-[#7f56d9] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                    >
                      <span 
                        className="font-['Inter:Semi_Bold',sans-serif] text-[#212121] text-[16px] leading-[24px]"
                      >
                        LinkedIn
                      </span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col justify-center p-16"
              >
                <div className="flex flex-col gap-5">
                  <p 
                    className="font-['Inter:Regular',sans-serif] text-white text-[20px] leading-[30px]"
                  >
                    I'm currently seeking opportunities in:
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-3">
                      {opportunities[0].map((opportunity, index) => (
                        <div
                          key={index}
                          className="backdrop-blur-sm backdrop-filter bg-[rgba(255,255,255,0.03)] px-6 py-3 rounded-[10px] h-12 flex items-center justify-center"
                        >
                          <p 
                            className="font-['Inter:Bold',sans-serif] text-white text-[15.6px] leading-[24px] whitespace-nowrap"
                          >
                            {opportunity}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {opportunities[1].map((opportunity, index) => (
                        <div
                          key={index}
                          className="backdrop-blur-sm backdrop-filter bg-[rgba(255,255,255,0.03)] px-6 py-3 rounded-[10px] h-12 flex items-center justify-center"
                        >
                          <p 
                            className="font-['Inter:Bold',sans-serif] text-white text-[15.6px] leading-[24px] whitespace-nowrap"
                          >
                            {opportunity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="absolute flex items-center justify-center left-[850px] w-[559.467px] h-[559.467px] top-[134px] pointer-events-none hidden lg:block">
              <div className="rotate-[300deg]">
                <div className="relative w-[409.558px] h-[409.558px]">
                  <img 
                    alt="" 
                    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
                    src={spiralImage} 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#191818] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <h3 
                className="font-['Bricolage_Grotesque:96pt_ExtraBold',sans-serif] text-white text-[24px]"
                style={{ fontVariationSettings: "'opsz' 96, 'wdth' 100" }}
              >
                Gloria
              </h3>
              <p 
                className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] text-[16px] max-w-[400px]"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                Building intelligent systems that bridge the gap between cutting-edge machine learning and delightful user experiences.
              </p>
              
              <div className="flex items-center gap-4 mt-2">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="mailto:gloria@example.com"
                  className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h4 
                className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-white text-[16px]"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                Services
              </h4>
              <ul className="flex flex-col gap-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 
                className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-white text-[16px]"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                Projects
              </h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <a 
                    href="/#projects"
                    className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                  >
                    RAG + Evaluation pipeline
                  </a>
                </li>
                <li>
                  <a 
                    href="/#projects"
                    className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                  >
                    Fraud detection system
                  </a>
                </li>
                <li>
                  <a 
                    href="/#projects"
                    className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                  >
                    Real-time meeting agent
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 
                className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-white text-[16px]"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                Company
              </h4>
              <ul className="flex flex-col gap-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-white/10">
            <p 
              className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] text-[14px] text-center md:text-left"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              © 2025 Gloria. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="#"
                className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                Privacy Policy
              </a>
              <a 
                href="#"
                className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
