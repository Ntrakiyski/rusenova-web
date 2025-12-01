'use client';

import React from 'react';
import GradientBackground from '@/app/components/ui/GradientBackground';

interface ApproachCard {
  title: string;
  description: string;
}

interface MLApproachProps {
  title: string;
  description: string;
  cards: ApproachCard[];
  background?: string;
}

export default function MLApproach({
  title,
  description,
  cards,
  background = 'bg-bg-white'
}: MLApproachProps) {
  return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="mb-12 w-full">
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

        <GradientBackground className="rounded-3xl overflow-hidden relative w-full">

          <div className="relative z-10 p-8 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card, index) => (
                <div key={index} className="bg-bg-white rounded-[12px] p-6">
                  <h3 className="font-bricolage text-text-primary text-text-xl-semibold mb-3">
                    {card.title}
                  </h3>
                  <p className="font-bricolage text-text-secondary text-text-md-regular">
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
