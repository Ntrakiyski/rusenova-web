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
  background = 'bg-black'
}: MLProductionDeploymentProps) {

  return (
    <section className={`${background} py-16 md:py-24 relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          {title && (
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-white text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-white text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-[12px] p-[34px]">
              <div className="flex flex-col gap-6 items-center mb-6">
                <div className="bg-blue-100 rounded-[8px] w-12 h-12 flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-2xl text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {card.title}
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {card.bullets.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex gap-3 items-start">
                    <div className="shrink-0 mt-0.5 text-green-500">
                      <Check className="w-5 h-5" />
                    </div>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-xl leading-[30px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
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