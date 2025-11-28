'use client';

import React from 'react';
import Image from 'next/image';

interface MLHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
  decorationImage?: string;
  gradientColors?: string[];
  background?: string;
}

export default function MLHero({
  title,
  subtitle,
  heroImage,
  decorationImage = '/rag-results.png',
  gradientColors = ['#8EB2F2', '#E9A8E5', '#F44B2F', '#F38301'],
  background = 'bg-[#252222]'
}: MLHeroProps) {
  return (
    <section className={`${background} relative z-10 rounded-bl-[32px] rounded-br-[32px] overflow-hidden`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Hero Text */}
          <div className="flex-1 w-full">
            <h1 className="font-['Bricolage_Grotesque',sans-serif] text-white text-4xl sm:text-5xl md:text-6xl lg:text-[90px] leading-tight mb-6" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h1>
            <p className="font-['Bricolage_Grotesque',sans-serif] text-white text-lg sm:text-xl max-w-[480px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {subtitle}
            </p>
          </div>

          {/* Hero Image */}
          <div className="flex-1 w-full relative">
            <div className="relative w-full max-w-[592px] mx-auto">
              <Image
                src={heroImage}
                alt={`${title} Hero`}
                className="w-full rounded-[12px] border border-white"
                width={592}
                height={400}
              />
              {decorationImage && (
                <Image
                  src={decorationImage}
                  alt="Decoration"
                  className="absolute -bottom-8 -right-8 w-[140px] sm:w-[180px] md:w-[294px] pointer-events-none"
                  width={294}
                  height={294}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute left-[-154px] md:left-[-100px] w-[600px] md:w-[1000px] lg:w-[1703px] h-[600px] md:h-[1000px] lg:h-[1703px] top-[200px] md:top-[400px] lg:top-[542px] pointer-events-none opacity-60 md:opacity-100 z-0">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1827 1843">
            <g>
              <g filter="url(#filter0_f_1_12916)">
                <path d="M0 3.8147e-06L1826.8 3.8147e-06L1826.8 1842.05L0 1842.05L0 3.8147e-06Z" fill={gradientColors[0]} />
              </g>
              <g filter="url(#filter1_f_1_12916)">
                <path d="M70.5416 60.7637L1777.05 60.7637L1777.05 1781.28L70.5416 1781.28L70.5416 60.7637Z" fill={gradientColors[1]} />
              </g>
              <g filter="url(#filter2_f_1_12916)">
                <path d="M146.51 138.318L1699.28 138.318L1699.28 1704.53L146.51 1704.53L146.51 138.318Z" fill={gradientColors[2]} />
              </g>
              <g filter="url(#filter3_f_1_12916)">
                <path d="M238.073 229.973L1609.52 229.973L1609.52 1612.07L238.073 1612.07L238.073 229.973Z" fill={gradientColors[3]} />
              </g>
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1842.05" id="filter0_f_1_12916" width="1826.8" x="0" y="3.8147e-06">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_12916" stdDeviation="45" />
              </filter>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1720.52" id="filter1_f_1_12916" width="1706.51" x="70.5416" y="60.7637">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_12916" stdDeviation="45" />
              </filter>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1566.21" id="filter2_f_1_12916" width="1553.77" x="146.51" y="138.318">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_12916" stdDeviation="45" />
              </filter>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1382.1" id="filter3_f_1_12916" width="1371.45" x="238.073" y="229.973">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_12916" stdDeviation="45" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}