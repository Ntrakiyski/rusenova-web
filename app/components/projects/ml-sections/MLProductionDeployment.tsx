'use client';

import Image from 'next/image';
import React from 'react';

interface DeploymentCard {
  title: string;
  icon?: React.ReactNode | string;
  iconBg?: string;
  bullets: string[];
}

interface MLProductionDeploymentProps {
  title: string;
  description: string;
  cards: DeploymentCard[];
  background?: string;
}

// List of words to bold - add your words here
const WORDS_TO_BOLD = ['Groq Whisper API + Stream Processing', 'Custom LLM Prompts + Context Windows','Semantic Search + State Management', 'Multi-class Classification'];

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

  // Split text by the regex and wrap matches in <strong> tags with color
  const parts = text.split(regex);

  return parts.map((part, index) => {
    // If the part matches any of our target words (case-insensitive), wrap it in strong tags with color
    const isMatch = wordsToBold.some(word => part.toLowerCase() === word.toLowerCase());
    
    return isMatch ? (
      <strong key={index} className="font-semibold" style={{ color: '#494848' }}>{part}</strong>
    ) : (
      <span key={index}>{part}</span>
    );
  });
};

const renderIcon = (icon?: React.ReactNode | string) => {
  if (!icon) return null;
  if (typeof icon === 'string') {
    if (icon.trim().startsWith('<svg')) {
      return <div className="w-6 h-6 [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: icon }} />;
    }
    const src = icon.startsWith('/') ? icon : `/${icon}`;
    return <img src={src} alt="" className="w-6 h-6" />;
  }
  return icon;
};

export default function MLProductionDeployment({
  title,
  description,
  cards,
  background = 'bg-bg-dark'
}: MLProductionDeploymentProps) {

   return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] 2xl:min-h-[760px] relative z-10 flex items-center`}>
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="mb-12 w-full">
          {title && (
            <h2 className="font-bricolage text-text-white text-display-md font-semibold mb-5">
              {boldSpecificWords(title)}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-white text-text-xl-regular max-w-[768px]">
              {boldSpecificWords(description)}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="bg-bg-white rounded-[12px] p-[34px]">
              <div className="flex flex-col gap-6 items-center mb-6">
                <div className={`${card.iconBg || 'bg-blue-100'} rounded-[8px] w-12 h-12 flex items-center justify-center`}>
                   {renderIcon(card.icon)}
                </div>
                <h3 className="font-bricolage text-text-primary text-display-xs font-semibold text-center">
                  {boldSpecificWords(card.title)}
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {card.bullets.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex gap-3 items-start">
                    {/* <div className="shrink-0 mt-0.5">
                      <img 
                        src="/Check icon.svg" 
                        alt="Check" 
                        className="w-6 h-6"
                      />
                    </div> */}
                    <p className="font-bricolage text-text-secondary text-text-xl-regular leading-[30px]">
                      {boldSpecificWords(bullet)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
