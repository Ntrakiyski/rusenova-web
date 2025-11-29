'use client';

import React from 'react';
import { ProjectFeature } from '@/types/project';

interface MLChallengeProps {
  title: string;
  description: string;
  challenges: string[] | ProjectFeature[];
  background?: string;
}

export default function MLChallenge({
  title,
  description,
  challenges,
  background = 'bg-white'
}: MLChallengeProps) {
  // Helper function to render challenge content
  const renderChallengeContent = (challenge: string | ProjectFeature, index: number) => {
    if (typeof challenge === 'string') {
      return challenge;
    } else if (challenge.type === 'feature') {
      return challenge.description;
    }
    return '';
  };

  return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title and Description Row */}
        <div className="mb-12">
          {title && (
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        {/* Content Row with Two Columns */}
        <div className="flex flex-col lg:flex-row lg:gap-12 gap-6 items-center">
          {/* Challenge List - Left Column */}
          <div className="w-full lg:w-1/2 flex items-center">
            <div className="space-y-4 pl-0">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex gap-2 sm:gap-3 items-start">
                  <div className="pt-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#f38300]" />
                  </div>
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-sm sm:text-base" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {renderChallengeContent(challenge, index)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RAG Results Image - Right Column */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-full h-auto">
              <img 
                src="/rag-results.png" 
                alt="RAG Results Visualization" 
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
