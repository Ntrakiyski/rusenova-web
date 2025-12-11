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

// List of words to bold - add your words here
const WORDS_TO_BOLD = ['Organizations struggle to extract insights', 'Traditional keyword search misses 60%', 'Information Loss', 'Cognitive Overload', 'Delayed Insights', 'No Real-Time Guidance'];

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

export default function MLChallenge({
  title,
  description,
  challenges,
  background = 'bg-bg-white',
  image
}: MLChallengeProps) {
  // Helper function to render challenge content with bold text before "-"
  const renderChallengeContent = (challenge: string | ProjectFeature) => {
    if (typeof challenge === 'string') {
      return challenge;
    } else if (challenge.type === 'feature') {
      return challenge.description;
    }
    return '';
  };

  // Helper function to bold text before the first "-" symbol
  const renderBoldedContent = (content: string) => {
    const dashIndex = content.indexOf('-');
    
    // If no dash is found, return the content as is
    if (dashIndex === -1) {
      return <span>{content}</span>;
    }
    
    // Split content into bold part and regular part
    const boldText = content.substring(0, dashIndex).trim();
    const regularText = content.substring(dashIndex).trim();
    
    return (
      <span>
        <span className="font-semibold">{boldText}</span>
        <span> {regularText}</span>
      </span>
    );
  };

  return (
    <section className={`${background} py-16 md:py-24 lg:py-32 relative z-10`}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
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

        {/* Content Row with Two Columns */}
        <div className="flex flex-col lg:flex-row lg:gap-12 gap-6 items-center">
          {/* Challenge List - Left Column */}
          <div className="w-full lg:w-1/2 flex items-center">
            <div className="space-y-4 pl-0">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex gap-2 sm:gap-3 items-start">
                  {/* <div className="pt-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-text-orange" />
                  </div> */}
                  <p className="font-bricolage text-text-primary text-text-md-regular">
                    {boldSpecificWords(renderChallengeContent(challenge))}
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
