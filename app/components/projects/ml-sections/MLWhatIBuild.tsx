'use client';

import React from 'react';
import Image from 'next/image';

interface Metric {
  value: string;
  label: string;
  icon?: React.ReactNode;
  iconBg?: string;
  iconSvg?: string;
}

interface MLWhatIBuildProps {
  title?: string;
  description?: string;
  metrics?: Metric[];
  bulletPoints?: string[];
  showImage?: boolean;
  image?: string;
  boldWords?: string[];
}

// List of words to bold - add your words here
const WORDS_TO_BOLD = ['feature performance across multiple algorithms', '0.17% of transactions are actually fraudulent', 'RAG with dedicated Evaluation Framework', 'Critical for unseen information', 'Guarantees correctness', 'Enables measurement and improvement','Three-layer architecture', 'Four core capabilities'];

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

export default function MLWhatIBuild({
  title = "What I Built",
  bulletPoints,
  showImage = false,
  image = "/tide-home.png",
  boldWords
}: MLWhatIBuildProps) {
  return (
    <section className={`bg-bg-white py-16 md:py-24 lg:py-32 relative z-10 flex items-center`}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center w-full">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch h-full w-full">
          
          {/* Text Content - Left Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {title && (
              <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-6">
                {boldSpecificWords(title)}
              </h2>
            )}
            <div className="space-y-3">
              {bulletPoints && bulletPoints.map((point, index) => {
                return (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <p className="font-bricolage text-text-md-regular text-text-primary">
                      {boldSpecificWords(point)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image - Right Side - Conditionally Rendered */}
          {showImage && (
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
              <div className="w-full max-w-[300px] h-auto flex justify-center items-center">
                <Image
                  src={image}
                  alt="Project Image"
                  className="w-full rounded-[16px] mx-auto"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
}