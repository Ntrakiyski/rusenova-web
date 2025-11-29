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
              {cards.map((card, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col items-center text-center">
                  <div className={`${index === 0 ? 'bg-[#EFF4FF]' : index === 1 ? 'bg-[#FEEFEE]' : 'bg-[#FEF6EE]'} rounded-lg w-16 h-16 flex items-center justify-center mb-4`}>
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
          </div>
        </GradientBackground>
      </div>
    </section>
  );
}
