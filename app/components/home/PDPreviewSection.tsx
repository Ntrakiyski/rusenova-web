'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, HomeContent } from '@/types/project';
import Link from 'next/link';

interface PDPreviewSectionProps {
  pdData: Project[];
  colors?: HomeContent['colors'];
  onProjectClick?: (slug: string) => void;
}

export default function PDPreviewSection({ pdData, colors }: PDPreviewSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollPD = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      const newScrollPosition = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="productdesign" className="bg-white py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-12 md:mb-16"
        >
          <div className="flex flex-col gap-5">
            <h2
              className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[28px] md:text-[36px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#101828' }}
            >
              Product Design
            </h2>
            <p
              className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[16px] md:text-[20px] max-w-[768px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.secondary || '#494848' }}
            >
              This is my working experience company wide with just a few selected projects
            </p>
          </div>

          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => scrollPD('left')}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f7f4ed] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-[#191818]" />
            </button>
            <button
              onClick={() => scrollPD('right')}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f7f4ed] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-[#191818]" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-6 md:gap-8 min-w-max">
            {pdData.map((exp, index) => (
              <Link
                key={index}
                href={`/product-design/${exp.slug}`}
              >
                <div
                  className="flex flex-col gap-5 w-[480px] shrink-0 cursor-pointer"
                >
                  <div
                    className="relative h-[280px] md:h-[320px] lg:h-[403px] overflow-hidden rounded-[24px]"
                    style={{
                      background: exp.gradientColors.length >= 2
                        ? `radial-gradient(58.25% 50.19% at 96.04% 96.28%, ${exp.gradientColors[0]} 9.13%, ${exp.gradientColors[1]} 54.81%, #F7F4ED 90.51%)`
                        : exp.gradientColors.length === 1
                          ? `radial-gradient(58.25% 50.19% at 96.04% 96.28%, ${exp.gradientColors[0]} 9.13%, #F7F4ED 90.51%)`
                          : 'radial-gradient(58.25% 50.19% at 96.04% 96.28%, #F5D0AE 9.13%, #F7F4ED 90.51%)'
                    }}
                  >
                    {exp.metrics[0] && exp.metrics[0].value && (
                      <p
                        className="absolute left-[38px] top-[85px] font-['Bricolage_Grotesque:Light',sans-serif] text-[16px]"
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#191818' }}
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
                        className="absolute left-[38px] top-[85px] font-['Bricolage_Grotesque:Light',sans-serif] text-[14px] max-w-[calc(100%-76px)]"
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#191818' }}
                      >
                        {exp.metrics[0].label}
                      </p>
                    )}
                    {exp.metrics[1] && exp.metrics[1].value && (
                      <p
                        className="absolute left-[146px] bottom-[86px] font-['Bricolage_Grotesque:Light',sans-serif] text-[16px]"
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#191818' }}
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
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3
                      className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[20px] md:text-[24px]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#101828' }}
                    >
                      {exp.title}
                    </h3>
                    {exp.role && (
                      <p
                        className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[16px]"
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.secondary || '#494848' }}
                      >
                        {exp.role}
                      </p>
                    )}
                    <p
                      className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[16px]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.secondary || '#494848' }}
                    >
                      {exp.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}