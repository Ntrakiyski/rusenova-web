'use client';

import React from 'react';
import Image from 'next/image';

interface PDSectionRightProps {
  title: string;
  description: string;
  achievements: string[];
  images: string[];
  background?: string;
}

export default function PDSectionRight({
  title,
  description,
  achievements,
  images,
  background = 'bg-bg-light'
}: PDSectionRightProps) {
  // Function to highlight specific words in text
  const highlightWords = (text: string, wordsToHighlight: string[]) => {
    return text.split(new RegExp(`(${wordsToHighlight.join('|')})`, 'gi')).map((part, i) => {
      if (wordsToHighlight.some(word => word.toLowerCase() === part.toLowerCase())) {
        return (
          <span key={i} className="font-bricolage font-bold">
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
    } else if (projectTitle === 'Homepage Redesign') {
      return ['daily information', 'increase the number of paid bills', 'valuable enough'];
    } else if (projectTitle === 'Gamification') {
      return ['valuable enough'];
    }
    return [];
  };

  const wordsToHighlight = getWordsToHighlight(title);

  return (
    <section className="bg-white w-full py-16 md:py-24 lg:py-32">
      <div className="max-w-[1000px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">
           {/* Title */}
              <h2 className="font-bricolage font-semibold text-display-md text-text-primary w-full">
                {title}
              </h2>
          {/* Single row: Image on left, text content on right */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">
            {/* Left Column: Image */}
            <div className="w-full lg:w-1/2 aspect-video overflow-clip rounded-lg lg:order-1">
              <div className="w-full h-[200px] lg:h-[560px] relative flex items-center justify-center">
                <Image
                  alt="RAG project results visualization"
                  className="object-contain pointer-events-none"
                  src={images[0] || "/rag-results.png"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-[48px] items-start w-full lg:w-1/2 lg:order-2">
             

              {/* Description */}
              <p className="font-bricolage font-normal text-text-lg-regular text-text-primary w-full">
                {highlightWords(description, wordsToHighlight)}
              </p>

              {/* Achievements */}
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-start w-full">
               
                <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-[12px] items-start w-full">
                  {achievements.map((achievement, index) => {
                    // Extract the bold part from achievement (text between **)
                    const parts = achievement.split(/(managing|every message|decision-tree|company-wide|10-30% increase|intuitive entry point|Increased active usage|increase the number of paid bills|activated for just a few minutes|doesn't require users to think about it beforehand|abroad|design conferences|learning activities|mentorship structures|golfer personas)/);

                    return (
                      <div key={index} className="flex gap-2 sm:gap-3 md:gap-[10px] items-center w-full">
                        <p className="font-bricolage font-normal text-text-lg-regular text-text-primary flex-1">
                          {parts.map((part, i) => {
                            if (i % 2 === 1) {
                              return (
                                <span key={i} className="font-bricolage font-bold">
                                  {part}
                                </span>
                              );
                            }
                            return part;
                          })}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
