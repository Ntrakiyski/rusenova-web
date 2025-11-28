'use client';

import React from 'react';

interface Card {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface MLSectionWithCardsProps {
  title: string;
  description: string;
  cards: Card[];
  background?: string;
  cardLayout?: 'grid' | 'list';
}

export default function MLSectionWithCards({
  title,
  description,
  cards,
  background = 'bg-white',
  cardLayout = 'grid'
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

        {cardLayout === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div key={index} className="bg-white rounded-[12px] p-6 border border-[#dddddd]">
                {card.icon && (
                  <div className="mb-4">
                    {card.icon}
                  </div>
                )}
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl mb-3" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {card.title}
                </h3>
                <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {cards.map((card, index) => (
              <div key={index} className="bg-white rounded-[12px] p-6 border border-[#dddddd]">
                <div className="flex items-start gap-6">
                  {card.icon && (
                    <div className="shrink-0">
                      {card.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl mb-2" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {card.title}
                    </h3>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}