'use client';

import React from 'react';
import Image from 'next/image';

interface LearningItem {
  title: string;
  boldWords?: string;
  icon?: React.ReactNode;
  type?: 'technical' | 'business' | 'process';
}

interface MLKeyLearningProps {
  title?: string;
  learnings: LearningItem[];
  showImage?: boolean;
  image?: string;
  background?: string;
  boldWords?: string[];
}

export default function MLKeyLearning({
  title = "Key Learnings",
  learnings,
  showImage = false,
  image,
  background = 'bg-bg-light',
  boldWords
}: MLKeyLearningProps) {
   // create a function to bold certain words. i will provide a list of words to bold and you find them in the <p> element (in the bullets) and bold it.

  const boldText = (text: string, wordsToBold: string[]) => {
    // Filter out empty strings to avoid regex issues
    const validWords = wordsToBold.filter(word => word && word.trim().length > 0);
    
    if (validWords.length === 0) {
      return text;
    }
    
    return text.split(new RegExp(`(${validWords.join('|')})`, 'gi')).map((part, i) => {
      if (validWords.some(word => word.toLowerCase() === part.toLowerCase())) {
        return <span key={i} className="font-bold">{part}</span>;
      }
      return part;
    });
  };
  const wordsToBold = boldWords || [];

   return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] 2xl:min-h-[760px] relative z-10 flex items-center`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center w-full">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch h-full w-full">
          
          {/* Text Content - Left Side */}
          <div className={`w-full ${showImage ? 'lg:w-1/2' : 'lg:w-full'} flex flex-col justify-center`}>
            {title && (
              <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-6">
                {title}
              </h2>
            )}
           
            <div className="space-y-3">
              {learnings.map((learning, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  {/* <div className="shrink-0 mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-text-orange" />
                  </div> */}
                  <div>
                    <h3 className="font-bricolage text-text-primary text-text-md mb-1">
                      {boldText(learning.title, wordsToBold)}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image - Right Side - Conditionally Rendered */}
          {showImage && image && (
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
              <div className="w-full max-w-[400px] h-auto flex justify-center items-center">
                <img 
                  src={image}
                  alt="Key Learnings Image"
                  className="w-full rounded-[16px] mx-auto"
                  style={{ maxWidth: '400px' }}
                  loading="lazy"
                />
              </div>
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
}
