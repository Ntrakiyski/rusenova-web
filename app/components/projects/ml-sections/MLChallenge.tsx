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
    <section className={`${background} py-16 md:py-24 relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Challenge List */}
          <div className="flex-1 w-full">
            <div className="space-y-5 pl-0 lg:pl-4">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="pt-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#f38300]" />
                  </div>
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {renderChallengeContent(challenge, index)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Graphic */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[396px] h-[300px] sm:h-[356px]">
              {/* Decorative shapes */}
              <div className="absolute left-0 top-[54px] w-full h-[228px] flex items-center justify-center">
                <div className="rotate-[330deg] skew-x-[27deg]">
                  <div className="bg-[#f7f4ed] rounded-[12px] w-[228px] h-[228px]" />
                </div>
              </div>
              <div className="absolute left-0 top-[103px] w-full h-[228px] flex items-center justify-center">
                <div className="rotate-[330deg] skew-x-[27deg]">
                  <div className="bg-[#f38300] rounded-[12px] w-[228px] h-[228px]" />
                </div>
              </div>
              <div className="absolute left-0 top-[13px] w-full h-[228px] flex items-center justify-center">
                <div className="rotate-[330deg] skew-x-[27deg]">
                  <div className="bg-[#f7f4ed] rounded-[12px] w-[228px] h-[228px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}