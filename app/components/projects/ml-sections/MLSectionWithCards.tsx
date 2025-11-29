'use client';

import React from 'react';
import GradientBackground from '@/app/components/ui/GradientBackground';

interface CardWithIcon {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface MLSectionWithCardsProps {
  title: string;
  description: string;
  cards: CardWithIcon[];
  background?: string;
}

export default function MLSectionWithCards({
  title,
  description,
  cards,
  background = 'bg-white'
}: MLSectionWithCardsProps) {
  return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10 flex items-center`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title and Description Row */}
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

        {/* Cards Row - Two Rows on Desktop */}
        <GradientBackground className="rounded-3xl overflow-hidden relative w-full">
          <div className="relative z-10 p-8 md:p-16">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* First Row - First Two Cards */}
              <div className="flex flex-col md:flex-row gap-6 flex-1">
                {cards.slice(0, 2).map((card, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col items-center text-center flex-1">
                    <div className={`${index === 0 ? 'bg-[#EFF4FF]' : 'bg-[#FEEFEE]'} rounded-lg w-16 h-16 flex items-center justify-center mb-4`}>
                      {card.icon}
                    </div>
                    <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold mb-4">
                      {card.title}
                    </h3>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-base leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Second Row - Third Card */}
              {cards[2] && (
                <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col items-center text-center lg:w-1/3">
                  <div className="bg-[#FEF6EE] rounded-lg w-16 h-16 flex items-center justify-center mb-4">
                    {cards[2].icon}
                  </div>
                  <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold mb-4">
                    {cards[2].title}
                  </h3>
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-base leading-relaxed">
                    {cards[2].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </GradientBackground>
      </div>
    </section>
  );
}
