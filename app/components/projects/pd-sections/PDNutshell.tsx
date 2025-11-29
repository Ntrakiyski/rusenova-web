'use client';

import React from 'react';

interface PDFeature {
  title: string;
  description: string;
}

interface PDNutshellProps {
  title: string;
  features: PDFeature[];
}

export default function PDNutshell({ title, features }: PDNutshellProps) {
  // Function to highlight specific words in description
  const highlightWords = (text: string, wordsToHighlight: string[]) => {
    return text.split(new RegExp(`(${wordsToHighlight.join('|')})`, 'gi')).map((part, i) => {
      if (wordsToHighlight.some(word => word.toLowerCase() === part.toLowerCase())) {
        return (
          <span key={i} className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const wordsToHighlight = ['cross-functional', 'Experience Foundation', 'core product experience'];

  return (
    <section className="bg-white w-full py-8 sm:py-12 md:py-16 lg:py-[96px] min-h-[760px] xl:min-h-[760px]" style={{ minHeight: '760px' }}>
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] py-0 w-full">

          {/* Heading */}
          <h2 className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-8 sm:leading-10 md:leading-[40px] lg:leading-[44px] text-[#191818] text-lg sm:text-xl md:text-2xl lg:text-[36px] w-full text-center lg:text-left">
            {title}
          </h2>

          {/* Features Grid - 3 columns on desktop, 1-2 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-[64px] w-full">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-start min-h-px min-w-px w-full">
                <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-[8px] items-start w-full">
                  <h3 className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-normal sm:leading-6 md:leading-7 lg:leading-[normal] text-[#191818] text-base sm:text-lg md:text-xl lg:text-[20px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {feature.title}
                  </h3>
                  <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-6 sm:leading-7 md:leading-[22px] lg:leading-[24px] text-[#494848] text-sm sm:text-base md:text-[15px] lg:text-[16px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {highlightWords(feature.description, wordsToHighlight)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
