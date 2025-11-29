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
  background = 'bg-white'
}: MLCostBenefitProps) {
  return (
    <section className={`${background} py-16 md:py-24 relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          {title && (
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-12 justify-start items-start">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`w-full md:w-auto rounded-lg ${item.isHighlighted ? 'bg-[#fef6e6]' : 'bg-white'}`}
                >
                  <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] font-bold text-xl mb-4" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {item.title}
                  </h3>
                  {Array.isArray(item.content) ? (
                    <div className="space-y-2">
                      {item.content.map((bullet, bulletIndex) => (
                        <div
                          key={bulletIndex}
                          className="font-['Bricolage_Grotesque',sans-serif] text-[#191818]"
                          style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                        >
                          {bullet}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      className="font-['Bricolage_Grotesque',sans-serif] text-[#191818]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
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
