'use client';

import React from 'react';
import GradientBackground from '@/app/components/ui/GradientBackground';

interface CardWithIcon {
  title: string;
  description: string;
  icon: React.ReactNode | string;
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
    <section className={`py-16 md:py-24 min-h-[760px] xl:min-h-[760px] 2xl:min-h-[760px] relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title and Description Row */}
        <div className="mb-12">
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

        {/* Cards Row - All Three Cards in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col items-center text-center border border-stroke rounded-2xl p-6">
              <div className={`${card.bg || (index === 0 ? 'bg-[#EFF4FF]' : index === 1 ? 'bg-[#FEEFEE]' : 'bg-[#FEF6EE]')} rounded-lg w-16 h-16 flex items-center justify-center mb-6`}>
                {typeof card.icon === 'string' ? (
                  <img src={card.icon} alt="" className="w-6 h-6" loading="lazy" />
                ) : (
                  card.icon
                )}
              </div>
              <h3 className="font-bricolage text-text-primary text-display-xs font-semibold mb-6">
                {card.title}
              </h3>
              <p className="font-bricolage text-text-secondary text-text-md-regular leading-relaxed flex-1">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
