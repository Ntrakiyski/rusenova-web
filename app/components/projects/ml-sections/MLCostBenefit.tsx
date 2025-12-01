'use client';

import React from 'react';

interface CostBenefitItem {
  title: string;
  content: string | string[]; // Can be a string or array of strings for bullets
  isHighlighted?: boolean;
}

interface MLCostBenefitProps {
  title: string;
  description: string;
  items: CostBenefitItem[];
  background?: string;
}

export default function MLCostBenefit({
  title,
  description,
  items,
  background = 'bg-bg-white'
}: MLCostBenefitProps) {
  return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10 flex items-center`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-start items-start">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`w-full md:w-auto rounded-lg ${item.isHighlighted ? 'bg-bg-light' : 'bg-bg-white'}`}
                >
                  <h3 className="font-bricolage text-text-primary text-text-xl-semibold mb-4">
                    {item.title}
                  </h3>
                  {Array.isArray(item.content) ? (
                    <div className="space-y-2">
                      {item.content.map((bullet, bulletIndex) => (
                        <div
                          key={bulletIndex}
                          className="font-bricolage text-text-primary text-text-md-regular"
                        >
                          {bullet}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      className="font-bricolage text-text-primary text-text-md-regular"
                    >
                      {item.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
      </div>
    </section>
  );
}
