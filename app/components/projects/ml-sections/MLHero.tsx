'use client';

import React from 'react';
import Image from 'next/image';

interface MLHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
  decorationImage?: string;
  background?: string;
}

export default function MLHero({
  title,
  subtitle,
  heroImage,
  decorationImage,
  background
}: MLHeroProps) {
  // Always use the same dark background as navigation: #252222
  const heroBackground = background || 'bg-[#252222]';

  return (
    <section 
      className={`${heroBackground} relative z-10 rounded-bl-[32px] rounded-br-[32px] overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[760px] pt-24 md:pt-32`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 h-full flex items-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Hero Text */}
          <div className="flex-1 w-full">
            <h1 className="font-['Bricolage_Grotesque',sans-serif] text-white text-3xl sm:text-4xl md:text-5xl lg:text-[70px] xl:text-[90px] leading-tight mb-6" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h1>
            <p className="font-['Bricolage_Grotesque',sans-serif] text-white text-base sm:text-lg md:text-xl max-w-[480px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {subtitle}
            </p>
          </div>

          {/* Hero Image */}
          <div className="flex-1 w-full relative">
            <div className="relative w-full">
              <Image
                src={heroImage}
                alt={`${title} Hero`}
                className="w-full rounded-[12px]"
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

      {/* Background decorative elements removed */}
    </section>
  );
}
