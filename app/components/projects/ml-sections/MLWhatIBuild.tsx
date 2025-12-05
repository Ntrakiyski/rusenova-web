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
}

export default function MLWhatIBuild({
  title = "What I Built",
  bulletPoints,
  showImage = false,
  image = "/tide-home.png"
}: MLWhatIBuildProps) {
  

   return (
    <section className={`bg-bg-white py-16 md:py-24 lg:py-32 min-h-[760px] xl:min-h-[760px] 2xl:min-h-[760px] relative z-10 flex items-center`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center w-full">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch h-full w-full">
          
          {/* Text Content - Left Side */}
          {/* 
             Logic Change:
             If showImage is true, width is 50% (lg:w-1/2).
             If showImage is false, width is 100% (lg:w-full).
          */}
          <div className={`w-full ${showImage ? 'lg:w-1/2' : 'lg:w-full'} flex flex-col justify-center`}>
            {title && (
              <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-6">
                {title}
              </h2>
            )}
            <div className="space-y-3">
              {bulletPoints && bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <div className="shrink-0 mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-text-orange" />
                  </div>
                  <p className="font-bricolage text-text-primary text-text-md-regular">
                    {point}
                  </p>
                </div>
              ))}
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