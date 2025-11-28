'use client';

import React from 'react';

interface CardWithBullets {
  title: string;
  icon?: React.ReactNode;
  iconBg?: string;
  items: string[];
}

interface MLSectionWithCardsAndBulletsProps {
  title: string;
  description: string;
  cards: CardWithBullets[];
  background?: string;
}

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

        <div className="bg-[#f7f4ed] rounded-[24px] overflow-hidden relative w-full">
          {/* Background decorative gradient */}
          <div className="absolute right-0 bottom-0 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] pointer-events-none opacity-50">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1797 1812">
              <g>
                <g filter="url(#filter0_cards_bullets)">
                  <path d="M0 0L1796.12 0L1796.12 1811.04L0 1811.04L0 0Z" fill="#8EB2F2" />
                </g>
                <g filter="url(#filter1_cards_bullets)">
                  <path d="M69.26 59.658L1747.27 59.658L1747.27 1751.39L69.26 1751.39L69.26 59.658Z" fill="#F28EC1" />
                </g>
                <g filter="url(#filter2_cards_bullets)">
                  <path d="M143.84 135.801L1671.9 135.801L1671.9 1676.03L143.84 1676.03L143.84 135.801Z" fill="#F38300" />
                </g>
                <g filter="url(#filter3_cards_bullets)">
                  <path d="M233.387 225.414L1583.15 225.414L1583.15 1585.63L233.387 1585.63L233.387 225.414Z" fill="#F44B2F" />
                </g>
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1811.04" id="filter0_cards_bullets" width="1796.12" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1691.73" id="filter1_cards_bullets" width="1678.01" x="69.26" y="59.658">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1540.23" id="filter2_cards_bullets" width="1528.06" x="143.84" y="135.801">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1360.22" id="filter3_cards_bullets" width="1349.76" x="233.387" y="225.414">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 p-8 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <div key={index} className="bg-white rounded-[16px] p-6 border border-[#dddddd]">
                  {/* Card Header with Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    {card.icon && (
                      <div className={`${card.iconBg || 'bg-blue-100'} rounded-[8px] w-12 h-12 flex items-center justify-center shrink-0`}>
                        {card.icon}
                      </div>
                    )}
                    <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {card.title}
                    </h3>
                  </div>

                  {/* Card Content with Bullet Points */}
                  <div className="space-y-3">
                    {card.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <div className="shrink-0 mt-1">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                            <path d="M7.5 5L9.5 7.5L12.5 5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-base" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}