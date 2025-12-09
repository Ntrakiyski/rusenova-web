'use client';

import React from 'react';
import GradientBackground from '@/app/components/ui/GradientBackground';

interface MLSectionWithBulletsProps {
  title: string;
  description: string;
  items: string[];
  background?: string;
}

// List of words to bold - add your words here
const WORDS_TO_BOLD = ['OpenAI + LanceDB', '92% precision', 'Precision, Recall, Mean Reciprocal Rank','AI-powered answer correctness', 'Indexer → Datastore → Retriever → Generator', 'sub-second retrieval'];

// Function to bold specific words in text
const boldSpecificWords = (text: string, wordsToBold: string[] = WORDS_TO_BOLD): React.ReactNode => {
  if (!text || wordsToBold.length === 0) {
    return text;
  }

  // Create a regex pattern that matches any of the words (case-insensitive)
  const pattern = wordsToBold
    .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape special regex characters
    .join('|');
  
  const regex = new RegExp(`(${pattern})`, 'gi');

  // Split text by the regex and wrap matches in <strong> tags
  const parts = text.split(regex);

  return parts.map((part, index) => {
    // If the part matches any of our target words (case-insensitive), wrap it in strong tags
    const isMatch = wordsToBold.some(word => part.toLowerCase() === word.toLowerCase());
    
    return isMatch ? (
      <strong key={index} className="font-semibold">{part}</strong>
    ) : (
      <span key={index}>{part}</span>
    );
  });
};

export default function MLSectionWithBullets({
  title,
  description,
  items,
  background = 'bg-bg-white'
}: MLSectionWithBulletsProps) {
  return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] 2xl:min-h-[760px] relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title and Description Row */}
        <div className="mb-12">
          {title && (
            <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-5">
              {boldSpecificWords(title)}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-secondary text-text-xl-regular max-w-[768px]">
              {boldSpecificWords(description)}
            </p>
          )}
        </div>

        {/* Content Row with Bullets */}
        <GradientBackground className="rounded-3xl overflow-hidden relative w-full max-w-[1216px]">
          <div className="relative z-10 px-16 py-16">
            <div className="w-ful bg-bg-white rounded-[12px] p-3xl">
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-20 items-center">
                    {/* <div className="shrink-0 mt-1">
                      <img 
                        src="/Check icon.svg" 
                        alt="Check" 
                        className="w-6 h-6"
                      />
                    </div> */}
                    <p className="font-bricolage text-display-xs">
                      
                      {boldSpecificWords(item)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GradientBackground>
      </div>
    </section>
  );
}
