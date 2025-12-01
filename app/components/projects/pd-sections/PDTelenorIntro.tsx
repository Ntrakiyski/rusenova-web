'use client';

import React from 'react';
import Image from 'next/image';

interface PDTelenorFeature {
  title: string;
  description: string;
}

interface PDTelenorIntroProps {
  title?: string;
  row1Image?: string;
  row2Image?: string;
  features?: PDTelenorFeature[];
}

export default function PDTelenorIntro({ 
  title = "Telenor Project", 
  row1Image = "/rag-results.png",
  row2Image = "/rag-results.png",
  features = []
}: PDTelenorIntroProps) {
  // Extract first feature for row 1 content, second feature for row 2 content
  const row1Feature = features[0];
  const row2Feature = features[1];

  return (
    <section className="bg-white w-full py-8 sm:py-12 md:py-16 lg:py-[96px] min-h-[760px] xl:min-h-[760px]" style={{ minHeight: '760px' }}>
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">

          {/* Row 1: Image on the right */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">
            {/* Left Column - Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <h2 className="font-bricolage font-semibold text-display-md text-text-primary">
                {row1Feature?.title || title}
              </h2>
              <p className="font-bricolage font-normal text-text-lg-regular text-text-secondary">
                {row1Feature?.description || 'Content for the first row with image on the right.'}
              </p>
            </div>
            
            {/* Right Column - Image */}
            <div className="w-full lg:w-1/2 h-[200px] sm:h-[300px] md:h-[357px] lg:h-[357px] max-h-[357px] overflow-clip rounded-[16px] relative">
              <Image
                src={row1Image}
                alt="Telenor project work"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Row 2: Image on the left */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">
            {/* Left Column - Image */}
            <div className="w-full lg:w-1/2 h-[200px] sm:h-[300px] md:h-[357px] lg:h-[357px] max-h-[357px] overflow-clip rounded-[16px] relative">
              <Image
                src={row2Image}
                alt="Telenor project work"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Right Column - Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <h3 className="font-bricolage font-semibold text-display-xs text-text-primary">
                {row2Feature?.title || 'Second Row Title'}
              </h3>
              <div className="font-bricolage font-normal text-text-lg-regular text-text-secondary">
                {row2Feature?.description && (
                  <>
                    <p className="italic mb-2">{row2Feature.description.split('\n')[0]}</p>
                    {row2Feature.description.split('\n')[1] && (
                      <div className="space-y-1">
                        <p className="font-semibold">{row2Feature.description.split('\n')[1]}</p>
                        {row2Feature.description.split('\n')[2] && (
                          <p className="text-sm text-[#666]">{row2Feature.description.split('\n')[2]}</p>
                        )}
                      </div>
                    )}
                  </>
                )}
                {!row2Feature?.description && 'Content for the second row with image on the left.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
