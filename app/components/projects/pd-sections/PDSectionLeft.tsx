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
    <section className={`${background} w-full py-8 sm:py-12 md:py-16 lg:py-[96px] min-h-[760px]`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">

          {/* Single row: Title with text content on left, image on right */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">

            {/* Left Column: Text Content */}
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-[48px] items-start w-full lg:w-1/2">

              {/* Title */}
              <h2 className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-8 sm:leading-10 md:leading-[40px] lg:leading-[44px] text-[#191818] text-lg sm:text-xl md:text-2xl lg:text-[36px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {title}
              </h2>

              {/* Description */}
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-start w-full">
                <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[20px] items-start w-full">
                  <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-[8px] items-start w-full">
                    <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-6 sm:leading-7 md:leading-[22px] lg:leading-[24px] text-[#191818] text-sm sm:text-base md:text-[15px] lg:text-[16px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {highlightWords(description, wordsToHighlight)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-start w-full">
                <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[20px] items-start w-full">
                  <h3 className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-7 sm:leading-8 md:leading-[28px] lg:leading-[30px] text-[#191818] text-base sm:text-lg md:text-xl lg:text-[20px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    What was achieved
                  </h3>

                  <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-[12px] items-start w-full">
                    {achievements.map((achievement, index) => {
                      // Extract the bold part from achievement (text between **)
                      const parts = achievement.split(/(managing|every message|decision-tree|company-wide|10-30% increase|intuitive entry point|Increased active usage)/);

                      return (
                        <div key={index} className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-[12px] items-start w-full">
                          <div className="flex gap-2 sm:gap-3 md:gap-[10px] items-center w-full">
                            <div className="size-3 sm:size-4 md:size-[12px] flex-shrink-0">
                              <div className="size-2 sm:size-3 md:size-[8px] rounded-full bg-[#F38300]"></div>
                            </div>
                            <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-6 sm:leading-7 md:leading-[22px] lg:leading-[24px] text-[#191818] text-sm sm:text-base md:text-[15px] lg:text-[16px] flex-1" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
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

            {/* Right Column: Image */}
            <div className="w-full lg:w-1/2 min-h-[200px] lg:min-h-[560px] max-h-[40vh] lg:max-h-[560px] overflow-clip rounded-[16px]">
              <div className="w-full h-[200px] lg:h-[560px] relative flex items-center justify-center">
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
    </section>
  );
}
