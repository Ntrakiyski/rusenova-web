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

export default function MLWhatIBuild({
  title = "What I Built",
  bulletPoints,
  showImage = false,
  image = "/tide-home.png",
  boldWords
}: MLWhatIBuildProps) {

  // Function to bold specific words in text
  const boldText = (text: string, wordsToBold: string[] = []) => {
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

  // Helper function to bold text before the first "-" symbol (handles both hyphens and em dashes)
  const renderBoldedContent = (content: string) => {
    // If boldWords are provided, use the boldText function
    if (boldWords && Array.isArray(boldWords) && boldWords.length > 0) {
      return boldText(content, boldWords);
    }
    
    // Otherwise, use the original logic for hyphens and em dashes
    // Look for both regular hyphen (-) and em dash (–)
    const hyphenIndex = content.indexOf('-');
    const emDashIndex = content.indexOf('–');
    
    // Find the first occurrence of either
    let dashIndex = -1;
    if (hyphenIndex !== -1 && emDashIndex !== -1) {
      dashIndex = Math.min(hyphenIndex, emDashIndex);
    } else if (hyphenIndex !== -1) {
      dashIndex = hyphenIndex;
    } else if (emDashIndex !== -1) {
      dashIndex = emDashIndex;
    }
    
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
    <section className={`bg-bg-white py-16 md:py-24 lg:py-32 min-h-[760px] xl:min-h-[760px] 2xl:min-h-[760px] relative z-10 flex items-center`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center w-full">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch h-full w-full">
          
          {/* Text Content - Left Side */}
          {/* 
             Logic Change:
             Left column stays at 50% width regardless of image availability.
             Image column occupies remaining space when present.
          */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {title && (
              <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-6">
                {title}
              </h2>
            )}
            <div className="space-y-3">
              {bulletPoints && bulletPoints.map((point, index) => {
                return (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <p className="font-bricolage text-text-md-regular text-text-primary">
                      {renderBoldedContent(point)}
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