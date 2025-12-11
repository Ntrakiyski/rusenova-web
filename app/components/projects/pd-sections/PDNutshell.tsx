'use client';

import React from 'react';

interface PDFeature {
  title: string;
  description: string;
  person?: string;
  role?: string;
}

interface PDNutshellProps {
  title?: string;
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

  const wordsToHighlight = ['cross-functional', 'Experience Foundation', 'core product experience','multiple client projects','design community', 'organizing conferences, facilitating learning activities, and mentoring designers', 'user research', 'service design'];

  return (
    <section className="bg-bg-light w-full py-16 md:py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full">
          {/* Title Section */}
          {title && (
            <div className="mb-6 lg:mb-8">
              <h2 className="font-bricolage font-semibold text-display-md text-text-primary">
                {title}
              </h2>
            </div>
          )}
          
          {/* Features Grid - 2 column layout with equal width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-[64px] w-full">
            {/* Features */}
            {features.map((feature, index) => (
              <div key={index} className={`flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-start w-full ${feature.person && feature.role ? 'bg-white/50 rounded-lg p-6 lg:p-8 border border-stroke/50' : ''}`}>
                <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-[8px] items-start w-full">
                  {feature.title && (
                    <h3 className="font-bricolage font-semibold text-text-xl-semibold text-text-primary w-full">
                      {feature.title}
                    </h3>
                  )}
                  <p className="font-bricolage font-normal text-text-lg-regular text-text-primary w-full whitespace-pre-wrap">
                    {highlightWords(feature.description, wordsToHighlight)}
                  </p>
                  {/* Person and Role - only show if they exist (testimonial format) */}
                  {feature.person && feature.role && (
                    <div className="flex flex-col gap-1 w-full">
                      <p className="font-bricolage font-semibold text-text-lg-semibold text-text-primary w-full">
                        {feature.person}
                      </p>
                      <p className="font-bricolage font-normal text-text-lg-regular text-text-primary w-full">
                        {feature.role}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
