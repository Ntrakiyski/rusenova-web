'use client';

import React from 'react';
import GradientBackground from '@/app/components/ui/GradientBackground';

interface CardWithBullets {
  title: string;
  items: string[];
  icon?: string;
  bg?: string;
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
  background = 'bg-bg-white'
}: MLSectionWithCardsAndBulletsProps) {
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
              <div className={`${card.bg || (index === 0 ? 'bg-[#EFF4FF]' : index === 1 ? 'bg-[#E6F5EE]' : 'bg-[#FFF8E6]')} rounded-lg w-16 h-16 flex items-center justify-center mb-6`}>
                {card.icon ? (
                  <img src={card.icon} alt="" className="w-6 h-6" loading="lazy" />
                ) : (
                  index === 0 ? <BarChartIcon /> : index === 1 ? <CubeIcon /> : <StarIcon />
                )}
              </div>
              <h3 className="font-bricolage text-text-primary text-display-xs font-semibold mb-6">
                {card.title}
              </h3>
              <div className="space-y-4 w-full flex-1">
                {card.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-start gap-2 text-text-secondary text-text-md-regular">
                    {/* <img 
                      src="/Check icon.svg" 
                      alt="Check" 
                      className="w-6 h-6 flex-shrink-0"
                    /> */}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
