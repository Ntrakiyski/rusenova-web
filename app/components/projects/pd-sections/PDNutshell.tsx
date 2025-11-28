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
    <div className="bg-white box-border content-stretch flex flex-col gap-[64px] items-center px-0 py-[96px] relative size-full">
      <div className="max-w-[1280px] relative shrink-0 w-full">
        <div className="max-w-inherit size-full">
          <div className="box-border content-stretch flex gap-[64px] items-start max-w-inherit px-[32px] py-0 relative w-full">

            {/* Left - Heading */}
            <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-start max-w-[360px] min-h-px min-w-px relative shrink-0">
              <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-[44px] relative shrink-0 text-[#191818] text-[36px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {title}
                </p>
              </div>
            </div>

            {/* Right - Content */}
            <div className="basis-0 content-start flex flex-wrap gap-[64px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
              {features.map((feature, index) => (
                <div key={index} className="basis-0 content-stretch flex gap-[16px] grow items-start max-w-[480px] min-h-px min-w-[320px] relative shrink-0">
                  <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                      <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#191818] text-[20px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {feature.title}
                      </p>
                      <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#494848] text-[16px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {highlightWords(feature.description, wordsToHighlight)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}