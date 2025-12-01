'use client';

import React from 'react';
import Image from 'next/image';
import { ProjectFeature } from '@/types/project';

interface MLChallengeProps {
  title: string;
  description: string;
  challenges: string[] | ProjectFeature[];
  background?: string;
  image?: string;
}

export default function MLChallenge({
  title,
  description,
  challenges,
  background = 'bg-bg-white',
  image
}: MLChallengeProps) {
  // Helper function to render challenge content
  const renderChallengeContent = (challenge: string | ProjectFeature) => {
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
            <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-5">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-primary text-text-xl-regular max-w-[768px]">
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
                    <div className="w-3 h-3 rounded-full bg-text-orange" />
                  </div>
                  <p className="font-bricolage text-text-primary text-text-md-regular">
                    {renderChallengeContent(challenge)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RAG Results Image - Right Column */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full h-auto max-w-[400px]">
              <Image 
                src={image || "/rag-results.png"} 
                alt="RAG Results Visualization" 
                width={600}
                height={400}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
