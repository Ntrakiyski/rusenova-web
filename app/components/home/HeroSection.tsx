'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import imgImage132 from "@/public/rag-results.png";
import { HomeContent } from '@/types/project';

interface HeroSectionProps {
  content: HomeContent['hero'];
  colors: HomeContent['colors'];
}

export default function HeroSection({ content, colors }: HeroSectionProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className={`relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden rounded-bl-[40px] rounded-br-[40px] md:rounded-bl-[60px] md:rounded-br-[60px]`} style={{ backgroundColor: content.backgroundColor }}>
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
                      <path d="M1235.23 2489.05C1913.9 2489.05 2469.46 1933.49 2469.46 1254.82C2469.46 576.15 1913.9 24.95 1235.23 24.95C556.56 24.95 0 576.15 0 1254.82C0 1933.49 556.56 2489.05 1235.23 2489.05Z" fill="#F38301" />
                    </g>
                    <g filter="url(#filter1_f_crystal)" opacity="0.5">
                      <path d="M1235.23 2337.05C1853.23 2337.05 2387.23 1803.05 2387.23 1185.05C2387.23 567.05 1853.23 133.05 1235.23 133.05C617.23 133.05 88 567.05 88 1185.05C88 1803.05 617.23 2337.05 1235.23 2337.05Z" fill="#F28EC1" />
                    </g>
                    <g filter="url(#filter2_f_crystal)" opacity="0.6">
                      <path d="M1235.23 2144.05C1799.23 2144.05 2271.23 1672.05 2271.23 1108.05C2271.23 544.05 1799.23 72.05 1235.23 72.05C671.23 72.05 199.23 544.05 199.23 1108.05C199.23 1672.05 671.23 2144.05 1235.23 2144.05Z" fill="#F44B2F" />
                    </g>
                    <g filter="url(#filter3_f_crystal)" opacity="0.5">
                      <path d="M1235.23 1911.05C1746.73 1911.05 2196.23 1461.55 2196.23 907.05C2196.23 352.55 1746.73 3 1235.23 3C723.73 3 274.23 352.55 274.23 907.05C274.23 1461.55 723.73 1911.05 1235.23 1911.05Z" fill="#E9A8E5" />
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

            <img alt={content.image.alt} className="h-full w-auto object-contain pointer-events-none relative z-10" src={content.image.src} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}