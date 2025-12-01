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
          <span key={i} className="font-bricolage font-semibold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const wordsToHighlight = ['cross-functional', 'Experience Foundation', 'core product experience'];

  return (
    <section className="bg-white w-full py-8 sm:py-12 md:py-16 lg:py-[96px]">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full">
          {/* Features Grid with Title - all items in 3 column grid on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-[64px] w-full">
            {/* Title as first grid item */}
            <h2 className="font-bricolage font-semibold text-display-md text-text-primary text-center lg:text-left">
              {title}
            </h2>
            
            {/* Features */}
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-start min-h-px min-w-px w-full">
                <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-[8px] items-start w-full">
                  <h3 className="font-bricolage font-semibold text-text-xl-semibold text-text-primary w-full">
                    {feature.title}
                  </h3>
                  <p className="font-bricolage font-normal text-text-lg-regular text-text-secondary w-full whitespace-pre-wrap">
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
