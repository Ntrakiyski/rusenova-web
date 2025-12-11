'use client';

import React from 'react';
// Assuming the import path is correct based on your snippet
import GradientBackground from '@/app/components/ui/GradientBackground';

interface CardWithIcon {
  title: string;
  description: string;
  icon?: React.ReactNode | string;
  bg?: string;
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
  background = 'bg-bg-white'
}: MLSectionWithCardsProps) {
  return (
    <section className={`py-16 md:py-24 lg:py-32 relative z-10 flex items-center w-full`}>
      <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title and Description Row */}
        <div className="mb-12 text-left w-full">
          {title && (
            <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-5">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-secondary text-text-xl-regular max-w-[768px]">
              {description}
            </p>
          )}
        </div>

        {/* 
           Cards Row 
           1. auto-fit: Creates as many columns as will fit.
           2. minmax(220px, 1fr): Cards are at least 220px. If space allows, they stretch (1fr).
        */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 w-full">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center border border-stroke rounded-2xl p-6 h-full"
            >
              <div className={`${card.bg || (index === 0 ? 'bg-[#EFF4FF]' : index === 1 ? 'bg-[#FEEFEE]' : 'bg-[#FEF6EE]')} rounded-lg w-16 h-16 flex items-center justify-center mb-6`}>
                {card.icon && typeof card.icon === 'string' ? (
                  <img src={card.icon} alt="" className="w-6 h-6" loading="lazy" />
                ) : card.icon ? (
                  card.icon
                ) : null}
              </div>
              <h3 className="font-bricolage text-text-primary text-display-xs font-semibold mb-6">
                {card.title}
              </h3>
              <p className="font-bricolage text-text-primary text-text-md-regular leading-relaxed flex-1">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}