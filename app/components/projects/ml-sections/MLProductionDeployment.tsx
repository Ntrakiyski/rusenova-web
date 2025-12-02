'use client';

import Image from 'next/image';
import React from 'react';

interface DeploymentCard {
  title: string;
  icon?: React.ReactNode | string;
  bullets: string[];
}

interface MLProductionDeploymentProps {
  title: string;
  description: string;
  cards: DeploymentCard[];
  background?: string;
}

const renderIcon = (icon?: React.ReactNode | string) => {
  if (!icon) return null;
  if (typeof icon === 'string') {
    if (icon.trim().startsWith('<svg')) {
      return <div className="w-6 h-6 [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: icon }} />;
    }
    const src = icon.startsWith('/') ? icon : `/${icon}`;
    return <img src={src} alt="" className="w-6 h-6" />;
  }
  return icon;
};

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
                   {renderIcon(card.icon)}
                </div>
                <h3 className="font-bricolage text-text-primary text-display-xs font-semibold text-center">
                  {card.title}
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {card.bullets.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex gap-3 items-start">
                    <div className="shrink-0 mt-0.5">
                      <img 
                        src="/Check icon.svg" 
                        alt="Check" 
                        className="w-6 h-6"
                      />
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
