'use client';

import React from 'react';
import GradientBackground from '@/app/components/ui/GradientBackground';

interface MLSectionWithBulletsProps {
  title: string;
  description: string;
  items: string[];
  background?: string;
}

export default function MLSectionWithBullets({
  title,
  description,
  items,
  background = 'bg-bg-white'
}: MLSectionWithBulletsProps) {
  return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10`} style={{ minHeight: '760px' }}>
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

        {/* Content Row with Bullets */}
        <GradientBackground className="rounded-3xl overflow-hidden relative w-full max-w-[1216px]">
          <div className="relative z-10 p-8 md:p-16">
            <div className="w-full bg-bg-white rounded-[12px] p-8">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <div className="shrink-0 mt-1">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-bricolage text-text-primary">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GradientBackground>
      </div>
    </section>
  );
}
