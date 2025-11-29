'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { HomeContent } from '@/types/project';

interface HeroSectionProps {
  content: HomeContent['hero'];
  colors: HomeContent['colors'];
}

export default function HeroSection({ content, colors }: HeroSectionProps) {

  return (
    <section className={`relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden`} style={{ borderRadius: '0 0 60px 60px', background: 'linear-gradient(156deg, #F7F4ED 79.59%, #FD681D 111.61%)' }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center gap-8 md:gap-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[18px] md:text-[24px] text-center"
            style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors.text.accent }}
          >
            {content.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-['Bricolage_Grotesque:Bold',sans-serif] text-[36px] md:text-[64px] lg:text-[90px] text-center max-w-[1024px] leading-tight"
            style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors.text.primary }}
          >
            {content.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[16px] md:text-[20px] text-center max-w-[768px]"
            style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors.text.secondary }}
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 md:gap-5 w-full sm:w-auto"
          >
            {content.buttons.map((button, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`box-border flex items-center justify-center px-5 py-3 rounded-lg border shadow-sm transition-colors ${
                  button.style === 'primary' 
                    ? `border-[${colors.text.primary}] bg-white hover:bg-[${colors.background}]`
                    : `border-[${colors.secondary}] bg-[${colors.secondary}] hover:bg-[${colors.text.primary}]`
                }`}
                onClick={() => window.open(button.link, '_blank')}
              >
                <span
                  className={`font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[16px] ${
                    button.style === 'primary' ? '' : 'text-white'
                  }`}
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: button.style === 'primary' ? colors.text.primary : undefined }}
                >
                  {button.text}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-[-80px] right-0 h-[200px] md:h-[250px] lg:h-[320px] w-auto hidden md:block">
        <div className="relative h-full">
          <div className="h-full relative">
            <Image alt={content.image.alt} className="h-full w-auto object-contain pointer-events-none relative z-10" src={content.image.src} width={0} height={0} sizes="100vw" style={{ width: 'auto', height: '100%' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
