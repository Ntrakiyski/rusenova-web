'use client';

import React from 'react';

interface PDSectionLeftProps {
  title: string;
  description: string;
  achievements: string[];
  images: string[];
}

export default function PDSectionLeft({
  title,
  description,
  achievements,
  images,
  background = 'bg-[#f7f4ed]'
}: PDSectionLeftProps & { background?: string }) {
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
    <div className={`${background} box-border content-stretch flex flex-col gap-[64px] items-center px-0 py-[96px] relative size-full`}>
      {/* Title Section */}
      <div className="max-w-[1280px] relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start max-w-inherit px-[32px] py-0 relative w-full">
          <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-[44px] relative shrink-0 text-[#191818] text-[36px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            {title}
          </p>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="max-w-[1280px] relative shrink-0 w-full">
        <div className="flex flex-row items-center max-w-inherit size-full">
          <div className="box-border content-stretch flex gap-[64px] items-center max-w-inherit px-[32px] py-0 relative w-full">

            {/* Text Content - Left side */}
            <div className="basis-0 content-stretch flex flex-col gap-[48px] grow items-start max-w-[560px] min-h-px min-w-px relative shrink-0">
              {/* Description */}
              <div className="content-stretch flex gap-[16px] items-start max-w-[560px] min-w-[320px] relative shrink-0 w-full">
                <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-start min-h-px min-w-px relative shrink-0">
                  <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-0 pt-[10px] px-0 relative shrink-0 w-full">
                    <div className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#191818] text-[16px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {highlightWords(description, wordsToHighlight)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="content-stretch flex gap-[16px] items-start max-w-[560px] min-w-[320px] relative shrink-0 w-full">
                <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-start min-h-px min-w-px relative shrink-0">
                  <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-0 pt-[10px] px-0 relative shrink-0 w-full">
                    <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-[30px] relative shrink-0 text-[#191818] text-[20px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      What was achieved
                    </p>
                  </div>

                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    {achievements.map((achievement, index) => {
                      // Extract the bold part from achievement (text between **)
                      const parts = achievement.split(/(managing|every message|decision-tree|company-wide|10-30% increase|intuitive entry point|Increased active usage)/);

                      return (
                        <div key={index} className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
                          <div className="box-border content-stretch flex gap-[10px] items-center pb-0 pt-[8px] px-0 relative shrink-0">
                            <div className="relative shrink-0 size-[12px]">
                              <div className="size-[8px] rounded-full bg-[#F38300]"></div>
                            </div>
                          </div>
                          <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
                            <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#191818] text-[16px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
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

            {/* Image Content */}
            <div className="basis-0 grow h-[560px] min-h-px min-w-px overflow-clip relative rounded-[16px] shrink-0">
              {/* Simplified image display - use the first image for all projects */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  alt=""
                  className="max-h-[80%] max-w-[80%] object-contain pointer-events-none"
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