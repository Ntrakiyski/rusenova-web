'use client';

import React from 'react';
import { Check } from 'lucide-react';
import GradientBackground from '@/app/components/ui/GradientBackground';

interface CardWithBullets {
  title: string;
  items: string[];
}

interface MLSectionWithCardsAndBulletsProps {
  title: string;
  description: string;
 cards: CardWithBullets[];
  background?: string;
}

// Icons
const BarChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 20V10M12 20V4M6 20V14" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CubeIcon = () => (
  <svg width="24" height="24" viewBox="0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.5V12M12 12L21.5 7.5M12 12L2.5 7.5M12 12V21.5M21.5 7.5L12 12M21.5 7.5V16.5L12 21.5M21.5 7.5L12 2.5L2.5 7.5M12 21.5L2.5 16.5V7.5M12 2.5L2.5 7.5" stroke="#00A55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L2 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFB020" stroke="#FFB020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function MLSectionWithCardsAndBullets({
  title,
  description,
  cards,
  background = 'bg-white'
}: MLSectionWithCardsAndBulletsProps) {
  return (
    <section className={`${background} py-16 md:py-24 relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          {title && (
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        <GradientBackground className="rounded-3xl overflow-hidden relative w-full">
          <div className="relative z-10 p-8 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Statistical Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col items-center text-center">
                <div className="bg-[#EFF4FF] rounded-lg w-16 h-16 flex items-center justify-center mb-4">
                  <BarChartIcon />
                </div>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold mb-6">
                  {cards[0]?.title || 'Statistical'}
                </h3>
                <div className="space-y-4 w-full">
                  {cards[0]?.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#4B5563] text-base">
                      <Check className="w-5 h-5 text-[#155DFC] flex-shrink-0" />
                      <span className="text-left">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Domain Specific Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col items-center text-center">
                <div className="bg-[#E6F5EE] rounded-lg w-16 h-16 flex items-center justify-center mb-4">
                  <CubeIcon />
                </div>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold mb-6">
                  {cards[1]?.title || 'Domain Specific'}
                </h3>
                <div className="space-y-4 w-full">
                  {cards[1]?.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#4B5563] text-base">
                      <Check className="w-5 h-5 text-[#00A55E] flex-shrink-0" />
                      <span className="text-left">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advanced Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col items-center text-center">
                <div className="bg-[#FFF8E6] rounded-lg w-16 h-16 flex items-center justify-center mb-4">
                  <StarIcon />
                </div>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold mb-6">
                  {cards[2]?.title || 'Advanced'}
                </h3>
                <div className="space-y-4 w-full">
                  {cards[2]?.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#4B5563] text-base">
                      <Check className="w-5 h-5 text-[#FFB020] flex-shrink-0" />
                      <span className="text-left">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GradientBackground>
      </div>
    </section>
  );
}
