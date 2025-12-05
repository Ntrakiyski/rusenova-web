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

  // create a function to bold certain words. i will provide a list of words to bold and you find them in the <p> element (in the bullets) and bold it.

  const boldText = (text: string, wordsToBold: string[]) => {
    return text.split(new RegExp(`(${wordsToBold.join('|')})`, 'gi')).map((part, i) => {
      if (wordsToBold.some(word => word.toLowerCase() === part.toLowerCase())) {
        return <span key={i} className="font-bold">{part}</span>;
      }
      return part;
    });
  };
  const wordsToBold = boldWords || [];


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
                      {boldText(point, wordsToBold)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image - Right Side - Conditionally Rendered */}
          {showImage && (
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
              <div className="w-full max-w-[400px] h-auto flex justify-center items-center">
                <img 
                  src={image}
                  alt="Project Image"
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