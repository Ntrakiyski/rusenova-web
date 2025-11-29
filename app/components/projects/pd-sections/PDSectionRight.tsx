'use client';

import React from 'react';

interface PDSectionRightProps {
  title: string;
  description: string;
  achievements: string[];
  images: string[];
}

export default function PDSectionRight({
  title,
  description,
  achievements,
  images,
  background = 'bg-[#f7f4ed]'
}: PDSectionRightProps & { background?: string }) {
  // Function to highlight specific words in text
  const highlightWords = (text: string, wordsToHighlight: string[]) => {
    return text.split(new RegExp(`(${wordsToHighlight.join('|')})`, 'gi')).map((part, i) => {
      if (wordsToHighlight.some(word => word.toLowerCase() === part.toLowerCase())) {
        return (
          <span key={i} className="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Determine which words to highlight based on the project title
  const getWordsToHighlight = (projectTitle: string) => {
    if (projectTitle === 'Communication Framework') {
      return ['no consistent structure', 'company-wide framework'];
    } else if (projectTitle === 'Admin') {
      return ['discoverability', 'findability'];
    } else if (projectTitle === 'Home Page Redesign') {
      return ['daily information'];
    }
    return [];
  };

  const wordsToHighlight = getWordsToHighlight(title);

  return (
    <div className={`${background} box-border content-stretch flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center px-0 py-8 sm:py-12 md:py-16 lg:py-[96px] relative size-full`}>
      {/* Title Section */}
      <div className="max-w-full sm:max-w-[360px] md:max-w-[512px] lg:max-w-[1280px] mx-auto relative shrink-0 w-full px-4 sm:px-6 md:px-8 lg:px-[32px]">
        <div className="box-border content-stretch flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] items-start max-w-inherit py-0 relative w-full">
          <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-8 sm:leading-10 md:leading-[40px] lg:leading-[44px] relative shrink-0 text-[#191818] text-lg sm:text-xl md:text-2xl lg:text-[36px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            {title}
          </p>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="max-w-full sm:max-w-[360px] md:max-w-[512px] lg:max-w-[1280px] mx-auto relative shrink-0 w-full px-4 sm:px-6 md:px-8 lg:px-[32px]">
        <div className="flex flex-col-reverse md:flex-row items-center max-w-inherit size-full gap-6 sm:gap-8 md:gap-[64px]">
          <div className="box-border content-stretch flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[64px] items-center max-w-inherit py-0 relative w-full">

            {/* Text Content - Right side for right layout */}
            <div className="content-stretch flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-[48px] grow items-start max-w-full md:max-w-[560px] min-h-px min-w-px relative shrink-0 w-full md:order-2">
              {/* Description */}
              <div className="content-stretch flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-start max-w-full md:max-w-[560px] min-w-px relative shrink-0 w-full">
                <div className="basis-0 content-stretch flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[20px] grow items-start min-h-px min-w-px relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-[8px] items-start pb-0 pt-2 sm:pt-3 md:pt-4 lg:pt-[10px] px-0 relative shrink-0 w-full">
                    <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-6 sm:leading-7 md:leading-[22px] lg:leading-[24px] relative shrink-0 text-[#191818] text-sm sm:text-base md:text-[15px] lg:text-[16px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {highlightWords(description, wordsToHighlight)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="content-stretch flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-start max-w-full md:max-w-[560px] min-w-px relative shrink-0 w-full">
                <div className="basis-0 content-stretch flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[20px] grow items-start min-h-px min-w-px relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-[8px] items-start pb-0 pt-2 sm:pt-3 md:pt-4 lg:pt-[10px] px-0 relative shrink-0 text-[#191818] w-full">
                    <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-7 sm:leading-8 md:leading-[28px] lg:leading-[30px] relative shrink-0 text-base sm:text-lg md:text-xl lg:text-[20px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      What was achieved
                    </p>
                    <div className="content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-[12px] items-start relative shrink-0 w-full">
                      {achievements.map((achievement, index) => {
                        // Extract the bold part from achievement (text between **)
                        const parts = achievement.split(/(managing|every message|decision-tree|company-wide|10-30% increase|intuitive entry point|Increased active usage)/);

                        return (
                          <div key={index} className="content-stretch flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-[12px] items-start relative shrink-0 w-full">
                            <div className="box-border content-stretch flex gap-2 sm:gap-3 md:gap-[10px] items-center pb-0 pt-2 sm:pt-3 md:pt-[8px] px-0 relative shrink-0">
                              <div className="relative shrink-0 size-3 sm:size-4 md:size-[12px]">
                                <div className="size-2 sm:size-3 md:size-[8px] rounded-full bg-[#F38300]"></div>
                              </div>
                            </div>
                            <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full">
                              <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-6 sm:leading-7 md:leading-[22px] lg:leading-[24px] relative shrink-0 text-[#191818] text-sm sm:text-base md:text-[15px] lg:text-[16px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                                {parts.map((part, i) => {
                                  if (i % 2 === 1) {
                                    return (
                                      <span key={i} className="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                                        {part}
                                      </span>
                                    );
                                  }
                                  return part;
                                })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Content - Right side for right layout */}
            <div className="basis-0 grow min-h-[200px] md:min-h-[560px] max-h-[40vh] md:max-h-[560px] min-h-px min-w-px overflow-clip relative rounded-[16px] shrink-0 w-full md:w-auto order-1 md:order-1 mt-4 md:mt-0">
              {/* Simplified image display - use the first image for all projects */}
              <div className="w-full h-[200px] md:h-[560px] relative flex items-center justify-center">
                <img
                  alt=""
                  className="max-h-full max-w-full object-contain pointer-events-none w-auto h-auto"
                  src={images[0] || "/rag-results.png"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
