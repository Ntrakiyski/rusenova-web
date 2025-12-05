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
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] 2xl:min-h-[760px] relative z-10`}>
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

        {/* Cards Row - Two Rows on Desktop */}
        <GradientBackground className="rounded-3xl overflow-hidden relative w-full" gradient={false}>
          <div className="relative z-10 p-8 md:p-16">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* First Row - Statistical and Domain Specific Cards */}
              <div className="flex flex-col md:flex-row gap-6 flex-1">
                {cards.slice(0, 2).map((card, index) => (
                  <div key={index} className="bg-bg-white rounded-2xl p-6 flex flex-col items-center text-center flex-1">
                    <div className={`${card.bg || (index === 0 ? 'bg-[#EFF4FF]' : 'bg-[#E6F5EE]')} rounded-lg w-16 h-16 flex items-center justify-center mb-4`}>
                      {card.icon ? (
                        <img src={card.icon} alt="" className="w-6 h-6" loading="lazy" />
                      ) : (
                        index === 0 ? <BarChartIcon /> : <CubeIcon />
                      )}
                    </div>
                    <h3 className="font-bricolage text-text-primary text-text-xl-semibold mb-6">
                      {card.title}
                    </h3>
                    <div className="space-y-4 w-full">
                      {card.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-text-secondary text-text-md-regular">
                          <img 
                            src="/Check icon.svg" 
                            alt="Check" 
                            className="w-6 h-6 flex-shrink-0"
                          />
                          <span className="text-left">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Row - Advanced Card */}
              {cards[2] && (
                <div className="bg-bg-white rounded-2xl p-6 border border-border flex flex-col items-center text-center lg:w-1/3">
                  <div className={`${cards[2].bg || 'bg-[#FFF8E6]'} rounded-lg w-16 h-16 flex items-center justify-center mb-4`}>
                    {cards[2].icon ? (
                      <img src={cards[2].icon} alt="" className="w-6 h-6" loading="lazy" />
                    ) : (
                      <StarIcon />
                    )}
                  </div>
                  <h3 className="font-bricolage text-text-primary text-text-xl-semibold mb-6">
                    {cards[2].title}
                  </h3>
                  <div className="space-y-4 w-full">
                    {cards[2].items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-text-secondary text-text-md-regular">
                          <img 
                            src="/Check icon.svg" 
                            alt="Check" 
                            className="w-6 h-6 flex-shrink-0"
                          />
                        <span className="text-left">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </GradientBackground>
      </div>
    </section>
  );
}
