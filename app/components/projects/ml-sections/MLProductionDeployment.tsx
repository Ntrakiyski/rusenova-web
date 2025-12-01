'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface DeploymentCard {
  title: string;
  icon: React.ReactNode;
  bullets: string[];
}

interface MLProductionDeploymentProps {
  title: string;
  description: string;
  cards: DeploymentCard[];
  background?: string;
}

export default function MLProductionDeployment({
  title,
  description,
  cards,
  background = 'bg-bg-dark'
}: MLProductionDeploymentProps) {

   return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10 flex items-center`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="mb-12 w-full">
          {title && (
            <h2 className="font-bricolage text-text-white text-display-md font-semibold mb-5">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-white text-text-xl-regular max-w-[768px]">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="bg-bg-white rounded-[12px] p-[34px]">
              <div className="flex flex-col gap-6 items-center mb-6">
                <div className="bg-blue-100 rounded-[8px] w-12 h-12 flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="font-bricolage text-text-primary text-display-xs font-semibold text-center">
                  {card.title}
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {card.bullets.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex gap-3 items-start">
                    <div className="shrink-0 mt-0.5 text-green-500">
                      <Check className="w-5 h-5" />
                    </div>
                    <p className="font-bricolage text-text-secondary text-text-xl-regular leading-[30px]">
                      {bullet}
                    </p>
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
