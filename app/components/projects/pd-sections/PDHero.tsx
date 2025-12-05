'use client';

import React from 'react';

interface PDHeroProps {
  title: string;
  subtitle: string;
  titleHighlight?: string;
  descriptionHighlight?: string;
  background?: string;
}

export default function PDHero({
  title,
  subtitle,
  titleHighlight,
  descriptionHighlight,
  background = 'bg-bg-dark/95'
}: PDHeroProps) {
  // Split subtitle to highlight the titleHighlight part
  const subtitleParts = subtitle.split(titleHighlight || '');

  // Function to highlight multiple words in description
  const highlightDescription = (text: string, highlights: string) => {
    if (!highlights) return text;
    
    const wordsToHighlight = highlights.split(',').map(word => word.trim()).filter(word => word);
    let highlightedText = text;
    
    wordsToHighlight.forEach(word => {
      if (word) {
        const regex = new RegExp(`(${word})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="font-bricolage font-bold text-text-orange">$1</span>');
      }
    });
    
    return highlightedText;
  };

  return (
    <section className={`${background} w-full flex items-center justify-center pt-24 md:pt-32`}>
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-4xl min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[760px] items-center pb-0 pt-8 sm:pt-12 md:pt-16 lg:pt-24 relative w-full z-[1]">
          <div className="relative rounded-lg w-full">
            <div className="flex flex-col items-center overflow-clip rounded-[inherit] w-full">
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] items-center pb-0 pt-6 sm:pt-8 md:pt-10 lg:pt-[40px] px-0 w-full">
                <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-[48px] items-center w-full">
                  <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[24px] items-center w-full">
                    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-center w-full">
                      <h1 className="font-bricolage font-bold text-display-2xl text-center text-white max-w-full md:max-w-[500px] lg:max-w-[800px] mx-auto w-full">
                        {title}
                      </h1>
                    </div>
                    <p className="font-bricolage font-normal text-text-xl-regular max-w-full md:max-w-[512px] lg:max-w-[768px] text-text-light-gray text-center w-full px-2">
                      {descriptionHighlight ? (
                        <span 
                          dangerouslySetInnerHTML={{ 
                            __html: highlightDescription(subtitle, descriptionHighlight) 
                          }} 
                        />
                      ) : (
                        <React.Fragment>
                          {subtitleParts[0]}
                          {titleHighlight && (
                            <span className="font-bricolage font-bold text-text-orange">
                              {titleHighlight}
                            </span>
                          )}
                          {subtitleParts[1]}
                        </React.Fragment>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
